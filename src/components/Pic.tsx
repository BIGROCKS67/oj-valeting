import { photo } from "@/data/photos";
import { asset } from "@/data/base";

export function Pic({
  id,
  sizes = "(min-width: 900px) 33vw, 100vw",
  priority,
  className,
  alt,
}: {
  id: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const p = photo(id);
  return (
    <img
      src={asset(`/photos/${id}-960.webp`)}
      srcSet={`${asset(`/photos/${id}-480.webp`)} 480w, ${asset(`/photos/${id}-960.webp`)} 960w`}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
