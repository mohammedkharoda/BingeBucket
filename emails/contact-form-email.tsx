import React from "react";

interface ContactFormSubmissionProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormSubmissionEmail: React.FC<
  Readonly<ContactFormSubmissionProps>
> = ({ name, email, message }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: "20px",
      lineHeight: "1.6",
    }}
  >
    <h1 style={{ color: "#FFB400" }}>📧 New Contact Form Submission</h1>
    <p>
      <strong>{name}</strong> has reached out to you through the contact form.
      Here are the details of the message:
    </p>
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a
          href={`mailto:${email}`}
          style={{ color: "#FFB400", textDecoration: "none" }}
        >
          {email}
        </a>
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>
    </div>
    <p style={{ marginTop: "20px" }}>
      Please respond to{" "}
      <a
        href={`mailto:${email}`}
        style={{ color: "#FFB400", textDecoration: "none" }}
      >
        {email}
      </a>{" "}
      as soon as possible.
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

export default ContactFormSubmissionEmail;
