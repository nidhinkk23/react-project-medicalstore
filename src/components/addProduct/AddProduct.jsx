import React, { useState } from 'react'
import Axios from 'axios'
import CustomizedSnackbars from './SnackBar'
export default function AddProduct(props) {

    let addPdtState = {
        pName: "",
        company: "",
        price: "",
        quantity: "",
        pImage: ""

    }
    let valPrdctData = {
        valN: false,
        errorN: ""
    }
    let valcompanyData = {
        valB: false,
        errorB: ""
    }
    let valPriceData = {
        valP: false,
        errorP: ""
    }
    let valpImageData = {
        valI: false,
        errorI: ""
    }
    let valQtyData = {
        valQ: false,
        errorQ: ""
    }


    //state
  const [open, setOpen] = React.useState(false);

    const [state, setstate] = useState(addPdtState)

    const [valPrdct, setValPrdct] = useState(valPrdctData)
    const [valcompany, setvalcompany] = useState(valcompanyData)
    const [valPrice, setValPrice] = useState(valPriceData)
    const [valQuantity, setValQuantity] = useState(valQtyData)
    const [valpImage, setValpImage] = useState(valpImageData)

    //call at onChange evet
    let handleChange = (event) => {
        const value = event.target.value
        console.log(value);
        setstate({
            ...state,
            [event.target.name]: value

        })
        console.log("state: ", state);
    }
    const { pName, company, price, quantity, pImage } = state
    //onKeyUp Validation
    let keyUpVal = (event) => {
        if (event.target.name === 'pName') {
            if (!pName.trim().match(/^[a-z A-Z]+$/)) {

                setValPrdct(
                    {
                        ...valPrdct,
                        valN: true,
                        errorN: "product name should not be  number "
                    })
            } else if (pName.trim().length > 20) {

                setValPrdct(
                    {
                        ...valPrdct,
                        valN: true,
                        errorN: "product name should less than 20 "
                    })
            } else {
                setValPrdct({
                    ...valPrdct,
                    valN: false
                })
            }
        }
        if (event.target.name === 'company') {
            if (!company.trim().match(/^[a-zA-Z]+$/)) {
                setvalcompany({
                    valB: true,
                    errorB: "company name should not be number  "
                })
            }
            else if (company.trim().length > 20) {
                setvalcompany({
                    valB: true,
                    errorB: "company name should less than 20 "
                })
            } else {
                setvalcompany({
                    ...valcompany,
                    valB: false
                })
            }
        }
        if (event.target.name === 'price') {
            if (!price.trim().match(/^[0-9]+$/)) {
                setValPrice({
                    valP: true,
                    errorP: "price should be number "
                })
            } else {
                setValPrice({
                    ...valPrice,
                    valP: false
                })
            }
        }
        if (event.target.name === 'quantity') {
            if (!quantity.trim().match(/^[0-9]+$/)) {
                setValQuantity({
                    valQ: true,
                    errorQ: "Quantity should be number"
                })
            }
            else {
                setValQuantity({
                    ...valQuantity,
                    valQ: false
                })
            }
        }
        if (event.target.name === 'pImage') {
            if (pImage.trim().length > 30) {
                setValpImage({

                    valI: false,
                    errorI: "not more than 30 character "
                })
            } else {
                setValpImage({
                    ...valpImage,
                    valI: false
                })
            }
        }


    }




    //validation
    let validation = (event) => {
        event.preventDefault()
        
        if (pName.trim().length < 2 || !pName.trim().match(/^[a-zA-Z]+$/) || company.trim().length === 0 || price.trim().length === 0 || quantity.trim().length === 0 || pImage.trim().length < 3) {
            console.log("validation failed");
            if (!pName.trim().match(/^[a-z A-Z]+$/) || pName.trim().length < 2) {

                if (!pName.trim().match(/^[a-z A-Z]+$/)) {

                    setValPrdct(
                        {
                            ...valPrdct,
                            valN: true,
                            errorN: "product name should not be  number "
                        })
                }
                else if (pName.trim().length < 2 || pName.trim().length > 20) {
                    console.log();

                    setValPrdct({
                        ...valPrdct,
                        valN: true,
                        errorN: "product name should grater than 1 and less than 20"
                    })

                } else {
                    setValPrdct({
                        ...valPrdct,
                        valN: false
                    })
                }
            }
            if (company.trim().length === 0 || !company.trim().match(/^[a-zA-Z]+$/) || company.trim().length > 20) {
                if (company.trim().length === 0 || company.trim().length > 20) {
                    setvalcompany({
                        valB: true,
                        errorB: "company name should not be empty and less than 20 "
                    })
                }
                else if (!company.trim().match(/^[a-zA-Z]+$/)) {
                    setvalcompany({
                        valB: true,
                        errorB: "company name should not be number "
                    })
                }
            } else {
                setvalcompany({
                    ...valcompany,
                    valB: false
                })
            }
            if (price.trim().length === 0 || price.trim().match(/^[a-zA-Z]+$/) || price.trim().length > 20) {
                if (price.trim().length === 0 || price.trim().length > 20) {
                    setValPrice({
                        valP: true,
                        errorP: "price should not be empty"
                    })
                }
                else if (price.trim().match(/^[a-zA-Z]+$/)) {
                    setValPrice({
                        valP: true,
                        errorP: "price should be number "
                    })
                }
            }
            else {
                setValPrice({
                    ...valPrice,
                    valP: false
                })
            }
            if (quantity.trim().length === 0 || quantity.trim().match(/^[a-zA-Z]+$/) || quantity.trim().length < 4) {
                if (quantity.trim().length === 0) {
                    setValQuantity({
                        valQ: true,
                        errorQ: "Quantity should not be empty"
                    })
                } else if (quantity.trim().match(/^[a-zA-Z]+$/)) {
                    setValQuantity({
                        valQ: true,
                        errorQ: "Quantity should be number"
                    })
                }
            }
            else {
                setValQuantity({
                    ...valQuantity,
                    valQ: false
                })
            }
            if (pImage.trim().length === 0) {
                setValpImage({
                    valI: true,
                    errorI: "Please add pImage url"
                })

            } else {
                setValpImage({
                    ...valpImage,
                    valI: false
                })
            }




        } else {
            setOpen(true)
            saveData()
        }
    }






    //call in validation if validated
    let saveData = (event) => {

        const formData = state
        console.log("formData: ", formData);
        const url = "http://localhost:8080/addproduct"
        // const url = "https://react-shopping-cart-fa82c.firebaseio.com/addproduct.json"

        let axiosAddProduct = async () => {
            try {
                let response = await Axios.post(url, formData)
                console.log("response ", response);
                const status = response.status
                console.log("status :", status);
                if (status === 200) {
                    
                    console.log("Successfully Added");
                    
                    props.history.push("/showproduct")

                } else {
                    console.log("Failed to Add");

                }
            } catch (error) {
                console.log(error);

            }


        }
        axiosAddProduct()




    }


    const style = {
        color: 'red',
        fontSize: '15px'
    }

    return (
        <>
            <form onSubmit={validation} className="card mt-4 container col-md-6 colsm-4">
                <div className="form-group mt-3">
                    <h1>Add Product</h1>
                    <label for="">Product Name:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.pName}
                        onChange={handleChange}
                        className="form-control" name="pName" id="" aria-describedby="helpId" placeholder="" />
                    {valPrdct.valN ? <small style={style} id="helpId" className="form-text">{valPrdct.errorN}</small> : null}
                </div>
                <div className="form-group">
                    <label for="">company:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.company}
                        onChange={handleChange}
                        className="form-control" name="company" id="" aria-describedby="helpId" placeholder="" />
                    {valcompany.valB ? <small id="helpId" style={style} className="form-text">{valcompany.errorB}</small> : null}

                </div>
                <div class="form-group">
                    <label for="">Price:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.price}
                        onChange={handleChange}
                        className="form-control" name="price" id="" aria-describedby="helpId" placeholder="" />
                    {valPrice.valP ? <small id="helpId" style={style} className="form-text">{valPrice.errorP}</small> : null}
                </div>
                <div class="form-group">
                    <label for="">Quantity:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.quantity}
                        onChange={handleChange}
                        className="form-control" name="quantity" id="" aria-describedby="helpId" placeholder="" />
                    {valQuantity.valQ ? <small id="helpId" style={style} className="form-text ">{valQuantity.errorQ}</small> : null}
                </div>
                <div className="form-group">
                    <label for="">pImage url:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.pImage}
                        onChange={handleChange}
                        className="form-control" name="pImage" id="" aria-describedby="helpId" placeholder="" />
                    {valpImage.valI ? <small id="helpId" style={style} className="form-text">{valpImage.errorI}</small> : null}

                    <button name="" id="" className="btn btn-primary mt-1"  >AddProduct</button>

                </div>

            </form>
            <CustomizedSnackbars open = {open}/>

        </>
    )
}
