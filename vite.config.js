import fs from "node:fs"
import { defineConfig } from "vite"
import tailwind from "@tailwindcss/vite"
import { themeDevServer } from "@typlog/theme-dev-plugin/vite"

const entries = fs.readdirSync('src').filter(name => {
  return /\.(js|css)$/.test(name)
}).map(name => {
  return `src/${name}`
})

export default defineConfig({
  plugins: [
    tailwind(),
    themeDevServer(),
  ],
  build: {
    minify: true,
    cssCodeSplit: true,
    outDir: 'static',
    lib: {
      entry: entries,
      formats: ['es'],
      fileName: (_, name) => `${name}.js`,
    }
  }
})
