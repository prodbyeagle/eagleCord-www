import React from 'react';

import { InstallationSteps } from '@/components/plugins/installation-steps';
import { MarkdownRenderer } from '@/components/plugins/markdown-renderer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PluginTabsProps {
	readme: string | null;
	pluginName: string;
}

export function PluginTabs({ readme, pluginName }: PluginTabsProps) {
	return (
		<Tabs
			defaultValue={readme ? 'overview' : 'installation'}
			className='w-full'>
			<TabsList
				className={`grid w-full ${readme ? 'grid-cols-2' : 'grid-cols-1'}`}>
				{readme && <TabsTrigger value='overview'>Overview</TabsTrigger>}
				<TabsTrigger value='installation'>Installation</TabsTrigger>
			</TabsList>

			{readme && (
				<TabsContent value='overview' className='mt-6'>
					<Card>
						<CardContent>
							<MarkdownRenderer content={readme} />
						</CardContent>
					</Card>
				</TabsContent>
			)}

			<TabsContent value='installation' className='mt-6'>
				<InstallationSteps pluginName={pluginName} />
			</TabsContent>
		</Tabs>
	);
}
