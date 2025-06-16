import { Cloud, Shield } from 'lucide-react';
import { motion } from 'motion/react';

import { WordReveal } from '@/components/word-reveal';

export function CloudHero() {
	return (
		<section className='text-center space-y-8'>
			<motion.div
				className='flex justify-center mb-8'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}>
				<div className='relative'>
					<motion.div
						className='absolute inset-0 bg-gradient-to-r from-primary/30 to-69% to-primary/60 rounded-full blur-3xl'
						animate={{
							scale: [1, 2.5, 1],
							opacity: [0.2, 0.8, 0.5],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
					<div className='relative bg-gradient-to-br from-primary to-69% to-primary/10 p-6 rounded-3xl shadow-xl'>
						<Cloud className='size-16 text-foreground' />
					</div>
				</div>
			</motion.div>

			<div className='space-y-6'>
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight'>
					<WordReveal
						text='Cloud is now in Vencord!'
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
						features with Vencord&apos;s cloud integration. Your
						settings, themes, and preferences follow you everywhere
						while maintaining complete privacy.
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
	);
}
