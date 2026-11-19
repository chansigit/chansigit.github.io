---
title: ITHscore
description: Resolving the interior of a tumor from a routine CT scan, and scoring how heterogeneous it is.
importance: 6
category: imaging
related_publications: li2023ithscore, li2019pixelclust
---

<div class="paper">

<img class="cover" src="/assets/img/ithscore/eur-radiol-33-2-cover.webp" alt="Cover of European Radiology, volume 33, issue 2, February 2023" />

**[ITHscore: comprehensive quantification of intra-tumor heterogeneity in NSCLC by multi-scale radiomic features](https://doi.org/10.1007/s00330-022-09055-0)**

Jiaqi Li, Zhenbin Qiu, Chao Zhang, **Sijie Chen**, Mengmin Wang, Qiuchen Meng, Haiming Lu, Lei Wei, Hairong Lv, Wenzhao Zhong, Xuegong Zhang

*European Radiology* 33(2):893–903, February 2023. Published online 24 August 2022.

</div>

## A whole-tumor summary hides what is inside

Radiomics measures a tumor on a CT image: its shape, its brightness, how coarse
its texture is. The usual recipe computes about a hundred such measurements
over the whole tumor and feeds them to a classifier. Each tumor becomes one row
of numbers.

But a tumor is not uniform inside, and an average over the whole tumor cannot
show how its regions differ. This intra-tumor heterogeneity relates to how the
disease behaves, and it is normally measured from tissue, after surgery or
biopsy.

## Idea: look inside the tumor

Compute the texture features around *every pixel* instead of once per tumor,
and use them to divide the interior of the tumor into regions.

The internal structure itself becomes the information, read from a CT scan
that every patient already has.

## The input: a CT image and a tumor

<figure>
<img src="/assets/img/ithscore/slice-mask.png" alt="Three panels: a chest CT slice, a binary mask marking a small lung tumor, and the mask overlaid on the slice." />
<figcaption>A CT image, the mask of the given tumor, and both overlaid. Patient LUNG1-100, public LUNG1 dataset; figure from the ITHscore package.</figcaption>
</figure>

## From the tumor to a map of regions

<div class="cols">
<div>

1. Given a tumor on a CT image, take its pixels.
2. For every tumor pixel, compute radiomic texture features on its 5 x 5
   neighborhood.
3. Cluster the pixels by these features. Pixels with similar local texture get
   the same label.

The result is a map of regions inside the tumor, here with 6 classes.

</div>
<div class="pair">
<img src="/assets/img/ithscore/tumor-crop.png" alt="The cropped tumor on CT, and the same crop with the tumor mask overlaid." />
<img src="/assets/img/ithscore/label-map-k6.png" alt="Label map of the tumor with six classes, forming nested and partly broken bands." />
</div>
</div>

## From the map to a score

For each class $k$, let $n_k$ be its number of connected pieces and
$A_k$ the area of its largest piece. With $N$ tumor pixels and $K$ classes,

$$
\mathrm{ITHscore} \;=\; 1 - \frac{1}{N}\sum_{k=1}^{K}\frac{A_k}{n_k}
$$

- Every class forms one solid block: the score is near 0.
- The classes are scattered into many small pieces: the score is near 1.
- The example tumor scores 0.69.

## The algorithm

<div class="algo">
<p class="algo-cap"><b>Algorithm 1</b> ITHscore</p>
<p><b>Input:</b> CT image <i>I</i>; a given tumor <i>T</i> of <i>N</i> pixels</p>
<p><b>Parameters:</b> window radius <i>r</i> = 2, number of classes <i>K</i> = 6</p>
<p><b>Output:</b> ITHscore <i>s</i> ∈ [0, 1)</p>
<ol>
<li><span><b>for</b> each pixel <i>p</i> ∈ <i>T</i> <b>do</b></span></li>
<li class="i1"><span><i>φ</i>(<i>p</i>) ← <span class="fn">RadiomicFeatures</span>(<i>I</i>, <i>p</i>, <i>r</i>)</span><span class="cm">▷ Algorithm 2</span></li>
<li><span><b>end for</b></span></li>
<li><span>rescale every feature of <i>φ</i> to [0, 1] over <i>T</i></span></li>
<li><span><i>L</i> ← K-means(<i>φ</i>, <i>K</i>)</span><span class="cm">▷ map of regions</span></li>
</ol>
</div>

## The algorithm, continued

<div class="algo">
<p class="algo-cap"><b>Algorithm 1</b> ITHscore <span class="cont">(continued)</span></p>
<ol style="counter-reset: line 5">
<li><span><i>a</i> ← 0</span></li>
<li><span><b>for</b> <i>k</i> = 1, …, <i>K</i> <b>do</b></span></li>
<li class="i1"><span><i>R</i> ← pieces of class <i>k</i> in <i>L</i></span><span class="cm">▷ 8-connected, more than 1 pixel</span></li>
<li class="i1"><span><b>if</b> <i>R</i> ≠ ∅ <b>then</b> <i>a</i> ← <i>a</i> + max<sub><i>c</i>∈<i>R</i></sub> |<i>c</i>| / |<i>R</i>|</span><span class="cm">▷ largest piece / number of pieces</span></li>
<li><span><b>end for</b></span></li>
<li><span><b>return</b> <i>s</i> = 1 − <i>a</i> / <i>N</i></span></li>
</ol>
</div>

## The feature function

<div class="algo">
<p class="algo-cap"><b>Algorithm 2</b> <span class="fn">RadiomicFeatures</span>(<i>I</i>, <i>p</i>, <i>r</i>)</p>
<p><b>Input:</b> CT image <i>I</i>, pixel <i>p</i>, window radius <i>r</i></p>
<p><b>Output:</b> feature vector <i>φ</i>, about a hundred numbers</p>
<ol>
<li><span><i>W</i> ← { <i>q</i> : max(|<i>q<sub>x</sub></i> − <i>p<sub>x</sub></i>|, |<i>q<sub>y</sub></i> − <i>p<sub>y</sub></i>|) ≤ <i>r</i> }</span><span class="cm">▷ (2<i>r</i>+1) × (2<i>r</i>+1) window</span></li>
<li><span><i>x</i> ← { <i>I</i>(<i>q</i>) : <i>q</i> ∈ <i>W</i> }</span><span class="cm">▷ intensities in the window</span></li>
<li><span><i>φ</i> ← first-order statistics of <i>x</i></span><span class="cm">▷ mean, variance, skewness, entropy, …</span></li>
<li><span><i>G</i> ← <i>x</i> binned into gray levels</span><span class="cm">▷ bin width 25</span></li>
<li><span><b>for</b> each <i>M</i> in GLCM, GLRLM, GLSZM, GLDM, NGTDM <b>do</b></span></li>
<li class="i1"><span>append the statistics of the matrix <i>M</i>(<i>G</i>) to <i>φ</i></span><span class="cm">▷ contrast, run emphasis, …</span></li>
<li><span><b>end for</b></span></li>
<li><span><b>return</b> <i>φ</i></span></li>
</ol>
</div>

## The same tumor at several resolutions

<div class="cols">
<div>

Changing the number of classes shows the tumor at different resolutions, here
from 3 to 9 classes.

The first study, in 2019, read such maps and found three recurring patterns in
lung tumors: uni-core, multi-core and diffused. Uni-core and diffused tumors
differ in survival time.

ITHscore, in 2023, replaces the reading by one number that can be computed for
every patient.

</div>
<img src="/assets/img/ithscore/multi-resolution.png" alt="Grid of panels: the CT slice, the cropped tumor, and label maps of the tumor with 3 to 9 classes." />
</div>

## Results on 1399 patients

Validated on six patient cohorts, ITHscore

- rises with tumor stage;
- separates tumors with and without lymphovascular and pleural invasion;
- separates patient groups with different survival;
- correlates with heterogeneity-related gene pathways.

It needs no training labels, and it also works on head-and-neck cancer.

## Run it

```
pip install ITHscore

img, mask = ITHscore.get_largest_slice(image, seg)
sub_img, sub_mask = ITHscore.locate_tumor(img, mask)
features = ITHscore.extract_radiomic_features(
    sub_img, sub_mask)
label_map = ITHscore.pixel_clustering(
    sub_mask, features, cluster=6)
ITHscore.calITHscore(label_map)   # 0.688
```

[github.com/LiJiaqi96/ITHscore](https://github.com/LiJiaqi96/ITHscore)
