const fetch = require("node-fetch");
module.exports = async function (token, title, body) {
  let response = fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: String(token),
      sound: "default",
      title: String(title),
      body: String(body),
    }),
  });
};
