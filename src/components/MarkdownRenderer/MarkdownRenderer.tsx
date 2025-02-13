import React from "react";
import { Remarkable } from "remarkable";
import { pipeToSpan } from "@plugins/pipeToSpan";
// import excToSpan from "@plugins/excToSpan.js";

interface Props {
	text: string;
}

export const MarkdownRenderer: React.FC<Props> = ({ text }) => {
	const md = new Remarkable();

	md.use(pipeToSpan);

	const renderedHTML = md.render(text);

	return (
		<div
			className='
				font-videotext 
				leading-[100%] 
				uppercase 
				text-black
				text-balance
				break-words
				w-[70%]
				text-[48px]
				md:text-[50px]
				lg:text-[62px]
				xl:text-[86px]
			'
			dangerouslySetInnerHTML={{ __html: renderedHTML }}
		/>
	);
};

export default MarkdownRenderer;
