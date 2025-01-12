import { Hono } from 'hono';
const route = new Hono();
import { InsuranceController } from '../controllers/InsuranceController.js';
const insuranceController = new InsuranceController();
route.get('/', insuranceController.getAllInsurancesController.bind(insuranceController));
route.post('/', insuranceController.addInsuranceController.bind(insuranceController));
route.put('/:id', insuranceController.updateInsuranceController.bind(insuranceController));
route.delete('/:id', insuranceController.deleteInsurancController.bind(insuranceController));
export default route;
