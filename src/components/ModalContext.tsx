"use client";
import ApartmentFilterPopup from "./ApartmentFilterPopup/ApartmentFilterPopup";
import ContactPopup from "./ContactPopup/ContactPopup";
import ReservationPopup from "./ReservationPopup/ReservationPopup";
import SpecifyPopup from "./SpecifyPopup/SpecifyPopup";
import { createContext, useContext, useState, ReactNode } from "react";

type ModalKey = "formA" | "formB" | "formC" | "formD" | null;

interface ModalContextType {
  openModal: (key: ModalKey, payload?: string) => void;
  closeModal: () => void;
  currentModal: ModalKey;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<ModalKey>(null);
  const [modalPayload, setModalPayload] = useState<string>("");
  const openModal = (key: ModalKey, payload?: string) => {
    setCurrentModal(key);
    if (payload) {
      setModalPayload(payload);
    }
  };
  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, currentModal }}>
      {children}

      {currentModal === "formA" && (
        <ApartmentFilterPopup onClose={closeModal} />
      )}

      {currentModal === "formB" && <ContactPopup onClose={closeModal} />}
      {currentModal === "formC" && <ReservationPopup onClose={closeModal} />}
      {currentModal === "formD" && <SpecifyPopup onClose={closeModal} />}
    </ModalContext.Provider>
  );
};

export const closeIco = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path
      d="M5.83203 5.83301L14.1654 14.1663M5.83203 14.1663L14.1654 5.83301"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
