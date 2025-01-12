import { db } from '../db/connection.js';
import { journeys } from '../schema/JourneySchema.js';
import { eq } from 'drizzle-orm';

export async function getAllJourneys() {
        return await db.select().from(journeys);
    }
export async function getJourneyById(id: number) {
        return await db.select().from(journeys).where(eq(journeys.id, id.toString()));
    }
export async function addJourney(
        driverId:string,
        startDateTime:Date,
        startLocation:{ lat: number; lng: number },
        endLocation:{ lat: number; lng: number },
        vehicleId:string,
        actualRoute:string,
        costAllocation:string,
        status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
        createdAt:Date,
        updatedAt:Date
    ): Promise<void> {
        try  {
        await db.insert(journeys).values({
            driverId,
            startDateTime,
            startLocation,
            endLocation,
            vehicleId,
            actualRoute,
            costAllocation,
            status,
            createdAt,
            updatedAt
        })
    } catch (err) {
    if (err instanceof Error) {
      console.error('Error in Journey:', err.message);
      throw new Error('Failed to add insurance: ' + err.message);
    } else {
      console.error('Unknown error in addInsurance:', err);
      throw new Error('Failed to add insurance due to an unknown error');
    }
  }
}
export async function updateJourney(id: number,
            driverId:string,
            startDateTime:Date,
            startLocation:{ lat: number; lng: number },
            endLocation:{ lat: number; lng: number },
            vehicleId:string,
            actualRoute:string,
            costAllocation:string,
            status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
            createdAt:Date,
            updatedAt:Date
    ) {
        return await db.update(journeys).set({
            driverId,
            startDateTime,
            startLocation,
            endLocation,
            vehicleId,
            actualRoute,
            costAllocation,
            status,
            createdAt,
            updatedAt
        }).where(eq(journeys.id, id.toString()));
    }
export async function deleteJourney(id: number) {
        return await db.delete(journeys).where(eq(journeys.id, id.toString()));
    }
