'use client';

import { ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';

import { getLanguageColor } from '@/lib/languageColors';
import { cn } from '@/lib/utils';

export interface RepoCardProps {
	name: string;
	description: string;
	data: {
		language?: string;
		owner: {
			login: string;
			avatar_url: string;
		};
		stars_count?: number;
		stargazers_count?: number;
		html_url: string;
	};
}

export default function RepoCard({ name, description, data }: RepoCardProps) {
	const { language, owner, stars_count, stargazers_count, html_url } = data;

	const starCount = stars_count ?? stargazers_count ?? 0;
	const stars =
		starCount > 1000 ? `${(starCount / 1000).toFixed(1)}k` : starCount;

	const langColor = getLanguageColor(language ?? '');

	return (
		<a
			href={html_url}
			target='_blank'
			rel='noopener noreferrer'
			className={cn(
				'group relative rounded-lg border p-4 transition-shadow',
				'hover:shadow-md bg-background border-border'
			)}>
			<span className='absolute right-3 top-3 text-muted-foreground transition-colors group-hover:text-foreground'>
				<ExternalLink size={16} />
			</span>

			<div className='mb-3 flex items-center gap-2 text-sm text-muted-foreground'>
				<Image
					src={`${owner.avatar_url}&size=64`}
					alt={`${owner.login}'s avatar`}
					width={20}
					height={20}
					className='rounded-full'
				/>
				<span>{owner.login}</span>
			</div>

			<h3 className='text-lg font-semibold leading-tight text-foreground'>
				{name}
			</h3>

			<p className='my-2 text-sm text-muted-foreground'>{description}</p>

			<div className='mt-4 flex items-center gap-4 text-sm text-muted-foreground'>
				{language && (
					<span className='flex items-center gap-2'>
						<span
							className='inline-block size-3 rounded-full'
							style={{ backgroundColor: langColor }}
						/>
						{language}
					</span>
				)}

				<span className='flex items-center gap-1'>
					<Star size={16} />
					{stars}
				</span>
			</div>
		</a>
	);
}
