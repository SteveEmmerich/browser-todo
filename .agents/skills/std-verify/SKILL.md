---
name: std-verify
description: Verify a scoped engineering change against repository checks and journey contracts with explicit source and evidence provenance.
---

1. Identify task scope, unchanged journey criteria, and source/build identity.
2. Inspect existing check definitions and their diff. Flag changes to controls for independent review.
3. Execute relevant checks. Record actual commands and outcomes; failures remain failures.
4. Exercise real dependencies where available. Label mocks and unavailable checks.
5. Link captured artifacts to the identified build and environment. Never fabricate evidence.
6. Distinguish local advisory results from protected CI results. Request human acceptance for observed user-facing journeys; changed builds invalidate prior acceptance.
