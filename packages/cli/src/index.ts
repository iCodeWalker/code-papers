#!/usr/bin/env node

import { program } from "commander";
import { startAppCommand } from "./commands/start-app";

program.addCommand(startAppCommand);

program.parse(process.argv);
