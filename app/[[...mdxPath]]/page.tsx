import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents } from "../../mdx-components";
import type { Metadata } from "next";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

const BASE_URL = "https://doc.dojops.ai";

/** Pretty-print a URL segment for breadcrumb labels. */
function segmentLabel(segment: string): string {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata(props: {
  params: Promise<{ mdxPath?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  const slug = params.mdxPath?.join("/") || "";
  return {
    ...metadata,
    alternates: {
      canonical: slug ? `${BASE_URL}/${slug}` : BASE_URL,
    },
  };
}

function BreadcrumbJsonLd({ segments }: { segments: string[] }) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Docs", item: BASE_URL },
    ...segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: segmentLabel(seg),
      item: `${BASE_URL}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  // All values are derived from static URL segments (no user input) — safe for JSON-LD injection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const Wrapper = useMDXComponents().wrapper!;

export default async function Page(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata, ...rest } = result;
  const segments = params.mdxPath || [];

  return (
    <>
      {segments.length > 0 && <BreadcrumbJsonLd segments={segments} />}
      <Wrapper toc={toc} metadata={metadata} {...rest}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    </>
  );
}
