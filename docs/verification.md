# Pilot verification — 2026-10-21

Task: [browser-todo#1](https://github.com/SteveEmmerich/browser-todo/issues/1). Review: [draft PR #2](https://github.com/SteveEmmerich/browser-todo/pull/2). The task recorded scope, owner, actual Developer thread, attempt, environment and remote base before application coding. This was a manual assignment in the existing Developer chat; Hlidskalf did not automatically dispatch it.

## Identified production bundle

These SHA-256 values identify the final local production bundle used by the browser captures. The exact published source head and latest workflow run are recorded on PR #2. Any source/build change requires reassessing acceptance; an older passing CI run is not evidence for a different revision.

| File | SHA-256 |
| --- | --- |
| `assets/index-COmHvEVH.js` | `57FD4F2B0BFF52F033D8290CDFF0932075371E97E075AB64DA4943D8D8BDDF62` |
| `assets/index-UTVukKKV.css` | `F6EFB2DEE2165872BD3C5BE4527C90B8DCF95AD931F9B7C512A0FCA7B4407439` |
| `index.html` | `6E2E610AA84449F30D19D800FDC1CB82D2F489BB94CAC950B8C9EFFA06B6701B` |

The initial remote run [39705710848](https://github.com/SteveEmmerich/browser-todo/actions/runs/39705710848) passed clean install, eight tests, type checking and build on the first implementation, before the final contrast adjustment. Its logs identified PR merge ref `342b92bf2636ce5cab8014606bd48ef3f79794e7` from head `3e43cce2e8aa6993d35e6fa2738238e80f4fcd49` and base `5266a23a54b16c0670b85b4b1526f9b561b197f2`. Ubuntu 24.04.5, Node 24.21.0 and npm 11.19.0 were observed. That run's three hashes matched that earlier local bundle. The final CSS/HTML hashes above differ; the JavaScript bytes are unchanged. The final run must be inspected separately on the PR.

## Local checks and real browser observations

- Windows local toolchain: Node 24.22.1, npm 11.19.1; React 19.3.1, TypeScript 7.0.2 and Vite 8.3.5, locked in package-lock.json.
- `npm ci`, `npm test` (eight passed, none skipped), and `npm run build` passed. The final contrast-only adjustment was rebuilt successfully.
- Production preview at `http://127.0.0.1:1421/`: blank input rejected, surrounding whitespace trimmed, Enter adds, Space toggles completion, deletion works, duplicate text has independent stable IDs, and HTML-looking text stays literal with no image element created.
- Reload and closing/reopening the app tab preserved texts, IDs and completion states in actual browser storage. This was not a mocked persistence test.
- Chrome at 390px reported document content width 390px with wrapped task text and usable controls. The final narrow capture uses that measured viewport. An in-app-browser viewport override did not change its actual width; it was not counted as the 390px check.
- The unchanged production JavaScript was loaded in an opaque iframe in the explicitly labelled manual fixture at port 1422. Actual browser storage denial displayed the warning and the in-memory list remained usable. Cancel and explicit failed replacement were observed; failure never displayed a saved claim. The iframe permits scripts and forms, but not a same-origin identity. This is a controlled browser environment, not an application backend.
- Corrupt/newer records, invalid entries, write quota/read failures and external changes use injected storage fixtures in the Node tests. Those cases must not be represented as real browser quota/compatibility tests.
- Review found low-contrast secondary text. It was darkened and recaptured. Computed final muted text was `rgb(102,112,95)`; calculated contrast is at least 4.67:1 against its cream/white backgrounds. The count badge uses a darker color. This limited check is not a full accessibility certification.
- The initial type check exposed a missing Vite CSS declaration and was fixed using Vite's existing client types. A clean-install attempt while the owned preview process held a Windows native module failed with EPERM; stopping that process allowed the clean install to pass. The isolated browser fixture initially blocked form submission until its sandbox explicitly allowed forms. These failures were not counted as passing checks.

## Genuine captures

- [Production preview](evidence/todo-preview.png)
- [390px Chrome layout](evidence/todo-narrow.png)
- [Actual storage denial in the labelled iframe fixture](evidence/storage-denied.png)
- [Persisted main-branch protection settings](evidence/main-protection.png)

Captures use disposable demonstration todos. They are observed application output, not generated mockups. Local reports remain advisory.

## Protection, review and remaining gates

The saved classic rule `85171836` was read back from GitHub's settings page and applies to `main`. It requires a PR, one approval, dismissal of stale approvals, approval of the latest reviewable push by someone other than its pusher, conversation resolution, and an up-to-date branch with the GitHub Actions `checks` job. Admin bypass is disabled; force pushes and deletions remain disabled.

The new workflow itself still needs independent review before it establishes the engineering control baseline. No eligible independent reviewer has been selected or granted access by this work. Do not substitute another prompt or this agent's own review for an independent GitHub approval. The PR remains a draft and the issue remains open; no merge or human acceptance has occurred.

The journey contract, standards pin, installed skills and repository instructions are unchanged from the remote base. An advisory review checked storage failure handling, literal text, identity preservation, scope and the new workflow. Broader Engineering Standards adversarial scenarios (forged reports, deliberately weakened gates, altered contracts/ADRs) have not been validated as independently enforced controls. No accepted ADR exists for an ADR-tampering trial. Model usage and human acceptance time were not measured.

This pilot does not resolve Hlidskalf's native input-automation limitation or prove active Desktop-owned Developer shutdown/crash continuity. It establishes a real manually assigned task, a working browser app, local/browser checks, remote CI observations, and configured merge gates. Human acceptance of the identified app and independent source/workflow review are still required.
