const express = require("express")
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const app = express()

var config = {
  "clientId": "your client id",
  "clientSecret": "your client secret",
  "redirectUri": "http://yourdomain.com/authorize"
}

app.get("/", (request, response) => {
  response.send("login with discord: <a href="YOUROAUTH2URL">login</a>")
})

app.get("/authorize", (request, response) => {
  var code = request.query["code"]
  var params = new URLSearchParams()
  params.append("client_id", config["clientId"])
  params.append("client_secret", config["clientSecret"])
  params.append("grant_type", "authorization_code")
  params.append("code", code)
  params.append("redirect_uri", config["redirectUri"])
  fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    body: params
  })
  .then(res => res.json())
  .then(json => {
    response.send("logged in")
  })
})

app.listen(80, () => {
  console.log("Listening on :80")
})
