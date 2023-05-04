const mongoose = require("mongoose")

const InvoiceSchema = mongoose.Schema({
    Qty : {type:Number,required:true},
    Price : {type:Number,required:true},
    DiscountPer : {type:Number,required:true},
    Discount : {type:Number,required:true},
    TaxPer : {type:Number,required:true},
    Tax : {type:Number,required:true},
    TotalPrice : {type:Number,required:true},
},{timestamps:true})

module.exports = mongoose.model("invoice",InvoiceSchema)