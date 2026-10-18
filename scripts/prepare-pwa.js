const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcIcon = path.join(rootDir, 'assets', 'images', 'chef.png');
const fallbackIcon = path.join(rootDir, 'assets', 'images', 'icon.png');
const iconToUse = fs.existsSync(srcIcon) ? srcIcon : fallbackIcon;
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');

const ioniconsSrc = path.join(
  rootDir,
  'node_modules',
  '@expo',
  'vector-icons',
  'build',
  'vendor',
  'react-native-vector-icons',
  'Fonts',
  'Ionicons.ttf'
);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (fs.existsSync(iconToUse)) {
  if (iconToUse !== fallbackIcon) {
    fs.copyFileSync(iconToUse, fallbackIcon);
  }
  for (const name of ['apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'favicon.ico']) {
    fs.copyFileSync(iconToUse, path.join(publicDir, name));
    if (fs.existsSync(distDir)) {
      fs.copyFileSync(iconToUse, path.join(distDir, name));
    }
  }
}

if (fs.existsSync(ioniconsSrc)) {
  const publicFontsDir = path.join(publicDir, 'fonts');
  if (!fs.existsSync(publicFontsDir)) {
    fs.mkdirSync(publicFontsDir, { recursive: true });
  }
  fs.copyFileSync(ioniconsSrc, path.join(publicFontsDir, 'Ionicons.ttf'));

  if (fs.existsSync(distDir)) {
    const distFontsDir = path.join(distDir, 'fonts');
    if (!fs.existsSync(distFontsDir)) {
      fs.mkdirSync(distFontsDir, { recursive: true });
    }
    fs.copyFileSync(ioniconsSrc, path.join(distFontsDir, 'Ionicons.ttf'));
  }
}

const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');

  html = html.replace(
    'content="width=device-width, initial-scale=1, shrink-to-fit=no"',
    'content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"'
  );

  const pwaMeta = `
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="CookBook" />
    <meta name="theme-color" content="#F5F5F7" />
    <link rel="manifest" href="/manifest.json?v=2" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
    <link rel="preload" href="/fonts/Ionicons.ttf" as="font" type="font/ttf" crossorigin="anonymous" />
    <style id="ionicons-ios-fix">
      @font-face {
        font-family: "ionicons";
        src: url("/fonts/Ionicons.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: block;
      }
      @font-face {
        font-family: "Ionicons";
        src: url("/fonts/Ionicons.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: block;
      }
    </style>
  </head>`;

  if (!html.includes('apple-mobile-web-app-capable')) {
    html = html.replace('</head>', pwaMeta);
  }

  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log('[PWA] dist/index.html configurado con icono chef.png y fuentes Ionicons para iOS.');
}
