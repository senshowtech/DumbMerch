import "../assets/css/complain.css";
import { Form } from "react-bootstrap";
import CardHeadComplain from "./CardHeadComplain";
import CardBottomAtas from "./CardBottomAtas";
import CardBottomBawah from "./CardBottomBawah";

const ComplainAdmin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-3 complain-admin-kiri">
          <CardHeadComplain />
        </div>

        <div className="col-12 col-lg-9">
          <div className="d-flex align-items-end complain-admin-kanan">
            <div className="d-flex flex-column" style={{ width: "100%" }}>
              <CardBottomAtas />
              <CardBottomBawah />
              <CardBottomAtas />
              <CardBottomBawah />
              <CardBottomAtas />
              <CardBottomBawah />
              <div className="mx-5">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="Send Message"
                      className="form-complain"
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplainAdmin;
