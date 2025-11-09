# Mon Vieux Grimoire – Backend

## Description

API backend pour le site **Mon Vieux Grimoire**, une application de notation de livres développée avec **Node.js**, **Express** et **MongoDB**.  
Ce projet fait partie de ma formation **Développeur Web – OpenClassrooms**.

Le front-end React (développé par Kévin) communique avec cette API REST sécurisée.

-----------------

## Fonctionnalités

- Authentification utilisateurs (inscription / connexion)
- Protection des routes via **JWT**
- CRUD complet sur les livres
- Notation de livres (une note par utilisateur)
- Calcul automatique de la moyenne des notes
- Optimisation des images en **.webp** (Sharp)
- Sécurisation via bcrypt, CORS et .env

-----------------

## Technologies

- **Node.js / Express**
- **MongoDB / Mongoose**
- **Multer** (upload)
- **Sharp** (optimisation image)
- **bcrypt / JWT** (sécurité)
- **dotenv / cors**

-----------------

##  Installation du backend

1- Cloner le projet :
**bash**
git clone https://github.com/abzohair/Mon-vieux-grimoire.git

2- Installer les dépendances :
npm install

3- Créer un fichier .env à la racine :
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/monvieuxgrimoire
RANDOM_TOKEN_SECRET=<clé_secrète>

4- Lancer le serveur :
nodemon server

-----------------

##  Installation du frontend
**Voir le fichier README dans le dossier frontend**
