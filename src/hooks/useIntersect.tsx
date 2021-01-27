import { useEffect, useRef, useState } from 'react';

export default ({
  root = null,
  rootMargin = '200px 0px 0px 0px',
  threshold = 0,
}) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState<React.RefObject<HTMLDivElement> | null>();

  const observer = useRef(
    new window.IntersectionObserver(([entry]) => updateEntry(entry), {
      root,
      rootMargin,
      threshold,
    }),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (typeof node === 'object') {
      currentObserver.observe(node?.current);
    }

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};
