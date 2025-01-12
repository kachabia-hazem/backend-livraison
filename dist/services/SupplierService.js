import { db } from '../db/connection.js';
import { suppliers } from '../schema/SupplierSchema.js';
import { eq } from 'drizzle-orm';
export async function getAllSuppliers() {
    return await db.select().from(suppliers);
}
export async function getSupplierById(id) {
    return await db.select().from(suppliers).where(eq(suppliers.id, id.toString()));
}
export async function addSupplier(name, address, contact, service, overallRating) {
    return await db.insert(suppliers).values({
        name,
        address,
        contact,
        service,
        overallRating,
    }).returning();
}
export async function updateSupplier(id, name, address, contact, service, overallRating) {
    return await db.update(suppliers).set({
        name,
        address,
        contact,
        service,
        overallRating
    }).where(eq(suppliers.id, id.toString()));
}
export async function deleteSupplier(id) {
    return await db.delete(suppliers).where(eq(suppliers.id, id.toString()));
}
