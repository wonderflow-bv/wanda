# @wonderflow/react-components

## 9.5.0

### Minor Changes

- e052a3c: Add `onToggle` callback to Disclosure

## 9.4.0

### Minor Changes

- 38ba5e1: Fix Card dimmed values

## 9.3.0

### Minor Changes

- 5f8abc6: Fix tab style
- 3e59214: Fixed multi page selection
- 8d0c988: Fix snackbar title color

### Patch Changes

- d601751: Standardized chip paddings.

## 9.2.0

### Minor Changes

- 62c7fdc: Add new icon size and update icons size across components

## 9.1.0

### Minor Changes

- 2900059: Add 2 new 8 and 9 dimmed colors to themes.
- 7d1d15c: Add new fullWidth prop to textfield

## 9.0.0

### Major Changes

- 897705d: Add AspectRatio component

### Minor Changes

- 897705d: Add Menu.Separator element
- 897705d: Fix InputGroup outline position

## 8.7.0

### Minor Changes

- 23dbade: Fix autocomplete option values

## 8.6.0

### Minor Changes

- d645d7a: Fix autocomplete returned value

## 8.5.0

### Minor Changes

- 0472ada: Fix autocomplete markup related to busy state
- 425ca61: Fix autocomplete controlled value

## 8.4.0

### Minor Changes

- e768c37: Fix autocomplete returned values
- abd6769: Update Autocomplete returned values and onChange function

## 8.3.0

### Minor Changes

- d2fee66: Fix table column toggle width

## 8.2.0

### Minor Changes

- 20eb56d: Set table controls max height and menu overscroll behaviour

## 8.1.0

### Minor Changes

- d1b2c29: Fix row selection and change data returned by `selectedLabel` and `onSelectionChange`
- 0b0c10d: Add maxHeight property to Menu
- f19b7e8: Tab now accepts className property
- 101cbc3: Prevent wrapping for tab items
- 00bd7e2: Add new `value` prop to Menu.Item
- 8eeecea: Add new `busy` property to Autocomplete

## 8.0.0

### Major Changes

- 67aed15: Refactoring Tab component and remove obsolete code
- 67aed15: Refactoring Table component to improve performances and features:

  - Various rendering improvements
  - `hideFromList` column's prop is renamed into `isToggable`.
  - `activePageIndex` prop is renamed into `initialPageIndex`.
  - `onDataUpdate` prop is renamed into `onPaginationChange`.
  - Chanded types for `selectedLabel`.
  - `selectedActions` is now a function that returns a react node and pass `selectedRowIds` as parameter.
  - `onSelectionChange` prop has been removed.
  - `actionsRowComponent` prop has been removed.

### Minor Changes

- 67aed15: Add new Container `medium` size. The old `medium` dimension is now 'small'.

## 7.0.0

### Major Changes

- 1b19649: We dropped the deprecated plugin `postcss-env-function` and we introduced a new syntax to access and use tokens inside you css. Tokens must now be declared using `token()` function notation instead of `env()`.
- 9f286fe: Refactoring List component by adding List.Li element to have more control over markers and markers color
- e490be0: Rename Dropdown into Popover and add `matchTriggerWidth` property

### Minor Changes

- a3da612: Improve rendering performance of some components
- 9079b08: Improved UX or Slider. Now the current value is shown on the right side (when `showValues` is `true`), while min/max are both visible at the same time.
- c53b855: Improve contrast for selection-controls
- 2b02b8c: Update Table loading state ui
- 904f1c5: Fix style for autofilled fields
- 7452a9d: Fix spring animation on the active tab item indicator

### Patch Changes

- 1ae5dd0: Fix grouped buttons style

## 6.1.0

### Minor Changes

- a4c6dc8: Update expanded row style for Table
- b5a1272: Add enw animation to the active Tabitem indicator
- 90bea7c: Reduce the size of the icon inside big buttons and set the icon weight to `solid`
- a66769b: Improve interaction feedback for Radio and Checkbox
- 95fc95e: Fix Chip paddings
- 3ef1838: Update `selectedLabel` to function and enable custom text for selected items.

## 6.0.0

### Major Changes

- 6706e4c: Rename all verical/horizontal padding/align props into vPadding/vAlign and hPadding/hAlign. This change has been made to keep a clean status of the code and reduce the required boilerplate.

### Minor Changes

- 9517873: Fix Tooltip not closing on blur
- 92d2378: Add new `onOpenChange` callback to Dropdown to return the current state when it changes.
- 14afd7e: Disable spellCheck on password field
- 5bca3b0: Add new `open` prop to Dropdown to programmatically open and close the dropdown

## 5.6.0

### Minor Changes

- c7da4b1: Update sprite export path and improve Icon description

## 5.5.0

### Minor Changes

- 30d5f4c: Add new gap property to Skeleton
- ee29f69: Add missing indeterminate internal state to checkbox
- 30d5f4c: Add new Table component
- 30d5f4c: Fix menu-item icon padding on small

## 5.4.0

### Minor Changes

