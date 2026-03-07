import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 w-full mt-10 border-t border-gray-800 text-gray-400 text-center py-6">
      <p>© {new Date().getFullYear()} SkillScan AI • Built by Nitish</p>
    </footer>
  );
};

export default Footer;