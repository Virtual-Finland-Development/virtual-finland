import { useEffect, useState } from 'react';

function getDimensions() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return {
    width,
    height,
  };
}

export default function useDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
