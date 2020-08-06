import React, {createRef} from "react";
import {Box} from "./gestalt";
import {FlatListProps} from "./UnifiedCommon";

// interface BrickProps {
//   data: any;
//   itemIdx: number;
//   isMeasuring: boolean;
// }

// class Brick extends React.PureComponent<BrickProps, {}> {
//   render() {
//     return this.props.data.renderItem({item: this.props.data.data});
//   }
// }

export class FlatList extends React.Component<FlatListProps, {}> {
  scrollContainerRef: React.RefObject<HTMLDivElement> = createRef();

  handleScroll = (e: any) => {
    if (!this.props.onEndReached) {
      return;
    }
    const distanceFromEnd = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
    const nearBottom =
      distanceFromEnd < e.target.clientHeight * (this.props.onEndReachedThreshold || 1);
    if (nearBottom) {
      this.props.onEndReached({distanceFromEnd});
    }
  };

  render() {
    const {
      contentContainerStyle,
      horizontal,
      style,
      data,
      renderItem,
      keyExtractor,
      numColumns,
      columnWrapperStyle,
      onEndReached,
      onEndReachedThreshold,
    } = this.props;

    const items: {data: any; key: string}[] = data.map((d: any, i: number) => {
      let key;
      if (keyExtractor) {
        key = keyExtractor(d, i);
      }
      if (!key) {
        key = i;
      }
      return {data: {item: d}, renderItem: renderItem, key: String(key)};
    });

    return (
      <div
        style={{
          overflowY: horizontal ? undefined : "scroll",
          overflowX: horizontal ? "scroll" : undefined,
          width: "100%",
          height: "100%",
          display: "flex",
          direction: "column",
          ...style,
        }}
        onScroll={this.handleScroll}
        // className="flatlist"
      >
        <Box
          dangerouslySetInlineStyle={{__style: contentContainerStyle}}
          display="flex"
          direction="row"
          width="100%"
          justifyContent="center"
        >
          {/* <Masonry
          minCols={numColumns}
          columnWidth={getCardWidth()}
          scrollContainer={() => this.scrollContainerRef.current as any}
          items={items}
          comp={Brick}
          // virtualize={true}
          // virtualBoundsTop={600}
          // virtualBoundsBottom={600}
          loadItems={() => {
            onEndReached && onEndReached({distanceFromEnd: 0});
          }}
          // layout={UniformRowLayoutSymbol}
          // flexible={true}
        /> */}

          {[...Array(numColumns).keys()].map((col) => (
            <Box
              key={col}
              direction="column"
              dangerouslySetInlineStyle={columnWrapperStyle && {__style: columnWrapperStyle}}
            >
              {items.map(
                (i, index) =>
                  index % (numColumns || 1) === col && (
                    <React.Fragment key={i.key}>{renderItem(i.data)}</React.Fragment>
                  )
              )}
            </Box>
          ))}
        </Box>
      </div>
    );
  }
}
