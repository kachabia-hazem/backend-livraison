import { db } from '../db/connection.js';
import { maintenance } from '../schema/MaintenanceShema.js';
import { eq } from 'drizzle-orm';



export async function getAllMaintenances() {
        return await db.select().from(maintenance);
    }
export async function getMaintenanceById(id: number) {
        return await db.select().from(maintenance).where(eq(maintenance.id, id.toString()));
    }
export async function addMaintenance(
        maintenanceCost: string,
        maintenanceType: string,
        maintenanceDescription: string,
        maintenanceDate: Date,
        createdAt: Date,
        vehicleId:string
    ) {
        return await db.insert(maintenance).values({
            maintenanceCost,
            maintenanceDescription,
            maintenanceDate,
            maintenanceType,
            vehicleId,
            createdAt
        })
    }
export async function updateMaintenance(id: number,
        maintenanceCost: string,
        maintenanceType: string,
        maintenanceDescription: string,
        maintenanceDate: Date,
        createdAt: Date,
        vehicleId:string
    ) {
        return await db.update(maintenance).set({
            maintenanceCost,
            maintenanceDescription,
            maintenanceDate,
            maintenanceType,
            vehicleId,
            createdAt
        }).where(eq(maintenance.id, id.toString()));
    }
export async function deleteMaintenance(id: number) {
        return await db.delete(maintenance).where(eq(maintenance.id, id.toString()));
    }
