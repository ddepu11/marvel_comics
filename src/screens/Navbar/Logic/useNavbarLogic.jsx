import { useState } from 'react';

const useNavbarLogic = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleActiveLink = (e) => {
    const link = e.target.getAttribute('href').slice(1);
    setActiveLink(link);
  };

  return { activeLink, handleActiveLink };
};

export default useNavbarLogic;
