import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    
    res.status(200).json({ success: true, message: "Order processed and email sent." });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ error: "Failed to process order and send email." });
  }
}
