# Deploy na Vercel

## Automatski Deploy (Preporučeno)

1. **Konektuj sa GitHub-om:**
   - Idite na [vercel.com](https://vercel.com)
   - Prijavite se sa GitHub nalogom
   - Kliknite na "New Project"
   - Izaberite vaš repository (`baller-imposter-game`)

2. **Konfiguracija:**
   - Vercel će automatski detektovati da je ovo Vite projekat
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (automatski)
   - Output Directory: `dist` (automatski)
   - Install Command: `npm install`

3. **Deploy:**
   - Kliknite "Deploy"
   - Vercel će automatski build-ovati i deploy-ovati vašu aplikaciju
   - Dobićete URL tipa: `your-project.vercel.app`

## Alternativno: Vercel CLI

```bash
# Instaliraj Vercel CLI globalno
npm i -g vercel

# Login u Vercel
vercel login

# Deploy
vercel

# Za production deploy
vercel --prod
```

## Važno

- `vercel.json` je već konfigurisan za pravilno rutiranje
- Svi fajlovi su spremni za production
- Build je testiran i uspešan

