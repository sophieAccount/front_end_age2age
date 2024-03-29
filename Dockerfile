FROM debian:10

# Mise à jour de la liste des paquets
RUN apt-get update -yq

# Installation de curl, gnupg et Node.js
RUN apt-get install -yq curl gnupg
RUN apt-get install nano
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -yq nodejs

# nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN /bin/bash -c "source ~/.nvm/nvm.sh && nvm install 16 && nvm use 16"

# Installation de PM2
RUN npm install pm2 -g
# Définition du répertoire de travail et copie des fichiers
WORKDIR /app
COPY . /app

# Installation des dépendances et construction du projet
RUN npm install
RUN npm install express
RUN npm install typescript
RUN npm run build


# Exposition du port
EXPOSE 3001

# Commande de démarrage du service
CMD ["npm", "run", "start"]
