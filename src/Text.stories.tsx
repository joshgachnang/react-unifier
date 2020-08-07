import React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {TextProps} from "./UnifiedCommon";

export default {
  title: "Text",
  component: Text,
};

function renderText(text: string, props: Partial<TextProps>) {
  return (
    <Box width="100%" paddingY={1}>
      <Text {...props}>{text}</Text>
    </Box>
  );
}

export const Texts = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    {renderText("default", {})}
    {renderText("small", {size: "sm"})}
    {renderText("large", {size: "lg"})}
    {renderText("gray", {color: "gray"})}
    {renderText("lightGray", {color: "lightGray"})}
    {renderText("primary", {color: "primary"})}
    {renderText("red", {color: "red"})}
    {renderText("bold", {weight: "bold"})}
    {renderText("italic", {italic: true})}
    {renderText("center", {align: "center"})}
  </Box>
);

export const Truncate = () => (
  <Box maxWidth={160}>
    <Box marginBottom={2}>
      <Text weight="bold">normal:</Text>
      <Text overflow="normal">
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉&#39;
      </Text>
    </Box>
    <Box marginBottom={2}>
      <Text weight="bold">breakWord:</Text>
      <Text overflow="breakWord">
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
        ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
      </Text>
    </Box>
    <Box marginBottom={2}>
      <Text weight="bold">truncate:</Text>
      <Text truncate={true}>
        This is a long and Supercalifragilisticexpialidocious sentence.
        次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
        ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ&#39;
      </Text>
    </Box>
  </Box>
);
