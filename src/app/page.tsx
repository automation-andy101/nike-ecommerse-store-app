import { db } from "@/db";
import { products } from "@/db/schema";
import Image from "next/image";

async function getProducts() {
  try {
    const allProducts = await db().select().from(products);
    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const productList = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">NIKE</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium hover:text-gray-300">New Releases</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300">Men</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300">Women</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300">Kids</a>
              <a href="#" className="text-sm font-medium hover:text-gray-300">Sale</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-2 text-gray-600">Shop the latest Nike gear</p>
        </div>

        {productList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available. Please run the seed script to add sample products.</p>
            <code className="mt-4 block text-sm text-gray-400">npm run db:push && npm run db:seed</code>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productList.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.color}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.sizes.split(",").slice(0, 4).map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-600"
                      >
                        {size.trim()}
                      </span>
                    ))}
                    {product.sizes.split(",").length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 rounded text-gray-600">
                        +{product.sizes.split(",").length - 4}
                      </span>
                    )}
                  </div>
                  <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">NIKE</h3>
              <p className="text-sm text-gray-400">Just Do It.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">GET HELP</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Order Status</a></li>
                <li><a href="#" className="hover:text-white">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">ABOUT NIKE</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">News</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Investors</a></li>
                <li><a href="#" className="hover:text-white">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">JOIN US</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Nike App</a></li>
                <li><a href="#" className="hover:text-white">Nike Run Club</a></li>
                <li><a href="#" className="hover:text-white">Nike Training Club</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2024 Nike, Inc. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
