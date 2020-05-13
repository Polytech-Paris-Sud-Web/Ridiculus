

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

## Lancement du projet en local

Run `npm install` puis `ng serve` à la racine. Aller sur `http://localhost:4200/` pour accéder au site web.

Run `npm install` puis `npm start` dans le dossier server. Si environnement de prod, aller dans /src/environments/environment.prod.ts et indiquer `data_href: 'http://localhost:3000'`. Si environnement de test, faire la manip dans /src/environments/environment.ts.

## API dédiée

L'API est lancée sur le pc de Valentin, pour cela j'ai configuré mon IP comme statique. Toutefois, je couperai le serveur à partir de dimanche. Si vous voulez faire des tests alors que le serveur est éteint, n'hésitez pas à me contacter sur slack/discord/mail pour que je le relance.

## Build

Run `npm run build --prefix $source_path -- --prod --aot --output-hashing="all" --base-href="/$(echo $GITHUB_REPOSITORY | cut -d '/' -f 2)/" --output-path="$build_path"`