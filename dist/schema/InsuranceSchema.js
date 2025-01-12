import { uuid } from "drizzle-orm/pg-core";
import { pgTable, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { vehicles } from "./VehicleSchema.js";
import { relations } from "drizzle-orm";
export const insurance = pgTable('insurance', {
    id: uuid('id').primaryKey().defaultRandom(),
    vehicleId: uuid('vehicleId').notNull(),
    type: varchar('type', { length: 100 }).notNull(),
    provider: varchar('provider', { length: 100 }).notNull(),
    dateInsurence: timestamp('dateInsurence').notNull(),
    insuranceExpiryDate: timestamp('insuranceExpiryDate').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
export const insuranceRelations = relations(insurance, ({ one }) => ({
    vehicle: one(vehicles, {
        fields: [insurance.vehicleId],
        references: [vehicles.id],
    }),
}));
