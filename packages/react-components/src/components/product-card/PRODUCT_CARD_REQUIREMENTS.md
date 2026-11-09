# ProductCard — Requirement Sheet

Source: `product-card.tsx` and its sub-components (`product-card-top-bar`, `product-card-header`, `product-card-media`, `product-card-kpis`, `product-card-footer`).
Design reference: Market Monitor card (Figma node `1190:30702`), 272px wide.
Goal: any further redesign must preserve every capability below. Visual styling is free to change; behaviour, data and states are not.

## 0. Structure overview

Single column, top to bottom:

1. Overlay actions layer (optional, absolutely positioned over the whole card)
2. Top bar (only if `sourceLabel`) + separator
3. Cover: media collage **or** colored cover with initials (mutually exclusive), with an optional badge floating top-right
4. Header: subtitle, title, optional description
5. KPIs list
6. Children slot (free content)
7. Separator (only if `footer` is set or loading) + footer slot

The card is exposed as a compound component: `ProductCard.TopBar`, `.Media`, `.Header`, `.Kpis`, `.Footer` (also usable standalone).

Root: 1px `--dimmed-1` border (default on), radius 12, elevation 1.

---

## 1. Input params

### 1.1 Card-level

| Prop | Type | Default | Behaviour |
|---|---|---|---|
| `bordered` | `boolean` | `true` | Adds border for more contrast. |
| `highlightOnHover` | `boolean` | `false` | Raises elevation on hover (resting 1 → hover 2). |
| `onClick` | `() => void` | – | Makes the whole card clickable (also enables hover highlight). Ignored while loading. |
| `isLoading` | `boolean` | `false` | Skeleton state for the whole card (see §6). |
| `hasColoredCover` | `boolean` | `false` | Shows colored cover with title initials instead of media (see §5.2). |
| `sourceLabel` | `string` | – | Marketplace name. The top bar is rendered only when set. |
| `sourceIcon` | `ReactNode` | – | Marketplace logo, shown in a 16px slot before the label. |
| `badge` | `string` | – | Yellow chip over the top-right corner of the cover (see §3). |
| `overlayActions` | `ReactNode` | – | Content shown in an overlay layer (centered, 24px h-padding). |
| `footer` | `ReactNode` | – | Free content for the footer slot. |
| `children` | `ReactNode` | – | Free content between KPIs and footer (16px h-padding). Hidden while loading. |
| `className`, `style`, other HTML props | – | – | Forwarded to the root. Ref is forwarded to the root `div`. |

**Interaction exclusivity rules (must be preserved):**

| Feature | Shown only when |
|---|---|
| Overlay actions | `overlayActions` set **and** no `onClick` **and** not loading |
| Clickable card | `onClick` set **and** not loading |
| Hover highlight | `onClick` set **or** `highlightOnHover` |

The top bar is not interactive. The overlay covers the whole card, top bar included.

### 1.2 Media

| Prop | Type | Default | Behaviour |
|---|---|---|---|
| `source` | `string[]` | – | Image URLs. Max **4** used (rest ignored). |
| `ratio` | `string` (CSS ratio syntax) | `'1'` | Aspect ratio of the media block. |

### 1.3 Header

| Prop | Type | Default | Behaviour |
|---|---|---|---|
| `title` | `string` | – | Product name. Clamped to `titleRows` lines. |
| `titleRows` | `number` | `3` | Max title lines (the title is clamped; the header height follows its content). |
| `subtitle` | `string` | – | Product brand / subtitle, above the title. Rendered as written (no uppercase). |
| `description` | `string` | – | Supported by `ProductCard.Header` but **not forwarded** by `ProductCard` (only usable when composing Header manually). Clamped to `descriptionRows`. |
| `descriptionRows` | `number` | `3` | Same caveat as `description`. |

### 1.4 KPIs

