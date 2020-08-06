import * as React from "react";
import {render} from "@testing-library/react";
import Button from "./Button";

test("Button handles click", () => {
  const mockOnClick = jest.fn();
  const {getByText} = render(<Button text="ButtonText" onClick={mockOnClick} />);
  getByText("ButtonText").click();
  expect(mockOnClick).toHaveBeenCalled();
});
