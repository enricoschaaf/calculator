self.addEventListener("install", (e) =>
  e.waitUntil(
    caches
      .open("calculator")
      .then((cache) =>
        cache.addAll([
          "/",
          "styles.css",
          "main.js",
          "favicon.svg",
          "Inter.latin.var.woff2",
        ]),
      ),
  ),
)

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clonedRes = res.clone()

        caches.match(e.request).then((match) => {
          if (!match || res.status === 200) {
            caches
              .open("calculator")
              .then((cache) => cache.put(e.request, clonedRes))
          }
        })

        return res
      })
      .catch(() => caches.match(e.request)),
  )
})
