import type { CartItem, CustomerData } from "../types";

// Opcional: endereço da loja para retirada (edite se desejar exibir)
const STORE_NAME = "Batata & Massas";
const STORE_ADDRESS = "Rua Exemplo, 123 - Centro"; // ajuste ou deixe vazio se não quiser mostrar

export function sendOrderToRestaurant(
  cartItems: CartItem[],
  customerData: CustomerData,
  total: number
) {
  // Número do restaurante (substitua pelo número real)
  const restaurantPhone = "5516997287873";
  
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
        `• ${item.quantity}x ${item.product.name} - R$ ${item.product.price.toFixed(2)}` +
        (item.comment ? `\n  💬 _${item.comment}_` : "")
    )
    .join("\n");

  const deliveryBlock = buildDeliveryBlock(customerData);
  const paymentBlock = buildPaymentBlock(customerData);

  return `� *NOVO PEDIDO RECEBIDO* 🔔

━━━━━━━━━━━━━━━━━━━━
🟢 *DADOS DO CLIENTE*
━━━━━━━━━━━━━━━━━━━━

👤 *Nome:* ${customerData.name}
📞 *Telefone:* ${customerData.phone}

${deliveryBlock}

${paymentBlock}

━━━━━━━━━━━━━━━━━━━━
🔴 *ITENS DO PEDIDO*
━━━━━━━━━━━━━━━━━━━━

${items}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL: R$ ${total.toFixed(2)}*
━━━━━━━━━━━━━━━━━━━━
${customerData.additionalComments ? `\n📝 *Observações Adicionais:*\n_${customerData.additionalComments}_` : ""}`;
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

  const confirmationDeliveryText = buildCustomerConfirmationLine(customerData);
  const paymentInfo = buildPaymentBlock(customerData);

  return `✅ *Pedido Confirmado!*

Olá ${customerData.name}, seu pedido foi recebido com sucesso! 

⏰ *TEMPO DE PREPARO:* 30 a 40 minutos

${confirmationDeliveryText}

*ITENS DO PEDIDO:*
${items}

*TOTAL: R$ ${total.toFixed(2)}*
${paymentInfo}

${customerData.additionalComments ? `\n*Observações:* ${customerData.additionalComments}\n` : ""}
Agradecemos a preferência! 🙏`;
}

// Monta bloco de entrega/retirada para a mensagem do restaurante
function buildDeliveryBlock(customerData: CustomerData): string {
  if (customerData.deliveryType === "pickup") {
    const storeLine = STORE_ADDRESS ? `${STORE_NAME}\n📍 ${STORE_ADDRESS}` : `${STORE_NAME}`;
    return `🟢 *FORMA DE RECEBIMENTO*
━━━━━━━━━━━━━━━━━━━━

🏪 *RETIRADA NO LOCAL*
${storeLine}`;
  }

  // delivery
  const address = buildAddress(customerData);
  return `🟢 *ENDEREÇO DE ENTREGA*
━━━━━━━━━━━━━━━━━━━━

🚚 *ENTREGA*
📍 ${address}`;
}

// Monta bloco de pagamento
function buildPaymentBlock(customerData: CustomerData): string {
  const paymentMethods = {
    money: '💵 Dinheiro',
    credit: '💳 Cartão de Crédito',
    debit: '💳 Cartão de Débito',
    pix: '📱 PIX'
  };
  
  const paymentLabel = paymentMethods[customerData.paymentMethod];
  
  if (customerData.paymentMethod === 'money' && customerData.changeFor) {
    return `🟢 *FORMA DE PAGAMENTO*
━━━━━━━━━━━━━━━━━━━━

${paymentLabel}
💸 *Troco para:* R$ ${customerData.changeFor}`;
  }
  
  return `🟢 *FORMA DE PAGAMENTO*
━━━━━━━━━━━━━━━━━━━━

${paymentLabel}`;
}

// Linha amigável para o cliente na confirmação
function buildCustomerConfirmationLine(customerData: CustomerData): string {
  if (customerData.deliveryType === "pickup") {
    return `Assim que seu pedido estiver pronto, avisaremos no WhatsApp para retirada${STORE_ADDRESS ? ` em ${STORE_ADDRESS}` : ""}.`;
  }
  const address = buildAddress(customerData);
  return `Será entregue em breve no endereço:\n${address}`;
}

// Monta endereço a partir dos campos disponíveis
function buildAddress(customer: CustomerData): string {
  const parts: string[] = [];
  const line1 = [customer.street, customer.number].filter(Boolean).join(", ");
  if (line1) parts.push(line1);
  const line2 = [customer.neighborhood, customer.city, customer.uf].filter(Boolean).join(" - ");
  if (line2) parts.push(line2);
  if (customer.cep) parts.push(`CEP: ${customer.cep}`);
  if (customer.complement) parts.push(`Compl.: ${customer.complement}`);
  return parts.join("\n");
}