---
title: 'PASSER DE PHP A REACT : PAR OÙ COMMENCER ?'
tags_ids:
  - react.md
---

Si vous venez de PHP et que voulez vous mettre à _React_, par quel bout attraper tout ça ? Si vous avez le choix, je vous recommande chaleureusement de faire une journée de formation avec un ami ou de passer en junior sur un projet React, ça vous fera gagner énormément de temps. Si vous souhaitez faire le chemin seul, voici quelques indications qui vous feront sans doute gagner pas mal de temps.

## 1) Se familiariser avec la syntaxe du JavaScript moderne

J’ai pour ma part commencé par une mise à niveau en JS avec la **formation de WesBos sur ES6** : https://es6.io/
Oui, elle est payante, mais elle vaut vraiment le coup : elle est particulièrement claire et très pédagogique; de quoi faire de vous en Ninja du JavaScript en un temps record.

Il est important dans tous les cas de se familiariser avec un certain nombres de concepts clefs abondamment utilisé dans le JavaScript moderne :

– Promesses (et ses compagnons async et await),
– affectation par décomposition (destructuring)
– arrow functions
– spread operator,
– const, let et var.
– babel et webpack
– class, qui est utilisé souvent en React.

## 2) Se familiariser avec la culture du JavaScript moderne

Ca peut sembler curieux en venant du PHP moderne, mais il est plutôt bien vu en JavaScript de cracher son venin sur les classes telles que vous les connaissez, l’héritage, bref tous les concepts qu’on vous a appris en PHP objet.

La culture JavaScript moderne tourne plutôt autour des concepts de la **programmation fonctionnelle**. Plutôt que de faire des boucles avec `forEach`, vous allez utiliser des fonctions comme `map`, `reduce`, `filter` , pour n'en citer que quelques unes.

Voici une manière classique en JavaScript de créer un tableau d'ids à partir d'un tableau d'objets:

```js
const ids = items.map(item => item.id)
```

Les vidéos de Fun Fun Functions vous l’expliqueront bien mieux que moi : https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84

Je vous recommande très fortement, tant que vous faites un tour chez ce grand malade de MPJ, de regarder sa série de vidéo sur l’objet en JavaScript : il est vraiment important de comprendre ce que sont les **prototypes** en JavaScript et la signification du mot clef “this” en fonction du contexte : https://www.youtube.com/watch?v=GhbhD1HR5vk&list=PL0zVEGEvSaeHBZFy6Q8731rcwk0Gtuxub

## 3) Se familiariser avec Node

Ensuite familiarisez vous rapidement avec Node : c’est du JavaScript exécuté côté serveur ( tout comme PHP). Créez au moins rapidement un hello world avec **Express** (une librairie de routage très connue) pour vous familiarisez avec **npm** (l’installateur de librairies et gestionnaire de dépendances de node), le fichier package.json et vous imprégner du concept que JavaScript tourne aujourd’hui aussi bien sur un serveur que sur un navigateur.

Vous entendrez également parler de **Yarn**, qui est un gestionnaire de librairie concurrent de npm.

## 4) Se familiariser avec React

A partir de maintenant vous pouvez attaquer la doc officielle de React qui vous permettra de survoler rapidement les grands concepts clefs.

Ensuite vous pourrez passer à la pratique et créer votre premier application React en utilisant « create-react-app » https://github.com/facebookincubator/create-react-app

Je vous recommande de commenter la ligne suivante si vous la voyez dans votre fichier index.js:

```js
import registerServiceWorker from “./registerServiceWorker”;
```

Le _Service Worker_ est un truc qui permet à votre application de fonctionner hors-ligne mais peut créer des bugs perturbants si vous n’êtes pas à l’aise avec le concept, et ça n’est pas indispensable pour débuter.

_Create-react-app_ fait aussi pour vous le sale boulot de configurer webpack et le hot-reloading.

Le _Hot-reloading_ ? dès que vous modifiez un fichier source, votre navigateur se recharge tout seul automatiquement.

_Webpack_ ? un outil qui compile votre JavaScript pour pouvoir lui donner plus de super-pouvoirs, comme par exemple interpréter JSX ou interpréter des features de JavaScript qui ne sont pas encore implémentées par les navigateurs.

Aujourd’hui en JavaScript, on compile (presque) toujours son code. La bonne nouvelle c’est qu’avec create-react-app ou autre kit de démarrage de projet, on a plus à s’occuper de cette partie et ça marche “out of ze box”; sauf en cas de besoin de personnalisation poussé.

Quant à **JSX** ? C’est une syntaxe particulière pour générer votre html au sein d’un composant React. Mais comme le dit bien la doc, fondamentalement, JSX est une manière d’écrire

```js
React.CreateElement('div')
```

_React.CreateElement_ est la fonction en coulisse qui permet à React de générer le html de votre application.

## 5) Se familiariser Redux et Apollo

React, c’est plus que des composants, c’est un vaste écosystème de librairies existantes et de design-pattern. Vous allez très vite devoir vous confronter à l’incontournable react-redux, lui même basé sur redux.

React-redux étant une implémentation React de Redux, je vous recommande cet excellent tuto sur Redux : https://github.com/happypoulp/redux-tutorial

Si vous faites du graphQL, vous aurez vite à vous familiariser avec la librairie “apollo” et son implémentation React “react-apollo”.

## Conclusion

Vous voilà désormais avec quelques indices pour réussir votre randonnée de PHP à React, bon voyage !
