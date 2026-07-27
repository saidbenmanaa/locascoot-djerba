import { jsonLdScript } from '@/lib/schema';

/**
 * Injects structured data into the page. Rendered on the server, so it is
 * present in the initial HTML that Google reads.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(item) }}
        />
      ))}
    </>
  );
}
