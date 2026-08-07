import axios from "axios";

const API_URL = 'http://localhost:5000/products'

// get 

export const fetchproducts = async () => {
    const res = await axios.get(API_URL)
    return res.data
};

// post 
export const createproduct = async (product) => {
    const res = await axios.post(API_URL, product);
    return res.data;
};



export const updateproducts = async (product) => {
  const res = await axios.put(
    `${API_URL}/${product.id}`,
    product
  );

  return res.data;
};

// delete 

export const deleteproduct = async (id) => {
    return axios.delete(`${API_URL}/${id}`)
}