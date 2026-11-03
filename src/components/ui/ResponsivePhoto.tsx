import type { CSSProperties } from 'react'
import type { Photo } from '../../data/media'

interface ResponsivePhotoProps {
  image: Photo
  /** How wide the image renders at each breakpoint, for srcset selection. */
  sizes: string
  className?: string
  /**
   * The main above-the-fold image: loaded straight away with high fetch
   * priority. Use it for one image per page at most.
   */
  priority?: boolean
  /** Load immediately at normal priority (other above-the-fold images). */
  eager?: boolean
  /** Overrides the alt text, e.g. "" when a caption already describes it. */
  alt?: string
}

const srcSet = (image: Photo, ext: 'avif' | 'webp') =>
  image.widths.map((width) => `${image.base}-${width}.${ext} ${width}w`).join(', ')

/**
 * An optimised photo: AVIF with a WebP fallback at the sizes the layout
 * needs, intrinsic dimensions to reserve space, and the photo's dominant
 * colour behind it while it loads. Below-the-fold photos load lazily.
 */
export function ResponsivePhoto({ image, sizes, className = '', priority, eager, alt }: ResponsivePhotoProps) {
  const fallbackWidth = image.widths.findLast((width) => width <= 800) ?? image.widths[0]
  const style: CSSProperties = { backgroundColor: image.color }
  if (image.position) style.objectPosition = image.position

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
      <img
        src={`${image.base}-${fallbackWidth}.webp`}
        srcSet={srcSet(image, 'webp')}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        loading={priority || eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? undefined : 'async'}
        className={className}
        style={style}
      />
    </picture>
  )
}
