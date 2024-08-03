import { FC } from "react";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className = "" }) => {
  const date = new Date().getFullYear();
  return (
    <footer
      className={`m-4 bg-white shadow rounded-3xl dark:bg-gray-800 ${className}`}
    >
      <div className="w-full p-4 md:flex md:items-center md:justify-between">
        <span className="flex items-center gap-2 text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <img src="/logo.png" className="size-20" />
          {date} All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Auth
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              WebCam
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
