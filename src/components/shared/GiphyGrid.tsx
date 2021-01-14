import React, { useState } from 'react';
import ResizeObserver from 'react-resize-observer';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { IGif } from '@giphy/js-types';

const giphyFetch = new GiphyFetch('gNDqYmKTip2mgTRqQbS5BwslaLM8Jdq0');

const GiphyGrid: React.FC = () => {
  const history = useHistory();

  const fetchGifs = (offset: number) =>
    giphyFetch.trending({ offset, limit: 10 });

  const [width, setWidth] = useState(window.innerWidth);

  const handleClick = () => {
    history.push(`/channel/general`);
  };

  const onGifClick = (
    gif: IGif,
    e: React.SyntheticEvent<HTMLElement, Event>,
  ) => {
    e.preventDefault();
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        aria-label="back to channel general"
      >
        back to general channel...
      </Button>
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
