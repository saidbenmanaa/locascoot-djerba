# Guide de modification du site

Ce guide vous explique comment modifier vous-même le site, **sans être développeur**.

Tout ce que vous aurez besoin de changer au quotidien se trouve dans **un seul dossier : `content/`**.
Vous n'avez jamais besoin de toucher au reste.

---

## Vos images

Toutes vos photos et votre logo sont **déjà en place**. Voici où se trouve chaque fichier :

| Fichier | À quoi il sert |
|---|---|
| `public/images/logo.png` | Votre logo, dans le bandeau du haut |
| `public/images/hero/hero-bg.jpg` | La grande image de la page d'accueil |
| `public/images/about/about.jpg` | La photo de la page « L'agence » |
| `public/images/og/default.jpg` | L'aperçu affiché au partage sur WhatsApp / Facebook |
| `public/images/vehicles/zimota-tapo-50-1.jpg` | Zimota Tapo — photo principale |
| `public/images/vehicles/zimota-tapo-50-2.jpg` | Zimota Tapo — deuxième photo |
| `public/images/vehicles/cappuccino-s-125-1.jpg` | Cappuccino S — photo principale |
| `public/images/vehicles/cappuccino-s-125-2.jpg` | Cappuccino S — deuxième photo |

**Pour remplacer une image :** déposez la nouvelle en gardant *exactement le même nom de
fichier*. Aucune autre modification n'est nécessaire.

Si la photo vient d'un téléphone, lancez ensuite une fois sur un ordinateur :

```bash
npm run optimize-images
```

Cela réduit son poids sans différence visible — indispensable pour que le site reste rapide
chez vos clients en 4G.

> 💡 **Préférez des photos horizontales (paysage).** Les cadres du site sont au format 4:3.
> Une photo verticale reste utilisable, mais le haut et le bas sont rognés automatiquement.

---

## Comment modifier un fichier

Deux méthodes, au choix :

**Depuis GitHub (le plus simple, marche aussi depuis un téléphone)**

1. Ouvrez le fichier sur GitHub
2. Cliquez sur l'icône crayon ✏️ en haut à droite
3. Faites votre modification
4. Cliquez sur **Commit changes** en bas

Le site se met à jour tout seul en une minute environ.

**Depuis votre ordinateur** — ouvrez le fichier avec n'importe quel éditeur de texte, modifiez, enregistrez, puis `git push`.

> ⚠️ **Une seule règle à respecter** : ne supprimez jamais les virgules, les guillemets `"` ou les accolades `{ }`.
> Modifiez uniquement ce qui se trouve **entre les guillemets** ou **après les deux-points**.
> Si vous faites une erreur, le site ne se met pas à jour et vous recevez un email — l'ancienne version
> reste en ligne. Vos clients ne voient jamais d'erreur.

---

## 1. Changer un prix

📁 Fichier : `content/vehicles/zimota-tapo-50.ts` ou `content/vehicles/cappuccino-s-125.ts`

Cherchez la ligne `pricing` :

```js
  pricing: [{ minDays: 1, maxDays: null, pricePerDay: 60 }],
                                                       ↑
                                        le prix par jour, en dinars
```

**Changez uniquement le nombre.** Le nouveau tarif apparaît automatiquement partout : page du
scooter, tableau des tarifs, page d'accueil, estimation du formulaire, et jusque dans les
résultats Google.

### Proposer un tarif dégressif plus tard

Si un jour vous voulez que les locations longues coûtent moins cher par jour, remplacez la ligne
par plusieurs tranches. Les tableaux du site s'adaptent tout seuls :

```js
  pricing: [
    { minDays: 1, maxDays: 3,    pricePerDay: 60 },   ← 1 à 3 jours : 60 DT/jour
    { minDays: 4, maxDays: 6,    pricePerDay: 55 },   ← 4 à 6 jours : 55 DT/jour
    { minDays: 7, maxDays: null, pricePerDay: 50 },   ← 7 jours et plus : 50 DT/jour
  ],
```

`null` signifie « et plus ». Ne le remplacez pas par un nombre.

---

## 2. Ajouter un nouveau scooter

1. Dans `content/vehicles/`, **copiez** un fichier existant
2. **Renommez-le** avec le nom du modèle, en minuscules et avec des tirets → `honda-vision-110.ts`
3. Ouvrez-le et modifiez les valeurs (détail des champs plus bas)
4. Ouvrez `content/vehicles/index.ts` et ajoutez-le :

```js
import hondaVision110 from './honda-vision-110';   ← ajoutez cette ligne en haut

export const vehicles: Vehicle[] = [
  zimotaTapo50,
  cappuccinoS125,
  hondaVision110,                                   ← et le nom ici
];
```

C'est tout. Le scooter apparaît sur le site, dans le tableau des tarifs, dans le formulaire de
réservation et dans le plan du site pour Google.

