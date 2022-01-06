import createNativeElement from './createNativeElement';

export default createNativeElement('P', 'p', (props, children) => {
	if (typeof children !== "string") {
		console.warn(`P has not a string as children`)
	}
});
