import React, { useState } from "react";
import "w3-css/w3.css";

import { ArrowBack } from "@mui/icons-material";
function Agriculture({ back }) {
  return (
    <div>
      {" "}
      <ArrowBack
        onClick={back}
        className="w3-ripple"
        size={30}
        style={{ color: "grey", marginRight: 20, cursor: "pointer" }}
      />{" "}
      Agriculture
    </div>
  );
}

export default Agriculture;
