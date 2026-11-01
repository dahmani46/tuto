const img = (id) =>
  `https://images.unsplash.com/${id}?w=600&auto=format&fit=crop&q=60`;

export const initialProperties = [
  { id: 1, title: "Villa avec piscine", city: "Nice", price: 1250000, surface: 210, rooms: 6, status: "Disponible", image: img("photo-1613490493576-7fde63acd811") },
  { id: 2, title: "Appartement lumineux", city: "Lyon 6e", price: 465000, surface: 88, rooms: 4, status: "Sous offre", image: img("photo-1502672260266-1c1ef2d93688") },
  { id: 3, title: "Maison familiale", city: "Nantes", price: 398000, surface: 132, rooms: 5, status: "Disponible", image: img("photo-1568605114967-8130f3a36994") },
  { id: 4, title: "Loft industriel", city: "Lille", price: 312000, surface: 95, rooms: 3, status: "Vendu", image: img("photo-1600585154340-be6161a56a0c") },
  { id: 5, title: "Studio rénové", city: "Paris 11e", price: 289000, surface: 27, rooms: 1, status: "Disponible", image: img("photo-1522708323590-d24dbb6b0267") },
  { id: 6, title: "Mas provençal", city: "Aix-en-Provence", price: 890000, surface: 180, rooms: 7, status: "Sous offre", image: img("photo-1512917774080-9991f1c4c750") },
];

export const visitsThisWeek = 18;

export const euro = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
