import { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("en");
  const toggleLanguage = () => setCurrentLang((lang) => (lang === "es" ? "en" : "es"));

  return (
    <LanguageContext.Provider value={{ currentLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado
export const useLanguage = () => useContext(LanguageContext);