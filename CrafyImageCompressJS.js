// gifuct-js
!function e(r, t, a) { function n(i, o) { if (!t[i]) { if (!r[i]) { var p = "function" == typeof require && require; if (!o && p) return p(i, !0); if (s) return s(i, !0); var l = new Error("Cannot find module '" + i + "'"); throw l.code = "MODULE_NOT_FOUND", l } var u = t[i] = { exports: {} }; r[i][0].call(u.exports, function (e) { var t = r[i][1][e]; return n(t ? t : e) }, u, u.exports, e, r, t, a) } return t[i].exports } for (var s = "function" == typeof require && require, i = 0; i < a.length; i++)n(a[i]); return n }({ 1: [function (e, r, t) { function a(e) { this.data = e, this.pos = 0 } a.prototype.readByte = function () { return this.data[this.pos++] }, a.prototype.peekByte = function () { return this.data[this.pos] }, a.prototype.readBytes = function (e) { for (var r = new Array(e), t = 0; e > t; t++)r[t] = this.readByte(); return r }, a.prototype.peekBytes = function (e) { for (var r = new Array(e), t = 0; e > t; t++)r[t] = this.data[this.pos + t]; return r }, a.prototype.readString = function (e) { for (var r = "", t = 0; e > t; t++)r += String.fromCharCode(this.readByte()); return r }, a.prototype.readBitArray = function () { for (var e = [], r = this.readByte(), t = 7; t >= 0; t--)e.push(!!(r & 1 << t)); return e }, a.prototype.readUnsigned = function (e) { var r = this.readBytes(2); return e ? (r[1] << 8) + r[0] : (r[0] << 8) + r[1] }, r.exports = a }, {}], 2: [function (e, r, t) { function a(e) { this.stream = new s(e), this.output = {} } function n(e) { return e.reduce(function (e, r) { return 2 * e + r }, 0) } var s = e("./bytestream"); a.prototype.parse = function (e) { return this.parseParts(this.output, e), this.output }, a.prototype.parseParts = function (e, r) { for (var t = 0; t < r.length; t++) { var a = r[t]; this.parsePart(e, a) } }, a.prototype.parsePart = function (e, r) { var t, a = r.label; if (!r.requires || r.requires(this.stream, this.output, e)) if (r.loop) { for (var n = []; r.loop(this.stream);) { var s = {}; this.parseParts(s, r.parts), n.push(s) } e[a] = n } else r.parts ? (t = {}, this.parseParts(t, r.parts), e[a] = t) : r.parser ? (t = r.parser(this.stream, this.output, e), r.skip || (e[a] = t)) : r.bits && (e[a] = this.parseBits(r.bits)) }, a.prototype.parseBits = function (e) { var r = {}, t = this.stream.readBitArray(); for (var a in e) { var s = e[a]; r[a] = s.length ? n(t.slice(s.index, s.index + s.length)) : t[s.index] } return r }, r.exports = a }, { "./bytestream": 1 }], 3: [function (e, r, t) { var a = { readByte: function () { return function (e) { return e.readByte() } }, readBytes: function (e) { return function (r) { return r.readBytes(e) } }, readString: function (e) { return function (r) { return r.readString(e) } }, readUnsigned: function (e) { return function (r) { return r.readUnsigned(e) } }, readArray: function (e, r) { return function (t, a, n) { for (var s = r(t, a, n), i = new Array(s), o = 0; s > o; o++)i[o] = t.readBytes(e); return i } } }; r.exports = a }, {}], 4: [function (e, r, t) { var a = window.GIFUCT || {}; a = e("./gif"), window.GIFUCT = a }, { "./gif": 5 }], 5: [function (e, r, t) { function a(e) { var r = new Uint8Array(e), t = new n(r); this.raw = t.parse(s), this.raw.hasImages = !1; for (var a = 0; a < this.raw.frames.length; a++)if (this.raw.frames[a].image) { this.raw.hasImages = !0; break } } var n = e("../bower_components/js-binary-schema-parser/src/dataparser"), s = e("./schema"); a.prototype.decompressFrame = function (e, r) { function t(e, r, t) { var a, n, s, i, o, p, l, u, d, c, f, h, y, g, b, m, v = 4096, x = -1, w = t, B = new Array(t), k = new Array(v), A = new Array(v), S = new Array(v + 1); for (h = e, n = 1 << h, o = n + 1, a = n + 2, l = x, i = h + 1, s = (1 << i) - 1, d = 0; n > d; d++)k[d] = 0, A[d] = d; for (f = u = count = y = g = m = b = 0, c = 0; w > c;) { if (0 === g) { if (i > u) { f += r[b] << u, u += 8, b++; continue } if (d = f & s, f >>= i, u -= i, d > a || d == o) break; if (d == n) { i = h + 1, s = (1 << i) - 1, a = n + 2, l = x; continue } if (l == x) { S[g++] = A[d], l = d, y = d; continue } for (p = d, d == a && (S[g++] = y, d = l); d > n;)S[g++] = A[d], d = k[d]; y = 255 & A[d], S[g++] = y, v > a && (k[a] = l, A[a] = y, a++, 0 === (a & s) && v > a && (i++, s += a)), l = p } g--, B[m++] = S[g], c++ } for (c = m; w > c; c++)B[c] = 0; return B } function a(e, r) { for (var t = new Array(e.length), a = e.length / r, n = function (a, n) { var s = e.slice(n * r, (n + 1) * r); t.splice.apply(t, [a * r, r].concat(s)) }, s = [0, 4, 2, 1], i = [8, 8, 4, 2], o = 0, p = 0; 4 > p; p++)for (var l = s[p]; a > l; l += i[p])n(l, o), o++; return t } function n(e) { for (var r = e.pixels.length, t = new Uint8ClampedArray(4 * r), a = 0; r > a; a++) { var n = 4 * a, s = e.pixels[a], i = e.colorTable[s]; t[n] = i[0], t[n + 1] = i[1], t[n + 2] = i[2], t[n + 3] = s !== e.transparentIndex ? 255 : 0 } return t } if (e >= this.raw.frames.length) return null; var s = this.raw.frames[e]; if (s.image) { var i = s.image.descriptor.width * s.image.descriptor.height, o = t(s.image.data.minCodeSize, s.image.data.blocks, i); s.image.descriptor.lct.interlaced && (o = a(o, s.image.descriptor.width)); var p = { pixels: o, dims: { top: s.image.descriptor.top, left: s.image.descriptor.left, width: s.image.descriptor.width, height: s.image.descriptor.height } }; return p.colorTable = s.image.descriptor.lct && s.image.descriptor.lct.exists ? s.image.lct : this.raw.gct, s.gce && (p.delay = 10 * (s.gce.delay || 10), p.disposalType = s.gce.extras.disposal, s.gce.extras.transparentColorGiven && (p.transparentIndex = s.gce.transparentColorIndex)), r && (p.patch = n(p)), p } return null }, a.prototype.decompressFrames = function (e) { for (var r = [], t = 0; t < this.raw.frames.length; t++) { var a = this.raw.frames[t]; a.image && r.push(this.decompressFrame(t, e)) } return r }, r.exports = a }, { "../bower_components/js-binary-schema-parser/src/dataparser": 2, "./schema": 6 }], 6: [function (e, r, t) { var a = e("../bower_components/js-binary-schema-parser/src/parsers"), n = { label: "blocks", parser: function (e) { for (var r = [], t = 0, a = e.readByte(); a !== t; a = e.readByte())r = r.concat(e.readBytes(a)); return r } }, s = { label: "gce", requires: function (e) { var r = e.peekBytes(2); return 33 === r[0] && 249 === r[1] }, parts: [{ label: "codes", parser: a.readBytes(2), skip: !0 }, { label: "byteSize", parser: a.readByte() }, { label: "extras", bits: { future: { index: 0, length: 3 }, disposal: { index: 3, length: 3 }, userInput: { index: 6 }, transparentColorGiven: { index: 7 } } }, { label: "delay", parser: a.readUnsigned(!0) }, { label: "transparentColorIndex", parser: a.readByte() }, { label: "terminator", parser: a.readByte(), skip: !0 }] }, i = { label: "image", requires: function (e) { var r = e.peekByte(); return 44 === r }, parts: [{ label: "code", parser: a.readByte(), skip: !0 }, { label: "descriptor", parts: [{ label: "left", parser: a.readUnsigned(!0) }, { label: "top", parser: a.readUnsigned(!0) }, { label: "width", parser: a.readUnsigned(!0) }, { label: "height", parser: a.readUnsigned(!0) }, { label: "lct", bits: { exists: { index: 0 }, interlaced: { index: 1 }, sort: { index: 2 }, future: { index: 3, length: 2 }, size: { index: 5, length: 3 } } }] }, { label: "lct", requires: function (e, r, t) { return t.descriptor.lct.exists }, parser: a.readArray(3, function (e, r, t) { return Math.pow(2, t.descriptor.lct.size + 1) }) }, { label: "data", parts: [{ label: "minCodeSize", parser: a.readByte() }, n] }] }, o = { label: "text", requires: function (e) { var r = e.peekBytes(2); return 33 === r[0] && 1 === r[1] }, parts: [{ label: "codes", parser: a.readBytes(2), skip: !0 }, { label: "blockSize", parser: a.readByte() }, { label: "preData", parser: function (e, r, t) { return e.readBytes(t.text.blockSize) } }, n] }, p = { label: "application", requires: function (e, r, t) { var a = e.peekBytes(2); return 33 === a[0] && 255 === a[1] }, parts: [{ label: "codes", parser: a.readBytes(2), skip: !0 }, { label: "blockSize", parser: a.readByte() }, { label: "id", parser: function (e, r, t) { return e.readString(t.blockSize) } }, n] }, l = { label: "comment", requires: function (e, r, t) { var a = e.peekBytes(2); return 33 === a[0] && 254 === a[1] }, parts: [{ label: "codes", parser: a.readBytes(2), skip: !0 }, n] }, u = { label: "frames", parts: [s, p, l, i, o], loop: function (e) { var r = e.peekByte(); return 33 === r || 44 === r } }, d = [{ label: "header", parts: [{ label: "signature", parser: a.readString(3) }, { label: "version", parser: a.readString(3) }] }, { label: "lsd", parts: [{ label: "width", parser: a.readUnsigned(!0) }, { label: "height", parser: a.readUnsigned(!0) }, { label: "gct", bits: { exists: { index: 0 }, resolution: { index: 1, length: 3 }, sort: { index: 4 }, size: { index: 5, length: 3 } } }, { label: "backgroundColorIndex", parser: a.readByte() }, { label: "pixelAspectRatio", parser: a.readByte() }] }, { label: "gct", requires: function (e, r) { return r.lsd.gct.exists }, parser: a.readArray(3, function (e, r) { return Math.pow(2, r.lsd.gct.size + 1) }) }, u]; r.exports = d }, { "../bower_components/js-binary-schema-parser/src/parsers": 3 }] }, {}, [4]);

