# MyRPG - text-typing role-playing game
MyRPG is a turn-based rpg where combat is based on text-typing. It is the final project of the Web Programming and Application course in NTU 2024 Spring semester. Our team members are 吳鎮星, 李哲維, 張富翔, 羅瑋皓.

- Demo video: https://youtu.be/Qt25z7lF7MU
- Presentation Slide: https://docs.google.com/presentation/d/1jM2qDlP39Xl1ts9E9M5nvaY6JrppR3d2EG5SRVTkT-Q/edit?usp=sharing

## Technologies
### Frontend
- Framework: React, Bootstrap
- Http client: axios

### Backend
- Framework: Express Node.js
- ORM: Sequalize
- Database: MySQL
- Authentication: JWT

### Design pattern
- Separation of Frontend & Backend and Communication by API
- Separation of Backend in layers: router, controller, service, repository

## Features
### Scene traversal
Player can visit different scenes in the game such as the main town and various battlegrounds. There are unique monsters to fight with in each battleground.

### Text-typing combat system
The damage of player's attack is calculated based on the character and equippment attributes, and the accuracy and speed of typing a given spell

### Item trading, using and equipping
Player can earn items from battle or trade items in the town market. They can utilize the items to restore their health and mana or to enhance their combat attributes.

## How to use
### Database Setup
1. Please install `mysql` on your computer.
2. Create a new `mysql` database named `mydb`.
3. Edit user name, password and database name in `\my-express-app\database\db.config.js` to match your setting of mysql.

### Server startup
1. Please install `npm` on your computer.
2. In the root directory of the repository, run `npm install` via terminal.
3. At the same directory, run `npm run install-start` via terminal.
4. Visit the site via `http://localhost:3000` in web browser.