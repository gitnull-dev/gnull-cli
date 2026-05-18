# gnull CLI

> Official CLI for [GitNull](https://gitnull.xyz) — clone repos, open PRs, run AI agents, post bounties, all from your terminal.

[![npm](https://img.shields.io/npm/v/@gitnullxyz/gnull)](https://www.npmjs.com/package/@gitnullxyz/gnull)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

**[gitnull.xyz](https://gitnull.xyz)** · [Docs](https://gitnull.xyz/docs) · [npm](https://www.npmjs.com/package/@gitnullxyz/gnull)

---

## Installation

```bash
npm install -g @gitnullxyz/gnull
```

---

## Commands

| Command | Description |
|---------|-------------|
| `gnull whoami` | Show your DID identity and wallet address |
| `gnull repo list` | List all repositories |
| `gnull repo info <owner/repo>` | Show repo details + onchain address |
| `gnull repo create <name>` | Create a new repository |
| `gnull pr list <owner/repo>` | List pull requests |
| `gnull pr create <owner/repo>` | Open a new pull request |
| `gnull pr merge <owner/repo> <n>` | Merge PR and mint onchain proof NFT |
| `gnull issue list <owner/repo>` | List open issues |
| `gnull bounty list` | Browse the \$GNULL bounty board |
| `gnull bounty post <issue-id>` | Post \$GNULL on an issue |
| `gnull agent run <owner/repo>` | Run openclaude AI agent on a repo |
| `gnull agent status <owner/repo>` | Check agent status and last scan |
| `gnull node status` | Show gitlawb network node status |
| `gnull config set <key> <value>` | Set CLI configuration |

---

## Usage

### Authenticate

```bash
gnull whoami
# ● DID: did:pkh:eip155:1:0x71C7656EC7ab88b098defB751B7401B5f6d8976F
# ● wallet: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
# ● reputation: 420  ● \$GNULL balance: 650
```

### Open a PR and merge (mints onchain proof)

```bash
gnull pr create gitnull/core-protocol --title "fix: reentrancy guard in BountyEscrow"
gnull pr merge gitnull/core-protocol 42
# ✓ PR #42 merged  ✓ Onchain proof minted: 0x9f3a...c1b2
```

### Run an AI agent scan

```bash
gnull agent run gitnull/core-protocol
# ⚠ [MEDIUM] Exposed private key pattern in scripts/deploy.ts:14
# ✓ No CVEs found in dependencies  ✓ No reentrancy vulnerabilities detected
```

### Post a bounty

```bash
gnull bounty post 7 --amount 500
# ✓ 500 \$GNULL locked in BountyEscrow  ✓ Escrow tx: 0x4a7b...8c9d
```

---

## Source Structure

```
src/
├── index.ts          # CLI entrypoint
├── api.ts            # GitNull REST API client
├── banner.ts         # ASCII banner
├── config.ts         # Config (~/.gnull/config.json)
└── commands/
    ├── repo.ts       # gnull repo *
    ├── pr.ts         # gnull pr *
    ├── issue.ts      # gnull issue *
    ├── bounty.ts     # gnull bounty *
    ├── agent.ts      # gnull agent *
    ├── node.ts       # gnull node *
    ├── whoami.ts     # gnull whoami
    └── config-cmd.ts # gnull config *
```

Built with TypeScript (ESM) + esbuild.

---

## License

MIT © [GitNull Protocol Labs](https://gitnull.xyz)
