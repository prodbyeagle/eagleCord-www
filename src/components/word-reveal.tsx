'use client';

import { motion } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type Position = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for the `WordReveal` component.
 */
interface WordRevealProps extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * The text to animate.
	 */
	text: string;

	/**
	 * Delay before the animation starts (in seconds).
	 * Default: `0`
	 */
	delay?: number;

	/**
	 * Duration of each animation segment (in seconds).
	 * Default: `0.8`
	 */
	duration?: number;

	/**
	 * Speed between each word or letter animation (in seconds).
	 * Default: `0.2`
	 */
	speed?: number;

	/**
	 * Direction the text should animate from.
	 * Default: `'top'`
	 */
	position?: Position;

	/**
	 * Whether to animate per-letter instead of per-word.
	 * Default: `false`
	 */
	letter?: boolean;
}

/**
 * `WordReveal` animates a string of text by revealing each word or letter with a slide and blur effect.
 * Useful for attention-grabbing headlines or section titles.
 *
 * @example
 * ```tsx
 * <WordReveal text="Hello World" letter speed={0.1} delay={0.3} />
 * ```
 */
export function WordReveal({
	text,
	delay = 0,
	speed = 0.2,
	duration = 0.8,
	position = 'top',
	letter = false,
	...props
}: WordRevealProps) {
	/**
	 * Determines the initial offset for the animation based on the chosen direction.
	 */
	const getInitialOffset = () => {
		switch (position) {
			case 'bottom':
				return { y: -15 };
			case 'left':
				return { x: 15 };
			case 'right':
				return { x: -15 };
			case 'top':
			default:
				return { y: 15 };
		}
	};

	if (letter) {
		const letters = text.split('');

		return (
			<span className={cn('inline-block overflow-hidden')} {...props}>
				{letters.map((letterChar, i) => (
					<motion.span
						key={`${letterChar}-${i}`}
						className='inline-block'
						initial={{
							opacity: 0,
							...getInitialOffset(),
							filter: 'blur(5px)',
						}}
						animate={{
							opacity: 1,
							x: 0,
							y: 0,
							filter: 'blur(0px)',
						}}
						transition={{
							duration,
							delay: delay + i * speed,
							ease: [0.4, 0, 0.2, 1],
						}}>
						{letterChar === ' ' ? '\u00A0' : letterChar}
					</motion.span>
				))}
			</span>
		);
	}

	const words = text.split(' ');

	return (
		<span className={cn('inline-block overflow-hidden')} {...props}>
			{words.map((word, i) => (
				<motion.span
					key={`${word}-${i}`}
					className='inline-block pr-3'
					initial={{
						opacity: 0,
						...getInitialOffset(),
						filter: 'blur(5px)',
					}}
					animate={{
						opacity: 1,
						x: 0,
						y: 0,
						filter: 'blur(0px)',
					}}
					transition={{
						duration,
						delay: delay + i * speed,
						ease: [0.4, 0, 0.2, 1],
					}}>
					{word}
				</motion.span>
			))}
		</span>
	);
}
