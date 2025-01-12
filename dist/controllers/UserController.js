import { addUser, getAllUsers } from '../services/UserService.js';
export async function getAllUsersController(c) {
    try {
        const users = await getAllUsers(); // Fetch users from the service
        return c.json(users, 200); // Respond with users
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return c.json({ message: 'Error fetching users', }, 500);
    }
}
// async getUserById(c: Context) {
//     try {
//         const id = Number(c.req.param('id'));
//         const user = await getUserById(id);
//         if (!user) {
//             return c.json({ message: 'User not found' }, 404);
//         }
//         return c.json(user, 200);
//     } catch (error) {
//         return c.json({ message: 'Error fetching user', error }, 500);
//     }
// }
export async function addUserController(c) {
    try {
        const { firstName, lastName, email, password, phoneNumber, address, city, postalCode, department, emergencyContact, } = await c.req.json();
        // Call the service function
        await addUser(password, email, firstName, lastName, address, city, department, emergencyContact, phoneNumber, postalCode);
        return c.json({ message: 'User added successfully' }, 201);
    }
    catch (error) {
        console.error('Error adding user:', error);
        return c.json({ message: 'Error adding user', error: error instanceof Error ? error.message : error }, 500);
    }
}
// async updateUser(c: Context) {
//     try {
//         const id = Number(c.req.param('id'));
//         const data = await c.req.json();
//         const updatedUser = await updateUser(id, data);
//         if (!updatedUser) {
//             return c.json({ message: 'User not found' }, 404);
//         }
//         return c.json(updatedUser, 200);
//     } catch (error) {
//         return c.json({ message: 'Error updating user', error }, 500);
//     }
// }
// async deleteUser(c: Context) {
//     try {
//         const id = Number(c.req.param('id'));
//         const deleted = await userService.deleteUser(id);
//         if (!deleted) {
//             return c.json({ message: 'User not found' }, 404);
//         }
//         return c.json({ message: 'User deleted' }, 200);
//     } catch (error) {
//         return c.json({ message: 'Error deleting user', error }, 500);
//     }
// }
