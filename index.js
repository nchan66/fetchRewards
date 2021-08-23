const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

const data = [];
let points = 0;
let spend_stack = [];
let balance = {};

app.use(bodyParser.urlencoded({ extended: true }));

// Suppose you call your add transaction route with the following sequence of calls:
app.post("/api/addTransaction", (req, res) => {
  try {
    let log = {
      payer: req.body.payer.toUpperCase(),
      points: parseInt(req.body.points),
      timestamp: req.body.timestamp,
    };
    data.push(log);
  } catch (err) {
    console.err();
  }
  //   console.log(data);
  res.send(data);
});

// Then you call your spend points route with the following request:
app.post("/api/put", (req, res) => {
  data.sort(function (x, y) {
    return new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime();
  });
  //   console.log(data);

  let idx = 0;
  let output = [];
  try {
    points = req.body.points;
    while (points > 0) {
      let v1 = data[idx]["points"];

      // edge case to check if the balance is < 0

      points = points - v1;
      let v2 = points > 0 ? v1 * -1 : (points + v1) * -1;
      let spent = { payer: `${data[idx]["payer"]}`, points: v2 };
      spend_stack.push(spent);
      // console.log(spent, points);
      idx += 1;
    }

    // The expected response from the spend call would be:
    // merge objects with same payer and calculate points spent
    spend_stack.forEach(function (item) {
      let existing = output.filter(function (v, i) {
        return v.payer == item.payer;
      });
      if (existing.length) {
        let existing_idx = output.indexOf(existing[0]);
        output[existing_idx]["points"] += item.points;
      } else {
        output.push({ payer: item.payer, points: item.points });
      }
    });
    spend_stack = output;
  } catch (err) {
    console.err();
  }
  //   console.log(spend_stack);
  res.send(output);
});

// A subsequent call to the points balance route, after the spend, should returns the following results:
app.get("/api/balance", (req, res) => {
  // calculates balance of each payer
  data.forEach(function (val) {
    if (!(val.payer in balance)) {
      balance[val.payer] = val.points;
    } else {
      balance[val.payer] += val.points;
    }
  });
  console.log(balance);
  // subtracts the balance with amount spent
  spend_stack.forEach(function (p_spent) {
    balance[p_spent.payer] = balance[p_spent.payer] + p_spent.points;
  });
  //   console.log(balance);

  res.send(balance);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
