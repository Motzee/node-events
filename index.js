//appel de express
const express = require('express') ;
//appel de mustache
const mustache = require('mustache') ;

//création d'une instance de serveur
let app = express();

//définition du dossier desservant les pages web (le reste étant inaccessible)
app.use(express.static("public"));

//page de test de mustache 
app.get("/test", function(req, resp) {
    let str = mustache.render("Hello {{name}} !", {
        name : "Toi"
    }) ;
    resp.send(str) ;
});

//création d'une écoute sur le port 8008
app.listen(8008, function(err) {
    if(err) {
        console.error(err) ;
        return ;
    }
    console.log('Le serveur écoute actuellement sur le port 8008...');
});