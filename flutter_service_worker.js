'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "300c37d64a1a1c586dfd095778c43ffb",
"version.json": "af19334f1598ab43bac3065cb0665588",
"splash/img/light-2x.png": "88849fb40f59c6421012ee99ea57a3f9",
"splash/img/dark-4x.png": "1761c4ffb9762ec60f98089064bacb69",
"splash/img/light-3x.png": "51aa293ff72afbca05eef09df0798427",
"splash/img/dark-3x.png": "51aa293ff72afbca05eef09df0798427",
"splash/img/light-4x.png": "1761c4ffb9762ec60f98089064bacb69",
"splash/img/dark-2x.png": "88849fb40f59c6421012ee99ea57a3f9",
"splash/img/dark-1x.png": "13c6f426d4224596da1ae774d2cd6f65",
"splash/img/light-1x.png": "13c6f426d4224596da1ae774d2cd6f65",
"index.html": "b786cd7a85512b18ecee3183a3b0e57d",
"/": "b786cd7a85512b18ecee3183a3b0e57d",
"main.dart.js": "7ba8f781cdb35f080b521c7ff6c9578c",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/icon-192.png": "c1e781f0740397656321ece1a58ba86e",
"icons/icon-maskable-192.png": "e64381fd587ed0af66945a23c755c492",
"icons/icon-maskable-512.png": "ad024a00a983c1d2cb3b3ad32153402f",
"icons/icon-512.png": "91952d973b633c6db1c734a0675bbbff",
"manifest.json": "8481c719f3d40f6a603bd8808369b04b",
"webIcon.png": "814c3a6b939137890112df2f6372bc8d",
"assets/dotenv": "67c98bd2aa134029e4cb406322199b38",
"assets/AssetManifest.json": "df040a167d8674fba172a62d414f08b9",
"assets/assert/image/card.png": "fef82c901f95eb7873cf469f2fadb89f",
"assets/assert/image/check.png": "a07073bd38d227a4af0caa4bfa00e854",
"assets/assert/image/bitPay.png": "2fc6eb3aac700587b572cf184a3d3178",
"assets/assert/image/wireTransfer.png": "175ac2314ba48dc3615283d42aebf2de",
"assets/assert/image/eCheck.png": "858b48778c5dbe869f37fc8a2d738227",
"assets/assert/image/placeholder.jpg": "8a40cd13ed4906287f58969296a7b5e7",
"assets/assert/image/silverCoin.jpg": "d1dd8a4713f4ab9dbf21681e4300b3c6",
"assets/assert/image/paypal.png": "d6078e65e59a5aeb7ea3df46807e8d74",
"assets/assert/font/Roboto/Roboto-Medium.ttf": "6679d67d72e0e7b34f407bac6df715ab",
"assets/assert/font/Roboto/Roboto-Light.ttf": "5b55e48d4daee5634648dd487340e37e",
"assets/assert/font/Roboto/Roboto-Regular.ttf": "327362a7c8d487ad3f7970cc8e2aba8d",
"assets/assert/font/Roboto/Roboto-MediumItalic.ttf": "18191c4ed1413aac2700bbfa58b90774",
"assets/assert/font/Roboto/Roboto-ThinItalic.ttf": "0d058ce1aecaa16d26b71bdab2be31b0",
"assets/assert/font/Roboto/Roboto-BoldItalic.ttf": "fa726104cd4b7e8f106e391fea744b08",
"assets/assert/font/Roboto/Roboto-LightItalic.ttf": "b4591abf6ddac60905ad8a2ac5ba5363",
"assets/assert/font/Roboto/Roboto-Italic.ttf": "270c8dce1ab3c57848d7d278cb96574f",
"assets/assert/font/Roboto/Roboto-BlackItalic.ttf": "fc9c6dc66452de428b034f2af1a561ce",
"assets/assert/font/Roboto/Roboto-Bold.ttf": "2e9b3d16308e1642bf8549d58c60f5c9",
"assets/assert/font/Roboto/Roboto-Thin.ttf": "8e1900eabb62e4e502ee3de329e0b833",
"assets/assert/font/Roboto/Roboto-Black.ttf": "53ab4bb513d53af898e25637a2750ffc",
"assets/assert/icon/appIcon.png": "9a2a5d967109cd1bca9320d6af9ae191",
"assets/assert/icon/appIcon.svg": "1b6124c9c72cf89d6ffb0de4230fb87a",
"assets/assert/gif/emailVerified.json": "4ee18c2a6d11d437929776621f22448a",
"assets/assert/gif/orderPlaced.json": "da7ed6751528962e7fc0a4fe35e01e57",
"assets/NOTICES": "e077c6c3e4faea87cc6456396d5d24c7",
"assets/FontManifest.json": "3823ce718e47aa8bf004a673d5c15987",
"assets/AssetManifest.bin.json": "2a4ca274f0fa3ea6ced82ea9ce9193f9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "71f2dc6635e5c6d8e256d94adf0c01ee",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d2aca6e93e270adb9e15c1eda06e98ed",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "fb434d4ff8fb098b586193235b1a4425",
"assets/fonts/MaterialIcons-Regular.otf": "0f5c479873f1c2dd1285f4f18e36edf2",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
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
