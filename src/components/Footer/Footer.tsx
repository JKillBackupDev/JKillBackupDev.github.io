import React from "react";
import strings from "@locales/en.json";

type Props = {};

const Footer: React.FC<Props> = () => {
	return (
		<footer className='flex flex-col w-full items-center justify-center bg-black py-[100px] z-15'>
			<p className='font-pixelscript text-[36px] md:text-[48px] leading-[125%] mb-[50px] text-white text-center'>
				{strings.footer_top}
			</p>
			<p className='text-left mt-[20px] font-videotext text-[20px] md:text-[28px] text-white max-w-[90%] md:max-w-[60%]'>
				{strings.footer_text}
			</p>
		</footer>
	);
};

export default Footer;
