---
title: Introduction à GraphQL
slug: introduction-a-graphql
date: 2019-06-27
tags_ids:
  - graphql
  - javascript
---

Quand on ne connaît pas GraphQL, on peut avoir l'impression qu'il s'agit d'une technologie complexe à appréhender, voire un peu mystique; peut être à cause d'un éco-système et un tooling très riche (Apollo Server, Apollo Client, Prisma etc). Dans ce billet je vais essayer de montrer que GraphQL est peut être plus simple que vous ne l'imaginez. Les exemples seront en JavaScript car c'est mon langage actuel, mais la théorie vaut pour tous les langages : GraphQL est une [spec](https://graphql.github.io/graphql-spec/) et n'est lié à aucun langage en particulier.

## Un language de requête simple mais puissant

GraphQL propose une manière ingénieuse et intuitive d'interroger votre API, dans un format proche du JSON.

Par exemple, si je veux obtenir toutes les adresses emails des utilisateurs de mon site, je peux écrire la requête suivante:

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

## Les arguments de champs

Nous avons la possibilité pour chaque champ d'avoir des **arguments**, un peu comme une fonction. Ainsi, pour paginer mes utilisateurs si j'ai beaucoup de résultats, je pourrais écrire:

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

On peut apercevoir là tout ce qu'il possible à faire avec une seule requête GraphQL, avec une syntaxe qui reste très lisible même quand les choses se corsent.

## Côté client : Graphql c'est juste une requête HTTP POST

Tout ce dont vous avez besoin pour envoyer une requête GraphQL à un serveur GraphQL, c'est de faire une requête HTTP en POST.

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

Il existent des clients GraphQL plus ou moins complexes (Apollo étant le plus connu) mais ils sont surtout là pour ajouter des fonctionnalités ou des helpers (pour le cache client, la gestion du token etc), ils ne sont pas indispensables en soi et ne font pas partie de GraphQL. J'ai déjà réalisé des projets en utilisant simplement *axios* pour faire mes requêtes GraphQL, qui est la librairie que j'utilisais auparavant quand j'interrogerais des API REST.

## Côté serveur : créer un schema avec ses resolvers

Voici un exemple très simple d'un serveur d'API GraphQL en node.js, qui permet de lister les utilisateurs d'un site. Le code est petit mais c'est bien un véritable serveur GraphQL fonctionnel. Les utilisateurs sont stockés ici dans une variable users, mais le fonctionnement serait identique avec une base de données à la place.

Installez simplement au préalable les paquets suivants :

```sh
npm install apollo-server graphql
```

Tuto complet : https://www.apollographql.com/docs/apollo-server/getting-started/


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

// définition de notre schema GraphQL
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


> **NOTA BENE :** Pour la clarté de lecture et la concision du code dans ce billet, j'ai déclaré ci-dessus le schema en "SDL" (Schema Language Definition). Pour de gros projets, je recommanderais plutôt d'utiliser graphql-js (https://github.com/graphql/graphql-js) pour déclarer son schema. C'est plus verbeux mais plus souple et modulaire (vous trouverez ici quelques considérations sur ce sujet : https://www.prisma.io/blog/the-problems-of-schema-first-graphql-development-x1mn4cb0tyl3)

## A chaque champ son resolver

En GraphQL, on définit un schema avec des **types** composés de **champs**, tels que les types **User** ou **Query** ci-dessus. Par exemple les *champs* du type User sonts *id*, *email* et *name*.

Le type **Query** est spécial : tous les champs déclarés dans ce type représentent les "points d'entrées" de notre API GraphQL. Il y aussi les types spéciaux **Mutation** et **Subscription** que je n'aborderai pas dans ce billet.

**Le principe de base d'un serveur GraphQL est simple : A chaque champ d'un type, on associe une fonction qui devra renvoyer sa valeur.**

Prenons un exemple : supposons que le serveur GraphQL reçoive la requête suivante :

```graphql
{
  users {
    email
  }
}
```

c'est en réalité un raccourci syntaxique pour la requête suivante( notez le "query")

```graphql
query {
  users {
    email
  }
}
```

Le moteur d'éxécution GraphQL sur le serveur va donc d'abord chercher un champ *users* sur le type *Query* du schéma :

```graphql
  type Query {
    user(id:ID!): User
    users: [User]
  }
```

Notre schéma déclare en effet un champ *users*, qui indique retourner une liste d'objets de type *User*. 

Le moteur d'exécution GraphQL va chercher la fonction qu'il doit appeler pour "résoudre" la valeur du champ *users* en inspectant les **resolvers**

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

Il y trouve bien une fonction *users* définie dans les resolvers de champs du type *Query*. Le moteur de GraphQL exécute la fonction *users()* et renvoie la liste des utilisateurs comme étant la réponse à notre requête.

Vous pouvez faire TOUT CE QUE VOUS VOULEZ dans la fonction *users()*, la seule obligation c'est qu'elle renvoie une liste d'objets de type `User`, c'est à dire contenant des champs `id`, `name` et `email`.

Pour être sûr de bien comprendre le fonctionnement des resolvers, imaginons maintenant que nous souhaitons pouvoir recevoir les emails des utilisateurs en lettres minuscules OU majuscules, au moyen de la requête suivante:

```js
{
  users {
    email(uppercase: true)
  }
}
```

On va d'abord déclarer dans notre schema l'argument *uppercase* sur notre champ *email*:

```graphql
type User {
  id: ID
  name: String
  email(uppercase: Boolean): String
}
```

Ensuite, il nous faut déclarer un nouveau **resolver** pour le champ "email" de notre type "User":

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

Et le tour est joué !

Mais que signifie ce premier paramètre *parent* dans notre fonction de résolution du champ ?

Dans ce cas, le paramètre *parent* sera un "User". On aperçoit ici la nature **d'arbre** de GraphQL. En effet la requête pour obtenir nos email en majuscules est la suivante:

```graphql
{
  users {
    email(uppercase: true)
  }
}
```

la valeur du champ `users` a déjà été "résolu" au niveau 1 par la fonction *users()*. Quand on arrive au niveau 2, celui de notre champ email, on peut donc accéder directement à notre *user* via le *parent*, et s'en servir pour notre fonction de résolution.


## Conclusion

Il y a bien d'autres fonctionnalités intéressantes de GraphQL à explorer, mais une compréhension ce ces quelques concepts de base vous permet déjà de créer une API puissante et de profiter de certains avantages clefs de GraphQL parmi lesquels:

- Le typage qui permet de générer automatiquement votre documentation dans Graph**i**ql : au revoir les documentations pas à jour ou incomplètes ! Le typage permet aussi de détecter de nombreuses erreurs dans les requêtes envoyées depuis le client.
- L'explorateur Graph**i**ql permet aussi de tester vos requêtes et explorer votre API bien plus facilement et rapidement qu'avec POSTMAN ou CURL.
- Tirer parti de la puissance des arguments pour les champs
- Alléger certains JSON en demandant uniquement les champs dont vous avez besoin




