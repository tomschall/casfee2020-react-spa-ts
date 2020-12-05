import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
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
    },
    exampleWrapper: {
      display: 'flex',
      flex: 1,
      position: 'relative',
      marginTop: theme.spacing(3),
      // height: 0,
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
    actions: {
      backgroundColor: '#0f1448',
    },
  }),
);

interface MobileMenuProps {
  nickname: string;
  channelName: string;
  isPrivate: boolean;
  pollQuestion: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  nickname,
  channelName,
  isPrivate,
  pollQuestion,
}) => {
  const actions = [
    { icon: <MenuIcon />, name: `Menu` },
    {
      icon:
        pollQuestion !== '' ? (
          <HowToVoteIcon color="primary" />
        ) : (
          <HowToVoteIcon />
        ),
      name: `${pollQuestion}`,
    },
    {
      icon: isPrivate ? <EnhancedEncryptionOutlinedIcon /> : <People />,
      name: `${channelName}`,
    },
    { icon: <Person />, name: `${nickname}` },
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Backdrop open={open} />
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
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
              className={classes.actions}
            />
          ))}
        </SpeedDial>
      </div>
    </>
  );
};

export default MobileMenu;
