import { Command } from "commander";
import chalk from "chalk";
import { printBanner } from "./banner.js";
import { repoCommand } from "./commands/repo.js";
import { prCommand } from "./commands/pr.js";
import { issueCommand } from "./commands/issue.js";
import { bountyCommand } from "./commands/bounty.js";
import { agentCommand } from "./commands/agent.js";
import { nodeCommand } from "./commands/node.js";
import { configCommand } from "./commands/config-cmd.js";
import { whoamiCommand } from "./commands/whoami.js";

const program = new Command();

program
  .name("gnull")
  .description("GitNull CLI — onchain-native git collaboration")
  .version("0.1.1")
  .addHelpText("before", () => { printBanner(); return ""; });

program.addCommand(repoCommand);
program.addCommand(prCommand);
program.addCommand(issueCommand);
program.addCommand(bountyCommand);
program.addCommand(agentCommand);
program.addCommand(nodeCommand);
program.addCommand(configCommand);
program.addCommand(whoamiCommand);

program.action(() => {
  printBanner();
  console.log(chalk.bold("Commands:"));
  console.log(`  ${chalk.green("repo")}     Manage repositories`);
  console.log(`  ${chalk.green("pr")}       Pull request workflow`);
  console.log(`  ${chalk.green("issue")}    Issue tracker`);
  console.log(`  ${chalk.green("bounty")}   $GNULL bounty board`);
  console.log(`  ${chalk.green("agent")}    AI agents (powered by openclaude)`);
  console.log(`  ${chalk.green("node")}     gitlawb network status`);
  console.log(`  ${chalk.green("config")}   CLI configuration`);
  console.log(`  ${chalk.green("whoami")}   Show DID identity`);
  console.log();
  console.log(chalk.gray("Run " + chalk.white("gnull <command> --help") + " for usage."));
});

program.parse(process.argv);
