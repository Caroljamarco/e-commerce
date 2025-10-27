export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "potato" | "pasta";
}

export interface CartItem {
  product: Product;
  quantity: number;
  comment?: string;
}

export interface CustomerData {
  name: string;
  phone: string;
  deliveryType: "delivery" | "pickup";
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
  additionalComments: string;
}