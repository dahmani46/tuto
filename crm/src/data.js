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

export const initialVisits = [
  { id: 1, day: "Lun. 2 nov.", time: "10:00", propertyId: 3, client: "Camille Laurent", status: "Confirmée" },
  { id: 2, day: "Lun. 2 nov.", time: "15:30", propertyId: 2, client: "Hugo Martin", status: "Confirmée" },
  { id: 3, day: "Mar. 3 nov.", time: "11:00", propertyId: 1, client: "Sarah Bernard", status: "À confirmer" },
  { id: 4, day: "Mer. 4 nov.", time: "09:30", propertyId: 5, client: "Lucas Petit", status: "Confirmée" },
  { id: 5, day: "Mer. 4 nov.", time: "17:00", propertyId: 6, client: "Inès Moreau", status: "À confirmer" },
  { id: 6, day: "Jeu. 5 nov.", time: "14:00", propertyId: 3, client: "Nora Dubois", status: "Confirmée" },
  { id: 7, day: "Ven. 6 nov.", time: "10:30", propertyId: 1, client: "Camille Laurent", status: "À confirmer" },
];

export const clients = [
  { id: 1, name: "Camille Laurent", type: "Acheteur", project: "Budget 450 000 €", status: "Actif", last: "Hier" },
  { id: 2, name: "Hugo Martin", type: "Acheteur", project: "Budget 480 000 €", status: "Actif", last: "Aujourd'hui" },
  { id: 3, name: "Sarah Bernard", type: "Acheteur", project: "Budget 1 300 000 €", status: "À rappeler", last: "Il y a 5 jours" },
  { id: 4, name: "Lucas Petit", type: "Acheteur", project: "Budget 290 000 €", status: "Actif", last: "Il y a 2 jours" },
  { id: 5, name: "Inès Moreau", type: "Acheteur", project: "Budget 900 000 €", status: "Actif", last: "Il y a 3 jours" },
  { id: 6, name: "Nora Dubois", type: "Locataire", project: "Loyer max 1 200 €", status: "Actif", last: "Il y a 4 jours" },
  { id: 7, name: "Marc Fontaine", type: "Vendeur", project: "Vend : Loft industriel", status: "Clos", last: "Il y a 3 semaines" },
  { id: 8, name: "Julie Garnier", type: "Vendeur", project: "Vend : Maison familiale", status: "À rappeler", last: "Il y a 8 jours" },
];

export const mandates = [
  { id: 1, propertyId: 1, type: "Exclusif", start: "12 sept. 2026", end: "12 mars 2027", commission: "4 %", status: "Actif" },
  { id: 2, propertyId: 2, type: "Simple", start: "02 juil. 2026", end: "02 janv. 2027", commission: "5 %", status: "Actif" },
  { id: 3, propertyId: 3, type: "Exclusif", start: "20 août 2026", end: "20 nov. 2026", commission: "4 %", status: "Expire bientôt" },
  { id: 4, propertyId: 4, type: "Exclusif", start: "15 mars 2026", end: "15 sept. 2026", commission: "4,5 %", status: "Terminé" },
  { id: 5, propertyId: 5, type: "Simple", start: "05 oct. 2026", end: "05 avr. 2027", commission: "5 %", status: "Actif" },
  { id: 6, propertyId: 6, type: "Exclusif", start: "28 sept. 2026", end: "28 mars 2027", commission: "3,5 %", status: "Actif" },
];

export const euro = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
