import { pgTable, uuid, varchar, timestamp, text, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { drivers } from './DriverSchema.js';
import { userRoleEnum, userStatusEnum } from './enums.js';
import { vehicles } from './VehicleSchema.js';
export const maintenance = pgTable('maintenance', {
    id: uuid('id').primaryKey().defaultRandom(),
    vehicleId: uuid('vehicleId').notNull(),
    maintenanceDate: timestamp('maintenanceDate').notNull(),
    maintenanceType: varchar('maintenanceType', { length: 100 }).notNull(),
    maintenanceCost: decimal('maintenanceCost', { precision: 10, scale: 2 }).notNull(),
    maintenanceDescription: varchar('maintenanceDescription', { length: 255 }),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
export const maintenanceRelations = relations(maintenance, ({ one }) => ({
    vehicle: one(vehicles, {
        fields: [maintenance.vehicleId],
        references: [vehicles.id],
    })
}));
