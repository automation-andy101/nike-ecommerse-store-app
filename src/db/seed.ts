import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const sampleProducts = [
  {
    name: "Nike Air Max 90",
    description: "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU details. Classic colors celebrate your fresh style while Max Air cushioning adds comfort to your journey.",
    price: "130.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-90-shoes-N7Tbw0.png",
    category: "Shoes",
    color: "White/Black",
    sizes: "7,8,9,10,11,12",
    stock: 50,
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    price: "115.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
    category: "Shoes",
    color: "White/White",
    sizes: "6,7,8,9,10,11,12,13",
    stock: 100,
  },
  {
    name: "Nike Dunk Low",
    description: "Created for the hardwood but taken to the streets, the Nike Dunk Low returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with premium leather in the upper that looks good and breaks in even better.",
    price: "115.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af407fc5-c5ed-4b8e-a47a-6b7c01a5a59c/dunk-low-shoes-Jx7gRj.png",
    category: "Shoes",
    color: "Black/White",
    sizes: "7,8,9,10,11,12",
    stock: 75,
  },
  {
    name: "Nike Sportswear Club Fleece",
    description: "The Nike Sportswear Club Fleece Crew uses soft, brushed-back fleece for an elevated, cozy look. This wardrobe staple features a classic fit and embroidered Futura logo on the chest.",
    price: "60.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/hzxojvnqfpjqklkigoch/sportswear-club-fleece-crew-0Kjf3q.png",
    category: "Clothing",
    color: "Dark Grey Heather",
    sizes: "S,M,L,XL,XXL",
    stock: 200,
  },
  {
    name: "Nike Tech Fleece Joggers",
    description: "Nike Tech Fleece Joggers deliver lightweight warmth and modern style. The tapered design creates a streamlined look while zippered pockets keep your essentials secure.",
    price: "110.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/fb7e0b63-d1c2-4a2e-8f5c-54c9c2b8e8f4/tech-fleece-joggers-Jx7gRj.png",
    category: "Clothing",
    color: "Black",
    sizes: "S,M,L,XL,XXL",
    stock: 150,
  },
  {
    name: "Nike Air Jordan 1 Retro High OG",
    description: "The Air Jordan 1 Retro High OG remakes the classic sneaker with premium materials and the iconic Wings logo. This legendary silhouette features Nike Air cushioning for all-day comfort.",
    price: "180.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-7d1c8879-c8a4-4f6a-8f9e-2b8e8f5c54c9/air-jordan-1-retro-high-og-shoes.png",
    category: "Shoes",
    color: "Chicago Red/White/Black",
    sizes: "7,8,9,10,11,12,13",
    stock: 30,
  },
  {
    name: "Nike Pro Dri-FIT Tank",
    description: "The Nike Pro Dri-FIT Tank is made with sweat-wicking technology to help keep you dry and comfortable during your workout. The slim fit and stretchy fabric move with you.",
    price: "35.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7e0b63-d1c2-4a2e-8f5c-54c9c2b8e8f4/pro-dri-fit-tank-Jx7gRj.png",
    category: "Clothing",
    color: "Black",
    sizes: "S,M,L,XL",
    stock: 300,
  },
  {
    name: "Nike Heritage86 Cap",
    description: "The Nike Heritage86 Cap features a classic six-panel design with an adjustable back closure for a custom fit. The embroidered Swoosh logo adds signature Nike style.",
    price: "28.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-8f5c54c9-c2b8-4e8f-a2e8-f5c54c9c2b8e/heritage86-cap.png",
    category: "Accessories",
    color: "Black",
    sizes: "One Size",
    stock: 500,
  },
  {
    name: "Nike Brasilia Training Backpack",
    description: "The Nike Brasilia Backpack keeps your gear organized and secure with multiple compartments and a durable design. Padded shoulder straps provide comfortable carrying.",
    price: "50.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-c2b8e8f5-c54c-4a2e-9c2b-8e8f5c54c9c2/brasilia-training-backpack.png",
    category: "Accessories",
    color: "Black/White",
    sizes: "One Size",
    stock: 250,
  },
  {
    name: "Nike React Infinity Run Flyknit 3",
    description: "The Nike React Infinity Run Flyknit 3 is designed to help reduce injury and keep you on the run. More foam and improved upper details provide a secure and cushioned feel.",
    price: "160.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/i1-e8f5c54c-9c2b-4a2e-8f5c-54c9c2b8e8f5/react-infinity-run-flyknit-3-shoes.png",
    category: "Shoes",
    color: "White/Platinum Tint",
    sizes: "7,8,9,10,11,12",
    stock: 60,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    console.log("Inserting sample Nike products...");
    await db.insert(products).values(sampleProducts);
    console.log(`✅ Successfully inserted ${sampleProducts.length} products`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
  
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed();
