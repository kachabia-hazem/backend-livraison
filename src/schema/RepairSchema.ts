import { create } from "domain";
import { pgTable, uuid, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { vehicles } from "./VehicleSchema.js";
import { drivers } from "./DriverSchema.js";
import { relations } from "drizzle-orm";

export const repair = pgTable('repair', {
    id: uuid('id').primaryKey().defaultRandom(),
    vehicleId: uuid('vehicleId').notNull(),
    driverId: uuid('driverId').notNull(),
    repairDate: timestamp('repairDate').notNull(),
    failureType: varchar('failureType', { length: 100 }).notNull(),
    repairCost: decimal('repairCost', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    });
    export const repairRelations = relations(repair, ({ one }) => ({
         vehicle: one(vehicles, {
            fields: [repair.vehicleId],
            references: [vehicles.id],
          }),
          driver: one(drivers, {
            fields: [repair.driverId],
            references: [drivers.id],
          })
        }));
