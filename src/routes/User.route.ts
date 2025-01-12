import { UserController } from '../controllers/UserController.js';
import { Hono } from 'hono';
import type { Context } from 'hono';

const userRoutes = new Hono();
const userController = new UserController();
userRoutes.get('/',(c)=>userController.getAllUsersController(c));
userRoutes.get('/:id',(c)=>userController.getUserByIdController(c));
userRoutes.post('/',(c)=>userController.addUserController(c));
userRoutes.put('/:id',(c)=>userController.updateUserController(c));
userRoutes.delete('/:id',(c)=>userController.deleteUserController(c));



export { userRoutes };
