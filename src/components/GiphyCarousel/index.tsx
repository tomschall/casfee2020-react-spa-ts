import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { currentChannelState, giphyState } from '../../atom';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Gif, Grid, Carousel } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import useStyles from './styles';
import { useHistory } from 'react-router';
import { IGif } from '@giphy/js-types';

const giphyFetch = new GiphyFetch('gNDqYmKTip2mgTRqQbS5BwslaLM8Jdq0');

const GiphyCarousel: React.FC<any> = () => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<any>(currentChannelState);
  const history = useHistory();
  const [gif, setGif] = useRecoilState<IGif | null>(giphyState);

  const fetchGifs = (offset: number) =>
    giphyFetch.trending({ offset, limit: 5 });

  const [width, setWidth] = useState(window.innerWidth);

  const onGifClick = (gif: any, e: any) => {
    e.preventDefault();
    setGif(gif);
  };

  return (
    <React.Fragment>
      <Carousel
        fetchGifs={fetchGifs}
        onGifClick={onGifClick}
        gifHeight={50}
        gutter={6}
      />
    </React.Fragment>
  );
};

export default GiphyCarousel;
