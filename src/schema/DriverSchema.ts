import { pgTable, uuid, varchar, timestamp, decimal, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './UserSchema.js';
import { journeys } from './JourneySchema.js';

export const drivers = pgTable('drivers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').references(() => users.id).notNull(),
  licenseNumber: varchar('licenseNumber', { length: 50 }).notNull(),
  licenseType: json('licenseType').notNull().$type<string[]>(),
  licenseExpiry: timestamp('licenseExpiry').notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  totalDrivingHours: decimal('totalDrivingHours', { precision: 10, scale: 2 }),
  restHours: decimal('restHours', { precision: 10, scale: 2 }),
  certifications: json('certifications').$type<string[]>(),
  medicalClearance: timestamp('medicalClearance'),
  preferredVehicles: json('preferredVehicles').$type<string[]>(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const driversRelations = relations(drivers, ({ one, many }) => ({
  user: one(users, {
    fields: [drivers.userId],
    references: [users.id],
  }),
  journeys: many(journeys),
}));
