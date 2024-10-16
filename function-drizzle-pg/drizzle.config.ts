import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    dialect: 'postgresql',
    out: './',
    schema: './schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    // Print all statements
    verbose: true,
    // Always ask for confirmation
    strict: true,
} satisfies Config;
