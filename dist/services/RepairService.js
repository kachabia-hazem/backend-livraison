import { db } from '../db/connection.js';
import { repair } from '../schema/RepairSchema.js';
import { eq } from 'drizzle-orm';
export async function getAllRepairs() {
    return await db.select().from(repair);
}
export async function getRepairById(id) {
    return await db.select().from(repair).where(eq(repair.id, id.toString()));
}
export async function addRepair(driverId, failureType, repairCost, repairDate, vehicleId, createdAt, updatedAt) {
    return await db.insert(repair).values({
        driverId,
        failureType,
        repairCost,
        repairDate,
        vehicleId,
        createdAt,
        updatedAt
    });
}
export async function updateRepair(id, driverId, failureType, repairCost, repairDate, vehicleId, createdAt, updatedAt) {
    return await db.update(repair).set({
        driverId,
        failureType,
        repairCost,
        repairDate,
        vehicleId,
        createdAt,
        updatedAt
    }).where(eq(repair.id, id.toString()));
}
export async function deleteRepair(id) {
    return await db.delete(repair).where(eq(repair.id, id.toString()));
}
