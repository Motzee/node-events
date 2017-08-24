//appel de express pour la création de serveur
const express = require('express') ;
//appel de mustache pour utiliser des templates
const mustache = require('mustache') ;
//appel de fs pour la gestion de fichiers
const fs = require('fs') ;


//création d'une instance de serveur
let app = express();

//définition du dossier desservant les pages web (le reste étant inaccessible)
app.use(express.static("public"));


//si l'url /ajout est demandée, on sert le template ajout(.html) avec de quoi compléter les moustaches
app.get('/ajout', function (req, res) {
  res.render('ajout', {
        name : 'Visiteur'
    });
});

//création d'une base de données temporaire pour tests
let bdEvents = [
    {
        titre : "Cat-sitting de chatons",
        auteur : "Visiteur1",
        lieu : "Grenoble",
        description : "Je serai absent pour le week-end, je recherche quelqu'un pour s'occuper de mes chatons pendant mon absence, merci."
    },
    {
        titre : "Championnats du monde de tunning de chaussettes",
        auteur : "Visiteur2",
        lieu : "Paris",
        description : "Venez tricoter et tunner des paires de chaussettes pour avoir les pieds au chaud cet hiver."
    },
    {
        titre : "Bricolage participatif",
        auteur : "Visiteur1",
        lieu : "Villeurbanne",
        description : "Création d'un bar à diabolos réfrigéré dans la petite enclave de la salle de cours à Simplon"
    }
];

app.get('/index', function (req, res) {
  res.render('index', {
        name : 'Visiteur',
        listeEvents : bdEvents 
    });
});

//si un fichier html est demandé, mustache doit aller lire un fichier template sur le disque et entrer en action (ou transmettre un message d'erreur)
app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("échec de l'ouverture du template :", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    }) ;
});
//définition (en chemin relatif) du dossier où mustache doit aller chercher ses templates, et sur quel type de fichier travailler
app.set('views', 'template/');
app.set('view engine', 'html');


//création d'une écoute sur le port 8008
app.listen(8008, function(err) {
    if(err) {
        console.error(err) ;
        return ;
    }
    console.log('Le serveur accepte actuellement de recevoir des requêtes sur le port 8008...');
});