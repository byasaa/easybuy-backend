![](https://i.imgur.com/ISldpR4.png)


`EasyBuy` backend app built with Node.js, Redis, Express and MySQL which has [features](https://github.com/byasaa/team-backend#features) such as login / register using Memory caching, JWT auth, pasword hashing, CORS, etc.

## :memo: Table Of Content
* [Prerequisites](https://github.com/byasaa/team-backend#prerequisites)
* [Installation](https://github.com/byasaa/team-backend#installation)
* [Features](https://github.com/byasaa/team-backend#features)
* [Built wtih](https://github.com/byasaa/team-backend#features)
* [Author](https://github.com/byasaa/team-backend#author)
* [License](https://github.com/byasaa/team-backend#license)

## Prerequisites
- Node.js installed on the local machine
- Redis installed on the local machine
- MySQL intalled on the local machine (ex. XAMPP)
## Installation
1. Clone this repository:
    `git clone https://github.com/byasaa/team-backend`
2. Install depedencies:
    `cd team-backend & npm install`
3. Start XAMPP
4. Database configuration:
    * Open http://localhost/phpmyadmin in the browser
    * Create a new table with the name `easybuy`
    * Import database to current table, select `easybuy.sql` file from project folder
5. Start the server:
    `npm start`
6. Run app in the browser on the port http://localhost:3000

## Features
- [x] CRUD
- [x] Memory caching
- [x] Search, Sort, Pagination
- [x] Cors
- [x] Login/Register with JWT
- [x] Password hashing

## Built with
- [Node.js](http://nodejs.org/) - JavaScript runtime environment
- [Redis](https://redis.io/) - Memory caching
- [Express.js](https://expressjs.com/) - Web framework
- [MySQL](https://www.mysql.com/) Database
- [JWT](https://jwt.io/) - Login/Register authentication
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password Hashing

## Author
- [Alifki](https://github.com/ALIFKI) (frontend)
- [Ismoyo](https://github.com/ismoyo23) (frontend)
- [Abiyasa](https://github.com/byasaa) (backend)
- [Daniel](https://github.com/danielwetan) (full-stack)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/byasaa/team-backend/blob/master/LICENSE) file for details
