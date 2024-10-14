import * as orm from 'drizzle-orm/pg-core';

export const numbers = orm.pgTable('numbers', {
    id: orm.bigserial('id', { mode: 'number' }).primaryKey().notNull(),
    number: orm.bigint('number', { mode: 'number' }).notNull(),
    createdAt: orm.timestamp('createdAt').defaultNow().notNull(),
    updatedAt: orm.timestamp('updatedAt').defaultNow().notNull(),
});
