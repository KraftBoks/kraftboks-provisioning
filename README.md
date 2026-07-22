# KraftBoks provisioning bundles

Public, versioned site bundles for the generic KraftBoks gateway image.

This repository must never contain credentials, SIM PINs, Headscale keys,
site-specific `.env` files, certificates, or private sensor configuration.
Those values are supplied locally during firstboot or through an approved,
separate secret-management path.

## Bootstrap bundle

`v0.1.6` provides the standard gateway platform: Mosquitto, Node-RED with the
portable Gursli pilot baseline flows and their required Node-RED nodes, local
outbox relay, Mini-HMI API/web and the Headscale-bound access proxy start
automatically after firstboot. Thermal bridge and MediaMTX/FFmpeg are Compose
feature profiles, activated only when the firstboot camera questions are
answered yes. This avoids restart loops when field devices have not yet been
installed.

Firstboot seeds flows only where Node-RED has no flows (or only its empty
default), and never overwrites a non-empty local configuration. The
`ipcbox-cm5-b` hardware profile additionally exposes the pilot RS485 devices
to Node-RED and enables `can0` when the carrier driver has provided it.

The release asset is a gzip tarball whose root contains `docker-compose.yml`.
It also contains generic HMI and access-proxy templates; firstboot renders the
site ID and current Headscale address locally. Use its published SHA-256 with
the firstboot wizard.
