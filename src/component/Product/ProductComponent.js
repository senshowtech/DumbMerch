import React from "react";
import Paginations from "../Pagination";
import { Table, Button, Modal, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/axios";
import "../../assets/css/category.css";

const Product = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [idProduk, setidProduk] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState({
    product: null,
    total_page: null,
    current_page: null,
    last_page: null,
    total_data: null,
  });

  const handleClose = () => setShow(false);

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await API.get("/products/" + page);
        setProducts((prevState) => {
          return {
            ...prevState,
            product: response.data.data.products,
            total_page: response.data.data.total_page,
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
            total_data: response.data.data.total_data,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [idProduk, page]);

  let formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const EditProduct = (id) => {
    navigate("/edit-product", {
      state: {
        id: id,
      },
    });
  };

  const handleShow = (id) => {
    setShow(true);
    setidProduk(id);
  };

  const Delete = async () => {
    try {
      const response = await API.delete("/product/" + idProduk);
      if (response.status === 201) {
        setShow(false);
        setidProduk(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ChangePage = (id) => {
    setPage(id);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="box-table">
        <div className="d-flex justify-content-between">
          <h5 className="judul-login">List Product</h5>
          <Link
            to="/add-product"
            className="btn btn-primary"
            style={{
              width: "100px",
              backgroundColor: "#2c3034",
              borderColor: "#2c3034 ",
            }}
          >
            Add
          </Link>
        </div>
        <div>
          <Table
            striped
            bordered
            hover
            variant="dark"
            responsive
            className="my-4"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Photo</th>
                <th>Product Name</th>
                <th>Product Desc</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.product?.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td className="align-middle">{value.id}</td>
                    <td className="align-middle">{value.title}</td>
                    <td>
                      <div
                        className="mx-auto mt-5"
                        style={{
                          width: "80px",
                          height: "100px",
                        }}
                      >
                        <img
                          style={{
                            maxWidth: "80px",
                            maxHeight: "80px",
                          }}
                          src={value.image}
                          className="img-fluid "
                          alt="..."
                        />
                      </div>
                    </td>
                    <td className="align-middle">{`${value.desc.slice(
                      0,
                      70
                    )}...`}</td>
                    <td className="align-middle">
                      {formatter.format(value.price)}
                    </td>
                    <td className="align-middle">{value.qty}</td>
                    <td className="align-middle">
                      <Button
                        onClick={() => EditProduct(value.id)}
                        variant="success"
                        className="button-category"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleShow(value.id)}
                        className="button-category"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <h3>Delete Data</h3>
                <p>Are you sure you want to delete this data?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={() => Delete()}>
                  Ya
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Tidak
                </Button>
              </Modal.Footer>
            </Modal>
          </Table>
          <Paginations
            products={products}
            ChangePage={ChangePage}
            page={page}
            Pagination={Pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
