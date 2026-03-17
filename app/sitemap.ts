import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

/** Recursively collect all .mdx files under content/ and return their URL paths. */
function collectMdxPaths(dir: string, base = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const paths: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      paths.push(...collectMdxPaths(path.join(dir, entry.name), `${base}/${entry.name}`));
    } else if (entry.name.endsWith(".mdx")) {
      const slug =
        entry.name === "index.mdx" ? base : `${base}/${entry.name.replace(/\.mdx$/, "")}`;
      paths.push(slug || "/");
    }
  }

  return paths;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDir = path.join(process.cwd(), "content");
  const mdxPaths = collectMdxPaths(contentDir);
  const baseUrl = "https://doc.dojops.ai";

  return mdxPaths.map((p) => ({
    url: p === "/" ? baseUrl : `${baseUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1.0 : p.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
