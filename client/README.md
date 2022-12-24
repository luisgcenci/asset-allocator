# Project Name

Project Description

# Folder Structure

```
client
├── public
└── src
    ├── index.js
    ├── App.js
    ├── css
    │   ├── index.css
    │   └── App.css
    ├── apps
    │   └── app-one
    │       ├── AppOne.js
    │       └── Pages
    │           └── Home
    │               ├── Home.test.js
    │               ├── Home.js
    │               └── Home.module.css
    ├── components
    │   └── button
    │       ├── Button.test.js
    │       ├── Button.js
    │       └── Button.css
    ├── mock
    │   └── products.js
    ├── assets
    │   └── Tricentis.png
    ├── themes
    │   └── Default
    │       ├── typography.js
    │       └── pallete.js
    ├── utils
    │   ├── __tests__
    │   └── SumTwoNumbers.js
    ├── lib
    │   └── Axios.js
    ├── hooks
    │   └── hooks.ts
    └── store
        ├── features
        │   └── sampleSlice.ts
        └── store.ts
```

`public/` - Public Folder. \
`src/` - All Resources. \
`src/index.js` - Application Entry Point. \
`src/App.js` - Main React Component. \
`src/css/` - CSS for App.js and index.js. Set up to use Flexbox web layout model. \
`src/App.js/apps/` - Apps within main app and big features \
`src/mock/` - API Mocks and Dummy Data. \
`src/assets/` - Assets Folder. \
`src/themes/` - App's Themes. \
`src/utils/` - Utility Functions. \
`src/lib/` - Libraries used accross the app. \
`src/hooks/` - Redux Hooks. \
`src/store/` - Redux Store with Redux Persist.

# Main Technologies

- TypeScript `^4.7.4`
- React - `^18.2.0`
- Node.js - `16.17.0 LTS`
- NPM - `8.15.0`

# Code Analysis & Style

## **Tools**: 

- ESLint
	```
	npx prettier --write <file_name>
	or
	npx prettier --write <directory_name>
	```
- Prettier
	```
	npx prettier --write <file_name>
	or
	npx prettier --write <directory_name>
	```

## **ESLint Config**

✔ How would you like to use ESLint? **Syntax, find problems, and enforce code style.** \
✔ What type of modules does your project use? **esm** \
✔ Which framework does your project use? **react** \
✔ Does your project use TypeScript? **Yes** \
✔ Where does your code run? **browser** \
✔ How would you like to define a style for your project? **prompt** \
✔ What format do you want your config file to be in? **JavaScript** \
✔ What style of indentation do you use? **tab** \
✔ What quotes do you use for strings? **single** \
✔ What line endings do you use? **unix** \
✔ Do you require semicolons? **Yes**

# Contributing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with TypeScript

## **Important Rules:**
* Perform work in a feature branch
* Never push into `main` or `poc` branch. Make a Pull Request.

## **How to:**
1. Clone this repository
	```
	git clone https://github.com/QAS-Labs/uta-user-interface.git
	```
2. Switch to branch `poc`
	```
	git checkout poc
	```
3. Create a new branch for your feature/work:
	```
	git checkout -b new-branch
	```
4. Install and switch to supported Node Version.
	```
	nvm install
	nvm use
	```
5. Install Dependencies
	```
	npm install
	```
6. Run and make changes
	```
	npm start
	```
7. Lint Code
	```
	npx eslint <file_name>
	or
	npx eslint <directory_name>
	```
8. Format Code
	```
	npx prettier --write <file_name>
	or
	npx prettier --write <directory_name>
	```
9. Test it
	```
	npm test
	```
10. Build
	```
	npm run build
	```
11. Add changes to Git
	```
	git add <file_name>
	or
	git add <directory_name>
	```
12. Commit Changes to Git
	```
	git commit -m ""
	```
13. Push Changes to GitHub
	```
	git push -u origin new-branch
	```
14. Create a Pull Request
15. Pull request will be accepted, merged and close by a reviewer.
