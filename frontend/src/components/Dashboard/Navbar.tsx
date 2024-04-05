import { useState } from 'react';
import WorkspaceModal from './Navbar/WorkspaceModal';
import NavbarDrawer from './Navbar/NavbarDrawer';
import { useAuth } from '../../context/AuthContextProvider';

const Navbar = () => {
  const { token } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prevVal) => !prevVal);
  };

  return (
    <>
      <NavbarDrawer toggleModal={toggleModal} token={token} />
      <WorkspaceModal
        openModal={openModal}
        toggleModal={toggleModal}
        token={token}
      />
    </>
  );
};

export default Navbar;
