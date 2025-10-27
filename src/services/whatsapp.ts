import type { CartItem, CustomerData } from "../types";

export function sendOrderToRestaurant(
  cartItems: CartItem[],
  customerData: CustomerData,
  total: number
) {
  // Número do restaurante (substitua pelo número real)
  const restaurantPhone = "5516993343948";
  
  // Monta a mensagem do pedido
  const message = formatOrderMessage(cartItems, customerData, total);
  
  // Abre o WhatsApp com a mensagem
  window.open(
    `https://wa.me/${restaurantPhone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

export function sendConfirmationToCustomer(
  cartItems: CartItem[],
  customerData: CustomerData,
  total: number
) {
  // Formata o número do cliente
  const customerPhone = customerData.phone.replace(/\D/g, "");
  
  // Monta a mensagem de confirmação
  const message = formatConfirmationMessage(cartItems, customerData, total);
  
  // Abre o WhatsApp com a mensagem
  window.open(
    `https://wa.me/${customerPhone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function formatOrderMessage(
  cartItems: CartItem[],
  customerData: CustomerData,
  total: number
) {
  const items = cartItems
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2)})` +
        (item.comment ? `\n  Obs: ${item.comment}` : "")
    )
    .join("\n");

  return `🛵 *NOVO PEDIDO*

*Cliente:* ${customerData.name}
*Telefone:* ${customerData.phone}
*Endereço:* ${customerData.address}

*ITENS DO PEDIDO:*
${items}

*TOTAL: R$ ${total.toFixed(2)}*

${customerData.additionalComments ? `\n*Observações:* ${customerData.additionalComments}` : ""}`;
}

function formatConfirmationMessage(
  cartItems: CartItem[],
  customerData: CustomerData,
  total: number
) {
  const items = cartItems
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2)})` +
        (item.comment ? `\n  Obs: ${item.comment}` : "")
    )
    .join("\n");

  return `✅ *Pedido Confirmado!*

Olá ${customerData.name}, seu pedido foi recebido e será entregue em breve no endereço:
${customerData.address}

*ITENS DO PEDIDO:*
${items}

*TOTAL: R$ ${total.toFixed(2)}*

${customerData.additionalComments ? `\n*Observações:* ${customerData.additionalComments}\n` : ""}
Agradecemos a preferência! 🙏`;
}