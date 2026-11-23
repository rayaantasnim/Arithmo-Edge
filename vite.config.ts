import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {transformSync} from 'esbuild';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

const htmlPages = [
  'index.html',
  'why-arithmo.html',
  'architecture.html',
  'arenas-elo.html',
  'contests.html',
  'ai-core.html',
  'security-qprt4.html',
  'academies.html',
  'pricing.html',
  'socials-forge.html',
  'governance.html',
  'roadmap.html',
  'pioneers.html',
];

export default defineConfig(() => {
  const input: Record<string, string> = {};
  for (const page of htmlPages) {
    input[page.replace('.html', '')] = path.resolve(import.meta.dirname, page);
  }

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'copy-static-root-assets',
        apply: 'build' as const,
        closeBundle(error?: Error): void {
          if (error) return;
          const distDir = path.resolve(import.meta.dirname, 'dist');
          for (const file of [
            'favicon.jpg',
            '.nojekyll',
            'sitemap.xml',
            'googlef88d19b67a8f9099.html',
            'assets/css/style.css',
          ]) {
            const src = path.resolve(import.meta.dirname, file);
            const dest = path.resolve(distDir, file);
            if (fs.existsSync(distDir) && fs.existsSync(src)) {
              fs.mkdirSync(path.dirname(dest), {recursive: true});
              fs.copyFileSync(src, dest);
            }
          }

          // Transpile and minify classic Vanilla JS runtime so ES6+ syntax works reliably across browsers
          const mainJsSrc = path.resolve(import.meta.dirname, 'assets/js/main.js');
          const mainJsDest = path.resolve(distDir, 'assets/js/main.js');
          if (fs.existsSync(distDir) && fs.existsSync(mainJsSrc)) {
            const rawJs = fs.readFileSync(mainJsSrc, 'utf8');
            const transformed = transformSync(rawJs, {
              loader: 'js',
              target: 'es2020',
              minify: true,
              legalComments: 'none',
            });
            fs.mkdirSync(path.dirname(mainJsDest), {recursive: true});
            fs.writeFileSync(mainJsDest, transformed.code, 'utf8');
          }
        },
      },
    ],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      target: 'es2020',
      rollupOptions: {
        input,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
