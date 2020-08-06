import * as React from "react";
import renderer from "react-test-renderer";
import Badge from "./Badge";

it("Badge renders", () => {
  const component = renderer.create(<Badge text="Badge" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
