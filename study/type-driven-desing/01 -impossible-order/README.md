**Kata 1: Pipeline de Checkout ("The Impossible Order")**

**Contexto del dominio:**
Estás diseñando el motor de estado para el proceso de pago de un e-commerce. La tentación habitual es tener un gran objeto `OrderContext` con campos opcionales (`address?`, `paymentMethod?`, `coupon?`, `transactionId?`). Esto permite atrocidades como procesar un pago sin dirección o aplicar un cupón a un carrito vacío.

**Reglas e Invariantes del Dominio:**

1. **Carrito activo:** Contiene al menos un ítem. Un carrito no puede pasar a fase de envío si la lista de ítems está vacía.
2. **Dirección de envío:** Solo puede agregarse cuando el carrito tiene ítems. La selección del método de envío calcula el coste adicional.
3. **Aplicación de cupones:** Solo se permite aplicar un cupón si hay productos en el carrito. Si se eliminan ítems y el subtotal cae a 0, el estado vuelve a carrito vacío y el cupón se descarta automáticamente por construcción de tipos.
4. **Método de pago:** Requiere obligatoriamente la presencia previa de la dirección de envío elegida y el coste total (subtotal + envío - descuento) congelado.
5. **Confirmación:** Una vez pagado, el estado almacena el ID de transacción y la orden se vuelve inmutable: no se pueden modificar productos, ni dirección, ni cupones.

**Estados imposibles a prevenir mediante el tipo:**

* Un pedido en estado `Paid` sin `transactionId` ni `shippingAddress`.
* Un intento de pago con importe calculado pero sin método de envío seleccionado.
* Consultar la dirección de envío cuando el usuario aún está modificando los productos de su carrito inicial.

**Plantilla de partida (`types.ts`):**

```typescript
export type CartItem = { id: string; price: number; quantity: number };
export type Address = { street: string; city: string; zip: string };
export type ShippingMethod = { id: string; name: string; cost: number };
export type PaymentMethod = { type: "credit_card" | "paypal"; token: string };

// TODO: Define CheckoutState de forma que sea una Unión Discriminada
export type CheckoutState =
  | { tag: "EmptyCart" }
  // | { tag: "EditingCart"; items: [CartItem, ...CartItem[]] } // Non-empty array
  // | ... (Añade Addressing, PaymentSelection, Processing, Completed, Failed)
  ;

export type CheckoutAction =
  | { type: "ADD_ITEM"; item: CartItem }
  // | ... (Añade SET_SHIPPING_ADDRESS, SELECT_SHIPPING_METHOD, APPLY_COUPON, PAY, TRANSACTION_SUCCESS, TRANSACTION_ERROR)
  ;

```
