import fs from 'fs';
import Module from 'module';
import path from 'path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

// Register asset hook so ESM/CJS imports of local .jpg assets resolve to clean relative paths
const originalResolveFilename = (Module as unknown as {
  _resolveFilename: (request: string, parent: unknown, isMain: boolean, options: unknown) => string;
})._resolveFilename;

const ASSET_STUB_PREFIX = '__AE_IMG__::';
(Module as unknown as Record<string, Record<string, (mod: NodeModule, filename: string) => void>>)._extensions['.jpg'] =
  function (mod: NodeModule, filename: string) {
    const rel = path.relative(process.cwd(), filename).replace(/\\/g, '/');
    mod.exports = rel;
  };
(Module as unknown as Record<string, Record<string, (mod: NodeModule, filename: string) => void>>)._extensions['.png'] =
  function (mod: NodeModule, filename: string) {
    const rel = path.relative(process.cwd(), filename).replace(/\\/g, '/');
    mod.exports = rel;
  };
void originalResolveFilename;
void ASSET_STUB_PREFIX;

async function main() {
  const {SiteShell} = await import('../src/components/SiteShell');
  const {HomePage} = await import('../src/pages/HomePage');
  const {WhyArithmoPage} = await import('../src/pages/WhyArithmoPage');
  const {ArchitecturePage} = await import('../src/pages/ArchitecturePage');
  const {ArenasEloPage} = await import('../src/pages/ArenasEloPage');
  const {ContestsPage} = await import('../src/pages/ContestsPage');
  const {AiCorePage} = await import('../src/pages/AiCorePage');
  const {SecurityQprt4Page} = await import('../src/pages/SecurityQprt4Page');
  const {AcademiesPage} = await import('../src/pages/AcademiesPage');
  const {PricingPage} = await import('../src/pages/PricingPage');
  const {SocialsForgePage} = await import('../src/pages/SocialsForgePage');
  const {GovernancePage} = await import('../src/pages/GovernancePage');
  const {RoadmapPage} = await import('../src/pages/RoadmapPage');
  const {PioneersPage} = await import('../src/pages/PioneersPage');

  const PAGE_MAP = [
    ['index.html', HomePage],
    ['why-arithmo.html', WhyArithmoPage],
    ['architecture.html', ArchitecturePage],
    ['arenas-elo.html', ArenasEloPage],
    ['contests.html', ContestsPage],
    ['ai-core.html', AiCorePage],
    ['security-qprt4.html', SecurityQprt4Page],
    ['academies.html', AcademiesPage],
    ['pricing.html', PricingPage],
    ['socials-forge.html', SocialsForgePage],
    ['governance.html', GovernancePage],
    ['roadmap.html', RoadmapPage],
    ['pioneers.html', PioneersPage],
  ] as const;

  const CDN_HEAD_BLOCK = `    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind = window.tailwind || {};
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: {
              sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
              display: ['"Syne"', '"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
              mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
            }
          }
        }
      };
    </script>
    <link rel="stylesheet" href="assets/css/style.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
    <script src="assets/js/main.js" defer></script>`;

  for (const [fileName, PageComponent] of PAGE_MAP) {
    const filePath = path.resolve(process.cwd(), fileName);
    const existingHtml = fs.readFileSync(filePath, 'utf8');

    // Extract head portion up to </head>
    const headEndIdx = existingHtml.indexOf('</head>');
    if (headEndIdx === -1) {
      throw new Error(`Missing </head> in ${fileName}`);
    }
    let headSection = existingHtml.slice(0, headEndIdx);

    // Ensure favicon.jpg has no leading slash
    headSection = headSection.replace(/href="\/favicon\.jpg"/g, 'href="favicon.jpg"');

    // Clean out any previously injected CDN/asset tags to stay idempotent
    headSection = headSection
      .replace(/\s*<script[^>]*cdn\.tailwindcss\.com[^>]*><\/script>/g, '')
      .replace(/\s*<script>\s*tailwind\s*=[\s\S]*?<\/script>/g, '')
      .replace(/\s*<link[^>]*assets\/css\/style\.css[^>]*>/g, '')
      .replace(/\s*<script[^>]*gsap[^>]*><\/script>/g, '')
      .replace(/\s*<script[^>]*three(\.min)?\.js[^>]*><\/script>/g, '')
      .replace(/\s*<script[^>]*assets\/js\/main\.js[^>]*><\/script>/g, '')
      .trimEnd();

    // Render full React component tree cleanly for static HTML output
    let bodyMarkup = renderToStaticMarkup(
      React.createElement(
        SiteShell,
        {pageId: fileName},
        React.createElement(PageComponent),
      ),
    );

    // Remove SSR Framer Motion opacity:0 / translateY(...) inline locks while preserving #nav-drawer-backdrop hidden state
    bodyMarkup = bodyMarkup
      .replace(/opacity:0;transform:translateY\([^;"]*\);?/g, '')
      .replace(/opacity:0;transform:none;?/g, '')
      .replace(/(<div[^>]*id="nav-drawer-backdrop"[^>]*>)|opacity:0;?/g, (m, backdrop) => backdrop || '');

    const finalHtml = `${headSection}\n${CDN_HEAD_BLOCK}\n  </head>\n  <body class="selection:bg-cyan-400/30 selection:text-cyan-100">\n    <div id="root" data-page="${fileName}">${bodyMarkup}</div>\n  </body>\n</html>\n`;

    fs.writeFileSync(filePath, finalHtml, 'utf8');
    console.log(`Generated standalone static HTML: ${fileName} (${Math.round(finalHtml.length / 1024)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
