import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { giphyState } from '../../atom';
import { Box, TextField } from '@material-ui/core';
import { Carousel } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  giphySearchInput: {
    display: 'flex',
    flex: 1,
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1),
    },
  },
  giphyCarousel: {
    display: 'flex',
    padding: theme.spacing(3),
  },
}));

const giphyFetch = new GiphyFetch('gNDqYmKTip2mgTRqQbS5BwslaLM8Jdq0');

interface GiphyCarouselProps {
  hideGiphyCarousel: Function;
}

const GiphyCarousel: React.FC<GiphyCarouselProps> = ({ hideGiphyCarousel }) => {
  const classes = useStyles();

  const [gif, setGif] = useRecoilState<IGif | null>(giphyState);

  const [giphySearchString, setGiphySearchString] = useState('');

  const onGifClick = (
    gif: IGif,
    e: React.SyntheticEvent<HTMLElement, Event>,
  ) => {
    e.preventDefault();
    setGif(gif);
    hideGiphyCarousel();
  };

  const handleOnChange = (ev: any) => {
    setGiphySearchString(ev.target.value);
  };

  const fetchGifs = (offset: number) => {
    return giphySearchString
      ? giphyFetch.search(giphySearchString, { offset, limit: 5 })
      : giphyFetch.trending({ offset, limit: 5 });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" style={{ maxWidth: '100%' }}>
        <Carousel
          key={giphySearchString}
          fetchGifs={fetchGifs}
          onGifClick={onGifClick}
          gifHeight={50}
          gutter={6}
        />
        <TextField
          className={classes.giphySearchInput}
          size="small"
          label="Search giphy ..."
          variant="standard"
          onChange={handleOnChange}
        />
      </Box>
    </>
  );
};

export default GiphyCarousel;
