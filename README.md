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
- Halaman `/en/` untuk SEO internasional (konten ter-render di server, `hreflang`)
- Thumbnail otomatis dioptimasi ke AVIF/WebP via `astro:assets` (`<Picture>`)

## Struktur

```
/
├── public/            # aset statis (video, favicon, og-image, robots.txt)
├── src/
│   ├── assets/        # thumbnail sumber yang dioptimasi astro:assets
│   ├── components/    # section UI (Hero, CNCSection, Videos, Sections, dll)
│   ├── layouts/       # Layout (SEO, head, i18n init)
│   ├── pages/         # index.astro (ID) + en/index.astro (EN)
│   ├── scripts/       # videoModal.ts (logic modal + load-more)
│   ├── styles/        # global.css (Tailwind @theme)
│   └── i18n/          # i18n.ts + translations.ts
└── package.json
```

## Domain / Deployment

Situs sementara di-deploy ke Vercel dengan domain `https://pintujatiminimalis-astro.vercel.app`.

### Mengembalikan ke domain produksi (`pintujatiminimalis.my.id`)

Saat domain final siap, cukup ubah satu nilai di `astro.config.mjs`:

```js
site: 'https://pintujatiminimalis.my.id'
```

Semua referensi URL (canonical, `hreflang`, og/twitter image, JSON-LD, sitemap) otomatis mengikuti `site` karena `Layout.astro` membaca `Astro.site`. Jangan lupa juga ubah `public/robots.txt`:

```
Sitemap: https://pintujatiminimalis.my.id/sitemap-index.xml
```

## Commands

| Command            | Action                                  |
| :----------------- | :-------------------------------------- |
| `npm install`      | Install dependencies                    |
| `npm run dev`      | Dev server di `localhost:4321`          |
| `npm run build`    | Build produksi ke `./dist/`             |
| `npm run preview`  | Preview hasil build                     |
| `npm run astro ...`| Jalankan CLI Astro                      |

