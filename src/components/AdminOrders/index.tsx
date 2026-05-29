import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../ui";
import type { Order, OrderStatus } from "../../types";
import { orderService } from "../../services/api";
import "../AdminPage/admin.css";

const statusOptions: OrderStatus[] = ['recebido', 'em preparo', 'pronto', 'em entrega', 'entregue'];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'recebido': return '#f59e0b'; // amarelo
    case 'em preparo': return '#3b82f6'; // azul
    case 'pronto': return '#10b981'; // verde
    case 'em entrega': return '#8b5cf6'; // roxo
    case 'entregue': return '#6b7280'; // cinza
    default: return '#6b7280';
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'recebido': return '📥';
    case 'em preparo': return '👨‍🍳';
    case 'pronto': return '✅';
    case 'em entrega': return '🚚';
    case 'entregue': return '📦';
    default: return '📋';
  }
};

const formatDateBR = (date: string) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case 'money':
      return 'Dinheiro';
    case 'credit':
      return 'Crédito';
    case 'debit':
      return 'Débito';
    case 'pix':
      return 'PIX';
    default:
      return method;
  }
};

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterDate, setFilterDate] = useState('');
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

  const filteredOrders = filterDate
    ? orders.filter((order) => {
        if (!order.created_at) return false;
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === filterDate;
      })
    : orders;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label htmlFor="order-filter-date" style={{ fontWeight: 'bold' }}>
            Filtrar por dia:
          </label>
          <input
            id="order-filter-date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />
          <Button variant="outline" onClick={() => setFilterDate('')}>
            Mostrar todos
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>Produtos</Button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando pedidos...</div>
      ) : (
        <>
          <section className="order-section">
            <h2 className="section-title">📦 Pedidos ({filteredOrders.length})</h2>
              {filterDate && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#4b5563' }}>
                  Mostrando pedidos de <strong>{formatDateBR(filterDate)}</strong> ({filteredOrders.length})
                  {` de ${orders.length} no total`}
                </p>
              )}
            {orders.length === 0 ? (
              <p>Nenhum pedido registrado.</p>
            ) : (
              <div className="orders-list" style={{ gap: '1.5rem' }}>
                {filteredOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="order-card"
                    style={{
                      border: `2px solid ${getStatusColor(order.status)}`,
                      borderRadius: '12px',
                      padding: '1.5rem',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      marginBottom: '1rem'
                    }}
                  >
                    <div className="order-header" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>📋</span>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                          Pedido #{filterDate ? index + 1 : order.id}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: getStatusColor(order.status),
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        <span>{getStatusIcon(order.status)}</span>
                        <span>{order.status}</span>
                      </div>
                    </div>

                    <div className="order-details" style={{ marginBottom: '1.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            <strong>💰 Pagamento:</strong> {getPaymentMethodLabel(order.payment_method)}
                          </p>
                          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            <strong>📱 Telefone:</strong> {order.phone}
                          </p>
                        </div>
                        <div>
                          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            <strong>💰 Total:</strong> R$ {order.total.toFixed(2)}
                          </p>
                          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            <strong>💳 Forma de pagamento:</strong> {getPaymentMethodLabel(order.payment_method)}
                          </p>
                        </div>
                      </div>

                      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                        <strong>🚚 Entrega:</strong> {order.delivery_type === 'delivery' ? 'Entrega' : 'Retirada'}
                      </p>

                      <div style={{ marginTop: '1rem' }}>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>🛒 Itens:</p>
                        <div style={{
                          backgroundColor: '#f9fafb',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          {order.items.map((item, index) => (
                            <div key={index} style={{ marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                              {item.quantity}x {item.product.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="order-actions" style={{
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                        style={{
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          border: `2px solid ${getStatusColor(order.status)}`,
                          backgroundColor: 'white',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: getStatusColor(order.status),
                          cursor: 'pointer',
                          minWidth: '200px',
                          textAlign: 'center'
                        }}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {getStatusIcon(status)} {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
