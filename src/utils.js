const KO_EN = [
  ['더 뉴 ','The New '],['더뉴 ','The New '],['뉴 ','New '],[' 뉴',' New'],
  ['GLE-클래스','GLE-Class'],['GLC-클래스','GLC-Class'],['C-클래스','C-Class'],
  ['E-클래스','E-Class'],['S-클래스','S-Class'],['A-클래스','A-Class'],
  ['B-클래스','B-Class'],['CLA-클래스','CLA-Class'],['CLS-클래스','CLS-Class'],
  ['GLA-클래스','GLA-Class'],['GLB-클래스','GLB-Class'],['GLS-클래스','GLS-Class'],
  ['G-클래스','G-Class'],['클래스','Class'],
  ['5시리즈','5 Series'],['3시리즈','3 Series'],['7시리즈','7 Series'],
  ['1시리즈','1 Series'],['2시리즈','2 Series'],['4시리즈','4 Series'],
  ['6시리즈','6 Series'],['8시리즈','8 Series'],['시리즈',' Series'],
  ['벤츠','Mercedes-Benz'],
  ['플러그인 하이브리드','Plug-in Hybrid'],['플러그인','Plug-in'],
  ['하이브리드','Hybrid'],['투어러','Tourer'],['에디션','Edition'],
  ['스포츠','Sport'],['프리미엄','Premium'],['럭셔리','Luxury'],
  ['라인','Line'],['익스클루시브','Exclusive'],['컴포트','Comfort'],
  ['엘레강스','Elegance'],['아방가르드','Avantgarde'],['어드밴스드','Advanced'],
  ['모던','Modern'],['디자인','Design'],['팩키지','Package'],['패키지','Package'],
  ['테크','Tech'],['세단','Sedan'],['쿠페','Coupe'],['왜건','Wagon'],
  ['컨버터블','Convertible'],['카브리올레','Cabriolet'],['해치백','Hatchback'],
];

export function tr(text) {
  if (!text) return '';
  let s = String(text);
  for (const [ko, en] of KO_EN) s = s.split(ko).join(en);
  s = s.replace(/[ᄀ-ᇿ㄰-㆏가-힯一-鿿぀-ヿ＀-￯]+/g, '');
  return s.replace(/\s{2,}/g, ' ').trim();
}

export const FUEL = {
  '가솔린':'Benzin','디젤':'Dizel','하이브리드':'Hibrid',
  '전기':'Elektrik','LPG':'LPG','가솔린+전기':'Hibrid Plug-in',
  '디젤+전기':'Hibrid Dizel',
};

export const TRANS = {
  '오토':'Automatik','수동':'Manual','A':'Automatik','M':'Manual',
  'Auto':'Automatik','M/T':'Manual',
};

export const COLOR = {
  '검은색':'E zezë','검정':'E zezë','블랙':'E zezë',
  '흰색':'E bardhë','화이트':'E bardhë',
  '은색':'Argjendtë','실버':'Argjendtë',
  '회색':'Gri','그레이':'Gri',
  '빨간색':'E kuqe','레드':'E kuqe',
  '파란색':'E kaltër','블루':'E kaltër',
  '남색':'Blu i errët','네이비':'Blu i errët',
  '금색':'E artë','골드':'E artë',
  '갈색':'Kafe','브라운':'Kafe',
  '주황색':'Portokalli','오렌지':'Portokalli',
  '노란색':'E verdhë','녹색':'E gjelbër','보라색':'Vjollcë',
};

export const KRW_TO_EUR = 0.00067;

export function eur(krwUnit) { return Math.round(krwUnit * 10000 * KRW_TO_EUR); }
export function fmtEur(e) { return '€' + e.toLocaleString('de-DE'); }
export function fmtKm(k) { return Number(k).toLocaleString('de-DE') + ' km'; }
export function fmtYear(y) { return y ? String(y).slice(0, 4) : ''; }
export function imgUrl(p) { return p ? `https://ci.encar.com${p}001.jpg` : null; }

export function dedup(cars) {
  const seen = new Set();
  return cars.filter(c => {
    const k = c.Id ?? c.CarId;
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
