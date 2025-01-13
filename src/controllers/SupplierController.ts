import type { Context } from 'hono';
import { addSupplier, deleteSupplier, getAllSuppliers, getSupplierById, updateSupplier } from '../services/SupplierService.js';
 export class SupplierController{
        async getAllSuppliersController(c: Context) {
            try {
                const suppliers = await getAllSuppliers();
                return c.json(suppliers, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching suppliers', error }, 500);
            }
        }
        async getSupplierByIdController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const supplier = await getSupplierById(id);
                if (!supplier) {
                    return c.json({ message: 'Supplier not found' }, 404);
                }
                return c.json(supplier, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching supplier', error }, 500);
            }
        }
            async addSupplierController(c: Context) {
                try {
                    const { name,
                        address,
                        contact,
                        service,
                        overallRating} = await c.req.json();
                    const newSupplier = await addSupplier( name,
                        address,
                        contact,
                        service,
                        overallRating,);
                    return c.json(newSupplier, 201);
                } catch (error) {
                    return c.json({ message: 'Error adding supplier', error }, 500);
                }
            }
        async updateSupplierController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const { name,
                    address,
                    contact,
                    service,
                    overallRating,} = await c.req.json();
                const updatedSupplier = await updateSupplier(id,  name,
                    address,
                    contact,
                    service,
                    overallRating,);
                if (!updatedSupplier) {
                    return c.json({ message: 'Supplier not found' }, 404);
                }
                return c.json(updatedSupplier, 200);
            } catch (error) {
                return c.json({ message: 'Error updating supplier', error }, 500);
            }
        }
        async deleteSupplierController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const deleted = await deleteSupplier(id);
                if (!deleted) {
                    return c.json({ message: 'Supplier not found' }, 404);
                }
                return c.json({ message: 'Supplier deleted' }, 200);
            } catch (error) {
                return c.json({ message: 'Error deleting supplier', error }, 500);
            }
        }
    }