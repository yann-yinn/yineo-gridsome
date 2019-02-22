---
title: Pourquoi le référencement du JavaScript n’est plus un problème
slug: pourquoi-le-referencement-du-javascript-nest-plus-un-probleme
date: 2017-08-24
tags_ids:
  - nuxt
  - vue
  - wordpress
---

Quand je suis arrivé à Nantes, je me suis dit qu’il serait bien que je crée un blog pour qu’on puisse trouver mes services sur internet. J’avais alors très peu de temps pour le faire, j’ai donc opté pour wordpress.com : pas d’hébergement à gérer, belle interface de rédaction et gratuit. Mais le site grandissant peu à peu, j’ai eu besoin de reprendre le contrôle total de mes pages, avec comme contrainte forte de garder le référencement durement acquis sur l’année précédente, une source majeure de contacts en tant que freelance.

## Peut-on référencer du JavaScript ?

Au cours de mes dernières semaines de recherche sur les architectures découplées, j’ai découvert par hasard que depuis WordPress 4.7, le module REST API était activé par défaut. Et je fus surpris de voir que cela concernait la plateforme WordPress.com elle-même ! ainsi en me rendant sur cette url, j’ai pu constater que mon blog était entièrement disponible en JSON : https://public-api.wordpress.com/wp/v2/sites/yannboisselier.wordpress.com

Ca me permettait donc de créer si je le voulais mon blog en JavaScript avec Vue.js ou React ! De quoi prendre un peu mon pied dans cet affaire. Mais j’ai repensé alors à mon site de calculette pour freelance : il est très mal référencé et pour Google, exceptée la page d’accueil (et encore, ça dépend de la marée ), le reste n’est que page vide.

Après quelques recherches et surtout quelques tests de ma part grâce à la “search console” de Google qui permet de voir une page web avec les yeux d’un robot d’indexation, je constate que référencer du JavaScript rester incertain et souvent raté. Il faut dire que les moteurs de recherche indexent des pages, et que déterminer ce qui est une page ou pas dans une application JavaScript n’est pas une évidence.

Par ailleurs certains contenus ne se révèlent que lors de certaines actions utilisateurs ou évènements. A titre d’exemple, avec un Routeur React ou Vue.js, il faut **cliquer** pour afficher une autre page : si vous vous rendez directement sur l’url, vous aurez une 404. On pourrait parer à ce souci en redirigeant les 404, mais ce n’est qu’un exemple pour montrer que du point de vue d’un moteur d’indexation, trouver les contenus qui surgissent au fil d’évènement divers, c’est coton, tout comme créer une url qui sera utilisée dans les résultats de recherche pour pouvoir y mener directement l’utilisateur.

Ce problème est aussi un frein à l’adoption du JavaScript en front-end dans certains cas : pour la plupart des entreprises, avoir un site non-référencé sur internet, ça n’a pas grand sens.

## Applications universelles

Heureusement les composants Vue.js et React ont un atout de taille pour cette problématique : ils peuvent être rendus côté serveur; c’est à dire qu’au chargement de votre page, le html sera bien intégralement présent, et pas injecté après le chargement de la page par JavaScript.

Par ailleurs JavaScript est aujourd’hui un animal plutôt extraordinaire capable de tourner de manière identique côté serveur via Node.js et côté client dans un navigateur. Ce qui ouvre la porte à des applications **JavaScript universelles**, parfois nommées isomorphiques; un code JavaScript qui peut être interprété indifférement par Node ou un navigateur. Bien entendu il y a des limites : si vous utilisez des variables (window) ou APIs spécifiques ( XHR) au navigateur, votre code ne pourra plus être interprété par Node.js, mais tous ces cas particuliers ont des solutions.

Quelle rapport avec la tisane ? C’est que les applications universelles sont la clef pour réalisation des applications JavaScript parfaitement référencées grâce au Server Side Rendering ( au chargement de la page, tout le html est bien présent, comme avec du php ) et en même temps toujours rafraîchie en temps réel et réactives : une fois la page rendue, c’est le navigateur qui reprendre la main et le serveur n’est plus sollicité pour le rendu html. En gros, Le moteur JavaScript de Node repasse la main au moteur JavaScript de votre navigateur.

Bon au début ça pique un peu la tête de jongler sans cesse entre côté serveur et côté client, il faut bien comprendre que le code est dans tous les cas :

- éxécuté forcément par le serveur ET le navigateur à un moment donné
- d’abord par le serveur (chargement initial de la page), puis par le navigateur.

Concrètement, quand vous faites un `console.log(‘hello’)`, il apparaîtra soit dans votre terminal qui fait tourner node, soit dans votre console.

> Pour tout vous avouer ça serait plutôt drôlement intéressant d’avoir une sorte de serveur intermédiaire qui compilent les console.log de node et du browser pour les afficher sur une même page, avec un simple badge “serveur” ou “browser” pour s’y retrouver; histoire de ne plus jongler entre le terminal et la console navigateur, ce qui est à moitié chiant il faut bien l’avouer.

