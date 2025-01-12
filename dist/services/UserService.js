import { db } from '../db/connection.js';
import { users } from '../schema/UserSchema.js';
import { eq } from 'drizzle-orm';
export async function getAllUsers() {
    return await db.select().from(users);
}
// export async getUserById(id: number) {
//         return await db.select().from(users).where(eq(users.id, id.toString()));
//     }
export async function addUser(firstName, lastName, email, password, phoneNumber, address, city, postalCode, department, emergencyContact) {
    try {
        await db.insert(users).values({
            password,
            email,
            firstName,
            lastName,
            address,
            city,
            department,
            emergencyContact,
            phoneNumber,
            postalCode,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error in addUser:', err.message); // Access the error message safely
            throw new Error('Failed to add user: ' + err.message);
        }
        else {
            console.error('Unknown error in addUser:', err); // Handle unknown error types
            throw new Error('Failed to add user due to an unknown error');
        }
    }
}
// async updateUser(id: number, data: Partial<{
//     firstName: string;
//     lastName: string;
//     age: number;
//     email: string;
//     password: string;
//     status: string;
//     contract: string;
// }>) {
//     return await db.update(users).set(data).where(eq(users.id, id.toString()));
// }
// async deleteUser(id: number) {
//     return await db.delete().from(users).where(eq(users.id, id.toString()));
// }
