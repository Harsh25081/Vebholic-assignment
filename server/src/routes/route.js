const express = require("express")
const { CreateInvoice, GetInvoice, UpdateInvoice } = require("../invoiceController")
const router = express.Router()

router.post("/createinvoice",CreateInvoice)
router.get("/getallinvoice",GetInvoice)
router.put("/updateinvoice/:id",UpdateInvoice)

router.get("/test-me",function(req,res){
    res.send("This is the test api!!!1")
})

module.exports = router