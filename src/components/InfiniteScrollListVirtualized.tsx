import * as React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { TOTAL_POKEMON_COUNT } from "../constants/pokemon";
import { Loading } from "./Loading";

const LIMIT_PER_PAGE = 20;

type InfiniteScrollProps<A, B, C, D, E, F> = {
  itemComponent: React.FC;
  id?: string;
  height?: number | string;
  controllerQuery?: <TData = A, TError = unknown>(
    _pageParamKey: keyof B,
    variables?: C,
    options?: UseInfiniteQueryOptions<D, TError, TData, E, QueryKey>
  ) => UseInfiniteQueryResult<F>;
  controllerQueryParams?: any;
  itemSize?: number | string;
};

export const InfiniteScrollListVirtualized = ({
  itemComponent: ItemComponent,
  id,
  height,
  controllerQuery,
  controllerQueryParams,
  itemSize,
  ...props
}: InfiniteScrollProps) => {
  const { data, fetchNextPage, isFetching, isLoading } = controllerQuery(
    "offset",
    { ...controllerQueryParams, limit: LIMIT_PER_PAGE },
    {
      getNextPageParam(lastPage) {
        return {
          offset: lastPage.items[lastPage.items.length - 1].id + LIMIT_PER_PAGE,
        };
      },
    }
  );

  const allDataItems = React.useMemo(
    () => data?.pages?.map(({ items }) => items).flat(Infinity),
    [data?.pages]
  );
  if (isLoading) return <Loading />;
  return (
    <div style={{ height: 600 }}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={(index) => !!allDataItems[index]}
            itemCount={TOTAL_POKEMON_COUNT}
            loadMoreItems={fetchNextPage}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={height}
                width={width}
                itemCount={allDataItems?.length}
                itemSize={itemSize || 52}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {({ style, index }) => (
                  <div style={style}>
                    <ItemComponent
                      index={index}
                      {...allDataItems[index]}
                      {...props}
                    />
                  </div>
                )}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};
