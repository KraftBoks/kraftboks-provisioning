# KraftBoks provisioning bundles

Public, versioned site bundles for the generic KraftBoks gateway image.

This repository must never contain credentials, SIM PINs, Headscale keys,
site-specific `.env` files, certificates, or private sensor configuration.
Those values are supplied locally during firstboot or through an approved,
separate secret-management path.

## Bootstrap bundle

`v0.1.5` provides the standard gateway platform: Mosquitto, Node-RED, local
outbox relay, Mini-HMI API/web and the Headscale-bound access proxy start
automatically after firstboot. Thermal bridge and MediaMTX/FFmpeg are Compose
feature profiles, activated only when the firstboot camera questions are
answered yes. This avoids restart loops when field devices have not yet been
installed.

The release asset is a gzip tarball whose root contains `docker-compose.yml`.
It also contains generic HMI and access-proxy templates; firstboot renders the
site ID and current Headscale address locally. Use its published SHA-256 with
the firstboot wizard.
