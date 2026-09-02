# Security, Distribution, and Portability

Status: Mandatory baseline. Security exceptions require an accepted, time-limited ADR and named risk owner.

## 1. Standards posture

Design and evidence should align with:

- IEC 62443 concepts for zones, conduits, least privilege, secure development, and component/system security.
- ISA-95 separation between machine control, operations, and enterprise systems.
- NIST Secure Software Development Framework practices.
- OWASP ASVS for web/API controls and OWASP guidance for software supply chain risks.
- Organisation-specific privacy and retention obligations, including Malaysia PDPA where personal data is captured.

Compliance must never be claimed solely because the design references a standard. Claims require scoped assessment and evidence.

## 2. Threat boundaries

Trust zones:

1. Machine zone: cameras, PLCs, lighting, encoders, and I/O.
2. Edge vision zone: runtime and local spool.
3. Factory services zone: APIs, database, broker, storage, identity, and monitoring.
4. Engineering zone: Studio, model tools, and administrative workstations.
5. Enterprise/optional central zone.
6. Remote-support zone, disabled by default.

Firewall rules allow only documented flows. Camera and PLC networks are not routed directly to enterprise or internet networks.

## 3. Secure defaults

- Deny-by-default network and authorisation policy.
- Unique device identity at installation.
- No default or shared production password.
- TLS 1.3 where supported; TLS 1.2 only with approved cipher policy for compatibility.
- mTLS for station-to-factory and service-to-service identity.
- OIDC for users, MFA for privileged roles, and time-limited sessions.
- Secrets stored in OS-protected or dedicated secret stores; never source, images, logs, recipes, or environment templates.
- Least-privilege OS accounts, Linux capabilities, filesystem permissions, and container restrictions.
- Signed configuration, models, plug-ins, application packs, installers, and updates.
- Audit cannot be disabled by normal administrators.

## 4. Supply-chain security

Every release must include:

- pinned dependencies and reproducible build instructions;
- dependency, licence, secret, SAST, and container scans;
- SBOM in SPDX or CycloneDX format;
- build provenance and commit identity;
- vulnerability exceptions with owner and expiry;
- detached signature using protected release keys;
- compatibility and migration manifest;
- installation and rollback test evidence.

Build and release signing keys must not exist on developer machines in production form. Key rotation and revocation must be designed before customer deployment.

## 5. Transferable product bundle

The product is distributed as a signed, versioned offline installation bundle:

```text
vector-vision-<edition>-<version>/
  manifest.json
  checksums.sha256
  signatures/
  sbom/
  licences/
  images/                 # OCI images as an offline archive
  edge/                   # OS-specific packages and service units
  factory/                # Compose files and pinned configuration
  migrations/
  hardware-compatibility/
  install/
  backup-restore/
  validation/
  docs/
```

The installer must:

1. Run preflight checks for OS, CPU/GPU, drivers, storage, network, time, ports, and certificates.
2. Verify manifest, hashes, signatures, licences, and compatibility before modification.
3. Generate site-specific identities and request customer-controlled secrets.
4. Install with least privilege and no internet requirement.
5. Apply migrations transactionally and record installed versions.
6. Run smoke and hardware checks.
7. Produce a signed installation report with no secret values.
8. Preserve an atomic rollback path.

## 6. Moving to another computer

A supported migration exports a customer-controlled encrypted transfer package containing only selected data:

- station and site configuration;
- approved recipes/workflows and their dependency manifests;
- permitted models and application packs;
- database backup and object manifest;
- calibration records, device mappings, and validation evidence;
- audit export and software version inventory.

Private machine identity keys are not blindly copied. The replacement computer receives a new identity, and the authorised administrator rebinds the restored station configuration. Hardware-dependent calibration is marked `REVALIDATION_REQUIRED` until verified.

Migration procedure:

1. Place source station in controlled maintenance state.
2. Verify backup consistency and export scope.
3. Encrypt and sign the transfer package.
4. Install the same or declared-compatible release on destination.
5. Create destination device identity and restore data.
6. Rebind camera/PLC/I/O and validate time synchronization.
7. Run golden samples and Site Acceptance Tests.
8. Approve destination activation; revoke or retire source identity.

## 7. Backup and disaster recovery

Back up:

- PostgreSQL using consistent, tested backup tooling;
- object storage with version/manifest consistency;
- broker and service configuration excluding replaceable secrets;
- certificates through a separate protected recovery process;
- recipes, packages, models, validation records, and audit.

Each customer defines Recovery Point Objective and Recovery Time Objective. A backup is not accepted until automated integrity checks and periodic restoration tests pass.

## 8. Updates and rollback

- Production receives only approved release channels.
- Update is staged to a non-active slot or recoverable previous image.
- Edge update occurs in a declared maintenance window unless the design proves uninterrupted redundancy.
- Health checks cover service, camera, inference, PLC handshake, spool, certificates, storage, and golden-sample replay.
- Failure automatically restores the last known good version.
- Schema migrations must declare backward/forward compatibility and recovery procedure.
- Urgent security revocation can block a compromised model, plug-in, certificate, or package.

## 9. Remote support

Remote access is off by default. When enabled it must be:

- initiated or approved by the customer;
- time bounded and purpose limited;
- bound to a named support identity with MFA;
- routed through an approved secure channel;
- recorded and audited;
- unable to bypass recipe/model approval or safety boundaries.

No permanent vendor backdoor is permitted.

## 10. Data protection

- Save only evidence required by quality, traceability, validation, or customer policy.
- Retention is configurable by result type and site.
- Images containing people or identifying information require explicit purpose, access restriction, and privacy review.
- Exports are authorised, watermarked or logged where appropriate, and encrypted in transit.
- Deletion and legal-hold behaviour are auditable.

## 11. Security verification gates

- Threat model reviewed for each major release and new protocol adapter.
- Authentication, authorisation, tenant isolation, input validation, upload handling, and audit are tested.
- Fuzz tests cover untrusted protocols, configuration parsers, image metadata, model/package manifests, and extension IPC.
- Penetration test before general commercial release and after material boundary changes.
- Recovery from expired/revoked certificates, compromised packages, database loss, and edge replacement is rehearsed.
- Security defects have severity, response target, owner, advisory process, and supported-version policy.
