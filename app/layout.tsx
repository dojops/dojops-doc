import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "DojOps Documentation",
    template: "%s DojOps Docs",
  },
  description:
    "DojOps documentation. Generate, validate, and apply infrastructure and CI/CD configs with AI.",
  icons: "/dojops-favicon.png",
};

const banner = (
  <Banner storageKey="dojops-launch">
    <a href="https://dojops.ai" target="_blank" rel="noopener noreferrer">
      DojOps: AI-powered DevOps automation. Learn more →
    </a>
  </Banner>
);

const navbar = (
  <Navbar
    logo={
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src="/icon.png" alt="DojOps" width={24} height={24} />
        <b>DojOps Docs</b>
      </span>
    }
    projectLink="https://github.com/dojops/dojops"
  />
);

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © DojOps · Created by{" "}
    <a
      href="https://github.com/MHChlagou"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}
    >
      Mohamed Hedi CHLAGOU
    </a>
  </Footer>
);

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/dojops/dojops-doc/blob/main"
          footer={footer}
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
