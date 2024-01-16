# Retours

Liste d'améliorations par catégories.

Révision de ton code en faisant la parallèle avec des pratiques communes (best practices).

## JS

### Forme

- Est-ce des fonctions non documentée que je vois ?! 😉 Si tu prends le réflexe de documenter chaque fonctions et méthodes **dès que tu les écris**, tu seras le plus fort développeur de la région. Blague à part, c'est un très bon réflexe à avoir et une très belle plus-value au yeux des entreprises.
- Les membres (fonctions (natives et ES6), méthodes de classes, attributs de classes, constantes et variables) sont généralement :

    - écrits en `camelCase` et non en `PascalCase`.
    - non préfixés de `$`. C'était une vieille pratique commune en jQuery qui disparaît.

- Tous les commentaires doivent être conjugués, et malheureusement beaucoup de gens font l'erreur en anglais, je m'explique ^^

    Chaque ligne de code va exécuter une ou plusieurs instructions. Il faut commenter en expliquant ce qu'elle va faire, donc à la troisième personne du singulier.

    Pour le code suivant, j'écrirais (FR-EN):

    ```javascript
    // Réinitialise sa hauteur. (troisième personne du singulier)
    // Resets its height (et non `get its height`).
    textEl.css('height', '');
    // Rend l'élément visible.
    // Makes the element visible (et non `make the element visible`).
    paragraphEl.addClass('visible');
    // Récupère sa hauteur / récupère la hauteur de l'élément... (t'arranges en fonction du contexte)
    // Gets its height (t'as comprit).
    const paragraphHeight = textEl.height();
    ```

    Le but est de comprendre pourquoi il faut écrire à la troisième personne du singulier, donc avec un `s` à la fin des verbes en anglais. Sinon, c'est de l'impératif ^^ (*get* = *récupère* = un ordre, et non une description).

### Fond

