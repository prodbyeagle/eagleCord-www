'use client';

import type { PluginData } from '@/types';
import {
	ArrowLeft,
	Command,
	Download,
	ExternalLink,
	Github,
	Globe,
	Heart,
	Monitor,
	Tag,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import { InstallationSteps } from '@/components/plugins/installation-steps';
import { MarkdownRenderer } from '@/components/plugins/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { GITHUB_URL } from '@/lib/constants';
import { fetchPluginReadme, fetchPlugins } from '@/lib/data';
import { humanFriendlyJoin } from '@/lib/text';

interface PluginPageProps {
	params: Promise<{ name: string }>;
}

async function getPlugin(
	name: string
): Promise<{ plugin: PluginData; readme: string | null }> {
	try {
		const plugins = await fetchPlugins();
		const plugin = plugins.find(
			(p: PluginData) => p.name === decodeURIComponent(name)
		);

		if (!plugin) {
			notFound();
		}

		const readme = await fetchPluginReadme(plugin?.name);
		return { plugin, readme };
	} catch (error) {
		console.error('Error fetching plugin:', error);
		notFound();
	}
}

export default function PluginPage({ params }: PluginPageProps) {
	const [plugin, setPlugin] = React.useState<PluginData | null>(null);
	const [readme, setReadme] = React.useState<string | null>(null);
	const { name } = React.use(params);

	React.useEffect(() => {
		getPlugin(name).then((result) => {
			if (!result) return;
			setPlugin(result.plugin);
			setReadme(result.readme);
		});
	}, [name]);

	return (
		<div className='min-h-screen'>
			<div className='border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 py-4'>
					<div className='flex items-center gap-4'>
						<Button variant='ghost' size='sm' asChild>
							<Link
								href='/plugins'
								className='flex items-center gap-2'>
								<ArrowLeft className='size-4' />
								Back to Plugins
							</Link>
						</Button>
						<Separator orientation='vertical' className='h-4' />
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<Link
								href='/plugins'
								className='hover:text-foreground transition-colors'>
								Plugins
							</Link>
							<span>/</span>
							<span className='text-foreground font-medium'>
								{plugin?.name}
							</span>
						</div>
					</div>
				</div>
			</div>

			<main className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
				<div className='grid lg:grid-cols-3 gap-12'>
					<div className='lg:col-span-2 space-y-8'>
						<div className='space-y-6'>
							<div className='space-y-4'>
								<div className='flex items-center gap-3'>
									<div className='p-3 bg-primary/10 rounded-xl'>
										{plugin?.target === 'web' ? (
											<Globe className='size-6 text-primary' />
										) : (
											<Monitor className='size-6 text-primary' />
										)}
									</div>
									<div>
										<h1 className='text-4xl font-bold text-foreground'>
											{plugin?.name}
										</h1>
										<div className='flex items-center gap-2 text-muted-foreground mt-1'>
											<Users className='size-4' />
											<span>
												by{' '}
												{humanFriendlyJoin(
													plugin?.authors ?? [],
													(a) => a.name
												)}
											</span>
										</div>
									</div>
								</div>

								<p className='text-lg text-muted-foreground leading-relaxed'>
									{plugin?.description}
								</p>
							</div>

							<div className='flex flex-wrap gap-3'>
								<Badge
									variant='secondary'
									className='flex items-center gap-1.5'>
									{plugin?.target === 'web' ? (
										<Globe className='size-3' />
									) : (
										<Monitor className='size-3' />
									)}
									{plugin?.target === 'web'
										? 'Web Compatible'
										: 'Desktop Only'}
								</Badge>

								{plugin?.hasCommands && (
									<Badge
										variant='secondary'
										className='flex items-center gap-1.5'>
										<Command className='size-3' />
										Commands
									</Badge>
								)}

								{plugin?.tags.map((tag) => (
									<Badge
										key={tag}
										variant='outline'
										className='flex items-center gap-1.5'>
										<Tag className='size-3' />
										{tag}
									</Badge>
								))}
							</div>
						</div>

						<Tabs
							defaultValue={readme ? 'overview' : 'installation'}
							className='w-full'>
							<TabsList className='grid w-full grid-cols-2'>
								{readme && (
									<TabsTrigger value='overview'>
										Overview
									</TabsTrigger>
								)}
								<TabsTrigger value='installation'>
									Installation
								</TabsTrigger>
							</TabsList>

							{readme && (
								<TabsContent value='overview' className='mt-6'>
									<Card>
										<CardContent className='p-6'>
											<MarkdownRenderer
												content={readme}
											/>
										</CardContent>
									</Card>
								</TabsContent>
							)}

							<TabsContent value='installation' className='mt-6'>
								<InstallationSteps
									pluginName={plugin?.name ?? ''}
								/>
							</TabsContent>
						</Tabs>
					</div>

					<div className='space-y-6'>
						<Card>
							<CardContent className='space-y-4'>
								<h3 className='font-semibold text-foreground'>
									Quick Actions
								</h3>

								<div className='space-y-3'>
									<Button className='w-full' asChild>
										<Link href='/download'>
											<Download className='size-4 mr-2' />
											Install Vencord
										</Link>
									</Button>

									<Button
										variant='outline'
										className='w-full'
										asChild>
										<Link
											href={`${GITHUB_URL}/tree/main/src/plugins/${plugin?.filePath}`}
											target='_blank'
											rel='noopener noreferrer'>
											<Github className='size-4 mr-2' />
											View Source
											<ExternalLink className='size-3 ml-auto' />
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 space-y-4'>
								<h3 className='font-semibold text-foreground'>
									Plugin Information
								</h3>

								<div className='space-y-3 text-sm'>
									<div className='flex justify-between'>
										<span className='text-muted-foreground'>
											Platform
										</span>
										<span className='font-medium'>
											{plugin?.target === 'web'
												? 'Web & Desktop'
												: 'Desktop Only'}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>
											Commands
										</span>
										<span className='font-medium'>
											{plugin?.hasCommands ? 'Yes' : 'No'}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>
											Authors
										</span>
										<span className='font-medium text-right'>
											{plugin?.authors.length}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>
											Tags
										</span>
										<span className='font-medium'>
											{plugin?.tags.length}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className='border-primary/20 bg-primary/5'>
							<CardContent className='p-6 space-y-4'>
								<div className='flex items-center gap-2'>
									<Heart className='size-4 text-primary' />
									<h3 className='font-semibold text-foreground'>
										Need Help?
									</h3>
								</div>

								<p className='text-sm text-muted-foreground'>
									Get support from our community or report
									issues.
								</p>

								<div className='space-y-2'>
									<Button
										variant='outline'
										size='sm'
										asChild
										className='w-full'>
										<Link href='/support'>
											Join Discord
										</Link>
									</Button>
									<Button
										variant='ghost'
										size='sm'
										asChild
										className='w-full'>
										<Link
											href={`${GITHUB_URL}/issues`}
											target='_blank'
											rel='noopener noreferrer'>
											Report Issue
											<ExternalLink className='size-3 ml-2' />
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>

			<script
				dangerouslySetInnerHTML={{
					__html: `
            window.copyCode = async function(code, id) {
              await navigator.clipboard.writeText(code);
              // Could add visual feedback here
            }
          `,
				}}
			/>
		</div>
	);
}
