import { Marked, Renderer } from '@ts-stack/markdown';
import React, { useEffect, useMemo, useState } from 'react';

interface MarkdownRendererProps {
	content: string | null;
}

class CustomRenderer extends Renderer {
	override heading(text: string, level: number) {
		const tag = `h${level}`;
		const baseClass = 'scroll-mt-20 font-semibold';
		const sizeClass =
			level === 1
				? 'text-4xl border-b border-muted pb-2 mb-4'
				: level === 2
					? 'text-3xl'
					: level === 3
						? 'text-xl'
						: 'text-base';

		return `<${tag} class="${baseClass} ${sizeClass}">${text}</${tag}>`;
	}

	override link(href: string, title: string | null, text: string) {
		const titleAttr = title ? `title="${title}"` : '';
		return `<a href="${href}" ${titleAttr} class="text-primary underline hover:text-primary/80 transition">${text}</a>`;
	}

	override code(code: string, language?: string | null) {
		const langClass = language ? `language-${language}` : '';
		return `<pre class="rounded-sm bg-muted px-1 py-0.5 font-mono text-sm"><code class="font-mono text-size-3 ${langClass}">${code}</code></pre>`;
	}

	override codespan(text: string) {
		return `<code class="text-accent-foreground/70 transition-all duration-300 mr-1 rounded-sm bg-muted px-1 py-0.5 font-mono text-sm">${text}</code>`;
	}

	override list(body: string, ordered: boolean) {
		const tag = ordered ? 'ol' : 'ul';
		const listClass = ordered ? 'list-decimal pl-6' : 'list-disc pl-6';
		return `<${tag} class="${listClass}">${body}</${tag}>`;
	}

	override blockquote(quote: string) {
		return `<blockquote class="border-l-4 border-muted pl-4 italic text-muted-foreground my-4">${quote}</blockquote>`;
	}

	override image(href: string, title: string | null, text: string) {
		const titleAttr = title ? `title="${title}"` : '';
		return `<img src="${href}" alt="${text}" ${titleAttr} class="rounded-md max-w-full mx-auto my-4 shadow-md" />`;
	}

	override table(header: string, body: string) {
		return `
      <table class="w-full border-collapse border border-muted my-6 text-size-3">
        <thead class="bg-muted/50">${header}</thead>
        <tbody>${body}</tbody>
      </table>
    `;
	}

	override tablerow(content: string) {
		return `<tr class="border-b border-muted">${content}</tr>`;
	}

	override tablecell(content: string, flags: { header: boolean }) {
		const tag = flags.header ? 'th' : 'td';
		const baseClass = flags.header
			? 'border border-muted px-4 py-2 text-left font-semibold'
			: 'border border-muted px-4 py-2';
		return `<${tag} class="${baseClass}">${content}</${tag}>`;
	}

	override paragraph(text: string) {
		return `<p class="mb-4 leading-relaxed">${text}</p>`;
	}

	override hr() {
		return `<hr class="my-8 border-muted" />`;
	}
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
	const [html, setHtml] = useState('');

	const renderer = useMemo(() => new CustomRenderer(), []);

	useEffect(() => {
		if (!content) {
			setHtml('');
			return;
		}

		try {
			Marked.setOptions({
				renderer,
				gfm: true,
				tables: true,
				breaks: false,
				pedantic: false,
				sanitize: false,
				smartLists: true,
				smartypants: false,
			});

			const rendered = Marked.parse(content);
			setHtml(rendered);
		} catch (error) {
			setHtml('<p>Error rendering markdown.</p>');
			console.error('Markdown rendering error:', error);
		}
	}, [content, renderer]);

	return (
		<article
			className='prose prose-invert max-w-full'
			style={{ color: 'var(--shadcn-prose-foreground)' }}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
