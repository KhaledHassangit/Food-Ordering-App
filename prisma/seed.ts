import {
  PrismaClient,
  UserRole,
  ProductSizes,
  ExtraIngredients,
} from "@prisma/client";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// helpers
const sizeDefault = [
  { name: ProductSizes.SMALL, price: 0 },
  { name: ProductSizes.MEDIUM, price: 30 },
  { name: ProductSizes.LARGE, price: 60 },
];

const extraDefault = [
  { name: ExtraIngredients.CHEESE, price: 20 },
  { name: ExtraIngredients.BACON, price: 40 },
];

const extraVeg = [
  { name: ExtraIngredients.TOMATO, price: 10 },
  { name: ExtraIngredients.ONION, price: 10 },
  { name: ExtraIngredients.PEPPER, price: 15 },
];

const extraCheese = [
  { name: ExtraIngredients.CHEESE, price: 25 },
  { name: ExtraIngredients.BACON, price: 40 },
];

async function main() {
  // 🧹 CLEAN DB
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 👤 USERS
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@pizza.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      phone: "01000000000",
      city: "Cairo",
      country: "Egypt",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "user@pizza.com",
      password: hashedPassword,
      role: UserRole.USER,
      phone: "01111111111",
      city: "Alexandria",
      country: "Egypt",
    },
  });

  // 🍕 CATEGORY
  const pizzaCategory = await prisma.category.create({
    data: {
      name: "Pizza",
    },
  });

  // 🍕 PRODUCTS (12 REAL IMAGES)
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Margherita Pizza",
        description: "Classic tomato & mozzarella pizza",
        image: "https://source.unsplash.com/800x600/?pizza,cheese",
        basePrice: 120,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraDefault },
      },
    }),

    prisma.product.create({
      data: {
        name: "Pepperoni Pizza",
        description: "Cheesy pepperoni pizza",
    image: "/assets/pizza.png",
        basePrice: 150,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraDefault },
      },
    }),

    prisma.product.create({
      data: {
        name: "BBQ Chicken Pizza",
        description: "BBQ chicken with cheese",
        image: "https://source.unsplash.com/800x600/?pizza,chicken",
        basePrice: 160,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraDefault },
      },
    }),

    prisma.product.create({
      data: {
        name: "Veggie Pizza",
        description: "Fresh vegetable pizza",
        image: "https://source.unsplash.com/800x600/?pizza,vegetarian",
        basePrice: 130,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraVeg },
      },
    }),

    prisma.product.create({
      data: {
        name: "Four Cheese Pizza",
        description: "Cheese lovers pizza",
        image: "https://source.unsplash.com/800x600/?pizza,cheese",
        basePrice: 170,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraCheese },
      },
    }),

    prisma.product.create({
      data: {
        name: "Spicy Pepperoni",
        description: "Hot pepperoni pizza",
        image: "https://source.unsplash.com/800x600/?pizza,spicy",
        basePrice: 155,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraDefault },
      },
    }),

    prisma.product.create({
      data: {
        name: "Chicken Ranch",
        description: "Chicken ranch pizza",
        image: "https://source.unsplash.com/800x600/?pizza,chicken",
        basePrice: 165,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraCheese },
      },
    }),

    prisma.product.create({
      data: {
        name: "Mushroom Pizza",
        description: "Mushroom pizza",
    image: "/assets/pizza.png",
        basePrice: 140,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraVeg },
      },
    }),

    prisma.product.create({
      data: {
        name: "Meat Lovers",
        description: "Loaded meat pizza",
    image: "/assets/pizza.png",
        basePrice: 190,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraDefault },
      },
    }),

    prisma.product.create({
      data: {
        name: "Hawaiian Pizza",
        description: "Ham & pineapple",
    image: "/assets/pizza.png",
        basePrice: 150,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraCheese },
      },
    }),

    prisma.product.create({
      data: {
        name: "Supreme Pizza",
        description: "All toppings pizza",
    image: "/assets/pizza.png",
        basePrice: 180,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraDefault },
      },
    }),

    prisma.product.create({
      data: {
        name: "Cheese Burst Pizza",
        description: "Extra cheesy pizza",
    image: "/assets/pizza.png",
        basePrice: 200,
        categoryId: pizzaCategory.id,
        sizes: { create: sizeDefault },
        extras: { create: extraCheese },
      },
    }),
  ]);

  // 🛒 ORDER 1 (PENDING CART SIMULATION)
  const order1 = await prisma.order.create({
    data: {
      paid: false,
      subTotal: 270,
      deliveryFee: 20,
      totalPrice: 290,
      userEmail: user.email,
      phone: user.phone!,
      streetAddress: "Street 10",
      postalCode: "12345",
      city: user.city!,
      country: user.country!,
      products: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            userId: user.id,
          },
          {
            productId: products[1].id,
            quantity: 1,
            userId: user.id,
          },
        ],
      },
    },
  });

  // 🛒 ORDER 2 (PAID COMPLETED ORDER)
  const order2 = await prisma.order.create({
    data: {
      paid: true,
      subTotal: 340,
      deliveryFee: 20,
      totalPrice: 360,
      userEmail: user.email,
      phone: user.phone!,
      streetAddress: "Alex Street 5",
      postalCode: "54321",
      city: user.city!,
      country: user.country!,
      products: {
        create: [
          {
            productId: products[3].id,
            quantity: 2,
            userId: user.id,
          },
        ],
      },
    },
  });

  console.log("🔥 FULL MOCK SEED COMPLETED");
  console.log({
    admin,
    user,
    products: products.length,
    orders: [order1.id, order2.id],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });