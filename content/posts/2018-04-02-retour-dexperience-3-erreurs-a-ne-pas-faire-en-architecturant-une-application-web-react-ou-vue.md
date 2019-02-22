---
title: 'Retour d’expérience : 4 erreurs à ne pas faire en architecturant une application web React ou Vue'
tags_ids:
  - vue.md
  - graphql.md
  - react.md
  - rest.md
---

## 1 – l’API : La clef de voûte des clients

Tout commence et tout finit par l’API. Par elle tu vivras et tu périras. L’API n’est pas une brique sur laquelle tu t’appuies, elles sont les fondations de ta maison et de toutes les applications qui s’en nourriront, le contrat technique entre les données métiers et l'UX.

Première règle de base si tu utilises du REST et pas GraphQL :

### Ton API tu documenteras, et des exemples CURL tu mettras

En plus de la description précise des paramètres, il faut **au grand minimum, un exemple curl pour la tester**. Une API qui se contente de décrire tous les paramètres possibles fait perdre énormément de temps au développeurs front-end pour lancer leurs premiers appels. **Un payload d’exemple vaut tous les longs discours.**

Si un truc fonctionne mal avec l’API et que ce n’est pas toi qui la maintiens : avant de faire des hacks côté client, communiquer avec l’équipe en charge de l’API tu essaieras : sinon ce sont tous les consommateurs de l’API qui vont bosser plus pour implémenter un workaround pourri côté client; alors que le problème était peut-être possible à résoudre côté serveur en 10 minutes avec un peu de communication.

### Toutes les règles métiers tu implémenteras côté API. Smart Server, Dumb client

Les clients de l’API ne devraient jamais avoir à appeler 3 endpoints puis écrire 5 if successifs pour déterminer, par exemple, le prix d’un produit.

Un client d’API comme **React** ou **Vue**, c’est grosso modo des vues réactives, des templates qui consomment des données d’entrées : **React ou Vue sont en bout de chaîne pour présenter le résultat d’un calcul ou d’un traitement qui a eu lieu sur le serveur, qui doit être l’unique source de vérité concernant la logique métier.**

A l’époque de html et php, on a beaucoup lutté pour qu’on arrête de mettre du métier dans les templates (avec des requêtes sql embarquée dans les templates par exemple), afin de correctement séparer logique métier et présentation des données. Aujourd’hui on refait la même chose en pire en déléguant beaucoup trop de logique au client qui lutte en bricolant avec des endpoints souvent mal adaptés au coeur de métier de l’application; et dans le pire (et fréquent) des cas en exposant des données sensibles au navigateur.

Exemple : ce n’est pas au front-end de calculer la TVA ou la réduction d’un prix sur un produit ou même, comme je le vois souvent, le prix d’un produit lui même. Tout simplement car dans ce cas, vous ne pouvez plus changer le calcul des prix à un seul endroit (normalement le serveur) : il faudra changer le code de tous les consommateurs de l’API. Une véritable hémorragie peu visible de temps et d'argent pour le projet.

### GraphQL tu utiliseras

J’ai codé de très nombreux sites basé sur du REST, et j’ai vu de tout à chaque fois : JSON API, OPEN API, “standards” maisons, JSON customs imprévisibles avec structure qui change d’un endpoint à l’autre. A chaque la fois la stratégie pour récupérer des contenus liés, ou filtrer une liste de ressource, change.

**Par ailleurs un standard tel que JSON API ne spécifie rien du tout concernant comment vous devez filtrer les ressources fournies par un endpoint**, il se contente de dire qu’une clef _filter_ pour faire ça, c’est sans doute pas mal. C’est une perte de temps colossale à chaque prise en main d’une nouvelle API car le développeur front-end doit bien souvent enquêter pour comprendre ce qu'il peut faire ou pas précisément avec cette clef `filter`.

Les API REST classiques disposent aussi de mécanismes plus ou moins pratiques et complexes pour sélection quels champs on veut recevoir (via une clef fields par exemple), et il est toujours alambiqué de choper une référence de référence de référence et de l’inclure dans le résultat en une seule requête. C’est pourtant un cas de figure classique web : il suffit de vouloir récupérer un article et afficher son auteur et son image : ça implique souvent un endpoint `/articles` , un endpoint `/users` et un endpoint `/files` au minimum.

En GraphQL, choisir les champs pour alléger la réponse et récupérer à l’infini des références est super rapide et indolore. Par ailleurs et surtout, il fournit une **excellente interface pour tester vos requêtes avec auto-completion et documentation automatique** : http://graphql.org/swapi-graphql/

