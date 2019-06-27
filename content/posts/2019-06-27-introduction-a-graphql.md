---
title: Introduction à GraphQL
slug: introduction-a-graphql
date: 2019-06-27
tags_ids:
  - graphql
  - javascript
---

On en parle parfois de GraphQL comme quelque chose de complexe et un peu mystique; sans doute à cause d'un éco-système et un tooling très riche qui ajoutent des couches d'abstractions sur le coeur de ce qui fait GraphQL (Apollo Server, Apollo Client, Prisma etc. Dans ce billet je vais essayer de démystifier un peu ça et de montrer que GraphQL est peut être plus simple à appréhendez que vous ne pensez. Les exemples seront en JavaScript car c'est mon langage actuel; mais la théorie vaut pour tous les langages : GraphQL est une spec et n'est lié à aucun langage en particulier.

## Un language de requête simple mais puissant

GraphQL propose une manière ingénieuse et intuitive d'interroger votre API, dans un format proche du JSON.

Par exemple, si je veux obtenir tous les adresses emails des utilisateurs de mon site, je peux écrire la requête suivante:

```graphql
{
  users {
    email
  }
}
```

Dont la réponse JSON sera :

```json
{
  "data": {
    "users": [
      {
        "email": "mail@mail.com"
      },
      {
        "email": "mail2@gmail.com"
      },
      {
        "email": "mail3@protonmail.com"
      },
      {
        "email": "mail4@yineo.fr"
      }
    ]
  }
}
```

Simple non ? A noter qu'on obtient uniquement les champs qu'on a demandé dans la réponse et pas les objets utilisateurs entiers, c'est une fonctionnalité de base de GraphQL.

Nous avons la possibilité pour chaque champ d'avoir des **arguments**, un peu comme une fonction. Ainsi, pour paginer mes utilisateurs si j'ai beaucoup de résultats, je pourrai écrire:

```graphql
{
  users(limit:20, skip: 0) {
    email
  }
}
```

Notez bien que chacun des champs de `users` peut avoir **aussi** des arguments. Supposons que je veuille récupérer les avatars des utilisateurs avec une taille bien spécifique pour les images (le serveur sera chargé de faire la retaille):

```graphql
{
  users(limit:20, skip: 0) {
    email,
    picture(dimensions:"400x400") {
      url
    }
  }
}
```

Poussons le bouchon un peu plus loin avec une relation: je voudrais maintenant aussi les 5 premiers posts de blogs avec un extrait du contenu de 250 caractères, pour chaque utilisateur.

```graphql
{
  users(limit:20) {
    email,
    picture(dimensions:"400x400") {
      url
    }
    posts(limit:5) {
      title
      content(truncate:250)
    }
  }
}
```

On peut apercevoir là tout ce qu'il possible à faire avec une seule requête GraphQL tout en conservant une syntaxe  courte et lisible, et on peut observer que les arguments aussi puissants que facile à écrire.

 L'équivalent en REST pourrait ressembler à quelque chose comme ça, en suivant la spec JSON API:

> GET https://localhost:4000/api/users?include=posts&fields[users]=email,picture&fields[posts]=picture&page[limit]=20

Mais il manque dans la requête GET ci-dessus les arguments pour les dimensions de l'image, la limite des posts et le contenu tronqué: je ne sais pas si la spec JSON API permet de faire cela de manière standardisée (envoie moi un email à yann@yineo.fr si tu sais)


## Côté client : Graphql c'est juste une requête HTTP Post

Fondamentalement, tout ce dont vous avez besoin pour envoyer une requête GraphQL à un serveur GraphQL, c'est de faire une requête HTTP en POST. 

Voici comment nous pouvons envoyer notre première requête pour récupérer les mails des users avec un simple `fetch` :

```js
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          users {
            email
          }
        }`
      })
    })
    .then(response => response.json())
    .then(result => console.log("result", result));
```

Il existent des clients GraphQL plus ou moins complexes (Apollo étant le plus connu) mais ils sont surtout là pour ajouter des fonctionnalités ou des helpers (pour le cache client, la gestion du token etc), mais ils ne sont indispensables en soi. J'ai déjà réalisé des projets en utilisant simplement *axios* pour faire mes requêtes GraphQL, qui est la librairie que j'utilisais auparavant quand j'interrogerais des API REST.

## Côté serveur : créer un schema avec ses revolvers.

Voici un exemple très simple d'un serveur d'API GraphQL en node.js, qui permet de lister les utilisateurs d'un site. On notera au passage que le code nécessaire minimal pour créer un serveur GraphQL est très léger et qu'il n'y a rien de très compliqué ici non plus.


**📝 index.js**

```js
const { ApolloServer, gql } = require('apollo-server');

const users = [
  {
    id:1,
    name: 'Yann',
    email: 'yann@mail.com',
  },
  {
    id:2,
    name: 'David',
    email: 'david@mail.com',
  },
];

