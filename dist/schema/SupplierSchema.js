import { pgTable, uuid, varchar, decimal, timestamp } from 'drizzle-orm/pg-core';
export const suppliers = pgTable('suppliers', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    address: varchar('address', { length: 255 }).notNull(),
    contact: varchar('contact', { length: 20 }).notNull(),
    service: varchar('service', { length: 100 }).notNull(),
    overallRating: decimal('overallRating', { precision: 3, scale: 2 }),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
