import { db } from '../db/connection.js';
import { insurance } from '../schema/InsuranceSchema.js';
import { eq } from 'drizzle-orm';
// Get all insurances
export async function getAllInsurances() {
    return await db.select().from(insurance);
}
// Get insurance by ID
export async function getInsuranceById(id) {
    return await db.select().from(insurance).where(eq(insurance.id, id));
}
// Add insurance
export async function addInsurance(dateInsurence, insuranceExpiryDate, price, provider, type, vehicleId, createdAt, updatedAt) {
    try {
        await db.insert(insurance).values({
            vehicleId,
            type,
            provider,
            dateInsurence,
            insuranceExpiryDate,
            price: price.toString(), // Ensure price is passed as a string if required
            createdAt,
            updatedAt,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in addInsurance:', err.message);
            throw new Error('Failed to add insurance: ' + err.message);
        }
        else {
            console.error('Unknown error in addInsurance:', err);
            throw new Error('Failed to add insurance due to an unknown error');
        }
    }
}
// Update insurance
export async function updateInsurance(id, dateInsurence, insuranceExpiryDate, price, provider, type, vehicleId, updatedAt) {
    return await db
        .update(insurance)
        .set({
        dateInsurence,
        insuranceExpiryDate,
        price: price.toString(), // Ensure price is passed as a string if required
        provider,
        type,
        vehicleId,
        updatedAt,
    })
        .where(eq(insurance.id, id));
}
// Delete insurance
export async function deleteInsurance(id) {
    return await db.delete(insurance).where(eq(insurance.id, id));
}
