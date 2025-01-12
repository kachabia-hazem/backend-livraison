import { pgTable, uuid, varchar, timestamp, decimal, integer, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { journeys } from './JourneySchema.js';
import { maintenance } from './MaintenanceShema.js';
//import { expenses } from './expense.model';
import { vehicleStatusEnum, fuelTypeEnum } from './enums.js';
export const vehicles = pgTable('vehicles', {
  id: uuid('id').primaryKey().defaultRandom(),
  brand: varchar('brand', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  registrationNumber: varchar('registrationNumber', { length: 50 }).notNull().unique(),
  vin: varchar('vin', { length: 17 }).notNull().unique(),
  status: vehicleStatusEnum('status').notNull().default('ACTIVE'),
  currentMileage: decimal('currentMileage', { precision: 10, scale: 2 }),
  fuelType: fuelTypeEnum('fuelType').notNull(),
  fuelCapacity: decimal('fuelCapacity', { precision: 10, scale: 2 }),
  currentFuelLevel: decimal('currentFuelLevel', { precision: 10, scale: 2 }),
  averageFuelConsumption: decimal('averageFuelConsumption', { precision: 10, scale: 2 }),
  lastMaintenanceDate: timestamp('lastMaintenanceDate'),
  nextMaintenanceDate: timestamp('nextMaintenanceDate'),
  gpsDeviceId: varchar('gpsDeviceId', { length: 100 }),
  currentLocation: json('currentLocation').$type<{ lat: number; lng: number }>(),
  assignedDepartment: varchar('assignedDepartment', { length: 100 }),
  insuranceExpiryDate: timestamp('insuranceExpiryDate'),
  registrationExpiryDate: timestamp('registrationExpiryDate'),
  purchaseDate: timestamp('purchaseDate'),
  purchasePrice: decimal('purchasePrice', { precision: 10, scale: 2 }),
  residualValue: decimal('residualValue', { precision: 10, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
export const vehiclesRelations = relations(vehicles, ({ many }) => ({
  journeys: many(journeys),
  maintenance: many(maintenance),
  //expenses: many(expenses),
}));