const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/javascript, */*; q=0.01',
  'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': 'https://www.encar.com/',
  'Origin': 'https://www.encar.com',
};

async function tryFetch(url, isWrapped, signal, label) {
  const r = await fetch(url, { signal, headers: HEADERS });
  if (!r.ok) throw new Error(`${label}: HTTP ${r.status}`);
  const text = await r.text();
  let data;
  if (isWrapped) {
    const outer = JSON.parse(text);
    if (outer.status?.http_code === 403) throw new Error(`${label}: 403`);
    if (!outer.contents) throw new Error(`${label}: empty`);
    data = JSON.parse(outer.contents);
  } else {
    data = JSON.parse(text);
  }
  if (!Array.isArray(data?.SearchResults)) throw new Error(`${label}: no SearchResults`);
  return data;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { carid } = req.query;
  if (!carid) return res.status(400).json({ error: 'carid required' });

  const encarUrl = `https://api.encar.com/search/car/list/general?${new URLSearchParams({
    q: `(And.Hidden.N._.CarId.${carid}.)`,
    sr: '|ModifiedDate|0|1',
    inav: '|Metadata|Sort',
  })}`;
  const enc = encodeURIComponent(encarUrl);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);

  try {
    const data = await Promise.any([
      tryFetch(encarUrl,                                         false, ctrl.signal, 'direct'),
      tryFetch(`https://api.allorigins.win/get?url=${enc}`,      true,  ctrl.signal, 'allorigins'),
      tryFetch(`https://corsproxy.io/?${enc}`,                   false, ctrl.signal, 'corsproxy'),
      tryFetch(`https://api.codetabs.com/v1/proxy?quest=${enc}`, false, ctrl.signal, 'codetabs'),
    ]);
    clearTimeout(timer);

    const car = data?.SearchResults?.[0] ?? null;
    return res.status(200).json({ car });
  } catch (err) {
    clearTimeout(timer);
    const detail = err instanceof AggregateError
      ? err.errors.map(e => e.message).join(' | ')
      : err.message;
    return res.status(502).json({ error: 'Nuk u mor përgjigje', detail });
  }
}
