import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
	scene: string;
	setScene: (scene: string) => void;
}

export const SceneContext = createContext<AppContextType>({
	scene: "letter",
	setScene: () => {},
});

export const useScene = () => React.useContext(SceneContext);

export const SceneProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [scene, setScene] = useState("letter");

	return (
		<SceneContext.Provider value={{ scene, setScene }}>
			{children}
		</SceneContext.Provider>
	);
};
