import{cart}from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';
import {formatcurrency} from '../utils/money.js';

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;

   cart.forEach((cartItem)=>{
    console.log('Cart Item:', cartItem);
  const product= getProduct(cartItem.productId);
  productPriceCents+=product.priceCents*cartItem.quantity 

  const deliveryOption=getDeliveryOptions(cartItem.deliveryOptionId);
  shippingPriceCents+=deliveryOption.priceCents;
 });
 

 const totalPriceCents=productPriceCents+shippingPriceCents;
const taxCents=totalPriceCents*0.1;
const totalCents=totalPriceCents+taxCents;


const payementsummaryHTML=`
<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatcurrency(productPriceCents)}</div>

          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatcurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatcurrency(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatcurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatcurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>                  

`;
document.querySelector('.js-payment-summary').innerHTML=payementsummaryHTML;

}