| Prop | Type | Default | Behaviour |
|---|---|---|---|
| `rating` | `number` | – | Feedback star rating. |
| `nps` | `number` | – | Net Promoter Score. |
| `feedbackCount` | `number` | – | Number of feedback items. |
| `votesRating` | `number` | – | Votes star rating. |
| `votesCount` | `number` | – | Number of votes. |
| `sentiment` | `number` | – | Sentiment index. |
| `tgw` | `number` | – | TGW value. |
| `priceMin` / `priceMax` | `number` | – | Price range bounds. |
| `currency` | `Currency` | `'EUR'` | ISO 4217; one of `AED AUD BRL CAD EGP EUR GBP INR JPY MXN PLN SAR SEK SGD TRY USD ZAR`. |
| `currencyDecimals` | `number` | `0` | Decimals for price. |
| `groups` | `number` | – | Groups count. |
| `users` / `usersCap` | `number` | – | Users value and optional cap. |
| `skus` / `skusCap` | `number` | – | SKUs value and optional cap. |
| `kpiItems` | `number` | `3` | Maximum number of KPI rows rendered (the first ones in the fixed order that have a value), and number of skeleton rows when loading. |
| `kpisRowGap` | design-token `space` | `8` | Gap between KPI rows. |

---

## 2. KPIs shown

Rules common to all KPIs:
- A KPI row is rendered **only if it has a value** (undefined / non-number → row hidden).
- Rendering order is fixed as in the table below.
- Each row = 16px solid icon + regular-weight value, `body-2` text in `--dimmed-7`, 6px gap between icon and value.
- Block height follows the rendered rows (no reserved height), plus padding (8px top, 16px bottom, 16px horizontal).
- Formats: **decimal** KPIs use 1 decimal; **count** KPIs use the compact notation (`formatKpiValue(..., { compact: true })`, e.g. `1234` → `1.2K`, `234000` → `234K`), applied to value and cap.

| # | KPI | Prop(s) | Icon | Format | Clamp | Icon color rule |
|---|---|---|---|---|---|---|
| 1 | Feedback rating | `rating` | `feedback-rating` | 1 decimal | 0 – 5 | Yellow (`color.yellow.30`) when value **> 3.99** |
| 2 | NPS | `nps` | `nps` | integer | −100 – 100 | default |
| 3 | Feedback count | `feedbackCount` | `message` | compact | min 0 | default |
| 4 | Votes rating | `votesRating` | `star` | 1 decimal | 0 – 5 | Yellow (`color.yellow.20`) when value **> 3.99** |
| 5 | Votes count | `votesCount` | `votes-count` | compact | min 0 | default |
| 6 | Sentiment | `sentiment` | `hearts-suit` | 1 decimal | −1 – 1 | Red (`--highlight-red-foreground`) when value **> 0.5** |
| 7 | TGW | `tgw` | `frown` | 1 decimal | min 0 | default |
| 8 | Price | `priceMin`, `priceMax`, `currency`, `currencyDecimals` | `tags` | see below | – | default |
| 9 | Groups | `groups` | `grid` | compact | min 0 | default |
| 10 | Users | `users`, `usersCap` | `users` | compact, `value` or `value / cap` | min 0 | Red when `users > usersCap` (cap > 0) |
| 11 | SKUs | `skus`, `skusCap` | `rectangle-barcode` | compact, `value` or `value / cap` | min 0 | Red when `skus > skusCap` (cap > 0) |

Notes:
- Values are clamped to their range (e.g. rating 7 → `5.0`).
- Cap display: `"<value> / <cap>"` only if `cap > 0`.
- Price formatting:
  - both bounds → `"min - max <currency symbol>"` (bounds are sorted, so min ≤ max regardless of input order)
  - one bound only → `"value <currency symbol>"`
  - none → hidden
- A value of `0` is formatted as `"0"` (truthy string) and therefore is shown.
- Note the semantics of the colors: yellow highlights a *high* rating (> 3.99); red highlights a *high* sentiment (> 0.5) and *over-cap* usage.

---

## 3. Top bar and badge

