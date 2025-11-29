import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
    mdxRs: true,
  },
};

const withMDX = createMDX({
  // Add optional markdown plugins here
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
