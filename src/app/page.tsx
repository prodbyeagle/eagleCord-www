'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { WordReveal } from '@/components/word-reveal';

type Feature = {
	title: string;
	emoji: string;
	description: string;
};

const features: Feature[] = [
	{
		title: 'Easy Install',
		emoji: '/emojis/light-bulb.png',
		description: 'Super easy to install thanks to our graphical installer',
	},
	{
		title: 'User Friendly',
		emoji: '/emojis/heart.png',
		description:
			"Comes with all plugins preinstalled. Just enable what you like and you're done",
	},
	{
		title: 'Excellent Browser Support',
		emoji: '/emojis/globe.png',
		description: 'Works just as well inside your favourite Browser!',
	},
	{
		title: 'Privacy Friendly',
		emoji: '/emojis/locked.png',
		description: 'Blocks Discord analytics & crash reports out of the box',
	},
	{
		title: 'Maintained Actively',
		emoji: '/emojis/package.png',
		description:
			'No more broken plugins! Bugs are usually fixed within a day',
	},
	{
		title: 'Developer Friendly',
		emoji: '/emojis/hammer-and-wrench.png',
		description:
			'Flexible and robust plugin system with many APIs empowering you',
	},
];

export default function LandingPage() {
	return (
		<main className='py-20'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-16'>
				<div className='flex justify-center'>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: 'easeOut' }}>
						<div className='relative'>
							<Image
								src='/cute-logo.avif'
								alt='Vencord Logo'
								width={700}
								height={240}
								unoptimized
								priority
								className='relative z-10'
							/>
							<motion.div
								className='absolute inset-0 z-0'
								aria-hidden='true'
								initial={{
									filter: 'blur(50px) brightness(0.7)',
								}}
								transition={{ duration: 1.2, ease: 'easeOut' }}
								style={{
									backgroundImage: "url('/cute-logo.avif')",
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							/>
						</div>
					</motion.div>
				</div>

				<h1 className='text-center text-4xl font-bold text-foreground'>
					<WordReveal
						speed={0.1}
						letter
						text='The cutest Discord Client mod ever made.'
					/>
				</h1>

				<div className='flex flex-wrap justify-center gap-4'>
					<Link
						href='/download'
						target='_blank'
						rel='noopener noreferrer'>
						<Button size='lg'>Download Vencord</Button>
					</Link>
					<Link
						href='/discord'
						target='_blank'
						rel='noopener noreferrer'>
						<Button variant='outline' size='lg'>
							Join our Support Server
						</Button>
					</Link>
					<Link
						href='/github'
						target='_blank'
						rel='noopener noreferrer'>
						<Button variant='outline' size='lg'>
							View on GitHub
						</Button>
					</Link>
				</div>

				<section className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardHeader className='flex items-center gap-2'>
								<Image
									src={feature.emoji}
									alt={`${feature.title} Emoji`}
									width={32}
									height={32}
									className='size-6'
								/>
								<CardTitle>{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									{feature.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</section>
			</div>
		</main>
	);
}
