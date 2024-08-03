import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WebcamStreamCapture } from "./shared";
import Drawer from "./Drawer";
import { AddUserPage, ListUsersPage, RemoveUserPage, UserModal } from "../pages";
import { UserProvider } from "../context";
import * as faceapi from "face-api.js";


const WebcamHero = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handlePageChange = (pageName: string) => {
    setCurrentPage(pageName);
    setIsDrawerOpen(false);
    setIsCameraActive(false); // Turn off the camera when a page is opened
  };

  const closePage = () => {
    setCurrentPage(null);
    setIsCameraActive(true); // Turn the camera back on when the page is closed
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Add User":
        return <AddUserPage onClose={closePage} />;
      case "Remove User":
        return <RemoveUserPage onClose={closePage} />;
      case "List Users":
        return <ListUsersPage onClose={closePage} />;
      default:
        return null;
    }
  };

  const showModal = (data) => {
    setModalData(data);
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      setModalData(null);
    }, 5000);
  };

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model");
    };
    loadModels();
  }, []);

  return (
    <UserProvider>
      <div className="relative overflow-hidden">
        <div className="pt-16 pb-80 sm:pb-40 sm:pt-24 lg:pb-24 lg:pt-40">
          <div className="relative px-4 mx-auto max-w-7xl sm:static sm:px-6 lg:px-8">
            <div className="relative px-3 py-1 mb-2 text-sm leading-6 text-center text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Simple Security System with WebCam
            </div>
            <WebcamStreamCapture
              toggleDrawer={toggleDrawer}
              isActive={isCameraActive}
              onFaceVerified={showModal}
            />
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <Drawer onClose={toggleDrawer} onItemClick={handlePageChange} />
      )}
      {currentPage && createPortal(renderPage(), document.body)}
      {isModalVisible && modalData && <UserModal data={modalData} />}
    </UserProvider>
  );
};

export default WebcamHero;
