import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    zIndex: 1000,
  },
}));

interface MobileHeaderMenuProps {
  channelName: string;
}

const MobileHeaderMenu: React.FC<MobileHeaderMenuProps> = ({ channelName }) => {
  const classes = useStyles();

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      width={1}
      className={classes.root}
    >
      <ButtonGroup
        color="secondary"
        aria-label="outlined primary button group"
        size="small"
        fullWidth
      >
        <Button>{channelName}</Button>
        <Button>Members</Button>
        <Button>DM</Button>
      </ButtonGroup>
    </Box>
  );
};

export default MobileHeaderMenu;
