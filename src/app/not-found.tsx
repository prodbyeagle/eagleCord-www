import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function NotFoundPage() {
	return (
		<main className='relative flex min-h-screen flex-col items-center justify-center px-4 py-12'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1 text-center'>
					<CardTitle className='text-2xl'>
						😵 Page Not Found
					</CardTitle>
					<CardDescription className='text-base'>
						The page you&apos;re looking for doesn&apos;t exist or
						has been moved.
					</CardDescription>
				</CardHeader>

				<CardContent className='text-center'>
					<p className='text-base text-muted-foreground'>
						Check the URL or head back to the homepage.
					</p>
				</CardContent>

				<CardFooter className='flex justify-center'>
					<Button className='group' variant='outline' asChild>
						<Link href='/'>
							<ArrowLeft className='size-4 mr-1 group-hover:-translate-x-1 transition-all duration-200' />
							Go Back Home
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