### Les champs d'un scooter

| Champ | Ce que c'est |
|---|---|
| `slug` | L'adresse de la page : `.../scooters/`**`honda-vision-110`**. Minuscules et tirets, jamais d'accents ni d'espaces |
| `name` | Le nom du modèle tel qu'il s'affiche : `Honda Vision 110`. **Sans la cylindrée** — celle-ci apparaît déjà dans `engineCc` et dans la description |
| `category` | `scooter-50`, `scooter-125`, `maxi-scooter` ou `motorcycle` |
| `engineCc` | Cylindrée en cm³ |
| `transmission` | `automatic` ou `manual` |
| `seats` | Nombre de places |
| `licence` | Ce que le client doit présenter, en français **et** en anglais |
| `minAge` | Âge minimum du conducteur |
| `images` | Les noms des fichiers photos |
| `tagline` | Une phrase courte de présentation, en français **et** en anglais |
| `description` | Deux ou trois phrases, en français **et** en anglais |
| `included` | La liste de ce qui est compris dans le prix |
| `pricing` | Le tarif (voir section 1) |
| `available` | `true` = visible sur le site, `false` = masqué |
| `featured` | `true` = mis en avant sur la page d'accueil |
| `order` | Ordre d'affichage : les petits nombres apparaissent en premier |

**Champs facultatifs** — à n'ajouter que si vous connaissez le chiffre exact. Mieux vaut ne rien
afficher qu'un chiffre inventé :

