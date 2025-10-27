import { useState, useRef, useEffect } from "react";
import IMask from 'imask';
import { toast } from 'sonner';

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
import { searchCEP } from "../../services/cep";

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
    deliveryType: "delivery",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    uf: "",
    additionalComments: "",
  });

  const [isLoadingCEP, setIsLoadingCEP] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Phone mask
    if (phoneRef.current) {
      IMask(phoneRef.current, {
        mask: '(00) 00000-0000'
      });
    }

    // CEP mask
    if (cepRef.current) {
      IMask(cepRef.current, {
        mask: '00000-000'
      });
    }
  }, []);

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerData({ ...customerData, cep: value });

    // Busca CEP quando completar 8 dígitos
    if (value.replace(/\D/g, '').length === 8) {
      setIsLoadingCEP(true);
      try {
        const addressData = await searchCEP(value);
        setCustomerData(prev => ({
          ...prev,
          street: addressData.logradouro,
          neighborhood: addressData.bairro,
          city: addressData.localidade,
          uf: addressData.uf,
          complement: addressData.complemento || prev.complement
        }));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Erro ao buscar CEP');
      } finally {
        setIsLoadingCEP(false);
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerData({ ...customerData, phone: value });
  };

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
              <Input 
                ref={phoneRef}
                id="phone" 
                type="tel" 
                placeholder="(11) 99999-9999" 
                value={customerData.phone} 
                onChange={handlePhoneChange} 
                required 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="delivery-type-selector">
              <Label className="label-small mb-2">Tipo de Entrega</Label>
              <div className="delivery-options">
                <button
                  type="button"
                  className={`delivery-option ${customerData.deliveryType === 'delivery' ? 'active' : ''}`}
                  onClick={() => setCustomerData({ ...customerData, deliveryType: 'delivery' })}
                >
                  🚚 Delivery
                </button>
                <button
                  type="button"
                  className={`delivery-option ${customerData.deliveryType === 'pickup' ? 'active' : ''}`}
                  onClick={() => setCustomerData({ ...customerData, deliveryType: 'pickup' })}
                >
                  🏪 Retirar no Local
                </button>
              </div>
              {customerData.deliveryType === 'pickup' && (
                <p className="text-sm mt-2 text-muted-foreground">
                  ⏰ Seu pedido estará pronto para retirada em aproximadamente 40 minutos a 1 hora após a confirmação.
                </p>
              )}
            </div>

            {customerData.deliveryType === 'delivery' && (
              <div className="address-fields space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep" className="label-small">CEP</Label>
                    <Input
                      ref={cepRef}
                      id="cep"
                      placeholder="00000-000"
                      value={customerData.cep}
                      onChange={handleCEPChange}
                      required
                      disabled={isLoadingCEP}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street" className="label-small">Rua/Avenida</Label>
                    <Input
                      id="street"
                      placeholder="Nome da rua"
                      value={customerData.street}
                      onChange={(e) => setCustomerData({ ...customerData, street: e.target.value })}
                      required
                      disabled={isLoadingCEP}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number" className="label-small">Número</Label>
                    <Input
                      id="number"
                      placeholder="123"
                      value={customerData.number}
                      onChange={(e) => setCustomerData({ ...customerData, number: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement" className="label-small">Complemento (opcional)</Label>
                    <Input
                      id="complement"
                      placeholder="Apto 123, Bloco B"
                      value={customerData.complement}
                      onChange={(e) => setCustomerData({ ...customerData, complement: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood" className="label-small">Bairro</Label>
                    <Input
                      id="neighborhood"
                      placeholder="Seu bairro"
                      value={customerData.neighborhood}
                      onChange={(e) => setCustomerData({ ...customerData, neighborhood: e.target.value })}
                      required
                      disabled={isLoadingCEP}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="label-small">Cidade</Label>
                    <Input
                      id="city"
                      value={customerData.city}
                      onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                      required
                      disabled={isLoadingCEP}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uf" className="label-small">Estado</Label>
                    <Input
                      id="uf"
                      value={customerData.uf}
                      onChange={(e) => setCustomerData({ ...customerData, uf: e.target.value })}
                      required
                      disabled={isLoadingCEP}
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalComments" className="label-small">
              {customerData.deliveryType === 'delivery' ? 'Observações (opcional)' : 'Horário de Retirada (opcional)'}
            </Label>
            <Textarea
              id="additionalComments"
              placeholder={customerData.deliveryType === 'delivery' 
                ? "Ex: Ponto de referência, horário de entrega preferido, etc..."
                : "Observação: Seu pedido estará pronto em 40min-1h. Se precisar retirar em um horário específico, informe aqui."}
              value={customerData.additionalComments}
              onChange={(e) => setCustomerData({ ...customerData, additionalComments: e.target.value })}
              rows={3}
            />
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
            <Button type="submit" className="btn-submit" disabled={isLoadingCEP}>
              {isLoadingCEP ? "Carregando..." : "📱 Confirmar Pedido"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}