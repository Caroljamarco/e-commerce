import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui";
import { Button, Input, Label, Textarea } from "../ui";
import "./checkout.css";
import type { CartItem, CustomerData } from "../../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSubmitOrder: (customerData: CustomerData) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onSubmitOrder,
}: CheckoutModalProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    phone: "",
    address: "",
    additionalComments: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOrder(customerData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="checkout-content">
        <DialogHeader>
          <h2 className="text-3xl font-bold text-gradient">Finalizar Pedido</h2>
          <DialogDescription className="text-lg">Preencha seus dados para confirmar o pedido</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="checkout-form space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="label-small">Nome</Label>
              <Input id="name" value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} required className="" placeholder="Seu nome completo" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="label-small">WhatsApp</Label>
              <Input id="phone" type="tel" placeholder="(11) 99999-9999" value={customerData.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="label-small">Endereço de Entrega</Label>
            <Textarea id="address" placeholder="Rua, número, complemento, bairro" value={customerData.address} onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })} required rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalComments" className="label-small">Observações (opcional)</Label>
            <Textarea id="additionalComments" placeholder="Ex: Ponto de referência, horário de entrega preferido, etc..." value={customerData.additionalComments} onChange={(e) => setCustomerData({ ...customerData, additionalComments: e.target.value })} rows={3} />
          </div>

          <div className="summary-box">
            <h4 className="text-xl font-bold mb-4 text-gradient">Resumo do Pedido</h4>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.product.id} className="summary-item">
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600 }}>
                      {item.quantity}x {item.product.name}
                    </span>
                    {item.comment && <p className="product-desc">Obs: {item.comment}</p>}
                  </div>
                  <span style={{ fontWeight: 700, color: 'hsl(var(--primary))' }}>
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span style={{ color: 'hsl(var(--primary))', fontSize: '1.25rem', fontWeight: 700 }}>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter className="actions-gap">
            <Button type="button" variant="outline" onClick={onClose} className="btn-cancel">Cancelar</Button>
            <Button type="submit" className="btn-submit">📱 Confirmar Pedido</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}