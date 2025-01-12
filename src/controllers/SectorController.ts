  import type { Context } from 'hono';
import { addSector, deleteSector, getAllSectors, getSectorById, updateSector } from '../services/SectorService.js';
 export class SectorController {
        async getAllSectorsController(c: Context) {
            try {
                const sectors = await getAllSectors();
                return c.json(sectors, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching sectors', error }, 500);
            }
        }
        async getSectorByIdController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const sector = await getSectorById(id);
                if (!sector) {
                    return c.json({ message: 'Sector not found' }, 404);
                }
                return c.json(sector, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching sector', error }, 500);
            }
        }
        async addSectorController(c: Context) {
            try {
                const { name,
                    city,
                    delegation,
                    idVehicle,
                    createdAt,} = await c.req.json();
                const newSector = await addSector( name,
                    city,
                    delegation,
                    idVehicle,
                    createdAt,);
                return c.json(newSector, 201);
            } catch (error) {
                return c.json({ message: 'Error adding sector', error }, 500);
            }
        }
        async updateSectorController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const { name,
                    city,
                    delegation,
                    idVehicle,
                    updatedAt,} = await c.req.json();
                const updatedSector = await updateSector(id,  
                    name,
                    city,
                    delegation,
                    idVehicle,
                    updatedAt,);
                if (!updatedSector) {
                    return c.json({ message: 'Sector not found' }, 404);
                }
                return c.json(updatedSector, 200);
            } catch (error) {
                return c.json({ message: 'Error updating sector', error }, 500);
            }
        }
        async deleteSectorController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const deleted = await deleteSector(id);
                if (!deleted) {
                    return c.json({ message: 'Sector not found' }, 404);
                }
                return c.json({ message: 'Sector deleted' }, 200);
            } catch (error) {
                return c.json({ message: 'Error deleting sector', error }, 500);
            }
        }
    }
