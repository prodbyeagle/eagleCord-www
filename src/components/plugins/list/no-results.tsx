import { Search } from 'lucide-react';

export function NoResults({
	hasFilters,
	onClear,
}: {
	hasFilters: boolean;
	onClear: () => void;
}) {
	return (
		<div className='flex flex-col items-center justify-center py-24 text-center'>
			<div className='size-16 rounded-full bg-muted flex items-center justify-center mb-6'>
				<Search className='size-8 text-muted-foreground' />
			</div>
			<h3 className='text-xl font-semibold mb-2'>No plugins found</h3>
			<p className='text-muted-foreground mb-6 max-w-md'>
				Try adjusting your search terms or filters.
			</p>
			{hasFilters && (
				<button
					onClick={onClear}
					className='px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90'>
					Clear all filters
				</button>
			)}
		</div>
	);
}
