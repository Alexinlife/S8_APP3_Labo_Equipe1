# 🧪 Labo – Introduction à GitHub Actions

## 🎯 Objectif du laboratoire
Ce laboratoire vous familiarisera avec **GitHub Actions**, la plateforme CI/CD intégrée à GitHub.

Vous apprendrez à :
- Créer un pipeline d’intégration continue (CI) à partir de zéro.
- Comprendre les étapes d’un workflow (`checkout`, installation, test, build, déploiement).
- Réfléchir à la **reproductibilité et la sécurité** d’un pipeline.

---

## 🧰 Préparation
1. Faites un fork du [repo du labo](https://github.com/etiennebeaulieu/S8_APP3_Labo)
2. Clonez ce repo sur votre poste :

3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Vérifiez que tout fonctionne :
   ```bash
   npm test
   ```

---

## 🧩 Contenu du labo

### **Partie 1 – Démarrage du pipeline**
1. Créez un dossier `.github/workflows` à la racine du projet.

2. Créez un fichier `.github/workflows/ci.yml` contenant :
```yaml
name: CI Demo
on: [push]
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Print hello
        run: echo "Hello from GitHub Actions!"
```
3. Poussez vos changements et observez le résultat dans l’onglet **Actions** de GitHub.

#### **Questions :**

- Que fait ce workflow ?

- Que signifie `on: [push]` ?

- Que remarquez-vous dans les logs ?

---

### **Partie 2 – Utiliser une action standard**
1. Ajoutez une étape pour cloner le dépôt avant d’exécuter des commandes :
```yaml
- name: Checkout code
  uses: actions/checkout@v4

- name: List files
  run: ls -la
```
2. Observez la différence dans les logs — quels fichiers voyez-vous maintenant ?

#### **Questions :**
- Que signifie `@v4` ?  
- Quelle différence entre `@v4` et `@latest` ?
- Quels sont les avantages et désavantages d’utiliser une version fixe plutôt que `latest` ?
- Quelle approche serait la plus sécuritaire pour un projet d’entreprise ? Pourquoi ?

---

### **Partie 3 – Installer les dépendances**
1. Ajoutez une étape pour installer Node.js :
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20
```
2. Installez les dépendances:
```yaml
- name: Install dependencies
  run: npm install
```
3. Exécutez à nouveau le pipeline et observez les logs.

#### **Questions :**
- Que se passe-t-il si une dépendance publie une nouvelle version entre deux exécutions ?
- Pourquoi cela peut-il poser un problème de sécurité ?
- Quelle commande plus sûre pourriez-vous utiliser à la place de `npm install` ?
- Modifiez votre workflow pour utiliser cette commande et observez les différences.
  
*(Indice : cherchez une commande npm garantissant une installation déterministe.)*

---

### **Partie 4 – Lancer des tests**
1. Ajoutez une étape pour lancer les tests :
```yaml
- name: Run tests
  run: npm test
```
2. Faites volontairement échouer un test (par exemple en modifiant une valeur).
3. Observez le statut du workflow.
4. Corrigez le test

#### **Questions :**

- Que se passe-t-il dans GitHub lorsqu’un test échoue ?
- Pourquoi est-ce utile dans un processus d’intégration continue ?

---

### **Partie 5 – Conditions d’exécution**
1. Ajoutez une étape conditionnelle :
```yaml
- name: Run only on main
  if: github.ref == 'refs/heads/main'
  run: echo "This runs only on main!"
```
2. Poussez une modification sur une autre branche et observez les différences.

#### **Questions :**
- Pourquoi pourrait-on vouloir limiter l’exécution de certaines étapes à une seule branche ?

---

### **Partie 6 – Déclencheurs et sécurité**

#### **6.1 - Explorer les déclencheurs**
1. Modifiez votre workflow pour exécuter aussi sur les pull requests :
```yaml
on:
  push:
  pull_request:
```
2. Créez une pull request et observez que le workflow se déclenche à nouveau.

#### **Questions :**
- Quelle différence observez-vous entre un `push` et une `pull request` ?

#### **6.2 - Découvrir `pull_request_target`**
1. Modifiez temporairement votre YAML
```yaml
on:
    pull_request_target:
```

#### **Questions :**
- Quelle est la différence entre `pull_request` et `pull_request_target` ?
- Pourquoi `pull_request_target` peut-il être risqué dans un projet open source ?
- Dans quelles circonstances pourrait-on l’utiliser de manière sécuritaire ?

---

### **Partie 7 – Construire et déployer**
1. Modifiez votre workflow pour build le projet :
```yaml
- name: Build project
  run: npm run build
```
2. Exécutez le pipeline et observez que le répertoire dist/ (ou build/) est généré.
3. Vérifiez dans les logs que la commande s’est bien exécutée sans erreur.

GitHub propose une action officielle pour déployer facilement du contenu statique depuis un pipeline.
1. Ajoutez les permissions nécessaires au début de votre workflow (sous jobs:) :
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
2. Ajoutez ces étapes après le build :
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./dist # ou ./build selon votre projet

- name: Deploy to GitHub Pages
  if: github.ref == 'refs/heads/main'
  uses: actions/deploy-pages@v4
```
3. Activez **Pages → Source: GitHub Actions** dans les paramètres du dépôt.
4. Poussez vos changements sur `main`et observez:
   1. le pipeline exécuter le déploiement
   2. un lien apparaître dans la sortie du job "Deploy to Github Pages".
5. Allez voir la page maintenant déployée.

#### **Questions :**
- Pourquoi ne pas déployer depuis toutes les branches ?  
- Que se passe-t-il si un test échoue avant le déploiement ?  
- Comment protéger un pipeline contre une action compromise ?

---

## ✅ Résumé d’apprentissage
À la fin du labo, vous serez capables de :
- Créer un pipeline GitHub Actions complet.  
- Identifier les bonnes pratiques de sécurité CI/CD :
  - Versionner les actions (`@v4`).
  - Utiliser `npm ci` pour la reproductibilité.
  - Comprendre les risques liés à `pull_request_target`.
  - Restreindre le déploiement à la branche principale.

---

## 🧱 Commandes utiles
| Tâche | Commande |
|:--|:--|
| Exécuter js localement | `npm start` |
| Lancer les tests | `npm test` |
| Construire le projet | `npm run build` |
| Déployer le projet localement | `npm run preview` |
| Créer un commit et pousser | `git add . && git commit -m "partie X" && git push` |

