# **Task Manager App**

A trello clone task manager app has built with React.js for frontend and Nest.js for backend. The app allows users to log in with previously registered credentials in order to create and manage tasks. After log in, users can add, update or remove workspaces and tasks. The task are stored in PostgreSQL database which provided by Neon.tech. User profile also can be updated.

### Demo: [Link]()

### Demo account:

Email: `test@demo.com`<br>
Password: `123`

## Features

- Allow user to register, log in and log out
- Login can be done with previosly registered account
- Only logged in users have rights to create, update, remove or check the tasks
- User can update his/her own profile and tasks
- PostgreSQL database used to store data
- Prisma ORM used to retrive data from database
- React.js used for CSR
- Nest.js used for backend
- Bcrypt used to hash the user password
- React Hook form used to create forms
- Zod used for validation
- Material UI used for styling
- Toast notification use to improve UX
- TanStack query use to get data from backend and cache them
- Responsive design
- Turborepo used for monorepo

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal inside the root folder
3. Set up PostgreSQL database with docker or with an online database.
4. Navigate to **backend** folder and create .env file and add enviromental variables:
   open ssl key should generate to JWT_SECRET<br>

```
PORT=4000
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
REFRESH_JWT_SECRET=
```

5. Run `npx prisma generate`
6. Navigate to **frontend** folder and create .env file and add environmental variables:

```
VITE_FRONTEND_ADDR=http://localhost:5173
VITE_BACKEND_ADDR=http://localhost:4000
VITE_API_LOGIN=${VITE_BACKEND_ADDR}/api/auth/login
VITE_API_LOGOUT=${VITE_BACKEND_ADDR}/api/auth/logout
VITE_API_REGISTER=${VITE_BACKEND_ADDR}/api/auth/register
VITE_API_JWT_REFRESH=${VITE_BACKEND_ADDR}/api/auth/refresh
VITE_API_WORKSPACES=${VITE_BACKEND_ADDR}/api/workspaces
VITE_API_BOARDS=${VITE_BACKEND_ADDR}/api/boards
VITE_API_LISTS=${VITE_BACKEND_ADDR}/api/lists
VITE_API_CARDS=${VITE_BACKEND_ADDR}/api/cards
VITE_API_USER=${VITE_BACKEND_ADDR}/api/user
```

6. Navigat to **root** folder and run `npm run dev` command in your terminal
7. Backend server running at `http://localhost:4000/`
8. Frontend server running at `http://localhost:5173/`

### Useful links and informations

- Open SSL key generation:
  - You can use the following link to create open ssl key: `https://www.cryptool.org/en/cto/openssl` or you can install open ssl and generate key from terminal. To generate code you should run: `openssl rand -base64 32`
- React Hook Form usage with UI component needs to has `ref={null}` property to avoid ref warning:
  - [Stackoverflow](https://stackoverflow.com/questions/67877887/react-hook-form-v7-function-components-cannot-be-given-refs-attempts-to-access)
  - [GitHub](https://github.com/react-hook-form/react-hook-form/issues/3411)
- Loading screen approaches (Fetch-than-render, Render-as-you-fetch, Suspense, ):
  - [Medium.com](https://medium.com/jspoint/introduction-to-react-v18-suspense-and-render-as-you-fetch-approach-1b259551a4c0)
  - [Linkedin.com](https://www.linkedin.com/pulse/fetch-then-render-render-as-you-fetch-fetch-on-render-amit-pal/)
- Validation decorators:
  - [GitHub](https://github.com/typestack/class-validator#validation-decorators)
- Prisma
  - `npx prisma migrate dev --create-only` creates new migration and delete the remote database
  - `npx prisma migrate dev` sync remote database with schema
  - `npx prisma db push` push the schema from local to remote database
- JSON Web Token options:
  - [GitHub](https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#token-expiration-exp-claim)
- CORS configuration options:
  - [GitHub](https://github.com/expressjs/cors#configuration-options)

### Dependencies

- [React](https://react.dev/)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [React Router DOM](https://www.npmjs.com/package/react-router-dom)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
- [Zod](https://zod.dev/)
- [date-fns](https://date-fns.org/)
- [TanStack Query](https://tanstack.com/)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Passport](https://www.passportjs.org/)
- [Turborepo](https://turbo.build/repo)

### Layout

![layout-1 picture](https://github.com/ev0clu/task-manager/blob/main/layout-1.png?raw=true)<br>
![layout-2 picture](https://github.com/ev0clu/task-manager/blob/main/layout-2.png?raw=true)<br>

```

```
