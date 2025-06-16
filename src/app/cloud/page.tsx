'use client';

import {
	ArrowRight,
	Cloud,
	ExternalLink,
	Settings,
	Shield,
	Sparkles,
	Zap,
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { WordReveal } from '@/components/word-reveal';

interface CloudFeature {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	status: 'available' | 'coming-soon';
}

const features: CloudFeature[] = [
	{
		title: 'Settings Sync',
		description:
			'Seamlessly synchronize your Vencord settings across all your devices',
		icon: Settings,
		status: 'available',
	},
	{
		title: 'Theme Backup',
		description: 'Automatically backup and restore your custom themes',
		icon: Sparkles,
		status: 'coming-soon',
	},
	{
		title: 'Plugin Profiles',
		description: 'Create and share different plugin configurations',
		icon: Settings,
		status: 'coming-soon',
	},
	{
		title: 'Enhanced Performance',
		description:
			'Cloud-powered optimizations for faster Discord experience',
		icon: Zap,
		status: 'coming-soon',
	},
];

const steps = [
	{
		step: '1',
		title: 'Open Vencord Settings',
		description: 'Navigate to the Vencord settings section inside Discord',
	},
	{
		step: '2',
		title: 'Enable Cloud Integration',
		description: 'Toggle the "Enable Cloud Integrations" switch',
	},
	{
		step: '3',
		title: 'Authorize Access',
		description:
			'Complete the authorization process to connect your account',
	},
	{
		step: '4',
		title: 'Configure Features',
		description: 'Enable specific cloud features that you want to use',
	},
];

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: 'easeOut',
		},
	},
};

