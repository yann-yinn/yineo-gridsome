---
title: 'Node.js : Module.exports vs exports'
tags_ids:
  - node.md
---

En node,`exports` est une notation raccourcie pour `module.exports`. En coulisse, `exports` est simplement une référence à `module.exports`.

De manière schématique, le fonctionnement des modules _node_ ressemble à ça:

```js
var module = { exports: {} }
// node crée la référence à exports
var exports = module.exports

// -------------------------
// ici, se trouve le code de votre module
// function maFonction() {return "hello"}
// module.exports = { maFonction }
// -------------------------

return module.exports
```

Les propriétés ajoutées à `exports` sont donc ajoutées aussi à `module.exports`. En revanche, si on écrase totalement la variable `exports` avec un objet, on brise la référence à `module.exports` et la variable `exports` ne remplit plus son rôle.
