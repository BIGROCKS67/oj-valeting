// GitHub Pages serves the site at bigrocks67.github.io/oj-valeting/ until Owen's domain is
// pointed at it. The build sets BASE_PATH=/oj-valeting for that (see .github/workflows/pages.yml);
// with a custom domain (public/CNAME) it is empty. Raw <img> and <a> tags need asset();
// next/link adds the base path by itself.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${basePath}${p}`;
/** true on the github.io preview and the Vercel demo: keep those out of Google so only ojvaleting.org is indexed */
export const isPreview = basePath !== "" || process.env.VERCEL === "1";
