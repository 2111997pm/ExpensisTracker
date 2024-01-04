import React, { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const ExpenseContext = createContext({
  items: [],
  editItems: {},
  addItem: (data) => {},
  editItem: (item) => {},
  removeItem: () => {},
});

export const ExpenseContextProvider = (props) => {
  const [itemsArr, setItemsArr] = useState([]);
  const [editItems, setEditItems] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setItemsArr([]);
  }, [authCtx.isLoggedIn]);

  const restoreItems = async () => {
    const API_URL = "https://expensis-8cd9b-default-rtdb.firebaseio.com";

    const email = authCtx.userEmail.replace(/[.@]/g, "");

    try {
      const res = await axios.get(`${API_URL}/${email}/expenses.json`);

      const data = res.data;

      if (data) {
        const realData = Object.values(data).reverse();
        setItemsArr(realData);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (authCtx.userEmail) {
      restoreItems();
    }
  }, [authCtx.userEmail]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      restoreItems();
    }
  }, [authCtx.isLoggedIn]);

  const addItemHandler = (item) => {
    setItemsArr([...itemsArr, item]);
  };

  const editItemHandler = (item, filtered) => {
    setEditItems(item);
    setItemsArr(filtered);
  };

  const removeItemHandler = async (item) => {
    const filtered = itemsArr.filter((elem) => elem !== item);
    setItemsArr([...filtered]);

    const email = authCtx.userEmail.replace(/[@.]/g, "");
    try {
      const res = await axios.get(`${API_URL}/${email}/expenses.json`);

      const data = res.data;

      const itemId = Object.keys(data).find((id) => data[id].id === item.id);

      try {
        const res = await axios.delete(
          `${API_URL}/${email}/expenses/${itemId}.json`
        );
      } catch (error) {
        console.log("ERROR: ", error);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const contextData = {
    items: itemsArr,
    editItems: editItems,
    addItem: addItemHandler,
    editItem: editItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <ExpenseContext.Provider value={contextData}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
