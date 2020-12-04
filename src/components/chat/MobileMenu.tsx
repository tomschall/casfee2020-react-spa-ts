import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ScalarLeafsRule } from 'graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '0',
    transform: 'translateZ(0)',
    flexGrow: 1,
  },
  speedDial: {
    // backgroundColor: theme.palette.background.default,
    position: 'absolute',
    bottom: theme.spacing(8.5),
    left: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(2),
      bottom: theme.spacing(2.4),
      height: 30,
    },
  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'User' },
  { icon: <SaveIcon />, name: 'Channel' },
  { icon: <PrintIcon />, name: 'Polling' },
];

const MobileMenu: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <div className={classes.root}> */}
      {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button> */}
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
      {/* </div> */}
    </>
  );
};

export default MobileMenu;
