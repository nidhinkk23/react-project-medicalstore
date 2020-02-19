import React, { Component } from 'react'
import Axios from 'axios'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import MaterialTableDemo from '../productDetails/ProductMaterial'
import CustomizedTables from '../productDetails/ProductUi'

export default class View extends Component {

    state = {
        account: [],
        show: false,


    }
    componentDidMount() {
        this.getAllAccount()
    }
    getAllAccount = () => {
        console.log("url");

        const url = "http://localhost:8080/showproducts"

        Axios.get(url).then(response => {
            console.log("Response", response.data.products);

            let newData = response.data.products
            let arr = []
            for (const iterator of newData) {
                iterator.edit = false
                console.log("for of ", iterator);
                arr.push(iterator)
            }
            this.setState({
                account: arr,

            })

        }).catch(error => {
            console.log(error);

        })
    }
    async delete(accToDelete) {
        console.log("accToDelete", accToDelete);
        let id = accToDelete.id
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addproduct/` + id + `/.json`
        try {
            const response = await Axios.delete(url)
            console.log("response", response);
            const myAccount = [...this.state.account]
            const index = myAccount.indexOf(accToDelete)
            myAccount.splice(index, 1)
            this.setState({
                account: myAccount
            })
        } catch (error) {
            console.log(error);

        }
    }
    handelClose = () => {
        this.setState({
            show: !this.state.show
        })
    }
    handlShow = (accToEdit) => {
        console.log("accToEdit", accToEdit);

        this.setState({
            show: !this.state.show,
            ...accToEdit
        })
    }
    handelChange = (event) => {
        const value = event.target.value
        this.setState({
            [event.target.name]: value
        })

    }
    saveData = async () => {
        console.log("State Data", this.state);

        const { productName, brand, price, quantity, image, id } = this.state
        const accToUpdate = {
            productName, brand, price, quantity, image
        }
        console.log(accToUpdate);

        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addproduct/` + id + `/.json`
        try {
            const response = await Axios.put(url, accToUpdate)
            console.log(response);
            console.log(this.state);
            if (response.status === 200) {
                console.log(this.state.account);
                console.log(accToUpdate);
                const items = [...this.state.account];
                console.log("items", items);
                // for(let i in items){
                //     if (items[i]===this.state.id) {
                //         items[i].userName=userName
                //         items[i].userEmail=userEmail
                //         items[i].userMobile=userMobile
                //         items[i].userPassword=userPassword
                //         break;

                //     }
                // }

                items.map(item => {
                    if (item.id === id) {

                        item.productName = accToUpdate.productName
                        item.brand = accToUpdate.brand
                        item.price = accToUpdate.price
                        item.quantity = accToUpdate.quantity
                        item.image = accToUpdate.image
                        item.id = accToUpdate.id

                        return item;
                    } return null
                })
                console.log(items);

                this.setState({
                    account: items,
                    show: false,
                })


            }

        } catch (error) {

        }


    }

    editFunction = async (oldData,data) => {
        
        console.log("Edited data  in prduct Details  ", oldData);
        this.setState({
            account:oldData
        })
        /*  let newData = { ...oldData }
        newData.edit = true
        let data = this.state.account
        data[data.indexOf(oldData)] = newData;
       
        this.setState({
            account:data
        }) */


        /*  console.log("newData in prduct Details  ",newData);
           this.setState({
           account:newData
          
       })  */

        const url = "http://localhost:8080/editproduct"
         const response = await Axios.post(url,data)
         console.log("response after edit ",response);
        
    }

    delFunction = async (data) => {
        
        console.log("del data ", data);
        this.setState({
            account: data

        })

        /* let accountCopy = [...this.state.account]
        console.log(accountCopy);
        let index = accountCopy.indexOf(data)
        accountCopy.splice(index, 1)
        this.setState({
            account: accountCopy

        }) */

        // const url = "http://localhost:8080/deleteproduct"
        // const response = await Axios.post(url,data[0])
        // console.log("response after delete ",response);

    }
    render() {
        return (
            <>
                {/*  <table className="table table-bordered table-hover  table-striped">
                    <thead className="thead-dark">
                        <tr>
                           
                            <th>productName</th>
                            <th>brand</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>Delete</th>
                            <th>Update</th>
                            

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.account.map(value => {

                            return <tr key={value.id}>
                                <td>{value.productName}</td>
                                <td>{value.brand}</td>
                                <td>{value.price}</td>
                                <td>{value.quantity}</td>
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => this.delete(value)}
                                >Delete</button>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => this.handlShow(value)}
                                    >Edit</button>
                                </td>


                            </tr>


                        })}
                    </tbody>
                </table>
                <Modal show={this.state.show} onHide={() => this.handelClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form >
                            <div id="form" className="form-group  card card-body">
                                <h1>Create Account</h1>
                                <label >Name</label>
                                <input
                                    name="productName"
                                    className="form-control" type="text"
                                    value={this.state.productName}
                                    id="" placeholder="enter name"
                                    onChange={this.handelChange}
                                ></input>
                                <label >brand</label>
                                <input
                                    name="brand"
                                    className="form-control" type="text"
                                    value={this.state.brand}
                                    id="" placeholder="enter brand"
                                    onChange={this.handelChange}
                                ></input>
                                <label >price</label>
                                <input
                                    name="price"
                                    className="form-control" type="text"
                                    value={this.state.price}
                                    id="" placeholder="enter price"
                                    onChange={this.handelChange}
                                ></input>
                                <label >quantity</label>
                                <input
                                    name="quantity"
                                    className="form-control" type="text"
                                    value={this.state.quantity}
                                    id="" placeholder="enter quantity"
                                    onChange={this.handelChange}
                                ></input>
                            </div>



                        </form>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handelClose()}>
                            Close
                     </Button>
                        <Button variant="primary" onClick={() => this.saveData()}>
                            Save Changes
                     </Button>
                    </Modal.Footer>
                </Modal> */}
                <MaterialTableDemo delFunction = {this.delFunction} editFunction={this.editFunction} validation={this.validation} data={this.state.account}/>
                {/* <CustomizedTables data={this.state.account} delFunction={this.delFunction} editFunction={this.editFunction} /> */}
            </>
        )
    }
}