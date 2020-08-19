// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import classnames from "classnames";
import * as React from "react";
import {Box} from "./Box";
import {SegmentedControlProps} from "./Common";
import layout from "./Layout.module.css";
import styles from "./SegmentedControl.module.css";
import {Text} from "./Text";

export function SegmentedControl(props: SegmentedControlProps) {
  const {items, onChange, responsive, selectedItemIndex, size = "md"} = props;
  const buttonWidth = responsive ? undefined : `${Math.floor(100 / Math.max(1, items.length))}%`;
  return (
    <div
      className={classnames(styles.SegmentedControl, size === "md" ? layout.medium : layout.large)}
      role="tablist"
      style={{width: "100%"}}
    >
      {items.map((item, i) => {
        const isSelected = i === selectedItemIndex;
        const cs = classnames(styles.item, {
          [styles.itemIsNotSelected]: !isSelected,
          [styles.itemIsSelected]: isSelected,
        });
        return (
          <button
            aria-selected={isSelected}
            className={cs}
            key={i}
            onClick={() => onChange({activeIndex: i})}
            role="tab"
            type="button"
            style={{width: buttonWidth}}
          >
            {typeof item === "string" ? (
              <Text
                color={isSelected ? "darkGray" : "gray"}
                align="center"
                size={size}
                weight="bold"
              >
                {item}
              </Text>
            ) : (
              <Box display="flex" justifyContent="center">
                {item}
              </Box>
            )}
          </button>
        );
      })}
    </div>
  );
}
