import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface Props {
	title: string;
	description: string;
	status: 'available' | 'coming-soon';
	icon: React.ComponentType<{ className?: string }>;
}

export function CloudFeatureCard({
	title,
	description,
	icon: Icon,
	status,
}: Props) {
	return (
		<Card
			className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
				status === 'available'
					? 'ring-2 ring-primary/20 bg-primary/5'
					: ''
			}`}>
			<CardHeader className='pb-4'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-3'>
						<div
							className={`p-2 rounded-lg transition-colors ${
								status === 'available'
									? 'bg-primary/10 text-primary'
									: 'bg-muted text-muted-foreground'
							}`}>
							<Icon className='size-5' />
						</div>
						<div>
							<CardTitle className='text-lg group-hover:text-primary transition-colors'>
								{title}
							</CardTitle>
						</div>
					</div>
					<Badge
						variant={
							status === 'available' ? 'default' : 'secondary'
						}
						className='text-xs'>
						{status === 'available' ? 'Available' : 'Coming Soon'}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className='pt-0'>
				<CardDescription className='text-sm leading-relaxed'>
					{description}
				</CardDescription>
			</CardContent>
		</Card>
	);
}
