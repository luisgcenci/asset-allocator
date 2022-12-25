# Project Name

Project Description

# Folder Structure

```
server
├── coverage
├── documentation
├── src
│	├── customer
│	│	│── dto
│	│	├── customer.entity.ts
│	│	├── customer.module.ts
│	│	├── customer.repository.ts
│	│	├── customer.resolver.spec.ts
│	│	├── customer.resolver.ts
│	│	├── customer.service.spec.ts
│	│	├── customer.service.ts
│	│	└── main.tsx
│	├── app.module.ts
│	└── main.ts
└── test
```

`coverage/` - Test Coverage. \
`src/` - All Resources. \
`src/allocation` - Everything related to allocation module. \
`src/customer` - Everything related to a module. \
`src/app.module.ts` - Application Main Module. \
`src/main.ts` - Entry Point of Application. \
`test` - e2e Tests.

# Main Technologies

- TypeScript `^4.7.4`
- GraphQL `^16.6.0`
- NestJS - `^9.0.0`
- Node.js - `16.17.0 LTS`
- NPM - `8.15.0`
- Postgre - `^8.8.0`

# Code Analysis & Style

## **Tools**: 

> Use Prettier prior to linting your code, and **not** vice-versa.
> Run from root folder.

- Prettier
	```
	npm run prettier
	```

- ESLint
	```
	npm run lint
	```


# Contributing

## **Important Rules:**
* Perform work in a feature branch
* Never push into `main` or `poc` branch. Make a Pull Request.

## **How to:**
1. Clone this repository
	```
	git clone https://github.com/QAS-Labs/uta-user-interface.git
	```
2. Switch to branch `main`
	```
	git checkout main
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
6. Run in dev mode and make changes
	```bash
	# development
	npm run start

	# watch mode
	npm run start:dev

	# production mode
	npm run start:prod
	```
7. Format Code
	```
	npm run format
	```
8. Lint Code
	```
	npm run lint
	```
9. Test it
	```bash
	# unit tests
	npm run test

	# e2e tests
	npm run test:e2e
	```
10. Run Test Coverage and make sure is > 85%
	```
	npm run test:cov
	```
11. Generate documentation and make sure documentation coverage is > 85%
	```
	npx @compodoc/compodoc -p tsconfig.json -s
	```
12. Build
	```
	npm run build
	```
13. Add changes to Git
	```
	git add <file_name>
	or
	git add <directory_name>
	```
14. Commit Changes to Git
	```
	git commit -m ""
	```
15. Push Changes to GitHub
	```
	git push -u origin new-branch
	```
16. Create a Pull Request
17. Pull request will be accepted, merged and closed by a reviewer.
