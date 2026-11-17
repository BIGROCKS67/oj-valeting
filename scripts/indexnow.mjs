// Run after a deploy has gone live: node scripts/indexnow.mjs
// Tells Bing (and other IndexNow engines) every URL in the sitemap may have changed, so they
// recrawl sooner. Google does not use IndexNow. The key file public/22fa1e8532a7cea2eb6140162d2bb6b8.txt must stay.
import { readFileSync } from "node:fs";

const KEY = "22fa1e8532a7cea2eb6140162d2bb6b8";
const HOST = "ojvalet.co.uk";
const sitemap = readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`indexnow: ${res.status} for ${urlList.length} URLs`);
