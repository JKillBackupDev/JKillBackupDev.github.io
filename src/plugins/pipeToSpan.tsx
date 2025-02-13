import { Remarkable } from "remarkable";

type RemarkablePlugin = (md: Remarkable) => void;

export const pipeToSpan: RemarkablePlugin = (md) => {
	md.inline.ruler.before(
		"emphasis",
		"pipe_syntax",
		(state, silent) => {
			const start = state.pos;
			const max = state.posMax;

			if (start + 3 >= max) return false;

			if (
				state.src.charCodeAt(start) !== 0x21 ||
				state.src.charCodeAt(start + 1) !== 0x21
			) {
				return false;
			}

			if (silent) return false;

			let matchEnd = start + 2;
			while (matchEnd < max - 1) {
				if (
					state.src.charCodeAt(matchEnd) === 0x21 && // '|'
					state.src.charCodeAt(matchEnd + 1) === 0x21 // '|'
				) {
					break;
				}
				matchEnd++;
			}

			if (matchEnd >= max - 1) return false;

			// Create opening token
			const tokenOpen = {
				type: "pipe_syntax_open",
				tag: "span",
				nesting: 1,
				attrs: [["class", "font-pixelscript text-[#4000AE]"]],
				map: null,
				level: state.level,
				children: null,
				content: "",
				markup: "!!",
				info: "",
				meta: null,
				block: false,
				hidden: false,
			};
			state.push(tokenOpen);

			// Create content token
			const tokenContent = {
				type: "text",
				tag: "",
				nesting: 0,
				attrs: null,
				map: null,
				level: state.level,
				children: null,
				content: state.src.slice(start + 2, matchEnd),
				markup: "",
				info: "",
				meta: null,
				block: false,
				hidden: false,
			};
			state.push(tokenContent);

			// Create closing token
			const tokenClose = {
				type: "pipe_syntax_close",
				tag: "span",
				nesting: -1,
				attrs: null,
				map: null,
				level: state.level,
				children: null,
				content: "",
				markup: "!!",
				info: "",
				meta: null,
				block: false,
				hidden: false,
			};
			state.push(tokenClose);

			state.pos = matchEnd + 2;
			return true;
		},
		{}
	);

	md.renderer.rules.pipe_syntax_open = () => {
		return `<span class="font-pixelscript text-[#4000AE] normal-case font-[70px]">`;
	};

	md.renderer.rules.pipe_syntax_close = () => {
		return `</span>`;
	};
};

export default pipeToSpan;
