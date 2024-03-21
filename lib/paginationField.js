import gql from 'graphql-tag';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,

    read(existing = [], { args, cache }) {
      console.log('EXISTING', existing, args, cache);
      const { skip, first } = args;

      // Read the number of items on the page frmom the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items and there arent enough items to satisfy how many were requested and we ara on last page then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items, go to network and fetch them
        return false;
      }

      // If there are items just return them
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );

        return items;
      }

      return false;
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      console.log(`Merging items from network ${incoming.length}`);

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log('MERGED', merged);
      return merged;
    },
  };
}
