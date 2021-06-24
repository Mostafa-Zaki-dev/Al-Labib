/* eslint-disable no-restricted-globals */

// install event
self.addEventListener('install', (e) => {
  console.log('service worker installed');
});

// activate event
self.addEventListener('activate', (e) => {
  console.log('service worker activated');
});

// fetch event
self.addEventListener('fetch', (e) => {
  // Do nothing .. its only for install banner criteria (https://web.dev/install-criteria/)
});
