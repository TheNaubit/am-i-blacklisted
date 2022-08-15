/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				aurora: "aurora 7s alternate infinite",
				auroraPlus: "auroraPlus 4s alternate infinite",
			},
			keyframes: {
				aurora: {
					"100%": {
						transform: "rotate(1turn) translateX(50vw) translateY(50vh) rotate(-1turn)",
					}
				},
				auroraPlus: {
					"100%": {
						transform: "rotate(-1turn) translateX(50vw) translateY(50vh) rotate(1turn)",
					}
				}
			}
		},
	},
	plugins: [],
}
