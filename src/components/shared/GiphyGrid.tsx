import React, { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import ResizeObserver from 'react-resize-observer';
import { useHistory } from 'react-router';
import { IGif } from '@giphy/js-types';

const giphyFetch = new GiphyFetch('gNDqYmKTip2mgTRqQbS5BwslaLM8Jdq0');

const GiphyGrid: React.FC<any> = () => {
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
    console.log('gif', gif);
    e.preventDefault();
  };

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
