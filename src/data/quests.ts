'use client';
import { QuestType } from "@/types";


export const QUESTS: QuestType[] = [

    {
        id: "q_gold_1",
        title: "Premiers Pas",
        description: "Générer au total 100 Or",
        rewardPA: 5,
        condition: (state) => state.totalGold >= 100
    },
    {
        id: "q_perroquet_1",
        title: "Jacasseur",
        description: "Débloquer le Perroquet",
        rewardPA: 5,
        condition: (state) => (state.inventory["auto_2"] || 0) >= 1
    },

    {
        id: "q_rat_1",
        title: "Rat de Cale",
        description: "Débloquer le Rat au niveau 2",
        rewardPA: 10,
        condition: (state) => (state.inventory["auto_1"] || 0) >= 2
    },
    {
        id: "q_marin_1",
        title: "L'Équipage S'agrandit",
        description: "Recruter un Moussaillon",
        rewardPA: 10,
        condition: (state) => (state.inventory["auto_3"] || 0) >= 1
    },

    {
        id: "q_gold_2",
        title: "Apprenti Pillard",
        description: "Générer au total 1 000 Or",
        rewardPA: 20,
        condition: (state) => state.totalGold >= 1000
    },
    {
        id: "q_auto4_1",
        title: "Bruit de Canons",
        description: "Recruter un Artilleur",
        rewardPA: 20,
        condition: (state) => (state.inventory["auto_4"] || 0) >= 1
    },

    {
        id: "q_rat_2",
        title: "Le Roi des Rats",
        description: "Débloquer le Rat au niveau 10",
        rewardPA: 25,
        condition: (state) => (state.inventory["auto_1"] || 0) >= 10
    },
    {
        id: "q_auto6_1",
        title: "Bonne Gestion",
        description: "Recruter un Quartier-Maître",
        rewardPA: 25,
        condition: (state) => (state.inventory["auto_6"] || 0) >= 1
    },
    {
        id: "q_auto7_1",
        title: "Mon Bras Droit",
        description: "Recruter un Second",
        rewardPA: 25,
        condition: (state) => (state.inventory["auto_7"] || 0) >= 1
    },
    {
        id: "q_mat_1",
        title: "Voilure Robuste",
        description: "Débloquer le Grand Mât de misère",
        rewardPA: 25,
        condition: (state) => (state.inventory["card_mat"] || 0) >= 1
    },

    {
        id: "q_navire_1",
        title: "Tous sur le Pont",
        description: "Acheter un Navire Fantôme",
        rewardPA: 30,
        condition: (state) => (state.inventory["auto_9"] || 0) >= 1
    },
    {
        id: "q_cosmetic_1",
        title: "Style Pirate",
        description: "Obtenir 3 cosmétiques ou arrière-plans (sans compter ceux par défaut)",
        rewardPA: 30,
        condition: (state) => state.unlockedCosmetics.filter(c => c !== "skin_default" && c !== "bg_default").length >= 3
    },

    {
        id: "q_canon_1",
        title: "Feu à Volonté",
        description: "Débloquer les vollées deCanons",
        rewardPA: 40,
        condition: (state) => (state.inventory["card_canon"] || 0) >= 1
    },

    {
        id: "q_gold_3",
        title: "Capitaine Fortune",
        description: "Générer au total 50 000 Or",
        rewardPA: 50,
        condition: (state) => state.totalGold >= 50000
    },
    {
        id: "q_gold_4",
        title: "Montagne d'Or",
        description: "Générer au total 500 000 Or",
        rewardPA: 50,
        condition: (state) => state.totalGold >= 500000
    },
    {
        id: "q_rat_4",
        title: "Fléau de Cale",
        description: "Débloquer le Rat au niveau 30",
        rewardPA: 50,
        condition: (state) => (state.inventory["auto_1"] || 0) >= 30
    },
    {
        id: "q_sirene_1",
        title: "Chant Envoûtant",
        description: "Débloquer la Figure de Sirène",
        rewardPA: 50,
        condition: (state) => (state.inventory["card_sirene"] || 0) >= 1
    },

    {
        id: "q_clicker_1",
        title: "Clic Frénétique",
        description: "Atteindre 10 améliorations du volée de Canons",
        rewardPA: 60,
        condition: (state) => (state.inventory["card_canon"] || 0) >= 10
    },

    {
        id: "q_auto8_1",
        title: "Le Renfort",
        description: "Recruter un Capitaine allié",
        rewardPA: 80,
        condition: (state) => (state.inventory["auto_8"] || 0) >= 1
    },

    {
        id: "q_auto4_2",
        title: "Pluie de Boulets",
        description: "Améliorer l'Artilleur au niveau 10",
        rewardPA: 100,
        condition: (state) => (state.inventory["auto_4"] || 0) >= 10
    },
    {
        id: "q_rat_3",
        title: "Invasion de Rats",
        description: "Débloquer le Rat au niveau 50",
        rewardPA: 100,
        condition: (state) => (state.inventory["auto_1"] || 0) >= 50
    },
    {
        id: "q_clicker_2",
        title: "Vitesse de la Lumière",
        description: "Atteindre 10 améliorations de la grande voile",
        rewardPA: 100,
        condition: (state) => (state.inventory["card_voile"] || 0) >= 10
    },

    {
        id: "q_all_upgrades_1",
        title: "Investisseur",
        description: "Acheter au moins une fois chaque bâtiment jusqu'au Navigateur",
        rewardPA: 120,
        condition: (state) => {
            const ids = ["auto_1", "auto_2", "auto_3", "auto_4", "auto_5"];
            return ids.every(id => (state.inventory[id] || 0) >= 1);
        }
    },

    {
        id: "q_gold_5",
        title: "Trésor National",
        description: "Générer au total 10 000 000 Or",
        rewardPA: 150,
        condition: (state) => state.totalGold >= 10000000
    },

    {
        id: "q_second_2",
        title: "Bras Droit Fidèle",
        description: "Recruter 10 Seconds",
        rewardPA: 180,
        condition: (state) => (state.inventory["auto_7"] || 0) >= 10
    },

    {
        id: "q_voile_1",
        title: "Hissez les Voiles",
        description: "Améliorer la Compétence Grande Voiles au niveau 5",
        rewardPA: 200,
        condition: (state) => (state.inventory["card_voile"] || 0) >= 5
    },
    {
        id: "q_auto8_2",
        title: "Flotte Pirate",
        description: "Avoir 5 Capitaines",
        rewardPA: 200,
        condition: (state) => (state.inventory["auto_8"] || 0) >= 5
    },
    {
        id: "q_marin_2",
        title: "Équipage Aguerri",
        description: "Recruter 30 Moussaillons",
        rewardPA: 200,
        condition: (state) => (state.inventory["auto_3"] || 0) >= 30
    },
    {
        id: "q_artilleur_2",
        title: "Canonnier Hors Pair",
        description: "Recruter 25 Artilleurs",
        rewardPA: 200,
        condition: (state) => (state.inventory["auto_4"] || 0) >= 25
    },

    {
        id: "q_perroquet_2",
        title: "Cacophonie",
        description: "Débloquer le Perroquet au niveau 25",
        rewardPA: 250,
        condition: (state) => (state.inventory["auto_2"] || 0) >= 25
    },
    {
        id: "q_navigateur_2",
        title: "Maître des Cartes",
        description: "Recruter 20 Navigateurs",
        rewardPA: 250,
        condition: (state) => (state.inventory["auto_5"] || 0) >= 20
    },

    {
        id: "q_auto10_1",
        title: "Monstre des Mers",
        description: "Apprivoiser Le Kraken",
        rewardPA: 300,
        condition: (state) => (state.inventory["auto_10"] || 0) >= 1
    },
    {
        id: "q_quartier_maitre_2",
        title: "Logistique Impeccable",
        description: "Recruter 15 Quartier-Maîtres",
        rewardPA: 300,
        condition: (state) => (state.inventory["auto_6"] || 0) >= 15
    },
    {
        id: "q_fantome_2",
        title: "Flotte Spectrale",
        description: "Acheter 5 Navires Fantômes",
        rewardPA: 300,
        condition: (state) => (state.inventory["auto_9"] || 0) >= 5
    },

    {
        id: "q_kraken_2",
        title: "Dompteur de Bêtes",
        description: "Apprivoiser 3 Krakens",
        rewardPA: 600,
        condition: (state) => (state.inventory["auto_10"] || 0) >= 3
    },

    {
        id: "q_auto12_1",
        title: "Découverte Antique",
        description: "Trouver la Cité d'Atlantis",
        rewardPA: 1000,
        condition: (state) => (state.inventory["auto_12"] || 0) >= 1
    },
    {
        id: "q_cosmetic_3",
        title: "Armoire Pleine",
        description: "Obtenir 15 cosmétiques ou arrière-plans",
        rewardPA: 1000,
        condition: (state) => state.unlockedCosmetics.filter(c => c !== "skin_default" && c !== "bg_default").length >= 15
    },
    {
        id: "q_poseidon_2",
        title: "Panthéon Marin",
        description: "Avoir 2 Poseidons",
        rewardPA: 1000,
        condition: (state) => (state.inventory["auto_11"] || 0) >= 2
    },
    {
        id: "q_gold_7",
        title: "Milliardaire des Mers",
        description: "Générer au total 1 000 000 000 Or",
        rewardPA: 1000,
        condition: (state) => state.totalGold >= 1000000000
    },
    {
        id: "q_perroquet_3",
        title: "Polyglotte",
        description: "Débloquer le Perroquet au niveau 35",
        rewardPA: 1000,
        condition: (state) => (state.inventory["auto_2"] || 0) >= 35
    },

    {
        id: "q_all_upgrades_2",
        title: "Magnat",
        description: "Acheter au moins une fois chaque bâtiment jusqu'au Navire Fantôme",
        rewardPA: 1050,
        condition: (state) => {
            const ids = ["auto_1", "auto_2", "auto_3", "auto_4", "auto_5", "auto_6", "auto_7", "auto_8", "auto_9"];
            return ids.every(id => (state.inventory[id] || 0) >= 1);
        }
    },

    {
        id: "q_fantome_3",
        title: "Légion d'Outre-Tombe",
        description: "Acheter 15 Navires Fantômes",
        rewardPA: 1200,
        condition: (state) => (state.inventory["auto_9"] || 0) >= 15
    },

    {
        id: "q_mat_2",
        title: "Mât Indestructible",
        description: "Améliorer le Mât de misère au niveau 15",
        rewardPA: 1500,
        condition: (state) => (state.inventory["card_mat"] || 0) >= 15
    },

    {
        id: "q_canon_2",
        title: "Artillerie Lourde",
        description: "Améliorer la volée de canons au niveau 25",
        rewardPA: 2000,
        condition: (state) => (state.inventory["card_canon"] || 0) >= 25
    },
    {
        id: "q_sirene_2",
        title: "Chant Divin",
        description: "Améliorer la Figure de Sirène au niveau 10",
        rewardPA: 2000,
        condition: (state) => (state.inventory["card_sirene"] || 0) >= 10
    },

    {
        id: "q_gold_8",
        title: "Empereur Économique",
        description: "Générer au total 50 000 000 000 Or",
        rewardPA: 2500,
        condition: (state) => state.totalGold >= 50000000000
    },
    {
        id: "q_kraken_3",
        title: "Maître du Gouffre",
        description: "Apprivoiser 10 Krakens",
        rewardPA: 2500,
        condition: (state) => (state.inventory["auto_10"] || 0) >= 10
    },

    {
        id: "q_marin_3",
        title: "Armée Navale",
        description: "Recruter 100 Moussaillons",
        rewardPA: 3000,
        condition: (state) => (state.inventory["auto_3"] || 0) >= 100
    },
    {
        id: "q_atlantis_2",
        title: "Architecte d'Atlantis",
        description: "Développer Atlantis au niveau 5",
        rewardPA: 3000,
        condition: (state) => (state.inventory["auto_12"] || 0) >= 5
    },

    {
        id: "q_cosmetic_4",
        title: "Pilleur de Garde-Robe",
        description: "Obtenir 18 cosmétiques ou arrière-plans",
        rewardPA: 3500,
        condition: (state) => state.unlockedCosmetics.filter(c => c !== "skin_default" && c !== "bg_default").length >= 18
    },

    {
        id: "q_voile_2",
        title: "Vent en Poupe",
        description: "Améliorer la grande voile au niveau 20",
        rewardPA: 4000,
        condition: (state) => (state.inventory["card_voile"] || 0) >= 20
    },
    {
        id: "q_artilleur_3",
        title: "Tir de Précision",
        description: "Recruter 75 Artilleurs",
        rewardPA: 4000,
        condition: (state) => (state.inventory["auto_4"] || 0) >= 75
    },
    {
        id: "q_auto_mass_1",
        title: "Flotte Ultime",
        description: "Posséder un total de 500 unités/bâtiments automatiques",
        rewardPA: 4000,
        condition: (state) => {
            const totalUnits = Object.entries(state.inventory)
                .filter(([id]) => id.startsWith("auto_"))
                .reduce((acc, [_, count]) => acc + (count as number), 0);
            return totalUnits >= 500;
        }
    },

    {
        id: "q_auto14_1",
        title: "Consécration",
        description: "Devenir le Seigneur des Océans",
        rewardPA: 5000,
        condition: (state) => (state.inventory["auto_14"] || 0) >= 1
    },
    {
        id: "q_gold_9",
        title: "L'Or du Diable",
        description: "Générer au total 250 000 000 000 Or",
        rewardPA: 5000,
        condition: (state) => state.totalGold >= 250000000000
    },
    {
        id: "q_navigateur_3",
        title: "Explorateur de l'Extrême",
        description: "Recruter 50 Navigateurs",
        rewardPA: 5000,
        condition: (state) => (state.inventory["auto_5"] || 0) >= 50
    },
    {
        id: "q_poseidon_3",
        title: "Dieu parmi les Dieux",
        description: "Avoir 5 Poseidons",
        rewardPA: 5000,
        condition: (state) => (state.inventory["auto_11"] || 0) >= 5
    },

    {
        id: "q_quartier_maitre_3",
        title: "Intendant Suprême",
        description: "Recruter 40 Quartier-Maîtres",
        rewardPA: 6000,
        condition: (state) => (state.inventory["auto_6"] || 0) >= 40
    },

    {
        id: "q_second_3",
        title: "Commandant en Second",
        description: "Recruter 60 Seconds",
        rewardPA: 8000,
        condition: (state) => (state.inventory["auto_7"] || 0) >= 60
    },

    {
        id: "q_all_upgrades_3",
        title: "Suprématie",
        description: "Acheter au moins une fois chaque bâtiment possible du jeu",
        rewardPA: 10000,
        condition: (state) => {
            const ids = ["auto_1", "auto_2", "auto_3", "auto_4", "auto_5", "auto_6", "auto_7", "auto_8", "auto_9", "auto_10", "auto_11", "auto_12", "auto_13", "auto_14"];
            return ids.every(id => (state.inventory[id] || 0) >= 1);
        }
    },
    {
        id: "q_gold_10",
        title: "Légende Vivante",
        description: "Générer au total 1 000 000 000 000 Or",
        rewardPA: 10000,
        condition: (state) => state.totalGold >= 1000000000000
    },
    {
        id: "q_canon_3",
        title: "Dévastation Totale",
        description: "Améliorer la volée de canons au niveau 20",
        rewardPA: 10000,
        condition: (state) => (state.inventory["card_canon"] || 0) >= 20
    },
    {
        id: "q_mat_3",
        title: "Pilier du Ciel",
        description: "Améliorer le Mât de misère au niveau 20",
        rewardPA: 10000,
        condition: (state) => (state.inventory["card_mat"] || 0) >= 20
    },
    {
        id: "q_cosmetic_master_1",
        title: "Légende des Meubles",
        description: "Obtenir 20 cosmétiques ou arrière-plans (sans les défauts)",
        rewardPA: 10000,
        condition: (state) => state.unlockedCosmetics.filter(c => c !== "skin_default" && c !== "bg_default").length >= 20
    },

    {
        id: "q_sirene_3",
        title: "Symphonie Éternelle",
        description: "Améliorer le chant de la sirène au niveau 20",
        rewardPA: 15000,
        condition: (state) => (state.inventory["card_sirene"] || 0) >= 20
    },
    {
        id: "q_voile_3",
        title: "Vitesse Supraluminique",
        description: "Améliorer la grande voile au niveau 20",
        rewardPA: 15000,
        condition: (state) => (state.inventory["card_voile"] || 0) >= 20
    },

    {
        id: "q_skill_master_1",
        title: "Maître du Destin",
        description: "Améliorer TOUTES les compétences au niveau 20",
        rewardPA: 20000,
        condition: (state) => {
            const ids = ["card_canon", "card_mat", "card_sirene", "card_voile"];
            return ids.every(id => (state.inventory[id] || 0) >= 20);
        }
    },
];

