const pool = require("./db").default;

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
  "Beauty",
  "Toys",
  "Automotive",
  "Health",
  "Grocery",
  "Furniture",
  "Jewelry",
  "Music",
  "Gaming",
  "Pet Supplies"
];

async function seedDatabase() {

  const BATCH_SIZE = 1000;
  const TOTAL_PRODUCTS = 200000;

  for (let batch = 0; batch < TOTAL_PRODUCTS / BATCH_SIZE; batch++) {

    const values = [];

    for (let i = 1; i <= BATCH_SIZE; i++) {

      const productNumber = batch * BATCH_SIZE + i;

      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const randomPrice =
        Math.floor(Math.random() * 10000) + 100;

      const randomDate = new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString();

      values.push(
        `(
          'Product ${productNumber}',
          '${randomCategory}',
          ${randomPrice},
          '${randomDate}',
          '${randomDate}'
        )`
      );
    }

    const query = `
      INSERT INTO products
      (name, category, price, created_at, updated_at)
      VALUES
      ${values.join(",")}
    `;

    await pool.query(query);

    console.log(`Batch ${batch + 1}/200 completed`);
  }

  console.log("200,000 products inserted!");
}

seedDatabase();