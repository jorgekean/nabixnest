import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const base = isProd ? '/nabixnest/' : '/';

  return {
    base,
    server: {
      port: 5180,
      host: true,
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          id: base,
          name: 'NabiX Nest: Calm Sleep Stories for Kids',
          short_name: 'NabiX Nest',
          description: 'Screen-free, calming bedtime audio stories and gentle ambient sleep soundscapes with NabiX Nest.',
          theme_color: '#07051a',
          background_color: '#07051a',
          display: 'standalone',
          orientation: 'any',
          start_url: base,
          scope: base,
          categories: ['kids', 'lifestyle', 'health'],
          icons: [
            {
              src: 'moon-icon.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,mp3,webmanifest}'],
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
        },
      }),
    ],
  };
});

