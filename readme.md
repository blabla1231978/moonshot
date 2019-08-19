# MoonShot Contact Us Service

MoonShot Contact Us Service is a NodeJS app powered by TypeScript for dealing with Customers Messages.
we used [inversify](https://github.com/inversify/InversifyJS) Libary to dealing with inversion of control (IoC) container
### Start Project
```bash
./server.sh
```

###Usage

##List of supported endpoints
- Set New Message (Post Request) [localhost:3000/message/set]()
    Request Body Can Include Any Fields
- Get Messages (Get Request) [localhost:3000/message/get]()
    Request Params
    1. from: Date - the min createdAt date
    2. until: Date - the max createdAt date
    3. website: string - to filter messages come from this website
    4. skip: number - for skip first X Messages
    5. limit: number - for limit count of returned Messages
