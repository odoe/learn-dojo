const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formatter = new Intl.DateTimeFormat('en-US', options);

export function dateFormatter(date: Date) {
	return formatter.format(date);
}
