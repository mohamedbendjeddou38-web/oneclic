import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                pirate: ['"Pirata One"', 'cursive'],
                ui: ['"Cinzel"', 'serif'],
                pixel: ['"VT323"', 'monospace'],
            },
        },
    },
    plugins: [],
};
export default config;