import React from "react";

const Footer = () => {
  return (
    <div className="footer container h-[45px] flex flex-col flex-between flex-auto">
      © copyright All rights reserved {new Date().getFullYear()} | Anouar EL HARTI
    </div>
  );
};

export default Footer;
