const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Order confirmation
exports.sendOrderConfirmation = async (order, userEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Order Confirmation - Brew Haven Cafe',
    html: `
      <h1 style="color:#b45309;">Thank you for your order!</h1>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Estimated prep time:</strong> ${order.estimatedMinutes} minutes</p>
      <p>We'll notify you when it's ready.</p>
      <br/>
      <p>Visit us at: #42, 100 Feet Road, Indiranagar, Bengaluru</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

// Reservation confirmation
exports.sendReservationConfirmation = async (reservation, userEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Reservation Confirmed - Brew Haven Cafe',
    html: `
      <h1 style="color:#b45309;">Reservation Confirmed!</h1>
      <p><strong>Booking ID:</strong> ${reservation._id}</p>
      <p><strong>Date:</strong> ${reservation.date} at ${reservation.time}</p>
      <p><strong>Guests:</strong> ${reservation.guests}</p>
      <p><strong>Seating:</strong> ${reservation.seatingArea}</p>
      ${reservation.specialRequest ? `<p><strong>Special Request:</strong> ${reservation.specialRequest}</p>` : ''}
      <br/>
      <p>We look forward to welcoming you!</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};