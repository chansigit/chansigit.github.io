---
layout: page
title: TransMap
description: Image-native representations for single-cell genomics via Gromov–Wasserstein optimal transport.
img: assets/img/transmap.png
importance: 1
category: research
related_publications: chen2026transmap
---

**TransMap** reorganises sparse single-cell gene-expression vectors as 2D
*feature images* by placing genes on a fixed pixel grid via discrete optimal
transport, so that nearby pixels carry related genes. Modern convolutional
architectures can then exploit gene–gene structure as spatial locality —
without the parameter cost of token-based foundation models.

**Method.** A Gromov–Wasserstein coupling between a gene–gene distance matrix
(STRING co-expression evidence or pseudobulk Pearson) and a fixed grid metric
is solved with entropic regularisation; the soft transport plan is rounded to
an injective hard assignment via sparse bipartite matching. For cross-species
analysis, a fused Gromov–Wasserstein BCD procedure aligns multiple species on
a shared grid, treating ortholog pairs as harmonic-weighted feature costs
rather than collapsing them into a single feature axis.

**Results.** A ~15M-parameter CNN on TransMap images beats parameter-matched
MLPs (scVI) on five multi-organ scRNA-seq benchmarks (up to 714k cells / 167
donors) on scIB embedding and scGraph structural metrics. A shared 5-species
grid aligns human–mouse pancreas cells (iLISI = 1.297, 76.4% label-transfer
accuracy) without ortholog conversion. A random-layout ablation confirms the
gains come from the geometry, not the architecture: random layouts plateau at
~655 val loss versus ~462 for GW layouts.

Code release planned alongside publication.