## 2 – Le découpage des composants

### Le maximum de composants de "présentation" tu feras

Le front-end, c’est avant tout de l’UI : c’est fondamentalement une brique visuelle qui réagit à l’interaction utilisateur. Il est tout à fait possible que deux briques soient visuellement identiques mais avec un **comportement métier totalement différent derrière**.

Par exemple, supposons la liste d’avatars suivante :

<img src="/images/avatar-bulles.png" />

Cette liste d’avatars pourra afficher, au sein d’une même application :

- toutes les personnes d’un groupe privé
- toutes les personnes qui se sont inscrites récemment sur l’application
- toutes les personnes qui ont fait un don à Nuxt.js
- etc

Elle s’affichera toujours pareil MAIS les personnes affichées ne seront pas identiques. C’est bien pourquoi il faut séparer d’un côté la présentation pure et dure ( l’affichage des bulles ) des données ( derniers utilisateurs inscrits ? utilisateurs d’un groupe privé ? ). Il faut donc, pour que ce soit réutilisable, découpler ce composant des données. C’est juste pas une option, c’est la seule manière de rendre un composant d’UI réutilisable à coup sûr pour vos petits camarades et pour vous-mêmes.

Pour reprendre l’exemple ci-dessus, vous aurez d’un côté un composant “bubbles” qui prendra en props la liste des personnes en tant qu’array d’objet, par exemple :

```javascript
const persons = [
  {
    name: 'albert',
    id: 28,
    avatar: 'url_de_lavatar'
  },
  {
    name: 'John',
    id: 49,
    avatar: 'url_de_lavatar'
  },
  {
    name: Michelle,
    id: 42,
    avatar: 'url_de_lavatar'
  }
]
```

Puis dans votre composant ( ici en **Vue.js**) :

```html
<avatar-bubbles :persons="persons" />
```

Et de l'autre un mécanisme réutilisable de votre choix chargé de vous transmettre la liste de personnes ci-dessus : ça peut être un appel à une fonction ou au store depuis le composant parent, un _HOC_, une _render prop_ en _React_ etc : en réalité, peu importe le mécanisme choisi pourvu qu'il soit facile à réutiliser pour vous et votre équipe.

Dans la même veine, un composant de présentation gagnera souvent à **émettre seulement des évènements plutôt qu'à les traiter** lui-même: si on clique sur une bulle ci-dessus, le composant pourra émettre par exemple un évènement "bubbleClick". C'est le composant parent qui, en fonction du contexte, aura ainsi la main sur que le clic doit déclencher comme action. Cela peut changer d'une page à l'autre.

Evidemment, il n'y pas de règles absolue, ce serait trop simple ^^. En général je conçois d'abord systématiquement mes composants comment étant purement "présentationnels" et émettant des évènement que le parent doit traiter; et si pour une raison ou pour une autre ça ne fait pas sens d'être aussi "puriste" dans l'approche présentationnelle, je modifie mon approche. Mais j'essaie de faire le maximum de composants de présentation parce que c'est une approche qui ne m'a jamais trahi en terme de productivité et que ça permet en plus de partager très facile ses composants au sein de l'équipe, avec par exemple _Storybook_

## Storybook : le top pour travailler en équipe

