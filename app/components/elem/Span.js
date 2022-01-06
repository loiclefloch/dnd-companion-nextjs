import createNativeElement from './createNativeElement';

export default createNativeElement('Span', 'span', (props, children) => {
	if (children) {
		if (typeof children === "string") {
			console.warn(`Span has string as children`)
		}
	}
});

