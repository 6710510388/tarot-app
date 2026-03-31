self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("tarot").then(c=>c.addAll(["/"]))
  );
});