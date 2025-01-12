import { Hono } from 'hono';
import { addUserController, getAllUsersController,
//   getUserByIdController,
//   updateUserController,
//   deleteUserController,
 } from '../controllers/UserController.js';
const userRoutes = new Hono();
userRoutes.post('/', addUserController);
userRoutes.get('/', getAllUsersController);
// // Get a user by ID
// userRouter.get('/users/:id', getUserByIdController);
// // Update a user
// userRouter.put('/users/:id', updateUserController);
// // Delete a user
// userRouter.delete('/users/:id', deleteUserController);
export { userRoutes };
