import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function CloudPage() {
	return (
		<main className='py-16'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-16'>
				<div className='text-center space-y-6'>
					<h1 className='text-4xl sm:text-5xl font-bold text-foreground'>
						Cloud Now in your Vencord!!
					</h1>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
						Vencord has a cloud integration that powers additional
						features. It&apos;s completely optional and honours your
						privacy!
					</p>
				</div>

				<section className='space-y-6'>
					<h2 className='text-3xl font-bold text-center'>Features</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
						<Card>
							<CardHeader>
								<CardTitle>Settings Sync</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Easily synchronise your settings across
									devices
								</CardDescription>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Future Features</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Stay tuned for more future features!
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</section>

				<section className='space-y-6'>
					<h2 className='text-3xl font-bold text-center'>
						Getting Started
					</h2>
					<Card>
						<CardContent className='space-y-4'>
							<p className='text-muted-foreground'>
								To start using our cloud integration, head over
								to the Vencord settings section inside Discord
								and check the{' '}
								<strong>
									&quot;Enable Cloud Integrations&quot;
								</strong>{' '}
								switch.
							</p>
							<p className='text-muted-foreground'>
								After authorising, you&apos;re good to go! You
								can now enable specific features on the same
								page.
							</p>
						</CardContent>
					</Card>
				</section>

				<section className='space-y-6'>
					<h2 className='text-3xl font-bold text-center'>Links</h2>
					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<Link
							href='https://github.com/Vencord/Vencloud'
							target='_blank'
							rel='noopener noreferrer'>
							<Button
								variant='outline'
								size='lg'
								className='w-full sm:w-auto justify-center gap-2'>
								<ExternalLink className='size-4' />
								Source Code
							</Button>
						</Link>
						<Link href='/cloud/privacy'>
							<Button
								variant='outline'
								size='lg'
								className='w-full sm:w-auto justify-center gap-2'>
								Privacy Policy
							</Button>
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
