#!/usr/bin/env node

import { spawn } from 'child_process';

// Set CI environment variable to prevent interactive prompts
process.env.CI = 'true';

// Run payload migrate command
const migrate = spawn('npx', ['payload', 'migrate'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    CI: 'true',
    FORCE_COLOR: '0',
  },
});

migrate.on('close', (code) => {
  if (code !== 0) {
    console.error(`Migration process exited with code ${code}`);
    process.exit(code);
  }
  console.log('Migrations completed successfully');
  process.exit(0);
});

migrate.on('error', (err) => {
  console.error('Failed to start migration process:', err);
  process.exit(1);
});