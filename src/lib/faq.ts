import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface FaqItem {
	slug: string;
	title: string;
	tags: string[];
	content: string;
}

const FAQ_DIR = path.join(process.cwd(), '/content/faq');

export async function getAllFaqs(): Promise<FaqItem[]> {
	const files = await fs.readdir(FAQ_DIR);
	const faqs = await Promise.all(
		files.map(async (file) => {
			const filePath = path.join(FAQ_DIR, file);
			const raw = await fs.readFile(filePath, 'utf8');
			const { content, data } = matter(raw);

			return {
				slug: file.replace(/\.mdx?$/, ''),
				title: data.title,
				tags: data.tags ?? [],
				content,
			} satisfies FaqItem;
		})
	);

	return faqs.sort((a, b) => a.title.localeCompare(b.title));
}

export function getStructuredData(faqs: FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.title,
			acceptedAnswer: {
				'@type': 'Answer',
				text: f.content,
			},
		})),
	};
}
