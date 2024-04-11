import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../cliente';

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: string) {
  return imageBuilder.image(source);
}
