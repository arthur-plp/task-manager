import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import lightningcss from 'vite-plugin-lightningcss'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
// Configure Lightning CSS to run after Tailwind's Vite plugin so it can
// process the generated CSS. We enable nesting, custom media, autoprefixing
// via targets and minification. This works for both dev and build.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    lightningcss({
      minify: true,
    }),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
    cssMinify: 'lightningcss'
  }
})