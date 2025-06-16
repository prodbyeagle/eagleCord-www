import { ExternalLink, GitFork, Star } from 'lucide-react';
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
		forks_count?: number;
		html_url: string;
		updated_at?: string;
	};
}

export default function RepoCard({ name, description, data }: RepoCardProps) {
	const {
		language,
		owner,
		stars_count,
		stargazers_count,
		forks_count,
		html_url,
		updated_at,
	} = data;

	const starCount = stars_count ?? stargazers_count ?? 0;
	const stars =
		starCount > 1000
			? `${(starCount / 1000).toFixed(1)}k`
			: starCount.toLocaleString();

	const forks =
		forks_count && forks_count > 1000
			? `${(forks_count / 1000).toFixed(1)}k`
			: forks_count?.toLocaleString();

	const langColor = getLanguageColor(language ?? '');

	const formatDate = (dateString?: string) => {
		if (!dateString) return null;
		const date = new Date(dateString);
		const now = new Date();
		const diffInDays = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
		);

		if (diffInDays === 0) return 'today';
		if (diffInDays === 1) return 'yesterday';
		if (diffInDays < 30) return `${diffInDays} days ago`;
		if (diffInDays < 365)
			return `${Math.floor(diffInDays / 30)} months ago`;
		return `${Math.floor(diffInDays / 365)} years ago`;
	};

	return (
		<a
			href={html_url}
			target='_blank'
			rel='noopener noreferrer'
			className={cn(
				'group relative flex flex-col rounded-xl border p-5 transition-all duration-200',
				'hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5',
				'bg-card border-border hover:border-border/80',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
			)}
			aria-label={`View ${name} repository by ${owner.login}`}>
			{/* Header with owner info and external link */}
			<div className='flex items-center justify-between mb-3'>
				<div className='flex items-center gap-2.5'>
					<div className='relative'>
						<Image
							src={`${owner.avatar_url}&size=64`}
							alt={`${owner.login}'s avatar`}
							width={24}
							height={24}
							className='rounded-full ring-1 ring-border'
						/>
					</div>
					<span className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
						{owner.login}
					</span>
				</div>

				<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
					<ExternalLink className='size-4 text-muted-foreground group-hover:text-foreground transition-colors' />
				</div>
			</div>

			{/* Repository name */}
			<h3 className='text-lg font-semibold leading-tight text-foreground mb-2 group-hover:text-primary transition-colors'>
				{name}
			</h3>

			{/* Description */}
			<p className='text-sm text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed'>
				{description || 'No description available'}
			</p>

			{/* Stats and metadata */}
			<div className='flex items-center justify-between mt-auto'>
				<div className='flex items-center gap-4'>
					{language && (
						<div className='flex items-center gap-1.5'>
							<span
								className='inline-block size-3 rounded-full ring-1 ring-black/10'
								style={{ backgroundColor: langColor }}
								aria-label={`Language: ${language}`}
							/>
							<span className='text-xs font-medium text-muted-foreground'>
								{language}
							</span>
						</div>
					)}

					<div className='flex items-center gap-1'>
						<Star className='size-3.5 text-muted-foreground' />
						<span className='text-xs font-medium text-muted-foreground'>
							{stars}
						</span>
					</div>

					{forks_count !== undefined && forks_count > 0 && (
						<div className='flex items-center gap-1'>
							<GitFork className='size-3.5 text-muted-foreground' />
							<span className='text-xs font-medium text-muted-foreground'>
								{forks}
							</span>
						</div>
					)}
				</div>

				{updated_at && (
					<span className='text-xs text-muted-foreground/80'>
						Updated {formatDate(updated_at)}
					</span>
				)}
			</div>
		</a>
	);
}
