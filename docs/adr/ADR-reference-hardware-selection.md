# ADR-0001: Stage 0 reference hardware and compatibility classification

Status: Accepted  
Date: 2026-09-01  
Owners: Zamri Ares, Product Owner and Technical Lead  
Supersedes: None  

## Context

Vector requires repeatable reference configurations for acquisition, inference, PLC exchange, and industrial I/O without converting a bounded test result into a universal vendor-compatibility claim. Exact camera suffixes depend on optical calculations; the production industrial PC, RTX professional GPU, CODESYS runtime host, and remote-I/O model also require engineering and procurement selection.

## Decision

Adopt three compatibility classifications:

1. `REFERENCE_HARDWARE`: selected hardware used to develop and execute the declared baseline tests. This classification alone is not a compatibility or certification claim.
2. `PROTOCOL_COMPATIBLE_HARDWARE`: an exact hardware/software combination that passed the declared protocol-conformance scope but not every platform acceptance gate.
3. `CERTIFIED_PLATFORM_COMPATIBLE_HARDWARE`: an exact combination that passed applicable acquisition/control, performance, failure/recovery, security, 72-hour soak, lifecycle, licensing, and site/deployment acceptance gates.

Stage 0 reference targets are:

- Basler ace 2 GigE global-shutter area-scan camera, exact suffix pending optical engineering;
- GenICam-compatible Hikrobot GigE global-shutter area-scan camera, exact suffix pending optical engineering;
- Basler ace 2 USB3 Vision camera, exact suffix pending optical engineering;
- Basler racer 2 GigE line-scan camera, or an equivalent GenICam device only through a superseding approved selection, exact suffix pending line/optical engineering;
- NVIDIA Jetson AGX Orin Industrial compact edge;
- x86-64 Ubuntu LTS industrial PC with an NVIDIA RTX professional GPU, NVMe, TPM 2.0, and segregated camera/factory networks, exact system and GPU pending engineering selection;
- Siemens S7-1500 OPC UA target, exact CPU/order number pending engineering selection;
- CODESYS Control OPC UA/Modbus TCP target, exact runtime edition, host, and licence pending engineering selection;
- isolated 24 VDC Modbus TCP remote I/O, exact manufacturer/model pending engineering selection.

Every exact entry shall record manufacturer, full model/order number, firmware, driver/SDK/runtime version, operating system, protocol/profile, licensing status, lifecycle status, and official source datasheet/manual. `PENDING ENGINEERING SELECTION` is mandatory where the value is not established.

No device may advance beyond its evidenced classification. Vendor family, GenICam claim, or protocol label alone never establishes platform compatibility.

## Alternatives considered

- Claim standards-based compatibility for all conforming devices: rejected because optional features, firmware, transport behaviour, drivers, security profiles, and failure recovery vary.
- Validate only one camera and one PLC: rejected as insufficient to prove the vendor-neutral adapter boundary, while still retaining bounded initial scope.
- Select exact suffixes without optical and line calculations: rejected because resolution, sensor format, pixel size, colour/mono choice, line rate, lens, field of view, and minimum defect determine the valid model.
- Treat reference hardware as certified upon procurement: rejected because procurement provides no functional, performance, security, recovery, or soak evidence.

## Consequences

- Compatibility claims become exact-combination claims with explicit limitations and evidence.
- Multiple devices and protocols increase Stage 0/bench evidence effort, procurement cost, licence review, and lifecycle tracking.
- Camera and I/O adapter contracts must remain vendor neutral; proprietary support stays replaceable.
- The x86 and Jetson configurations require separate OS, NVIDIA runtime, thermal, performance, and recovery evidence.
- Safety interlocks and emergency functions remain exclusively in certified safety hardware.
- Stage 0 cannot exit while mandatory evidence in `docs/compatibility/STAGE_0_EVIDENCE_REGISTER.md` is absent.

## Verification

- Validate every JSON device manifest against `schemas/reference-device-manifest.schema.json`.
- Complete `HARDWARE_COMPATIBILITY_MATRIX.md` and `PROTOCOL_CONFORMANCE_MATRIX.md` for each exact selected combination.
- Record camera discovery, acquisition, trigger, parameter control, PLC exchange, reconnection, performance, timestamp correlation, security, and 72-hour soak evidence.
- Confirm that no `TARGET`, pending, protocol-only, or untested entry is represented as certified.

## Rollback or migration

An unavailable or unsuitable target may be replaced through a superseding ADR. Preserve the rejected/retired manifest and evidence, add the replacement as a new stable identifier, rerun all applicable gates, and never transfer compatibility status between models or configurations.
