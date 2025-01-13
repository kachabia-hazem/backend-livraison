import { db } from '../db/connection.js';
import { insurance } from '../schema/InsuranceSchema.js';
import { eq } from 'drizzle-orm';

// Get all insurances
export async function getAllInsurances() {
  return await db.select().from(insurance);
}

// Get insurance by ID
export async function getInsuranceById(id: string) {
  return await db.select().from(insurance).where(eq(insurance.id, id));
}

// Add insurance
export async function addInsurance(
  vehicleId: string,
  type: string,
  provider: string,
  dateInsurence: string,
  insuranceExpiryDate: string,
  price: number,
): Promise<void> {
  try {
    console.log('insuranceExpiryDate',insuranceExpiryDate);
    const parseddateInsurence = new Date(dateInsurence);
    if (isNaN(parseddateInsurence.getTime())) {
        throw new Error('Invalid insurance expiry date');
    }
    const parsedInsuranceExpiryDate = new Date(insuranceExpiryDate);
    if (isNaN(parsedInsuranceExpiryDate.getTime())) {
        throw new Error('Invalid insurance expiry date');
    }
    await db.insert(insurance).values({
      vehicleId,
      type,
      provider,
      dateInsurence:parseddateInsurence,
      insuranceExpiryDate:parseddateInsurence,
      price: price.toString(), // Ensure price is passed as a string if required
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in addInsurance:', err.message);
      throw new Error('Failed to add insurance: ' + err.message);
    } else {
      console.error('Unknown error in addInsurance:', err);
      throw new Error('Failed to add insurance due to an unknown error');
    }
  }
}

// Update insurance
export async function updateInsurance(
  id: string,
  dateInsurence: Date,
  insuranceExpiryDate: Date,
  price: number,
  provider: string,
  type: string,
  vehicleId: string,
  updatedAt: Date
) {
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
export async function deleteInsurance(id: string) {
  return await db.delete(insurance).where(eq(insurance.id, id));
}
