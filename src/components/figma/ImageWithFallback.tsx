import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallback = '/images/placeholder.jpg',
  className,
  width,
  height,
  onLoad,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
      onError?.();
    }
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "object-cover",
        hasError && "opacity-75",
        className
      )}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};