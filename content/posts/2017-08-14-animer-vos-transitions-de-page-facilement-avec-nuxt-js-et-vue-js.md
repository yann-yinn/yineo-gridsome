---
title: Animer vos transitions de page facilement avec Nuxt.js et Vue.js
slug: animer-vos-transitions-de-page-facilement-avec-nuxt-js-et-vue-js
date: 2017-08-14
tags_ids:
  - nuxt
  - vue
---

Vue.js dispose d’un composant transition très pratique pour créer des animations css (ou JavaScript) lorsqu’un composant apparait ou disparait. Ce qui nous permet de créer très facilement avec Nuxt.js des effets de transition pour nos pages.

Le composant [transition](https://vuejs.org/v2/guide/transitions.html) de Vue.js ajoute automatiquement des classes css à un composant pendant qu’il apparait ou disparait. Un bon dessin vaut mieux qu’une longue explication pour comprendre les moments d’apparition et de disparition de ces classes :

<img src="/images/vuejs-transition-components-classes.png" />

Pour activer ces classes de transitions sur nos pages Nuxt (qui sont des composants Vue.js), il suffit d’ajouter une clef transition comme ci-dessous :

```html
<template>
  <Contact />
</template>

<script>
import Contact from '~/components/Contact'
export default {
  transition: 'page', // set our transition with nuxt.js
  components: { Contact },
}
</script>
```

Ici je nomme ma transition page, donc mes classes css d’entrée et de sortie de composants seront toutes préfixés par page- : page-enter, page-enter-to, page-enter-active etc …

Plus qu’à accrocher à ces classes le css que l’on souhaite pour créer un effet de transition, ici un effet de slide : la page actuelle disparait en fade-out et la nouvelle page arrive en slide par la gauche.

**app.css**

```less
// only for desktop for now,
@media screen and (min-width: 1008px) {
  /* during entering and leaving : */
  .page-enter-active,
  .page-leave-active {
    position: absolute;
    max-width: 725.328px; /*make sur our content keep it's original width*/
    transition: all 0.2s ease;
  }

  /* entering start */
  .page-enter {
    left: -100%;
  }

  /* entering end */
  .page-enter-to {
    left: 0;
  }

  /* leaving start */
  .page-leave {
    opacity: 1;
  }

  /* leaving end */
  .page-leave-to {
    opacity: 0;
  }
}
```

**page-contact.vue**

```html
<template>
  <Contact />
</template>

<script>
import Contact from '~/components/Contact'
export default {
  transition: 'page', // set our transition with nuxt.js
  components: { Contact },
}
</script>
```
