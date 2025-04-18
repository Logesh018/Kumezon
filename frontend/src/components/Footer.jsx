const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
      &copy; {year} Kumezon. All rights reserved.
    </footer>
  );
};

export default Footer;