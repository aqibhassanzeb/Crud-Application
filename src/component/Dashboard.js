import React, { useEffect, useState } from 'react'
import { addProduct, deleteProduct, getProduct } from '../apis/Apis'
import { Button, Modal, Table } from 'react-bootstrap'



const Dashboard = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState('')
    const [loading, setLoading] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [ProductData, setProductData] = useState([])
    const [error, setError] = useState(false)
    const [handlefetch, setHandlefetch] = useState(false)
    const [updateValue, setUpdateValue] = useState(false)
    const [updateId, setUpdateId] = useState('')
    var serialno = 0

    // modal state
    const [show, setShow] = useState(false);
    const handleClose = () =>{
        setShow(false)
        setName("")
        setPrice("")
        setQuantity("")
        setUpdateId("")
        setUpdateValue(false)
    }
    const handleShow = () => setShow(true);

    // console.log("product list :", ProductData)

    // show product fumction

    const handleShowProduct = () => {
        setLoading(true)
        getProduct().then(res => {
            setLoading(false)
            setProductData(res.data?.product)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    // Delete product function 

    const handleDeleteProduct = (_id) => {
        deleteProduct(_id).then(res=>{
            setHandlefetch(!handlefetch)
        }).catch(err=>{
            console.log(err)
        })
    }

  // Add product function

  const handleaddProduct = () => {
      if(!name || !price || !quantity){
          return setError(true)
        }
    const payload={name,price,quantity}
    setModalLoading(true)
    addProduct(payload).then(res => {
        setModalLoading(false)
        // setProductData()
        setHandlefetch(!handlefetch)
        handleClose()
    }).catch(err => {
        setModalLoading(false)
        console.log(err)
    })
}

    // update data separete by id
  const  handleUpdateGet=(id)=>{
    let updateData=ProductData.find((elm,)=>{
       return elm._id===id
    })
    setName(updateData.name)
    setPrice(updateData.price)
    setQuantity(updateData.quantity)
    setUpdateId(updateData._id)
    setUpdateValue(true)
    handleShow()

    }

    const handleUpdate=()=>{
        if(!name || !price || !quantity){
            return setError(true)
          }
      const payload={name,price,quantity}
      let _id=updateId
      setModalLoading(true)
      addProduct(payload,_id).then(res => {
          setModalLoading(false)
          // setProductData()
          setHandlefetch(!handlefetch)
          handleClose()
      }).catch(err => {
          setModalLoading(false)
          console.log(err)
      })
    }


    useEffect(() => {
        handleShowProduct()
    }, [handlefetch])


    return (
        <div>
            <h1 className='mt-5 d-flex justify-content-center'>Product List</h1>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary' onClick={handleShow}>Add Product</button>
            </div>
            {/* list of product  */}

            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>quantity</th>
                            <th>Delelte/Update</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <h3>loading..</h3> :
                                ProductData.length > 0 ? ProductData.map((elm, index) => {
                                    return (
                                        <tr key={elm._id}>
                                            <td>{serialno = serialno + 1}</td>
                                            <td>{elm.name}</td>
                                            <td>{elm.price}</td>
                                            <td>{elm.quantity}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => { handleDeleteProduct(elm._id) }}>Delete</button>
                                                <button className='btn btn-success' onClick={()=>{
                                                    handleUpdateGet(elm._id)
                                                }} >Update Product</button>
                                            </td>
                                            <td><button className='btn btn-success' >View</button></td>
                                        </tr>
                                    )
                                })
                                    : <h3>Not Found</h3>
                        }
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div>
                        <p style={{color:"red"}}>Please fill the fields</p>
                    </div>
                    }
                    <div className=''>

                        <label>Name</label>
                        <input type="text" value={name} className='mt-3' onChange={(e)=>{setName(e.target.value);setError(false)}} />
                        <label>Price</label>
                        <input type="text" value={price} className='mt-3' onChange={(e)=>{setPrice(e.target.value);setError(false)}} />
                        <label>Quantity</label>
                        <input type="text" value={quantity} className='mt-3' onChange={(e)=>{setQuantity(e.target.value);setError(false)}} />
                    
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                   {
                   updateValue ?
                   <Button variant="primary" onClick={handleaddProduct}>
                      update
                    </Button> :
                   <Button variant="primary" onClick={handleaddProduct}>
                      Save
                    </Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Dashboard