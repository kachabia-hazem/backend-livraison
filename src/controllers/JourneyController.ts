import type { Context } from 'hono';
import { addJourney, deleteJourney, getAllJourneys, getJourneyById, updateJourney } from '../services/JourneyService.js';
export class JourneyController {
    async getAllJourneysController(c: Context) {
        try {
            const journeys = await getAllJourneys();
            return c.json(journeys, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching journeys', error }, 500);
        }
    }
    async getJourneyByIdController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const journey = await getJourneyById(id);
            if (!journey) {
                return c.json({ message: 'Journey not found' }, 404);
            }
            return c.json(journey, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching journey', error }, 500);
        }
    }
    async addJourneyController(c: Context) {
        try {
            const { driverId,
                startDateTime,
                startLocation,
                endLocation,
                vehicleId,
                actualRoute,
                costAllocation,
                status,} = await c.req.json();
                 await addJourney(
                driverId,
                startDateTime,
                startLocation,
                endLocation,
                vehicleId,
                actualRoute,
                costAllocation,
                status,
);
            return c.json(201);
        } catch (error) {
            return c.json({ message: 'Error adding journey', error }, 500);
        }
    }
    async updateJourneyController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const {
                driverId,
                startDateTime,
                startLocation,
                endLocation,
                vehicleId,
                actualRoute,
                costAllocation,
                status,
                createdAt,
                updatedAt} = await c.req.json();
            const updatedJourney = await updateJourney(id, driverId,
                startDateTime,
                startLocation,
                endLocation,
                vehicleId,
                actualRoute,
                costAllocation,
                status,
                createdAt,
                updatedAt);
            if (!updatedJourney) {
                return c.json({ message: 'Journey not found' }, 404);
            }
            return c.json(updatedJourney, 200);
        } catch (error) {
            return c.json({ message: 'Error updating journey', error }, 500);
        }
    }
    async deleteJourneyController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const deleted = await deleteJourney(id);
            if (!deleted) {
                return c.json({ message: 'Journey not found' }, 404);
            }
            return c.json({ message: 'Journey deleted' }, 200);
        } catch (error) {
            return c.json({ message: 'Error deleting journey', error }, 500);
        }
    }
}