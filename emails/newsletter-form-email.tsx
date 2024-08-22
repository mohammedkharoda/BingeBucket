import React from "react";

interface ContactFormEmailProps {
  email: string;
}

const NewsLetterForm: React.FC<Readonly<ContactFormEmailProps>> = ({
  email,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: "20px",
      lineHeight: "1.6",
    }}
  >
    <h1 style={{ color: "#FFB400" }}>🎬 Welcome to Our Movie Newsletter!</h1>
    <p>
      Hello there! <br />
      We're thrilled to have you on board. By subscribing to our newsletter,
      you'll stay updated with the latest movies, series, and entertainment news
      directly in your inbox.
    </p>
    <p>
      This is a confirmation that we've successfully received your subscription
      request from <strong>{email}</strong>.
    </p>
    <p>
      We'll make sure you're the first to know about the latest blockbusters,
      upcoming series, and exclusive content.
    </p>
    <p style={{ marginTop: "20px", fontWeight: "bold" }}>
      Stay tuned and happy watching! 🍿
    </p>
    <p style={{ color: "#888", fontSize: "14px" }}>
      If you did not request this subscription, please disregard this email.
    </p>
    <footer
      style={{
        marginTop: "30px",
        borderTop: "1px solid #ddd",
        paddingTop: "10px",
        textAlign: "center",
        fontSize: "12px",
        color: "#999",
      }}
    >
      © {new Date().getFullYear()} MovieHub. All rights reserved.
    </footer>
  </div>
);

export default NewsLetterForm;
