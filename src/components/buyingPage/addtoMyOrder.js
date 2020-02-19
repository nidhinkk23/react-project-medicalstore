import Axios from "axios";

let myorderFunction = async() => {
    let buyData = JSON.parse(localStorage.getItem("buyData"))
    console.log("buyData myorderFunction ", buyData);
    let idUser = localStorage.getItem("idUser")

    const url = `https://react-shopping-cart-fa82c.firebaseio.com/myorder/${idUser}.json`
    try {
      let response = await Axios.post(url,buyData)
      if (response.status === 200) {

        console.log("Successfully Added to myorder")
        localStorage.removeItem("buyData")


      } else {
        console.log("Failed to create");

      }
    } catch (error) {
      console.log(error);
      
    }




  }
  export default myorderFunction