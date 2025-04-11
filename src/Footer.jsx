import React from 'react';

// Dit is de hoofdfunctie van de footer
const Footer = () => {
  return (
    <footer className="footer">
      <p>CryptoPulse © {new Date().getFullYear()}</p> {/* Copyright-tekst */}
      <p>All rights reserved.</p> {/* Extra tekst */}
    </footer>
  );
};

export default Footer;