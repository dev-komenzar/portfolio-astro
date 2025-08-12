import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

import svelte from '@astrojs/svelte'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		svelte(),
		tailwind({ configFile: './tailwind.config.js' }),
	],
})
