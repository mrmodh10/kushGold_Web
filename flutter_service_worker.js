'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "a4ca260c1054454f9524529125c007e4",
"version.json": "af19334f1598ab43bac3065cb0665588",
"splash/img/light-2x.png": "88849fb40f59c6421012ee99ea57a3f9",
"splash/img/dark-4x.png": "1761c4ffb9762ec60f98089064bacb69",
"splash/img/light-3x.png": "51aa293ff72afbca05eef09df0798427",
"splash/img/dark-3x.png": "51aa293ff72afbca05eef09df0798427",
"splash/img/light-4x.png": "1761c4ffb9762ec60f98089064bacb69",
"splash/img/dark-2x.png": "88849fb40f59c6421012ee99ea57a3f9",
"splash/img/dark-1x.png": "13c6f426d4224596da1ae774d2cd6f65",
"splash/img/light-1x.png": "13c6f426d4224596da1ae774d2cd6f65",
"index.html": "342651f04a1e311153e5e3d327eb9e2d",
"/": "342651f04a1e311153e5e3d327eb9e2d",
"main.dart.js": "a2732d75b99f59b13d05fa621f62f7e4",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/icon-192.png": "c1e781f0740397656321ece1a58ba86e",
"icons/icon-maskable-192.png": "e64381fd587ed0af66945a23c755c492",
"icons/icon-maskable-512.png": "ad024a00a983c1d2cb3b3ad32153402f",
"icons/icon-512.png": "91952d973b633c6db1c734a0675bbbff",
"manifest.json": "b5c6545840fb82f420694b9811f696a6",
"webIcon.png": "814c3a6b939137890112df2f6372bc8d",
"assets/dotenv": "67c98bd2aa134029e4cb406322199b38",
"assets/AssetManifest.json": "c5a028afd4df96d0fbe5398ddd6682e8",
"assets/assert/image/card.png": "fef82c901f95eb7873cf469f2fadb89f",
"assets/assert/image/check.png": "a07073bd38d227a4af0caa4bfa00e854",
"assets/assert/image/bitPay.png": "2fc6eb3aac700587b572cf184a3d3178",
"assets/assert/image/wireTransfer.png": "175ac2314ba48dc3615283d42aebf2de",
"assets/assert/image/eCheck.png": "858b48778c5dbe869f37fc8a2d738227",
"assets/assert/image/placeholder.jpg": "8a40cd13ed4906287f58969296a7b5e7",
"assets/assert/image/silverCoin.jpg": "d1dd8a4713f4ab9dbf21681e4300b3c6",
"assets/assert/image/BBBCertificate.svg": "70157a40ac9ce395ebdddd13846ae01d",
"assets/assert/image/paypal.png": "d6078e65e59a5aeb7ea3df46807e8d74",
"assets/assert/icon/appIcon.png": "9a2a5d967109cd1bca9320d6af9ae191",
"assets/assert/icon/appIcon.svg": "1b6124c9c72cf89d6ffb0de4230fb87a",
"assets/assert/gif/emailVerified.json": "4ee18c2a6d11d437929776621f22448a",
"assets/assert/gif/orderPlaced.json": "da7ed6751528962e7fc0a4fe35e01e57",
"assets/NOTICES": "f24b2152d3f3b256578d11daaf91acca",
"assets/FontManifest.json": "97c2528ecc2fbf4093965257fdba1854",
"assets/AssetManifest.bin.json": "9d9241a3dc7a267d78ee1b8a9d115b85",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Free-Solid-900.otf": "e151d7a6f42f17e9ea335c91d07b3739",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Free-Regular-400.otf": "f628c0654d5c2a099d8ff085b9fea355",
"assets/packages/font_awesome_flutter/lib/fonts/Font%2520Awesome%25207%2520Brands-Regular-400.otf": "b08c87f45577bfeda4dd4490dbc8f681",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "0e0c523be80e9e16de7871a3e06a9a04",
"assets/fonts/MaterialIcons-Regular.otf": "bda73f48021212194d9e2e896dbfd84a",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
