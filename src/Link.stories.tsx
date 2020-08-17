import React from "react";
import {Box} from "./Box";
import {Link} from "./Link";
import {Text} from "./Text";

export default {
  title: "Link",
  component: Link,
};

export const Links = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Link href="http://google.com">
      <Text>http://google.com</Text>
    </Link>
    <Link href="http://google.com" target="blank">
      <Text>Open new tab</Text>
    </Link>
    <Link href="http://google.com" target="blank">
      <Text color="blue">Colored links</Text>
    </Link>

    <Text>
      Here is an inline link:
      <Link href="http://google.com" inline={true}>
        <Text>Some Link</Text>
      </Link>
      And a bit more text.
    </Text>
  </Box>
);
