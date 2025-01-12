
import {Hono} from 'hono';
import { VehicleController } from '../controllers/VehicleController.js';
import type {Context} from 'hono';
const vehicleRoutes = new Hono();
const vehicleController = new VehicleController();
vehicleRoutes.get('/vehicles',(c)=>vehicleController.getAllVehiclesController(c));
vehicleRoutes.get('/vehicles/:id',(c)=>vehicleController.getVehicleByIdController(c));
vehicleRoutes.post('/vehicles',(c)=>vehicleController.addVehicleController(c));
vehicleRoutes.put('/vehicles/:id',(c)=>vehicleController.updateVehicleController(c));   
vehicleRoutes.delete('/vehicles/:id',(c)=>vehicleController.deleteVehicleController(c));
export { vehicleRoutes };
