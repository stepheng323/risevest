import fs from 'fs'
import path from 'path'
import { pool } from '../lib';


async function runMigrations() {
  const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'));
  migrationFiles.sort()

  for (const file of migrationFiles) {
    const migration = require(path.join(__dirname, 'migrations', file));
    console.log(`Applying migration: ${file}`);
    await migration.up();
  }
}

runMigrations()
  .then(() => {
    console.log('Migrations completed');
    pool.end();
  })
  .catch((error) => {
    console.error('Error running migrations:', error);
    pool.end(); 
  });

