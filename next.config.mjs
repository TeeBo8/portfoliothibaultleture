import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
	// Désactiver Turbopack pour compatibilité avec contentlayer
	turbopack: {},
	webpack: (config) => config,
};

export default withContentlayer(nextConfig);
