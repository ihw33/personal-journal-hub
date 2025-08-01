export default {
  plugins: [
    ['@tailwindcss/postcss', {
      // Explicit configuration for better compatibility
      content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
    }],
    ['autoprefixer', {}],
  ],
};