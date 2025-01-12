import { pgTable, uuid, varchar, timestamp, decimal, text, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { drivers } from './DriverSchema.js';
import { vehicles } from './VehicleSchema.js';
//import { expenses } from './expense.model';
import { journeyStatusEnum } from './enums.js';
export const journeys = pgTable('journeys', {
  id: uuid('id').primaryKey().defaultRandom(),
  startDateTime: timestamp('start_date_time').notNull(),
  endDateTime: timestamp('end_date_time'),
  startLocation: json('start_location').notNull().$type<{ lat: number; lng: number }>(),
  endLocation: json('end_location').$type<{ lat: number; lng: number }>(),
  plannedRoute: json('planned_route'),
  actualRoute: json('actual_route'),
  distanceCovered: decimal('distance_covered', { precision: 10, scale: 2 }),
  status: journeyStatusEnum('status').notNull().default('PLANNED'),
  driverId: uuid('driver_id').references(() => drivers.id).notNull(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  purpose: text('purpose'),
  fuelConsumed: decimal('fuel_consumed', { precision: 10, scale: 2 }),
  costAllocation: varchar('cost_allocation', { length: 100 }),
  weatherConditions: text('weather_conditions'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
export const journeysRelations = relations(journeys, ({ one, many }) => ({
  driver: one(drivers, {
    fields: [journeys.driverId],
    references: [drivers.id],
  }),
  vehicle: one(vehicles, {
    fields: [journeys.vehicleId],
    references: [vehicles.id],
  }),
 // expenses: many(expenses),
}));