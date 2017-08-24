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

//
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

//définition (en chemin relatif) du dossier où mustache doit travailler, et sur quel type de fichier
app.set('views', 'template/');
app.set('view engine', 'html');

//création d'une écoute sur le port 8008
app.listen(8008, function(err) {
    if(err) {
        console.error(err) ;
        return ;
    }
    console.log('Le serveur écoute actuellement sur le port 8008...');
});