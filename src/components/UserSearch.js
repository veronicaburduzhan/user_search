import React, { useContext } from "react";
import { SearchContext } from "./SearchContext";

export function UserSearch() {
  const contextValues = useContext(SearchContext);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={contextValues.handleSearchInput}
      />
    </>
  );
}