// compressorjs
/*!
 * Compressor.js v1.2.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-02-28T14:09:41.732Z
 */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Compressor = t() }(this, function () { "use strict"; function t(t, e) { var r, i = Object.keys(t); return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t), e && (r = r.filter(function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), i.push.apply(i, r)), i } function n(i) { for (var e = 1; e < arguments.length; e++) { var n = null != arguments[e] ? arguments[e] : {}; e % 2 ? t(Object(n), !0).forEach(function (e) { var t, r; t = i, r = n[e = e], (e = o(e)) in t ? Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = r }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(n)) : t(Object(n)).forEach(function (e) { Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(n, e)) }) } return i } function a(e, t) { for (var r = 0; r < t.length; r++) { var i = t[r]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, o(i.key), i) } } function s() { return (s = Object.assign ? Object.assign.bind() : function (e) { for (var t = 1; t < arguments.length; t++) { var r, i = arguments[t]; for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]) } return e }).apply(this, arguments) } function o(e) { e = function (e, t) { if ("object" != typeof e || null === e) return e; var r = e[Symbol.toPrimitive]; if (void 0 === r) return ("string" === t ? String : Number)(e); if ("object" != typeof (r = r.call(e, t || "default"))) return r; throw new TypeError("@@toPrimitive must return a primitive value.") }(e, "string"); return "symbol" == typeof e ? e : String(e) } function O(e) { return 0 < e && e < 1 / 0 } var e, r, l, c, h, u, f, d, i = { exports: {} }, j = (e = i, "undefined" != typeof window && (l = (r = window).HTMLCanvasElement && r.HTMLCanvasElement.prototype, c = r.Blob && function () { try { return Boolean(new Blob) } catch (e) { return !1 } }(), h = c && r.Uint8Array && function () { try { return 100 === new Blob([new Uint8Array(100)]).size } catch (e) { return !1 } }(), u = r.BlobBuilder || r.WebKitBlobBuilder || r.MozBlobBuilder || r.MSBlobBuilder, f = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, d = (c || u) && r.atob && r.ArrayBuffer && r.Uint8Array && function (e) { var t, r, i, n, a, o = e.match(f); if (!o) throw new Error("invalid data URI"); for (t = o[2] ? o[1] : "text/plain" + (o[3] || ";charset=US-ASCII"), a = !!o[4], e = e.slice(o[0].length), r = (a ? atob : decodeURIComponent)(e), o = new ArrayBuffer(r.length), i = new Uint8Array(o), n = 0; n < r.length; n += 1)i[n] = r.charCodeAt(n); return c ? new Blob([h ? i : o], { type: t }) : ((a = new u).append(o), a.getBlob(t)) }, r.HTMLCanvasElement && !l.toBlob && (l.mozGetAsFile ? l.toBlob = function (e, t, r) { var i = this; setTimeout(function () { r && l.toDataURL && d ? e(d(i.toDataURL(t, r))) : e(i.mozGetAsFile("blob", t)) }) } : l.toDataURL && d && (l.msToBlob ? l.toBlob = function (e, t, r) { var i = this; setTimeout(function () { (t && "image/png" !== t || r) && l.toDataURL && d ? e(d(i.toDataURL(t, r))) : e(i.msToBlob(t)) }) } : l.toBlob = function (e, t, r) { var i = this; setTimeout(function () { e(d(i.toDataURL(t, r))) }) })), e.exports ? e.exports = d : r.dataURLtoBlob = d), i.exports), m = { strict: !0, checkOrientation: !0, retainExif: !1, maxWidth: 1 / 0, maxHeight: 1 / 0, minWidth: 0, minHeight: 0, width: void 0, height: void 0, resize: "none", quality: .8, mimeType: "auto", convertTypes: ["image/png"], convertSize: 5e6, beforeDraw: null, drew: null, success: null, error: null }, b = "undefined" != typeof window && void 0 !== window.document ? window : {}, p = Array.prototype.slice; function x(e) { return Array.from ? Array.from(e) : p.call(e) } var g = /^image\/.+$/; function T(e) { return g.test(e) } var y = String.fromCharCode; var w = b.btoa; function A(e, t) { for (var r = [], i = new Uint8Array(e); 0 < i.length;)r.push(y.apply(null, x(i.subarray(0, 8192)))), i = i.subarray(8192); return "data:".concat(t, ";base64,").concat(w(r.join(""))) } function v(e) { var t, r, i, n, a, o, l, s = new DataView(e); try { if (255 === s.getUint8(0) && 216 === s.getUint8(1)) for (var c = s.byteLength, h = 2; h + 1 < c;) { if (255 === s.getUint8(h) && 225 === s.getUint8(h + 1)) { r = h; break } h += 1 } if (i = r && (n = r + 10, "Exif" === function (e, t, r) { var i, n = ""; for (r += t, i = t; i < r; i += 1)n += y(e.getUint8(i)); return n }(s, r + 4, 4)) && ((l = 18761 === (a = s.getUint16(n))) || 19789 === a) && 42 === s.getUint16(n + 2, l) && 8 <= (o = s.getUint32(n + 4, l)) ? n + o : i) for (var u, f = s.getUint16(i, l), d = 0; d < f; d += 1)if (u = i + 12 * d + 2, 274 === s.getUint16(u, l)) { u += 8, t = s.getUint16(u, l), s.setUint16(u, 1, l); break } } catch (e) { t = 1 } return t } var B = /\.\d*(?:0|9){12}\d*$/; function R(e, t) { t = 1 < arguments.length && void 0 !== t ? t : 1e11; return B.test(e) ? Math.round(e * t) / t : e } function E(e, t) { var r, i = e.aspectRatio, n = e.height, e = e.width, t = 1 < arguments.length && void 0 !== t ? t : "none", a = O(e), o = O(n); return a && o ? (r = n * i, ("contain" === t || "none" === t) && e < r || "cover" === t && r < e ? n = e / i : e = n * i) : a ? n = e / i : o && (e = n * i), { width: e, height: n } } var U = b.ArrayBuffer, k = b.FileReader, M = b.URL || b.webkitURL, D = /\.\w+$/, L = b.Compressor; return function () { function r(e, t) { if (!(this instanceof r)) throw new TypeError("Cannot call a class as a function"); this.file = e, this.exif = [], this.image = new Image, this.options = n(n({}, m), t), this.aborted = !1, this.result = null, this.init() } var e, t, i; return e = r, i = [{ key: "noConflict", value: function () { return window.Compressor = L, r } }, { key: "setDefaults", value: function (e) { s(m, e) } }], (t = [{ key: "init", value: function () { var i, n, a, e, o = this, l = this.file, t = this.options; e = l, "undefined" != typeof Blob && (e instanceof Blob || "[object Blob]" === Object.prototype.toString.call(e)) ? T(i = l.type) ? M && k ? (U || (t.checkOrientation = !1, t.retainExif = !1), n = (e = "image/jpeg" === i) && t.checkOrientation, a = e && t.retainExif, !M || n || a ? (e = new k, (this.reader = e).onload = function (e) { var e = e.target.result, t = {}, r = 1; n && 1 < (r = v(e)) && s(t, function (e) { var t = 0, r = 1, i = 1; switch (e) { case 2: r = -1; break; case 3: t = -180; break; case 4: i = -1; break; case 5: t = 90, i = -1; break; case 6: t = 90; break; case 7: t = 90, r = -1; break; case 8: t = -90 }return { rotate: t, scaleX: r, scaleY: i } }(r)), a && (o.exif = function (e) { for (var t = x(new Uint8Array(e)), r = t.length, i = [], n = 0; n + 3 < r;) { var a = t[n], o = t[n + 1]; if (255 === a && 218 === o) break; 255 === a && 216 === o ? n += 2 : (a = n + (256 * t[n + 2] + t[n + 3]) + 2, o = t.slice(n, a), i.push(o), n = a) } return i.reduce(function (e, t) { return 255 === t[0] && 225 === t[1] ? e.concat(t) : e }, []) }(e)), t.url = n || a ? !M || 1 < r ? A(e, i) : M.createObjectURL(l) : e, o.load(t) }, e.onabort = function () { o.fail(new Error("Aborted to read the image with FileReader.")) }, e.onerror = function () { o.fail(new Error("Failed to read the image with FileReader.")) }, e.onloadend = function () { o.reader = null }, n || a ? e.readAsArrayBuffer(l) : e.readAsDataURL(l)) : this.load({ url: M.createObjectURL(l) })) : this.fail(new Error("The current browser does not support image compression.")) : this.fail(new Error("The first argument must be an image File or Blob object.")) : this.fail(new Error("The first argument must be a File or Blob object.")) } }, { key: "load", value: function (e) { var t = this, r = this.file, i = this.image; i.onload = function () { t.draw(n(n({}, e), {}, { naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight })) }, i.onabort = function () { t.fail(new Error("Aborted to load the image.")) }, i.onerror = function () { t.fail(new Error("Failed to load the image.")) }, b.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(b.navigator.userAgent) && (i.crossOrigin = "anonymous"), i.alt = r.name, i.src = e.url } }, { key: "draw", value: function (e) { var n = this, a = e.naturalWidth, o = e.naturalHeight, t = e.rotate, t = void 0 === t ? 0 : t, r = e.scaleX, r = void 0 === r ? 1 : r, e = e.scaleY, e = void 0 === e ? 1 : e, i = this.file, l = this.image, s = this.options, c = document.createElement("canvas"), h = c.getContext("2d"), u = Math.abs(t) % 180 == 90, f = ("contain" === s.resize || "cover" === s.resize) && O(s.width) && O(s.height), d = Math.max(s.maxWidth, 0) || 1 / 0, m = Math.max(s.maxHeight, 0) || 1 / 0, b = Math.max(s.minWidth, 0) || 0, p = Math.max(s.minHeight, 0) || 0, g = a / o, y = s.width, w = s.height, v = (u && (d = (v = [m, d])[0], m = v[1], b = (v = [p, b])[0], p = v[1], y = (v = [w, y])[0], w = v[1]), E({ aspectRatio: g = f ? y / w : g, width: d, height: m }, "contain")), v = (d = v.width, m = v.height, E({ aspectRatio: g, width: b, height: p }, "cover")), v = (b = v.width, p = v.height, w = f ? (y = (v = E({ aspectRatio: g, width: y, height: w }, s.resize)).width, v.height) : (y = void 0 === (B = (v = E({ aspectRatio: g, width: y, height: w })).width) ? a : B, void 0 === (B = v.height) ? o : B), -(y = Math.floor(R(Math.min(Math.max(y, b), d)))) / 2), B = -(w = Math.floor(R(Math.min(Math.max(w, p), m)))) / 2, b = y, d = w, p = [], m = (f && (0, m = (g = E({ aspectRatio: g, width: m = a, height: f = o }, { contain: "cover", cover: "contain" }[s.resize])).width, f = g.height, p.push((a - m) / 2, (o - f) / 2, m, f)), p.push(v, B, b, d), u && (y = (g = [w, y])[0], w = g[1]), c.width = y, c.height = w, T(s.mimeType) || (s.mimeType = i.type), "transparent"), U = (i.size > s.convertSize && 0 <= s.convertTypes.indexOf(s.mimeType) && (s.mimeType = "image/jpeg"), "image/jpeg" === s.mimeType); h.fillStyle = m = U ? "#fff" : m, h.fillRect(0, 0, y, w), s.beforeDraw && s.beforeDraw.call(this, h, c), this.aborted || (h.save(), h.translate(y / 2, w / 2), h.rotate(t * Math.PI / 180), h.scale(r, e), h.drawImage.apply(h, [l].concat(p)), h.restore(), s.drew && s.drew.call(this, h, c), this.aborted) || (f = function (e) { var i, t, r; n.aborted || (i = function (e) { return n.done({ naturalWidth: a, naturalHeight: o, result: e }) }, e && U && s.retainExif && n.exif && 0 < n.exif.length ? (t = function (e) { return i(j(A((e = e, t = n.exif, 255 !== (r = x(new Uint8Array(e)))[2] || 224 !== r[3] ? e : (e = 256 * r[4] + r[5], t = [255, 216].concat(t, r.slice(4 + e)), new Uint8Array(t))), s.mimeType))); var t, r }, e.arrayBuffer ? e.arrayBuffer().then(t).catch(function () { n.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer().")) }) : (r = new k, (n.reader = r).onload = function (e) { e = e.target; t(e.result) }, r.onabort = function () { n.fail(new Error("Aborted to read the compressed image with FileReader.")) }, r.onerror = function () { n.fail(new Error("Failed to read the compressed image with FileReader.")) }, r.onloadend = function () { n.reader = null }, r.readAsArrayBuffer(e))) : i(e)) }, c.toBlob ? c.toBlob(f, s.mimeType, s.quality) : f(j(c.toDataURL(s.mimeType, s.quality)))) } }, { key: "done", value: function (e) { var t = e.naturalWidth, r = e.naturalHeight, e = e.result, i = this.file, n = this.image, a = this.options; M && 0 === n.src.indexOf("blob:") && M.revokeObjectURL(n.src), !e || a.strict && !a.retainExif && e.size > i.size && a.mimeType === i.type && !(a.width > t || a.height > r || a.minWidth > t || a.minHeight > r || a.maxWidth < t || a.maxHeight < r) ? e = i : (n = new Date, e.lastModified = n.getTime(), e.lastModifiedDate = n, e.name = i.name, e.name && e.type !== i.type && (e.name = e.name.replace(D, (t = T(t = e.type) ? t.substr(6) : "", ".".concat(t = "jpeg" === t ? "jpg" : t))))), this.result = e, a.success && a.success.call(this, e) } }, { key: "fail", value: function (e) { var t = this.options; if (!t.error) throw e; t.error.call(this, e) } }, { key: "abort", value: function () { this.aborted || (this.aborted = !0, this.reader ? this.reader.abort() : this.image.complete ? this.fail(new Error("The compression process has been aborted.")) : (this.image.onload = null, this.image.onabort())) } }]) && a(e.prototype, t), i && a(e, i), Object.defineProperty(e, "prototype", { writable: !1 }), r }() });

// gif.js 0.2.0 - https://github.com/jnordberg/gif.js
(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.GIF = f() } })(function () { var define, module, exports; return function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++)s(r[o]); return s }({ 1: [function (require, module, exports) { function EventEmitter() { this._events = this._events || {}; this._maxListeners = this._maxListeners || undefined } module.exports = EventEmitter; EventEmitter.EventEmitter = EventEmitter; EventEmitter.prototype._events = undefined; EventEmitter.prototype._maxListeners = undefined; EventEmitter.defaultMaxListeners = 10; EventEmitter.prototype.setMaxListeners = function (n) { if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number"); this._maxListeners = n; return this }; EventEmitter.prototype.emit = function (type) { var er, handler, len, args, i, listeners; if (!this._events) this._events = {}; if (type === "error") { if (!this._events.error || isObject(this._events.error) && !this._events.error.length) { er = arguments[1]; if (er instanceof Error) { throw er } else { var err = new Error('Uncaught, unspecified "error" event. (' + er + ")"); err.context = er; throw err } } } handler = this._events[type]; if (isUndefined(handler)) return false; if (isFunction(handler)) { switch (arguments.length) { case 1: handler.call(this); break; case 2: handler.call(this, arguments[1]); break; case 3: handler.call(this, arguments[1], arguments[2]); break; default: args = Array.prototype.slice.call(arguments, 1); handler.apply(this, args) } } else if (isObject(handler)) { args = Array.prototype.slice.call(arguments, 1); listeners = handler.slice(); len = listeners.length; for (i = 0; i < len; i++)listeners[i].apply(this, args) } return true }; EventEmitter.prototype.addListener = function (type, listener) { var m; if (!isFunction(listener)) throw TypeError("listener must be a function"); if (!this._events) this._events = {}; if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener); if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [this._events[type], listener]; if (isObject(this._events[type]) && !this._events[type].warned) { if (!isUndefined(this._maxListeners)) { m = this._maxListeners } else { m = EventEmitter.defaultMaxListeners } if (m && m > 0 && this._events[type].length > m) { this._events[type].warned = true; console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length); if (typeof console.trace === "function") { console.trace() } } } return this }; EventEmitter.prototype.on = EventEmitter.prototype.addListener; EventEmitter.prototype.once = function (type, listener) { if (!isFunction(listener)) throw TypeError("listener must be a function"); var fired = false; function g() { this.removeListener(type, g); if (!fired) { fired = true; listener.apply(this, arguments) } } g.listener = listener; this.on(type, g); return this }; EventEmitter.prototype.removeListener = function (type, listener) { var list, position, length, i; if (!isFunction(listener)) throw TypeError("listener must be a function"); if (!this._events || !this._events[type]) return this; list = this._events[type]; length = list.length; position = -1; if (list === listener || isFunction(list.listener) && list.listener === listener) { delete this._events[type]; if (this._events.removeListener) this.emit("removeListener", type, listener) } else if (isObject(list)) { for (i = length; i-- > 0;) { if (list[i] === listener || list[i].listener && list[i].listener === listener) { position = i; break } } if (position < 0) return this; if (list.length === 1) { list.length = 0; delete this._events[type] } else { list.splice(position, 1) } if (this._events.removeListener) this.emit("removeListener", type, listener) } return this }; EventEmitter.prototype.removeAllListeners = function (type) { var key, listeners; if (!this._events) return this; if (!this._events.removeListener) { if (arguments.length === 0) this._events = {}; else if (this._events[type]) delete this._events[type]; return this } if (arguments.length === 0) { for (key in this._events) { if (key === "removeListener") continue; this.removeAllListeners(key) } this.removeAllListeners("removeListener"); this._events = {}; return this } listeners = this._events[type]; if (isFunction(listeners)) { this.removeListener(type, listeners) } else if (listeners) { while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]) } delete this._events[type]; return this }; EventEmitter.prototype.listeners = function (type) { var ret; if (!this._events || !this._events[type]) ret = []; else if (isFunction(this._events[type])) ret = [this._events[type]]; else ret = this._events[type].slice(); return ret }; EventEmitter.prototype.listenerCount = function (type) { if (this._events) { var evlistener = this._events[type]; if (isFunction(evlistener)) return 1; else if (evlistener) return evlistener.length } return 0 }; EventEmitter.listenerCount = function (emitter, type) { return emitter.listenerCount(type) }; function isFunction(arg) { return typeof arg === "function" } function isNumber(arg) { return typeof arg === "number" } function isObject(arg) { return typeof arg === "object" && arg !== null } function isUndefined(arg) { return arg === void 0 } }, {}], 2: [function (require, module, exports) { var UA, browser, mode, platform, ua; ua = navigator.userAgent.toLowerCase(); platform = navigator.platform.toLowerCase(); UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, "unknown", 0]; mode = UA[1] === "ie" && document.documentMode; browser = { name: UA[1] === "version" ? UA[3] : UA[1], version: mode || parseFloat(UA[1] === "opera" && UA[4] ? UA[4] : UA[2]), platform: { name: ua.match(/ip(?:ad|od|hone)/) ? "ios" : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ["other"])[0] } }; browser[browser.name] = true; browser[browser.name + parseInt(browser.version, 10)] = true; browser.platform[browser.platform.name] = true; module.exports = browser }, {}], 3: [function (require, module, exports) { var EventEmitter, GIF, browser, extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key] } function ctor() { this.constructor = child } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i } return -1 }, slice = [].slice; EventEmitter = require("events").EventEmitter; browser = require("./browser.coffee"); GIF = function (superClass) { var defaults, frameDefaults; extend(GIF, superClass); defaults = { workerScript: "gif.worker.js", workers: 2, repeat: 0, background: "#fff", quality: 10, width: null, height: null, transparent: null, debug: false, dither: false }; frameDefaults = { delay: 500, copy: false, dispose: -1 }; function GIF(options) { var base, key, value; this.running = false; this.options = {}; this.frames = []; this.freeWorkers = []; this.activeWorkers = []; this.setOptions(options); for (key in defaults) { value = defaults[key]; if ((base = this.options)[key] == null) { base[key] = value } } } GIF.prototype.setOption = function (key, value) { this.options[key] = value; if (this._canvas != null && (key === "width" || key === "height")) { return this._canvas[key] = value } }; GIF.prototype.setOptions = function (options) { var key, results, value; results = []; for (key in options) { if (!hasProp.call(options, key)) continue; value = options[key]; results.push(this.setOption(key, value)) } return results }; GIF.prototype.addFrame = function (image, options) { var frame, key; if (options == null) { options = {} } frame = {}; frame.transparent = this.options.transparent; for (key in frameDefaults) { frame[key] = options[key] || frameDefaults[key] } if (this.options.width == null) { this.setOption("width", image.width) } if (this.options.height == null) { this.setOption("height", image.height) } if (typeof ImageData !== "undefined" && ImageData !== null && image instanceof ImageData) { frame.data = image.data } else if (typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D !== null && image instanceof CanvasRenderingContext2D || typeof WebGLRenderingContext !== "undefined" && WebGLRenderingContext !== null && image instanceof WebGLRenderingContext) { if (options.copy) { frame.data = this.getContextData(image) } else { frame.context = image } } else if (image.childNodes != null) { if (options.copy) { frame.data = this.getImageData(image) } else { frame.image = image } } else { throw new Error("Invalid image") } return this.frames.push(frame) }; GIF.prototype.render = function () { var i, j, numWorkers, ref; if (this.running) { throw new Error("Already running") } if (this.options.width == null || this.options.height == null) { throw new Error("Width and height must be set prior to rendering") } this.running = true; this.nextFrame = 0; this.finishedFrames = 0; this.imageParts = function () { var j, ref, results; results = []; for (i = j = 0, ref = this.frames.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) { results.push(null) } return results }.call(this); numWorkers = this.spawnWorkers(); if (this.options.globalPalette === true) { this.renderNextFrame() } else { for (i = j = 0, ref = numWorkers; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) { this.renderNextFrame() } } this.emit("start"); return this.emit("progress", 0) }; GIF.prototype.abort = function () { var worker; while (true) { worker = this.activeWorkers.shift(); if (worker == null) { break } this.log("killing active worker"); worker.terminate() } this.running = false; return this.emit("abort") }; GIF.prototype.spawnWorkers = function () { var j, numWorkers, ref, results; numWorkers = Math.min(this.options.workers, this.frames.length); (function () { results = []; for (var j = ref = this.freeWorkers.length; ref <= numWorkers ? j < numWorkers : j > numWorkers; ref <= numWorkers ? j++ : j--) { results.push(j) } return results }).apply(this).forEach(function (_this) { return function (i) { var worker; _this.log("spawning worker " + i); worker = new Worker(_this.options.workerScript); worker.onmessage = function (event) { _this.activeWorkers.splice(_this.activeWorkers.indexOf(worker), 1); _this.freeWorkers.push(worker); return _this.frameFinished(event.data) }; return _this.freeWorkers.push(worker) } }(this)); return numWorkers }; GIF.prototype.frameFinished = function (frame) { var i, j, ref; this.log("frame " + frame.index + " finished - " + this.activeWorkers.length + " active"); this.finishedFrames++; this.emit("progress", this.finishedFrames / this.frames.length); this.imageParts[frame.index] = frame; if (this.options.globalPalette === true) { this.options.globalPalette = frame.globalPalette; this.log("global palette analyzed"); if (this.frames.length > 2) { for (i = j = 1, ref = this.freeWorkers.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) { this.renderNextFrame() } } } if (indexOf.call(this.imageParts, null) >= 0) { return this.renderNextFrame() } else { return this.finishRendering() } }; GIF.prototype.finishRendering = function () { var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2; len = 0; ref = this.imageParts; for (j = 0, len1 = ref.length; j < len1; j++) { frame = ref[j]; len += (frame.data.length - 1) * frame.pageSize + frame.cursor } len += frame.pageSize - frame.cursor; this.log("rendering finished - filesize " + Math.round(len / 1e3) + "kb"); data = new Uint8Array(len); offset = 0; ref1 = this.imageParts; for (k = 0, len2 = ref1.length; k < len2; k++) { frame = ref1[k]; ref2 = frame.data; for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) { page = ref2[i]; data.set(page, offset); if (i === frame.data.length - 1) { offset += frame.cursor } else { offset += frame.pageSize } } } image = new Blob([data], { type: "image/gif" }); return this.emit("finished", image, data) }; GIF.prototype.renderNextFrame = function () { var frame, task, worker; if (this.freeWorkers.length === 0) { throw new Error("No free workers") } if (this.nextFrame >= this.frames.length) { return } frame = this.frames[this.nextFrame++]; worker = this.freeWorkers.shift(); task = this.getTask(frame); this.log("starting frame " + (task.index + 1) + " of " + this.frames.length); this.activeWorkers.push(worker); return worker.postMessage(task) }; GIF.prototype.getContextData = function (ctx) { return ctx.getImageData(0, 0, this.options.width, this.options.height).data }; GIF.prototype.getImageData = function (image) { var ctx; if (this._canvas == null) { this._canvas = document.createElement("canvas"); this._canvas.width = this.options.width; this._canvas.height = this.options.height } ctx = this._canvas.getContext("2d"); ctx.clearRect(0, 0, this.options.width, this.options.height); ctx.fillStyle = this.options.background; ctx.fillRect(0, 0, this.options.width, this.options.height); if (image instanceof ImageData) { ctx.putImageData(image, 0, 0); return image } ctx.drawImage(image, 0, 0); return this.getContextData(ctx) }; GIF.prototype.getBgImageData = function () { var bg_canvas, bg_ctx; bg_canvas = document.createElement("canvas"); bg_canvas.width = this.options.width; bg_canvas.height = this.options.height; bg_ctx = bg_canvas.getContext("2d"); bg_ctx.fillStyle = "#ffffff"; bg_ctx.fillRect(0, 0, this.options.width, this.options.height); bg_ctx.drawImage(this._canvas, 0, 0); return this.getContextData(bg_ctx) }; GIF.prototype.getTask = function (frame) { var index, task; index = this.frames.indexOf(frame); task = { index: index, last: index === this.frames.length - 1, delay: frame.delay, dispose: frame.dispose, transparent: frame.transparent, width: this.options.width, height: this.options.height, quality: this.options.quality, dither: this.options.dither, globalPalette: this.options.globalPalette, repeat: this.options.repeat, canTransfer: browser.name === "chrome" }; if (frame.data != null) { task.data = frame.data; task.data = this.getContextData(frame.data); task.bg_data = this.getBgImageData() } else if (frame.context != null) { task.data = this.getContextData(frame.context); task.bg_data = this.getBgImageData() } else if (frame.image != null) { task.data = this.getImageData(frame.image); task.bg_data = this.getBgImageData() } else { throw new Error("Invalid frame") } return task }; GIF.prototype.log = function () { var args; args = 1 <= arguments.length ? slice.call(arguments, 0) : []; if (!this.options.debug) { return } return console.log.apply(console, args) }; return GIF }(EventEmitter); module.exports = GIF }, { "./browser.coffee": 2, events: 1 }] }, {}, [3])(3) });
//# sourceMappingURL=gif.js.map

/**
 * CrafyImageCompressJS class.
 * @class
 */
class CrafyImageCompressJS {
  /**
   * Create new Image item for compression.
   * @constructor
   * @param {blob} image - Image Blob (PNG, JPG, WEBP, GIF, and more).
   * @param {string} image_type - Image mime type.
   * @param {string} gifjs_workerScript_url - (optional) gif.js workerScript URL, default = 'gif.worker.js'.
   */
  constructor(image, image_type, gifjs_workerScript_url = 'gif.worker.js') {
    this.image = image;
    this.image_type = image_type.trim().toLowerCase();
    this.is_gif = false;
    this.gif_frames = [];
    this.compressedGifFrames = [];
    this.compressedGifFramesAsImages = [];
    this.gifjs_workerScript = gifjs_workerScript_url;
    this.result_gif_width;
    this.result_gif_height;
    this.gif_transparency = false;
    if (this.image_type == 'image/gif') {
      this.is_gif = true;
      this.gifContainsTransparency();
    }
    return true;
  }

  async getGifFrames() {
    var savedThis = this;
    return new Promise(function (resolve, reject) {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        try {
          const arrayBuffer = this.result;
          const gif = new GIFUCT(arrayBuffer);
          const frames = await gif.decompressFrames(true);
          resolve(frames);
        } catch (error) {
          reject(error);
        }
      };
      fileReader.readAsArrayBuffer(savedThis.image);
    });
  }

  rgbToHex(rgb) {
    // Asegurarse de que cada componente esté en el rango [0, 255]
    const r = Math.max(0, Math.min(255, rgb[0]));
    const g = Math.max(0, Math.min(255, rgb[1]));
    const b = Math.max(0, Math.min(255, rgb[2]));

    // Convertir cada componente a su representación hexadecimal y unirlos
    const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return `0x${hex.toUpperCase()}`;
  }

  async blobGifContainsTransparency(gifBlob) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Obtener los datos de píxeles
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Verificar si hay algún píxel transparente
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 255) {
            // El GIF tiene transparencia
            // También puedes obtener el color de transparencia aquí
            const colorTransparencia = [data[i - 3], data[i - 2], data[i - 1]];
            resolve(colorTransparencia);
            return;
          }
        }

        // No hay píxeles transparentes
        resolve(false);
      };

      img.onerror = function (error) {
        reject(error);
      };

      img.src = URL.createObjectURL(gifBlob);
    });
  }

  async gifContainsTransparency() {
    var result = await this.blobGifContainsTransparency(this.image);
    if (result !== false) {
      result = parseInt(this.rgbToHex(result));
    }
    this.gif_transparency = result;
    return result;
  }

  async blobToUint8Array(imageBlob) {
    return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();
      fileReader.onloadend = function () {
        var arrayBuffer = fileReader.result;
        var uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      fileReader.readAsArrayBuffer(imageBlob);
    });
  }

  async canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Error al convertir canvas a blob.'));
        }
      });
    });
  }

  framePatchToCanvas(patch, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    var frameImageData = ctx.createImageData(width, height);
    frameImageData.data.set(patch);
    ctx.putImageData(frameImageData, 0, 0);
    return canvas;
  }

  async convertGifToFrames() {
    var frames = await this.getGifFrames();
    if (frames.length > 0) {
      var frameCanvas = document.createElement('canvas');
      var frameCanvasCtx = frameCanvas.getContext('2d');
      for (let frameIndex = 0; frameIndex < frames.length; frameIndex++) {

        var frame = frames[frameIndex];
        var dims = frame.dims;
        if (frameIndex == 0) {
          frameCanvas.width = dims.width;
          frameCanvas.height = dims.height;
          this.result_gif_width = dims.width;
          this.result_gif_height = dims.height;
        }
        const prevFrame = frames[frameIndex - 1];
        if (prevFrame) {
          if (prevFrame.disposalType === 2) {
            frameCanvasCtx.clearRect(prevFrame.dims['left'], prevFrame.dims['top'], prevFrame.dims['width'], prevFrame.dims['height']);
          } else if (prevFrame.disposalType === 3) {
            frameCanvasCtx.clearRect(prevFrame.dims['left'], prevFrame.dims['top'], prevFrame.dims['width'], prevFrame.dims['height']);
          }
        }
        var currFrameCanvas = this.framePatchToCanvas(frame.patch, dims.width, dims.height);
        frameCanvasCtx.drawImage(currFrameCanvas, dims.left, dims.top, dims.width, dims.height);
        var frameBlob = await this.canvasToBlob(frameCanvas);

        this.gif_frames.push({
          'blob': frameBlob,
          'delay': frames[frameIndex].delay,
          'complete': frames[frameIndex],
        });
      }
    } else {
      return false;
    }
    return true;
  }

  async blobToImage(blob) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = function () {
        URL.revokeObjectURL(url);
        resolve(img);
      };

      img.src = url;
    });
  }

  async compressFromBlob(
    imageBlob,
    maxWidth = false,
    maxHeight = false,
    quality = 0.6
  ) {
    return new Promise(function (resolve, reject) {
      var compressorOptions = {
        quality: quality,
        success(image_reduced_blob) {
          resolve(image_reduced_blob);
        },
        error(err) {
          reject(err);
        }
      };
      if (maxWidth !== false) {
        compressorOptions.maxWidth = maxWidth;
      }
      if (maxHeight !== false) {
        compressorOptions.maxHeight = maxHeight;
      }
      new Compressor(imageBlob, compressorOptions);
    });
  }

  async compressGifFrames(quality, maxWidth = false, maxHeight = false) {
    var savedThis = this;
    for (const gifFrame of savedThis.gif_frames) {
      var gifFrameCompressed = await savedThis.compressFromBlob(
        gifFrame.blob,
        maxWidth,
        maxHeight,
        quality
      );
      savedThis.compressedGifFrames.push(gifFrameCompressed);
      var frameAsImage = await savedThis.blobToImage(gifFrameCompressed);
      savedThis.compressedGifFramesAsImages.push(frameAsImage);
    }
  }

  /**
  * Compress the image.
  * @param {float} quality - Target quality (from 0 to 1, example: 0.6).
  * @param {float} maxWidth - (optional) Result image maximum width in pixels.
  * @param {float} maxHeight - (optional) Result image maximum height in pixels.
  */
  async compressImage(quality, maxWidth = false, maxHeight = false) {
    var savedThis = this;
    return new Promise(function (resolve, reject) {
      if (!savedThis.is_gif) {
        savedThis.compressFromBlob(
          savedThis.image,
          maxWidth,
          maxHeight,
          quality
        ).then(function (finalImageBlob) {
          resolve(finalImageBlob);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        savedThis.convertGifToFrames().then(function (conversionResult) {
          if (conversionResult) {
            if (savedThis.gif_frames.length > 0) {
              savedThis.compressGifFrames(quality, maxWidth, maxHeight).then(async function () {
                var newGIF_options = {
                  repeat: 0,
                  background: '#000',
                  workerScript: savedThis.gifjs_workerScript
                };
                if (savedThis.gif_transparency !== false) {
                  newGIF_options.transparent = savedThis.gif_transparency;
                }
                var newGIF = new GIF();
                for (let index = 0; index < savedThis.compressedGifFramesAsImages.length; index++) {
                  newGIF.addFrame(savedThis.compressedGifFramesAsImages[index], {
                    delay: savedThis.gif_frames[index]['delay'],
                    dispose: savedThis.gif_frames[index]['complete']['disposalType']
                  });
                }
                newGIF.on('finished', function (finalGifBlob) {
                  resolve(finalGifBlob);
                });
                newGIF.render();
              }).catch(function (error) {
                reject(error);
              });
            } else {
              reject('gif_frames is empty');
            }
          } else {
            reject('convertGifToFrames is false');
          }
        }).catch(function (error) {
          reject(error);
        });
      }
    });
  }

}

// Reference:
// - https://github.com/fengyuanchen/compressorjs
// - https://github.com/matt-way/gifuct-js
// - https://github.com/jnordberg/gif.js

// TODO:
// - Transparency doesnt works in GIF.