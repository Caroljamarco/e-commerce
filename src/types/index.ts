export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "potato" | "pasta" | "beverage";
  active?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  comment?: string;
}

export type OrderStatus = 'recebido' | 'em preparo' | 'pronto' | 'em entrega' | 'entregue';

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  delivery_type: 'delivery' | 'pickup';
  payment_method: 'money' | 'credit' | 'debit' | 'pix';
  change_for?: string | null;
  cep?: string | null;
  street?: string | null;
  number?: string | null;
  complement?: string | null;
  neighborhood?: string | null;
  city?: string | null;
  uf?: string | null;
  additional_comments?: string | null;
  status: OrderStatus;
  total: number;
  items: {
    product: Product;
    quantity: number;
    comment?: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface CustomerData {
  name: string;
  phone: string;
  deliveryType: "delivery" | "pickup";
  paymentMethod: "money" | "credit" | "debit" | "pix";
  changeFor?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  additionalComments: string;
}