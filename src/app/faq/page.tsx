import { type Metadata } from 'next';

import { FaqAccordion } from '@/components/faq/item';

import { getAllFaqs, getStructuredData } from '@/lib/faq';

export const metadata: Metadata = {
	title: 'Frequently Asked Questions',
	description: 'Browse answers to frequently asked questions about Vencord',
};

export default async function FaqPage() {
	const faqs = await getAllFaqs();
	const structuredData = getStructuredData(faqs);

	return (
		<>
			<main className='py-20'>
				<div className='max-w-3xl mx-auto px-4 sm:px-6 space-y-12'>
					<header className='text-center space-y-2'>
						<h1 className='text-3xl sm:text-4xl font-bold'>
							Frequently Asked Questions
						</h1>
						<p className='text-muted-foreground text-lg'>
							Questions that we&apos;re asked often.
						</p>
					</header>

					<section className='space-y-6'>
						{faqs.map((faq) => (
							<FaqAccordion key={faq.slug} items={[faq]} />
						))}
					</section>

					<footer className='text-center text-sm text-muted-foreground'>
						<p>
							Still lost? Visit our{' '}
							<a
								href='/discord'
								className='underline hover:opacity-65 transition-all'>
								support server
							</a>{' '}
							for more assistance!
						</p>
					</footer>
				</div>
			</main>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
		</>
	);
}