| Champ | |
|---|---|
| `tankLitres` | Capacité du réservoir |
| `consumptionPer100km` | Consommation en L/100 km |
| `deposit` | Caution en DT (vous n'en demandez pas actuellement) |

> Les champs `licence`, `tagline`, `description` et `included` existent en deux langues :
> ```js
> tagline: {
>   fr: 'Scooter urbain léger, très économique',
>   en: 'Light urban scooter, very fuel-efficient',
> },
> ```
> **Remplissez toujours les deux**, sinon le site ne se met pas à jour.

---

## 3. Changer une photo

1. Déposez la photo dans `public/images/vehicles/`
2. Nommez-la d'après le scooter : `cappuccino-s-125-1.jpg`
   *(un nom clair aide aussi votre référencement dans Google Images)*
3. Lancez `npm run optimize-images` sur un ordinateur
4. Vérifiez que le nom figure bien dans la fiche du scooter :

```js
  images: ['cappuccino-s-125-1.jpg', 'cappuccino-s-125-2.jpg'],
```

Le plus simple reste de **garder les noms de fichiers existants** : dans ce cas il n'y a rien
à modifier dans le code.

La **première photo de la liste** est celle qui s'affiche partout : carte du scooter, page
d'accueil, partage WhatsApp. Choisissez la meilleure.

### Conseils pour les photos

- Format **paysage** (horizontal), le scooter entier dans le cadre
- En extérieur, à la lumière du jour, à Djerba : la plage, les palmiers, une ruelle blanche
- Idéalement à Djerba : une photo prise ailleurs se remarque et affaiblit la confiance
- 2 photos par scooter suffisent

---

## 4. Masquer un scooter temporairement

Un scooter en réparation ou déjà loué pour la saison ? Dans son fichier, changez :

```js
  available: false,
```

Il disparaît du site immédiatement. Remettez `true` quand il revient. **Ne supprimez pas le
fichier** — vous perdriez son contenu et sa page déjà référencée par Google.

---

## 5. Changer vos coordonnées

📁 Fichier : `content/site.ts`

C'est ici que se trouvent votre téléphone, votre WhatsApp, votre email et vos horaires.
Une seule modification met à jour tout le site.

```js
  contact: {
    phone: '+21624591155',            ← pour le bouton « Appeler » (sans espaces)
    phoneDisplay: '+216 24 591 155',  ← ce que voit le client (avec espaces)
    whatsapp: '21624591155',          ← chiffres uniquement, SANS le "+"
    email: 'djerbalocascoot@gmail.com',
  },
```

> ⚠️ Le numéro WhatsApp s'écrit **sans le `+` et sans espaces**, indicatif pays compris.
> Pour +216 24 591 155 → on écrit `21624591155`.

**Les horaires** sont juste en dessous, au format 24 h. Vous êtes ouvert tous les jours aux mêmes
heures, donc il n'y a qu'une seule ligne à modifier :

```js
  openingHours: { open: '08:00', close: '20:00' },
```

**Le taux euro** sert uniquement au « ≈ 18 € » affiché à côté des prix en dinars. Ajustez-le de
temps en temps ; il est présenté comme approximatif, il n'a pas besoin d'être exact.

### Votre adresse

Elle est renseignée dans `address`, en deux formes : `full` est le texte affiché sur le site,
les autres champs sont la même adresse découpée, sous la forme que Google attend pour les
résultats locaux. **Si vous modifiez l'une, modifiez l'autre.**

**Vos coordonnées GPS** sont déjà renseignées. Pour les changer un jour : ouvrez Google Maps,
faites un clic droit sur votre emplacement, et le premier élément du menu affiche les deux
nombres à recopier dans `geo`.

---

## 6. Modifier les questions fréquentes

📁 Fichier : `content/faq.ts`

Ces questions ont une **grande valeur pour votre référencement** : Google les affiche parfois
directement dans ses résultats, ce qui augmente la place que prend votre site sur la page.

Pour ajouter une question, copiez un bloc existant :

```js
  {
    topic: 'practical',
    question: {
      fr: 'Peut-on louer pour une demi-journée ?',
      en: 'Can I rent for half a day?',
    },
    answer: {
      fr: 'La location se fait à la journée…',
      en: 'Rentals are by the day…',
    },
  },
```

`topic` doit être l'un de : `booking`, `requirements`, `insurance`, `practical`.

> 💡 Écrivez les questions **avec les mots de vos clients**, pas avec les vôtres.
> « Quel permis pour louer un scooter à Djerba ? » fonctionne bien mieux que
> « Prérequis administratifs ».

---

## 7. Modifier les zones de livraison

📁 Fichier : `content/zones.ts`

Chaque zone crée automatiquement sa propre page (`/zones/midoun`), conçue pour capter les
recherches du type « location scooter Midoun ». Ce sont vos pages les plus rentables en
référencement local.

Vous pouvez modifier les textes, ajouter des lieux à visiter, ou créer une nouvelle zone en
copiant un bloc existant.

> 💡 Écrivez des conseils **réellement utiles** sur chaque quartier. Google favorise les pages qui
> aident vraiment, et vos clients aussi.

---

## 8. Ajouter des avis clients

Il n'y a **aucun avis affiché sur le site** pour l'instant, ce qui est volontaire : publier de
faux avis est contraire aux règles de Google et à la loi européenne sur la consommation — celle
des pays d'où viennent la plupart de vos clients.

**La bonne méthode :** envoyez le lien de votre fiche Google par WhatsApp le soir où le client
rend le scooter. Trois vrais avis valent mieux que dix inventés.

Quand vous en aurez, indiquez le total dans `content/site.ts` pour faire apparaître les étoiles
dans Google :

```js
  reviews: {
    rating: 4.9,   ← votre note moyenne réelle
    count: 12,     ← votre nombre réel d'avis
  },
```

Laissez `count: 0` tant que vous n'en avez pas.

---

## Modifier les textes du site

📁 Fichiers : `messages/fr.json` (français) et `messages/en.json` (anglais)

Tous les textes de l'interface s'y trouvent : titres, boutons, page d'accueil, formulaires,
et les titres que Google affiche dans ses résultats (section `meta`).

**Modifiez uniquement ce qui est entre guillemets, après les deux-points :**

```json
"heroTitle": "Location de scooters à Djerba",
                ↑ vous pouvez changer ce texte
```

> ⚠️ Si vous modifiez `fr.json`, pensez à modifier **la même ligne** dans `en.json`.
>
> ⚠️ Ne touchez pas aux éléments entre accolades comme `{price}` ou `{zone}` : ils sont remplacés
> automatiquement par une valeur.

---

## En cas de problème

**Le site ne s'est pas mis à jour après ma modification**
Une erreur de syntaxe (virgule ou guillemet manquant). Vous recevez un email de Vercel avec le
détail. **L'ancienne version reste en ligne** — vos clients ne voient jamais d'erreur.
Corrigez et renvoyez.

**J'ai fait une bêtise, je veux revenir en arrière**
Sur GitHub, ouvrez le fichier → **History** → choisissez la version précédente → **Revert**.
Tout l'historique est conservé, rien n'est jamais perdu définitivement.

**Je ne trouve pas où modifier quelque chose**

| Je veux changer… | Fichier |
|---|---|
| Un prix | `content/vehicles/<scooter>.ts` |
| Ajouter / masquer un scooter | `content/vehicles/` + `index.ts` |
| Téléphone, WhatsApp, email, horaires, logo | `content/site.ts` |
| Une photo | `public/images/` |
| Une question fréquente | `content/faq.ts` |
| Une zone de livraison | `content/zones.ts` |
| Un texte de bouton ou de page | `messages/fr.json` et `messages/en.json` |

---

## À faire avant l'ouverture du site

- [ ] Vérifier les prix : 60 DT pour le Zimota Tapo, 80 DT pour le Cappuccino S
- [ ] Faire relire les pages *Conditions générales*, *Mentions légales* et *Confidentialité*
- [ ] Vérifier que chaque réponse de la FAQ correspond à vos conditions réelles
- [ ] Créer et compléter votre fiche **Google Business Profile**
- [ ] Déclarer le site dans **Google Search Console** et y envoyer le `sitemap.xml`
