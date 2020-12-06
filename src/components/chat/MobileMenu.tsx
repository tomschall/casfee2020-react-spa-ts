import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddGif from '@material-ui/icons/Gif';
import MenuIcon from '@material-ui/icons/Menu';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import EnhancedEncryptionOutlinedIcon from '@material-ui/icons/EnhancedEncryptionOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: 'translateZ(0)',
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        '& #SpeedDialexample-action-0': {
          display: 'none',
        },
      },
    },
    exampleWrapper: {
      display: 'flex',
      flex: 1,
      position: 'relative',
      marginTop: theme.spacing(3),
      backgroundColor: 'red',
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(-6.8),
        right: theme.spacing(2),
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(2),
        height: 30,
      },
    },
    action: {
      backgroundColor: '#0f1448',
    },
    backdrop: {
      [theme.breakpoints.up('md')]: {
        backgroundColor: 'rgb(0 0 0 / 95%)',
      },
    },
  }),
);

interface MobileMenuProps {
  nickname: string;
  channelName: string;
  isPrivate: boolean;
  pollQuestion: string;
  handleDrawerOpen: () => void;
  handleGiphyClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  nickname,
  channelName,
  isPrivate,
  pollQuestion,
  handleDrawerOpen,
  handleGiphyClick,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const actions = [
    {
      icon: <MenuIcon onClick={handleDrawerOpen} />,
      type: 'menu',
      state: true,
      name: `Menu`,
    },
    {
      icon: <AddGif onClick={handleGiphyClick} />,
      type: 'giphy',
      state: true,
      name: `+Giphy`,
    },
    {
      icon:
        pollQuestion !== '' ? (
          <HowToVoteIcon color="primary" />
        ) : (
          <HowToVoteIcon />
        ),
      type: 'poll',
      state: pollQuestion !== '' ? false : true,
      name: pollQuestion !== '' ? `${pollQuestion}` : 'No active poll',
    },
    {
      icon: isPrivate ? <EnhancedEncryptionOutlinedIcon /> : <People />,
      type: 'channel',
      state: true,
      name: `${channelName}`,
    },
    { icon: <Person />, type: 'user', name: `${nickname}` },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Backdrop open={open} className={classes.backdrop} />
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial example"
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
    </>
  );
};

export default MobileMenu;
