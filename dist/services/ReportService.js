import { db } from '../db/connection.js';
import { report } from '../schema/ReportSchema.js';
import { eq } from 'drizzle-orm';
export async function getAllReports() {
    return await db.select().from(report);
}
export async function getReportById(id) {
    return await db.select().from(report).where(eq(report.idReport, id.toString()));
}
export async function addReport(description, type, date, idVehicle, idSupplier, idDriver, supplierRating) {
    return await db.insert(report).values({
        description,
        type,
        date,
        idVehicle,
        idSupplier,
        idDriver,
        supplierRating
    });
}
export async function updateReport(id, description, type, date, idVehicle, idSupplier, idDriver, supplierRating) {
    return await db.update(report).set({ description,
        type,
        date,
        idVehicle,
        idSupplier,
        idDriver,
        supplierRating }).where(eq(report.idReport, id.toString()));
}
export async function deleteReport(id) {
    return await db.delete(report).where(eq(report.idReport, id.toString()));
}
