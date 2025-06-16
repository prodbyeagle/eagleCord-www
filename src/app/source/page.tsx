import { type Metadata } from 'next';

import RepoCard from '@/components/repo-card';

import { SOURCE_CODE } from '@/lib/constants';
import { getEnv } from '@/lib/env';

export const metadata: Metadata = {
	title: 'Source Code',
	description: 'List of source code repositories for all Vencord projects',
};

type RepoEntry = {
	name: string;
	description: string;
	repo: string;
};

const repos: RepoEntry[] = [
	{
		name: 'eagleCord-www',
		description: 'Repository for the EagleCord / Vencord Rebuild Website.',
		repo: 'prodbyeagle/vencord-www',
	},
	{
		name: 'EagleCord',
		description: "Vencord's main repository containing all inbuilt plugins",
		repo: 'prodbyeagle/cord',
	},
	{
		name: 'Vencord',
		description: "Vencord's main repository containing all inbuilt plugins",
		repo: 'Vendicated/Vencord',
	},
	{
		name: 'Vencord Installer',
		description: "Vencord's Installer",
		repo: 'Vencord/Installer',
	},
	{
		name: 'vencord.dev',
		description: "Vencord's official website (the one you're currently on)",
		repo: 'Vencord/vencord.dev',
	},
	{
		name: 'Vesktop',
		description:
			"Vencord's standalone desktop app, offering you a more lightweight, faster and more secure solution for using Vencord",
		repo: 'Vencord/Vesktop',
	},
	{
		name: 'Vencloud',
		description:
			"Vencord's backend providing you with features like settings sync",
		repo: 'Vencord/Vencloud',
	},
	{
		name: 'venmic',
		description:
			'Native node module that powers Linux Audio screenshare on Vesktop',
		repo: 'Vencord/venmic',
	},
];

async function fetchRepoInfo(repo: string, token: string) {
	const res = await fetch(`https://api.github.com/repos/${repo}`, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${token}`,
			'User-Agent': SOURCE_CODE,
		},
		cache: 'force-cache',
	});

	if (!res.ok) {
		console.error(`Failed to fetch ${repo}: ${res.statusText}`);
		return null;
	}

	const data = await res.json();
	return data;
}

export default async function SourceCodePage() {
	const token = getEnv(process.env, 'GITHUB_TOKEN');

	const repoData = await Promise.all(
		repos.map(async (entry) => {
			const data = await fetchRepoInfo(entry.repo, token);
			if (!data) return null;
			return { ...entry, data };
		})
	);

	return (
		<main className='py-20'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-8'>
				<div className='text-center space-y-2'>
					<h1 className='text-4xl font-bold text-foreground'>
						Source Code
					</h1>
					<p className='text-muted-foreground text-lg'>
						Vencord&apos;s Git repositories
					</p>
				</div>

				<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
					{repoData.map(
						(repo, i) =>
							repo && (
								<RepoCard
									key={i}
									name={repo.name}
									description={repo.description}
									// repo={repo.repo}
									data={repo.data}
								/>
							)
					)}
				</div>
			</div>
		</main>
	);
}
