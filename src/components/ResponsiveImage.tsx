import type { ImgHTMLAttributes } from 'react';
import dimensions from '../data/imageDimensions.json';

const variants = import.meta.glob('../assets/images/*.webp', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>;
const sets = Object.entries(dimensions).map(([name, size]) => ({
  src: variants[`../assets/images/${name}-960.webp`],
  srcSet: [480, 960, 1440].map(width => `${variants[`../assets/images/${name}-${width}.webp`]} ${Math.min(width, size.width)}w`).filter((value, index, all) => all.findIndex(v => v.split(' ').at(-1) === value.split(' ').at(-1)) === index).join(', '),
  ...size,
}));

export function ResponsiveImage({ src, sizes, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = sets.find(image => image.src === src);
  return <img src={src} srcSet={image?.srcSet}
    sizes={image ? (sizes || '(min-width: 1024px) 50vw, 100vw') : undefined}
    width={image?.width} height={image?.height} decoding="async" {...props} />;
}
