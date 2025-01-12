import type { Context } from 'hono';
import { addReport, deleteReport, getAllReports, getReportById, updateReport } from '../services/ReportService.js';
    export class ReportController{
        async getAllReportsController(c: Context) {
            try {
                const reports = await getAllReports();
                return c.json(reports, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching reports', error }, 500);
            }
        }
        async getReportByIdController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const report = await getReportById(id);
                if (!report) {
                    return c.json({ message: 'Report not found' }, 404);
                }
                return c.json(report, 200);
            } catch (error) {
                return c.json({ message: 'Error fetching report', error }, 500);
            }
        }
        async addReportController(c: Context) {
            try {
                const {description,
                    type,
                    date,
                    idVehicle,
                    idSupplier,
                    idDriver,
                    supplierRating} = await c.req.json();
                const newReport = await addReport(description,
                    type,
                    date,
                    idVehicle,
                    idSupplier,
                    idDriver,
                    supplierRating);
                return c.json(newReport, 201);
            } catch (error) {
                return c.json({ message: 'Error adding report', error }, 500);
            }
        }
        async updateReportController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const {description,
                    type,
                    date,
                    idVehicle,
                    idSupplier,
                    idDriver,
                    supplierRating} = await c.req.json();
                const updatedReport = await updateReport(id, description,
                    type,
                    date,
                    idVehicle,
                    idSupplier,
                    idDriver,
                    supplierRating);
                if (!updatedReport) {
                    return c.json({ message: 'Report not found' }, 404);
                }
                return c.json(updatedReport, 200);
            } catch (error) {
                return c.json({ message: 'Error updating report', error }, 500);
            }
        }
        async deleteReportController(c: Context) {
            try {
                const id = Number(c.req.param('id'));
                const deleted = await deleteReport(id);
                if (!deleted) {
                    return c.json({ message: 'Report not found' }, 404);
                }
                return c.json({ message: 'Report deleted' }, 200);
            } catch (error) {
                return c.json({ message: 'Error deleting report', error }, 500);
            }
        }
    }