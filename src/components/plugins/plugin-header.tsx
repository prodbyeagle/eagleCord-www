import type { PluginData } from '@/types';
import { Command, Globe, Monitor, Tag, Users } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';

import { humanFriendlyJoin } from '@/lib/text';

interface PluginHeaderProps {
	plugin: PluginData;
}

export function PluginHeader({ plugin }: PluginHeaderProps) {
	return (
		<section className='space-y-6'>
			<div className='space-y-4'>
				<div className='flex items-center gap-4'>
					<div
						className='p-4 rounded-xl bg-primary/10 flex items-center justify-center'
						aria-label={
							plugin.target === 'web'
								? 'Web Compatible Plugin'
								: 'Desktop Only Plugin'
						}>
						{plugin.target === 'web' ? (
							<Globe className='size-6 text-primary' />
						) : (
							<Monitor className='size-6 text-primary' />
						)}
					</div>

					<div>
						<h1 className='text-4xl font-bold text-foreground'>
							{plugin.name}
						</h1>
						<div className='mt-1 flex items-center gap-2 text-muted-foreground text-sm'>
							<Users className='size-4' />
							<span>
								by{' '}
								{humanFriendlyJoin(
									plugin.authors,
									(a) => a.name
								)}
							</span>
						</div>
					</div>
				</div>

				<p className='text-lg leading-relaxed text-muted-foreground'>
					{plugin.description}
				</p>
			</div>

			<div className='flex flex-wrap gap-3'>
				<Badge
					variant='secondary'
					className='flex items-center gap-1.5'>
					{plugin.target === 'web' ? (
						<Globe className='size-3' />
					) : (
						<Monitor className='size-3' />
					)}
					{plugin.target === 'web'
						? 'Web Compatible'
						: 'Desktop Only'}
				</Badge>

				{plugin.hasCommands && (
					<Badge
						variant='secondary'
						className='flex items-center gap-1.5'>
						<Command className='size-3' />
						Commands
					</Badge>
				)}

				{plugin.tags.map((tag) => (
					<Badge
						key={tag}
						variant='outline'
						className='flex items-center gap-1.5'>
						<Tag className='size-3' />
						{tag}
					</Badge>
				))}
			</div>
		</section>
	);
}
