import { ArrowRight, ExternalLink, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { WordReveal } from '@/components/word-reveal';

export function CloudResources() {
	return (
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
					Explore the source code and learn more about our privacy
					practices
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
	);
}
