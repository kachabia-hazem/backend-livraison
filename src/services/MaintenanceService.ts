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
        maintenanceDescription: string,
        maintenanceDate: Date,
        maintenanceType: string,
        maintenanceCost: string,
        vehicleId:string

    ) {
        try {
            const parsedMaintenanceDate = new Date(maintenanceDate);
            if (isNaN(parsedMaintenanceDate.getTime())) {
                throw new Error('Invalid maintenance date');
            }
        return await db.insert(maintenance).values({
            maintenanceCost,
            maintenanceDescription,
            maintenanceDate: parsedMaintenanceDate,
            maintenanceType,
            vehicleId,
        })
    
    } catch (err) {
        if (err instanceof Error) {
          console.error('Error in Mantenance:', err.message);
          throw new Error('Failed to add insurance: ' + err.message);
        } else {
          console.error('Unknown error in addInsurance:', err);
          throw new Error('Failed to add insurance due to an unknown error');
        }
      }
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
