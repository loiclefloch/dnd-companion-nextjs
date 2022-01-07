import { isString, isEmpty } from 'lodash';
import parse from 'html-react-parser';

function replaceTag(html, current, newTag, props) {

	return html
		.replaceAll(`<${current}>`, isEmpty(newTag) ? '' : `<${newTag} ${props}>`)
		.replaceAll(`</${current}>`, isEmpty(newTag) ? '' : `</${newTag}>`)
}

function HtmlContent({ html }) {
	if (!html) {
		return null
	}
	if (!isString(html)) {
		console.error(`Invalid HTML: ${html}`)
	}

	let finalHtml = replaceTag(html, "strong", "span", "className='font-semibold'")
	finalHtml = replaceTag(finalHtml, "em", "span", "className='italic'")
	finalHtml = replaceTag(finalHtml, "p", "p", "className='mb-2'")
	// add span to have valid html if it is not html but a simple string
	return parse(finalHtml);
}

export default HtmlContent