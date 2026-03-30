const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC",
    );
    const orders = rows.map((order) => ({
      ...order,
      id: order.id.toString(),
      total: parseFloat(order.total),
      items:
        typeof order.items === "string" ? JSON.parse(order.items) : order.items,
    }));
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Create new order
router.post("/", async (req, res) => {
  try {
    const {
      customer_name,
      phone,
      delivery_type,
      payment_method,
      change_for = null,
      cep = null,
      street = null,
      number = null,
      complement = null,
      neighborhood = null,
      city = null,
      uf = null,
      additional_comments = null,
      total,
      items,
    } = req.body;

    if (
      !customer_name ||
      !phone ||
      !delivery_type ||
      !payment_method ||
      !total ||
      !items
    ) {
      return res.status(400).json({ error: "Dados de pedido incompletos" });
    }

    const [result] = await db.query(
      `INSERT INTO orders
        (customer_name, phone, delivery_type, payment_method, change_for, cep, street, number, complement, neighborhood, city, uf, additional_comments, status, total, items)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'recebido', ?, ?)`,
      [
        customer_name,
        phone,
        delivery_type,
        payment_method,
        change_for,
        cep,
        street,
        number,
        complement,
        neighborhood,
        city,
        uf,
        additional_comments,
        total,
        JSON.stringify(items),
      ],
    );

    const [orderRows] = await db.query("SELECT * FROM orders WHERE id = ?", [
      result.insertId,
    ]);
    const order = orderRows[0];

    res.status(201).json({
      ...order,
      id: order.id.toString(),
      total: parseFloat(order.total),
      items: JSON.parse(order.items),
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = [
      "recebido",
      "em preparo",
      "pronto",
      "em entrega",
      "entregue",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const [result] = await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    const [orderRows] = await db.query("SELECT * FROM orders WHERE id = ?", [
      id,
    ]);
    if (orderRows.length === 0) {
      return res
        .status(404)
        .json({ error: "Pedido não encontrado após update" });
    }

    const order = orderRows[0];
    res.json({
      ...order,
      id: order.id.toString(),
      total: parseFloat(order.total),
      items:
        typeof order.items === "string" ? JSON.parse(order.items) : order.items,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

module.exports = router;