const typeDefs = gql`
  type Query {
    user(id:ID!): User
    users: [User]
  }
  type User {
    id: ID
    name: String
    email: String
  }
`;

const resolvers = {
  Query: {
    user(parent, args) {
      return users.find(user => user.id == args.id)
    },
    users() {
      return users
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```


> **NOTA BENE :** Pour la clarté de lecture et la concision du code, j'ai déclaré ci-dessus le schema en "SDL" (Schema Language Definition), mais je recommande plutôt d'utiliser graphql-js (https://github.com/graphql/graphql-js) pour déclarer son schema. (vous trouverez ici quelques considérations sur ce sujet : https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3)

## A chaque champ son resolver

En GraphQL, on définit un schema avec des **types** composés de **champs**, tels que les types **User** ou **Query** ci-dessus. Par exemple les *champs* du type User sonts *id*, *email* et *name*.

Le type **Query** est spécial : tous les champs déclarés dans ce type représentent les "points d'entrées" de notre API GraphQL. Il y aussi les types spéciaux **Mutations** et **Subscription** que je n'aborderai pas dans ce billet.

**Le principe de base d'un serveur GraphQL est simple : A chaque champ d'un type, on associe une fonction qui devra renvoyer sa valeur.**

Prenons un exemple : quand le serveur GraphQL reçoit la requête suivante :

```graphql
{
  users {
    email
  }
}
```

Il va chercher un champ correspondant sur le type Query du schéma :

```graphql
  type Query {
    user(id:ID!): User
    users: [User]
  }
```

Notre schéma déclare en effet un champ `users`, qui retourne une liste d'objets de type `User`. Le moteur d'exécution GraphQL va chercher la fonction qu'il doit appeler pour "résoudre" la valeur du champ *users* en inspectant les **resolvers**

```graphql
const resolvers = {
  Query: {
    user(parent, args) {
      return users.find(user => user.id == args.id)
    },
    users() {
      return users
    }
  }
};
```

Il y a bien une fonction *users* définie dans les resolvers, le moteur de GraphQL l'exécute et renvoie la liste des utilisateurs comme étant la réponse à notre requête !

Vous pouvez faire absolumenet TOUT CE QUE VOUS VOULEZ dans la fonction *users()*, la seule obligation c'est qu'elle renvoie une liste d'objets de type `User`, c'est à dire contenant des champs `id`, `name` et `email`.

Pour bien comprendre le fonctionnement des resolvers, imaginons maintenant que nous souhaitons pouvoir recevoir les emails des utilisateurs en lettres majuscules :

```js
{
  users {
    email(uppercase: true)
  }
}
```

On va d'abord ajouter à notre schema l'argument *uppercase* sur notre type User:

```graphql
type User {
  id: ID
  name: String
  email(uppercase: Boolean): String
}
```

Ensuite, il nous faut déclarer un nouveau "resolver" pour le champ "email" de notre type "User":

```js
const resolvers = {
  Query: {
    user(parent, args) {
      return users.find(user => user.id == args.id)
    },
    users () {
      return users
    }
  },
  User: {
    email(parent, args) {
      return args.uppercase ? parent.email.toUpperCase() : parent.email
    }
  }
};
```

Et le tour est joué ! mais que signifie ce premier paramètre *parent* dans notre fonction de résolution du champ ?

Dans ce cas, le paramètre `parent` sera un "User". On aperçoit ici la nature **d'arbre** de GraphQL. En effet la requête pour obtenir nos email en majuscules sera la suivante:

```graphql
{
  users {
    email(uppercase: true)
  }
}
```

la valeur du champ `users` a déjà été "résolu" au niveau 1 via le resolvers "users()". Quand on arrive au niveau 2, celui de notre champ email, on peut donc accéder directement à notre *user* via le "parent", et s'en servir pour notre resolver de champ.

Comme je l'ai dit : A chaque champ son resolver. En réalité, les champs *id* et *name* du type User ont aussi des **resolvers implicites**, de la forme suivante.

```graphql
  id(parent, args) {
    return parent.id
  }
  name(parent, args) {
    return parent.name
  }
```

*Apollo Server* ou *GraphQL JS* déclarent en effet un "resolver par défaut", qui retourner le champ correspondant du parent par défaut. Autrement dit, si aucun resolver n'est déclaré pour le champ *name* du type *User*, il va retourner `parent.name`, le parent (niveau précédent de l'arbre) étant le `user` dans ce cas.

## Conclusion

Simplement avec les concepts dessus, vous êtes déjà en mesure de créer une API très puissante en profitant de certains avantages clefs de GraphQL :
- Le typage qui permet de générer automatiquement votre documentation dans Graph**i**ql : au revoir les documentations pas à jour ou incomplète ! 
- L'explorateur de requête Graph**i**ql qui permet de tester les requêtes et explorer votre API bien plus facilement et rapidement qu'avec POSTMan ou CURL.
- Tirer pari de la puissance des arguments pour les champs
- Alléger certains JSON en demande uniquement les champs dont vous avez besoin