Je vous recommande très chaleureusement à ce sujet le début de tutoriel de Next.js ( un framework d’applications universelles pour React ) : https://learnnextjs.com/
Dans les premières pages il explique très bien cette histoire de rendu universel à travers des exemple concrets sanctionnés de QCM.

## Nuxt.js

J’aime React, j’adore Vue.js, je suis amoureux de Nuxt.js. Nuxt ? Nuxt.js c’est l’équivalent de Next.js pour Vue.js : un framework d’applications universelles pour Vue.js. Je l’utilise depuis sa version alpha et il était déjà très fonctionnel; mais maintenant qu’on s’approche de la release officielle, il devient carrément mortel : avec un système de modules qui devrait permettre rapidement un bel eco-système, le côté Progressive Web Applications qui devrait fonctionner bientôt par défaut, la génération de pages statiques etc … … Enfin le format des [composants mono-fichiers Vue.js](https://fr.vuejs.org/v2/guide/single-file-components.html) est juste génial pour bosser dans ce contexte.

Nuxt.js, c’est la technologie qui propulse ce blog actuellement. Une preuve de sa manière de fonctionner ? Ouvrez le code source de la page, vous trouverez l’intégralité du contenu de cet article à l’intérieur, il en va ainsi de toutes les pages de ce sites. C’est ce qui assure son référencement.

## Nuxt.js + WordPress ou Drupal ou Tout ce que vous voulez !

Nous avons donc maintenant, avec Nuxt ( ou Next.js pour les afficionados de React), une solution inédite qui permet :

- d’écrire super facilement une application JavaScript réactive complexe
- qu’elle soit parfaitement référencée dans les moteurs de recherches
- de se combiner à n’importe quel back-end : custom, WordPress, Drupal, une google spreadsheet, votre graphQL custom propulsé par Node.js…

Le dernier frein pour une très large adoption du JavaScript en front-end est en train de se lever définitivement : le référencement en JavaScript n’est plus un problème.

## Est ce qu’on en fait pas trop avec JavaScript ?

Mais ne devient-t-on pas frénétiques à tout vouloir faire en JavaScript ? Il faut bien comprendre que le JavaScript n’est pas qu’une histoire de mode, il résout certains gros soucis qu’on se trimballe depuis un moment dans le monde merveilleusement bordélique du web :

– les appels à des **APIs externes via requête HTTP**. C’est monnaie courante désormais et le fonctionnement asynchrone de JavaScript permet de multiplier les appels à des services sans bloquer l’interface utilisateur.

– La gestion de **l’état représenté par votre html**. Avant, votre état était souvent réparti entre un chargement PHP initial de la page, puis du jQuery qui s’accrochait à des classes css, id ou autres attributs html, pour mettre à jour tel ou tel élément de la page. Parfois il y avait même des appels XHR qui renvoyait du HTML, Brrr… La difficulté venant du fait que les “sources de vérité” du html sont partagées entre le rendu initial par le serveur et les bidouilles côté JavaScript pour mettre à jour l’interface. Avec pour difficulté principale une complexité accrue pour comprendre la génération du html dont les instructions de rendu sont éparpillées et très difficiles à localiser. (vous savez, ce petit bout de JS planqué parmi des milliers de fichiers, qui change un bout de la page sans que vous le sachiez, pendant que vous cherchiez innocemment la source du bug côté serveur ? )

– Ré-utilisabilité : une fois qu’on a goûté à la composition d’une interface utilisateur avec des composants, on ne revient pas en arrière : Un simple copier-coller d’un composant permet de le faire marcher d’un site à un autre : CSS, JS, HTML, tout est empaqueté ensemble et “scopé”. Bien sûr ça ne marche pas dans tous les cas, mais pour autant ça n’a jamais aussi bien marché.

## Cas d’utilisation réel

Comment être certain que tout ça fonctionne vraiment ? J’ai basculé au cours du mois mon site sur Nuxt.js en requêtant l’API REST de wordpress et observé l’impact sur le référencement de mon site : à ce jour, aucun effet de bord à signaler depuis l’indexation du nouveau site en Nuxt.js, et une expérience développeur qui a été géniale accompagnée d’une intégration front-end super simple et rapide. A deux trois exceptions près puisque j’essuie un peu les plâtres de cette nouvelle manière de développer du JavaScript, mais ce sera l’histoire d’un prochain billet. En attendant le code source de ce site est open source et je suis prêt à répondre à toutes les questions que ça pose sur le dépot github correspondant si vous en avez : https://github.com/nyl-auster/yineo-nuxt-wordpress (edit du 6 janvier 2019 : ce site est désormais généré statiquement par Nuxt à partir de fichier markdown, Wordpress n'est plus utilisé)