export default function CloudPage() {
	return (
		<main className='py-16'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-20'>
				<section className='text-center space-y-8'>
					<motion.div
						className='flex justify-center mb-8'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}>
						<div className='relative'>
							<motion.div
								className='absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-full blur-3xl'
								animate={{
									scale: [1, 1.1, 1],
									opacity: [0.5, 0.8, 0.5],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: 'easeInOut',
								}}
							/>
							<div className='relative bg-gradient-to-r from-primary to-accent p-6 rounded-3xl shadow-xl'>
								<Cloud className='size-16 text-white' />
							</div>
						</div>
					</motion.div>

					<div className='space-y-6'>
						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight'>
							<WordReveal
								text='Cloud Now in your Vencord!!'
								speed={0.15}
								duration={0.6}
								delay={0.5}
							/>
						</h1>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.8 }}
							className='space-y-4'>
							<p className='text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
								Experience seamless synchronization and enhanced
								features with Vencord&apos;s cloud integration.
								Your settings, themes, and preferences follow
								you everywhere while maintaining complete
								privacy.
							</p>
						</motion.div>

						<motion.div
							className='flex items-center justify-center gap-2 text-sm text-muted-foreground'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 2.2 }}>
							<Shield className='size-4 text-green-500' />
							<span>Privacy-first • Optional • Secure</span>
						</motion.div>
					</div>
				</section>

				{/* Features Section */}
				<motion.section
					className='space-y-12'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}>
					<div className='text-center space-y-4'>
						<h2 className='text-3xl sm:text-4xl font-bold text-foreground'>
							<WordReveal
								text='Powerful Cloud Features'
								speed={0.1}
								delay={0}
							/>
						</h2>
						<motion.p
							className='text-lg text-muted-foreground max-w-2xl mx-auto'
							variants={itemVariants}>
							Unlock the full potential of Vencord with our
							cloud-powered enhancements
						</motion.p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
						{features.map((feature) => {
							const IconComponent = feature.icon;
							return (
								<motion.div
									key={feature.title}
									variants={itemVariants}>
									<Card
										className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
											feature.status === 'available'
												? 'ring-2 ring-primary/20 bg-primary/5'
												: ''
										}`}>
										<CardHeader className='pb-4'>
											<div className='flex items-start justify-between'>
												<div className='flex items-center gap-3'>
													<div
														className={`p-2 rounded-lg transition-colors ${
															feature.status ===
															'available'
																? 'bg-primary/10 text-primary'
																: 'bg-muted text-muted-foreground'
														}`}>
														<IconComponent className='size-5' />
													</div>
													<div>
														<CardTitle className='text-lg group-hover:text-primary transition-colors'>
															{feature.title}
														</CardTitle>
													</div>
												</div>
												<Badge
													variant={
														feature.status ===
														'available'
															? 'default'
															: 'secondary'
													}
													className='text-xs'>
													{feature.status ===
													'available'
														? 'Available'
														: 'Coming Soon'}
												</Badge>
											</div>
										</CardHeader>
										<CardContent className='pt-0'>
											<CardDescription className='text-sm leading-relaxed'>
												{feature.description}
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</motion.section>

				{/* Getting Started Section */}
				<motion.section
					className='space-y-12'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}>
					<div className='text-center space-y-4'>
						<h2 className='text-3xl sm:text-4xl font-bold text-foreground'>
							<WordReveal
								text='Getting Started'
								speed={0.12}
								delay={0.2}
							/>
						</h2>
						<motion.p
							className='text-lg text-muted-foreground max-w-2xl mx-auto'
							variants={itemVariants}>
							Set up cloud integration in just a few simple steps
						</motion.p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{steps.map((step, index) => (
							<motion.div
								key={step.step}
								className='relative'
								variants={itemVariants}>
								<Card className='h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group'>
									<CardHeader className='pb-4'>
										<div className='flex items-center gap-3 mb-2'>
											<div className='bg-primary text-primary-foreground rounded-full size-8 flex items-center justify-center text-sm font-bold'>
												{step.step}
											</div>
											<CardTitle className='text-lg group-hover:text-primary transition-colors'>
												{step.title}
											</CardTitle>
										</div>
									</CardHeader>
									<CardContent className='pt-0'>
										<CardDescription className='text-sm leading-relaxed'>
											{step.description}
										</CardDescription>
									</CardContent>
								</Card>

								{index < steps.length - 1 && (
									<div className='hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10'>
										<ArrowRight className='size-6 text-muted-foreground' />
									</div>
								)}
							</motion.div>
						))}
					</div>

					<motion.div variants={itemVariants}>
						<Card className='bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20'>
							<CardContent className='p-6 space-y-4'>
								<div className='flex items-start gap-4'>
									<div className='bg-primary/10 p-2 rounded-lg'>
										<Settings className='size-6 text-primary' />
									</div>
									<div className='space-y-2'>
										<h3 className='font-semibold text-foreground'>
											<WordReveal
												text='Quick Setup Guide'
												speed={0.08}
												delay={0}
											/>
										</h3>
										<div className='space-y-2 text-sm text-muted-foreground'>
											<p>
												To start using our cloud
												integration, head over to the{' '}
												<strong className='text-foreground'>
													Vencord settings section
												</strong>{' '}
												inside Discord and check the{' '}
												<strong className='text-foreground'>
													&quot;Enable Cloud
													Integrations&quot;
												</strong>{' '}
												switch.
											</p>
											<p>
												After authorizing, you&apos;re
												ready to go! You can now enable
												specific features on the same
												page and enjoy seamless
												synchronization across all your
												devices.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.section>

				{/* Links Section */}
				<motion.section
					className='space-y-8'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<div className='text-center space-y-4'>
						<h2 className='text-3xl sm:text-4xl font-bold text-foreground'>
							<WordReveal
								text='Resources & Support'
								speed={0.1}
								delay={0.3}
							/>
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							Explore the source code and learn more about our
							privacy practices
						</p>
					</div>

					<div className='flex flex-col sm:flex-row justify-center gap-4'>
						<Link
							href='https://github.com/Vencord/Vencloud'
							target='_blank'
							rel='noopener noreferrer'>
							<Button
								variant='outline'
								size='lg'
								className='w-full sm:w-auto group'>
								<ExternalLink className='size-4 mr-2 transition-transform group-hover:scale-110' />
								View Source Code
								<ArrowRight className='size-4 ml-2 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
						<Link href='/cloud/privacy'>
							<Button
								variant='outline'
								size='lg'
								className='w-full sm:w-auto group'>
								<Shield className='size-4 mr-2 transition-transform group-hover:scale-110' />
								Privacy Policy
							</Button>
						</Link>
					</div>
				</motion.section>

				{/* CTA Section */}
				<motion.section
					className='text-center space-y-6 py-12'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					<div className='space-y-4'>
						<h3 className='text-2xl sm:text-3xl font-bold text-foreground'>
							<WordReveal
								text='Ready to Experience Cloud-Powered Vencord?'
								speed={0.08}
								delay={0}
							/>
						</h3>
						<p className='text-muted-foreground max-w-xl mx-auto'>
							Join the future of Discord customization with
							seamless cloud integration.
						</p>
					</div>
					<Button size='lg' className='group'>
						<Cloud className='size-4 mr-2 transition-transform group-hover:scale-110' />
						Enable Cloud Features
						<ArrowRight className='size-4 ml-2 transition-transform group-hover:translate-x-1' />
					</Button>
				</motion.section>
			</div>
		</main>
	);
}
