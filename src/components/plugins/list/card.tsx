import type { PluginData } from '@/types';
import {
	ChevronRight,
	Command,
	Globe,
	Monitor,
	Tag,
	Users,
} from 'lucide-react';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

function highlight(text: string, query: string) {
	if (!query) return text;
	const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return text.replace(
		new RegExp(`(${q})`, 'gi'),
		'<mark class="bg-primary/20 text-primary rounded-sm px-0.5">$1</mark>'
	);
}

export function PluginCard({
	plugin,
	search,
}: {
	plugin: PluginData;
	search: string;
}) {
	return (
		<Link
			href={`/plugins/${encodeURIComponent(plugin.name)}`}
			className='group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl'>
			<Card className='h-full p-6 hover:-translate-y-1 transition-all hover:bg-accent/20 backdrop-blur-sm'>
				<div className='flex flex-col h-full space-y-4'>
					<header className='space-y-3'>
						<div className='flex items-start justify-between gap-2'>
							<h3
								className='text-lg font-semibold text-card-foreground group-hover:text-accent-foreground line-clamp-2'
								dangerouslySetInnerHTML={{
									__html: highlight(plugin.name, search),
								}}
							/>
							<div className='flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-secondary/60 text-secondary-foreground'>
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
							<Users className='size-4' />
							<span
								className='truncate'
								title={plugin.authors
									.map((a) => a.name)
									.join(', ')}
								dangerouslySetInnerHTML={{
									__html: highlight(
										plugin.authors
											.map((a) => a.name)
											.join(', '),
										search
									),
								}}
							/>
						</div>
					</header>

					<p
						className='text-sm text-muted-foreground line-clamp-3'
						title={plugin.description}
						dangerouslySetInnerHTML={{
							__html: highlight(plugin.description, search),
						}}
					/>

					{plugin.tags.length > 0 && (
						<div className='space-y-2'>
							<div className='flex items-center gap-2 text-xs text-muted-foreground'>
								<Tag className='size-3' />
								<span>Tags</span>
							</div>
							<div className='flex flex-wrap gap-1.5'>
								{plugin.tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className='inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-secondary/80 text-secondary-foreground'
										dangerouslySetInnerHTML={{
											__html: highlight(tag, search),
										}}
									/>
								))}
								{plugin.tags.length > 3 && (
									<span
										className='inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-secondary/50 text-secondary-foreground'
										title={plugin.tags.slice(3).join(', ')}>
										+{plugin.tags.length - 3}
									</span>
								)}
							</div>
						</div>
					)}

					<footer className='flex justify-between pt-3 border-t'>
						{plugin.hasCommands && (
							<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
								<Command className='size-3' />
								<span>Commands</span>
							</div>
						)}
						<div className='flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent-foreground'>
							<span>View details</span>
							<ChevronRight className='size-3 transition-transform group-hover:translate-x-0.5' />
						</div>
					</footer>
				</div>
			</Card>
		</Link>
	);
}
