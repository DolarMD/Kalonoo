import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../data/products';
import { formatCurrency } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAddToOrder?: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images[0] || '/images/kalon_black_tee_1794005505058.jpg';
  const secondaryImage = product.images[1];

  return (
    <article
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer transition-transform duration-200"
    >
      {/* 1:1 Studio Garment Box (Exact Caracas Merch Framing - borderless clean) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6f6f7] dark:bg-neutral-900 flex items-center justify-center p-2.5 sm:p-4">
        {/* Primary Image: Centered studio flat lay */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`h-full w-full object-contain object-center transition-all duration-500 ease-out ${
            secondaryImage && isHovered ? 'opacity-0 scale-98' : 'opacity-100 scale-100 group-hover:scale-102'
          }`}
          loading="lazy"
        />

        {/* Secondary Image on Hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} ángulo`}
            className={`absolute inset-2.5 sm:inset-4 h-[calc(100%-20px)] sm:h-[calc(100%-32px)] w-[calc(100%-20px)] sm:w-[calc(100%-32px)] object-contain object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
            }`}
            loading="lazy"
          />
        )}

        {/* Subtle Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center bg-white/85 backdrop-blur-xs transition-opacity duration-200 active:scale-90 hover:bg-white dark:bg-neutral-900/85 dark:hover:bg-neutral-900 ${
            isWishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              isWishlisted
                ? 'fill-neutral-950 text-neutral-950 dark:fill-white dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          />
        </button>
      </div>

      {/* Centered Minimalist Typography (Exact Caracas Merch Style) */}
      <div className="mt-3 flex flex-col items-center text-center px-1">
        <h3 className="font-sans text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-white group-hover:opacity-75 transition-opacity line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <div className="mt-1 font-sans text-xs sm:text-[13px] font-semibold text-neutral-900 dark:text-neutral-100">
          {formatCurrency(product.price, product.currency)}
        </div>
      </div>
    </article>
  );
};
