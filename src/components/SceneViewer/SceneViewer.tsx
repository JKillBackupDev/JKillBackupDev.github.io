import React from "react";
import Letter from "@components/Letter/Letter";
import PixelButton from "@components/PixelButton/PixelButton";
import Message from "@components/Message/Message";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "@/contexts/SceneContext";
import strings from "@locales/en.json";

type Props = {
	// children?: React.ReactNode;
	// scene: string;
};

const SceneViewer: React.FC<Props> = () => {
	const { scene } = useScene();

	return (
		<>
			<div
				className='
					relative 
					w-screen 
					h-screen 
					min-h-[calc(100vh+80px)]
					min-w-[100%] 
					md:min-h-[873px] 
					md:min-w-[866px] 
					md:max-h-[873px]
				'
			>
				<AnimatePresence>
					{scene == "letter" && <LetterScene />}
					{scene == "message" && <MessageScene />}
				</AnimatePresence>
			</div>
		</>
	);
};

export default SceneViewer;

const LetterScene = () => {
	const { setScene } = useScene();
	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className='md:min-h-screen sm:min-h-[700px]'
		>
			<Letter>
				<p
					className='
					font-videotext 
					uppercase 
					text-[48px] 
					md:text-[64px] 
					md:mb-[28px]
				'
				>
					{strings.letter_address_to}
				</p>
				<p
					className='
					font-pixelscript 
					text-[36px]
					md:text-[48px] 
					leading-[125%] 
					mb-[58px]
					mt-[20px]
				'
				>
					{strings.letter_intro_text}
				</p>
				<div className='absolute bottom-[40%] left-[50%] -translate-x-[50%] md:bottom-[-15px] md:flex md:justify-center md:mt-0'>
					<PixelButton
						button_text={strings.letter_button_text}
						button_onClick={() => {
							setScene("message");
						}}
						fillColorID='red'
					/>
				</div>
			</Letter>
		</motion.div>
	);
};

const MessageScene = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
		>
			<Message />
		</motion.div>
	);
};
