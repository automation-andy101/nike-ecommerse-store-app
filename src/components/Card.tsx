import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string | number;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isSale?: boolean;
  href?: string;
}

const Card = ({
  id,
  title,
  description,
  price,
  originalPrice,
  image,
  category,
  isNew = false,
  isSale = false,
  href,
}: CardProps) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(originalPrice)
    : null;

  const cardContent = (
    <article className="group flex flex-col h-full">
      <div className="relative aspect-square bg-light-200 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-light-100 text-dark-900 text-caption font-medium rounded">
              New
            </span>
          )}
          {isSale && (
            <span className="px-3 py-1 bg-red text-light-100 text-caption font-medium rounded">
              Sale
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow pt-4">
        {category && (
          <span className="text-caption text-dark-700 mb-1">{category}</span>
        )}
        <h3 className="text-body-medium text-dark-900 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-caption text-dark-700 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-body-medium text-dark-900">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-caption text-dark-500 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 focus-visible:ring-offset-2 rounded-lg"
        aria-label={`View ${title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 focus-visible:ring-offset-2 rounded-lg"
      aria-label={`View ${title}`}
    >
      {cardContent}
    </Link>
  );
};

export default Card;
