# 🌍 AI Carbon Footprint Analytics
 
 **AI Carbon Footprint Analytics** est une application web intelligente qui permet aux utilisateurs de **visualiser l’empreinte carbone** liée à l’usage de serveurs informatiques dans différents pays. L’objectif est de **sensibiliser à la consommation énergétique** des technologies numériques et de **favoriser des pratiques plus durables**.
 
 ## 🚀 Fonctionnalités
 
 - 🗺️ **Carte interactive** : affiche la localisation des serveurs utilisés
 - 🔍 **Filtrage dynamique** : par pays et par type de serveur
 - 📊 **Graphiques dynamiques** :
   - Consommation en kg de CO₂
   - Énergie totale utilisée
 - 📄 **Export de résultats** : génération de rapports en **CSV** et **PDF**
 - 🔐 **Système d’authentification sécurisé** :
   - Login / Register avec **JWT**
   - Cryptage des mots de passe via **bcrypt**
 
 ## 🛠️ Technologies utilisées
 
 - **Frontend** : React.js
 - **Backend** : Node.js + Express.js
 - **Base de données** : MongoDB Atlas (via Mongoose)
 - **Authentification** : JSON Web Tokens (JWT), bcrypt
 - **Visualisation** : Chart.js ou autre bibliothèque de graphiques
 - **Cartographie** : API de carte (Leaflet)
 - **Export fichiers** : bibliothèques pour PDF et CSV
 
 
 
 # 2. Backend setup
 cd Backend
 npm install
 # Créer un fichier .env avec les infos MongoDB
 npm run dev
 
 # 3. Frontend setup
 cd ../Frontend
 npm install
 npm start
 
 
 
 
 
 .env exemple pour le backend :
 
 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_secret_key
 SALT=12
 
 
 
 🎯 Objectifs du projet
 Apporter une solution technologique au service de l’écologie
 
 Donner aux utilisateurs un aperçu clair de leur impact carbone
 
 Développer un projet complet fullstack avec de vraies problématiques métier
 
 Intégrer des fonctionnalités comme l’export de données, les graphiques, la cartographie et la sécurité