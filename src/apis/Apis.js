import axios from "axios";

const apiURL= axios.create({
    baseURL: "http://localhost:3333/api/v1/"
  });

export const addProduct=async(reqParam) => {
    const response  = await apiURL.post("addproduct",reqParam);
    return response;
  }

export const getProduct=async() => {
    const response  = await apiURL.get("product");
    return response;
  }

export const updateProduct=async(reqParam) => {
    const response  = await apiURL.put("product",reqParam);
    return response;
  }

export const deleteProduct=async(reqParam) => {
    const response  = await apiURL.delete(`product/${reqParam}`,reqParam);
    return response;
  }