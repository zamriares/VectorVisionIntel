# Protocol Conformance Matrix

Status: Stage 0 acceptance criteria defined; execution pending  
Owner: Zamri Ares  

Passing protocol conformance permits only a `PROTOCOL_COMPATIBLE_HARDWARE` claim for the exact tested combination. It does not establish platform certification, deterministic timing suitability, or safety suitability.

| Protocol/interface | Reference endpoints | Required conformance scope | Security baseline | Failure/recovery scope | Status/evidence |
|---|---|---|---|---|---|
| GenICam + GigE Vision | Basler ace 2; Hikrobot; Basler racer 2 | Enumerate stable identity; feature discovery; acquire declared pixel format; hardware/software trigger; exposure/gain/ROI/packet controls; frame/sequence/timestamp integrity | Segregated camera network; bounded packet/buffer settings; no implicit trust beyond zone | Disconnect, packet loss, incomplete frame, duplicate/out-of-order identity, reconnect and restart | NOT RUN |
| GenICam + USB3 Vision | Basler ace 2 USB | Enumerate stable identity; acquire; hardware/software trigger; exposure/gain/ROI; bandwidth/host-controller constraints; frame integrity | Approved USB topology and device access; no unauthorised hot-plug substitution | Disconnect/reconnect, host-controller reset, bandwidth exhaustion, incomplete frame | NOT RUN |
| OPC UA | Siemens S7-1500; CODESYS Control | Endpoint discovery; exact client/server role; namespace/node mapping; typed read/write; sequence/handshake state; subscriptions if used; quality/status codes | Certificates/trust lists; approved security policy/mode; anonymous and `None` disabled for production; least-privilege identity | Session/channel loss, certificate expiry/revocation, stale value, timeout, restart and reconnect without stale output | NOT RUN |
| Modbus TCP | CODESYS Control; isolated 24 VDC remote I/O | Exact unit ID, function codes, register/coil map, byte/word order, polling/write policy, sequence/acknowledgement mapping | Segregated zone; explicit allow-list; rate/bounds validation; gateway/TLS controls where approved | Timeout, exception codes, malformed response, disconnect, stale/duplicate write prevention and reconnect | NOT RUN |
| MQTT 5.0 | Edge and approved broker TBD | Versioned topics/payloads; client/session identity; QoS 1; idempotent event ID/source sequence; retained-message policy; store-and-forward | TLS and authenticated scoped client; topic ACL; payload/rate/size limits | Broker loss, duplicate/reorder, session expiry, spool full, replay and reconciliation | NOT RUN |
| REST/JSON | External management integration TBD | HTTPS API versioning; schema validation; pagination/idempotency where applicable; bounded upload/export | Authentication, authorisation, site scope, TLS, CSRF/session controls where applicable, rate/size limits | Timeout, retry/cancellation, duplicate request, invalid/oversized input and partial outage | NOT RUN |
| Secure WebSocket | UI/monitoring integration TBD | WSS upgrade; authenticated session; versioned message schema; reconnect/resubscribe; bounded buffering | TLS, origin/session/authorisation checks, site scope, rate/size limits | Disconnect, token expiry/revocation, slow consumer, replay and resynchronisation | NOT RUN; prohibited for reject/safety output |
| gRPC | Edge/factory services TBD | Versioned Protobuf contracts; deadlines/cancellation; status mapping; compatibility; bounded streams | mTLS service identity, scope, certificate lifecycle and message limits | Disconnect, deadline, cancellation, retry/idempotency and incompatible version | NOT RUN |
| Isolated digital I/O | 24 VDC remote I/O TBD | Electrical levels/isolation; input debounce; output state; sequence/valid/ack mapping; startup/default state | Physical access and network/device configuration controls | Open/short where detectable, power loss, comms loss, stuck signal and recovery | NOT RUN; not safety-rated |

## Conformance evidence record

For every executed row, record exact endpoint models, firmware, OS, SDK/driver/runtime, topology, security configuration, test tool/version, commands/procedure, raw traces, expected/actual results, limitations and approving reviewer in `STAGE_0_EVIDENCE_REGISTER.md`.
