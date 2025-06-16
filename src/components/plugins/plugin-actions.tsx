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
			<CardContent className='space-y-5'>
				<h3 className='font-semibold text-foreground'>Quick Actions</h3>

				<div className='flex flex-col gap-4'>
					<Button className='w-full justify-start' asChild size='sm'>
						<Link href='/download' aria-label='Install Vencord'>
							<Download className='size-4 mr-3' />
							Install Vencord
						</Link>
					</Button>

					<Button
						variant='outline'
						className='w-full justify-between'
						asChild
						size='sm'>
						<Link
							href={`${GITHUB_URL}/tree/main/src/plugins/${filePath}`}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='View source code on GitHub'
							className='flex items-center w-full'>
							<Github className='size-4 mr-3' />
							View Source
							<ExternalLink className='size-3 ml-auto' />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
