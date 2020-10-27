# Pagination

## Requirements

Any React-application that need a pagination component.

## Install

    $ npm install @stefan_zetterberg/pagination

## Usage

```javascript
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ChannelItem from "./ChannelItem"; // Your component to visualize one of your items 
import Pagination from "@stefan_zetterberg/pagination";

export default function ChannelList(props) {
  // State that holds the items for the current page of your paginated list.
  const [pageOfItems, setPageOfItems] = useState([]);

  // Callback function thats called when the page is changed in your paginated list.
  // Updates the state with the items to visualize.
  function onChangePage(pageOfItems) {
    setPageOfItems(pageOfItems);
  }

  return (
    <List data-testid="channelListCalled">
      <Pagination
        items={props.channels} // Here you send in all your items. Required!
        onChangePage={onChangePage} // Provide your callback function to be called upon page change. Required!
        pageSize={15}  // Default set to 10 if not provided. Tells maximum items per page
        initialPage={1} // Defaults to 1. Tells the initial page to visualize
      />
      {pageOfItems.map((channel) => {
        return (
          <ChannelItem  // Use any component youd like to visualize one item in your big array
            key={channel.id}
            channel={channel} // Just an example of how to send your items to your sub-component
          />
        );
      })}
    </List>
  );
}
```