[Storybook](https://github.com/storybooks/storybook) vous permet de visualiser vos composants de présentation et de vous assurer qu’ils tournent bien en “standalone” ! Tout seul ça vous permet de vérifier qu’ils sont bien presentationals , en équipe ça permet de partager rapidement ses composants.

Cela permet très facilement à vos collègues de chercher si vous n’avez pas déjà fait un composant “bubbles” ou “avatars” et de le récupérer en tout simplicité : il faudra qu’il ou elle fournisse les bonnes données en props pour que, sous ses yeux embués d’émotion, le composant s’affiche directement comme il faut dans le contexte de son choix.

C’est là tout le coeur et la beauté des composants.

## 3 – Router centric tu seras

Techniquement, dans une SPA (single page application), vous pouvez entièrement gérer l’évolution de l’interface visuelle uniquement via le state applicatif (du composant ou du store). Par exemple :

```js
if (this.state.event == 25) displayEventPage(25)
```

Dans l’exemple ci-dessus, le développeur va afficher la page de l’évènement avec l’id 25 si `state.event` vaut 25. Dans ce cas précis, ce n’est pas le routeur qui prend en charge le changement majeur d’état visuel, mais le _state_ (ou le state du store potentiellement, ça serait pareil). Autrement dit, vous n’avez pas d’url pour afficher l’évènement 25.

_évitez cela autant que possible !_

L’état de votre application doit être drivé au maximum par les routes de votre routeur favori et donc par les urls. Voici trois soucis possibles si vous sous-utilisez les urls pour déterminer votre état applicatif:

#### 1. Les rafraichissements de la page qui font bugguer votre appli

si vous rafraichissez la page, vous perdez votre state qui était en mémoire vive : du coup soit votre page ne s’affiche plus soit elle s’affiche de façon totalement pétée car il lui manque des infos (dans le cas où votre affichage visuel dépendrait à la fois un peu de l’url et un peu du state de l’application). **On peut à ce jour raisonnablement s’attendre à ce qu’un utilisateur utilise la fonction refresh ou précédent du navigateur, et que ces actions déclenchent un comportement correct et intuitif de l'applicatif**. Le routeur de votre application est là pour ça.

#### 2. des liens internes dans l’application qui deviennent difficiles à faire

Supposez que vous avez besoin d’afficher telle ou telle partie de votre application en un clic et dans un état précis ? Si chaque état de votre application dépend d’une route, un lien du routeur suffira à générer l’état applicatif voulu, ou du moins permettra de faire le gros du travail.

Si c’est le state en mémoire vive qui seul est capable de déclencher l'apparition / disparition de nombreux élements de l'UI plus ou moins imbriqués, il faudra scripter vous même les modifications du state ou du store pour arriver à l’état visuel voulu. Une tannée, je peux vous le dire. Ou encore il faudra simuler un succession de clicks utilisateur, dans les deux cas c'est bien dommage si l'url pouvait être utilisée comme représentation de cet état applcatif.

#### Pas de marque page et de partage de lien possible

Pouvoir copier coller un lien et l’envoyer à quelqu’un·e (pour, par exemple, lui montrer un évènement d’un agenda), c’est pratique, mais c’est possible uniquement si tous les états de votre applications sont représentés et rejouable par une url.

Au final, la bonne manière de faire de ce côté est assez proche de ce qu’on fait en PHP : on commence par penser à l’url et à ses arguments nécessaires, et ensuite on se sert dans la page de ces arguments pour construire l’état visuel de l’application.

Il y bien sûr là encore des exceptions à cette manière de faire les choses, mais la bonne manière reste : à chaque état visuel majeur possible correspond une route avec ses arguments, et seulement si ça ne marche pas ou ne fait pas sens, pour telle ou telle raison, on passe par le state applicatif pour modifier l’interface visuelle.

On essaie aussi de garder en tête ce qu'il se passe si l'utilisateur rafraîchit la page ou cliqu sur le bouton "précédent" de son navigateur.

## 4 – Avoir un formatage du code absolument identique pour toute l’équipe avec Prettier

Les différences de formatage de code entre éditeurs / développeurs peuvent faire des ravages dans un projet : un merge rendu difficile et conflictuel à cause d’un html indenté différement, des diff de versionning plus difficiles à lire , donc des codes-review plus difficiles à faire et des sources de bugs plus difficile à localiser.

**C’est pour ça que pour React ou Vue, je recommande très fortement d’utiliser Prettier** sans autre forme de procès. Il formate le code de manière identique chez tout le monde, et en plus il prend certaines dispositions pour s’assurer que le code soit le plus lisible possible. Prettier fait des miracles avec le JavaScript, et comme React, ce n’est que du JavaScript, le résultat est juste parfaitement standardisé une bonne fois pour toute, vous n’aurez plus jamais besoin d’y penser, et ça s’installe 5 secondes.

Evidemment, il y a des choses que vous auriez fait différement en terme de formatage ou qui ne correspondent pas à vos habitudes. C’est tout l’intérêt : Prettier tranche pour toute l’équipe le standard. On évite ainsi des questions et du temps de configuration pour tout le monde. Ainsi que des débats particulièrement barbant sur quel formatage est le mieux.

Le mieux, je vais vous le dire : c’est de ne pas avoir des merges foireux pour de bêtes histoires de formatages :D

## Conclusion

Il y a bien d’autres choses à dire sur ce sujet, mais le respect de ces quelques règles m'ont évités pas mal de déconvenues sur les derniers projets.

Portez vous bien.

Utilisez GraphQL :D
