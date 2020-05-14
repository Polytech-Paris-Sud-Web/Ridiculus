

Lien vers le site hosté: https://polytech-paris-sud-web.github.io/Ridiculus/

# Ridiculus

Participants : CASSIER Régis, DETCHEBERRY Valentin, VICENS Maxime, VUILLEMIN Anthony

Nom de l'équipe : Ridiculus

## Technologies

Front : Angular.js 9.0.7, Angular materials et Dexie3

Back : API Express, Mongoose, Body-parser et Mongodb

Pourquoi Angular:

Pourquoi Dexie3:

Pourquoi Express/mongoose/body-parser:
Créer une API nous a semblé logique suite au cours de micro-services que nous avons eu plus tôt cette année. Cela permet de faciliter la communication et de créer un service facilement améliorable. Mongoose permet de faciliter les requêtes vers Mongodb, et body-parser permet de transformer en json tous les objets envoyés par le front.

Pourquoi Mongodb:
Cette BD facilite la communication avec le front car elle stoque directement des fichiers JSON.

Pourquoi Dexie:
Dexie gère le stockage des données locales, il permet d'automatiser la transition entre différentes versions des bases de ces données. Il offre une interface simple pour interagir avec cette dernière.

Pourquoi Angular Material:
Angular material permet d'avoir accès à une librairie de composants tout fait que nous pouvons intégrer facilement à notre application.

## Lancement du projet en local

Run `npm install` puis `npm start` dans le dossier server. Si vous voulez utiliser une BD locale : si environnement de prod, aller dans /src/environments/environment.prod.ts et indiquer `data_href: 'https://localhost:3000'`. Si environnement de test, faire la manip dans /src/environments/environment.ts.

Si vous utilisez l'API que l'on a créé, elle est disponible sur `https://https://86.70.78.200:3001/`. Vous devez accepter le certificat sur cette page avant d'accéder au site (pour chrome, pas pour firefox). Pour plus d'explications, cf paragraphe "soucis de certificats".

Run `npm install` puis `npm start` à la racine. Vous devez d'abord aller sur `https://localhost:3000/` pour accepter le certificat. Aller ensuite sur `https://localhost:4200/` pour accéder au site web. 


## API dédiée

L'API est lancée sur le pc de Valentin, pour cela j'ai configuré mon IP comme statique. Toutefois, je couperai le serveur à partir de dimanche. Si vous voulez faire des tests alors que le serveur est éteint, n'hésitez pas à me contacter sur slack/discord/mail pour que je le relance.

## Build

Run `npm run build --prefix $source_path -- --prod --aot --output-hashing="all" --base-href="/$(echo $GITHUB_REPOSITORY | cut -d '/' -f 2)/" --output-path="$build_path"`

# Soucis de certificats

## Mise en place du CORS (Cross origin ressource sharing)

Notre application angular est hébergé par github. Notre API (serveur Node.js) est hébergé par nos soin sur une de nos machines. Afin de faire communiquer les 2 parties prenantes de l'application, il à fallut mettre autorisé le CORS (Cross Origin Ressource Sharing) sur notre serveur back-end.

En effet, sans autoriser le CORS nous avions l'erreur suivante :

Blocage d’une requête multiorigines (Cross-Origin Request) : la politique « Same Origin » ne permet pas de consulter la ressource distante située sur http://86.70.78.200:3001/postes/. Raison : échec de la requête CORS.


Notre API tout comme notre application n'étant pas hebergées au même endroit, la communication est donc par defaut bloquée. La solution suivante a été mise en place : 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


De cette manière, tout les points d'entrées de l'API autorise le cross-domain.

## Passage d'Angular en https

Afin de passer l'application en https, nous avons généré un certificat auto-signé. Nous avons ensuite placer les certificat et la clef comme suit : 

* appfolder
    * ssl
        * server.crt
        * server.key

Puis dans le package.json ajouter la ligne suivante : "start": "ng serve --ssl true". De cette manière, le démarage du serveur via la commande npm start va spécifié à angular d'utiliser le ssl. Notre application est à ce moment disponible uniquement en https

## Problème sous chrome

Sous chrome, le certificat chargé par Angular n'est pas automatiquement accepté pour utiliser notre API, nous devons avant ça accepté le certificat pour l'API via l'URL : https://86.70.78.200:3001. C'est un problème que nous devrons corriger par la suite de manière prioritaire.
