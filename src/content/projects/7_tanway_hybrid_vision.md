---
title: Hybrid Vision
description: Host software that fuses a LiDAR and a camera sharing one spinning mirror into a single live image. Demoed at CES 2020.
importance: 7
category: imaging
---

<img class="cover wide" src="/assets/img/hybrid-vision/mirror-scan-still.webp" alt="3D model of the scanner: a laser and receiver module beside a rotating four-facet mirror, with the laser line sweeping across the field of view." />

A 16-channel LiDAR and a line-scan camera look through the same rotating mirror, so both scan the scene along the same line of sight. The software decodes the LiDAR stream, assembles each mirror sweep into a depth frame, and paints depth as **color** on the camera image, shown live next to the camera and LiDAR views.

Prototype built by Tanway Technology, shown at CES 2020 in Las Vegas.

## System structure

<div class="lidar-demo" data-lidar-demo role="img" aria-label="Animated 3D model of a four-facet rotating mirror. A laser and receiver module and a line-scan camera sit behind a window. As the mirror turns, the laser line sweeps across the field of view, and the swept area fills in."></div>
