import { Router } from "express"
import { addCustomer, getCustomerDetails } from "../controllers/customer_controllers.js";

const router = Router();

router.post('/', addCustomer);

router.get('/:customerId', getCustomerDetails);

export default function setupCustomerRoutes(server) {
    server.use('/api/customers', router);
}