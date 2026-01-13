import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#030712",
                foreground: "#f8fafc",
                "primary-gold": "#D4AF37",
                "primary-bronze": "#CD7F32",
                "accent-cyan": "#22D3EE",
                "accent-purple": "#8B5CF6",
            },
            fontFamily: {
                display: ['var(--font-syne)', 'sans-serif'],
                body: ['var(--font-jakarta)', 'sans-serif'],
            },
            backdropBlur: {
                'xs': '2px',
                'huge': '40px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out infinite 3s',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0)' },
                    '50%': { transform: 'translateY(-20px) rotate(2deg)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
