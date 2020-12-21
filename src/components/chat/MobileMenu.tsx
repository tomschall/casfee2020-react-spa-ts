import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddGif from '@material-ui/icons/Gif';
import MenuIcon from '@material-ui/icons/Menu';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';
import PollPopUp from '../../components/adminPollings/PollPopup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: 'translateZ(0)',
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        '& #ChickenfestNavi-action-4': {
          display: 'none',
        },
      },
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: '-10px',
        right: theme.spacing(1),
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(0),
        marginBottom: '12px',
        height: 38,
      },
      [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(0),
        marginBottom: '75px',
      },
    },
    action: {
      backgroundColor: '#0f1448',
    },
    backdrop: {
      [theme.breakpoints.up('md')]: {},
    },
  }),
);

interface MobileMenuProps {
  nickname: string;
  channelName: string;
  isPrivate: boolean;
  channelId: number;
  handleDrawerOpen: () => void;
  handleGiphyClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  nickname,
  channelName,
  isPrivate,
  channelId,
  handleDrawerOpen,
  handleGiphyClick,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const actions = [
    {
      icon: isPrivate ? (
        <EnhancedEncryptionOutlinedIcon color="secondary" />
      ) : (
        <People style={{ color: '#4CAF50' }} />
      ),
      type: 'channel',
      state: true,
      name: `${channelName}`,
    },
    { icon: <Person />, type: 'user', name: `${nickname}` },
    {
      icon: <PollPopUp channelId={channelId} />,
      type: 'poll',
      state: true,
      name: 'Admin Polling',
    },
    {
      icon: <AddGif onClick={handleGiphyClick} />,
      type: 'giphy',
      state: true,
      name: `+Giphy`,
    },
    {
      icon: <MenuIcon onClick={handleDrawerOpen} />,
      type: 'menu',
      state: true,
      name: `Menu`,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="Chickenfest Navi"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          {actions.map((action) => (
            <SpeedDialAction
              tooltipOpen
              key={action.type}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => {
                handleClose();
              }}
              className={classes.action}
            />
          ))}
        </SpeedDial>
      </div>
      <Backdrop open={open} className={classes.backdrop} />
    </>
  );
};

export default MobileMenu;
