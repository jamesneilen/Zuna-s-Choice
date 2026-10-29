import mascot from '../assets/brand/zuna-mascot.webp';

// Decorative brand artwork; the adjacent copy carries the meaning for screen readers.
export function BrandMascot({ className = '', loading = 'lazy' }: {
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return <img data-brand-mascot src={mascot} alt="" aria-hidden="true"
    width={360} height={475} loading={loading} decoding="async"
    className={`object-contain ${className}`} />;
}
