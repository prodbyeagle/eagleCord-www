'use client';

import { useEffect, useState } from 'react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import { MarkdownRenderer } from '../plugins/markdown-renderer';

interface FaqItemProps {
	slug: string;
	title: string;
	content: string;
}

export function FaqAccordion({ items }: { items: FaqItemProps[] }) {
	const [openValue, setOpenValue] = useState<string | undefined>(undefined);

	useEffect(() => {
		const faqTitle = location.hash.slice(1);
		if (faqTitle && items.some((item) => item.slug === faqTitle)) {
			setOpenValue(faqTitle);
			setTimeout(() => {
				const el = document.querySelector(
					`[data-faq-title="${faqTitle}"]`
				);
				if (el) el.scrollIntoView({ behavior: 'smooth' });
			}, 100);
		}
	}, [items]);

	return (
		<Accordion
			type='single'
			collapsible
			className='w-full'
			value={openValue}
			onValueChange={setOpenValue}>
			{items.map(({ slug, title, content }) => (
				<AccordionItem
					key={slug}
					value={slug}
					data-faq-title={slug}
					className='rounded-lg backdrop-blur-sm border p-2'>
					<AccordionTrigger className='font-semibold cursor-pointer ml-3'>
						{title}
					</AccordionTrigger>
					<AccordionContent className='mt-2 text-muted-foreground'>
						<div className='mt-2 rounded-md bg-card p-4 text-muted-foreground prose prose-sm sm:prose-base max-w-none'>
							<MarkdownRenderer content={content} />
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
