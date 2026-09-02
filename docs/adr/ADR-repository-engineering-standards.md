# ADR-0002: GitHub monorepo and engineering governance

Status: Accepted  
Date: 2026-09-01  
Owners: Zamri Ares, Product Owner and Technical Lead  
Supersedes: Repository layout in `README.md` where it used `packages/application-packs/`  

## Context

Vector spans deterministic C++, Go services, TypeScript/React applications, Python ML tooling, contracts, deployment assets and inspection packages. The repository must preserve architecture ownership, keep glove behaviour out of platform core, provide traceability to approved tasks, and enforce secure/reproducible changes before Stage 1 implementation begins.

## Decision

- Use one GitHub-hosted monorepo with the top-level structure defined in `README.md`.
- Use trunk-based development with short-lived branches and protected `main`.
- Prohibit direct commits and force pushes to `main`.
- Require pull requests, passing required checks and CODEOWNERS approval; high-risk boundary changes require the additional approval defined in `docs/ENGINEERING_STANDARDS.md`.
- Use squash merge. The PR title and squash commit shall reference one approved task ID.
- Version APIs, schemas, model artefacts, inspection packages and hardware adapters independently using semantic versioning and compatibility records.
- Pin dependencies and GitHub Actions; generate SBOMs, checksums, provenance and signed release artefacts.
- Require an accepted ADR before architecture invariants, language ownership, protocols, deployment topology or public compatibility promises change.
- Store glove-specific assets only under `inspection-packages/glove/`; the older planned `packages/application-packs/` path is not used.
- Stage 0 creates scaffolding and controls only. It does not authorise product implementation or Stage 1.

## Alternatives considered

- Multiple repositories: rejected because early contract and compatibility changes require atomic, cross-language review and traceability.
- GitFlow/long-lived release branches: rejected because they increase merge drift and duplicate security fixes.
- Unprotected main or direct commits: rejected because they bypass CI, ownership and audit evidence.
- Mutable action tags and floating dependencies: rejected because they weaken reproducibility and supply-chain trust.
- Keeping glove packages under a generic core package path: rejected because the approved structure explicitly isolates inspection applications.

## Consequences

- GitHub branch protection, rulesets, required checks and repository ownership must be configured outside this repository and audited.
- A valid GitHub user/team identifier is required before CODEOWNERS enforcement can pass.
- Cross-component changes remain possible but require all affected owners and compatibility evidence.
- Toolchain versions must be pinned in each component when its first approved implementation task creates build manifests/lockfiles.
- Rollback is performed by reverting the squash commit through a reviewed PR; published artefacts are never silently replaced.

## Verification

- Run `tools/validate-repository.sh` locally and in Stage 0 CI.
- Confirm required directories, governance/configuration files, task references and glove isolation.
- Validate JSON syntax and device-manifest required fields.
- Confirm workflow actions use immutable full commit SHAs and least-privilege permissions.
- Audit GitHub ruleset, required checks, CODEOWNERS resolution and squash-only settings after remote repository creation.

## Rollback or migration

Revert ADR-0002 changes through a reviewed task-linked PR. Preserve task, ADR and release evidence. Any repository split, package-path migration or branching-model change requires a superseding ADR with history, ownership, CI, release and compatibility migration steps.
