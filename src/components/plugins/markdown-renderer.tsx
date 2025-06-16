export function MarkdownRenderer({ content }: { content: string }) {
	const parseMarkdown = (text: string) => {
		return (
			text
				// Headers
				.replace(
					/^### (.*$)/gim,
					'<h3 class="text-xl font-semibold text-foreground mt-8 mb-4 pb-2 border-b">$1</h3>'
				)
				.replace(
					/^## (.*$)/gim,
					'<h2 class="text-2xl font-bold text-foreground mt-10 mb-6 pb-3 border-b border-border">$1</h2>'
				)
				.replace(
					/^# (.*$)/gim,
					'<h1 class="text-3xl font-bold text-foreground mt-12 mb-8 pb-4 border-b-2 border-primary/20">$1</h1>'
				)

				.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
					return `<code-block lang="${lang}">${code}</code-block>`;
				})

				// Inline code
				.replace(
					/`([^`]+)`/g,
					'<code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-sm text-accent-foreground/70 transition-all duration-300 mr-1">$1</code>'
				)

				// Bold and italic
				.replace(
					/\*\*([^*]+)\*\*/g,
					'<strong class="font-semibold text-foreground">$1</strong>'
				)
				.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')

				// Links
				.replace(
					/\[([^\]]+)\]\(([^)]+)\)/g,
					'<a href="$2" class="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
				)

				// Lists
				.replace(
					/^\* (.+$)/gim,
					'<li class="ml-4 mb-2 list-disc list-inside text-muted-foreground">$1</li>'
				)
				.replace(
					/^- (.+$)/gim,
					'<li class="ml-4 mb-2 list-disc list-inside text-muted-foreground">$1</li>'
				)

				// ✅ 7. Video before image
				.replace(
					/\n(https:\/\/github\.com\/\S+\/assets\/\d+\/[\w-]+)/g,
					'\n<div class="my-6 rounded-lg overflow-hidden border bg-muted/20"><video controls class="w-full"><source src="$1" type="video/mp4"></video></div>'
				)

				// ✅ 8. Images
				.replace(
					/!\[([^\]]*)\]\((https?:\/\/[^\s)]+(?:\)[^\s)]*)?)\)/g,
					'<div class="my-6 rounded-lg overflow-hidden border bg-muted/20"><img src="$2" alt="$1" class="w-full h-auto" loading="lazy" /></div>'
				)

				// 🔁 9. Paragraphs — should come *after* images/videos
				.replace(
					/\n\n/g,
					'</p><p class="text-muted-foreground leading-relaxed mb-4">'
				)
				.replace(
					/^(?!<[h1-6]|<li|<div|<pre)(.+$)/gim,
					'<p class="text-muted-foreground leading-relaxed mb-4">$1</p>'
				)
		);
	};

	return (
		<div
			className='prose-custom max-w-none'
			dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
		/>
	);
}
