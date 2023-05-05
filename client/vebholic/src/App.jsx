import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    AllData: [],
    edit: false,
    EditInvoiceData: {
      Qty: 0,
      Price: 0,
      DiscountPer: 0,
      Discount: 0,
      TaxPer: 0,
      Tax: 0,
      TotalPrice: 0
    }
  })

  useEffect(() => {
    axios.get("https://vebholic-assignment.vercel.app/getallinvoice")
      .then((res) => { console.log(res.data.data); setData({ ...data, AllData: res.data.data }) })
      .catch((err) => console.log(err))
  }, [])

  const CreateInvoiceClick = () => {
    navigate("/createinvoice")
  }

  console.log(data)

  const handleChange = ({ target: { name, value } }) => {
    let { Qty, Price } = data.EditInvoiceData
    if (name === "Qty") {
      if (Price === 0)
        setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, [name]: Number(value) } })
      else {
        let {DiscountPer, TaxPer} = data.EditInvoiceData
        let totalprice = value * Price
        let discount = (totalprice * DiscountPer) / 100
        totalprice -= discount
        let tax = (totalprice * TaxPer) / 100
        totalprice +=tax
        setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, [name]: Number(value), TotalPrice: totalprice ,Discount : discount ,Tax:tax } })
      }
    } else if (name === "Price") {
      let {DiscountPer, TaxPer} = data.EditInvoiceData
      let totalprice ,discount , tax
      if (Qty <= 0) {
        totalprice = Number(value)
      } else {
        totalprice = Qty * Number(value)
        discount = (totalprice * DiscountPer) / 100
        totalprice -= discount
        tax = (totalprice * TaxPer) / 100
        totalprice +=tax
      }
      setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, [name]: Number(value), TotalPrice: totalprice , Discount :discount , Tax : tax } })
    }
    else {
      setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, [name]: value } })
    }
  }

  const updateInvoice = (data) => {
    setData({ ...data, edit: false })
    console.log(data.EditInvoiceData)
    let { _id, Qty, Price, DiscountPer, Discount, TaxPer, Tax, TotalPrice } = data.EditInvoiceData
    let id = _id
    axios.put(`https://vebholic-assignment.vercel.app/updateinvoice/${id}`, { Qty, Price, DiscountPer, Discount, TaxPer, Tax, TotalPrice })
      .then((res) => { console.log(res); window.location.reload() })
      .catch((err) => console.log(err))
  }

  const UpdateDiscount = (e) => {
    let { name, value } = e.target
    switch (name) {
      case "DiscountPer": {
        let { Qty, Price } = data.EditInvoiceData
        let totalprice = Qty * Price
        let discount = (totalprice * Number(value)) / 100
        totalprice -= discount
        setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, Discount: discount, TotalPrice: totalprice } })
        break;
      }
      case "Discount": {
        let { Qty, Price } = data.EditInvoiceData
        let totalprice = Qty * Price
        let discountPer = (Number(value) * 100) / totalprice
        totalprice -= value
        setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, DiscountPer: discountPer, TotalPrice: totalprice } })
        break
      }
      case "TaxPer": {
        let { TotalPrice } = data.EditInvoiceData
        let tax = (TotalPrice * Number(value)) / 100
        TotalPrice += tax
        setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, Tax: tax, TotalPrice: TotalPrice } })
        break
      }
      case "Tax": {
        let { Qty, Price, Discount } = data.EditInvoiceData
        let totalprice = Qty * Price - Discount
        let taxPer = (value * 100) / totalprice
        totalprice = Number(value) + totalprice
        setData({ ...data, EditInvoiceData: { ...data.EditInvoiceData, TaxPer: taxPer, TotalPrice: totalprice } })
        break
      }
      default: return invoice
    }
  }

  return (
    <div id='outer' >
      <div className='everyinvoice' id='addbtn' onClick={() => CreateInvoiceClick()} >+</div>
      {data.AllData?.map((invoice, index) => {
        let { _id, Qty, Price, DiscountPer, Discount, TaxPer, Tax, TotalPrice } = invoice
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return (
          <div key={index} className='everyinvoice' style={{ backgroundColor: "#" + randomColor }}>
            <div style={{ display: "flex" }}>
              <div>
                <p>Qty </p>
                <p>Price </p>
                <p>DiscountPer </p>
                <p>Discount </p>
                <p>TaxPer </p>
                <p>Tax </p>
                <p>TotalPrice </p>
              </div>
              <div>
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="Qty" defaultValue={Qty} type="Number" onChange={handleChange} /></p> : <p>: {Qty}</p>}
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="Price" defaultValue={Price} type="Number" onChange={handleChange} /></p> : <p>: {Price}</p>}
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="DiscountPer" defaultValue={DiscountPer} type="Number" onBlur={UpdateDiscount} onChange={handleChange} /></p> : <p>: {DiscountPer}</p>}
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="Discount" defaultValue={Discount} type="Number" onBlur={UpdateDiscount} onChange={handleChange} /></p> : <p>: {Discount}</p>}
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="TaxPer" defaultValue={TaxPer} type="Number" onBlur={UpdateDiscount} onChange={handleChange} /></p> : <p>: {TaxPer}</p>}
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="Tax" defaultValue={Tax} type="Number" onBlur={UpdateDiscount} onChange={handleChange} /></p> : <p>: {Tax}</p>}
                {data.edit && data.EditInvoiceData._id == _id ? <p className='editP'><input name="TotalPrice" defaultValue={TotalPrice} type="Number" onChange={handleChange} /></p> : <p>: {TotalPrice}</p>}
               
              </div>
            </div>

            {data.edit && data.EditInvoiceData._id == _id ?
              <button onClick={() => updateInvoice(data)}>Save</button> :
              <button onClick={() => setData({ ...data, EditInvoiceData: invoice, edit: true })}>Edit</button>}
          </div>
        )
      })}
    </div>
  )
}

export default App