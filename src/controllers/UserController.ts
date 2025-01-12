import type { Context } from 'hono';
import { 
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser 
} from '../services/UserService.js';

export class UserController {
  static addUserController(arg0: string, addUserController: any) {
    throw new Error('Method not implemented.');
  }
  // Fetch all users
  async getAllUsersController(c: Context) {
    try {
      const users = await getAllUsers(); // Fetch users from the service
      return c.json(users, 200); // Respond with users
    } catch (error) {
      console.error('Error fetching users:', error);
      return c.json({ message: 'Error fetching users' }, 500);
    }
  }

  // Fetch a user by ID
  async getUserByIdController(c: Context) {
    try {
      const id = c.req.param('id');
      const user = await getUserById(id);
      if (!user) {
        return c.json({ message: 'User not found' }, 404);
      }
      return c.json(user, 200);
    } catch (error) {
      console.error('Error fetching user:', error);
      return c.json({ message: 'Error fetching user', error }, 500);
    }
  }

  // Add a new user
  async addUserController(c: Context) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        city,
        postalCode,
        department,
        emergencyContact,
      } = await c.req.json();

      await addUser(
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
      );
      return c.json({ message: 'User added successfully' }, 201);
    } catch (error) {
      console.error('Error adding user:', error);
      return c.json({ message: 'Error adding user', error: error instanceof Error ? error.message : error }, 500);
    }
  }

  // Update an existing user
  async updateUserController(c: Context) {
    try {
      const {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        postalCode,
        department,
        emergencyContact,
        status
      } = await c.req.json();

      await updateUser(
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        postalCode,
        department,
        emergencyContact,
        status
      );
      return c.json({ message: 'User updated successfully' }, 200);
    } catch (error) {
      console.error('Error updating user:', error);
      return c.json({ message: 'Error updating user', error: error instanceof Error ? error.message : error }, 500);
    }
  }

  // Delete a user
  async deleteUserController(c: Context) {
    try {
      const id = c.req.param('id');
      await deleteUser(id);
      return c.json({ message: 'User deleted successfully' }, 200);
    } catch (error) {
      console.error('Error deleting user:', error);
      return c.json({ message: 'Error deleting user', error: error instanceof Error ? error.message : error }, 500);
    }
  }
}