- Pour la déclaration des membres (fonctions ES6, variables, constantes...), il faut prioriser `const` à `let` à `var`.
    Pour les fonctions ES6, ça sera toujours `const` sauf si tu dois *"réécrire"* ta fonction (réécrire une fonction, c'est la déclarer à nouveau tout en changeant son code).
- En jQuery, pour être cohérent et propre dans sa manière de déclarer des écouteurs d'événements, tu peux utiliser leur méthode la plus récente pour les déclarer :

    ```javascript
    // Ancienne
    $(window).resize((e) => {});
    // Nouvelle (tu peux mettre tous les types d'événements: "click", "change", "input"...).
    $(window).on("resize", (e) => {});
    ```

- Ta fonction `IsVisible` devrait uniquement retourner un booléen en fonction de la visibilité de l'élément, mais pas faire d'autres opération.

    Quand on appelle une fonction `isVisible`, ou `addClass`, ou `getContact`, on s'attend à ce que ça fasse exactement ce que le nom dit, et pas autre chose ^^

    Pour corriger ça, tu peux mettre ton process qui ajoute/retire des classes || calcule des hauteurs dans une autre fonction qui sera appelée en dehors de `isVisible`, histoire qu'il retourne uniquement un booléen, et ne fasse pas d'autres opérations.

- Ici je te propose une petite idée pour améliorer ton code, pour qu'il puisse devenir une vraie bibliothèque externe.

    Le but est que des personnes ayant envie d'implémenter ta bibliothèque auraient un fichier à implémenter (ex: `seemore.js`),

    Il pourraient en suite facilement initialiser un *SeeMore* sur les éléments qu'il souhaitent.

    Voici ma proposition : tu pourrais créer une classe JS qui gérerait toute l'initialisation de ton élément. Voici un exemple du squelette de ta classe :

    ```javascript
    /**
     * TODO: write class documentation
     */
    class SeeMore {
        /**
         * Element which will have its {@link SeeMore} style applied to.
         * @var {HTMLElement}
         */
        #element;

        /**
         * C'est dans ton constructeur que tu vas initialiser le SeeMore sur élément.
         * @param {HTMlElement} Element which will have its {@link SeeMore} style applied to.
         */
        constructor(element) {
            this.#element = element;

            /**
             * Ici tu ajoutes toutes tes opération à faire sur élément,
             * comme l'ajout de classes par défaut, les listeners, etc.
             */

            // Tu peux accéder aux propriétés de classe comme ça.
            this.#element;

            // Tu peux appeler des méthodes de cette manière.

            // Méthode publique.
            this.isVisible();

            // Méthode privée
            this.#mesureHeights();
        }

        /**
         * Cette méthode peut-être publique, si jamais le développeur veut avoir l'état actuel de son paragraphe.
         * @return {boolean} If the {@link SeeMore.#element} is visible.
         */
        isVisible() {

            // Voici un exemple de ce que devrait retourner la méthode `isVisible`: un booléen !

            // Détermines si un élément est visible sur l'UI.
            return $(this.#element).is(":visible");

            // Ou dans ton cas à toi, c'est plutôt un truc comme ça:
            return $(this.#element).hasClass("visible");
        }

        /**
         * Tu peux déclarer des méthodes privées avec le `#`
         * 
         * Cette méthode peut-être privée, puisse que le développeur n'aura pas besoin de l'appeler, vu qu'elle sert uniquement à calculer des trucs sur ton élément.
         */
        #mesureHeights() {

        }
    }

    let instanceList = [];

    // Pour instancier ton SeeMore sur une liste d'éléments que le développeur a choisi, tu peux faire comme ça:
    for (const paragraphEl of document.querySelectorAll(".paragraph")) {
        const seeMore = new SeeMore(paragraphEl);
        instanceList.push(seeMore);
    }

    // Ici, le développeur peut vérifier en direct si son 4 ème paragraphe est visible ou non, grace à notre méthode publique `SeeMore.isVisible`.
    instanceList[3].isVisible();
    ```

## HTML

### Fond

- La sémantique HTML à son importance pour l'accessibilité du web. Par exemple, tes boutons doivent être déclarés avec la balise `<button>`, et la majorité des textes simples avec `<p>` (il y a des exceptions, par exemple : `<label>`, `<span>`, `<li>`, etc, ne nécessitent pas la balise paragraphe pour y mettre du texte).

    Pour tes boutons, tu peux leur assigner une classe où tu réinitialiseras le style par défaut du navigateur, tout en bénéficiant de l'accessibilité clavier de la balise `<button>`.

    ```html
    <button class="see-more">Voir plus</button>
    <button class="see-less">Voir moins</button>
    ```

    Pour tes paragraphes dans les `<section>`, tu peux utiliser la balise `<p>`, sans avoir à rajouter de classe dessus, puisque ton `<p>` peut-être stylisé depuis ton CSS en surchargeant le style de texte par défaut (police, taille, couleur...).

    ```html
    <section class="paragraph minimized">
        <p>...</p>
    </section>
    ```

## CSS

### Forme

- Il faut espacer les sélecteurs des opérateurs ^^

    ```css
    /* Without spacing */
    .paragraph>.see-more:hover {}
    /* With spacing */
    .paragraph > .see-more:hover {}
    ```

### Fond

- Chaque fichier CSS commence généralement par une réinitialisation sur style par défaut.

    On appelle ça une *surcharge du style* : le style par défaut du navigateur est appliqué, mais tu écrases le siens par le tiens.

    Le consensus écrit les déclarations suivantes :

    ```css
    /* Ce sélecteur signifie: TOUS les éléments, donc il faut l'utiliser avec parcimonie ! */
    * {
        /* Ici, on ne va mettre que cette déclaration. Tu peux regarder en ligne pourquoi elle est importante. */
        box-sizing: border-box;
    }

    html,
    body {
        /* Pour que notre page prenne toute la hauteur, simplifie la gestion du défilement de page. */
        height: 100%;
        /* Pour retirer la marge interne + externe que certains navigateurs appliquent par défaut. */
        margin: 0;
        padding: 0;
    }

    /* C'est dans le `body` que tu vas pouvoir appliquer toute ton style de typographie. */
    body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        color: black;
    }

    /* Après tu mets tout le style que tu souhaites :) */
    ```

- Marges sur ta balise `<p>` : un paragraphe à par défaut une marge externe bas, il ne vaut mieux pas lui appliquer de marge externe sur ses 4 côtés comme tu l'as fait avec `margin: 1rem`.

    Tu peux modifier sa marge externe bas pour l'ajuster à tes besoins, mais si tu veux modifier ses autres marges, je te conseillerais d'appliquer à tes éléments `<p>` une classe CSS qui ajoute ces propriétés, histoire de laisser l'élément natif `<p>` avec une simple marge externe bas.
