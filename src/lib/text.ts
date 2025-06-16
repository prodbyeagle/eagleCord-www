export function humanFriendlyJoin<T>(
	elements: T[],
	mapper: (e: T) => string
): string;
export function humanFriendlyJoin<T>(
	elements: T[],
	mapper: (e: T) => string = (s: T) => String(s)
): string {
	const { length } = elements;
	if (length === 0) return '';
	if (length === 1) return mapper(elements[0]);

	let s = '';

	for (let i = 0; i < length; i++) {
		s += mapper(elements[i]);
		if (length - i > 2) s += ', ';
		else if (length - i > 1) s += ' and ';
	}

	return s;
}
