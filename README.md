# Nuxt 3  Finance Transaction Dashaboard

This repository contains the code for a project built with Nuxt3, Prisma, Apollo, and Docker. It is intended to provide a full stack solution for developers to quickly and easily create modern web applications. This is was part of an assignment to get a sample transactions page up and running. This is still considered suitable only for local development and not ready for production in it's current state. We will try to get the application up using 2 commands. But first install the pre-requisites below.

This was a bit of a challenge as i've never used prisma before and had to get acquainted with the ORM. Also with apollo server and graphql those were some technologies that i wouldn't say i'm an expert at by any means so i had to spend a good deal of research on how to work then both together.

Since i had to spend much time on research, i decided to use tailwind to speed up the front development process. Anyway tailwind is a try and tested ui library and is perfect for highly reactive project or if one needs to create a project and have it ready to be released in a short amount of time.

## Prerequisites

In order to use this repository, you will need to have the following installed:

* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)

## Getting Started

1. Clone the repository and rename.env.example to .env; the .env file example has an already exisiting sample locla environment variables set up and to speed up getting the application up and running, just rename it to .env. Of course one can go through the code and see where which variable is being used and changed to the desired value if one wants.

```
$ git clone git@github.com:itskush/finance_transaction.git
$ rename .env.example to .env
```

2. Command to initialize packages and docker, run the command below firstly. Assuming you have installed node and npm and docker this will install the npm packages, and then it will set up a docket container with postgres. Leave that terminal running as we will need it for the second part.

```
$ npm run setdev
```

3. Migrate db, see data and start nuxt; run the command below secondly. this will sync the db schema with docker postgres and then seed it with the data found in prisma/data folder. After which if everything ran correctly nuxt will start.

```
$ npm run intidev
```

4. Access your application on http://localhost:8000

## Todos

* Add tests (jest)
* Add option to add transaction
* Add option to edit transaction
* Add option to add category
* Add filter for the data (code commented out for now as there was some bug issue coming up)

```
