import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // industry detail pages were folded into /industries (only Pharma
      // remains). Paths with a dot are skipped so files in
      // public/industries (e.g. pharma.png) still load.
      {
        source: "/industries/:slug([^.]+)",
        destination: "/industries",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
