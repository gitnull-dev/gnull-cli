import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { api, type Contributor } from "../api.js";

export const whoamiCommand = new Command("whoami")
  .description("Show your DID identity and wallet address")
  .option("--wallet <address>", "Wallet address to look up")
  .option("--json", "Output raw JSON")
  .action(async (opts) => {
    const walletAddress = opts.wallet ?? process.env.GNULL_WALLET;
    if (!walletAddress) {
      console.log(chalk.yellow("  No wallet configured."));
      console.log(chalk.gray("  Set GNULL_WALLET env var or use --wallet <address>"));
      return;
    }
    const spin = ora("Fetching identity…").start();
    try {
      const contributors = await api.get<Contributor[]>("/api/contributors");
      const c = contributors.find(x => x.walletAddress?.toLowerCase() === walletAddress.toLowerCase());
      spin.stop();
      if (!c) { console.log(chalk.red(`  No contributor found for ${walletAddress}`)); return; }
      if (opts.json) { console.log(JSON.stringify(c, null, 2)); return; }
      console.log();
      console.log(`  ${chalk.bold.white(c.username)}`);
      console.log(`  ${chalk.gray("DID:")}         did:pkh:eip155:1:${chalk.green(c.walletAddress)}`);
      console.log(`  ${chalk.gray("wallet:")}      ${chalk.green(c.walletAddress)}`);
      console.log(`  ${chalk.gray("reputation:")}  ${chalk.cyan(c.reputation)}`);
      console.log(`  ${chalk.gray("$GNULL:")}      ${chalk.yellow(c.gnullBalance)}`);
      console.log(`  ${chalk.gray("PRs merged:")} ${c.prsMerged}`);
      console.log();
    } catch (e) { spin.fail(String(e)); process.exit(1); }
  });
