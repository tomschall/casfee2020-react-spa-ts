import React, { useState } from 'react';
import AddChannelModal from './AddChannelModal';
import { useRecoilState } from 'recoil';
import { channelModalOpenState } from '../../atom.js';
import { Button, Menu, MenuItem, styled } from '@material-ui/core';

const SidebarMenuButton = styled(Button)({
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  margin: '20px 0 0 0',
  padding: '0 30px',
});

const SidebarMenu = styled(Menu)({});

const AddChannel: React.FC<any> = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [channelModalOpen, setChannelModalOpen] = useRecoilState<any>(
    channelModalOpenState,
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setChannelModalOpen(false);
  };

  const handleOpen = () => {
    setChannelModalOpen(true);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <SidebarMenuButton
        color="primary"
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </SidebarMenuButton>
      <SidebarMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpen}>Add Channel</MenuItem>
        {channelModalOpen && (
          <AddChannelModal
            onSuccess={handleClose}
          />
        )}
      </SidebarMenu>
    </React.Fragment>
  );
};

export default AddChannel;
