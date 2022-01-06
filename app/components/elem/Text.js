import createNativeElement from './createNativeElement';

export default createNativeElement('Text', 'span', (props, children) => {
	if (children) {
		if (typeof children !== "string") {
			console.warn(`Text has not a string as children`)
		}
	}
});

