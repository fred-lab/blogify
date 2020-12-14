import React from 'react';

const Header = ({ children }) => (
  <header className="header-container">{children}</header>
);

const Main = ({ children }) => (
  <main className="main-container">{children}</main>
);

const Footer = ({ children }) => (
  <footer className="footer-container">{children}</footer>
);

export { Header, Main, Footer };
