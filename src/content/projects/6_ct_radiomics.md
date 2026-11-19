---
title: ITHscore
description: Resolving the interior of a tumor from a routine CT scan, and scoring how heterogeneous it is.
importance: 6
category: imaging
related_publications: li2023ithscore, li2019pixelclust
---

## One vector per tumor hides its interior

Radiomics usually treats a tumor as one object: it extracts one feature vector
from the whole tumor and then classifies the tumor.

But a tumor is not uniform inside. How its regions differ, the intra-tumor
heterogeneity, relates to how the disease behaves, and it is normally measured
from tissue, after surgery or biopsy.

## Idea: look inside the tumor

Compute the texture features around *every pixel* instead of once per tumor,
and use them to divide the interior of the tumor into regions.

The internal structure itself becomes the information, read from a CT scan
that every patient already has.

## From a CT scan to a map of regions

1. Take the CT slice where the tumor is largest.
2. For every tumor pixel, compute radiomic texture features on its 5 x 5
   neighborhood.
3. Cluster the pixels by these features. Pixels with similar local texture get
   the same label.

The result is a map of regions inside the tumor.

## From the map to a score

For each class *k*, let *n<sub>k</sub>* be its number of connected pieces and
*A<sub>k</sub>* the area of its largest piece. With *N* tumor pixels,

```
ITHscore = 1 - (1/N) * sum over k of ( A_k / n_k )
```

- Every class forms one solid block: the score is near 0.
- The classes are scattered into many small pieces: the score is near 1.

## The whole method in pseudocode

```
Input: CT volume I, tumor mask M        Parameters: r = 2, K = 6

slice <- the slice of I where M has the largest area
T     <- tumor pixels of that slice;  N <- |T|
for each pixel p in T:
    phi[p] <- radiomic features of the (2r+1) x (2r+1) window at p
rescale every feature to [0, 1] over T
L     <- KMeans(phi, K), written back on the tumor   # map of regions

total <- 0
for k = 1 .. K:
    R <- connected pieces of class k in L, 1-pixel pieces dropped
    if R is empty: continue
    total <- total + (largest piece in R) / (number of pieces in R)
return 1 - total / N                                 # ITHscore
```

## Two studies

- **2019, pixel-level clustering.** Region maps of lung tumors, viewed at
  several resolutions, show three recurring patterns: uni-core, multi-core and
  diffused. Uni-core and diffused tumors differ in survival time.
- **2023, ITHscore.** The map is turned into one number, which can be computed
  for every patient and tested at scale.

## Results on 1399 patients

Validated on six patient cohorts, ITHscore

- rises with tumor stage;
- separates tumors with and without lymphovascular and pleural invasion;
- separates patient groups with different survival;
- correlates with heterogeneity-related gene pathways.

It needs no training labels, and it also works on head-and-neck cancer.

## My part and the code

I conceived and initiated this line of work and helped develop it with Jiaqi
Li, who led it and is first author of both papers, in collaboration with the
Guangdong Lung Cancer Institute.

[Code on GitHub](https://github.com/LiJiaqi96/ITHscore)
