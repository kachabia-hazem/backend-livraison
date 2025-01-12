import { db } from '../db/connection.js';
import { users } from '../schema/UserSchema.js';
import { eq } from 'drizzle-orm';

export async  function getAllUsers() {
        return await db.select().from(users);
    }
// export async getUserById(id: number) {
//         return await db.select().from(users).where(eq(users.id, id.toString()));
//     }
export async function addUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phoneNumber?: string,
        address?: string,
        city?: string,
        postalCode?: string,
        department?: string,
        emergencyContact?: string,
    ): Promise<void> {
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
        } catch (err) {
    if (err instanceof Error) {
      console.error('Error in addUser:', err.message); // Access the error message safely
      throw new Error('Failed to add user: ' + err.message);
    } else {
      console.error('Unknown error in addUser:', err); // Handle unknown error types
      throw new Error('Failed to add user due to an unknown error');
    }
  }
}
export async function getUserById(id: string): Promise<any | null> {
  try {
    console.log('Fetching user by ID:', id);
    const result = await db.select().from(users).where(eq(users.id, id));
    if (result.length === 0) {
      console.log('No user found with ID:', id);
      return null;
    }
    console.log('User fetched successfully:', result[0]);
    return result[0];
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in getUserById:', err.message);
      throw new Error('Failed to fetch user: ' + err.message);
    } else {
      console.error('Unknown error in getUserById:', err);
      throw new Error('Failed to fetch user due to an unknown error');
    }
  }
}
export async function updateUser(
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber?: string,
  address?: string,
  city?: string,
  postalCode?: string,
  department?: string,
  emergencyContact?: string,
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
): Promise<void> {
  try {
    const result = await db
      .update(users)
      .set({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        postalCode,
        department,
        emergencyContact,
        status: status as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | undefined,
        updatedAt: new Date(), // Update timestamp
      })
      .where(eq(users.id, id));
      
    if (result.rowCount === 0) {
      console.log('No user found to update with ID:', id);
      throw new Error('User not found');
    }
    console.log('User updated successfully');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in updateUser:', err.message);
      throw new Error('Failed to update user: ' + err.message);
    } else {
      console.error('Unknown error in updateUser:', err);
      throw new Error('Failed to update user due to an unknown error');
    }
  }
}

// Delete a user
export async function deleteUser(id: string): Promise<void> {
  try {
    console.log('Attempting to delete user with ID:', id);
    const result = await db.delete(users).where(eq(users.id, id));
    if (result.rowCount === 0) {
      console.log('No user found to delete with ID:', id);
      throw new Error('User not found');
    }
    console.log('User deleted successfully');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in deleteUser:', err.message);
      throw new Error('Failed to delete user: ' + err.message);
    } else {
      console.error('Unknown error in deleteUser:', err);
      throw new Error('Failed to delete user due to an unknown error');
    }
  }
}


   