
module.exports = {
    content: [
        "./src/app*.{js,ts,jsx,tsx,mdx}",
        "./src/components*.{js,ts,jsx,tsx,mdx}",
        "./src/context*.{js,ts,jsx,tsx,mdx}",
        "./src/data*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                pirate: ['bloodcrow', 'cursive'],
                times: ['TIMESS', 'serif'],
                marker: ['bloodcrow', 'cursive'],
                ui: ['"Cinzel"', 'serif'],
                pixel: ['"VT323"', 'monospace'],
            },
        },
    },
    plugins: [],
};

