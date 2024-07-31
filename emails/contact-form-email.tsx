interface ContactFormEmailProps {
  email: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  email,
}) => (
  <div>
    <h1>For NewsLetters on latest Movies</h1>
    <p>From {email}</p>
  </div>
);

export default ContactFormEmail;
