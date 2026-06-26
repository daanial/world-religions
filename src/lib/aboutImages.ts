export interface AboutImage {
  id: string;
  src: string;
  alt: string;
}

const ABOUT_IMAGE_FILES = [
  "Image01.jpg",
  "Image02.jpg",
  "Image03.jpg",
  "Image04.jpg",
  "Image05.jpg",
  "Image06.jpg",
  "Image07.jpg",
  "Image08.jpg",
] as const;

export const ABOUT_IMAGES: AboutImage[] = ABOUT_IMAGE_FILES.map((file, index) => ({
  id: `image-${String(index + 1).padStart(2, "0")}`,
  src: `/assets/img/about/${file}`,
  alt: `About gallery image ${index + 1}`,
}));

export function getAboutImageSrc(index: number): string {
  const file = ABOUT_IMAGE_FILES[index];
  return file ? `/assets/img/about/${file}` : "";
}
