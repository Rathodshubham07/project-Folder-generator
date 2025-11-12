# Industrial Project Zip Generator

This is a React app that generates a structured ZIP archive for industrial automation projects. It wraps your existing `ProjectZipGenerator` component so you can run locally and deploy via GitHub Pages.

## Local Development

- Prerequisites: Node.js 18+ and npm
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Open the printed local URL to use the generator.

Note: The component dynamically loads JSZip via CDN. Tailwind classes are enabled via CDN in `index.html`.

## Deploy to GitHub Pages

This repo includes a workflow to build and deploy to Pages when you push to `main`.

Steps:
- Create a GitHub repository and push this project.
- Go to Settings → Pages and ensure **Source: GitHub Actions**.
- Push to `main`; the workflow will build and deploy.
- Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

### Vite Base Path (only for project pages)
If deploying under a project repo (not a user/organization site), set the Vite `base` to `/<REPO_NAME>/` in `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/<REPO_NAME>/'
});
```

Then re-run `npm run build` and push to `main`.

## Component Source

Your original component lives at `project_zip_generator.tsx` and is imported by `src/App.tsx`. Icons use `lucide-react` and styles rely on Tailwind CDN.