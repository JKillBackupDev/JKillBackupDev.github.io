import React, { useEffect, useRef } from "react";
import { isSafari, isMobileSafari } from "react-device-detect";
import StaticGradientBG from "../../assets/static-gradient-bg.png";
import "./Gradient.css";

type Props = {};

const Gradient: React.FC<Props> = () => {
	const interactiveRef = useRef<HTMLDivElement | null>(null);
	const isEitherSafari = isSafari || isMobileSafari;

	useEffect(() => {
		let curX = 0;
		let curY = 0;
		let tgX = 0;
		let tgY = 0;

		const move = () => {
			curX += (tgX - curX) / 20;
			curY += (tgY - curY) / 20;
			if (interactiveRef.current) {
				interactiveRef.current.style.transform = `translate(${Math.round(
					curX
				)}px, ${Math.round(curY)}px)`;
			}
			requestAnimationFrame(move);
		};

		const handleMouseMove = (event: MouseEvent) => {
			tgX = event.clientX;
			tgY = event.clientY;
		};

		window.addEventListener("mousemove", handleMouseMove);
		move();

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>
			{!isEitherSafari && (
				<div className='gradient-bg-wrapper'>
					<div className='gradient-bg'>
						<svg xmlns='http://www.w3.org/2000/svg'>
							<defs>
								<filter id='goo'>
									<feGaussianBlur
										in='SourceGraphic'
										stdDeviation='10'
										result='blur'
									/>
									<feColorMatrix
										in='blur'
										mode='matrix'
										values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
										result='goo'
									/>
									<feBlend
										in='SourceGraphic'
										in2='goo'
									/>
								</filter>
							</defs>
						</svg>
						<div className='gradients-container'>
							<div className='g1'></div>
							<div className='g2'></div>
							<div className='g3'></div>
							<div className='g4'></div>
							<div className='g5'></div>
							<div
								ref={interactiveRef}
								className='interactive'
							></div>
						</div>
					</div>
				</div>
			)}
			{isEitherSafari && (
				<div className='h-full w-full bg-[#F4CCE8] absolute top-0 left-0 z-[-2]'>
					<img
						src={StaticGradientBG}
						className='w-full h-full z-[-2]'
						alt=''
					/>
				</div>
			)}
		</>
	);
};

export default Gradient;
