import { uuid } from "drizzle-orm/pg-core";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { vehicles } from "./VehicleSchema.js";
import { relations } from "drizzle-orm";

export const sectors = pgTable('sectors', {
    id:uuid('id').primaryKey().defaultRandom(),
    name:varchar('name',{length:100}).notNull(),
    city:varchar('city',{length:100}).notNull(),
    delegation:varchar('delegation',{length:100}).notNull(),
    idVehicle:uuid('idVehicle').notNull(), 
    createdAt:timestamp('createdAt').notNull().defaultNow(),
    updatedAt:timestamp('updatedAt').notNull().defaultNow(),
});
export const sectorsRelations = relations(sectors, ({ one }) => ({
    vehicle: one(vehicles, {
        fields: [sectors.idVehicle],
        references: [vehicles.id],
    }),
}));
