# @wonderflow/react-components

## 14.2.6

### Patch Changes

- fa5ddd9: fix minor product card media issues

## 14.2.5

### Patch Changes

- 6aba27a: fix card media appearance

## 14.2.4

### Patch Changes

- 7d95197: fix on product card preloading logic

## 14.2.3

### Patch Changes

- 0f4c3f9: fix product card cover images preloading

## 14.2.2

### Patch Changes

- cba14dc: minor fix on product card colored view

## 14.2.1

### Patch Changes

- 5403942: minor upgrade of catalog cards coloring

## 14.2.0

### Minor Changes

- 594bd4a: fix product card colored cover

## 14.1.0

### Minor Changes

- e487b03: add colored product card cover

## 14.0.8

## 14.0.7

## 14.0.6

### Patch Changes

- 6387249: card component ui bugfix

## 14.0.5

## 14.0.4

## 14.0.3

## 14.0.2

### Patch Changes

- 43638ef: Update babel deps

## 14.0.1

### Patch Changes

- 96b6ab6: Update ahooks

## 14.0.0

## 13.0.0

### Patch Changes

- ba873dc: - Add support for `Multiple Overlay`;
  - Add the ability to handle `Menu`;
  - Add automatic display of `Trendline`;
  - Add the possibility to `Reverse Index` for vertical layout;
  - Add the possibility to `Mirror Domains` for mixed positive and negative values;
  - Add `Bar Chart` which inherits from `CartesianBase` features such as `Brush` and `Legend`;
  - Add the ability to automatically sort Bar Chart data by `key` and `value` both `ascending` and `descending`;

## 12.11.0

### Minor Changes

- a48c0af: Add `showPercentSign` prop to `Circular Progress` to conditionally display the symbol next to the value

## 12.10.0

## 12.9.0

### Minor Changes

- 4451fef: Removed AnimatePresence from `Spinner`component which was causing the browser to not respond in certain contexts (e.g. Spinner inside Popover).
- c2d8814: Add a `closeOnInsideClick` prop to the `Popover` component and fixed the z-index value

## 12.8.0

### Patch Changes

- af53078c: Fix `Card` component content width.

## 12.7.0

## 12.6.0

## 12.5.2

### Patch Changes

- 731a613c: Fix value format and typo

## 12.5.1

### Patch Changes

- 8067ef0c: Fix icon color in `Snackbar` component

## 12.5.0

## 12.4.0

## 12.3.0

### Minor Changes

- 77dd8c9f: - Add new icons `column` and `folder-link`;
  - Minor change to `Symbol` component;

### Patch Changes

- 66c5a425: - Fix icons color on `Textfield` component when disabled/invalid;
  - Minor style fix on `Tooltip` and `Symbol` components;
- cea09275: - Small style fix on `Select`component

## 12.2.0

### Minor Changes

- e8f82f6d: Feat: add new `ProductCard` component
- da8984fa: Feat: Add `invalid` state to `Select` component. Add a `minRows` and `maxRows` props as a constraint to component `Textfield` textarea.

### Patch Changes

- bdb92623: Fix: `Textfield` icon button style when disabled
- 7ebd2ed9: Fix: `Snackbar` icon alignment w/o title
- 991d351a: Fix: `IconButton` regular size

## 12.1.4

### Patch Changes

- c7c348ca: Fix `Select`, `selectionControls`, `Slider`, `Textfield` disabled label color

## 12.1.3

### Patch Changes

- 05397b9d: Fix `Select` and `Textfield` font size and height

## 12.1.2

### Patch Changes

- bece3034: Fix `Icon Button` block size, `Star Meter` prevent break word, `Text` prevent creating an id when anchor or id are not provided

## 12.1.1

### Patch Changes

- 379ef7e4: Fix: prevent Portal to fail during SSR

## 12.1.0

## 12.0.0

### Major Changes

- 2ff3ba76: Add new `Typography Tokens` and `Text` component, remove `Title` and `Prose` components and old configurations.

### Minor Changes

- 413bc8e6: Feat `Select` add message property

### Patch Changes

- a6d31fee: Fix `Tooltip` indicator
- 71938f17: Fix `Avatar`: remove default image while src is provided

## 11.0.7

### Patch Changes

- 058bc702: Fix `Selection-Controls` manage vertical alignment and long labels

## 11.0.6

### Patch Changes

- 1740e15f: Fix `Disclosure` onToggle action

## 11.0.5

### Patch Changes

- f166f7c9: `Disclosure` fix overflow and minor stories changes `Autocomplete` fix accessibility
- d095f355: Fix `useBreakpointsConfig` useEffect dependencies
- f5891295: `Card` minor change to CSS extensibility
- 91b34369: Update `Symbols`, add `Selection-Controls` cursor pointer on hover
- 4f8732a0: `Selection Controls` minor change to label position

## 11.0.4

### Patch Changes

- d75d70b2: add `Icon` send-message
- c2906aa7: `Select` and `Slider` fix label line height to match design
- ad85be90: `Table` fix overflow-x

