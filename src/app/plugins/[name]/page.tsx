'use client';

import type { PluginData } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react';

import { PluginHeader } from '@/components/plugins/plugin-header';
import { HelpCard } from '@/components/plugins/plugin-help';
import { PluginTabs } from '@/components/plugins/plugin-tabs';

import { fetchPluginReadme, fetchPlugins } from '@/lib/data';

interface PluginPageProps {
	params: { name: string };
}

async function getPlugin(name: string) {
	try {
		const plugins = await fetchPlugins();
		const plugin = plugins.find((p) => p.name === decodeURIComponent(name));

		if (!plugin) notFound();

		const readme = await fetchPluginReadme(plugin.name);
		return { plugin, readme };
	} catch (error) {
		console.error('Error fetching plugin:', error);
		notFound();
	}
}

export default function PluginPage({ params }: PluginPageProps) {
	const { name } = params;

	const [plugin, setPlugin] = React.useState<PluginData | null>(null);
	const [readme, setReadme] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		getPlugin(name).then((data) => {
			if (!data) return;
			setPlugin(data.plugin);
			setReadme(data.readme);
			setLoading(false);
		});
	}, [name]);

	if (loading) {
		return (
			<main className='min-h-screen flex items-center justify-center'>
				<p className='text-muted-foreground text-lg'>
					Loading plugin...
				</p>
			</main>
		);
	}

	if (!plugin) {
		return (
			<main className='min-h-screen flex items-center justify-center'>
				<p className='text-destructive text-lg'>Plugin not found.</p>
			</main>
		);
	}

	return (
		<div className='min-h-screen'>
			<main className='max-w-6xl mx-auto px-4 sm:px-6 py-12'>
				<div className='grid lg:grid-cols-3 gap-12'>
					<div className='lg:col-span-2 space-y-8'>
						<PluginHeader plugin={plugin} />
						<PluginTabs readme={readme} pluginName={plugin.name} />
					</div>

					<div className='space-y-3'>
						{/* <QuickActionsCard filePath={plugin.filePath} /> */}
						{/* <PluginInfoCard plugin={plugin} /> */}
						<HelpCard />
					</div>
				</div>
			</main>
		</div>
	);
}
