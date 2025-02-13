import React from "react";
import EnvelopeSvg from "@assets/p3-vday-envelope.svg?react";
import MobileEnvelopeSvg from "@assets/p3-vday-envelope-mobile.svg?react";

type Props = {
	children?: React.ReactNode;
};

// relative min-w-[866px] min-h-[873px] md:min-w-80% md:min-h-auto

const Letter: React.FC<Props> = ({ children }) => {
	return (
		<div className='flex w-full h-screen md:h-full justify-center items-center'>
			<EnvelopeSvg
				className='
					w-full 
					h-auto 
					bottom-0 right-0 
					md:h-full 
					md:w-auto 
					overflow-visible 
					hidden 
					md:block
					'
				style={{
					shapeRendering: "crispEdges",
					pointerEvents: "none",
					// left: "50%",
					// transform: "translateX(-50%)",
				}}
			/>
			<MobileEnvelopeSvg
				className='
					absolute
					self-end
					block 
					w-[90%] 
					h-auto 
					top-[60%] 
					-translate-y-1/2
					md:hidden
					'
				style={{
					shapeRendering: "crispEdges",
					pointerEvents: "none",
					// left: "50%",
					// transform: "translateX(-50%)",
				}}
			/>
			<div
				className='
					flex 
					flex-col 
					items-center 
					absolute 
					top-0
					h-full
					text-black 
					text-center
					md:top-[180px] 
					md:w-[472px]
					md:h-[unset]
				'
			>
				{children}
			</div>
		</div>
	);
};

/*
left-1/2 
transform 
-translate-x-1/2 

 */

export default Letter;