## 11.0.3

### Patch Changes

- 2fe0ad28: Fix `Modal` content vertical alignment and story

## 11.0.2

### Patch Changes

- 24384364: Remove default root value to prevent SSR issues

## 11.0.1

### Patch Changes

- b4d8cbf9: Minor changes to `Popover`, `useBreakpoints`, `useBreakpointsConfig`
- bbf29d66: Fix internal `Card` element height and change `Select` default icon

## 11.0.0

### Major Changes

- 144fb562: Fix(Modal): nested elements bahaviour, refactor and minor fix
- 215d0a28: Add Container props and change style, add new tokens
- 94bcf39b: Modal initial rework

### Minor Changes

- 347d5271: Docs(storybook): extend and fix stories
- e501986f: Feat(useBreakPointsConfig) change typing
- c9aa0e76: Fix Popover compatibility with autofocus
- 9e3344e7: Imporve utility functions hooks
- 92194ab3: Add useBreakpoints hook
- 278e96b7: Chore()
- 40cf60a7: Fix(tab): highlight bar now update when tab changed programmatically
- bdcfbb6b: Refactor(useBreakpoints)
- b7a8883a: Add useSSR & usePopupWrapper hooks, extend samples, bug fix and improvements
- 0b95d867: Feat: add useBreakpointsConfig hook + refactor
- 1a284774: Container clean up stories

### Patch Changes

- 6c75d326: Fix typing on Hooks
- 89421226: Fix(Chip): add white space no wrap

## 10.20.0

### Minor Changes

- 056a55a: Fix Portal focus
- f4ec0a9: Fix Menu Item and Separator Style in Menu according to design

## 10.19.0

### Minor Changes

- 3515976: Render Tooltip, Popover and Autocomplete as Portals

### Patch Changes

- c84d2fd: Docs fix and add test
- e618b68: Replace uvu tests with jest
- a89af9f: Tests clean code and add lcov report
- d87103a: Update packages
- 1a874f7: Tests add config
- ca5b9d7: Fix Radio style
- adeb667: Minor fixes, add tests
- bc5888f: Minor fixes, add tests
- 2345ecc: Add Tests

## 10.18.2

### Patch Changes

- aac8cec: Add test script
- 7dd7bb9: Modify test script
- 6286985: Add Accessibility and Storybook test suite

## 10.18.1

### Patch Changes

- 3457238: Fix `Textfield` prevent invalid state style while disabled

## 10.18.0

### Minor Changes

- 55b45da: Add hint text in 'Textfield' component

### Patch Changes

- 644b9d0: Fix `Input Group` wrong alignment when in small size version

## 10.17.1

### Patch Changes

- 4d557f0: Fix `button` vertical padding

## 10.17.0

### Minor Changes

- e006ee8: Feat(inputs) add label and disable properties where missing
- 93068ca: Feat(MenuItem): add subtext property

## 10.16.0

### Minor Changes

- 96f1b97: Fix `Snackbar` icon size to match design
- a4ea9c3: Add new `icon` property to `Chip` component

## 10.15.0

### Patch Changes

- 318bd59: Update internal deps

## 10.14.0

## 10.13.0

### Minor Changes

- 2d32500: Add new buttons variants and update styles
- 79da1ec: Fix table overflow when is not scrollable

## 10.12.0

### Minor Changes

- 2743611: Fix Drawer header padding to consider safe areas
- ed86a10: Add new TokenTypes for colors and highlight colors
- 4178e7b: Deprecating shared eslint-config
- bfedcc0: fix `bordered` props on `Card` when not dimmed
- c4ccb17: Add missing dependencies

## 10.11.0

### Minor Changes

- 0d77a55: Fix tab rendering if icon is missing from panel
- 44c486d: Fix ClampText expand action tooltip text
- 05033fe: Add new `Expander` component
- e41b912: Add new `selectSubRows` property to Table
- 7456469: Add core styles to the inner `core` css layer to allow easier overrides
- 2943320: Update style for inline code

## 10.10.0

### Minor Changes

- 23862b2: Add support for CSS layers.

### Patch Changes

- 0fe92eb: Update types and clean code

## 10.9.1

### Patch Changes

- bb40f82: Fix accordion overflow
- 673dd4a: Fix Accordion namespace

## 10.9.0

### Minor Changes

- 52626c3: Add Accordion component

## 10.8.0

### Minor Changes

- 7220c12: Change the way CSS modules are imported to cover a wide use cases.
- fd85d2c: Fix clamp-text padding when not expandable

## 10.8.0-beta.0

### Minor Changes

- 7220c12: Change the way CSS modules are imported to cover a wide use cases.
- fd85d2c: Fix clamp-text padding when not expandable

## 10.7.1

## 10.7.0

### Minor Changes

- 09f1cb6: Rename tab `symbol` prop to `icon` to keep consistency.
- 8249998: Fix select size when fullwidth

## 10.6.0

### Minor Changes

