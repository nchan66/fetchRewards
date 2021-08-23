# fetchRewards

to run the server, in the terminal execute:
node server.js

open another terminal to get responses from endpoints

example requests to test routes:

// add transaction
	$ curl -d "payer=dannon&points=1000&timestamp=2020-11-02T14:00:00Z" -X POST http://localhost:3000/api/addTransaction
	$ curl -d "payer=unilever&points=200&timestamp=2020-10-31T11:00:00Z" -X POST http://localhost:3000/api/addTransaction
	$ curl -d "payer=dannon&points=-200&timestamp=2020-10-31T15:00:00Z" -X POST http://localhost:3000/api/addTransaction

// number of points to spend
	$ curl -d "points=5000" -X POST http://localhost:3000/api/spend

// get balance available
	$ curl http://localhost:3000/api/balance
