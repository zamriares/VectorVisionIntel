# ADR-0003: Solo CODEOWNER governance

Status: Accepted
Date: 2026-09-03
Owners: Zamri Ares, Product Owner and Technical Lead
Supersedes: ADR-0002 review-approval requirements only

## Context

ADR-0002 established protected pull requests, required checks, CODEOWNERS review, and additional review rules in `docs/ENGINEERING_STANDARDS.md`. The repository currently has one owner, `@zamriares`, who also authors its pull requests. [GitHub does not permit a pull-request author to approve their own pull request](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews), so requiring one approving or CODEOWNER review makes every owner-authored pull request unmergeable without a second qualified reviewer.

On 2026-09-03, Zamri Ares explicitly directed that the review rule be changed to sole-CODEOWNER governance. This decision accepts the reduced separation of duties while the repository has one maintainer. It does not weaken safety boundaries, required status checks, task/ADR traceability, or the prohibition on unauthorised product implementation.

## Decision

- `@zamriares` remains the sole repository-wide CODEOWNER.
- Every change still requires a pull request; direct pushes and force pushes to `main` remain prohibited.
- Pull-request approval and required CODEOWNER-review counts are zero while solo-maintainer mode is active. The sole CODEOWNER records self-review through the pull-request checklist and merge audit rather than a GitHub approval review.
- Strict required status checks, resolved conversations, linear history, squash-only merge, administrator enforcement, and branch deletion/force-push prevention remain mandatory.
- The sole CODEOWNER must review the complete final diff, record actual test results and unavailable checks, and resolve failures before merge. Required checks cannot be bypassed to compensate for the absent independent reviewer.
- Any later addition of a second qualified maintainer triggers review of this ADR. Reinstating independent approval requires a superseding ADR or an explicit approved governance update with remote enforcement evidence.
- High-risk production actions remain governed by the product's step-up and two-person approval policies where those policies are defined. This repository-review exception does not authorise one person to bypass a separately required production approval.

## Alternatives considered

- Keep one required approval and wait for a second reviewer: rejected by the owner because it blocks all owner-authored pull requests.
- Allow the owner to self-approve: rejected because GitHub does not count a pull-request author's approval.
- Permit direct pushes or an administrator bypass: rejected because that would remove pull-request and required-check evidence.

## Consequences

- Repository changes can merge with one maintainer after all mandatory checks pass.
- Independent human defect detection and separation of duties are absent; compromised or mistaken owner actions have fewer preventive controls.
- Pull-request history, immutable CI pins, mandatory checks, CODEOWNERS ownership, squash commits, and protected `main` remain compensating controls, but they do not equal independent review.
- Documentation and hosted branch protection must not claim CODEOWNER approval enforcement while solo-maintainer mode is active.

## Verification

- Confirm `.github/CODEOWNERS` assigns the repository to `@zamriares`.
- Run `bash tools/validate-repository.sh` and require every configured status check to pass on the pull request.
- Read back hosted protection and confirm pull requests and strict required checks remain mandatory, required approving reviews are zero, required CODEOWNER reviews and last-push approval are disabled, administrator enforcement remains enabled, and force pushes/deletion remain disabled.
- Merge a task-linked pull request through the protected path and retain the merge/check evidence.

## Rollback or migration

Assign a qualified second maintainer, supersede this ADR to restore independent approval, update the engineering standard and pull-request template, then enable and verify at least one required approval and CODEOWNER review before relying on the restored control.
