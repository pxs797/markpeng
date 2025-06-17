import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md',
  ],
  plugins: [typography],
}
