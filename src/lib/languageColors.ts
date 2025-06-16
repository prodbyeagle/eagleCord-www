import colors from './lang.json';

export function getLanguageColor(lang: string): string {
	if (lang in colors) {
		return colors[lang as keyof typeof colors];
	}
	return '#000000';
}
