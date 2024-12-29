import Menu from '@/components/menu/Menu';
import { db } from '@/lib/prisma';
import { getProductsByCategory } from '@/server/db/products';

const  MenuPage =  async () => {
  // await db.product.deleteMany(); 
  // await db.category.deleteMany();
  // await db.category.createMany({
  //   data: [
  //     { name: "Classic Pizza" },
  //     { name: "Special Pizza" }
  //   ]
  // });
  
  // await db.product.createMany({
  //   data: [
  //     {
  //       name: "Chicken BBQ",
  //       description: "BBQ sauce base topped with grilled chicken, onions, green peppers, and mozzarella cheese.",
  //       basePrice: 120.00,
  //       categoryId: "8654e644-c6c9-49ee-b1fc-d6b79a7c941a", // Category ID for Classic Pizza
  //       image: "https://www.papajohnsegypt.com/images/Products/ChickenBBQ.jpg",
  //       order: 0
  //     },
  //     {
  //       name: "All The Meats",
  //       description: "Tomato sauce base with pepperoni, sausage, beef, and mozzarella cheese.",
  //       basePrice: 150.00,
  //       categoryId: "8654e644-c6c9-49ee-b1fc-d6b79a7c941a", // Category ID for Special Pizza
  //       image: "https://www.papajohnsegypt.com/images/Products/AllTheMeats.jpg",
  //       order: 1
  //     },
  //     {
  //       name: "Veggie Delight",
  //       description: "Tomato sauce base topped with mushrooms, onions, green peppers, olives, and mozzarella cheese.",
  //       basePrice: 110.00,
  //       categoryId: "8654e644-c6c9-49ee-b1fc-d6b79a7c941a", // Category ID for Classic Pizza
  //       image: "https://www.papajohnsegypt.com/images/Products/Margherita.jpg",
  //       order: 2
  //     },
  //   ],
  // });
  
  const categorites = await getProductsByCategory();
  return (
    <main>
      {categorites.map((category) => (
        <section key={category.id} className='section-gap'>
          <div className='container text-center'>
            <h1 className='text-primary font-bold text-4xl italic mb-6'>
              {category.name}
            </h1>
            <Menu items={category.products} />
          </div>
        </section>
      ))}
    </main>
  );
}

export default MenuPage;