FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN apt-get update && apt-get install -y wget

EXPOSE 8080
CMD ["node", "app.js"]
