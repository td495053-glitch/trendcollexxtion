import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { 
        firstName, lastName, email, phone, 
        address, city, state, zipCode, country, 
        cart, total, paymentMethod 
      } = req.body;

      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        console.error("Missing SMTP_USER or SMTP_PASS environment variables.");
        return res.status(500).json({ error: "Email configuration is missing on the server." });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Format cart items for email
      const cartItemsHtml = cart.map((item: any) => 
        `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}</li>`
      ).join("");

      const paymentMethodName = paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 
                               paymentMethod === 'upi' ? 'Google Pay / UPI' : 
                               paymentMethod;

      const mailOptions = {
        from: smtpUser,
        to: smtpUser, // Send to the store owner
        subject: `Order Confirmation - ${firstName} ${lastName}`,
        html: `
          <h2>New Order Received!</h2>
          <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          
          <h3>Shipping Address</h3>
          <p>${address}<br/>${city}, ${state} ${zipCode}<br/>${country}</p>
          
          <h3>Order Details</h3>
          <ul>
            ${cartItemsHtml}
          </ul>
          <h3><strong>Total Amount:</strong> ₹${total}</h3>
          <h3><strong>Payment Method:</strong> ${paymentMethodName}</h3>
        `,
      };

      await transporter.sendMail(mailOptions);
      
      res.json({ success: true, message: "Order processed and email sent." });
    } catch (error) {
      console.error("Error processing checkout:", error);
      res.status(500).json({ error: "Failed to process order and send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
