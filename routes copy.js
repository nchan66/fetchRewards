// Suppose you call your add transaction route with the following sequence of calls:
module.exports = (app) => {
  app.get("/api/add/transaction", (req, res) => {});

  // Then you call your spend points route with the following request:
  app.get("/api/send/points", (req, res) => {});

  // The expected response from the spend call would be:
  app.post("/api/send/points", (req, res) => {});

  // A subsequent call to the points balance route, after the spend, should returns the following results:
  app.get("/api/balance/points", (req, res) => {});
};
