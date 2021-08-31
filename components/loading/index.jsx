import React from "react";
import ReactLoading from "react-loading";
export default function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center window-height">
      <ReactLoading
        type={"bubbles"}
        color={"#00b0ff"}
        height={"20%"}
        width={"20%"}
      />
    </div>
  );
}
