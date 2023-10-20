const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51J2IGXSCNND4eepqdE6XdNlX7iJKuZRRYwky7q5uOxIROMTZY10LrKRZ93zpB1jaoiBS3iBWmgB1Q4TWg9lMSS7200MC51XUh0'
);

app.use(express.json());
app.use(cors());

app.post('/api/create-checkout-session', async (req, res) => {
  const { products } = req.body;
  const lineItems = products?.map((item) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: item?.name,
      },
      unit_amount: item?.price,
    },
    quantity: item?.amount,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 5000,
            currency: 'inr',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    payment_method_types: ['card'],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cart',
  });
  res.json({ id: session.id });
});
app.listen(7000, () => {
  console.info('server started');
});
