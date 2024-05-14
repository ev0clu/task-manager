import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListModalDelete from '../Modal/ListModalDelete';
import ListModalUpdate from '../Modal/ListModalUpdate';

type ListMenuProps = {
  workspaceId: string | undefined;
  boardId: string | undefined;
  listId: string | undefined;
  listTitle: string | undefined;
};

const ListMenu = ({
  workspaceId,
  boardId,
  listId,
  listTitle
}: ListMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const toggleDeleteModal = () => {
    setOpenDeleteModal((prevVal) => !prevVal);
    handleClose();
  };

  const toggleUpdateModal = () => {
    setOpenUpdateModal((prevVal) => !prevVal);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={toggleUpdateModal}>Update</MenuItem>
        <MenuItem onClick={toggleDeleteModal}>Delete</MenuItem>
      </Menu>
      <ListModalUpdate
        openModal={openUpdateModal}
        toggleModal={toggleUpdateModal}
        workspaceId={workspaceId}
        boardId={boardId}
        listId={listId}
      />
      <ListModalDelete
        openModal={openDeleteModal}
        toggleModal={toggleDeleteModal}
        workspaceId={workspaceId}
        boardId={boardId}
        listId={listId}
        listTitle={listTitle}
      />
    </div>
  );
};

export default ListMenu;
