import { useState, useEffect } from "react";
import PixelButton from "@components/PixelButton/PixelButton";
import MarkdownRenderer from "@components/MarkdownRenderer/MarkdownRenderer";
import { AnimatePresence, motion } from "motion/react";
import { useScene } from "@/contexts/SceneContext";
import HouseHeart from "@assets/house-heart.svg?react";
import strings from "@locales/en.json";

type Props = {
	// messageIndex: number;
};

const shuffle = (array: any[]) => {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

const Message: React.FC<Props> = () => {
	const { setScene } = useScene();

	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [unusedIndices, setUnusedIndices] = useState<number[]>(
		shuffle(strings.messages.map((_, index) => index))
	);

	const [buttonMessageIndex, setButtonMessageIndex] = useState<number>(0);
	const [buttonMessages, setButtonMessages] = useState<string[]>(
		strings.button_messages
	);
	const [buttonMessage, setButtonMessage] = useState<string>(
		buttonMessages[buttonMessageIndex]
	);

	useEffect(() => {
		chooseRandomMessage();
		chooseRandomButtonMessage();
	}, []);

	useEffect(() => {
		let unusedIndicesInstance = [...unusedIndices];
		const newActiveIndex = unusedIndicesInstance.pop() ?? 0;
		setActiveIndex(newActiveIndex);
	}, [unusedIndices]);

	const chooseRandomMessage = () => {
		let indicesInstance =
			unusedIndices.length === 0
				? shuffle([...strings.messages.map((_, index) => index)])
				: [...unusedIndices];

		indicesInstance.pop();

		setUnusedIndices(indicesInstance);
	};

	const chooseRandomButtonMessage = () => {
		let buttonMessagesInsance =
			buttonMessages.length === 0
				? shuffle([...strings.button_messages])
				: [...buttonMessages];

		const randomIndex = Math.floor(
			Math.random() * buttonMessagesInsance.length
		);

		setButtonMessage(buttonMessagesInsance[randomIndex]);
		setButtonMessageIndex(randomIndex);

		buttonMessagesInsance.splice(randomIndex, 1);
		setButtonMessages(buttonMessagesInsance);
	};

	return (
		<>
			<div className='flex flex-col justify-between items-center min-h-[873px] w-full pb-[80px]'>
				<div className='flex flex-1'>
					<AnimatePresence>
						{strings.messages.map((message, index) => {
							return (
								<MessageDisplay
									key={index}
									message={message}
									activeIndex={activeIndex}
									index={index}
								/>
							);
						})}
					</AnimatePresence>
				</div>
				<div className='flex flex-col justify-end items-stretch md:justify-center md:flex-row w-full h-full gap-[20px]'>
					<PixelButton
						button_text={buttonMessage}
						button_onClick={() => {
							chooseRandomMessage();
							chooseRandomButtonMessage();
						}}
						fillColorID='white'
					/>
					<PixelButton
						button_onClick={() => {
							setScene("letter");
						}}
						fillColorID='transparent'
					>
						<HouseHeart className='h-[16px] w-[16px] flex' />
					</PixelButton>
				</div>
			</div>
		</>
	);
};

export default Message;

const MessageDisplay = ({
	message,
	activeIndex,
	index,
}: {
	message: string;
	activeIndex: number;
	index: number;
}) => {
	return (
		<>
			{activeIndex === index && (
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className='flex justify-center items-center'
				>
					<MarkdownRenderer text={message} />
				</motion.div>
			)}
		</>
	);
};
