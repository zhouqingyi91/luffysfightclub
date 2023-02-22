import { useLayoutEffect } from 'react';
import { useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer'

const useElementSize = (target) => {
  const [size, setSize] = useState(null);
  // useLayoutEffect(() => {
  //   target.current && setSize(target.current.getBoundingClientRect());
  // }, [target]);

  // const setRoundedSize = ({ width, height }) => setSize({ width: Math.round(width), height: Math.round(height) });

  useResizeObserver(target, (entry) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setSize({ width, height });
  });
  return size;
};

export default useElementSize;