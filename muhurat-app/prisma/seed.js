const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create collections
  const bridalCollection = await prisma.collection.upsert({
    where: { slug: 'bridal-collection' },
    update: {},
    create: {
      name: 'Bridal Collection',
      slug: 'bridal-collection',
      description: 'Heirloom pieces for your special day.',
    },
  })

  const festiveCollection = await prisma.collection.upsert({
    where: { slug: 'festive-collection' },
    update: {},
    create: {
      name: 'Festive Collection',
      slug: 'festive-collection',
      description: 'Statement jewelry for the festive season.',
    },
  })

  // Create Categories
  const ringsCategory = await prisma.category.upsert({
    where: { slug: 'rings' },
    update: {},
    create: {
      name: 'Rings',
      slug: 'rings',
    },
  })

  const necklacesCategory = await prisma.category.upsert({
    where: { slug: 'necklaces' },
    update: {},
    create: {
      name: 'Necklaces',
      slug: 'necklaces',
    },
  })

  // Create Products
  const products = [
    {
      name: 'Pebble Ring',
      slug: 'pebble-ring',
      description: 'A beautifully contoured pebble ring in solid gold.',
      price: 350.00,
      images: JSON.stringify(['/images/pebble_ring_1781172068702.png']),
      material: 'Antique Gold',
      stock: 15,
      categoryId: ringsCategory.id,
      collectionId: festiveCollection.id,
    },
    {
      name: 'Linear Pendant',
      slug: 'linear-pendant',
      description: 'A minimalist linear pendant necklace.',
      price: 420.00,
      images: JSON.stringify(['/images/linear_pendant_1781172078189.png']),
      material: 'Rose Gold',
      stock: 5,
      categoryId: necklacesCategory.id,
      collectionId: bridalCollection.id,
    },
    {
      name: 'Arc Earrings',
      slug: 'arc-earrings',
      description: 'Sleek architectural arc earrings.',
      price: 280.00,
      images: JSON.stringify(['/images/arc_earrings_1781172090049.png']),
      material: 'Silver',
      stock: 20,
    },
    {
      name: 'Form Cuff',
      slug: 'form-cuff',
      description: 'A heavy solid form cuff bracelet.',
      price: 390.00,
      images: JSON.stringify(['/images/form_cuff_1781172100564.png']),
      material: 'Antique Gold',
      stock: 8,
    }
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
