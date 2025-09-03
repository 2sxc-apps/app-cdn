const ai = "RFC3986", ui = {
  RFC1738: (r) => String(r).replace(/%20/g, "+"),
  RFC3986: (r) => String(r)
}, My = "RFC1738", Ny = Array.isArray, K = (() => {
  const r = [];
  for (let t = 0; t < 256; ++t)
    r.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
  return r;
})(), ii = 1024, Yy = (r, t, e, s, n) => {
  if (r.length === 0)
    return r;
  let i = r;
  if (typeof r == "symbol" ? i = Symbol.prototype.toString.call(r) : typeof r != "string" && (i = String(r)), e === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(a) {
      return "%26%23" + parseInt(a.slice(2), 16) + "%3B";
    });
  let c = "";
  for (let a = 0; a < i.length; a += ii) {
    const l = i.length >= ii ? i.slice(a, a + ii) : i, g = [];
    for (let y = 0; y < l.length; ++y) {
      let w = l.charCodeAt(y);
      if (w === 45 || // -
      w === 46 || // .
      w === 95 || // _
      w === 126 || // ~
      w >= 48 && w <= 57 || // 0-9
      w >= 65 && w <= 90 || // a-z
      w >= 97 && w <= 122 || // A-Z
      n === My && (w === 40 || w === 41)) {
        g[g.length] = l.charAt(y);
        continue;
      }
      if (w < 128) {
        g[g.length] = K[w];
        continue;
      }
      if (w < 2048) {
        g[g.length] = K[192 | w >> 6] + K[128 | w & 63];
        continue;
      }
      if (w < 55296 || w >= 57344) {
        g[g.length] = K[224 | w >> 12] + K[128 | w >> 6 & 63] + K[128 | w & 63];
        continue;
      }
      y += 1, w = 65536 + ((w & 1023) << 10 | l.charCodeAt(y) & 1023), g[g.length] = K[240 | w >> 18] + K[128 | w >> 12 & 63] + K[128 | w >> 6 & 63] + K[128 | w & 63];
    }
    c += g.join("");
  }
  return c;
};
function jy(r) {
  return !r || typeof r != "object" ? !1 : !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r));
}
function mh(r, t) {
  if (Ny(r)) {
    const e = [];
    for (let s = 0; s < r.length; s += 1)
      e.push(t(r[s]));
    return e;
  }
  return t(r);
}
const Fy = Object.prototype.hasOwnProperty, Ah = {
  brackets(r) {
    return String(r) + "[]";
  },
  comma: "comma",
  indices(r, t) {
    return String(r) + "[" + t + "]";
  },
  repeat(r) {
    return String(r);
  }
}, X = Array.isArray, Gy = Array.prototype.push, vh = function(r, t) {
  Gy.apply(r, X(t) ? t : [t]);
}, By = Date.prototype.toISOString, b = {
  addQueryPrefix: !1,
  allowDots: !1,
  allowEmptyArrays: !1,
  arrayFormat: "indices",
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encodeDotInKeys: !1,
  encoder: Yy,
  encodeValuesOnly: !1,
  format: ai,
  formatter: ui[ai],
  /** @deprecated */
  indices: !1,
  serializeDate(r) {
    return By.call(r);
  },
  skipNulls: !1,
  strictNullHandling: !1
};
function Hy(r) {
  return typeof r == "string" || typeof r == "number" || typeof r == "boolean" || typeof r == "symbol" || typeof r == "bigint";
}
const ri = {};
function Lh(r, t, e, s, n, i, c, a, l, g, y, w, R, k, _t, St, gt, ei) {
  let $ = r, hs = ei, _s = 0, gh = !1;
  for (; (hs = hs.get(ri)) !== void 0 && !gh; ) {
    const A = hs.get(r);
    if (_s += 1, typeof A < "u") {
      if (A === _s)
        throw new RangeError("Cyclic object value");
      gh = !0;
    }
    typeof hs.get(ri) > "u" && (_s = 0);
  }
  if (typeof g == "function" ? $ = g(t, $) : $ instanceof Date ? $ = R?.($) : e === "comma" && X($) && ($ = mh($, function(A) {
    return A instanceof Date ? R?.(A) : A;
  })), $ === null) {
    if (i)
      return l && !St ? (
        // @ts-expect-error
        l(t, b.encoder, gt, "key", k)
      ) : t;
    $ = "";
  }
  if (Hy($) || jy($)) {
    if (l) {
      const A = St ? t : l(t, b.encoder, gt, "key", k);
      return [
        _t?.(A) + "=" + // @ts-expect-error
        _t?.(l($, b.encoder, gt, "value", k))
      ];
    }
    return [_t?.(t) + "=" + _t?.(String($))];
  }
  const si = [];
  if (typeof $ > "u")
    return si;
  let ye;
  if (e === "comma" && X($))
    St && l && ($ = mh($, l)), ye = [{ value: $.length > 0 ? $.join(",") || null : void 0 }];
  else if (X(g))
    ye = g;
  else {
    const A = Object.keys($);
    ye = y ? A.sort(y) : A;
  }
  const ph = a ? String(t).replace(/\./g, "%2E") : String(t), gs = s && X($) && $.length === 1 ? ph + "[]" : ph;
  if (n && X($) && $.length === 0)
    return gs + "[]";
  for (let A = 0; A < ye.length; ++A) {
    const Ft = ye[A], wh = (
      // @ts-ignore
      typeof Ft == "object" && typeof Ft.value < "u" ? Ft.value : $[Ft]
    );
    if (c && wh === null)
      continue;
    const ni = w && a ? Ft.replace(/\./g, "%2E") : Ft, Ey = X($) ? typeof e == "function" ? e(gs, ni) : gs : gs + (w ? "." + ni : "[" + ni + "]");
    ei.set(r, _s);
    const $h = /* @__PURE__ */ new WeakMap();
    $h.set(ri, ei), vh(si, Lh(
      wh,
      Ey,
      e,
      s,
      n,
      i,
      c,
      a,
      // @ts-ignore
      e === "comma" && St && X($) ? null : l,
      g,
      y,
      w,
      R,
      k,
      _t,
      St,
      gt,
      $h
    ));
  }
  return si;
}
function Wy(r = b) {
  if (typeof r.allowEmptyArrays < "u" && typeof r.allowEmptyArrays != "boolean")
    throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof r.encodeDotInKeys < "u" && typeof r.encodeDotInKeys != "boolean")
    throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (r.encoder !== null && typeof r.encoder < "u" && typeof r.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  const t = r.charset || b.charset;
  if (typeof r.charset < "u" && r.charset !== "utf-8" && r.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let e = ai;
  if (typeof r.format < "u") {
    if (!Fy.call(ui, r.format))
      throw new TypeError("Unknown format option provided.");
    e = r.format;
  }
  const s = ui[e];
  let n = b.filter;
  (typeof r.filter == "function" || X(r.filter)) && (n = r.filter);
  let i;
  if (r.arrayFormat && r.arrayFormat in Ah ? i = r.arrayFormat : "indices" in r ? i = r.indices ? "indices" : "repeat" : i = b.arrayFormat, "commaRoundTrip" in r && typeof r.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  const c = typeof r.allowDots > "u" ? r.encodeDotInKeys ? !0 : b.allowDots : !!r.allowDots;
  return {
    addQueryPrefix: typeof r.addQueryPrefix == "boolean" ? r.addQueryPrefix : b.addQueryPrefix,
    // @ts-ignore
    allowDots: c,
    allowEmptyArrays: typeof r.allowEmptyArrays == "boolean" ? !!r.allowEmptyArrays : b.allowEmptyArrays,
    arrayFormat: i,
    charset: t,
    charsetSentinel: typeof r.charsetSentinel == "boolean" ? r.charsetSentinel : b.charsetSentinel,
    commaRoundTrip: !!r.commaRoundTrip,
    delimiter: typeof r.delimiter > "u" ? b.delimiter : r.delimiter,
    encode: typeof r.encode == "boolean" ? r.encode : b.encode,
    encodeDotInKeys: typeof r.encodeDotInKeys == "boolean" ? r.encodeDotInKeys : b.encodeDotInKeys,
    encoder: typeof r.encoder == "function" ? r.encoder : b.encoder,
    encodeValuesOnly: typeof r.encodeValuesOnly == "boolean" ? r.encodeValuesOnly : b.encodeValuesOnly,
    filter: n,
    format: e,
    formatter: s,
    serializeDate: typeof r.serializeDate == "function" ? r.serializeDate : b.serializeDate,
    skipNulls: typeof r.skipNulls == "boolean" ? r.skipNulls : b.skipNulls,
    // @ts-ignore
    sort: typeof r.sort == "function" ? r.sort : null,
    strictNullHandling: typeof r.strictNullHandling == "boolean" ? r.strictNullHandling : b.strictNullHandling
  };
}
function Ky(r, t = {}) {
  let e = r;
  const s = Wy(t);
  let n, i;
  typeof s.filter == "function" ? (i = s.filter, e = i("", e)) : X(s.filter) && (i = s.filter, n = i);
  const c = [];
  if (typeof e != "object" || e === null)
    return "";
  const a = Ah[s.arrayFormat], l = a === "comma" && s.commaRoundTrip;
  n || (n = Object.keys(e)), s.sort && n.sort(s.sort);
  const g = /* @__PURE__ */ new WeakMap();
  for (let R = 0; R < n.length; ++R) {
    const k = n[R];
    s.skipNulls && e[k] === null || vh(c, Lh(
      e[k],
      k,
      // @ts-expect-error
      a,
      l,
      s.allowEmptyArrays,
      s.strictNullHandling,
      s.skipNulls,
      s.encodeDotInKeys,
      s.encode ? s.encoder : null,
      s.filter,
      s.sort,
      s.allowDots,
      s.serializeDate,
      s.format,
      s.formatter,
      s.encodeValuesOnly,
      s.charset,
      g
    ));
  }
  const y = c.join(s.delimiter);
  let w = s.addQueryPrefix === !0 ? "?" : "";
  return s.charsetSentinel && (s.charset === "iso-8859-1" ? w += "utf8=%26%2310003%3B&" : w += "utf8=%E2%9C%93&"), y.length > 0 ? w + y : "";
}
const Gt = "4.5.0";
class h extends Error {
}
class v extends h {
  constructor(t, e, s, n) {
    super(`${v.makeMessage(t, e, s)}`), this.status = t, this.headers = n, this.error = e;
    const i = e;
    this.errors = i?.errors ?? [];
  }
  static makeMessage(t, e, s) {
    const n = e?.message ? typeof e.message == "string" ? e.message : JSON.stringify(e.message) : e ? JSON.stringify(e) : s;
    return t && n ? `${t} ${n}` : t ? `${t} status code (no body)` : n || "(no status code or body)";
  }
  static generate(t, e, s, n) {
    if (!t || !n)
      return new As({ message: s, cause: _i(e) });
    const i = e;
    return t === 400 ? new kh(t, i, s, n) : t === 401 ? new Oh(t, i, s, n) : t === 403 ? new Ch(t, i, s, n) : t === 404 ? new Zh(t, i, s, n) : t === 409 ? new Th(t, i, s, n) : t === 422 ? new Vh(t, i, s, n) : t === 429 ? new Dh(t, i, s, n) : t >= 500 ? new Eh(t, i, s, n) : new v(t, i, s, n);
  }
}
class li extends v {
  constructor({ message: t } = {}) {
    super(void 0, void 0, t || "Request was aborted.", void 0);
  }
}
class As extends v {
  constructor({ message: t, cause: e }) {
    super(void 0, void 0, t || "Connection error.", void 0), e && (this.cause = e);
  }
}
class Ih extends As {
  constructor({ message: t } = {}) {
    super({ message: t ?? "Request timed out." });
  }
}
class kh extends v {
}
class Oh extends v {
}
class Ch extends v {
}
class Zh extends v {
}
class Th extends v {
}
class Vh extends v {
}
class Dh extends v {
}
class Eh extends v {
}
let yh = !1, Pe, Mh, Nh, ys, gi, Yh, jh, Fh;
function Xy(r, t = { auto: !1 }) {
  if (yh)
    throw new Error(`you must \`import 'cloudflare/shims/${r.kind}'\` before importing anything else from cloudflare`);
  if (Pe)
    throw new Error(`can't \`import 'cloudflare/shims/${r.kind}'\` after \`import 'cloudflare/shims/${Pe}'\``);
  yh = t.auto, Pe = r.kind, Mh = r.fetch, Nh = r.FormData, ys = r.File, gi = r.getMultipartRequestOptions, Yh = r.getDefaultAgent, jh = r.fileFromPath, Fh = r.isFsReadStream;
}
class Qy {
  constructor(t) {
    this.body = t;
  }
  get [Symbol.toStringTag]() {
    return "MultipartBody";
  }
}
function Jy({ manuallyImported: r } = {}) {
  const t = r ? "You may need to use polyfills" : "Add one of these imports before your first `import … from 'cloudflare'`:\n- `import 'cloudflare/shims/node'` (if you're running on Node)\n- `import 'cloudflare/shims/web'` (otherwise)\n";
  let e, s, n, i;
  try {
    e = fetch, s = Request, n = Response, i = Headers;
  } catch (c) {
    throw new Error(`this environment is missing the following Web Fetch API type: ${c.message}. ${t}`);
  }
  return {
    kind: "web",
    fetch: e,
    Request: s,
    Response: n,
    Headers: i,
    FormData: (
      // @ts-ignore
      typeof FormData < "u" ? FormData : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'FormData' is undefined. ${t}`);
        }
      }
    ),
    Blob: typeof Blob < "u" ? Blob : class {
      constructor() {
        throw new Error(`file uploads aren't supported in this environment yet as 'Blob' is undefined. ${t}`);
      }
    },
    File: (
      // @ts-ignore
      typeof File < "u" ? File : class {
        // @ts-ignore
        constructor() {
          throw new Error(`file uploads aren't supported in this environment yet as 'File' is undefined. ${t}`);
        }
      }
    ),
    ReadableStream: (
      // @ts-ignore
      typeof ReadableStream < "u" ? ReadableStream : class {
        // @ts-ignore
        constructor() {
          throw new Error(`streaming isn't supported in this environment yet as 'ReadableStream' is undefined. ${t}`);
        }
      }
    ),
    getMultipartRequestOptions: async (c, a) => ({
      ...a,
      body: new Qy(c)
    }),
    getDefaultAgent: (c) => {
    },
    fileFromPath: () => {
      throw new Error("The `fileFromPath` function is only supported in Node. See the README for more details: https://www.github.com/cloudflare/cloudflare-typescript#file-uploads");
    },
    isFsReadStream: (c) => !1
  };
}
const Gh = () => {
  Pe || Xy(Jy(), { auto: !0 });
};
Gh();
const Bh = (r) => r != null && typeof r == "object" && typeof r.url == "string" && typeof r.blob == "function", Hh = (r) => r != null && typeof r == "object" && typeof r.name == "string" && typeof r.lastModified == "number" && vs(r), vs = (r) => r != null && typeof r == "object" && typeof r.size == "number" && typeof r.type == "string" && typeof r.text == "function" && typeof r.slice == "function" && typeof r.arrayBuffer == "function", pi = (r) => Hh(r) || Bh(r) || Fh(r);
async function wi(r, t, e) {
  if (r = await r, Hh(r))
    return r;
  if (Bh(r)) {
    const n = await r.blob();
    t || (t = new URL(r.url).pathname.split(/[\\/]/).pop() ?? "unknown_file");
    const i = vs(n) ? [await n.arrayBuffer()] : [n];
    return new ys(i, t, e);
  }
  const s = await qy(r);
  if (t || (t = ef(r) ?? "unknown_file"), !e?.type) {
    const n = s[0]?.type;
    typeof n == "string" && (e = { ...e, type: n });
  }
  return new ys(s, t, e);
}
async function qy(r) {
  let t = [];
  if (typeof r == "string" || ArrayBuffer.isView(r) || // includes Uint8Array, Buffer, etc.
  r instanceof ArrayBuffer)
    t.push(r);
  else if (vs(r))
    t.push(await r.arrayBuffer());
  else if (sf(r))
    for await (const e of r)
      t.push(e);
  else
    throw new Error(`Unexpected data type: ${typeof r}; constructor: ${r?.constructor?.name}; props: ${tf(r)}`);
  return t;
}
function tf(r) {
  return `[${Object.getOwnPropertyNames(r).map((e) => `"${e}"`).join(", ")}]`;
}
function ef(r) {
  return ci(r.name) || ci(r.filename) || // For fs.ReadStream
  ci(r.path)?.split(/[\\/]/).pop();
}
const ci = (r) => {
  if (typeof r == "string")
    return r;
  if (typeof Buffer < "u" && r instanceof Buffer)
    return String(r);
}, sf = (r) => r != null && typeof r == "object" && typeof r[Symbol.asyncIterator] == "function", fh = (r) => r && typeof r == "object" && r.body && r[Symbol.toStringTag] === "MultipartBody", Wh = async (r) => {
  if (!di(r.body))
    return r;
  const t = await Kh(r.body, r);
  return gi(t, r);
}, S = async (r) => {
  const t = await Kh(r.body, r);
  return gi(t, r);
}, Kh = async (r, t) => {
  const e = new Nh();
  return await Promise.all(Object.entries(r || {}).map(([s, n]) => hi(e, s, n, t))), e;
}, di = (r) => {
  if (pi(r))
    return !0;
  if (Array.isArray(r))
    return r.some(di);
  if (r && typeof r == "object") {
    for (const t in r)
      if (di(r[t]))
        return !0;
  }
  return !1;
}, hi = async (r, t, e, s) => {
  if (s?.__multipartSyntax === "json")
    return await nf(r, t, e);
  if (e !== void 0) {
    if (e == null)
      throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
      r.append(t, String(e));
    else if (pi(e)) {
      const n = await wi(e);
      r.append(t, n);
    } else Array.isArray(e) ? await Promise.all(e.map((n) => hi(r, t + "[]", n))) : typeof e == "object" && await Promise.all(Object.entries(e).map(([n, i]) => hi(r, `${t}[${n}]`, i)));
  }
}, nf = async (r, t, e) => {
  if (e !== void 0) {
    if (e == null)
      throw new TypeError(`Received null for "${t}"; to pass null in FormData, you must use the string 'null'`);
    if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") {
      r.append(t, String(e));
      return;
    }
    if (pi(e)) {
      const s = await wi(e);
      r.append(t, s);
      return;
    }
    if (Array.isArray(e) || typeof e == "object") {
      r.append(t, new ys([JSON.stringify(e)], t, { type: "application/json" }));
      return;
    }
    throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${e} instead`);
  }
};
var Xh = function(r, t, e, s, n) {
  if (s === "m") throw new TypeError("Private method is not writable");
  if (s === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? r !== t || !n : !t.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return s === "a" ? n.call(r, e) : n ? n.value = e : t.set(r, e), e;
}, Qh = function(r, t, e, s) {
  if (e === "a" && !s) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? r !== t || !s : !t.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? s : e === "a" ? s.call(r) : s ? s.value : t.get(r);
}, $s, ps;
Gh();
async function Jh(r) {
  const { response: t } = r;
  if (t.status === 204)
    return null;
  if (r.options.__binaryResponse)
    return t;
  const s = t.headers.get("content-type")?.split(";")[0]?.trim();
  if (s?.includes("application/json") || s?.endsWith("+json")) {
    const c = await t.json();
    return be("response", t.status, t.url, t.headers, c), c;
  }
  const i = await t.text();
  return be("response", t.status, t.url, t.headers, i), i;
}
class Ls extends Promise {
  constructor(t, e = Jh) {
    super((s) => {
      s(null);
    }), this.responsePromise = t, this.parseResponse = e;
  }
  _thenUnwrap(t) {
    return new Ls(this.responsePromise, async (e) => t(await this.parseResponse(e), e));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'cloudflare'`:
   * - `import 'cloudflare/shims/node'` (if you're running on Node)
   * - `import 'cloudflare/shims/web'` (otherwise)
   */
  asResponse() {
    return this.responsePromise.then((t) => t.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   *
   *
   * 👋 Getting the wrong TypeScript type for `Response`?
   * Try setting `"moduleResolution": "NodeNext"` if you can,
   * or add one of these imports before your first `import … from 'cloudflare'`:
   * - `import 'cloudflare/shims/node'` (if you're running on Node)
   * - `import 'cloudflare/shims/web'` (otherwise)
   */
  async withResponse() {
    const [t, e] = await Promise.all([this.parse(), this.asResponse()]);
    return { data: t, response: e };
  }
  parse() {
    return this.parsedPromise || (this.parsedPromise = this.responsePromise.then(this.parseResponse)), this.parsedPromise;
  }
  then(t, e) {
    return this.parse().then(t, e);
  }
  catch(t) {
    return this.parse().catch(t);
  }
  finally(t) {
    return this.parse().finally(t);
  }
}
class rf {
  constructor({
    baseURL: t,
    apiVersion: e,
    baseURLOverridden: s,
    maxRetries: n = 2,
    timeout: i = 6e4,
    // 1 minute
    httpAgent: c,
    fetch: a
  }) {
    $s.set(this, void 0), this.baseURL = t, this.apiVersion = e, Xh(this, $s, s, "f"), this.maxRetries = oi("maxRetries", n), this.timeout = oi("timeout", i), this.httpAgent = c, this.fetch = a ?? Mh;
  }
  authHeaders(t) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(t) {
    return {
      Accept: "application/json",
      ...["head", "get"].includes(t.method) ? {} : { "Content-Type": "application/json" },
      "User-Agent": this.getUserAgent(),
      "api-version": this.getAPIVerson(),
      ...df(),
      ...this.authHeaders(t)
    };
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(t, e) {
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${wf()}`;
  }
  get(t, e) {
    return this.methodRequest("get", t, e);
  }
  post(t, e) {
    return this.methodRequest("post", t, e);
  }
  patch(t, e) {
    return this.methodRequest("patch", t, e);
  }
  put(t, e) {
    return this.methodRequest("put", t, e);
  }
  delete(t, e) {
    return this.methodRequest("delete", t, e);
  }
  methodRequest(t, e, s) {
    return this.request(Promise.resolve(s).then(async (n) => {
      const i = n && vs(n?.body) ? new DataView(await n.body.arrayBuffer()) : n?.body instanceof DataView ? n.body : n?.body instanceof ArrayBuffer ? new DataView(n.body) : n && ArrayBuffer.isView(n?.body) ? new DataView(n.body.buffer) : n?.body;
      return { method: t, path: e, ...n, body: i };
    }));
  }
  getAPIList(t, e, s) {
    return this.requestAPIList(e, { method: "get", path: t, ...s });
  }
  calculateContentLength(t) {
    if (typeof t == "string") {
      if (typeof Buffer < "u")
        return Buffer.byteLength(t, "utf8").toString();
      if (typeof TextEncoder < "u")
        return new TextEncoder().encode(t).length.toString();
    } else if (ArrayBuffer.isView(t))
      return t.byteLength.toString();
    return null;
  }
  async buildRequest(t, { retryCount: e = 0 } = {}) {
    const s = { ...t }, { method: n, path: i, query: c, defaultBaseURL: a, headers: l = {} } = s, g = ArrayBuffer.isView(s.body) || s.__binaryRequest && typeof s.body == "string" ? s.body : fh(s.body) ? s.body.body : s.body ? JSON.stringify(s.body, null, 2) : null, y = this.calculateContentLength(g), w = this.buildURL(i, c, a);
    "timeout" in s && oi("timeout", s.timeout), s.timeout = s.timeout ?? this.timeout;
    const R = s.httpAgent ?? this.httpAgent ?? Yh(w), k = s.timeout + 1e3;
    typeof R?.options?.timeout == "number" && k > (R.options.timeout ?? 0) && (R.options.timeout = k), this.idempotencyHeader && n !== "get" && (t.idempotencyKey || (t.idempotencyKey = this.defaultIdempotencyKey()), l[this.idempotencyHeader] = t.idempotencyKey);
    const _t = this.buildHeaders({ options: s, headers: l, contentLength: y, retryCount: e });
    return { req: {
      method: n,
      ...g && { body: g },
      headers: _t,
      ...R && { agent: R },
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: s.signal ?? null
    }, url: w, timeout: s.timeout };
  }
  buildHeaders({ options: t, headers: e, contentLength: s, retryCount: n }) {
    const i = {};
    s && (i["content-length"] = s);
    const c = this.defaultHeaders(t);
    return xh(i, c), xh(i, e), fh(t.body) && Pe !== "node" && delete i["content-type"], ws(c, "x-stainless-retry-count") === void 0 && ws(e, "x-stainless-retry-count") === void 0 && (i["x-stainless-retry-count"] = String(n)), ws(c, "x-stainless-timeout") === void 0 && ws(e, "x-stainless-timeout") === void 0 && t.timeout && (i["x-stainless-timeout"] = String(t.timeout)), this.validateHeaders(i, e), i;
  }
  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  async prepareOptions(t) {
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(t, { url: e, options: s }) {
  }
  parseHeaders(t) {
    return t ? Symbol.iterator in t ? Object.fromEntries(Array.from(t).map((e) => [...e])) : { ...t } : {};
  }
  makeStatusError(t, e, s, n) {
    return v.generate(t, e, s, n);
  }
  request(t, e = null) {
    return new Ls(this.makeRequest(t, e));
  }
  async makeRequest(t, e) {
    const s = await t, n = s.maxRetries ?? this.maxRetries;
    e == null && (e = n), await this.prepareOptions(s);
    const { req: i, url: c, timeout: a } = await this.buildRequest(s, {
      retryCount: n - e
    });
    if (await this.prepareRequest(i, { url: c, options: s }), be("request", c, s, i.headers), s.signal?.aborted)
      throw new li();
    const l = new AbortController(), g = await this.fetchWithTimeout(c, i, a, l).catch(_i);
    if (g instanceof Error) {
      if (s.signal?.aborted)
        throw new li();
      if (e)
        return this.retryRequest(s, e);
      throw g.name === "AbortError" ? new Ih() : new As({ cause: g });
    }
    const y = of(g.headers);
    if (!g.ok) {
      if (e && this.shouldRetry(g)) {
        const gt = `retrying, ${e} attempts remaining`;
        return be(`response (error; ${gt})`, g.status, c, y), this.retryRequest(s, e, y);
      }
      const w = await g.text().catch((gt) => _i(gt).message), R = hf(w), k = R ? void 0 : w;
      throw be(`response (error; ${e ? "(error; no more retries left)" : "(error; not retryable)"})`, g.status, c, y, k), this.makeStatusError(g.status, R, k, y);
    }
    return { response: g, options: s, controller: l };
  }
  requestAPIList(t, e) {
    const s = this.makeRequest(e, null);
    return new cf(this, s, t);
  }
  buildURL(t, e, s) {
    const n = !Qh(this, $s, "f") && s || this.baseURL, i = gf(t) ? new URL(t) : new URL(n + (n.endsWith("/") && t.startsWith("/") ? t.slice(1) : t)), c = this.defaultQuery();
    return Bt(c) || (e = { ...c, ...e }), typeof e == "object" && e && !Array.isArray(e) && (i.search = this.stringifyQuery(e)), i.toString();
  }
  stringifyQuery(t) {
    return Object.entries(t).filter(([e, s]) => typeof s < "u").map(([e, s]) => {
      if (typeof s == "string" || typeof s == "number" || typeof s == "boolean")
        return `${encodeURIComponent(e)}=${encodeURIComponent(s)}`;
      if (s === null)
        return `${encodeURIComponent(e)}=`;
      throw new h(`Cannot stringify type ${typeof s}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
    }).join("&");
  }
  async fetchWithTimeout(t, e, s, n) {
    const { signal: i, ...c } = e || {};
    i && i.addEventListener("abort", () => n.abort());
    const a = setTimeout(() => n.abort(), s), l = {
      signal: n.signal,
      ...c
    };
    return l.method && (l.method = l.method.toUpperCase()), // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
    this.fetch.call(void 0, t, l).finally(() => {
      clearTimeout(a);
    });
  }
  shouldRetry(t) {
    const e = t.headers.get("x-should-retry");
    return e === "true" ? !0 : e === "false" ? !1 : t.status === 408 || t.status === 409 || t.status === 429 || t.status >= 500;
  }
  async retryRequest(t, e, s) {
    let n;
    const i = s?.["retry-after-ms"];
    if (i) {
      const a = parseFloat(i);
      Number.isNaN(a) || (n = a);
    }
    const c = s?.["retry-after"];
    if (c && !n) {
      const a = parseFloat(c);
      Number.isNaN(a) ? n = Date.parse(c) - Date.now() : n = a * 1e3;
    }
    if (!(n && 0 <= n && n < 60 * 1e3)) {
      const a = t.maxRetries ?? this.maxRetries;
      n = this.calculateDefaultRetryTimeoutMillis(e, a);
    }
    return await pf(n), this.makeRequest(t, e - 1);
  }
  calculateDefaultRetryTimeoutMillis(t, e) {
    const i = e - t, c = Math.min(0.5 * Math.pow(2, i), 8), a = 1 - Math.random() * 0.25;
    return c * a * 1e3;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${Gt}`;
  }
  getAPIVerson() {
    return this.apiVersion;
  }
}
$s = /* @__PURE__ */ new WeakMap();
class Ue {
  constructor(t, e, s, n) {
    ps.set(this, void 0), Xh(this, ps, t, "f"), this.options = n, this.response = e, this.body = s;
  }
  hasNextPage() {
    return this.getPaginatedItems().length ? this.nextPageInfo() != null : !1;
  }
  async getNextPage() {
    const t = this.nextPageInfo();
    if (!t)
      throw new h("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    const e = { ...this.options };
    if ("params" in t && typeof e.query == "object")
      e.query = { ...e.query, ...t.params };
    else if ("url" in t) {
      const s = [...Object.entries(e.query || {}), ...t.url.searchParams.entries()];
      for (const [n, i] of s)
        t.url.searchParams.set(n, i);
      e.query = void 0, e.path = t.url.toString();
    }
    return await Qh(this, ps, "f").requestAPIList(this.constructor, e);
  }
  async *iterPages() {
    let t = this;
    for (yield t; t.hasNextPage(); )
      t = await t.getNextPage(), yield t;
  }
  async *[(ps = /* @__PURE__ */ new WeakMap(), Symbol.asyncIterator)]() {
    for await (const t of this.iterPages())
      for (const e of t.getPaginatedItems())
        yield e;
  }
}
class cf extends Ls {
  constructor(t, e, s) {
    super(e, async (n) => new s(t, n.response, await Jh(n), n.options));
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const t = await this;
    for await (const e of t)
      yield e;
  }
}
const of = (r) => new Proxy(Object.fromEntries(
  // @ts-ignore
  r.entries()
), {
  get(t, e) {
    const s = e.toString();
    return t[s.toLowerCase()] || t[s];
  }
}), af = {
  method: !0,
  path: !0,
  query: !0,
  body: !0,
  headers: !0,
  defaultBaseURL: !0,
  maxRetries: !0,
  stream: !0,
  timeout: !0,
  httpAgent: !0,
  signal: !0,
  idempotencyKey: !0,
  __multipartSyntax: !0,
  __binaryRequest: !0,
  __binaryResponse: !0
}, u = (r) => typeof r == "object" && r !== null && !Bt(r) && Object.keys(r).every((t) => qh(af, t)), uf = () => {
  if (typeof Deno < "u" && Deno.build != null)
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Gt,
      "X-Stainless-OS": bh(Deno.build.os),
      "X-Stainless-Arch": Ph(Deno.build.arch),
      "X-Stainless-Runtime": "deno",
      "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : Deno.version?.deno ?? "unknown"
    };
  if (typeof EdgeRuntime < "u")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Gt,
      "X-Stainless-OS": "Unknown",
      "X-Stainless-Arch": `other:${EdgeRuntime}`,
      "X-Stainless-Runtime": "edge",
      "X-Stainless-Runtime-Version": process.version
    };
  if (Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]")
    return {
      "X-Stainless-Lang": "js",
      "X-Stainless-Package-Version": Gt,
      "X-Stainless-OS": bh(process.platform),
      "X-Stainless-Arch": Ph(process.arch),
      "X-Stainless-Runtime": "node",
      "X-Stainless-Runtime-Version": process.version
    };
  const r = lf();
  return r ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Gt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${r.browser}`,
    "X-Stainless-Runtime-Version": r.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": Gt,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function lf() {
  if (typeof navigator > "u" || !navigator)
    return null;
  const r = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "ie", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ }
  ];
  for (const { key: t, pattern: e } of r) {
    const s = e.exec(navigator.userAgent);
    if (s) {
      const n = s[1] || 0, i = s[2] || 0, c = s[3] || 0;
      return { browser: t, version: `${n}.${i}.${c}` };
    }
  }
  return null;
}
const Ph = (r) => r === "x32" ? "x32" : r === "x86_64" || r === "x64" ? "x64" : r === "arm" ? "arm" : r === "aarch64" || r === "arm64" ? "arm64" : r ? `other:${r}` : "unknown", bh = (r) => (r = r.toLowerCase(), r.includes("ios") ? "iOS" : r === "android" ? "Android" : r === "darwin" ? "MacOS" : r === "win32" ? "Windows" : r === "freebsd" ? "FreeBSD" : r === "openbsd" ? "OpenBSD" : r === "linux" ? "Linux" : r ? `Other:${r}` : "Unknown");
let Uh;
const df = () => Uh ?? (Uh = uf()), hf = (r) => {
  try {
    return JSON.parse(r);
  } catch {
    return;
  }
}, _f = /^[a-z][a-z0-9+.-]*:/i, gf = (r) => _f.test(r), pf = (r) => new Promise((t) => setTimeout(t, r)), oi = (r, t) => {
  if (typeof t != "number" || !Number.isInteger(t))
    throw new h(`${r} must be an integer`);
  if (t < 0)
    throw new h(`${r} must be a positive integer`);
  return t;
}, _i = (r) => {
  if (r instanceof Error)
    return r;
  if (typeof r == "object" && r !== null)
    try {
      return new Error(JSON.stringify(r));
    } catch {
    }
  return new Error(r);
}, fe = (r) => {
  if (typeof process < "u")
    return process.env?.[r]?.trim() ?? void 0;
  if (typeof Deno < "u")
    return Deno.env?.get?.(r)?.trim();
};
function Bt(r) {
  if (!r)
    return !0;
  for (const t in r)
    return !1;
  return !0;
}
function qh(r, t) {
  return Object.prototype.hasOwnProperty.call(r, t);
}
function xh(r, t) {
  for (const e in t) {
    if (!qh(t, e))
      continue;
    const s = e.toLowerCase();
    if (!s)
      continue;
    const n = t[e];
    n === null ? delete r[s] : n !== void 0 && (r[s] = n);
  }
}
function be(r, ...t) {
  typeof process < "u" && process?.env?.DEBUG === "true" && console.log(`Cloudflare:DEBUG:${r}`, ...t);
}
const wf = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (r) => {
  const t = Math.random() * 16 | 0;
  return (r === "x" ? t : t & 3 | 8).toString(16);
}), $f = (r) => typeof r?.get == "function", ws = (r, t) => {
  const e = t.toLowerCase();
  if ($f(r)) {
    const s = t[0]?.toUpperCase() + t.substring(1).replace(/([^\w])(\w)/g, (n, i, c) => i + c.toUpperCase());
    for (const n of [t, e, t.toUpperCase(), s]) {
      const i = r.get(n);
      if (i)
        return i;
    }
  }
  for (const [s, n] of Object.entries(r))
    if (s.toLowerCase() === e)
      return Array.isArray(n) ? (n.length <= 1 || console.warn(`Received ${n.length} entries for the ${t} header, using the first entry.`), n[0]) : n;
};
class F extends Ue {
  constructor(t, e, s, n) {
    super(t, e, s, n), this.result = s.result || {}, this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result?.items ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    return { params: { page: (this.options.query?.page ?? 1) + 1 } };
  }
}
class p extends Ue {
  constructor(t, e, s, n) {
    super(t, e, s, n), this.result = s.result || [], this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    return { params: { page: (this.options.query?.page ?? 1) + 1 } };
  }
}
class Is extends Ue {
  constructor(t, e, s, n) {
    super(t, e, s, n), this.result = s.result || [], this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    const t = this.result_info?.cursor;
    return t ? {
      params: {
        cursor: t
      }
    } : null;
  }
}
class $i extends Ue {
  constructor(t, e, s, n) {
    super(t, e, s, n), this.result = s.result || [], this.result_info = s.result_info || {};
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const t = this.nextPageInfo();
    if (!t)
      return null;
    if ("params" in t)
      return t.params;
    const e = Object.fromEntries(t.url.searchParams);
    return Object.keys(e).length ? e : null;
  }
  nextPageInfo() {
    const t = this.result_info?.cursor;
    return t ? {
      params: {
        cursor: t
      }
    } : null;
  }
}
class d extends Ue {
  constructor(t, e, s, n) {
    super(t, e, s, n), this.result = s.result || [];
  }
  getPaginatedItems() {
    return this.result ?? [];
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
}
class mf extends p {
}
class yf extends p {
}
class t_ extends d {
}
class e_ extends p {
}
class s_ extends p {
}
class o {
  constructor(t) {
    this._client = t;
  }
}
class n_ extends o {
  /**
   * Set Total TLS Settings or disable the feature for a Zone.
   *
   * @example
   * ```ts
   * const totalTLS = await client.acm.totalTLS.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   enabled: true,
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/acm/total_tls`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Total TLS Settings for a Zone.
   *
   * @example
   * ```ts
   * const totalTLS = await client.acm.totalTLS.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/acm/total_tls`, e)._thenUnwrap((n) => n.result);
  }
}
class mi extends o {
  constructor() {
    super(...arguments), this.totalTLS = new n_(this._client);
  }
}
mi.TotalTLS = n_;
class yi extends o {
  /**
   * Author Search
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/ai/authors/search`, fi, e);
  }
}
class fi extends d {
}
yi.AuthorListResponsesSinglePage = fi;
class Pi extends o {
  /**
   * Task Search
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/ai/tasks/search`, bi, e);
  }
}
class bi extends d {
}
Pi.TaskListResponsesSinglePage = bi;
let i_ = class extends o {
  /**
   * Upload a Finetune Asset
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/ai/finetunes/${t}/finetune-assets`, S({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
};
class Ui extends o {
  /**
   * List Public Finetunes
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/ai/finetunes/public`, xi, { query: n, ...e });
  }
}
class xi extends d {
}
Ui.PublicListResponsesSinglePage = xi;
class xe extends o {
  constructor() {
    super(...arguments), this.assets = new i_(this._client), this.public = new Ui(this._client);
  }
  /**
   * Create a new Finetune
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/ai/finetunes`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List Finetunes
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/ai/finetunes`, e)._thenUnwrap((n) => n.result);
  }
}
xe.Assets = i_;
xe.Public = Ui;
xe.PublicListResponsesSinglePage = xi;
class r_ extends o {
  /**
   * Get Model Schema
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/ai/models/schema`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
}
class ks extends o {
  constructor() {
    super(...arguments), this.schema = new r_(this._client);
  }
  /**
   * Model Search
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/ai/models/search`, Si, { query: n, ...e });
  }
}
class Si extends p {
}
ks.ModelListResponsesV4PagePaginationArray = Si;
ks.Schema = r_;
let ct = class extends o {
  constructor() {
    super(...arguments), this.finetunes = new xe(this._client), this.authors = new yi(this._client), this.tasks = new Pi(this._client), this.models = new ks(this._client);
  }
  /**
   * This endpoint provides users with the capability to run specific AI models
   * on-demand.
   *
   * By submitting the required input data, users can receive real-time predictions
   * or results generated by the chosen AI model. The endpoint supports various AI
   * model types, ensuring flexibility and adaptability for diverse use cases.
   *
   * Model specific inputs available in
   * [Cloudflare Docs](https://developers.cloudflare.com/workers-ai/models/).
   */
  run(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/ai/run/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
ct.Finetunes = xe;
ct.Authors = yi;
ct.AuthorListResponsesSinglePage = fi;
ct.Tasks = Pi;
ct.TaskListResponsesSinglePage = bi;
ct.Models = ks;
ct.ModelListResponsesV4PagePaginationArray = Si;
let zi = class extends o {
  /**
   * Create a new Dataset
   *
   * @example
   * ```ts
   * const dataset = await client.aiGateway.datasets.create(
   *   'my-gateway',
   *   {
   *     account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0',
   *     enable: true,
   *     filters: [
   *       {
   *         key: 'created_at',
   *         operator: 'eq',
   *         value: ['string'],
   *       },
   *     ],
   *     name: 'name',
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/ai-gateway/gateways/${t}/datasets`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a Dataset
   *
   * @example
   * ```ts
   * const dataset = await client.aiGateway.datasets.update(
   *   'my-gateway',
   *   'id',
   *   {
   *     account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0',
   *     enable: true,
   *     filters: [
   *       {
   *         key: 'created_at',
   *         operator: 'eq',
   *         value: ['string'],
   *       },
   *     ],
   *     name: 'name',
   *   },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/ai-gateway/gateways/${t}/datasets/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * List Datasets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const datasetListResponse of client.aiGateway.datasets.list(
   *   'my-gateway',
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways/${t}/datasets`, Ri, { query: i, ...s });
  }
  /**
   * Delete a Dataset
   *
   * @example
   * ```ts
   * const dataset = await client.aiGateway.datasets.delete(
   *   'my-gateway',
   *   'id',
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/ai-gateway/gateways/${t}/datasets/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a Dataset
   *
   * @example
   * ```ts
   * const dataset = await client.aiGateway.datasets.get(
   *   'my-gateway',
   *   'id',
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${t}/datasets/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class Ri extends p {
}
zi.DatasetListResponsesV4PagePaginationArray = Ri;
class Ai extends o {
  /**
   * List Evaluators
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const evaluationTypeListResponse of client.aiGateway.evaluationTypes.list(
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/ai-gateway/evaluation-types`, vi, { query: n, ...e });
  }
}
class vi extends p {
}
Ai.EvaluationTypeListResponsesV4PagePaginationArray = vi;
class Li extends o {
  /**
   * Create a new Evaluation
   *
   * @example
   * ```ts
   * const evaluation =
   *   await client.aiGateway.evaluations.create('my-gateway', {
   *     account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0',
   *     dataset_ids: ['string'],
   *     evaluation_type_ids: ['string'],
   *     name: 'name',
   *   });
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/ai-gateway/gateways/${t}/evaluations`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Evaluations
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const evaluationListResponse of client.aiGateway.evaluations.list(
   *   'my-gateway',
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways/${t}/evaluations`, Ii, { query: i, ...s });
  }
  /**
   * Delete a Evaluation
   *
   * @example
   * ```ts
   * const evaluation =
   *   await client.aiGateway.evaluations.delete(
   *     'my-gateway',
   *     'id',
   *     { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/ai-gateway/gateways/${t}/evaluations/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a Evaluation
   *
   * @example
   * ```ts
   * const evaluation = await client.aiGateway.evaluations.get(
   *   'my-gateway',
   *   'id',
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${t}/evaluations/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Ii extends p {
}
Li.EvaluationListResponsesV4PagePaginationArray = Ii;
let ki = class extends o {
  /**
   * List Gateway Logs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const logListResponse of client.aiGateway.logs.list(
   *   'my-gateway',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/ai-gateway/gateways/${t}/logs`, Oi, { query: i, ...s });
  }
  /**
   * Delete Gateway Logs
   *
   * @example
   * ```ts
   * const log = await client.aiGateway.logs.delete(
   *   'my-gateway',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, filters: i, limit: c, order_by: a, order_by_direction: l } = e;
    return this._client.delete(`/accounts/${n}/ai-gateway/gateways/${t}/logs`, {
      query: { filters: i, limit: c, order_by: a, order_by_direction: l },
      ...s
    });
  }
  /**
   * Patch Gateway Log
   *
   * @example
   * ```ts
   * const response = await client.aiGateway.logs.edit(
   *   'my-gateway',
   *   'id',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/ai-gateway/gateways/${t}/logs/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get Gateway Log Detail
   *
   * @example
   * ```ts
   * const log = await client.aiGateway.logs.get(
   *   'my-gateway',
   *   'id',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${t}/logs/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get Gateway Log Request
   *
   * @example
   * ```ts
   * const response = await client.aiGateway.logs.request(
   *   'my-gateway',
   *   'id',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * );
   * ```
   */
  request(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${t}/logs/${e}/request`, n);
  }
  /**
   * Get Gateway Log Response
   *
   * @example
   * ```ts
   * const response = await client.aiGateway.logs.response(
   *   'my-gateway',
   *   'id',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * );
   * ```
   */
  response(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${t}/logs/${e}/response`, n);
  }
};
class Oi extends p {
}
ki.LogListResponsesV4PagePaginationArray = Oi;
class c_ extends o {
  /**
   * Get Gateway URL
   *
   * @example
   * ```ts
   * const url = await client.aiGateway.urls.get(
   *   'my-gateway',
   *   'workers-ai',
   *   { account_id: '0d37909e38d3e99c29fa2cd343ac421a' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/ai-gateway/gateways/${t}/url/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class D extends o {
  constructor() {
    super(...arguments), this.evaluationTypes = new Ai(this._client), this.logs = new ki(this._client), this.datasets = new zi(this._client), this.evaluations = new Li(this._client), this.urls = new c_(this._client);
  }
  /**
   * Create a new Gateway
   *
   * @example
   * ```ts
   * const aiGateway = await client.aiGateway.create({
   *   account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0',
   *   id: 'my-gateway',
   *   cache_invalidate_on_update: true,
   *   cache_ttl: 0,
   *   collect_logs: true,
   *   rate_limiting_interval: 0,
   *   rate_limiting_limit: 0,
   *   rate_limiting_technique: 'fixed',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/ai-gateway/gateways`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Gateway
   *
   * @example
   * ```ts
   * const aiGateway = await client.aiGateway.update(
   *   'my-gateway',
   *   {
   *     account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0',
   *     cache_invalidate_on_update: true,
   *     cache_ttl: 0,
   *     collect_logs: true,
   *     rate_limiting_interval: 0,
   *     rate_limiting_limit: 0,
   *     rate_limiting_technique: 'fixed',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/ai-gateway/gateways/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Gateways
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const aiGatewayListResponse of client.aiGateway.list(
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/ai-gateway/gateways`, o_, { query: n, ...e });
  }
  /**
   * Delete a Gateway
   *
   * @example
   * ```ts
   * const aiGateway = await client.aiGateway.delete(
   *   'my-gateway',
   *   { account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/ai-gateway/gateways/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a Gateway
   *
   * @example
   * ```ts
   * const aiGateway = await client.aiGateway.get('my-gateway', {
   *   account_id: '3ebbcb006d4d46d7bb6a8c7f14676cb0',
   * });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/ai-gateway/gateways/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class o_ extends p {
}
D.AIGatewayListResponsesV4PagePaginationArray = o_;
D.EvaluationTypes = Ai;
D.EvaluationTypeListResponsesV4PagePaginationArray = vi;
D.Logs = ki;
D.LogListResponsesV4PagePaginationArray = Oi;
D.Datasets = zi;
D.DatasetListResponsesV4PagePaginationArray = Ri;
D.Evaluations = Li;
D.EvaluationListResponsesV4PagePaginationArray = Ii;
D.URLs = c_;
let a_ = class extends o {
  /**
   * Set configuration properties
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.apiGateway.configurations.update({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     auth_id_characteristics: [
   *       { name: 'authorization', type: 'header' },
   *     ],
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/api_gateway/configuration`, { body: n, ...e });
  }
  /**
   * Retrieve information about specific configuration properties
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.apiGateway.configurations.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/api_gateway/configuration`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}, u_ = class extends o {
  /**
   * Retrieve operations and features as OpenAPI schemas
   *
   * @example
   * ```ts
   * const schemas = await client.apiGateway.schemas.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/api_gateway/schemas`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
}, l_ = class extends o {
  /**
   * Retrieve the most up to date view of discovered operations
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const discoveryOperation of client.apiGateway.discovery.operations.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/api_gateway/discovery/operations`, ff, { query: n, ...e });
  }
  /**
   * Update the `state` on one or more discovered operations
   *
   * @example
   * ```ts
   * const response =
   *   await client.apiGateway.discovery.operations.bulkEdit({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {
   *       '3818d821-5901-4147-a474-f5f5aec1d54e': {},
   *       'b17c8043-99a0-4202-b7d9-8f7cdbee02cd': {},
   *     },
   *   });
   * ```
   */
  bulkEdit(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.patch(`/zones/${s}/api_gateway/discovery/operations`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update the `state` on a discovered operation
   *
   * @example
   * ```ts
   * const response =
   *   await client.apiGateway.discovery.operations.edit(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/api_gateway/discovery/operations/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class Ci extends o {
  constructor() {
    super(...arguments), this.operations = new l_(this._client);
  }
  /**
   * Retrieve the most up to date view of discovered operations, rendered as OpenAPI
   * schemas
   *
   * @example
   * ```ts
   * const discovery = await client.apiGateway.discovery.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/api_gateway/discovery`, e)._thenUnwrap((n) => n.result);
  }
}
class ff extends p {
}
Ci.Operations = l_;
class d_ extends o {
  /**
   * Generate fallthrough WAF expression template from a set of API hosts
   *
   * @example
   * ```ts
   * const fallthrough =
   *   await client.apiGateway.expressionTemplate.fallthrough.create(
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       hosts: ['{zone}.domain1.tld', 'domain2.tld'],
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/api_gateway/expression-template/fallthrough`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Zi extends o {
  constructor() {
    super(...arguments), this.fallthrough = new d_(this._client);
  }
}
Zi.Fallthrough = d_;
let h_ = class extends o {
  /**
   * Updates operation-level schema validation settings on the zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/api_gateway/operations/${t}/schema_validation`, {
      body: i,
      ...s
    });
  }
  /**
   * Updates multiple operation-level schema validation settings on the zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  edit(t, e) {
    const { zone_id: s, settings_multiple_request: n } = t;
    return this._client.patch(`/zones/${s}/api_gateway/operations/schema_validation`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves operation-level schema validation settings on the zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/api_gateway/operations/${t}/schema_validation`, s);
  }
}, Se = class extends o {
  constructor() {
    super(...arguments), this.schemaValidation = new h_(this._client);
  }
  /**
   * Add one operation to a zone. Endpoints can contain path variables. Host, method,
   * endpoint will be normalized to a canoncial form when creating an operation and
   * must be unique on the zone. Inserting an operation that matches an existing one
   * will return the record of the already existing operation and update its
   * last_updated date.
   *
   * @example
   * ```ts
   * const operation = await client.apiGateway.operations.create(
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     endpoint: '/api/v1/users/{var1}',
   *     host: 'www.example.com',
   *     method: 'GET',
   *   },
   * );
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/api_gateway/operations/item`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve information about all operations on a zone
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const operationListResponse of client.apiGateway.operations.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/api_gateway/operations`, Ti, { query: n, ...e });
  }
  /**
   * Delete an operation
   *
   * @example
   * ```ts
   * const operation = await client.apiGateway.operations.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/api_gateway/operations/${t}`, s);
  }
  /**
   * Add one or more operations to a zone. Endpoints can contain path variables.
   * Host, method, endpoint will be normalized to a canoncial form when creating an
   * operation and must be unique on the zone. Inserting an operation that matches an
   * existing one will return the record of the already existing operation and update
   * its last_updated date.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const operationBulkCreateResponse of client.apiGateway.operations.bulkCreate(
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [
   *       {
   *         endpoint: '/api/v1/users/{var1}',
   *         host: 'www.example.com',
   *         method: 'GET',
   *       },
   *     ],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulkCreate(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.getAPIList(`/zones/${s}/api_gateway/operations`, Vi, { body: n, method: "post", ...e });
  }
  /**
   * Delete multiple operations
   *
   * @example
   * ```ts
   * const response =
   *   await client.apiGateway.operations.bulkDelete({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  bulkDelete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/api_gateway/operations`, e);
  }
  /**
   * Retrieve information about an operation
   *
   * @example
   * ```ts
   * const operation = await client.apiGateway.operations.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.get(`/zones/${n}/api_gateway/operations/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}, Ti = class extends p {
};
class Vi extends d {
}
Se.OperationListResponsesV4PagePaginationArray = Ti;
Se.OperationBulkCreateResponsesSinglePage = Vi;
Se.SchemaValidation = h_;
let __ = class extends o {
  /**
   * Updates zone level schema validation settings on the zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/api_gateway/settings/schema_validation`, { body: n, ...e });
  }
  /**
   * Updates zone level schema validation settings on the zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/api_gateway/settings/schema_validation`, {
      body: n,
      ...e
    });
  }
  /**
   * Retrieves zone level schema validation settings currently set on the zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/api_gateway/settings/schema_validation`, e);
  }
}, g_ = class extends o {
  constructor() {
    super(...arguments), this.schemaValidation = new __(this._client);
  }
};
g_.SchemaValidation = __;
class Di extends o {
  /**
   * Retrieve schema hosts in a zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/api_gateway/user_schemas/hosts`, Ei, { query: n, ...e });
  }
}
class Ei extends p {
}
Di.HostListResponsesV4PagePaginationArray = Ei;
let Mi = class extends o {
  /**
   * Retrieves all operations from the schema. Operations that already exist in API
   * Shield Endpoint Management will be returned as full operations.
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  list(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.getAPIList(`/zones/${n}/api_gateway/user_schemas/${t}/operations`, Ni, { query: i, ...s });
  }
}, Ni = class extends p {
};
Mi.OperationListResponsesV4PagePaginationArray = Ni;
class At extends o {
  constructor() {
    super(...arguments), this.operations = new Mi(this._client), this.hosts = new Di(this._client);
  }
  /**
   * Upload a schema to a zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/api_gateway/user_schemas`, S({ body: n, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve information about all schemas on a zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/api_gateway/user_schemas`, Yi, { query: n, ...e });
  }
  /**
   * Delete a schema
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/api_gateway/user_schemas/${t}`, s);
  }
  /**
   * Enable validation for a schema
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/api_gateway/user_schemas/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieve information about a specific schema on a zone
   *
   * @deprecated Use [Schema Validation API](https://developers.cloudflare.com/api/resources/schema_validation/) instead.
   */
  get(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.get(`/zones/${n}/api_gateway/user_schemas/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Yi extends p {
}
At.PublicSchemasV4PagePaginationArray = Yi;
At.Operations = Mi;
At.OperationListResponsesV4PagePaginationArray = Ni;
At.Hosts = Di;
At.HostListResponsesV4PagePaginationArray = Ei;
class G extends o {
  constructor() {
    super(...arguments), this.configurations = new a_(this._client), this.discovery = new Ci(this._client), this.operations = new Se(this._client), this.schemas = new u_(this._client), this.settings = new g_(this._client), this.userSchemas = new At(this._client), this.expressionTemplate = new Zi(this._client);
  }
}
G.Configurations = a_;
G.Discovery = Ci;
G.Operations = Se;
G.OperationListResponsesV4PagePaginationArray = Ti;
G.OperationBulkCreateResponsesSinglePage = Vi;
G.Schemas = u_;
G.UserSchemas = At;
G.PublicSchemasV4PagePaginationArray = Yi;
G.ExpressionTemplate = Zi;
class p_ extends o {
  /**
   * Submit the Abuse Report of a particular type
   *
   * @example
   * ```ts
   * const abuseReport = await client.abuseReports.create(
   *   'abuse_general',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     act: 'abuse_general',
   *     email: 'email',
   *     email2: 'email2',
   *     name: 'x',
   *     urls: 'urls',
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/abuse-reports/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let w_ = class extends o {
  /**
   * Add a user to the list of members for this account.
   *
   * @example
   * ```ts
   * const member = await client.accounts.members.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   email: 'user@example.com',
   *   roles: ['3536bcfad5faccb999b47003c79917fb'],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/members`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify an account member.
   *
   * @example
   * ```ts
   * const member = await client.accounts.members.update(
   *   '4536bcfad5faccb111b47003c79917fa',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/members/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all members of an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const member of client.accounts.members.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/members`, mf, {
      query: n,
      ...e
    });
  }
  /**
   * Remove a member from an account.
   *
   * @example
   * ```ts
   * const member = await client.accounts.members.delete(
   *   '4536bcfad5faccb111b47003c79917fa',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/members/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific member of an account.
   *
   * @example
   * ```ts
   * const member = await client.accounts.members.get(
   *   '4536bcfad5faccb111b47003c79917fa',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/members/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class $_ extends o {
  /**
   * Get all available roles for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const role of client.accounts.roles.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/roles`, yf, {
      query: n,
      ...e
    });
  }
  /**
   * Get information about a specific role for an account.
   *
   * @example
   * ```ts
   * const role = await client.accounts.roles.get(
   *   '3536bcfad5faccb999b47003c79917fb',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/roles/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
let m_ = class extends o {
  /**
   * Creates an account subscription.
   *
   * @example
   * ```ts
   * const subscription =
   *   await client.accounts.subscriptions.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/subscriptions`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an account subscription.
   *
   * @example
   * ```ts
   * const subscription =
   *   await client.accounts.subscriptions.update(
   *     '506e3185e9c882d175a2d0cb0093d9f2',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/subscriptions/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes an account's subscription.
   *
   * @example
   * ```ts
   * const subscription =
   *   await client.accounts.subscriptions.delete(
   *     '506e3185e9c882d175a2d0cb0093d9f2',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/subscriptions/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all of an account's subscriptions.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const subscription of client.accounts.subscriptions.get(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/subscriptions`, t_, e);
  }
};
class ji extends o {
  /**
   * Gets a list of audit logs for an account. <br /> <br /> This is the beta release
   * of Audit Logs Version 2. Since this is a beta version, there may be gaps or
   * missing entries in the available audit logs. Be aware of the following
   * limitations. <br /> <ul> <li>Audit logs are available only for the past 30 days.
   * <br /></li> <li>Error handling is not yet implemented. <br /> </li> </ul>
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const auditListResponse of client.accounts.logs.audit.list(
   *   {
   *     account_id: 'a67e14daa5f8dceeb91fe5449ba496ef',
   *     before: '2024-10-31',
   *     since: '2024-10-30',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/logs/audit`, Fi, { query: n, ...e });
  }
}
class Fi extends $i {
}
ji.AuditListResponsesCursorLimitPagination = Fi;
let Os = class extends o {
  constructor() {
    super(...arguments), this.audit = new ji(this._client);
  }
};
Os.Audit = ji;
Os.AuditListResponsesCursorLimitPagination = Fi;
let Gi = class extends o {
  /**
   * Find all available permission groups for Account Owned API Tokens
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const permissionGroupListResponse of client.accounts.tokens.permissionGroups.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/tokens/permission_groups`, Bi, { query: n, ...e });
  }
  /**
   * Find all available permission groups for Account Owned API Tokens
   *
   * @example
   * ```ts
   * const permissionGroups =
   *   await client.accounts.tokens.permissionGroups.get({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/tokens/permission_groups`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}, Bi = class extends d {
};
Gi.PermissionGroupListResponsesSinglePage = Bi;
let y_ = class extends o {
  /**
   * Roll the Account Owned API token secret.
   *
   * @example
   * ```ts
   * const tokenValue =
   *   await client.accounts.tokens.value.update(
   *     'ed17574386854bf78a67040be0a770b0',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       body: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/tokens/${t}/value`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}, ze = class extends o {
  constructor() {
    super(...arguments), this.permissionGroups = new Gi(this._client), this.value = new y_(this._client);
  }
  /**
   * Create a new Account Owned API token.
   *
   * @example
   * ```ts
   * const token = await client.accounts.tokens.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'readonly token',
   *   policies: [
   *     {
   *       effect: 'allow',
   *       permission_groups: [
   *         { id: 'c8fed203ed3043cba015a93ad1616f1f' },
   *         { id: '82e64a83756745bbbb1c9c2701bf816b' },
   *       ],
   *       resources: { foo: 'string' },
   *     },
   *   ],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/tokens`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing token.
   *
   * @example
   * ```ts
   * const token = await client.accounts.tokens.update(
   *   'ed17574386854bf78a67040be0a770b0',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'readonly token',
   *     policies: [
   *       {
   *         effect: 'allow',
   *         permission_groups: [
   *           { id: 'c8fed203ed3043cba015a93ad1616f1f' },
   *           { id: '82e64a83756745bbbb1c9c2701bf816b' },
   *         ],
   *         resources: { foo: 'string' },
   *       },
   *     ],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/tokens/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Account Owned API tokens created for this account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const token of client.accounts.tokens.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/tokens`, e_, {
      query: n,
      ...e
    });
  }
  /**
   * Destroy an Account Owned API token.
   *
   * @example
   * ```ts
   * const token = await client.accounts.tokens.delete(
   *   'ed17574386854bf78a67040be0a770b0',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/tokens/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific Account Owned API token.
   *
   * @example
   * ```ts
   * const token = await client.accounts.tokens.get(
   *   'ed17574386854bf78a67040be0a770b0',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/tokens/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Test whether a token works.
   *
   * @example
   * ```ts
   * const response = await client.accounts.tokens.verify({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  verify(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/tokens/verify`, e)._thenUnwrap((n) => n.result);
  }
};
ze.PermissionGroups = Gi;
ze.PermissionGroupListResponsesSinglePage = Bi;
ze.Value = y_;
let pt = class extends o {
  constructor() {
    super(...arguments), this.members = new w_(this._client), this.roles = new $_(this._client), this.subscriptions = new m_(this._client), this.tokens = new ze(this._client), this.logs = new Os(this._client);
  }
  /**
   * Create an account (only available for tenant admins at this time)
   *
   * @example
   * ```ts
   * const account = await client.accounts.create({
   *   name: 'name',
   *   type: 'standard',
   * });
   * ```
   */
  create(t, e) {
    return this._client.post("/accounts", { body: t, ...e })._thenUnwrap((s) => s.result);
  }
  /**
   * Update an existing account.
   *
   * @example
   * ```ts
   * const account = await client.accounts.update({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'Demo Account',
   * });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/accounts", f_, { query: t, ...e });
  }
  /**
   * Delete a specific account (only available for tenant admins at this time). This
   * is a permanent operation that will delete any zones or other resources under the
   * account
   *
   * @example
   * ```ts
   * const account = await client.accounts.delete({
   *   account_id: 'account_id',
   * });
   * ```
   */
  delete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get information about a specific account that you are a member of.
   *
   * @example
   * ```ts
   * const account = await client.accounts.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}`, e)._thenUnwrap((n) => n.result);
  }
};
class f_ extends p {
}
pt.AccountsV4PagePaginationArray = f_;
pt.Members = w_;
pt.Roles = $_;
pt.Subscriptions = m_;
pt.Tokens = ze;
pt.Logs = Os;
class P_ extends o {
  /**
   * Submit LOA document (pdf format) under the account.
   *
   * @example
   * ```ts
   * const loaDocument =
   *   await client.addressing.loaDocuments.create({
   *     account_id: '258def64c72dae45f3e4c8516e2111f2',
   *     loa_document: '@document.pdf',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/addressing/loa_documents`, S({ body: n, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Download specified LOA document under the account.
   *
   * @example
   * ```ts
   * const loaDocument =
   *   await client.addressing.loaDocuments.get(
   *     'd933b1530bc56c9953cf8ce166da8004',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   *
   * const content = await loaDocument.blob();
   * console.log(content);
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/addressing/loa_documents/${t}/download`, {
      ...s,
      headers: { Accept: "application/pdf", ...s?.headers },
      __binaryResponse: !0
    });
  }
}
class Hi extends o {
  /**
   * Bring-Your-Own IP (BYOIP) prefixes onboarded to Cloudflare must be bound to a
   * service running on the Cloudflare network to enable a Cloudflare product on the
   * IP addresses. This endpoint can be used as a reference of available services on
   * the Cloudflare network, and their service IDs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const serviceListResponse of client.addressing.services.list(
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/addressing/services`, Wi, e);
  }
}
class Wi extends d {
}
Hi.ServiceListResponsesSinglePage = Wi;
class b_ extends o {
  /**
   * Add an account as a member of a particular address map.
   *
   * @example
   * ```ts
   * const account =
   *   await client.addressing.addressMaps.accounts.update(
   *     '055817b111884e0227e1be16a0be6ee0',
   *     {
   *       account_id: '258def64c72dae45f3e4c8516e2111f2',
   *       body: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/addressing/address_maps/${t}/accounts/${n}`, { body: i, ...s });
  }
  /**
   * Remove an account as a member of a particular address map.
   *
   * @example
   * ```ts
   * const account =
   *   await client.addressing.addressMaps.accounts.delete(
   *     '055817b111884e0227e1be16a0be6ee0',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/addressing/address_maps/${t}/accounts/${n}`, s);
  }
}
let U_ = class extends o {
  /**
   * Add an IP from a prefix owned by the account to a particular address map.
   *
   * @example
   * ```ts
   * const ip = await client.addressing.addressMaps.ips.update(
   *   '055817b111884e0227e1be16a0be6ee0',
   *   '192.0.2.1',
   *   {
   *     account_id: '258def64c72dae45f3e4c8516e2111f2',
   *     body: {},
   *   },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.put(`/accounts/${i}/addressing/address_maps/${t}/ips/${e}`, { body: c, ...n });
  }
  /**
   * Remove an IP from a particular address map.
   *
   * @example
   * ```ts
   * const ip = await client.addressing.addressMaps.ips.delete(
   *   '055817b111884e0227e1be16a0be6ee0',
   *   '192.0.2.1',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/addressing/address_maps/${t}/ips/${e}`, n);
  }
}, x_ = class extends o {
  /**
   * Add a zone as a member of a particular address map.
   *
   * @example
   * ```ts
   * const zone =
   *   await client.addressing.addressMaps.zones.update(
   *     '055817b111884e0227e1be16a0be6ee0',
   *     {
   *       zone_id: '8ac8489932db6327334c9b6d58544cfe',
   *       account_id: '258def64c72dae45f3e4c8516e2111f2',
   *       body: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, account_id: i, body: c } = e;
    return this._client.put(`/accounts/${i}/addressing/address_maps/${t}/zones/${n}`, { body: c, ...s });
  }
  /**
   * Remove a zone as a member of a particular address map.
   *
   * @example
   * ```ts
   * const zone =
   *   await client.addressing.addressMaps.zones.delete(
   *     '055817b111884e0227e1be16a0be6ee0',
   *     {
   *       zone_id: '8ac8489932db6327334c9b6d58544cfe',
   *       account_id: '258def64c72dae45f3e4c8516e2111f2',
   *     },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n, account_id: i } = e;
    return this._client.delete(`/accounts/${i}/addressing/address_maps/${t}/zones/${n}`, s);
  }
};
class Ht extends o {
  constructor() {
    super(...arguments), this.accounts = new b_(this._client), this.ips = new U_(this._client), this.zones = new x_(this._client);
  }
  /**
   * Create a new address map under the account.
   *
   * @example
   * ```ts
   * const addressMap =
   *   await client.addressing.addressMaps.create({
   *     account_id: '258def64c72dae45f3e4c8516e2111f2',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/addressing/address_maps`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all address maps owned by the account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const addressMap of client.addressing.addressMaps.list(
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/addressing/address_maps`, Ki, e);
  }
  /**
   * Delete a particular address map owned by the account. An Address Map must be
   * disabled before it can be deleted.
   *
   * @example
   * ```ts
   * const addressMap =
   *   await client.addressing.addressMaps.delete(
   *     '055817b111884e0227e1be16a0be6ee0',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/addressing/address_maps/${t}`, s);
  }
  /**
   * Modify properties of an address map owned by the account.
   *
   * @example
   * ```ts
   * const addressMap = await client.addressing.addressMaps.edit(
   *   '055817b111884e0227e1be16a0be6ee0',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/addressing/address_maps/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show a particular address map owned by the account.
   *
   * @example
   * ```ts
   * const addressMap = await client.addressing.addressMaps.get(
   *   '055817b111884e0227e1be16a0be6ee0',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/addressing/address_maps/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ki extends d {
}
Ht.AddressMapsSinglePage = Ki;
Ht.Accounts = b_;
Ht.IPs = U_;
Ht.Zones = x_;
class S_ extends o {
  /**
   * Advertise or withdraw the BGP route for a prefix.
   *
   * **Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for
   * advertising and withdrawing subnets of an IP prefix.
   *
   * @deprecated
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/addressing/prefixes/${t}/bgp/status`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * View the current advertisement state for a prefix.
   *
   * **Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for
   * advertising and withdrawing subnets of an IP prefix.
   *
   * @deprecated
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/addressing/prefixes/${t}/bgp/status`, s)._thenUnwrap((i) => i.result);
  }
}
class Xi extends o {
  /**
   * Create a BGP prefix, controlling the BGP advertisement status of a specific
   * subnet. When created, BGP prefixes are initially withdrawn, and can be
   * advertised with the Update BGP Prefix API.
   *
   * @example
   * ```ts
   * const bgpPrefix =
   *   await client.addressing.prefixes.bgpPrefixes.create(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/addressing/prefixes/${t}/bgp/prefixes`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all BGP Prefixes within the specified IP Prefix. BGP Prefixes are used to
   * control which specific subnets are advertised to the Internet. It is possible to
   * advertise subnets more specific than an IP Prefix by creating more specific BGP
   * Prefixes.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const bgpPrefix of client.addressing.prefixes.bgpPrefixes.list(
   *   '2af39739cc4e3b5910c918468bb89828',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes/${t}/bgp/prefixes`, Qi, s);
  }
  /**
   * Update the properties of a BGP Prefix, such as the on demand advertisement
   * status (advertised or withdrawn).
   *
   * @example
   * ```ts
   * const bgpPrefix =
   *   await client.addressing.prefixes.bgpPrefixes.edit(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     '7009ba364c7a5760798ceb430e603b74',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/addressing/prefixes/${t}/bgp/prefixes/${e}`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * Retrieve a single BGP Prefix according to its identifier
   *
   * @example
   * ```ts
   * const bgpPrefix =
   *   await client.addressing.prefixes.bgpPrefixes.get(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     '7009ba364c7a5760798ceb430e603b74',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/addressing/prefixes/${t}/bgp/prefixes/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Qi extends d {
}
Xi.BGPPrefixesSinglePage = Qi;
class z_ extends o {
  /**
   * Create a new account delegation for a given IP prefix.
   *
   * @example
   * ```ts
   * const delegations =
   *   await client.addressing.prefixes.delegations.create(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     {
   *       account_id: '258def64c72dae45f3e4c8516e2111f2',
   *       cidr: '192.0.2.0/24',
   *       delegated_account_id:
   *         'b1946ac92492d2347c6235b4d2611184',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/addressing/prefixes/${t}/delegations`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all delegations for a given account IP prefix.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const delegations of client.addressing.prefixes.delegations.list(
   *   '2af39739cc4e3b5910c918468bb89828',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes/${t}/delegations`, Ji, s);
  }
  /**
   * Delete an account delegation for a given IP prefix.
   *
   * @example
   * ```ts
   * const delegation =
   *   await client.addressing.prefixes.delegations.delete(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     'd933b1530bc56c9953cf8ce166da8004',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/addressing/prefixes/${t}/delegations/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Ji extends d {
}
z_.DelegationsSinglePage = Ji;
class qi extends o {
  /**
   * Creates a new Service Binding, routing traffic to IPs within the given CIDR to a
   * service running on Cloudflare's network. **Note:** This API may only be used on
   * prefixes currently configured with a Magic Transit/Cloudflare CDN/Cloudflare
   * Spectrum service binding, and only allows creating upgrade service bindings for
   * the Cloudflare CDN or Cloudflare Spectrum.
   *
   * @example
   * ```ts
   * const serviceBinding =
   *   await client.addressing.prefixes.serviceBindings.create(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/addressing/prefixes/${t}/bindings`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List the Cloudflare services this prefix is currently bound to. Traffic sent to
   * an address within an IP prefix will be routed to the Cloudflare service of the
   * most-specific Service Binding matching the address. **Example:** binding
   * `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare
   * CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other
   * IPs in the prefix to Cloudflare Magic Transit.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const serviceBinding of client.addressing.prefixes.serviceBindings.list(
   *   '2af39739cc4e3b5910c918468bb89828',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/addressing/prefixes/${t}/bindings`, tr, s);
  }
  /**
   * Delete a Service Binding
   *
   * @example
   * ```ts
   * const serviceBinding =
   *   await client.addressing.prefixes.serviceBindings.delete(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     '0429b49b6a5155297b78e75a44b09e14',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/addressing/prefixes/${t}/bindings/${e}`, n);
  }
  /**
   * Fetch a single Service Binding
   *
   * @example
   * ```ts
   * const serviceBinding =
   *   await client.addressing.prefixes.serviceBindings.get(
   *     '2af39739cc4e3b5910c918468bb89828',
   *     '0429b49b6a5155297b78e75a44b09e14',
   *     { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/addressing/prefixes/${t}/bindings/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class tr extends d {
}
qi.ServiceBindingsSinglePage = tr;
class ot extends o {
  constructor() {
    super(...arguments), this.serviceBindings = new qi(this._client), this.bgpPrefixes = new Xi(this._client), this.advertisementStatus = new S_(this._client), this.delegations = new z_(this._client);
  }
  /**
   * Add a new prefix under the account.
   *
   * @example
   * ```ts
   * const prefix = await client.addressing.prefixes.create({
   *   account_id: '258def64c72dae45f3e4c8516e2111f2',
   *   asn: 209242,
   *   cidr: '192.0.2.0/24',
   *   loa_document_id: 'd933b1530bc56c9953cf8ce166da8004',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/addressing/prefixes`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all prefixes owned by the account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const prefix of client.addressing.prefixes.list({
   *   account_id: '258def64c72dae45f3e4c8516e2111f2',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/addressing/prefixes`, er, e);
  }
  /**
   * Delete an unapproved prefix owned by the account.
   *
   * @example
   * ```ts
   * const prefix = await client.addressing.prefixes.delete(
   *   '2af39739cc4e3b5910c918468bb89828',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/addressing/prefixes/${t}`, s);
  }
  /**
   * Modify the description for a prefix owned by the account.
   *
   * @example
   * ```ts
   * const prefix = await client.addressing.prefixes.edit(
   *   '2af39739cc4e3b5910c918468bb89828',
   *   {
   *     account_id: '258def64c72dae45f3e4c8516e2111f2',
   *     description: 'Internal test prefix',
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/addressing/prefixes/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a particular prefix owned by the account.
   *
   * @example
   * ```ts
   * const prefix = await client.addressing.prefixes.get(
   *   '2af39739cc4e3b5910c918468bb89828',
   *   { account_id: '258def64c72dae45f3e4c8516e2111f2' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/addressing/prefixes/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class er extends d {
}
ot.PrefixesSinglePage = er;
ot.ServiceBindings = qi;
ot.ServiceBindingsSinglePage = tr;
ot.BGPPrefixes = Xi;
ot.BGPPrefixesSinglePage = Qi;
ot.AdvertisementStatus = S_;
ot.DelegationsSinglePage = Ji;
let sr = class extends o {
  /**
   * List all Regional Services regions available for use by this account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const regionListResponse of client.addressing.regionalHostnames.regions.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/addressing/regional_hostnames/regions`, nr, e);
  }
};
class nr extends d {
}
sr.RegionListResponsesSinglePage = nr;
class Re extends o {
  constructor() {
    super(...arguments), this.regions = new sr(this._client);
  }
  /**
   * Create a new Regional Hostname entry. Cloudflare will only use data centers that
   * are physically located within the chosen region to decrypt and service HTTPS
   * traffic. Learn more about
   * [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).
   *
   * @example
   * ```ts
   * const regionalHostname =
   *   await client.addressing.regionalHostnames.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     hostname: 'foo.example.com',
   *     region_key: 'ca',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/addressing/regional_hostnames`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all Regional Hostnames within a zone.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const regionalHostnameListResponse of client.addressing.regionalHostnames.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/addressing/regional_hostnames`, ir, e);
  }
  /**
   * Delete the region configuration for a specific Regional Hostname.
   *
   * @example
   * ```ts
   * const regionalHostname =
   *   await client.addressing.regionalHostnames.delete(
   *     'foo.example.com',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/addressing/regional_hostnames/${t}`, s);
  }
  /**
   * Update the configuration for a specific Regional Hostname. Only the region_key
   * of a hostname is mutable.
   *
   * @example
   * ```ts
   * const response =
   *   await client.addressing.regionalHostnames.edit(
   *     'foo.example.com',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       region_key: 'ca',
   *     },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/addressing/regional_hostnames/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch the configuration for a specific Regional Hostname, within a zone.
   *
   * @example
   * ```ts
   * const regionalHostname =
   *   await client.addressing.regionalHostnames.get(
   *     'foo.example.com',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/addressing/regional_hostnames/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class ir extends d {
}
Re.RegionalHostnameListResponsesSinglePage = ir;
Re.Regions = sr;
Re.RegionListResponsesSinglePage = nr;
class B extends o {
  constructor() {
    super(...arguments), this.regionalHostnames = new Re(this._client), this.services = new Hi(this._client), this.addressMaps = new Ht(this._client), this.loaDocuments = new P_(this._client), this.prefixes = new ot(this._client);
  }
}
B.RegionalHostnames = Re;
B.RegionalHostnameListResponsesSinglePage = ir;
B.Services = Hi;
B.ServiceListResponsesSinglePage = Wi;
B.AddressMaps = Ht;
B.AddressMapsSinglePage = Ki;
B.LOADocuments = P_;
B.Prefixes = ot;
B.PrefixesSinglePage = er;
class R_ extends o {
  /**
   * Gets a list of all alert types for which an account is eligible.
   *
   * @example
   * ```ts
   * const availableAlerts =
   *   await client.alerting.availableAlerts.list({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/alerting/v3/available_alerts`, e)._thenUnwrap((n) => n.result);
  }
}
class rr extends o {
  /**
   * Gets a list of history records for notifications sent to an account. The records
   * are displayed for last `x` number of days based on the zone plan (free = 30, pro
   * = 30, biz = 30, ent = 90).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const history of client.alerting.history.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/history`, cr, { query: n, ...e });
  }
}
class cr extends p {
}
rr.HistoriesV4PagePaginationArray = cr;
let or = class extends o {
  /**
   * Creates a new Notification policy.
   *
   * @example
   * ```ts
   * const policy = await client.alerting.policies.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   alert_type: 'universal_ssl_event_type',
   *   enabled: true,
   *   mechanisms: {},
   *   name: 'SSL Notification Event Policy',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/alerting/v3/policies`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Notification policy.
   *
   * @example
   * ```ts
   * const policy = await client.alerting.policies.update(
   *   '0da2b59e-f118-439d-8097-bdfb215203c9',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/alerting/v3/policies/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a list of all Notification policies.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const policy of client.alerting.policies.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/policies`, ar, e);
  }
  /**
   * Delete a Notification policy.
   *
   * @example
   * ```ts
   * const policy = await client.alerting.policies.delete(
   *   '0da2b59e-f118-439d-8097-bdfb215203c9',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/alerting/v3/policies/${t}`, s);
  }
  /**
   * Get details for a single policy.
   *
   * @example
   * ```ts
   * const policy = await client.alerting.policies.get(
   *   '0da2b59e-f118-439d-8097-bdfb215203c9',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/alerting/v3/policies/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class ar extends d {
}
or.PoliciesSinglePage = ar;
class A_ extends o {
  /**
   * Get a list of all delivery mechanism types for which an account is eligible.
   *
   * @example
   * ```ts
   * const eligible =
   *   await client.alerting.destinations.eligible.get({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/alerting/v3/destinations/eligible`, e)._thenUnwrap((n) => n.result);
  }
}
class ur extends o {
  /**
   * Creates a new token for integrating with PagerDuty.
   *
   * @example
   * ```ts
   * const pagerduty =
   *   await client.alerting.destinations.pagerduty.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/alerting/v3/destinations/pagerduty/connect`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Deletes all the PagerDuty Services connected to the account.
   *
   * @example
   * ```ts
   * const pagerduty =
   *   await client.alerting.destinations.pagerduty.delete({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  delete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/alerting/v3/destinations/pagerduty`, e);
  }
  /**
   * Get a list of all configured PagerDuty services.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const pagerduty of client.alerting.destinations.pagerduty.get(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/destinations/pagerduty`, lr, e);
  }
  /**
   * Links PagerDuty with the account using the integration token.
   *
   * @example
   * ```ts
   * const response =
   *   await client.alerting.destinations.pagerduty.link(
   *     '8c71e667571b4f61b94d9e4b12158038',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  link(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/alerting/v3/destinations/pagerduty/connect/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class lr extends d {
}
ur.PagerdutiesSinglePage = lr;
let v_ = class extends o {
  /**
   * Creates a new webhook destination.
   *
   * @example
   * ```ts
   * const webhook =
   *   await client.alerting.destinations.webhooks.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'Slack Webhook',
   *     url: 'https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/alerting/v3/destinations/webhooks`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a webhook destination.
   *
   * @example
   * ```ts
   * const webhook =
   *   await client.alerting.destinations.webhooks.update(
   *     'b115d5ec-15c6-41ee-8b76-92c449b5227b',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       name: 'Slack Webhook',
   *       url: 'https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/alerting/v3/destinations/webhooks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets a list of all configured webhook destinations.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const webhooks of client.alerting.destinations.webhooks.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/alerting/v3/destinations/webhooks`, dr, e);
  }
  /**
   * Delete a configured webhook destination.
   *
   * @example
   * ```ts
   * const webhook =
   *   await client.alerting.destinations.webhooks.delete(
   *     'b115d5ec-15c6-41ee-8b76-92c449b5227b',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/alerting/v3/destinations/webhooks/${t}`, s);
  }
  /**
   * Get details for a single webhooks destination.
   *
   * @example
   * ```ts
   * const webhooks =
   *   await client.alerting.destinations.webhooks.get(
   *     'b115d5ec-15c6-41ee-8b76-92c449b5227b',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/alerting/v3/destinations/webhooks/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class dr extends d {
}
v_.WebhooksSinglePage = dr;
class Wt extends o {
  constructor() {
    super(...arguments), this.eligible = new A_(this._client), this.pagerduty = new ur(this._client), this.webhooks = new v_(this._client);
  }
}
Wt.Eligible = A_;
Wt.PagerdutyResource = ur;
Wt.PagerdutiesSinglePage = lr;
Wt.WebhooksSinglePage = dr;
class wt extends o {
  constructor() {
    super(...arguments), this.availableAlerts = new R_(this._client), this.destinations = new Wt(this._client), this.history = new rr(this._client), this.policies = new or(this._client);
  }
}
wt.AvailableAlerts = R_;
wt.Destinations = Wt;
wt.HistoryResource = rr;
wt.HistoriesV4PagePaginationArray = cr;
wt.Policies = or;
wt.PoliciesSinglePage = ar;
class L_ extends o {
  /**
   * Updates enablement of Argo Smart Routing.
   *
   * @example
   * ```ts
   * const response = await client.argo.smartRouting.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   value: 'on',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/argo/smart_routing`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Argo Smart Routing setting
   *
   * @example
   * ```ts
   * const smartRouting = await client.argo.smartRouting.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/argo/smart_routing`, e)._thenUnwrap((n) => n.result);
  }
}
class I_ extends o {
  /**
   * Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of
   * lower-tiers and upper-tiers. If content is not cached in lower-tier data centers
   * (generally the ones closest to a visitor), the lower-tier must ask an upper-tier
   * to see if it has the content. If the upper-tier does not have the content, only
   * the upper-tier can ask the origin for content. This practice improves bandwidth
   * efficiency by limiting the number of data centers that can ask the origin for
   * content, which reduces origin load and makes websites more cost-effective to
   * operate. Additionally, Tiered Cache concentrates connections to origin servers
   * so they come from a small number of data centers rather than the full set of
   * network locations. This results in fewer open connections using server
   * resources.
   *
   * @example
   * ```ts
   * const response = await client.argo.tieredCaching.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   value: 'on',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/argo/tiered_caching`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of
   * lower-tiers and upper-tiers. If content is not cached in lower-tier data centers
   * (generally the ones closest to a visitor), the lower-tier must ask an upper-tier
   * to see if it has the content. If the upper-tier does not have the content, only
   * the upper-tier can ask the origin for content. This practice improves bandwidth
   * efficiency by limiting the number of data centers that can ask the origin for
   * content, which reduces origin load and makes websites more cost-effective to
   * operate. Additionally, Tiered Cache concentrates connections to origin servers
   * so they come from a small number of data centers rather than the full set of
   * network locations. This results in fewer open connections using server
   * resources.
   *
   * @example
   * ```ts
   * const tieredCaching = await client.argo.tieredCaching.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/argo/tiered_caching`, e)._thenUnwrap((n) => n.result);
  }
}
class Cs extends o {
  constructor() {
    super(...arguments), this.smartRouting = new L_(this._client), this.tieredCaching = new I_(this._client);
  }
}
Cs.SmartRouting = L_;
Cs.TieredCaching = I_;
let k_ = class extends o {
  /**
   * Gets a list of audit logs for an account. Can be filtered by who made the
   * change, on which zone, and the timeframe of the change.
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/audit_logs`, s_, {
      query: n,
      ...e
    });
  }
}, O_ = class extends o {
  /**
   * Gets the current billing profile for the account.
   *
   * @deprecated
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/billing/profile`, e)._thenUnwrap((n) => n.result);
  }
}, hr = class extends o {
  constructor() {
    super(...arguments), this.profiles = new O_(this._client);
  }
};
hr.Profiles = O_;
class C_ extends o {
  /**
   * Updates the Bot Management configuration for a zone.
   *
   * This API is used to update:
   *
   * - **Bot Fight Mode**
   * - **Super Bot Fight Mode**
   * - **Bot Management for Enterprise**
   *
   * See [Bot Plans](https://developers.cloudflare.com/bots/plans/) for more
   * information on the different plans \
   * If you recently upgraded or downgraded your plan, refer to the following examples
   * to clean up old configurations. Copy and paste the example body to remove old zone
   * configurations based on your current plan.
   *
   * #### Clean up configuration for Bot Fight Mode plan
   *
   * ```json
   * {
   *   "sbfm_likely_automated": "allow",
   *   "sbfm_definitely_automated": "allow",
   *   "sbfm_verified_bots": "allow",
   *   "sbfm_static_resource_protection": false,
   *   "optimize_wordpress": false,
   *   "suppress_session_score": false
   * }
   * ```
   *
   * #### Clean up configuration for SBFM Pro plan
   *
   * ```json
   * {
   *   "sbfm_likely_automated": "allow",
   *   "fight_mode": false
   * }
   * ```
   *
   * #### Clean up configuration for SBFM Biz plan
   *
   * ```json
   * {
   *   "fight_mode": false
   * }
   * ```
   *
   * #### Clean up configuration for BM Enterprise Subscription plan
   *
   * It is strongly recommended that you ensure you have
   * [custom rules](https://developers.cloudflare.com/waf/custom-rules/) in place to
   * protect your zone before disabling the SBFM rules. Without these protections,
   * your zone is vulnerable to attacks.
   *
   * ```json
   * {
   *   "sbfm_likely_automated": "allow",
   *   "sbfm_definitely_automated": "allow",
   *   "sbfm_verified_bots": "allow",
   *   "sbfm_static_resource_protection": false,
   *   "optimize_wordpress": false,
   *   "fight_mode": false
   * }
   * ```
   *
   * @example
   * ```ts
   * const botManagement = await client.botManagement.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   ai_bots_protection: 'disabled',
   *   crawler_protection: 'disabled',
   *   enable_js: true,
   *   fight_mode: true,
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/bot_management`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve a zone's Bot Management Config
   *
   * @example
   * ```ts
   * const botManagement = await client.botManagement.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/bot_management`, e)._thenUnwrap((n) => n.result);
  }
}
let Z_ = class extends o {
  /**
   * Gets all the data the botnet tracking database has for a given ASN registered to
   * user account for given date. If no date is given, it will return results for the
   * previous day.
   */
  dayReport(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/botnet_feed/asn/${t}/day_report`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets all the data the botnet threat feed tracking database has for a given ASN
   * registered to user account.
   */
  fullReport(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/botnet_feed/asn/${t}/full_report`, s)._thenUnwrap((i) => i.result);
  }
}, T_ = class extends o {
  /**
   * Delete an ASN from botnet threat feed for a given user.
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/botnet_feed/configs/asn/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets a list of all ASNs registered for a user for the DDoS Botnet Feed API.
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/botnet_feed/configs/asn`, e)._thenUnwrap((n) => n.result);
  }
}, _r = class extends o {
  constructor() {
    super(...arguments), this.asn = new T_(this._client);
  }
};
_r.ASN = T_;
class Zs extends o {
  constructor() {
    super(...arguments), this.asn = new Z_(this._client), this.configs = new _r(this._client);
  }
}
Zs.ASN = Z_;
Zs.Configs = _r;
class V_ extends o {
}
class D_ extends o {
}
class E_ extends o {
}
class M_ extends o {
}
class Kt extends o {
  constructor() {
    super(...arguments), this.queries = new M_(this._client), this.matches = new E_(this._client), this.logos = new D_(this._client), this.logoMatches = new V_(this._client);
  }
  /**
   * Submit suspicious URL for scanning.
   *
   * @example
   * ```ts
   * const submit = await client.brandProtection.submit({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  submit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/brand-protection/submit`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets phishing details about a URL.
   *
   * @example
   * ```ts
   * const info = await client.brandProtection.urlInfo({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  urlInfo(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/brand-protection/url-info`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
Kt.Queries = M_;
Kt.Matches = E_;
Kt.Logos = D_;
Kt.LogoMatches = V_;
let N_ = class extends o {
  /**
   * Fetches rendered HTML content from provided URL or HTML. Check available options
   * like `gotoOptions` and `waitFor*` to control page load behaviour.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/content`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    })._thenUnwrap((c) => c.result);
  }
};
class Y_ extends o {
  /**
   * Gets json from a webpage from a provided URL or HTML. Pass `prompt` or `schema`
   * in the body. Control page loading with `gotoOptions` and `waitFor*` options.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/json`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    })._thenUnwrap((c) => c.result);
  }
}
class j_ extends o {
  /**
   * Get links from a web page.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/links`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    })._thenUnwrap((c) => c.result);
  }
}
class F_ extends o {
  /**
   * Gets markdown of a webpage from provided URL or HTML. Control page loading with
   * `gotoOptions` and `waitFor*` options.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/markdown`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    })._thenUnwrap((c) => c.result);
  }
}
class G_ extends o {
  /**
   * Fetches rendered PDF from provided URL or HTML. Check available options like
   * `gotoOptions` and `waitFor*` to control page load behaviour.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/pdf`, {
      query: { cacheTTL: n },
      body: i,
      ...e,
      headers: { Accept: "application/pdf", ...e?.headers },
      __binaryResponse: !0
    });
  }
}
class B_ extends o {
  /**
   * Get meta attributes like height, width, text and others of selected elements.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/scrape`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    })._thenUnwrap((c) => c.result);
  }
}
class H_ extends o {
  /**
   * Takes a screenshot of a webpage from provided URL or HTML. Control page loading
   * with `gotoOptions` and `waitFor*` options. Customize screenshots with
   * `viewport`, `fullPage`, `clip` and others.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/screenshot`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    });
  }
}
class W_ extends o {
  /**
   * Returns the page's HTML content and screenshot. Control page loading with
   * `gotoOptions` and `waitFor*` options. Customize screenshots with `viewport`,
   * `fullPage`, `clip` and others.
   */
  create(t, e) {
    const { account_id: s, cacheTTL: n, ...i } = t;
    return this._client.post(`/accounts/${s}/browser-rendering/snapshot`, {
      query: { cacheTTL: n },
      body: i,
      ...e
    })._thenUnwrap((c) => c.result);
  }
}
class Q extends o {
  constructor() {
    super(...arguments), this.content = new N_(this._client), this.pdf = new G_(this._client), this.scrape = new B_(this._client), this.screenshot = new H_(this._client), this.snapshot = new W_(this._client), this.json = new Y_(this._client), this.links = new j_(this._client), this.markdown = new F_(this._client);
  }
}
Q.Content = N_;
Q.PDF = G_;
Q.Scrape = B_;
Q.Screenshot = H_;
Q.Snapshot = W_;
Q.Json = Y_;
Q.Links = j_;
Q.Markdown = F_;
class K_ extends o {
  /**
   * You can use Cache Reserve Clear to clear your Cache Reserve, but you must first
   * disable Cache Reserve. In most cases, this will be accomplished within 24 hours.
   * You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind
   * that you cannot undo or cancel this operation.
   *
   * @example
   * ```ts
   * const response = await client.cache.cacheReserve.clear({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   body: {},
   * });
   * ```
   */
  clear(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/cache/cache_reserve_clear`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Increase cache lifetimes by automatically storing all cacheable files into
   * Cloudflare's persistent object storage buckets. Requires Cache Reserve
   * subscription. Note: using Tiered Cache with Cache Reserve is highly recommended
   * to reduce Reserve operations costs. See the
   * [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve)
   * for more information.
   *
   * @example
   * ```ts
   * const response = await client.cache.cacheReserve.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   value: 'on',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/cache/cache_reserve`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Increase cache lifetimes by automatically storing all cacheable files into
   * Cloudflare's persistent object storage buckets. Requires Cache Reserve
   * subscription. Note: using Tiered Cache with Cache Reserve is highly recommended
   * to reduce Reserve operations costs. See the
   * [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve)
   * for more information.
   *
   * @example
   * ```ts
   * const cacheReserve = await client.cache.cacheReserve.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/cache/cache_reserve`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * You can use Cache Reserve Clear to clear your Cache Reserve, but you must first
   * disable Cache Reserve. In most cases, this will be accomplished within 24 hours.
   * You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind
   * that you cannot undo or cancel this operation.
   *
   * @example
   * ```ts
   * const response = await client.cache.cacheReserve.status({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  status(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/cache/cache_reserve_clear`, e)._thenUnwrap((n) => n.result);
  }
}
class X_ extends o {
  /**
   * Instructs Cloudflare to check a regional hub data center on the way to your
   * upper tier. This can help improve performance for smart and custom tiered cache
   * topologies.
   *
   * @example
   * ```ts
   * const response =
   *   await client.cache.regionalTieredCache.edit({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     value: 'on',
   *   });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/cache/regional_tiered_cache`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Instructs Cloudflare to check a regional hub data center on the way to your
   * upper tier. This can help improve performance for smart and custom tiered cache
   * topologies.
   *
   * @example
   * ```ts
   * const regionalTieredCache =
   *   await client.cache.regionalTieredCache.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/cache/regional_tiered_cache`, e)._thenUnwrap((n) => n.result);
  }
}
class Q_ extends o {
  /**
   * Smart Tiered Cache dynamically selects the single closest upper tier for each of
   * your website’s origins with no configuration required, using our in-house
   * performance and routing data. Cloudflare collects latency data for each request
   * to an origin, and uses the latency data to determine how well any upper-tier
   * data center is connected with an origin. As a result, Cloudflare can select the
   * data center with the lowest latency to be the upper-tier for an origin.
   *
   * @example
   * ```ts
   * const smartTieredCache =
   *   await client.cache.smartTieredCache.delete({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/cache/tiered_cache_smart_topology_enable`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Smart Tiered Cache dynamically selects the single closest upper tier for each of
   * your website’s origins with no configuration required, using our in-house
   * performance and routing data. Cloudflare collects latency data for each request
   * to an origin, and uses the latency data to determine how well any upper-tier
   * data center is connected with an origin. As a result, Cloudflare can select the
   * data center with the lowest latency to be the upper-tier for an origin.
   *
   * @example
   * ```ts
   * const response = await client.cache.smartTieredCache.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   value: 'on',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/cache/tiered_cache_smart_topology_enable`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Smart Tiered Cache dynamically selects the single closest upper tier for each of
   * your website’s origins with no configuration required, using our in-house
   * performance and routing data. Cloudflare collects latency data for each request
   * to an origin, and uses the latency data to determine how well any upper-tier
   * data center is connected with an origin. As a result, Cloudflare can select the
   * data center with the lowest latency to be the upper-tier for an origin.
   *
   * @example
   * ```ts
   * const smartTieredCache =
   *   await client.cache.smartTieredCache.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/cache/tiered_cache_smart_topology_enable`, e)._thenUnwrap((n) => n.result);
  }
}
let J_ = class extends o {
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   *
   * @example
   * ```ts
   * const variant = await client.cache.variants.delete({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/cache/variants`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   *
   * @example
   * ```ts
   * const response = await client.cache.variants.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   value: {},
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/cache/variants`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Variant support enables caching variants of images with certain file extensions
   * in addition to the original. This only applies when the origin server sends the
   * 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but
   * does not serve the variant requested, the response will not be cached. This will
   * be indicated with BYPASS cache status in the response headers.
   *
   * @example
   * ```ts
   * const variant = await client.cache.variants.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/cache/variants`, e)._thenUnwrap((n) => n.result);
  }
};
class Xt extends o {
  constructor() {
    super(...arguments), this.cacheReserve = new K_(this._client), this.smartTieredCache = new Q_(this._client), this.variants = new J_(this._client), this.regionalTieredCache = new X_(this._client);
  }
  /**
   * ### Purge All Cached Content
   *
   * Removes ALL files from Cloudflare's cache. All tiers can purge everything.
   *
   * ```
   * {"purge_everything": true}
   * ```
   *
   * ### Purge Cached Content by URL
   *
   * Granularly removes one or more files from Cloudflare's cache by specifying URLs.
   * All tiers can purge by URL.
   *
   * To purge files with custom cache keys, include the headers used to compute the
   * cache key as in the example. If you have a device type or geo in your cache key,
   * you will need to include the CF-Device-Type or CF-IPCountry headers. If you have
   * lang in your cache key, you will need to include the Accept-Language header.
   *
   * **NB:** When including the Origin header, be sure to include the **scheme** and
   * **hostname**. The port number can be omitted if it is the default port (80 for
   * http, 443 for https), but must be included otherwise.
   *
   * Single file purge example with files:
   *
   * ```
   * {"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}
   * ```
   *
   * Single file purge example with url and header pairs:
   *
   * ```
   * {"files": [{url: "http://www.example.com/cat_picture.jpg", headers: { "CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN" }}, {url: "http://www.example.com/dog_picture.jpg", headers: { "CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US" }}]}
   * ```
   *
   * ### Purge Cached Content by Tag, Host or Prefix
   *
   * Granularly removes one or more files from Cloudflare's cache either by
   * specifying the host, the associated Cache-Tag, or a Prefix.
   *
   * Flex purge with tags:
   *
   * ```
   * {"tags": ["a-cache-tag", "another-cache-tag"]}
   * ```
   *
   * Flex purge with hosts:
   *
   * ```
   * {"hosts": ["www.example.com", "images.example.com"]}
   * ```
   *
   * Flex purge with prefixes:
   *
   * ```
   * {"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}
   * ```
   *
   * ### Availability and limits
   *
   * please refer to
   * [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).
   *
   * @example
   * ```ts
   * const response = await client.cache.purge({
   *   zone_id: 'zone_id',
   * });
   * ```
   */
  purge(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/purge_cache`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
}
Xt.CacheReserveResource = K_;
Xt.SmartTieredCache = Q_;
Xt.Variants = J_;
Xt.RegionalTieredCacheResource = X_;
class gr extends o {
  /**
   * Creates a new Cloudflare calls app. An app is an unique enviroment where each
   * Session can access all Tracks within the app.
   *
   * @example
   * ```ts
   * const sfu = await client.calls.sfu.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/calls/apps`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Edit details for a single app.
   *
   * @example
   * ```ts
   * const sfu = await client.calls.sfu.update(
   *   '2a95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/calls/apps/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all apps in the Cloudflare account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const sfuListResponse of client.calls.sfu.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/calls/apps`, pr, e);
  }
  /**
   * Deletes an app from Cloudflare Calls
   *
   * @example
   * ```ts
   * const sfu = await client.calls.sfu.delete(
   *   '2a95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/calls/apps/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single Calls app.
   *
   * @example
   * ```ts
   * const sfu = await client.calls.sfu.get(
   *   '2a95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/calls/apps/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class pr extends d {
}
gr.SFUListResponsesSinglePage = pr;
class wr extends o {
  /**
   * Creates a new Cloudflare Calls TURN key.
   *
   * @example
   * ```ts
   * const turn = await client.calls.turn.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/calls/turn_keys`, { body: n, ...e });
  }
  /**
   * Edit details for a single TURN key.
   *
   * @example
   * ```ts
   * const turn = await client.calls.turn.update(
   *   '2a95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/calls/turn_keys/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all TURN keys in the Cloudflare account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const turnListResponse of client.calls.turn.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/calls/turn_keys`, $r, e);
  }
  /**
   * Deletes a TURN key from Cloudflare Calls
   *
   * @example
   * ```ts
   * const turn = await client.calls.turn.delete(
   *   '2a95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/calls/turn_keys/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches details for a single TURN key.
   *
   * @example
   * ```ts
   * const turn = await client.calls.turn.get(
   *   '2a95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/calls/turn_keys/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class $r extends d {
}
wr.TURNListResponsesSinglePage = $r;
class Qt extends o {
  constructor() {
    super(...arguments), this.sfu = new gr(this._client), this.turn = new wr(this._client);
  }
}
Qt.SFU = gr;
Qt.SFUListResponsesSinglePage = pr;
Qt.TURN = wr;
Qt.TURNListResponsesSinglePage = $r;
class q_ extends o {
  /**
   * Replace Hostname Associations
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/certificate_authorities/hostname_associations`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Hostname Associations
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/certificate_authorities/hostname_associations`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class mr extends o {
  constructor() {
    super(...arguments), this.hostnameAssociations = new q_(this._client);
  }
}
mr.HostnameAssociations = q_;
class yr extends o {
  /**
   * Create a new API Shield mTLS Client Certificate
   *
   * @example
   * ```ts
   * const clientCertificate =
   *   await client.clientCertificates.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     csr: '-----BEGIN CERTIFICATE REQUEST-----\\nMIICY....\\n-----END CERTIFICATE REQUEST-----\\n',
   *     validity_days: 3650,
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/client_certificates`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List all of your Zone's API Shield mTLS Client Certificates by Status and/or
   * using Pagination
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const clientCertificate of client.clientCertificates.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/client_certificates`, tg, { query: n, ...e });
  }
  /**
   * Set a API Shield mTLS Client Certificate to pending_revocation status for
   * processing to revoked status.
   *
   * @example
   * ```ts
   * const clientCertificate =
   *   await client.clientCertificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/client_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * If a API Shield mTLS Client Certificate is in a pending_revocation state, you
   * may reactivate it with this endpoint.
   *
   * @example
   * ```ts
   * const clientCertificate =
   *   await client.clientCertificates.edit(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n } = e;
    return this._client.patch(`/zones/${n}/client_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Details for a single mTLS API Shield Client Certificate
   *
   * @example
   * ```ts
   * const clientCertificate =
   *   await client.clientCertificates.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/client_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class tg extends p {
}
yr.ClientCertificatesV4PagePaginationArray = tg;
let Ts = class extends o {
  /**
   * Put Rules
   */
  update(t, e) {
    const { zone_id: s, rules: n } = t ?? {};
    return this._client.getAPIList(`/zones/${s}/cloud_connector/rules`, fr, {
      body: n,
      method: "put",
      ...e
    });
  }
  /**
   * Rules
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/cloud_connector/rules`, Pr, e);
  }
}, fr = class extends d {
}, Pr = class extends d {
};
Ts.RuleUpdateResponsesSinglePage = fr;
Ts.RuleListResponsesSinglePage = Pr;
class Ae extends o {
  constructor() {
    super(...arguments), this.rules = new Ts(this._client);
  }
}
Ae.Rules = Ts;
Ae.RuleUpdateResponsesSinglePage = fr;
Ae.RuleListResponsesSinglePage = Pr;
let Vs = class extends o {
  /**
   * List Request Assets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetCreateResponse of client.cloudforceOne.requests.assets.create(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     page: 0,
   *     per_page: 10,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/cloudforce-one/requests/${t}/asset`, br, { body: i, method: "post", ...s });
  }
  /**
   * Update a Request Asset
   *
   * @example
   * ```ts
   * const asset =
   *   await client.cloudforceOne.requests.assets.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/cloudforce-one/requests/${t}/asset/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Delete a Request Asset
   *
   * @example
   * ```ts
   * const asset =
   *   await client.cloudforceOne.requests.assets.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/cloudforce-one/requests/${t}/asset/${e}`, n);
  }
  /**
   * Get a Request Asset
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const assetGetResponse of client.cloudforceOne.requests.assets.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/cloudforce-one/requests/${t}/asset/${e}`, Ur, n);
  }
};
class br extends d {
}
class Ur extends d {
}
Vs.AssetCreateResponsesSinglePage = br;
Vs.AssetGetResponsesSinglePage = Ur;
class xr extends o {
  /**
   * Create a New Request Message
   *
   * @example
   * ```ts
   * const message =
   *   await client.cloudforceOne.requests.message.create(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/cloudforce-one/requests/${t}/message/new`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a Request Message
   *
   * @example
   * ```ts
   * const message =
   *   await client.cloudforceOne.requests.message.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     0,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/cloudforce-one/requests/${t}/message/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Delete a Request Message
   *
   * @example
   * ```ts
   * const message =
   *   await client.cloudforceOne.requests.message.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     0,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/cloudforce-one/requests/${t}/message/${e}`, n);
  }
  /**
   * List Request Messages
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const message of client.cloudforceOne.requests.message.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     page: 0,
   *     per_page: 10,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/cloudforce-one/requests/${t}/message`, Sr, { body: i, method: "post", ...s });
  }
}
class Sr extends d {
}
xr.MessagesSinglePage = Sr;
class eg extends o {
  /**
   * Create a New Priority Intelligence Requirement
   *
   * @example
   * ```ts
   * const priority =
   *   await client.cloudforceOne.requests.priority.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     labels: ['DoS', 'CVE'],
   *     priority: 1,
   *     requirement: 'DoS attacks carried out by CVEs',
   *     tlp: 'clear',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/requests/priority/new`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Priority Intelligence Requirement
   *
   * @example
   * ```ts
   * const item =
   *   await client.cloudforceOne.requests.priority.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       labels: ['DoS', 'CVE'],
   *       priority: 1,
   *       requirement: 'DoS attacks carried out by CVEs',
   *       tlp: 'clear',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/cloudforce-one/requests/priority/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete a Priority Intelligence Requirement
   *
   * @example
   * ```ts
   * const priority =
   *   await client.cloudforceOne.requests.priority.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/requests/priority/${t}`, s);
  }
  /**
   * Get a Priority Intelligence Requirement
   *
   * @example
   * ```ts
   * const item =
   *   await client.cloudforceOne.requests.priority.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/requests/priority/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Priority Intelligence Requirement Quota
   *
   * @example
   * ```ts
   * const quota =
   *   await client.cloudforceOne.requests.priority.quota({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  quota(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/requests/priority/quota`, e)._thenUnwrap((n) => n.result);
  }
}
class J extends o {
  constructor() {
    super(...arguments), this.message = new xr(this._client), this.priority = new eg(this._client), this.assets = new Vs(this._client);
  }
  /**
   * Creating a request adds the request into the Cloudforce One queue for analysis.
   * In addition to the content, a short title, type, priority, and releasability
   * should be provided. If one is not provided, a default will be assigned.
   *
   * @example
   * ```ts
   * const item = await client.cloudforceOne.requests.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/requests/new`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updating a request alters the request in the Cloudforce One queue. This API may
   * be used to update any attributes of the request after the initial submission.
   * Only fields that you choose to update need to be add to the request body.
   *
   * @example
   * ```ts
   * const item = await client.cloudforceOne.requests.update(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/cloudforce-one/requests/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Requests
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const listItem of client.cloudforceOne.requests.list(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     page: 0,
   *     per_page: 10,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/cloudforce-one/requests`, zr, {
      body: n,
      method: "post",
      ...e
    });
  }
  /**
   * Delete a Request
   *
   * @example
   * ```ts
   * const request = await client.cloudforceOne.requests.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/requests/${t}`, s);
  }
  /**
   * Get Request Priority, Status, and TLP constants
   *
   * @example
   * ```ts
   * const requestConstants =
   *   await client.cloudforceOne.requests.constants({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  constants(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/requests/constants`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get a Request
   *
   * @example
   * ```ts
   * const item = await client.cloudforceOne.requests.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/requests/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Request Quota
   *
   * @example
   * ```ts
   * const quota = await client.cloudforceOne.requests.quota({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  quota(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/requests/quota`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get Request Types
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const requestTypesResponse of client.cloudforceOne.requests.types(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  types(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/cloudforce-one/requests/types`, Rr, e);
  }
}
class zr extends d {
}
class Rr extends d {
}
J.ListItemsSinglePage = zr;
J.RequestTypesResponsesSinglePage = Rr;
J.MessageResource = xr;
J.MessagesSinglePage = Sr;
J.PriorityResource = eg;
J.Assets = Vs;
J.AssetCreateResponsesSinglePage = br;
J.AssetGetResponsesSinglePage = Ur;
let Ar = class extends o {
  /**
   * Create a new Scan Config
   *
   * @example
   * ```ts
   * const config =
   *   await client.cloudforceOne.scans.config.create({
   *     account_id: 'account_id',
   *     ips: ['1.1.1.1', '2606:4700:4700::1111'],
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/scans/config`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Scan Configs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const configListResponse of client.cloudforceOne.scans.config.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/cloudforce-one/scans/config`, vr, e);
  }
  /**
   * Delete a Scan Config
   *
   * @example
   * ```ts
   * const config =
   *   await client.cloudforceOne.scans.config.delete(
   *     'config_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/scans/config/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing Scan Config
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.scans.config.edit(
   *     'config_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/cloudforce-one/scans/config/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class vr extends d {
}
Ar.ConfigListResponsesSinglePage = vr;
class sg extends o {
  /**
   * Get the Latest Scan Result
   *
   * @example
   * ```ts
   * const result = await client.cloudforceOne.scans.results.get(
   *   'config_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/scans/results/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
let ve = class extends o {
  constructor() {
    super(...arguments), this.results = new sg(this._client), this.config = new Ar(this._client);
  }
};
ve.Results = sg;
ve.Config = Ar;
ve.ConfigListResponsesSinglePage = vr;
class ng extends o {
  /**
   * Lists attackers
   *
   * @example
   * ```ts
   * const attackers =
   *   await client.cloudforceOne.threatEvents.attackers.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/attackers`, e);
  }
}
let ig = class extends o {
  /**
   * Creates a new category
   *
   * @example
   * ```ts
   * const category =
   *   await client.cloudforceOne.threatEvents.categories.create(
   *     {
   *       account_id: 'account_id',
   *       killChain: 0,
   *       name: 'name',
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/events/categories/create`, {
      body: n,
      ...e
    });
  }
  /**
   * Lists categories
   *
   * @example
   * ```ts
   * const categories =
   *   await client.cloudforceOne.threatEvents.categories.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/categories`, e);
  }
  /**
   * Deletes a category
   *
   * @example
   * ```ts
   * const category =
   *   await client.cloudforceOne.threatEvents.categories.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/events/categories/${t}`, s);
  }
  /**
   * Updates a category
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.categories.edit(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/cloudforce-one/events/categories/${t}`, {
      body: i,
      ...s
    });
  }
  /**
   * Reads a category
   *
   * @example
   * ```ts
   * const category =
   *   await client.cloudforceOne.threatEvents.categories.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/events/categories/${t}`, s);
  }
};
class rg extends o {
  /**
   * Retrieves countries information for all countries
   *
   * @example
   * ```ts
   * const countries =
   *   await client.cloudforceOne.threatEvents.countries.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/countries`, e);
  }
}
class cg extends o {
  /**
   * Reads the last cron update time
   *
   * @example
   * ```ts
   * const crons =
   *   await client.cloudforceOne.threatEvents.crons.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/cron`, e);
  }
  /**
   * Reads the last cron update time
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.crons.edit({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  edit(t, e) {
    const { account_id: s } = t;
    return this._client.patch(`/accounts/${s}/cloudforce-one/events/cron`, e);
  }
}
class og extends o {
  /**
   * Adds a tag to an event
   *
   * @example
   * ```ts
   * const eventTag =
   *   await client.cloudforceOne.threatEvents.eventTags.create(
   *     'event_id',
   *     { account_id: 'account_id', tags: ['botnet'] },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/cloudforce-one/events/event_tag/${t}/create`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Removes a tag from an event
   *
   * @example
   * ```ts
   * const eventTag =
   *   await client.cloudforceOne.threatEvents.eventTags.delete(
   *     'event_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/events/event_tag/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class ag extends o {
  /**
   * Lists all indicator types
   *
   * @example
   * ```ts
   * const indicatorTypes =
   *   await client.cloudforceOne.threatEvents.indicatorTypes.list(
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/indicatorTypes`, e);
  }
}
let ug = class extends o {
  /**
   * Adds an insight to an event
   *
   * @example
   * ```ts
   * const insight =
   *   await client.cloudforceOne.threatEvents.insights.create(
   *     'event_id',
   *     {
   *       account_id: 'account_id',
   *       content:
   *         'Here is some additional context _in markdown_',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/cloudforce-one/events/${t}/insight/create`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes an event insight
   *
   * @example
   * ```ts
   * const insight =
   *   await client.cloudforceOne.threatEvents.insights.delete(
   *     'event_id',
   *     'insight_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/cloudforce-one/events/${t}/insight/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Updates an event insight
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.insights.edit(
   *     'event_id',
   *     'insight_id',
   *     {
   *       account_id: 'account_id',
   *       content:
   *         'Updated: Here is some additional context _in markdown_',
   *     },
   *   );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/cloudforce-one/events/${t}/insight/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Reads an event insight
   *
   * @example
   * ```ts
   * const insight =
   *   await client.cloudforceOne.threatEvents.insights.get(
   *     'event_id',
   *     'insight_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/cloudforce-one/events/${t}/insight/${e}`, n)._thenUnwrap((c) => c.result);
  }
}, lg = class extends o {
  /**
   * Updates a raw event
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.raw.edit(
   *     'event_id',
   *     'raw_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/cloudforce-one/events/${t}/raw/${e}`, {
      body: c,
      ...n
    });
  }
  /**
   * Reads data for a raw event
   *
   * @example
   * ```ts
   * const raw = await client.cloudforceOne.threatEvents.raw.get(
   *   'event_id',
   *   'raw_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/cloudforce-one/events/${t}/raw/${e}`, n);
  }
};
class dg extends o {
  /**
   * Removes an event reference
   *
   * @example
   * ```ts
   * const relate =
   *   await client.cloudforceOne.threatEvents.relate.delete(
   *     'event_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/events/relate/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
let hg = class extends o {
  /**
   * Creates a new tag
   *
   * @example
   * ```ts
   * const tag =
   *   await client.cloudforceOne.threatEvents.tags.create({
   *     account_id: 'account_id',
   *     name: 'name',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/events/tags/create`, {
      body: n,
      ...e
    });
  }
};
class _g extends o {
  /**
   * Lists all target industries
   *
   * @example
   * ```ts
   * const targetIndustries =
   *   await client.cloudforceOne.threatEvents.targetIndustries.list(
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/targetIndustries`, e);
  }
}
let gg = class extends o {
  /**
   * Benchmark Durable Object warmup
   *
   * @example
   * ```ts
   * const health =
   *   await client.cloudforceOne.threatEvents.datasets.health.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/events/dataset/${t}/health`, s);
  }
}, Lr = class extends o {
  constructor() {
    super(...arguments), this.health = new gg(this._client);
  }
  /**
   * Creates a dataset
   *
   * @example
   * ```ts
   * const dataset =
   *   await client.cloudforceOne.threatEvents.datasets.create({
   *     account_id: 'account_id',
   *     isPublic: true,
   *     name: 'x',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/events/dataset/create`, {
      body: n,
      ...e
    });
  }
  /**
   * Lists all datasets in an account
   *
   * @example
   * ```ts
   * const datasets =
   *   await client.cloudforceOne.threatEvents.datasets.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events/dataset`, e);
  }
  /**
   * Updates an existing dataset
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.datasets.edit(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id', isPublic: true, name: 'x' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/cloudforce-one/events/dataset/${t}`, {
      body: i,
      ...s
    });
  }
  /**
   * Reads a dataset
   *
   * @example
   * ```ts
   * const dataset =
   *   await client.cloudforceOne.threatEvents.datasets.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/events/dataset/${t}`, s);
  }
  /**
   * Reads data for a raw event
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.datasets.raw(
   *     'dataset_id',
   *     'event_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  raw(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/cloudforce-one/events/raw/${t}/${e}`, n);
  }
};
Lr.Health = gg;
class O extends o {
  constructor() {
    super(...arguments), this.attackers = new ng(this._client), this.categories = new ig(this._client), this.countries = new rg(this._client), this.crons = new cg(this._client), this.datasets = new Lr(this._client), this.indicatorTypes = new ag(this._client), this.raw = new lg(this._client), this.relate = new dg(this._client), this.tags = new hg(this._client), this.eventTags = new og(this._client), this.targetIndustries = new _g(this._client), this.insights = new ug(this._client);
  }
  /**
   * Events must be created in a client-specific dataset, which means the `datasetId`
   * parameter must be defined. To create a dataset, see the
   * [`Create Dataset`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create/)
   * endpoint.
   *
   * @example
   * ```ts
   * const threatEvent =
   *   await client.cloudforceOne.threatEvents.create({
   *     account_id: 'account_id',
   *     category: 'Domain Resolution',
   *     date: '2022-04-01T00:00:00Z',
   *     event: 'An attacker registered the domain domain.com',
   *     indicatorType: 'domain',
   *     raw: { data: { foo: 'bar' } },
   *     tlp: 'amber',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/events/create`, { body: n, ...e });
  }
  /**
   * The `datasetId` must be defined (to list existing datasets (and their IDs), use
   * the
   * [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/)
   * endpoint). Also, must provide query parameters.
   *
   * @example
   * ```ts
   * const threatEvents =
   *   await client.cloudforceOne.threatEvents.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/cloudforce-one/events`, { query: n, ...e });
  }
  /**
   * The `datasetId` parameter must be defined. To list existing datasets (and their
   * IDs) in your account, use the
   * [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/)
   * endpoint.
   *
   * @example
   * ```ts
   * const threatEvent =
   *   await client.cloudforceOne.threatEvents.delete(
   *     'event_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cloudforce-one/events/${t}`, s);
  }
  /**
   * The `datasetId` parameter must be defined. To list existing datasets (and their
   * IDs) in your account, use the
   * [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/)
   * endpoint.
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.bulkCreate({
   *     account_id: 'account_id',
   *     data: [
   *       {
   *         category: 'Domain Resolution',
   *         date: '2022-04-01T00:00:00Z',
   *         event:
   *           'An attacker registered the domain domain.com',
   *         indicatorType: 'domain',
   *         raw: { data: { foo: 'bar' } },
   *         tlp: 'amber',
   *       },
   *     ],
   *     datasetId: 'durableObjectName',
   *   });
   * ```
   */
  bulkCreate(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cloudforce-one/events/create/bulk`, {
      body: n,
      ...e
    });
  }
  /**
   * Updates an event
   *
   * @example
   * ```ts
   * const response =
   *   await client.cloudforceOne.threatEvents.edit('event_id', {
   *     account_id: 'account_id',
   *   });
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/cloudforce-one/events/${t}`, {
      body: i,
      ...s
    });
  }
  /**
   * Reads an event
   *
   * @example
   * ```ts
   * const threatEvent =
   *   await client.cloudforceOne.threatEvents.get('event_id', {
   *     account_id: 'account_id',
   *   });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cloudforce-one/events/${t}`, s);
  }
}
O.Attackers = ng;
O.Categories = ig;
O.Countries = rg;
O.Crons = cg;
O.Datasets = Lr;
O.IndicatorTypes = ag;
O.Raw = lg;
O.Relate = dg;
O.Tags = hg;
O.EventTags = og;
O.TargetIndustries = _g;
O.Insights = ug;
class vt extends o {
  constructor() {
    super(...arguments), this.scans = new ve(this._client), this.requests = new J(this._client), this.threatEvents = new O(this._client);
  }
}
vt.Scans = ve;
vt.Requests = J;
vt.ListItemsSinglePage = zr;
vt.RequestTypesResponsesSinglePage = Rr;
vt.ThreatEvents = O;
class Le extends o {
  /**
   * Add custom scan expressions for Content Scanning.
   */
  create(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.getAPIList(`/zones/${s}/content-upload-scan/payloads`, Ir, { body: n, method: "post", ...e });
  }
  /**
   * Get a list of existing custom scan expressions for Content Scanning.
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/content-upload-scan/payloads`, kr, e);
  }
  /**
   * Delete a Content Scan Custom Expression.
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.getAPIList(`/zones/${n}/content-upload-scan/payloads/${t}`, Or, { method: "delete", ...s });
  }
}
class Ir extends d {
}
class kr extends d {
}
class Or extends d {
}
Le.PayloadCreateResponsesSinglePage = Ir;
Le.PayloadListResponsesSinglePage = kr;
Le.PayloadDeleteResponsesSinglePage = Or;
let pg = class extends o {
  /**
   * Retrieve the current status of Content Scanning.
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/content-upload-scan/settings`, e)._thenUnwrap((n) => n.result);
  }
};
class Lt extends o {
  constructor() {
    super(...arguments), this.payloads = new Le(this._client), this.settings = new pg(this._client);
  }
  /**
   * Disable Content Scanning.
   */
  disable(t, e) {
    const { zone_id: s } = t;
    return this._client.post(`/zones/${s}/content-upload-scan/disable`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Enable Content Scanning.
   */
  enable(t, e) {
    const { zone_id: s } = t;
    return this._client.post(`/zones/${s}/content-upload-scan/enable`, e)._thenUnwrap((n) => n.result);
  }
}
Lt.Payloads = Le;
Lt.PayloadCreateResponsesSinglePage = Ir;
Lt.PayloadListResponsesSinglePage = kr;
Lt.PayloadDeleteResponsesSinglePage = Or;
Lt.Settings = pg;
class wg extends o {
  /**
   * If a zone has multiple SSL certificates, you can set the order in which they
   * should be used during a request. The higher priority will break ties across
   * overlapping 'legacy_custom' certificates.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customCertificate of client.customCertificates.prioritize.update(
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     certificates: [{}, {}],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/custom_certificates/prioritize`, Pf, { body: n, method: "put", ...e });
  }
}
class Ds extends o {
  constructor() {
    super(...arguments), this.prioritize = new wg(this._client);
  }
  /**
   * Upload a new SSL certificate for a zone.
   *
   * @example
   * ```ts
   * const customCertificate =
   *   await client.customCertificates.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     certificate:
   *       '-----BEGIN CERTIFICATE-----\nMIIDtTCCAp2gAwIBAgIJAMHAwfXZ5/PWMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\nBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\naWRnaXRzIFB0eSBMdGQwHhcNMTYwODI0MTY0MzAxWhcNMTYxMTIyMTY0MzAxWjBF\nMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\nCgKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmGdtcGbg/1\nCGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKnabIRuGvB\nKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpidtnKX/a+5\n0GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+pyFxIXjbEI\ndZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pEewooaeO2\nizNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABo4GnMIGkMB0GA1UdDgQWBBT/LbE4\n9rWf288N6sJA5BRb6FJIGDB1BgNVHSMEbjBsgBT/LbE49rWf288N6sJA5BRb6FJI\nGKFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMHAwfXZ5/PWMAwGA1UdEwQF\nMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHHFwl0tH0quUYZYO0dZYt4R7SJ0pCm2\n2satiyzHl4OnXcHDpekAo7/a09c6Lz6AU83cKy/+x3/djYHXWba7HpEu0dR3ugQP\nMlr4zrhd9xKZ0KZKiYmtJH+ak4OM4L3FbT0owUZPyjLSlhMtJVcoRp5CJsjAMBUG\nSvD8RX+T01wzox/Qb+lnnNnOlaWpqu8eoOenybxKp1a9ULzIVvN/LAcc+14vioFq\n2swRWtmocBAs8QR9n4uvbpiYvS8eYueDCWMM4fvFfBhaDZ3N9IbtySh3SpFdQDhw\nYbjM2rxXiyLGxB4Bol7QTv4zHif7Zt89FReT/NBy4rzaskDJY5L6xmY=\n-----END CERTIFICATE-----\n',
   *     private_key:
   *       '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/custom_certificates`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List, search, and filter all of your custom SSL certificates. The higher
   * priority will break ties across overlapping 'legacy_custom' certificates, but
   * 'legacy_custom' certificates will always supercede 'sni_custom' certificates.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customCertificate of client.customCertificates.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/custom_certificates`, $g, { query: n, ...e });
  }
  /**
   * Remove a SSL certificate from a zone.
   *
   * @example
   * ```ts
   * const customCertificate =
   *   await client.customCertificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/custom_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Upload a new private key and/or PEM/CRT for the SSL certificate. Note: PATCHing
   * a configuration for sni_custom certificates will result in a new resource id
   * being returned, and the previous one being deleted.
   *
   * @example
   * ```ts
   * const customCertificate =
   *   await client.customCertificates.edit(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/custom_certificates/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * SSL Configuration Details
   *
   * @example
   * ```ts
   * const customCertificate =
   *   await client.customCertificates.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/custom_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class $g extends p {
}
class Pf extends d {
}
Ds.CustomCertificatesV4PagePaginationArray = $g;
Ds.Prioritize = wg;
class mg extends o {
  /**
   * Update Fallback Origin for Custom Hostnames
   *
   * @example
   * ```ts
   * const fallbackOrigin =
   *   await client.customHostnames.fallbackOrigin.update({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     origin: 'fallback.example.com',
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/custom_hostnames/fallback_origin`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete Fallback Origin for Custom Hostnames
   *
   * @example
   * ```ts
   * const fallbackOrigin =
   *   await client.customHostnames.fallbackOrigin.delete({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/custom_hostnames/fallback_origin`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get Fallback Origin for Custom Hostnames
   *
   * @example
   * ```ts
   * const fallbackOrigin =
   *   await client.customHostnames.fallbackOrigin.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/custom_hostnames/fallback_origin`, e)._thenUnwrap((n) => n.result);
  }
}
let yg = class extends o {
  /**
   * Replace a single custom certificate within a certificate pack that contains two
   * bundled certificates. The replacement must adhere to the following constraints.
   * You can only replace an RSA certificate with another RSA certificate or an ECDSA
   * certificate with another ECDSA certificate.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.customHostnames.certificatePack.certificates.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       custom_certificate:
   *         '-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n',
   *       custom_key:
   *         '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/SCB5...\n-----END PRIVATE KEY-----\n',
   *     },
   *   );
   * ```
   */
  update(t, e, s, n, i) {
    const { zone_id: c, ...a } = n;
    return this._client.put(`/zones/${c}/custom_hostnames/${t}/certificate_pack/${e}/certificates/${s}`, { body: a, ...i })._thenUnwrap((l) => l.result);
  }
  /**
   * Delete a single custom certificate from a certificate pack that contains two
   * bundled certificates. Deletion is subject to the following constraints. You
   * cannot delete a certificate if it is the only remaining certificate in the pack.
   * At least one certificate must remain in the pack.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.customHostnames.certificatePack.certificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n, i) {
    const { zone_id: c } = n;
    return this._client.delete(`/zones/${c}/custom_hostnames/${t}/certificate_pack/${e}/certificates/${s}`, i);
  }
};
class Cr extends o {
  constructor() {
    super(...arguments), this.certificates = new yg(this._client);
  }
}
Cr.Certificates = yg;
class Ie extends o {
  constructor() {
    super(...arguments), this.fallbackOrigin = new mg(this._client), this.certificatePack = new Cr(this._client);
  }
  /**
   * Add a new custom hostname and request that an SSL certificate be issued for it.
   * One of three validation methods—http, txt, email—should be used, with 'http'
   * recommended if the CNAME is already in place (or will be soon). Specifying
   * 'email' will send an email to the WHOIS contacts on file for the base domain
   * plus hostmaster, postmaster, webmaster, admin, administrator. If http is used
   * and the domain is not already pointing to the Managed CNAME host, the PATCH
   * method must be used once it is (to complete validation). Enable bundling of
   * certificates using the custom_cert_bundle field. The bundling process requires
   * the following condition One certificate in the bundle must use an RSA, and the
   * other must use an ECDSA.
   *
   * @example
   * ```ts
   * const customHostname = await client.customHostnames.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   hostname: 'app.example.com',
   *   ssl: {},
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/custom_hostnames`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List, search, sort, and filter all of your custom hostnames.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customHostnameListResponse of client.customHostnames.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/custom_hostnames`, fg, { query: n, ...e });
  }
  /**
   * Delete Custom Hostname (and any issued SSL certificates)
   *
   * @example
   * ```ts
   * const customHostname = await client.customHostnames.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/custom_hostnames/${t}`, s);
  }
  /**
   * Modify SSL configuration for a custom hostname. When sent with SSL config that
   * matches existing config, used to indicate that hostname should pass domain
   * control validation (DCV). Can also be used to change validation type, e.g., from
   * 'http' to 'email'. Bundle an existing certificate with another certificate by
   * using the "custom_cert_bundle" field. The bundling process supports combining
   * certificates as long as the following condition is met. One certificate must use
   * the RSA algorithm, and the other must use the ECDSA algorithm.
   *
   * @example
   * ```ts
   * const response = await client.customHostnames.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/custom_hostnames/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Custom Hostname Details
   *
   * @example
   * ```ts
   * const customHostname = await client.customHostnames.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/custom_hostnames/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class fg extends p {
}
Ie.CustomHostnameListResponsesV4PagePaginationArray = fg;
Ie.FallbackOrigin = mg;
Ie.CertificatePack = Cr;
let Es = class extends o {
  /**
   * Add Account Custom Nameserver
   *
   * @example
   * ```ts
   * const customNameserver =
   *   await client.customNameservers.create({
   *     account_id: '372e67954025e0ba6aaa6d586b9e0b59',
   *     ns_name: 'ns1.example.com',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/custom_ns`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete Account Custom Nameserver
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customNameserverDeleteResponse of client.customNameservers.delete(
   *   'ns1.example.com',
   *   { account_id: '372e67954025e0ba6aaa6d586b9e0b59' },
   * )) {
   *   // ...
   * }
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/custom_ns/${t}`, Pg, { method: "delete", ...s });
  }
  /**
   * List an account's custom nameservers.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customNameserver of client.customNameservers.get(
   *   { account_id: '372e67954025e0ba6aaa6d586b9e0b59' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/custom_ns`, bg, e);
  }
};
class Pg extends d {
}
class bg extends d {
}
Es.CustomNameserverDeleteResponsesSinglePage = Pg;
Es.CustomNameserversSinglePage = bg;
let Zr = class extends o {
  /**
   * Updates the configuration of an existing custom page.
   *
   * @example
   * ```ts
   * const customPage = await client.customPages.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     state: 'default',
   *     url: 'http://www.example.com',
   *     account_id: 'account_id',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/custom_pages/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/custom_pages`, Ug, e);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/custom_pages/${t}`, s)._thenUnwrap((l) => l.result);
  }
};
class Ug extends d {
}
Zr.CustomPageListResponsesSinglePage = Ug;
class ke extends o {
  /**
   * Returns the created D1 database.
   *
   * @example
   * ```ts
   * const d1 = await client.d1.database.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'my-database',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/d1/database`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates the specified D1 database.
   *
   * @example
   * ```ts
   * const d1 = await client.d1.database.update(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     read_replication: { mode: 'auto' },
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/d1/database/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns a list of D1 databases.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const databaseListResponse of client.d1.database.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/d1/database`, Tr, { query: n, ...e });
  }
  /**
   * Deletes the specified D1 database.
   *
   * @example
   * ```ts
   * const database = await client.d1.database.delete(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/d1/database/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates partially the specified D1 database.
   *
   * @example
   * ```ts
   * const d1 = await client.d1.database.edit(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/d1/database/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns a URL where the SQL contents of your D1 can be downloaded. Note: this
   * process may take some time for larger DBs, during which your D1 will be
   * unavailable to serve queries. To avoid blocking your DB unnecessarily, an
   * in-progress export must be continually polled or will automatically cancel.
   *
   * @example
   * ```ts
   * const response = await client.d1.database.export(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     output_format: 'polling',
   *   },
   * );
   * ```
   */
  export(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/d1/database/${t}/export`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified D1 database.
   *
   * @example
   * ```ts
   * const d1 = await client.d1.database.get(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/d1/database/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Generates a temporary URL for uploading an SQL file to, then instructing the D1
   * to import it and polling it for status updates. Imports block the D1 for their
   * duration.
   *
   * @example
   * ```ts
   * const response = await client.d1.database.import(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     action: 'init',
   *     etag: 'etag',
   *   },
   * );
   * ```
   */
  import(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/d1/database/${t}/import`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the query result as an object.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const queryResult of client.d1.database.query(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     sql: 'SELECT * FROM myTable WHERE field = ? OR field = ?;',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  query(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/d1/database/${t}/query`, Vr, { body: i, method: "post", ...s });
  }
  /**
   * Returns the query result rows as arrays rather than objects. This is a
   * performance-optimized version of the /query endpoint.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const databaseRawResponse of client.d1.database.raw(
   *   'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     sql: 'SELECT * FROM myTable WHERE field = ? OR field = ?;',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  raw(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/d1/database/${t}/raw`, Dr, { body: i, method: "post", ...s });
  }
}
class Tr extends p {
}
class Vr extends d {
}
class Dr extends d {
}
ke.DatabaseListResponsesV4PagePaginationArray = Tr;
ke.QueryResultsSinglePage = Vr;
ke.DatabaseRawResponsesSinglePage = Dr;
class Jt extends o {
  constructor() {
    super(...arguments), this.database = new ke(this._client);
  }
}
Jt.Database = ke;
Jt.DatabaseListResponsesV4PagePaginationArray = Tr;
Jt.QueryResultsSinglePage = Vr;
Jt.DatabaseRawResponsesSinglePage = Dr;
class xg extends o {
  /**
   * Retrieve the account and zone specific unique identifier used as part of the
   * CNAME target for DCV Delegation.
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/dcv_delegation/uuid`, e)._thenUnwrap((n) => n.result);
  }
}
class Sg extends o {
  /**
   * Delete DNSSEC.
   *
   * @example
   * ```ts
   * const dnssec = await client.dns.dnssec.delete({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/dnssec`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Enable or disable DNSSEC.
   *
   * @example
   * ```ts
   * const dnssec = await client.dns.dnssec.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/dnssec`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Details about DNSSEC status and configuration.
   *
   * @example
   * ```ts
   * const dnssec = await client.dns.dnssec.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/dnssec`, e)._thenUnwrap((n) => n.result);
  }
}
class Er extends o {
  /**
   * Create a new DNS record for a zone.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   *
   * @example
   * ```ts
   * const recordResponse = await client.dns.records.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'example.com',
   *   ttl: 3600,
   *   type: 'A',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/dns_records`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Overwrite an existing DNS record.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   *
   * @example
   * ```ts
   * const recordResponse = await client.dns.records.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'example.com',
   *     ttl: 3600,
   *     type: 'A',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/dns_records/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List, search, sort, and filter a zones' DNS records.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const recordResponse of client.dns.records.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/dns_records`, Mr, {
      query: n,
      ...e
    });
  }
  /**
   * Delete DNS Record
   *
   * @example
   * ```ts
   * const record = await client.dns.records.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/dns_records/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Send a Batch of DNS Record API calls to be executed together.
   *
   * Notes:
   *
   * - Although Cloudflare will execute the batched operations in a single database
   *   transaction, Cloudflare's distributed KV store must treat each record change
   *   as a single key-value pair. This means that the propagation of changes is not
   *   atomic. See
   *   [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/ "Batch DNS records")
   *   for more information.
   * - The operations you specify within the /batch request body are always executed
   *   in the following order:
   *
   *   - Deletes
   *   - Patches
   *   - Puts
   *   - Posts
   *
   * @example
   * ```ts
   * const response = await client.dns.records.batch({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  batch(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/dns_records/batch`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing DNS record.
   *
   * Notes:
   *
   * - A/AAAA records cannot exist on the same name as CNAME records.
   * - NS records cannot exist on the same name as any other record type.
   * - Domain names are always represented in Punycode, even if Unicode characters
   *   were used when creating the record.
   *
   * @example
   * ```ts
   * const recordResponse = await client.dns.records.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'example.com',
   *     ttl: 3600,
   *     type: 'A',
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/dns_records/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * You can export your
   * [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this
   * endpoint.
   *
   * See
   * [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records")
   * for more information.
   *
   * @example
   * ```ts
   * const response = await client.dns.records.export({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  export(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/dns_records/export`, {
      ...e,
      headers: { Accept: "text/plain", ...e?.headers }
    });
  }
  /**
   * DNS Record Details
   *
   * @example
   * ```ts
   * const recordResponse = await client.dns.records.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/dns_records/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * You can upload your
   * [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this
   * endpoint. It assumes that cURL is called from a location with bind_config.txt
   * (valid BIND config) present.
   *
   * See
   * [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records")
   * for more information.
   *
   * @example
   * ```ts
   * const response = await client.dns.records.import({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   file: 'www.example.com. 300 IN  A 127.0.0.1',
   * });
   * ```
   */
  import(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/dns_records/import`, S({ body: n, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Scan for common DNS records on your domain and automatically add them to your
   * zone. Useful if you haven't updated your nameservers yet.
   *
   * @example
   * ```ts
   * const response = await client.dns.records.scan({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   body: {},
   * });
   * ```
   */
  scan(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/dns_records/scan`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
}
class Mr extends p {
}
Er.RecordResponsesV4PagePaginationArray = Mr;
let zg = class extends o {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   *
   * @example
   * ```ts
   * const byTime =
   *   await client.dns.analytics.reports.bytimes.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/dns_analytics/report/bytime`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}, Nr = class extends o {
  constructor() {
    super(...arguments), this.bytimes = new zg(this._client);
  }
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   *
   * @example
   * ```ts
   * const report = await client.dns.analytics.reports.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/dns_analytics/report`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
};
Nr.Bytimes = zg;
let Yr = class extends o {
  constructor() {
    super(...arguments), this.reports = new Nr(this._client);
  }
};
Yr.Reports = Nr;
class Rg extends o {
  /**
   * Update DNS settings for a zone
   *
   * @example
   * ```ts
   * const response = await client.dns.settings.zone.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/dns_settings`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Show DNS settings for a zone
   *
   * @example
   * ```ts
   * const zone = await client.dns.settings.zone.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/dns_settings`, e)._thenUnwrap((n) => n.result);
  }
}
class jr extends o {
  /**
   * Create Internal DNS View for an account
   *
   * @example
   * ```ts
   * const view = await client.dns.settings.account.views.create(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'my view',
   *     zones: ['372e67954025e0ba6aaa6d586b9e0b59'],
   *   },
   * );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dns_settings/views`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List DNS Internal Views for an Account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const viewListResponse of client.dns.settings.account.views.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dns_settings/views`, Fr, { query: n, ...e });
  }
  /**
   * Delete an existing Internal DNS View
   *
   * @example
   * ```ts
   * const view = await client.dns.settings.account.views.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dns_settings/views/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing Internal DNS View
   *
   * @example
   * ```ts
   * const response =
   *   await client.dns.settings.account.views.edit(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/dns_settings/views/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get DNS Internal View
   *
   * @example
   * ```ts
   * const view = await client.dns.settings.account.views.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dns_settings/views/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Fr extends p {
}
jr.ViewListResponsesV4PagePaginationArray = Fr;
class Ms extends o {
  constructor() {
    super(...arguments), this.views = new jr(this._client);
  }
  /**
   * Update DNS settings for an account
   *
   * @example
   * ```ts
   * const response = await client.dns.settings.account.edit({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/dns_settings`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Show DNS settings for an account
   *
   * @example
   * ```ts
   * const account = await client.dns.settings.account.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/dns_settings`, e)._thenUnwrap((n) => n.result);
  }
}
Ms.Views = jr;
Ms.ViewListResponsesV4PagePaginationArray = Fr;
let Ns = class extends o {
  constructor() {
    super(...arguments), this.zone = new Rg(this._client), this.account = new Ms(this._client);
  }
};
Ns.Zone = Rg;
Ns.Account = Ms;
let Gr = class extends o {
  /**
   * Create ACL.
   *
   * @example
   * ```ts
   * const acl = await client.dns.zoneTransfers.acls.create({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   *   ip_range: '192.0.2.53/28',
   *   name: 'my-acl-1',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/secondary_dns/acls`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify ACL.
   *
   * @example
   * ```ts
   * const acl = await client.dns.zoneTransfers.acls.update(
   *   '23ff594956f20c2a721606e94745a8aa',
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     ip_range: '192.0.2.53/28',
   *     name: 'my-acl-1',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/secondary_dns/acls/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List ACLs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const acl of client.dns.zoneTransfers.acls.list({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/secondary_dns/acls`, Br, e);
  }
  /**
   * Delete ACL.
   *
   * @example
   * ```ts
   * const acl = await client.dns.zoneTransfers.acls.delete(
   *   '23ff594956f20c2a721606e94745a8aa',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/secondary_dns/acls/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get ACL.
   *
   * @example
   * ```ts
   * const acl = await client.dns.zoneTransfers.acls.get(
   *   '23ff594956f20c2a721606e94745a8aa',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/secondary_dns/acls/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, Br = class extends d {
};
Gr.ACLsSinglePage = Br;
class Ag extends o {
  /**
   * Sends AXFR zone transfer request to primary nameserver(s).
   *
   * @example
   * ```ts
   * const forceAXFR =
   *   await client.dns.zoneTransfers.forceAXFR.create({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     body: {},
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/secondary_dns/force_axfr`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class vg extends o {
  /**
   * Create secondary zone configuration for incoming zone transfers.
   *
   * @example
   * ```ts
   * const incoming =
   *   await client.dns.zoneTransfers.incoming.create({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     auto_refresh_seconds: 86400,
   *     name: 'www.example.com.',
   *     peers: [
   *       '23ff594956f20c2a721606e94745a8aa',
   *       '00920f38ce07c2e2f4df50b1f61d4194',
   *     ],
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/secondary_dns/incoming`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update secondary zone configuration for incoming zone transfers.
   *
   * @example
   * ```ts
   * const incoming =
   *   await client.dns.zoneTransfers.incoming.update({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     auto_refresh_seconds: 86400,
   *     name: 'www.example.com.',
   *     peers: [
   *       '23ff594956f20c2a721606e94745a8aa',
   *       '00920f38ce07c2e2f4df50b1f61d4194',
   *     ],
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/secondary_dns/incoming`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete secondary zone configuration for incoming zone transfers.
   *
   * @example
   * ```ts
   * const incoming =
   *   await client.dns.zoneTransfers.incoming.delete({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *   });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/secondary_dns/incoming`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get secondary zone configuration for incoming zone transfers.
   *
   * @example
   * ```ts
   * const incoming =
   *   await client.dns.zoneTransfers.incoming.get({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/secondary_dns/incoming`, e)._thenUnwrap((n) => n.result);
  }
}
class Hr extends o {
  /**
   * Create Peer.
   *
   * @example
   * ```ts
   * const peer = await client.dns.zoneTransfers.peers.create({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   *   name: 'my-peer-1',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/secondary_dns/peers`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify Peer.
   *
   * @example
   * ```ts
   * const peer = await client.dns.zoneTransfers.peers.update(
   *   '23ff594956f20c2a721606e94745a8aa',
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     name: 'my-peer-1',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/secondary_dns/peers/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Peers.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const peer of client.dns.zoneTransfers.peers.list(
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/secondary_dns/peers`, Wr, e);
  }
  /**
   * Delete Peer.
   *
   * @example
   * ```ts
   * const peer = await client.dns.zoneTransfers.peers.delete(
   *   '23ff594956f20c2a721606e94745a8aa',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/secondary_dns/peers/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Peer.
   *
   * @example
   * ```ts
   * const peer = await client.dns.zoneTransfers.peers.get(
   *   '23ff594956f20c2a721606e94745a8aa',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/secondary_dns/peers/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Wr extends d {
}
Hr.PeersSinglePage = Wr;
class Kr extends o {
  /**
   * Create TSIG.
   *
   * @example
   * ```ts
   * const tsig = await client.dns.zoneTransfers.tsigs.create({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   *   algo: 'hmac-sha512.',
   *   name: 'tsig.customer.cf.',
   *   secret:
   *     'caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/secondary_dns/tsigs`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify TSIG.
   *
   * @example
   * ```ts
   * const tsig = await client.dns.zoneTransfers.tsigs.update(
   *   '69cd1e104af3e6ed3cb344f263fd0d5a',
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     algo: 'hmac-sha512.',
   *     name: 'tsig.customer.cf.',
   *     secret:
   *       'caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/secondary_dns/tsigs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List TSIGs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tsig of client.dns.zoneTransfers.tsigs.list(
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/secondary_dns/tsigs`, Xr, e);
  }
  /**
   * Delete TSIG.
   *
   * @example
   * ```ts
   * const tsig = await client.dns.zoneTransfers.tsigs.delete(
   *   '69cd1e104af3e6ed3cb344f263fd0d5a',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/secondary_dns/tsigs/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get TSIG.
   *
   * @example
   * ```ts
   * const tsig = await client.dns.zoneTransfers.tsigs.get(
   *   '69cd1e104af3e6ed3cb344f263fd0d5a',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/secondary_dns/tsigs/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Xr extends d {
}
Kr.TSIGsSinglePage = Xr;
let Lg = class extends o {
  /**
   * Get primary zone transfer status.
   *
   * @example
   * ```ts
   * const enableTransfer =
   *   await client.dns.zoneTransfers.outgoing.status.get({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/secondary_dns/outgoing/status`, e)._thenUnwrap((n) => n.result);
  }
};
class Qr extends o {
  constructor() {
    super(...arguments), this.status = new Lg(this._client);
  }
  /**
   * Create primary zone configuration for outgoing zone transfers.
   *
   * @example
   * ```ts
   * const outgoing =
   *   await client.dns.zoneTransfers.outgoing.create({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     name: 'www.example.com.',
   *     peers: [
   *       '23ff594956f20c2a721606e94745a8aa',
   *       '00920f38ce07c2e2f4df50b1f61d4194',
   *     ],
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update primary zone configuration for outgoing zone transfers.
   *
   * @example
   * ```ts
   * const outgoing =
   *   await client.dns.zoneTransfers.outgoing.update({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     name: 'www.example.com.',
   *     peers: [
   *       '23ff594956f20c2a721606e94745a8aa',
   *       '00920f38ce07c2e2f4df50b1f61d4194',
   *     ],
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/secondary_dns/outgoing`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete primary zone configuration for outgoing zone transfers.
   *
   * @example
   * ```ts
   * const outgoing =
   *   await client.dns.zoneTransfers.outgoing.delete({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *   });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/secondary_dns/outgoing`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Disable outgoing zone transfers for primary zone and clears IXFR backlog of
   * primary zone.
   *
   * @example
   * ```ts
   * const disableTransfer =
   *   await client.dns.zoneTransfers.outgoing.disable({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     body: {},
   *   });
   * ```
   */
  disable(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing/disable`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Enable outgoing zone transfers for primary zone.
   *
   * @example
   * ```ts
   * const enableTransfer =
   *   await client.dns.zoneTransfers.outgoing.enable({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     body: {},
   *   });
   * ```
   */
  enable(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing/enable`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Notifies the secondary nameserver(s) and clears IXFR backlog of primary zone.
   *
   * @example
   * ```ts
   * const response =
   *   await client.dns.zoneTransfers.outgoing.forceNotify({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *     body: {},
   *   });
   * ```
   */
  forceNotify(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/secondary_dns/outgoing/force_notify`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get primary zone configuration for outgoing zone transfers.
   *
   * @example
   * ```ts
   * const outgoing =
   *   await client.dns.zoneTransfers.outgoing.get({
   *     zone_id: '269d8f4853475ca241c4e730be286b20',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/secondary_dns/outgoing`, e)._thenUnwrap((n) => n.result);
  }
}
Qr.Status = Lg;
class H extends o {
  constructor() {
    super(...arguments), this.forceAXFR = new Ag(this._client), this.incoming = new vg(this._client), this.outgoing = new Qr(this._client), this.acls = new Gr(this._client), this.peers = new Hr(this._client), this.tsigs = new Kr(this._client);
  }
}
H.ForceAXFRResource = Ag;
H.IncomingResource = vg;
H.OutgoingResource = Qr;
H.ACLs = Gr;
H.ACLsSinglePage = Br;
H.Peers = Hr;
H.PeersSinglePage = Wr;
H.TSIGs = Kr;
H.TSIGsSinglePage = Xr;
let $t = class extends o {
  constructor() {
    super(...arguments), this.dnssec = new Sg(this._client), this.records = new Er(this._client), this.settings = new Ns(this._client), this.analytics = new Yr(this._client), this.zoneTransfers = new H(this._client);
  }
};
$t.DNSSECResource = Sg;
$t.Records = Er;
$t.RecordResponsesV4PagePaginationArray = Mr;
$t.Settings = Ns;
$t.Analytics = Yr;
$t.ZoneTransfers = H;
class Ig extends o {
  /**
   * Update reverse DNS configuration (PTR records) for a DNS Firewall cluster
   *
   * @example
   * ```ts
   * const response = await client.dnsFirewall.reverseDNS.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/dns_firewall/${t}/reverse_dns`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show reverse DNS configuration (PTR records) for a DNS Firewall cluster
   *
   * @example
   * ```ts
   * const reverseDNS = await client.dnsFirewall.reverseDNS.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dns_firewall/${t}/reverse_dns`, s)._thenUnwrap((i) => i.result);
  }
}
let kg = class extends o {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   *
   * @example
   * ```ts
   * const byTime =
   *   await client.dnsFirewall.analytics.reports.bytimes.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dns_firewall/${t}/dns_analytics/report/bytime`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class Jr extends o {
  constructor() {
    super(...arguments), this.bytimes = new kg(this._client);
  }
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   *
   * See
   * [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/)
   * for detailed information about the available query parameters.
   *
   * @example
   * ```ts
   * const report =
   *   await client.dnsFirewall.analytics.reports.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dns_firewall/${t}/dns_analytics/report`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
Jr.Bytimes = kg;
let qr = class extends o {
  constructor() {
    super(...arguments), this.reports = new Jr(this._client);
  }
};
qr.Reports = Jr;
class Oe extends o {
  constructor() {
    super(...arguments), this.analytics = new qr(this._client), this.reverseDNS = new Ig(this._client);
  }
  /**
   * Create a DNS Firewall cluster
   *
   * @example
   * ```ts
   * const dnsFirewall = await client.dnsFirewall.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'My Awesome DNS Firewall cluster',
   *   upstream_ips: [
   *     '192.0.2.1',
   *     '198.51.100.1',
   *     '2001:DB8:100::CF',
   *   ],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dns_firewall`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List DNS Firewall clusters for an account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dnsFirewallListResponse of client.dnsFirewall.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dns_firewall`, Og, { query: n, ...e });
  }
  /**
   * Delete a DNS Firewall cluster
   *
   * @example
   * ```ts
   * const dnsFirewall = await client.dnsFirewall.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dns_firewall/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Modify the configuration of a DNS Firewall cluster
   *
   * @example
   * ```ts
   * const response = await client.dnsFirewall.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/dns_firewall/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Show a single DNS Firewall cluster for an account
   *
   * @example
   * ```ts
   * const dnsFirewall = await client.dnsFirewall.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dns_firewall/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Og extends p {
}
Oe.DNSFirewallListResponsesV4PagePaginationArray = Og;
Oe.Analytics = qr;
Oe.ReverseDNS = Ig;
class tc extends o {
  /**
   * Run traceroutes from Cloudflare colos.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const traceroute of client.diagnostics.traceroutes.create(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     targets: ['203.0.113.1', 'cloudflare.com'],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/diagnostics/traceroute`, ec, {
      body: n,
      method: "post",
      ...e
    });
  }
}
class ec extends d {
}
tc.TraceroutesSinglePage = ec;
class Ys extends o {
  constructor() {
    super(...arguments), this.traceroutes = new tc(this._client);
  }
}
Ys.Traceroutes = tc;
Ys.TraceroutesSinglePage = ec;
class sc extends o {
  /**
   * Returns the Durable Objects in a given namespace.
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/workers/durable_objects/namespaces/${t}/objects`, nc, { query: i, ...s });
  }
}
class nc extends $i {
}
sc.DurableObjectsCursorLimitPagination = nc;
let Ce = class extends o {
  constructor() {
    super(...arguments), this.objects = new sc(this._client);
  }
  /**
   * Returns the Durable Object namespaces owned by an account.
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/workers/durable_objects/namespaces`, ic, e);
  }
};
class ic extends d {
}
Ce.NamespacesSinglePage = ic;
Ce.Objects = sc;
Ce.DurableObjectsCursorLimitPagination = nc;
class js extends o {
  constructor() {
    super(...arguments), this.namespaces = new Ce(this._client);
  }
}
js.Namespaces = Ce;
js.NamespacesSinglePage = ic;
class rc extends o {
  /**
   * Create a destination address to forward your emails to. Destination addresses
   * need to be verified before they can be used.
   *
   * @example
   * ```ts
   * const address = await client.emailRouting.addresses.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   email: 'user@example.com',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/email/routing/addresses`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists existing destination addresses.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const address of client.emailRouting.addresses.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email/routing/addresses`, cc, { query: n, ...e });
  }
  /**
   * Deletes a specific destination address.
   *
   * @example
   * ```ts
   * const address = await client.emailRouting.addresses.delete(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/email/routing/addresses/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets information for a specific destination email already created.
   *
   * @example
   * ```ts
   * const address = await client.emailRouting.addresses.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email/routing/addresses/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class cc extends p {
}
rc.AddressesV4PagePaginationArray = cc;
let oc = class extends o {
  /**
   * Enable you Email Routing zone. Add and lock the necessary MX and SPF records.
   *
   * @example
   * ```ts
   * const settings = await client.emailRouting.dns.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'example.net',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/email/routing/dns`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Disable your Email Routing zone. Also removes additional MX records previously
   * required for Email Routing to work.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dnsRecord of client.emailRouting.dns.delete(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/email/routing/dns`, ac, {
      method: "delete",
      ...e
    });
  }
  /**
   * Unlock MX Records previously locked by Email Routing.
   *
   * @example
   * ```ts
   * const settings = await client.emailRouting.dns.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'example.net',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/email/routing/dns`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Show the DNS records needed to configure your Email Routing zone.
   *
   * @example
   * ```ts
   * const dns = await client.emailRouting.dns.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/email/routing/dns`, { query: n, ...e });
  }
};
class ac extends d {
}
oc.DNSRecordsSinglePage = ac;
class Cg extends o {
  /**
   * Enable or disable catch-all routing rule, or change action to forward to
   * specific destination address.
   *
   * @example
   * ```ts
   * const catchAll =
   *   await client.emailRouting.rules.catchAlls.update({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     actions: [{ type: 'forward' }],
   *     matchers: [{ type: 'all' }],
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/email/routing/rules/catch_all`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get information on the default catch-all routing rule.
   *
   * @example
   * ```ts
   * const catchAll =
   *   await client.emailRouting.rules.catchAlls.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/email/routing/rules/catch_all`, e)._thenUnwrap((n) => n.result);
  }
}
let Fs = class extends o {
  constructor() {
    super(...arguments), this.catchAlls = new Cg(this._client);
  }
  /**
   * Rules consist of a set of criteria for matching emails (such as an email being
   * sent to a specific custom email address) plus a set of actions to take on the
   * email (like forwarding it to a specific destination address).
   *
   * @example
   * ```ts
   * const emailRoutingRule =
   *   await client.emailRouting.rules.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     actions: [{ type: 'forward' }],
   *     matchers: [{ type: 'literal' }],
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/email/routing/rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update actions and matches, or enable/disable specific routing rules.
   *
   * @example
   * ```ts
   * const emailRoutingRule =
   *   await client.emailRouting.rules.update(
   *     'a7e6fb77503c41d8a7f3113c6918f10c',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       actions: [{ type: 'forward' }],
   *       matchers: [{ type: 'literal' }],
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/email/routing/rules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists existing routing rules.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const emailRoutingRule of client.emailRouting.rules.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/email/routing/rules`, uc, { query: n, ...e });
  }
  /**
   * Delete a specific routing rule.
   *
   * @example
   * ```ts
   * const emailRoutingRule =
   *   await client.emailRouting.rules.delete(
   *     'a7e6fb77503c41d8a7f3113c6918f10c',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/email/routing/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information for a specific routing rule already created.
   *
   * @example
   * ```ts
   * const emailRoutingRule =
   *   await client.emailRouting.rules.get(
   *     'a7e6fb77503c41d8a7f3113c6918f10c',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/email/routing/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class uc extends p {
}
Fs.EmailRoutingRulesV4PagePaginationArray = uc;
Fs.CatchAlls = Cg;
class mt extends o {
  constructor() {
    super(...arguments), this.dns = new oc(this._client), this.rules = new Fs(this._client), this.addresses = new rc(this._client);
  }
  /**
   * Disable your Email Routing zone. Also removes additional MX records previously
   * required for Email Routing to work.
   *
   * @deprecated
   */
  disable(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/email/routing/disable`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Enable you Email Routing zone. Add and lock the necessary MX and SPF records.
   *
   * @deprecated
   */
  enable(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.post(`/zones/${s}/email/routing/enable`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about the settings for your Email Routing zone.
   *
   * @example
   * ```ts
   * const settings = await client.emailRouting.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/email/routing`, e)._thenUnwrap((n) => n.result);
  }
}
mt.DNS = oc;
mt.DNSRecordsSinglePage = ac;
mt.Rules = Fs;
mt.EmailRoutingRulesV4PagePaginationArray = uc;
mt.Addresses = rc;
mt.AddressesV4PagePaginationArray = cc;
class lc extends o {
  /**
   * This endpoint returns information for submissions to made to reclassify emails.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const submissionListResponse of client.emailSecurity.submissions.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/submissions`, dc, { query: n, ...e });
  }
}
class dc extends p {
}
lc.SubmissionListResponsesV4PagePaginationArray = dc;
let Zg = class extends o {
  /**
   * Returns detection details such as threat categories and sender information for
   * non-benign messages.
   *
   * @example
   * ```ts
   * const detection =
   *   await client.emailSecurity.investigate.detections.get(
   *     '4Njp3P0STMz2c02Q',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/investigate/${t}/detections`, s)._thenUnwrap((i) => i.result);
  }
};
class Gs extends o {
  /**
   * Move a message
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const moveCreateResponse of client.emailSecurity.investigate.move.create(
   *   '4Njp3P0STMz2c02Q',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     destination: 'Inbox',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/email-security/investigate/${t}/move`, hc, { body: i, method: "post", ...s });
  }
  /**
   * Move multiple messages
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const moveBulkResponse of client.emailSecurity.investigate.move.bulk(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     destination: 'Inbox',
   *     postfix_ids: ['4Njp3P0STMz2c02Q'],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulk(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/investigate/move`, _c, { body: n, method: "post", ...e });
  }
}
class hc extends d {
}
class _c extends d {
}
Gs.MoveCreateResponsesSinglePage = hc;
Gs.MoveBulkResponsesSinglePage = _c;
class Tg extends o {
  /**
   * Preview for non-detection messages
   *
   * @example
   * ```ts
   * const preview =
   *   await client.emailSecurity.investigate.preview.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     postfix_id: '4Njp3P0STMz2c02Q',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/email-security/investigate/preview`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a preview of the message body as a base64 encoded PNG image for
   * non-benign messages.
   *
   * @example
   * ```ts
   * const preview =
   *   await client.emailSecurity.investigate.preview.get(
   *     '4Njp3P0STMz2c02Q',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/investigate/${t}/preview`, s)._thenUnwrap((i) => i.result);
  }
}
class Vg extends o {
  /**
   * Returns the raw eml of any non-benign message.
   *
   * @example
   * ```ts
   * const raw = await client.emailSecurity.investigate.raw.get(
   *   '4Njp3P0STMz2c02Q',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/investigate/${t}/raw`, s)._thenUnwrap((i) => i.result);
  }
}
class Dg extends o {
  /**
   * Change email classfication
   *
   * @example
   * ```ts
   * const reclassify =
   *   await client.emailSecurity.investigate.reclassify.create(
   *     '4Njp3P0STMz2c02Q',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       expected_disposition: 'NONE',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/email-security/investigate/${t}/reclassify`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class gc extends o {
  /**
   * Release messages from quarantine
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const releaseBulkResponse of client.emailSecurity.investigate.release.bulk(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: ['4Njp3P0STMz2c02Q'],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulk(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/investigate/release`, pc, { body: n, method: "post", ...e });
  }
}
class pc extends d {
}
gc.ReleaseBulkResponsesSinglePage = pc;
class Eg extends o {
  /**
   * Get email trace
   *
   * @example
   * ```ts
   * const trace =
   *   await client.emailSecurity.investigate.trace.get(
   *     '4Njp3P0STMz2c02Q',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/investigate/${t}/trace`, s)._thenUnwrap((i) => i.result);
  }
}
class Z extends o {
  constructor() {
    super(...arguments), this.detections = new Zg(this._client), this.preview = new Tg(this._client), this.raw = new Vg(this._client), this.trace = new Eg(this._client), this.move = new Gs(this._client), this.reclassify = new Dg(this._client), this.release = new gc(this._client);
  }
  /**
   * Returns information for each email that matches the search parameter(s).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const investigateListResponse of client.emailSecurity.investigate.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/investigate`, wc, { query: n, ...e });
  }
  /**
   * Get message details
   *
   * @example
   * ```ts
   * const investigate =
   *   await client.emailSecurity.investigate.get(
   *     '4Njp3P0STMz2c02Q',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/investigate/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class wc extends p {
}
Z.InvestigateListResponsesV4PagePaginationArray = wc;
Z.Detections = Zg;
Z.Preview = Tg;
Z.Raw = Vg;
Z.Trace = Eg;
Z.Move = Gs;
Z.MoveCreateResponsesSinglePage = hc;
Z.MoveBulkResponsesSinglePage = _c;
Z.Reclassify = Dg;
Z.Release = gc;
Z.ReleaseBulkResponsesSinglePage = pc;
class $c extends o {
  /**
   * Create an email allow policy
   *
   * @example
   * ```ts
   * const allowPolicy =
   *   await client.emailSecurity.settings.allowPolicies.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     is_acceptable_sender: false,
   *     is_exempt_recipient: false,
   *     is_regex: false,
   *     is_trusted_sender: true,
   *     pattern: 'test@example.com',
   *     pattern_type: 'EMAIL',
   *     verify_sender: true,
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/email-security/settings/allow_policies`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists, searches, and sorts an account’s email allow policies.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const allowPolicyListResponse of client.emailSecurity.settings.allowPolicies.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/allow_policies`, mc, { query: n, ...e });
  }
  /**
   * Delete an email allow policy
   *
   * @example
   * ```ts
   * const allowPolicy =
   *   await client.emailSecurity.settings.allowPolicies.delete(
   *     2401,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/email-security/settings/allow_policies/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an email allow policy
   *
   * @example
   * ```ts
   * const response =
   *   await client.emailSecurity.settings.allowPolicies.edit(
   *     2401,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/email-security/settings/allow_policies/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get an email allow policy
   *
   * @example
   * ```ts
   * const allowPolicy =
   *   await client.emailSecurity.settings.allowPolicies.get(
   *     2401,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/settings/allow_policies/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class mc extends p {
}
$c.AllowPolicyListResponsesV4PagePaginationArray = mc;
class yc extends o {
  /**
   * Create a blocked email sender
   *
   * @example
   * ```ts
   * const blockSender =
   *   await client.emailSecurity.settings.blockSenders.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     is_regex: false,
   *     pattern: 'test@example.com',
   *     pattern_type: 'EMAIL',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/email-security/settings/block_senders`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List blocked email senders
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const blockSenderListResponse of client.emailSecurity.settings.blockSenders.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/block_senders`, fc, { query: n, ...e });
  }
  /**
   * Delete a blocked email sender
   *
   * @example
   * ```ts
   * const blockSender =
   *   await client.emailSecurity.settings.blockSenders.delete(
   *     2402,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/email-security/settings/block_senders/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a blocked email sender
   *
   * @example
   * ```ts
   * const response =
   *   await client.emailSecurity.settings.blockSenders.edit(
   *     2402,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/email-security/settings/block_senders/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a blocked email sender
   *
   * @example
   * ```ts
   * const blockSender =
   *   await client.emailSecurity.settings.blockSenders.get(
   *     2402,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/settings/block_senders/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class fc extends p {
}
yc.BlockSenderListResponsesV4PagePaginationArray = fc;
let Bs = class extends o {
  /**
   * Lists, searches, and sorts an account’s email domains.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const domainListResponse of client.emailSecurity.settings.domains.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/domains`, Pc, { query: n, ...e });
  }
  /**
   * Unprotect an email domain
   *
   * @example
   * ```ts
   * const domain =
   *   await client.emailSecurity.settings.domains.delete(2400, {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/email-security/settings/domains/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Unprotect multiple email domains
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const domainBulkDeleteResponse of client.emailSecurity.settings.domains.bulkDelete(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulkDelete(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/domains`, bc, { method: "delete", ...e });
  }
  /**
   * Update an email domain
   *
   * @example
   * ```ts
   * const response =
   *   await client.emailSecurity.settings.domains.edit(2400, {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     ip_restrictions: ['192.0.2.0/24', '2001:db8::/32'],
   *   });
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/email-security/settings/domains/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get an email domain
   *
   * @example
   * ```ts
   * const domain =
   *   await client.emailSecurity.settings.domains.get(2400, {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/settings/domains/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Pc extends p {
}
class bc extends d {
}
Bs.DomainListResponsesV4PagePaginationArray = Pc;
Bs.DomainBulkDeleteResponsesSinglePage = bc;
class Uc extends o {
  /**
   * Create an entry in impersonation registry
   *
   * @example
   * ```ts
   * const impersonationRegistry =
   *   await client.emailSecurity.settings.impersonationRegistry.create(
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       email: 'email',
   *       is_email_regex: true,
   *       name: 'name',
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/email-security/settings/impersonation_registry`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists, searches, and sorts entries in the impersonation registry.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const impersonationRegistryListResponse of client.emailSecurity.settings.impersonationRegistry.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/impersonation_registry`, xc, { query: n, ...e });
  }
  /**
   * Delete an entry from impersonation registry
   *
   * @example
   * ```ts
   * const impersonationRegistry =
   *   await client.emailSecurity.settings.impersonationRegistry.delete(
   *     2403,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/email-security/settings/impersonation_registry/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update an entry in impersonation registry
   *
   * @example
   * ```ts
   * const response =
   *   await client.emailSecurity.settings.impersonationRegistry.edit(
   *     2403,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/email-security/settings/impersonation_registry/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Get an entry in impersonation registry
   *
   * @example
   * ```ts
   * const impersonationRegistry =
   *   await client.emailSecurity.settings.impersonationRegistry.get(
   *     2403,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/settings/impersonation_registry/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class xc extends p {
}
Uc.ImpersonationRegistryListResponsesV4PagePaginationArray = xc;
class Sc extends o {
  /**
   * Create a trusted email domain
   *
   * @example
   * ```ts
   * const trustedDomain =
   *   await client.emailSecurity.settings.trustedDomains.create(
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       is_recent: true,
   *       is_regex: false,
   *       is_similarity: false,
   *       pattern: 'example.com',
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/email-security/settings/trusted_domains`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists, searches, and sorts an account’s trusted email domains.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const trustedDomainListResponse of client.emailSecurity.settings.trustedDomains.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/email-security/settings/trusted_domains`, zc, { query: n, ...e });
  }
  /**
   * Delete a trusted email domain
   *
   * @example
   * ```ts
   * const trustedDomain =
   *   await client.emailSecurity.settings.trustedDomains.delete(
   *     2401,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/email-security/settings/trusted_domains/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a trusted email domain
   *
   * @example
   * ```ts
   * const response =
   *   await client.emailSecurity.settings.trustedDomains.edit(
   *     2401,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/email-security/settings/trusted_domains/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a trusted email domain
   *
   * @example
   * ```ts
   * const trustedDomain =
   *   await client.emailSecurity.settings.trustedDomains.get(
   *     2401,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/email-security/settings/trusted_domains/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class zc extends p {
}
Sc.TrustedDomainListResponsesV4PagePaginationArray = zc;
let T = class extends o {
  constructor() {
    super(...arguments), this.allowPolicies = new $c(this._client), this.blockSenders = new yc(this._client), this.domains = new Bs(this._client), this.impersonationRegistry = new Uc(this._client), this.trustedDomains = new Sc(this._client);
  }
};
T.AllowPolicies = $c;
T.AllowPolicyListResponsesV4PagePaginationArray = mc;
T.BlockSenders = yc;
T.BlockSenderListResponsesV4PagePaginationArray = fc;
T.Domains = Bs;
T.DomainListResponsesV4PagePaginationArray = Pc;
T.DomainBulkDeleteResponsesSinglePage = bc;
T.ImpersonationRegistry = Uc;
T.ImpersonationRegistryListResponsesV4PagePaginationArray = xc;
T.TrustedDomains = Sc;
T.TrustedDomainListResponsesV4PagePaginationArray = zc;
class It extends o {
  constructor() {
    super(...arguments), this.investigate = new Z(this._client), this.settings = new T(this._client), this.submissions = new lc(this._client);
  }
}
It.Investigate = Z;
It.InvestigateListResponsesV4PagePaginationArray = wc;
It.Settings = T;
It.Submissions = lc;
It.SubmissionListResponsesV4PagePaginationArray = dc;
class Hs extends o {
  /**
   * Creates one or more filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/filters`, ms, {
      body: n,
      method: "post",
      ...e
    });
  }
  /**
   * Updates an existing filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  update(t, e, s) {
    const { zone_id: n, body: i } = e;
    return this._client.put(`/zones/${n}/filters/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches filters in a zone. You can filter the results using several optional
   * parameters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/filters`, Mg, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes an existing filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/filters/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes one or more existing filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkDelete(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/filters`, ms, {
      method: "delete",
      ...e
    });
  }
  /**
   * Updates one or more existing filters.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkUpdate(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/filters`, ms, {
      body: n,
      method: "put",
      ...e
    });
  }
  /**
   * Fetches the details of a filter.
   *
   * @deprecated The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/filters/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class ms extends d {
}
class Mg extends p {
}
Hs.FirewallFiltersSinglePage = ms;
Hs.FirewallFiltersV4PagePaginationArray = Mg;
class Rc extends o {
  /**
   * Creates a new IP Access rule for an account or zone. The rule will apply to all
   * zones in the account or zone.
   *
   * Note: To create an IP Access rule that applies to a single zone, refer to the
   * [IP Access rules for a zone](#ip-access-rules-for-a-zone) endpoints.
   *
   * @example
   * ```ts
   * const accessRule = await client.firewall.accessRules.create(
   *   {
   *     configuration: {},
   *     mode: 'challenge',
   *     account_id: 'account_id',
   *   },
   * );
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/firewall/access_rules/rules`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/firewall/access_rules/rules`, Ac, { query: i, ...e });
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/firewall/access_rules/rules/${t}`, s)._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an IP Access rule defined.
   *
   * Note: This operation will affect all zones in the account or zone.
   *
   * @example
   * ```ts
   * const response = await client.firewall.accessRules.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     configuration: {},
   *     mode: 'challenge',
   *     account_id: 'account_id',
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.patch(`/${a}/${l}/firewall/access_rules/rules/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/firewall/access_rules/rules/${t}`, s)._thenUnwrap((l) => l.result);
  }
}
class Ac extends p {
}
Rc.AccessRuleListResponsesV4PagePaginationArray = Ac;
class vc extends o {
  /**
   * Creates a new Zone Lockdown rule.
   *
   * @example
   * ```ts
   * const lockdown = await client.firewall.lockdowns.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   configurations: [{}],
   *   urls: ['shop.example.com/*'],
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/firewall/lockdowns`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Zone Lockdown rule.
   *
   * @example
   * ```ts
   * const lockdown = await client.firewall.lockdowns.update(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     configurations: [{}],
   *     urls: ['shop.example.com/*'],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/firewall/lockdowns/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Zone Lockdown rules. You can filter the results using several optional
   * parameters.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const lockdown of client.firewall.lockdowns.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/lockdowns`, Lc, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes an existing Zone Lockdown rule.
   *
   * @example
   * ```ts
   * const lockdown = await client.firewall.lockdowns.delete(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/firewall/lockdowns/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a Zone Lockdown rule.
   *
   * @example
   * ```ts
   * const lockdown = await client.firewall.lockdowns.get(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/firewall/lockdowns/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Lc extends p {
}
vc.LockdownsV4PagePaginationArray = Lc;
let Ws = class extends o {
  /**
   * Create one or more firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, zt, {
      body: n,
      method: "post",
      ...e
    });
  }
  /**
   * Updates an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/firewall/rules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches firewall rules in a zone. You can filter the results using several
   * optional parameters.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, Ic, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/firewall/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes existing firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkDelete(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, zt, {
      method: "delete",
      ...e
    });
  }
  /**
   * Updates the priority of existing firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkEdit(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, zt, {
      body: n,
      method: "patch",
      ...e
    });
  }
  /**
   * Updates one or more existing firewall rules.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  bulkUpdate(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/rules`, zt, {
      body: n,
      method: "put",
      ...e
    });
  }
  /**
   * Updates the priority of an existing firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.getAPIList(`/zones/${n}/firewall/rules/${t}`, zt, {
      body: i,
      method: "patch",
      ...s
    });
  }
  /**
   * Fetches the details of a firewall rule.
   *
   * @deprecated The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/firewall/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class zt extends d {
}
class Ic extends p {
}
Ws.FirewallRulesSinglePage = zt;
Ws.FirewallRulesV4PagePaginationArray = Ic;
class kc extends o {
  /**
   * Creates a new User Agent Blocking rule in a zone.
   *
   * @example
   * ```ts
   * const uaRule = await client.firewall.uaRules.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   configuration: {},
   *   mode: 'challenge',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/firewall/ua_rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing User Agent Blocking rule.
   *
   * @example
   * ```ts
   * const uaRule = await client.firewall.uaRules.update(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     configuration: {},
   *     mode: 'challenge',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/firewall/ua_rules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches User Agent Blocking rules in a zone. You can filter the results using
   * several optional parameters.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const uaRuleListResponse of client.firewall.uaRules.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/ua_rules`, Oc, { query: n, ...e });
  }
  /**
   * Deletes an existing User Agent Blocking rule.
   *
   * @example
   * ```ts
   * const uaRule = await client.firewall.uaRules.delete(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/firewall/ua_rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a User Agent Blocking rule.
   *
   * @example
   * ```ts
   * const uaRule = await client.firewall.uaRules.get(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/firewall/ua_rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Oc extends p {
}
kc.UARuleListResponsesV4PagePaginationArray = Oc;
class Cc extends o {
  /**
   * Creates a URI-based WAF override for a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/firewall/waf/overrides`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/firewall/waf/overrides/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the URI-based WAF overrides in a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/waf/overrides`, Zc, { query: n, ...e });
  }
  /**
   * Deletes an existing URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/firewall/waf/overrides/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a URI-based WAF override.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/firewall/waf/overrides/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Zc extends p {
}
Cc.OverridesV4PagePaginationArray = Zc;
let Tc = class extends o {
  /**
   * Fetches the WAF rule groups in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  list(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.getAPIList(`/zones/${n}/firewall/waf/packages/${t}/groups`, Vc, { query: i, ...s });
  }
  /**
   * Updates a WAF rule group. You can update the state (`mode` parameter) of a rule
   * group.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  edit(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.patch(`/zones/${i}/firewall/waf/packages/${t}/groups/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetches the details of a WAF rule group.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  get(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/firewall/waf/packages/${t}/groups/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class Vc extends p {
}
Tc.GroupsV4PagePaginationArray = Vc;
let Dc = class extends o {
  /**
   * Fetches WAF rules in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  list(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.getAPIList(`/zones/${n}/firewall/waf/packages/${t}/rules`, Ec, { query: i, ...s });
  }
  /**
   * Updates a WAF rule. You can only update the mode/action of the rule.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  edit(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.patch(`/zones/${i}/firewall/waf/packages/${t}/rules/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetches the details of a WAF rule in a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  get(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/firewall/waf/packages/${t}/rules/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class Ec extends p {
}
Dc.RuleListResponsesV4PagePaginationArray = Ec;
class kt extends o {
  constructor() {
    super(...arguments), this.groups = new Tc(this._client), this.rules = new Dc(this._client);
  }
  /**
   * Fetches WAF packages for a zone.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/firewall/waf/packages`, Mc, { query: n, ...e });
  }
  /**
   * Fetches the details of a WAF package.
   *
   * **Note:** Applies only to the
   * [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).
   *
   * @deprecated
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/firewall/waf/packages/${t}`, s);
  }
}
class Mc extends p {
}
kt.PackageListResponsesV4PagePaginationArray = Mc;
kt.Groups = Tc;
kt.GroupsV4PagePaginationArray = Vc;
kt.Rules = Dc;
kt.RuleListResponsesV4PagePaginationArray = Ec;
class qt extends o {
  constructor() {
    super(...arguments), this.overrides = new Cc(this._client), this.packages = new kt(this._client);
  }
}
qt.Overrides = Cc;
qt.OverridesV4PagePaginationArray = Zc;
qt.Packages = kt;
qt.PackageListResponsesV4PagePaginationArray = Mc;
class E extends o {
  constructor() {
    super(...arguments), this.lockdowns = new vc(this._client), this.rules = new Ws(this._client), this.accessRules = new Rc(this._client), this.uaRules = new kc(this._client), this.waf = new qt(this._client);
  }
}
E.Lockdowns = vc;
E.LockdownsV4PagePaginationArray = Lc;
E.Rules = Ws;
E.FirewallRulesSinglePage = zt;
E.FirewallRulesV4PagePaginationArray = Ic;
E.AccessRules = Rc;
E.AccessRuleListResponsesV4PagePaginationArray = Ac;
E.UARules = kc;
E.UARuleListResponsesV4PagePaginationArray = Oc;
E.WAF = qt;
let Ng = class extends o {
  /**
   * Create a new preview health check.
   *
   * @example
   * ```ts
   * const healthcheck =
   *   await client.healthchecks.previews.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     address: 'www.example.com',
   *     name: 'server-1',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/healthchecks/preview`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a health check.
   *
   * @example
   * ```ts
   * const preview = await client.healthchecks.previews.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/healthchecks/preview/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a single configured health check preview.
   *
   * @example
   * ```ts
   * const healthcheck = await client.healthchecks.previews.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/healthchecks/preview/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Ks extends o {
  constructor() {
    super(...arguments), this.previews = new Ng(this._client);
  }
  /**
   * Create a new health check.
   *
   * @example
   * ```ts
   * const healthcheck = await client.healthchecks.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   address: 'www.example.com',
   *   name: 'server-1',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/healthchecks`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a configured health check.
   *
   * @example
   * ```ts
   * const healthcheck = await client.healthchecks.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     address: 'www.example.com',
   *     name: 'server-1',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/healthchecks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured health checks.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const healthcheck of client.healthchecks.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/healthchecks`, Yg, {
      query: n,
      ...e
    });
  }
  /**
   * Delete a health check.
   *
   * @example
   * ```ts
   * const healthcheck = await client.healthchecks.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/healthchecks/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patch a configured health check.
   *
   * @example
   * ```ts
   * const healthcheck = await client.healthchecks.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     address: 'www.example.com',
   *     name: 'server-1',
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/healthchecks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured health check.
   *
   * @example
   * ```ts
   * const healthcheck = await client.healthchecks.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/healthchecks/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Yg extends p {
}
Ks.HealthchecksV4PagePaginationArray = Yg;
Ks.Previews = Ng;
class Nc extends o {
  /**
   * Update the tls setting value for the hostname.
   *
   * @example
   * ```ts
   * const setting = await client.hostnames.settings.tls.update(
   *   'ciphers',
   *   'app.example.com',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     value: [
   *       'ECDHE-RSA-AES128-GCM-SHA256',
   *       'AES128-GCM-SHA256',
   *     ],
   *   },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.put(`/zones/${i}/hostnames/settings/${t}/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Delete the tls setting value for the hostname.
   *
   * @example
   * ```ts
   * const tls = await client.hostnames.settings.tls.delete(
   *   'ciphers',
   *   'app.example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.delete(`/zones/${i}/hostnames/settings/${t}/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * List the requested TLS setting for the hostnames under this zone.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tlsGetResponse of client.hostnames.settings.tls.get(
   *   'ciphers',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.getAPIList(`/zones/${n}/hostnames/settings/${t}`, Yc, s);
  }
}
class Yc extends d {
}
Nc.TLSGetResponsesSinglePage = Yc;
let Xs = class extends o {
  constructor() {
    super(...arguments), this.tls = new Nc(this._client);
  }
};
Xs.TLS = Nc;
Xs.TLSGetResponsesSinglePage = Yc;
let jc = class extends o {
  constructor() {
    super(...arguments), this.settings = new Xs(this._client);
  }
};
jc.Settings = Xs;
let jg = class extends o {
  /**
   * Creates and returns a new Hyperdrive configuration.
   *
   * @example
   * ```ts
   * const hyperdrive = await client.hyperdrive.configs.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'example-hyperdrive',
   *   origin: {
   *     database: 'postgres',
   *     host: 'database.example.com',
   *     password: 'password',
   *     port: 5432,
   *     scheme: 'postgres',
   *     user: 'postgres',
   *   },
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/hyperdrive/configs`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates and returns the specified Hyperdrive configuration.
   *
   * @example
   * ```ts
   * const hyperdrive = await client.hyperdrive.configs.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'example-hyperdrive',
   *     origin: {
   *       database: 'postgres',
   *       host: 'database.example.com',
   *       password: 'password',
   *       port: 5432,
   *       scheme: 'postgres',
   *       user: 'postgres',
   *     },
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/hyperdrive/configs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns a list of Hyperdrives.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const hyperdrive of client.hyperdrive.configs.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/hyperdrive/configs`, bf, e);
  }
  /**
   * Deletes the specified Hyperdrive.
   *
   * @example
   * ```ts
   * const config = await client.hyperdrive.configs.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/hyperdrive/configs/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patches and returns the specified Hyperdrive configuration. Custom caching
   * settings are not kept if caching is disabled.
   *
   * @example
   * ```ts
   * const hyperdrive = await client.hyperdrive.configs.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/hyperdrive/configs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified Hyperdrive configuration.
   *
   * @example
   * ```ts
   * const hyperdrive = await client.hyperdrive.configs.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/hyperdrive/configs/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Fc extends o {
  constructor() {
    super(...arguments), this.configs = new jg(this._client);
  }
}
class bf extends d {
}
Fc.Configs = jg;
let Gc = class extends o {
  /**
   * List all the permissions groups for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const permissionGroupListResponse of client.iam.permissionGroups.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/iam/permission_groups`, Bc, { query: n, ...e });
  }
  /**
   * Get information about a specific permission group in an account.
   *
   * @example
   * ```ts
   * const permissionGroup =
   *   await client.iam.permissionGroups.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/iam/permission_groups/${t}`, s);
  }
};
class Bc extends p {
}
Gc.PermissionGroupListResponsesV4PagePaginationArray = Bc;
class Hc extends o {
  /**
   * Create a new Resource Group under the specified account.
   *
   * @example
   * ```ts
   * const resourceGroup =
   *   await client.iam.resourceGroups.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'NewResourceGroup',
   *     scope: {
   *       key: 'com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4',
   *       objects: [
   *         {
   *           key: 'com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5',
   *         },
   *       ],
   *     },
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/iam/resource_groups`, { body: n, ...e });
  }
  /**
   * Modify an existing resource group.
   *
   * @example
   * ```ts
   * const resourceGroup =
   *   await client.iam.resourceGroups.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/iam/resource_groups/${t}`, {
      body: i,
      ...s
    });
  }
  /**
   * List all the resource groups for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const resourceGroupListResponse of client.iam.resourceGroups.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/iam/resource_groups`, Wc, { query: n, ...e });
  }
  /**
   * Remove a resource group from an account.
   *
   * @example
   * ```ts
   * const resourceGroup =
   *   await client.iam.resourceGroups.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/iam/resource_groups/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific resource group in an account.
   *
   * @example
   * ```ts
   * const resourceGroup = await client.iam.resourceGroups.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/iam/resource_groups/${t}`, s);
  }
}
class Wc extends p {
}
Hc.ResourceGroupListResponsesV4PagePaginationArray = Wc;
class Qs extends o {
  /**
   * Add members to a User Group.
   *
   * @example
   * ```ts
   * const member = await client.iam.userGroups.members.create(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{ id: '023e105f4ecef8ad9ca31a8372d0c353' }],
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/iam/user_groups/${t}/members`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Replace the set of members attached to a User Group.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const memberUpdateResponse of client.iam.userGroups.members.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{ id: '023e105f4ecef8ad9ca31a8372d0c353' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.getAPIList(`/accounts/${n}/iam/user_groups/${t}/members`, Kc, { body: i, method: "put", ...s });
  }
  /**
   * List all the members attached to a user group.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const memberListResponse of client.iam.userGroups.members.list(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/iam/user_groups/${t}/members`, Xc, { query: i, ...s });
  }
  /**
   * Remove a member from User Group
   *
   * @example
   * ```ts
   * const member = await client.iam.userGroups.members.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/iam/user_groups/${t}/members/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Kc extends d {
}
class Xc extends p {
}
Qs.MemberUpdateResponsesSinglePage = Kc;
Qs.MemberListResponsesV4PagePaginationArray = Xc;
class te extends o {
  constructor() {
    super(...arguments), this.members = new Qs(this._client);
  }
  /**
   * Create a new user group under the specified account.
   *
   * @example
   * ```ts
   * const userGroup = await client.iam.userGroups.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'My New User Group',
   *   policies: [
   *     {
   *       access: 'allow',
   *       permission_groups: [
   *         { id: 'c8fed203ed3043cba015a93ad1616f1f' },
   *         { id: '82e64a83756745bbbb1c9c2701bf816b' },
   *       ],
   *       resource_groups: [
   *         { id: '6d7f2f5f5b1d4a0e9081fdc98d432fd1' },
   *       ],
   *     },
   *   ],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/iam/user_groups`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify an existing user group.
   *
   * @example
   * ```ts
   * const userGroup = await client.iam.userGroups.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/iam/user_groups/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all the user groups for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const userGroupListResponse of client.iam.userGroups.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/iam/user_groups`, Qc, { query: n, ...e });
  }
  /**
   * Remove a user group from an account.
   *
   * @example
   * ```ts
   * const userGroup = await client.iam.userGroups.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/iam/user_groups/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get information about a specific user group in an account.
   *
   * @example
   * ```ts
   * const userGroup = await client.iam.userGroups.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/iam/user_groups/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Qc extends p {
}
te.UserGroupListResponsesV4PagePaginationArray = Qc;
te.Members = Qs;
te.MemberUpdateResponsesSinglePage = Kc;
te.MemberListResponsesV4PagePaginationArray = Xc;
class yt extends o {
  constructor() {
    super(...arguments), this.permissionGroups = new Gc(this._client), this.resourceGroups = new Hc(this._client), this.userGroups = new te(this._client);
  }
}
yt.PermissionGroups = Gc;
yt.PermissionGroupListResponsesV4PagePaginationArray = Bc;
yt.ResourceGroups = Hc;
yt.ResourceGroupListResponsesV4PagePaginationArray = Wc;
yt.UserGroups = te;
yt.UserGroupListResponsesV4PagePaginationArray = Qc;
let Fg = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/ips", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
class Gg extends o {
  /**
   * Fetch base image. For most images this will be the originally uploaded file. For
   * larger images it can be a near-lossless version of the original.
   *
   * @example
   * ```ts
   * const blob = await client.images.v1.blobs.get('image_id', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   *
   * const content = await blob.blob();
   * console.log(content);
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/images/v1/${t}/blob`, {
      ...s,
      headers: { Accept: "image/*", ...s?.headers },
      __binaryResponse: !0
    });
  }
}
let Bg = class extends o {
  /**
   * Create a new signing key with specified name. Returns all keys available.
   *
   * @example
   * ```ts
   * const key = await client.images.v1.keys.update('someKey', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  update(t, e, s) {
    const { account_id: n } = e;
    return this._client.put(`/accounts/${n}/images/v1/keys/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists your signing keys. These can be found on your Cloudflare Images dashboard.
   *
   * @example
   * ```ts
   * const keys = await client.images.v1.keys.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/images/v1/keys`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Delete signing key with specified name. Returns all keys available. When last
   * key is removed, a new default signing key will be generated.
   *
   * @example
   * ```ts
   * const key = await client.images.v1.keys.delete('someKey', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/images/v1/keys/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Hg extends o {
  /**
   * Fetch usage statistics details for Cloudflare Images.
   *
   * @example
   * ```ts
   * const stat = await client.images.v1.stats.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/images/v1/stats`, e)._thenUnwrap((n) => n.result);
  }
}
class Wg extends o {
  /**
   * Specify variants that allow you to resize images for different use cases.
   *
   * @example
   * ```ts
   * const variant = await client.images.v1.variants.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   id: 'hero',
   *   options: {
   *     fit: 'scale-down',
   *     height: 768,
   *     metadata: 'none',
   *     width: 1366,
   *   },
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/images/v1/variants`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists existing variants.
   *
   * @example
   * ```ts
   * const variant = await client.images.v1.variants.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/images/v1/variants`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Deleting a variant purges the cache for all images associated with the variant.
   *
   * @example
   * ```ts
   * const variant = await client.images.v1.variants.delete(
   *   'hero',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/images/v1/variants/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updating a variant purges the cache for all images associated with the variant.
   *
   * @example
   * ```ts
   * const response = await client.images.v1.variants.edit(
   *   'hero',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     options: {
   *       fit: 'scale-down',
   *       height: 768,
   *       metadata: 'none',
   *       width: 1366,
   *     },
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/images/v1/variants/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch details for a single variant.
   *
   * @example
   * ```ts
   * const variant = await client.images.v1.variants.get(
   *   'hero',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/images/v1/variants/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ot extends o {
  constructor() {
    super(...arguments), this.keys = new Bg(this._client), this.stats = new Hg(this._client), this.variants = new Wg(this._client), this.blobs = new Gg(this._client);
  }
  /**
   * Upload an image with up to 10 Megabytes using a single HTTP POST
   * (multipart/form-data) request. An image can be uploaded by sending an image file
   * or passing an accessible to an API url.
   *
   * @example
   * ```ts
   * const image = await client.images.v1.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/images/v1`, S({ body: n, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * List up to 100 images with one request. Use the optional parameters below to get
   * a specific range of images.
   *
   * @deprecated
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/images/v1`, Jc, {
      query: n,
      ...e
    });
  }
  /**
   * Delete an image on Cloudflare Images. On success, all copies of the image are
   * deleted and purged from cache.
   *
   * @example
   * ```ts
   * const v1 = await client.images.v1.delete('image_id', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/images/v1/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update image access control. On access control change, all copies of the image
   * are purged from cache.
   *
   * @example
   * ```ts
   * const image = await client.images.v1.edit('image_id', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/images/v1/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch details for a single image.
   *
   * @example
   * ```ts
   * const image = await client.images.v1.get('image_id', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/images/v1/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Jc extends F {
}
Ot.V1ListResponsesV4PagePagination = Jc;
Ot.Keys = Bg;
Ot.Stats = Hg;
Ot.Variants = Wg;
Ot.Blobs = Gg;
class Kg extends o {
  /**
   * Direct uploads allow users to upload images without API keys. A common use case
   * are web apps, client-side applications, or mobile devices where users upload
   * content directly to Cloudflare Images. This method creates a draft record for a
   * future image. It returns an upload URL and an image identifier. To verify if the
   * image itself has been uploaded, send an image details request
   * (accounts/:account_identifier/images/v1/:identifier), and check that the
   * `draft: true` property is not present.
   *
   * @example
   * ```ts
   * const directUpload =
   *   await client.images.v2.directUploads.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/images/v2/direct_upload`, S({ body: n, ...e }))._thenUnwrap((i) => i.result);
  }
}
class qc extends o {
  constructor() {
    super(...arguments), this.directUploads = new Kg(this._client);
  }
  /**
   * List up to 10000 images with one request. Use the optional parameters below to
   * get a specific range of images. Endpoint returns continuation_token if more
   * images are present.
   *
   * @example
   * ```ts
   * const v2s = await client.images.v2.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/images/v2`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
}
qc.DirectUploads = Kg;
class Ze extends o {
  constructor() {
    super(...arguments), this.v1 = new Ot(this._client), this.v2 = new qc(this._client);
  }
}
Ze.V1 = Ot;
Ze.V1ListResponsesV4PagePagination = Jc;
Ze.V2 = qc;
let Xg = class extends o {
  /**
   * Gets a list of all the domains that have resolved to a specific IP address.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dns of client.intel.dns.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/intel/dns`, to, {
      query: n,
      ...e
    });
  }
};
class to extends F {
}
Xg.DNSV4PagePagination = to;
class Qg extends o {
  /**
   * Gets historical security threat and content categories currently and previously
   * assigned to a domain.
   *
   * @example
   * ```ts
   * const domainHistories =
   *   await client.intel.domainHistory.get({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/domain-history`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class eo extends o {
  /**
   * Get IP Lists.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ipList of client.intel.ipLists.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/intel/ip-list`, so, e);
  }
}
class so extends d {
}
eo.IPListsSinglePage = so;
let Jg = class extends o {
  /**
   * Gets the geolocation, ASN, infrastructure type of the ASN, and any security
   * threat categories of an IP address. **Must provide ip query parameters.** For
   * example, `/intel/ip?ipv4=1.1.1.1` or `/intel/ip?ipv6=2001:db8::1`.
   *
   * @example
   * ```ts
   * const ips = await client.intel.ips.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/ip`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
};
class qg extends o {
  /**
   * Allows you to submit requests to change a domain’s category.
   *
   * @example
   * ```ts
   * const miscategorization =
   *   await client.intel.miscategorizations.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/intel/miscategorization`, { body: n, ...e });
  }
}
class no extends o {
  /**
   * List sinkholes owned by this account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const sinkhole of client.intel.sinkholes.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/intel/sinkholes`, io, e);
  }
}
class io extends d {
}
no.SinkholesSinglePage = io;
class Uf extends o {
  /**
   * Get WHOIS Record
   *
   * @example
   * ```ts
   * const whois = await client.intel.whois.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/whois`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
}
let tp = class extends o {
  /**
   * Get ASN Subnets.
   *
   * @example
   * ```ts
   * const subnet = await client.intel.asn.subnets.get(0, {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/intel/asn/${t}/subnets`, s);
  }
};
class ro extends o {
  constructor() {
    super(...arguments), this.subnets = new tp(this._client);
  }
  /**
   * Gets an overview of the Autonomous System Number (ASN) and a list of subnets for
   * it.
   *
   * @example
   * ```ts
   * const asn = await client.intel.asn.get(0, {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/intel/asn/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
ro.Subnets = tp;
class co extends o {
  /**
   * Get Security Center Issues Types
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const issueTypeGetResponse of client.intel.attackSurfaceReport.issueTypes.get(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/intel/attack-surface-report/issue-types`, oo, e);
  }
}
class oo extends d {
}
co.IssueTypeGetResponsesSinglePage = oo;
class ao extends o {
  /**
   * Get Security Center Issues
   *
   * @deprecated
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/intel/attack-surface-report/issues`, uo, { query: n, ...e });
  }
  /**
   * Get Security Center Issue Counts by Class
   *
   * @deprecated
   */
  class(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/attack-surface-report/issues/class`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Archive Security Center Insight
   *
   * @deprecated
   */
  dismiss(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/intel/attack-surface-report/${t}/dismiss`, {
      body: i,
      ...s
    });
  }
  /**
   * Get Security Center Issue Counts by Severity
   *
   * @deprecated
   */
  severity(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/attack-surface-report/issues/severity`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Security Center Issue Counts by Type
   *
   * @deprecated
   */
  type(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/attack-surface-report/issues/type`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class uo extends F {
}
ao.IssueListResponsesV4PagePagination = uo;
class ee extends o {
  constructor() {
    super(...arguments), this.issueTypes = new co(this._client), this.issues = new ao(this._client);
  }
}
ee.IssueTypes = co;
ee.IssueTypeGetResponsesSinglePage = oo;
ee.Issues = ao;
ee.IssueListResponsesV4PagePagination = uo;
class ep extends o {
  /**
   * Same as summary.
   *
   * @example
   * ```ts
   * const bulks = await client.intel.domains.bulks.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/domain/bulk`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let lo = class extends o {
  constructor() {
    super(...arguments), this.bulks = new ep(this._client);
  }
  /**
   * Gets security details and statistics about a domain.
   *
   * @example
   * ```ts
   * const domain = await client.intel.domains.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/intel/domain`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
};
lo.Bulks = ep;
let sp = class extends o {
  /**
   * Download indicator feed data
   *
   * @example
   * ```ts
   * const download =
   *   await client.intel.indicatorFeeds.downloads.get(12, {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/intel/indicator_feeds/${t}/download`, s)._thenUnwrap((i) => i.result);
  }
};
class np extends o {
  /**
   * Grant permission to indicator feed
   *
   * @example
   * ```ts
   * const permission =
   *   await client.intel.indicatorFeeds.permissions.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/intel/indicator-feeds/permissions/add`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List indicator feed permissions
   *
   * @example
   * ```ts
   * const permissions =
   *   await client.intel.indicatorFeeds.permissions.list({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/intel/indicator-feeds/permissions/view`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Revoke permission to indicator feed
   *
   * @example
   * ```ts
   * const permission =
   *   await client.intel.indicatorFeeds.permissions.delete({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  delete(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/intel/indicator-feeds/permissions/remove`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let ip = class extends o {
  /**
   * Update indicator feed data
   *
   * @example
   * ```ts
   * const snapshot =
   *   await client.intel.indicatorFeeds.snapshots.update(12, {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/intel/indicator-feeds/${t}/snapshot`, S({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
};
class se extends o {
  constructor() {
    super(...arguments), this.snapshots = new ip(this._client), this.permissions = new np(this._client), this.downloads = new sp(this._client);
  }
  /**
   * Create new indicator feed
   *
   * @example
   * ```ts
   * const indicatorFeed =
   *   await client.intel.indicatorFeeds.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/intel/indicator-feeds`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update indicator feed metadata
   *
   * @example
   * ```ts
   * const indicatorFeed =
   *   await client.intel.indicatorFeeds.update(12, {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/intel/indicator-feeds/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get indicator feeds owned by this account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const indicatorFeedListResponse of client.intel.indicatorFeeds.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/intel/indicator-feeds`, ho, e);
  }
  /**
   * Get indicator feed data
   *
   * @example
   * ```ts
   * const response = await client.intel.indicatorFeeds.data(
   *   12,
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  data(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/intel/indicator-feeds/${t}/data`, {
      ...s,
      headers: { Accept: "text/csv", ...s?.headers }
    });
  }
  /**
   * Get indicator feed metadata
   *
   * @example
   * ```ts
   * const indicatorFeed = await client.intel.indicatorFeeds.get(
   *   12,
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/intel/indicator-feeds/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class ho extends d {
}
se.IndicatorFeedListResponsesSinglePage = ho;
se.Snapshots = ip;
se.Permissions = np;
se.Downloads = sp;
class L extends o {
  constructor() {
    super(...arguments), this.asn = new ro(this._client), this.dns = new Xg(this._client), this.domains = new lo(this._client), this.domainHistory = new Qg(this._client), this.ips = new Jg(this._client), this.ipLists = new eo(this._client), this.miscategorizations = new qg(this._client), this.whois = new Uf(this._client), this.indicatorFeeds = new se(this._client), this.sinkholes = new no(this._client), this.attackSurfaceReport = new ee(this._client);
  }
}
L.ASN = ro;
L.DNSV4PagePagination = to;
L.Domains = lo;
L.DomainHistoryResource = Qg;
L.IPs = Jg;
L.IPLists = eo;
L.IPListsSinglePage = so;
L.Miscategorizations = qg;
L.IndicatorFeeds = se;
L.IndicatorFeedListResponsesSinglePage = ho;
L.Sinkholes = no;
L.SinkholesSinglePage = io;
L.AttackSurfaceReport = ee;
let _o = class extends o {
  /**
   * Lists a namespace's keys.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const key of client.kv.namespaces.keys.list(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/storage/kv/namespaces/${t}/keys`, go, { query: i, ...s });
  }
  /**
   * Remove multiple KV pairs from the namespace. Body should be an array of up to
   * 10,000 keys to be removed.
   *
   * @deprecated Please use kv.namespaces.bulk_delete instead
   */
  bulkDelete(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/storage/kv/namespaces/${t}/bulk/delete`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieve up to 100 KV pairs from the namespace. Keys must contain text-based
   * values. JSON values can optionally be parsed instead of being returned as a
   * string value. Metadata can be included if `withMetadata` is true.
   *
   * @deprecated Please use kv.namespaces.bulk_get instead
   */
  bulkGet(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/storage/kv/namespaces/${t}/bulk/get`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Write multiple keys and values at once. Body should be an array of up to 10,000
   * key-value pairs to be stored, along with optional expiration information.
   * Existing values and expirations will be overwritten. If neither `expiration` nor
   * `expiration_ttl` is specified, the key-value pair will never expire. If both are
   * set, `expiration_ttl` is used and `expiration` is ignored. The entire request
   * size must be 100 megabytes or less.
   *
   * @deprecated Please use kv.namespaces.bulk_update instead
   */
  bulkUpdate(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/storage/kv/namespaces/${t}/bulk`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class go extends $i {
}
_o.KeysCursorLimitPagination = go;
class rp extends o {
  /**
   * Returns the metadata associated with the given key in the given namespace. Use
   * URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key
   * name.
   *
   * @example
   * ```ts
   * const metadata = await client.kv.namespaces.metadata.get(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   'My-Key',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/storage/kv/namespaces/${t}/metadata/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class cp extends o {
  /**
   * Write a value identified by a key. Use URL-encoding to use special characters
   * (for example, `:`, `!`, `%`) in the key name. Body should be the value to be
   * stored. If JSON metadata to be associated with the key/value pair is needed, use
   * `multipart/form-data` content type for your PUT request (see dropdown below in
   * `REQUEST BODY SCHEMA`). Existing values, expirations, and metadata will be
   * overwritten. If neither `expiration` nor `expiration_ttl` is specified, the
   * key-value pair will never expire. If both are set, `expiration_ttl` is used and
   * `expiration` is ignored.
   *
   * @example
   * ```ts
   * const value = await client.kv.namespaces.values.update(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   'My-Key',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     value: 'Some Value',
   *   },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, expiration: c, expiration_ttl: a, ...l } = s;
    return this._client.put(`/accounts/${i}/storage/kv/namespaces/${t}/values/${e}`, S({ query: { expiration: c, expiration_ttl: a }, body: l, ...n }))._thenUnwrap((g) => g.result);
  }
  /**
   * Remove a KV pair from the namespace. Use URL-encoding to use special characters
   * (for example, `:`, `!`, `%`) in the key name.
   *
   * @example
   * ```ts
   * const value = await client.kv.namespaces.values.delete(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   'My-Key',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/storage/kv/namespaces/${t}/values/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the value associated with the given key in the given namespace. Use
   * URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key
   * name. If the KV-pair is set to expire at some point, the expiration time as
   * measured in seconds since the UNIX epoch will be returned in the `expiration`
   * response header.
   *
   * @example
   * ```ts
   * const value = await client.kv.namespaces.values.get(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   'My-Key',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   *
   * const content = await value.blob();
   * console.log(content);
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/storage/kv/namespaces/${t}/values/${e}`, {
      ...n,
      headers: { Accept: "application/octet-stream", ...n?.headers },
      __binaryResponse: !0
    });
  }
}
let Ct = class extends o {
  constructor() {
    super(...arguments), this.keys = new _o(this._client), this.metadata = new rp(this._client), this.values = new cp(this._client);
  }
  /**
   * Creates a namespace under the given title. A `400` is returned if the account
   * already owns a namespace with this title. A namespace must be explicitly deleted
   * to be replaced.
   *
   * @example
   * ```ts
   * const namespace = await client.kv.namespaces.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   title: 'My Own Namespace',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/storage/kv/namespaces`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modifies a namespace's title.
   *
   * @example
   * ```ts
   * const namespace = await client.kv.namespaces.update(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     title: 'My Own Namespace',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/storage/kv/namespaces/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the namespaces owned by an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const namespace of client.kv.namespaces.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/storage/kv/namespaces`, po, { query: n, ...e });
  }
  /**
   * Deletes the namespace corresponding to the given ID.
   *
   * @example
   * ```ts
   * const namespace = await client.kv.namespaces.delete(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/storage/kv/namespaces/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Remove multiple KV pairs from the namespace. Body should be an array of up to
   * 10,000 keys to be removed.
   *
   * @example
   * ```ts
   * const response = await client.kv.namespaces.bulkDelete(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: ['My-Key'],
   *   },
   * );
   * ```
   */
  bulkDelete(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/storage/kv/namespaces/${t}/bulk/delete`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieve up to 100 KV pairs from the namespace. Keys must contain text-based
   * values. JSON values can optionally be parsed instead of being returned as a
   * string value. Metadata can be included if `withMetadata` is true.
   *
   * @example
   * ```ts
   * const response = await client.kv.namespaces.bulkGet(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     keys: ['My-Key'],
   *   },
   * );
   * ```
   */
  bulkGet(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/storage/kv/namespaces/${t}/bulk/get`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Write multiple keys and values at once. Body should be an array of up to 10,000
   * key-value pairs to be stored, along with optional expiration information.
   * Existing values and expirations will be overwritten. If neither `expiration` nor
   * `expiration_ttl` is specified, the key-value pair will never expire. If both are
   * set, `expiration_ttl` is used and `expiration` is ignored. The entire request
   * size must be 100 megabytes or less.
   *
   * @example
   * ```ts
   * const response = await client.kv.namespaces.bulkUpdate(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{ key: 'My-Key', value: 'Some string' }],
   *   },
   * );
   * ```
   */
  bulkUpdate(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/storage/kv/namespaces/${t}/bulk`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get the namespace corresponding to the given ID.
   *
   * @example
   * ```ts
   * const namespace = await client.kv.namespaces.get(
   *   '0f2ac74b498b48028cb68387c421e279',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/storage/kv/namespaces/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class po extends p {
}
Ct.NamespacesV4PagePaginationArray = po;
Ct.Keys = _o;
Ct.KeysCursorLimitPagination = go;
Ct.Metadata = rp;
Ct.Values = cp;
class Js extends o {
  constructor() {
    super(...arguments), this.namespaces = new Ct(this._client);
  }
}
Js.Namespaces = Ct;
Js.NamespacesV4PagePaginationArray = po;
class wo extends o {
  /**
   * Create Keyless SSL Configuration
   *
   * @example
   * ```ts
   * const keylessCertificate =
   *   await client.keylessCertificates.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     certificate:
   *       '-----BEGIN CERTIFICATE----- MIIDtTCCAp2gAwIBAgIJAM15n7fdxhRtMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV BAYTAlVTMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX aWRnaXRzIFB0eSBMdGQwHhcNMTQwMzExMTkyMTU5WhcNMTQwNDEwMTkyMTU5WjBF MQswCQYDVQQGEwJVUzETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50 ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB CgKCAQEAvq3sKsHpeduJHimOK+fvQdKsI8z8A05MZyyLp2/R/GE8FjNv+hkVY1WQ LIyTNNQH7CJecE1nbTfo8Y56S7x/rhxC6/DJ8MIulapFPnorq46KU6yRxiM0MQ3N nTJHlHA2ozZta6YBBfVfhHWl1F0IfNbXCLKvGwWWMbCx43OfW6KTkbRnE6gFWKuO fSO5h2u5TaWVuSIzBvYs7Vza6m+gtYAvKAJV2nSZ+eSEFPDo29corOy8+huEOUL8 5FAw4BFPsr1TlrlGPFitduQUHGrSL7skk1ESGza0to3bOtrodKei2s9bk5MXm7lZ qI+WZJX4Zu9+mzZhc9pCVi8r/qlXuQIDAQABo4GnMIGkMB0GA1UdDgQWBBRvavf+ sWM4IwKiH9X9w1vl6nUVRDB1BgNVHSMEbjBsgBRvavf+sWM4IwKiH9X9w1vl6nUV RKFJpEcwRTELMAkGA1UEBhMCVVMxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV BAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAM15n7fdxhRtMAwGA1UdEwQF MAMBAf8wDQYJKoZIhvcNAQEFBQADggEBABY2ZzBaW0dMsAAT7tPJzrVWVzQx6KU4 UEBLudIlWPlkAwTnINCWR/8eNjCCmGA4heUdHmazdpPa8RzwOmc0NT1NQqzSyktt vTqb4iHD7+8f9MqJ9/FssCfTtqr/Qst/hGH4Wmdf1EJ/6FqYAAb5iRlPgshFZxU8 uXtA8hWn6fK6eISD9HBdcAFToUvKNZ1BIDPvh9f95Ine8ar6yGd56TUNrHR8eHBs ESxz5ddVR/oWRysNJ+aGAyYqHS8S/ttmC7r4XCAHqXptkHPCGRqkAhsterYhd4I8 /cBzejUobNCjjHFbtkAL/SjxZOLW+pNkZwfeYdM8iPkD54Uua1v2tdw= -----END CERTIFICATE-----',
   *     host: 'example.com',
   *     port: 24008,
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/keyless_certificates`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List all Keyless SSL configurations for a given zone.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const keylessCertificate of client.keylessCertificates.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/keyless_certificates`, op, e);
  }
  /**
   * Delete Keyless SSL Configuration
   *
   * @example
   * ```ts
   * const keylessCertificate =
   *   await client.keylessCertificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/keyless_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * This will update attributes of a Keyless SSL. Consists of one or more of the
   * following: host,name,port.
   *
   * @example
   * ```ts
   * const keylessCertificate =
   *   await client.keylessCertificates.edit(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/keyless_certificates/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get details for one Keyless SSL configuration.
   *
   * @example
   * ```ts
   * const keylessCertificate =
   *   await client.keylessCertificates.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/keyless_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class op extends d {
}
wo.KeylessCertificatesSinglePage = op;
class $o extends o {
  /**
   * Create user-defined detection pattern for Leaked Credential Checks.
   *
   * @example
   * ```ts
   * const detection =
   *   await client.leakedCredentialChecks.detections.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/leaked-credential-checks/detections`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update user-defined detection pattern for Leaked Credential Checks.
   *
   * @example
   * ```ts
   * const detection =
   *   await client.leakedCredentialChecks.detections.update(
   *     '18a14bafaa8eb1df04ce683ec18c765e',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/leaked-credential-checks/detections/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List user-defined detection patterns for Leaked Credential Checks.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const detectionListResponse of client.leakedCredentialChecks.detections.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/leaked-credential-checks/detections`, mo, e);
  }
  /**
   * Remove user-defined detection pattern for Leaked Credential Checks.
   *
   * @example
   * ```ts
   * const detection =
   *   await client.leakedCredentialChecks.detections.delete(
   *     '18a14bafaa8eb1df04ce683ec18c765e',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/leaked-credential-checks/detections/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class mo extends d {
}
$o.DetectionListResponsesSinglePage = mo;
class qs extends o {
  constructor() {
    super(...arguments), this.detections = new $o(this._client);
  }
  /**
   * Updates the current status of Leaked Credential Checks.
   *
   * @example
   * ```ts
   * const leakedCredentialCheck =
   *   await client.leakedCredentialChecks.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/leaked-credential-checks`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves the current status of Leaked Credential Checks.
   *
   * @example
   * ```ts
   * const leakedCredentialCheck =
   *   await client.leakedCredentialChecks.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/leaked-credential-checks`, e)._thenUnwrap((n) => n.result);
  }
}
qs.Detections = $o;
qs.DetectionListResponsesSinglePage = mo;
let ap = class extends o {
  /**
   * Get the result of a previous preview operation using the provided preview_id.
   *
   * @example
   * ```ts
   * const preview = await client.loadBalancers.previews.get(
   *   'p1aba936b94213e5b8dca0c0dbf1f9cc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/load_balancers/preview/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class up extends o {
  /**
   * List all region mappings.
   *
   * @example
   * ```ts
   * const regions = await client.loadBalancers.regions.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/load_balancers/regions`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get a single region mapping.
   *
   * @example
   * ```ts
   * const region = await client.loadBalancers.regions.get(
   *   'WNAM',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/load_balancers/regions/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class yo extends o {
  /**
   * Search for Load Balancing resources.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const searchListResponse of client.loadBalancers.searches.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/search`, fo, { query: n, ...e });
  }
}
class fo extends F {
}
yo.SearchListResponsesV4PagePagination = fo;
class lp extends o {
  /**
   * Preview pools using the specified monitor with provided monitor details. The
   * returned preview_id can be used in the preview endpoint to retrieve the results.
   *
   * @example
   * ```ts
   * const preview =
   *   await client.loadBalancers.monitors.previews.create(
   *     'f1aba936b94213e5b8dca0c0dbf1f9cc',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/load_balancers/monitors/${t}/preview`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let Po = class extends o {
  /**
   * Get the list of resources that reference the provided monitor.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const referenceGetResponse of client.loadBalancers.monitors.references.get(
   *   'f1aba936b94213e5b8dca0c0dbf1f9cc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/load_balancers/monitors/${t}/references`, bo, s);
  }
}, bo = class extends d {
};
Po.ReferenceGetResponsesSinglePage = bo;
class ne extends o {
  constructor() {
    super(...arguments), this.previews = new lp(this._client), this.references = new Po(this._client);
  }
  /**
   * Create a configured monitor.
   *
   * @example
   * ```ts
   * const monitor = await client.loadBalancers.monitors.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/load_balancers/monitors`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a configured monitor.
   *
   * @example
   * ```ts
   * const monitor = await client.loadBalancers.monitors.update(
   *   'f1aba936b94213e5b8dca0c0dbf1f9cc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/load_balancers/monitors/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured monitors for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const monitor of client.loadBalancers.monitors.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/monitors`, Uo, e);
  }
  /**
   * Delete a configured monitor.
   *
   * @example
   * ```ts
   * const monitor = await client.loadBalancers.monitors.delete(
   *   'f1aba936b94213e5b8dca0c0dbf1f9cc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/load_balancers/monitors/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing monitor, overwriting the supplied properties.
   *
   * @example
   * ```ts
   * const monitor = await client.loadBalancers.monitors.edit(
   *   'f1aba936b94213e5b8dca0c0dbf1f9cc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/load_balancers/monitors/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a single configured monitor for an account.
   *
   * @example
   * ```ts
   * const monitor = await client.loadBalancers.monitors.get(
   *   'f1aba936b94213e5b8dca0c0dbf1f9cc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/load_balancers/monitors/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Uo extends d {
}
ne.MonitorsSinglePage = Uo;
ne.Previews = lp;
ne.References = Po;
ne.ReferenceGetResponsesSinglePage = bo;
class dp extends o {
  /**
   * Preview pool health using provided monitor details. The returned preview_id can
   * be used in the preview endpoint to retrieve the results.
   *
   * @example
   * ```ts
   * const health =
   *   await client.loadBalancers.pools.health.create(
   *     '17b5962d775c646f3f9725cbc7a53df4',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/load_balancers/pools/${t}/preview`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch the latest pool health status for a single pool.
   *
   * @example
   * ```ts
   * const health = await client.loadBalancers.pools.health.get(
   *   '17b5962d775c646f3f9725cbc7a53df4',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/load_balancers/pools/${t}/health`, s)._thenUnwrap((i) => i.result);
  }
}
let xo = class extends o {
  /**
   * Get the list of resources that reference the provided pool.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const referenceGetResponse of client.loadBalancers.pools.references.get(
   *   '17b5962d775c646f3f9725cbc7a53df4',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/load_balancers/pools/${t}/references`, So, s);
  }
};
class So extends d {
}
xo.ReferenceGetResponsesSinglePage = So;
class ie extends o {
  constructor() {
    super(...arguments), this.health = new dp(this._client), this.references = new xo(this._client);
  }
  /**
   * Create a new pool.
   *
   * @example
   * ```ts
   * const pool = await client.loadBalancers.pools.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'primary-dc-1',
   *   origins: [{}],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/load_balancers/pools`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Modify a configured pool.
   *
   * @example
   * ```ts
   * const pool = await client.loadBalancers.pools.update(
   *   '17b5962d775c646f3f9725cbc7a53df4',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'primary-dc-1',
   *     origins: [{}],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/load_balancers/pools/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured pools.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const pool of client.loadBalancers.pools.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/pools`, fs, {
      query: n,
      ...e
    });
  }
  /**
   * Delete a configured pool.
   *
   * @example
   * ```ts
   * const pool = await client.loadBalancers.pools.delete(
   *   '17b5962d775c646f3f9725cbc7a53df4',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/load_balancers/pools/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to a number of existing pools, overwriting the supplied
   * properties. Pools are ordered by ascending `name`. Returns the list of affected
   * pools. Supports the standard pagination query parameters, either
   * `limit`/`offset` or `per_page`/`page`.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const pool of client.loadBalancers.pools.bulkEdit(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulkEdit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/load_balancers/pools`, fs, {
      body: n,
      method: "patch",
      ...e
    });
  }
  /**
   * Apply changes to an existing pool, overwriting the supplied properties.
   *
   * @example
   * ```ts
   * const pool = await client.loadBalancers.pools.edit(
   *   '17b5962d775c646f3f9725cbc7a53df4',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/load_balancers/pools/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured pool.
   *
   * @example
   * ```ts
   * const pool = await client.loadBalancers.pools.get(
   *   '17b5962d775c646f3f9725cbc7a53df4',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/load_balancers/pools/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class fs extends d {
}
ie.PoolsSinglePage = fs;
ie.Health = dp;
ie.References = xo;
ie.ReferenceGetResponsesSinglePage = So;
class W extends o {
  constructor() {
    super(...arguments), this.monitors = new ne(this._client), this.pools = new ie(this._client), this.previews = new ap(this._client), this.regions = new up(this._client), this.searches = new yo(this._client);
  }
  /**
   * Create a new load balancer.
   *
   * @example
   * ```ts
   * const loadBalancer = await client.loadBalancers.create({
   *   zone_id: '699d98642c564d2e855e9661899b7252',
   *   default_pools: [
   *     '17b5962d775c646f3f9725cbc7a53df4',
   *     '9290f38c5d07c2e2f4df57b1f61d4196',
   *     '00920f38ce07c2e2f4df50b1f61d4194',
   *   ],
   *   fallback_pool: 'fallback_pool',
   *   name: 'www.example.com',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/load_balancers`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a configured load balancer.
   *
   * @example
   * ```ts
   * const loadBalancer = await client.loadBalancers.update(
   *   '699d98642c564d2e855e9661899b7252',
   *   {
   *     zone_id: '699d98642c564d2e855e9661899b7252',
   *     default_pools: [
   *       '17b5962d775c646f3f9725cbc7a53df4',
   *       '9290f38c5d07c2e2f4df57b1f61d4196',
   *       '00920f38ce07c2e2f4df50b1f61d4194',
   *     ],
   *     fallback_pool: 'fallback_pool',
   *     name: 'www.example.com',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/load_balancers/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List configured load balancers.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const loadBalancer of client.loadBalancers.list({
   *   zone_id: '699d98642c564d2e855e9661899b7252',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/load_balancers`, hp, e);
  }
  /**
   * Delete a configured load balancer.
   *
   * @example
   * ```ts
   * const loadBalancer = await client.loadBalancers.delete(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/load_balancers/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Apply changes to an existing load balancer, overwriting the supplied properties.
   *
   * @example
   * ```ts
   * const loadBalancer = await client.loadBalancers.edit(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/load_balancers/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single configured load balancer.
   *
   * @example
   * ```ts
   * const loadBalancer = await client.loadBalancers.get(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/load_balancers/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class hp extends d {
}
W.LoadBalancersSinglePage = hp;
W.Monitors = ne;
W.MonitorsSinglePage = Uo;
W.Pools = ie;
W.PoolsSinglePage = fs;
W.Previews = ap;
W.Regions = up;
W.Searches = yo;
W.SearchListResponsesV4PagePagination = fo;
class zo extends o {
  /**
   * Creates a new Instant Logs job for a zone.
   *
   * @example
   * ```ts
   * const instantLogpushJob = await client.logpush.edge.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/logpush/edge`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists Instant Logs jobs for a zone.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const instantLogpushJob of client.logpush.edge.get(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/logpush/edge`, Ro, e);
  }
}
class Ro extends d {
}
zo.InstantLogpushJobsSinglePage = Ro;
let Ao = class extends o {
  /**
   * Creates a new Logpush job for an account or zone.
   *
   * @example
   * ```ts
   * const logpushJob = await client.logpush.jobs.create({
   *   destination_conf: 's3://mybucket/logs?region=us-west-2',
   *   account_id: 'account_id',
   *   dataset: 'gateway_dns',
   *   filter:
   *     '{"where":{"and":[{"key":"ClientRequestPath","operator":"contains","value":"/static"},{"key":"ClientRequestHost","operator":"eq","value":"example.com"}]}}',
   *   max_upload_bytes: 5000000,
   *   max_upload_interval_seconds: 30,
   *   max_upload_records: 1000,
   *   name: 'example.com',
   *   output_options: {
   *     'CVE-2021-44228': false,
   *     batch_prefix: '',
   *     batch_suffix: '',
   *     field_delimiter: ',',
   *     field_names: ['Datetime', 'DstIP', 'SrcIP'],
   *     output_type: 'ndjson',
   *     record_delimiter: '',
   *     record_prefix: '{',
   *     record_suffix: '}\n',
   *     sample_rate: 1,
   *     timestamp_format: 'unixnano',
   *   },
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/logpush/jobs`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a Logpush job.
   *
   * @example
   * ```ts
   * const logpushJob = await client.logpush.jobs.update(1, {
   *   account_id: 'account_id',
   *   destination_conf: 's3://mybucket/logs?region=us-west-2',
   *   filter:
   *     '{"where":{"and":[{"key":"ClientRequestPath","operator":"contains","value":"/static"},{"key":"ClientRequestHost","operator":"eq","value":"example.com"}]}}',
   *   max_upload_bytes: 5000000,
   *   max_upload_interval_seconds: 30,
   *   max_upload_records: 1000,
   *   output_options: {
   *     'CVE-2021-44228': false,
   *     batch_prefix: '',
   *     batch_suffix: '',
   *     field_delimiter: ',',
   *     field_names: ['Datetime', 'DstIP', 'SrcIP'],
   *     output_type: 'ndjson',
   *     record_delimiter: '',
   *     record_prefix: '{',
   *     record_suffix: '}\n',
   *     sample_rate: 1,
   *     timestamp_format: 'unixnano',
   *   },
   * });
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/logpush/jobs/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/logpush/jobs`, tn, e);
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/logpush/jobs/${t}`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/logpush/jobs/${t}`, s)._thenUnwrap((l) => l.result);
  }
};
class tn extends d {
}
Ao.LogpushJobsSinglePage = tn;
class _p extends o {
  /**
   * Gets a new ownership challenge sent to your destination.
   *
   * @example
   * ```ts
   * const ownership = await client.logpush.ownership.create({
   *   destination_conf: 's3://mybucket/logs?region=us-west-2',
   *   account_id: 'account_id',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/logpush/ownership`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Validates ownership challenge of the destination.
   *
   * @example
   * ```ts
   * const ownershipValidation =
   *   await client.logpush.ownership.validate({
   *     destination_conf: 's3://mybucket/logs?region=us-west-2',
   *     ownership_challenge: '00000000000000000000',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  validate(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/logpush/ownership/validate`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
class gp extends o {
  /**
   * Validates destination.
   *
   * @example
   * ```ts
   * const response = await client.logpush.validate.destination({
   *   destination_conf: 's3://mybucket/logs?region=us-west-2',
   *   account_id: 'account_id',
   * });
   * ```
   */
  destination(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/logpush/validate/destination`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Checks if there is an existing job with a destination.
   *
   * @example
   * ```ts
   * const response =
   *   await client.logpush.validate.destinationExists({
   *     destination_conf: 's3://mybucket/logs?region=us-west-2',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  destinationExists(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/logpush/validate/destination/exists`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Validates logpull origin with logpull_options.
   *
   * @example
   * ```ts
   * const response = await client.logpush.validate.origin({
   *   logpull_options:
   *     'fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339',
   *   account_id: 'account_id',
   * });
   * ```
   */
  origin(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/logpush/validate/origin`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
let pp = class extends o {
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/logpush/datasets/${t}/fields`, s)._thenUnwrap((l) => l.result);
  }
}, wp = class extends o {
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/logpush/datasets/${t}/jobs`, tn, s);
  }
}, en = class extends o {
  constructor() {
    super(...arguments), this.fields = new pp(this._client), this.jobs = new wp(this._client);
  }
};
en.Fields = pp;
en.Jobs = wp;
class at extends o {
  constructor() {
    super(...arguments), this.datasets = new en(this._client), this.edge = new zo(this._client), this.jobs = new Ao(this._client), this.ownership = new _p(this._client), this.validate = new gp(this._client);
  }
}
at.Datasets = en;
at.Edge = zo;
at.InstantLogpushJobsSinglePage = Ro;
at.Jobs = Ao;
at.LogpushJobsSinglePage = tn;
at.Ownership = _p;
at.Validate = gp;
class $p extends o {
  /**
   * The `/rayids` api route allows lookups by specific rayid. The rayids route will
   * return zero, one, or more records (ray ids are not unique).
   *
   * @example
   * ```ts
   * const RayID = await client.logs.RayID.get(
   *   '41ddf1740f67442d',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.get(`/zones/${n}/logs/rayids/${t}`, { query: i, ...s });
  }
}
class mp extends o {
  /**
   * Updates log retention flag for Logpull API.
   *
   * @example
   * ```ts
   * const retention =
   *   await client.logs.control.retention.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/logs/control/retention/flag`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets log retention flag for Logpull API.
   *
   * @example
   * ```ts
   * const retention = await client.logs.control.retention.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/logs/control/retention/flag`, e)._thenUnwrap((n) => n.result);
  }
}
let yp = class extends o {
  /**
   * Updates CMB config.
   *
   * @example
   * ```ts
   * const cmbConfig =
   *   await client.logs.control.cmb.config.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/logs/control/cmb/config`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes CMB config.
   *
   * @example
   * ```ts
   * const config = await client.logs.control.cmb.config.delete({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/logs/control/cmb/config`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Gets CMB config.
   *
   * @example
   * ```ts
   * const cmbConfig = await client.logs.control.cmb.config.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/logs/control/cmb/config`, e)._thenUnwrap((n) => n.result);
  }
};
class vo extends o {
  constructor() {
    super(...arguments), this.config = new yp(this._client);
  }
}
vo.Config = yp;
class sn extends o {
  constructor() {
    super(...arguments), this.retention = new mp(this._client), this.cmb = new vo(this._client);
  }
}
sn.Retention = mp;
sn.Cmb = vo;
class fp extends o {
  /**
   * Lists all fields available. The response is json object with key-value pairs,
   * where keys are field names, and values are descriptions.
   *
   * @example
   * ```ts
   * const field = await client.logs.received.fields.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/logs/received/fields`, e);
  }
}
class Lo extends o {
  constructor() {
    super(...arguments), this.fields = new fp(this._client);
  }
  /**
   * The `/received` api route allows customers to retrieve their edge HTTP logs. The
   * basic access pattern is "give me all the logs for zone Z for minute M", where
   * the minute M refers to the time records were received at Cloudflare's central
   * data center. `start` is inclusive, and `end` is exclusive. Because of that, to
   * get all data, at minutely cadence, starting at 10AM, the proper values are:
   * `start=2018-05-20T10:00:00Z&end=2018-05-20T10:01:00Z`, then
   * `start=2018-05-20T10:01:00Z&end=2018-05-20T10:02:00Z` and so on; the overlap
   * will be handled properly.
   *
   * @example
   * ```ts
   * const received = await client.logs.received.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   end: '2018-05-20T10:01:00Z',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/logs/received`, { query: n, ...e });
  }
}
Lo.Fields = fp;
let Te = class extends o {
  constructor() {
    super(...arguments), this.control = new sn(this._client), this.RayID = new $p(this._client), this.received = new Lo(this._client);
  }
};
Te.Control = sn;
Te.RayID = $p;
Te.Received = Lo;
class Io extends o {
  /**
   * Lists all active associations between the certificate and Cloudflare services.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const certificateAsssociation of client.mtlsCertificates.associations.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/mtls_certificates/${t}/associations`, ko, s);
  }
}
class ko extends d {
}
Io.CertificateAsssociationsSinglePage = ko;
class Ve extends o {
  constructor() {
    super(...arguments), this.associations = new Io(this._client);
  }
  /**
   * Upload a certificate that you want to use with mTLS-enabled Cloudflare services.
   *
   * @example
   * ```ts
   * const mtlsCertificate =
   *   await client.mtlsCertificates.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     ca: true,
   *     certificates:
   *       '-----BEGIN CERTIFICATE-----\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\n-----END CERTIFICATE-----',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/mtls_certificates`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all mTLS certificates.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const mtlsCertificate of client.mtlsCertificates.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/mtls_certificates`, Pp, e);
  }
  /**
   * Deletes the mTLS certificate unless the certificate is in use by one or more
   * Cloudflare services.
   *
   * @example
   * ```ts
   * const mtlsCertificate =
   *   await client.mtlsCertificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/mtls_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single mTLS certificate.
   *
   * @example
   * ```ts
   * const mtlsCertificate = await client.mtlsCertificates.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/mtls_certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Pp extends d {
}
Ve.MTLSCertificatesSinglePage = Pp;
Ve.Associations = Io;
Ve.CertificateAsssociationsSinglePage = ko;
class Oo extends o {
  /**
   * Create a new Cloud Integration (Closed Beta).
   */
  create(t, e) {
    const { account_id: s, forwarded: n, ...i } = t;
    return this._client.post(`/accounts/${s}/magic/cloud/providers`, {
      body: i,
      ...e,
      headers: { ...n != null ? { forwarded: n } : void 0, ...e?.headers }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a Cloud Integration (Closed Beta).
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/cloud/providers/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Cloud Integrations (Closed Beta).
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/cloud/providers`, Co, { query: n, ...e });
  }
  /**
   * Delete a Cloud Integration (Closed Beta).
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/magic/cloud/providers/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Run discovery for a Cloud Integration (Closed Beta).
   */
  discover(t, e, s) {
    const { account_id: n, v2: i } = e;
    return this._client.post(`/accounts/${n}/magic/cloud/providers/${t}/discover`, {
      query: { v2: i },
      ...s
    });
  }
  /**
   * Run discovery for all Cloud Integrations in an account (Closed Beta).
   */
  discoverAll(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/magic/cloud/providers/discover`, e);
  }
  /**
   * Update a Cloud Integration (Closed Beta).
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/magic/cloud/providers/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Read a Cloud Integration (Closed Beta).
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/magic/cloud/providers/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get initial configuration to complete Cloud Integration setup (Closed Beta).
   */
  initialSetup(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/magic/cloud/providers/${t}/initial_setup`, s)._thenUnwrap((i) => i.result);
  }
}
class Co extends d {
}
Oo.CloudIntegrationListResponsesSinglePage = Co;
let Zo = class extends o {
  /**
   * List resources in the Resource Catalog (Closed Beta).
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/cloud/resources`, To, { query: n, ...e });
  }
  /**
   * Export resources in the Resource Catalog as a JSON file (Closed Beta).
   */
  export(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/magic/cloud/resources/export`, {
      query: n,
      ...e,
      headers: { Accept: "application/octet-stream", ...e?.headers },
      __binaryResponse: !0
    });
  }
  /**
   * Read an resource from the Resource Catalog (Closed Beta).
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/magic/cloud/resources/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Preview Rego query result against the latest resource catalog (Closed Beta).
   */
  policyPreview(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/magic/cloud/resources/policy-preview`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}, To = class extends p {
};
Zo.ResourceListResponsesV4PagePaginationArray = To;
class Vo extends o {
  /**
   * List prebuilt catalog sync policies (Closed Beta).
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/cloud/catalog-syncs/prebuilt-policies`, Do, { query: n, ...e });
  }
}
class Do extends d {
}
Vo.PrebuiltPolicyListResponsesSinglePage = Do;
class De extends o {
  constructor() {
    super(...arguments), this.prebuiltPolicies = new Vo(this._client);
  }
  /**
   * Create a new Catalog Sync (Closed Beta).
   */
  create(t, e) {
    const { account_id: s, forwarded: n, ...i } = t;
    return this._client.post(`/accounts/${s}/magic/cloud/catalog-syncs`, {
      body: i,
      ...e,
      headers: { ...n != null ? { forwarded: n } : void 0, ...e?.headers }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a Catalog Sync (Closed Beta).
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/cloud/catalog-syncs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Catalog Syncs (Closed Beta).
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/cloud/catalog-syncs`, Eo, e);
  }
  /**
   * Delete a Catalog Sync (Closed Beta).
   */
  delete(t, e, s) {
    const { account_id: n, delete_destination: i } = e;
    return this._client.delete(`/accounts/${n}/magic/cloud/catalog-syncs/${t}`, {
      query: { delete_destination: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a Catalog Sync (Closed Beta).
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/magic/cloud/catalog-syncs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Read a Catalog Sync (Closed Beta).
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/magic/cloud/catalog-syncs/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Refresh a Catalog Sync's destination by running the sync policy against latest
   * resource catalog (Closed Beta).
   */
  refresh(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/magic/cloud/catalog-syncs/${t}/refresh`, s)._thenUnwrap((i) => i.result);
  }
}
class Eo extends d {
}
De.CatalogSyncListResponsesSinglePage = Eo;
De.PrebuiltPolicies = Vo;
De.PrebuiltPolicyListResponsesSinglePage = Do;
class bp extends o {
  /**
   * Update the Magic WAN Address Space (Closed Beta).
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/magic/cloud/onramps/magic_wan_address_space`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Read the Magic WAN Address Space (Closed Beta).
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/magic/cloud/onramps/magic_wan_address_space`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Update the Magic WAN Address Space (Closed Beta).
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/magic/cloud/onramps/magic_wan_address_space`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class nn extends o {
  constructor() {
    super(...arguments), this.addressSpaces = new bp(this._client);
  }
  /**
   * Create a new On-ramp (Closed Beta).
   */
  create(t, e) {
    const { account_id: s, forwarded: n, ...i } = t;
    return this._client.post(`/accounts/${s}/magic/cloud/onramps`, {
      body: i,
      ...e,
      headers: { ...n != null ? { forwarded: n } : void 0, ...e?.headers }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update an On-ramp (Closed Beta).
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/cloud/onramps/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List On-ramps (Closed Beta).
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/cloud/onramps`, Mo, { query: n, ...e });
  }
  /**
   * Delete an On-ramp (Closed Beta).
   */
  delete(t, e, s) {
    const { account_id: n, destroy: i, force: c } = e;
    return this._client.delete(`/accounts/${n}/magic/cloud/onramps/${t}`, {
      query: { destroy: i, force: c },
      ...s
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Apply an On-ramp (Closed Beta).
   */
  apply(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/magic/cloud/onramps/${t}/apply`, s);
  }
  /**
   * Update an On-ramp (Closed Beta).
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/magic/cloud/onramps/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Export an On-ramp to terraform ready file(s) (Closed Beta).
   */
  export(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/magic/cloud/onramps/${t}/export`, {
      ...s,
      headers: { Accept: "application/zip", ...s?.headers },
      __binaryResponse: !0
    });
  }
  /**
   * Read an On-ramp (Closed Beta).
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/magic/cloud/onramps/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Plan an On-ramp (Closed Beta).
   */
  plan(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/magic/cloud/onramps/${t}/plan`, s);
  }
}
class Mo extends d {
}
nn.OnRampListResponsesSinglePage = Mo;
nn.AddressSpaces = bp;
class q extends o {
  constructor() {
    super(...arguments), this.catalogSyncs = new De(this._client), this.onRamps = new nn(this._client), this.cloudIntegrations = new Oo(this._client), this.resources = new Zo(this._client);
  }
}
q.CatalogSyncs = De;
q.CatalogSyncListResponsesSinglePage = Eo;
q.OnRamps = nn;
q.OnRampListResponsesSinglePage = Mo;
q.CloudIntegrations = Oo;
q.CloudIntegrationListResponsesSinglePage = Co;
q.Resources = Zo;
q.ResourceListResponsesV4PagePaginationArray = To;
class Up extends o {
  /**
   * Lists default sampling, router IPs, warp devices, and rules for account.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.magicNetworkMonitoring.configs.full.get({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/mnm/config/full`, e)._thenUnwrap((n) => n.result);
  }
}
let No = class extends o {
  constructor() {
    super(...arguments), this.full = new Up(this._client);
  }
  /**
   * Create a new network monitoring configuration.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.magicNetworkMonitoring.configs.create({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *     default_sampling: 1,
   *     name: "cloudflare user's account",
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/mnm/config`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing network monitoring configuration, requires the entire
   * configuration to be updated at once.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.magicNetworkMonitoring.configs.update({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *     default_sampling: 1,
   *     name: "cloudflare user's account",
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/mnm/config`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete an existing network monitoring configuration.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.magicNetworkMonitoring.configs.delete({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *   });
   * ```
   */
  delete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/mnm/config`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Update fields in an existing network monitoring configuration.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.magicNetworkMonitoring.configs.edit({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *   });
   * ```
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/mnm/config`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists default sampling, router IPs and warp devices for account.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.magicNetworkMonitoring.configs.get({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/mnm/config`, e)._thenUnwrap((n) => n.result);
  }
};
No.Full = Up;
class xp extends o {
  /**
   * Update advertisement for rule.
   *
   * @example
   * ```ts
   * const advertisement =
   *   await client.magicNetworkMonitoring.rules.advertisements.edit(
   *     '2890e6fa406311ed9b5a23f70f6fb8cf',
   *     {
   *       account_id: '6f91088a406011ed95aed352566e8d4c',
   *       body: {},
   *     },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.patch(`/accounts/${n}/mnm/rules/${t}/advertisement`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let rn = class extends o {
  constructor() {
    super(...arguments), this.advertisements = new xp(this._client);
  }
  /**
   * Create network monitoring rules for account. Currently only supports creating a
   * single rule per API request.
   *
   * @example
   * ```ts
   * const magicNetworkMonitoringRule =
   *   await client.magicNetworkMonitoring.rules.create({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *     duration: '1m',
   *     name: 'my_rule_1',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/mnm/rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update network monitoring rules for account.
   *
   * @example
   * ```ts
   * const magicNetworkMonitoringRule =
   *   await client.magicNetworkMonitoring.rules.update({
   *     account_id: '6f91088a406011ed95aed352566e8d4c',
   *     duration: '1m',
   *     name: 'my_rule_1',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/mnm/rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists network monitoring rules for account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const magicNetworkMonitoringRule of client.magicNetworkMonitoring.rules.list(
   *   { account_id: '6f91088a406011ed95aed352566e8d4c' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/mnm/rules`, Yo, e);
  }
  /**
   * Delete a network monitoring rule for account.
   *
   * @example
   * ```ts
   * const magicNetworkMonitoringRule =
   *   await client.magicNetworkMonitoring.rules.delete(
   *     '2890e6fa406311ed9b5a23f70f6fb8cf',
   *     { account_id: '6f91088a406011ed95aed352566e8d4c' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/mnm/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update a network monitoring rule for account.
   *
   * @example
   * ```ts
   * const magicNetworkMonitoringRule =
   *   await client.magicNetworkMonitoring.rules.edit(
   *     '2890e6fa406311ed9b5a23f70f6fb8cf',
   *     { account_id: '6f91088a406011ed95aed352566e8d4c' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/mnm/rules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List a single network monitoring rule for account.
   *
   * @example
   * ```ts
   * const magicNetworkMonitoringRule =
   *   await client.magicNetworkMonitoring.rules.get(
   *     '2890e6fa406311ed9b5a23f70f6fb8cf',
   *     { account_id: '6f91088a406011ed95aed352566e8d4c' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/mnm/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Yo extends d {
}
rn.MagicNetworkMonitoringRulesSinglePage = Yo;
rn.Advertisements = xp;
let Sp = class extends o {
  /**
   * Generate authentication token for VPC flow logs export.
   *
   * @example
   * ```ts
   * const token =
   *   await client.magicNetworkMonitoring.vpcFlows.tokens.create(
   *     { account_id: '6f91088a406011ed95aed352566e8d4c' },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/mnm/vpc-flows/token`, e)._thenUnwrap((n) => n.result);
  }
};
class jo extends o {
  constructor() {
    super(...arguments), this.tokens = new Sp(this._client);
  }
}
jo.Tokens = Sp;
class re extends o {
  constructor() {
    super(...arguments), this.vpcFlows = new jo(this._client), this.configs = new No(this._client), this.rules = new rn(this._client);
  }
}
re.VPCFlows = jo;
re.Configs = No;
re.Rules = rn;
re.MagicNetworkMonitoringRulesSinglePage = Yo;
let Fo = class extends o {
  /**
   * Creates a new App for an account
   *
   * @example
   * ```ts
   * const app = await client.magicTransit.apps.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'Cloudflare Dashboard',
   *   type: 'Development',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/magic/apps`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an Account App
   *
   * @example
   * ```ts
   * const app = await client.magicTransit.apps.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/apps/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Apps associated with an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const appListResponse of client.magicTransit.apps.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/apps`, Go, e);
  }
  /**
   * Deletes specific Account App.
   *
   * @example
   * ```ts
   * const app = await client.magicTransit.apps.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/magic/apps/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an Account App
   *
   * @example
   * ```ts
   * const response = await client.magicTransit.apps.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/magic/apps/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class Go extends d {
}
Fo.AppListResponsesSinglePage = Go;
class zp extends o {
  /**
   * Updates a specific interconnect associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   *
   * @example
   * ```ts
   * const cfInterconnect =
   *   await client.magicTransit.cfInterconnects.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i, ...c } = e;
    return this._client.put(`/accounts/${n}/magic/cf_interconnects/${t}`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists interconnects associated with an account.
   *
   * @example
   * ```ts
   * const cfInterconnects =
   *   await client.magicTransit.cfInterconnects.list({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, "x-magic-new-hc-target": n } = t;
    return this._client.get(`/accounts/${s}/magic/cf_interconnects`, {
      ...e,
      headers: {
        ...n?.toString() != null ? { "x-magic-new-hc-target": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates multiple interconnects associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   *
   * @example
   * ```ts
   * const response =
   *   await client.magicTransit.cfInterconnects.bulkUpdate({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {},
   *   });
   * ```
   */
  bulkUpdate(t, e) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = t;
    return this._client.put(`/accounts/${s}/magic/cf_interconnects`, {
      body: n,
      ...e,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists details for a specific interconnect.
   *
   * @example
   * ```ts
   * const cfInterconnect =
   *   await client.magicTransit.cfInterconnects.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = e;
    return this._client.get(`/accounts/${n}/magic/cf_interconnects/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class Rp extends o {
  /**
   * Creates a new GRE tunnel. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   *
   * @example
   * ```ts
   * const greTunnel =
   *   await client.magicTransit.greTunnels.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     cloudflare_gre_endpoint: '203.0.113.1',
   *     customer_gre_endpoint: '203.0.113.1',
   *     interface_address: '192.0.2.0/31',
   *     name: 'GRE_1',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, "x-magic-new-hc-target": n, ...i } = t;
    return this._client.post(`/accounts/${s}/magic/gre_tunnels`, {
      body: i,
      ...e,
      headers: {
        ...n?.toString() != null ? { "x-magic-new-hc-target": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a specific GRE tunnel. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   *
   * @example
   * ```ts
   * const greTunnel =
   *   await client.magicTransit.greTunnels.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       cloudflare_gre_endpoint: '203.0.113.1',
   *       customer_gre_endpoint: '203.0.113.1',
   *       interface_address: '192.0.2.0/31',
   *       name: 'GRE_1',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i, ...c } = e;
    return this._client.put(`/accounts/${n}/magic/gre_tunnels/${t}`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists GRE tunnels associated with an account.
   *
   * @example
   * ```ts
   * const greTunnels =
   *   await client.magicTransit.greTunnels.list({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, "x-magic-new-hc-target": n } = t;
    return this._client.get(`/accounts/${s}/magic/gre_tunnels`, {
      ...e,
      headers: {
        ...n?.toString() != null ? { "x-magic-new-hc-target": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Disables and removes a specific static GRE tunnel. Use `?validate_only=true` as
   * an optional query parameter to only run validation without persisting changes.
   *
   * @example
   * ```ts
   * const greTunnel =
   *   await client.magicTransit.greTunnels.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = e;
    return this._client.delete(`/accounts/${n}/magic/gre_tunnels/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates multiple GRE tunnels. Use `?validate_only=true` as an optional query
   * parameter to only run validation without persisting changes.
   *
   * @example
   * ```ts
   * const response =
   *   await client.magicTransit.greTunnels.bulkUpdate({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {},
   *   });
   * ```
   */
  bulkUpdate(t, e) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = t;
    return this._client.put(`/accounts/${s}/magic/gre_tunnels`, {
      body: n,
      ...e,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists informtion for a specific GRE tunnel.
   *
   * @example
   * ```ts
   * const greTunnel = await client.magicTransit.greTunnels.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = e;
    return this._client.get(`/accounts/${n}/magic/gre_tunnels/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class Ap extends o {
  /**
   * Creates a new IPsec tunnel associated with an account. Use `?validate_only=true`
   * as an optional query parameter to only run validation without persisting
   * changes.
   *
   * @example
   * ```ts
   * const ipsecTunnel =
   *   await client.magicTransit.ipsecTunnels.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     cloudflare_endpoint: '203.0.113.1',
   *     interface_address: '192.0.2.0/31',
   *     name: 'IPsec_1',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, "x-magic-new-hc-target": n, ...i } = t;
    return this._client.post(`/accounts/${s}/magic/ipsec_tunnels`, {
      body: i,
      ...e,
      headers: {
        ...n?.toString() != null ? { "x-magic-new-hc-target": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a specific IPsec tunnel associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   *
   * @example
   * ```ts
   * const ipsecTunnel =
   *   await client.magicTransit.ipsecTunnels.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       cloudflare_endpoint: '203.0.113.1',
   *       interface_address: '192.0.2.0/31',
   *       name: 'IPsec_1',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i, ...c } = e;
    return this._client.put(`/accounts/${n}/magic/ipsec_tunnels/${t}`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists IPsec tunnels associated with an account.
   *
   * @example
   * ```ts
   * const ipsecTunnels =
   *   await client.magicTransit.ipsecTunnels.list({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, "x-magic-new-hc-target": n } = t;
    return this._client.get(`/accounts/${s}/magic/ipsec_tunnels`, {
      ...e,
      headers: {
        ...n?.toString() != null ? { "x-magic-new-hc-target": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Disables and removes a specific static IPsec Tunnel associated with an account.
   * Use `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   *
   * @example
   * ```ts
   * const ipsecTunnel =
   *   await client.magicTransit.ipsecTunnels.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = e;
    return this._client.delete(`/accounts/${n}/magic/ipsec_tunnels/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update multiple IPsec tunnels associated with an account. Use
   * `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes.
   *
   * @example
   * ```ts
   * const response =
   *   await client.magicTransit.ipsecTunnels.bulkUpdate({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {},
   *   });
   * ```
   */
  bulkUpdate(t, e) {
    const { account_id: s, body: n, "x-magic-new-hc-target": i } = t;
    return this._client.put(`/accounts/${s}/magic/ipsec_tunnels`, {
      body: n,
      ...e,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists details for a specific IPsec tunnel.
   *
   * @example
   * ```ts
   * const ipsecTunnel =
   *   await client.magicTransit.ipsecTunnels.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = e;
    return this._client.get(`/accounts/${n}/magic/ipsec_tunnels/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Generates a Pre Shared Key for a specific IPsec tunnel used in the IKE session.
   * Use `?validate_only=true` as an optional query parameter to only run validation
   * without persisting changes. After a PSK is generated, the PSK is immediately
   * persisted to Cloudflare's edge and cannot be retrieved later. Note the PSK in a
   * safe place.
   *
   * @example
   * ```ts
   * const response =
   *   await client.magicTransit.ipsecTunnels.pskGenerate(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       body: {},
   *     },
   *   );
   * ```
   */
  pskGenerate(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/magic/ipsec_tunnels/${t}/psk_generate`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let vp = class extends o {
  /**
   * Creates a new Magic static route. Use `?validate_only=true` as an optional query
   * parameter to run validation only without persisting changes.
   *
   * @example
   * ```ts
   * const route = await client.magicTransit.routes.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   nexthop: '203.0.113.1',
   *   prefix: '192.0.2.0/24',
   *   priority: 0,
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/magic/routes`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a specific Magic static route. Use `?validate_only=true` as an optional
   * query parameter to run validation only without persisting changes.
   *
   * @example
   * ```ts
   * const route = await client.magicTransit.routes.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     nexthop: '203.0.113.1',
   *     prefix: '192.0.2.0/24',
   *     priority: 0,
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/routes/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Magic static routes.
   *
   * @example
   * ```ts
   * const routes = await client.magicTransit.routes.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/magic/routes`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Disable and remove a specific Magic static route.
   *
   * @example
   * ```ts
   * const route = await client.magicTransit.routes.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/magic/routes/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update multiple Magic static routes. Use `?validate_only=true` as an optional
   * query parameter to run validation only without persisting changes. Only fields
   * for a route that need to be changed need be provided.
   *
   * @example
   * ```ts
   * const response =
   *   await client.magicTransit.routes.bulkUpdate({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     routes: [
   *       {
   *         id: '023e105f4ecef8ad9ca31a8372d0c353',
   *         nexthop: '203.0.113.1',
   *         prefix: '192.0.2.0/24',
   *         priority: 0,
   *       },
   *     ],
   *   });
   * ```
   */
  bulkUpdate(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/magic/routes`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Delete multiple Magic static routes.
   *
   * @example
   * ```ts
   * const response = await client.magicTransit.routes.empty({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  empty(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/magic/routes`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get a specific Magic static route.
   *
   * @example
   * ```ts
   * const route = await client.magicTransit.routes.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/magic/routes/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, Lp = class extends o {
  /**
   * Get latest Events
   *
   * @example
   * ```ts
   * const latests =
   *   await client.magicTransit.connectors.events.latest.list(
   *     'connector_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/magic/connectors/${t}/telemetry/events/latest`, s)._thenUnwrap((i) => i.result);
  }
}, Bo = class extends o {
  constructor() {
    super(...arguments), this.latest = new Lp(this._client);
  }
  /**
   * List Events
   *
   * @example
   * ```ts
   * const events =
   *   await client.magicTransit.connectors.events.list(
   *     'connector_id',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       from: 0,
   *       to: 0,
   *     },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/magic/connectors/${t}/telemetry/events`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get Event
   *
   * @example
   * ```ts
   * const event =
   *   await client.magicTransit.connectors.events.get(
   *     'connector_id',
   *     0,
   *     0,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n, i) {
    const { account_id: c } = n;
    return this._client.get(`/accounts/${c}/magic/connectors/${t}/telemetry/events/${e}.${s}`, i)._thenUnwrap((a) => a.result);
  }
};
Bo.Latest = Lp;
class Ip extends o {
  /**
   * Get latest Snapshots
   *
   * @example
   * ```ts
   * const latests =
   *   await client.magicTransit.connectors.snapshots.latest.list(
   *     'connector_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/magic/connectors/${t}/telemetry/snapshots/latest`, s)._thenUnwrap((i) => i.result);
  }
}
class Ho extends o {
  constructor() {
    super(...arguments), this.latest = new Ip(this._client);
  }
  /**
   * List Snapshots
   *
   * @example
   * ```ts
   * const snapshots =
   *   await client.magicTransit.connectors.snapshots.list(
   *     'connector_id',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       from: 0,
   *       to: 0,
   *     },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/magic/connectors/${t}/telemetry/snapshots`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get Snapshot
   *
   * @example
   * ```ts
   * const snapshot =
   *   await client.magicTransit.connectors.snapshots.get(
   *     'connector_id',
   *     0,
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/connectors/${t}/telemetry/snapshots/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
Ho.Latest = Ip;
let Ee = class extends o {
  constructor() {
    super(...arguments), this.events = new Bo(this._client), this.snapshots = new Ho(this._client);
  }
  /**
   * Add a connector to your account
   *
   * @example
   * ```ts
   * const connector =
   *   await client.magicTransit.connectors.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     device: {},
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/magic/connectors`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Replace Connector
   *
   * @example
   * ```ts
   * const connector =
   *   await client.magicTransit.connectors.update(
   *     'connector_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/connectors/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Connectors
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const connectorListResponse of client.magicTransit.connectors.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/connectors`, Wo, e);
  }
  /**
   * Remove a connector from your account
   *
   * @example
   * ```ts
   * const connector =
   *   await client.magicTransit.connectors.delete(
   *     'connector_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/magic/connectors/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Edit Connector to update specific properties
   *
   * @example
   * ```ts
   * const response = await client.magicTransit.connectors.edit(
   *   'connector_id',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/magic/connectors/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch Connector
   *
   * @example
   * ```ts
   * const connector = await client.magicTransit.connectors.get(
   *   'connector_id',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/magic/connectors/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Wo extends d {
}
Ee.ConnectorListResponsesSinglePage = Wo;
Ee.Events = Bo;
Ee.Snapshots = Ho;
class kp extends o {
  /**
   * Download PCAP information into a file. Response is a binary PCAP file.
   *
   * @example
   * ```ts
   * const download =
   *   await client.magicTransit.pcaps.download.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   *
   * const content = await download.blob();
   * console.log(content);
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/pcaps/${t}/download`, {
      ...s,
      headers: { Accept: "application/vnd.tcpdump.pcap", ...s?.headers },
      __binaryResponse: !0
    });
  }
}
class Ko extends o {
  /**
   * Adds an AWS or GCP bucket to use with full packet captures.
   *
   * @example
   * ```ts
   * const ownership =
   *   await client.magicTransit.pcaps.ownership.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     destination_conf: 's3://pcaps-bucket?region=us-east-1',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/pcaps/ownership`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes buckets added to the packet captures API.
   *
   * @example
   * ```ts
   * await client.magicTransit.pcaps.ownership.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/pcaps/ownership/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * List all buckets configured for use with PCAPs API.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ownership of client.magicTransit.pcaps.ownership.get(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/pcaps/ownership`, Xo, e);
  }
  /**
   * Validates buckets added to the packet captures API.
   *
   * @example
   * ```ts
   * const ownership =
   *   await client.magicTransit.pcaps.ownership.validate({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     destination_conf: 's3://pcaps-bucket?region=us-east-1',
   *     ownership_challenge:
   *       'ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt',
   *   });
   * ```
   */
  validate(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/pcaps/ownership/validate`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Xo extends d {
}
Ko.OwnershipsSinglePage = Xo;
class ce extends o {
  constructor() {
    super(...arguments), this.ownership = new Ko(this._client), this.download = new kp(this._client);
  }
  /**
   * Create new PCAP request for account.
   *
   * @example
   * ```ts
   * const pcap = await client.magicTransit.pcaps.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   packet_limit: 10000,
   *   system: 'magic-transit',
   *   time_limit: 300,
   *   type: 'simple',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/pcaps`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all packet capture requests for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const pcapListResponse of client.magicTransit.pcaps.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/pcaps`, Qo, e);
  }
  /**
   * Get information for a PCAP request by id.
   *
   * @example
   * ```ts
   * const pcap = await client.magicTransit.pcaps.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/pcaps/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Stop full PCAP
   *
   * @example
   * ```ts
   * await client.magicTransit.pcaps.stop(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  stop(t, e, s) {
    const { account_id: n } = e;
    return this._client.put(`/accounts/${n}/pcaps/${t}/stop`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
}
class Qo extends d {
}
ce.PCAPListResponsesSinglePage = Qo;
ce.OwnershipResource = Ko;
ce.OwnershipsSinglePage = Xo;
ce.Download = kp;
class Jo extends o {
  /**
   * Creates a new Site ACL.
   *
   * @example
   * ```ts
   * const acl = await client.magicTransit.sites.acls.create(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     lan_1: { lan_id: 'lan_id' },
   *     lan_2: { lan_id: 'lan_id' },
   *     name: 'PIN Pad - Cash Register',
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/magic/sites/${t}/acls`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update a specific Site ACL.
   *
   * @example
   * ```ts
   * const acl = await client.magicTransit.sites.acls.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/magic/sites/${t}/acls/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists Site ACLs associated with an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const acl of client.magicTransit.sites.acls.list(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${t}/acls`, qo, s);
  }
  /**
   * Remove a specific Site ACL.
   *
   * @example
   * ```ts
   * const acl = await client.magicTransit.sites.acls.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/magic/sites/${t}/acls/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site ACL.
   *
   * @example
   * ```ts
   * const acl = await client.magicTransit.sites.acls.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/magic/sites/${t}/acls/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a specific Site ACL.
   *
   * @example
   * ```ts
   * const acl = await client.magicTransit.sites.acls.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/sites/${t}/acls/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class qo extends d {
}
Jo.ACLsSinglePage = qo;
class ta extends o {
  /**
   * Creates a new Site LAN. If the site is in high availability mode,
   * static_addressing is required along with secondary and virtual address.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const lan of client.magicTransit.sites.lans.create(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     physport: 1,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${t}/lans`, Ps, {
      body: i,
      method: "post",
      ...s
    });
  }
  /**
   * Update a specific Site LAN.
   *
   * @example
   * ```ts
   * const lan = await client.magicTransit.sites.lans.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/magic/sites/${t}/lans/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists Site LANs associated with an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const lan of client.magicTransit.sites.lans.list(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${t}/lans`, Ps, s);
  }
  /**
   * Remove a specific Site LAN.
   *
   * @example
   * ```ts
   * const lan = await client.magicTransit.sites.lans.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/magic/sites/${t}/lans/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site LAN.
   *
   * @example
   * ```ts
   * const lan = await client.magicTransit.sites.lans.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/magic/sites/${t}/lans/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a specific Site LAN.
   *
   * @example
   * ```ts
   * const lan = await client.magicTransit.sites.lans.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/sites/${t}/lans/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Ps extends d {
}
ta.LANsSinglePage = Ps;
class ea extends o {
  /**
   * Creates a new Site WAN.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const wan of client.magicTransit.sites.wans.create(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     physport: 1,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${t}/wans`, bs, {
      body: i,
      method: "post",
      ...s
    });
  }
  /**
   * Update a specific Site WAN.
   *
   * @example
   * ```ts
   * const wan = await client.magicTransit.sites.wans.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/magic/sites/${t}/wans/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists Site WANs associated with an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const wan of client.magicTransit.sites.wans.list(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/magic/sites/${t}/wans`, bs, s);
  }
  /**
   * Remove a specific Site WAN.
   *
   * @example
   * ```ts
   * const wan = await client.magicTransit.sites.wans.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/magic/sites/${t}/wans/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patch a specific Site WAN.
   *
   * @example
   * ```ts
   * const wan = await client.magicTransit.sites.wans.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/magic/sites/${t}/wans/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a specific Site WAN.
   *
   * @example
   * ```ts
   * const wan = await client.magicTransit.sites.wans.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/magic/sites/${t}/wans/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class bs extends d {
}
ea.WANsSinglePage = bs;
class ut extends o {
  constructor() {
    super(...arguments), this.acls = new Jo(this._client), this.lans = new ta(this._client), this.wans = new ea(this._client);
  }
  /**
   * Creates a new Site
   *
   * @example
   * ```ts
   * const site = await client.magicTransit.sites.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'site_1',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/magic/sites`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a specific Site.
   *
   * @example
   * ```ts
   * const site = await client.magicTransit.sites.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/magic/sites/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Sites associated with an account. Use connectorid query param to return
   * sites where connectorid matches either site.ConnectorID or
   * site.SecondaryConnectorID.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const site of client.magicTransit.sites.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/magic/sites`, sa, {
      query: n,
      ...e
    });
  }
  /**
   * Remove a specific Site.
   *
   * @example
   * ```ts
   * const site = await client.magicTransit.sites.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/magic/sites/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patch a specific Site.
   *
   * @example
   * ```ts
   * const site = await client.magicTransit.sites.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/magic/sites/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a specific Site.
   *
   * @example
   * ```ts
   * const site = await client.magicTransit.sites.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, "x-magic-new-hc-target": i } = e;
    return this._client.get(`/accounts/${n}/magic/sites/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "x-magic-new-hc-target": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class sa extends d {
}
ut.SitesSinglePage = sa;
ut.ACLs = Jo;
ut.ACLsSinglePage = qo;
ut.LANs = ta;
ut.LANsSinglePage = Ps;
ut.WANs = ea;
ut.WANsSinglePage = bs;
class C extends o {
  constructor() {
    super(...arguments), this.apps = new Fo(this._client), this.cfInterconnects = new zp(this._client), this.greTunnels = new Rp(this._client), this.ipsecTunnels = new Ap(this._client), this.routes = new vp(this._client), this.sites = new ut(this._client), this.connectors = new Ee(this._client), this.pcaps = new ce(this._client);
  }
}
C.Apps = Fo;
C.AppListResponsesSinglePage = Go;
C.CfInterconnects = zp;
C.GRETunnels = Rp;
C.IPSECTunnels = Ap;
C.Routes = vp;
C.Sites = ut;
C.SitesSinglePage = sa;
C.Connectors = Ee;
C.ConnectorListResponsesSinglePage = Wo;
C.PCAPs = ce;
C.PCAPListResponsesSinglePage = Qo;
class Op extends o {
  /**
   * Fetches a list of all Managed Transforms.
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/managed_headers`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Disables all Managed Transforms.
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/managed_headers`, {
      ...e,
      headers: { Accept: "*/*", ...e?.headers }
    });
  }
  /**
   * Updates the status of one or more Managed Transforms.
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/managed_headers`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
}
class na extends o {
  /**
   * Accept or reject this account invitation.
   *
   * @example
   * ```ts
   * const membership = await client.memberships.update(
   *   '4536bcfad5faccb111b47003c79917fa',
   *   { status: 'accepted' },
   * );
   * ```
   */
  update(t, e, s) {
    return this._client.put(`/memberships/${t}`, { body: e, ...s })._thenUnwrap((n) => n.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/memberships", Cp, { query: t, ...e });
  }
  /**
   * Remove the associated member from an account.
   *
   * @example
   * ```ts
   * const membership = await client.memberships.delete(
   *   '4536bcfad5faccb111b47003c79917fa',
   * );
   * ```
   */
  delete(t, e) {
    return this._client.delete(`/memberships/${t}`, e)._thenUnwrap((s) => s.result);
  }
  /**
   * Get a specific membership.
   *
   * @example
   * ```ts
   * const membership = await client.memberships.get(
   *   '4536bcfad5faccb111b47003c79917fa',
   * );
   * ```
   */
  get(t, e) {
    return this._client.get(`/memberships/${t}`, e)._thenUnwrap((s) => s.result);
  }
}
class Cp extends p {
}
na.MembershipsV4PagePaginationArray = Cp;
class Zp extends o {
  /**
   * Create a new CNI object
   *
   * @example
   * ```ts
   * const cni = await client.networkInterconnects.cnis.create({
   *   account_id: 'account_id',
   *   account: 'account',
   *   interconnect: 'interconnect',
   *   magic: {
   *     conduit_name: 'conduit_name',
   *     description: 'description',
   *     mtu: 0,
   *   },
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cni/cnis`, { body: n, ...e });
  }
  /**
   * Modify stored information about a CNI object
   *
   * @example
   * ```ts
   * const cni = await client.networkInterconnects.cnis.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     account_id: 'account_id',
   *     id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     account: 'account',
   *     cust_ip: '192.168.3.4/31',
   *     interconnect: 'interconnect',
   *     magic: {
   *       conduit_name: 'conduit_name',
   *       description: 'description',
   *       mtu: 0,
   *     },
   *     p2p_ip: '192.168.3.4/31',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/cni/cnis/${t}`, { body: i, ...s });
  }
  /**
   * List existing CNI objects
   *
   * @example
   * ```ts
   * const cnis = await client.networkInterconnects.cnis.list({
   *   account_id: 'account_id',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/cni/cnis`, { query: n, ...e });
  }
  /**
   * Delete a specified CNI object
   *
   * @example
   * ```ts
   * await client.networkInterconnects.cnis.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cni/cnis/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Get information about a CNI object
   *
   * @example
   * ```ts
   * const cni = await client.networkInterconnects.cnis.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cni/cnis/${t}`, s);
  }
}
class Tp extends o {
  /**
   * Create a new interconnect
   *
   * @example
   * ```ts
   * const interconnect =
   *   await client.networkInterconnects.interconnects.create({
   *     account_id: 'account_id',
   *     account: 'account',
   *     slot_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     type: 'type',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cni/interconnects`, { body: n, ...e });
  }
  /**
   * List existing interconnects
   *
   * @example
   * ```ts
   * const interconnects =
   *   await client.networkInterconnects.interconnects.list({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/cni/interconnects`, { query: n, ...e });
  }
  /**
   * Delete an interconnect object
   *
   * @example
   * ```ts
   * await client.networkInterconnects.interconnects.delete(
   *   'icon',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cni/interconnects/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Get information about an interconnect object
   *
   * @example
   * ```ts
   * const interconnect =
   *   await client.networkInterconnects.interconnects.get(
   *     'icon',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cni/interconnects/${t}`, s);
  }
  /**
   * Generate the Letter of Authorization (LOA) for a given interconnect
   *
   * @example
   * ```ts
   * await client.networkInterconnects.interconnects.loa(
   *   'icon',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  loa(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cni/interconnects/${t}/loa`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Get the current status of an interconnect object
   *
   * @example
   * ```ts
   * const response =
   *   await client.networkInterconnects.interconnects.status(
   *     'icon',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  status(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cni/interconnects/${t}/status`, s);
  }
}
let Vp = class extends o {
  /**
   * Update the current settings for the active account
   *
   * @example
   * ```ts
   * const setting =
   *   await client.networkInterconnects.settings.update({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/cni/settings`, { body: n, ...e });
  }
  /**
   * Get the current settings for the active account
   *
   * @example
   * ```ts
   * const setting =
   *   await client.networkInterconnects.settings.get({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/cni/settings`, e);
  }
};
class Dp extends o {
  /**
   * Retrieve a list of all slots matching the specified parameters
   *
   * @example
   * ```ts
   * const slots = await client.networkInterconnects.slots.list({
   *   account_id: 'account_id',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/cni/slots`, { query: n, ...e });
  }
  /**
   * Get information about the specified slot
   *
   * @example
   * ```ts
   * const slot = await client.networkInterconnects.slots.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cni/slots/${t}`, s);
  }
}
class oe extends o {
  constructor() {
    super(...arguments), this.cnis = new Zp(this._client), this.interconnects = new Tp(this._client), this.settings = new Vp(this._client), this.slots = new Dp(this._client);
  }
}
oe.CNIs = Zp;
oe.Interconnects = Tp;
oe.Settings = Vp;
oe.Slots = Dp;
class ia extends o {
  /**
   * Create an Origin CA certificate. You can use an Origin CA Key as your User
   * Service Key or an API token when calling this endpoint ([see above](#requests)).
   *
   * @example
   * ```ts
   * const originCACertificate =
   *   await client.originCACertificates.create();
   * ```
   */
  create(t, e) {
    return this._client.post("/certificates", { body: t, ...e })._thenUnwrap((s) => s.result);
  }
  /**
   * List all existing Origin CA certificates for a given zone. You can use an Origin
   * CA Key as your User Service Key or an API token when calling this endpoint
   * ([see above](#requests)).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const originCACertificate of client.originCACertificates.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    return this._client.getAPIList("/certificates", Ep, {
      query: t,
      ...e
    });
  }
  /**
   * Revoke an existing Origin CA certificate by its serial number. You can use an
   * Origin CA Key as your User Service Key or an API token when calling this
   * endpoint ([see above](#requests)).
   *
   * @example
   * ```ts
   * const originCACertificate =
   *   await client.originCACertificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *   );
   * ```
   */
  delete(t, e) {
    return this._client.delete(`/certificates/${t}`, e)._thenUnwrap((s) => s.result);
  }
  /**
   * Get an existing Origin CA certificate by its serial number. You can use an
   * Origin CA Key as your User Service Key or an API token when calling this
   * endpoint ([see above](#requests)).
   *
   * @example
   * ```ts
   * const originCACertificate =
   *   await client.originCACertificates.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *   );
   * ```
   */
  get(t, e) {
    return this._client.get(`/certificates/${t}`, e)._thenUnwrap((s) => s.result);
  }
}
class Ep extends p {
}
ia.OriginCACertificatesV4PagePaginationArray = Ep;
class Mp extends o {
  /**
   * Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when
   * connecting to your origin. Preferred instructs Cloudflare to opportunistically
   * send a Post-Quantum keyshare in the first message to the origin (for fastest
   * connections when the origin supports and prefers PQ), supported means that PQ
   * algorithms are advertised but only used when requested by the origin, and off
   * means that PQ algorithms are not advertised
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/cache/origin_post_quantum_encryption`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when
   * connecting to your origin. Preferred instructs Cloudflare to opportunistically
   * send a Post-Quantum keyshare in the first message to the origin (for fastest
   * connections when the origin supports and prefers PQ), supported means that PQ
   * algorithms are advertised but only used when requested by the origin, and off
   * means that PQ algorithms are not advertised
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/cache/origin_post_quantum_encryption`, e)._thenUnwrap((n) => n.result);
  }
}
let Np = class extends o {
  /**
   * Enable or disable zone-level authenticated origin pulls. 'enabled' should be set
   * true either before/after the certificate is uploaded to see the certificate in
   * use.
   *
   * @example
   * ```ts
   * const setting =
   *   await client.originTLSClientAuth.settings.update({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     enabled: true,
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/origin_tls_client_auth/settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get whether zone-level authenticated origin pulls is enabled or not. It is false
   * by default.
   *
   * @example
   * ```ts
   * const setting =
   *   await client.originTLSClientAuth.settings.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/origin_tls_client_auth/settings`, e)._thenUnwrap((n) => n.result);
  }
}, ra = class extends o {
  /**
   * Upload a certificate to be used for client authentication on a hostname. 10
   * hostname certificates per zone are allowed.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.originTLSClientAuth.hostnames.certificates.create(
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       certificate:
   *         '-----BEGIN CERTIFICATE-----\nMIIDtTCCAp2gAwIBAgIJAMHAwfXZ5/PWMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\nBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\naWRnaXRzIFB0eSBMdGQwHhcNMTYwODI0MTY0MzAxWhcNMTYxMTIyMTY0MzAxWjBF\nMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\nCgKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmGdtcGbg/1\nCGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKnabIRuGvB\nKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpidtnKX/a+5\n0GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+pyFxIXjbEI\ndZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pEewooaeO2\nizNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABo4GnMIGkMB0GA1UdDgQWBBT/LbE4\n9rWf288N6sJA5BRb6FJIGDB1BgNVHSMEbjBsgBT/LbE49rWf288N6sJA5BRb6FJI\nGKFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMHAwfXZ5/PWMAwGA1UdEwQF\nMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHHFwl0tH0quUYZYO0dZYt4R7SJ0pCm2\n2satiyzHl4OnXcHDpekAo7/a09c6Lz6AU83cKy/+x3/djYHXWba7HpEu0dR3ugQP\nMlr4zrhd9xKZ0KZKiYmtJH+ak4OM4L3FbT0owUZPyjLSlhMtJVcoRp5CJsjAMBUG\nSvD8RX+T01wzox/Qb+lnnNnOlaWpqu8eoOenybxKp1a9ULzIVvN/LAcc+14vioFq\n2swRWtmocBAs8QR9n4uvbpiYvS8eYueDCWMM4fvFfBhaDZ3N9IbtySh3SpFdQDhw\nYbjM2rxXiyLGxB4Bol7QTv4zHif7Zt89FReT/NBy4rzaskDJY5L6xmY=\n-----END CERTIFICATE-----\n',
   *       private_key:
   *         '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n',
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/origin_tls_client_auth/hostnames/certificates`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List Certificates
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const certificateListResponse of client.originTLSClientAuth.hostnames.certificates.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/origin_tls_client_auth/hostnames/certificates`, ca, e);
  }
  /**
   * Delete Hostname Client Certificate
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.originTLSClientAuth.hostnames.certificates.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/origin_tls_client_auth/hostnames/certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get the certificate by ID to be used for client authentication on a hostname.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.originTLSClientAuth.hostnames.certificates.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/hostnames/certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, ca = class extends d {
};
ra.CertificateListResponsesSinglePage = ca;
let Me = class extends o {
  constructor() {
    super(...arguments), this.certificates = new ra(this._client);
  }
  /**
   * Associate a hostname to a certificate and enable, disable or invalidate the
   * association. If disabled, client certificate will not be sent to the hostname
   * even if activated at the zone level. 100 maximum associations on a single
   * certificate are allowed. Note: Use a null value for parameter _enabled_ to
   * invalidate the association.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const hostnameUpdateResponse of client.originTLSClientAuth.hostnames.update(
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     config: [{}],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/origin_tls_client_auth/hostnames`, oa, { body: n, method: "put", ...e });
  }
  /**
   * Get the Hostname Status for Client Authentication
   *
   * @example
   * ```ts
   * const authenticatedOriginPull =
   *   await client.originTLSClientAuth.hostnames.get(
   *     'app.example.com',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/hostnames/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class oa extends d {
}
Me.HostnameUpdateResponsesSinglePage = oa;
Me.Certificates = ra;
Me.CertificateListResponsesSinglePage = ca;
class ae extends o {
  constructor() {
    super(...arguments), this.hostnames = new Me(this._client), this.settings = new Np(this._client);
  }
  /**
   * Upload your own certificate you want Cloudflare to use for edge-to-origin
   * communication to override the shared certificate. Please note that it is
   * important to keep only one certificate active. Also, make sure to enable
   * zone-level authenticated origin pulls by making a PUT call to settings endpoint
   * to see the uploaded certificate in use.
   *
   * @example
   * ```ts
   * const originTLSClientAuth =
   *   await client.originTLSClientAuth.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     certificate:
   *       '-----BEGIN CERTIFICATE-----\nMIIDtTCCAp2gAwIBAgIJAMHAwfXZ5/PWMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV\nBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX\naWRnaXRzIFB0eSBMdGQwHhcNMTYwODI0MTY0MzAxWhcNMTYxMTIyMTY0MzAxWjBF\nMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50\nZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB\nCgKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmGdtcGbg/1\nCGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKnabIRuGvB\nKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpidtnKX/a+5\n0GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+pyFxIXjbEI\ndZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pEewooaeO2\nizNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABo4GnMIGkMB0GA1UdDgQWBBT/LbE4\n9rWf288N6sJA5BRb6FJIGDB1BgNVHSMEbjBsgBT/LbE49rWf288N6sJA5BRb6FJI\nGKFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV\nBAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMHAwfXZ5/PWMAwGA1UdEwQF\nMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHHFwl0tH0quUYZYO0dZYt4R7SJ0pCm2\n2satiyzHl4OnXcHDpekAo7/a09c6Lz6AU83cKy/+x3/djYHXWba7HpEu0dR3ugQP\nMlr4zrhd9xKZ0KZKiYmtJH+ak4OM4L3FbT0owUZPyjLSlhMtJVcoRp5CJsjAMBUG\nSvD8RX+T01wzox/Qb+lnnNnOlaWpqu8eoOenybxKp1a9ULzIVvN/LAcc+14vioFq\n2swRWtmocBAs8QR9n4uvbpiYvS8eYueDCWMM4fvFfBhaDZ3N9IbtySh3SpFdQDhw\nYbjM2rxXiyLGxB4Bol7QTv4zHif7Zt89FReT/NBy4rzaskDJY5L6xmY=\n-----END CERTIFICATE-----\n',
   *     private_key:
   *       '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAwQHoetcl9+5ikGzV6cMzWtWPJHqXT3wpbEkRU9Yz7lgvddmG\ndtcGbg/1CGZu0jJGkMoppoUo4c3dts3iwqRYmBikUP77wwY2QGmDZw2FvkJCJlKn\nabIRuGvBKwzESIXgKk2016aTP6/dAjEHyo6SeoK8lkIySUvK0fyOVlsiEsCmOpid\ntnKX/a+50GjB79CJH4ER2lLVZnhePFR/zUOyPxZQQ4naHf7yu/b5jhO0f8fwt+py\nFxIXjbEIdZliWRkRMtzrHOJIhrmJ2A1J7iOrirbbwillwjjNVUWPf3IJ3M12S9pE\newooaeO2izNTERcG9HzAacbVRn2Y2SWIyT/18QIDAQABAoIBACbhTYXBZYKmYPCb\nHBR1IBlCQA2nLGf0qRuJNJZg5iEzXows/6tc8YymZkQE7nolapWsQ+upk2y5Xdp/\naxiuprIs9JzkYK8Ox0r+dlwCG1kSW+UAbX0bQ/qUqlsTvU6muVuMP8vZYHxJ3wmb\n+ufRBKztPTQ/rYWaYQcgC0RWI20HTFBMxlTAyNxYNWzX7RKFkGVVyB9RsAtmcc8g\n+j4OdosbfNoJPS0HeIfNpAznDfHKdxDk2Yc1tV6RHBrC1ynyLE9+TaflIAdo2MVv\nKLMLq51GqYKtgJFIlBRPQqKoyXdz3fGvXrTkf/WY9QNq0J1Vk5ERePZ54mN8iZB7\n9lwy/AkCgYEA6FXzosxswaJ2wQLeoYc7ceaweX/SwTvxHgXzRyJIIT0eJWgx13Wo\n/WA3Iziimsjf6qE+SI/8laxPp2A86VMaIt3Z3mJN/CqSVGw8LK2AQst+OwdPyDMu\niacE8lj/IFGC8mwNUAb9CzGU3JpU4PxxGFjS/eMtGeRXCWkK4NE+G08CgYEA1Kp9\nN2JrVlqUz+gAX+LPmE9OEMAS9WQSQsfCHGogIFDGGcNf7+uwBM7GAaSJIP01zcoe\nVAgWdzXCv3FLhsaZoJ6RyLOLay5phbu1iaTr4UNYm5WtYTzMzqh8l1+MFFDl9xDB\nvULuCIIrglM5MeS/qnSg1uMoH2oVPj9TVst/ir8CgYEAxrI7Ws9Zc4Bt70N1As+U\nlySjaEVZCMkqvHJ6TCuVZFfQoE0r0whdLdRLU2PsLFP+q7qaeZQqgBaNSKeVcDYR\n9B+nY/jOmQoPewPVsp/vQTCnE/R81spu0mp0YI6cIheT1Z9zAy322svcc43JaWB7\nmEbeqyLOP4Z4qSOcmghZBSECgYACvR9Xs0DGn+wCsW4vze/2ei77MD4OQvepPIFX\ndFZtlBy5ADcgE9z0cuVB6CiL8DbdK5kwY9pGNr8HUCI03iHkW6Zs+0L0YmihfEVe\nPG19PSzK9CaDdhD9KFZSbLyVFmWfxOt50H7YRTTiPMgjyFpfi5j2q348yVT0tEQS\nfhRqaQKBgAcWPokmJ7EbYQGeMbS7HC8eWO/RyamlnSffdCdSc7ue3zdVJxpAkQ8W\nqu80pEIF6raIQfAf8MXiiZ7auFOSnHQTXUbhCpvDLKi0Mwq3G8Pl07l+2s6dQG6T\nlv6XTQaMyf6n1yjzL+fzDrH3qXMxHMO/b13EePXpDMpY7HQpoLDi\n-----END RSA PRIVATE KEY-----\n',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/origin_tls_client_auth`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List Certificates
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const originTLSClientAuthListResponse of client.originTLSClientAuth.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/origin_tls_client_auth`, Yp, e);
  }
  /**
   * Delete Certificate
   *
   * @example
   * ```ts
   * const originTLSClientAuth =
   *   await client.originTLSClientAuth.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/origin_tls_client_auth/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Certificate Details
   *
   * @example
   * ```ts
   * const originTLSClientAuth =
   *   await client.originTLSClientAuth.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/origin_tls_client_auth/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Yp extends d {
}
ae.OriginTLSClientAuthListResponsesSinglePage = Yp;
ae.Hostnames = Me;
ae.HostnameUpdateResponsesSinglePage = oa;
ae.Settings = Np;
class jp extends o {
  /**
   * Creates a new Page Rule.
   *
   * @example
   * ```ts
   * const pageRule = await client.pageRules.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   actions: [{}],
   *   targets: [{}],
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/pagerules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Replaces the configuration of an existing Page Rule. The configuration of the
   * updated Page Rule will exactly match the data passed in the API request.
   *
   * @example
   * ```ts
   * const pageRule = await client.pageRules.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     actions: [{}],
   *     targets: [{}],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/pagerules/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Page Rules in a zone.
   *
   * @example
   * ```ts
   * const pageRules = await client.pageRules.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/pagerules`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes an existing Page Rule.
   *
   * @example
   * ```ts
   * const pageRule = await client.pageRules.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/pagerules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates one or more fields of an existing Page Rule.
   *
   * @example
   * ```ts
   * const pageRule = await client.pageRules.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/pagerules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the details of a Page Rule.
   *
   * @example
   * ```ts
   * const pageRule = await client.pageRules.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/pagerules/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
let aa = class extends o {
  /**
   * Lists all connections detected by Page Shield.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const connection of client.pageShield.connections.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/page_shield/connections`, ua, {
      query: n,
      ...e
    });
  }
  /**
   * Fetches a connection detected by Page Shield by connection ID.
   *
   * @example
   * ```ts
   * const connection = await client.pageShield.connections.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/page_shield/connections/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class ua extends d {
}
aa.ConnectionsSinglePage = ua;
class la extends o {
  /**
   * Lists all cookies collected by Page Shield.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cookieListResponse of client.pageShield.cookies.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/page_shield/cookies`, da, {
      query: n,
      ...e
    });
  }
  /**
   * Fetches a cookie collected by Page Shield by cookie ID.
   *
   * @example
   * ```ts
   * const cookie = await client.pageShield.cookies.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/page_shield/cookies/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class da extends d {
}
la.CookieListResponsesSinglePage = da;
let ha = class extends o {
  /**
   * Create a Page Shield policy.
   *
   * @example
   * ```ts
   * const policy = await client.pageShield.policies.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   action: 'allow',
   *   description: 'Checkout page CSP policy',
   *   enabled: true,
   *   expression:
   *     'ends_with(http.request.uri.path, "/checkout")',
   *   value: "script-src 'none';",
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/page_shield/policies`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a Page Shield policy by ID.
   *
   * @example
   * ```ts
   * const policy = await client.pageShield.policies.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/page_shield/policies/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all Page Shield policies.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const policyListResponse of client.pageShield.policies.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/page_shield/policies`, _a, e);
  }
  /**
   * Delete a Page Shield policy by ID.
   *
   * @example
   * ```ts
   * await client.pageShield.policies.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/page_shield/policies/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Fetches a Page Shield policy by ID.
   *
   * @example
   * ```ts
   * const policy = await client.pageShield.policies.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/page_shield/policies/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, _a = class extends d {
};
ha.PolicyListResponsesSinglePage = _a;
let ga = class extends o {
  /**
   * Lists all scripts detected by Page Shield.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const script of client.pageShield.scripts.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/page_shield/scripts`, pa, {
      query: n,
      ...e
    });
  }
  /**
   * Fetches a script detected by Page Shield by script ID.
   *
   * @example
   * ```ts
   * const script = await client.pageShield.scripts.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/page_shield/scripts/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, pa = class extends d {
};
ga.ScriptsSinglePage = pa;
class tt extends o {
  constructor() {
    super(...arguments), this.policies = new ha(this._client), this.connections = new aa(this._client), this.scripts = new ga(this._client), this.cookies = new la(this._client);
  }
  /**
   * Updates Page Shield settings.
   *
   * @example
   * ```ts
   * const pageShield = await client.pageShield.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/page_shield`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the Page Shield settings.
   *
   * @example
   * ```ts
   * const setting = await client.pageShield.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/page_shield`, e)._thenUnwrap((n) => n.result);
  }
}
tt.Policies = ha;
tt.PolicyListResponsesSinglePage = _a;
tt.Connections = aa;
tt.ConnectionsSinglePage = ua;
tt.Scripts = ga;
tt.ScriptsSinglePage = pa;
tt.Cookies = la;
tt.CookieListResponsesSinglePage = da;
let wa = class extends o {
  /**
   * Add a new domain for the Pages project.
   *
   * @example
   * ```ts
   * const domain = await client.pages.projects.domains.create(
   *   'this-is-my-project-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/pages/projects/${t}/domains`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of all domains associated with a Pages project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const domainListResponse of client.pages.projects.domains.list(
   *   'this-is-my-project-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/pages/projects/${t}/domains`, $a, s);
  }
  /**
   * Delete a Pages project's domain.
   *
   * @example
   * ```ts
   * const domain = await client.pages.projects.domains.delete(
   *   'this-is-my-project-01',
   *   'this-is-my-domain-01.com',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/pages/projects/${t}/domains/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Retry the validation status of a single domain.
   *
   * @example
   * ```ts
   * const response = await client.pages.projects.domains.edit(
   *   'this-is-my-project-01',
   *   'this-is-my-domain-01.com',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {},
   *   },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.patch(`/accounts/${i}/pages/projects/${t}/domains/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch a single domain.
   *
   * @example
   * ```ts
   * const domain = await client.pages.projects.domains.get(
   *   'this-is-my-project-01',
   *   'this-is-my-domain-01.com',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/pages/projects/${t}/domains/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class $a extends d {
}
wa.DomainListResponsesSinglePage = $a;
let Fp = class extends o {
  /**
   * Fetch deployment logs for a project.
   *
   * @example
   * ```ts
   * const log =
   *   await client.pages.projects.deployments.history.logs.get(
   *     'this-is-my-project-01',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/pages/projects/${t}/deployments/${e}/history/logs`, n)._thenUnwrap((c) => c.result);
  }
}, ma = class extends o {
  constructor() {
    super(...arguments), this.logs = new Fp(this._client);
  }
};
ma.Logs = Fp;
let ya = class extends o {
  constructor() {
    super(...arguments), this.history = new ma(this._client);
  }
  /**
   * Start a new deployment from production. The repository and account must have
   * already been authorized on the Cloudflare Pages dashboard.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.pages.projects.deployments.create(
   *     'this-is-my-project-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/pages/projects/${t}/deployments`, S({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a list of project deployments.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deployment of client.pages.projects.deployments.list(
   *   'this-is-my-project-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/pages/projects/${t}/deployments`, cn, { query: i, ...s });
  }
  /**
   * Delete a deployment.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.pages.projects.deployments.delete(
   *     'this-is-my-project-01',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/pages/projects/${t}/deployments/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch information about a deployment.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.pages.projects.deployments.get(
   *     'this-is-my-project-01',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/pages/projects/${t}/deployments/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Retry a previous deployment.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.pages.projects.deployments.retry(
   *     'this-is-my-project-01',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       body: {},
   *     },
   *   );
   * ```
   */
  retry(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.post(`/accounts/${i}/pages/projects/${t}/deployments/${e}/retry`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * Rollback the production deployment to a previous deployment. You can only
   * rollback to succesful builds on production.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.pages.projects.deployments.rollback(
   *     'this-is-my-project-01',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       body: {},
   *     },
   *   );
   * ```
   */
  rollback(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.post(`/accounts/${i}/pages/projects/${t}/deployments/${e}/rollback`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
};
ya.History = ma;
class ue extends o {
  constructor() {
    super(...arguments), this.deployments = new ya(this._client), this.domains = new wa(this._client);
  }
  /**
   * Create a new project.
   *
   * @example
   * ```ts
   * const project = await client.pages.projects.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/pages/projects`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a list of all user projects.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deployment of client.pages.projects.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/pages/projects`, cn, e);
  }
  /**
   * Delete a project by name.
   *
   * @example
   * ```ts
   * const project = await client.pages.projects.delete(
   *   'this-is-my-project-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/pages/projects/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Set new attributes for an existing project. Modify environment variables. To
   * delete an environment variable, set the key to null.
   *
   * @example
   * ```ts
   * const project = await client.pages.projects.edit(
   *   'this-is-my-project-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/pages/projects/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a project by name.
   *
   * @example
   * ```ts
   * const project = await client.pages.projects.get(
   *   'this-is-my-project-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/pages/projects/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Purge all cached build artifacts for a Pages project
   *
   * @example
   * ```ts
   * const response =
   *   await client.pages.projects.purgeBuildCache(
   *     'this-is-my-project-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  purgeBuildCache(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/pages/projects/${t}/purge_build_cache`, s)._thenUnwrap((i) => i.result);
  }
}
class cn extends d {
}
ue.DeploymentsSinglePage = cn;
ue.Deployments = ya;
ue.Domains = wa;
ue.DomainListResponsesSinglePage = $a;
let on = class extends o {
  constructor() {
    super(...arguments), this.projects = new ue(this._client);
  }
};
on.Projects = ue;
on.DeploymentsSinglePage = cn;
class Gp extends o {
  /**
   * Create a new pipeline.
   *
   * @example
   * ```ts
   * const pipeline = await client.pipelines.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   destination: {
   *     batch: {},
   *     compression: {},
   *     credentials: {
   *       access_key_id: '<access key id>',
   *       endpoint:
   *         'https://123f8a8258064ed892a347f173372359.r2.cloudflarestorage.com',
   *       secret_access_key: '<secret key>',
   *     },
   *     format: 'json',
   *     path: { bucket: 'bucket' },
   *     type: 'r2',
   *   },
   *   name: 'sample_pipeline',
   *   source: [{ format: 'json', type: 'type' }],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/pipelines`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update an existing pipeline.
   *
   * @example
   * ```ts
   * const pipeline = await client.pipelines.update(
   *   'sample_pipeline',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     destination: {
   *       batch: {},
   *       compression: {},
   *       format: 'json',
   *       path: { bucket: 'bucket' },
   *       type: 'r2',
   *     },
   *     name: 'sample_pipeline',
   *     source: [{ format: 'json', type: 'type' }],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/pipelines/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List, filter, and paginate pipelines in an account.
   *
   * @example
   * ```ts
   * const pipelines = await client.pipelines.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/pipelines`, { query: n, ...e });
  }
  /**
   * Delete a pipeline.
   *
   * @example
   * ```ts
   * await client.pipelines.delete('sample_pipeline', {
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/pipelines/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Get configuration of a pipeline.
   *
   * @example
   * ```ts
   * const pipeline = await client.pipelines.get(
   *   'sample_pipeline',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/pipelines/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class fa extends o {
  /**
   * Creates a new consumer for a Queue
   *
   * @example
   * ```ts
   * const consumer = await client.queues.consumers.create(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/queues/${t}/consumers`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates the consumer for a queue, or creates one if it does not exist.
   *
   * @example
   * ```ts
   * const consumer = await client.queues.consumers.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/queues/${t}/consumers/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Deletes the consumer for a queue.
   *
   * @example
   * ```ts
   * const consumer = await client.queues.consumers.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/queues/${t}/consumers/${e}`, n);
  }
  /**
   * Returns the consumers for a Queue
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const consumer of client.queues.consumers.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/queues/${t}/consumers`, Pa, s);
  }
}
class Pa extends d {
}
fa.ConsumersSinglePage = Pa;
class Bp extends o {
  /**
   * Acknowledge + Retry messages from a Queue
   *
   * @example
   * ```ts
   * const response = await client.queues.messages.ack(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  ack(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/queues/${t}/messages/ack`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Push a batch of message to a Queue
   *
   * @example
   * ```ts
   * const response = await client.queues.messages.bulkPush(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  bulkPush(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/queues/${t}/messages/batch`, {
      body: i,
      ...s
    });
  }
  /**
   * Pull a batch of messages from a Queue
   *
   * @example
   * ```ts
   * const response = await client.queues.messages.pull(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  pull(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/queues/${t}/messages/pull`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Push a message to a Queue
   *
   * @example
   * ```ts
   * const response = await client.queues.messages.push(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  push(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/queues/${t}/messages`, { body: i, ...s });
  }
}
class Hp extends o {
  /**
   * Deletes all messages from the Queue.
   *
   * @example
   * ```ts
   * const queue = await client.queues.purge.start(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  start(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/queues/${t}/purge`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get details about a Queue's purge status.
   *
   * @example
   * ```ts
   * const response = await client.queues.purge.status(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  status(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/queues/${t}/purge`, s)._thenUnwrap((i) => i.result);
  }
}
class Zt extends o {
  constructor() {
    super(...arguments), this.consumers = new fa(this._client), this.messages = new Bp(this._client), this.purge = new Hp(this._client);
  }
  /**
   * Create a new queue
   *
   * @example
   * ```ts
   * const queue = await client.queues.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   queue_name: 'example-queue',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/queues`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a Queue. Note that this endpoint does not support partial updates. If
   * successful, the Queue's configuration is overwritten with the supplied
   * configuration.
   *
   * @example
   * ```ts
   * const queue = await client.queues.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/queues/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the queues owned by an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const queue of client.queues.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/queues`, Wp, e);
  }
  /**
   * Deletes a queue
   *
   * @example
   * ```ts
   * const queue = await client.queues.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/queues/${t}`, s);
  }
  /**
   * Updates a Queue.
   *
   * @example
   * ```ts
   * const queue = await client.queues.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/queues/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get details about a specific queue.
   *
   * @example
   * ```ts
   * const queue = await client.queues.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/queues/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Wp extends d {
}
Zt.QueuesSinglePage = Wp;
Zt.Consumers = fa;
Zt.ConsumersSinglePage = Pa;
Zt.Messages = Bp;
Zt.Purge = Hp;
class Kp extends o {
  /**
   * Creates temporary access credentials on a bucket that can be optionally scoped
   * to prefixes or objects.
   *
   * @example
   * ```ts
   * const temporaryCredential =
   *   await client.r2.temporaryCredentials.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     bucket: 'example-bucket',
   *     parentAccessKeyId: 'example-access-key-id',
   *     permission: 'object-read-write',
   *     ttlSeconds: 3600,
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/r2/temp-access-credentials`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Xp extends o {
  /**
   * Set the CORS policy for a bucket.
   *
   * @example
   * ```ts
   * const cors = await client.r2.buckets.cors.update(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, jurisdiction: i, ...c } = e;
    return this._client.put(`/accounts/${n}/r2/buckets/${t}/cors`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Delete the CORS policy for a bucket.
   *
   * @example
   * ```ts
   * const cors = await client.r2.buckets.cors.delete(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.delete(`/accounts/${n}/r2/buckets/${t}/cors`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get the CORS policy for a bucket.
   *
   * @example
   * ```ts
   * const cors = await client.r2.buckets.cors.get(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}/cors`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class Qp extends o {
  /**
   * Create event notification rule.
   *
   * @example
   * ```ts
   * const eventNotification =
   *   await client.r2.buckets.eventNotifications.update(
   *     'example-bucket',
   *     'queue_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, jurisdiction: c, ...a } = s;
    return this._client.put(`/accounts/${i}/event_notifications/r2/${t}/configuration/queues/${e}`, {
      body: a,
      ...n,
      headers: {
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...n?.headers
      }
    })._thenUnwrap((l) => l.result);
  }
  /**
   * List all event notification rules for a bucket.
   *
   * @example
   * ```ts
   * const eventNotifications =
   *   await client.r2.buckets.eventNotifications.list(
   *     'example-bucket',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/event_notifications/r2/${t}/configuration`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete an event notification rule. **If no body is provided, all rules for
   * specified queue will be deleted**.
   *
   * @example
   * ```ts
   * const eventNotification =
   *   await client.r2.buckets.eventNotifications.delete(
   *     'example-bucket',
   *     'queue_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.delete(`/accounts/${i}/event_notifications/r2/${t}/configuration/queues/${e}`, {
      ...n,
      headers: {
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...n?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get a single event notification rule.
   *
   * @example
   * ```ts
   * const eventNotification =
   *   await client.r2.buckets.eventNotifications.get(
   *     'example-bucket',
   *     'queue_id',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.get(`/accounts/${i}/event_notifications/r2/${t}/configuration/queues/${e}`, {
      ...n,
      headers: {
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...n?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
}
class Jp extends o {
  /**
   * Set the object lifecycle rules for a bucket.
   *
   * @example
   * ```ts
   * const lifecycle = await client.r2.buckets.lifecycle.update(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, jurisdiction: i, ...c } = e;
    return this._client.put(`/accounts/${n}/r2/buckets/${t}/lifecycle`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get object lifecycle rules for a bucket.
   *
   * @example
   * ```ts
   * const lifecycle = await client.r2.buckets.lifecycle.get(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}/lifecycle`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class qp extends o {
  /**
   * Set lock rules for a bucket.
   *
   * @example
   * ```ts
   * const lock = await client.r2.buckets.locks.update(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, jurisdiction: i, ...c } = e;
    return this._client.put(`/accounts/${n}/r2/buckets/${t}/lock`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get lock rules for a bucket.
   *
   * @example
   * ```ts
   * const lock = await client.r2.buckets.locks.get(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}/lock`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class tw extends o {
  /**
   * Get Storage/Object Count Metrics across all buckets in your account. Note that
   * Account-Level Metrics may not immediately reflect the latest data.
   *
   * @example
   * ```ts
   * const metrics = await client.r2.buckets.metrics.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/r2/metrics`, e)._thenUnwrap((n) => n.result);
  }
}
class ew extends o {
  /**
   * Sets configuration for Sippy for an existing R2 bucket.
   *
   * @example
   * ```ts
   * const sippy = await client.r2.buckets.sippy.update(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, jurisdiction: i, ...c } = e;
    return this._client.put(`/accounts/${n}/r2/buckets/${t}/sippy`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Disables Sippy on this bucket.
   *
   * @example
   * ```ts
   * const sippy = await client.r2.buckets.sippy.delete(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.delete(`/accounts/${n}/r2/buckets/${t}/sippy`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets configuration for Sippy for an existing R2 bucket.
   *
   * @example
   * ```ts
   * const sippy = await client.r2.buckets.sippy.get(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}/sippy`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let sw = class extends o {
  /**
   * Register a new custom domain for an existing R2 bucket.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.r2.buckets.domains.custom.create(
   *     'example-bucket',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       domain: 'prefix.example-domain.com',
   *       enabled: true,
   *       zoneId: '36ca64a6d92827b8a6b90be344bb1bfd',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, jurisdiction: i, ...c } = e;
    return this._client.post(`/accounts/${n}/r2/buckets/${t}/domains/custom`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Edit the configuration for a custom domain on an existing R2 bucket.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.r2.buckets.domains.custom.update(
   *     'example-bucket',
   *     'example-domain/custom-domain.com',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, jurisdiction: c, ...a } = s;
    return this._client.put(`/accounts/${i}/r2/buckets/${t}/domains/custom/${e}`, {
      body: a,
      ...n,
      headers: {
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...n?.headers
      }
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Gets a list of all custom domains registered with an existing R2 bucket.
   *
   * @example
   * ```ts
   * const customs = await client.r2.buckets.domains.custom.list(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  list(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}/domains/custom`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Remove custom domain registration from an existing R2 bucket.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.r2.buckets.domains.custom.delete(
   *     'example-bucket',
   *     'example-domain/custom-domain.com',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.delete(`/accounts/${i}/r2/buckets/${t}/domains/custom/${e}`, {
      ...n,
      headers: {
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...n?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Get the configuration for a custom domain on an existing R2 bucket.
   *
   * @example
   * ```ts
   * const custom = await client.r2.buckets.domains.custom.get(
   *   'example-bucket',
   *   'example-domain/custom-domain.com',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i, jurisdiction: c } = s;
    return this._client.get(`/accounts/${i}/r2/buckets/${t}/domains/custom/${e}`, {
      ...n,
      headers: {
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...n?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
};
class nw extends o {
  /**
   * Updates state of public access over the bucket's R2-managed (r2.dev) domain.
   *
   * @example
   * ```ts
   * const managed =
   *   await client.r2.buckets.domains.managed.update(
   *     'example-bucket',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       enabled: true,
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, jurisdiction: i, ...c } = e;
    return this._client.put(`/accounts/${n}/r2/buckets/${t}/domains/managed`, {
      body: c,
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Gets state of public access over the bucket's R2-managed (r2.dev) domain.
   *
   * @example
   * ```ts
   * const manageds =
   *   await client.r2.buckets.domains.managed.list(
   *     'example-bucket',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}/domains/managed`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let an = class extends o {
  constructor() {
    super(...arguments), this.custom = new sw(this._client), this.managed = new nw(this._client);
  }
};
an.Custom = sw;
an.Managed = nw;
class lt extends o {
  constructor() {
    super(...arguments), this.lifecycle = new Jp(this._client), this.cors = new Xp(this._client), this.domains = new an(this._client), this.eventNotifications = new Qp(this._client), this.locks = new qp(this._client), this.metrics = new tw(this._client), this.sippy = new ew(this._client);
  }
  /**
   * Creates a new R2 bucket.
   *
   * @example
   * ```ts
   * const bucket = await client.r2.buckets.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'example-bucket',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, jurisdiction: n, ...i } = t;
    return this._client.post(`/accounts/${s}/r2/buckets`, {
      body: i,
      ...e,
      headers: {
        ...n?.toString() != null ? { "cf-r2-jurisdiction": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all R2 buckets on your account.
   *
   * @example
   * ```ts
   * const buckets = await client.r2.buckets.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, jurisdiction: n, ...i } = t;
    return this._client.get(`/accounts/${s}/r2/buckets`, {
      query: i,
      ...e,
      headers: {
        ...n?.toString() != null ? { "cf-r2-jurisdiction": n?.toString() } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes an existing R2 bucket.
   *
   * @example
   * ```ts
   * const bucket = await client.r2.buckets.delete(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.delete(`/accounts/${n}/r2/buckets/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates properties of an existing R2 bucket.
   *
   * @example
   * ```ts
   * const bucket = await client.r2.buckets.edit(
   *   'example-bucket',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     storage_class: 'Standard',
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, storage_class: i, jurisdiction: c } = e;
    return this._client.patch(`/accounts/${n}/r2/buckets/${t}`, {
      ...s,
      headers: {
        "cf-r2-storage-class": i.toString(),
        ...c?.toString() != null ? { "cf-r2-jurisdiction": c?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Gets properties of an existing R2 bucket.
   *
   * @example
   * ```ts
   * const bucket = await client.r2.buckets.get(
   *   'example-bucket',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, jurisdiction: i } = e;
    return this._client.get(`/accounts/${n}/r2/buckets/${t}`, {
      ...s,
      headers: {
        ...i?.toString() != null ? { "cf-r2-jurisdiction": i?.toString() } : void 0,
        ...s?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
lt.Lifecycle = Jp;
lt.CORS = Xp;
lt.Domains = an;
lt.EventNotifications = Qp;
lt.Locks = qp;
lt.Metrics = tw;
lt.SippyResource = ew;
class iw extends o {
  /**
   * Check whether tokens are valid against the source bucket
   *
   * @example
   * ```ts
   * const response =
   *   await client.r2.superSlurper.connectivityPrecheck.source({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  source(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/slurper/source/connectivity-precheck`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Check whether tokens are valid against the target bucket
   *
   * @example
   * ```ts
   * const response =
   *   await client.r2.superSlurper.connectivityPrecheck.target({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  target(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/slurper/target/connectivity-precheck`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let ba = class extends o {
  /**
   * Get job logs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const logListResponse of client.r2.superSlurper.jobs.logs.list(
   *   'job_id',
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/slurper/jobs/${t}/logs`, Ua, { query: i, ...s });
  }
};
class Ua extends d {
}
ba.LogListResponsesSinglePage = Ua;
class Ne extends o {
  constructor() {
    super(...arguments), this.logs = new ba(this._client);
  }
  /**
   * Create a job
   *
   * @example
   * ```ts
   * const job = await client.r2.superSlurper.jobs.create({
   *   account_id: 'account_id',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/slurper/jobs`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List jobs
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const jobListResponse of client.r2.superSlurper.jobs.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/slurper/jobs`, xa, {
      query: n,
      ...e
    });
  }
  /**
   * Abort a job
   *
   * @example
   * ```ts
   * const response = await client.r2.superSlurper.jobs.abort(
   *   'job_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  abort(t, e, s) {
    const { account_id: n } = e;
    return this._client.put(`/accounts/${n}/slurper/jobs/${t}/abort`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Abort all jobs
   *
   * @example
   * ```ts
   * const response = await client.r2.superSlurper.jobs.abortAll(
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  abortAll(t, e) {
    const { account_id: s } = t;
    return this._client.put(`/accounts/${s}/slurper/jobs/abortAll`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Get job details
   *
   * @example
   * ```ts
   * const job = await client.r2.superSlurper.jobs.get(
   *   'job_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/slurper/jobs/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Pause a job
   *
   * @example
   * ```ts
   * const response = await client.r2.superSlurper.jobs.pause(
   *   'job_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  pause(t, e, s) {
    const { account_id: n } = e;
    return this._client.put(`/accounts/${n}/slurper/jobs/${t}/pause`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get job progress
   *
   * @example
   * ```ts
   * const response = await client.r2.superSlurper.jobs.progress(
   *   'job_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  progress(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/slurper/jobs/${t}/progress`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Resume a job
   *
   * @example
   * ```ts
   * const response = await client.r2.superSlurper.jobs.resume(
   *   'job_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  resume(t, e, s) {
    const { account_id: n } = e;
    return this._client.put(`/accounts/${n}/slurper/jobs/${t}/resume`, s)._thenUnwrap((i) => i.result);
  }
}
class xa extends d {
}
Ne.JobListResponsesSinglePage = xa;
Ne.Logs = ba;
Ne.LogListResponsesSinglePage = Ua;
class Ye extends o {
  constructor() {
    super(...arguments), this.jobs = new Ne(this._client), this.connectivityPrecheck = new iw(this._client);
  }
}
Ye.Jobs = Ne;
Ye.JobListResponsesSinglePage = xa;
Ye.ConnectivityPrecheck = iw;
class je extends o {
  constructor() {
    super(...arguments), this.buckets = new lt(this._client), this.temporaryCredentials = new Kp(this._client), this.superSlurper = new Ye(this._client);
  }
}
je.Buckets = lt;
je.TemporaryCredentials = Kp;
je.SuperSlurper = Ye;
let rw = class extends o {
  /**
   * Creates a new rule in a Web Analytics ruleset.
   *
   * @example
   * ```ts
   * const rumRule = await client.rum.rules.create(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/rum/v2/${t}/rule`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a rule in a Web Analytics ruleset.
   *
   * @example
   * ```ts
   * const rumRule = await client.rum.rules.update(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/rum/v2/${t}/rule/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists all the rules in a Web Analytics ruleset.
   *
   * @example
   * ```ts
   * const rules = await client.rum.rules.list(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/rum/v2/${t}/rules`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes an existing rule from a Web Analytics ruleset.
   *
   * @example
   * ```ts
   * const rule = await client.rum.rules.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/rum/v2/${t}/rule/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Modifies one or more rules in a Web Analytics ruleset with a single request.
   *
   * @example
   * ```ts
   * const response = await client.rum.rules.bulkCreate(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  bulkCreate(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/rum/v2/${t}/rules`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class Sa extends o {
  /**
   * Creates a new Web Analytics site.
   *
   * @example
   * ```ts
   * const site = await client.rum.siteInfo.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/rum/site_info`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Web Analytics site.
   *
   * @example
   * ```ts
   * const site = await client.rum.siteInfo.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/rum/site_info/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all Web Analytics sites of an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const site of client.rum.siteInfo.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/rum/site_info/list`, za, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes an existing Web Analytics site.
   *
   * @example
   * ```ts
   * const siteInfo = await client.rum.siteInfo.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/rum/site_info/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves a Web Analytics site.
   *
   * @example
   * ```ts
   * const site = await client.rum.siteInfo.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/rum/site_info/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class za extends p {
}
Sa.SitesV4PagePaginationArray = za;
class Fe extends o {
  constructor() {
    super(...arguments), this.siteInfo = new Sa(this._client), this.rules = new rw(this._client);
  }
}
Fe.SiteInfo = Sa;
Fe.SitesV4PagePaginationArray = za;
Fe.Rules = rw;
let cw = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/datasets", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  /**
   * Retrieves an URL to download a single dataset.
   *
   * @example
   * ```ts
   * const response = await client.radar.datasets.download({
   *   datasetId: 3,
   * });
   * ```
   */
  download(t, e) {
    const { format: s, ...n } = t;
    return this._client.post("/radar/datasets/download", {
      query: { format: s },
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves the CSV content of a given dataset by alias or ID. When getting the
   * content by alias the latest dataset is returned, optionally filtered by the
   * latest available at a given date.
   *
   * @example
   * ```ts
   * const dataset = await client.radar.datasets.get(
   *   'ranking_top_1000',
   * );
   * ```
   */
  get(t, e) {
    return this._client.get(`/radar/datasets/${t}`, {
      ...e,
      headers: { Accept: "text/csv", ...e?.headers }
    });
  }
};
class ow extends o {
  /**
   * Searches for locations, autonomous systems, reports, and bots.
   *
   * @example
   * ```ts
   * const response = await client.radar.search.global({
   *   query: 'United',
   * });
   * ```
   */
  global(t, e) {
    return this._client.get("/radar/search/global", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
class aw extends o {
  summary(t = {}, e) {
    return u(t) ? this.summary({}, t) : this._client.get("/radar/tcp_resets_timeouts/summary", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  timeseriesGroups(t = {}, e) {
    return u(t) ? this.timeseriesGroups({}, t) : this._client.get("/radar/tcp_resets_timeouts/timeseries_groups", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}
let uw = class extends o {
  userAgent(t = {}, e) {
    return u(t) ? this.userAgent({}, t) : this._client.get("/radar/ai/bots/timeseries_groups/user_agent", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
};
class Ra extends o {
  /**
   * Convert Files into Markdown
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const toMarkdownCreateResponse of client.radar.ai.toMarkdown.create(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e) {
    const { account_id: s, body: n } = t ?? {};
    return this._client.getAPIList(`/accounts/${s}/ai/tomarkdown`, Aa, {
      body: n,
      method: "post",
      ...e,
      headers: { "Content-Type": "application/octet-stream", ...e?.headers },
      __binaryRequest: !0
    });
  }
}
class Aa extends d {
}
Ra.ToMarkdownCreateResponsesSinglePage = Aa;
let lw = class extends o {
  userAgent(t = {}, e) {
    return u(t) ? this.userAgent({}, t) : this._client.get("/radar/ai/bots/summary/user_agent", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, va = class extends o {
  constructor() {
    super(...arguments), this.summary = new lw(this._client);
  }
};
va.Summary = lw;
let dw = class extends o {
  model(t = {}, e) {
    return u(t) ? this.model({}, t) : this._client.get("/radar/ai/inference/summary/model", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  task(t = {}, e) {
    return u(t) ? this.task({}, t) : this._client.get("/radar/ai/inference/summary/task", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, hw = class extends o {
  model(t = {}, e) {
    return u(t) ? this.model({}, t) : this._client.get("/radar/ai/inference/timeseries_groups/model", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  task(t = {}, e) {
    return u(t) ? this.task({}, t) : this._client.get("/radar/ai/inference/timeseries_groups/task", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, La = class extends o {
  constructor() {
    super(...arguments), this.summary = new hw(this._client);
  }
};
La.Summary = hw;
class un extends o {
  constructor() {
    super(...arguments), this.summary = new dw(this._client), this.timeseriesGroups = new La(this._client);
  }
}
un.Summary = dw;
un.TimeseriesGroups = La;
class Tt extends o {
  constructor() {
    super(...arguments), this.toMarkdown = new Ra(this._client), this.inference = new un(this._client), this.bots = new va(this._client), this.timeseriesGroups = new uw(this._client);
  }
}
Tt.ToMarkdown = Ra;
Tt.ToMarkdownCreateResponsesSinglePage = Aa;
Tt.Inference = un;
Tt.Bots = va;
Tt.TimeseriesGroups = uw;
class _w extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/annotations/outages", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/annotations/outages/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
class Ia extends o {
  constructor() {
    super(...arguments), this.outages = new _w(this._client);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/annotations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Ia.Outages = _w;
let gw = class extends o {
  dnssec(t = {}, e) {
    return u(t) ? this.dnssec({}, t) : this._client.get("/radar/as112/summary/dnssec", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  edns(t = {}, e) {
    return u(t) ? this.edns({}, t) : this._client.get("/radar/as112/summary/edns", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/as112/summary/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/as112/summary/protocol", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  queryType(t = {}, e) {
    return u(t) ? this.queryType({}, t) : this._client.get("/radar/as112/summary/query_type", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  responseCodes(t = {}, e) {
    return u(t) ? this.responseCodes({}, t) : this._client.get("/radar/as112/summary/response_codes", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, pw = class extends o {
  dnssec(t = {}, e) {
    return u(t) ? this.dnssec({}, t) : this._client.get("/radar/as112/timeseries_groups/dnssec", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  edns(t = {}, e) {
    return u(t) ? this.edns({}, t) : this._client.get("/radar/as112/timeseries_groups/edns", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/as112/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/as112/timeseries_groups/protocol", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  queryType(t = {}, e) {
    return u(t) ? this.queryType({}, t) : this._client.get("/radar/as112/timeseries_groups/query_type", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  responseCodes(t = {}, e) {
    return u(t) ? this.responseCodes({}, t) : this._client.get("/radar/as112/timeseries_groups/response_codes", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, ww = class extends o {
  dnssec(t, e = {}, s) {
    return u(e) ? this.dnssec(t, {}, e) : this._client.get(`/radar/as112/top/locations/dnssec/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  edns(t, e = {}, s) {
    return u(e) ? this.edns(t, {}, e) : this._client.get(`/radar/as112/top/locations/edns/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
  ipVersion(t, e = {}, s) {
    return u(e) ? this.ipVersion(t, {}, e) : this._client.get(`/radar/as112/top/locations/ip_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/as112/top/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
class Ge extends o {
  constructor() {
    super(...arguments), this.summary = new gw(this._client), this.timeseriesGroups = new pw(this._client), this.top = new ww(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/as112/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Ge.Summary = gw;
Ge.TimeseriesGroups = pw;
Ge.Top = ww;
let $w = class extends o {
  bitrate(t = {}, e) {
    return u(t) ? this.bitrate({}, t) : this._client.get("/radar/attacks/layer3/summary/bitrate", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  duration(t = {}, e) {
    return u(t) ? this.duration({}, t) : this._client.get("/radar/attacks/layer3/summary/duration", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer3/summary/industry", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer3/summary/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/attacks/layer3/summary/protocol", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  vector(t = {}, e) {
    return u(t) ? this.vector({}, t) : this._client.get("/radar/attacks/layer3/summary/vector", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer3/summary/vertical", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, mw = class extends o {
  bitrate(t = {}, e) {
    return u(t) ? this.bitrate({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/bitrate", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  duration(t = {}, e) {
    return u(t) ? this.duration({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/duration", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/industry", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/protocol", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  vector(t = {}, e) {
    return u(t) ? this.vector({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/vector", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer3/timeseries_groups/vertical", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, yw = class extends o {
  origin(t = {}, e) {
    return u(t) ? this.origin({}, t) : this._client.get("/radar/attacks/layer3/top/locations/origin", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  target(t = {}, e) {
    return u(t) ? this.target({}, t) : this._client.get("/radar/attacks/layer3/top/locations/target", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, ka = class extends o {
  constructor() {
    super(...arguments), this.locations = new yw(this._client);
  }
  attacks(t = {}, e) {
    return u(t) ? this.attacks({}, t) : this._client.get("/radar/attacks/layer3/top/attacks", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer3/top/industry", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer3/top/vertical", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
ka.Locations = yw;
class Be extends o {
  constructor() {
    super(...arguments), this.summary = new $w(this._client), this.timeseriesGroups = new mw(this._client), this.top = new ka(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/attacks/layer3/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Be.Summary = $w;
Be.TimeseriesGroups = mw;
Be.Top = ka;
let fw = class extends o {
  httpMethod(t = {}, e) {
    return u(t) ? this.httpMethod({}, t) : this._client.get("/radar/attacks/layer7/summary/http_method", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/attacks/layer7/summary/http_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer7/summary/industry", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer7/summary/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  managedRules(t = {}, e) {
    return u(t) ? this.managedRules({}, t) : this._client.get("/radar/attacks/layer7/summary/managed_rules", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  mitigationProduct(t = {}, e) {
    return u(t) ? this.mitigationProduct({}, t) : this._client.get("/radar/attacks/layer7/summary/mitigation_product", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer7/summary/vertical", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Pw = class extends o {
  httpMethod(t = {}, e) {
    return u(t) ? this.httpMethod({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/http_method", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/http_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/industry", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  managedRules(t = {}, e) {
    return u(t) ? this.managedRules({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/managed_rules", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  mitigationProduct(t = {}, e) {
    return u(t) ? this.mitigationProduct({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/mitigation_product", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer7/timeseries_groups/vertical", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, bw = class extends o {
  origin(t = {}, e) {
    return u(t) ? this.origin({}, t) : this._client.get("/radar/attacks/layer7/top/ases/origin", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Uw = class extends o {
  origin(t = {}, e) {
    return u(t) ? this.origin({}, t) : this._client.get("/radar/attacks/layer7/top/locations/origin", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  target(t = {}, e) {
    return u(t) ? this.target({}, t) : this._client.get("/radar/attacks/layer7/top/locations/target", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, ln = class extends o {
  constructor() {
    super(...arguments), this.locations = new Uw(this._client), this.ases = new bw(this._client);
  }
  attacks(t = {}, e) {
    return u(t) ? this.attacks({}, t) : this._client.get("/radar/attacks/layer7/top/attacks", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  industry(t = {}, e) {
    return u(t) ? this.industry({}, t) : this._client.get("/radar/attacks/layer7/top/industry", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  vertical(t = {}, e) {
    return u(t) ? this.vertical({}, t) : this._client.get("/radar/attacks/layer7/top/vertical", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
ln.Locations = Uw;
ln.Ases = bw;
class He extends o {
  constructor() {
    super(...arguments), this.summary = new fw(this._client), this.timeseriesGroups = new Pw(this._client), this.top = new ln(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/attacks/layer7/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
He.Summary = fw;
He.TimeseriesGroups = Pw;
He.Top = ln;
class dn extends o {
  constructor() {
    super(...arguments), this.layer3 = new Be(this._client), this.layer7 = new He(this._client);
  }
}
dn.Layer3 = Be;
dn.Layer7 = He;
let xw = class extends o {
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/bgp/ips/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Sw = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/bgp/routes/ases", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  moas(t = {}, e) {
    return u(t) ? this.moas({}, t) : this._client.get("/radar/bgp/routes/moas", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  pfx2as(t = {}, e) {
    return u(t) ? this.pfx2as({}, t) : this._client.get("/radar/bgp/routes/pfx2as", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  realtime(t = {}, e) {
    return u(t) ? this.realtime({}, t) : this._client.get("/radar/bgp/routes/realtime", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  stats(t = {}, e) {
    return u(t) ? this.stats({}, t) : this._client.get("/radar/bgp/routes/stats", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Oa = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/radar/bgp/hijacks/events", Ca, {
      query: t,
      ...e
    });
  }
}, Ca = class extends F {
};
Oa.EventListResponsesV4PagePagination = Ca;
class hn extends o {
  constructor() {
    super(...arguments), this.events = new Oa(this._client);
  }
}
hn.Events = Oa;
hn.EventListResponsesV4PagePagination = Ca;
let Za = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/radar/bgp/leaks/events", Ta, {
      query: t,
      ...e
    });
  }
};
class Ta extends F {
}
Za.EventListResponsesV4PagePagination = Ta;
class _n extends o {
  constructor() {
    super(...arguments), this.events = new Za(this._client);
  }
}
_n.Events = Za;
_n.EventListResponsesV4PagePagination = Ta;
let zw = class extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/bgp/top/ases", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  prefixes(t = {}, e) {
    return u(t) ? this.prefixes({}, t) : this._client.get("/radar/bgp/top/ases/prefixes", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Va = class extends o {
  constructor() {
    super(...arguments), this.ases = new zw(this._client);
  }
  prefixes(t = {}, e) {
    return u(t) ? this.prefixes({}, t) : this._client.get("/radar/bgp/top/prefixes", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
Va.Ases = zw;
class Vt extends o {
  constructor() {
    super(...arguments), this.leaks = new _n(this._client), this.top = new Va(this._client), this.hijacks = new hn(this._client), this.routes = new Sw(this._client), this.ips = new xw(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/bgp/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Vt.Leaks = _n;
Vt.Top = Va;
Vt.Hijacks = hn;
Vt.Routes = Sw;
Vt.IPs = xw;
class Rw extends o {
  summary(t, e = {}, s) {
    return u(e) ? this.summary(t, {}, e) : this._client.get(`/radar/bots/crawlers/summary/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
  timeseriesGroups(t, e = {}, s) {
    return u(e) ? this.timeseriesGroups(t, {}, e) : this._client.get(`/radar/bots/crawlers/timeseries_groups/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Da extends o {
  constructor() {
    super(...arguments), this.webCrawlers = new Rw(this._client);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/bots", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/bots/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
  summary(t, e = {}, s) {
    return u(e) ? this.summary(t, {}, e) : this._client.get(`/radar/bots/summary/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/bots/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  timeseriesGroups(t, e = {}, s) {
    return u(e) ? this.timeseriesGroups(t, {}, e) : this._client.get(`/radar/bots/timeseries_groups/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
Da.WebCrawlers = Rw;
let Aw = class extends o {
  cacheHit(t = {}, e) {
    return u(t) ? this.cacheHit({}, t) : this._client.get("/radar/dns/summary/cache_hit", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dnssec(t = {}, e) {
    return u(t) ? this.dnssec({}, t) : this._client.get("/radar/dns/summary/dnssec", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dnssecAware(t = {}, e) {
    return u(t) ? this.dnssecAware({}, t) : this._client.get("/radar/dns/summary/dnssec_aware", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dnssecE2E(t = {}, e) {
    return u(t) ? this.dnssecE2E({}, t) : this._client.get("/radar/dns/summary/dnssec_e2e", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/dns/summary/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  matchingAnswer(t = {}, e) {
    return u(t) ? this.matchingAnswer({}, t) : this._client.get("/radar/dns/summary/matching_answer", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/dns/summary/protocol", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  queryType(t = {}, e) {
    return u(t) ? this.queryType({}, t) : this._client.get("/radar/dns/summary/query_type", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  responseCode(t = {}, e) {
    return u(t) ? this.responseCode({}, t) : this._client.get("/radar/dns/summary/response_code", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  responseTTL(t = {}, e) {
    return u(t) ? this.responseTTL({}, t) : this._client.get("/radar/dns/summary/response_ttl", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, vw = class extends o {
  cacheHit(t = {}, e) {
    return u(t) ? this.cacheHit({}, t) : this._client.get("/radar/dns/timeseries_groups/cache_hit", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dnssec(t = {}, e) {
    return u(t) ? this.dnssec({}, t) : this._client.get("/radar/dns/timeseries_groups/dnssec", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dnssecAware(t = {}, e) {
    return u(t) ? this.dnssecAware({}, t) : this._client.get("/radar/dns/timeseries_groups/dnssec_aware", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  dnssecE2E(t = {}, e) {
    return u(t) ? this.dnssecE2E({}, t) : this._client.get("/radar/dns/timeseries_groups/dnssec_e2e", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/dns/timeseries_groups/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  matchingAnswer(t = {}, e) {
    return u(t) ? this.matchingAnswer({}, t) : this._client.get("/radar/dns/timeseries_groups/matching_answer", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  protocol(t = {}, e) {
    return u(t) ? this.protocol({}, t) : this._client.get("/radar/dns/timeseries_groups/protocol", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  queryType(t = {}, e) {
    return u(t) ? this.queryType({}, t) : this._client.get("/radar/dns/timeseries_groups/query_type", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  responseCode(t = {}, e) {
    return u(t) ? this.responseCode({}, t) : this._client.get("/radar/dns/timeseries_groups/response_code", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  responseTTL(t = {}, e) {
    return u(t) ? this.responseTTL({}, t) : this._client.get("/radar/dns/timeseries_groups/response_ttl", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, Lw = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/dns/top/ases", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/dns/top/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
class We extends o {
  constructor() {
    super(...arguments), this.top = new Lw(this._client), this.summary = new Aw(this._client), this.timeseriesGroups = new vw(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/dns/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
We.Top = Lw;
We.Summary = Aw;
We.TimeseriesGroups = vw;
let Iw = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/routing/summary/arc", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/routing/summary/dkim", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/routing/summary/dmarc", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  encrypted(t = {}, e) {
    return u(t) ? this.encrypted({}, t) : this._client.get("/radar/email/routing/summary/encrypted", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/email/routing/summary/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/routing/summary/spf", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, kw = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/routing/timeseries_groups/arc", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/routing/timeseries_groups/dkim", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/routing/timeseries_groups/dmarc", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  encrypted(t = {}, e) {
    return u(t) ? this.encrypted({}, t) : this._client.get("/radar/email/routing/timeseries_groups/encrypted", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/email/routing/timeseries_groups/ip_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/routing/timeseries_groups/spf", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
};
class gn extends o {
  constructor() {
    super(...arguments), this.summary = new Iw(this._client), this.timeseriesGroups = new kw(this._client);
  }
}
gn.Summary = Iw;
gn.TimeseriesGroups = kw;
let Ow = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/security/summary/arc", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/security/summary/dkim", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/security/summary/dmarc", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  malicious(t = {}, e) {
    return u(t) ? this.malicious({}, t) : this._client.get("/radar/email/security/summary/malicious", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  spam(t = {}, e) {
    return u(t) ? this.spam({}, t) : this._client.get("/radar/email/security/summary/spam", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/security/summary/spf", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  spoof(t = {}, e) {
    return u(t) ? this.spoof({}, t) : this._client.get("/radar/email/security/summary/spoof", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  threatCategory(t = {}, e) {
    return u(t) ? this.threatCategory({}, t) : this._client.get("/radar/email/security/summary/threat_category", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/email/security/summary/tls_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, Cw = class extends o {
  arc(t = {}, e) {
    return u(t) ? this.arc({}, t) : this._client.get("/radar/email/security/timeseries_groups/arc", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  dkim(t = {}, e) {
    return u(t) ? this.dkim({}, t) : this._client.get("/radar/email/security/timeseries_groups/dkim", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  dmarc(t = {}, e) {
    return u(t) ? this.dmarc({}, t) : this._client.get("/radar/email/security/timeseries_groups/dmarc", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  malicious(t = {}, e) {
    return u(t) ? this.malicious({}, t) : this._client.get("/radar/email/security/timeseries_groups/malicious", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  spam(t = {}, e) {
    return u(t) ? this.spam({}, t) : this._client.get("/radar/email/security/timeseries_groups/spam", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  spf(t = {}, e) {
    return u(t) ? this.spf({}, t) : this._client.get("/radar/email/security/timeseries_groups/spf", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  spoof(t = {}, e) {
    return u(t) ? this.spoof({}, t) : this._client.get("/radar/email/security/timeseries_groups/spoof", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  threatCategory(t = {}, e) {
    return u(t) ? this.threatCategory({}, t) : this._client.get("/radar/email/security/timeseries_groups/threat_category", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/email/security/timeseries_groups/tls_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
};
class Zw extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/email/security/top/tlds/malicious/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Tw extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/email/security/top/tlds/spam/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Vw extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/email/security/top/tlds/spoof/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Ke extends o {
  constructor() {
    super(...arguments), this.malicious = new Zw(this._client), this.spam = new Tw(this._client), this.spoof = new Vw(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/email/security/top/tlds", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Ke.Malicious = Zw;
Ke.Spam = Tw;
Ke.Spoof = Vw;
let Ea = class extends o {
  constructor() {
    super(...arguments), this.tlds = new Ke(this._client);
  }
};
Ea.Tlds = Ke;
class Xe extends o {
  constructor() {
    super(...arguments), this.top = new Ea(this._client), this.summary = new Ow(this._client), this.timeseriesGroups = new Cw(this._client);
  }
}
Xe.Top = Ea;
Xe.Summary = Ow;
Xe.TimeseriesGroups = Cw;
let pn = class extends o {
  constructor() {
    super(...arguments), this.routing = new gn(this._client), this.security = new Xe(this._client);
  }
};
pn.Routing = gn;
pn.Security = Xe;
class Dw extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/entities/asns", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/entities/asns/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Retrieves the requested autonomous system information based on IP address.
   * Population estimates come from APNIC (refer to https://labs.apnic.net/?p=526).
   *
   * @example
   * ```ts
   * const response = await client.radar.entities.asns.ip({
   *   ip: '8.8.8.8',
   * });
   * ```
   */
  ip(t, e) {
    return this._client.get("/radar/entities/asns/ip", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  rel(t, e = {}, s) {
    return u(e) ? this.rel(t, {}, e) : this._client.get(`/radar/entities/asns/${t}/rel`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
}
let Ew = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.get("/radar/entities/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/entities/locations/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
};
class wn extends o {
  constructor() {
    super(...arguments), this.asns = new Dw(this._client), this.locations = new Ew(this._client);
  }
  /**
   * Retrieves IP address information.
   *
   * @example
   * ```ts
   * const entity = await client.radar.entities.get({
   *   ip: '8.8.8.8',
   * });
   * ```
   */
  get(t, e) {
    return this._client.get("/radar/entities/ip", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
wn.ASNs = Dw;
wn.Locations = Ew;
let Mw = class extends o {
  botClass(t = {}, e) {
    return u(t) ? this.botClass({}, t) : this._client.get("/radar/http/summary/bot_class", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  deviceType(t = {}, e) {
    return u(t) ? this.deviceType({}, t) : this._client.get("/radar/http/summary/device_type", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  httpProtocol(t = {}, e) {
    return u(t) ? this.httpProtocol({}, t) : this._client.get("/radar/http/summary/http_protocol", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/http/summary/http_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/http/summary/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  os(t = {}, e) {
    return u(t) ? this.os({}, t) : this._client.get("/radar/http/summary/os", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  postQuantum(t = {}, e) {
    return u(t) ? this.postQuantum({}, t) : this._client.get("/radar/http/summary/post_quantum", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/http/summary/tls_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Nw = class extends o {
  botClass(t = {}, e) {
    return u(t) ? this.botClass({}, t) : this._client.get("/radar/http/timeseries_groups/bot_class", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  browser(t = {}, e) {
    return u(t) ? this.browser({}, t) : this._client.get("/radar/http/timeseries_groups/browser", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  browserFamily(t = {}, e) {
    return u(t) ? this.browserFamily({}, t) : this._client.get("/radar/http/timeseries_groups/browser_family", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  deviceType(t = {}, e) {
    return u(t) ? this.deviceType({}, t) : this._client.get("/radar/http/timeseries_groups/device_type", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  httpProtocol(t = {}, e) {
    return u(t) ? this.httpProtocol({}, t) : this._client.get("/radar/http/timeseries_groups/http_protocol", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  httpVersion(t = {}, e) {
    return u(t) ? this.httpVersion({}, t) : this._client.get("/radar/http/timeseries_groups/http_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  ipVersion(t = {}, e) {
    return u(t) ? this.ipVersion({}, t) : this._client.get("/radar/http/timeseries_groups/ip_version", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  os(t = {}, e) {
    return u(t) ? this.os({}, t) : this._client.get("/radar/http/timeseries_groups/os", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  postQuantum(t = {}, e) {
    return u(t) ? this.postQuantum({}, t) : this._client.get("/radar/http/timeseries_groups/post_quantum", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  tlsVersion(t = {}, e) {
    return u(t) ? this.tlsVersion({}, t) : this._client.get("/radar/http/timeseries_groups/tls_version", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}, Yw = class extends o {
  browser(t = {}, e) {
    return u(t) ? this.browser({}, t) : this._client.get("/radar/http/top/browser", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  browserFamily(t = {}, e) {
    return u(t) ? this.browserFamily({}, t) : this._client.get("/radar/http/top/browser_family", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, jw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/bot_class/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Fw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/browser_family/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Gw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/device_type/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Bw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/http_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Hw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/http_protocol/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Ww = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/ip_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}, Kw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/os/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
}, Xw = class extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/ases/tls_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
};
class et extends o {
  constructor() {
    super(...arguments), this.botClass = new jw(this._client), this.deviceType = new Gw(this._client), this.httpProtocol = new Hw(this._client), this.httpMethod = new Bw(this._client), this.ipVersion = new Ww(this._client), this.os = new Kw(this._client), this.tlsVersion = new Xw(this._client), this.browserFamily = new Fw(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/http/top/ases", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
et.BotClass = jw;
et.DeviceType = Gw;
et.HTTPProtocol = Hw;
et.HTTPMethod = Bw;
et.IPVersion = Ww;
et.OS = Kw;
et.TLSVersion = Xw;
et.BrowserFamily = Fw;
class Qw extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/bot_class/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class Jw extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/browser_family/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class qw extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/device_type/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class t$ extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/http_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class e$ extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/http_protocol/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class s$ extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/ip_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
class n$ extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/os/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
}
class i$ extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/http/top/locations/tls_version/${t}`, {
      query: e,
      ...s
    })._thenUnwrap((n) => n.result);
  }
}
let st = class extends o {
  constructor() {
    super(...arguments), this.botClass = new Qw(this._client), this.deviceType = new qw(this._client), this.httpProtocol = new e$(this._client), this.httpMethod = new t$(this._client), this.ipVersion = new s$(this._client), this.os = new n$(this._client), this.tlsVersion = new i$(this._client), this.browserFamily = new Jw(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/http/top/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
st.BotClass = Qw;
st.DeviceType = qw;
st.HTTPProtocol = e$;
st.HTTPMethod = t$;
st.IPVersion = s$;
st.OS = n$;
st.TLSVersion = i$;
st.BrowserFamily = Jw;
class Dt extends o {
  constructor() {
    super(...arguments), this.locations = new st(this._client), this.ases = new et(this._client), this.summary = new Mw(this._client), this.timeseriesGroups = new Nw(this._client), this.top = new Yw(this._client);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/http/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Dt.Locations = st;
Dt.Ases = et;
Dt.Summary = Mw;
Dt.TimeseriesGroups = Nw;
Dt.Top = Yw;
let r$ = class extends o {
  botClass(t = {}, e) {
    return u(t) ? this.botClass({}, t) : this._client.get("/radar/leaked_credential_checks/summary/bot_class", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  compromised(t = {}, e) {
    return u(t) ? this.compromised({}, t) : this._client.get("/radar/leaked_credential_checks/summary/compromised", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
};
class c$ extends o {
  botClass(t = {}, e) {
    return u(t) ? this.botClass({}, t) : this._client.get("/radar/leaked_credential_checks/timeseries_groups/bot_class", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  compromised(t = {}, e) {
    return u(t) ? this.compromised({}, t) : this._client.get("/radar/leaked_credential_checks/timeseries_groups/compromised", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}
class $n extends o {
  constructor() {
    super(...arguments), this.summary = new r$(this._client), this.timeseriesGroups = new c$(this._client);
  }
}
$n.Summary = r$;
$n.TimeseriesGroups = c$;
let o$ = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/netflows/top/ases", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/netflows/top/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
class Ma extends o {
  constructor() {
    super(...arguments), this.top = new o$(this._client);
  }
  summary(t = {}, e) {
    return u(t) ? this.summary({}, t) : this._client.get("/radar/netflows/summary", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  timeseries(t = {}, e) {
    return u(t) ? this.timeseries({}, t) : this._client.get("/radar/netflows/timeseries", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Ma.Top = o$;
class a$ extends o {
  /**
   * Retrieves a summary (percentiles) of bandwidth, latency, or DNS response time
   * from the Radar Internet Quality Index (IQI).
   *
   * @example
   * ```ts
   * const response = await client.radar.quality.iqi.summary({
   *   metric: 'BANDWIDTH',
   * });
   * ```
   */
  summary(t, e) {
    return this._client.get("/radar/quality/iqi/summary", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  /**
   * Retrieves a time series (percentiles) of bandwidth, latency, or DNS response
   * time from the Radar Internet Quality Index (IQI).
   *
   * @example
   * ```ts
   * const response =
   *   await client.radar.quality.iqi.timeseriesGroups({
   *     metric: 'BANDWIDTH',
   *   });
   * ```
   */
  timeseriesGroups(t, e) {
    return this._client.get("/radar/quality/iqi/timeseries_groups", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
let u$ = class extends o {
  ases(t = {}, e) {
    return u(t) ? this.ases({}, t) : this._client.get("/radar/quality/speed/top/ases", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  locations(t = {}, e) {
    return u(t) ? this.locations({}, t) : this._client.get("/radar/quality/speed/top/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}, Na = class extends o {
  constructor() {
    super(...arguments), this.top = new u$(this._client);
  }
  histogram(t = {}, e) {
    return u(t) ? this.histogram({}, t) : this._client.get("/radar/quality/speed/histogram", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  summary(t = {}, e) {
    return u(t) ? this.summary({}, t) : this._client.get("/radar/quality/speed/summary", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
Na.Top = u$;
class mn extends o {
  constructor() {
    super(...arguments), this.iqi = new a$(this._client), this.speed = new Na(this._client);
  }
}
mn.IQI = a$;
mn.Speed = Na;
class l$ extends o {
  get(t, e = {}, s) {
    return u(e) ? this.get(t, {}, e) : this._client.get(`/radar/ranking/domain/${t}`, { query: e, ...s })._thenUnwrap((n) => n.result);
  }
}
class d$ extends o {
  categories(t = {}, e) {
    return u(t) ? this.categories({}, t) : this._client.get("/radar/ranking/internet_services/categories", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  timeseriesGroups(t = {}, e) {
    return u(t) ? this.timeseriesGroups({}, t) : this._client.get("/radar/ranking/internet_services/timeseries_groups", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
  top(t = {}, e) {
    return u(t) ? this.top({}, t) : this._client.get("/radar/ranking/internet_services/top", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
class yn extends o {
  constructor() {
    super(...arguments), this.domain = new l$(this._client), this.internetServices = new d$(this._client);
  }
  timeseriesGroups(t = {}, e) {
    return u(t) ? this.timeseriesGroups({}, t) : this._client.get("/radar/ranking/timeseries_groups", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  top(t = {}, e) {
    return u(t) ? this.top({}, t) : this._client.get("/radar/ranking/top", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
yn.Domain = l$;
yn.InternetServices = d$;
class h$ extends o {
  directive(t = {}, e) {
    return u(t) ? this.directive({}, t) : this._client.get("/radar/robots_txt/top/user_agents/directive", {
      query: t,
      ...e
    })._thenUnwrap((s) => s.result);
  }
}
let Ya = class extends o {
  constructor() {
    super(...arguments), this.userAgents = new h$(this._client);
  }
  domainCategories(t = {}, e) {
    return u(t) ? this.domainCategories({}, t) : this._client.get("/radar/robots_txt/top/domain_categories", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
Ya.UserAgents = h$;
class ja extends o {
  constructor() {
    super(...arguments), this.top = new Ya(this._client);
  }
}
ja.Top = Ya;
let _$ = class extends o {
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/traffic_anomalies/locations", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
};
class Fa extends o {
  constructor() {
    super(...arguments), this.locations = new _$(this._client);
  }
  get(t = {}, e) {
    return u(t) ? this.get({}, t) : this._client.get("/radar/traffic_anomalies", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
Fa.Locations = _$;
class g$ extends o {
  bots(t = {}, e) {
    return u(t) ? this.bots({}, t) : this._client.get("/radar/verified_bots/top/bots", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
  categories(t = {}, e) {
    return u(t) ? this.categories({}, t) : this._client.get("/radar/verified_bots/top/categories", { query: t, ...e })._thenUnwrap((s) => s.result);
  }
}
class Ga extends o {
  constructor() {
    super(...arguments), this.top = new g$(this._client);
  }
}
Ga.Top = g$;
class f extends o {
  constructor() {
    super(...arguments), this.ai = new Tt(this._client), this.annotations = new Ia(this._client), this.bgp = new Vt(this._client), this.bots = new Da(this._client), this.datasets = new cw(this._client), this.dns = new We(this._client), this.netflows = new Ma(this._client), this.search = new ow(this._client), this.verifiedBots = new Ga(this._client), this.as112 = new Ge(this._client), this.email = new pn(this._client), this.attacks = new dn(this._client), this.entities = new wn(this._client), this.http = new Dt(this._client), this.quality = new mn(this._client), this.ranking = new yn(this._client), this.trafficAnomalies = new Fa(this._client), this.tcpResetsTimeouts = new aw(this._client), this.robotsTXT = new ja(this._client), this.leakedCredentials = new $n(this._client);
  }
}
f.AI = Tt;
f.Annotations = Ia;
f.BGP = Vt;
f.Bots = Da;
f.Datasets = cw;
f.DNS = We;
f.Netflows = Ma;
f.Search = ow;
f.VerifiedBots = Ga;
f.AS112 = Ge;
f.Email = pn;
f.Attacks = dn;
f.Entities = wn;
f.HTTP = Dt;
f.Quality = mn;
f.Ranking = yn;
f.TrafficAnomalies = Fa;
f.TCPResetsTimeouts = aw;
f.RobotsTXT = ja;
f.LeakedCredentials = $n;
class Ba extends o {
  /**
   * Creates a new rate limit for a zone. Refer to the object definition for a list
   * of required attributes.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/rate_limits`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the rate limits for a zone.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/rate_limits`, p$, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes an existing rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/rate_limits/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/rate_limits/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the details of a rate limit.
   *
   * @deprecated Rate limiting API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#rate-limiting-api-previous-version for full details.
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/rate_limits/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class p$ extends p {
}
Ba.RateLimitsV4PagePaginationArray = p$;
let Ha = class extends o {
  /**
   * Update individual domain.
   *
   * @example
   * ```ts
   * const domain = await client.registrar.domains.update(
   *   'cloudflare.com',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/registrar/domains/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List domains handled by Registrar.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const domain of client.registrar.domains.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/registrar/domains`, Wa, e);
  }
  /**
   * Show individual domain.
   *
   * @example
   * ```ts
   * const domain = await client.registrar.domains.get(
   *   'cloudflare.com',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/registrar/domains/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, Wa = class extends d {
};
Ha.DomainsSinglePage = Wa;
class fn extends o {
  constructor() {
    super(...arguments), this.domains = new Ha(this._client);
  }
}
fn.Domains = Ha;
fn.DomainsSinglePage = Wa;
class w$ extends o {
  /**
   * Request Trace
   *
   * @example
   * ```ts
   * const trace = await client.requestTracers.traces.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   method: 'PUT',
   *   url: 'https://some.zone/some_path',
   *   body: { base64: 'c29tZV9yZXF1ZXN0X2JvZHk=' },
   *   context: {
   *     geoloc: { city: 'London' },
   *     skip_challenge: true,
   *   },
   *   cookies: {
   *     cookie_name_1: 'cookie_value_1',
   *     cookie_name_2: 'cookie_value_2',
   *   },
   *   headers: {
   *     header_name_1: 'header_value_1',
   *     header_name_2: 'header_value_2',
   *   },
   *   protocol: 'HTTP/1.1',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/request-tracer/trace`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Ka extends o {
  constructor() {
    super(...arguments), this.traces = new w$(this._client);
  }
}
Ka.Traces = w$;
class Xa extends o {
  /**
   * Create a new share recipient
   *
   * @example
   * ```ts
   * const recipient =
   *   await client.resourceSharing.recipients.create(
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     { path_account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { path_account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/shares/${t}/recipients`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List share recipients by share ID.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const recipientListResponse of client.resourceSharing.recipients.list(
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/shares/${t}/recipients`, Qa, { query: i, ...s });
  }
  /**
   * Deletion is not immediate, an updated share recipient object with a new status
   * will be returned.
   *
   * @example
   * ```ts
   * const recipient =
   *   await client.resourceSharing.recipients.delete(
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/shares/${t}/recipients/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get share recipient by ID.
   *
   * @example
   * ```ts
   * const recipient =
   *   await client.resourceSharing.recipients.get(
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/shares/${t}/recipients/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Qa extends p {
}
Xa.RecipientListResponsesV4PagePaginationArray = Qa;
class Ja extends o {
  /**
   * Create a new share resource
   *
   * @example
   * ```ts
   * const resource =
   *   await client.resourceSharing.resources.create(
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       meta: {},
   *       resource_account_id:
   *         '023e105f4ecef8ad9ca31a8372d0c353',
   *       resource_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       resource_type: 'custom-ruleset',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/shares/${t}/resources`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Update is not immediate, an updated share resource object with a new status will
   * be returned.
   *
   * @example
   * ```ts
   * const resource =
   *   await client.resourceSharing.resources.update(
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       meta: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/shares/${t}/resources/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * List share resources by share ID.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const resourceListResponse of client.resourceSharing.resources.list(
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/shares/${t}/resources`, qa, { query: i, ...s });
  }
  /**
   * Deletion is not immediate, an updated share resource object with a new status
   * will be returned.
   *
   * @example
   * ```ts
   * const resource =
   *   await client.resourceSharing.resources.delete(
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/shares/${t}/resources/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get share resource by ID.
   *
   * @example
   * ```ts
   * const resource = await client.resourceSharing.resources.get(
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/shares/${t}/resources/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class qa extends p {
}
Ja.ResourceListResponsesV4PagePaginationArray = qa;
class Et extends o {
  constructor() {
    super(...arguments), this.recipients = new Xa(this._client), this.resources = new Ja(this._client);
  }
  /**
   * Create a new share
   *
   * @example
   * ```ts
   * const resourceSharing = await client.resourceSharing.create(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'My Shared WAF Managed Rule',
   *     recipients: [{}],
   *     resources: [
   *       {
   *         meta: {},
   *         resource_account_id:
   *           '023e105f4ecef8ad9ca31a8372d0c353',
   *         resource_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *         resource_type: 'custom-ruleset',
   *       },
   *     ],
   *   },
   * );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/shares`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updating is not immediate, an updated share object with a new status will be
   * returned.
   *
   * @example
   * ```ts
   * const resourceSharing = await client.resourceSharing.update(
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'My Shared WAF Managed Rule',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/shares/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all account shares.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const resourceSharingListResponse of client.resourceSharing.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/shares`, $$, { query: n, ...e });
  }
  /**
   * Deletion is not immediate, an updated share object with a new status will be
   * returned.
   *
   * @example
   * ```ts
   * const resourceSharing = await client.resourceSharing.delete(
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/shares/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches share by ID.
   *
   * @example
   * ```ts
   * const resourceSharing = await client.resourceSharing.get(
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/shares/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class $$ extends p {
}
Et.ResourceSharingListResponsesV4PagePaginationArray = $$;
Et.Recipients = Xa;
Et.RecipientListResponsesV4PagePaginationArray = Qa;
Et.Resources = Ja;
Et.ResourceListResponsesV4PagePaginationArray = qa;
class m$ extends o {
  /**
   * Gets the current status of an asynchronous operation on a list.
   *
   * The `status` property can have one of the following values: `pending`,
   * `running`, `completed`, or `failed`. If the status is `failed`, the `error`
   * property will contain a message describing the error.
   *
   * @example
   * ```ts
   * const bulkOperation =
   *   await client.rules.lists.bulkOperations.get(
   *     '4da8780eeb215e6cb7f48dd981c4ea02',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/rules/lists/bulk_operations/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
let tu = class extends o {
  /**
   * Appends new items to the list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * `Get bulk operation status` endpoint with the returned `operation_id`.
   *
   * @example
   * ```ts
   * const item = await client.rules.lists.items.create(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{}],
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/rules/lists/${t}/items`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Removes all existing items from the list and adds the provided items to the
   * list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * `Get bulk operation status` endpoint with the returned `operation_id`.
   *
   * @example
   * ```ts
   * const item = await client.rules.lists.items.update(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{}],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/rules/lists/${t}/items`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all the items in the list.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const itemListResponse of client.rules.lists.items.list(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/rules/lists/${t}/items`, eu, { query: i, ...s });
  }
  /**
   * Removes one or more items from a list.
   *
   * This operation is asynchronous. To get current the operation status, invoke the
   * `Get bulk operation status` endpoint with the returned `operation_id`.
   *
   * @example
   * ```ts
   * const item = await client.rules.lists.items.delete(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.delete(`/accounts/${n}/rules/lists/${t}/items`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a list item in the list.
   *
   * @example
   * ```ts
   * const item = await client.rules.lists.items.get(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   '34b12448945f11eaa1b71c4d701ab86e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/rules/lists/${t}/items/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class eu extends Is {
}
tu.ItemListResponsesCursorPagination = eu;
let le = class extends o {
  constructor() {
    super(...arguments), this.bulkOperations = new m$(this._client), this.items = new tu(this._client);
  }
  /**
   * Creates a new list of the specified type.
   *
   * @example
   * ```ts
   * const list = await client.rules.lists.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   kind: 'ip',
   *   name: 'list1',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/rules/lists`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates the description of a list.
   *
   * @example
   * ```ts
   * const list = await client.rules.lists.update(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/rules/lists/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all lists in the account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const listsList of client.rules.lists.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/rules/lists`, su, e);
  }
  /**
   * Deletes a specific list and all its items.
   *
   * @example
   * ```ts
   * const list = await client.rules.lists.delete(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/rules/lists/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the details of a list.
   *
   * @example
   * ```ts
   * const list = await client.rules.lists.get(
   *   '2c0fc9fa937b11eaa1b71c4d701ab86e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/rules/lists/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class su extends d {
}
le.ListsListsSinglePage = su;
le.BulkOperations = m$;
le.Items = tu;
le.ItemListResponsesCursorPagination = eu;
let Pn = class extends o {
  constructor() {
    super(...arguments), this.lists = new le(this._client);
  }
};
Pn.Lists = le;
Pn.ListsListsSinglePage = su;
let y$ = class extends o {
  /**
   * Adds a new rule to an account or zone ruleset. The rule will be added to the end
   * of the existing list of rules in the ruleset by default.
   *
   * @example
   * ```ts
   * const rule = await client.rulesets.rules.create(
   *   '2f2feab2026849078ba485f918791bdc',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${a}/${l}/rulesets/${t}/rules`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  delete(t, e, s = {}, n) {
    if (u(s))
      return this.delete(t, e, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${a}/${l}/rulesets/${t}/rules/${e}`, n)._thenUnwrap((g) => g.result);
  }
  /**
   * Updates an existing rule in an account or zone ruleset.
   *
   * @example
   * ```ts
   * const response = await client.rulesets.rules.edit(
   *   '2f2feab2026849078ba485f918791bdc',
   *   '3a03d665bac047339bb530ecb439a90d',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, zone_id: c, ...a } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: l, accountOrZoneId: g } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.patch(`/${l}/${g}/rulesets/${t}/rules/${e}`, {
      body: a,
      ...n
    })._thenUnwrap((y) => y.result);
  }
}, nu = class extends o {
  list(t, e = {}, s) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/rulesets/${t}/versions`, iu, s);
  }
  delete(t, e, s = {}, n) {
    if (u(s))
      return this.delete(t, e, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${a}/${l}/rulesets/${t}/versions/${e}`, { ...n, headers: { Accept: "*/*", ...n?.headers } });
  }
  get(t, e, s = {}, n) {
    if (u(s))
      return this.get(t, e, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${a}/${l}/rulesets/${t}/versions/${e}`, n)._thenUnwrap((g) => g.result);
  }
}, iu = class extends d {
};
nu.VersionListResponsesSinglePage = iu;
let ru = class extends o {
  list(t, e = {}, s) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/rulesets/phases/${t}/entrypoint/versions`, cu, s);
  }
  get(t, e, s = {}, n) {
    if (u(s))
      return this.get(t, e, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${a}/${l}/rulesets/phases/${t}/entrypoint/versions/${e}`, n)._thenUnwrap((g) => g.result);
  }
};
class cu extends d {
}
ru.VersionListResponsesSinglePage = cu;
class bn extends o {
  constructor() {
    super(...arguments), this.versions = new ru(this._client);
  }
  /**
   * Updates an account or zone entry point ruleset, creating a new version.
   *
   * @example
   * ```ts
   * const phase = await client.rulesets.phases.update(
   *   'http_request_firewall_custom',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/rulesets/phases/${t}/entrypoint`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/rulesets/phases/${t}/entrypoint`, s)._thenUnwrap((l) => l.result);
  }
}
bn.Versions = ru;
bn.VersionListResponsesSinglePage = cu;
class Mt extends o {
  constructor() {
    super(...arguments), this.phases = new bn(this._client), this.rules = new y$(this._client), this.versions = new nu(this._client);
  }
  /**
   * Creates a ruleset.
   *
   * @example
   * ```ts
   * const ruleset = await client.rulesets.create({
   *   kind: 'root',
   *   name: 'My ruleset',
   *   phase: 'http_request_firewall_custom',
   *   account_id: 'account_id',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/rulesets`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an account or zone ruleset, creating a new version.
   *
   * @example
   * ```ts
   * const ruleset = await client.rulesets.update(
   *   '2f2feab2026849078ba485f918791bdc',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/rulesets/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/rulesets`, f$, { query: i, ...e });
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/rulesets/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/rulesets/${t}`, s)._thenUnwrap((l) => l.result);
  }
}
class f$ extends Is {
}
Mt.RulesetListResponsesCursorPagination = f$;
Mt.Phases = bn;
Mt.Rules = y$;
Mt.Versions = nu;
Mt.VersionListResponsesSinglePage = iu;
class P$ extends o {
  /**
   * Returns the set of hostnames, the signature algorithm, and the expiration date
   * of the certificate.
   *
   * @example
   * ```ts
   * const analyze = await client.ssl.analyze.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/ssl/analyze`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
}
class b$ extends o {
  /**
   * Retrieve the SSL/TLS Recommender's recommendation for a zone.
   *
   * @example
   * ```ts
   * const recommendation = await client.ssl.recommendations.get(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/ssl/recommendation`, e)._thenUnwrap((n) => n.result);
  }
}
class U$ extends o {
  /**
   * Edit SSL validation method for a certificate pack. A PATCH request will request
   * an immediate validation check on any certificate, and return the updated status.
   * If a validation method is provided, the validation will be immediately attempted
   * using that method.
   *
   * @example
   * ```ts
   * const response = await client.ssl.verification.edit(
   *   'a77f8bd7-3b47-46b4-a6f1-75cf98109948',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     validation_method: 'txt',
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/ssl/verification/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get SSL Verification Info for a Zone.
   *
   * @example
   * ```ts
   * const verifications = await client.ssl.verification.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/ssl/verification`, { query: n, ...e })._thenUnwrap((i) => i.result);
  }
}
let x$ = class extends o {
  /**
   * For a given zone, list certificate pack quotas.
   *
   * @example
   * ```ts
   * const quota = await client.ssl.certificatePacks.quota.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/ssl/certificate_packs/quota`, e)._thenUnwrap((n) => n.result);
  }
};
class Un extends o {
  constructor() {
    super(...arguments), this.quota = new x$(this._client);
  }
  /**
   * For a given zone, order an advanced certificate pack.
   *
   * @example
   * ```ts
   * const certificatePack =
   *   await client.ssl.certificatePacks.create({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     certificate_authority: 'lets_encrypt',
   *     hosts: [
   *       'example.com',
   *       '*.example.com',
   *       'www.example.com',
   *     ],
   *     type: 'advanced',
   *     validation_method: 'txt',
   *     validity_days: 14,
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/ssl/certificate_packs/order`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * For a given zone, list all active certificate packs.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const certificatePackListResponse of client.ssl.certificatePacks.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/ssl/certificate_packs`, ou, { query: n, ...e });
  }
  /**
   * For a given zone, delete an advanced certificate pack.
   *
   * @example
   * ```ts
   * const certificatePack =
   *   await client.ssl.certificatePacks.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/ssl/certificate_packs/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * For a given zone, restart validation or add cloudflare branding for an advanced
   * certificate pack. The former is only a validation operation for a Certificate
   * Pack in a validation_timed_out status.
   *
   * @example
   * ```ts
   * const response = await client.ssl.certificatePacks.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/ssl/certificate_packs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * For a given zone, get a certificate pack.
   *
   * @example
   * ```ts
   * const certificatePack =
   *   await client.ssl.certificatePacks.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/ssl/certificate_packs/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class ou extends d {
}
Un.CertificatePackListResponsesSinglePage = ou;
Un.Quota = x$;
let S$ = class extends o {
  /**
   * Patch Universal SSL Settings for a Zone.
   *
   * @example
   * ```ts
   * const universalSSLSettings =
   *   await client.ssl.universal.settings.edit({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/ssl/universal/settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get Universal SSL Settings for a Zone.
   *
   * @example
   * ```ts
   * const universalSSLSettings =
   *   await client.ssl.universal.settings.get({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/ssl/universal/settings`, e)._thenUnwrap((n) => n.result);
  }
};
class au extends o {
  constructor() {
    super(...arguments), this.settings = new S$(this._client);
  }
}
au.Settings = S$;
class ft extends o {
  constructor() {
    super(...arguments), this.analyze = new P$(this._client), this.certificatePacks = new Un(this._client), this.recommendations = new b$(this._client), this.universal = new au(this._client), this.verification = new U$(this._client);
  }
}
ft.Analyze = P$;
ft.CertificatePacks = Un;
ft.CertificatePackListResponsesSinglePage = ou;
ft.Recommendations = b$;
ft.Universal = au;
ft.VerificationResource = U$;
class uu extends o {
  /**
   * Upload a schema
   *
   * @example
   * ```ts
   * const schema = await client.schemaValidation.schemas.create(
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     kind: 'openapi_v3',
   *     name: 'petstore schema',
   *     source: '<schema file contents>',
   *     validation_enabled: true,
   *   },
   * );
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/schema_validation/schemas`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List all uploaded schemas
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const schemaListResponse of client.schemaValidation.schemas.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/schema_validation/schemas`, lu, { query: n, ...e });
  }
  /**
   * Delete a schema
   *
   * @example
   * ```ts
   * const schema = await client.schemaValidation.schemas.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/schema_validation/schemas/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Edit details of a schema to enable validation
   *
   * @example
   * ```ts
   * const response = await client.schemaValidation.schemas.edit(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/schema_validation/schemas/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get details of a schema
   *
   * @example
   * ```ts
   * const schema = await client.schemaValidation.schemas.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.get(`/zones/${n}/schema_validation/schemas/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class lu extends p {
}
uu.SchemaListResponsesV4PagePaginationArray = lu;
class du extends o {
  /**
   * Update per-operation schema validation setting
   *
   * @example
   * ```ts
   * const operation =
   *   await client.schemaValidation.settings.operations.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       mitigation_action: 'block',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/schema_validation/settings/operations/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List per-operation schema validation settings
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const operationListResponse of client.schemaValidation.settings.operations.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/schema_validation/settings/operations`, hu, { query: n, ...e });
  }
  /**
   * Delete per-operation schema validation setting
   *
   * @example
   * ```ts
   * const operation =
   *   await client.schemaValidation.settings.operations.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/schema_validation/settings/operations/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Bulk edit per-operation schema validation settings
   *
   * @example
   * ```ts
   * const response =
   *   await client.schemaValidation.settings.operations.bulkEdit(
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       body: {
   *         '3818d821-5901-4147-a474-f5f5aec1d54e': {},
   *         'b17c8043-99a0-4202-b7d9-8f7cdbee02cd': {},
   *       },
   *     },
   *   );
   * ```
   */
  bulkEdit(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.patch(`/zones/${s}/schema_validation/settings/operations`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get per-operation schema validation setting
   *
   * @example
   * ```ts
   * const operation =
   *   await client.schemaValidation.settings.operations.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/schema_validation/settings/operations/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class hu extends p {
}
du.OperationListResponsesV4PagePaginationArray = hu;
let xn = class extends o {
  constructor() {
    super(...arguments), this.operations = new du(this._client);
  }
  /**
   * Update global schema validation settings
   *
   * @example
   * ```ts
   * const setting =
   *   await client.schemaValidation.settings.update({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     validation_default_mitigation_action: 'block',
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/schema_validation/settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Edit global schema validation settings
   *
   * @example
   * ```ts
   * const response =
   *   await client.schemaValidation.settings.edit({
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/schema_validation/settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get global schema validation settings
   *
   * @example
   * ```ts
   * const setting = await client.schemaValidation.settings.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/schema_validation/settings`, e)._thenUnwrap((n) => n.result);
  }
};
xn.Operations = du;
xn.OperationListResponsesV4PagePaginationArray = hu;
class Qe extends o {
  constructor() {
    super(...arguments), this.schemas = new uu(this._client), this.settings = new xn(this._client);
  }
}
Qe.Schemas = uu;
Qe.SchemaListResponsesV4PagePaginationArray = lu;
Qe.Settings = xn;
let z$ = class extends o {
  /**
   * Lists the number of secrets used in the account.
   *
   * @example
   * ```ts
   * const quota = await client.secretsStore.quota.get({
   *   account_id: '985e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/secrets_store/quota`, e)._thenUnwrap((n) => n.result);
  }
}, Je = class extends o {
  /**
   * Creates a secret in the account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const secretCreateResponse of client.secretsStore.stores.secrets.create(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     account_id: '985e105f4ecef8ad9ca31a8372d0c353',
   *     body: [
   *       {
   *         name: 'MY_API_KEY',
   *         scopes: ['workers'],
   *         value: 'api-token-secret-123',
   *       },
   *     ],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.getAPIList(`/accounts/${n}/secrets_store/stores/${t}/secrets`, _u, { body: i, method: "post", ...s });
  }
  /**
   * Lists all store secrets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const secretListResponse of client.secretsStore.stores.secrets.list(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '985e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/secrets_store/stores/${t}/secrets`, gu, { query: i, ...s });
  }
  /**
   * Deletes a single secret
   *
   * @example
   * ```ts
   * const secret =
   *   await client.secretsStore.stores.secrets.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     { account_id: '985e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/secrets_store/stores/${t}/secrets/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes one or more secrets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const secretBulkDeleteResponse of client.secretsStore.stores.secrets.bulkDelete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '985e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulkDelete(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/secrets_store/stores/${t}/secrets`, pu, { method: "delete", ...s });
  }
  /**
   * Duplicates the secret, keeping the value
   *
   * @example
   * ```ts
   * const response =
   *   await client.secretsStore.stores.secrets.duplicate(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     {
   *       account_id: '985e105f4ecef8ad9ca31a8372d0c353',
   *       name: 'MY_API_KEY',
   *     },
   *   );
   * ```
   */
  duplicate(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.post(`/accounts/${i}/secrets_store/stores/${t}/secrets/${e}/duplicate`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * Updates a single secret
   *
   * @example
   * ```ts
   * const response =
   *   await client.secretsStore.stores.secrets.edit(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '3fd85f74b32742f1bff64a85009dda07',
   *     {
   *       account_id: '985e105f4ecef8ad9ca31a8372d0c353',
   *       name: 'MY_API_KEY',
   *     },
   *   );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/secrets_store/stores/${t}/secrets/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Returns details of a single secret
   *
   * @example
   * ```ts
   * const secret = await client.secretsStore.stores.secrets.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   '3fd85f74b32742f1bff64a85009dda07',
   *   { account_id: '985e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/secrets_store/stores/${t}/secrets/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class _u extends d {
}
class gu extends p {
}
class pu extends d {
}
Je.SecretCreateResponsesSinglePage = _u;
Je.SecretListResponsesV4PagePaginationArray = gu;
Je.SecretBulkDeleteResponsesSinglePage = pu;
class Pt extends o {
  constructor() {
    super(...arguments), this.secrets = new Je(this._client);
  }
  /**
   * Creates a store in the account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const storeCreateResponse of client.secretsStore.stores.create(
   *   {
   *     account_id: '985e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{ name: 'service_x_keys' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.getAPIList(`/accounts/${s}/secrets_store/stores`, wu, { body: n, method: "post", ...e });
  }
  /**
   * Lists all the stores in an account
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const storeListResponse of client.secretsStore.stores.list(
   *   { account_id: '985e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/secrets_store/stores`, $u, { query: n, ...e });
  }
  /**
   * Deletes a single store
   *
   * @example
   * ```ts
   * const store = await client.secretsStore.stores.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '985e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/secrets_store/stores/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class wu extends d {
}
class $u extends p {
}
Pt.StoreCreateResponsesSinglePage = wu;
Pt.StoreListResponsesV4PagePaginationArray = $u;
Pt.Secrets = Je;
Pt.SecretCreateResponsesSinglePage = _u;
Pt.SecretListResponsesV4PagePaginationArray = gu;
Pt.SecretBulkDeleteResponsesSinglePage = pu;
class de extends o {
  constructor() {
    super(...arguments), this.stores = new Pt(this._client), this.quota = new z$(this._client);
  }
}
de.Stores = Pt;
de.StoreCreateResponsesSinglePage = wu;
de.StoreListResponsesV4PagePaginationArray = $u;
de.Quota = z$;
class R$ extends o {
  get(t = {}, e) {
    if (u(t))
      return this.get({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${c}/${a}/security-center/insights/class`, {
      query: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
class A$ extends o {
  get(t = {}, e) {
    if (u(t))
      return this.get({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${c}/${a}/security-center/insights/severity`, {
      query: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
class v$ extends o {
  get(t = {}, e) {
    if (u(t))
      return this.get({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${c}/${a}/security-center/insights/type`, {
      query: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
}
class he extends o {
  constructor() {
    super(...arguments), this.class = new R$(this._client), this.severity = new A$(this._client), this.type = new v$(this._client);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/security-center/insights`, mu, { query: i, ...e });
  }
  /**
   * Archive Security Center Insight
   */
  dismiss(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/security-center/insights/${t}/dismiss`, { body: c, ...s });
  }
}
class mu extends F {
}
he.InsightListResponsesV4PagePagination = mu;
he.Class = R$;
he.Severity = A$;
he.Type = v$;
class Sn extends o {
  constructor() {
    super(...arguments), this.insights = new he(this._client);
  }
}
Sn.Insights = he;
Sn.InsightListResponsesV4PagePagination = mu;
class L$ extends o {
  /**
   * Update security.txt
   *
   * @example
   * ```ts
   * const securityTXT = await client.securityTXT.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/security-center/securitytxt`, { body: n, ...e });
  }
  /**
   * Delete security.txt
   *
   * @example
   * ```ts
   * const securityTXT = await client.securityTXT.delete({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/security-center/securitytxt`, e);
  }
  /**
   * Get security.txt
   *
   * @example
   * ```ts
   * const securityTXT = await client.securityTXT.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/security-center/securitytxt`, e)._thenUnwrap((n) => n.result);
  }
}
let I$ = class extends o {
  /**
   * Snippet Content
   *
   * @example
   * ```ts
   * const content = await client.snippets.content.get(
   *   'snippet_name_01',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   *
   * const data = await content.blob();
   * console.log(data);
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/snippets/${t}/content`, {
      ...s,
      headers: { Accept: "multipart/form-data", ...s?.headers },
      __binaryResponse: !0
    });
  }
}, zn = class extends o {
  /**
   * Put Rules
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ruleUpdateResponse of client.snippets.rules.update(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/snippets/snippet_rules`, yu, { body: n, method: "put", ...e });
  }
  /**
   * Rules
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ruleListResponse of client.snippets.rules.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/snippets/snippet_rules`, fu, e);
  }
  /**
   * Delete All Rules
   *
   * @example
   * ```ts
   * const rule = await client.snippets.rules.delete({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/snippets/snippet_rules`, e);
  }
};
class yu extends d {
}
let fu = class extends d {
};
zn.RuleUpdateResponsesSinglePage = yu;
zn.RuleListResponsesSinglePage = fu;
class Nt extends o {
  constructor() {
    super(...arguments), this.content = new I$(this._client), this.rules = new zn(this._client);
  }
  /**
   * Put Snippet
   *
   * @example
   * ```ts
   * const snippet = await client.snippets.update(
   *   'snippet_name_01',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/snippets/${t}`, S({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * All Snippets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const snippet of client.snippets.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/snippets`, k$, e);
  }
  /**
   * Delete Snippet
   *
   * @example
   * ```ts
   * const snippet = await client.snippets.delete(
   *   'snippet_name_01',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/snippets/${t}`, s);
  }
  /**
   * Snippet
   *
   * @example
   * ```ts
   * const snippet = await client.snippets.get(
   *   'snippet_name_01',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/snippets/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class k$ extends d {
}
Nt.SnippetsSinglePage = k$;
Nt.Content = I$;
Nt.Rules = zn;
Nt.RuleUpdateResponsesSinglePage = yu;
Nt.RuleListResponsesSinglePage = fu;
class Pu extends o {
  /**
   * Creates a new Spectrum application from a configuration using a name for the
   * origin.
   *
   * @example
   * ```ts
   * const app = await client.spectrum.apps.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   dns: {},
   *   ip_firewall: true,
   *   protocol: 'tcp/22',
   *   proxy_protocol: 'off',
   *   tls: 'full',
   *   traffic_type: 'direct',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/spectrum/apps`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a previously existing application's configuration that uses a name for
   * the origin.
   *
   * @example
   * ```ts
   * const app = await client.spectrum.apps.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     dns: {},
   *     ip_firewall: true,
   *     protocol: 'tcp/22',
   *     proxy_protocol: 'off',
   *     tls: 'full',
   *     traffic_type: 'direct',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/spectrum/apps/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves a list of currently existing Spectrum applications inside a zone.
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/spectrum/apps`, bu, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes a previously existing application.
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/spectrum/apps/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the application configuration of a specific application inside a zone.
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/spectrum/apps/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class bu extends p {
}
Pu.AppListResponsesV4PagePaginationArray = bu;
class O$ extends o {
  /**
   * Retrieves analytics aggregated from the last minute of usage on Spectrum
   * applications underneath a given zone.
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/spectrum/analytics/aggregate/current`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Uu extends o {
  constructor() {
    super(...arguments), this.currents = new O$(this._client);
  }
}
Uu.Currents = O$;
class C$ extends o {
  /**
   * Retrieves a list of aggregate metrics grouped by time interval.
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/spectrum/analytics/events/bytime`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Z$ extends o {
  /**
   * Retrieves a list of summarised aggregate metrics over a given time period.
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/spectrum/analytics/events/summary`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let Rn = class extends o {
  constructor() {
    super(...arguments), this.bytimes = new C$(this._client), this.summaries = new Z$(this._client);
  }
};
Rn.Bytimes = C$;
Rn.Summaries = Z$;
class An extends o {
  constructor() {
    super(...arguments), this.aggregates = new Uu(this._client), this.events = new Rn(this._client);
  }
}
An.Aggregates = Uu;
An.Events = Rn;
class qe extends o {
  constructor() {
    super(...arguments), this.analytics = new An(this._client), this.apps = new Pu(this._client);
  }
}
qe.Analytics = An;
qe.Apps = Pu;
qe.AppListResponsesV4PagePaginationArray = bu;
class T$ extends o {
  /**
   * Retrieves quota for all plans, as well as the current zone quota.
   *
   * @example
   * ```ts
   * const availability = await client.speed.availabilities.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/speed_api/availabilities`, e)._thenUnwrap((n) => n.result);
  }
}
class V$ extends o {
  /**
   * Creates a scheduled test for a page.
   *
   * @example
   * ```ts
   * const schedule = await client.speed.schedule.create(
   *   'example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  create(t, e, s) {
    const { zone_id: n, region: i } = e;
    return this._client.post(`/zones/${n}/speed_api/schedule/${t}`, {
      query: { region: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a scheduled test for a page.
   *
   * @example
   * ```ts
   * const schedule = await client.speed.schedule.delete(
   *   'example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n, region: i } = e;
    return this._client.delete(`/zones/${n}/speed_api/schedule/${t}`, {
      query: { region: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves the test schedule for a page in a specific region.
   *
   * @example
   * ```ts
   * const schedule = await client.speed.schedule.get(
   *   'example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.get(`/zones/${n}/speed_api/schedule/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let xu = class extends o {
  /**
   * Starts a test for a specific webpage, in a specific region.
   *
   * @example
   * ```ts
   * const test = await client.speed.pages.tests.create(
   *   'example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  create(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.post(`/zones/${n}/speed_api/pages/${t}/tests`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Test history (list of tests) for a specific webpage.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const test of client.speed.pages.tests.list(
   *   'example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.getAPIList(`/zones/${n}/speed_api/pages/${t}/tests`, Su, { query: i, ...s });
  }
  /**
   * Deletes all tests for a specific webpage from a specific region. Deleted tests
   * are still counted as part of the quota.
   *
   * @example
   * ```ts
   * const test = await client.speed.pages.tests.delete(
   *   'example.com',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n, region: i } = e;
    return this._client.delete(`/zones/${n}/speed_api/pages/${t}/tests`, {
      query: { region: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Retrieves the result of a specific test.
   *
   * @example
   * ```ts
   * const test = await client.speed.pages.tests.get(
   *   'example.com',
   *   'test_id',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/speed_api/pages/${t}/tests/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class Su extends p {
}
xu.TestsV4PagePaginationArray = Su;
class ts extends o {
  constructor() {
    super(...arguments), this.tests = new xu(this._client);
  }
  /**
   * Lists all webpages which have been tested.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const pageListResponse of client.speed.pages.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/speed_api/pages`, zu, e);
  }
  /**
   * Lists the core web vital metrics trend over time for a specific page.
   *
   * @example
   * ```ts
   * const trend = await client.speed.pages.trend(
   *   'example.com',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     deviceType: 'DESKTOP',
   *     metrics: 'performanceScore,ttfb,fcp,si,lcp,tti,tbt,cls',
   *     region: 'us-central1',
   *     start: '2014-01-01T05:20:00.12345Z',
   *     tz: 'tz',
   *   },
   * );
   * ```
   */
  trend(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.get(`/zones/${n}/speed_api/pages/${t}/trend`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class zu extends d {
}
ts.PageListResponsesSinglePage = zu;
ts.Tests = xu;
ts.TestsV4PagePaginationArray = Su;
class _e extends o {
  constructor() {
    super(...arguments), this.schedule = new V$(this._client), this.availabilities = new T$(this._client), this.pages = new ts(this._client);
  }
}
_e.ScheduleResource = V$;
_e.Availabilities = T$;
_e.Pages = ts;
_e.PageListResponsesSinglePage = zu;
class Ru extends o {
  /**
   * Deletes additional audio tracks on a video. Deleting a default audio track is
   * not allowed. You must assign another audio track as default prior to deletion.
   *
   * @example
   * ```ts
   * const audioTrack = await client.stream.audioTracks.delete(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/stream/${t}/audio/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Adds an additional audio track to a video using the provided audio track URL.
   *
   * @example
   * ```ts
   * const audio = await client.stream.audioTracks.copy(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     label: 'director commentary',
   *   },
   * );
   * ```
   */
  copy(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/stream/${t}/audio/copy`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Edits additional audio tracks on a video. Editing the default status of an audio
   * track to `true` will mark all other audio tracks on the video default status to
   * `false`.
   *
   * @example
   * ```ts
   * const audio = await client.stream.audioTracks.edit(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/stream/${t}/audio/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists additional audio tracks on a video. Note this API will not return
   * information for audio attached to the video upload.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const audio of client.stream.audioTracks.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/stream/${t}/audio`, Au, s);
  }
}
class Au extends d {
}
Ru.AudioSinglePage = Au;
class D$ extends o {
  /**
   * Clips a video based on the specified start and end times provided in seconds.
   *
   * @example
   * ```ts
   * const clip = await client.stream.clip.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   clippedFromVideoUID: '023e105f4ecef8ad9ca31a8372d0c353',
   *   endTimeSeconds: 0,
   *   startTimeSeconds: 0,
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/stream/clip`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
}
class E$ extends o {
  /**
   * Uploads a video to Stream from a provided URL.
   *
   * @example
   * ```ts
   * const video = await client.stream.copy.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   url: 'https://example.com/myvideo.mp4',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, "Upload-Creator": n, ...i } = t;
    return this._client.post(`/accounts/${s}/stream/copy`, {
      body: i,
      ...e,
      headers: {
        ...n != null ? { "Upload-Creator": n } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
class M$ extends o {
  /**
   * Creates a direct upload that allows video uploads without an API key.
   *
   * @example
   * ```ts
   * const directUpload =
   *   await client.stream.directUpload.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     maxDurationSeconds: 1,
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, "Upload-Creator": n, ...i } = t;
    return this._client.post(`/accounts/${s}/stream/direct_upload`, {
      body: i,
      ...e,
      headers: {
        ...n != null ? { "Upload-Creator": n } : void 0,
        ...e?.headers
      }
    })._thenUnwrap((c) => c.result);
  }
}
let N$ = class extends o {
  /**
   * Creates a download for a video when a video is ready to view.
   *
   * @example
   * ```ts
   * const download = await client.stream.downloads.create(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {},
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/stream/${t}/downloads`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Delete the downloads for a video.
   *
   * @example
   * ```ts
   * const download = await client.stream.downloads.delete(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/stream/${t}/downloads`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists the downloads created for a video.
   *
   * @example
   * ```ts
   * const download = await client.stream.downloads.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/stream/${t}/downloads`, s)._thenUnwrap((i) => i.result);
  }
};
class Y$ extends o {
  /**
   * Fetches an HTML code snippet to embed a video in a web page delivered through
   * Cloudflare. On success, returns an HTML fragment for use on web pages to display
   * a video. On failure, returns a JSON response body.
   *
   * @example
   * ```ts
   * const embed = await client.stream.embed.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/stream/${t}/embed`, s);
  }
}
let j$ = class extends o {
  /**
   * Creates an RSA private key in PEM and JWK formats. Key files are only displayed
   * once after creation. Keys are created, used, and deleted independently of
   * videos, and every key can sign any video.
   *
   * @example
   * ```ts
   * const keys = await client.stream.keys.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   body: {},
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.post(`/accounts/${s}/stream/keys`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes signing keys and revokes all signed URLs generated with the key.
   *
   * @example
   * ```ts
   * const key = await client.stream.keys.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/stream/keys/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Lists the video ID and creation date and time when a signing key was created.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const keyGetResponse of client.stream.keys.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/stream/keys`, vu, e);
  }
};
class vu extends d {
}
j$.KeyGetResponsesSinglePage = vu;
let F$ = class extends o {
  /**
   * Creates a signed URL token for a video. If a body is not provided in the
   * request, a token is created with default values.
   *
   * @example
   * ```ts
   * const token = await client.stream.token.create(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/stream/${t}/token`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class G$ extends o {
  /**
   * Returns information about an account's storage use.
   *
   * @example
   * ```ts
   * const response = await client.stream.videos.storageUsage({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  storageUsage(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/stream/storage-usage`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Lu extends o {
  /**
   * Creates watermark profiles using a single `HTTP POST multipart/form-data`
   * request.
   *
   * @example
   * ```ts
   * const watermark = await client.stream.watermarks.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   file: '@/Users/rchen/Downloads/watermark.png',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/stream/watermarks`, S({ body: n, ...e }))._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all watermark profiles for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const watermark of client.stream.watermarks.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/stream/watermarks`, Iu, e);
  }
  /**
   * Deletes a watermark profile.
   *
   * @example
   * ```ts
   * const watermark = await client.stream.watermarks.delete(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/stream/watermarks/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves details for a single watermark profile.
   *
   * @example
   * ```ts
   * const watermark = await client.stream.watermarks.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/stream/watermarks/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Iu extends d {
}
Lu.WatermarksSinglePage = Iu;
class B$ extends o {
  /**
   * Creates a webhook notification.
   *
   * @example
   * ```ts
   * const webhook = await client.stream.webhooks.update({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   notificationUrl: 'https://example.com',
   * });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/stream/webhook`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes a webhook.
   *
   * @example
   * ```ts
   * const webhook = await client.stream.webhooks.delete({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/stream/webhook`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Retrieves a list of webhooks.
   *
   * @example
   * ```ts
   * const webhook = await client.stream.webhooks.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/stream/webhook`, e)._thenUnwrap((n) => n.result);
  }
}
class H$ extends o {
  /**
   * Return WebVTT captions for a provided language.
   *
   * @example
   * ```ts
   * const vtt = await client.stream.captions.language.vtt.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   'tr',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/stream/${t}/captions/${e}/vtt`, {
      ...n,
      headers: { Accept: "text/vtt", ...n?.headers }
    });
  }
}
class ku extends o {
  constructor() {
    super(...arguments), this.vtt = new H$(this._client);
  }
  /**
   * Generate captions or subtitles for provided language via AI.
   *
   * @example
   * ```ts
   * const caption =
   *   await client.stream.captions.language.create(
   *     'ea95132c15732412d22c1476fa83f27a',
   *     'tr',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.post(`/accounts/${i}/stream/${t}/captions/${e}/generate`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Uploads the caption or subtitle file to the endpoint for a specific BCP47
   * language. One caption or subtitle file per language is allowed.
   *
   * @example
   * ```ts
   * const caption =
   *   await client.stream.captions.language.update(
   *     'ea95132c15732412d22c1476fa83f27a',
   *     'tr',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       file: '@/Users/kyle/Desktop/tr.vtt',
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/stream/${t}/captions/${e}`, S({ body: c, ...n }))._thenUnwrap((a) => a.result);
  }
  /**
   * Removes the captions or subtitles from a video.
   *
   * @example
   * ```ts
   * const language =
   *   await client.stream.captions.language.delete(
   *     'ea95132c15732412d22c1476fa83f27a',
   *     'tr',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/stream/${t}/captions/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Lists the captions or subtitles for provided language.
   *
   * @example
   * ```ts
   * const caption = await client.stream.captions.language.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   'tr',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/stream/${t}/captions/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
ku.Vtt = H$;
class vn extends o {
  constructor() {
    super(...arguments), this.language = new ku(this._client);
  }
  /**
   * Lists the available captions or subtitles for a specific video.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const caption of client.stream.captions.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/stream/${t}/captions`, Ou, s);
  }
}
class Ou extends d {
}
vn.CaptionsSinglePage = Ou;
vn.Language = ku;
class Cu extends o {
  /**
   * Creates a new output that can be used to simulcast or restream live video to
   * other RTMP or SRT destinations. Outputs are always linked to a specific live
   * input — one live input can have many outputs.
   *
   * @example
   * ```ts
   * const output =
   *   await client.stream.liveInputs.outputs.create(
   *     '66be4bf738797e01e1fca35a7bdecdcd',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       streamKey: 'uzya-f19y-g2g9-a2ee-51j2',
   *       url: 'rtmp://a.rtmp.youtube.com/live2',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/stream/live_inputs/${t}/outputs`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates the state of an output.
   *
   * @example
   * ```ts
   * const output =
   *   await client.stream.liveInputs.outputs.update(
   *     '66be4bf738797e01e1fca35a7bdecdcd',
   *     'baea4d9c515887b80289d5c33cf01145',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       enabled: true,
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/stream/live_inputs/${t}/outputs/${e}`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * Retrieves all outputs associated with a specified live input.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const output of client.stream.liveInputs.outputs.list(
   *   '66be4bf738797e01e1fca35a7bdecdcd',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/stream/live_inputs/${t}/outputs`, Zu, s);
  }
  /**
   * Deletes an output and removes it from the associated live input.
   *
   * @example
   * ```ts
   * await client.stream.liveInputs.outputs.delete(
   *   '66be4bf738797e01e1fca35a7bdecdcd',
   *   'baea4d9c515887b80289d5c33cf01145',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/stream/live_inputs/${t}/outputs/${e}`, { ...n, headers: { Accept: "*/*", ...n?.headers } });
  }
}
class Zu extends d {
}
Cu.OutputsSinglePage = Zu;
class Ln extends o {
  constructor() {
    super(...arguments), this.outputs = new Cu(this._client);
  }
  /**
   * Creates a live input, and returns credentials that you or your users can use to
   * stream live video to Cloudflare Stream.
   *
   * @example
   * ```ts
   * const liveInput = await client.stream.liveInputs.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/stream/live_inputs`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a specified live input.
   *
   * @example
   * ```ts
   * const liveInput = await client.stream.liveInputs.update(
   *   '66be4bf738797e01e1fca35a7bdecdcd',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/stream/live_inputs/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists the live inputs created for an account. To get the credentials needed to
   * stream to a specific live input, request a single live input.
   *
   * @example
   * ```ts
   * const liveInputs = await client.stream.liveInputs.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/stream/live_inputs`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Prevents a live input from being streamed to and makes the live input
   * inaccessible to any future API calls.
   *
   * @example
   * ```ts
   * await client.stream.liveInputs.delete(
   *   '66be4bf738797e01e1fca35a7bdecdcd',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/stream/live_inputs/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Retrieves details of an existing live input.
   *
   * @example
   * ```ts
   * const liveInput = await client.stream.liveInputs.get(
   *   '66be4bf738797e01e1fca35a7bdecdcd',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/stream/live_inputs/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
Ln.Outputs = Cu;
Ln.OutputsSinglePage = Zu;
class U extends o {
  constructor() {
    super(...arguments), this.audioTracks = new Ru(this._client), this.videos = new G$(this._client), this.clip = new D$(this._client), this.copy = new E$(this._client), this.directUpload = new M$(this._client), this.keys = new j$(this._client), this.liveInputs = new Ln(this._client), this.watermarks = new Lu(this._client), this.webhooks = new B$(this._client), this.captions = new vn(this._client), this.downloads = new N$(this._client), this.embed = new Y$(this._client), this.token = new F$(this._client);
  }
  /**
   * Initiates a video upload using the TUS protocol. On success, the server responds
   * with a status code 201 (created) and includes a `location` header to indicate
   * where the content should be uploaded. Refer to https://tus.io for protocol
   * details.
   *
   * @example
   * ```ts
   * await client.stream.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   body: {},
   *   'Tus-Resumable': '1.0.0',
   *   'Upload-Length': 0,
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, body: n, "Tus-Resumable": i, "Upload-Length": c, direct_user: a, "Upload-Creator": l, "Upload-Metadata": g } = t;
    return this._client.post(`/accounts/${s}/stream`, {
      query: { direct_user: a },
      body: n,
      ...e,
      headers: {
        Accept: "*/*",
        "Tus-Resumable": i.toString(),
        "Upload-Length": c.toString(),
        ...l != null ? { "Upload-Creator": l } : void 0,
        ...g != null ? { "Upload-Metadata": g } : void 0,
        ...e?.headers
      }
    });
  }
  /**
   * Lists up to 1000 videos from a single request. For a specific range, refer to
   * the optional parameters.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const video of client.stream.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/stream`, W$, { query: n, ...e });
  }
  /**
   * Deletes a video and its copies from Cloudflare Stream.
   *
   * @example
   * ```ts
   * await client.stream.delete(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/stream/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Edit details for a single video.
   *
   * @example
   * ```ts
   * const video = await client.stream.edit(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/stream/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches details for a single video.
   *
   * @example
   * ```ts
   * const video = await client.stream.get(
   *   'ea95132c15732412d22c1476fa83f27a',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/stream/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class W$ extends d {
}
U.VideosSinglePage = W$;
U.AudioTracks = Ru;
U.AudioSinglePage = Au;
U.Videos = G$;
U.ClipResource = D$;
U.Copy = E$;
U.DirectUpload = M$;
U.KeyGetResponsesSinglePage = vu;
U.LiveInputs = Ln;
U.Watermarks = Lu;
U.WatermarksSinglePage = Iu;
U.Webhooks = B$;
U.Captions = vn;
U.CaptionsSinglePage = Ou;
U.Downloads = N$;
U.Embed = Y$;
U.Token = F$;
class Tu extends o {
  /**
   * Lists challenge widgets.
   *
   * @example
   * ```ts
   * const widget = await client.turnstile.widgets.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   domains: [
   *     '203.0.113.1',
   *     'cloudflare.com',
   *     'blog.example.com',
   *   ],
   *   mode: 'invisible',
   *   name: 'blog.cloudflare.com login form',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, direction: n, order: i, page: c, per_page: a, ...l } = t;
    return this._client.post(`/accounts/${s}/challenges/widgets`, {
      query: { direction: n, order: i, page: c, per_page: a },
      body: l,
      ...e
    })._thenUnwrap((g) => g.result);
  }
  /**
   * Update the configuration of a widget.
   *
   * @example
   * ```ts
   * const widget = await client.turnstile.widgets.update(
   *   '0x4AAF00AAAABn0R22HWm-YUc',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     domains: [
   *       '203.0.113.1',
   *       'cloudflare.com',
   *       'blog.example.com',
   *     ],
   *     mode: 'invisible',
   *     name: 'blog.cloudflare.com login form',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/challenges/widgets/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all turnstile widgets of an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const widgetListResponse of client.turnstile.widgets.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/challenges/widgets`, Vu, { query: n, ...e });
  }
  /**
   * Destroy a Turnstile Widget.
   *
   * @example
   * ```ts
   * const widget = await client.turnstile.widgets.delete(
   *   '0x4AAF00AAAABn0R22HWm-YUc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/challenges/widgets/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Show a single challenge widget configuration.
   *
   * @example
   * ```ts
   * const widget = await client.turnstile.widgets.get(
   *   '0x4AAF00AAAABn0R22HWm-YUc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/challenges/widgets/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Generate a new secret key for this widget. If `invalidate_immediately` is set to
   * `false`, the previous secret remains valid for 2 hours.
   *
   * Note that secrets cannot be rotated again during the grace period.
   *
   * @example
   * ```ts
   * const widget = await client.turnstile.widgets.rotateSecret(
   *   '0x4AAF00AAAABn0R22HWm-YUc',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  rotateSecret(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/challenges/widgets/${t}/rotate_secret`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Vu extends p {
}
Tu.WidgetListResponsesV4PagePaginationArray = Vu;
class In extends o {
  constructor() {
    super(...arguments), this.widgets = new Tu(this._client);
  }
}
In.Widgets = Tu;
In.WidgetListResponsesV4PagePaginationArray = Vu;
class K$ extends o {
  /**
   * Updates the URL Normalization settings.
   *
   * @example
   * ```ts
   * const urlNormalization =
   *   await client.urlNormalization.update({
   *     zone_id: '9f1839b6152d298aca64c4e906b6d074',
   *     scope: 'incoming',
   *     type: 'cloudflare',
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/url_normalization`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes the URL Normalization settings.
   *
   * @example
   * ```ts
   * await client.urlNormalization.delete({
   *   zone_id: '9f1839b6152d298aca64c4e906b6d074',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}/url_normalization`, {
      ...e,
      headers: { Accept: "*/*", ...e?.headers }
    });
  }
  /**
   * Fetches the current URL Normalization settings.
   *
   * @example
   * ```ts
   * const urlNormalization = await client.urlNormalization.get({
   *   zone_id: '9f1839b6152d298aca64c4e906b6d074',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/url_normalization`, e)._thenUnwrap((n) => n.result);
  }
}
class X$ extends o {
  /**
   * Returns the raw response of the network request. Find the `response_id` in the
   * `data.requests.response.hash`.
   *
   * @example
   * ```ts
   * const response = await client.urlScanner.responses.get(
   *   'response_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/urlscanner/v2/responses/${t}`, {
      ...s,
      headers: { Accept: "text/plain", ...s?.headers }
    });
  }
}
class Q$ extends o {
  /**
   * Submit a URL to scan. Check limits at
   * https://developers.cloudflare.com/security-center/investigate/scan-limits/.
   *
   * @example
   * ```ts
   * const scan = await client.urlScanner.scans.create({
   *   account_id: 'account_id',
   *   url: 'https://www.example.com',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/urlscanner/v2/scan`, { body: n, ...e });
  }
  /**
   * Use a subset of ElasticSearch Query syntax to filter scans. Some example
   * queries:<br/> <br/>- 'path:"/bundles/jquery.js"': Searches for scans who
   * requested resources with the given path.<br/>- 'page.asn:AS24940 AND hash:xxx':
   * Websites hosted in AS24940 where a resource with the given hash was
   * downloaded.<br/>- 'page.domain:microsoft\* AND verdicts.malicious:true AND NOT
   * page.domain:microsoft.com': malicious scans whose hostname starts with
   * "microsoft".<br/>- 'apikey:me AND date:[2025-01 TO 2025-02]': my scans from 2025
   * January to 2025 February.
   *
   * @example
   * ```ts
   * const scans = await client.urlScanner.scans.list({
   *   account_id: 'account_id',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/urlscanner/v2/search`, { query: n, ...e });
  }
  /**
   * Submit URLs to scan. Check limits at
   * https://developers.cloudflare.com/security-center/investigate/scan-limits/ and
   * take into account scans submitted in bulk have lower priority and may take
   * longer to finish.
   *
   * @example
   * ```ts
   * const response = await client.urlScanner.scans.bulkCreate({
   *   account_id: 'account_id',
   * });
   * ```
   */
  bulkCreate(t, e) {
    const { account_id: s, body: n } = t ?? {};
    return this._client.post(`/accounts/${s}/urlscanner/v2/bulk`, { body: n, ...e });
  }
  /**
   * Returns a plain text response, with the scan's DOM content as rendered by
   * Chrome.
   *
   * @example
   * ```ts
   * const response = await client.urlScanner.scans.dom(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  dom(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/urlscanner/v2/dom/${t}`, {
      ...s,
      headers: { Accept: "text/plain", ...s?.headers }
    });
  }
  /**
   * Get URL scan by uuid
   *
   * @example
   * ```ts
   * const scan = await client.urlScanner.scans.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/urlscanner/v2/result/${t}`, s);
  }
  /**
   * Get a URL scan's HAR file. See HAR spec at
   * http://www.softwareishard.com/blog/har-12-spec/.
   *
   * @example
   * ```ts
   * const response = await client.urlScanner.scans.har(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  har(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/urlscanner/v2/har/${t}`, s);
  }
  /**
   * Get scan's screenshot by resolution (desktop/mobile/tablet).
   *
   * @example
   * ```ts
   * const response = await client.urlScanner.scans.screenshot(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  screenshot(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/urlscanner/v2/screenshots/${t}.png`, {
      query: i,
      ...s,
      headers: { Accept: "image/png", ...s?.headers },
      __binaryResponse: !0
    });
  }
}
class kn extends o {
  constructor() {
    super(...arguments), this.responses = new X$(this._client), this.scans = new Q$(this._client);
  }
}
kn.Responses = X$;
kn.Scans = Q$;
class J$ extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/audit_logs", s_, { query: t, ...e });
  }
}
class Du extends o {
  /**
   * Lists all invitations associated with my user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const invite of client.user.invites.list()) {
   *   // ...
   * }
   * ```
   */
  list(t) {
    return this._client.getAPIList("/user/invites", Eu, t);
  }
  /**
   * Responds to an invitation.
   *
   * @example
   * ```ts
   * const invite = await client.user.invites.edit(
   *   '4f5f0c14a2a41d5063dd301b2f829f04',
   *   { status: 'accepted' },
   * );
   * ```
   */
  edit(t, e, s) {
    return this._client.patch(`/user/invites/${t}`, { body: e, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Gets the details of an invitation.
   *
   * @example
   * ```ts
   * const invite = await client.user.invites.get(
   *   '4f5f0c14a2a41d5063dd301b2f829f04',
   * );
   * ```
   */
  get(t, e) {
    return this._client.get(`/user/invites/${t}`, e)._thenUnwrap((s) => s.result);
  }
}
class Eu extends d {
}
Du.InvitesSinglePage = Eu;
let Mu = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/organizations", Nu, {
      query: t,
      ...e
    });
  }
  /**
   * Removes association to an organization.
   *
   * @deprecated
   */
  delete(t, e) {
    return this._client.delete(`/user/organizations/${t}`, e);
  }
  /**
   * Gets a specific organization the user is associated with.
   *
   * @deprecated
   */
  get(t, e) {
    return this._client.get(`/user/organizations/${t}`, e)._thenUnwrap((s) => s.result);
  }
};
class Nu extends p {
}
Mu.OrganizationsV4PagePaginationArray = Nu;
let q$ = class extends o {
  /**
   * Updates a user's subscriptions.
   *
   * @example
   * ```ts
   * const subscription = await client.user.subscriptions.update(
   *   '506e3185e9c882d175a2d0cb0093d9f2',
   * );
   * ```
   */
  update(t, e, s) {
    return this._client.put(`/user/subscriptions/${t}`, { body: e, ...s })._thenUnwrap((n) => n.result);
  }
  /**
   * Deletes a user's subscription.
   *
   * @example
   * ```ts
   * const subscription = await client.user.subscriptions.delete(
   *   '506e3185e9c882d175a2d0cb0093d9f2',
   * );
   * ```
   */
  delete(t, e) {
    return this._client.delete(`/user/subscriptions/${t}`, e);
  }
  /**
   * Lists all of a user's subscriptions.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const subscription of client.user.subscriptions.get()) {
   *   // ...
   * }
   * ```
   */
  get(t) {
    return this._client.getAPIList("/user/subscriptions", t_, t);
  }
}, Yu = class extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/billing/history", ju, {
      query: t,
      ...e
    });
  }
};
class ju extends p {
}
Yu.BillingHistoriesV4PagePaginationArray = ju;
class tm extends o {
  /**
   * Accesses your billing profile object.
   *
   * @deprecated
   */
  get(t) {
    return this._client.get("/user/billing/profile", t)._thenUnwrap((e) => e.result);
  }
}
class es extends o {
  constructor() {
    super(...arguments), this.history = new Yu(this._client), this.profile = new tm(this._client);
  }
}
es.History = Yu;
es.BillingHistoriesV4PagePaginationArray = ju;
es.Profile = tm;
class Fu extends o {
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/tokens/permission_groups", Gu, {
      query: t,
      ...e
    });
  }
}
class Gu extends d {
}
Fu.PermissionGroupListResponsesSinglePage = Gu;
class em extends o {
  /**
   * Roll the token secret.
   *
   * @example
   * ```ts
   * const tokenValue = await client.user.tokens.value.update(
   *   'ed17574386854bf78a67040be0a770b0',
   *   {},
   * );
   * ```
   */
  update(t, e, s) {
    return this._client.put(`/user/tokens/${t}/value`, { body: e, ...s })._thenUnwrap((n) => n.result);
  }
}
class ss extends o {
  constructor() {
    super(...arguments), this.permissionGroups = new Fu(this._client), this.value = new em(this._client);
  }
  /**
   * Create a new access token.
   *
   * @example
   * ```ts
   * const token = await client.user.tokens.create({
   *   name: 'readonly token',
   *   policies: [
   *     {
   *       effect: 'allow',
   *       permission_groups: [
   *         { id: 'c8fed203ed3043cba015a93ad1616f1f' },
   *         { id: '82e64a83756745bbbb1c9c2701bf816b' },
   *       ],
   *       resources: { foo: 'string' },
   *     },
   *   ],
   * });
   * ```
   */
  create(t, e) {
    return this._client.post("/user/tokens", { body: t, ...e })._thenUnwrap((s) => s.result);
  }
  /**
   * Update an existing token.
   *
   * @example
   * ```ts
   * const token = await client.user.tokens.update(
   *   'ed17574386854bf78a67040be0a770b0',
   *   {
   *     name: 'readonly token',
   *     policies: [
   *       {
   *         effect: 'allow',
   *         permission_groups: [
   *           { id: 'c8fed203ed3043cba015a93ad1616f1f' },
   *           { id: '82e64a83756745bbbb1c9c2701bf816b' },
   *         ],
   *         resources: { foo: 'string' },
   *       },
   *     ],
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    return this._client.put(`/user/tokens/${t}`, { body: e, ...s })._thenUnwrap((n) => n.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/user/tokens", e_, { query: t, ...e });
  }
  /**
   * Destroy a token.
   *
   * @example
   * ```ts
   * const token = await client.user.tokens.delete(
   *   'ed17574386854bf78a67040be0a770b0',
   * );
   * ```
   */
  delete(t, e) {
    return this._client.delete(`/user/tokens/${t}`, e)._thenUnwrap((s) => s.result);
  }
  /**
   * Get information about a specific token.
   *
   * @example
   * ```ts
   * const token = await client.user.tokens.get(
   *   'ed17574386854bf78a67040be0a770b0',
   * );
   * ```
   */
  get(t, e) {
    return this._client.get(`/user/tokens/${t}`, e)._thenUnwrap((s) => s.result);
  }
  /**
   * Test whether a token works.
   *
   * @example
   * ```ts
   * const response = await client.user.tokens.verify();
   * ```
   */
  verify(t) {
    return this._client.get("/user/tokens/verify", t)._thenUnwrap((e) => e.result);
  }
}
ss.PermissionGroups = Fu;
ss.PermissionGroupListResponsesSinglePage = Gu;
ss.Value = em;
class nt extends o {
  constructor() {
    super(...arguments), this.auditLogs = new J$(this._client), this.billing = new es(this._client), this.invites = new Du(this._client), this.organizations = new Mu(this._client), this.subscriptions = new q$(this._client), this.tokens = new ss(this._client);
  }
  /**
   * Edit part of your user details.
   *
   * @example
   * ```ts
   * const response = await client.user.edit();
   * ```
   */
  edit(t, e) {
    return this._client.patch("/user", { body: t, ...e })._thenUnwrap((s) => s.result);
  }
  /**
   * User Details
   *
   * @example
   * ```ts
   * const user = await client.user.get();
   * ```
   */
  get(t) {
    return this._client.get("/user", t)._thenUnwrap((e) => e.result);
  }
}
nt.AuditLogs = J$;
nt.Billing = es;
nt.Invites = Du;
nt.InvitesSinglePage = Eu;
nt.Organizations = Mu;
nt.OrganizationsV4PagePaginationArray = Nu;
nt.Subscriptions = q$;
nt.Tokens = ss;
class sm extends o {
  /**
   * Enable metadata filtering based on metadata property. Limited to 10 properties.
   *
   * @example
   * ```ts
   * const metadataIndex =
   *   await client.vectorize.indexes.metadataIndex.create(
   *     'example-index',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       indexType: 'string',
   *       propertyName: 'random_metadata_property',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/metadata_index/create`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List Metadata Indexes for the specified Vectorize Index.
   *
   * @example
   * ```ts
   * const metadataIndices =
   *   await client.vectorize.indexes.metadataIndex.list(
   *     'example-index',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/vectorize/v2/indexes/${t}/metadata_index/list`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Allow Vectorize to delete the specified metadata index.
   *
   * @example
   * ```ts
   * const metadataIndex =
   *   await client.vectorize.indexes.metadataIndex.delete(
   *     'example-index',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       propertyName: 'random_metadata_property',
   *     },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/metadata_index/delete`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class On extends o {
  constructor() {
    super(...arguments), this.metadataIndex = new sm(this._client);
  }
  /**
   * Creates and returns a new Vectorize Index.
   *
   * @example
   * ```ts
   * const createIndex = await client.vectorize.indexes.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   config: { dimensions: 768, metric: 'cosine' },
   *   name: 'example-index',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/vectorize/v2/indexes`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a list of Vectorize Indexes
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const createIndex of client.vectorize.indexes.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/vectorize/v2/indexes`, Bu, e);
  }
  /**
   * Deletes the specified Vectorize Index.
   *
   * @example
   * ```ts
   * const index = await client.vectorize.indexes.delete(
   *   'example-index',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/vectorize/v2/indexes/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Delete a set of vectors from an index by their vector identifiers.
   *
   * @example
   * ```ts
   * const response = await client.vectorize.indexes.deleteByIds(
   *   'example-index',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  deleteByIds(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/delete_by_ids`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns the specified Vectorize Index.
   *
   * @example
   * ```ts
   * const createIndex = await client.vectorize.indexes.get(
   *   'example-index',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/vectorize/v2/indexes/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a set of vectors from an index by their vector identifiers.
   *
   * @example
   * ```ts
   * const response = await client.vectorize.indexes.getByIds(
   *   'example-index',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  getByIds(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/get_by_ids`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get information about a vectorize index.
   *
   * @example
   * ```ts
   * const response = await client.vectorize.indexes.info(
   *   'example-index',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  info(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/vectorize/v2/indexes/${t}/info`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Inserts vectors into the specified index and returns a mutation id corresponding
   * to the vectors enqueued for insertion.
   *
   * @example
   * ```ts
   * const response = await client.vectorize.indexes.insert(
   *   'example-index',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: '@/path/to/vectors.ndjson',
   *   },
   * );
   * ```
   */
  insert(t, e, s) {
    const { account_id: n, body: i, "unparsable-behavior": c } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/insert`, {
      query: { "unparsable-behavior": c },
      body: i,
      ...s,
      headers: { "Content-Type": "application/x-ndjson", ...s?.headers }
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Finds vectors closest to a given vector in an index.
   *
   * @example
   * ```ts
   * const response = await client.vectorize.indexes.query(
   *   'example-index',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     vector: [0.5, 0.5, 0.5],
   *   },
   * );
   * ```
   */
  query(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/query`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Upserts vectors into the specified index, creating them if they do not exist and
   * returns a mutation id corresponding to the vectors enqueued for upsertion.
   *
   * @example
   * ```ts
   * const response = await client.vectorize.indexes.upsert(
   *   'example-index',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: '@/path/to/vectors.ndjson',
   *   },
   * );
   * ```
   */
  upsert(t, e, s) {
    const { account_id: n, body: i, "unparsable-behavior": c } = e;
    return this._client.post(`/accounts/${n}/vectorize/v2/indexes/${t}/upsert`, {
      query: { "unparsable-behavior": c },
      body: i,
      ...s,
      headers: { "Content-Type": "application/x-ndjson", ...s?.headers }
    })._thenUnwrap((a) => a.result);
  }
}
class Bu extends d {
}
On.CreateIndicesSinglePage = Bu;
On.MetadataIndex = sm;
class Cn extends o {
  constructor() {
    super(...arguments), this.indexes = new On(this._client);
  }
}
Cn.Indexes = On;
Cn.CreateIndicesSinglePage = Bu;
class nm extends o {
  /**
   * Creates a waiting room page preview. Upload a custom waiting room page for
   * preview. You will receive a preview URL in the form
   * `http://waitingrooms.dev/preview/<uuid>`. You can use the following query
   * parameters to change the state of the preview:
   *
   * 1. `force_queue`: Boolean indicating if all users will be queued in the waiting
   *    room and no one will be let into the origin website (also known as queueAll).
   * 2. `queue_is_full`: Boolean indicating if the waiting room's queue is currently
   *    full and not accepting new users at the moment.
   * 3. `queueing_method`: The queueing method currently used by the waiting room.
   *    - **fifo** indicates a FIFO queue.
   *    - **random** indicates a Random queue.
   *    - **passthrough** indicates a Passthrough queue. Keep in mind that the
   *      waiting room page will only be displayed if `force_queue=true` or
   *      `event=prequeueing` — for other cases the request will pass through to the
   *      origin. For our preview, this will be a fake origin website returning
   *      \"Welcome\".
   *    - **reject** indicates a Reject queue.
   * 4. `event`: Used to preview a waiting room event.
   *    - **none** indicates no event is occurring.
   *    - **prequeueing** indicates that an event is prequeueing (between
   *      `prequeue_start_time` and `event_start_time`).
   *    - **started** indicates that an event has started (between `event_start_time`
   *      and `event_end_time`).
   * 5. `shuffle_at_event_start`: Boolean indicating if the event will shuffle users
   *    in the prequeue when it starts. This can only be set to **true** if an event
   *    is active (`event` is not **none**).
   *
   * For example, you can make a request to
   * `http://waitingrooms.dev/preview/<uuid>?force_queue=false&queue_is_full=false&queueing_method=random&event=started&shuffle_at_event_start=true` 6.
   * `waitTime`: Non-zero, positive integer indicating the estimated wait time in
   * minutes. The default value is 10 minutes.
   *
   * For example, you can make a request to
   * `http://waitingrooms.dev/preview/<uuid>?waitTime=50` to configure the estimated
   * wait time as 50 minutes.
   *
   * @example
   * ```ts
   * const response = await client.waitingRooms.page.preview({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   custom_html:
   *     '{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}',
   * });
   * ```
   */
  preview(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/waiting_rooms/preview`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
}
let Hu = class extends o {
  /**
   * Only available for the Waiting Room Advanced subscription. Creates a rule for a
   * waiting room.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const waitingRoomRule of client.waitingRooms.rules.create(
   *   '699d98642c564d2e855e9661899b7252',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     rules: {
   *       action: 'bypass_waiting_room',
   *       expression: 'ip.src in {10.20.30.40}',
   *     },
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s) {
    const { zone_id: n, rules: i } = e;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${t}/rules`, Rt, { body: i, method: "post", ...s });
  }
  /**
   * Only available for the Waiting Room Advanced subscription. Replaces all rules
   * for a waiting room.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const waitingRoomRule of client.waitingRooms.rules.update(
   *   '699d98642c564d2e855e9661899b7252',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     rules: [
   *       {
   *         action: 'bypass_waiting_room',
   *         expression: 'ip.src in {10.20.30.40}',
   *       },
   *     ],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, rules: i } = e;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${t}/rules`, Rt, { body: i, method: "put", ...s });
  }
  /**
   * Deletes a rule for a waiting room.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const waitingRoomRule of client.waitingRooms.rules.delete(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  delete(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.getAPIList(`/zones/${i}/waiting_rooms/${t}/rules/${e}`, Rt, { method: "delete", ...n });
  }
  /**
   * Patches a rule for a waiting room.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const waitingRoomRule of client.waitingRooms.rules.edit(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     action: 'bypass_waiting_room',
   *     expression: 'ip.src in {10.20.30.40}',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  edit(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.getAPIList(`/zones/${i}/waiting_rooms/${t}/rules/${e}`, Rt, { body: c, method: "patch", ...n });
  }
  /**
   * Lists rules for a waiting room.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const waitingRoomRule of client.waitingRooms.rules.get(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${t}/rules`, Rt, s);
  }
};
class Rt extends d {
}
Hu.WaitingRoomRulesSinglePage = Rt;
let im = class extends o {
  /**
   * Update zone-level Waiting Room settings
   *
   * @example
   * ```ts
   * const setting = await client.waitingRooms.settings.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/waiting_rooms/settings`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Patch zone-level Waiting Room settings
   *
   * @example
   * ```ts
   * const response = await client.waitingRooms.settings.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/waiting_rooms/settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get zone-level Waiting Room settings
   *
   * @example
   * ```ts
   * const setting = await client.waitingRooms.settings.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/waiting_rooms/settings`, e)._thenUnwrap((n) => n.result);
  }
};
class rm extends o {
  /**
   * Fetches the status of a configured waiting room. Response fields include:
   *
   * 1. `status`: String indicating the status of the waiting room. The possible
   *    status are:
   *    - **not_queueing** indicates that the configured thresholds have not been met
   *      and all users are going through to the origin.
   *    - **queueing** indicates that the thresholds have been met and some users are
   *      held in the waiting room.
   *    - **event_prequeueing** indicates that an event is active and is currently
   *      prequeueing users before it starts.
   *    - **suspended** indicates that the room is suspended.
   * 2. `event_id`: String of the current event's `id` if an event is active,
   *    otherwise an empty string.
   * 3. `estimated_queued_users`: Integer of the estimated number of users currently
   *    waiting in the queue.
   * 4. `estimated_total_active_users`: Integer of the estimated number of users
   *    currently active on the origin.
   * 5. `max_estimated_time_minutes`: Integer of the maximum estimated time currently
   *    presented to the users.
   *
   * @example
   * ```ts
   * const status = await client.waitingRooms.statuses.get(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/waiting_rooms/${t}/status`, s)._thenUnwrap((i) => i.result);
  }
}
class cm extends o {
  /**
   * Previews an event's configuration as if it was active. Inherited fields from the
   * waiting room will be displayed with their current values.
   *
   * @example
   * ```ts
   * const detail = await client.waitingRooms.events.details.get(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/waiting_rooms/${t}/events/${e}/details`, n)._thenUnwrap((c) => c.result);
  }
}
let Zn = class extends o {
  constructor() {
    super(...arguments), this.details = new cm(this._client);
  }
  /**
   * Only available for the Waiting Room Advanced subscription. Creates an event for
   * a waiting room. An event takes place during a specified period of time,
   * temporarily changing the behavior of a waiting room. While the event is active,
   * some of the properties in the event's configuration may either override or
   * inherit from the waiting room's configuration. Note that events cannot overlap
   * with each other, so only one event can be active at a time.
   *
   * @example
   * ```ts
   * const event = await client.waitingRooms.events.create(
   *   '699d98642c564d2e855e9661899b7252',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     event_end_time: '2021-09-28T17:00:00.000Z',
   *     event_start_time: '2021-09-28T15:30:00.000Z',
   *     name: 'production_webinar_event',
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.post(`/zones/${n}/waiting_rooms/${t}/events`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a configured event for a waiting room.
   *
   * @example
   * ```ts
   * const event = await client.waitingRooms.events.update(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     event_end_time: '2021-09-28T17:00:00.000Z',
   *     event_start_time: '2021-09-28T15:30:00.000Z',
   *     name: 'production_webinar_event',
   *   },
   * );
   * ```
   */
  update(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.put(`/zones/${i}/waiting_rooms/${t}/events/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Lists events for a waiting room.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const event of client.waitingRooms.events.list(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.getAPIList(`/zones/${n}/waiting_rooms/${t}/events`, Wu, { query: i, ...s });
  }
  /**
   * Deletes an event for a waiting room.
   *
   * @example
   * ```ts
   * const event = await client.waitingRooms.events.delete(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.delete(`/zones/${i}/waiting_rooms/${t}/events/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Patches a configured event for a waiting room.
   *
   * @example
   * ```ts
   * const event = await client.waitingRooms.events.edit(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     event_end_time: '2021-09-28T17:00:00.000Z',
   *     event_start_time: '2021-09-28T15:30:00.000Z',
   *     name: 'production_webinar_event',
   *   },
   * );
   * ```
   */
  edit(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.patch(`/zones/${i}/waiting_rooms/${t}/events/${e}`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetches a single configured event for a waiting room.
   *
   * @example
   * ```ts
   * const event = await client.waitingRooms.events.get(
   *   '699d98642c564d2e855e9661899b7252',
   *   '25756b2dfe6e378a06b033b670413757',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/waiting_rooms/${t}/events/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class Wu extends p {
}
Zn.EventsV4PagePaginationArray = Wu;
Zn.Details = cm;
class it extends o {
  constructor() {
    super(...arguments), this.page = new nm(this._client), this.events = new Zn(this._client), this.rules = new Hu(this._client), this.statuses = new rm(this._client), this.settings = new im(this._client);
  }
  /**
   * Creates a new waiting room.
   *
   * @example
   * ```ts
   * const waitingRoom = await client.waitingRooms.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   host: 'shop.example.com',
   *   name: 'production_webinar',
   *   new_users_per_minute: 200,
   *   total_active_users: 200,
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/waiting_rooms`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured waiting room.
   *
   * @example
   * ```ts
   * const waitingRoom = await client.waitingRooms.update(
   *   '699d98642c564d2e855e9661899b7252',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     host: 'shop.example.com',
   *     name: 'production_webinar',
   *     new_users_per_minute: 200,
   *     total_active_users: 200,
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/waiting_rooms/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/waiting_rooms`, om, { query: i, ...e });
  }
  /**
   * Deletes a waiting room.
   *
   * @example
   * ```ts
   * const waitingRoom = await client.waitingRooms.delete(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/waiting_rooms/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Patches a configured waiting room.
   *
   * @example
   * ```ts
   * const waitingRoom = await client.waitingRooms.edit(
   *   '699d98642c564d2e855e9661899b7252',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     host: 'shop.example.com',
   *     name: 'production_webinar',
   *     new_users_per_minute: 200,
   *     total_active_users: 200,
   *   },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/waiting_rooms/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single configured waiting room.
   *
   * @example
   * ```ts
   * const waitingRoom = await client.waitingRooms.get(
   *   '699d98642c564d2e855e9661899b7252',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/waiting_rooms/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class om extends p {
}
it.WaitingRoomsV4PagePaginationArray = om;
it.Page = nm;
it.Events = Zn;
it.EventsV4PagePaginationArray = Wu;
it.Rules = Hu;
it.WaitingRoomRulesSinglePage = Rt;
it.Statuses = rm;
it.Settings = im;
let am = class extends o {
  /**
   * Create IPFS Universal Path Gateway Content List Entry
   *
   * @example
   * ```ts
   * const entry =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.entries.create(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       content:
   *         'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB',
   *       type: 'cid',
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.post(`/zones/${n}/web3/hostnames/${t}/ipfs_universal_path/content_list/entries`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Edit IPFS Universal Path Gateway Content List Entry
   *
   * @example
   * ```ts
   * const entry =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.entries.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       content:
   *         'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB',
   *       type: 'cid',
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { zone_id: i, ...c } = s;
    return this._client.put(`/zones/${i}/web3/hostnames/${t}/ipfs_universal_path/content_list/entries/${e}`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * List IPFS Universal Path Gateway Content List Entries
   *
   * @example
   * ```ts
   * const entries =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.entries.list(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  list(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/web3/hostnames/${t}/ipfs_universal_path/content_list/entries`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Delete IPFS Universal Path Gateway Content List Entry
   *
   * @example
   * ```ts
   * const entry =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.entries.delete(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.delete(`/zones/${i}/web3/hostnames/${t}/ipfs_universal_path/content_list/entries/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * IPFS Universal Path Gateway Content List Entry Details
   *
   * @example
   * ```ts
   * const entry =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.entries.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { zone_id: i } = s;
    return this._client.get(`/zones/${i}/web3/hostnames/${t}/ipfs_universal_path/content_list/entries/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class Ku extends o {
  constructor() {
    super(...arguments), this.entries = new am(this._client);
  }
  /**
   * Update IPFS Universal Path Gateway Content List
   *
   * @example
   * ```ts
   * const contentList =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       action: 'block',
   *       entries: [{}],
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/web3/hostnames/${t}/ipfs_universal_path/content_list`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * IPFS Universal Path Gateway Content List Details
   *
   * @example
   * ```ts
   * const contentList =
   *   await client.web3.hostnames.ipfsUniversalPaths.contentLists.get(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/web3/hostnames/${t}/ipfs_universal_path/content_list`, s)._thenUnwrap((i) => i.result);
  }
}
Ku.Entries = am;
class Xu extends o {
  constructor() {
    super(...arguments), this.contentLists = new Ku(this._client);
  }
}
Xu.ContentLists = Ku;
class Tn extends o {
  constructor() {
    super(...arguments), this.ipfsUniversalPaths = new Xu(this._client);
  }
  /**
   * Create Web3 Hostname
   *
   * @example
   * ```ts
   * const hostname = await client.web3.hostnames.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   name: 'gateway.example.com',
   *   target: 'ipfs',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/web3/hostnames`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * List Web3 Hostnames
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const hostname of client.web3.hostnames.list({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/web3/hostnames`, Qu, e);
  }
  /**
   * Delete Web3 Hostname
   *
   * @example
   * ```ts
   * const hostname = await client.web3.hostnames.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/web3/hostnames/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Edit Web3 Hostname
   *
   * @example
   * ```ts
   * const hostname = await client.web3.hostnames.edit(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/web3/hostnames/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Web3 Hostname Details
   *
   * @example
   * ```ts
   * const hostname = await client.web3.hostnames.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/web3/hostnames/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Qu extends d {
}
Tn.HostnamesSinglePage = Qu;
Tn.IPFSUniversalPaths = Xu;
class Vn extends o {
  constructor() {
    super(...arguments), this.hostnames = new Tn(this._client);
  }
}
Vn.Hostnames = Tn;
Vn.HostnamesSinglePage = Qu;
class um extends o {
  /**
   * Creates Worker account settings for an account.
   *
   * @example
   * ```ts
   * const accountSetting =
   *   await client.workers.accountSettings.update({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/workers/account-settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches Worker account settings for an account.
   *
   * @example
   * ```ts
   * const accountSetting =
   *   await client.workers.accountSettings.get({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/workers/account-settings`, e)._thenUnwrap((n) => n.result);
  }
}
class Ju extends o {
  /**
   * Attaches a Worker to a zone and hostname.
   *
   * @example
   * ```ts
   * const domain = await client.workers.domains.update({
   *   account_id: '9a7806061c88ada191ed06f989cc3dac',
   *   environment: 'production',
   *   hostname: 'foo.example.com',
   *   service: 'foo',
   *   zone_id: '593c9c94de529bbbfaac7c53ced0447d',
   * });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/workers/domains`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists all Worker Domains for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const domain of client.workers.domains.list({
   *   account_id: '9a7806061c88ada191ed06f989cc3dac',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/workers/domains`, qu, {
      query: n,
      ...e
    });
  }
  /**
   * Detaches a Worker from a zone and hostname.
   *
   * @example
   * ```ts
   * await client.workers.domains.delete(
   *   'dbe10b4bc17c295377eabd600e1787fd',
   *   { account_id: '9a7806061c88ada191ed06f989cc3dac' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/workers/domains/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Gets a Worker domain.
   *
   * @example
   * ```ts
   * const domain = await client.workers.domains.get(
   *   'dbe10b4bc17c295377eabd600e1787fd',
   *   { account_id: '9a7806061c88ada191ed06f989cc3dac' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/domains/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class qu extends d {
}
Ju.DomainsSinglePage = qu;
let tl = class extends o {
  /**
   * Creates a route that maps a URL pattern to a Worker.
   *
   * @example
   * ```ts
   * const route = await client.workers.routes.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   pattern: 'example.com/*',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/workers/routes`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates the URL pattern or Worker associated with a route.
   *
   * @example
   * ```ts
   * const route = await client.workers.routes.update(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   {
   *     zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     pattern: 'example.com/*',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.put(`/zones/${n}/workers/routes/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Returns routes for a zone.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const routeListResponse of client.workers.routes.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/workers/routes`, el, e);
  }
  /**
   * Deletes a route.
   *
   * @example
   * ```ts
   * const route = await client.workers.routes.delete(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { zone_id: n } = e;
    return this._client.delete(`/zones/${n}/workers/routes/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Returns information about a route, including URL pattern and Worker.
   *
   * @example
   * ```ts
   * const route = await client.workers.routes.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/workers/routes/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class el extends d {
}
tl.RouteListResponsesSinglePage = el;
class lm extends o {
  /**
   * Creates a Workers subdomain for an account.
   *
   * @example
   * ```ts
   * const subdomain = await client.workers.subdomains.update({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   subdomain: 'my-subdomain',
   * });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/workers/subdomain`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns a Workers subdomain for an account.
   *
   * @example
   * ```ts
   * const subdomain = await client.workers.subdomains.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/workers/subdomain`, e)._thenUnwrap((n) => n.result);
  }
}
let dm = class extends o {
  /**
   * Upload assets ahead of creating a Worker version. To learn more about the direct
   * uploads of assets, see
   * https://developers.cloudflare.com/workers/static-assets/direct-upload/.
   *
   * @example
   * ```ts
   * const upload = await client.workers.assets.upload.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   base64: true,
   *   body: { foo: 'string' },
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, base64: n, body: i } = t;
    return this._client.post(`/accounts/${s}/workers/assets/upload`, S({ query: { base64: n }, body: i, ...e }))._thenUnwrap((c) => c.result);
  }
}, sl = class extends o {
  constructor() {
    super(...arguments), this.upload = new dm(this._client);
  }
};
sl.Upload = dm;
class Dn extends o {
  /**
   * List all the keys in your telemetry events.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const telemetryKeysResponse of client.workers.observability.telemetry.keys(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  keys(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/workers/observability/telemetry/keys`, nl, { body: n, method: "post", ...e });
  }
  /**
   * Runs a temporary or saved query
   *
   * @example
   * ```ts
   * const response =
   *   await client.workers.observability.telemetry.query({
   *     account_id: 'account_id',
   *     queryId: 'queryId',
   *     timeframe: { from: 0, to: 0 },
   *   });
   * ```
   */
  query(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/workers/observability/telemetry/query`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List unique values found in your events
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const telemetryValuesResponse of client.workers.observability.telemetry.values(
   *   {
   *     account_id: 'account_id',
   *     datasets: ['string'],
   *     key: 'key',
   *     timeframe: { from: 0, to: 0 },
   *     type: 'string',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  values(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/workers/observability/telemetry/values`, il, { body: n, method: "post", ...e });
  }
}
class nl extends d {
}
class il extends d {
}
Dn.TelemetryKeysResponsesSinglePage = nl;
Dn.TelemetryValuesResponsesSinglePage = il;
class ns extends o {
  constructor() {
    super(...arguments), this.telemetry = new Dn(this._client);
  }
}
ns.Telemetry = Dn;
ns.TelemetryKeysResponsesSinglePage = nl;
ns.TelemetryValuesResponsesSinglePage = il;
let hm = class extends o {
  /**
   * Put script content without touching config or metadata.
   *
   * @example
   * ```ts
   * const script = await client.workers.scripts.content.update(
   *   'this-is_my_script-01',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     metadata: {},
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, "CF-WORKER-BODY-PART": i, "CF-WORKER-MAIN-MODULE-PART": c, ...a } = e;
    return this._client.put(`/accounts/${n}/workers/scripts/${t}/content`, S({
      body: a,
      ...s,
      headers: {
        ...i != null ? { "CF-WORKER-BODY-PART": i } : void 0,
        ...c != null ? { "CF-WORKER-MAIN-MODULE-PART": c } : void 0,
        ...s?.headers
      }
    }))._thenUnwrap((l) => l.result);
  }
  /**
   * Fetch script content only.
   *
   * @example
   * ```ts
   * const content = await client.workers.scripts.content.get(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   *
   * const data = await content.blob();
   * console.log(data);
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/content/v2`, {
      ...s,
      headers: { Accept: "string", ...s?.headers },
      __binaryResponse: !0
    });
  }
};
class _m extends o {
  /**
   * Deployments configure how
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions)
   * are deployed to traffic. A deployment can consist of one or two versions of a
   * Worker.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.workers.scripts.deployments.create(
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       strategy: 'percentage',
   *       versions: [
   *         {
   *           percentage: 100,
   *           version_id:
   *             'bcf48806-b317-4351-9ee7-36e7d557d4de',
   *         },
   *       ],
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, force: i, ...c } = e;
    return this._client.post(`/accounts/${n}/workers/scripts/${t}/deployments`, {
      query: { force: i },
      body: c,
      ...s
    })._thenUnwrap((a) => a.result);
  }
  /**
   * List of Worker Deployments. The first deployment in the list is the latest
   * deployment actively serving traffic.
   *
   * @example
   * ```ts
   * const deployment =
   *   await client.workers.scripts.deployments.get(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/deployments`, s)._thenUnwrap((i) => i.result);
  }
}
class gm extends o {
  /**
   * Updates Cron Triggers for a Worker.
   *
   * @example
   * ```ts
   * const schedule =
   *   await client.workers.scripts.schedules.update(
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       body: [{ cron: '* /30 * * * *' }],
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/workers/scripts/${t}/schedules`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Cron Triggers for a Worker.
   *
   * @example
   * ```ts
   * const schedule = await client.workers.scripts.schedules.get(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/schedules`, s)._thenUnwrap((i) => i.result);
  }
}
class pm extends o {
  /**
   * Patch metadata or config, such as bindings or usage model.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workers.scripts.scriptAndVersionSettings.edit(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/workers/scripts/${t}/settings`, S({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * Get metadata and config, such as bindings or usage model.
   *
   * @example
   * ```ts
   * const scriptAndVersionSetting =
   *   await client.workers.scripts.scriptAndVersionSettings.get(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/settings`, s)._thenUnwrap((i) => i.result);
  }
}
let rl = class extends o {
  /**
   * Add a secret to a script.
   *
   * @example
   * ```ts
   * const secret = await client.workers.scripts.secrets.update(
   *   'this-is_my_script-01',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'myBinding',
   *     text: 'My secret.',
   *     type: 'secret_text',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/workers/scripts/${t}/secrets`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List secrets bound to a script.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const secretListResponse of client.workers.scripts.secrets.list(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/workers/scripts/${t}/secrets`, cl, s);
  }
  /**
   * Remove a secret from a script.
   *
   * @example
   * ```ts
   * const secret = await client.workers.scripts.secrets.delete(
   *   'this-is_my_script-01',
   *   'mySecret',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/workers/scripts/${t}/secrets/${e}`, n)._thenUnwrap((c) => c.result);
  }
  /**
   * Get a given secret binding (value omitted) on a script.
   *
   * @example
   * ```ts
   * const secret = await client.workers.scripts.secrets.get(
   *   'this-is_my_script-01',
   *   'mySecret',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/scripts/${t}/secrets/${e}`, n)._thenUnwrap((c) => c.result);
  }
}, cl = class extends d {
};
rl.SecretListResponsesSinglePage = cl;
let wm = class extends o {
  /**
   * Patch script-level settings when using
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions).
   * Including but not limited to Logpush and Tail Consumers.
   *
   * @example
   * ```ts
   * const scriptSetting =
   *   await client.workers.scripts.settings.edit(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/workers/scripts/${t}/script-settings`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get script-level settings when using
   * [Worker Versions](https://developers.cloudflare.com/api/operations/worker-versions-list-versions).
   * Includes Logpush and Tail Consumers.
   *
   * @example
   * ```ts
   * const scriptSetting =
   *   await client.workers.scripts.settings.get(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/script-settings`, s)._thenUnwrap((i) => i.result);
  }
};
class $m extends o {
  /**
   * Enable or disable the Worker on the workers.dev subdomain.
   *
   * @example
   * ```ts
   * const subdomain =
   *   await client.workers.scripts.subdomain.create(
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       enabled: true,
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/workers/scripts/${t}/subdomain`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Disable all workers.dev subdomains for a Worker.
   *
   * @example
   * ```ts
   * const subdomain =
   *   await client.workers.scripts.subdomain.delete(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/workers/scripts/${t}/subdomain`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get if the Worker is available on the workers.dev subdomain.
   *
   * @example
   * ```ts
   * const subdomain =
   *   await client.workers.scripts.subdomain.get(
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/subdomain`, s)._thenUnwrap((i) => i.result);
  }
}
class mm extends o {
  /**
   * Starts a tail that receives logs and exception from a Worker.
   *
   * @example
   * ```ts
   * const tail = await client.workers.scripts.tail.create(
   *   'this-is_my_script-01',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: {},
   *   },
   * );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/workers/scripts/${t}/tails`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a tail from a Worker.
   *
   * @example
   * ```ts
   * const tail = await client.workers.scripts.tail.delete(
   *   'this-is_my_script-01',
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.delete(`/accounts/${i}/workers/scripts/${t}/tails/${e}`, n);
  }
  /**
   * Get list of tails currently deployed on a Worker.
   *
   * @example
   * ```ts
   * const tail = await client.workers.scripts.tail.get(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}/tails`, s)._thenUnwrap((i) => i.result);
  }
}
let ol = class extends o {
  /**
   * Upload a Worker Version without deploying to Cloudflare's network. You can find
   * more about the multipart metadata on our docs:
   * https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.
   *
   * @example
   * ```ts
   * const version =
   *   await client.workers.scripts.versions.create(
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       metadata: { main_module: 'worker.js' },
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/workers/scripts/${t}/versions`, S({ body: i, ...s }))._thenUnwrap((c) => c.result);
  }
  /**
   * List of Worker Versions. The first version in the list is the latest version.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const versionListResponse of client.workers.scripts.versions.list(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/workers/scripts/${t}/versions`, al, { query: i, ...s });
  }
  /**
   * Get Version Detail
   *
   * @example
   * ```ts
   * const version = await client.workers.scripts.versions.get(
   *   'this-is_my_script-01',
   *   'bcf48806-b317-4351-9ee7-36e7d557d4de',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/scripts/${t}/versions/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class al extends F {
}
ol.VersionListResponsesV4PagePagination = al;
let ym = class extends o {
  /**
   * Start uploading a collection of assets for use in a Worker version. To learn
   * more about the direct uploads of assets, see
   * https://developers.cloudflare.com/workers/static-assets/direct-upload/.
   *
   * @example
   * ```ts
   * const upload =
   *   await client.workers.scripts.assets.upload.create(
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       manifest: { foo: { hash: 'hash', size: 0 } },
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/workers/scripts/${t}/assets-upload-session`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
};
class ul extends o {
  constructor() {
    super(...arguments), this.upload = new ym(this._client);
  }
}
ul.Upload = ym;
let I = class extends o {
  constructor() {
    super(...arguments), this.assets = new ul(this._client), this.subdomain = new $m(this._client), this.schedules = new gm(this._client), this.tail = new mm(this._client), this.content = new hm(this._client), this.settings = new wm(this._client), this.deployments = new _m(this._client), this.versions = new ol(this._client), this.secrets = new rl(this._client), this.scriptAndVersionSettings = new pm(this._client);
  }
  /**
   * Upload a worker module. You can find more about the multipart metadata on our
   * docs:
   * https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.
   *
   * @example
   * ```ts
   * const script = await client.workers.scripts.update(
   *   'this-is_my_script-01',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     metadata: {},
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, files: i, ...c } = e;
    return this._client.put(`/accounts/${n}/workers/scripts/${t}`, Wh({
      body: { ...c, ...i },
      ...s,
      __multipartSyntax: "json",
      headers: { "Content-Type": "application/javascript", ...s?.headers }
    }))._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch a list of uploaded workers.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const script of client.workers.scripts.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/workers/scripts`, ll, e);
  }
  /**
   * Delete your worker. This call has no response body on a successful delete.
   *
   * @example
   * ```ts
   * const script = await client.workers.scripts.delete(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, force: i } = e;
    return this._client.delete(`/accounts/${n}/workers/scripts/${t}`, {
      query: { force: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch raw script content for your worker. Note this is the original script
   * content, not JSON encoded.
   *
   * @example
   * ```ts
   * const script = await client.workers.scripts.get(
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/scripts/${t}`, {
      ...s,
      headers: { Accept: "application/javascript", ...s?.headers }
    });
  }
};
class ll extends d {
}
I.ScriptsSinglePage = ll;
I.Assets = ul;
I.Subdomain = $m;
I.Schedules = gm;
I.Tail = mm;
I.Content = hm;
I.Settings = wm;
I.Deployments = _m;
I.Versions = ol;
I.VersionListResponsesV4PagePagination = al;
I.Secrets = rl;
I.SecretListResponsesSinglePage = cl;
I.ScriptAndVersionSettings = pm;
class M extends o {
  constructor() {
    super(...arguments), this.routes = new tl(this._client), this.assets = new sl(this._client), this.scripts = new I(this._client), this.accountSettings = new um(this._client), this.domains = new Ju(this._client), this.subdomains = new lm(this._client), this.observability = new ns(this._client);
  }
}
M.Routes = tl;
M.RouteListResponsesSinglePage = el;
M.Assets = sl;
M.Scripts = I;
M.ScriptsSinglePage = ll;
M.AccountSettings = um;
M.Domains = Ju;
M.DomainsSinglePage = qu;
M.Subdomains = lm;
M.Observability = ns;
class fm extends o {
  /**
   * Start uploading a collection of assets for use in a Worker version. To learn
   * more about the direct uploads of assets, see
   * https://developers.cloudflare.com/workers/static-assets/direct-upload/.
   *
   * @example
   * ```ts
   * const assetUpload =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.assetUpload.create(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       manifest: { foo: { hash: 'hash', size: 0 } },
   *     },
   *   );
   * ```
   */
  create(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.post(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/assets-upload-session`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
}
class dl extends o {
  /**
   * Fetch script bindings from a script uploaded to a Workers for Platforms
   * namespace.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const bindingGetResponse of client.workersForPlatforms.dispatch.namespaces.scripts.bindings.get(
   *   'my-dispatch-namespace',
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/bindings`, hl, n);
  }
}
class hl extends d {
}
dl.BindingGetResponsesSinglePage = hl;
class Pm extends o {
  /**
   * Put script content for a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const script =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.content.update(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       metadata: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, "CF-WORKER-BODY-PART": c, "CF-WORKER-MAIN-MODULE-PART": a, ...l } = s;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/content`, S({
      body: l,
      ...n,
      headers: {
        ...c != null ? { "CF-WORKER-BODY-PART": c } : void 0,
        ...a != null ? { "CF-WORKER-MAIN-MODULE-PART": a } : void 0,
        ...n?.headers
      }
    }))._thenUnwrap((g) => g.result);
  }
  /**
   * Fetch script content from a script uploaded to a Workers for Platforms
   * namespace.
   *
   * @example
   * ```ts
   * const content =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.content.get(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   *
   * const data = await content.blob();
   * console.log(data);
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/content`, { ...n, headers: { Accept: "string", ...n?.headers }, __binaryResponse: !0 });
  }
}
class _l extends o {
  /**
   * Add a secret to a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const secret =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.secrets.update(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       name: 'myBinding',
   *       text: 'My secret.',
   *       type: 'secret_text',
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/secrets`, { body: c, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * List secrets bound to a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const secretListResponse of client.workersForPlatforms.dispatch.namespaces.scripts.secrets.list(
   *   'my-dispatch-namespace',
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/secrets`, gl, n);
  }
  /**
   * Remove a secret from a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const secret =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.secrets.delete(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     'mySecret',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n, i) {
    const { account_id: c } = n;
    return this._client.delete(`/accounts/${c}/workers/dispatch/namespaces/${t}/scripts/${e}/secrets/${s}`, i)._thenUnwrap((a) => a.result);
  }
  /**
   * Get a given secret binding (value omitted) on a script uploaded to a Workers for
   * Platforms namespace.
   *
   * @example
   * ```ts
   * const secret =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.secrets.get(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     'mySecret',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n, i) {
    const { account_id: c } = n;
    return this._client.get(`/accounts/${c}/workers/dispatch/namespaces/${t}/scripts/${e}/secrets/${s}`, i)._thenUnwrap((a) => a.result);
  }
}
class gl extends d {
}
_l.SecretListResponsesSinglePage = gl;
let bm = class extends o {
  /**
   * Patch script metadata, such as bindings.
   *
   * @example
   * ```ts
   * const response =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.settings.edit(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/settings`, S({ body: c, ...n }))._thenUnwrap((a) => a.result);
  }
  /**
   * Get script settings from a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const setting =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.settings.get(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/settings`, n)._thenUnwrap((c) => c.result);
  }
}, En = class extends o {
  /**
   * Put script tags for a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tagUpdateResponse of client.workersForPlatforms.dispatch.namespaces.scripts.tags.update(
   *   'my-dispatch-namespace',
   *   'this-is_my_script-01',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: ['my-tag'],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/tags`, pl, { body: c, method: "put", ...n });
  }
  /**
   * Fetch tags from a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tagListResponse of client.workersForPlatforms.dispatch.namespaces.scripts.tags.list(
   *   'my-dispatch-namespace',
   *   'this-is_my_script-01',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.getAPIList(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}/tags`, wl, n);
  }
  /**
   * Delete script tag for a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const tag =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.tags.delete(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     'my-tag',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n, i) {
    const { account_id: c } = n;
    return this._client.delete(`/accounts/${c}/workers/dispatch/namespaces/${t}/scripts/${e}/tags/${s}`, i)._thenUnwrap((a) => a.result);
  }
};
class pl extends d {
}
class wl extends d {
}
En.TagUpdateResponsesSinglePage = pl;
En.TagListResponsesSinglePage = wl;
class N extends o {
  constructor() {
    super(...arguments), this.assetUpload = new fm(this._client), this.content = new Pm(this._client), this.settings = new bm(this._client), this.bindings = new dl(this._client), this.secrets = new _l(this._client), this.tags = new En(this._client);
  }
  /**
   * Upload a worker module to a Workers for Platforms namespace. You can find more
   * about the multipart metadata on our docs:
   * https://developers.cloudflare.com/workers/configuration/multipart-upload-metadata/.
   *
   * @example
   * ```ts
   * const script =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.update(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       metadata: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, files: c, ...a } = s;
    return this._client.put(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}`, Wh({
      body: { ...a, ...c },
      ...n,
      __multipartSyntax: "json",
      headers: { "Content-Type": "application/javascript", ...n?.headers }
    }))._thenUnwrap((l) => l.result);
  }
  /**
   * Delete a worker from a Workers for Platforms namespace. This call has no
   * response body on a successful delete.
   *
   * @example
   * ```ts
   * const script =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.delete(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s, n) {
    const { account_id: i, force: c } = s;
    return this._client.delete(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}`, { query: { force: c }, ...n })._thenUnwrap((a) => a.result);
  }
  /**
   * Fetch information about a script uploaded to a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const script =
   *   await client.workersForPlatforms.dispatch.namespaces.scripts.get(
   *     'my-dispatch-namespace',
   *     'this-is_my_script-01',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workers/dispatch/namespaces/${t}/scripts/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
N.AssetUpload = fm;
N.Content = Pm;
N.Settings = bm;
N.Bindings = dl;
N.BindingGetResponsesSinglePage = hl;
N.Secrets = _l;
N.SecretListResponsesSinglePage = gl;
N.Tags = En;
N.TagUpdateResponsesSinglePage = pl;
N.TagListResponsesSinglePage = wl;
class Mn extends o {
  constructor() {
    super(...arguments), this.scripts = new N(this._client);
  }
  /**
   * Create a new Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const namespace =
   *   await client.workersForPlatforms.dispatch.namespaces.create(
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/workers/dispatch/namespaces`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a list of Workers for Platforms namespaces.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const namespaceListResponse of client.workersForPlatforms.dispatch.namespaces.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/workers/dispatch/namespaces`, $l, e);
  }
  /**
   * Delete a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const namespace =
   *   await client.workersForPlatforms.dispatch.namespaces.delete(
   *     'my-dispatch-namespace',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/workers/dispatch/namespaces/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a Workers for Platforms namespace.
   *
   * @example
   * ```ts
   * const namespace =
   *   await client.workersForPlatforms.dispatch.namespaces.get(
   *     'my-dispatch-namespace',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workers/dispatch/namespaces/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class $l extends d {
}
Mn.NamespaceListResponsesSinglePage = $l;
Mn.Scripts = N;
class Nn extends o {
  constructor() {
    super(...arguments), this.namespaces = new Mn(this._client);
  }
}
Nn.Namespaces = Mn;
Nn.NamespaceListResponsesSinglePage = $l;
class ml extends o {
  constructor() {
    super(...arguments), this.dispatch = new Nn(this._client);
  }
}
ml.Dispatch = Nn;
let yl = class extends o {
  /**
   * List deployed Workflow versions
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/workflows/${t}/versions`, fl, { query: i, ...s });
  }
  /**
   * Get Workflow version details
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workflows/${t}/versions/${e}`, n)._thenUnwrap((c) => c.result);
  }
};
class fl extends p {
}
yl.VersionListResponsesV4PagePaginationArray = fl;
class Um extends o {
  /**
   * Send event to instance
   */
  create(t, e, s, n, i) {
    const { account_id: c, body: a } = n ?? {};
    return this._client.post(`/accounts/${c}/workflows/${t}/instances/${e}/events/${s}`, { body: a, ...i })._thenUnwrap((l) => l.result);
  }
}
class xm extends o {
  /**
   * Change status of instance
   */
  edit(t, e, s, n) {
    const { account_id: i, ...c } = s;
    return this._client.patch(`/accounts/${i}/workflows/${t}/instances/${e}/status`, {
      body: c,
      ...n
    })._thenUnwrap((a) => a.result);
  }
}
class ge extends o {
  constructor() {
    super(...arguments), this.status = new xm(this._client), this.events = new Um(this._client);
  }
  /**
   * Create a new workflow instance
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/workflows/${t}/instances`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List of workflow instances
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/workflows/${t}/instances`, Pl, { query: i, ...s });
  }
  /**
   * Batch create new Workflow instances
   */
  bulk(t, e, s) {
    const { account_id: n, body: i } = e ?? {};
    return this._client.getAPIList(`/accounts/${n}/workflows/${t}/instances/batch`, bl, { body: i, method: "post", ...s });
  }
  /**
   * Get logs and status from instance
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/workflows/${t}/instances/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Pl extends p {
}
class bl extends d {
}
ge.InstanceListResponsesV4PagePaginationArray = Pl;
ge.InstanceBulkResponsesSinglePage = bl;
ge.Status = xm;
ge.Events = Um;
class bt extends o {
  constructor() {
    super(...arguments), this.instances = new ge(this._client), this.versions = new yl(this._client);
  }
  /**
   * Create/modify Workflow
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/workflows/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all Workflows
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/workflows`, Sm, { query: n, ...e });
  }
  /**
   * Deletes a Workflow. This only deletes the Workflow and does not delete or modify
   * any Worker associated to this Workflow or bounded to it.
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/workflows/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get Workflow details
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/workflows/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Sm extends p {
}
bt.WorkflowListResponsesV4PagePaginationArray = Sm;
bt.Instances = ge;
bt.InstanceListResponsesV4PagePaginationArray = Pl;
bt.InstanceBulkResponsesSinglePage = bl;
bt.Versions = yl;
bt.VersionListResponsesV4PagePaginationArray = fl;
class zm extends o {
  /**
   * Updates Zaraz configuration for a zone.
   *
   * @example
   * ```ts
   * const configuration = await client.zaraz.config.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   dataLayer: true,
   *   debugKey: 'debugKey',
   *   settings: { autoInjectScript: true },
   *   tools: {
   *     foo: { ... },
   *   },
   *   triggers: {
   *     foo: { ... },
   *   },
   *   variables: {
   *     foo: { ... },
   *   },
   *   zarazVersion: 0,
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/settings/zaraz/config`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets latest Zaraz configuration for a zone. It can be preview or published
   * configuration, whichever was the last updated. Secret variables values will not
   * be included.
   *
   * @example
   * ```ts
   * const configuration = await client.zaraz.config.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/settings/zaraz/config`, e)._thenUnwrap((n) => n.result);
  }
}
let Rm = class extends o {
  /**
   * Gets default Zaraz configuration for a zone.
   *
   * @example
   * ```ts
   * const configuration = await client.zaraz.default.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/settings/zaraz/default`, e)._thenUnwrap((n) => n.result);
  }
};
class Am extends o {
  /**
   * Exports full current published Zaraz configuration for a zone, secret variables
   * included.
   *
   * @example
   * ```ts
   * const configuration = await client.zaraz.export.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/settings/zaraz/export`, e);
  }
}
class vm extends o {
  /**
   * Publish current Zaraz preview configuration for a zone.
   *
   * @example
   * ```ts
   * const publish = await client.zaraz.publish.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, body: n } = t ?? {};
    return this._client.post(`/zones/${s}/settings/zaraz/publish`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Lm extends o {
  /**
   * Gets Zaraz workflow for a zone.
   *
   * @example
   * ```ts
   * const workflow = await client.zaraz.workflow.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/settings/zaraz/workflow`, e)._thenUnwrap((n) => n.result);
  }
}
class Im extends o {
  /**
   * Gets a history of published Zaraz configurations by ID(s) for a zone.
   *
   * @example
   * ```ts
   * const config = await client.zaraz.history.configs.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   ids: [0],
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.get(`/zones/${s}/settings/zaraz/history/configs`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Yn extends o {
  constructor() {
    super(...arguments), this.configs = new Im(this._client);
  }
  /**
   * Restores a historical published Zaraz configuration by ID for a zone.
   *
   * @example
   * ```ts
   * const configuration = await client.zaraz.history.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   body: 12345,
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, body: n } = t;
    return this._client.put(`/zones/${s}/settings/zaraz/history`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists a history of published Zaraz configuration records for a zone.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const historyListResponse of client.zaraz.history.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/settings/zaraz/history`, Ul, { query: n, ...e });
  }
}
class Ul extends d {
}
Yn.HistoryListResponsesSinglePage = Ul;
Yn.Configs = Im;
class dt extends o {
  constructor() {
    super(...arguments), this.config = new zm(this._client), this.default = new Rm(this._client), this.export = new Am(this._client), this.history = new Yn(this._client), this.publish = new vm(this._client), this.workflow = new Lm(this._client);
  }
  /**
   * Updates Zaraz workflow for a zone.
   *
   * @example
   * ```ts
   * const workflow = await client.zaraz.update({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   workflow: 'realtime',
   * });
   * ```
   */
  update(t, e) {
    const { zone_id: s, workflow: n } = t;
    return this._client.put(`/zones/${s}/settings/zaraz/workflow`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
dt.Config = zm;
dt.Default = Rm;
dt.Export = Am;
dt.History = Yn;
dt.HistoryListResponsesSinglePage = Ul;
dt.Publish = vm;
dt.WorkflowResource = Lm;
class km extends o {
  /**
   * Updates the Zero Trust Connectivity Settings for the given account.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.connectivitySettings.edit({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/zerotrust/connectivity_settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the Zero Trust Connectivity Settings for the given account.
   *
   * @example
   * ```ts
   * const connectivitySetting =
   *   await client.zeroTrust.connectivitySettings.get({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/zerotrust/connectivity_settings`, e)._thenUnwrap((n) => n.result);
  }
}
class xl extends o {
  /**
   * Removes a user from a Zero Trust seat when both `access_seat` and `gateway_seat`
   * are set to false.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const seat of client.zeroTrust.seats.edit({
   *   account_id: '699d98642c564d2e855e9661899b7252',
   *   body: [
   *     {
   *       access_seat: false,
   *       gateway_seat: false,
   *       seat_uid: 'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     },
   *   ],
   * })) {
   *   // ...
   * }
   * ```
   */
  edit(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.getAPIList(`/accounts/${s}/access/seats`, Sl, {
      body: n,
      method: "patch",
      ...e
    });
  }
}
class Sl extends d {
}
xl.SeatsSinglePage = Sl;
class zl extends o {
  /**
   * Create a new Bookmark application.
   *
   * @deprecated
   */
  create(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/access/bookmarks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Updates a configured Bookmark application.
   *
   * @deprecated
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.put(`/accounts/${n}/access/bookmarks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Bookmark applications.
   *
   * @deprecated
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/access/bookmarks`, Rl, e);
  }
  /**
   * Deletes a Bookmark application.
   *
   * @deprecated
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/access/bookmarks/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Bookmark application.
   *
   * @deprecated
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/access/bookmarks/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Rl extends d {
}
zl.BookmarksSinglePage = Rl;
class Al extends o {
  /**
   * Create a custom page
   *
   * @example
   * ```ts
   * const customPageWithoutHTML =
   *   await client.zeroTrust.access.customPages.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     custom_html:
   *       '<html><body><h1>Access Denied</h1></body></html>',
   *     name: 'name',
   *     type: 'identity_denied',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/access/custom_pages`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a custom page
   *
   * @example
   * ```ts
   * const customPageWithoutHTML =
   *   await client.zeroTrust.access.customPages.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       custom_html:
   *         '<html><body><h1>Access Denied</h1></body></html>',
   *       name: 'name',
   *       type: 'identity_denied',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/access/custom_pages/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List custom pages
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const customPageWithoutHTML of client.zeroTrust.access.customPages.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/access/custom_pages`, vl, e);
  }
  /**
   * Delete a custom page
   *
   * @example
   * ```ts
   * const customPage =
   *   await client.zeroTrust.access.customPages.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/access/custom_pages/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a custom page and also returns its HTML.
   *
   * @example
   * ```ts
   * const customPage =
   *   await client.zeroTrust.access.customPages.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/access/custom_pages/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class vl extends d {
}
Al.CustomPageWithoutHTMLsSinglePage = vl;
class Ll extends o {
  /**
   * Adds a new SSH Certificate Authority (CA).
   *
   * @example
   * ```ts
   * const gatewayCA =
   *   await client.zeroTrust.access.gatewayCA.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/access/gateway_ca`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Lists SSH Certificate Authorities (CA).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const gatewayCAListResponse of client.zeroTrust.access.gatewayCA.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/access/gateway_ca`, Il, e);
  }
  /**
   * Deletes an SSH Certificate Authority.
   *
   * @example
   * ```ts
   * const gatewayCA =
   *   await client.zeroTrust.access.gatewayCA.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/access/gateway_ca/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Il extends d {
}
Ll.GatewayCAListResponsesSinglePage = Il;
let kl = class extends o {
  /**
   * Creates a new Access group.
   *
   * @example
   * ```ts
   * const group = await client.zeroTrust.access.groups.create({
   *   include: [
   *     {
   *       group: { id: 'aa0a4aab-672b-4bdb-bc33-a59f1130a11f' },
   *     },
   *   ],
   *   name: 'Allow devs',
   *   account_id: 'account_id',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/access/groups`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured Access group.
   *
   * @example
   * ```ts
   * const group = await client.zeroTrust.access.groups.update(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   {
   *     include: [
   *       {
   *         group: {
   *           id: 'aa0a4aab-672b-4bdb-bc33-a59f1130a11f',
   *         },
   *       },
   *     ],
   *     name: 'Allow devs',
   *     account_id: 'account_id',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/groups/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/access/groups`, Ol, { query: i, ...e });
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/groups/${t}`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/groups/${t}`, s)._thenUnwrap((l) => l.result);
  }
};
class Ol extends d {
}
class xf extends d {
}
kl.GroupListResponsesSinglePage = Ol;
class Om extends o {
  /**
   * Updates the Access key rotation settings for an account.
   *
   * @example
   * ```ts
   * const key = await client.zeroTrust.access.keys.update({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   key_rotation_interval_days: 30,
   * });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/access/keys`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets the Access key rotation settings for an account.
   *
   * @example
   * ```ts
   * const key = await client.zeroTrust.access.keys.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/access/keys`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Perfoms a key rotation for an account.
   *
   * @example
   * ```ts
   * const response = await client.zeroTrust.access.keys.rotate({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  rotate(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/access/keys/rotate`, e)._thenUnwrap((n) => n.result);
  }
}
let Cl = class extends o {
  /**
   * Creates a new Access reusable policy.
   *
   * @example
   * ```ts
   * const policy =
   *   await client.zeroTrust.access.policies.create({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     decision: 'allow',
   *     include: [
   *       {
   *         group: {
   *           id: 'aa0a4aab-672b-4bdb-bc33-a59f1130a11f',
   *         },
   *       },
   *     ],
   *     name: 'Allow devs',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/access/policies`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a Access reusable policy.
   *
   * @example
   * ```ts
   * const policy =
   *   await client.zeroTrust.access.policies.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       decision: 'allow',
   *       include: [
   *         {
   *           group: {
   *             id: 'aa0a4aab-672b-4bdb-bc33-a59f1130a11f',
   *           },
   *         },
   *       ],
   *       name: 'Allow devs',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/access/policies/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists Access reusable policies.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const policyListResponse of client.zeroTrust.access.policies.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/access/policies`, Zl, e);
  }
  /**
   * Deletes an Access reusable policy.
   *
   * @example
   * ```ts
   * const policy =
   *   await client.zeroTrust.access.policies.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/access/policies/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Access reusable policy.
   *
   * @example
   * ```ts
   * const policy = await client.zeroTrust.access.policies.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/access/policies/${t}`, s)._thenUnwrap((i) => i.result);
  }
}, Zl = class extends d {
};
Cl.PolicyListResponsesSinglePage = Zl;
class Tl extends o {
  /**
   * Generates a new service token. **Note:** This is the only time you can get the
   * Client Secret. If you lose the Client Secret, you will have to rotate the Client
   * Secret or create a new service token.
   *
   * @example
   * ```ts
   * const serviceToken =
   *   await client.zeroTrust.access.serviceTokens.create({
   *     name: 'CI/CD token',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/access/service_tokens`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured service token.
   *
   * @example
   * ```ts
   * const serviceToken =
   *   await client.zeroTrust.access.serviceTokens.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/service_tokens/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/access/service_tokens`, Vl, { query: i, ...e });
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/service_tokens/${t}`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/service_tokens/${t}`, s)._thenUnwrap((l) => l.result);
  }
  /**
   * Refreshes the expiration of a service token.
   *
   * @example
   * ```ts
   * const serviceToken =
   *   await client.zeroTrust.access.serviceTokens.refresh(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  refresh(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/access/service_tokens/${t}/refresh`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Generates a new Client Secret for a service token and revokes the old one.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.access.serviceTokens.rotate(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  rotate(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/access/service_tokens/${t}/rotate`, s)._thenUnwrap((i) => i.result);
  }
}
class Vl extends d {
}
Tl.ServiceTokensSinglePage = Vl;
class Dl extends o {
  /**
   * Create a tag
   *
   * @example
   * ```ts
   * const tag = await client.zeroTrust.access.tags.create({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/access/tags`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a tag
   *
   * @example
   * ```ts
   * const tag = await client.zeroTrust.access.tags.update(
   *   'engineers',
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     name: 'engineers',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/access/tags/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List tags
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tag of client.zeroTrust.access.tags.list({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/access/tags`, El, e);
  }
  /**
   * Delete a tag
   *
   * @example
   * ```ts
   * const tag = await client.zeroTrust.access.tags.delete(
   *   'engineers',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/access/tags/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get a tag
   *
   * @example
   * ```ts
   * const tag = await client.zeroTrust.access.tags.get(
   *   'engineers',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/access/tags/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class El extends d {
}
Dl.TagsSinglePage = El;
class Ml extends o {
  create(t, e = {}, s) {
    if (u(e))
      return this.create(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${c}/${a}/access/apps/${t}/ca`, s)._thenUnwrap((l) => l.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/access/apps/ca`, Nl, e);
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/apps/${t}/ca`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/apps/${t}/ca`, s)._thenUnwrap((l) => l.result);
  }
}
class Nl extends d {
}
Ml.CAsSinglePage = Nl;
let Yl = class extends o {
  /**
   * Creates a policy applying exclusive to a single application that defines the
   * users or groups who can reach it. We recommend creating a reusable policy
   * instead and subsequently referencing its ID in the application's 'policies'
   * array.
   *
   * @example
   * ```ts
   * const policy =
   *   await client.zeroTrust.access.applications.policies.create(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${a}/${l}/access/apps/${t}/policies`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  /**
   * Updates an Access policy specific to an application. To update a reusable
   * policy, use the /account or zones/{account or zone_id}/policies/{uid} endpoint.
   *
   * @example
   * ```ts
   * const policy =
   *   await client.zeroTrust.access.applications.policies.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  update(t, e, s, n) {
    const { account_id: i, zone_id: c, ...a } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: l, accountOrZoneId: g } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.put(`/${l}/${g}/access/apps/${t}/policies/${e}`, {
      body: a,
      ...n
    })._thenUnwrap((y) => y.result);
  }
  list(t, e = {}, s) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.getAPIList(`/${c}/${a}/access/apps/${t}/policies`, jl, s);
  }
  delete(t, e, s = {}, n) {
    if (u(s))
      return this.delete(t, e, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.delete(`/${a}/${l}/access/apps/${t}/policies/${e}`, n)._thenUnwrap((g) => g.result);
  }
  get(t, e, s = {}, n) {
    if (u(s))
      return this.get(t, e, {}, s);
    const { account_id: i, zone_id: c } = s;
    if (!i && !c)
      throw new h("You must provide either account_id or zone_id.");
    if (i && c)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = i ? {
      accountOrZone: "accounts",
      accountOrZoneId: i
    } : {
      accountOrZone: "zones",
      accountOrZoneId: c
    };
    return this._client.get(`/${a}/${l}/access/apps/${t}/policies/${e}`, n)._thenUnwrap((g) => g.result);
  }
};
class jl extends d {
}
Yl.PolicyListResponsesSinglePage = jl;
let Cm = class extends o {
  /**
   * Updates Access application settings.
   *
   * @example
   * ```ts
   * const setting =
   *   await client.zeroTrust.access.applications.settings.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/apps/${t}/settings`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  /**
   * Updates Access application settings.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.access.applications.settings.edit(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.patch(`/${a}/${l}/access/apps/${t}/settings`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
};
class Zm extends o {
  list(t, e = {}, s) {
    if (u(e))
      return this.list(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/apps/${t}/user_policy_checks`, s)._thenUnwrap((l) => l.result);
  }
}
let Fl = class extends o {
  /**
   * Fetches a single page of user results from an Access policy test.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const userListResponse of client.zeroTrust.access.applications.policyTests.users.list(
   *   'f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/access/policy-tests/${t}/users`, Gl, { query: i, ...s });
  }
};
class Gl extends p {
}
Fl.UserListResponsesV4PagePaginationArray = Gl;
class jn extends o {
  constructor() {
    super(...arguments), this.users = new Fl(this._client);
  }
  /**
   * Starts an Access policy test.
   *
   * @example
   * ```ts
   * const policyTest =
   *   await client.zeroTrust.access.applications.policyTests.create(
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/access/policy-tests`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current status of a given Access policy test.
   *
   * @example
   * ```ts
   * const policyTest =
   *   await client.zeroTrust.access.applications.policyTests.get(
   *     'f1a8b3c9d4e5f6789a0b1c2d3e4f5678a9b0c1d2e3f4a5b67890c1d2e3f4b5a6',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/access/policy-tests/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
jn.Users = Fl;
jn.UserListResponsesV4PagePaginationArray = Gl;
class rt extends o {
  constructor() {
    super(...arguments), this.cas = new Ml(this._client), this.userPolicyChecks = new Zm(this._client), this.policies = new Yl(this._client), this.policyTests = new jn(this._client), this.settings = new Cm(this._client);
  }
  /**
   * Adds a new application to Access.
   *
   * @example
   * ```ts
   * const application =
   *   await client.zeroTrust.access.applications.create({
   *     domain: 'test.example.com/admin',
   *     type: 'self_hosted',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/access/apps`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an Access application.
   *
   * @example
   * ```ts
   * const application =
   *   await client.zeroTrust.access.applications.update(
   *     '023e105f4ecef8ad9ca31a8372d0c353',
   *     {
   *       domain: 'test.example.com/admin',
   *       type: 'self_hosted',
   *       account_id: 'account_id',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/apps/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/access/apps`, Bl, { query: i, ...e });
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/apps/${t}`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/apps/${t}`, s)._thenUnwrap((l) => l.result);
  }
  revokeTokens(t, e = {}, s) {
    if (u(e))
      return this.revokeTokens(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.post(`/${c}/${a}/access/apps/${t}/revoke_tokens`, s)._thenUnwrap((l) => l.result);
  }
}
class Bl extends d {
}
rt.ApplicationListResponsesSinglePage = Bl;
rt.CAs = Ml;
rt.CAsSinglePage = Nl;
rt.UserPolicyChecks = Zm;
rt.Policies = Yl;
rt.PolicyListResponsesSinglePage = jl;
rt.PolicyTests = jn;
rt.Settings = Cm;
let Hl = class extends o {
  /**
   * Updates an mTLS certificate's hostname settings.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const certificateSettings of client.zeroTrust.access.certificates.settings.update(
   *   {
   *     settings: [
   *       {
   *         china_network: false,
   *         client_certificate_forwarding: true,
   *         hostname: 'admin.example.com',
   *       },
   *     ],
   *     account_id: 'account_id',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/access/certificates/settings`, Us, { body: i, method: "put", ...e });
  }
  get(t = {}, e) {
    if (u(t))
      return this.get({}, t);
    const { account_id: s, zone_id: n } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/access/certificates/settings`, Us, e);
  }
};
class Us extends d {
}
Hl.CertificateSettingsSinglePage = Us;
let is = class extends o {
  constructor() {
    super(...arguments), this.settings = new Hl(this._client);
  }
  /**
   * Adds a new mTLS root certificate to Access.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.zeroTrust.access.certificates.create({
   *     certificate:
   *       '-----BEGIN CERTIFICATE-----\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...N4RI7KKB7nikiuUf8vhULKy5IX10\nDrUtmu/B\n-----END CERTIFICATE-----',
   *     name: 'Allow devs',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/access/certificates`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured mTLS certificate.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.zeroTrust.access.certificates.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       associated_hostnames: ['admin.example.com'],
   *       account_id: 'account_id',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/certificates/${t}`, {
      body: c,
      ...s
    })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${i}/${c}/access/certificates`, Wl, e);
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/certificates/${t}`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/certificates/${t}`, s)._thenUnwrap((l) => l.result);
  }
};
class Wl extends d {
}
is.CertificatesSinglePage = Wl;
is.Settings = Hl;
is.CertificateSettingsSinglePage = Us;
class Fn extends o {
  /**
   * Create new target
   *
   * @example
   * ```ts
   * const target =
   *   await client.zeroTrust.access.infrastructure.targets.create(
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       hostname: 'infra-access-target',
   *       ip: {},
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/infrastructure/targets`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update target
   *
   * @example
   * ```ts
   * const target =
   *   await client.zeroTrust.access.infrastructure.targets.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *       hostname: 'infra-access-target',
   *       ip: {},
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/infrastructure/targets/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists and sorts an account’s targets. Filters are optional and are ANDed
   * together.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const targetListResponse of client.zeroTrust.access.infrastructure.targets.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/infrastructure/targets`, Kl, { query: n, ...e });
  }
  /**
   * Delete target
   *
   * @example
   * ```ts
   * await client.zeroTrust.access.infrastructure.targets.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/infrastructure/targets/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Removes one or more targets.
   *
   * @deprecated
   */
  bulkDelete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/infrastructure/targets/batch`, {
      ...e,
      headers: { Accept: "*/*", ...e?.headers }
    });
  }
  /**
   * Removes one or more targets.
   *
   * @example
   * ```ts
   * await client.zeroTrust.access.infrastructure.targets.bulkDeleteV2(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     target_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
   *   },
   * );
   * ```
   */
  bulkDeleteV2(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/infrastructure/targets/batch_delete`, {
      body: n,
      ...e,
      headers: { Accept: "*/*", ...e?.headers }
    });
  }
  /**
   * Adds one or more targets.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const targetBulkUpdateResponse of client.zeroTrust.access.infrastructure.targets.bulkUpdate(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     body: [{ hostname: 'infra-access-target', ip: {} }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  bulkUpdate(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.getAPIList(`/accounts/${s}/infrastructure/targets/batch`, Xl, { body: n, method: "put", ...e });
  }
  /**
   * Get target
   *
   * @example
   * ```ts
   * const target =
   *   await client.zeroTrust.access.infrastructure.targets.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/infrastructure/targets/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Kl extends p {
}
class Xl extends d {
}
Fn.TargetListResponsesV4PagePaginationArray = Kl;
Fn.TargetBulkUpdateResponsesSinglePage = Xl;
class rs extends o {
  constructor() {
    super(...arguments), this.targets = new Fn(this._client);
  }
}
rs.Targets = Fn;
rs.TargetListResponsesV4PagePaginationArray = Kl;
rs.TargetBulkUpdateResponsesSinglePage = Xl;
class Tm extends o {
  /**
   * Gets a list of Access authentication audit logs for an account.
   *
   * @example
   * ```ts
   * const accessRequests =
   *   await client.zeroTrust.access.logs.accessRequests.list({
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/access/logs/access_requests`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class Ql extends o {
  /**
   * Lists Access SCIM update logs that maintain a record of updates made to User and
   * Group resources synced to Cloudflare via the System for Cross-domain Identity
   * Management (SCIM).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const updateListResponse of client.zeroTrust.access.logs.scim.updates.list(
   *   {
   *     account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   *     idp_id: [
   *       'df7e2w5f-02b7-4d9d-af26-8d1988fca630',
   *       '0194ae2c-efcf-7cfb-8884-055f1a161fa5',
   *     ],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/access/logs/scim/updates`, Jl, { query: n, ...e });
  }
}
class Jl extends d {
}
Ql.UpdateListResponsesSinglePage = Jl;
let Gn = class extends o {
  constructor() {
    super(...arguments), this.updates = new Ql(this._client);
  }
};
Gn.Updates = Ql;
Gn.UpdateListResponsesSinglePage = Jl;
class Bn extends o {
  constructor() {
    super(...arguments), this.accessRequests = new Tm(this._client), this.scim = new Gn(this._client);
  }
}
Bn.AccessRequests = Tm;
Bn.SCIM = Gn;
class ql extends o {
  /**
   * Get active sessions for a single user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const activeSessionListResponse of client.zeroTrust.access.users.activeSessions.list(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/access/users/${t}/active_sessions`, td, s);
  }
  /**
   * Get an active session for a single user.
   *
   * @example
   * ```ts
   * const activeSession =
   *   await client.zeroTrust.access.users.activeSessions.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     'X1aXj1lFVcqqyoXF',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/access/users/${t}/active_sessions/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class td extends d {
}
ql.ActiveSessionListResponsesSinglePage = td;
class ed extends o {
  /**
   * Get all failed login attempts for a single user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const failedLoginListResponse of client.zeroTrust.access.users.failedLogins.list(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/access/users/${t}/failed_logins`, sd, s);
  }
}
class sd extends d {
}
ed.FailedLoginListResponsesSinglePage = sd;
class Vm extends o {
  /**
   * Get last seen identity for a single user.
   *
   * @example
   * ```ts
   * const identity =
   *   await client.zeroTrust.access.users.lastSeenIdentity.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/access/users/${t}/last_seen_identity`, s)._thenUnwrap((i) => i.result);
  }
}
let Ut = class extends o {
  constructor() {
    super(...arguments), this.activeSessions = new ql(this._client), this.lastSeenIdentity = new Vm(this._client), this.failedLogins = new ed(this._client);
  }
  /**
   * Gets a list of users for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const userListResponse of client.zeroTrust.access.users.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/access/users`, nd, {
      query: n,
      ...e
    });
  }
};
class nd extends d {
}
class Sf extends d {
}
Ut.UserListResponsesSinglePage = nd;
Ut.ActiveSessions = ql;
Ut.ActiveSessionListResponsesSinglePage = td;
Ut.LastSeenIdentity = Vm;
Ut.FailedLogins = ed;
Ut.FailedLoginListResponsesSinglePage = sd;
class m extends o {
  constructor() {
    super(...arguments), this.gatewayCA = new Ll(this._client), this.infrastructure = new rs(this._client), this.applications = new rt(this._client), this.certificates = new is(this._client), this.groups = new kl(this._client), this.serviceTokens = new Tl(this._client), this.bookmarks = new zl(this._client), this.keys = new Om(this._client), this.logs = new Bn(this._client), this.users = new Ut(this._client), this.customPages = new Al(this._client), this.tags = new Dl(this._client), this.policies = new Cl(this._client);
  }
}
m.GatewayCA = Ll;
m.GatewayCAListResponsesSinglePage = Il;
m.Infrastructure = rs;
m.Applications = rt;
m.ApplicationListResponsesSinglePage = Bl;
m.Certificates = is;
m.CertificatesSinglePage = Wl;
m.Groups = kl;
m.GroupListResponsesSinglePage = Ol;
m.ServiceTokens = Tl;
m.ServiceTokensSinglePage = Vl;
m.Bookmarks = zl;
m.BookmarksSinglePage = Rl;
m.Keys = Om;
m.Logs = Bn;
m.Users = Ut;
m.UserListResponsesSinglePage = nd;
m.CustomPages = Al;
m.CustomPageWithoutHTMLsSinglePage = vl;
m.Tags = Dl;
m.TagsSinglePage = El;
m.Policies = Cl;
m.PolicyListResponsesSinglePage = Zl;
let id = class extends o {
  /**
   * Lists WARP devices.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deviceListResponse of client.zeroTrust.devices.devices.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/physical-devices`, rd, { query: n, ...e });
  }
  /**
   * Deletes a WARP device.
   *
   * @example
   * ```ts
   * const device =
   *   await client.zeroTrust.devices.devices.delete(
   *     'device_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/devices/physical-devices/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single WARP device.
   *
   * @example
   * ```ts
   * const device = await client.zeroTrust.devices.devices.get(
   *   'device_id',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/physical-devices/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Revokes all WARP registrations associated with the specified device.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.devices.devices.revoke(
   *     'device_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  revoke(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/devices/physical-devices/${t}/revoke`, s)._thenUnwrap((i) => i.result);
  }
};
class rd extends Is {
}
id.DeviceListResponsesCursorPagination = rd;
class cd extends o {
  /**
   * Create a DEX test.
   *
   * @example
   * ```ts
   * const dexTest =
   *   await client.zeroTrust.devices.dexTests.create({
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     data: {},
   *     enabled: true,
   *     interval: '30m',
   *     name: 'HTTP dash health check',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dex/devices/dex_tests`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update a DEX test.
   *
   * @example
   * ```ts
   * const dexTest =
   *   await client.zeroTrust.devices.dexTests.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       data: {},
   *       enabled: true,
   *       interval: '30m',
   *       name: 'HTTP dash health check',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dex/devices/dex_tests/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch all DEX tests
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dexTestListResponse of client.zeroTrust.devices.dexTests.list(
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/dex/devices/dex_tests`, od, e);
  }
  /**
   * Delete a Device DEX test. Returns the remaining device dex tests for the
   * account.
   *
   * @example
   * ```ts
   * const dexTest =
   *   await client.zeroTrust.devices.dexTests.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '01a7362d577a6c3019a474fd6f485823' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dex/devices/dex_tests/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch a single DEX test.
   *
   * @example
   * ```ts
   * const dexTest = await client.zeroTrust.devices.dexTests.get(
   *   '372e67954025e0ba6aaa6d586b9e0b59',
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dex/devices/dex_tests/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class od extends d {
}
cd.DEXTestListResponsesSinglePage = od;
let Dm = class extends o {
  /**
   * Get the live status of a latest device given device_id from the device_state
   * table
   *
   * @example
   * ```ts
   * const fleetStatus =
   *   await client.zeroTrust.devices.fleetStatus.get(
   *     'cb49c27f-7f97-49c5-b6f3-f7c01ead0fd7',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       since_minutes: 10,
   *     },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dex/devices/${t}/fleet-status/live`, {
      query: i,
      ...s
    });
  }
}, ad = class extends o {
  /**
   * Creates a new device managed network.
   *
   * @example
   * ```ts
   * const deviceNetwork =
   *   await client.zeroTrust.devices.networks.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     config: { tls_sockaddr: 'foo.bar:1234' },
   *     name: 'managed-network-1',
   *     type: 'tls',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/devices/networks`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device managed network.
   *
   * @example
   * ```ts
   * const deviceNetwork =
   *   await client.zeroTrust.devices.networks.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/devices/networks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a list of managed networks for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deviceNetwork of client.zeroTrust.devices.networks.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/networks`, xs, e);
  }
  /**
   * Deletes a device managed network and fetches a list of the remaining device
   * managed networks for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deviceNetwork of client.zeroTrust.devices.networks.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/networks/${t}`, xs, { method: "delete", ...s });
  }
  /**
   * Fetches details for a single managed network.
   *
   * @example
   * ```ts
   * const deviceNetwork =
   *   await client.zeroTrust.devices.networks.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/networks/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class xs extends d {
}
ad.DeviceNetworksSinglePage = xs;
class ud extends o {
  /**
   * Fetches a one-time use admin override code for a device. This relies on the
   * **Admin Override** setting being enabled in your device configuration. Not
   * supported when
   * [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/)
   * is enabled for the account. **Deprecated:** please use GET
   * /accounts/{account_id}/devices/registrations/{registration_id}/override_codes
   * instead.
   *
   * @deprecated
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/${t}/override_codes`, ld, s);
  }
  /**
   * Fetches one-time use admin override codes for a registration. This relies on the
   * **Admin Override** setting being enabled in your device configuration.
   *
   * @example
   * ```ts
   * const overrideCode =
   *   await client.zeroTrust.devices.overrideCodes.get(
   *     'registration_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/registrations/${t}/override_codes`, s)._thenUnwrap((i) => i.result);
  }
}
class ld extends d {
}
ud.OverrideCodeListResponsesSinglePage = ld;
class dd extends o {
  /**
   * Lists WARP registrations.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const registrationListResponse of client.zeroTrust.devices.registrations.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/registrations`, hd, { query: n, ...e });
  }
  /**
   * Deletes a WARP registration.
   *
   * @example
   * ```ts
   * const registration =
   *   await client.zeroTrust.devices.registrations.delete(
   *     'registration_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/devices/registrations/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Deletes a list of WARP registrations.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.devices.registrations.bulkDelete({
   *     account_id: 'account_id',
   *     id: ['string'],
   *   });
   * ```
   */
  bulkDelete(t, e) {
    const { account_id: s, id: n } = t;
    return this._client.delete(`/accounts/${s}/devices/registrations`, {
      query: { id: n },
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single WARP registration.
   *
   * @example
   * ```ts
   * const registration =
   *   await client.zeroTrust.devices.registrations.get(
   *     'registration_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/registrations/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Revokes a list of WARP registrations.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.devices.registrations.revoke({
   *     account_id: 'account_id',
   *     id: ['string'],
   *   });
   * ```
   */
  revoke(t, e) {
    const { account_id: s, id: n } = t;
    return this._client.post(`/accounts/${s}/devices/registrations/revoke`, {
      query: { id: n },
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Unrevokes a list of WARP registrations.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.devices.registrations.unrevoke({
   *     account_id: 'account_id',
   *     id: ['string'],
   *   });
   * ```
   */
  unrevoke(t, e) {
    const { account_id: s, id: n } = t;
    return this._client.post(`/accounts/${s}/devices/registrations/unrevoke`, {
      query: { id: n },
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class hd extends Is {
}
dd.RegistrationListResponsesCursorPagination = hd;
class Em extends o {
  /**
   * Revokes a list of devices. Not supported when
   * [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/)
   * is enabled.
   *
   * **Deprecated**: please use POST
   * /accounts/{account_id}/devices/registrations/revoke instead.
   *
   * @deprecated
   */
  create(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.post(`/accounts/${s}/devices/revoke`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let Mm = class extends o {
  /**
   * Updates the current device settings for a Zero Trust account.
   *
   * @example
   * ```ts
   * const deviceSettings =
   *   await client.zeroTrust.devices.settings.update({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/devices/settings`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Resets the current device settings for a Zero Trust account.
   *
   * @example
   * ```ts
   * const deviceSettings =
   *   await client.zeroTrust.devices.settings.delete({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  delete(t, e) {
    const { account_id: s } = t;
    return this._client.delete(`/accounts/${s}/devices/settings`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Patches the current device settings for a Zero Trust account.
   *
   * @example
   * ```ts
   * const deviceSettings =
   *   await client.zeroTrust.devices.settings.edit({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/devices/settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Describes the current device settings for a Zero Trust account.
   *
   * @example
   * ```ts
   * const deviceSettings =
   *   await client.zeroTrust.devices.settings.get({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/devices/settings`, e)._thenUnwrap((n) => n.result);
  }
};
class Nm extends o {
  /**
   * Unrevokes a list of devices. Not supported when
   * [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/)
   * is enabled.
   *
   * **Deprecated**: please use POST
   * /accounts/{account_id}/devices/registrations/unrevoke instead.
   *
   * @deprecated
   */
  create(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.post(`/accounts/${s}/devices/unrevoke`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let Ym = class extends o {
  /**
   * Sets the list of routes excluded from the WARP client's tunnel for a specific
   * device settings profile.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelExclude of client.zeroTrust.devices.policies.custom.excludes.update(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     body: [{ address: '192.0.2.0/24' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}/exclude`, Ss, { body: i, method: "put", ...s });
  }
  /**
   * Fetches the list of routes excluded from the WARP client's tunnel for a specific
   * device settings profile.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelExclude of client.zeroTrust.devices.policies.custom.excludes.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}/exclude`, Ss, s);
  }
}, jm = class extends o {
  /**
   * Sets the list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead. This will only apply to the
   * specified device settings profile.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fallbackDomain of client.zeroTrust.devices.policies.custom.fallbackDomains.update(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     domains: [{ suffix: 'example.com' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e, s) {
    const { account_id: n, domains: i } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}/fallback_domains`, Rs, { body: i, method: "put", ...s });
  }
  /**
   * Fetches the list of domains to bypass Gateway DNS resolution from a specified
   * device settings profile. These domains will use the specified local DNS resolver
   * instead.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fallbackDomain of client.zeroTrust.devices.policies.custom.fallbackDomains.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}/fallback_domains`, Rs, s);
  }
}, Fm = class extends o {
  /**
   * Sets the list of routes included in the WARP client's tunnel for a specific
   * device settings profile.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelInclude of client.zeroTrust.devices.policies.custom.includes.update(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     body: [{ address: '192.0.2.0/24' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}/include`, zs, { body: i, method: "put", ...s });
  }
  /**
   * Fetches the list of routes included in the WARP client's tunnel for a specific
   * device settings profile.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelInclude of client.zeroTrust.devices.policies.custom.includes.get(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}/include`, zs, s);
  }
}, cs = class extends o {
  constructor() {
    super(...arguments), this.excludes = new Ym(this._client), this.includes = new Fm(this._client), this.fallbackDomains = new jm(this._client);
  }
  /**
   * Creates a device settings profile to be applied to certain devices matching the
   * criteria.
   *
   * @example
   * ```ts
   * const settingsPolicy =
   *   await client.zeroTrust.devices.policies.custom.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     match: 'identity.email == "test@cloudflare.com"',
   *     name: 'Allow Developers',
   *     precedence: 100,
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/devices/policy`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a list of the device settings profiles for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const settingsPolicy of client.zeroTrust.devices.policies.custom.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policies`, Sh, e);
  }
  /**
   * Deletes a device settings profile and fetches a list of the remaining profiles
   * for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const settingsPolicy of client.zeroTrust.devices.policies.custom.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/devices/policy/${t}`, Sh, { method: "delete", ...s });
  }
  /**
   * Updates a configured device settings profile.
   *
   * @example
   * ```ts
   * const settingsPolicy =
   *   await client.zeroTrust.devices.policies.custom.edit(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/devices/policy/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a device settings profile by ID.
   *
   * @example
   * ```ts
   * const settingsPolicy =
   *   await client.zeroTrust.devices.policies.custom.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/policy/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
cs.Excludes = Ym;
cs.Includes = Fm;
cs.FallbackDomains = jm;
let Gm = class extends o {
  /**
   * Enable Zero Trust Clients to provision a certificate, containing a x509 subject,
   * and referenced by Access device posture policies when the client visits MTLS
   * protected domains. This facilitates device posture without a WARP session.
   *
   * @example
   * ```ts
   * const devicePolicyCertificates =
   *   await client.zeroTrust.devices.policies.default.certificates.edit(
   *     {
   *       zone_id: '699d98642c564d2e855e9661899b7252',
   *       enabled: true,
   *     },
   *   );
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/devices/policy/certificates`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches device certificate provisioning.
   *
   * @example
   * ```ts
   * const devicePolicyCertificates =
   *   await client.zeroTrust.devices.policies.default.certificates.get(
   *     { zone_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/devices/policy/certificates`, e)._thenUnwrap((n) => n.result);
  }
};
class Bm extends o {
  /**
   * Sets the list of routes excluded from the WARP client's tunnel.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelExclude of client.zeroTrust.devices.policies.default.excludes.update(
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     body: [{ address: '192.0.2.0/24' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/exclude`, Ss, { body: n, method: "put", ...e });
  }
  /**
   * Fetches the list of routes excluded from the WARP client's tunnel.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelExclude of client.zeroTrust.devices.policies.default.excludes.get(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/exclude`, Ss, e);
  }
}
class Hm extends o {
  /**
   * Sets the list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fallbackDomain of client.zeroTrust.devices.policies.default.fallbackDomains.update(
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     domains: [{ suffix: 'example.com' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { account_id: s, domains: n } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/fallback_domains`, Rs, { body: n, method: "put", ...e });
  }
  /**
   * Fetches a list of domains to bypass Gateway DNS resolution. These domains will
   * use the specified local DNS resolver instead.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const fallbackDomain of client.zeroTrust.devices.policies.default.fallbackDomains.get(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/fallback_domains`, Rs, e);
  }
}
class Wm extends o {
  /**
   * Sets the list of routes included in the WARP client's tunnel.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelInclude of client.zeroTrust.devices.policies.default.includes.update(
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     body: [{ address: '192.0.2.0/24' }],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  update(t, e) {
    const { account_id: s, body: n } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/include`, zs, { body: n, method: "put", ...e });
  }
  /**
   * Fetches the list of routes included in the WARP client's tunnel.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const splitTunnelInclude of client.zeroTrust.devices.policies.default.includes.get(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/policy/include`, zs, e);
  }
}
class pe extends o {
  constructor() {
    super(...arguments), this.excludes = new Bm(this._client), this.includes = new Wm(this._client), this.fallbackDomains = new Hm(this._client), this.certificates = new Gm(this._client);
  }
  /**
   * Updates the default device settings profile for an account.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.devices.policies.default.edit({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/devices/policy`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the default device settings profile for an account.
   *
   * @example
   * ```ts
   * const _default =
   *   await client.zeroTrust.devices.policies.default.get({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/devices/policy`, e)._thenUnwrap((n) => n.result);
  }
}
pe.Excludes = Bm;
pe.Includes = Wm;
pe.FallbackDomains = Hm;
pe.Certificates = Gm;
class Hn extends o {
  constructor() {
    super(...arguments), this.default = new pe(this._client), this.custom = new cs(this._client);
  }
}
class Ss extends d {
}
class zs extends d {
}
class Rs extends d {
}
class Sh extends d {
}
Hn.Default = pe;
Hn.Custom = cs;
let _d = class extends o {
  /**
   * Create a new device posture integration.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.devices.posture.integrations.create(
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       config: {
   *         api_url: 'https://as123.awmdm.com/API',
   *         auth_url:
   *           'https://na.uemauth.vmwservices.com/connect/token',
   *         client_id: 'example client id',
   *         client_secret: 'example client secret',
   *       },
   *       interval: '10m',
   *       name: 'My Workspace One Integration',
   *       type: 'workspace_one',
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/devices/posture/integration`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the list of device posture integrations for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const integration of client.zeroTrust.devices.posture.integrations.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/posture/integration`, gd, e);
  }
  /**
   * Delete a configured device posture integration.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.devices.posture.integrations.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/devices/posture/integration/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured device posture integration.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.devices.posture.integrations.edit(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/devices/posture/integration/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches details for a single device posture integration.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.devices.posture.integrations.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/posture/integration/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class gd extends d {
}
_d.IntegrationsSinglePage = gd;
class os extends o {
  constructor() {
    super(...arguments), this.integrations = new _d(this._client);
  }
  /**
   * Creates a new device posture rule.
   *
   * @example
   * ```ts
   * const devicePostureRule =
   *   await client.zeroTrust.devices.posture.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     name: 'Admin Serial Numbers',
   *     type: 'file',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/devices/posture`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a device posture rule.
   *
   * @example
   * ```ts
   * const devicePostureRule =
   *   await client.zeroTrust.devices.posture.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       name: 'Admin Serial Numbers',
   *       type: 'file',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/devices/posture/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches device posture rules for a Zero Trust account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const devicePostureRule of client.zeroTrust.devices.posture.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices/posture`, pd, e);
  }
  /**
   * Deletes a device posture rule.
   *
   * @example
   * ```ts
   * const posture =
   *   await client.zeroTrust.devices.posture.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/devices/posture/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single device posture rule.
   *
   * @example
   * ```ts
   * const devicePostureRule =
   *   await client.zeroTrust.devices.posture.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/posture/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class pd extends d {
}
os.DevicePostureRulesSinglePage = pd;
os.Integrations = _d;
os.IntegrationsSinglePage = gd;
class Km extends o {
  /**
   * Sets the Global WARP override state.
   *
   * @example
   * ```ts
   * const globalWARPOverride =
   *   await client.zeroTrust.devices.resilience.globalWARPOverride.create(
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       disconnect: false,
   *     },
   *   );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/devices/resilience/disconnect`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetch the Global WARP override state.
   *
   * @example
   * ```ts
   * const globalWARPOverride =
   *   await client.zeroTrust.devices.resilience.globalWARPOverride.get(
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/devices/resilience/disconnect`, e)._thenUnwrap((n) => n.result);
  }
}
class wd extends o {
  constructor() {
    super(...arguments), this.globalWARPOverride = new Km(this._client);
  }
}
wd.GlobalWARPOverride = Km;
let P = class extends o {
  constructor() {
    super(...arguments), this.devices = new id(this._client), this.resilience = new wd(this._client), this.registrations = new dd(this._client), this.dexTests = new cd(this._client), this.networks = new ad(this._client), this.fleetStatus = new Dm(this._client), this.policies = new Hn(this._client), this.posture = new os(this._client), this.revoke = new Em(this._client), this.settings = new Mm(this._client), this.unrevoke = new Nm(this._client), this.overrideCodes = new ud(this._client);
  }
  /**
   * List WARP devices. Not supported when
   * [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/)
   * is enabled for the account.
   *
   * **Deprecated**: please use one of the following endpoints instead:
   *
   * - GET /accounts/{account_id}/devices/physical-devices
   * - GET /accounts/{account_id}/devices/registrations
   *
   * @deprecated
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/devices`, $d, e);
  }
  /**
   * Fetches a single WARP device. Not supported when
   * [multi-user mode](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/windows-multiuser/)
   * is enabled for the account.
   *
   * **Deprecated**: please use one of the following endpoints instead:
   *
   * - GET /accounts/{account_id}/devices/physical-devices/{device_id}
   * - GET /accounts/{account_id}/devices/registrations/{registration_id}
   *
   * @deprecated
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/devices/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class $d extends d {
}
P.DevicesSinglePage = $d;
P.Devices = id;
P.DeviceListResponsesCursorPagination = rd;
P.Resilience = wd;
P.Registrations = dd;
P.RegistrationListResponsesCursorPagination = hd;
P.DEXTests = cd;
P.DEXTestListResponsesSinglePage = od;
P.Networks = ad;
P.DeviceNetworksSinglePage = xs;
P.FleetStatus = Dm;
P.Policies = Hn;
P.Posture = os;
P.DevicePostureRulesSinglePage = pd;
P.Revoke = Em;
P.Settings = Mm;
P.Unrevoke = Nm;
P.OverrideCodes = ud;
P.OverrideCodeListResponsesSinglePage = ld;
class md extends o {
  /**
   * List Cloudflare colos that account's devices were connected to during a time
   * period, sorted by usage starting from the most used colo. Colos without traffic
   * are also returned and sorted alphabetically.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const coloListResponse of client.zeroTrust.dex.colos.list(
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     from: '2023-08-20T20:45:00Z',
   *     to: '2023-08-24T20:45:00Z',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dex/colos`, yd, {
      query: n,
      ...e
    });
  }
}
class yd extends d {
}
md.ColoListResponsesSinglePage = yd;
class Xm extends o {
  /**
   * Get test details and aggregate performance metrics for an traceroute test for a
   * given time period between 1 hour and 7 days.
   *
   * @example
   * ```ts
   * const traceroute =
   *   await client.zeroTrust.dex.tracerouteTests.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       from: '1689520412000',
   *       interval: 'minute',
   *       to: '1689606812000',
   *     },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dex/traceroute-tests/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a breakdown of metrics by hop for individual traceroute test runs
   *
   * @example
   * ```ts
   * const networkPathResponse =
   *   await client.zeroTrust.dex.tracerouteTests.networkPath(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       deviceId: 'deviceId',
   *       from: '1689520412000',
   *       interval: 'minute',
   *       to: '1689606812000',
   *     },
   *   );
   * ```
   */
  networkPath(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dex/traceroute-tests/${t}/network-path`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get percentiles for a traceroute test for a given time period between 1 hour and
   * 7 days.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.dex.tracerouteTests.percentiles(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       from: '2023-09-20T17:00:00Z',
   *       to: '2023-09-20T17:00:00Z',
   *     },
   *   );
   * ```
   */
  percentiles(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dex/traceroute-tests/${t}/percentiles`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Qm extends o {
  /**
   * List WARP configuration and enablement toggle change events by device.
   *
   * @example
   * ```ts
   * const warpChangeEvents =
   *   await client.zeroTrust.dex.warpChangeEvents.get({
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     from: '2023-09-20T17:00:00Z',
   *     page: 1,
   *     per_page: 1,
   *     to: '2023-09-20T17:00:00Z',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/dex/warp-change-events`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
let fd = class extends o {
  /**
   * List devices with WARP client support for remote captures which have been
   * connected in the last 1 hour.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deviceListResponse of client.zeroTrust.dex.commands.devices.list(
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     page: 1,
   *     per_page: 1,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dex/commands/devices`, Pd, { query: n, ...e });
  }
};
class Pd extends F {
}
fd.DeviceListResponsesV4PagePagination = Pd;
class Jm extends o {
  /**
   * Downloads artifacts for an executed command. Bulk downloads are not supported
   *
   * @example
   * ```ts
   * const download =
   *   await client.zeroTrust.dex.commands.downloads.get(
   *     '5758fefe-ae7e-4538-a39b-1fef6abcb909',
   *     'filename',
   *     { account_id: '01a7362d577a6c3019a474fd6f485823' },
   *   );
   *
   * const content = await download.blob();
   * console.log(content);
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/dex/commands/${t}/downloads/${e}`, {
      ...n,
      headers: { Accept: "application/zip", ...n?.headers },
      __binaryResponse: !0
    });
  }
}
class qm extends o {
  /**
   * Retrieves the current quota usage and limits for device commands within a
   * specific account, including the time when the quota will reset
   *
   * @example
   * ```ts
   * const quota = await client.zeroTrust.dex.commands.quota.get(
   *   { account_id: '01a7362d577a6c3019a474fd6f485823' },
   * );
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/dex/commands/quota`, e)._thenUnwrap((n) => n.result);
  }
}
class Yt extends o {
  constructor() {
    super(...arguments), this.devices = new fd(this._client), this.downloads = new Jm(this._client), this.quota = new qm(this._client);
  }
  /**
   * Initiate commands for up to 10 devices per account
   *
   * @example
   * ```ts
   * const command = await client.zeroTrust.dex.commands.create({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   *   commands: [
   *     {
   *       command_type: 'pcap',
   *       device_id: 'device_id',
   *       user_email: 'user_email',
   *     },
   *   ],
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dex/commands`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieves a paginated list of commands issued to devices under the specified
   * account, optionally filtered by time range, device, or other parameters
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const commandListResponse of client.zeroTrust.dex.commands.list(
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     page: 1,
   *     per_page: 50,
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dex/commands`, bd, { query: n, ...e });
  }
}
class bd extends F {
}
Yt.CommandListResponsesV4PagePagination = bd;
Yt.Devices = fd;
Yt.DeviceListResponsesV4PagePagination = Pd;
Yt.Downloads = Jm;
Yt.Quota = qm;
class Ud extends o {
  /**
   * List details for devices using WARP
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const deviceListResponse of client.zeroTrust.dex.fleetStatus.devices.list(
   *   {
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     from: '2023-10-11T00:00:00Z',
   *     page: 1,
   *     per_page: 10,
   *     to: '2023-10-11T00:00:00Z',
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dex/fleet-status/devices`, xd, { query: n, ...e });
  }
}
class xd extends p {
}
Ud.DeviceListResponsesV4PagePaginationArray = xd;
class Wn extends o {
  constructor() {
    super(...arguments), this.devices = new Ud(this._client);
  }
  /**
   * List details for live (up to 60 minutes) devices using WARP
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.dex.fleetStatus.live({
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *     since_minutes: 10,
   *   });
   * ```
   */
  live(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/dex/fleet-status/live`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * List details for devices using WARP, up to 7 days
   *
   * @example
   * ```ts
   * await client.zeroTrust.dex.fleetStatus.overTime({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   *   from: '2023-10-11T00:00:00Z',
   *   to: '2023-10-11T00:00:00Z',
   * });
   * ```
   */
  overTime(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/dex/fleet-status/over-time`, {
      query: n,
      ...e,
      headers: { Accept: "*/*", ...e?.headers }
    });
  }
}
Wn.Devices = Ud;
Wn.DeviceListResponsesV4PagePaginationArray = xd;
class ty extends o {
  /**
   * Get percentiles for an http test for a given time period between 1 hour and 7
   * days.
   *
   * @example
   * ```ts
   * const httpDetailsPercentiles =
   *   await client.zeroTrust.dex.httpTests.percentiles.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       from: '2023-09-20T17:00:00Z',
   *       to: '2023-09-20T17:00:00Z',
   *     },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dex/http-tests/${t}/percentiles`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Sd extends o {
  constructor() {
    super(...arguments), this.percentiles = new ty(this._client);
  }
  /**
   * Get test details and aggregate performance metrics for an http test for a given
   * time period between 1 hour and 7 days.
   *
   * @example
   * ```ts
   * const httpDetails =
   *   await client.zeroTrust.dex.httpTests.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '01a7362d577a6c3019a474fd6f485823',
   *       from: '1689520412000',
   *       interval: 'minute',
   *       to: '1689606812000',
   *     },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/dex/http-tests/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
Sd.Percentiles = ty;
class zf extends o {
  /**
   * Returns unique count of devices that have run synthetic application monitoring
   * tests in the past 7 days.
   *
   * @example
   * ```ts
   * const uniqueDevices =
   *   await client.zeroTrust.dex.tests.uniqueDevices.list({
   *     account_id: '01a7362d577a6c3019a474fd6f485823',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.get(`/accounts/${s}/dex/tests/unique-devices`, {
      query: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class ey extends o {
  constructor() {
    super(...arguments), this.uniqueDevices = new zf(this._client);
  }
  /**
   * List DEX tests with overview metrics
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tests of client.zeroTrust.dex.tests.list({
   *   account_id: '01a7362d577a6c3019a474fd6f485823',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dex/tests/overview`, zd, {
      query: n,
      ...e
    });
  }
}
class zd extends F {
}
ey.TestsV4PagePagination = zd;
class sy extends o {
  /**
   * Get a breakdown of hops and performance metrics for a specific traceroute test
   * run
   *
   * @example
   * ```ts
   * const networkPath =
   *   await client.zeroTrust.dex.tracerouteTestResults.networkPath.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '01a7362d577a6c3019a474fd6f485823' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dex/traceroute-test-results/${t}/network-path`, s)._thenUnwrap((i) => i.result);
  }
}
class Rd extends o {
  constructor() {
    super(...arguments), this.networkPath = new sy(this._client);
  }
}
Rd.NetworkPath = sy;
class Y extends o {
  constructor() {
    super(...arguments), this.warpChangeEvents = new Qm(this._client), this.commands = new Yt(this._client), this.colos = new md(this._client), this.fleetStatus = new Wn(this._client), this.httpTests = new Sd(this._client), this.tests = new ey(this._client), this.tracerouteTestResults = new Rd(this._client), this.tracerouteTests = new Xm(this._client);
  }
}
Y.WARPChangeEvents = Qm;
Y.Commands = Yt;
Y.CommandListResponsesV4PagePagination = bd;
Y.Colos = md;
Y.ColoListResponsesSinglePage = yd;
Y.FleetStatus = Wn;
Y.HTTPTests = Sd;
Y.TestsV4PagePagination = zd;
Y.TracerouteTestResults = Rd;
Y.TracerouteTests = Xm;
class ny extends o {
  /**
   * Fetch limits associated with DLP for account
   *
   * @example
   * ```ts
   * const limits = await client.zeroTrust.dlp.limits.list({
   *   account_id: 'account_id',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/dlp/limits`, e)._thenUnwrap((n) => n.result);
  }
}
class iy extends o {
  /**
   * Validates whether this pattern is a valid regular expression. Rejects it if the
   * regular expression is too complex or can match an unbounded-length string. The
   * regex will be rejected if it uses `*` or `+`. Bound the maximum number of
   * characters that can be matched using a range, e.g. `{1,100}`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.dlp.patterns.validate({
   *     account_id: 'account_id',
   *     regex: 'regex',
   *   });
   * ```
   */
  validate(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/patterns/validate`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
}
class ry extends o {
  /**
   * Set payload log settings
   *
   * @example
   * ```ts
   * const payloadLog =
   *   await client.zeroTrust.dlp.payloadLogs.update({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/dlp/payload_log`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get payload log settings
   *
   * @example
   * ```ts
   * const payloadLog =
   *   await client.zeroTrust.dlp.payloadLogs.get({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/dlp/payload_log`, e)._thenUnwrap((n) => n.result);
  }
}
class cy extends o {
  /**
   * Prepare to upload a new version of a dataset
   *
   * @example
   * ```ts
   * const newVersion =
   *   await client.zeroTrust.dlp.datasets.upload.create(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/dlp/datasets/${t}/upload`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * This is used for single-column EDMv1 and Custom Word Lists. The EDM format can
   * only be created in the Cloudflare dashboard. For other clients, this operation
   * can only be used for non-secret Custom Word Lists. The body must be a UTF-8
   * encoded, newline (NL or CRNL) separated list of words to be matched.
   *
   * @example
   * ```ts
   * const dataset =
   *   await client.zeroTrust.dlp.datasets.upload.edit(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     0,
   *     {
   *       account_id: 'account_id',
   *       body: fs.createReadStream('path/to/file'),
   *     },
   *   );
   * ```
   */
  edit(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.post(`/accounts/${i}/dlp/datasets/${t}/upload/${e}`, {
      body: c,
      ...n,
      headers: { "Content-Type": "application/octet-stream", ...n?.headers },
      __binaryRequest: !0
    })._thenUnwrap((a) => a.result);
  }
}
let oy = class extends o {
  /**
   * This is used for multi-column EDMv2 datasets. The EDMv2 format can only be
   * created in the Cloudflare dashboard.
   *
   * @example
   * ```ts
   * const entry =
   *   await client.zeroTrust.dlp.datasets.versions.entries.create(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     0,
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       account_id: 'account_id',
   *       body: fs.createReadStream('path/to/file'),
   *     },
   *   );
   * ```
   */
  create(t, e, s, n, i) {
    const { account_id: c, body: a } = n;
    return this._client.post(`/accounts/${c}/dlp/datasets/${t}/versions/${e}/entries/${s}`, {
      body: a,
      ...i,
      headers: { "Content-Type": "application/octet-stream", ...i?.headers },
      __binaryRequest: !0
    })._thenUnwrap((l) => l.result);
  }
};
class Kn extends o {
  constructor() {
    super(...arguments), this.entries = new oy(this._client);
  }
  /**
   * This is used for multi-column EDMv2 datasets. The EDMv2 format can only be
   * created in the Cloudflare dashboard. The columns in the response appear in the
   * same order as in the request.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const versionCreateResponse of client.zeroTrust.dlp.datasets.versions.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   0,
   *   {
   *     account_id: 'account_id',
   *     body: [
   *       { entry_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *   },
   * )) {
   *   // ...
   * }
   * ```
   */
  create(t, e, s, n) {
    const { account_id: i, body: c } = s;
    return this._client.getAPIList(`/accounts/${i}/dlp/datasets/${t}/versions/${e}`, Ad, { body: c, method: "post", ...n });
  }
}
class Ad extends d {
}
Kn.VersionCreateResponsesSinglePage = Ad;
Kn.Entries = oy;
class we extends o {
  constructor() {
    super(...arguments), this.upload = new cy(this._client), this.versions = new Kn(this._client);
  }
  /**
   * Create a new dataset
   *
   * @example
   * ```ts
   * const datasetCreation =
   *   await client.zeroTrust.dlp.datasets.create({
   *     account_id: 'account_id',
   *     name: 'name',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/datasets`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update details about a dataset
   *
   * @example
   * ```ts
   * const dataset = await client.zeroTrust.dlp.datasets.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/datasets/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch all datasets
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const dataset of client.zeroTrust.dlp.datasets.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/dlp/datasets`, vd, e);
  }
  /**
   * This deletes all versions of the dataset.
   *
   * @example
   * ```ts
   * await client.zeroTrust.dlp.datasets.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/datasets/${t}`, {
      ...s,
      headers: { Accept: "*/*", ...s?.headers }
    });
  }
  /**
   * Fetch a specific dataset
   *
   * @example
   * ```ts
   * const dataset = await client.zeroTrust.dlp.datasets.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dlp/datasets/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class vd extends d {
}
we.DatasetsSinglePage = vd;
we.Upload = cy;
we.Versions = Kn;
we.VersionCreateResponsesSinglePage = Ad;
class ay extends o {
  /**
   * Create mapping
   *
   * @example
   * ```ts
   * const accountMapping =
   *   await client.zeroTrust.dlp.email.accountMapping.create({
   *     account_id: 'account_id',
   *     auth_requirements: {
   *       allowed_microsoft_organizations: ['string'],
   *       type: 'Org',
   *     },
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/email/account_mapping`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get mapping
   *
   * @example
   * ```ts
   * const accountMapping =
   *   await client.zeroTrust.dlp.email.accountMapping.get({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/dlp/email/account_mapping`, e)._thenUnwrap((n) => n.result);
  }
}
let Ld = class extends o {
  /**
   * Create email scanner rule
   *
   * @example
   * ```ts
   * const rule = await client.zeroTrust.dlp.email.rules.create({
   *   account_id: 'account_id',
   *   action: { action: 'Block' },
   *   conditions: [
   *     {
   *       operator: 'InList',
   *       selector: 'Recipients',
   *       value: ['string'],
   *     },
   *   ],
   *   enabled: true,
   *   name: 'name',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/email/rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Update email scanner rule
   *
   * @example
   * ```ts
   * const rule = await client.zeroTrust.dlp.email.rules.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     account_id: 'account_id',
   *     action: { action: 'Block' },
   *     conditions: [
   *       {
   *         operator: 'InList',
   *         selector: 'Recipients',
   *         value: ['string'],
   *       },
   *     ],
   *     enabled: true,
   *     name: 'name',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/email/rules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all email scanner rules for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ruleListResponse of client.zeroTrust.dlp.email.rules.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/dlp/email/rules`, Id, e);
  }
  /**
   * Delete email scanner rule
   *
   * @example
   * ```ts
   * const rule = await client.zeroTrust.dlp.email.rules.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/email/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Update email scanner rule priorities
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.dlp.email.rules.bulkEdit({
   *     account_id: 'account_id',
   *     new_priorities: { foo: 0 },
   *   });
   * ```
   */
  bulkEdit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/dlp/email/rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Get an email scanner rule
   *
   * @example
   * ```ts
   * const rule = await client.zeroTrust.dlp.email.rules.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dlp/email/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class Id extends d {
}
Ld.RuleListResponsesSinglePage = Id;
class as extends o {
  constructor() {
    super(...arguments), this.accountMapping = new ay(this._client), this.rules = new Ld(this._client);
  }
}
as.AccountMapping = ay;
as.Rules = Ld;
as.RuleListResponsesSinglePage = Id;
let uy = class extends o {
  /**
   * Creates a DLP custom entry.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.zeroTrust.dlp.entries.custom.create({
   *     account_id: 'account_id',
   *     enabled: true,
   *     name: 'name',
   *     pattern: { regex: 'regex' },
   *     profile_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/entries`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP entry.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.zeroTrust.dlp.entries.custom.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       account_id: 'account_id',
   *       name: 'name',
   *       pattern: { regex: 'regex' },
   *       type: 'custom',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/entries/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a DLP custom entry.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.zeroTrust.dlp.entries.custom.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/entries/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class ly extends o {
  /**
   * This will update an existing integration entry
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.dlp.entries.integration.create({
   *     account_id: 'account_id',
   *     enabled: true,
   *     entry_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/entries/integration`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP entry.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.dlp.entries.integration.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id', enabled: true },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/entries/integration/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * This is a no-op as integration entires can't be deleted but is needed for our
   * generated terraform API
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.dlp.entries.integration.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/entries/integration/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
let dy = class extends o {
  /**
   * This will update an existing predefined entry
   *
   * @example
   * ```ts
   * const predefined =
   *   await client.zeroTrust.dlp.entries.predefined.create({
   *     account_id: 'account_id',
   *     enabled: true,
   *     entry_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/entries/predefined`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP entry.
   *
   * @example
   * ```ts
   * const predefined =
   *   await client.zeroTrust.dlp.entries.predefined.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id', enabled: true },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/entries/predefined/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * This is a no-op as predefined entires can't be deleted but is needed for our
   * generated terraform API
   *
   * @example
   * ```ts
   * const predefined =
   *   await client.zeroTrust.dlp.entries.predefined.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/entries/predefined/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class $e extends o {
  constructor() {
    super(...arguments), this.custom = new uy(this._client), this.predefined = new dy(this._client), this.integration = new ly(this._client);
  }
  /**
   * Creates a DLP custom entry.
   *
   * @example
   * ```ts
   * const entry = await client.zeroTrust.dlp.entries.create({
   *   account_id: 'account_id',
   *   enabled: true,
   *   name: 'name',
   *   pattern: { regex: 'regex' },
   *   profile_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/entries`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP entry.
   *
   * @example
   * ```ts
   * const entry = await client.zeroTrust.dlp.entries.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     account_id: 'account_id',
   *     name: 'name',
   *     pattern: { regex: 'regex' },
   *     type: 'custom',
   *   },
   * );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/entries/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Lists all DLP entries in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const entryListResponse of client.zeroTrust.dlp.entries.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/dlp/entries`, kd, e);
  }
  /**
   * Deletes a DLP custom entry.
   *
   * @example
   * ```ts
   * const entry = await client.zeroTrust.dlp.entries.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/entries/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a DLP entry by ID.
   *
   * @example
   * ```ts
   * const entry = await client.zeroTrust.dlp.entries.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dlp/entries/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class kd extends d {
}
$e.EntryListResponsesSinglePage = kd;
$e.Custom = uy;
$e.Predefined = dy;
$e.Integration = ly;
class hy extends o {
  /**
   * Creates a DLP custom profile.
   *
   * @example
   * ```ts
   * const profile =
   *   await client.zeroTrust.dlp.profiles.custom.create({
   *     account_id: 'account_id',
   *     entries: [
   *       {
   *         enabled: true,
   *         name: 'name',
   *         pattern: { regex: 'regex' },
   *       },
   *     ],
   *     name: 'name',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/profiles/custom`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP custom profile.
   *
   * @example
   * ```ts
   * const profile =
   *   await client.zeroTrust.dlp.profiles.custom.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id', name: 'name' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/profiles/custom/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a DLP custom profile.
   *
   * @example
   * ```ts
   * const custom =
   *   await client.zeroTrust.dlp.profiles.custom.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/profiles/custom/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a custom DLP profile by id.
   *
   * @example
   * ```ts
   * const profile =
   *   await client.zeroTrust.dlp.profiles.custom.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dlp/profiles/custom/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class _y extends o {
  /**
   * Creates a DLP predefined profile. Only supports enabling/disabling entries.
   *
   * @example
   * ```ts
   * const profile =
   *   await client.zeroTrust.dlp.profiles.predefined.create({
   *     account_id: 'account_id',
   *     profile_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/dlp/profiles/predefined`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a DLP predefined profile. Only supports enabling/disabling entries.
   *
   * @example
   * ```ts
   * const profile =
   *   await client.zeroTrust.dlp.profiles.predefined.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/dlp/profiles/predefined/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * This is a no-op as predefined profiles can't be deleted but is needed for our
   * generated terraform API
   *
   * @example
   * ```ts
   * const predefined =
   *   await client.zeroTrust.dlp.profiles.predefined.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/dlp/profiles/predefined/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a predefined DLP profile by id.
   *
   * @example
   * ```ts
   * const profile =
   *   await client.zeroTrust.dlp.profiles.predefined.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dlp/profiles/predefined/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class us extends o {
  constructor() {
    super(...arguments), this.custom = new hy(this._client), this.predefined = new _y(this._client);
  }
  /**
   * Lists all DLP profiles in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const profile of client.zeroTrust.dlp.profiles.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/dlp/profiles`, Od, {
      query: n,
      ...e
    });
  }
  /**
   * Fetches a DLP profile by ID.
   *
   * @example
   * ```ts
   * const profile = await client.zeroTrust.dlp.profiles.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/dlp/profiles/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Od extends d {
}
us.ProfilesSinglePage = Od;
us.Custom = hy;
us.Predefined = _y;
class j extends o {
  constructor() {
    super(...arguments), this.datasets = new we(this._client), this.patterns = new iy(this._client), this.payloadLogs = new ry(this._client), this.email = new as(this._client), this.profiles = new us(this._client), this.limits = new ny(this._client), this.entries = new $e(this._client);
  }
}
j.Datasets = we;
j.DatasetsSinglePage = vd;
j.Patterns = iy;
j.PayloadLogs = ry;
j.Email = as;
j.Profiles = us;
j.ProfilesSinglePage = Od;
j.Limits = ny;
j.Entries = $e;
j.EntryListResponsesSinglePage = kd;
class Cd extends o {
  /**
   * Fetches all application and application type mappings.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const appType of client.zeroTrust.gateway.appTypes.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/gateway/app_types`, Zd, e);
  }
}
class Zd extends d {
}
Cd.AppTypesSinglePage = Zd;
class gy extends o {
  /**
   * Updates Zero Trust Audit SSH and SSH with Access for Infrastructure settings for
   * an account.
   *
   * @example
   * ```ts
   * const gatewaySettings =
   *   await client.zeroTrust.gateway.auditSSHSettings.update({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     public_key:
   *       '1pyl6I1tL7xfJuFYVzXlUW8uXXlpxegHXBzGCBKaSFA=',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/gateway/audit_ssh_settings`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Gets all Zero Trust Audit SSH and SSH with Access for Infrastructure settings
   * for an account.
   *
   * @example
   * ```ts
   * const gatewaySettings =
   *   await client.zeroTrust.gateway.auditSSHSettings.get({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/gateway/audit_ssh_settings`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Rotates the SSH account seed that is used for generating the host key identity
   * when connecting through the Cloudflare SSH Proxy.
   *
   * @example
   * ```ts
   * const gatewaySettings =
   *   await client.zeroTrust.gateway.auditSSHSettings.rotateSeed(
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  rotateSeed(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/gateway/audit_ssh_settings/rotate_seed`, e)._thenUnwrap((n) => n.result);
  }
}
class Td extends o {
  /**
   * Fetches a list of all categories.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const category of client.zeroTrust.gateway.categories.list(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/gateway/categories`, Vd, e);
  }
}
class Vd extends d {
}
Td.CategoriesSinglePage = Vd;
class Dd extends o {
  /**
   * Creates a new Zero Trust certificate.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.zeroTrust.gateway.certificates.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/gateway/certificates`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches all Zero Trust certificates for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const certificateListResponse of client.zeroTrust.gateway.certificates.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/gateway/certificates`, Ed, e);
  }
  /**
   * Deletes a gateway-managed Zero Trust certificate. A certificate must be
   * deactivated from the edge (inactive) before it is deleted.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.zeroTrust.gateway.certificates.delete(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/gateway/certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Binds a single Zero Trust certificate to the edge.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.gateway.certificates.activate(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       body: {},
   *     },
   *   );
   * ```
   */
  activate(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/gateway/certificates/${t}/activate`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Unbinds a single Zero Trust certificate from the edge
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.gateway.certificates.deactivate(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       body: {},
   *     },
   *   );
   * ```
   */
  deactivate(t, e, s) {
    const { account_id: n, body: i } = e;
    return this._client.post(`/accounts/${n}/gateway/certificates/${t}/deactivate`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust certificate.
   *
   * @example
   * ```ts
   * const certificate =
   *   await client.zeroTrust.gateway.certificates.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/gateway/certificates/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Ed extends d {
}
Dd.CertificateListResponsesSinglePage = Ed;
class Md extends o {
  /**
   * Creates a new Zero Trust Gateway location.
   *
   * @example
   * ```ts
   * const location =
   *   await client.zeroTrust.gateway.locations.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     name: 'Austin Office Location',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/gateway/locations`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway location.
   *
   * @example
   * ```ts
   * const location =
   *   await client.zeroTrust.gateway.locations.update(
   *     'ed35569b41ce4d1facfe683550f54086',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       name: 'Austin Office Location',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/gateway/locations/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches Zero Trust Gateway locations for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const location of client.zeroTrust.gateway.locations.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/gateway/locations`, Nd, e);
  }
  /**
   * Deletes a configured Zero Trust Gateway location.
   *
   * @example
   * ```ts
   * const location =
   *   await client.zeroTrust.gateway.locations.delete(
   *     'ed35569b41ce4d1facfe683550f54086',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/gateway/locations/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust Gateway location.
   *
   * @example
   * ```ts
   * const location =
   *   await client.zeroTrust.gateway.locations.get(
   *     'ed35569b41ce4d1facfe683550f54086',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/gateway/locations/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Nd extends d {
}
Md.LocationsSinglePage = Nd;
class py extends o {
  /**
   * Updates logging settings for the current Zero Trust account.
   *
   * @example
   * ```ts
   * const loggingSetting =
   *   await client.zeroTrust.gateway.logging.update({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/gateway/logging`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current logging settings for Zero Trust account.
   *
   * @example
   * ```ts
   * const loggingSetting =
   *   await client.zeroTrust.gateway.logging.get({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/gateway/logging`, e)._thenUnwrap((n) => n.result);
  }
}
class Yd extends o {
  /**
   * Creates a new Zero Trust Gateway proxy endpoint.
   *
   * @example
   * ```ts
   * const proxyEndpoint =
   *   await client.zeroTrust.gateway.proxyEndpoints.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     ips: ['192.0.2.1/32'],
   *     name: 'Devops team',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/gateway/proxy_endpoints`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches all Zero Trust Gateway proxy endpoints for an account.
   *
   * @example
   * ```ts
   * const proxyEndpoint =
   *   await client.zeroTrust.gateway.proxyEndpoints.list({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/gateway/proxy_endpoints`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Deletes a configured Zero Trust Gateway proxy endpoint.
   *
   * @example
   * ```ts
   * const proxyEndpoint =
   *   await client.zeroTrust.gateway.proxyEndpoints.delete(
   *     'ed35569b41ce4d1facfe683550f54086',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/gateway/proxy_endpoints/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway proxy endpoint.
   *
   * @example
   * ```ts
   * const proxyEndpoint =
   *   await client.zeroTrust.gateway.proxyEndpoints.edit(
   *     'ed35569b41ce4d1facfe683550f54086',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/gateway/proxy_endpoints/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust Gateway proxy endpoint.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const proxyEndpoint of client.zeroTrust.gateway.proxyEndpoints.get(
   *   'ed35569b41ce4d1facfe683550f54086',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/gateway/proxy_endpoints/${t}`, jd, s);
  }
}
class jd extends d {
}
Yd.ProxyEndpointsSinglePage = jd;
class Fd extends o {
  /**
   * Creates a new Zero Trust Gateway rule.
   *
   * @example
   * ```ts
   * const gatewayRule =
   *   await client.zeroTrust.gateway.rules.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     action: 'allow',
   *     name: 'block bad websites',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/gateway/rules`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust Gateway rule.
   *
   * @example
   * ```ts
   * const gatewayRule =
   *   await client.zeroTrust.gateway.rules.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       action: 'allow',
   *       name: 'block bad websites',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/gateway/rules/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches the Zero Trust Gateway rules for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const gatewayRule of client.zeroTrust.gateway.rules.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/gateway/rules`, Gd, e);
  }
  /**
   * Deletes a Zero Trust Gateway rule.
   *
   * @example
   * ```ts
   * const rule = await client.zeroTrust.gateway.rules.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/gateway/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches a single Zero Trust Gateway rule.
   *
   * @example
   * ```ts
   * const gatewayRule =
   *   await client.zeroTrust.gateway.rules.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/gateway/rules/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Resets the expiration of a Zero Trust Gateway Rule if its duration has elapsed
   * and it has a default duration.
   *
   * The Zero Trust Gateway Rule must have values for both `expiration.expires_at`
   * and `expiration.duration`.
   *
   * @example
   * ```ts
   * const gatewayRule =
   *   await client.zeroTrust.gateway.rules.resetExpiration(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  resetExpiration(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/gateway/rules/${t}/reset_expiration`, s)._thenUnwrap((i) => i.result);
  }
}
class Gd extends d {
}
Fd.GatewayRulesSinglePage = Gd;
class wy extends o {
  /**
   * Fetches the current Zero Trust certificate configuration.
   *
   * @deprecated
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/gateway/configuration/custom_certificate`, e);
  }
}
let Bd = class extends o {
  constructor() {
    super(...arguments), this.customCertificate = new wy(this._client);
  }
  /**
   * Updates the current Zero Trust account configuration.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.zeroTrust.gateway.configurations.update({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/gateway/configuration`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Patches the current Zero Trust account configuration. This endpoint can update a
   * single subcollection of settings such as `antivirus`, `tls_decrypt`,
   * `activity_log`, `block_page`, `browser_isolation`, `fips`, `body_scanning`, or
   * `certificate`, without updating the entire configuration object. Returns an
   * error if any collection of settings is not properly configured.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.gateway.configurations.edit({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  edit(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.patch(`/accounts/${s}/gateway/configuration`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Fetches the current Zero Trust account configuration.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.zeroTrust.gateway.configurations.get({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/gateway/configuration`, e)._thenUnwrap((n) => n.result);
  }
};
Bd.CustomCertificate = wy;
class Hd extends o {
  /**
   * Fetches all items in a single Zero Trust list.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const itemListResponse of client.zeroTrust.gateway.lists.items.list(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/gateway/lists/${t}/items`, Wd, s);
  }
}
class Wd extends d {
}
Hd.ItemListResponsesSinglePage = Wd;
class ls extends o {
  constructor() {
    super(...arguments), this.items = new Hd(this._client);
  }
  /**
   * Creates a new Zero Trust list.
   *
   * @example
   * ```ts
   * const list = await client.zeroTrust.gateway.lists.create({
   *   account_id: '699d98642c564d2e855e9661899b7252',
   *   name: 'Admin Serial Numbers',
   *   type: 'SERIAL',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/gateway/lists`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates a configured Zero Trust list. Skips updating list items if not included
   * in the payload.
   *
   * @example
   * ```ts
   * const gatewayList =
   *   await client.zeroTrust.gateway.lists.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       name: 'Admin Serial Numbers',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/gateway/lists/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches all Zero Trust lists for an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const gatewayList of client.zeroTrust.gateway.lists.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/gateway/lists`, Kd, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes a Zero Trust list.
   *
   * @example
   * ```ts
   * const list = await client.zeroTrust.gateway.lists.delete(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/gateway/lists/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Appends or removes an item from a configured Zero Trust list.
   *
   * @example
   * ```ts
   * const gatewayList =
   *   await client.zeroTrust.gateway.lists.edit(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/gateway/lists/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Zero Trust list.
   *
   * @example
   * ```ts
   * const gatewayList =
   *   await client.zeroTrust.gateway.lists.get(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/gateway/lists/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Kd extends d {
}
ls.GatewayListsSinglePage = Kd;
ls.Items = Hd;
ls.ItemListResponsesSinglePage = Wd;
class x extends o {
  constructor() {
    super(...arguments), this.auditSSHSettings = new gy(this._client), this.categories = new Td(this._client), this.appTypes = new Cd(this._client), this.configurations = new Bd(this._client), this.lists = new ls(this._client), this.locations = new Md(this._client), this.logging = new py(this._client), this.proxyEndpoints = new Yd(this._client), this.rules = new Fd(this._client), this.certificates = new Dd(this._client);
  }
  /**
   * Creates a Zero Trust account with an existing Cloudflare account.
   *
   * @example
   * ```ts
   * const gateway = await client.zeroTrust.gateway.create({
   *   account_id: '699d98642c564d2e855e9661899b7252',
   * });
   * ```
   */
  create(t, e) {
    const { account_id: s } = t;
    return this._client.post(`/accounts/${s}/gateway`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Gets information about the current Zero Trust account.
   *
   * @example
   * ```ts
   * const gateways = await client.zeroTrust.gateway.list({
   *   account_id: '699d98642c564d2e855e9661899b7252',
   * });
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/gateway`, e)._thenUnwrap((n) => n.result);
  }
}
x.AuditSSHSettings = gy;
x.Categories = Td;
x.CategoriesSinglePage = Vd;
x.AppTypes = Cd;
x.AppTypesSinglePage = Zd;
x.Configurations = Bd;
x.Lists = ls;
x.GatewayListsSinglePage = Kd;
x.Locations = Md;
x.LocationsSinglePage = Nd;
x.Logging = py;
x.ProxyEndpoints = Yd;
x.ProxyEndpointsSinglePage = jd;
x.Rules = Fd;
x.GatewayRulesSinglePage = Gd;
x.Certificates = Dd;
x.CertificateListResponsesSinglePage = Ed;
class $y extends o {
  /**
   * Lists SCIM Group resources synced to Cloudflare via the System for Cross-domain
   * Identity Management (SCIM).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const zeroTrustGroup of client.zeroTrust.identityProviders.scim.groups.list(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/access/identity_providers/${t}/scim/groups`, xf, { query: i, ...s });
  }
}
class my extends o {
  /**
   * Lists SCIM User resources synced to Cloudflare via the System for Cross-domain
   * Identity Management (SCIM).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const accessUser of client.zeroTrust.identityProviders.scim.users.list(
   *   'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.getAPIList(`/accounts/${n}/access/identity_providers/${t}/scim/users`, Sf, { query: i, ...s });
  }
}
class Xn extends o {
  constructor() {
    super(...arguments), this.groups = new $y(this._client), this.users = new my(this._client);
  }
}
Xn.Groups = $y;
Xn.Users = my;
class Qn extends o {
  constructor() {
    super(...arguments), this.scim = new Xn(this._client);
  }
  /**
   * Adds a new identity provider to Access.
   *
   * @example
   * ```ts
   * const identityProvider =
   *   await client.zeroTrust.identityProviders.create({
   *     config: {},
   *     name: 'Widget Corps IDP',
   *     type: 'onetimepin',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/access/identity_providers`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates a configured identity provider.
   *
   * @example
   * ```ts
   * const identityProvider =
   *   await client.zeroTrust.identityProviders.update(
   *     'f174e90a-fafe-4643-bbbc-4a0ed4fc8415',
   *     {
   *       config: {},
   *       name: 'Widget Corps IDP',
   *       type: 'onetimepin',
   *       account_id: 'account_id',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, zone_id: i, ...c } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.put(`/${a}/${l}/access/identity_providers/${t}`, { body: c, ...s })._thenUnwrap((g) => g.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.getAPIList(`/${c}/${a}/access/identity_providers`, Xd, { query: i, ...e });
  }
  delete(t, e = {}, s) {
    if (u(e))
      return this.delete(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.delete(`/${c}/${a}/access/identity_providers/${t}`, s)._thenUnwrap((l) => l.result);
  }
  get(t, e = {}, s) {
    if (u(e))
      return this.get(t, {}, e);
    const { account_id: n, zone_id: i } = e;
    if (!n && !i)
      throw new h("You must provide either account_id or zone_id.");
    if (n && i)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = n ? {
      accountOrZone: "accounts",
      accountOrZoneId: n
    } : {
      accountOrZone: "zones",
      accountOrZoneId: i
    };
    return this._client.get(`/${c}/${a}/access/identity_providers/${t}`, s)._thenUnwrap((l) => l.result);
  }
}
class Xd extends d {
}
Qn.IdentityProviderListResponsesSinglePage = Xd;
Qn.SCIM = Xn;
class Qd extends o {
  /**
   * Adds a new virtual network to an account.
   *
   * @example
   * ```ts
   * const virtualNetwork =
   *   await client.zeroTrust.networks.virtualNetworks.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     name: 'us-east-1-vpc',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/teamnet/virtual_networks`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters virtual networks in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const virtualNetwork of client.zeroTrust.networks.virtualNetworks.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/teamnet/virtual_networks`, Jd, { query: n, ...e });
  }
  /**
   * Deletes an existing virtual network.
   *
   * @example
   * ```ts
   * const virtualNetwork =
   *   await client.zeroTrust.networks.virtualNetworks.delete(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/teamnet/virtual_networks/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing virtual network.
   *
   * @example
   * ```ts
   * const virtualNetwork =
   *   await client.zeroTrust.networks.virtualNetworks.edit(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/teamnet/virtual_networks/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a virtual network.
   *
   * @example
   * ```ts
   * const virtualNetwork =
   *   await client.zeroTrust.networks.virtualNetworks.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/teamnet/virtual_networks/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Jd extends d {
}
Qd.VirtualNetworksSinglePage = Jd;
class yy extends o {
  /**
   * Fetches routes that contain the given IP address.
   *
   * @example
   * ```ts
   * const teamnet =
   *   await client.zeroTrust.networks.routes.ips.get(
   *     '10.1.0.137',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.get(`/accounts/${n}/teamnet/routes/ip/${t}`, {
      query: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let fy = class extends o {
  /**
   * Routes a private network through a Cloudflare Tunnel. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format.
   *
   * @deprecated This endpoint and its related APIs are deprecated in favor of the equivalent Tunnel Route (without CIDR) APIs.
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/teamnet/routes/network/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Deletes a private network route from an account. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format. If no
   * virtual_network_id is provided it will delete the route from the default vnet.
   * If no tun_type is provided it will fetch the type from the tunnel_id or if that
   * is missing it will assume Cloudflare Tunnel as default. If tunnel_id is provided
   * it will delete the route from that tunnel, otherwise it will delete the route
   * based on the vnet and tun_type.
   *
   * @deprecated This endpoint and its related APIs are deprecated in favor of the equivalent Tunnel Route (without CIDR) APIs.
   */
  delete(t, e, s) {
    const { account_id: n, tun_type: i, tunnel_id: c, virtual_network_id: a } = e;
    return this._client.delete(`/accounts/${n}/teamnet/routes/network/${t}`, {
      query: { tun_type: i, tunnel_id: c, virtual_network_id: a },
      ...s
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates an existing private network route in an account. The CIDR in
   * `ip_network_encoded` must be written in URL-encoded format.
   *
   * @deprecated This endpoint and its related APIs are deprecated in favor of the equivalent Tunnel Route (without CIDR) APIs.
   */
  edit(t, e, s) {
    const { account_id: n } = e;
    return this._client.patch(`/accounts/${n}/teamnet/routes/network/${t}`, s)._thenUnwrap((i) => i.result);
  }
};
class ds extends o {
  constructor() {
    super(...arguments), this.ips = new yy(this._client), this.networks = new fy(this._client);
  }
  /**
   * Routes a private network through a Cloudflare Tunnel.
   *
   * @example
   * ```ts
   * const route = await client.zeroTrust.networks.routes.create(
   *   {
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     network: '172.16.0.0/16',
   *     tunnel_id: 'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *   },
   * );
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/teamnet/routes`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters private network routes in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const teamnet of client.zeroTrust.networks.routes.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/teamnet/routes`, qd, {
      query: n,
      ...e
    });
  }
  /**
   * Deletes a private network route from an account.
   *
   * @example
   * ```ts
   * const route = await client.zeroTrust.networks.routes.delete(
   *   'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/teamnet/routes/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing private network route in an account. The fields that are
   * meant to be updated should be provided in the body of the request.
   *
   * @example
   * ```ts
   * const route = await client.zeroTrust.networks.routes.edit(
   *   'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/teamnet/routes/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Get a private network route in an account.
   *
   * @example
   * ```ts
   * const route = await client.zeroTrust.networks.routes.get(
   *   'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/teamnet/routes/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class qd extends p {
}
ds.TeamnetsV4PagePaginationArray = qd;
ds.IPs = yy;
ds.Networks = fy;
class Py extends o {
  /**
   * Updates the Cloudflare Source subnet of the given address family
   *
   * @example
   * ```ts
   * const cloudflareSource =
   *   await client.zeroTrust.networks.subnets.cloudflareSource.update(
   *     'v4',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/zerotrust/subnets/cloudflare_source/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
class Jn extends o {
  constructor() {
    super(...arguments), this.cloudflareSource = new Py(this._client);
  }
  /**
   * Lists and filters subnets in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const subnetListResponse of client.zeroTrust.networks.subnets.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/zerotrust/subnets`, th, { query: n, ...e });
  }
}
class th extends p {
}
Jn.SubnetListResponsesV4PagePaginationArray = th;
Jn.CloudflareSource = Py;
class xt extends o {
  constructor() {
    super(...arguments), this.routes = new ds(this._client), this.virtualNetworks = new Qd(this._client), this.subnets = new Jn(this._client);
  }
}
xt.Routes = ds;
xt.TeamnetsV4PagePaginationArray = qd;
xt.VirtualNetworks = Qd;
xt.VirtualNetworksSinglePage = Jd;
xt.Subnets = Jn;
xt.SubnetListResponsesV4PagePaginationArray = th;
class by extends o {
  /**
   * Updates the DoH settings for your Zero Trust organization.
   *
   * @example
   * ```ts
   * const doh = await client.zeroTrust.organizations.doh.update(
   *   { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/access/organizations/doh`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Returns the DoH settings for your Zero Trust organization.
   *
   * @example
   * ```ts
   * const doh = await client.zeroTrust.organizations.doh.get({
   *   account_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/access/organizations/doh`, e)._thenUnwrap((n) => n.result);
  }
}
class eh extends o {
  constructor() {
    super(...arguments), this.doh = new by(this._client);
  }
  /**
   * Sets up a Zero Trust organization for your account or zone.
   *
   * @example
   * ```ts
   * const organization =
   *   await client.zeroTrust.organizations.create({
   *     auth_domain: 'test.cloudflareaccess.com',
   *     name: 'Widget Corps Internal Applications',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${c}/${a}/access/organizations`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  /**
   * Updates the configuration for your Zero Trust organization.
   *
   * @example
   * ```ts
   * const organization =
   *   await client.zeroTrust.organizations.update({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, zone_id: n, ...i } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: c, accountOrZoneId: a } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.put(`/${c}/${a}/access/organizations`, {
      body: i,
      ...e
    })._thenUnwrap((l) => l.result);
  }
  list(t = {}, e) {
    if (u(t))
      return this.list({}, t);
    const { account_id: s, zone_id: n } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: i, accountOrZoneId: c } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.get(`/${i}/${c}/access/organizations`, e)._thenUnwrap((a) => a.result);
  }
  /**
   * Revokes a user's access across all applications.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.organizations.revokeUsers({
   *     email: 'test@example.com',
   *     account_id: 'account_id',
   *   });
   * ```
   */
  revokeUsers(t, e) {
    const { account_id: s, zone_id: n, query_devices: i, ...c } = t;
    if (!s && !n)
      throw new h("You must provide either account_id or zone_id.");
    if (s && n)
      throw new h("You cannot provide both account_id and zone_id.");
    const { accountOrZone: a, accountOrZoneId: l } = s ? {
      accountOrZone: "accounts",
      accountOrZoneId: s
    } : {
      accountOrZone: "zones",
      accountOrZoneId: n
    };
    return this._client.post(`/${a}/${l}/access/organizations/revoke_user`, {
      query: { devices: i },
      body: c,
      ...e
    })._thenUnwrap((g) => g.result);
  }
}
eh.DOH = by;
class Uy extends o {
  /**
   * Update configuration for risk behaviors
   *
   * @example
   * ```ts
   * const behaviour =
   *   await client.zeroTrust.riskScoring.behaviours.update({
   *     account_id: 'account_id',
   *     behaviors: {
   *       foo: { enabled: true, risk_level: 'low' },
   *     },
   *   });
   * ```
   */
  update(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.put(`/accounts/${s}/zt_risk_scoring/behaviors`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Get all behaviors and associated configuration
   *
   * @example
   * ```ts
   * const behaviour =
   *   await client.zeroTrust.riskScoring.behaviours.get({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/zt_risk_scoring/behaviors`, e)._thenUnwrap((n) => n.result);
  }
}
class xy extends o {
  /**
   * Get risk score info for all users in the account
   *
   * @example
   * ```ts
   * const summary =
   *   await client.zeroTrust.riskScoring.summary.get({
   *     account_id: 'account_id',
   *   });
   * ```
   */
  get(t, e) {
    const { account_id: s } = t;
    return this._client.get(`/accounts/${s}/zt_risk_scoring/summary`, e)._thenUnwrap((n) => n.result);
  }
}
class Sy extends o {
  /**
   * Get risk score integration by reference id.
   *
   * @example
   * ```ts
   * const reference =
   *   await client.zeroTrust.riskScoring.integrations.references.get(
   *     'reference_id',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/zt_risk_scoring/integrations/reference_id/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class qn extends o {
  constructor() {
    super(...arguments), this.references = new Sy(this._client);
  }
  /**
   * Create new risk score integration.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.riskScoring.integrations.create({
   *     account_id: 'account_id',
   *     integration_type: 'Okta',
   *     tenant_url: 'https://example.com',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/zt_risk_scoring/integrations`, {
      body: n,
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Overwrite the reference_id, tenant_url, and active values with the ones
   * provided.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.riskScoring.integrations.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       account_id: 'account_id',
   *       active: true,
   *       tenant_url: 'https://example.com',
   *     },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/zt_risk_scoring/integrations/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * List all risk score integrations for the account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const integrationListResponse of client.zeroTrust.riskScoring.integrations.list(
   *   { account_id: 'account_id' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s } = t;
    return this._client.getAPIList(`/accounts/${s}/zt_risk_scoring/integrations`, sh, e);
  }
  /**
   * Delete a risk score integration.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.riskScoring.integrations.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/zt_risk_scoring/integrations/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Get risk score integration by id.
   *
   * @example
   * ```ts
   * const integration =
   *   await client.zeroTrust.riskScoring.integrations.get(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { account_id: 'account_id' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/zt_risk_scoring/integrations/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class sh extends d {
}
qn.IntegrationListResponsesSinglePage = sh;
qn.References = Sy;
class me extends o {
  constructor() {
    super(...arguments), this.behaviours = new Uy(this._client), this.summary = new xy(this._client), this.integrations = new qn(this._client);
  }
  /**
   * Get risk event/score information for a specific user
   *
   * @example
   * ```ts
   * const riskScoring = await client.zeroTrust.riskScoring.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/zt_risk_scoring/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Clear the risk score for a particular user
   *
   * @example
   * ```ts
   * const response = await client.zeroTrust.riskScoring.reset(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { account_id: 'account_id' },
   * );
   * ```
   */
  reset(t, e, s) {
    const { account_id: n } = e;
    return this._client.post(`/accounts/${n}/zt_risk_scoring/${t}/reset`, s)._thenUnwrap((i) => i.result);
  }
}
me.Behaviours = Uy;
me.Summary = xy;
me.Integrations = qn;
me.IntegrationListResponsesSinglePage = sh;
class zy extends o {
  /**
   * Adds or updates the configuration for a remotely-managed tunnel.
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.zeroTrust.tunnels.cloudflared.configurations.update(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  update(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.put(`/accounts/${n}/cfd_tunnel/${t}/configurations`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Gets the configuration for a remotely-managed tunnel
   *
   * @example
   * ```ts
   * const configuration =
   *   await client.zeroTrust.tunnels.cloudflared.configurations.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cfd_tunnel/${t}/configurations`, s)._thenUnwrap((i) => i.result);
  }
}
class nh extends o {
  /**
   * Removes a connection (aka Cloudflare Tunnel Connector) from a Cloudflare Tunnel
   * independently of its current state. If no connector id (client_id) is provided
   * all connectors will be removed. We recommend running this command after rotating
   * tokens.
   *
   * @example
   * ```ts
   * const connection =
   *   await client.zeroTrust.tunnels.cloudflared.connections.delete(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n, client_id: i } = e;
    return this._client.delete(`/accounts/${n}/cfd_tunnel/${t}/connections`, {
      query: { client_id: i },
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches connection details for a Cloudflare Tunnel.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const client of client.zeroTrust.tunnels.cloudflared.connections.get(
   *   'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.getAPIList(`/accounts/${n}/cfd_tunnel/${t}/connections`, ih, s);
  }
}
class ih extends d {
}
nh.ClientsSinglePage = ih;
class Ry extends o {
  /**
   * Fetches connector and connection details for a Cloudflare Tunnel.
   *
   * @example
   * ```ts
   * const client =
   *   await client.zeroTrust.tunnels.cloudflared.connectors.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     '1bedc50d-42b3-473c-b108-ff3d10c0d925',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s, n) {
    const { account_id: i } = s;
    return this._client.get(`/accounts/${i}/cfd_tunnel/${t}/connectors/${e}`, n)._thenUnwrap((c) => c.result);
  }
}
class Ay extends o {
  /**
   * Gets a management token used to access the management resources (i.e. Streaming
   * Logs) of a tunnel.
   *
   * @example
   * ```ts
   * const management =
   *   await client.zeroTrust.tunnels.cloudflared.management.create(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     {
   *       account_id: '699d98642c564d2e855e9661899b7252',
   *       resources: ['logs'],
   *     },
   *   );
   * ```
   */
  create(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.post(`/accounts/${n}/cfd_tunnel/${t}/management`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
}
let vy = class extends o {
  /**
   * Gets the token used to associate cloudflared with a specific tunnel.
   *
   * @example
   * ```ts
   * const token =
   *   await client.zeroTrust.tunnels.cloudflared.token.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cfd_tunnel/${t}/token`, s)._thenUnwrap((i) => i.result);
  }
};
class ht extends o {
  constructor() {
    super(...arguments), this.configurations = new zy(this._client), this.connections = new nh(this._client), this.token = new vy(this._client), this.connectors = new Ry(this._client), this.management = new Ay(this._client);
  }
  /**
   * Creates a new Cloudflare Tunnel in an account.
   *
   * @example
   * ```ts
   * const cloudflared =
   *   await client.zeroTrust.tunnels.cloudflared.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     name: 'blog',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/cfd_tunnel`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters Cloudflare Tunnels in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const cloudflaredListResponse of client.zeroTrust.tunnels.cloudflared.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/cfd_tunnel`, rh, { query: n, ...e });
  }
  /**
   * Deletes a Cloudflare Tunnel from an account.
   *
   * @example
   * ```ts
   * const cloudflared =
   *   await client.zeroTrust.tunnels.cloudflared.delete(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/cfd_tunnel/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Cloudflare Tunnel.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.tunnels.cloudflared.edit(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/cfd_tunnel/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Cloudflare Tunnel.
   *
   * @example
   * ```ts
   * const cloudflared =
   *   await client.zeroTrust.tunnels.cloudflared.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/cfd_tunnel/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class rh extends p {
}
ht.CloudflaredListResponsesV4PagePaginationArray = rh;
ht.Configurations = zy;
ht.Connections = nh;
ht.ClientsSinglePage = ih;
ht.Token = vy;
ht.Connectors = Ry;
ht.Management = Ay;
class Ly extends o {
  /**
   * Gets the token used to associate warp device with a specific Warp Connector
   * tunnel.
   *
   * @example
   * ```ts
   * const token =
   *   await client.zeroTrust.tunnels.warpConnector.token.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/warp_connector/${t}/token`, s)._thenUnwrap((i) => i.result);
  }
}
class ti extends o {
  constructor() {
    super(...arguments), this.token = new Ly(this._client);
  }
  /**
   * Creates a new Warp Connector Tunnel in an account.
   *
   * @example
   * ```ts
   * const warpConnector =
   *   await client.zeroTrust.tunnels.warpConnector.create({
   *     account_id: '699d98642c564d2e855e9661899b7252',
   *     name: 'blog',
   *   });
   * ```
   */
  create(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.post(`/accounts/${s}/warp_connector`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists and filters Warp Connector Tunnels in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const warpConnectorListResponse of client.zeroTrust.tunnels.warpConnector.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/warp_connector`, ch, { query: n, ...e });
  }
  /**
   * Deletes a Warp Connector Tunnel from an account.
   *
   * @example
   * ```ts
   * const warpConnector =
   *   await client.zeroTrust.tunnels.warpConnector.delete(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  delete(t, e, s) {
    const { account_id: n } = e;
    return this._client.delete(`/accounts/${n}/warp_connector/${t}`, s)._thenUnwrap((i) => i.result);
  }
  /**
   * Updates an existing Warp Connector Tunnel.
   *
   * @example
   * ```ts
   * const response =
   *   await client.zeroTrust.tunnels.warpConnector.edit(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  edit(t, e, s) {
    const { account_id: n, ...i } = e;
    return this._client.patch(`/accounts/${n}/warp_connector/${t}`, {
      body: i,
      ...s
    })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetches a single Warp Connector Tunnel.
   *
   * @example
   * ```ts
   * const warpConnector =
   *   await client.zeroTrust.tunnels.warpConnector.get(
   *     'f70ff985-a4ef-4643-bbbc-4a0ed4fc8415',
   *     { account_id: '699d98642c564d2e855e9661899b7252' },
   *   );
   * ```
   */
  get(t, e, s) {
    const { account_id: n } = e;
    return this._client.get(`/accounts/${n}/warp_connector/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class ch extends p {
}
ti.WARPConnectorListResponsesV4PagePaginationArray = ch;
ti.Token = Ly;
class jt extends o {
  constructor() {
    super(...arguments), this.cloudflared = new ht(this._client), this.warpConnector = new ti(this._client);
  }
  /**
   * Lists and filters all types of Tunnels in an account.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tunnelListResponse of client.zeroTrust.tunnels.list(
   *   { account_id: '699d98642c564d2e855e9661899b7252' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { account_id: s, ...n } = t;
    return this._client.getAPIList(`/accounts/${s}/tunnels`, oh, { query: n, ...e });
  }
}
class oh extends p {
}
jt.TunnelListResponsesV4PagePaginationArray = oh;
jt.Cloudflared = ht;
jt.CloudflaredListResponsesV4PagePaginationArray = rh;
jt.WARPConnector = ti;
jt.WARPConnectorListResponsesV4PagePaginationArray = ch;
class z extends o {
  constructor() {
    super(...arguments), this.devices = new P(this._client), this.identityProviders = new Qn(this._client), this.organizations = new eh(this._client), this.seats = new xl(this._client), this.access = new m(this._client), this.dex = new Y(this._client), this.tunnels = new jt(this._client), this.connectivitySettings = new km(this._client), this.dlp = new j(this._client), this.gateway = new x(this._client), this.networks = new xt(this._client), this.riskScoring = new me(this._client);
  }
}
z.Devices = P;
z.DevicesSinglePage = $d;
z.IdentityProviders = Qn;
z.IdentityProviderListResponsesSinglePage = Xd;
z.Organizations = eh;
z.Seats = xl;
z.SeatsSinglePage = Sl;
z.Access = m;
z.DEX = Y;
z.Tunnels = jt;
z.TunnelListResponsesV4PagePaginationArray = oh;
z.ConnectivitySettings = km;
z.DLP = j;
z.Gateway = x;
z.Networks = xt;
z.RiskScoring = me;
class Iy extends o {
  /**
   * Triggeres a new activation check for a PENDING Zone. This can be triggered every
   * 5 min for paygo/ent customers, every hour for FREE Zones.
   *
   * @example
   * ```ts
   * const response = await client.zones.activationCheck.trigger(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  trigger(t, e) {
    const { zone_id: s } = t;
    return this._client.put(`/zones/${s}/activation_check`, e)._thenUnwrap((n) => n.result);
  }
}
class ah extends o {
  /**
   * Set metadata for account-level custom nameservers on a zone.
   *
   * If you would like new zones in the account to use account custom nameservers by
   * default, use PUT /accounts/:identifier to set the account setting
   * use_account_custom_ns_by_default to true.
   *
   * Deprecated in favor of
   * [Update DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-update-dns-settings).
   *
   * @deprecated Use [DNS settings API](https://developers.cloudflare.com/api/resources/dns/subresources/settings/methods/put/) instead.
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.getAPIList(`/zones/${s}/custom_ns`, uh, {
      body: n,
      method: "put",
      ...e
    });
  }
  /**
   * Get metadata for account-level custom nameservers on a zone.
   *
   * Deprecated in favor of
   * [Show DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-list-dns-settings).
   *
   * @deprecated Use [DNS settings API](https://developers.cloudflare.com/api/resources/dns/subresources/settings/methods/get/) instead.
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/custom_ns`, e);
  }
}
class uh extends d {
}
ah.CustomNameserverUpdateResponsesSinglePage = uh;
class ky extends o {
  /**
   * Enforce a zone hold on the zone, blocking the creation and activation of zones
   * with this zone's hostname.
   *
   * @example
   * ```ts
   * const zoneHold = await client.zones.holds.create({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  create(t, e) {
    const { zone_id: s, include_subdomains: n } = t;
    return this._client.post(`/zones/${s}/hold`, {
      query: { include_subdomains: n },
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Stop enforcement of a zone hold on the zone, permanently or temporarily,
   * allowing the creation and activation of zones with this zone's hostname.
   *
   * @example
   * ```ts
   * const zoneHold = await client.zones.holds.delete({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s, hold_after: n } = t;
    return this._client.delete(`/zones/${s}/hold`, {
      query: { hold_after: n },
      ...e
    })._thenUnwrap((i) => i.result);
  }
  /**
   * Update the `hold_after` and/or `include_subdomains` values on an existing zone
   * hold. The hold is enabled if the `hold_after` date-time value is in the past.
   *
   * @example
   * ```ts
   * const zoneHold = await client.zones.holds.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}/hold`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Retrieve whether the zone is subject to a zone hold, and metadata about the
   * hold.
   *
   * @example
   * ```ts
   * const zoneHold = await client.zones.holds.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/hold`, e)._thenUnwrap((n) => n.result);
  }
}
class lh extends o {
  /**
   * Lists available plans the zone can subscribe to.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const availableRatePlan of client.zones.plans.list(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/available_plans`, dh, e);
  }
  /**
   * Details of the available plan that the zone can subscribe to.
   *
   * @example
   * ```ts
   * const availableRatePlan = await client.zones.plans.get(
   *   '023e105f4ecef8ad9ca31a8372d0c353',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/available_plans/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class dh extends d {
}
lh.AvailableRatePlansSinglePage = dh;
class hh extends o {
  /**
   * Lists all rate plans the zone can subscribe to.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ratePlanGetResponse of client.zones.ratePlans.get(
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * )) {
   *   // ...
   * }
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.getAPIList(`/zones/${s}/available_rate_plans`, _h, e);
  }
}
class _h extends d {
}
hh.RatePlanGetResponsesSinglePage = _h;
class Oy extends o {
  /**
   * Updates a single zone setting by the identifier
   *
   * @example
   * ```ts
   * const response = await client.zones.settings.edit(
   *   'always_online',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  edit(t, e, s) {
    const { zone_id: n, ...i } = e;
    return this._client.patch(`/zones/${n}/settings/${t}`, { body: i, ...s })._thenUnwrap((c) => c.result);
  }
  /**
   * Fetch a single zone setting by name
   *
   * @example
   * ```ts
   * const setting = await client.zones.settings.get(
   *   'always_online',
   *   { zone_id: '023e105f4ecef8ad9ca31a8372d0c353' },
   * );
   * ```
   */
  get(t, e, s) {
    const { zone_id: n } = e;
    return this._client.get(`/zones/${n}/settings/${t}`, s)._thenUnwrap((i) => i.result);
  }
}
class Cy extends o {
  /**
   * Create a zone subscription, either plan or add-ons.
   *
   * @example
   * ```ts
   * const subscription =
   *   await client.zones.subscriptions.create({
   *     zone_id: '506e3185e9c882d175a2d0cb0093d9f2',
   *   });
   * ```
   */
  create(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.post(`/zones/${s}/subscription`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Updates zone subscriptions, either plan or add-ons.
   *
   * @example
   * ```ts
   * const subscription =
   *   await client.zones.subscriptions.update({
   *     zone_id: '506e3185e9c882d175a2d0cb0093d9f2',
   *   });
   * ```
   */
  update(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.put(`/zones/${s}/subscription`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Lists zone subscription details.
   *
   * @example
   * ```ts
   * const subscription = await client.zones.subscriptions.get({
   *   zone_id: '506e3185e9c882d175a2d0cb0093d9f2',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}/subscription`, e)._thenUnwrap((n) => n.result);
  }
}
class V extends o {
  constructor() {
    super(...arguments), this.activationCheck = new Iy(this._client), this.settings = new Oy(this._client), this.customNameservers = new ah(this._client), this.holds = new ky(this._client), this.subscriptions = new Cy(this._client), this.plans = new lh(this._client), this.ratePlans = new hh(this._client);
  }
  /**
   * Create Zone
   *
   * @example
   * ```ts
   * const zone = await client.zones.create({
   *   account: {},
   *   name: 'example.com',
   * });
   * ```
   */
  create(t, e) {
    return this._client.post("/zones", { body: t, ...e })._thenUnwrap((s) => s.result);
  }
  list(t = {}, e) {
    return u(t) ? this.list({}, t) : this._client.getAPIList("/zones", Zy, { query: t, ...e });
  }
  /**
   * Deletes an existing zone.
   *
   * @example
   * ```ts
   * const zone = await client.zones.delete({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  delete(t, e) {
    const { zone_id: s } = t;
    return this._client.delete(`/zones/${s}`, e)._thenUnwrap((n) => n.result);
  }
  /**
   * Edits a zone. Only one zone property can be changed at a time.
   *
   * @example
   * ```ts
   * const zone = await client.zones.edit({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  edit(t, e) {
    const { zone_id: s, ...n } = t;
    return this._client.patch(`/zones/${s}`, { body: n, ...e })._thenUnwrap((i) => i.result);
  }
  /**
   * Zone Details
   *
   * @example
   * ```ts
   * const zone = await client.zones.get({
   *   zone_id: '023e105f4ecef8ad9ca31a8372d0c353',
   * });
   * ```
   */
  get(t, e) {
    const { zone_id: s } = t;
    return this._client.get(`/zones/${s}`, e)._thenUnwrap((n) => n.result);
  }
}
class Zy extends p {
}
V.ZonesV4PagePaginationArray = Zy;
V.ActivationCheck = Iy;
V.Settings = Oy;
V.CustomNameservers = ah;
V.CustomNameserverUpdateResponsesSinglePage = uh;
V.Holds = ky;
V.Subscriptions = Cy;
V.Plans = lh;
V.AvailableRatePlansSinglePage = dh;
V.RatePlans = hh;
V.RatePlanGetResponsesSinglePage = _h;
var Ty, Vy;
class _ extends rf {
  /**
   * API Client for interfacing with the Cloudflare API.
   *
   * @param {string | null | undefined} [opts.apiToken=process.env['CLOUDFLARE_API_TOKEN'] ?? null]
   * @param {string | null | undefined} [opts.apiKey=process.env['CLOUDFLARE_API_KEY'] ?? null]
   * @param {string | null | undefined} [opts.apiEmail=process.env['CLOUDFLARE_EMAIL'] ?? null]
   * @param {string | null | undefined} [opts.userServiceKey=process.env['CLOUDFLARE_API_USER_SERVICE_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['CLOUDFLARE_BASE_URL'] ?? https://api.cloudflare.com/client/v4] - Override the default base URL for the API.
   * @param {string | null} [opts.apiVersion] - Define the version to target for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({ baseURL: t = fe("CLOUDFLARE_BASE_URL"), apiVersion: e = null, apiToken: s = fe("CLOUDFLARE_API_TOKEN") ?? null, apiKey: n = fe("CLOUDFLARE_API_KEY") ?? null, apiEmail: i = fe("CLOUDFLARE_EMAIL") ?? null, userServiceKey: c = fe("CLOUDFLARE_API_USER_SERVICE_KEY") ?? null, ...a } = {}) {
    const l = {
      apiToken: s,
      apiKey: n,
      apiEmail: i,
      userServiceKey: c,
      ...a,
      baseURL: t || "https://api.cloudflare.com/client/v4",
      apiVersion: e || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    super({
      baseURL: l.baseURL,
      apiVersion: l.apiVersion,
      baseURLOverridden: t ? t !== "https://api.cloudflare.com/client/v4" : !1,
      timeout: l.timeout ?? 6e4,
      httpAgent: l.httpAgent,
      maxRetries: l.maxRetries,
      fetch: l.fetch
    }), Ty.add(this), this.accounts = new pt(this), this.originCACertificates = new ia(this), this.ips = new Fg(this), this.memberships = new na(this), this.user = new nt(this), this.zones = new V(this), this.loadBalancers = new W(this), this.cache = new Xt(this), this.ssl = new ft(this), this.acm = new mi(this), this.argo = new Cs(this), this.certificateAuthorities = new mr(this), this.clientCertificates = new yr(this), this.customCertificates = new Ds(this), this.customHostnames = new Ie(this), this.customNameservers = new Es(this), this.dnsFirewall = new Oe(this), this.dns = new $t(this), this.emailSecurity = new It(this), this.emailRouting = new mt(this), this.filters = new Hs(this), this.firewall = new E(this), this.healthchecks = new Ks(this), this.keylessCertificates = new wo(this), this.logpush = new at(this), this.logs = new Te(this), this.originTLSClientAuth = new ae(this), this.pageRules = new jp(this), this.rateLimits = new Ba(this), this.waitingRooms = new it(this), this.web3 = new Vn(this), this.workers = new M(this), this.kv = new Js(this), this.durableObjects = new js(this), this.queues = new Zt(this), this.apiGateway = new G(this), this.managedTransforms = new Op(this), this.pageShield = new tt(this), this.rulesets = new Mt(this), this.urlNormalization = new K$(this), this.spectrum = new qe(this), this.addressing = new B(this), this.auditLogs = new k_(this), this.billing = new hr(this), this.brandProtection = new Kt(this), this.diagnostics = new Ys(this), this.images = new Ze(this), this.intel = new L(this), this.magicTransit = new C(this), this.magicNetworkMonitoring = new re(this), this.magicCloudNetworking = new q(this), this.networkInterconnects = new oe(this), this.mtlsCertificates = new Ve(this), this.pages = new on(this), this.registrar = new fn(this), this.requestTracers = new Ka(this), this.rules = new Pn(this), this.stream = new U(this), this.alerting = new wt(this), this.d1 = new Jt(this), this.r2 = new je(this), this.workersForPlatforms = new ml(this), this.zeroTrust = new z(this), this.turnstile = new In(this), this.hyperdrive = new Fc(this), this.rum = new Fe(this), this.vectorize = new Cn(this), this.urlScanner = new kn(this), this.radar = new f(this), this.botManagement = new C_(this), this.originPostQuantumEncryption = new Mp(this), this.zaraz = new dt(this), this.speed = new _e(this), this.dcvDelegation = new xg(this), this.hostnames = new jc(this), this.snippets = new Nt(this), this.calls = new Qt(this), this.cloudforceOne = new vt(this), this.aiGateway = new D(this), this.iam = new yt(this), this.cloudConnector = new Ae(this), this.botnetFeed = new Zs(this), this.securityTXT = new L$(this), this.workflows = new bt(this), this.resourceSharing = new Et(this), this.leakedCredentialChecks = new qs(this), this.contentScanning = new Lt(this), this.abuseReports = new p_(this), this.ai = new ct(this), this.securityCenter = new Sn(this), this.browserRendering = new Q(this), this.customPages = new Zr(this), this.secretsStore = new de(this), this.pipelines = new Gp(this), this.schemaValidation = new Qe(this), this._options = l, this.apiToken = s, this.apiKey = n, this.apiEmail = i, this.userServiceKey = c;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(t) {
    return {
      ...super.defaultHeaders(t),
      "X-Auth-Key": this.apiKey,
      "X-Auth-Email": this.apiEmail,
      ...this._options.defaultHeaders
    };
  }
  validateHeaders(t, e) {
    if (!(this.apiEmail && t["x-auth-email"]) && e["x-auth-email"] !== null && !(this.apiKey && t["x-auth-key"]) && e["x-auth-key"] !== null && !(this.apiToken && t.authorization) && e.authorization !== null && !(this.userServiceKey && t["x-auth-user-service-key"]) && e["x-auth-user-service-key"] !== null)
      throw new Error('Could not resolve authentication method. Expected one of apiEmail, apiKey, apiToken or userServiceKey to be set. Or for one of the "X-Auth-Email", "X-Auth-Key", "Authorization" or "X-Auth-User-Service-Key" headers to be explicitly omitted');
  }
  authHeaders(t) {
    const e = this.apiEmailAuth(t), s = this.apiKeyAuth(t), n = this.apiTokenAuth(t), i = this.userServiceKeyAuth(t);
    return e != null && !Bt(e) && s != null && !Bt(s) ? { ...e, ...s } : n != null && !Bt(n) ? n : i != null && !Bt(i) ? i : {};
  }
  apiEmailAuth(t) {
    return this.apiEmail == null ? {} : { "X-Auth-Email": this.apiEmail };
  }
  apiKeyAuth(t) {
    return this.apiKey == null ? {} : { "X-Auth-Key": this.apiKey };
  }
  apiTokenAuth(t) {
    return this.apiToken == null ? {} : { Authorization: `Bearer ${this.apiToken}` };
  }
  userServiceKeyAuth(t) {
    return this.userServiceKey == null ? {} : { "X-Auth-User-Service-Key": this.userServiceKey };
  }
  stringifyQuery(t) {
    return Ky(t, { allowDots: !0, arrayFormat: "repeat" });
  }
}
Vy = _, Ty = /* @__PURE__ */ new WeakSet();
_.Cloudflare = Vy;
_.DEFAULT_TIMEOUT = 6e4;
_.CloudflareError = h;
_.APIError = v;
_.APIConnectionError = As;
_.APIConnectionTimeoutError = Ih;
_.APIUserAbortError = li;
_.NotFoundError = Zh;
_.ConflictError = Th;
_.RateLimitError = Dh;
_.BadRequestError = kh;
_.AuthenticationError = Oh;
_.InternalServerError = Eh;
_.PermissionDeniedError = Ch;
_.UnprocessableEntityError = Vh;
_.toFile = wi;
_.fileFromPath = jh;
_.Accounts = pt;
_.OriginCACertificates = ia;
_.IPs = Fg;
_.Memberships = na;
_.User = nt;
_.Zones = V;
_.LoadBalancers = W;
_.Cache = Xt;
_.SSL = ft;
_.ACM = mi;
_.Argo = Cs;
_.CertificateAuthorities = mr;
_.ClientCertificates = yr;
_.CustomCertificates = Ds;
_.CustomHostnames = Ie;
_.CustomNameservers = Es;
_.DNSFirewall = Oe;
_.DNS = $t;
_.EmailSecurity = It;
_.EmailRouting = mt;
_.Filters = Hs;
_.Firewall = E;
_.Healthchecks = Ks;
_.KeylessCertificates = wo;
_.Logpush = at;
_.Logs = Te;
_.OriginTLSClientAuth = ae;
_.PageRules = jp;
_.RateLimits = Ba;
_.WaitingRooms = it;
_.Web3 = Vn;
_.Workers = M;
_.KV = Js;
_.DurableObjects = js;
_.Queues = Zt;
_.APIGateway = G;
_.ManagedTransforms = Op;
_.PageShield = tt;
_.Rulesets = Mt;
_.URLNormalization = K$;
_.Spectrum = qe;
_.Addressing = B;
_.AuditLogs = k_;
_.Billing = hr;
_.BrandProtection = Kt;
_.Diagnostics = Ys;
_.Images = Ze;
_.Intel = L;
_.MagicTransit = C;
_.MagicNetworkMonitoring = re;
_.MagicCloudNetworking = q;
_.NetworkInterconnects = oe;
_.MTLSCertificates = Ve;
_.Pages = on;
_.Registrar = fn;
_.RequestTracers = Ka;
_.Rules = Pn;
_.Stream = U;
_.Alerting = wt;
_.D1Resource = Jt;
_.R2 = je;
_.WorkersForPlatforms = ml;
_.ZeroTrust = z;
_.Turnstile = In;
_.HyperdriveResource = Fc;
_.RUM = Fe;
_.Vectorize = Cn;
_.URLScanner = kn;
_.Radar = f;
_.BotManagement = C_;
_.OriginPostQuantumEncryption = Mp;
_.Zaraz = dt;
_.Speed = _e;
_.DCVDelegation = xg;
_.Hostnames = jc;
_.Snippets = Nt;
_.Calls = Qt;
_.CloudforceOne = vt;
_.AIGateway = D;
_.IAM = yt;
_.CloudConnector = Ae;
_.BotnetFeed = Zs;
_.SecurityTXT = L$;
_.Workflows = bt;
_.ResourceSharing = Et;
_.LeakedCredentialChecks = qs;
_.ContentScanning = Lt;
_.AbuseReports = p_;
_.AI = ct;
_.SecurityCenter = Sn;
_.BrowserRendering = Q;
_.CustomPages = Zr;
_.SecretsStore = de;
_.Pipelines = Gp;
_.SchemaValidation = Qe;
console.log("Cloudflare");
const zh = document.querySelector("#custom-purge");
zh && zh.addEventListener("click", function() {
  const r = document.querySelector("#custom-purge-url")?.value;
  Dy(r);
});
const Rh = document.querySelector("#full-purge");
Rh && Rh.addEventListener("click", function() {
  Dy();
});
async function Dy(r = "") {
  const t = new _({
    apiToken: "vLtFl8vyItbpQ4C6movhylmkeQ-oO28gBsTFDN6u"
    // Use 'token' property, not 'apiToken'
  }), e = "4413b9853bf2627723add7e259356e72";
  let s;
  r ? s = await t.cache.purge({ zone_id: e, files: [r] }) : s = await t.cache.purge({ zone_id: e, purge_everything: !0 }), console.log(s);
}
