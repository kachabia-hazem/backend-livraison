import type { Context } from 'hono';
import { addMaintenance, deleteMaintenance, getAllMaintenances, getMaintenanceById, updateMaintenance } from '../services/MaintenanceService.js';
export class MaintenanceController{
    async getAllMaintenancesController(c: Context) {
        try {
            const maintenances = await getAllMaintenances();
            return c.json(maintenances, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching maintenances', error }, 500);
        }
    }
    async getMaintenanceByIdController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const maintenance = await getMaintenanceById(id);
            if (!maintenance) {
                return c.json({ message: 'Maintenance not found' }, 404);
            }
            return c.json(maintenance, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching maintenance', error }, 500);
        }
    }
    async addMaintenanceController(c: Context) {
        try {
            const { maintenanceCost,
                maintenanceDescription,
                maintenanceDate,
                maintenanceType,
                vehicleId,
                createdAt} = await c.req.json();
            const newMaintenance = await addMaintenance( maintenanceCost,
                maintenanceDescription,
                maintenanceDate,
                maintenanceType,
                vehicleId,
                createdAt);
            return c.json(newMaintenance, 201);
        } catch (error) {
            return c.json({ message: 'Error adding maintenance', error }, 500);
        }
    }
    async updateMaintenanceController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const { maintenanceCost,
                maintenanceDescription,
                maintenanceDate,
                maintenanceType,
                vehicleId,
                createdAt} = await c.req.json();
            const updatedMaintenance = await updateMaintenance(id,  maintenanceCost,
                maintenanceDescription,
                maintenanceDate,
                maintenanceType,
                vehicleId,
                createdAt);
            if (!updatedMaintenance) {
                return c.json({ message: 'Maintenance not found' }, 404);
            }
            return c.json(updatedMaintenance, 200);
        } catch (error) {
            return c.json({ message: 'Error updating maintenance', error }, 500);
        }
    }
    async deleteMaintenanceController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const deleted = await deleteMaintenance(id);
            if (!deleted) {
                return c.json({ message: 'Maintenance not found' }, 404);
            }
            return c.json({ message: 'Maintenance deleted' }, 200);
        } catch (error) {
            return c.json({ message: 'Error deleting maintenance', error }, 500);
        }
    }
}