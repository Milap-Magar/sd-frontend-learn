# Frontend System Design Practice Projects

Short projects, each 1–3 days. Every one is framed like a frontend system-design
interview question: requirements, constraints, trade-offs. Build with plain
JS/TS or React, no backend needed (mock data or a public API is enough).

For each project, write a short `DESIGN.md` before coding:
1. Functional requirements (what the user can do)
2. Non-functional requirements (perf, accessibility, offline, scale)
3. Component tree + data flow
4. State: what lives where (URL, local, server cache, global)
5. API shape (even if mocked)
6. Trade-offs you chose and why

---

## 1. Infinite-Scroll News Feed
**Question:** Design a feed like Twitter/Reddit that loads 10k+ items smoothly.
- Virtualized list (render only visible rows, variable row height)
- Cursor-based pagination vs offset; prefetch next page near bottom
- Optimistic like/bookmark with rollback on failure
- Scroll position restore on back navigation
**Key topics:** virtualization, IntersectionObserver, normalization, optimistic UI

## 2. Typeahead / Autocomplete Search [DONE] - [/product.tsx]
**Question:** Design a search box for an e-commerce site with 1M products.
- Debounce vs throttle; cancel stale requests (AbortController)
- Client-side LRU cache keyed by query
- Keyboard nav (↑ ↓ Enter Esc), ARIA combobox pattern
- Highlight matched text; handle race conditions
**Key topics:** request cancellation, caching, a11y, race conditions

## 3. Image Gallery / Carousel
**Question:** Design a photo gallery (like Google Photos grid) for 5k images.
- Lazy loading with placeholder (blur-up / LQIP)
- Responsive `srcset` + `sizes`; CLS prevention via aspect ratio
- Lightbox with preloading of neighbors
- Justified-grid layout algorithm
**Key topics:** image perf, layout shift, preloading strategy

## 4. Real-Time Chat Window
**Question:** Design the frontend for a chat app (Slack-like channel view).
- WebSocket vs long-polling vs SSE; reconnect with backoff
- Message ordering, dedupe by id, "sending / sent / failed" states
- Reverse infinite scroll (load older messages upward without jump)
- Typing indicator, unread divider, draft persistence
**Key topics:** real-time transport, local-first state, scroll anchoring

## 5. Kanban Board (Trello clone)
**Question:** Design a drag-and-drop board with columns and cards.
- Drag-and-drop (Pointer Events or dnd-kit), keyboard DnD for a11y
- Fractional indexing for ordering (avoid re-indexing whole column)
- Optimistic moves + conflict handling
- Persist to localStorage; schema versioning/migration
**Key topics:** DnD, ordering algorithms, optimistic updates

## 6. Form Builder / Multi-Step Wizard
**Question:** Design a dynamic form engine driven by JSON schema.
- Schema → UI rendering, conditional fields
- Validation: sync + async (username availability), field-level vs form-level
- Resume from draft; URL-synced step
- Large forms: avoid re-rendering everything on each keystroke
**Key topics:** controlled vs uncontrolled, validation layering, render perf

## 7. Collaborative Text Editor (lite)
**Question:** Design a notes editor two users can edit at once.
- contenteditable vs textarea vs custom model
- Conflict resolution: OT vs CRDT (implement a tiny CRDT, e.g. RGA or Yjs)
- Presence cursors, undo/redo stack
- Autosave with debounce + "saved / unsaved" indicator
**Key topics:** CRDT basics, undo model, persistence

## 8. Dashboard with Live Metrics
**Question:** Design an analytics dashboard with 20 widgets updating every 5s.
- Polling vs SSE; batch updates to avoid 20 separate re-renders
- Widget-level error boundaries and loading skeletons
- Resizable/draggable grid layout saved per user
- Charts: canvas vs SVG trade-off at 10k points
**Key topics:** render batching, error isolation, canvas vs SVG

## 9. Video Player with Adaptive Streaming
**Question:** Design a YouTube-style player UI.
- HLS/DASH basics via hls.js; quality switcher
- Custom controls, keyboard shortcuts, captions (WebVTT)
- Thumbnail preview on seek bar (sprite sheet)
- Watch-progress persistence, Picture-in-Picture
**Key topics:** media APIs, buffering UX, accessibility

## 10. Offline-First Todo / Notes (PWA)
**Question:** Design an app that works fully offline and syncs later.
- Service worker caching strategies (cache-first, network-first, SWR)
- IndexedDB for data; sync queue with retry
- Conflict detection (last-write-wins vs manual merge)
- Install prompt, background sync
**Key topics:** PWA, IndexedDB, sync strategies

## 11. File Uploader
**Question:** Design a drag-and-drop uploader for files up to 2 GB.
- Chunked upload, resumable (track uploaded chunks)
- Parallel uploads with concurrency limit (e.g. 3 at a time)
- Progress per file + aggregate; cancel/retry
- Client-side image compression / preview with Web Workers
**Key topics:** chunking, concurrency control, Web Workers

## 12. Design System Component Library
**Question:** Design a reusable component library for a company.
- Tokens (color, spacing, typography) → CSS variables, theming (dark mode)
- Accessible primitives: Modal (focus trap), Dropdown, Tabs, Toast
- Compound components vs props API; polymorphic `as` prop
- Storybook, visual regression tests, tree-shakeable build
**Key topics:** API design, a11y patterns, theming, bundling

## 13. Micro-Frontend Shell
**Question:** Design a host app that loads 3 independently deployed apps.
- Module Federation vs iframes vs Web Components
- Shared dependencies, version conflicts
- Cross-app communication (custom events / shared store)
- Routing ownership, CSS isolation
**Key topics:** architecture, isolation, deployment independence

## 14. Rate-Limited API Client + Caching Layer
**Question:** Design the data layer for a frontend hitting a rate-limited API.
- Request deduplication, stale-while-revalidate, TTL cache
- Retry with exponential backoff + jitter; circuit breaker
- Pagination cache + invalidation on mutation
- Build a mini React Query from scratch
**Key topics:** caching, resilience, normalization

## 15. Spreadsheet (lite)
**Question:** Design a 1000x100 cell spreadsheet with formulas.
- 2D virtualization (rows + columns)
- Formula parsing + dependency graph; recompute only dirty cells
- Cell selection, range copy/paste, keyboard navigation
- Undo/redo with command pattern
**Key topics:** DAG evaluation, 2D virtualization, command pattern

---

## Suggested order
Beginner → 2[DONE], 3[DONE], 6[DONE], 11
Intermediate → 1, 5, 8, 10, 14
Advanced → 4, 7, 9, 12, 13, 15

## How to practice as an interview
1. Set a 45-minute timer. Write only DESIGN.md (no code).
2. Then build the MVP in a day or two.
3. Revisit DESIGN.md: what did you get wrong? Note it.
