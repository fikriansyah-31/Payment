import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useQuery, useMutation } from "react-query";

// import ListCategoryComponent from "../components/List/ListCategoryComponent";
import NavbarAdmin from "../components/NavbarAdmin";

// get API config
import { API } from "../config/api";

import imgEmpty from "../assets/static/media/empty.svg";

import DeleteData from "../components/modal/DeleteData";

const CategoryAdmin = () => {
  const navigate = useNavigate();

  const title = "Product admin";
  document.title = "DumbMerch | " + title;

  const [categories, setCategories] = useState();

  // Create variabel for id product and confirm delete data with useState here ...
  // Variabel for delete product data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create init useState & function for handle show-hide modal confirm here ...
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = () => {
    navigate("/add-category");
  };

  // Create function handle get id product & show modal confirm delete data here ...
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = async (id) => {
    try {
      await API.delete(`/category/${id}`);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container mt-4">
        <div className="d-flex">
          <h4>List Category</h4>
          <button onClick={addCategory} className="btn bg-var-dark-gray text-white ms-auto px-4">
            Add
          </button>
        </div>
        {categories?.length !== 0 ? (
          <table className="table table-dark table-striped mt-4">
            <thead>
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">Category Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories?.map((item, index) => (
                <tr key={index} className="text-center align-middle">
                  <th scope="row" width="10%">
                    {index + 1}
                  </th>
                  <td width="60%">{item.name}</td>
                  <td width="30%">
                    <Button className="btn bg-var-green text-white fw-bold m-1" variant="success" style={{ width: "6rem" }}>
                      Edit
                    </Button>

                    <Button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="btn bg-var-red text-white fw-bold m-1"
                      variant="danger"
                      style={{ width: "6rem" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <img src={imgEmpty} style={{ width: "40%" }} alt="empty" />
            <div className="mt-4">No Data Category</div>
          </div>
        )}

        <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
      </div>
    </>
  );
};

export default CategoryAdmin; 