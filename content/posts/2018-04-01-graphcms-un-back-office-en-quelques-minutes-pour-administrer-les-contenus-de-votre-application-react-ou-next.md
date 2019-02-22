---
title: GraphCMS – Un back-office en quelques minutes pour administrer les contenus de votre application React ou Next.
tags_ids:
  - graphcms.md
  - graphql.md
  - next.md
  - react.md
---

Faire un site en React c’est chouette. Faire un site React SEO-friendly, c’est mieux (J’utiliserai ici _Next.js_ pour le côté SEO-friendly). Faire un site React SEO-friendly avec un back-office qui sert le contenu en graphQL, c’est encore mieux. Mais quel back office utiliser quand on doit permettre à autrui de modifier les contenus et médias de son application ? Puisqu’aujourd’hui j’utilise systématiquement _GraphQL_, [GraphCMS](https://graphcms.com/) avait particulièrement attiré mon attention il y a quelques mois. Il s’avère que brancher un back-office _GraphCMS_ à votre appli React est vraiment très simple. A ce jour, C’est gratuit dans la limite de 10 000 requêtes mensuelles. A noter qu’il prévoit de devenir open source dans le “premier quart 2018”, donc potentiellement possible à héberger soi-même.

## Créer du contenu sur graphCMS

Pour commencer, il va falloir créer un compte sur le site de GraphCMS, puis créer un nouveau projet. Il y a une option pour créer un projet à partir d’un template, pour ne pas s’embêter on va partir de ça directement ! Choisissez l’option “Blog” à l’écran suivant.

<img src="/images/graphcms-account-creation.png"/>

En arrivant, jetez un oeil à l’onglet “Models” qui contient tous vos types de contenus. Il faut que vous cliquiez bien sur les permissions “Read” et “Connect” pour pouvoir ensuite récupérer vos contenus en GraphQL !

<img src="/images/graphcms-models.png"/>

Il est temps maintenant de créer quelques contenus : créez un ou deux “blog post” (onglet “Content” sur la droite). Ou une trentaine si vous ne savez vraiment pas quoi foutre.

**Une fois cela fait, il est de temps passer à la magie graphQL**

Je m’emballe dès que je parle de graphQL. J’adore graphQL. GraphQL a changé ma vie concernant la gestion des APIs. Il rend mon poil plus doux et mes APIs plus intuitives.

Rendez vous sur l’onglet API Explorer sur la gauche, qui ouvre l’explorer graphQL, et créez votre première requête graphQL chargée de récupérer tous les posts rédigés, ainsi que les auteurs et images associées.

Voici un exemple de requête en image ( colonne de gauche, la colonne du milieu étant le résultat et celle de droite la doc )

<img src="/images/graphcms-api-explorer.png"/>

Jouez un peu avec l’interface et l’API de graphCMS. Si vous ne connaissez pas graphQL, amusez vous avec l’autocompletion de vos petits doigts potelés, (_quelqu’un sait pourquoi dans le mot doigt, il y a “g” entre un “i” et “t ? ça n’a pas de sens_), ouvrez la doc sur la droite pour découvrir tout ce que vous pouvez faire et tester d’autres requêtes. Et constatez à quel point il est extraordinairement facile et intuitif de naviguer dans une API graphQL que vous venez à peine de rencontrer. ♥

Alors il y a des gens qui vous diront qu’il est tout aussi facile de naviguer dans une API REST inconnue et que Postman c’est une interface fraîche, stylée et fun pour faire des requêtes http, du moment qu’elle est basée sur de l’OpenAPI ou autre standard REST. (oui, il y a aussi la specification JSON API par exemple).

Ils mentent.

Si vous ne connaissez pas graphQL, sachez que cette interface, qui a toute ma sympathie, s’appelle **graphiql** (notez le “i” au milieu, comme “interface” ou encore “inuit”, ce qui a n'a pas de rapport), et que ceci est un outil totalement indépendant de GraphCMS, que vous retrouverez dans tout bon programme qui émet du GraphQL.

L’interface graphiql est l’endroit idéal pour construire vos requêtes GraphQL : quand ça marche, on copie-colle la requête dans sa web app et c’est gagné. Luxe, confort et volupté.

## 2 – Récupérer notre contenu depuis notre application React

Bon, on a pas que ça à foutre : il est temps de récupérer nos contenus depuis React ! De mon côté j’ai utilisé pour ce billet Next.js, qui est du React rendu côté serveur. Dans l’optique d’être référencable par les moteurs de recherche.

Créer un répertoire “graphcms-demo-blog”, puis dedans, installez next en suivant les instructions suivantes : https://github.com/zeit/next.js/#how-to-use . J’ai pas du tout envie de les retaper ici, après tout c’est dimanche, alors suivez les avec application et n’oubliez pas de modifier le package.json comme indiqué !

Il nous faudra également de quoi envoyer nos requêtes Graphql. Nous allons ici utiliser un client minimaliste très simple à prendre en main : graphql-request .

```sh
npm install graphql-request
```

Il est maintenant temps de créer notre page qui va afficher la liste de nos articles !

Créer un dossier “pages/index.js” si ce n’est pas déjà fait et insérez le code suivant dedans:

```js
import React from 'react'
import { request, GraphQLClient } from 'graphql-request'

export default class HomePage extends React.Component {
  static async getInitialProps() {
    const query = `{
      allPosts {
        id
        slug
        coverImage {
          url
        }
        title
        content
        authors {
          id
          name
        }
      }
    }
    `
    return request(
      'https://api.graphcms.com/simple/v1/cjfgpbd8s1bj101427u4eu2b0',
      query
    )
  }
  render() {
    return (
      <div className="container section">
        {this.props.allPosts.map((post, index) => (
          <div>
            {post.coverImage.url && (
              <img height="200px" src={post.coverImage.url} />
            )}
            <h2>{post.title}</h2>
            <p>{post.content.substr(0, 500)} ... </p>
          </div>
        ))}
      </div>
    )
  }
}
```

Dans le code ci-dessous, remplacez bien le endpoint Graphql par le votre à la ligne 23 : Dans GraphCMS : allez dans “Settings” puis copier-coller l’url du endpoint _simple endpoint_

<img src="/images/graphcms-endpoints.png"/>

Taper `npm run dev` et vous devriez voir sur `localhost:3000` la liste des articles provenant de GraphCMS !

<img src="/images/graphcms-blog-preview.png"/>

## Explication de code

Que se passe-t-il dans le code ci dessus ?

- On ajoute une méthode “getInitialProps()” à notre composant React. Ca, c’est du Next.js, pas du React. Pour faire court : cette méthode sera appelée par le serveur lorsque la page sera chargée la première fois.
- Cette fonction attend tout simplement un objet qui sera mergé avec les autres “props” du composant.
- À l’aide de graphql-request, on fait la requête vers GraphCMS. Nous pouvons copier-coller ici directement la requête que nous avons fait tout à l’heure dans l’API explorer (c’est tout la beauté de graphQL). On retourne le résultat (qui est une promesse).
- Dans le render() de notre composant, nous avons une nouvelle prop disponible, avec le nom de la query graphQL ! (allPosts dans notre cas). Plus qu’à faire du React à partir de là ! Excepté que le contenu vient d’un back office et que le tout est rendu côté serveur grâce à Next.

## Aller plus loin

Evidemment pour faire un véritable blog ou un site, il reste du chemin. Le but de ce billet était la connexion entre GraphCMS (ou tout autre back-office qui aurait l’excellente idée de fournir ses contenus en graphQL, comme Drupal 8 avec son module graphQL ou ContentFul ).

Vous avez ici un exemple dépôt mieux structuré pour aller plus loin, qui ajoute la page de détail des posts, un loader, un fichier pour configurer ses variables d’environnement , bref un truc potable pour partir proprement : https://github.com/nyl-auster/next-blog-with-graphcms . (une démo est visible ici : https://next-blog-with-graphcms.now.sh/ )

Et à vos Pull Request si vous avez des suggestions.

Portez vous bien.

Faites du GraphQL.
