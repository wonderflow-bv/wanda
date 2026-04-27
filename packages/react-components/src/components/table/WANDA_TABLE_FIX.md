# Fix: Table loses row selection on page change

## Context

The `Table` component in `@wonderflow/react-components` does not preserve
`selectedRowIds` when the consumer uses server-side pagination (i.e. passes
`showPagination + onPaginationChange + totalRows`). Selecting rows on page 1,
then navigating to page 2, wipes all selections from page 1.

The issue is **entirely inside the Table component**. Consumer code cannot work
around it because the two broken behaviours are internal to `useTable`.

---

## Root causes (confirmed by reading the compiled source)

### 1. `autoResetSelectedRows` is not disabled

File: `src/components/table/table.tsx` (compiled: `dist/components/table/table.js`)

```ts
useTable({
  autoResetHiddenColumns: false,
  autoResetPage: false,
  autoResetSortBy: false,
  // ❌ autoResetSelectedRows is missing — defaults to true
  ...
})
```

react-table's `useRowSelect` plugin watches the `data` array. When `data`
changes (which happens on every page fetch in server-side pagination), it
dispatches `resetSelectedRows`, which resets internal `selectedRowIds` state
to `initialState.selectedRowIds`. Because `autoResetSelectedRows` is not
disabled, every page navigation destroys the selection.

**Fix:** add `autoResetSelectedRows: false` to the `useTable` options object.

---

### 2. `selectedRowIds` prop is only used as `initialState` — never re-synced

```ts
initialState: {
  selectedRowIds: selectedRowIds.reduce((acc, curr) => ({
    ...acc,
    [curr]: true,
  }), {}),
},
```

The prop is read once on mount. If the consumer updates `selectedRowIds` from
outside (e.g. to restore a persisted selection after a page change), the new
value is silently ignored. There is no mechanism to push the prop back into
react-table's internal state.

**Fix:** add a `useEffect` that calls `toggleRowSelected` for each id whenever
the `selectedRowIds` prop changes. react-table exposes `toggleRowSelected` from
`useTable`. The effect must reconcile the difference between the current
internal state and the incoming prop (deselect ids that were removed, select ids
that were added) rather than blindly toggling everything.

Pseudocode:

```ts
useEffect(() => {
  const currentIds = new Set(Object.keys(selectedRowIdsState))
  const nextIds    = new Set(selectedRowIds)

  // deselect rows no longer in prop
  for (const id of currentIds) {
    if (!nextIds.has(id)) toggleRowSelected(id, false)
  }
  // select rows newly in prop
  for (const id of nextIds) {
    if (!currentIds.has(id)) toggleRowSelected(id, true)
  }
}, [selectedRowIds])
// Note: do NOT include selectedRowIdsState in the deps array —
// that would cause an infinite loop.
```

---

### 3. `onSelectedRowsChange` emits only the ids visible in the current
   internal state

```ts
useUpdateEffect(() => {
  onSelectedRowsChange?.(Object.keys(selectedRowIdsState))
}, [selectedRowIdsState, onSelectedRowsChange])
```

Because issue 1 resets `selectedRowIdsState` on every page change, the
callback fires with only the current page's ids (or `[]`). The consumer has
no way to know which ids were selected on previous pages.

This issue is fully resolved once issues 1 and 2 are fixed:
- With `autoResetSelectedRows: false`, the internal state survives page
  changes, so `selectedRowIdsState` always contains the accumulated selection.
- With the controlled sync from fix 2, the internal state is always in sync
  with the prop.
- The callback then naturally emits the full accumulated set.

No change to the callback itself is needed.

---

## Summary of changes required

| Location | Change |
|---|---|
| `useTable({ ... })` options | Add `autoResetSelectedRows: false` |
| After `useTable(...)` call | Add `useEffect` that reconciles `selectedRowIds` prop with internal `toggleRowSelected` |

Both changes are in the single `Table` function in
`src/components/table/table.tsx`.

---

## Verification

A Table with `selectableRows`, `showPagination`, `onPaginationChange`,
`totalRows`, `selectedRowIds`, and `onSelectedRowsChange` should:

1. Select rows on page 1 → navigate to page 2 → navigate back to page 1 →
   rows selected on page 1 still appear checked.
2. Select rows on page 1 AND page 2 → `onSelectedRowsChange` emits ids from
   both pages combined.
3. Consumer can pass a pre-populated `selectedRowIds` array at any time
   (not just on mount) and the table reflects it immediately.
