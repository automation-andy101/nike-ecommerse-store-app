import React from 'react'
import { Card } from '@/components'

const products = [
  {
    id: 1,
    title: 'Nike Air Zoom Pegasus 41',
    price: 130,
    originalPrice: 150,
    image: '/shoes/shoe-1.jpg',
    category: "Men's Shoes",
    isNew: true,
  },
  {
    id: 2,
    title: 'Nike InfinityRN 4',
    price: 160,
    image: '/shoes/shoe-2.webp',
    category: "Running",
  },
  {
    id: 3,
    title: 'Nike Metcon 9',
    price: 150,
    image: '/shoes/shoe-3.webp',
    category: 'Training',
    isSale: true,
    originalPrice: 170,
  },
  {
    id: 4,
    title: 'Nike Dunk Low Retro',
    price: 115,
    image: '/shoes/shoe-4.webp',
    category: 'Lifestyle',
  },
  {
    id: 5,
    title: 'Nike Air Max 270',
    price: 160,
    image: '/shoes/shoe-5.avif',
    category: 'Lifestyle',
  },
  {
    id: 6,
    title: 'Nike ZoomX Vaporfly 3',
    price: 250,
    image: '/shoes/shoe-6.avif',
    category: 'Running',
    isNew: true,
  },
  {
    id: 7,
    title: 'Nike Vomero 17',
    price: 160,
    image: '/shoes/shoe-7.avif',
    category: 'Running',
  },
  {
    id: 8,
    title: 'Nike Mercurial Vapor 15',
    price: 85,
    image: '/shoes/shoe-8.avif',
    category: 'Football',
  },
]

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section aria-labelledby="latest-shoes-heading" className="space-y-8">
        <h2 id="latest-shoes-heading" className="text-heading-2 font-jost text-dark-900">
          Latest Shoes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              originalPrice={p.originalPrice}
              image={p.image}
              category={p.category}
              isNew={p.isNew}
              isSale={p.isSale}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home