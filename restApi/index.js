const starterDebugger = require("debug")("app:startup")
const helmet = require("helmet")
const morgan = require("morgan")
//joi for input validation
const Joi = require("joi")
const logger = require("./middleware/logger")
const express = require("express")
const config = require("config")
const app = express()
const courses = require("./routes/courses")
const home = require("./routes/houme")
//instead of require pug we set it
app.set("view engine", "pug")
//it's by default he the source folder for views is views
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(helmet())

app.use("/api/courses", courses)
app.use("/", home)

console.log(`application name  ${config.get("name")}`)
console.log(`mail host  ${config.get("mail.host")}`)
console.log(`mail password  ${config.get("mail.password")}`)

if (app.get("env") === "development") {
  app.use(morgan("tiny"))
  starterDebugger("morgan enabled ...")
}

app.use(logger)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})