- d667561: Refactoring ResponsiveContext and provider
- 49ab7ab: Fix List item marker sizes
- c18667f: Revert Responsive context changes due to SSR issues

## 10.5.0

### Minor Changes

- 5f772fe: Fix Drawer overflow on small resolutions

## 10.4.0

### Minor Changes

- 500fb22: Fix Card bordered style
- 77fc711: Align Button interaction styles

## 10.3.0

### Minor Changes

- b22f991: Fix Popover positioning
- f245d86: Update html tag for info state to allow flow content inside.

## 10.2.0

### Minor Changes

- 61e06bf: Minor fixes
- d4e5646: Fix disappearing table select all rows checkbox while loading.
- 83af6ce: Add new elevation mixins

## 10.1.0

### Minor Changes

- 6b898ba: Add `onRowExpandChange` property to Table
- ecff4ad: Remove deprecated Dropdown component.
- 82d5fd2: Restore pointer-events on elements inside overlay container.

## 10.0.0

### Major Changes

- 40dd1ee: Rename iconography to Symbols. IconNames type is now SymbolNames. `<Icon />` component is not `<Symbol />`.
- 40dd1ee: Changes
- 40dd1ee: Update deps
- 40dd1ee: Change start and end into prefix and suffix for Input Group component
- 40dd1ee: Add new highlight colors to Chip
- 40dd1ee: Various core configuration updates
- 40dd1ee: Fix tab active state
- 40dd1ee: Add auto id generator for titles

### Minor Changes

- 40dd1ee: Fix Drawer max width and animation
- 40dd1ee: Add new `maxWidth` property to Stack component
- 7c94309: Add `expandOnHover` prop to ClampText
- 40dd1ee: Fix selection control space when hidden
- 40dd1ee: Changes
- 40dd1ee: Add new `anchor` property to Title to add anchor trigger
- 7c94309: Fix Table expand row button on page change
- 40dd1ee: Minor fixes
- 40dd1ee: ALign versions and deps
- 40dd1ee: Minor fixes
- 40dd1ee: Update Title auto id generation
- 40dd1ee: Add new `dimension` property to tabs
- 40dd1ee: Update design of Snackbar component
- 40dd1ee: Minor fixes
- 40dd1ee: Dafuck
- 40dd1ee: Add Responsive hook, provider and context
- 40dd1ee: Update versions
- 7c94309: Fix pageSize when data length is 0

## 10.0.0-beta.2

### Minor Changes

- 4e0da88: Add `expandOnHover` prop to ClampText

## 10.0.0-beta.1

### Minor Changes

- c8a28d1: Fix Table expand row button on page change
- b557d07: Fix pageSize when data length is 0

## 10.0.0-beta.0

### Major Changes

- a42f78d: Changes

## 9.5.1

### Patch Changes

- 8fed3a4: Minor fixes

## 10.0.0-next.5

### Minor Changes

- b8c784b: Fix Drawer max width and animation
- 3275e5a: Fix selection control space when hidden
- 048c866: Update design of Snackbar component
- 79ab157: Add Responsive hook, provider and context

## 10.0.0-next.4

### Minor Changes

- d6fe41d: Update Title auto id generation

## 10.0.0-next.3

### Minor Changes

- 03bb99f: Dafuck

## 10.0.0-next.2

### Minor Changes

- ed181f9: ALign versions and deps

## 10.0.0-next.1

### Minor Changes

- 22d0757: Update versions

## 10.0.0-next.0

### Major Changes

- 01f34e9: Rename iconography to Symbols. IconNames type is now SymbolNames. `<Icon />` component is not `<Symbol />`.
- 2be339b: Update deps
- 8ac30a5: Add new highlight colors to Chip
- 748ca0d: Fix tab active state
- 01b15ff: Add auto id generator for titles

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

- [#45](https://github.com/wonderflow-bv/wanda/pull/45) [`a37a9c8`](https://github.com/wonderflow-bv/wanda/commit/a37a9c83b231410bdaee3f4127635f9b12329542) Thanks [@equinusocio](https://github.com/equinusocio)! - Symbols has been completely refactored and a new Duotone style is now live.

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

- [#45](https://github.com/wonderflow-bv/wanda/pull/45) [`a37a9c8`](https://github.com/wonderflow-bv/wanda/commit/a37a9c83b231410bdaee3f4127635f9b12329542) Thanks [@equinusocio](https://github.com/equinusocio)! - Symbols has been completely refactored and a new Duotone style is now live.

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
  - @wonderflow/symbols@1.0.3

## 3.1.5

### Patch Changes

- Updated dependencies [[`891d4ad`](https://github.com/wonderflow-bv/wanda/commit/891d4ade6b9aada229112d3be189cfed049aab87)]:
  - @wonderflow/symbols@1.0.2

## 3.1.4

### Patch Changes

- Updated dependencies [aa91e4d]
  - @wonderflow/symbols@1.0.1

## 3.1.3

### Patch Changes

- Updated dependencies [820149e]
- Updated dependencies [af81a6b]
  - @wonderflow/symbols@3.1.3
