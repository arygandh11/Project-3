const pool = require('../config/database');

const getAllOrders = async (req, res) => {
    try {
        const query = 'SELECT orderid, timeoforder, customerid, employeeid, totalcost, orderweek, is_complete FROM orders ORDER BY timeoforder DESC';
        const result = await pool.query(query);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const createOrder = async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        const { timeoforder, customerid, employeeid, totalcost, orderweek, orderItems } = req.body;

        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ success: false, error: 'Order must contain at least one item' });
        }

        // Validate inventory
        for (const orderItem of orderItems) {
            const checkQuery = `
                SELECT i.ingredientID, i.ingredientCount, mi.ingredientQty 
                FROM inventory i 
                INNER JOIN MenuItemIngredients mi ON i.ingredientID = mi.ingredientID 
                WHERE mi.menuItemID = $1
            `;
            const ingredientResult = await client.query(checkQuery, [orderItem.menuitemid]);
            
            for (const row of ingredientResult.rows) {
                const available = row.ingredientcount;
                const requiredPerDrink = row.ingredientqty;
                const totalRequired = requiredPerDrink * orderItem.quantity;
            
                if (available < totalRequired) {
                    await client.query('ROLLBACK');
                    return res.status(400).json({ 
                        success: false, 
                        error: `Insufficient inventory for ingredient ID: ${row.ingredientid}` 
                    });
                }
            }
        }

            } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        client.release();
    }
};