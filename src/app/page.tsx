'use client';

import { containerVariants, itemVariants } from '@/constants/animation';
import {
	ArrowRight,
	Download,
	Github,
	Globe,
	Hammer,
	Heart,
	Lightbulb,
	Lock,
	MessageCircle,
	Package,
	type LucideIcon,
} from 'lucide-react';
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

interface Feature {
	title: string;
	icon: LucideIcon;
	description: string;
	highlight?: boolean;
}

const features: Feature[] = [
	{
		title: 'Easy Install',
		icon: Lightbulb,
		description: 'Super easy to install thanks to our graphical installer',
		highlight: true,
	},
	{
		title: 'User Friendly',
		icon: Heart,
		description:
			"Comes with all plugins preinstalled. Just enable what you like and you're done",
		highlight: true,
	},
	{
		title: 'Excellent Browser Support',
		icon: Globe,
		description: 'Works just as well inside your favourite Browser!',
	},
	{
		title: 'Privacy Friendly',
		icon: Lock,
		description: 'Blocks Discord analytics & crash reports out of the box',
		highlight: true,
	},
	{
		title: 'Maintained Actively',
		icon: Package,
		description:
			'No more broken plugins! Bugs are usually fixed within a day',
	},
	{
		title: 'Developer Friendly',
		icon: Hammer,
		description:
			'Flexible and robust plugin system with many APIs empowering you',
	},
];

export default function LandingPage() {
	return (
		<main className='py-16 sm:py-20'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-20'>
				{/* Hero Section */}
				<section className='text-center space-y-8'>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='flex justify-center'>
						<div className='relative group'>
							<Image
								src='/cute-logo.avif'
								alt='Vencord Logo'
								width={700}
								height={240}
								unoptimized
								priority
								className='relative z-10 transition-transform duration-300 group-hover:scale-[1.02]'
							/>
							<motion.div
								className='absolute inset-0 z-0 rounded-2xl'
								aria-hidden='true'
								initial={{
									filter: 'blur(60px) brightness(0.4)',
									opacity: 0,
								}}
								animate={{
									filter: 'blur(40px) brightness(0.6)',
									opacity: 0.8,
								}}
								transition={{ duration: 1.5, ease: 'easeOut' }}
								style={{
									backgroundImage: "url('/cute-logo.avif')",
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className='space-y-4'>
						<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight'>
							<WordReveal
								speed={0.1}
								letter
								text='The cutest Discord Client mod ever made.'
							/>
						</h1>
						<p className='text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
							Enhance your Discord experience with the most
							user-friendly and feature-rich client modification
							available.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>
						<Link
							href='/download'
							target='_blank'
							rel='noopener noreferrer'>
							<Button
								size='lg'
								className='w-full sm:w-auto group'>
								<Download className='size-4 mr-2 transition-transform group-hover:scale-110' />
								Download Vencord
								<ArrowRight className='size-4 ml-2 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
						<Link
							href='/discord'
							target='_blank'
							rel='noopener noreferrer'>
							<Button
								variant='outline'
								size='lg'
								className='w-full sm:w-auto group'>
								<MessageCircle className='size-4 mr-2 transition-transform group-hover:scale-110' />
								Join Support Server
							</Button>
						</Link>
						<Link
							href='/github'
							target='_blank'
							rel='noopener noreferrer'>
							<Button
								variant='ghost'
								size='lg'
								className='w-full sm:w-auto group'>
								<Github className='size-4 mr-2 transition-transform group-hover:scale-110' />
								View on GitHub
							</Button>
						</Link>
					</motion.div>
				</section>

				{/* Features Section */}
				<motion.section
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-12'>
					<div className='text-center space-y-4'>
						<h2 className='text-3xl sm:text-4xl font-bold text-foreground'>
							Why Choose Vencord?
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							Discover what makes Vencord the preferred choice for
							Discord enthusiasts worldwide.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{features.map((feature) => (
							<motion.div
								key={feature.title}
								variants={itemVariants}>
								<Card
									className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
										feature.highlight
											? 'ring-2 ring-primary/20 bg-primary/5'
											: ''
									}`}>
									<CardHeader className='pb-4'>
										<div className='flex items-center gap-3 mb-2'>
											<div className='relative'>
												<feature.icon className='size-6 text-primary' />
											</div>
											<CardTitle className='text-lg group-hover:text-primary transition-colors'>
												{feature.title}
											</CardTitle>
										</div>
									</CardHeader>
									<CardContent className='pt-0'>
										<CardDescription className='text-sm leading-relaxed'>
											{feature.description}
										</CardDescription>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* CTA Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className='text-center space-y-6 py-12'>
					<div className='space-y-4'>
						<h3 className='text-2xl sm:text-3xl font-bold text-foreground'>
							Ready to Transform Your Discord?
						</h3>
						<p className='text-muted-foreground max-w-xl mx-auto'>
							Join thousands of users who&apos;ve already enhanced
							their Discord experience with Vencord.
						</p>
					</div>
					<Link
						href='/download'
						target='_blank'
						rel='noopener noreferrer'>
						<Button size='lg' className='group'>
							<Download className='size-4 mr-2 transition-transform group-hover:scale-110' />
							Get Started Now
							<ArrowRight className='size-4 ml-2 transition-transform group-hover:translate-x-1' />
						</Button>
					</Link>
				</motion.section>
			</div>
		</main>
	);
}
