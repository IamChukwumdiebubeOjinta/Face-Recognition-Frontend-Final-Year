// Drawer.tsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  onClose: () => void;
  onItemClick: (pageName: string) => void;
}

interface DrawerItemProps {
  name: string;
  icon: JSX.Element;
  onClick: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ onClose, onItemClick }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const drawerElement = document.getElementById("drawer");
      if (drawerElement && !drawerElement.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        id="drawer"
        className="relative z-10 w-full transition-transform transform translate-y-full bg-white border-t border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800 sm:translate-y-0 sm:-bottom-[370px] sm:left-0 sm:right-0 animate-slide-in-up mx-[2rem]"
      >
        <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
          {drawerItems.map((item) => (
            <DrawerItem
              key={item.name}
              {...item}
              onClick={() => onItemClick(item.name)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

const DrawerItem: React.FC<DrawerItemProps> = ({ name, icon, onClick }) => {
  return (
    <div
      className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700"
      onClick={onClick}
    >
      <div className="flex justify-center items-center p-2 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
        {icon}
      </div>
      <div className="font-medium text-center text-gray-500 dark:text-gray-400">
        {name}
      </div>
    </div>
  );
};

const drawerItems: Omit<DrawerItemProps, "onClick">[] = [
  {
    name: "Add User",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
    ),
  },
  {
    name: "Remove User",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
    ),
  },
  {
    name: "List Users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
  },
];

export default Drawer;
