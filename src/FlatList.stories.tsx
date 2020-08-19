import React from "react";
import {Box} from "./Box";
import {FlatList} from "./FlatList";
import {Text} from "./Text";
import {Card} from "./Card";
import {FlatListProps} from "./Common";

export default {
  title: "FlatList",
  component: FlatList,
};

export const FlatListExample = () => (
  <Box width="100%" height={400} display="flex" direction="column">
    <FlatList
      style={{flex: 1, width: "100%"}}
      data={[1, 2, 3, 4, 5]}
      renderItem={(item) => <Text key={item.index}>{item.item}</Text>}
      keyExtractor={(item: any, index: number) => item.id + index}
      onEndReached={() => {
        console.log("FlatLits end reached!");
      }}
      onEndReachedThreshold={0.3}
      numColumns={1}
      columnWrapperStyle={undefined}
    />
  </Box>
);

export const FlatListColumns = (props: FlatListProps) => (
  <Box width="100%" height={400} display="flex" direction="column">
    <FlatList
      style={{flex: 1, width: "100%"}}
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, props.data]}
      renderItem={(item) => (
        <Box paddingY={6} key={item.index} alignItems="center" width="100%" justifyContent="center">
          <Card>
            <Text>{item.item}</Text>
          </Card>
        </Box>
      )}
      keyExtractor={(item: any, index: number) => item.id + index}
      onEndReached={() => {
        console.log("FlatLits end reached!");
      }}
      onEndReachedThreshold={0.3}
      numColumns={4}
      columnWrapperStyle={undefined}
    />
  </Box>
);
