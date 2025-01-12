import { pgEnum } from 'drizzle-orm/pg-core';
export const userRoleEnum = pgEnum('userRole', ['ADMIN', 'USER', 'DRIVER', 'MANAGER']);
export const userStatusEnum = pgEnum('userStatus', ['ACTIVE', 'INACTIVE', 'SUSPENDED']);
export const vehicleStatusEnum = pgEnum('vehicleStatus', ['ACTIVE', 'MAINTENANCE', 'RETIRED', 'IN_USE']);
export const fuelTypeEnum = pgEnum('fuelType', ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID']);
export const journeyStatusEnum = pgEnum('journeyStatus', ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const maintenanceStatusEnum = pgEnum('maintenanceStatus', ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const alertSeverityEnum = pgEnum('alertSeverity', ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
