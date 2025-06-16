import type { NextConfig } from 'next';

const BaseRedirects: Record<string, string> = {
	'/github': 'https://github.com/Vendicated/Vencord',
	'/discord': 'https://discord.gg/D9uwnFnqmd',
	'/support': 'https://discord.gg/D9uwnFnqmd',
	'/install': '/download',
	'/plugins.json':
		'https://raw.githubusercontent.com/Vencord/builds/main/plugins.json',
	'/plugin-readmes.json':
		'https://raw.githubusercontent.com/Vencord/builds/main/plugin-readmes.json',
	'/donate': 'https://github.com/sponsors/Vendicated',
	'/click-to-help/vencord': 'https://github.com/sponsors/Vendicated',
	'/docs/plugin-requests':
		'https://github.com/Vencord/plugin-requests/issues/new?template=request.yml',
};

function makeRedirects() {
	const redirects = [...Object.entries(BaseRedirects)].map(
		([source, destination]) => ({
			source,
			destination,
			permanent: true,
		})
	);

	return redirects;
}

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '/**',
			},
		],
	},
	async redirects() {
		return makeRedirects();
	},
};

export default nextConfig;
