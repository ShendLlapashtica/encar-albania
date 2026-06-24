# EncarAL 🇦🇱 — Tregu i Makinave Shqip

Marketplace i makinave koreane për tregun shqiptar, i bazuar në Encar.com.

## Si funksionon
- Frontend: HTML/CSS/JS i pastër (asnjë framework)
- Backend: Vercel Serverless Function (`/api/cars.js`) që vepron si proxy për Encar API
- Pa bazë të dhënash — të dhënat vijnë live nga Encar çdo herë

## Deployment në Vercel (FALAS)

### Hapi 1 — Instalo Vercel CLI
```bash
npm install -g vercel
```

### Hapi 2 — Lidhu me llogarinë tënde
```bash
vercel login
```

### Hapi 3 — Vendos projektin
```bash
cd encar-albania
vercel --prod
```

Vercel do të të japë një URL si: `https://encar-albania-abc123.vercel.app`

### Hapi 4 (opsional) — Domen personal
- Blej domain në Namecheap (~€8/vit)  
- Shto në Vercel: Settings → Domains → Add

## Struktura e projektit
```
encar-albania/
├── api/
│   └── cars.js        ← Proxy serverless për Encar API (zgjidh CORS)
├── public/
│   └── index.html     ← Faqja kryesore (gjithçka brenda)
├── vercel.json        ← Konfigurim Vercel
└── package.json
```

## Veçoritë
- 🔍 Kërkim sipas markës/modelit
- ⛽ Filter karburanti (benzinë, naftë, hibrid, elektrik)
- 💰 Filter çmimi (EUR)
- 📅 Filter viti & kilometrazh
- 🖼️ Galeri fotosh për çdo makinë
- 💬 Buton WhatsApp për kontakt
- 📱 Responsive (punon në celular)
- 🌙 Dark mode automatik

## Konfigurimi i kursit të këmbimit
Në `api/cars.js`, rregulllo:
```js
const KRW_TO_EUR = 0.00067; // Kursi i sotëm Won → Euro
```
