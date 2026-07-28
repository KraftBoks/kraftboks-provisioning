# KraftBoks provisioning bundles

Public, versioned site bundles for the generic KraftBoks gateway image.

This repository must never contain credentials, SIM PINs, Headscale keys,
site-specific `.env` files, certificates, or private sensor configuration.
Those values are supplied locally during firstboot or through an approved,
separate secret-management path.

## Bootstrap bundle

`v0.1.15` provides the standard gateway platform: Mosquitto, Node-RED with the
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
Mini-HMI `0.0.8`, which reconnects automatically when MQTT becomes available
after the HMI starts and provides the config-driven generator, alarm, thermal,
gateway and theme-aware logo views.

All host-networked containers use the gateway's stable local `dnsmasq`
listener at `127.0.0.1`. Docker otherwise snapshots the current uplink
resolver when a container is created, which can leave cloud services using a
dead Ethernet DNS address after failover to LTE. Container startup uses
already accepted images; registry access belongs to provisioning/update, not
to an ordinary reboot.

The release asset is a gzip tarball whose root contains `docker-compose.yml`.

## V11 runtime

V11 uses the aligned KraftBoks image set, with Mini-HMI API/web `0.0.8` and
the remaining runtime images at `0.0.7`. The thermal bridge monitors
frame freshness and reconnects its TCP session when a camera connection is
stale, including after gateway/camera restart in either order.
It also contains generic HMI and access-proxy templates; firstboot renders the
site ID and current Headscale address locally. Version `0.1.13` added the
Headscale-bound TCP relay from port 10554 to the local `camerahigh` MediaMTX
stream. The image firewall permits that port only from the cloud node
`100.64.0.3`. Version `0.1.14` passes the camera credentials from the protected
site environment only to the local HMI API, restoring ONVIF PTZ without
exposing the credentials to other containers. Version `0.1.15` adds the full
WM3 measurement template and an explicitly disabled thermal-camera template;
physical camera commissioning must enable it. Use the release's published
SHA-256 with the firstboot wizard.
