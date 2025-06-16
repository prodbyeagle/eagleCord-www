import { Download, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { GITHUB_URL } from '@/lib/constants';

interface QuickActionsCardProps {
	filePath: string;
}

export function QuickActionsCard({ filePath }: QuickActionsCardProps) {
	return (
		<Card>
			<CardContent className='space-y-4'>
				<h3 className='font-semibold text-foreground'>Quick Actions</h3>

				<div className='space-y-3'>
					<Button className='w-full' asChild>
						<Link href='/download'>
							<Download className='size-4 mr-2' />
							Install Vencord
						</Link>
					</Button>

					<Button variant='outline' className='w-full' asChild>
						<Link
							href={`${GITHUB_URL}/tree/main/src/plugins/${filePath}`}
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
	);
}