- ddefb25: Add `disabled` property to dropdown. Disabled split buttons are don't trigger the dropdown anymore.
- ddefb25: Fix vertical alignment for inline code elements
- ffc093a: Fixed icon orientation for nested Disclosure components
- ddefb25: Fix Text size 14 not being applied
- 054a4c5: Fix Disclosure auto opening.

## 5.3.0

### Minor Changes

- [`6319696`](https://github.com/wonderflow-bv/wanda/commit/63196963b4de52351e6b9631f97c2004d789ce6d) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix types and default value for Stack, Masonry and Grid

## 5.2.0

### Minor Changes

- [`4d93699`](https://github.com/wonderflow-bv/wanda/commit/4d936994a89cf445504301fbf21901cfe31140a9) Thanks [@equinusocio](https://github.com/equinusocio)! - Plain link style is not longer added to link with class

* [`24266bd`](https://github.com/wonderflow-bv/wanda/commit/24266bd1b5ab548930eb577a1ab7ba7492c25ca9) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix Skeleton display

## 5.1.0

### Minor Changes

- [`32240ba`](https://github.com/wonderflow-bv/wanda/commit/32240bad3c8ba9e8a0de6b1c96b372be89778331) Thanks [@equinusocio](https://github.com/equinusocio)! - Add `weight` prop to Icon.

* [`4b4b58e`](https://github.com/wonderflow-bv/wanda/commit/4b4b58e6918e550b43a3bd134e906e36eac4d270) Thanks [@equinusocio](https://github.com/equinusocio)! - Update dependencies

- [`8c642ac`](https://github.com/wonderflow-bv/wanda/commit/8c642acd4fea4835c2670b604f39fa7e13e98412) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix List's default marker style

* [`40e8de4`](https://github.com/wonderflow-bv/wanda/commit/40e8de45f5638c1de4bf26a2f1612cfb3ac41263) Thanks [@equinusocio](https://github.com/equinusocio)! - Enable Card highlightOnHover also for non vibrant cards.

- [`07675a5`](https://github.com/wonderflow-bv/wanda/commit/07675a51fc79f23bc1064d721af05389a255618a) Thanks [@equinusocio](https://github.com/equinusocio)! - Update 16px icons to match the outline style. The solid style is now forced for icons sized 12px.

* [`143bd9e`](https://github.com/wonderflow-bv/wanda/commit/143bd9e9dcf3a14522ea90fc6b8c84cf8beb79bd) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix horizontal paddings on small buttons

- [#57](https://github.com/wonderflow-bv/wanda/pull/57) [`21db8e3`](https://github.com/wonderflow-bv/wanda/commit/21db8e3854b6069bff51024d8939bfaff1280497) Thanks [@equinusocio](https://github.com/equinusocio)! - Add new theme keys to handle vibrancy backgrounds. You can now use also `global-vibrancy-background-soft` and `global-vibrancy-background-hard`

### Patch Changes

- [`3c09f96`](https://github.com/wonderflow-bv/wanda/commit/3c09f96b39944e5bd63db1b6afa4a74522783f58) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix Skeleton display and box model

* [`86e47d6`](https://github.com/wonderflow-bv/wanda/commit/86e47d665b7949f9d47a8b5c3c765ef40354214e) Thanks [@equinusocio](https://github.com/equinusocio)! - Update some core deps and css output

## 5.0.0

### Major Changes

- [#45](https://github.com/wonderflow-bv/wanda/pull/45) [`a37a9c8`](https://github.com/wonderflow-bv/wanda/commit/a37a9c83b231410bdaee3f4127635f9b12329542) Thanks [@equinusocio](https://github.com/equinusocio)! - Iconography has been completely refactored and a new Duotone style is now live.

* [#47](https://github.com/wonderflow-bv/wanda/pull/47) [`676c15d`](https://github.com/wonderflow-bv/wanda/commit/676c15dbe5c03855a6316da6c1af6ce054dccfa6) Thanks [@equinusocio](https://github.com/equinusocio)! - Rename SkeletonBlock into Skeleton and drop related dependencies

- [#37](https://github.com/wonderflow-bv/wanda/pull/37) [`d2295c8`](https://github.com/wonderflow-bv/wanda/commit/d2295c87074488882537ffdbb3fed6c7891a3eac) Thanks [@equinusocio](https://github.com/equinusocio)! - Rename Icon's `icon` property into `source` to allow custom icons.

  We updated the Icon component in order to allow custom icons where needed. This introduce a breaking change on the `name` property which is now named `source`.

### Minor Changes

- [#46](https://github.com/wonderflow-bv/wanda/pull/46) [`b021143`](https://github.com/wonderflow-bv/wanda/commit/b0211437f7d67e2f7e3dfe78ceadba15c69787f9) Thanks [@equinusocio](https://github.com/equinusocio)! - Replace icon size token 14 with 12

### Patch Changes

- [`43ea50f`](https://github.com/wonderflow-bv/wanda/commit/43ea50f02b7d2863e1516685259b5e180ce03592) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix textfield show/hide password toggle position

* [`98ce5f9`](https://github.com/wonderflow-bv/wanda/commit/98ce5f91e499493980ed95f1e9cf756bb641a996) Thanks [@equinusocio](https://github.com/equinusocio)! - Remove tokens from data table and update theme

- [`944b069`](https://github.com/wonderflow-bv/wanda/commit/944b069168e12a21cd4a6cc2c53cf9a49f50d639) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix icon balancement with the new icons

* [`7c37cca`](https://github.com/wonderflow-bv/wanda/commit/7c37cca6d1abae2d7500e74b0bdead9a45671809) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix snackbar action style on active

## 5.0.0-beta.2

### Major Changes

- [#47](https://github.com/wonderflow-bv/wanda/pull/47) [`676c15d`](https://github.com/wonderflow-bv/wanda/commit/676c15dbe5c03855a6316da6c1af6ce054dccfa6) Thanks [@equinusocio](https://github.com/equinusocio)! - Rename SkeletonBlock into Skeleton and drop related dependencies

## 5.0.0-beta.1

### Major Changes

- [#45](https://github.com/wonderflow-bv/wanda/pull/45) [`a37a9c8`](https://github.com/wonderflow-bv/wanda/commit/a37a9c83b231410bdaee3f4127635f9b12329542) Thanks [@equinusocio](https://github.com/equinusocio)! - Iconography has been completely refactored and a new Duotone style is now live.

### Minor Changes

- [#46](https://github.com/wonderflow-bv/wanda/pull/46) [`b021143`](https://github.com/wonderflow-bv/wanda/commit/b0211437f7d67e2f7e3dfe78ceadba15c69787f9) Thanks [@equinusocio](https://github.com/equinusocio)! - Replace icon size token 14 with 12

### Patch Changes

- [`43ea50f`](https://github.com/wonderflow-bv/wanda/commit/43ea50f02b7d2863e1516685259b5e180ce03592) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix textfield show/hide password toggle position

* [`98ce5f9`](https://github.com/wonderflow-bv/wanda/commit/98ce5f91e499493980ed95f1e9cf756bb641a996) Thanks [@equinusocio](https://github.com/equinusocio)! - Remove tokens from data table and update theme

- [`944b069`](https://github.com/wonderflow-bv/wanda/commit/944b069168e12a21cd4a6cc2c53cf9a49f50d639) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix icon balancement with the new icons

* [`7c37cca`](https://github.com/wonderflow-bv/wanda/commit/7c37cca6d1abae2d7500e74b0bdead9a45671809) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix snackbar action style on active

## 5.0.0-beta.0

### Major Changes

- [#37](https://github.com/wonderflow-bv/wanda/pull/37) [`d2295c8`](https://github.com/wonderflow-bv/wanda/commit/d2295c87074488882537ffdbb3fed6c7891a3eac) Thanks [@equinusocio](https://github.com/equinusocio)! - Rename Icon's `icon` property into `source` to allow custom icons.

  We updated the Icon component in order to allow custom icons where needed. This introduce a breaking change on the `name` property which is now named `source`.

## 4.0.2

### Patch Changes

- [`5071650`](https://github.com/wonderflow-bv/wanda/commit/5071650f62e84d05ca4b4876ffff88da69a83221) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix starmeter filling space

## 4.0.1

### Patch Changes

- [#32](https://github.com/wonderflow-bv/wanda/pull/32) [`5a87233`](https://github.com/wonderflow-bv/wanda/commit/5a87233a7972f1b319648c3d447ac7ad5ae70236) Thanks [@equinusocio](https://github.com/equinusocio)! - fix imports

## 4.0.0

### Major Changes

- [`16b7844`](https://github.com/wonderflow-bv/wanda/commit/16b78449102b464a36bb5b23d82b6d3b0b55566f) Thanks [@equinusocio](https://github.com/equinusocio)! - Move icons as public deps and update installation guide

### Patch Changes

- [#28](https://github.com/wonderflow-bv/wanda/pull/28) [`e44a49c`](https://github.com/wonderflow-bv/wanda/commit/e44a49c27fec979aa80b4094369b2cc57d7682c4) Thanks [@equinusocio](https://github.com/equinusocio)! - Fix menu item decoration position

## 3.1.6

### Patch Changes

- Updated dependencies [[`5d6fda0`](https://github.com/wonderflow-bv/wanda/commit/5d6fda0a920f5915741a6b4f0c6bd9ac5903388d), [`23dcabe`](https://github.com/wonderflow-bv/wanda/commit/23dcabe148c3420b286d78e06abc82e627dfe083), [`4a4464b`](https://github.com/wonderflow-bv/wanda/commit/4a4464b034dbf18fc75ed355454ba7bbdd4b67b4)]:
  - @wonderflow/icons@1.0.3

## 3.1.5

### Patch Changes

- Updated dependencies [[`891d4ad`](https://github.com/wonderflow-bv/wanda/commit/891d4ade6b9aada229112d3be189cfed049aab87)]:
  - @wonderflow/icons@1.0.2

## 3.1.4

### Patch Changes

- Updated dependencies [aa91e4d]
  - @wonderflow/icons@1.0.1

## 3.1.3

### Patch Changes

- Updated dependencies [820149e]
- Updated dependencies [af81a6b]
  - @wonderflow/icons@3.1.3
