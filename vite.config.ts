import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@locales": path.resolve(__dirname, "./src/locales"),
			"@contexts": path.resolve(__dirname, "./src/contexts"),
			"@plugins": path.resolve(__dirname, "./src/plugins"),
		},
	},
	base: "./",
	plugins: [
		react(),
		svgr({
			include: "**/*.svg?react",
		}),
		tailwindcss(),
	],
	assetsInclude: ["**/*.svg"],
});
