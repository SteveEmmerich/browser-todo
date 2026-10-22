# Browser Todo journey contract — v1

Human request: a simple React todo app, no server side, with browser localStorage. Human acceptance of an identified build is pending. These are the proposed observable criteria for that request; do not silently reduce them during implementation.

## TODO-001: Manage a local list

Preconditions: the app is served from a stable browser origin, JavaScript is enabled, and the user can access the page. Browser storage availability is reported separately.

1. The empty app shows a clear empty-list message, a labelled todo input, and an Add control.
2. Entering nonblank text and submitting by Enter or Add creates one visible todo. Surrounding whitespace is trimmed; blank input creates no todo. Adding clears the input and leaves it ready for another entry.
3. Each todo can be marked complete and active again. Its text and completion state are visibly distinguishable, with a labelled checkbox and keyboard support.
4. Each todo can be deleted using a control with an accessible name that identifies the todo.
5. Todo text is displayed literally. HTML-looking or script-looking text is not interpreted as markup or executed.
6. The layout remains usable in a narrow browser viewport and with keyboard navigation; controls have visible focus and text labels or accessible names.

## TODO-002: Retain the list in this browser

1. After adding todos, toggling one complete, and deleting another, reloading the same origin restores the remaining texts and completion states.
2. Closing and opening a new tab at the same origin retains the saved list when browser storage is available.
3. Todo IDs remain stable across reloads so duplicate texts can be managed independently.
4. No application server, sign-in, synchronization, analytics, remote font, or external asset is required. Static development/preview serving is tooling, not a server-side application component.

## TODO-003: Report storage failures honestly

1. If localStorage cannot be read or written, the app shows that changes cannot be reliably saved. The current tab can still manage an in-memory list, without claiming reload persistence.
2. Malformed or unsupported stored data is reported and is not silently overwritten by startup or subsequent in-memory changes.
3. Recovery that replaces unreadable saved data is explicit. Test this only with disposable pilot data; do not alter unrelated browser storage.

## Boundaries and verification

Out of scope: editing todo text, filters/search, due dates, reminders, drag sorting, accounts, collaboration, a backend, remote synchronization, and a new UI/test framework.

Planned verification uses Node's existing test runner for state/storage boundaries, TypeScript checking and a Vite production build, plus real browser interaction against the built bundle. Injected storage failures must be labelled fixtures; they do not establish browser compatibility. Storage reload, completion, deletion, keyboard input, literal text rendering, and narrow layout must also be observed in the actual app.

Record the source commit, production bundle digest, origin, browser/environment, actual commands and exit status, genuine screenshots/traces, CI workflow/run identity, and human decision. Local results remain advisory until workflow trust is configured. Any inspected source/build identity change requires reassessing acceptance.
