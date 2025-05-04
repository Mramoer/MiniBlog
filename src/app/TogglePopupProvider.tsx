import { createContext, useContext, useState } from 'react';

type PopupContextType = {
  isDeletePopupOpen: boolean;
  setDeletePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditPopupOpen: boolean;
  setEditPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreatePopupOpen: boolean;
  setCreatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("Error occured while creating context");
  }
  return context;
};

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{
      isDeletePopupOpen,
      setDeletePopupOpen,
      isEditPopupOpen,
      setEditPopupOpen,
      isCreatePopupOpen,
      setCreatePopupOpen
    }}>
      {children}
    </PopupContext.Provider>
  );
};