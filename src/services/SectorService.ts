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
        createdAt:Date,

    ) {
        return await db.insert(sectors).values({
            name,
            city,
            delegation,
            idVehicle,
            createdAt,
        }).returning();
    }
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
