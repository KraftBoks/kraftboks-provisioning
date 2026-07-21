# KraftBoks provisioning bundles

Public, versioned site bundles for the generic KraftBoks gateway image.

This repository must never contain credentials, SIM PINs, Headscale keys,
site-specific `.env` files, certificates, or private sensor configuration.
Those values are supplied locally during firstboot or through an approved,
separate secret-management path.

## Bootstrap bundle

`v0.1.0` is a deliberately minimal bundle. It validates the complete download,
checksum, release and activation path, while leaving sensor-specific and
site-specific services disabled. After firstboot, a later signed/versioned
site bundle can be selected with `gatewayctl update`.

The release asset is a gzip tarball whose root contains `docker-compose.yml`.
Use its published SHA-256 with the firstboot wizard.
