import type { PluginData } from '@/types';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface PluginInfoCardProps {
	plugin: PluginData;
}

export function PluginInfoCard({ plugin }: PluginInfoCardProps) {
	return (
		<Card>
			<CardContent className='space-y-5'>
				<h3 className='font-semibold text-foreground'>
					Plugin Information
				</h3>

				<dl className='grid grid-cols-2 gap-y-3 text-sm'>
					<dt className='text-muted-foreground'>Platform</dt>
					<dd className='font-medium'>
						{plugin.target === 'web'
							? 'Web & Desktop'
							: 'Desktop Only'}
					</dd>

					<dt className='text-muted-foreground'>Commands</dt>
					<dd className='font-medium'>
						{plugin.hasCommands ? 'Yes' : 'No'}
					</dd>

					<dt className='text-muted-foreground'>Authors</dt>
					<dd className='font-medium'>
						{plugin.authors.length}
					</dd>

					<dt className='text-muted-foreground'>Tags</dt>
					<dd className='font-medium'>{plugin.tags.length}</dd>
				</dl>
			</CardContent>
		</Card>
	);
}
