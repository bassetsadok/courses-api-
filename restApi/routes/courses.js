const express = require("express")
const router = express.Router()

const courses = [
  {
    id: 1,
    name: "course 1",
  },
  {
    id: 2,
    name: "course 2",
  },
]

router.get("/", (req, res) => {
  res.send(courses)
})

//start reading from the right, req.params.id is string, find is loop funct receive a boolean from insider func
//find keep searching if she receive true, so the corse will receive the current value of courses
//else it will be undefiend
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send("The course with the given id is not found")
  res.send(course)
})

router.post("/", (req, res) => {
  //{erreur} is obj distructuring syntax, req.body[value,erreur], using {erreur} we get the erreur
  const { error } = courseValidation(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course)
  //by concention
  res.send(course)
})

router.put("/:id", (req, res) => {
  //lookg for the course
  //if not 404
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send("the course with the given id not found")
  //validate the input
  //if not 400
  const { error } = courseValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //update the course
  //return the validated course
  course.name = req.body.name
  console.log(courses)
  res.send(course)
})

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id))
  if (!course)
    return res.status(404).send("the course with the given id not found")

  const index = courses.indexOf(course)
  courses.splice(index, 1)
  res.send(course)
})

//take req.body test it and return erreur or value
function courseValidation(course) {
  //validate the input
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  })
  return schema.validate(course)
}

module.exports = router
