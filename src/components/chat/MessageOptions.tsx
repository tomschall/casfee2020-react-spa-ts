import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuList, MenuItem, Fade } from '@material-ui/core';
import { Reply, Edit } from '@material-ui/icons/';
import ThreadReply from './threads/ThreadReply';
import ThreadReplyIn from './threads/ThreadReplyIn';
import DeleteMessageWrapper from './DeleteMessageWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiIconButton-sizeSmall': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    '& .MuiSvgIcon-root': {
      width: '.75em',
      height: '.75em',
      padding: 2,
    },
    '& .MuiPaper-root': {
      display: 'none',
    },
  },
}));

interface MessageOptionsProps {
  message: any;
  channelName: string;
  messageId: number | null;
  handleShowUpdate: () => void;
}

const MessageOptions: React.FC<MessageOptionsProps> = ({
  message,
  channelName,
  messageId,
  handleShowUpdate,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        aria-controls="fade-menu"
        aria-haspopup="dialog"
        aria-label="edit message"
        onClick={handleClick}
        className={classes.root}
      >
        <Edit />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuList>
          <MenuItem onClick={handleClose}>
            <Edit onClick={() => handleShowUpdate()} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ThreadReply message={message} channelName={channelName} />
          </MenuItem>
          {messageId !== null && (
            <MenuItem onClick={handleClose}>
              <DeleteMessageWrapper messageId={messageId} />
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default MessageOptions;
