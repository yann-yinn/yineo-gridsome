---
title: Maîtriser la portée des variables en JavaScript ES6
tags_ids:
  - javascript.md
---

Il existe 3 mots-clefs pour déclarer une variable en JavaScript à partir d’ES6 ou ECMAScript 2015 :
var, const et let. Quelles sont les différences et quand faut-il les utiliser ?

## const

Commençons par le plus restrictif : _const_. Une variable déclarée avec const n’est valable que dans le bloc de code dans lequel elle est déclarée. Un bloc de code est une partie code compris entre des accolades, ici l’intérieur de notre **if**. Le code suivant affichera donc une erreur : notre variable n’existe pas en dehors de son bloc de code.

```js
if (true) {
  const capitaleDeLaBretagne = 'Nantes'
}
// Uncaught ReferenceError: capitaleDeLaBretagne is not defined
console.log(capitaleDeLaBretagne)
```

Il est également **impossible** de lui réassigner une valeur une fois déclarée.

```js
if (true) {
  const capitaleDeLaBretagne = 'Nantes'
  capitaleDeLaBretagne = 'Rennes'
}
// affiche :
// Uncaught TypeError: Assignment to constant variable.
```

En revanche la valeur de la variable sera toujours accessible dans les blocs de code à l’intérieur de notre bloc de code :

```js
if (true) {
  const capitaleDeLaBretagne = 'Nantes'
  if (true) {
    // "Nantes"
    console.log(capitaleDeLaBretagne)
  }
}
```

## let

_let_ donne la même portée que _const_ : elle se limite au bloc de code. Le code ci-dessous affiche donc la même erreur qu’avec _const_.

```js
if (true) {
  let capitaleDeLaBretagne = 'Nantes'
}
// Uncaught ReferenceError: capitaleDeLaBretagne is not defined
console.log(capitaleDeLaBretagne)
```

Par contre nous pouvons maintenant assigner une nouvelle valeur à notre variable sans déclencher d’erreur, contrairement à const.

```js
if (true) {
  let capitaleDeLaBretagne = 'Nantes'
  capitaleDeLaBretagne = 'Rennes'
}
```

## var

var permet quand à lui de déclarer une variable dont la portée est limitée à la fonction dans laquelle elle se trouve. Contrairement à _let_ et _const_, le code ci-dessous affiche bien “Nantes”.

```js
if (true) {
  var capitaleDeLaBretagne = 'Nantes'
}
// "Nantes"
console.log(capitaleDeLaBretagne)
```

Mais comme nous ne sommes pas ici dans une fonction, nous venons de créer en réalité une variable globale qui sera accessible depuis n’importe où dans le code :

```js
// "Nantes"
capitaleDeLaBretagne

// "Nantes"
window.capitaleDeLaBretagne

function getVille() {
  console.log(capitaleDeLaBretagne)
}

// "Nantes"
getVille()
```

Mais quand var est utilisé dans une fonction, la portée de la variable est bien limitée à cette même fonction :

```js
function setVille() {
  var ville = 'Nantes'
}

function getVille() {
  console.log(ville)
}

//  Uncaught ReferenceError: ville is not defined
getVille()
```

## Quel mot clef utiliser, et quand ?

Pour répondre à la question initiale, il vaut mieux partir du plus restrictif pour aller au moins restrictif, ça limite les risques d’erreur. J’utilise par défaut _const_. Si j’ai besoin que ma variable soit réassignée en cours de route, je passe à let.
