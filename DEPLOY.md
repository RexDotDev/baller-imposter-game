# Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Keep the detected framework preset set to **Vite**.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. No environment variables or backend service are required.

`vercel.json` includes the SPA rewrite and security headers.

Before deploying a fork, run:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```
