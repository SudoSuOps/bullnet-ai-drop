# Brand guidelines (locked 2026-11-13)

## One B. One identity.
The flowing B with the diagonal crossing and the green block is the only BullNet symbol. Do not redraw it, add horns, nodes, arrows or letters to it, or create logos for individual products. The Swarm, Hive, Node, Vault, Sovereign ID, Flight Sheet, Defendable and Capital Intelligence are capabilities inside one system and are distinguished by typography, linework and layout.

Primary presentation: Platinum B on Obsidian with the Signal Green block.

In code the mark is defined once in `components/MarkSprite.tsx` and reused with `<use href="#mark" />`. Files are in `public/assets/brand`.

## Colour
| Name | Hex | Use |
| --- | --- | --- |
| Obsidian | `#0B0F14` | Page background |
| Graphite | `#343438` | Rules, borders, the mark on light backgrounds |
| Platinum | `#E5E8EB` | Text, emphasis, the mark on dark backgrounds |
| Signal Green | `#8ED13B` | Intelligence activity, authorized processes, highlighted interaction |
| White | `#FFFFFF` | Peak emphasis, light backgrounds |

Supporting neutrals in the CSS (`--steel` for secondary text, a darker panel fill) exist for legibility. Graphite as a panel fill made secondary text hard to read, so it is used for lines only.

Green is used sparingly and never as the only signal for verification or security status. Gold and brass are retired.

## Typography
| Role | Face | Notes |
| --- | --- | --- |
| Headlines, wordmark | Archivo Variable | Expanded width, weight 700 to 800, uppercase |
| Body | IBM Plex Sans | 400, 500, 600 |
| Data, IDs, receipts, labels | IBM Plex Mono | 400, 500, uppercase with tracking for labels |

All three are open-source and self-hosted through `@fontsource`, so no request leaves the site for fonts.

The BULLNET wordmark in the lockups is Archivo expanded, weight 600, tracked 0.2em, outlined. It is interim until the founder's typography direction is complete.

## Layout and components
Square corners, hairline rules, mono title-block labels with section numbers, 12 to 28px panel padding. Tokens and components are in `styles/globals.css`.

## Motion
One ambient element (the hero network). Transitions under one second. Everything respects `prefers-reduced-motion`.

## Accessibility
Visible focus ring on every control, `aria-pressed` on selectors, labelled form fields with text errors, status always in words.

## Open items
- Small-size cut of the B for 32px and below (the tapered tails thin out)
- Trademark clearance
