import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui";
import { Button, Input, Label, Textarea } from "../ui";
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
      <DialogContent className="max-w-2xl animate-slide-up">
        <DialogHeader>
          <h2 className="text-3xl font-bold text-gradient">Finalizar Pedido</h2>
          <DialogDescription className="text-lg">
            Preencha seus dados para confirmar o pedido
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium">Nome</Label>
              <Input
                id="name"
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData({ ...customerData, name: e.target.value })
                }
                required
                className="h-12 text-lg"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lg font-medium">WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={customerData.phone}
                onChange={(e) =>
                  setCustomerData({ ...customerData, phone: e.target.value })
                }
                required
                className="h-12 text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-lg font-medium">Endereço de Entrega</Label>
            <Textarea
              id="address"
              placeholder="Rua, número, complemento, bairro"
              value={customerData.address}
              onChange={(e) =>
                setCustomerData({ ...customerData, address: e.target.value })
              }
              required
              rows={3}
              className="text-lg resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalComments" className="text-lg font-medium">Observações (opcional)</Label>
            <Textarea
              id="additionalComments"
              placeholder="Ex: Ponto de referência, horário de entrega preferido, etc..."
              value={customerData.additionalComments}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  additionalComments: e.target.value,
                })
              }
              rows={3}
              className="text-lg resize-none"
            />
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
            <h4 className="text-xl font-bold mb-4 text-gradient">Resumo do Pedido</h4>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center p-3 bg-background rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium">
                      {item.quantity}x {item.product.name}
                    </span>
                    {item.comment && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Obs: {item.comment}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-primary">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-primary/20 mt-4 pt-4 flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary text-2xl">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter className="gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="px-8 py-3">
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary px-8 py-3 text-lg font-semibold">
              📱 Confirmar Pedido
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}