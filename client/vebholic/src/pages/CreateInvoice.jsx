import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateInvoice() {
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState({
        Qty: 0,
        Price: 0,
        DiscountPer: 0,
        Discount: 0,
        TaxPer: 0,
        Tax: 0,
        TotalPrice: 0
    })

    const HandleChange = (e) => {
        let { name, value } = e.target
        let { Qty, Price } = invoice
        if (name === "Qty") {
            if (Price === 0)
                setInvoice({ ...invoice, [name]: Number(value) })
            else {
                let totalprice = value * Price
                setInvoice({ ...invoice, [name]: Number(value), TotalPrice: totalprice })
            }
        } else if (name === "Price") {
            let totalprice
            if (Qty <= 0) {
                totalprice = Number(value)
            } else {
                totalprice = Qty * Number(value)
            }
            setInvoice({ ...invoice, [name]: Number(value), TotalPrice: totalprice })
        }
        else {
            setInvoice({ ...invoice, [name]: Number(value) })
        }
    }

    const UpdateDiscount = (e) => {
        let { name, value } = e.target
        switch (name) {
            case "DiscountPer": {
                let { Qty, Price } = invoice
                let totalprice = Qty * Price
                let discount = (totalprice * Number(value)) / 100
                totalprice -= discount
                setInvoice({ ...invoice, Discount: discount, TotalPrice: totalprice })
                break;
            }
            case "Discount": {
                let { Qty, Price } = invoice
                let totalprice = Qty * Price
                let discountPer = (Number(value) * 100) / totalprice
                totalprice -= value
                setInvoice({ ...invoice, DiscountPer: discountPer, TotalPrice: totalprice })
                break
            }
            case "TaxPer": {
                let { TotalPrice } = invoice
                let tax = (TotalPrice * Number(value)) / 100
                TotalPrice += tax
                setInvoice({ ...invoice, Tax: tax, TotalPrice: TotalPrice })
                break
            }
            case "Tax": {
                let { Qty, Price, Discount } = invoice
                let totalprice = Qty * Price - Discount
                let taxPer = (value * 100) / totalprice
                totalprice = Number(value) + totalprice
                setInvoice({ ...invoice, TaxPer: taxPer, TotalPrice: totalprice })
                break
            }
            default: return invoice
        }
    }

    const createInvoice = (e,invoice)=>{
        axios.post("https://vebholic-assignment.vercel.app/createinvoice",invoice)
        .then((res)=>{navigate("/"),console.log(res.data.data)})
        .catch((err)=>console.log(err.message))
        e.preventDefault();
    }


    return (
        <div>
            <form style={{ display: 'grid', border: "2px solid black", padding: "30px", borderRadius: "10px",backgroundColor:"aquamarine" }}>
                <label>Qty</label>
                <input type='number' name='Qty' onChange={HandleChange} ></input>
                <label>Price</label>
                <input type='number' name='Price' onChange={HandleChange} ></input>
                <label>Discount %</label>
                <input type='Number' name='DiscountPer' onBlur={UpdateDiscount} onChange={HandleChange} value={invoice?.DiscountPer}></input>
                <label>Discount</label>
                <input type='Number' name='Discount' onBlur={UpdateDiscount} onChange={HandleChange} value={invoice?.Discount} ></input>
                <label>Tax %</label>
                <input type='Number' name='TaxPer' onBlur={UpdateDiscount} onChange={HandleChange} value={invoice?.TaxPer} ></input>
                <label>Tax</label>
                <input type='Number' name='Tax' onBlur={UpdateDiscount} onChange={HandleChange} value={invoice?.Tax}></input>
                <label>Total Price</label>
                <input type='Number' name='TotalPrice' onChange={HandleChange} value={invoice?.TotalPrice}></input>
                <button style={{marginTop:"20px"}} onClick={(e)=>{createInvoice(e,invoice)}}>Create</button>
            </form>
        </div>
    )
}