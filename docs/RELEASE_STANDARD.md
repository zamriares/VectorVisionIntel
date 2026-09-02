# Release and Supply-Chain Standard

Status: Approved Stage 0 baseline  
ADR: ADR-0002  

## Required release record

Each releasable component records its component ID, semantic version, source commit, task/ADR references, toolchain and dependency lock identities, supported compatibility range, migration/rollback method and evidence links.

Release bundles shall contain checksums, detached signatures, SPDX or CycloneDX SBOMs, provenance, licence notices, vulnerability dispositions, compatibility manifests and installation/rollback evidence. Model, inspection-package and adapter signatures are independent from runtime versioning.

## Signing boundary

Build and test may run on pull requests with read-only permissions. Signing and publishing run only from a protected release environment after human approval, never for untrusted pull-request code. Production signing identities are HSM-, KMS- or approved keyless-workload-backed and support rotation/revocation. Stage 0 does not configure production credentials or publish artefacts.

## Upgrade and rollback

Every upgrade declares compatible source/target versions, preflight, backup, migration, health check, abort point and recovery. Stored-data migrations are forward-only; rollback restores a compatible application/data state using the approved recovery procedure. Published artefacts are immutable and revoked rather than replaced.

## Evidence status

The Stage 0 supply-chain workflow can generate an unsigned repository SBOM for validation. Signed production build/release artefacts, provenance verification, clean install, upgrade and rollback are `NOT VERIFIED` until an authorised implementation/release task supplies real artefacts and protected signing infrastructure.
