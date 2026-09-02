# Stage 0 Reference Hardware Evidence Register

Status: Acceptance criteria defined; evidence not yet executed  
Owner: Zamri Ares  

Stage 0 exit is blocked until every mandatory gate has recorded, reviewable evidence for each applicable exact reference configuration. `NOT RUN`, `PARTIAL`, simulation-only evidence where bench evidence is required, or unresolved unexplained loss cannot pass a gate.

| Gate | Applies to | Acceptance criteria | Required evidence | Current status |
|---|---|---|---|---|
| E-001 Camera discovery | Every reference camera | Repeated enumeration returns the expected stable vendor/model/serial/interface identity; unsupported/missing/duplicate identity is rejected or explicit; no device is selected by display name alone | Exact manifest, discovery logs, repeated cold/warm enumeration, negative/duplicate-device cases | NOT RUN |
| E-002 Acquisition | Every reference camera | Declared resolution/pixel format/frame or line rate acquires for the test interval with reconciled trigger/frame/sequence counts; every incomplete/dropped frame is detected and reasoned; no silent loss | Configuration export, counters, sample hashes, packet/USB statistics, resource and thermal metrics | NOT RUN |
| E-003 Triggering | Every triggered camera and I/O path | Hardware and software triggers produce one correctly correlated inspection input under nominal, burst, debounce and invalid timing cases; missed/duplicate/late triggers are explicit | Oscilloscope/logic or equivalent trace, camera timestamps, edge monotonic trace, counters and failure cases | NOT RUN |
| E-004 Parameter control | Every reference camera | Read/write/verify supported exposure, gain, ROI, pixel format, trigger mode and applicable line controls; unsupported/out-of-range/read-only values fail explicitly; reconnect restores or verifies intended state | GenICam node map/version, parameter test log, boundary/negative cases and configuration hashes | NOT RUN |
| E-005 PLC exchange | Siemens S7-1500, CODESYS Control and remote I/O | Exact sequence/ready/busy/result/valid/ack/timeout/health mapping exchanges typed states without stale or duplicate output; invalid state and timeout enter declared degraded behaviour | Approved map, PLC program/version, protocol traces, normal/boundary/failure cases | NOT RUN |
| E-006 Reconnection recovery | Every camera, PLC and I/O endpoint | Cable/network/device/service interruption is detected within the approved bound; no stale output occurs; reconnection is bounded, identity/configuration is revalidated, and inspection resumes only from a declared safe state | Fault-injection procedure, timestamps, state/health transitions, counters and post-recovery reconciliation | NOT RUN |
| E-007 Performance | Both edge classes and every reference acquisition/control path | Sustains approved nominal and peak workload on target hardware with declared latency percentiles, hard-deadline misses, CPU/GPU/memory/storage/network/thermal state, spool behaviour and zero unexplained loss | Benchmark manifest, raw metrics/traces, workload generator/input hashes, environment and statistical report | BLOCKED by DEC-004 and exact selections |
| E-008 Timestamp correlation | Multi-camera, trigger, PLC and output chain | Stable inspection/trigger/sequence identity and monotonic timing correlate end-to-end; wall-clock/PTP quality is recorded; drift/step/loss produces explicit quality/degraded state | Timestamp trace, clock configuration, offset/drift measurements, injected clock fault and reconciliation report | NOT RUN |
| E-009 Security | Every networked device/profile and edge class | Approved zone/conduit and identity policy enforced; default credentials removed; unnecessary services disabled; OPC UA certificate/security profile negatives pass; malformed/rate/size inputs are bounded; secrets absent from logs | Network diagram/rules, asset/service scan, credential/certificate evidence, negative tests, vulnerability/licence review | NOT RUN |
| E-010 72-hour soak | Each complete x86 and Jetson reference station configuration | Continuous 72 hours at approved representative workload with no crash, deadlock, memory/resource leak beyond approved bound, unexplained trigger/frame/result gap, stale output or unhandled thermal/storage/network degradation; planned fault/reconnect cycles recover as specified | Exact hardware/software manifests, start/end and uninterrupted duration, inspection totals reconciliation, resource trends, alarms/faults, raw logs/metrics and signed review | NOT RUN |

## Evidence entry template

| Field | Required value |
|---|---|
| Evidence ID and gate | TBD |
| Exact device manifest IDs/versions | TBD |
| Classification requested | `REFERENCE_HARDWARE`, `PROTOCOL_COMPATIBLE_HARDWARE`, or `CERTIFIED_PLATFORM_COMPATIBLE_HARDWARE` |
| Evidence tier | Bench / site acceptance; simulation or emulation may supplement but not replace required hardware evidence |
| Hardware serial/asset identities | TBD |
| Firmware/SDK/driver/runtime/OS versions | TBD |
| Protocol/security/configuration hashes | TBD |
| Test procedure and exact commands/tool versions | TBD |
| Expected and actual result | TBD |
| Start/end UTC and monotonic duration | TBD |
| Raw evidence location and hashes | TBD |
| Deviations, unexplained events and limitations | TBD |
| Reviewer and audit date | TBD |
| Disposition | NOT RUN / FAIL / PARTIAL / PASS / REVOKED |

## Exit disposition

Current result: `BLOCKED`. No hardware test has been run, no 72-hour soak evidence exists, and exact selections remain pending.
