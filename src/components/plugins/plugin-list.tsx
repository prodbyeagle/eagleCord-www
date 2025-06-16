'use client';

import type { PluginData } from '@/types';
import {
	ChevronRight,
	Command,
	Filter,
	Globe,
	Monitor,
	Search,
	Tag,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';

const getHash = (): string =>
	typeof window !== 'undefined'
		? decodeURIComponent(location.hash.slice(1))
		: '';

interface FilterCriterion {
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	state: boolean;
	check: (plugin: PluginData) => boolean;
}

interface Props {
	plugins: PluginData[];
}

const FILTER_CRITERIA: Omit<FilterCriterion, 'state'>[] = [
	{
		name: 'Has Commands',
		icon: Command,
		check: (p: PluginData) => p.hasCommands,
	},
	{
		name: 'Desktop',
		icon: Monitor,
		check: (p: PluginData) => p.target !== 'web',
	},
	{
		name: 'Web',
		icon: Globe,
		check: (p: PluginData) => p.target === 'web',
	},
];

export const PluginList = ({ plugins }: Props) => {
	const [searchQuery, setSearchQuery] = useState<string>(getHash());
	const [criteria, setCriteria] = useState<FilterCriterion[]>(
		FILTER_CRITERIA.map((criterion) => ({ ...criterion, state: false }))
	);
	const [showFilters, setShowFilters] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			location.hash = encodeURIComponent(searchQuery);
		}
	}, [searchQuery]);

	const filteredPlugins = useMemo(() => {
		const activeCriteria = criteria.filter((c) => c.state);
		const normalizedQuery = searchQuery.toLowerCase().trim();

		return plugins.filter((plugin) => {
			const passesCriteria = activeCriteria.every((criterion) =>
				criterion.check(plugin)
			);

			if (!passesCriteria) return false;

			if (!normalizedQuery) return true;

			const searchableFields = [
				plugin.name,
				plugin.description,
				...plugin.tags,
				...plugin.authors.map((author) => author.name),
			].map((field) => field.toLowerCase());

			return searchableFields.some((field) =>
				field.includes(normalizedQuery)
			);
		});
	}, [criteria, searchQuery, plugins]);

	const activeFiltersCount = criteria.filter((c) => c.state).length;

	const toggleCriterion = (index: number): void => {
		setCriteria((prev) =>
			prev.map((criterion, i) =>
				i === index
					? { ...criterion, state: !criterion.state }
					: criterion
			)
		);
	};

	const clearAllFilters = (): void => {
		setCriteria((prev) => prev.map((c) => ({ ...c, state: false })));
		setSearchQuery('');
	};

	const highlightText = (text: string): string => {
		if (!searchQuery.trim()) return text;

		const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const regex = new RegExp(`(${escapedQuery})`, 'gi');

		return text.replace(
			regex,
			'<mark class="bg-primary/20 text-primary rounded-sm px-0.5">$1</mark>'
		);
	};

	return (
		<div className='min-h-screen'>
			<div className='z-10 border-b border-border'>
				<div className='container mx-auto px-4 py-6'>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center justify-between'>
							<div>
								<h1 className='text-3xl font-bold tracking-tight'>
									Plugin Directory
								</h1>
								<p className='text-muted-foreground mt-1'>
									Discover and explore {plugins.length}{' '}
									available Plugins for you to use
									immediately, with more being made every day.
								</p>
							</div>
							<div className='flex items-center gap-2'>
								<div className='text-sm text-muted-foreground'>
									{filteredPlugins.length} plugin
									{filteredPlugins.length !== 1 ? 's' : ''}
								</div>
							</div>
						</div>

						<div className='flex flex-col sm:flex-row gap-1'>
							<div className='relative flex-1'>
								<Input
									type='text'
									placeholder='Search plugins, authors, or tags...'
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
								/>
							</div>

							<div className='flex items-center'>
								<Button
									variant='outline'
									onClick={() =>
										setShowFilters(!showFilters)
									}>
									<Filter className='size-4' />
									<span className='font-medium'>Filters</span>
									{activeFiltersCount > 0 && (
										<span className='bg-background/20 text-xs px-2 py-1 rounded-full'>
											{activeFiltersCount}
										</span>
									)}
								</Button>
							</div>
						</div>

						{showFilters && (
							<div className='flex w-full gap-1'>
								{criteria.map((criterion, index) => {
									const Icon = criterion.icon;
									return (
										<Button
											variant='outline'
											key={criterion.name}
											onClick={() =>
												toggleCriterion(index)
											}
											className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 transition-all duration-200 ${
												criterion.state
													? 'bg-primary text-primary-foreground border-primary shadow-sm'
													: 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20'
											}`}>
											<Icon className='size-4' />
											<span className='font-medium'>
												{criterion.name}
											</span>
										</Button>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				{filteredPlugins.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-24 text-center'>
						<div className='size-16 rounded-full bg-muted flex items-center justify-center mb-6'>
							<Search className='size-8 text-muted-foreground' />
						</div>
						<h3 className='text-xl font-semibold mb-2'>
							No plugins found
						</h3>
						<p className='text-muted-foreground mb-6 max-w-md'>
							Try adjusting your search terms or filters to find
							what you&apos;re looking for.
						</p>
						{(activeFiltersCount > 0 || searchQuery) && (
							<button
								onClick={clearAllFilters}
								className='px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'>
								Clear all filters
							</button>
						)}
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6'>
						{filteredPlugins.map((plugin) => (
							<Link
								key={plugin.name}
								href={`/plugins/${encodeURIComponent(plugin.name)}`}
								className='group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl'>
								<Card className='h-full p-6 hover:-translate-y-1 transition-all hover:bg-accent/20 backdrop-blur-sm'>
									<div className='flex flex-col h-full space-y-4'>
										<header className='space-y-3'>
											<div className='flex items-start justify-between gap-2'>
												<h3
													className='text-lg font-semibold text-card-foreground group-hover:text-accent-foreground line-clamp-2 leading-tight transition-colors'
													dangerouslySetInnerHTML={{
														__html: highlightText(
															plugin.name
														),
													}}
												/>
												<div className='flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-secondary/60 text-secondary-foreground shrink-0'>
													{plugin.target === 'web' ? (
														<>
															<Globe className='size-3' />
															<span>Web</span>
														</>
													) : (
														<>
															<Monitor className='size-3' />
															<span>Desktop</span>
														</>
													)}
												</div>
											</div>

											<div className='flex items-center gap-2 text-sm text-muted-foreground'>
												<Users className='size-4 shrink-0' />
												<span
													className='truncate'
													title={plugin.authors
														.map((a) => a.name)
														.join(', ')}
													dangerouslySetInnerHTML={{
														__html: highlightText(
															plugin.authors
																.map(
																	(a) =>
																		a.name
																)
																.join(', ')
														),
													}}
												/>
											</div>
										</header>

										<div className='flex-1'>
											<p
												className='text-sm text-muted-foreground line-clamp-3 leading-relaxed'
												title={plugin.description}
												dangerouslySetInnerHTML={{
													__html: highlightText(
														plugin.description
													),
												}}
											/>
										</div>

										{plugin.tags.length > 0 && (
											<div className='space-y-2'>
												<div className='flex items-center gap-2 text-xs font-medium text-muted-foreground'>
													<Tag className='size-3' />
													<span>Tags</span>
												</div>
												<div className='flex flex-wrap gap-1.5'>
													{plugin.tags
														.slice(0, 3)
														.map((tag) => (
															<span
																key={tag}
																className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary/80 text-secondary-foreground transition-colors'
																dangerouslySetInnerHTML={{
																	__html: highlightText(
																		tag
																	),
																}}
															/>
														))}
													{plugin.tags.length > 3 && (
														<span
															className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary/50 text-secondary-foreground'
															title={plugin.tags
																.slice(3)
																.join(', ')}>
															+
															{plugin.tags
																.length - 3}
														</span>
													)}
												</div>
											</div>
										)}

										<footer className='flex items-center justify-between pt-3 border-t'>
											<div className='flex items-center gap-3'>
												{plugin.hasCommands && (
													<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
														<Command className='size-3' />
														<span>Commands</span>
													</div>
												)}
											</div>
											<div className='flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-accent-foreground transition-colors'>
												<span>View details</span>
												<ChevronRight className='size-3 transition-transform group-hover:translate-x-0.5' />
											</div>
										</footer>
									</div>
								</Card>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
