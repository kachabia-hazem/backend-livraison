import { db } from '../db/connection.js';
import { vehicles } from '../schema/VehicleSchema.js';
import { eq } from 'drizzle-orm';

// Fetch all vehicles
export async function getAllVehicles() {
    return await db.select().from(vehicles);
}

// Fetch a vehicle by ID
export async function getVehicleById(id: string) {
    return await db.select().from(vehicles).where(eq(vehicles.id, id));
}

// Add a new vehicle
export async function addVehicle(
    brand: string,
    model: string,
    year: number,
    registrationNumber: string,
    vin: string,
    status: 'ACTIVE'| 'MAINTENANCE'| 'RETIRED'|'IN_USE',
    currentMileage:string,
    fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID',
    fuelCapacity: string,
    currentFuelLevel: string,
    averageFuelConsumption: string,
    lastMaintenanceDate: Date | null,
    nextMaintenanceDate: Date | null,
    gpsDeviceId: string | null,
    currentLocation: { lat: number; lng: number } | null,
    assignedDepartment: string | null,
    insuranceExpiryDate: Date | null,
    registrationExpiryDate: Date | null,
    purchaseDate: Date | null,
    purchasePrice: string | null,
    residualValue: string | null
) {
    return await db.insert(vehicles).values({
        brand,
        fuelType,
        model,
        year,
        registrationNumber,
        vin,
        assignedDepartment,
        averageFuelConsumption,
        currentFuelLevel,
        currentLocation,
        fuelCapacity,
        gpsDeviceId,
        lastMaintenanceDate,
        nextMaintenanceDate,
        purchaseDate,
        insuranceExpiryDate,
        purchasePrice,
        registrationExpiryDate,
        residualValue,
        currentMileage,
        status,        
    }).returning();
}

// Update an existing vehicle
export async function updateVehicle(
    id: string,
        brand: string,
        model: string,
        year: number,
        registrationNumber: string,
        vin: string,
        status: 'ACTIVE'|'MAINTENANCE' |'RETIRED'| 'IN_USE',
        currentMileage: string,
        fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID',
        fuelCapacity: string,
        currentFuelLevel: string,
        averageFuelConsumption: string,
        lastMaintenanceDate: Date,
        nextMaintenanceDate: Date,
        gpsDeviceId: string,
        currentLocation: { lat: number; lng: number },
        assignedDepartment: string,
        insuranceExpiryDate: Date,
        registrationExpiryDate: Date,
        purchaseDate: Date,
        purchasePrice: string,
        residualValue: string,
) {
    return await db.update(vehicles).set({brand,
        model,
        year,
        registrationNumber,
        vin,
        status,
        currentMileage,
        fuelType,
        fuelCapacity,
        currentFuelLevel,
        averageFuelConsumption,
        lastMaintenanceDate,
        nextMaintenanceDate,
        gpsDeviceId,
        currentLocation,
        assignedDepartment,
        insuranceExpiryDate,
        registrationExpiryDate,
        purchaseDate,
        purchasePrice,
        residualValue,}).where(eq(vehicles.id, id));
}

// Delete a vehicle
export async function deleteVehicle(id: string) {
    return await db.delete(vehicles).where(eq(vehicles.id, id));
}
