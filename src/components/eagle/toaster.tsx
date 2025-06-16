'use client';

import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

/**
 * A themed toast notification container that integrates with `next-themes`.
 *
 * @returns A `Sonner` toast container component with monospace font and top-left positioning.
 *
 * @example
 * ```tsx
 * <Toaster />
 * ```
 *
 * @author prodbyeagle
 */
export function Toaster() {
	const { resolvedTheme } = useTheme();

	return (
		<SonnerToaster
			className='font-mono'
			richColors
			position='top-left'
			theme={resolvedTheme as ToasterProps['theme']}
		/>
	);
}
