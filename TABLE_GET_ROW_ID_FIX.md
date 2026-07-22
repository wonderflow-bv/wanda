# Bug report: `Table` has no way to override row id, and silently falls back to unstable page-relative ids

**Repo to fix:** `wanda`
**Reported from:** `wonderboard` (frontend)
**File to change:** `packages/react-components/src/components/table/table.tsx`

---

## Symptom

Reported against `wonderboard`'s `url-management` table (`src/app/features/url-management/sections/url-management.section.jsx`), which uses `selectableRows` + `persistSelectionAcrossPages`:

1. User clicks the header "select all" checkbox — all rows on the current page appear selected, as expected.
2. User changes page. Rows on the **new** page also appear selected, even though the user never checked them.
3. User clicks a bulk "Delete records" button. The delete API is called with an **empty** `ids` array, even though rows visually appear selected.

## Root cause

`Table`'s row id is computed internally by `getRowId`, which is **not exposed as a prop**:

```372:377:packages/react-components/src/components/table/table.tsx
const getRowId = useCallback((
  originalRow: T & OptionalDataTypes<T>,
  relativeIndex: number,
  parent?: Row<T>,
) => (originalRow as { _id?: string })?._id || (parent && [parent.id, relativeIndex].join('.')) || relativeIndex.toString(),
[]);
```

Two independent problems here:

1. **No override.** `TableProps<T>` (`table.tsx` lines 61–211) has no `getRowId` prop, even though `useReactTable` (TanStack Table) already supports accepting one natively. Any consumer whose row objects don't happen to have an `_id` field is forced to clone/remap every row (e.g. `{ ...row, _id: row.someOtherIdField }`) before handing data to `Table`, on every fetch, just to satisfy this hardcoded lookup. Per `wonderboard`'s `src/app/components/AGENTS.md`, at least four separate tables (`user-management`, `data-lake-management`, `marketplace-details-pages`, `url-management`) have had to do this remap by hand.

2. **Silent, unstable fallback.** When `_id` is absent, `getRowId` falls back to `relativeIndex.toString()` — the row's **index within the currently loaded page**. This is not a globally stable id: page 1's first row and page 2's first row both resolve to id `"0"`. Combined with `persistSelectionAcrossPages` (which intentionally keeps previously-selected ids alive across page changes), this produces exactly the reported symptom:
   - Page 1: selecting "all" selects ids `"0"`, `"1"`, `"2"`, ...
   - Page 2: the *same* ids `"0"`, `"1"`, `"2"`, ... happen to already be in the persisted selection set, so the new page's rows appear checked despite never being interacted with.
   - Any consumer code resolving selected ids back to real row data (e.g. to build a bulk-action payload from a cache keyed by the row's real identifier) finds no match for `"0"`/`"1"`/... and silently drops every id, producing an empty payload.

`packages/react-components/src/components/table/types.ts` documents that "Row/column ids are always plain strings (see `Table`'s `getRowId`)" and the design-system-level doc `TABLE_CROSS_PAGE_SELECTION.md` explicitly lists "every row needs a stable, unique id" as prerequisite #1 for `persistSelectionAcrossPages` — but the component itself has no mechanism to guarantee that prerequisite, nor does it warn when it's violated.

## What the frontend now does (workaround in `wonderboard`)

Every affected table manually remaps fetched rows before storing/caching them and passing them to `Table`, e.g. (`url-management.section.jsx`):

```js
onSuccess: (data) => {
  if (data.urls) {
    const urls = data.urls.map((url) => ({
      ...url,
      _id: url.clientSupportId
    }))
    setUrlManagementData({ ...data, urls })
    cachePageUrls(urls)
  }
}
```

This works, but every consumer has to remember to do it, there's no compile-time or runtime signal when it's missed, and it forces an extra full-array clone on every page fetch purely to satisfy `Table`'s internal id lookup.

## Requested fix (wanda)

1. Add an optional `getRowId` prop to `TableProps<T>`, typed the same way TanStack Table's own `getRowId` option is, and pass it straight through to `useReactTable`, falling back to the current `_id`-based logic when not provided (backward compatible):

```tsx
/**
 * Resolve a stable, unique id for each row. Defaults to `row._id`,
 * falling back to a page-relative index when absent (unstable across
 * pages — only safe for tables that never use `persistSelectionAcrossPages`
 * or cross-page id lookups).
 */
getRowId?: (originalRow: T & OptionalDataTypes<T>, relativeIndex: number, parent?: Row<T>) => string;
```

```tsx
const resolvedGetRowId = useCallback(
  (originalRow: T & OptionalDataTypes<T>, relativeIndex: number, parent?: Row<T>) =>
    getRowId?.(originalRow, relativeIndex, parent)
      ?? (originalRow as { _id?: string })?._id
      ?? (parent && [parent.id, relativeIndex].join('.'))
      ?? relativeIndex.toString(),
  [getRowId],
);
```

   ...and use `resolvedGetRowId` in place of the current inline `getRowId` at the `useReactTable` call site.

2. Add a dev-only warning when `persistSelectionAcrossPages` is `true` and a row is falling back to the page-relative-index branch (i.e. no `getRowId` prop was passed **and** `originalRow._id` is missing), since that combination is guaranteed to silently break selection identity across pages:

```tsx
if (process.env.NODE_ENV !== 'production' && persistSelectionAcrossPages && !getRowId && !(originalRow as { _id?: string })?._id) {
  console.warn(
    '[Table] persistSelectionAcrossPages is enabled but a row has no `_id` and no `getRowId` prop was provided. '
    + 'Falling back to a page-relative index, which is not stable across pages and will break selection persistence.',
  );
}
```

## Suggested follow-up (not required for this fix, but related)

- Update `packages/TABLE_CROSS_PAGE_SELECTION.md`'s checklist to mention the new `getRowId` prop as the preferred way to satisfy "every row needs a stable, unique id" instead of remapping rows by hand.
- Once `getRowId` ships, `wonderboard` can drop the per-row remap in `url-management`, `user-management`, `data-lake-management`, and `marketplace-details-pages` in favor of passing `getRowId` directly (tracked separately in `wonderboard`, not part of this fix).
