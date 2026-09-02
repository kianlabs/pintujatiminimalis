# Pintu Jati Minimalis

Landing page satu halaman untuk **Pintu Jati Minimalis** — spesialis pembuatan pintu kayu jati asli Perhutani di Boyolali, Jawa Tengah.

Dibangun dengan **Astro** + **Tailwind CSS v4** + **GSAP**, dengan dukungan **dua bahasa (ID/EN)** via sistem i18n ringan berbasis `localStorage`.

## Fitur

- Hero section dengan background lokal & animasi GSAP
- Section teknologi: Mesin CNC & 3D Printing (video modal portrait)
- Galeri video (30 video) dengan lightbox, navigasi keyboard (Esc / Panah), dan tombol "Tampilkan Lebih"
- Section keunggulan, proses pemesanan, lokasi, dan footer
- Tombol WhatsApp mengambang + CTA WhatsApp ganda (Dwi Toto & Ferdi)
- SEO lengkap: meta, Open Graph, Twitter Card, JSON-LD `LocalBusiness`, sitemap
- i18n ID/EN dengan `data-i18n` + fallback teks

## Struktur

```
/
├── public/            # aset statis (gambar, video, thumbnail)
├── src/
│   ├── components/    # section UI (Hero, CNCSection, Videos, dll)
│   ├── layouts/       # Layout (SEO, head, i18n init)
│   ├── pages/         # index.astro
│   ├── scripts/       # videoModal.ts (logic modal + load-more)
│   ├── styles/        # global.css (Tailwind @theme)
│   └── i18n/          # i18n.ts + translations.ts
└── package.json
```

## Commands

| Command            | Action                                  |
| :----------------- | :-------------------------------------- |
| `npm install`      | Install dependencies                    |
| `npm run dev`      | Dev server di `localhost:4321`          |
| `npm run build`    | Build produksi ke `./dist/`             |
| `npm run preview`  | Preview hasil build                     |
| `npm run astro ...`| Jalankan CLI Astro                      |
