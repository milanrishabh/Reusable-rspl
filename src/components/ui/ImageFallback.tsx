import React, { useState } from "react";

interface ImageFallbackProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // If image has 0 dimensions, it likely failed to load properly
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      handleError();
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      onLoad={handleLoad}
    />
  );
};

export default ImageWithFallback;
