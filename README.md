# **Task Manager App**

A task manager app has built with React.js for frontend and Nest.js for backend. The app allows users to log in with previously registered credentials in order to create tasks. After log in, users can add, update or remove tasks. The task are stored in Supabase PostgreSQL database. User can get ADMIN role which give more rights to them. User profile also can be updated. Filter option is available for task filtering.

### Demo: [Link]()

### Demo account:

Email: `admin@demo.com`<br>
Password: `1234`

## Features

- Allow user to register, log in and log out
- Login can be done with previosly registered account
- Only logged in users have rights to create, update, remove or check the tasks
- Basic user can update the the own profile and tasks
- Admin rights let to create, update or remove any tasks
- PostgreSQL database used to store data
- Prisma ORM used to retrive data from database
- React.js used for CSR
- Nest.js used for backend
- Bcrypt used to hash the user password
- React Hook form used to create forms
- Zod used for validation
- Zustand used for state management
<!---- Shadcn UI component library use to built beautiful design --->
- Toast notification use to improve UX
- Render-as-you-fetch approach is used for Loading screen
- Hosted on ...
- Responsive design

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal inside frontend and backend folder
3. Set up PostgreSQL database and Google provider config.

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
6. Setup Google auth: [link](https://console.developers.google.com/apis/credentials)
7. Run `npm run start:dev` command in your terminal
8. Server running at `http://localhost:4000/`

9. Navigate to **frontend** folder
10. Run `npm run dev` command in your terminal
11. Server running at `http://localhost:5173/`

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
  - `npx prisma migrate dev` pushs the schema from local to remote database
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
- [Typescript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

### Layout

![layout-1 picture](https://github.com/ev0clu/task-manager/blob/main/layout-1.png?raw=true)<br>
![layout-2 picture](https://github.com/ev0clu/task-manager/blob/main/layout-2.png?raw=true)<br>

```

```