| Element | Condition | Rendering |
|---|---|---|
| Top bar | `sourceLabel` set | Three decorative 10px dots (`--dimmed-4/3/2`, 20% opacity, 4px gap) and a pill (`--dimmed-0`, radius 6, 23px high, 4px h-padding) with `sourceIcon` (16px slot) and `sourceLabel` in `body-3`. A separator sits below. Loading: skeleton pill. |
| Badge | `badge` set, not loading, and the card has a cover (media or colored cover) | `Chip color="yellow"` absolutely positioned 16px from the right and 10px from the top of the cover. Stays below the overlay layer. |

Any other chips/tags must be passed via the `children` or `footer` slots.

---

## 4. Footer states

The footer is a consumer-supplied slot (`footer` prop / `ProductCard.Footer` children). It has no built-in content (stories use plain `body-3` text such as a date, e.g. `"Apr 2023"`).

| State | Condition | Separator above | Rendering |
|---|---|---|---|
| Loading | `isLoading` | yes | Skeleton bar, 24px high, 16px padding (footer content not rendered) |
| With content | `footer` provided | yes | Content with 16px padding |
| Empty | no `footer` | no | No content; padding collapses to `0 16px 16px` (bottom spacing only) |

The footer block sticks to the bottom of the card, so when a grid stretches cards to the same height the footers stay aligned.

---

## 5. Other data shown in the card

### 5.1 Header
- Padding 16 / 16 / 8 (top / horizontal / bottom).
- **Subtitle** (brand) — `subtitle-2` text (14 semibold); hidden if empty.
- **Title** — `heading-6`, multi-line clamp (default 3); hidden if empty.
- **Description** — `body-2`, multi-line clamp (default 3); only via Header composition (see 1.3).

### 5.2 Cover (mutually exclusive)
| Mode | Condition | Rendering |
|---|---|---|
| Colored cover | `hasColoredCover` **and** no `source` | Solid background colored deterministically from the title (hash → color family from design tokens, excluding `support`, shade index 5), showing the **first two letters of the title** in white `heading-1`, centered. |
| Media collage | `!hasColoredCover` **and** `source` provided | Up to 4 images with `background-size: contain` (the whole image is always visible, never cropped), each with a 1px `--dimmed-1` border, aspect ratio from `ratio`. |
| None | otherwise | No cover (and no badge). |

Media collage layouts (by image count):
| Images | Layout |
|---|---|
| 1 | single full image |
| 2 | 1 row × 2 columns |
| 3 | 2×2 grid; second image spans both rows (right column), others stacked/left |
| 4 | 2×2 grid |

Image loading: images are preloaded; on error/abort a placeholder image is used (`https://wonderimages.gumlet.io/placeholders/image-placeholder.png`). Image list is computed on mount only (does not react to later `source` changes).

### 5.3 Overlay actions
Centered content layer over the whole card, only under the exclusivity rules in §1.1.

### 5.4 Children slot
Free content between KPIs and footer.

---

## 6. Loading state (skeletons)

| Area | Skeleton |
|---|---|
| Top bar | Skeleton pill (the dots stay) |
| Media | Full-size block, no border radius |
| Badge | Hidden |
| Header | Subtitle (50% width) if provided; title (28px high, 60%) if provided; description (80%) if provided |
| KPIs | `kpiItems` bars, 20px high, 50% width |
| Children | Hidden |
| Footer | Separator + 24px bar |
| Interaction | Click disabled; overlay actions hidden |

Skeleton placeholders depend on which props are provided, so the layout stays stable between loading and loaded.

---

## 7. Non-functional requirements to keep
- Fixed 16px horizontal padding in top bar, header, KPIs, children, footer; keep it consistent.
- Card height depends on its content (no fixed or reserved heights). In a grid that stretches cards to the same height, the footer stays aligned to the bottom.
- Elevation: resting 1, hover 2 when interactive.
- `data-inner-element` hooks (`ProductCard-OverlayActions`, `-TopBar`, `-Badge`, `-Media`, `-Header`, `-Kpis`, `-Children`, `-Footer`) and `data-card-bordered` / `data-card-clickable` attributes are used for styling/testing; keep or migrate deliberately.
- Ref forwarding to root and sub-components; named exports only.
