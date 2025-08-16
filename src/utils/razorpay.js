

export const triggerRazorpay = async ({ amount, user }) => {
  try {
    // 1️⃣ Create Razorpay order on backend
    const { data: order } = await axios.post(
      "http://localhost:5000/api/razorpay/create-order",
      { amount, currency: "INR" }
    );

    if (!order.id) {
      alert("Order creation failed!");
      return;
    }

    // 2️⃣ Open Razorpay checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Public key
      amount: order.amount,
      currency: order.currency,
      name: "Campus Zaika",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ Verify payment on backend
        const { data: verifyRes } = await axios.post(
          "http://localhost:5000/api/razorpay/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        if (verifyRes.status === "success") {
          alert("✅ Payment successful!");
        } else {
          alert("❌ Payment verification failed!");
        }
      },
      prefill: {
        name: user?.name || "Customer",
        email: user?.email || "test@example.com",
        contact: user?.phone || "9999999999",
      },
      theme: {
        color: "#FF5733",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Razorpay payment error:", error);
    alert("Payment failed. Please try again.");
  }
};
