import { db } from '../db/connection.js'; // Ensure `.js` extension is added
import { drivers } from '../schema/DriverSchema.js'; // Ensure `.js` extension is added
import { eq } from 'drizzle-orm'; // Import eq for conditional queries
export async function getAllDrivers() {
    try {
        console.log('Fetching all drivers');
        const result = await db.select().from(drivers);
        console.log('Drivers fetched successfully:', result);
        return result;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in getAllDrivers:', err.message);
            throw new Error('Failed to fetch drivers: ' + err.message);
        }
        else {
            console.error('Unknown error in getAllDrivers:', err);
            throw new Error('Failed to fetch drivers due to an unknown error');
        }
    }
}
export async function getDriverById(id) {
    try {
        console.log('Fetching driver by ID:', id);
        const result = await db.select().from(drivers).where(eq(drivers.id, id));
        if (result.length === 0) {
            console.log('No driver found with ID:', id);
            return null;
        }
        console.log('Driver fetched successfully:', result[0]);
        return result[0];
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in getDriverById:', err.message);
            throw new Error('Failed to fetch driver: ' + err.message);
        }
        else {
            console.error('Unknown error in getDriverById:', err);
            throw new Error('Failed to fetch driver due to an unknown error');
        }
    }
}
export async function addDriver(userId, licenseNumber, licenseType, licenseExpiry, rating, totalDrivingHours, restHours, certifications, medicalClearance, preferredVehicles) {
    try {
        await db.insert(drivers).values({
            licenseExpiry,
            licenseNumber,
            licenseType,
            status,
            userId,
            certifications,
        });
        console.log('Driver added successfully');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in addDriver:', err.message);
            throw new Error('Failed to add driver: ' + err.message);
        }
        else {
            console.error('Unknown error in addDriver:', err);
            throw new Error('Failed to add driver due to an unknown error');
        }
    }
}
export async function updateDriver(id, userId, licenseNumber, licenseType, licenseExpiry, certifications, medicalClearance, preferredVehicles) {
    try {
        const result = await db
            .update(drivers)
            .set({
            certifications,
            licenseExpiry,
            id,
            licenseNumber,
            licenseType,
            medicalClearance,
            preferredVehicles,
            status,
            userId,
        })
            .where(eq(drivers.id, id));
        if (result.rowCount == 0) {
            console.log('No driver found to update with ID:', id);
            throw new Error('Driver not found');
        }
        console.log('Driver updated successfully');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in updateDriver:', err.message);
            throw new Error('Failed to update driver: ' + err.message);
        }
        else {
            console.error('Unknown error in updateDriver:', err);
            throw new Error('Failed to update driver due to an unknown error');
        }
    }
}
export async function deleteDriver(id) {
    try {
        console.log('Attempting to delete driver with ID:', id);
        const result = await db.delete(drivers).where(eq(drivers.id, id));
        if (result.rowCount === 0) {
            console.log('No driver found to delete with ID:', id);
            throw new Error('Driver not found');
        }
        console.log('Driver deleted successfully');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in deleteDriver:', err.message);
            throw new Error('Failed to delete driver: ' + err.message);
        }
        else {
            console.error('Unknown error in deleteDriver:', err);
            throw new Error('Failed to delete driver due to an unknown error');
        }
    }
}
