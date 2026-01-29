self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("prezzi-spesa-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "script.js",
        "manifest.json",
        "icon-192.png",
        "icon-512.png"
      ]);
    })
  );
});
