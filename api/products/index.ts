import { query } from '../_db';

// Helpers to normalize DB output for the frontend
const formatProduct = (p: any) => ({
  ...p,
  id: String(p.id),
  price: parseFloat(p.price),
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const rows = await query<any[]>('SELECT * FROM products ORDER BY id DESC');
      return res.status(200).json(rows.map(formatProduct));
    }

    if (req.method === 'POST') {
      const { name, price, description, image, category } = req.body || {};

      if (!name || price == null || !category) {
        return res.status(400).json({ error: 'Missing required fields: name, price, category' });
      }

      const result: any = await query(
        'INSERT INTO products (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
        [name, price, description ?? null, image ?? null, category]
      );

      return res.status(201).json(
        formatProduct({ id: result.insertId, name, price, description, image, category })
      );
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('API /api/products error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
