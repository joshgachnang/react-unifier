import * as React from "react";
import {create} from "react-test-renderer";
import Controller from "./Controller";

test("Controller renders", () => {
  const element = document.createElement("div");
  const component = create(
    <Controller anchor={element} positionRelativeToAnchor bgColor="darkGray" onDismiss={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
