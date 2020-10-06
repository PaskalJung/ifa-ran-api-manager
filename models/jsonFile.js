var plantJson = [
    {
        "_id": "5f26cf7c4290a047f50de001", 
        "plante": "Aubergine", 
        "famille" : "Solanacées", 
        "color" : [
            "Violet", 
            "Noir", 
            "Blanche", 
            "Mauve"
        ],
        "plantDetails" : {
            "entretien" : "Facile", 
            "hauteur" : {
                "min" : 60.0, 
                "max" : 80.0, 
                "unit" : "cm"
            },  
        },  
        "classification" : {
            "regne" : "Plantae", 
            "sousRegne" : "Angiospermes", 
            "clades" : [
                "Angiospermes", 
                "Dicotylédones vraies", 
                "Noyau des Dicotylédones vraies", 
                "Astéridées", 
                "Lamiidées"
            ], 
            "ordre" : "Solanales", 
            "famille" : "Solanaceae", 
            "genre" : "Solanum", 
            "sousGenre" : "Leptostemonum", 
            "section" : "Melongena"
        },  
    },
    {
        "_id": "5f26cf7c4290a047f50de002", 
        "plante": "Betterave", 
        "famille" : "Chénopodiacées", 
        "color" : [
            "Rouge", 
            "Rose", 
            "Blanche", 
            "Jaune"
        ], 
        "plantDetails" : {
            "entretien" : "Facile", 
            "height" : {
                "min" : 60.0, 
                "max" : 100.0, 
                "unit" : "cm"
            }, 
            
        }, 
        "classification" : {
            "regne" : "Plantae", 
            "classe" : "Equisetopsida", 
            "sousClasse" : "Magnoliidae", 
            "superOrdre" : "Caryophyllanae", 
            "ordre" : "Caryophyllales", 
            "famille" : "Amaranthaceae", 
            "genre" : "Beta", 
            "espece" : "Beta vulgaris", 
            "sousEspece" : "Beta vulgaris subsp. vulgaris"
        }, 
    },
    {
        "_id": "5f26cf7c4290a047f50de003", 
        "plante": "Carotte", 
        "famille" : "Apiacées", 
        "color" :  [
            "Rouge", 
            "Rose", 
            "Orange", 
            "Jaune", 
            "Blanc"
        ],        
        "plantDetails" : {
            "entretien" : "Facile", 
            "height" : {
                "min" : 30.0, 
                "max" : 45.0, 
                "unit" : "cm"
            },
        }, 
        "classification" : {
            "regne" : "Plantae", 
            "sousRegne" : "Tracheobionta", 
            "division" : "Magnoliophyta", 
            "classe" : "Magnoliopsida", 
            "sousClasse" : "Rosidae", 
            "ordre" : "\tApiales", 
            "famille" : "Apiaceae", 
            "genre" : "Daucus", 
            "espece" : "Daucus carota", 
            "sousEspece" : "Daucus carota subsp. sativus"
        }, 

        
    },

   

  
  
]

module.exports = plantJson;