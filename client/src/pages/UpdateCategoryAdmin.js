import React from "react";
import { useQuery } from "react-query"
import { useParams } from "react-router-dom";
import { products } from "../components/DataDummy/Products";

import { API } from "../config/api";

const UpdateCategoryAdmin = () => {
  const title = "Category admin";
  document.title = "DumbMerch | " + title;


  return (
    <div className="container">
      <h3 className="text-start mb-3 mt-5">Edit Category</h3>
      <form style={{ marginTop: "3rem" }}>
        <div className="input-group mb-3">
          <input type="text" className="form-control bg-var-dark text-white border-form" />
        </div>
        <button className="btn bg-var-green text-white fw-bold container mt-5">Save</button>
      </form>
    </div>
  );
};

export default UpdateCategoryAdmin;
