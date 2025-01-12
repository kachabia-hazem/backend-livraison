import type { Context } from 'hono';
import { addRepair, deleteRepair, getAllRepairs, getRepairById, updateRepair } from '../services/RepairService.js';

export class RepairController{
    async getAllRepairsController(c: Context) {
        try {
            const repairs = await getAllRepairs();
            return c.json(repairs, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching repairs', error }, 500);
        }
    }
    async getRepairByIdController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const repair = await getRepairById(id);
            if (!repair) {
                return c.json({ message: 'Repair not found' }, 404);
            }
            return c.json(repair, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching repair', error }, 500);
        }
    }
    async addRepairController(c: Context) {
        try {
            const { driverId,
                failureType,
                repairCost,
                repairDate,
                vehicleId,
                createdAt,
                updatedAt} = await c.req.json();
            const newRepair = await addRepair( driverId,
                failureType,
                repairCost,
                repairDate,
                vehicleId,
                createdAt,
                updatedAt);
            return c.json(newRepair, 201);
        } catch (error) {
            return c.json({ message: 'Error adding repair', error }, 500);
        }
    }
    async updateRepairController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const { driverId,
                failureType,
                repairCost,
                repairDate,
                vehicleId,
                createdAt,
                updatedAt} = await c.req.json();
            const updatedRepair = await updateRepair(id,  driverId,
                failureType,
                repairCost,
                repairDate,
                vehicleId,
                createdAt,
                updatedAt);
            if (!updatedRepair) {
                return c.json({ message: 'Repair not found' }, 404);
            }
            return c.json(updatedRepair, 200);
        } catch (error) {
            return c.json({ message: 'Error updating repair', error }, 500);
        }
    }
    async deleteRepairController(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const deleted = await deleteRepair(id);
            if (!deleted) {
                return c.json({ message: 'Repair not found' }, 404);
            }
            return c.json({ message: 'Repair deleted' }, 200);
        } catch (error) {
            return c.json({ message: 'Error deleting repair', error }, 500);
        }
    }
}