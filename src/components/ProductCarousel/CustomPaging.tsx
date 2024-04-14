import { urlFor } from '../../utils/buildSanityImageUrl';

export default function createCustomPaging(images: any[]) {
  return function CustomPagingFunction(i: number) {
    return (
      <img
        src={ urlFor(images[i]).url() }
        alt={ `Imagem ${i + 1}` }
        // style={ { width: '50px', height: '50px', objectFit: 'cover' } }
        className="custom_pagination_image"
      />
    );
  };
}
