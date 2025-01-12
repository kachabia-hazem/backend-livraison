import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // Specify PostgreSQL as the database dialect
  schema: [
    "./dist/schema/MaintenanceSchema.js",
    "./dist/schema/SupplierSchema.js",
    "./dist/schema/DriverSchema.js",
    "./dist/schema/UserSchema.js",
    "./dist/schema/JourneySchema.js",
    "./dist/schema/VehicleSchema.js",
    "./dist/schema/RepairSchema.js",
    "./dist/schema/ReportSchema.js",
    "./dist/schema/SectorSchema.js",
    "./dist/schema/InsuranceSchema.js",
  ], // Paths to compiled schema files
  out: "./drizzle/migrations", // Directory for migration files
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "hazem",
    password: "hazem123",
    database: "livraison",
    ssl: false,
  },
  migrations: {
    table: "my_migrations_table", // Optional: Change default migrations table name
    schema: "public", // Specify the schema (only for PostgreSQL)
  },
});
