// MEMBRE 3 — Récoltes : calculer la production, le rendement et le revenu.
// Fiche : fiches/3-recoltes.md · Vérifier : npm run test:recoltes

// Renvoie le total des kilos récoltés sur une parcelle. Aucune récolte : 0.
export function totalRecolte(recoltes,idparcelle){
  return recoltes.filter(recolte => recolte.parcelle === idparcelle).reduce((total, recolte) => total +recolte.kg, 0);
  
}
 
// Renvoie le rendement en kg par hectare, arrondi à l'entier le plus proche.
// Une surface nulle ou négative est une erreur : on lance une RangeError.
export function rendement(kg, surface) {;
if(surface <= 0) 
  throw new rangeError("la surface doit être positive")
return Math.round(kg /surface)
};

// Renvoie le revenu estimé en FCFA.
export function revenu(kg, prixKg) {
  return kg * prixKg;
}

// Renvoie une ligne de bilan par parcelle, dans le même ordre que parcelles.
// Chaque ligne : { id, producteur, culture, kg, rendement, revenu }
export function bilanRecoltes(parcelles, recoltes, cultures) {
  return parcelles.map((parcelle) => {
    const culture = cultures.find((c) => c.code === parcelle.culture);
    const kg = totalRecolte(recoltes, parcelle.id);
    const rend = rendement(kg, parcelle.surface);
    const rev = revenu(kg, culture.prixKg);

    return {
      id: parcelle.id,
      producteur: parcelle.producteur,
      culture: parcelle.culture,
      kg: kg,
      rendement: rend,
      revenu: rev,
    };
  });
}
 

// Renvoie une COPIE du bilan, triée du plus grand revenu au plus petit.
// Le tableau reçu ne doit pas changer d'ordre.
export function classerParRevenu(bilan) {
return [...bilan].sort((a,b) => b.revenu-a.revenu);
  
}
