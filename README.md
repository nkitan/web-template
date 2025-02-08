<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" height="64" alt="Web Template"></p>
<h3 align="center">Web Template</h3>
<p align="center">Clean Web template using NextJS 15, React 19, AuthJS, ShadCN UI and Postgres</p>
<p align="center">
    <a href="https://github.com/nkitan/api-server-template/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="GNU-AGPL License"></a>
    <a href="https://github.com/nkitan/api-server-template/issues"><img src="https://img.shields.io/badge/contributions-welcome-ff69b4.svg" alt="Contributions Are Welcome"></a>
</p>

## Features

- Functioning Home Page, Dashboard / Auth Pages with Navbar, Hamburger Menu etc
- AuthJS Authentication using Postgres
- Middleware Support
- Role based access control
- Latest Version of NextJS, ReactJS and AuthJS
- Built using ShadCN UI 

A list of upcoming / in-progress features can be found in the [TODO.md](TODO.md) file

## Usage

Setting up web-template is as easy as configuring .env, running migrations and running pnpm run on the cloned directory
```sh
$ git clone https://github.com/nkitan/web-template
$ cd web-template
$ pnpx prisma migrate dev
$ pnpm run dev
```

## Maintainers

* [Ankit Das](https://github.com/nkitan)

## License

This project is licensed under the GNU AGPLv3 License - see the [LICENSE.md](LICENSE.md) file for details.