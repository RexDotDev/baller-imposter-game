# Baller Imposter Game

A local pass-and-play party game for basketball fans. One or more players are impostors; everyone else receives the same player or team and tries to identify who is bluffing.

## Features

- NBA, EuroLeague, team, player, and mixed game modes
- Configurable player and impostor counts
- Privacy-friendly text and initials instead of bundled player photos or team logos
- No backend, account, API key, or environment variables required

## Run locally

Requirements: Node.js 22.12+ and npm.

```bash
npm ci
npm run dev
```

The development server starts at `http://localhost:8080`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

This is a static Vite application. See [DEPLOY.md](DEPLOY.md) for Vercel instructions; any static host that serves `dist/` with an SPA fallback will work.

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a change. Please report vulnerabilities through GitHub's private security-advisory flow as described in [SECURITY.md](SECURITY.md).

## Legal notice

This is an independent fan project and is not affiliated with, endorsed by, or sponsored by the NBA, EuroLeague, their teams, or their players. Names are used only to identify game subjects. The repository intentionally does not distribute third-party player photography, team logos, copied articles, or restricted fonts.

## License

[MIT](LICENSE) for the original source code and documentation in this repository. The license does not grant rights to third-party names or trademarks.
