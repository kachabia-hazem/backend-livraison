 import type { Context } from 'hono';
import { addVehicle, deleteVehicle, getAllVehicles, getVehicleById, updateVehicle } from '../services/VehicleService.js';
 export class VehicleController{
        async getAllVehiclesController(c: Context) {
            try {
                const vehicles = await getAllVehicles();
                return c.json(vehicles, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching vehicles', error }, 500);
            }
        }
        async getVehicleByIdController(c: Context) {
            try {
                const id = c.req.param('id');
                const vehicle = await getVehicleById(id);
                if (!vehicle) {
                    return c.json({ message: 'Vehicle not found' }, 404);
                }
                return c.json(vehicle, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching vehicle', error }, 500);
            }
        }
        async addVehicleController(c: Context) {
            try {
                const {brand,
                    model,
                    year,
                    registrationNumber,
                    vin,
                    status,
                    currentMileage,
                    fuelType,
                    fuelCapacity,
                    currentFuelLevel,
                    averageFuelConsumption,
                    lastMaintenanceDate,
                    nextMaintenanceDate,
                    gpsDeviceId,
                    currentLocation,
                    assignedDepartment,
                    insuranceExpiryDate,
                    registrationExpiryDate,
                    purchaseDate,
                    purchasePrice,
                    residualValue,} = await c.req.json();
                const newVehicle = await addVehicle(brand,
                    model,
                    year,
                    registrationNumber,
                    vin,
                    status,
                    currentMileage,
                    fuelType,
                    fuelCapacity,
                    currentFuelLevel,
                    averageFuelConsumption,
                    lastMaintenanceDate,
                    nextMaintenanceDate,
                    gpsDeviceId,
                    currentLocation,
                    assignedDepartment,
                    insuranceExpiryDate,
                    registrationExpiryDate,
                    purchaseDate,
                    purchasePrice,
                    residualValue);
                return c.json(newVehicle, 201);
            } catch (error) {
                return c.json({ message: 'Error adding vehicle', error }, 500);
            }
        }
        async updateVehicleController(c: Context) {
            try {
                const id = c.req.param('id');
                const{brand,
                    model,
                    year,
                    registrationNumber,
                    vin,
                    status,
                    currentMileage,
                    fuelType,
                    fuelCapacity,
                    currentFuelLevel,
                    averageFuelConsumption,
                    lastMaintenanceDate,
                    nextMaintenanceDate,
                    gpsDeviceId,
                    currentLocation,
                    assignedDepartment,
                    insuranceExpiryDate,
                    registrationExpiryDate,
                    purchaseDate,
                    purchasePrice,
                    residualValue} = await c.req.json();
                const updatedVehicle = await updateVehicle(id, brand,
                    model,
                    year,
                    registrationNumber,
                    vin,
                    status,
                    currentMileage,
                    fuelType,
                    fuelCapacity,
                    currentFuelLevel,
                    averageFuelConsumption,
                    lastMaintenanceDate,
                    nextMaintenanceDate,
                    gpsDeviceId,
                    currentLocation,
                    assignedDepartment,
                    insuranceExpiryDate,
                    registrationExpiryDate,
                    purchaseDate,
                    purchasePrice,
                    residualValue,);
                if (!updatedVehicle) {
                    return c.json({ message: 'Vehicle not found' }, 404);
                }
                return c.json(updatedVehicle, 200);
            } catch (error) {
                return c.json({ message: 'Error updating vehicle', error }, 500);
            }
        }
        async deleteVehicleController(c: Context) {
            try {
                const id = c.req.param('id');
                const deleted = await deleteVehicle(id);
                if (!deleted) {
                    return c.json({ message: 'Vehicle not found' }, 404);
                }
                return c.json({ message: 'Vehicle deleted' }, 200);
            } catch (error) {
                return c.json({ message: 'Error deleting vehicle', error }, 500);
            }
        }
    }