import type { PluginData } from '@/types';

import { PLUGIN_READMES_JSON_URL, PLUGINS_JSON_URL } from './constants';

export async function fetchPlugins() {
	const res = await fetch(PLUGINS_JSON_URL);
	if (!res.ok) throw new Error('Failed to fetch plugins.json: ' + res.status);

	return res.json() as Promise<PluginData[]>;
}

export async function fetchPluginReadme(plugin: string) {
	const res = await fetch(PLUGIN_READMES_JSON_URL);
	if (!res.ok)
		throw new Error('Failed to fetch plugin-readmes.json: ' + res.status);

	const readmes: Record<string, string> = await res.json();
	return readmes[plugin];
}
