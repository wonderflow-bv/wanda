---
"@wonderflow/react-components": minor
---

product card: add the `onExpandedChange` prop and make the `expandable` toggle independent from the number of KPIs with a value, so the consumer can provide the extra KPIs on demand (even asynchronously: they animate in when they arrive, and stay mounted until the collapse animation ends when withdrawn)
