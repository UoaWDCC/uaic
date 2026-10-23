import Image from "next/image";
import type { Event } from "../../../../payload-types";
import { resolveMedia } from "@/lib/payload/media";

const FALLBACK_IMAGE = "/assets/logos/uaic.webp";

interface EventImageProps {
  image: Event["image"];
  // Used when the image has no alt text of its own.
  alt: string;
  sizes: string;
  className?: string;
}

// An event's photo filling its (relative) container. Events without one show
// the club logo, uncropped on a tinted background, instead of a blurry crop.
const EventImage = ({ image, alt, sizes, className = "" }: EventImageProps) => {
  const media = resolveMedia(image);

  return (
    <Image
      src={media?.url || FALLBACK_IMAGE}
      alt={media?.alt || alt}
      fill
      sizes={sizes}
      className={`${media?.url ? "object-cover" : "bg-surface-faint object-contain p-[8%]"} ${className}`}
    />
  );
};

export default EventImage;
