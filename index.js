const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q5Vy72N9ZRnb1QYmbRA4Le1CKlc4JkaAMTy9y8vN8zfpqWrSq7msYvSBonJZgjndtmLrLQszhJd4XJaENRRBaHD00f955s3mW"); // Have to fill this

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { items } = req.body;
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//         quantity: item.quantity,
//       },
//     }));
// console.log(line_items);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: "https://www.cashfree.com/blog/payment-success-page/", // dont forget to change
//       cancel_url: "https://webflow.com/made-in-webflow/website/failed-payment-page",  // dont forget to change
//     });
//     console.log(session.id);
//     res.json({ id: session.id });
//   } catch (error) {
//     console.log("Error creating Stripe session:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//   }
// });


app.post('/create-checkout-session', async(req, res) => {
    try {
        const { items } = req.body;
        const line_items = await items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }));
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: "https://mellow-medovik-b82816.netlify.app/success",
            cancel_url: "https://mellow-medovik-b82816.netlify.app/cancel",
        });
        res.json({id: session.id});
    } catch(error){
        console.log(error);
    }
})

app.listen(4242, () => {
  console.log("Server is running on port 4242");
});
