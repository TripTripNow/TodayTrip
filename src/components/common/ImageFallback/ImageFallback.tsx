import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import NoImage from '#/images/img-noImage.png';

interface ImageFallbackProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
}

function ImageFallback(props: ImageFallbackProps) {
  const { src, alt, className, ...others } = props;
  const [imageSrc, setImageSrc] = useState(false);
  const [oldSrc, setOldSrc] = useState(src);

  if (oldSrc !== src) {
    setImageSrc(false);
    setOldSrc(src);
  }

  return (
    <Image
      {...others}
      className={className}
      src={imageSrc ? NoImage : src}
      alt={alt}
      onError={() => setImageSrc(true)}
    />
  );
}

export default ImageFallback;
