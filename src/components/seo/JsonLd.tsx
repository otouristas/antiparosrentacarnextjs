/**
 * JSON-LD emitter.
 *
 * Serialization is escaped: plain JSON.stringify leaves `<`, `>` and `&`
 * intact, so any content containing the literal `</script>` — entirely possible
 * in a scraped FAQ answer or page title — would terminate the script block early
 * and inject the remainder as markup.
 */
function serialize(data: unknown): string {
  return (
    JSON.stringify(data)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      // U+2028/U+2029 are valid in JSON but terminate a JS string literal.
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
  );
}

export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
