import React from "react";
import { render } from "@testing-library/react";
import Test from "./Test";

describe("Test component", () => {
  it("should render", () => {
    render(<Test/>);
  });
});
