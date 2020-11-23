import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { giphyState } from '../../atom';
import { TextField } from '@material-ui/core';
import { Carousel } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  giphySearchInput: {
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(2),
    minWidth: 200,
  },
  giphyCarousel: {
    maxWidth: '650px',
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
    <React.Fragment>
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
        label="search giphy..."
        variant="outlined"
        onChange={handleOnChange}
      />
    </React.Fragment>
  );
};

export default GiphyCarousel;
