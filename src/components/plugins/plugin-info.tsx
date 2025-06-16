import type { PluginData } from '@/types';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface PluginInfoCardProps {
	plugin: PluginData;
}

export function PluginInfoCard({ plugin }: PluginInfoCardProps) {
	return (
		<Card>
			<CardContent className='space-y-4'>
				<h3 className='font-semibold text-foreground'>
					Plugin Information
				</h3>

				<div className='space-y-3 text-sm'>
					<div className='flex justify-between'>
						<span className='text-muted-foreground'>Platform</span>
						<span className='font-medium'>
							{plugin.target === 'web'
								? 'Web & Desktop'
								: 'Desktop Only'}
						</span>
					</div>

					<div className='flex justify-between'>
						<span className='text-muted-foreground'>Commands</span>
						<span className='font-medium'>
							{plugin.hasCommands ? 'Yes' : 'No'}
						</span>
					</div>

					<div className='flex justify-between'>
						<span className='text-muted-foreground'>Authors</span>
						<span className='font-medium text-right'>
							{plugin.authors.length}
						</span>
					</div>

					<div className='flex justify-between'>
						<span className='text-muted-foreground'>Tags</span>
						<span className='font-medium'>
							{plugin.tags.length}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
