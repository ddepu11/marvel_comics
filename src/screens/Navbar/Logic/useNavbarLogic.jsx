import { useState } from 'react';

const useNavbarLogic = () => {
  const [activeLink, setActiveLink] = useState('/');

  const handleActiveLink = (e) => {
    if (e.target.getAttribute('href') === '/') {
      setActiveLink('/');
    } else {
      const link = e.target.getAttribute('href').slice(1);
      setActiveLink(link);
    }
  };

  return { activeLink, handleActiveLink };
};

export default useNavbarLogic;
