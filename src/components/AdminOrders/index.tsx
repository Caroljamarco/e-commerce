import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../ui";
import type { Order, OrderStatus } from "../../types";
import { orderService } from "../../services/api";
import "../AdminPage/admin.css";

const statusOptions: OrderStatus[] = ['recebido', 'em preparo', 'pronto', 'em entrega', 'entregue'];

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      const updated = await orderService.updateStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      toast.success('Status atualizado com sucesso');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2">
            Voltar
          </Button>
          <div>
            <h1 className="admin-title">Pedidos</h1>
            <p className="admin-subtitle">Acompanhe e atualize o status dos pedidos</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>Produtos</Button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando pedidos...</div>
      ) : (
        <section className="order-section">
          <h2 className="section-title">📦 Pedidos ({orders.length})</h2>
          {orders.length === 0 ? (
            <p>Nenhum pedido registrado.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span><strong>Pedido:</strong> {order.id}</span>
                    <span><strong>Status:</strong> {order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Cliente:</strong> {order.customer_name} • <strong>Telefone:</strong> {order.phone}</p>
                    <p><strong>Total:</strong> R$ {order.total.toFixed(2)} • <strong>Pagamento:</strong> {order.payment_method}</p>
                    <p><strong>Entraga:</strong> {order.delivery_type === 'delivery' ? 'Entrega' : 'Retirada'}</p>
                    <p><strong>Itens:</strong> {order.items.map((item) => `${item.quantity}x ${item.product.name}`).join(', ')}</p>
                  </div>
                  <div className="order-actions" style={{ marginTop: '0.75rem' }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
