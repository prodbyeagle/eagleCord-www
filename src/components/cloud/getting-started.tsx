import { motion, type Variants } from 'motion/react';

import { WordReveal } from '@/components/word-reveal';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: 'easeOut' },
	},
};

const steps = [
	{
		id: 1,
		title: 'Open Settings',
		description:
			'Go to the Vencord settings section inside Discord, and visit the Cloud Section.',
	},
	{
		id: 2,
		title: 'Enable Integration',
		description: 'Toggle the “Enable Cloud Integrations” switch.',
	},
	{
		id: 3,
		title: 'Authorize & Sync',
		description:
			'Authorize access and enjoy synchronization across all devices. Thats it! 😱',
	},
];

export function CloudGettingStarted() {
	return (
		<motion.section
			className='space-y-12'
			variants={sectionVariants}
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
				<motion.p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
					Set up cloud integration in just a few simple steps.
				</motion.p>
			</div>

			<div className='grid gap-6 sm:grid-cols-3'>
				{steps.map((step) => (
					<Card key={step.id}>
						<CardHeader className='flex flex-row items-center gap-3 pb-2'>
							<div className='size-8 shrink-0 rounded-full bg-primary/10 text-primary font-medium flex items-center justify-center'>
								{step.id}
							</div>
							<CardTitle className='text-base'>
								{step.title}
							</CardTitle>
						</CardHeader>
						<CardContent className='pl-11 text-sm text-muted-foreground leading-relaxed'>
							{step.description}
						</CardContent>
					</Card>
				))}
			</div>
		</motion.section>
	);
}
