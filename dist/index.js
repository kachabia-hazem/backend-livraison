import { Hono } from 'hono';
import { serve } from '@hono/node-server'; // For serving Hono app
import { userRoutes } from './routes/User.route.js'; // Import your user route
const app = new Hono();
// Define routes
app.route('/api/user', userRoutes);
// Start the server only after checking the DB connection
// const startServer = async () => {
//   try {
//     // await checkDbConnection(); // Ensure the database connection works
//     const PORT = process.env.PORT || 3000; // Default to 3000 if no PORT is defined
//     // Start the server
//     console.log(`Server is running on http://localhost:3000`);
//   } catch (error) {
//     console.error('Server failed to start due to DB connection error:', error);
//     process.exit(1); // Exit the process if the DB connection fails
//   }
// };
// // Start the application
// startServer();
serve(app);
