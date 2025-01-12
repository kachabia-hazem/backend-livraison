import { db } from '../db/connection.js';
import { sectors } from '../schema/SectorSchema.js';
import { eq } from 'drizzle-orm';
export async function getAllSectors() {
    return await db.select().from(sectors);
}
export async function getSectorById(id) {
    return await db.select().from(sectors).where(eq(sectors.id, id.toString()));
}
export async function addSector(name, city, delegation, idVehicle, createdAt) {
    return await db.insert(sectors).values({
        name,
        city,
        delegation,
        idVehicle,
        createdAt,
    }).returning();
}
export async function updateSector(id, name, city, delegation, idVehicle, updatedAt) {
    return await db.update(sectors).set({ name,
        city,
        delegation,
        idVehicle,
        updatedAt }).where(eq(sectors.id, id.toString()));
}
export async function deleteSector(id) {
    return await db.delete(sectors).where(eq(sectors.id, id.toString()));
}
