"use client";

import { useEffect, useState } from "react";

const ESCAPE_CODE = "Escape";

export interface UseModalReturn {
  hideModal: () => void,
  showModal: () => void,
  isActive: boolean
}

export default function useModal(): UseModalReturn {
  const [isActive, setIsActive] = useState(false);

  const hideModal = (): void => {
    setIsActive(false);
  };

  const showModal = (): void => {
    setIsActive(true);
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if(e.code === ESCAPE_CODE) {
        e.preventDefault();

        hideModal();
      }
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, []);

  return {
    hideModal,
    showModal,
    isActive
  };
}
