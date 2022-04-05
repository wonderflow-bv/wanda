---
"docs": major
"@wonderflow/react-components": major
"@wonderflow/tokens": major
---

Refactoring Table component to improve performances and features:

- Various rendering improvements
- `hideFromList` column's prop is renamed into `isToggable`.
- `activePageIndex` prop is renamed into `initialPageIndex`.
- `onDataUpdate` prop is renamed into `onPaginationChange`.
- Chanded types for `selectedLabel`.
- `selectedActions` is now a function that returns a react node and pass `selectedRowIds` as parameter.
- `onSelectionChange` prop has been removed.
- `actionsRowComponent` prop has been removed.
