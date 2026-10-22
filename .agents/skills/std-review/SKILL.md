---
name: std-review
description: Review a scoped engineering change for correctness, architectural drift, altered controls, and evidence tied to the actual artifact.
---

1. Read the task, diff, repository invariants, accepted ADRs, and journey contracts.
2. Find concrete defects, unsupported claims, scope drift, duplicate implementations, and unnecessary restructuring.
3. Inspect changes to tests, workflows, contracts, and ADRs independently of pass claims.
4. Confirm evidence belongs to the proposed source/build; disclose missing integration evidence.
5. Report actionable findings with locations and consequences. Report no findings when none are supported.
6. Keep the review advisory. Do not approve architecture, impersonate human acceptance, or claim independent security authority.
