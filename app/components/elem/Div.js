import createNativeElement from './createNativeElement';

export default createNativeElement('Div', 'div', (props, children) => {
	if (typeof children === "string") {
		console.warn(`Div has string as children`)
	}
});
