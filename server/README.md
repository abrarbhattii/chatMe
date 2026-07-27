CHATME/ 
├── server/ 
│ ├── src/ 
│ │ ├── bootstrap/ 
│ │ │ ├── createApplication.js 
│ │ ├── config/ 
│ │ │ ├── database.js 
│ │ │ ├── env.js 
│ │ ├── db/ 
│ │ │ └── schema.sql 
│ │ ├── features/ 
│ │ │ ├── auth/ 
│ │ │ ├── chat/ 
│ │ │ │ ├── websocket/ 
│ │ │ │ │ ├── handlers/ 
│ │ │ │ │ │ ├── chatMessageHandler.js 
│ │ │ │ │ │ ├── joinRoomHandler.js 
│ │ │ │ │ │ ├── typingHandler.js 
│ │ │ │ │ └── messageHandlers.js 
│ │ │ │ ├── controller.js 
│ │ │ │ ├── index.js 
│ │ │ │ ├── repository.js 
│ │ │ │ ├── routes.js 
│ │ │ │ └── service.js 
│ │ │ ├── healh/ 
│ │ │ │ └── health.routes.js 
│ │ │ └── users/ 
│ │ ├── gateways/ 
│ │ │ └── chatGateway.js 
│ │ ├── middleware/ 
│ │ │ └── errorHandler.js 
│ │ ├── models/ 
│ │ ├── shared/ 
│ │ │ └── errors/ 
│ │ │   ├── AppError.js 
│ │ │   ├── NotFoundError.js 
│ │ │   └── ValidationError.js 
│ │ ├── logger/ 
│ │ ├── utils/ 
│ │ ├── websocket/ 
│ │ │ ├── connectionHandler.js 
│ │ │ └── messageRouter.js 
│ │ └── server.js 
│ ├── tests/ 
│ ├── .env 
│ ├── .gitignore 
│ ├── package-lock.json 
│ ├── package.json 
│ └── README.md