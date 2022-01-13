import React from "react";
import {SplitPage} from "./SplitPage";
import {Text} from "./Text";
import {storiesOf} from "@storybook/react-native";

storiesOf("Split Page", module).add("Split", () => (
  <SplitPage
    navigation={{}}
    renderListViewItem={(item) => <Text>name: {item.item.name}</Text>}
    listViewData={[{name: "user1"}, {name: "user2"}]}
  />
));
