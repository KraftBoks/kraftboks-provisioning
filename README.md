# KraftBoks provisioning bundles

Public, versioned site bundles for the generic KraftBoks gateway image.

This repository must never contain credentials, SIM PINs, Headscale keys,
site-specific `.env` files, certificates, or private sensor configuration.
Those values are supplied locally during firstboot or through an approved,
separate secret-management path.

## Bootstrap bundle

`v0.1.9` provides the standard gateway platform: Mosquitto, Node-RED with the
portable Gursli pilot baseline flows and their required Node-RED nodes, local
outbox relay, Mini-HMI API/web and the Headscale-bound access proxy start
automatically after firstboot. Thermal bridge and MediaMTX/FFmpeg are Compose
feature profiles, activated only when the firstboot camera questions are
answered yes. This avoids restart loops when field devices have not yet been
installed.

Firstboot seeds flows only where Node-RED has no flows (or only its empty
default), and never overwrites a non-empty local configuration. The
`ipcbox-cm5-a` and `ipcbox-cm5-b` hardware profiles expose the four stable
serial aliases and the least-privilege IPCBOX I/O socket to Node-RED. The
SocketCAN node is pinned and ARM64-installation-tested. IO/CAN commissioning
is shipped as a disabled reference flow, so importing the bundle cannot
activate an output or send a CAN frame.

The generated HMI configuration follows the selected `SITE_ID`, includes the
ten portable pilot-baseline devices, ten overview measurements and four
gateway/cloud status fields, and subscribes to
`sites/<SITE_ID>/telemetry/#`. The bundle uses Node-RED 5.0.1 Debian and
Mini-HMI `0.0.5`.

The release asset is a gzip tarball whose root contains `docker-compose.yml`.
It also contains generic HMI and access-proxy templates; firstboot renders the
site ID and current Headscale address locally. Use its published SHA-256 with
the firstboot wizard.
