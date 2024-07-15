import React from 'react';

const Img = ({ src, alt }: { src: string, alt: string }) => {
  return <img src={src} alt={alt} />;
}

export default Img;