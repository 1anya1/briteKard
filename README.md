# BriteKard

BirteKard is an application that helps users create a digital version of business cards. Users can customize their cards and share them using a unique link or QR code, making it easy for others to connect and access their contact information. Users can upload digital business cards directly into the phone via a .vcf file.

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

---

## Frontend 
The front end of this app takes advantage of the React framework and React Router Dom to build a single dynamic page. The parent component App.js controls page permissions based on JWT authentication; if a user is authenticated, the index and other pages become accessible and render views unique to the specific user. Tailwindcss was utilized to rapidly develop custom, responsive designs with minimal CSS code while maintaining design consistency and flexibility. Frontend deployed using Netlify.


## Backend 

On the application's server side, user authentication is handled through Passport. For the database, MongoDB was chosen due to its flexibility, and two separate schemas were established for users and cards. To store images, the app integrates the Cloudinary SDK, which offers fast image retrieval. Additionally, the app features a password reset function, which is made possible by implementing Nodemailer. Bakcend deployed to Heroku.


## Technologies used
  - ReactJS
  - MongoDB
  - Express
  - Taiwindcss
  - Cloudinary SDK
  - Nodemailer
  - Netlify
  - Heroku
  - Figma



### To Get Started 

- Clone this repo to your local machine using `https://github.com/pavloskaralis/foodie`
- Install dependencies: npm install
- Start the server: npm start
- Navigate to the app in your browser: http://localhost:3000

## Roadmap
- Set up Context for global state management 
- Standarize components and implement storybook
- Set up end to end testing 
- Create Rect Native app


## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**







