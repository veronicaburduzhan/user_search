import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { UserList } from "./UserList";
import { UserSearch } from "./UserSearch";
import { SearchContextProvider } from "./SearchContext";

export function UserContainer() {
  const [githubUsers, setGithubUsers] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMssg, setErrorMssg] = useState("");

  useEffect(() => {
    if (inputText.length === 0) {
      setGithubUsers([]);
      setErrorMssg("");
      return;
    }
    setIsLoading(true);
    (async function () {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${inputText}`
        );
        if (response.ok) {
          const fetchedUsers = await response.json();
          const users = fetchedUsers.items.map((user) => user.login);
          setGithubUsers(users);
          setErrorMssg("");
        } else {
          setErrorMssg(
            `Something went wrong! The status is: ${response.status}`
          );
          setGithubUsers([]);
        }
      } catch (error) {
        setErrorMssg(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [inputText]);

  const handleSearchInput = (e) => {
    setInputText(e.target.value);
  };

  const contextValues = {
    inputText,
    handleSearchInput,
    githubUsers,
  };

  return (
    <>
      <Header />
      <SearchContextProvider value={contextValues}>
        <UserSearch />
        {isLoading ? <p>Loading...</p> : ""}
        {errorMssg ? <p>{errorMssg}</p> : ""}
        <UserList />
      </SearchContextProvider>
    </>
  );
}
