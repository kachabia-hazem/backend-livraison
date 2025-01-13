import { db } from '../db/connection.js';
import { suppliers } from '../schema/SupplierSchema.js';
import { eq } from 'drizzle-orm';


export async function getAllSuppliers() {
        return await db.select().from(suppliers);
    }
export async function getSupplierById(id: number) {
        return await db.select().from(suppliers).where(eq(suppliers.id, id.toString()));
    }
export async function addSupplier(
        name: string,
        address: string,
        contact: string,
        service: string,
        overallRating:string,

    ) {
        try{
            if (isNaN(Number(overallRating))) {
                throw new Error('Invalid overall rating');
            }
        

        return await db.insert(suppliers).values({
            name,
            address,
            contact,
            service,
            overallRating,
        }).returning();
    } catch (err) {
        if (err instanceof Error) {
          console.error('Error in Supplier:', err.message);
          throw new Error('Failed to add insurance: ' + err.message);
        } else {
          console.error('Unknown error in addInsurance:', err);
          throw new Error('Failed to add insurance due to an unknown error');
        }
      }
    }
export async function updateSupplier(id: number, 
        name: string,
        address: string,
        contact: string,
        service: string,
        overallRating: string,
    ) {
        return await db.update(suppliers).set({
            name,
            address,
            contact,
            service,
            overallRating}).where(eq(suppliers.id, id.toString()));
    }
export async function deleteSupplier(id: number) {
        return await db.delete(suppliers).where(eq(suppliers.id, id.toString()));
    }
