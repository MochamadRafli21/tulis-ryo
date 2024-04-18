import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env['DB_URL'],
});

const db = drizzle(pool);

async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrations complete.');

  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

