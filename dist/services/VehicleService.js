import { db } from '../db/connection.js';
import { vehicles } from '../schema/VehicleSchema.js';
import { eq } from 'drizzle-orm';
// Fetch all vehicles
export async function getAllVehicles() {
    return await db.select().from(vehicles);
}
// Fetch a vehicle by ID
export async function getVehicleById(id) {
    return await db.select().from(vehicles).where(eq(vehicles.id, id));
}
// Add a new vehicle
export async function addVehicle(brand, model, year, registrationNumber, vin, status, currentMileage, fuelType, fuelCapacity, currentFuelLevel, averageFuelConsumption, lastMaintenanceDate, nextMaintenanceDate, gpsDeviceId, currentLocation, assignedDepartment, insuranceExpiryDate, registrationExpiryDate, purchaseDate, purchasePrice, residualValue) {
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
export async function updateVehicle(id, brand, model, year, registrationNumber, vin, status, currentMileage, fuelType, fuelCapacity, currentFuelLevel, averageFuelConsumption, lastMaintenanceDate, nextMaintenanceDate, gpsDeviceId, currentLocation, assignedDepartment, insuranceExpiryDate, registrationExpiryDate, purchaseDate, purchasePrice, residualValue) {
    return await db.update(vehicles).set({ brand,
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
        residualValue, }).where(eq(vehicles.id, id));
}
// Delete a vehicle
export async function deleteVehicle(id) {
    return await db.delete(vehicles).where(eq(vehicles.id, id));
}
