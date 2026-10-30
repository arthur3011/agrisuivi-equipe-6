// MEMBRE 4 — Données : lire et écrire les fichiers JSON de façon asynchrone.
// Fiche : fiches/4-donnees.md · Vérifier : npm run test:donnees
// À faire EN PREMIER : sans lireJson et chargerDonnees, l'application ne peut rien afficher.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Lit un fichier JSON et renvoie son contenu converti en valeur JavaScript.
// En cas de problème, lance une erreur claire qui garde l'erreur d'origine comme cause.
export async function lireJson(chemin) {
  try {
    const texte = await readFile(chemin, 'utf8');
    return JSON.parse(texte);
  } catch (erreur) {
    throw new Error(`Impossible de lire ${chemin}`, { cause: erreur });
  }
}


// Lit les quatre fichiers EN MÊME TEMPS avec Promise.all.
// Renvoie { parcelles, cultures, releves, recoltes }.
export async function chargerDonnees(dossier) {
    const [parcelles, cultures, releves, recoltes] = await Promise.all([
        lireJson(join(dossier, 'parcelles.json')),
        lireJson(join(dossier, 'cultures.json')),
        lireJson(join(dossier, 'releves.json')),
        lireJson(join(dossier, 'recoltes.json'))
    ]);

    return {
        parcelles,
        cultures,
        releves,
        recoltes
    };
}

// Vérifie les textes tapés dans le terminal et renvoie un nouveau relevé.
// Exemple : creerReleve('p07', '64', '29', '2026-10-29')
//   → { parcelle: 'P07', date: '2026-10-29', humidite: 64, temperature: 29 }

export function creerReleve(parcelle, humiditeTexte, temperatureTexte, date) {

    // 1. Vérifier la parcelle
    if (!parcelle) {
        throw new Error('La parcelle est obligatoire');
    }

    // 2. Convertir les textes en nombres
    const humidite = Number(humiditeTexte);
    const temperature = Number(temperatureTexte);

    // 3. Vérifier l'humidité
    if (
        humiditeTexte.trim() === '' ||
        Number.isNaN(humidite) ||
        humidite < 0 ||
        humidite > 100
    ) {
        throw new Error('Humidité invalide');
    }

    // 4. Vérifier la température
    if (
        temperatureTexte.trim() === '' ||
        Number.isNaN(temperature)
    ) {
        throw new Error('Température invalide');
    }

    // 5. Retourner le relevé
    return {
        parcelle: parcelle.toUpperCase(),
        date: date,
        humidite: humidite,
        temperature: temperature
    };
}


// Ajoute le relevé à la fin du fichier JSON, enregistre le fichier,
// puis renvoie le nouveau nombre de relevés.
export async function ajouterReleve(chemin, releve) {

    // 1. Lire les relevés existants
    const releves = await lireJson(chemin);

    // 2. Ajouter le nouveau relevé
    releves.push(releve);

    // 3. Transformer le tableau en texte JSON
    const texte = JSON.stringify(releves, null, 2);

    // 4. Enregistrer le nouveau contenu
    await writeFile(chemin, texte, 'utf8');

    // 5. Retourner le nombre total de relevés
    return releves.length;
}
