// src/hooks/useNavBar.js

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
// import logoutUser from "../logic/auth/logoutUser";

//  Maneja el estado de los menús desplegables, el drawer y las funciones de navegación.

const useNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorElHome, setAnchorElHome] = useState(null);
  const openHome = Boolean(anchorElHome);
  const [anchorElOpp, setAnchorElOpp] = useState(null);
  const openOpp = Boolean(anchorElOpp);
  const location = useLocation();
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleHomeClick = (event) => {
    setAnchorElHome(event.currentTarget);
  };

  const handleHomeClose = () => {
    setAnchorElHome(null);
  };

  const handleOppClick = (event) => {
    setAnchorElOpp(event.currentTarget);
  };

  const handleOppClose = () => {
    setAnchorElOpp(null);
  };

  const handleMenuItemClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100); // Breve retraso para asegurar que la navegación haya finalizado si es necesario
    handleHomeClose(); // Cierra el menú después de la selección
  };

  const scrollToSection = (sectionId) => {
    handleHomeClose();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogout = () => {
    logoutUser();
  };

  return {
    isDrawerOpen,
    anchorElHome,
    anchorElOpp,
    openHome,
    openOpp,
    handleHomeClick,
    handleHomeClose,
    handleOppClick,
    handleOppClose,
    handleLogout,
    toggleDrawer,
    handleMenuItemClick,
  };
};

export default useNavBar;
