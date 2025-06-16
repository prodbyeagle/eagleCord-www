import { Button } from "@/components/ui/button";
import type { FilterCriterion } from "./types";

export function PluginListFilters({
	criteria,
	onToggle,
}: {
	criteria: FilterCriterion[];
	onToggle: (index: number) => void;
}) {
	return (
		<div className='flex w-full gap-1 mb-6'>
			{criteria.map((c, index) => {
				const Icon = c.icon;
				return (
					<Button
						key={c.name}
						variant='outline'
						onClick={() => onToggle(index)}
						className={`flex-1 justify-center gap-2 ${
							c.state
								? 'bg-primary text-primary-foreground border-primary shadow-sm'
								: 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
						}`}>
						<Icon className='size-4' />
						{c.name}
					</Button>
				);
			})}
		</div>
	);
}
