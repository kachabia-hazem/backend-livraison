import type { Context } from 'hono';
import { addInsurance, deleteInsurance, getAllInsurances, getInsuranceById, updateInsurance } from '../services/InsuranceService.js';

export class InsuranceController {
    async getAllInsurancesController(c: Context) {
        try {
            const insurances = await getAllInsurances();
            return c.json(insurances, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching insurances', error }, 500);
        }
    }
    async getInsuranceByIdController(c: Context) {
        try {
            const id = c.req.param('id');
            const insurance = await getInsuranceById(id);
            if (!insurance) {
                return c.json({ message: 'Insurance not found' }, 404);
            }
            return c.json(insurance, 200);
        } catch (error) {
            return c.json({ message: 'Error fetching insurance', error }, 500);
        }
    }
    async addInsuranceController(c: Context) {
        try {
            const {
                vehicleId,
                type,
                provider,
                dateInsurence,
                insuranceExpiryDate,
                price 
            } = await c.req.json();
             await addInsurance(
                vehicleId,
                type,
                provider,
                dateInsurence,
                insuranceExpiryDate,
                price,
                );
            return c.json(201);
        } catch (error) {
            return c.json({ message: 'Error adding insurance', error }, 500);
        }
    }
    async updateInsuranceController(c: Context) {
        try {
            const id = c.req.param('id');
            const {
                dateInsurence,
                insuranceExpiryDate,
                price,
                provider,
                type,
                vehicleId,
                updatedAt,} = await c.req.json();
            const updatedInsurance = await updateInsurance(id,dateInsurence,
                insuranceExpiryDate,
                price,
                provider,
                type,
                vehicleId,
                updatedAt,);
            if (!updatedInsurance) {
                return c.json({ message: 'Insurance not found' }, 404);
            }
            return c.json(updatedInsurance, 200);
        } catch (error) {
            return c.json({ message: 'Error updating insurance', error }, 500);
        }
    }
    async deleteInsurancController(c: Context) {
        try {
            const id = c.req.param('id');
            const deleted = await deleteInsurance(id);
            if (!deleted) {
                return c.json({ message: 'Insurance not found' }, 404);
            }
            return c.json({ message: 'Insurance deleted' }, 200);
        } catch (error) {
            return c.json({ message: 'Error deleting insurance', error }, 500);
        }
    }
}
