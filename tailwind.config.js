/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: false,
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7F56D9',
                    hover: '#6941C6',
                },
                gray: {
                    border: '#D0D5DD',
                    bg: '#F9FAFB',
                    hover: '#F3F4F6',
                }
            },
            boxShadow: {
                'xs': '0px 1px 2px rgba(16, 24, 40, 0.05)',
            },
        },
    },
    plugins: [],
}; 