import { date } from "drizzle-orm/pg-core";
import { pgTable, uuid, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { vehicles } from "./VehicleSchema.js";
import { suppliers } from "./SupplierSchema.js";
import { relations } from "drizzle-orm";
import { drivers } from "./DriverSchema.js";

export const report = pgTable('report', {
    idReport: uuid('idReport').primaryKey().defaultRandom(),
    type: varchar('type', { length: 100 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    date: date('date').notNull(),
    idVehicle: uuid('idVehicle').notNull(),
    idSupplier: uuid('idSupplier').notNull(),
    idDriver: uuid('idDriver').notNull(),
    supplierRating: decimal('supplierRating', { precision: 3, scale: 2 }),


});
export const reportRelations = relations(report, ({ one }) => ({
    vehicle: one(vehicles, {
        fields: [report.idVehicle],
        references: [vehicles.id],
    }),
    supplier: one(suppliers, {
        fields: [report.idSupplier],
        references: [suppliers.id],
    }),
    driver: one(drivers, {
        fields: [report.idDriver],
        references: [drivers.id],
    }),
}));    



