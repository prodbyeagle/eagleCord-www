import { containerVariants, itemVariants } from '@/constants/animation';
import { Settings, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { WordReveal } from '../word-reveal';
import { CloudFeatureCard } from './feature-card';

const features = [
	{
		title: 'Settings Sync',
		description:
			'Seamlessly synchronize your Vencord settings across all your devices',
		icon: Settings,
		status: 'available',
	},
	{
		title: 'More Coming Soon',
		description: '???',
		icon: Sparkles,
		status: 'coming-soon',
	},
] as const;

export function CloudFeaturesSection() {
	return (
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
					Unlock the full potential of Vencord with our cloud-powered
					enhancements
				</motion.p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				{features.map((f) => (
					<motion.div key={f.title} variants={itemVariants}>
						<CloudFeatureCard {...f} />
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}
