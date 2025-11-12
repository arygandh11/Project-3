const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee routes
// GET /api/employees - Get all employees
router.get('/', employeeController.getAllEmployees);
// POST /api/employees - Add a new employee
router.post('/', employeeController.addEmployee);
// PUT /api/employees/:id - Update an existing employee
router.put('/:id', employeeController.updateEmployee);
// DELETE /api/employees/:id - Delete an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
