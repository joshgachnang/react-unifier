import React from "react";
import {SplitPage} from "./SplitPage";
import {Text} from "./Text";

export default {
  title: "SplitPage",
  component: SplitPage,
};

export const SplitPages = () => (
  <SplitPage
    navigation={{}}
    renderListViewItem={(item) => <Text>name: {item.item.name}</Text>}
    listViewData={[{name: "user1"}, {name: "user2"}]}
  />
);
