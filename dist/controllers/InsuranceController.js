import { addInsurance, deleteInsurance, getAllInsurances, getInsuranceById, updateInsurance } from '../services/InsuranceService.js';
export class InsuranceController {
    async getAllInsurancesController(c) {
        try {
            const insurances = await getAllInsurances();
            return c.json(insurances, 200);
        }
        catch (error) {
            return c.json({ message: 'Error fetching insurances', error }, 500);
        }
    }
    async getInsuranceByIdController(c) {
        try {
            const id = c.req.param('id');
            const insurance = await getInsuranceById(id);
            if (!insurance) {
                return c.json({ message: 'Insurance not found' }, 404);
            }
            return c.json(insurance, 200);
        }
        catch (error) {
            return c.json({ message: 'Error fetching insurance', error }, 500);
        }
    }
    async addInsuranceController(c) {
        try {
            const { dateInsurence, insuranceExpiryDate, price, provider, type, vehicleId, createdAt, updatedAt } = await c.req.json();
            await addInsurance(dateInsurence, insuranceExpiryDate, price, provider, type, vehicleId, createdAt, updatedAt);
            return c.json(201);
        }
        catch (error) {
            return c.json({ message: 'Error adding insurance', error }, 500);
        }
    }
    async updateInsuranceController(c) {
        try {
            const id = c.req.param('id');
            const { dateInsurence, insuranceExpiryDate, price, provider, type, vehicleId, updatedAt, } = await c.req.json();
            const updatedInsurance = await updateInsurance(id, dateInsurence, insuranceExpiryDate, price, provider, type, vehicleId, updatedAt);
            if (!updatedInsurance) {
                return c.json({ message: 'Insurance not found' }, 404);
            }
            return c.json(updatedInsurance, 200);
        }
        catch (error) {
            return c.json({ message: 'Error updating insurance', error }, 500);
        }
    }
    async deleteInsurancController(c) {
        try {
            const id = c.req.param('id');
            const deleted = await deleteInsurance(id);
            if (!deleted) {
                return c.json({ message: 'Insurance not found' }, 404);
            }
            return c.json({ message: 'Insurance deleted' }, 200);
        }
        catch (error) {
            return c.json({ message: 'Error deleting insurance', error }, 500);
        }
    }
}
