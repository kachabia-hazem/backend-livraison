import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { drivers } from './DriverSchema.js'; // Ensure .js extension is included
import { userRoleEnum, userStatusEnum } from './enums.js';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('firstName', { length: 100 }).notNull(),
  lastName: varchar('lastName', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  phoneNumber: varchar('phoneNumber', { length: 20 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  postalCode: varchar('postalCode', { length: 20 }),
  role: userRoleEnum('role').notNull().default('USER'),
  department: varchar('department', { length: 100 }),
  emergencyContact: varchar('emergencyContact', { length: 100 }),
  lastLoginAt: timestamp('lastLoginAt'),
  status: userStatusEnum('status').notNull().default('ACTIVE'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  driver: one(drivers, {
    fields: [users.id],
    references: [drivers.userId],
  }),
}));
