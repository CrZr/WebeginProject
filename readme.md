# WeBegin Project

## Concept

Outil de monitoring sur des bases de données

## Features

- Notifications (alertes sur les bdd)
- Affichage de graphiques
- Intégration graphiques de base de données
- Token de session JWT
- authentification
- gitignore vrreuumant

## Archi

- Serveur nodeJs
- Bdd mysql
- Front html, TailwindCss, EJS : embbed javascript template
- Potentielle dockerisation

## Tipss

### USAGE

`cd jwt-project`
`npm start`

### reminder

api pour envoyer des mails : sendgrid

chart.js : outil graphiques

notif firebase.

<https://www.sqlitetutorial.net/sqlite-nodejs/insert/>

<https://www.sqlitetutorial.net/sqlite-nodejs/query/>

<https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/>

## Tables SqLite

Table client :

- ClientID
- Sex
- LastVisitDate
- VisitCount
- Age

Table revenus :

- DayID
- DayIncome
- Date
- Losses
- SoldArticlesCount

Table articles :

- ArticleId
- Name
- StockCount
- SoldCount

Table soldArticles :

- SoldId
- ArticleID
- Price

Table Users :

- UserId
- Email
- Password

### TODO

connecter le front de l'ancienne archi au nouveau serveur ( le front est dans le fichier webServer et le back dans WebServerTest)

lancer les webserver : "node .\index.js" ou "node .\server.js"

la bonne db est dans WebServerTest\jwt-project\database\OGchinook.db

USAGE : @ WebeginProject\WebServerTest\jwt-project => nodemon index.js
