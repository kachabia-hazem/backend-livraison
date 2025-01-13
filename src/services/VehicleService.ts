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
    status: 'ACTIVE' | 'MAINTENANCE' | 'RETIRED' | 'IN_USE',
    currentMileage: string,
    fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID',
    fuelCapacity: string,
    currentFuelLevel: string,
    averageFuelConsumption: string,
    lastMaintenanceDate: string ,
    nextMaintenanceDate: string ,
    gpsDeviceId: string ,
    currentLocation: { lat: number; lng: number } | null,
    assignedDepartment: string | null,
    insuranceExpiryDate: string,
    registrationExpiryDate: string,
    purchaseDate: string,
    purchasePrice: string | null,
    residualValue: string | null
) {
    // Validate lastMaintenanceDate
    // if (lastMaintenanceDate) {
        const parsedLastMaintenanceDate = new Date(lastMaintenanceDate);
        if (isNaN(parsedLastMaintenanceDate.getTime())) {
            throw new Error('Invalid last maintenance date');
        }
    // }

    // Validate nextMaintenanceDate
    // if (nextMaintenanceDate) {
        const parsedNextMaintenanceDate = new Date(nextMaintenanceDate);
        if (isNaN(parsedNextMaintenanceDate.getTime())) {
            throw new Error('Invalid next maintenance date');
        }
    // }

    // Validate insuranceExpiryDate
    // if (insuranceExpiryDate) {
        const parsedInsuranceExpiryDate = new Date(insuranceExpiryDate);
        if (isNaN(parsedInsuranceExpiryDate.getTime())) {
            throw new Error('Invalid insurance expiry date');
        }
    // }

    // Validate registrationExpiryDate
    // if (registrationExpiryDate) {
        const parsedRegistrationExpiryDate = new Date(registrationExpiryDate);
        if (isNaN(parsedRegistrationExpiryDate.getTime())) {
            throw new Error('Invalid registration expiry date');
        }
    // }

    // Validate purchaseDate
    // if (purchaseDate) {
        const parsedPurchaseDate = new Date(purchaseDate);
        if (isNaN(parsedPurchaseDate.getTime())) {
            throw new Error('Invalid purchase date');
        }
    // }

    try {
        return await db.insert(vehicles).values({
            brand,
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
            lastMaintenanceDate:parsedLastMaintenanceDate,
            nextMaintenanceDate:parsedNextMaintenanceDate,
            gpsDeviceId,
            currentLocation,
            assignedDepartment,
            insuranceExpiryDate:parsedInsuranceExpiryDate,
            registrationExpiryDate:parsedRegistrationExpiryDate,
            purchaseDate:parsedPurchaseDate,
            purchasePrice,
            residualValue,
        });
    } catch (error) {
        console.error('Error adding vehicle:', error);
        throw new Error('Failed to add vehicle. Please check the input data or database connection.');
    }
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
