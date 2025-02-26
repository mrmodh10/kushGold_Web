
// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  async instantiate(additionalImports, {loadDeferredWasm} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

      _1: (x0,x1,x2) => x0.set(x1,x2),
      _2: (x0,x1,x2) => x0.set(x1,x2),
      _6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
      _7: x0 => new window.FinalizationRegistry(x0),
      _8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _9: (x0,x1) => x0.unregister(x1),
      _10: (x0,x1,x2) => x0.slice(x1,x2),
      _11: (x0,x1) => x0.decode(x1),
      _12: (x0,x1) => x0.segment(x1),
      _13: () => new TextDecoder(),
      _14: x0 => x0.buffer,
      _15: x0 => x0.wasmMemory,
      _16: () => globalThis.window._flutter_skwasmInstance,
      _17: x0 => x0.rasterStartMilliseconds,
      _18: x0 => x0.rasterEndMilliseconds,
      _19: x0 => x0.imageBitmaps,
      _192: x0 => x0.select(),
      _193: (x0,x1) => x0.append(x1),
      _194: x0 => x0.remove(),
      _197: x0 => x0.unlock(),
      _202: x0 => x0.getReader(),
      _211: x0 => new MutationObserver(x0),
      _222: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _223: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _226: x0 => new ResizeObserver(x0),
      _229: (x0,x1) => new Intl.Segmenter(x0,x1),
      _230: x0 => x0.next(),
      _231: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _308: x0 => x0.close(),
      _309: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
      _310: x0 => new window.ImageDecoder(x0),
      _311: x0 => x0.close(),
      _312: x0 => ({frameIndex: x0}),
      _313: (x0,x1) => x0.decode(x1),
      _316: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._316(f,arguments.length,x0) }),
      _317: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._317(f,arguments.length,x0) }),
      _318: (x0,x1) => ({addView: x0,removeView: x1}),
      _319: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._319(f,arguments.length,x0) }),
      _320: f => finalizeWrapper(f, function() { return dartInstance.exports._320(f,arguments.length) }),
      _321: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _322: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._322(f,arguments.length,x0) }),
      _323: x0 => ({runApp: x0}),
      _324: x0 => new Uint8Array(x0),
      _326: x0 => x0.preventDefault(),
      _327: x0 => x0.stopPropagation(),
      _328: (x0,x1) => x0.addListener(x1),
      _329: (x0,x1) => x0.removeListener(x1),
      _330: (x0,x1) => x0.prepend(x1),
      _331: x0 => x0.remove(),
      _332: x0 => x0.disconnect(),
      _333: (x0,x1) => x0.addListener(x1),
      _334: (x0,x1) => x0.removeListener(x1),
      _335: x0 => x0.blur(),
      _336: (x0,x1) => x0.append(x1),
      _337: x0 => x0.remove(),
      _338: x0 => x0.stopPropagation(),
      _342: x0 => x0.preventDefault(),
      _343: (x0,x1) => x0.append(x1),
      _344: x0 => x0.remove(),
      _345: x0 => x0.preventDefault(),
      _350: (x0,x1) => x0.removeChild(x1),
      _351: (x0,x1) => x0.appendChild(x1),
      _352: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _353: (x0,x1) => x0.appendChild(x1),
      _354: (x0,x1) => x0.transferFromImageBitmap(x1),
      _355: (x0,x1) => x0.appendChild(x1),
      _356: (x0,x1) => x0.append(x1),
      _357: (x0,x1) => x0.append(x1),
      _358: (x0,x1) => x0.append(x1),
      _359: x0 => x0.remove(),
      _360: x0 => x0.remove(),
      _361: x0 => x0.remove(),
      _362: (x0,x1) => x0.appendChild(x1),
      _363: (x0,x1) => x0.appendChild(x1),
      _364: x0 => x0.remove(),
      _365: (x0,x1) => x0.append(x1),
      _366: (x0,x1) => x0.append(x1),
      _367: x0 => x0.remove(),
      _368: (x0,x1) => x0.append(x1),
      _369: (x0,x1) => x0.append(x1),
      _370: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _371: (x0,x1) => x0.append(x1),
      _372: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _373: x0 => x0.remove(),
      _374: (x0,x1) => x0.append(x1),
      _375: x0 => x0.remove(),
      _376: (x0,x1) => x0.append(x1),
      _377: x0 => x0.remove(),
      _378: x0 => x0.remove(),
      _379: x0 => x0.getBoundingClientRect(),
      _380: x0 => x0.remove(),
      _393: (x0,x1) => x0.append(x1),
      _394: x0 => x0.remove(),
      _395: (x0,x1) => x0.append(x1),
      _396: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _397: x0 => x0.preventDefault(),
      _398: x0 => x0.preventDefault(),
      _399: x0 => x0.preventDefault(),
      _400: x0 => x0.preventDefault(),
      _401: (x0,x1) => x0.observe(x1),
      _402: x0 => x0.disconnect(),
      _403: (x0,x1) => x0.appendChild(x1),
      _404: (x0,x1) => x0.appendChild(x1),
      _405: (x0,x1) => x0.appendChild(x1),
      _406: (x0,x1) => x0.append(x1),
      _407: x0 => x0.remove(),
      _408: (x0,x1) => x0.append(x1),
      _409: (x0,x1) => x0.append(x1),
      _410: (x0,x1) => x0.appendChild(x1),
      _411: (x0,x1) => x0.append(x1),
      _412: x0 => x0.remove(),
      _413: (x0,x1) => x0.append(x1),
      _414: x0 => x0.remove(),
      _418: (x0,x1) => x0.appendChild(x1),
      _419: x0 => x0.remove(),
      _978: () => globalThis.window.flutterConfiguration,
      _979: x0 => x0.assetBase,
      _984: x0 => x0.debugShowSemanticsNodes,
      _985: x0 => x0.hostElement,
      _986: x0 => x0.multiViewEnabled,
      _987: x0 => x0.nonce,
      _989: x0 => x0.fontFallbackBaseUrl,
      _995: x0 => x0.console,
      _996: x0 => x0.devicePixelRatio,
      _997: x0 => x0.document,
      _998: x0 => x0.history,
      _999: x0 => x0.innerHeight,
      _1000: x0 => x0.innerWidth,
      _1001: x0 => x0.location,
      _1002: x0 => x0.navigator,
      _1003: x0 => x0.visualViewport,
      _1004: x0 => x0.performance,
      _1007: (x0,x1) => x0.dispatchEvent(x1),
      _1008: (x0,x1) => x0.matchMedia(x1),
      _1010: (x0,x1) => x0.getComputedStyle(x1),
      _1011: x0 => x0.screen,
      _1012: (x0,x1) => x0.requestAnimationFrame(x1),
      _1013: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1013(f,arguments.length,x0) }),
      _1018: (x0,x1) => x0.warn(x1),
      _1020: (x0,x1) => x0.debug(x1),
      _1021: () => globalThis.window,
      _1022: () => globalThis.Intl,
      _1023: () => globalThis.Symbol,
      _1026: x0 => x0.clipboard,
      _1027: x0 => x0.maxTouchPoints,
      _1028: x0 => x0.vendor,
      _1029: x0 => x0.language,
      _1030: x0 => x0.platform,
      _1031: x0 => x0.userAgent,
      _1032: x0 => x0.languages,
      _1033: x0 => x0.documentElement,
      _1034: (x0,x1) => x0.querySelector(x1),
      _1038: (x0,x1) => x0.createElement(x1),
      _1039: (x0,x1) => x0.execCommand(x1),
      _1042: (x0,x1) => x0.createTextNode(x1),
      _1043: (x0,x1) => x0.createEvent(x1),
      _1047: x0 => x0.head,
      _1048: x0 => x0.body,
      _1049: (x0,x1) => x0.title = x1,
      _1052: x0 => x0.activeElement,
      _1054: x0 => x0.visibilityState,
      _1056: x0 => x0.hasFocus(),
      _1057: () => globalThis.document,
      _1058: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1059: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1062: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1062(f,arguments.length,x0) }),
      _1063: x0 => x0.target,
      _1065: x0 => x0.timeStamp,
      _1066: x0 => x0.type,
      _1068: x0 => x0.preventDefault(),
      _1070: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _1077: x0 => x0.firstChild,
      _1082: x0 => x0.parentElement,
      _1084: x0 => x0.parentNode,
      _1088: (x0,x1) => x0.removeChild(x1),
      _1089: (x0,x1) => x0.removeChild(x1),
      _1090: x0 => x0.isConnected,
      _1091: (x0,x1) => x0.textContent = x1,
      _1095: (x0,x1) => x0.contains(x1),
      _1101: x0 => x0.firstElementChild,
      _1103: x0 => x0.nextElementSibling,
      _1104: x0 => x0.clientHeight,
      _1105: x0 => x0.clientWidth,
      _1106: x0 => x0.offsetHeight,
      _1107: x0 => x0.offsetWidth,
      _1108: x0 => x0.id,
      _1109: (x0,x1) => x0.id = x1,
      _1112: (x0,x1) => x0.spellcheck = x1,
      _1113: x0 => x0.tagName,
      _1114: x0 => x0.style,
      _1115: (x0,x1) => x0.append(x1),
      _1117: (x0,x1) => x0.getAttribute(x1),
      _1118: x0 => x0.getBoundingClientRect(),
      _1121: (x0,x1) => x0.closest(x1),
      _1124: (x0,x1) => x0.querySelectorAll(x1),
      _1126: x0 => x0.remove(),
      _1127: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1128: (x0,x1) => x0.removeAttribute(x1),
      _1129: (x0,x1) => x0.tabIndex = x1,
      _1132: (x0,x1) => x0.focus(x1),
      _1133: x0 => x0.scrollTop,
      _1134: (x0,x1) => x0.scrollTop = x1,
      _1135: x0 => x0.scrollLeft,
      _1136: (x0,x1) => x0.scrollLeft = x1,
      _1137: x0 => x0.classList,
      _1138: (x0,x1) => x0.className = x1,
      _1144: (x0,x1) => x0.getElementsByClassName(x1),
      _1146: x0 => x0.click(),
      _1147: (x0,x1) => x0.hasAttribute(x1),
      _1150: (x0,x1) => x0.attachShadow(x1),
      _1155: (x0,x1) => x0.getPropertyValue(x1),
      _1157: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _1159: (x0,x1) => x0.removeProperty(x1),
      _1161: x0 => x0.offsetLeft,
      _1162: x0 => x0.offsetTop,
      _1163: x0 => x0.offsetParent,
      _1165: (x0,x1) => x0.name = x1,
      _1166: x0 => x0.content,
      _1167: (x0,x1) => x0.content = x1,
      _1185: (x0,x1) => x0.nonce = x1,
      _1191: x0 => x0.now(),
      _1193: (x0,x1) => x0.width = x1,
      _1195: (x0,x1) => x0.height = x1,
      _1199: (x0,x1) => x0.getContext(x1),
      _1275: (x0,x1) => x0.fetch(x1),
      _1276: x0 => x0.status,
      _1278: x0 => x0.body,
      _1279: x0 => x0.arrayBuffer(),
      _1285: x0 => x0.read(),
      _1286: x0 => x0.value,
      _1287: x0 => x0.done,
      _1289: x0 => x0.name,
      _1290: x0 => x0.x,
      _1291: x0 => x0.y,
      _1294: x0 => x0.top,
      _1295: x0 => x0.right,
      _1296: x0 => x0.bottom,
      _1297: x0 => x0.left,
      _1306: x0 => x0.height,
      _1307: x0 => x0.width,
      _1308: (x0,x1) => x0.value = x1,
      _1310: (x0,x1) => x0.placeholder = x1,
      _1311: (x0,x1) => x0.name = x1,
      _1312: x0 => x0.selectionDirection,
      _1313: x0 => x0.selectionStart,
      _1314: x0 => x0.selectionEnd,
      _1317: x0 => x0.value,
      _1319: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1322: x0 => x0.readText(),
      _1323: (x0,x1) => x0.writeText(x1),
      _1324: x0 => x0.altKey,
      _1325: x0 => x0.code,
      _1326: x0 => x0.ctrlKey,
      _1327: x0 => x0.key,
      _1328: x0 => x0.keyCode,
      _1329: x0 => x0.location,
      _1330: x0 => x0.metaKey,
      _1331: x0 => x0.repeat,
      _1332: x0 => x0.shiftKey,
      _1333: x0 => x0.isComposing,
      _1334: (x0,x1) => x0.getModifierState(x1),
      _1336: x0 => x0.state,
      _1337: (x0,x1) => x0.go(x1),
      _1339: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _1341: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _1342: x0 => x0.pathname,
      _1343: x0 => x0.search,
      _1344: x0 => x0.hash,
      _1348: x0 => x0.state,
      _1356: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1356(f,arguments.length,x0,x1) }),
      _1358: (x0,x1,x2) => x0.observe(x1,x2),
      _1361: x0 => x0.attributeName,
      _1362: x0 => x0.type,
      _1363: x0 => x0.matches,
      _1366: x0 => x0.matches,
      _1368: x0 => x0.relatedTarget,
      _1369: x0 => x0.clientX,
      _1370: x0 => x0.clientY,
      _1371: x0 => x0.offsetX,
      _1372: x0 => x0.offsetY,
      _1375: x0 => x0.button,
      _1376: x0 => x0.buttons,
      _1377: x0 => x0.ctrlKey,
      _1378: (x0,x1) => x0.getModifierState(x1),
      _1381: x0 => x0.pointerId,
      _1382: x0 => x0.pointerType,
      _1383: x0 => x0.pressure,
      _1384: x0 => x0.tiltX,
      _1385: x0 => x0.tiltY,
      _1386: x0 => x0.getCoalescedEvents(),
      _1388: x0 => x0.deltaX,
      _1389: x0 => x0.deltaY,
      _1390: x0 => x0.wheelDeltaX,
      _1391: x0 => x0.wheelDeltaY,
      _1392: x0 => x0.deltaMode,
      _1398: x0 => x0.changedTouches,
      _1400: x0 => x0.clientX,
      _1401: x0 => x0.clientY,
      _1403: x0 => x0.data,
      _1406: (x0,x1) => x0.disabled = x1,
      _1407: (x0,x1) => x0.type = x1,
      _1408: (x0,x1) => x0.max = x1,
      _1409: (x0,x1) => x0.min = x1,
      _1410: (x0,x1) => x0.value = x1,
      _1411: x0 => x0.value,
      _1412: x0 => x0.disabled,
      _1413: (x0,x1) => x0.disabled = x1,
      _1414: (x0,x1) => x0.placeholder = x1,
      _1415: (x0,x1) => x0.name = x1,
      _1416: (x0,x1) => x0.autocomplete = x1,
      _1417: x0 => x0.selectionDirection,
      _1418: x0 => x0.selectionStart,
      _1419: x0 => x0.selectionEnd,
      _1423: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1428: (x0,x1) => x0.add(x1),
      _1432: (x0,x1) => x0.noValidate = x1,
      _1433: (x0,x1) => x0.method = x1,
      _1434: (x0,x1) => x0.action = x1,
      _1459: x0 => x0.orientation,
      _1460: x0 => x0.width,
      _1461: x0 => x0.height,
      _1462: (x0,x1) => x0.lock(x1),
      _1478: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1478(f,arguments.length,x0,x1) }),
      _1489: x0 => x0.length,
      _1491: (x0,x1) => x0.item(x1),
      _1492: x0 => x0.length,
      _1493: (x0,x1) => x0.item(x1),
      _1494: x0 => x0.iterator,
      _1495: x0 => x0.Segmenter,
      _1496: x0 => x0.v8BreakIterator,
      _1499: x0 => x0.done,
      _1500: x0 => x0.value,
      _1501: x0 => x0.index,
      _1505: (x0,x1) => x0.adoptText(x1),
      _1506: x0 => x0.first(),
      _1507: x0 => x0.next(),
      _1508: x0 => x0.current(),
      _1522: x0 => x0.hostElement,
      _1523: x0 => x0.viewConstraints,
      _1525: x0 => x0.maxHeight,
      _1526: x0 => x0.maxWidth,
      _1527: x0 => x0.minHeight,
      _1528: x0 => x0.minWidth,
      _1529: x0 => x0.loader,
      _1530: () => globalThis._flutter,
      _1531: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1532: (x0,x1,x2) => x0.call(x1,x2),
      _1533: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1533(f,arguments.length,x0,x1) }),
      _1534: x0 => new Promise(x0),
      _1537: x0 => x0.length,
      _1540: x0 => x0.tracks,
      _1544: x0 => x0.image,
      _1551: x0 => x0.displayWidth,
      _1552: x0 => x0.displayHeight,
      _1553: x0 => x0.duration,
      _1556: x0 => x0.ready,
      _1557: x0 => x0.selectedTrack,
      _1558: x0 => x0.repetitionCount,
      _1559: x0 => x0.frameCount,
      _1622: x0 => x0.onAdd(),
      _1623: (x0,x1) => x0.clearMarkers(x1),
      _1624: x0 => x0.onRemove(),
      _1629: (x0,x1) => new google.maps.Map(x0,x1),
      _1634: x0 => x0.close(),
      _1635: (x0,x1,x2) => x0.open(x1,x2),
      _1636: x0 => new google.maps.InfoWindow(x0),
      _1637: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1637(f,arguments.length,x0) }),
      _1638: x0 => new google.maps.Marker(x0),
      _1639: (x0,x1,x2) => x0.set(x1,x2),
      _1641: (x0,x1) => new google.maps.Size(x0,x1),
      _1642: (x0,x1) => x0.createElement(x1),
      _1644: x0 => new Blob(x0),
      _1653: () => ({}),
      _1654: (x0,x1) => new google.maps.LatLng(x0,x1),
      _1655: () => ({}),
      _1656: (x0,x1) => x0.appendChild(x1),
      _1657: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1657(f,arguments.length,x0) }),
      _1658: x0 => ({createHTML: x0}),
      _1659: (x0,x1,x2) => x0.createPolicy(x1,x2),
      _1660: (x0,x1) => x0.createHTML(x1),
      _1661: (x0,x1) => x0.appendChild(x1),
      _1662: () => ({}),
      _1663: x0 => globalThis.URL.createObjectURL(x0),
      _1664: () => ({}),
      _1665: x0 => globalThis.URL.createObjectURL(x0),
      _1666: () => ({}),
      _1681: x0 => globalThis.URL.revokeObjectURL(x0),
      _1682: x0 => x0.remove(),
      _1683: (x0,x1,x2,x3) => x0.drawImage(x1,x2,x3),
      _1684: x0 => globalThis.URL.createObjectURL(x0),
      _1685: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1685(f,arguments.length,x0) }),
      _1686: (x0,x1,x2,x3) => x0.toBlob(x1,x2,x3),
      _1687: x0 => x0.remove(),
      _1688: x0 => globalThis.URL.createObjectURL(x0),
      _1689: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1689(f,arguments.length,x0) }),
      _1690: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1690(f,arguments.length,x0) }),
      _1691: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1691(f,arguments.length,x0) }),
      _1692: (x0,x1) => x0.querySelector(x1),
      _1693: (x0,x1) => x0.append(x1),
      _1694: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1695: (x0,x1) => x0.replaceChildren(x1),
      _1696: (x0,x1) => x0.append(x1),
      _1697: x0 => x0.click(),
      _1699: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1700: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _1714: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _1715: (x0,x1) => x0.getItem(x1),
      _1716: (x0,x1) => x0.removeItem(x1),
      _1717: (x0,x1,x2) => x0.setItem(x1,x2),
      _1721: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1722: (x0,x1) => x0.querySelector(x1),
      _1723: (x0,x1) => x0.append(x1),
      _1724: (x0,x1) => x0.querySelector(x1),
      _1725: (x0,x1) => x0.querySelector(x1),
      _1726: x0 => x0.remove(),
      _1727: (x0,x1) => x0.append(x1),
      _1728: (x0,x1) => x0.querySelector(x1),
      _1729: (x0,x1) => x0.getAttribute(x1),
      _1730: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1731: () => globalThis.removeSplashFromWeb(),
      _1741: () => new Array(),
      _1742: x0 => new Array(x0),
      _1744: x0 => x0.length,
      _1746: (x0,x1) => x0[x1],
      _1747: (x0,x1,x2) => x0[x1] = x2,
      _1750: (x0,x1,x2) => new DataView(x0,x1,x2),
      _1752: x0 => new Int8Array(x0),
      _1753: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _1754: x0 => new Uint8Array(x0),
      _1762: x0 => new Int32Array(x0),
      _1764: x0 => new Uint32Array(x0),
      _1766: x0 => new Float32Array(x0),
      _1768: x0 => new Float64Array(x0),
      _1769: (o, t) => typeof o === t,
      _1770: (o, c) => o instanceof c,
      _1774: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1774(f,arguments.length,x0) }),
      _1775: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1775(f,arguments.length,x0) }),
      _1800: (decoder, codeUnits) => decoder.decode(codeUnits),
      _1801: () => new TextDecoder("utf-8", {fatal: true}),
      _1802: () => new TextDecoder("utf-8", {fatal: false}),
      _1803: x0 => new WeakRef(x0),
      _1804: x0 => x0.deref(),
      _1810: Date.now,
      _1812: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _1813: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _1814: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _1815: () => typeof dartUseDateNowForTicks !== "undefined",
      _1816: () => 1000 * performance.now(),
      _1817: () => Date.now(),
      _1818: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _1819: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _1820: () => new WeakMap(),
      _1821: (map, o) => map.get(o),
      _1822: (map, o, v) => map.set(o, v),
      _1823: () => globalThis.WeakRef,
      _1834: s => JSON.stringify(s),
      _1835: s => printToConsole(s),
      _1836: a => a.join(''),
      _1837: (o, a, b) => o.replace(a, b),
      _1839: (s, t) => s.split(t),
      _1840: s => s.toLowerCase(),
      _1841: s => s.toUpperCase(),
      _1842: s => s.trim(),
      _1843: s => s.trimLeft(),
      _1844: s => s.trimRight(),
      _1846: (s, p, i) => s.indexOf(p, i),
      _1847: (s, p, i) => s.lastIndexOf(p, i),
      _1848: (s) => s.replace(/\$/g, "$$$$"),
      _1849: Object.is,
      _1850: s => s.toUpperCase(),
      _1851: s => s.toLowerCase(),
      _1852: (a, i) => a.push(i),
      _1856: a => a.pop(),
      _1857: (a, i) => a.splice(i, 1),
      _1859: (a, s) => a.join(s),
      _1860: (a, s, e) => a.slice(s, e),
      _1862: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
      _1863: a => a.length,
      _1865: (a, i) => a[i],
      _1866: (a, i, v) => a[i] = v,
      _1868: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _1869: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _1870: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _1871: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _1872: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _1873: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _1874: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _1875: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _1877: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _1878: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _1879: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _1880: (t, s) => t.set(s),
      _1881: l => new DataView(new ArrayBuffer(l)),
      _1882: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _1884: o => o.buffer,
      _1885: o => o.byteOffset,
      _1886: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _1887: (b, o) => new DataView(b, o),
      _1888: (b, o, l) => new DataView(b, o, l),
      _1889: Function.prototype.call.bind(DataView.prototype.getUint8),
      _1890: Function.prototype.call.bind(DataView.prototype.setUint8),
      _1891: Function.prototype.call.bind(DataView.prototype.getInt8),
      _1892: Function.prototype.call.bind(DataView.prototype.setInt8),
      _1893: Function.prototype.call.bind(DataView.prototype.getUint16),
      _1894: Function.prototype.call.bind(DataView.prototype.setUint16),
      _1895: Function.prototype.call.bind(DataView.prototype.getInt16),
      _1896: Function.prototype.call.bind(DataView.prototype.setInt16),
      _1897: Function.prototype.call.bind(DataView.prototype.getUint32),
      _1898: Function.prototype.call.bind(DataView.prototype.setUint32),
      _1899: Function.prototype.call.bind(DataView.prototype.getInt32),
      _1900: Function.prototype.call.bind(DataView.prototype.setInt32),
      _1903: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _1904: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _1905: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _1906: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _1907: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _1908: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _1921: () => new XMLHttpRequest(),
      _1922: (x0,x1,x2) => x0.open(x1,x2),
      _1923: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1924: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1925: x0 => x0.abort(),
      _1926: x0 => x0.abort(),
      _1927: x0 => x0.abort(),
      _1928: x0 => x0.abort(),
      _1929: (x0,x1) => x0.send(x1),
      _1930: x0 => x0.send(),
      _1932: x0 => x0.getAllResponseHeaders(),
      _1933: (o, t) => o instanceof t,
      _1935: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1935(f,arguments.length,x0) }),
      _1936: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1936(f,arguments.length,x0) }),
      _1937: o => Object.keys(o),
      _1938: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _1939: (handle) => clearTimeout(handle),
      _1940: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      _1941: (handle) => clearInterval(handle),
      _1942: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _1943: () => Date.now(),
      _1950: (x0,x1,x2) => x0.transaction(x1,x2),
      _1951: (x0,x1) => x0.objectStore(x1),
      _1952: (x0,x1) => x0.getAllKeys(x1),
      _1954: (x0,x1) => x0.get(x1),
      _1955: (x0,x1) => x0.delete(x1),
      _1956: (x0,x1,x2) => x0.put(x1,x2),
      _1958: x0 => x0.close(),
      _1960: (x0,x1,x2) => x0.open(x1,x2),
      _1965: (x0,x1) => x0.contains(x1),
      _1966: (x0,x1) => x0.createObjectStore(x1),
      _1967: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1967(f,arguments.length,x0) }),
      _1968: (x0,x1) => x0.contains(x1),
      _1969: (x0,x1) => x0.contains(x1),
      _1970: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1970(f,arguments.length,x0) }),
      _2001: (x0,x1,x2,x3,x4,x5) => ({method: x0,headers: x1,body: x2,credentials: x3,redirect: x4,signal: x5}),
      _2002: (x0,x1,x2) => x0.fetch(x1,x2),
      _2003: (x0,x1) => x0.get(x1),
      _2004: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2004(f,arguments.length,x0,x1,x2) }),
      _2005: (x0,x1) => x0.forEach(x1),
      _2006: x0 => x0.abort(),
      _2007: () => new AbortController(),
      _2008: x0 => x0.getReader(),
      _2009: x0 => x0.read(),
      _2010: x0 => x0.cancel(),
      _2015: () => new XMLHttpRequest(),
      _2016: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
      _2018: () => new FileReader(),
      _2019: (x0,x1) => x0.readAsArrayBuffer(x1),
      _2499: x0 => x0.getCenter(),
      _2506: x0 => x0.getHeading(),
      _2515: x0 => x0.getTilt(),
      _2518: x0 => x0.getZoom(),
      _2529: (x0,x1) => x0.setOptions(x1),
      _2539: f => finalizeWrapper(f, function() { return dartInstance.exports._2539(f,arguments.length) }),
      _2540: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _2541: x0 => x0.remove(),
      _2545: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2545(f,arguments.length,x0) }),
      _2546: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _2547: x0 => x0.remove(),
      _2566: f => finalizeWrapper(f, function() { return dartInstance.exports._2566(f,arguments.length) }),
      _2567: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _2568: x0 => x0.remove(),
      _2593: f => finalizeWrapper(f, function() { return dartInstance.exports._2593(f,arguments.length) }),
      _2594: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _2595: x0 => x0.remove(),
      _2602: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2602(f,arguments.length,x0) }),
      _2603: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _2604: x0 => x0.remove(),
      _2605: x0 => x0.latLng,
      _2647: x0 => x0.latLng,
      _2657: (x0,x1) => x0.center = x1,
      _2676: (x0,x1) => x0.fullscreenControl = x1,
      _2680: (x0,x1) => x0.gestureHandling = x1,
      _2689: (x0,x1) => x0.mapId = x1,
      _2692: (x0,x1) => x0.mapTypeControl = x1,
      _2696: (x0,x1) => x0.mapTypeId = x1,
      _2698: (x0,x1) => x0.maxZoom = x1,
      _2700: (x0,x1) => x0.minZoom = x1,
      _2711: x0 => x0.rotateControl,
      _2712: (x0,x1) => x0.rotateControl = x1,
      _2724: (x0,x1) => x0.streetViewControl = x1,
      _2727: (x0,x1) => x0.styles = x1,
      _2729: (x0,x1) => x0.tilt = x1,
      _2734: (x0,x1) => x0.zoom = x1,
      _2736: (x0,x1) => x0.zoomControl = x1,
      _2744: () => globalThis.google.maps.MapTypeId.HYBRID,
      _2745: () => globalThis.google.maps.MapTypeId.ROADMAP,
      _2746: () => globalThis.google.maps.MapTypeId.SATELLITE,
      _2747: () => globalThis.google.maps.MapTypeId.TERRAIN,
      _2752: (x0,x1) => x0.stylers = x1,
      _2753: (x0,x1) => x0.elementType = x1,
      _2755: (x0,x1) => x0.featureType = x1,
      _2861: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._2861(f,arguments.length,x0,x1,x2) }),
      _2862: (x0,x1,x2) => ({map: x0,markers: x1,onClusterClick: x2}),
      _2876: x0 => new markerClusterer.MarkerClusterer(x0),
      _3593: x0 => x0.lat(),
      _3594: x0 => x0.lng(),
      _4635: (x0,x1) => x0.setContent(x1),
      _4678: x0 => x0.content,
      _4679: (x0,x1) => x0.content = x1,
      _4695: (x0,x1) => x0.zIndex = x1,
      _4807: (x0,x1) => x0.url = x1,
      _4815: (x0,x1) => x0.scaledSize = x1,
      _4817: (x0,x1) => x0.size = x1,
      _4825: x0 => x0.getMap(),
      _4843: (x0,x1) => x0.setMap(x1),
      _4847: (x0,x1) => x0.setOptions(x1),
      _4848: (x0,x1) => x0.setPosition(x1),
      _4852: (x0,x1) => x0.setVisible(x1),
      _4857: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._4857(f,arguments.length,x0) }),
      _4858: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _4859: x0 => x0.remove(),
      _4872: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._4872(f,arguments.length,x0) }),
      _4873: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _4874: x0 => x0.remove(),
      _4875: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._4875(f,arguments.length,x0) }),
      _4876: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _4877: x0 => x0.remove(),
      _4881: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._4881(f,arguments.length,x0) }),
      _4882: (x0,x1,x2) => globalThis.google.maps.event.addListener(x0,x1,x2),
      _4883: x0 => x0.remove(),
      _4947: (x0,x1) => x0.draggable = x1,
      _4949: (x0,x1) => x0.icon = x1,
      _4955: (x0,x1) => x0.opacity = x1,
      _4959: (x0,x1) => x0.position = x1,
      _4963: (x0,x1) => x0.title = x1,
      _4965: (x0,x1) => x0.visible = x1,
      _4967: (x0,x1) => x0.zIndex = x1,
      _5027: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._5027(f,arguments.length,x0) }),
      _5028: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._5028(f,arguments.length,x0) }),
      _5029: x0 => x0.openCursor(),
      _5030: x0 => x0.continue(),
      _5031: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._5031(f,arguments.length,x0) }),
      _5032: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._5032(f,arguments.length,x0) }),
      _5078: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._5078(f,arguments.length,x0) }),
      _5079: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._5079(f,arguments.length,x0) }),
      _5089: (x0,x1) => x0.key(x1),
      _5090: (x0,x1) => x0.item(x1),
      _5091: x0 => x0.trustedTypes,
      _5092: (x0,x1) => x0.innerHTML = x1,
      _5093: (x0,x1) => x0.innerHTML = x1,
      _5100: (x0,x1) => x0.getContext(x1),
      _5110: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _5111: (x0,x1) => x0.exec(x1),
      _5112: (x0,x1) => x0.test(x1),
      _5113: (x0,x1) => x0.exec(x1),
      _5114: (x0,x1) => x0.exec(x1),
      _5115: x0 => x0.pop(),
      _5117: o => o === undefined,
      _5136: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _5138: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _5139: o => o instanceof RegExp,
      _5140: (l, r) => l === r,
      _5141: o => o,
      _5142: o => o,
      _5143: o => o,
      _5144: b => !!b,
      _5145: o => o.length,
      _5148: (o, i) => o[i],
      _5149: f => f.dartFunction,
      _5150: l => arrayFromDartList(Int8Array, l),
      _5151: l => arrayFromDartList(Uint8Array, l),
      _5152: l => arrayFromDartList(Uint8ClampedArray, l),
      _5153: l => arrayFromDartList(Int16Array, l),
      _5154: l => arrayFromDartList(Uint16Array, l),
      _5155: l => arrayFromDartList(Int32Array, l),
      _5156: l => arrayFromDartList(Uint32Array, l),
      _5157: l => arrayFromDartList(Float32Array, l),
      _5158: l => arrayFromDartList(Float64Array, l),
      _5159: x0 => new ArrayBuffer(x0),
      _5160: (data, length) => {
        const getValue = dartInstance.exports.$byteDataGetUint8;
        const view = new DataView(new ArrayBuffer(length));
        for (let i = 0; i < length; i++) {
          view.setUint8(i, getValue(data, i));
        }
        return view;
      },
      _5161: l => arrayFromDartList(Array, l),
      _5162: () => ({}),
      _5163: () => [],
      _5164: l => new Array(l),
      _5165: () => globalThis,
      _5166: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _5167: (o, p) => p in o,
      _5168: (o, p) => o[p],
      _5169: (o, p, v) => o[p] = v,
      _5170: (o, m, a) => o[m].apply(o, a),
      _5172: o => String(o),
      _5173: (p, s, f) => p.then(s, f),
      _5174: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        return 17;
      },
      _5175: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _5176: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _5179: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _5180: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _5181: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _5182: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _5183: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _5184: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _5185: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _5187: x0 => x0.input,
      _5188: x0 => x0.index,
      _5189: x0 => x0.groups,
      _5193: x0 => x0.flags,
      _5194: x0 => x0.multiline,
      _5195: x0 => x0.ignoreCase,
      _5196: x0 => x0.unicode,
      _5197: x0 => x0.dotAll,
      _5198: (x0,x1) => x0.lastIndex = x1,
      _5199: (o, p) => p in o,
      _5200: (o, p) => o[p],
      _5203: x0 => x0.random(),
      _5204: x0 => x0.random(),
      _5205: (x0,x1) => x0.getRandomValues(x1),
      _5206: () => globalThis.crypto,
      _5208: () => globalThis.Math,
      _5210: Function.prototype.call.bind(Number.prototype.toString),
      _5211: (d, digits) => d.toFixed(digits),
      _5356: x0 => x0.readyState,
      _5358: (x0,x1) => x0.timeout = x1,
      _5360: (x0,x1) => x0.withCredentials = x1,
      _5361: x0 => x0.upload,
      _5362: x0 => x0.responseURL,
      _5363: x0 => x0.status,
      _5364: x0 => x0.statusText,
      _5366: (x0,x1) => x0.responseType = x1,
      _5367: x0 => x0.response,
      _5381: x0 => x0.loaded,
      _5382: x0 => x0.total,
      _5437: (x0,x1) => x0.innerText = x1,
      _5447: x0 => x0.style,
      _5460: (x0,x1) => x0.oncancel = x1,
      _5466: (x0,x1) => x0.onchange = x1,
      _5468: (x0,x1) => x0.onclick = x1,
      _5506: (x0,x1) => x0.onerror = x1,
      _5662: (x0,x1) => x0.href = x1,
      _5879: (x0,x1) => x0.src = x1,
      _5890: x0 => x0.width,
      _5892: x0 => x0.height,
      _6379: (x0,x1) => x0.accept = x1,
      _6393: x0 => x0.files,
      _6419: (x0,x1) => x0.multiple = x1,
      _6437: (x0,x1) => x0.type = x1,
      _6692: (x0,x1) => x0.src = x1,
      _6698: (x0,x1) => x0.async = x1,
      _6738: (x0,x1) => x0.width = x1,
      _6740: (x0,x1) => x0.height = x1,
      _7178: () => globalThis.window,
      _7219: x0 => x0.self,
      _7223: x0 => x0.location,
      _7242: x0 => x0.navigator,
      _7499: x0 => x0.indexedDB,
      _7504: x0 => x0.trustedTypes,
      _7506: x0 => x0.localStorage,
      _7514: x0 => x0.href,
      _7633: x0 => x0.userAgent,
      _7634: x0 => x0.vendor,
      _7853: x0 => x0.length,
      _9835: x0 => x0.type,
      _9836: x0 => x0.target,
      _9878: x0 => x0.signal,
      _9957: () => globalThis.document,
      _10050: x0 => x0.body,
      _10401: (x0,x1) => x0.id = x1,
      _10403: (x0,x1) => x0.className = x1,
      _10424: x0 => x0.innerHTML,
      _10425: (x0,x1) => x0.innerHTML = x1,
      _11782: x0 => x0.value,
      _11784: x0 => x0.done,
      _11970: x0 => x0.size,
      _11971: x0 => x0.type,
      _11978: x0 => x0.name,
      _11979: x0 => x0.lastModified,
      _11985: x0 => x0.length,
      _11996: x0 => x0.result,
      _12505: x0 => x0.url,
      _12507: x0 => x0.status,
      _12509: x0 => x0.statusText,
      _12510: x0 => x0.headers,
      _12511: x0 => x0.body,
      _13984: x0 => x0.result,
      _13985: x0 => x0.error,
      _13990: (x0,x1) => x0.onsuccess = x1,
      _13992: (x0,x1) => x0.onerror = x1,
      _13996: (x0,x1) => x0.onupgradeneeded = x1,
      _14017: x0 => x0.version,
      _14018: x0 => x0.objectStoreNames,
      _14090: x0 => x0.key,
      _15106: (x0,x1) => x0.height = x1,
      _15796: (x0,x1) => x0.width = x1,
      _16927: (x0,x1,x2,x3,x4,x5,x6,x7) => ({hue: x0,lightness: x1,saturation: x2,gamma: x3,invert_lightness: x4,visibility: x5,color: x6,weight: x7}),

    };

    const baseImports = {
      dart2wasm: dart2wasm,


      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
    };

    const deferredLibraryHelper = {
      "loadModule": async (moduleName) => {
        if (!loadDeferredWasm) {
          throw "No implementation of loadDeferredWasm provided.";
        }
        const source = await Promise.resolve(loadDeferredWasm(moduleName));
        const module = await ((source instanceof Response)
            ? WebAssembly.compileStreaming(source, this.builtins)
            : WebAssembly.compile(source, this.builtins));
        return await WebAssembly.instantiate(module, {
          ...baseImports,
          ...additionalImports,
          "wasm:js-string": jsStringPolyfill,
          "module0": dartInstance.exports,
        });
      },
    };

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      "deferredLibraryHelper": deferredLibraryHelper,
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}

