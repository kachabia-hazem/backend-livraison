import { Hono } from 'hono';
import { serve } from '@hono/node-server'; // For serving Hono app
import { userRoutes } from './routes/User.route.js'; // Import your user route
import { driverRoutes } from './routes/Driver.route.js';
import { insuranceRoutes } from './routes/Insurance.route.js';
import { journeyRoutes } from './routes/Journey.route.js';
import { maintenanceRoutes } from './routes/Maintenance.route.js';
import repairRoutes from './routes/Repair.route.js';
import { checkDbConnection } from './db/connection.js';

const app = new Hono();

// Define routes
app.route('/api/user', userRoutes);
app.route('/api/drivers', driverRoutes);
app.route('/api/insurance', insuranceRoutes);
app.route('/api/journey', journeyRoutes);
app.route('/api/maintenance', maintenanceRoutes);
app.route('/api/maintenance', repairRoutes);


app;


// checkDbConnection().then(() => {
//     // Once DB connection is successful, start the server
  
//     const PORT = process.env.PORT || 3000; // Default to 3000 if no PORT is defined
//     // serve(app, { port: Number(PORT) });
  
//     console.log(`Server is running on http://localhost:3000`);
//   }).catch(() => {
//     // In case DB connection fails, prevent the server from starting
//     console.error('Server failed to start due to DB connection error');
//   });
  

serve(app)