import type { PluginData } from '@/types';

import { PluginCard } from './card';

export function PluginListGrid({
	plugins,
	searchQuery,
}: {
	plugins: PluginData[];
	searchQuery: string;
}) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'>
			{plugins.map((plugin) => (
				<PluginCard
					key={plugin.name}
					plugin={plugin}
					search={searchQuery}
				/>
			))}
		</div>
	);
}
