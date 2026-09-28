import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const siteUrl = 'https://praca.zgrana.pl'
const paths = ['/', '/ile-na-reke-uop', '/ile-na-reke-b2b', '/b2b-vs-uop']
const urls = paths.map((path) => `  <url><loc>${new URL(path, siteUrl).href}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
await mkdir(resolve('dist'), { recursive: true })
await writeFile(resolve('dist/sitemap.xml'), sitemap, 'utf8')
