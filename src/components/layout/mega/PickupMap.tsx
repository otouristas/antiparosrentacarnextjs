"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type {
  Map as LeafletMap,
  Marker as LeafletMarker,
  DivIcon,
} from "leaflet";
import { ISLANDS_MAP_BOUNDS } from "@/data/mega-menu";
import "leaflet/dist/leaflet.css";

export type MapPin = {
  id: string;
  lat: number;
  lng: number;
  label: string;
};

type PickupMapProps = {
  pins: MapPin[];
  activeId: string | null;
  onPinHover: (id: string | null) => void;
  mainlandActive?: boolean;
};

const PIRAEUS = { lat: 37.9419, lng: 23.6465 };

function pinIcon(L: typeof import("leaflet"), active: boolean): DivIcon {
  const size = active ? 28 : 22;
  return L.divIcon({
    className: "aggelos-map-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    html: `<span class="aggelos-map-pin__mark${active ? " is-active" : ""}" aria-hidden="true"></span>`,
  });
}

/** Leaflet throws `_leaflet_pos` if invalidateSize/pan runs after remove() or off-DOM. */
function isMapAlive(map: LeafletMap | null | undefined): map is LeafletMap {
  if (!map) return false;
  try {
    const el = map.getContainer();
    if (!el?.isConnected) return false;
    return Boolean(map.getPane("mapPane"));
  } catch {
    return false;
  }
}

function safeInvalidateSize(map: LeafletMap | null | undefined) {
  if (!isMapAlive(map)) return;
  try {
    map.invalidateSize({ animate: false });
  } catch {
    /* map torn down mid-frame */
  }
}

/**
 * Branded OpenStreetMap (Carto Voyager tiles) with real pickup coordinates.
 * Pan/highlight syncs with mega-menu location tiles.
 */
export default function PickupMap({
  pins,
  activeId,
  onPinHover,
  mainlandActive = false,
}: PickupMapProps) {
  const t = useTranslations("mega");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, LeafletMarker>>(new Map());
  const onPinHoverRef = useRef(onPinHover);
  const [ready, setReady] = useState(false);
  onPinHoverRef.current = onPinHover;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;
    const timeouts: number[] = [];

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        dragging: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 18,
        },
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      map.fitBounds(ISLANDS_MAP_BOUNDS, { padding: [18, 18], maxZoom: 11 });

      if (cancelled) {
        map.remove();
        return;
      }

      mapRef.current = map;
      setReady(true);

      requestAnimationFrame(() => {
        if (!cancelled) safeInvalidateSize(map);
      });
      timeouts.push(
        window.setTimeout(() => {
          if (!cancelled) safeInvalidateSize(map);
        }, 220),
      );
    })();

    return () => {
      cancelled = true;
      for (const id of timeouts) window.clearTimeout(id);
      markersRef.current.forEach((m) => {
        try {
          m.remove();
        } catch {
          /* already gone */
        }
      });
      markersRef.current.clear();
      const map = mapRef.current;
      mapRef.current = null;
      setReady(false);
      if (map) {
        try {
          map.remove();
        } catch {
          /* already gone */
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!ready || !isMapAlive(mapRef.current)) return;
    const map = mapRef.current;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !isMapAlive(mapRef.current)) return;

      const keep = new Set(pins.map((p) => p.id));
      markersRef.current.forEach((marker, id) => {
        if (!keep.has(id)) {
          try {
            marker.remove();
          } catch {
            /* */
          }
          markersRef.current.delete(id);
        }
      });

      for (const pin of pins) {
        if (cancelled || !isMapAlive(map)) return;
        const active = pin.id === activeId;
        let marker = markersRef.current.get(pin.id);
        if (!marker) {
          marker = L.marker([pin.lat, pin.lng], {
            icon: pinIcon(L, active),
            title: pin.label,
            riseOnHover: true,
          });
          marker.on("mouseover", () => onPinHoverRef.current(pin.id));
          marker.on("mouseout", () => onPinHoverRef.current(null));
          marker.on("click", () => onPinHoverRef.current(pin.id));
          marker.addTo(map);
          markersRef.current.set(pin.id, marker);
        } else {
          marker.setLatLng([pin.lat, pin.lng]);
          marker.setIcon(pinIcon(L, active));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pins, activeId, ready]);

  useEffect(() => {
    if (!ready || !isMapAlive(mapRef.current)) return;
    const map = mapRef.current;

    try {
      if (mainlandActive) {
        map.flyTo([PIRAEUS.lat, PIRAEUS.lng], 11, { duration: 0.65 });
        return;
      }

      if (activeId) {
        const pin = pins.find((p) => p.id === activeId);
        if (pin) {
          map.flyTo([pin.lat, pin.lng], 13, { duration: 0.55 });
          return;
        }
      }

      if (pins.length === 1) {
        map.flyTo([pins[0].lat, pins[0].lng], 12, { duration: 0.55 });
        return;
      }

      if (pins.length > 1) {
        map.flyToBounds(
          pins.map((p) => [p.lat, p.lng] as [number, number]),
          { padding: [28, 28], maxZoom: 12, duration: 0.55 },
        );
        return;
      }

      map.flyToBounds(ISLANDS_MAP_BOUNDS, {
        padding: [18, 18],
        maxZoom: 11,
        duration: 0.55,
      });
    } catch {
      /* map removed while animating */
    }
  }, [activeId, mainlandActive, pins, ready]);

  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => safeInvalidateSize(mapRef.current), 60);
    return () => window.clearTimeout(id);
  }, [ready, activeId, mainlandActive, pins]);

  return (
    <div className="aggelos-pickup-map relative flex h-full min-h-[16rem] flex-col overflow-hidden rounded-sm border border-line bg-foam shadow-sm">
      <div
        ref={containerRef}
        className="absolute inset-0 z-0"
        role="img"
        aria-label={t("islandRail")}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-sand/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-sand/50 to-transparent" />
      {mainlandActive ? (
        <p className="absolute left-2 top-2 z-20 rounded-sm bg-navy/95 px-2.5 py-1.5 text-2xs font-bold uppercase tracking-wider text-foam shadow-sm">
          {t("islands.mainland")}
        </p>
      ) : null}
    </div>
  );
}
