/* eslint-disable no-underscore-dangle */
// import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { Link } from 'react-router-dom';
import sanityClient from '../../cliente';
import { formatUrl } from '../../utils/formatUrl';
import { Product } from '../../types/Product';
import styles from './ProductLinks.module.css';
import scrollToTop from '../../utils/scrollToTop';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: string) {
  return builder.image(source);
}

interface ProductLinksProps {
  category: string;
  products: Product[];
}

function ProductLinks({ category, products }: ProductLinksProps) {
  return (
    <div className="container_products">
      {products.map((product) => (
        <Link
          // eslint-disable-next-line max-len
          to={ `/produtos/${category}/${formatUrl(product.productName)}?productId=${product._id}` }
          key={ product._id }
          className={ styles.card_product }
          onClick={ scrollToTop }
        >
          {product.images.length > 0 && (
            <figure className={ styles.container_product_link_image }>
              <img
                src={ urlFor(product.images[0].asset._ref).url() }
                alt={ product.productName }
              />
            </figure>
          )}
          <h3 className={ styles.product_title }>{product.productName}</h3>
        </Link>
      ))}
    </div>
  );
}

export default ProductLinks;
