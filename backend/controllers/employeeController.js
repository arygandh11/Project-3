const pool = require('../config/database');

/**
 * Get all employees
 * @route GET /api/employees
 * @returns {Array} Array of employees with employeeid, employeename, employeerole, and hoursworked
 */
const getAllEmployees = async (req, res) => {
    try {
        const query = 'SELECT employeeid, employeename, employeerole, hoursworked FROM employees ORDER BY employeename';
        const result = await pool.query(query);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Add a new employee
 * @route POST /api/employees
 * @param {string} employeename - Name of the employee
 * @param {string} employeerole - Role of the employee (e.g., "Manager", "Cashier")
 * @param {number} hoursworked - Hours worked by the employee
 * @returns {Object} The newly created employee
 */
const addEmployee = async (req, res) => {
    try {
        const { employeename, employeerole, hoursworked } = req.body;
        
        // Validate required fields
        if (!employeename || !employeerole || hoursworked === undefined) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        // Generate next available ID
        const idResult = await pool.query('SELECT COALESCE(MAX(employeeid), 0) + 1 as next_id FROM employees');
        const nextId = idResult.rows[0].next_id;

        const query = 'INSERT INTO employees (employeeid, employeename, employeerole, hoursworked) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await pool.query(query, [nextId, employeename, employeerole, hoursworked]);
        
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Update an existing employee
 * @route PUT /api/employees/:id
 * @param {number} id - Employee ID (from URL params)
 * @param {string} employeename - Updated employee name (from request body)
 * @param {string} employeerole - Updated employee role (from request body)
 * @param {number} hoursworked - Updated hours worked (from request body)
 * @returns {Object} Updated employee
 */
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { employeename, employeerole, hoursworked } = req.body;

        // Validate required fields
        if (!employeename || !employeerole || hoursworked === undefined) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        // Update employee information
        const query = 'UPDATE employees SET employeename = $1, employeerole = $2, hoursworked = $3 WHERE employeeid = $4 RETURNING *';
        const result = await pool.query(query, [employeename, employeerole, hoursworked, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Delete an employee
 * @route DELETE /api/employees/:id
 * @param {number} id - Employee ID (from URL params)
 * @returns {Object} Success message
 */
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete employee by ID
        const query = 'DELETE FROM employees WHERE employeeid = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};