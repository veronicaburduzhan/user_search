import React, { useContext } from "react";
import { SearchContext } from "./SearchContext";

export function UserList() {
  const contextValues = useContext(SearchContext);

  return (
    <div>
      {contextValues.githubUsers.length === 0 ? (
        <p>No results</p>
      ) : (
        contextValues.githubUsers.map((user, i) => {
          return <li key={i}>{user}</li>;
        })
      )}
    </div>
  );
}
