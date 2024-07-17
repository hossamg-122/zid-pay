# zid-pay

This template should help get you started developing with Vue 3 in Vite.

## Project Overview

Zid Pay is a web application that allows users to sign up, manage their accounts, and add payment methods. The app is designed to match the look and feel of the Zid company website.

### Key Features

- User Signup: Users can sign up with their name, date of birth, email, and gender.
- User Authentication: Firebase is used for user data storage and authentication.
- Account Management: After logging in, users can view and update their account details.
- Payment Methods: Users can add and validate credit cards using Stripe and vue-stripe. Validated cards are stored in Firebase and listed on the payment page.
- State Management: Pinia is used to manage user data and tokens.
- Route Protection: Authenticated routes ensure that only logged-in users can access certain pages.
- API Integration: Axios and Axios interceptors are used for API requests.
- UI Design: Atomic design principles are applied to build reusable UI components.
- Form Validation: Vuelidate is used for form validation.
- Styling: TailwindCSS is used for styling, matching the company's website design.

### Screenshots

#### Signup Page

![Signup Page](./screenshots/Screenshot%202024-07-17%20at%201.52.57 PM.png)
![Signup Page](./screenshots/Screenshot%202024-07-17%20at%201.53.01 PM.png)

### Screenshots

#### Login Page

![Login Page](./screenshots/Screenshot%202024-07-17%20at%201.52.50 PM.png)
![Login Page](./screenshots/Screenshot%202024-07-17%20at%201.52.54 PM.png)

#### Account Page

![Account Page](./screenshots/Screenshot%202024-07-17%20at%201.53.12 PM.png)
![Account Page](./screenshots/Screenshot%202024-07-17%20at%201.53.16 PM.png)

#### Payment Page

![Payment Page](./screenshots/Screenshot%202024-07-17%20at%201.53.20 PM.png)
![Payment Page](./screenshots/Screenshot%202024-07-17%20at%201.53.25 PM.png)
![Payment Page](./screenshots/Screenshot%202024-07-17%20at%201.53.46 PM.png)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
