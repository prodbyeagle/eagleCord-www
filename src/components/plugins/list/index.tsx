'use client';

import type { PluginData } from '@/types';
import { useEffect, useMemo, useState } from 'react';

import { FILTER_CRITERIA } from './filter-constants';
import { PluginListFilters } from './filters';
import { PluginListGrid } from './grid';
import { PluginListHeader } from './header';
import { NoResults } from './no-results';

const getHash = (): string =>
	typeof window !== 'undefined'
		? decodeURIComponent(location.hash.slice(1))
		: '';

export const PluginList = ({ plugins }: { plugins: PluginData[] }) => {
	const [searchQuery, setSearchQuery] = useState(getHash());
	const [criteria, setCriteria] = useState(
		FILTER_CRITERIA.map((c) => ({ ...c, state: false }))
	);
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			location.hash = encodeURIComponent(searchQuery);
		}
	}, [searchQuery]);

	const filteredPlugins = useMemo(() => {
		const active = criteria.filter((c) => c.state);
		const q = searchQuery.toLowerCase().trim();
		return plugins.filter((plugin) => {
			const matchesAll = active.every((c) => c.check(plugin));
			if (!matchesAll) return false;
			if (!q) return true;
			const fields = [
				plugin.name,
				plugin.description,
				...plugin.tags,
				...plugin.authors.map((a) => a.name),
			].map((s) => s.toLowerCase());
			return fields.some((f) => f.includes(q));
		});
	}, [criteria, searchQuery, plugins]);

	const clearAll = () => {
		setCriteria((prev) => prev.map((c) => ({ ...c, state: false })));
		setSearchQuery('');
	};

	return (
		<div className='min-h-screen'>
			<PluginListHeader
				total={plugins.length}
				count={filteredPlugins.length}
				search={searchQuery}
				onSearch={setSearchQuery}
				showFilters={showFilters}
				setShowFilters={setShowFilters}
				activeCount={criteria.filter((c) => c.state).length}
			/>
			<div className='container mx-auto px-4 py-8'>
				{showFilters && (
					<PluginListFilters
						criteria={criteria}
						onToggle={(index) =>
							setCriteria((prev) =>
								prev.map((c, i) =>
									i === index ? { ...c, state: !c.state } : c
								)
							)
						}
					/>
				)}
				{filteredPlugins.length === 0 ? (
					<NoResults
						hasFilters={
							!!searchQuery || criteria.some((c) => c.state)
						}
						onClear={clearAll}
					/>
				) : (
					<PluginListGrid
						plugins={filteredPlugins}
						searchQuery={searchQuery}
					/>
				)}
			</div>
		</div>
	);
};
