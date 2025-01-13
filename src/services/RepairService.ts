import { db } from '../db/connection.js';
import { repair } from '../schema/RepairSchema.js';
import { eq } from 'drizzle-orm';

export async function getAllRepairs() {
        return await db.select().from(repair);
    }
export async function getRepairById(id: number) {
        return await db.select().from(repair).where(eq(repair.id, id.toString()));
    }
export async function addRepair(
            driverId:string,
            failureType:string,
            repairCost:string,
            repairDate:Date,
            vehicleId:string,
            
    ) {
        try {
            const parsedRepairDate = new Date(repairDate);
            if (isNaN(parsedRepairDate.getTime())) {
                throw new Error('Invalid repair date');
            }
        

        return await db.insert(repair).values({
            driverId,
            failureType,
            repairCost,
            repairDate: parsedRepairDate,
            vehicleId,
            
        })
    } catch (err) {
        if (err instanceof Error) {
          console.error('Error in Repair:', err.message);
          throw new Error('Failed to add insurance: ' + err.message);
        } else {
          console.error('Unknown error in addInsurance:', err);
          throw new Error('Failed to add insurance due to an unknown error');
        }
      }
        
    }
export async function updateRepair(id: number, 
            driverId:string,
            failureType:string,
            repairCost:string,
            repairDate:Date,
            vehicleId:string,
            createdAt:Date,
            updatedAt:Date
    ) {
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
export async function deleteRepair(id: number) {
        return await db.delete(repair).where(eq(repair.id, id.toString()));
    }