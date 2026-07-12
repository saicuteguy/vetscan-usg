var CACHE = "pradarsh-v7";

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(["/Pradarsh/", "/Pradarsh/index.html"]).catch(function(){});
    })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  e.respondWith(
    fetch(e.request).then(function(r){
      var c = r.clone();
      caches.open(CACHE).then(function(cache){ cache.put(e.request, c); });
      return r;
    }).catch(function(){
      return caches.match(e.request).then(function(r){
        return r || caches.match("/Pradarsh/index.html");
      });
    })
  );
});
