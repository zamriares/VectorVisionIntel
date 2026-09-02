# Hardware Compatibility Matrix

Status: Stage 0 reference targets; all test evidence pending  
Owner: Zamri Ares  
ADR: `docs/adr/ADR-reference-hardware-selection.md`  

## Classification rules

| Classification | Meaning | Minimum evidence | Permitted claim |
|---|---|---|---|
| `REFERENCE_HARDWARE` | Selected baseline used for development and evaluation | Approved exact manifest and source documentation | Reference target only; not compatible or certified |
| `PROTOCOL_COMPATIBLE_HARDWARE` | Exact combination passes its declared protocol scope | Protocol conformance, reconnect/error cases, version and limitations | Compatible only for the named protocol/profile and configuration |
| `CERTIFIED_PLATFORM_COMPATIBLE_HARDWARE` | Exact combination passes every applicable platform gate | Protocol, function, performance, timestamp, recovery, security, 72-hour soak, lifecycle/licence and site/deployment evidence | Platform-compatible only for the exact declared combination |

## Reference target matrix

| ID | Reference target | Exact selection | Interfaces | Classification/status | Official source | Evidence state |
|---|---|---|---|---|---|---|
| CAM-BASLER-A2-GIGE | Basler ace 2 global-shutter area scan | PENDING ENGINEERING SELECTION | GenICam; GigE Vision | `REFERENCE_HARDWARE` / target | [Basler ace 2 documentation](https://docs.baslerweb.com/basler-ace-2) | NOT RUN |
| CAM-HIK-GIGE | Hikrobot global-shutter area scan | PENDING ENGINEERING SELECTION | GenICam; GigE Vision | `REFERENCE_HARDWARE` / target | [Hikrobot GigE Area Scan Camera manual](https://www.hikrobotics.com/en2/Hikrobotics/Machine%20Vision/01%20Product/%E5%B7%A5%E4%B8%9A%E9%9D%A2%E9%98%B5%E7%9B%B8%E6%9C%BA/CS/%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C/UD26223B_GigE%20Area%20Scan%20Camera%20User%20Manual_V3.4.50_20211117.pdf) | NOT RUN |
| CAM-BASLER-A2-USB | Basler ace 2 global-shutter area scan | PENDING ENGINEERING SELECTION | GenICam; USB3 Vision | `REFERENCE_HARDWARE` / target | [Basler ace 2 documentation](https://docs.baslerweb.com/basler-ace-2) | NOT RUN |
| CAM-BASLER-R2-GIGE | Basler racer 2 line scan | PENDING ENGINEERING SELECTION | GenICam; GigE Vision | `REFERENCE_HARDWARE` / target | [Basler racer 2 documentation](https://docs.baslerweb.com/basler-racer-2) | NOT RUN |
| EDGE-JETSON-AGX-ORIN-I | NVIDIA Jetson AGX Orin Industrial module and production carrier | Carrier/storage/network configuration PENDING ENGINEERING SELECTION | PCIe; Ethernet; CUDA/TensorRT | `REFERENCE_HARDWARE` / target | [NVIDIA Jetson AGX Orin](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/); [lifecycle](https://developer.nvidia.com/embedded/lifecycle) | NOT RUN |
| EDGE-X86-RTX | Industrial x86-64 Ubuntu LTS PC, RTX professional GPU, NVMe, TPM 2.0, segregated networks | PENDING ENGINEERING SELECTION | PCIe; Ethernet; CUDA/TensorRT | `REFERENCE_HARDWARE` / target | [Ubuntu lifecycle](https://ubuntu.com/about/release-cycle); [NVIDIA RTX professional product literature](https://www.nvidia.com/en-us/products/workstations/product-literature/) | NOT RUN |
| PLC-SIEMENS-S7-1500 | Siemens SIMATIC S7-1500 | Exact CPU/order number PENDING ENGINEERING SELECTION | OPC UA | `REFERENCE_HARDWARE` / target | [Siemens S7-1500 Communication Function Manual](https://support.industry.siemens.com/cs/attachments/59192925/s71500_communication_function_manual_en-US_en-US.pdf) | NOT RUN |
| PLC-CODESYS-CONTROL | CODESYS Control | Runtime edition, version, host and licence PENDING ENGINEERING SELECTION | OPC UA; Modbus TCP | `REFERENCE_HARDWARE` / target | [CODESYS OPC UA](https://www.codesys.com/products/fieldbus-communication/opc-ua/); [licensing](https://www.codesys.com/ecosystem/discover-codesys/licensing/) | NOT RUN |
| IO-MODBUS-24V | Isolated 24 VDC Modbus TCP remote I/O | Manufacturer/model PENDING ENGINEERING SELECTION | Modbus TCP; isolated digital I/O | `REFERENCE_HARDWARE` / target | Manufacturer datasheet PENDING; [Modbus specifications](https://www.modbus.org/modbus-specifications) | NOT RUN |

## Exact-entry requirements

No row can advance beyond target status until its manifest replaces every required pending field and records:

- manufacturer and full model/order number;
- firmware and bootloader where applicable;
- driver, SDK, runtime, gateway, and licence versions;
- exact operating-system image, kernel and architecture;
- protocol version, role, security profile, map and timing assumptions;
- licence terms/status and deploy/offline constraints;
- manufacturer lifecycle/support status and review evidence;
- official datasheet/manual URL and retrieved revision/date;
- serial/asset identity for executed bench and soak evidence;
- limitations, incompatible combinations, substitution and revalidation rules.

## Current disposition

All rows are reference targets with `NOT RUN` evidence. No row is protocol-compatible or certified platform-compatible.
