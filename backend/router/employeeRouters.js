import express from 'express';
import { GetAllEmployees, GetOneEmployee, CreateEmployee, UpdateEmployee, DeleteEmployee } from '../controller/employeeControllers.js';
const router = express.Router();

router.get('/employees', GetAllEmployees);
router.get('/employee/:id', GetOneEmployee);
router.post('/create', CreateEmployee);
router.put('/update/:id', UpdateEmployee);
router.delete('/delete/:id', DeleteEmployee);

export default router;