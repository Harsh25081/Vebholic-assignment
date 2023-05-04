const invoiceModel = require("./invoiceModel")

exports.CreateInvoice = async (req,res)=>{
    try {
        let data = req.body
        let {Qty,Price,DiscountPer,Discount,TaxPer,Tax,TotalPrice}=data
        if(!Qty)return res.status(400).send({status:false,message:"Pls provide Qty"})      
        if(!Price)return res.status(400).send({status:false,message:"Pls provide Price"})
        if(!DiscountPer)return res.status(400).send({status:false,message:"Pls provide DiscountPer"})
        if(!Discount)return res.status(400).send({status:false,message:"Pls provide Discount"})
        if(!TaxPer)return res.status(400).send({status:false,message:"Pls provide TaxPer"})
        if(!Tax)return res.status(400).send({status:false,message:"Pls provide Tax"})
        if(!TotalPrice)return res.status(400).send({status:false,message:"Pls provide TotalPrice"})
        let CreateInvoice = await invoiceModel.create(data)
        return res.status(201).send({status:true,data:CreateInvoice})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.GetInvoice = async (req,res)=>{
    try {
        const GetInvoice = await invoiceModel.find()
        res.status(200).send({status:true,data:GetInvoice})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}

exports.UpdateInvoice = async (req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const UpdateInvoice = await invoiceModel.findByIdAndUpdate(id,{$set:data},{new:true})
        return res.status(200).send({status:true,data:UpdateInvoice})
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
}