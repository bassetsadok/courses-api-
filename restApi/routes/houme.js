const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  //use render to return a file or module of index.pug, we refer to it upper, we send the value of html property that need to appear
  res.render("index", {
    title: "my express app",
    message: "Hello in the Main page ^-^",
  })
})

module.exports = router
