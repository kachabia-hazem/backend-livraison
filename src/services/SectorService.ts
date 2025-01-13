import { db } from '../db/connection.js';
import { sectors } from '../schema/SectorSchema.js';
import { eq } from 'drizzle-orm';


export async function getAllSectors() {
        return await db.select().from(sectors);
    }
export async function getSectorById(id: number) {
        return await db.select().from(sectors).where(eq(sectors.id, id.toString()));
    }
export async function addSector(
        name: string,
        city: string,
        delegation: string,
        idVehicle: string,

    ) {
        try
        {
         
        return await db.insert(sectors).values({
            name,
            city,
            delegation,
            idVehicle,
        }).returning();
    } catch (err) {
        if (err instanceof Error) {
          console.error('Error in Sector:', err.message);
          throw new Error('Failed to add insurance: ' + err.message);
        } else {
          console.error('Unknown error in addInsurance:', err);
          throw new Error('Failed to add insurance due to an unknown error');
        }
      }}    

export async function updateSector(id: number, 
        name: string,
        city: string,
        delegation: string,
        idVehicle: string,
        updatedAt:Date
    ) {
        return await db.update(sectors).set({name,
            city,
            delegation,
            idVehicle,
            updatedAt}).where(eq(sectors.id, id.toString()));
    }
export async function deleteSector(id: number) {
        return await db.delete(sectors).where(eq(sectors.id, id.toString()));
    }
