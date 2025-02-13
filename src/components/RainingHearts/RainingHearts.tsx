import React, { useEffect, useState } from "react";

import Heart from "@assets/heart.svg?react";
import "./RainingHearts.css";

interface HeartType {
	id: number;
	left: string;
	top: number;
	beat?: boolean;
	clicked?: boolean;
}

interface Props {
	beatingHearts?: boolean;
}

const RainingHearts: React.FC<Props> = ({ beatingHearts = false }) => {
	const [hearts, setHearts] = useState<HeartType[]>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			createHeart();
		}, 1500);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let animationFrameId: number;

		const animate = () => {
			setHearts((prevHearts) =>
				prevHearts
					.map((heart) =>
						heart.clicked ? heart : { ...heart, top: heart.top + 1 }
					)
					.filter((heart) => heart.top < window.innerHeight)
			);

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	const createHeart = () => {
		const id = Date.now();
		const left = `${Math.random() * 100}vw`;
		const top = -10;

		setHearts((prevHearts) => [
			...prevHearts,
			{ id, left, top, beat: beatingHearts },
		]);

		setTimeout(() => {
			setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== id));
		}, 15000);
	};

	const handleClick = (id: number) => {
		setHearts((prevHearts) =>
			prevHearts.map((heart) =>
				heart.id === id
					? {
							...heart,
							clicked: true,
							beat: false,
					  }
					: heart
			)
		);

		setTimeout(() => {
			setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== id));
		}, 600);
	};

	return (
		<div className='hearts-container'>
			{hearts.map(({ id, left, top, beat, clicked }) => (
				<span
					id={`heart-${id}`}
					key={id}
					className={`heart ${beat ? "beat" : ""} ${clicked ? "explode" : ""}`}
					style={{ left, top: `${top}px` }}
					onClick={() => handleClick(id)}
				>
					<Heart />
				</span>
			))}
		</div>
	);
};

export default RainingHearts;
