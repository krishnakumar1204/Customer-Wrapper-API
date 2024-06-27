import express from 'express';
import setupCustomerRoutes from './routes/customer_routes.js';

const server = express();

const port = process.env.PORT || 8000;

// Body parser middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

setupCustomerRoutes(server);


server.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Server." });
});


server.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
})
