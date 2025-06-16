import { ExternalLink, Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { VENCORD_GITHUB } from '@/lib/constants';

export function HelpCard() {
	return (
		<Card className='border-border bg-background/5'>
			<CardContent className='space-y-5'>
				<div className='flex items-center gap-2'>
					<Heart className='size-4 text-primary' />
					<h3 className='text-foreground font-semibold'>
						Need Help?
					</h3>
				</div>

				<p className='text-sm text-muted-foreground'>
					Get support from our community or report issues.
				</p>

				<div className='flex flex-col gap-3'>
					<Button
						variant='outline'
						size='sm'
						asChild
						className='w-full'>
						<Link
							href='/support'
							aria-label='Join our Discord community'>
							Join Discord
						</Link>
					</Button>
					<Button
						variant='ghost'
						size='sm'
						asChild
						className='w-full'>
						<Link
							href={`${VENCORD_GITHUB}/issues`}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Report an issue on GitHub'
							className='flex items-center justify-center'>
							Report Issue
							<ExternalLink className='size-3 ml-2' />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
