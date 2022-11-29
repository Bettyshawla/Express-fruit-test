const express = require("express")
const router = express.Router()
const Fruit = require("../models/fruits")


// I.N.D.U.C.E.S
// Index, New, Delete, Update, Create, Edit, Show

// SEED
router.get("/seed", (req, res)=>{
  Fruit.create([
      {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
  ], (err, data)=>{
      res.redirect('/fruits');
  })
});

//INDEX
router.get("/", (req, res) => {
  // Query model to return all fruits
  Fruit.find({}, (error, allFruits) => {
    if (!error) {
      res.status(200).render("fruits/Index", {
        fruits: allFruits
      })
    } else {
      res.status(400).send(error)
    }
  })
})

//NEW
router.get("/new", (req, res) => {
  res.render("fruits/New")
})

//DELETE
router.delete("/:id", (req, res) => {
  Fruit.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/fruits")
  })
})

//UPDATE
router.put("/:id", (req, res) => {
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
    if(!err){
      res.status(200).redirect(`/fruits/${req.params.id}`)
    } else {
      res.status(400).send(err)
    }
  })
})

// CREATE
router.post("/", (req, res) => {
  if (req.body.readyToEat === "on"){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  // This does the same thing as the if statement above but with a one line ternary
  //req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

    // Create 1st arg: the actual object we want to insert inside our database
    // Callback 1st arg: error
    // Callback 2nd arg: the newly created object
Fruit.create(req.body, (error, createdFruit) => {
    if (!error) {
      // redirects after creating fruit, to the Index page
      res.status(200).redirect("/fruits")
    } else {
      res.status(400).send(error)
    }
  })
})

// EDIT
router.get("/:id/edit", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    if (!err) {
      res.status(200).render("fruits/Edit", {fruit: foundFruit})
    } else {
      res.status(400).send({ msg: err.message })
    }
  })
})



//SHOW
router.get("/:id", (req, res) => {
    // findById 1st arg: the id of the fruit we want to find 
    // Callback 1st arg: error
    // Callback 2nd arg: the found fruit object
  Fruit.findById(req.params.id, (error, foundFruit) => {
    if (!error) {
      res
        .status(200)
        .render("fruits/Show", {
          fruit: foundFruit
        })
    } else {
      res
        .status(400)
        .send(error)
    }
  })
})

module.exports = router