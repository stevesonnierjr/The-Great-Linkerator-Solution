import React from "react";
import Input from "@material-ui/core/Input";

const searchForm = ({ links, setLinks }) => {
  const showLinks;

  return (
    <Input
      type="search"
      value={this.state.value}
      onChange={(newValue) => this.setState({ value: newValue })}
      onRequestSearch={() => doSomethingWith(this.state.value)}
    />
  );
};

export default searchForm;
