import { Code } from '@/components/eagle/code';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';
import { WordReveal } from '@/components/word-reveal';

export default function CloudPrivacyPolicyPage() {
	return (
		<main className='py-20'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-12'>
				<div className='text-center space-y-4'>
					<WordReveal
						text='Vencord Cloud Privacy Policy'
						letter
						speed={0.02}
						className='text-4xl sm:text-5xl font-bold text-foreground'
					/>
					<p className='text-lg text-muted-foreground mt-4'>
						Last Updated: 26/03/2023
					</p>
				</div>

				<section className='space-y-4'>
					<WordReveal
						text='Introduction'
						letter
						speed={0.02}
						delay={0.2}
						className='text-3xl font-bold'
					/>
					<div className='space-y-4 text-muted-foreground mt-2'>
						<p>
							This privacy policy applies to our cloud services,
							which you need to explicitly enable. If you
							don&apos;t enable the cloud, Vencord will not
							collect any data about you whatsoever.
						</p>
						<p>
							Our website might collect data about you via our
							hosting provider Vercel. You can find out more about
							this in our GDPR policy linked below.
						</p>
						<p>
							We take your privacy very seriously. As such, we
							collect as little information as possible and only
							use it for the purposes absolutely necessary to
							provide our services.
						</p>
						<p>
							This is a simple summary for normal people. We also
							have a proper GDPR policy.
						</p>
					</div>
				</section>

				<section className='space-y-4'>
					<WordReveal
						text='The information we store'
						letter
						speed={0.02}
						delay={0.4}
						className='text-3xl font-bold'
					/>
					<ul className='space-y-3 text-muted-foreground mt-2'>
						<li className='flex gap-3'>
							<span className='text-foreground'>•</span>
							<span>
								The{' '}
								<HoverCard>
									<HoverCardTrigger asChild>
										<Code className='underline decoration-dotted hover:cursor-help'>
											SHA-1
										</Code>
									</HoverCardTrigger>
									<HoverCardContent
										side='top'
										className='text-sm w-96'>
										<p>
											We store a secure SHA-1 hash of your
											Discord user ID, for example like
											this:
										</p>
										<div className='mt-2 font-mono break-all text-muted-foreground'>
											8c7dd922ad47494fc02c388e12c00eacb83efb45
										</div>
										<p className='mt-2'>
											This helps identify you without
											storing your raw ID.
										</p>
									</HoverCardContent>
								</HoverCard>
								hash of your Discord user ID — to uniquely
								identify and safe your data.
							</span>
						</li>
						<li className='flex gap-3'>
							<span className='text-foreground'>•</span>
							<span>
								Your Vencord settings, stored as plain JSON — to
								sync your settings across devices.
							</span>
						</li>
					</ul>
				</section>

				<section className='space-y-4'>
					<WordReveal
						text='How we use your information'
						letter
						speed={0.02}
						delay={0.6}
						className='text-3xl font-bold'
					/>
					<p className='text-muted-foreground mt-2'>
						We will only use your data for the purposes listed
						above. We will never share your data with any third
						parties unless required by law.
					</p>
				</section>

				<section className='space-y-4'>
					<WordReveal
						text='Data Retention'
						letter
						speed={0.02}
						delay={0.8}
						className='text-3xl font-bold'
					/>
					<p className='text-muted-foreground mt-2'>
						We retain your data only as long as it&apos;s needed.
						You can delete it anytime using the
						<strong className='text-foreground'>
							{' '}
							Erase All Data
						</strong>{' '}
						button in the Vencord Cloud settings or by emailing us
						at
						<a
							href='mailto:privacy@vencord.dev'
							className='underline ml-1 text-foreground hover:text-primary transition-colors'>
							privacy@vencord.dev
						</a>
						.
					</p>
				</section>

				<section className='space-y-4'>
					<WordReveal
						text='Changes to this Privacy Policy'
						letter
						speed={0.02}
						delay={1}
						className='text-3xl font-bold'
					/>
					<p className='text-muted-foreground mt-2'>
						We will update this policy if necessary, such as when
						adding new services. You&apos;ll be notified via our
						Discord announcements channel. The last updated date
						will always be displayed at the top.
					</p>
				</section>
			</div>
		</main>
	);
}
