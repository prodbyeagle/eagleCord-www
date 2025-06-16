import { DownloadTabs } from '@/components/download';

export const metadata = {
	title: 'Download',
	description: 'Download Vencord for Desktop or your favourite Browser',
};

export default function DownloadPage() {
	return (
		<main className='py-20'>
			<div className='max-w-screen-lg mx-auto px-4 sm:px-6 space-y-10'>
				<h1 className='text-4xl font-bold text-center text-[--accent-purple]'>
					Download Vencord
				</h1>

				<DownloadTabs />
			</div>
		</main>
	);
}
