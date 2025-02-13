import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCheck } from "@fortawesome/free-solid-svg-icons";
import strings from "@locales/en.json";
type Props = {
	button_text?: string;
	button_url?: string;
	button_onClick?: () => void;
	fillColorID?: keyof typeof buttonVariants;
	isShare?: boolean;
	children?: React.ReactNode;
};

const PixelButton: React.FC<Props> = ({
	button_text,
	button_onClick,
	button_url,
	fillColorID = "white",
	isShare = false,
	children,
}) => {
	const [isSharePress, setIsSharePress] = useState(false);
	let buttonInnerContent = null;

	const handleShareIcon = () => {
		let output = null;
		if (isShare) {
			output = (
				<FontAwesomeIcon
					icon={faLink}
					className='pr-1.5'
					color='white'
				/>
			);
		}
		return output;
	};

	if (isSharePress) {
		buttonInnerContent = (
			<>
				<FontAwesomeIcon
					icon={faCheck}
					className='pr-1.5'
					color='green'
				/>
				{strings.button_share_pressed}
			</>
		);
	} else {
		buttonInnerContent = (
			<>
				{handleShareIcon()}
				{button_text}
				{children}
			</>
		);
	}

	const handlePress = () => {
		if (isShare) {
			setIsSharePress(true);
			setTimeout(() => {
				setIsSharePress(false);
			}, 1000);
		}
		if (button_onClick) {
			button_onClick();
		}
	};

	return (
		<div className='box-border hover:outline-[#EAEDF1] hover:outline-3 p-0 w-[90%] md:w-fit mx-auto md:mx-0'>
			<a
				className={`box-border flex justify-center items-center w-full ${
					buttonVariants[fillColorID]
				} text-center relative z-10 font-videotext text-[16px] uppercase px-[20px] h-full py-[15px] select-none cursor-pointer border-black inline-block m-0 active:border-r-0 active:border-b-0 active:border-t-2 active:border-l-2 ${
					buttonPressedOverride[isSharePress ? "enabled" : "disabled"]
				}`}
				onClick={handlePress}
				href={button_url}
				style={{ transition: "border 0.04s ease-in-out", display: "flex" }}
			>
				{buttonInnerContent}
			</a>
		</div>
	);
};

export default PixelButton;

const buttonVariants = {
	white: "bg-white text-black",
	black: "bg-black text-white",
	red: "bg-[#FF3000] text-black",
	transparent: "bg-transparent text-black",
};

const buttonPressedOverride = {
	disabled: "border-r-2 border-b-2",
	enabled: "border-r-0 border-b-0 border-t-2 border-l-2",
};
