import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <Circles
      height="50"
      width="50"
      color="#5c2b82"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
