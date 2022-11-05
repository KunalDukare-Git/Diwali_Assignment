import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { userLogout, userUpdate } from "../services/auth.service";
import { useFormik } from "formik";
import { PopupValidations } from "../form-validations/FormValidations";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const initial = {
    first_name: user.first_name,
    last_name: user.last_name,
    add_line1: user.address?.add_line1,
    add_line2: user.address?.add_line2,
    state: user.address?.state,
    city: user.address?.city,
    mobile: user.mobile,
    email: user.email,
  };

  const [show, setShow] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initial,
    validationSchema: PopupValidations,
    onSubmit: async (values) => {
      const updatedResponse = await userUpdate(values);
      if (updatedResponse.data.status) {
        handleClose();
      }
    },
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    userLogout();
    navigate("/");
  };

  return (
    <>
      <div className="text-right mt-3 mr-3">
        <Button variant="primary" onClick={handleShow}>
          Update Profile
        </Button>{" "}
        <Button variant="danger" onClick={() => handleLogout()}>
          Logout
        </Button>{" "}
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="card mt-5">
        <div className="box">
          <div className="img">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCA8REBAODhAODg4QDg4ODg4OEBAODg4OFxMYGBcTFRUaICwjGhwoHRcXJDUkKC0vMzI0GSI4PTg9PCwyMi8BCwsLDw4PGhERGS8gICgvMTEvMS8vMS8vMjExLzIvLy8vLzEvMS8vLy8xLzEvMTEzMTEvLy80Ly8vMS80MS8zMf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgMBBQYEB//EAEUQAAICAAIECQkECAUFAAAAAAABAgMEEQUGEjEhQVFhcYGRwdETIjJSU3KTobEVQkNiFiMzgpKiwuEUVHPS8DRjg7Kz/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAEFAgMEBv/EADQRAAIBAQMHDAIDAQEAAAAAAAABAgMEBRESIUFRgZGhFSIxMjNhcbHB0eHwI1ITFEJi8f/aAAwDAQACEQMRAD8A+zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGr0lpqjD8E5bU/Uhk5Lp5DGc4wWMngjKEJTeTFYs2gOHxetV881Wo1R5ltT7X4Gpux11n7Syc/ek2uwr6l5011U5cF92FhTuuo+u1Hj8cT6JZjqY+nbVHpnHPsPLPTmEX4yfQpPuOABzSvSo+rFLj7HSrrp6ZP7vO5lrJhVuc30R8SH6UYbiVvXGK7zijJr5Sr9275M1d1Ba952D1qp4q7H1xRH9K6vZz/AIonIgjlC0a1uMuT6Gp7zr/0qq9nP+KJla008ddi64s48yQrwtGtbiP6FDU952a1nw/HG3+GL7ycdZMK+OcemPgziQZK8a/du+SHd1B6953sNN4V/ipdKku49NeOpl6NtT5ttJ9h86RJM2RvOr/qKe9e5rd2U9EmfS00+FcK5USPnVGKshwwnKPuyaNrhdYL45KbVi/Msn2o6ad5wfWi1x+7jlqXdOPVafD38zsAa3BaXqt4M9iXqy4+hmyO+FSM1jF4o4ZwlB4SWAABmYgAAAAAAAAAA1enMf5CmUl6cvNhzP1urwMZSUYuT0GUIOclFdLNTrJp91N0UPKe6c1vi/Vjz85xybbzbzbMWTcpNvlMxPO2itKrLFnp7PQhQhkx2vX94FiRlEUSRzm0kjOZEAgkZIjMEEjJHMkgAZCQyIABnIxkSAZMAEE0ycZFRmLBDPZVI6PROkmsq7HnHdGT3x5nzHLVyPfh5nTZ6koSxiclelGccGdyDX6KxO3DZfpR+aNgehhNTipIopxcZOLAAMjEAAAAAAHD634vat8mn5taUf3nwvw6jtpySTb3JZvoPl+lbnOycnvlKUn1s4LfPCCjr9CyuynlVXLV6niiWIhEmijZfMmiSIJmcyCCWZnMg5EJTAwLswpZtJZtt5JJZtvkSPHO/hSinKTaSiuFtvgSS5TsdDaLVEVOzJ3yXnPeq0/ux733HTZ7NKvLBZlpZotNeNCGVLp0L7oPJgdBSllK6WwvUWXlOt7l8zd4fReHhurUny2frH8+AuTLIl7SslGn0Rz63nf3wwKCra61R55YLUs33biFhad3kqcv9OHgU3aIw8/w9h8tb2Murd8j1xLImyVKElhKKew0xq1I51JrazmMdoGdacqn5WK4WkspxXu8fV2GmaPoaNLpzRSkpXVLKazlOK++uOSXrfXp31dqu9JOdLd7e27UWdlt7byau/399/dyjRgsZBlQWpgyjBkkFkGeuiR44noqZnB5zXNG+0Vds2R5HwPoZ0xxuGluOtontRjLlimXdininEpbZDBqRaADuOIAAAAAA8mk57NFsv8AtyXbwd58wxcs5M+jaxSyw0+dxXzz7j5tiH5xU3g+cl3F3dUeY33kYliZWMyqZbFuZBzIORVOYCRZOw81lrISlmVNmaRsUTptTsDtzniZrNVeZXnx2ZcL6ov5rkOvZrdW6FXg6Y8co+VlzubbX8uyuo2TPRWWn/HSS09L2/cNh5a3Vv5a8noWZeC+47TMWWQZQmWxZ0HGeiLLYlMGWRYILUZRFEkAcbp7CKq57KyrsW3FcUXnwx7fk0a1nVa007VCnx12Lh/LJZP57JycWebtlJU6zS6Hn3/OJ6Ox1P5KMW+no3fGAABynSSiX1s88S6syRhI2VDOq0XPOqPM2u/vOToZ02hZZ1tcku4tbFLn7Crtq5hsgAWpVgAAAAAGk1qllh+mxf8Aqz55bvZ3utz/AFUF+aX0OBt3lLb+02F/di/DvI5mHIw2VykcBZmZSKJMlJkWSZorkytstmUmSM0fUNGNf4bD5f5bD/8AzieiTNVqxifKYSv1q86pczju/lcTaNnpaclKCa0o8baIuNWcXob8zGZOEipsQkbDSeuDLos80GXQYIL4smmVRZNEA1+sX/S2f+PL+OJxMWdZrTflTGvjnZtZflivFxOTiUN4yTr+CXq/Uv7ui1Q8W/RehMGEZK87TKLaylF0CUYs9+HZ0egnwTXu95zeHOh0C+GXu95ZWN/kRW2tfjZugAXJUAAAAAAHN64vzK1/qf0nB2b2d1rj6Nf7/ccJZvKO3dq9nkj0V29itvmytsrkyUiDOIskRMMyzDJJK5FckWsi0ZIyRu9U9Iqq10zeULslHPdGxei+vPI7Zs+VnYaC08pqNN8sprKMZyfBNcSb9b6lpYbSkv45Pw9vb/zGmvSxyk/5oLxXru6e5Y6zoWZiQzJw6+wt8ChLoM9EGUwg+R9jL4wYwIJxLEyKRz2m9Lpp00vNPgssW5r1Y83K+PoOevXjRjlS3a/vA3UKMq0smO16vvE1um8b5a6Tj+zitmHPFfe63m+w8EUMjKR5mc3OTlLpZ6WEVCKiuhGUADAkyWwKi2JKMWe3Dm/0D6Uvcf1RoMOb7QXpv3X9UWFk7SJX2rs5G+ABdlMAAAAAAczrj6NX7/ccJZvO91x9Crps/pOCs3lHbe1ezyR6K7exW3zZTIi0TZho4ixK2iLJtEWiTIgyDJslTVOyca64uU5NRjFb2yTIhXVKcowhGU5t5RjFNyk+ZHVaL1SXBPFS3/gwe7mlJfSPabfQuh68NDilc1+ss/ohyR+vHxJbSJcWewxisqpnerRt1vgUFrvSUnk0Hgtel+GpcdOboM4emEIqEFlGKSS4XwdL3noiVRJosSnLUyaZWiaBBi+mFkHXNbUZcDWbjn1o5/SGgHHOdLc1vdb/AGi6H9769J0aMo0VrNTrdZZ9en73HRRtNSk+a82rQfPnD+/MyLR12mNFq1OytJWpZtblauR/m5H1dHKyXU+R8DR5+0WeVGWS8+p6y8oWiNaOK2rUVtGCTRE0HQEWxK0WRJRiz2Yc3+gvSfuv6mhoN/oH0pe4/qiwsnaRK+19SRvQAXZTAAAAAAHPa3L9VW/zS+iOAt3n0TWqOeHT5LP6X4Hzy/eUtv7TYegux/i3lLDDItnAWZhlcmZlIqkyTJGGzs9UdF7Ff+JsXn2JqvP7tfL0yfyS5TldHYR331Urg25qLa3qO9vqimz6bGCilGKUYxSjGK3KKWSSLK76ScnUejo8fvmVd7V3CCpL/XT4fL8sDDETDCLg88WxJoriTQBYixFaJoAmiSIokgQZRzWsmB2ZK+C82b2bUuKfFLr+q5zpkU4rDq2udct04uOfI+J9TyfUaLTRVam46dHj9zG+z1nSqKWjT4fc5wZBkpRcW4yWTi3GS5Gnk0YPMHpDCLYEETgSiGz2UHQ6AXDJ83ec/QdHoCPBN+6vqWNjX5Ilda3zGbgAF0U4AAAAABqtYo54eXNKL7u8+bYlcLPqOlYbVFq/Jtdjz7j5ljY5SZU3guen3F5dUuY13njkyqUic2VsrS4RFsrbJSINkoyOn1Io2rbrX9yChH3pPf2RfadkzQalV5YWc+OV8l1RhFL55m/kegsccmhHfvfseXvGeXaZ92bd84kGYTMSZHbOk4S+LJxZ5lYTjaiQepE0eWNyLI2rlAPSiSKI2LlLI2IggtRkgpEkwDjdY6djEza3WKNi6+B/NM1qZ0Gt0OGmfLtxfU4tfVnORkeatcMivNLX5rH1PSWWWVQg+7yzehaiyBUmW1mhG1ntpOm0GvMk+Vpdi/uczUdXoiOVS55N93cWdiWNTwRWW18w94ALcqgAAAAACuyClGUXulFxfQ1kfMdK1OM2nvTafSfUjhta8Js2yaXBPz117/nmcFvhjBPUWV2VMmo46zkJFTLrFwlLKY9EiMkVSiXMrZJkdTqrpiuqmVNsowam7Iym9mDTSzW1uTTXHym++1MO/wAenqtr8T5yiFmHUuk76NvlTgouKeH3vK2vdcKtRzymsenNifSftLDe3o+LDxH2lhvbU/Fh4ny2eFa5Sp0vnN/KP/PE1cjQ/d7vk+r/AGnhvbU/Eh4j7Uw3tqfiQ8T5P5J85jyb5yeUH+vEcjQ/fh8n1n7Uw3tqfiQ8R9qYb21PxIeJ8n8m+cKp8/aOUP8Anj8DkaH78Pk+sfaeG9tT8WHiZWlMP7en4sPE+UKh85ZDCN8pHKL/AF4kcjQ/fh8n1VaXw/8AmKviw8S2GmqFvup+LDxPmFWBXHme2mlR9HgMHejX+OPwRyRTX+3u+TqdY9KV3OEK5bSgpOUl6Lk8uBPjyy+ZpoTPMi2DKyrVdWbm+lnbSoxpQUF0I9cGeio8kGeuoxiRM9tK4UdlhIbNcI8kVn0vhOW0VTt2RjxZrPoW87At7vjmlLYU1ulnUQACyK8AAAAAAGo0/gvK1bSWcq85dMeNd/UbcGM4KcXFmcJuElJaD5FjqHFs10j6BrDoTLOyuOcHwyS+4/A43E4RrcUFajKEsGeos1pjUimma9glKDRHI0HXiEiaRhIIAzkQlSWIyhiCh0mPInqyJbIyhieRUEo0HqUSSSIyiMSmFBbCtIlmZ2iMTEykSRDMbRBBYWRKVInBgxwPVWz2U8J46YNnR6E0VKxqck1Wt8vW5kbaVKU5YJHLXqRhHFs2+gMLswdj3y4I9HG/+chuSMYpJJLJJZJciJHoqVNU4KKPOVJuc3JgAGwwAAAAAAAAABotJavVW5yryqnxrLOt9XF1G9BjOEZrCSM6dSVN4xeB86x2r90M84Nr1oefHp4N3WamzAH1s892Fqs/aV1z55RTfacU7DF9DLGnec11luPkksHIreGlyH1GzQOFl+G4+7J955rNV8O90rF07Mu40SsEu46o3pDTjuPmzqlyDYfIfQpapw4rX11p95TLVN8VkOuLRr/o1NXl7m3lKlr8/Y4PZfIZyZ271SnxWV9kl3Ef0St9ertn/tMf6VTUZco0f2RxWTGTO1WqVvrU9sv9pJapT47K/wCZ9w/pVNQd4Uf2RxOzLkM+TlyHcx1SfHZDqi2Wx1Tjx29kF4kqw1NXl7mLvKjr4P2OCVUuQsjhpH0CGq9C3ysfRsx7meqrQGFjvhKfvS8MjYrvn3Gp3pT0Y7j53DCM2mB0JbZlsVyaf3mtmPazvKsFTD0Kq4vl2U327z1G+FgiuszmqXnJ9Vbzn9HauwhlK5qb9WOaj18pvoRSSSSSXAklkkiQOyFKEFhFYFdUqzqPGTxAANhrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z" />
          </div>
          <h2>
            <b>
              Welcome, {user.first_name} {user.last_name}
              <br />
              <span>&nbsp;Angular Fullstack Developer</span>
            </b>
          </h2>
          <p>
            <i>
              <b>
                Hello, I am {user.first_name} {user.last_name}, working as react
                fullstack developer and angular fullstack developer in smartData
                Nagpur.
              </b>
            </i>
          </p>
          <span>
            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-google-plus" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </span>
        </div>
      </div>

      {/* -------------------------Popup------------------------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={values?.first_name}
                  name="first_name"
                  onChange={handleChange}
                />
                {errors.first_name && touched.first_name ? (
                  <p className="text-danger">{errors.first_name}</p>
                ) : null}
                <Form.Label>Address Line1</Form.Label>
                <Form.Control
                  type="text"
                  value={values?.add_line1}
                  name="add_line1"
                  onChange={handleChange}
                />
                {errors.add_line1 && touched.add_line1 ? (
                  <p className="text-danger">{errors.add_line1}</p>
                ) : null}
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  value={values?.state}
                  name="state"
                  onChange={handleChange}
                />
                {errors.state && touched.state ? (
                  <p className="text-danger">{errors.state}</p>
                ) : null}
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="number"
                  value={values?.mobile}
                  name="mobile"
                  onChange={handleChange}
                />
                {errors.mobile && touched.mobile ? (
                  <p className="text-danger">{errors.mobile}</p>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={values?.last_name}
                  name="last_name"
                  onChange={handleChange}
                />
                {errors.last_name && touched.last_name ? (
                  <p className="text-danger">{errors.last_name}</p>
                ) : null}
                <Form.Label>Address Line2 </Form.Label>
                <Form.Control
                  type="text"
                  value={values?.add_line2}
                  name="add_line2"
                  onChange={handleChange}
                />
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={values?.city}
                  name="city"
                  onChange={handleChange}
                />
                {errors.city && touched.city ? (
                  <p className="text-danger">{errors.city}</p>
                ) : null}
                <Form.Label>Email </Form.Label>
                <Form.Control type="text" value={values?.email} readOnly />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
