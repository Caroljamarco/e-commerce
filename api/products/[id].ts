import { query } from '../_db';

const formatProduct = (p: any) => ({
  ...p,
  id: String(p.id),
  price: parseFloat(p.price),
});

export default async function handler(req: any, res: any) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const rows = await query<any[]>('SELECT * FROM products WHERE id = ?', [id]);
      if (!rows.length) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json(formatProduct(rows[0]));
    }

    if (req.method === 'PUT') {
      const { name, price, description, image, category } = req.body || {};
      const result: any = await query(
        'UPDATE products SET name = ?, price = ?, description = ?, image = ?, category = ? WHERE id = ?',
        [name, price, description ?? null, image ?? null, category, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json(formatProduct({ id, name, price, description, image, category }));
    }

    if (req.method === 'DELETE') {
      const result: any = await query('DELETE FROM products WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
      return res.status(200).json({ message: 'Product deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('API /api/products/[id] error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
