import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'architect-primary': '#1a237e',
        'architect-secondary': '#0d47a1',
        'architect-accent': '#ff6f00',
        'architect-gray-900': '#212121',
        'architect-gray-700': '#424242',
        'architect-gray-500': '#757575',
        'architect-gray-300': '#bdbdbd',
        'architect-gray-100': '#f5f5f5',
        'architect-success': '#2e7d32',
        'architect-warning': '#f57c00',
        'architect-error': '#c62828',
        'architect-info': '#1976d2',
        'architect-ai-primary': '#00bcd4',
        'architect-ai-secondary': '#4fc3f7',
        'architect-ai-accent': '#00e676',
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        korean: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Malgun Gothic', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'hero': '4rem',
        'h1': '3rem',
        'h2': '2.25rem',
        'h3': '1.875rem',
        'h4': '1.5rem',
        'body-lg': '1.125rem',
        'body': '1rem',
        'small': '0.875rem',
        'xs': '0.75rem',
      },
      fontWeight: {
        black: '900',
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
        light: '300',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(26, 35, 126, 0.12), 0 1px 2px rgba(26, 35, 126, 0.08)',
        'md': '0 4px 8px rgba(26, 35, 126, 0.12), 0 2px 4px rgba(26, 35, 126, 0.08)',
        'lg': '0 8px 16px rgba(26, 35, 126, 0.15), 0 4px 8px rgba(26, 35, 126, 0.1)',
        'xl': '0 16px 32px rgba(26, 35, 126, 0.15), 0 8px 16px rgba(26, 35, 126, 0.1)',
        '2xl': '0 24px 48px rgba(26, 35, 126, 0.2), 0 12px 24px rgba(26, 35, 126, 0.15)',
        'ai': '0 8px 32px rgba(0, 188, 212, 0.3), 0 4px 16px rgba(0, 188, 212, 0.2)',
        'glow': '0 0 20px rgba(255, 111, 0, 0.3), 0 0 40px rgba(255, 111, 0, 0.1)',
      },
      backgroundImage: {
        'architect-gradient-main': 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
        'architect-gradient-accent': 'linear-gradient(135deg, #ff6f00 0%, #ff8f00 100%)',
        'architect-future-gradient': 'linear-gradient(135deg, #00bcd4 0%, #4fc3f7 50%, #00e676 100%)',
      },
    },
  },
  plugins: [],
};

export default config;