//appel de express
const express = require('express') ;

//création d'une instance de serveur
let app = express();

//définition du dossier desservant les pages web (le reste étant inaccessible)
app.use(express.static("public"));

//création d'une écoute sur le port 8008
app.listen(8008, function(err) {
    if(err) {
        console.error(err) ;
        return ;
    }
    console.log('Le serveur écoute actuellement sur le port 8008...');
});
