# Baller Imposter Game

A local pass-and-play party game for basketball fans. One or more players are impostors; everyone else receives the same player or team and tries to identify who is bluffing.

## Features

- NBA, EuroLeague, team, player, and mixed game modes
- Configurable player and impostor counts
- Bundled player photos and team logos, with initials as a loading/error fallback
- Neutral in-app impostor icon with no third-party personality artwork
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

This is an independent, free, non-commercial fan project and is not affiliated with, endorsed by, or sponsored by the NBA, EuroLeague, their teams, or their players. Player photography and team logos are third-party assets and are not covered by the MIT license. See [THIRD_PARTY_ASSETS.md](THIRD_PARTY_ASSETS.md). The repository does not include the previously saved article, personality artwork, analytics scripts, or restricted font.

## License

[MIT](LICENSE) for the original source code and documentation in this repository. The license does not grant rights to third-party photographs, artwork, names, logos, or trademarks.
