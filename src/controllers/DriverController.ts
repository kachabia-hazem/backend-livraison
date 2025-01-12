import type { Context } from 'hono';
import { addDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver} from "../services/DriverService.js";

export class DriverController {
    async getAllDriversController(c: Context) {
        try {
            const drivers = await getAllDrivers();
            return c.json(drivers, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching drivers', error }, 500);
        }
    }
    async gerDriverByIdController(c: Context) {
        try {
            const id = c.req.param('id');
            const driver = await getDriverById(id);
            if (!driver) {
                return c.json({ message: 'Driver not found' }, 404);
            }
            return c.json(driver, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching driver', error }, 500);
        }
        
    }
    async addDriver(c: Context) {
        try {
            const {
                userId,
                licenseNumber,
                licenseType,
                licenseExpiry,  // Use the parsed date object
                status,
                certifications,}= await c.req.json();
            await addDriver(
                userId,
                licenseNumber,
                licenseType,
                licenseExpiry,  // Use the parsed date object
                certifications,
                status,);
            return c.json( 201);
        } catch (error) {
            return c.json({ message: 'Error adding driver', error }, 500);
        }
    }
    async updateDriver(c: Context) {
        try {
            // const id = Number(c.req.param('id'));
            const {certifications,
                licenseExpiry,
                id,
                licenseNumber,
                licenseType,
                medicalClearance,
                preferredVehicles,
                status,
                userId,} = await c.req.json();
                await updateDriver(
                certifications,
                licenseExpiry,
                id,
                licenseNumber,
                licenseType,
                medicalClearance,
                preferredVehicles,
                status,);
        
            return c.json( 200);
        } catch (error) {
            return c.json({ message: 'Error updating driver', error }, 500);
        }
    }
    async deleteDriver(c: Context) {
        try {
            const id = c.req.param('id');
            const deleted = await deleteDriver(id);
            // if (!deleted) {
            //     return c.json({ message: 'Driver not found' }, 404);
            // }
            return c.json({ message: 'Driver deleted' }, 200);
        } catch (error) {
            return c.json({ message: 'Error deleting driver', error }, 500);
        }
    }
}



