---
title: Hybrid Vision
description: Host software that fuses a LiDAR and a camera sharing one spinning mirror into a single live image. Demoed at CES 2020.
importance: 7
category: imaging
---

A 16-channel LiDAR and a line-scan camera look through the same rotating
mirror, so both scan the scene along the same line of sight. The host software
acquires and controls the camera, decodes the LiDAR stream, assembles each
mirror sweep into a depth frame, and paints depth as color on the camera image,
with the camera, LiDAR and fused views side by side.

Prototype built by Tanway Technology, shown at CES 2020 in Las Vegas.

## System structure

<div class="lidar-demo" data-lidar-demo role="img" aria-label="Animated 3D model of a four-facet rotating mirror. A laser and receiver module and a line-scan camera sit behind a window. As the mirror turns, the laser line sweeps across the field of view, and the swept area fills in."></div>
