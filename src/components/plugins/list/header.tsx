'use client';

import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
	total: number;
	count: number;
	search: string;
	onSearch: (v: string) => void;
	showFilters: boolean;
	setShowFilters: (v: boolean) => void;
	activeCount: number;
}

export function PluginListHeader({
	total,
	count,
	search,
	onSearch,
	showFilters,
	setShowFilters,
	activeCount,
}: Props) {
	return (
		<div className='z-10 border-b border-border'>
			<div className='container mx-auto px-4 py-6'>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight'>
								Plugin Directory
							</h1>
							<p className='text-muted-foreground mt-1'>
								Discover and explore {total} plugins. More added
								daily.
							</p>
						</div>
						<div className='text-sm text-muted-foreground'>
							{count} plugin{count !== 1 && 's'}
						</div>
					</div>

					<div className='flex flex-col sm:flex-row gap-1'>
						<Input
							placeholder='Search plugins, authors, or tags...'
							value={search}
							onChange={(e) => onSearch(e.target.value)}
						/>
						<Button
							variant='outline'
							onClick={() => setShowFilters(!showFilters)}>
							<Filter className='size-4' />
							<span className='font-medium'>Filters</span>
							{activeCount > 0 && (
								<span className='bg-background/20 text-xs px-2 py-1 rounded-full'>
									{activeCount}
								</span>
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
