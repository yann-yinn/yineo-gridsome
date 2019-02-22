---
title: 'A la découverte de Vue.js'
slug: vue-js-angular-2-et-react-sont-dans-un-bateau
date:  2017-06-10
tags_ids:
  - vue
---

La journée de vendredi a été consacrée à la découverte de la librairie **Vue.js**. Il s’agit une librairie orientée “composants réactifs” à l’instar de _React_ de facebook. Depuis quelques temps j’hésite pour la suite à monter en compétence sur Angular 2, React ou Vue.js.

Pour celles et ceux qui ne connaissent pas ces frameworks, un “composant réactif” représente en gros une partie réutilisable et découplée de l’interface utilisateur d’un site. Ils ont en commun de débarrasser le / la développeur/se de la tâche de mettre à jour lui-même le DOM en fonction des interactions utilisateurs; comme on pouvait le faire avec jQuery ou comme on doit le faire en vanilla JavaScript.

C’est philosophiquement proche du paradigme des “Web components” ou, pour ceux qui connaissent Angular JS, des directives.

A la place, on se concentre sur la mise à jour des données de notre composant et la logique de l’application en fonction des actions utilisateur, et c’est **la librairie qui met à jour le DOM pour nous en fonction des changements détectées sur les données.**

> C’est l’approche dominante aujourd’hui pour le front-end, et si vous ne vous êtes pas penché là-dessus, c’est le moment de vous y mettre

Pour créer un composant Vue.js, vous déclarez un simple objet JavaScript : vos données “réactives” dans la clef `data`, vos méthodes de mise à jour des données dans la clef `méthods` et votre html dans la clef `templateù. Il existe bien d’autres propriétés intéressantes mais celles-ci suffisent à faire nos premiers composants.

```js
Vue.component('todo-list-form', {
  data: function() {
    return {
      newTask: ''
    }
  },
  methods: {
    addTask: function() {
      this.$emit('addTask', this.newTask);
      this.newTask = '';
    }
  },
  template:'
  <form>' +
  '<input type="text" placeholder="Entrez une tâche" />' +
  '<button class="button primary" type="submit">' + 'Ajouter' + '</button>' +
  '</form>';
});
```

_Vue.js_ possède plusieurs points commun avec React :

- Un DOM virtuel (depuis _Vue.js 2_), c’est à dire une abstraction qui détectent les différences à appliquer ensuite sur le DOM réel.
- Des hooks de “cycle de vie” pour les composants
- Ne s’occupe au niveau du core que de la partie “vue” et rendu html, il faudra utiliser des librairies tierces pour les autres parties de votre application (routage, gestion d’état, requêtes http etc…).

Leur concepts sont assez proches pour que comprendre l’un ouvre des portes de compréhension pour le second.

Vue.js indique sur sa page d’accueil que l’on peut l’adopter de façon _incrémentale_ et progressive; ce qui est parfaitement juste : vous pouvez dans un premier temps tout simplement l’inclure sur un site existant, comme vous incluriez un jQuery ou un Angular Js, et lui donner la responsabilité de maintenir telle ou telle partie du DOM, ou telle nouvelle page.

Le code minimal d’un “Hello world” est le suivant :

📝 **Javacript**

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

📝 **Html**

```html
<div id="app">
{{ message }}
</div>
```

On aurait aussi pu inclure très simplement le composant mis en exemple un peu plus haut en l’ajoutant dans le html :

```html
<div id="app">
  <todo-list-form></todo-list-form>
</div>
```

Créer votre premier composant et l’insérer dans le html se fait très facilement.

Mais les choses deviennent encore plus intéressantes avec **l’excellent “vue-cli” . En une ligne de commande, vous aurez alors une architecture complexe prête à l’emploi avec tests unitaires intégrés, rafraichissement automatique de votre page, babel, webpack etc …**

L’utilisation de webpack vous permet alors d’accéder à un autre type de syntaxe très puissant pour vos composants, les _single file components_ (composants mono-fichiers) . De quoi s’agit t-il ? De déclarer nos composants de la manière suivante dans un fichier avec l’extension `.vue` :

<img src="/images/vue-component-with-preprocessors.png"/>

Votre composant se trouve donc confiné dans son propre fichier, et vous profitez non seulement de la possibilité d’écrire du html "normal", de la coloration syntaxique habituelle de votre éditeur de texte préférée; mais vous pouvez en plus intégrer du css (ou sass ou stylus); et même faire en sorte que ce css soit _scoped_, c’est à dire ne puisse pas avoir une portée au-delà de ce composant.

Ces fichiers de composants sont donc bien plus confortables et puissants pour des composants plus complexes.

Enfin, il faut noter que Vue.js possède une extension sous chrome qui permet de voir évoluer vos composants et leur variable en temps réel sur la page. Si en plus vous utilisez **Vuex** ( un gestionnaire d’état applicatif, à la manière de Flux ou Redux), vous pourrez “voyagez dans le temps” en sautant de changement d’état en changement d’état.

D’une manière générale, _Vue.js_ essaie de rendre l’expérience développeur agréable et simple, et il y parvient très bien. On est très vite productif desus.

Après avoir lu quelques pages de doc, j’ai essayé de coder une todo-list très simple :

<img src="/images/vue-todo-list-1.gif"/>

A noter que comme ma _Todo List_ est un composant, je peux l’ajouter plusieurs fois dans la même page (ce qui ne sert absolument à rien dans ce cas précis mais c’est rigolo alors je vous montre quand même) : chaque composant aura un état qui lui est propre ( du moment que la clef `data` retourne bien une fonction et pas un objet) :

<img src="/images/vue-todo-list-2.gif"/>

En bref, la première pris en main de Vue.js a été extrêment agréable et j’ai été trouvé génial l’outil vue-cli qui permet de se créer un squelette d’application en une ligne de commande.

Aujourd’hui un peu moins utilisé que React (en occident du moins) et avec un éco-systeme un peu moins riche, la popularité grandissante de son dépôt github n’a pourtant pas à rougir devant celle d’Angular JS ou React, jugez plutôt (au jour de l'écriture de cet article):

- Vue.js : 2250 watchers, 38900 stars, 4765 forks
- Angular JS 2 : 2226 watchers, 19547 stars, 5078 forks
- React : 4011 watchers, 57710 stars, 10320 forks
