const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper function to format product data
const formatProduct = (product) => ({
  ...product,
  id: product.id.toString(),
  price: parseFloat(product.price),
  active: Boolean(product.active)
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    const formattedProducts = rows.map(formatProduct);
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(formatProduct(rows[0]));
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create product
router.post('/', async (req, res) => {
  const { name, price, description, image, category } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, image, category]
    );
    
    const newProduct = {
      id: result.insertId.toString(),
      name,
      price: parseFloat(price),
      description,
      image,
      category
    };
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  const { name, price, description, image, category } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE products SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ?',
      [name, price, description, image, category, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = {
      id: req.params.id,
      name,
      price: parseFloat(price),
      description,
      image,
      category
    };
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// PATCH toggle active status
router.patch('/:id/toggle', async (req, res) => {
  try {
    // Buscar produto atual
    const [rows] = await db.query('SELECT active FROM products WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // MySQL retorna tinyint(1) como 0 ou 1
    const currentStatus = Boolean(rows[0].active);
    const newStatus = currentStatus ? 0 : 1; // Inverter: true -> 0 (false), false -> 1 (true)
    
    // Atualizar status
    await db.query('UPDATE products SET active = ? WHERE id = ?', [newStatus, req.params.id]);
    
    // Buscar produto atualizado
    const [updatedRows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    
    res.json(formatProduct(updatedRows[0]));
  } catch (error) {
    console.error('Error toggling product status:', error);
    res.status(500).json({ error: 'Failed to toggle product status' });
  }
});

module.exports = router;
