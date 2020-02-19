import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import CustomizedSnackbars from '../addProduct/SnackBar';


export default function MaterialTableDemo(props) {
  console.log("props data ", props);
  let openData = {
    open: false,
    data: ""
   
  }
  const [open, setOpen] = React.useState(openData);
  const [state, setState] = React.useState({
    columns: [
      { title: 'ProductName', field: 'pName' },
      { title: 'Brand', field: 'company' },
      { title: 'Price', field: 'price' },
      { title: 'Quantity', field: 'quantity' },
      { title: 'Image', field: 'pImage' },

    ],
    data: []

  });
  let validation = (data,newAllData) => {
    console.log("in validation ", data);
    const { pName, company, price, quantity, pImage } = data
    console.log(pName,company,"price:-",price,quantity,pImage);
    
    if (pName !== undefined || company !== undefined || price !== undefined || quantity !== undefined || pImage !== undefined) {
      if (pName.trim().length === 0 || company.trim().length === 0 || price.length === 0 ||   quantity.length === 0 || pImage.trim().length === 0) {
        console.log(" validation failed ");
        setOpen({
          open: true,
          variant: "error",
          data: "Invalid Data"
        })
        setTimeout(() => {
          setOpen({
            ...open,
            variant: "error",
            open: false,
  
          })
        }, 2000);

      } else {
        props.editFunction(newAllData,data)
        console.log(" validation success  ");
        setOpen({
          open: true,
          variant: "success",
          data: "Data is Added"
        })
        setTimeout(() => {
          setOpen({
            ...open,
            variant: "success",
            open: false,
  
          })
        }, 2000);

      }

    } else {
      setOpen({
        open: true,
        variant: "error",
        data: "Field Shouldn't be Empty"
      })
      setTimeout(() => {
        setOpen({
          ...open,
          variant: "error",
          open: false,

        })
      }, 2000);

      console.log("failed");

    }


  }
  return (
    <>
      <MaterialTable
        options={{
          headerStyle: { backgroundColor: '#37474f', color: 'white' },


        }}
        title="Product Data"
        columns={state.columns}
        data={props.data}

        editable={{
          onRowAdd: newData =>

            new Promise(resolve => {

              setTimeout(() => {
                resolve();
                setState(prevState => {

                  const data = [...props.data];
                  data.push(newData);
                  validation(newData,data)
                  // props.function(data)
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>

            new Promise(resolve => {
              setTimeout(() => {

                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...props.data];
                    data[data.indexOf(oldData)] = newData;
                    validation(newData,data)
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...props.data];
                 const delData = data.splice(data.indexOf(oldData), 1);
                  props.delFunction(data,delData)

                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}

      />
      <CustomizedSnackbars open={open} />

    </>
  );
}