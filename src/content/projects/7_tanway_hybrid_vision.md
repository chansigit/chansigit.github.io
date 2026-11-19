---
title: Hybrid Vision
description: Host software that fuses a LiDAR and a camera sharing one spinning mirror into a single live image. Demoed at CES 2020.
importance: 7
category: imaging
---

<div class="paper">

**Tanway Hybrid Vision, host software v0.1**

Tanway Technology, Beijing. Demoed at CES 2020, Las Vegas, January 2020.

</div>

## Two sensors, two views of the world

- A **LiDAR** measures **distance**, but gives a sparse picture with no color or texture.
- A **camera** gives a dense, detailed **image**, but no distance.
- To fuse them, both must look in the **same direction** at the **same moment**.

## Idea: one mirror for both sensors

A 16-channel LiDAR and a line-scan camera look through the **same rotating mirror**.

Both scan the scene along the **same line of sight**, so the software only has to turn two streams into **one live image**.

## System structure

<div class="lidar-demo" data-lidar-demo role="img" aria-label="Animated 3D model of a four-facet rotating mirror. A laser and receiver module and a line-scan camera sit behind a window. As the mirror turns, the laser line sweeps across the field of view, and the swept area fills in."></div>

## What the software does

1. **Camera:** acquire images from the industrial line-scan camera and control its settings.
2. **LiDAR:** receive and decode the data stream on a separate thread.
3. **Depth frame:** assemble each mirror sweep into one depth frame.
4. **Fusion:** paint depth as color on the camera image.

All of it runs in real time.

## The algorithm

<div class="algo">
<p class="algo-cap"><b>Algorithm 1</b> <span class="fn">HybridVision</span></p>
<p><b>Input:</b> camera frames <i>F</i>; a queue <i>Q</i> of incoming LiDAR columns</p>
<p><b>Output:</b> camera view, LiDAR view and fused view</p>
<ol>
<li><span><b>for</b> each camera frame <i>F</i> <b>do</b></span><span class="cm">▷ one frame per mirror sweep</span></li>
<li class="i1"><span><i>D</i> ← <span class="fn">AssembleSweep</span>(<i>Q</i>)</span><span class="cm">▷ Algorithm 2</span></li>
<li class="i1"><span><i>P</i> ← empty image of the size of <i>F</i></span></li>
<li class="i1"><span><b>for</b> each channel <i>i</i> and column <i>j</i> <b>do</b></span></li>
<li class="i2"><span>paint the band of <i>P</i> that channel <i>i</i> covers at column <i>j</i> with <span class="fn">Color</span>(<i>D</i>[<i>i</i>, <i>j</i>])</span></li>
<li class="i1"><span><b>end for</b></span></li>
<li class="i1"><span>show <i>F</i>, <i>D</i> and the blend of <i>F</i> and <i>P</i></span></li>
<li><span><b>end for</b></span></li>
</ol>
</div>

## The sweep function

<div class="algo">
<p class="algo-cap"><b>Algorithm 2</b> <span class="fn">AssembleSweep</span>(<i>Q</i>)</p>
<p><b>Input:</b> queue <i>Q</i> of LiDAR columns, each with 16 distances and a horizontal angle</p>
<p><b>Output:</b> depth frame <i>D</i>, 16 channels × <i>W</i> columns</p>
<ol>
<li><span><i>D</i> ← empty 16 × <i>W</i> array</span></li>
<li><span><b>while</b> <i>Q</i> is not empty <b>do</b></span></li>
<li class="i1"><span><i>c</i> ← pop(<i>Q</i>)</span></li>
<li class="i1"><span><i>j</i> ← ⌊ angle(<i>c</i>) / 360 × <i>W</i> ⌋</span><span class="cm">▷ column of this sweep</span></li>
<li class="i1"><span><i>D</i>[:, <i>j</i>] ← the 16 distances of <i>c</i></span></li>
<li><span><b>end while</b></span></li>
<li><span><b>return</b> <i>D</i></span></li>
</ol>
</div>

## Three views, live

- The **camera view**, the **LiDAR view** and the **fused view** appear side by side.
- In the fused view, **color shows distance**.
- Exposure, rotation, cropping and brightness can be adjusted while it runs.

## Shown at CES 2020

The prototype, running this software, was demoed at **CES 2020** in Las Vegas.

The optics and the hardware were built by the team at Tanway.
