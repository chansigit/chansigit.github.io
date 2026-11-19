---
title: Hybrid Vision
description: Host software that fuses a LiDAR and a camera sharing one spinning mirror into a single live image. Demoed at CES 2020.
importance: 7
category: imaging
---

Tanway Technology built a prototype sensor in which a 16-channel LiDAR and a
line-scan camera look through the same rotating mirror, so that both scan the
scene along the same line of sight. As a part-time intern in 2019 and 2020, I
wrote the host software for this prototype on my own.

The program does four things in real time:

- acquires images from the industrial line-scan camera and controls its
  settings;
- receives and decodes the LiDAR data stream on a separate thread;
- assembles each mirror sweep into a depth frame;
- paints depth as color on top of the camera image, and shows the camera view,
  the LiDAR view and the fused view side by side.

The prototype, running this software, was demoed at CES 2020 in Las Vegas.

The optics and the hardware were built by the team at Tanway. My mentors were
Dr. Ruitong Zheng and Dr. Shiwei Wang.
