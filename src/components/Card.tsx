import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string | number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  colorCount?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  href?: string;
}

const Card = ({
  id,
  title,
  price,
  image,
  category,
  colorCount,
  isBestSeller = false,
  isNew = false,
  href,
}: CardProps) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const cardContent = (
    <article className="group flex flex-col h-full overflow-hidden rounded-lg">
      <div className="relative aspect-square bg-light-200">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isBestSeller && (
            <span className="px-4 py-1.5 bg-light-100 text-orange text-caption font-medium rounded-full">
              Best Seller
            </span>
          )}
          {isNew && (
            <span className="px-4 py-1.5 bg-light-100 text-green text-caption font-medium rounded-full">
              New
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col bg-dark-900 p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-body text-light-300 line-clamp-1">{title}</h3>
          <span className="text-body text-light-100 whitespace-nowrap">
            {formattedPrice}
          </span>
        </div>
        {category && (
          <span className="text-caption text-dark-500 mt-1">{category}</span>
        )}
        {colorCount && colorCount > 0 && (
          <span className="text-caption text-orange mt-1">
            {colorCount} {colorCount === 1 ? "Colour" : "Colour"}
          </span>
        )}
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
