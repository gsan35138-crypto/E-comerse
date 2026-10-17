const categories = [
  "Electronics",
  "Computers",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports",
];

const brands = {
  Electronics: ["Sony", "Samsung", "JBL", "Bose", "Apple", "Google", "Anker", "Logitech", "Nintendo"],
  Computers: ["Dell", "HP", "ASUS", "Lenovo", "Apple", "Microsoft", "Acer", "Razer", "MSI", "Corsair"],
  Fashion: ["Nike", "Adidas", "Levi's", "Puma", "Calvin Klein", "Tommy Hilfiger", "Zara", "H&M", "Gucci", "Prada"],
  "Home & Kitchen": ["Ninja", "KitchenAid", "Dyson", "Instant Pot", "Le Creuset", "Nespresso", "Cuisinart", "Breville", "Oxo", "Lodge"],
  Books: ["Penguin", "HarperCollins", "Random House", "Simon & Schuster", "Macmillan", "Hachette", "Scholastic", "Pearson", "Oxford", "Vintage"],
  Sports: ["Wilson", "Spalding", "Nike", "Adidas", "Under Armour", "Rawlings", "Callaway", "Titleist", "Garmin", "Fitbit"],
};

const unsplashIds = {
  Electronics: "photo-1498050108023-c5249f4df085",
  Computers: "photo-1496181133206-80ce9b88a853",
  Fashion: "photo-1445205170230-053b83016050",
  "Home & Kitchen": "photo-1556911220-e15224bbaf40",
  Books: "photo-1524578271613-d550eebad4b0",
  Sports: "photo-1517836357463-d25dfeac3438",
};

const products = [];
let nextId = 73;

categories.forEach((category) => {
  for (let i = 1; i <= 20; i++) {
    const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
    const price = Math.floor(Math.random() * 500) + 10;
    const originalPrice = price + Math.floor(Math.random() * 100) + 10;
    const id = nextId++;
    
    products.push({
      id: id.toString(),
      name: `${brand} ${category} Elite ${i}`,
      description: `The ${brand} ${category} Elite ${i} is a premium choice for enthusiasts and professionals alike. Engineered for performance and style.`,
      price: price,
      originalPrice: originalPrice,
      image: `https://images.unsplash.com/${unsplashIds[category]}?w=400&h=400&fit=crop&sig=${id}`,
      category: category,
      rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
      reviewCount: Math.floor(Math.random() * 10000) + 50,
      inStock: true,
      brand: brand,
    });
  }
});

// Output as a string that can be inserted into the products.ts array
const output = products.map(p => `  ${JSON.stringify(p, null, 2)},`).join('\n');
console.log(output);
