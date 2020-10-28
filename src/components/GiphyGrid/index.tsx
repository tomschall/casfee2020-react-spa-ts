import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { currentChannelState } from '../../atom';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Gif, Grid, Carousel } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import useStyles from './styles';
import { useHistory } from 'react-router';

const giphyFetch = new GiphyFetch('gNDqYmKTip2mgTRqQbS5BwslaLM8Jdq0');

const GiphyGrid: React.FC<any> = () => {
  const classes = useStyles();
  const [currentChannel] = useRecoilState<any>(currentChannelState);
  const history = useHistory();

  const fetchGifs = (offset: number) =>
    giphyFetch.trending({ offset, limit: 10 });

  const [width, setWidth] = useState(window.innerWidth);

  const handleClick = () => {
    history.push(`/channel/general`);
  };

  const onGifClick = (gif: any, e: any) => {
    console.log("gif", gif);
    e.preventDefault();
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        back to general channel...
      </button>
      <Grid
        onGifClick={onGifClick}
        fetchGifs={fetchGifs}
        width={width}
        columns={3}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }: any) => {
          setWidth(width);
        }}
      />
    </>
  );
};

export default GiphyGrid;
