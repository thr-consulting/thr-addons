#!/usr/bin/env node

import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the actual bash script
const shScript = path.join(__dirname, 'thx.sh');

// Pass all arguments directly through to bash
const result = spawnSync('bash', [shScript, ...process.argv.slice(2)], {
	stdio: 'inherit',
	env: process.env,
});

process.exit(result.status ?? 0);
