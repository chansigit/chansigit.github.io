---
title: ITHscore
description: Resolving the interior of a tumor from a routine CT scan, and scoring how heterogeneous it is.
importance: 6
category: imaging
related_publications: li2023ithscore, li2019pixelclust
---

Radiomics usually treats a tumor as one object: it extracts one feature vector
from the whole tumor and then classifies the tumor. This work looks inside
instead. It uses texture features computed around every pixel to divide the
interior of a tumor into regions, so that the internal structure itself becomes
the information.

**How it works.**

1. Take the CT slice where the tumor is largest.
2. For every tumor pixel, compute radiomic texture features on its 5 x 5
   neighborhood.
3. Cluster the pixels by these features. Pixels with similar local texture get
   the same label, which gives a map of regions inside the tumor.
4. Score the map. For each class *k*, let *n<sub>k</sub>* be the number of
   connected pieces and *A<sub>k</sub>* the area of the largest piece. With *N*
   tumor pixels,

```
ITHscore = 1 - (1/N) * sum over k of ( A_k / n_k )
```

A tumor in which every class forms one solid block scores near 0. A tumor in
which the classes are scattered into many small pieces scores near 1.

**Results.** The first study found recurring spatial patterns in the region
maps of lung tumors that relate to patient survival. ITHscore then turned the
map into a number and validated it on six patient cohorts (1399 patients): it
rises with tumor stage, separates tumors with and without lymphovascular and
pleural invasion, and separates patient groups with different survival. It
needs no training labels and also works on head-and-neck cancer.

I conceived and initiated this line of work and helped develop it with Jiaqi Li,
who led it and is first author of both papers, in collaboration with the
Guangdong Lung Cancer Institute.

[Code on GitHub](https://github.com/LiJiaqi96/ITHscore)
