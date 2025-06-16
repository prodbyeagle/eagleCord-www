import { type Metadata } from 'next';
import { cache } from 'react';

import { PluginList } from '@/components/plugins/list';

import { fetchPlugins } from '@/lib/data';

export const metadata: Metadata = {
	title: 'Plugins',
	description: 'Browse our list of Vencord plugins.',
};

const getPlugins = cache(async () => {
	const plugins = await fetchPlugins();
	return plugins
		.filter((p) => !p.name.endsWith('API'))
		.sort((a, b) => a.name.localeCompare(b.name));
});

export default async function PluginsPage() {
	const plugins = await getPlugins();

	return (
		<div className='flex flex-col'>
			<PluginList plugins={plugins} />
		</div>
	);
}
