import Link from "next/link";
import Image from "next/image";

const Footer = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <footer className="bg-black bottom-0 text-white mt-10">
      <div className="text-sm container mx-auto py-4 px-4 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <p>Jalan M. Kahfi II Jagakarsa, Jakarta Selatan</p>
          <p>Kode Pos 12620</p>
        </div>
        <div className="lg:w-1/3 mb-4 lg:mb-0">
          <p>Customer Service: <br /> 0878-1564-7503</p>
        </div>
        <div className="lg:w-1/3">
          <p>Customer Care: <br /> mahirdigital.id@gmail.com</p>
        </div>
      </div>
      <div className="bg-yellow-500 text-black p-1 text-center">
        <p className="text-sm">Copyright © 2024 Mahir Digital. All Rights Reserved.</p>
      </div>
      </footer>
  );
};

export default Footer;
