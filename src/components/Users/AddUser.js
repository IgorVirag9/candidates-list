import React, { useState } from "react";

import Button from "../UI/Button";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const initialState = { username: "", age: "" };

const AddUser = ({onAddUser}) => {
  const [userInput, setUserInput] = useState(initialState);
  const [error, setError] = useState({ title: "", message: "" });

  const addUserHandler = (event) => {
    event.preventDefault();
    if (userInput.username.trim().length === 0 || userInput.age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please entere a valid name and age.",
      });
      return;
    }
    if (+userInput.age < 1) {
      setError({
        title: "Invalid age",
        message: "Please entere a valid age (> 0).",
      });
      return;
    }
    onAddUser(userInput);
    setUserInput(initialState);
  };

  const handleChange = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error?.message && (
        <ErrorModal
          title={error?.title}
          message={error?.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={userInput.username}
            onChange={handleChange}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            value={userInput.age}
            onChange={handleChange}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
