-- Create ENUM types
CREATE TYPE "userRole" AS ENUM ('USER', 'ADMIN', 'DRIVER');
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE "journeyStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');
CREATE TYPE "vehicleStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNDER_REPAIR');
CREATE TYPE "fuelType" AS ENUM ('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- Create suppliers table
CREATE TABLE "suppliers" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(100) NOT NULL,
    "address" varchar(255) NOT NULL,
    "contact" varchar(20) NOT NULL,
    "service" varchar(100) NOT NULL,
    "overallRating" numeric(3, 2),
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Create drivers table
CREATE TABLE "drivers" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "userId" uuid NOT NULL,
    "licenseNumber" varchar(50) NOT NULL,
    "licenseType" json NOT NULL,
    "licenseExpiry" timestamp NOT NULL,
    "status" "userStatus" DEFAULT 'ACTIVE' NOT NULL,
    "rating" numeric(3, 2),
    "totalDrivingHours" numeric(10, 2),
    "restHours" numeric(10, 2),
    "certifications" json,
    "medicalClearance" timestamp,
    "preferredVehicles" json,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Create users table
CREATE TABLE "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "firstName" varchar(100) NOT NULL,
    "lastName" varchar(100) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "phoneNumber" varchar(20),
    "address" text,
    "city" varchar(100),
    "postalCode" varchar(20),
    "role" "userRole" DEFAULT 'USER' NOT NULL,
    "department" varchar(100),
    "emergencyContact" varchar(100),
    "lastLoginAt" timestamp,
    "status" "userStatus" DEFAULT 'ACTIVE' NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Create journeys table
CREATE TABLE "journeys" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "start_date_time" timestamp NOT NULL,
    "end_date_time" timestamp,
    "start_location" json NOT NULL,
    "end_location" json,
    "planned_route" json,
    "actual_route" json,
    "distance_covered" numeric(10, 2),
    "status" "journeyStatus" DEFAULT 'PLANNED' NOT NULL,
    "driver_id" uuid NOT NULL,
    "vehicle_id" uuid NOT NULL,
    "purpose" text,
    "fuel_consumed" numeric(10, 2),
    "cost_allocation" varchar(100),
    "weather_conditions" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create vehicles table
CREATE TABLE "vehicles" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "brand" varchar(100) NOT NULL,
    "model" varchar(100) NOT NULL,
    "year" integer NOT NULL,
    "registrationNumber" varchar(50) NOT NULL,
    "vin" varchar(17) NOT NULL,
    "status" "vehicleStatus" DEFAULT 'ACTIVE' NOT NULL,
    "currentMileage" numeric(10, 2),
    "fuelType" "fuelType" NOT NULL,
    "fuelCapacity" numeric(10, 2),
    "currentFuelLevel" numeric(10, 2),
    "averageFuelConsumption" numeric(10, 2),
    "lastMaintenanceDate" timestamp,
    "nextMaintenanceDate" timestamp,
    "gpsDeviceId" varchar(100),
    "currentLocation" json,
    "assignedDepartment" varchar(100),
    "insuranceExpiryDate" timestamp,
    "registrationExpiryDate" timestamp,
    "purchaseDate" timestamp,
    "purchasePrice" numeric(10, 2),
    "residualValue" numeric(10, 2),
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "vehicles_registrationNumber_unique" UNIQUE("registrationNumber"),
    CONSTRAINT "vehicles_vin_unique" UNIQUE("vin")
);

-- Create repair table
CREATE TABLE "repair" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "vehicleId" uuid NOT NULL,
    "driverId" uuid NOT NULL,
    "repairDate" timestamp NOT NULL,
    "failureType" varchar(100) NOT NULL,
    "repairCost" numeric(10, 2) NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Create report table
CREATE TABLE "report" (
    "idReport" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "type" varchar(100) NOT NULL,
    "description" varchar(255) NOT NULL,
    "date" date NOT NULL,
    "idVehicle" uuid NOT NULL,
    "idSupplier" uuid NOT NULL,
    "idDriver" uuid NOT NULL,
    "supplierRating" numeric(3, 2)
);

-- Create sectors table
CREATE TABLE "sectors" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(100) NOT NULL,
    "city" varchar(100) NOT NULL,
    "delegation" varchar(100) NOT NULL,
    "idVehicle" uuid NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Create insurance table
CREATE TABLE "insurance" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "vehicleId" uuid NOT NULL,
    "type" varchar(100) NOT NULL,
    "provider" varchar(100) NOT NULL,
    "dateInsurence" timestamp NOT NULL,
    "insuranceExpiryDate" timestamp NOT NULL,
    "price" numeric(10, 2) NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

-- Foreign key constraints
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
