---
title: TransMap
description: Image-native representations for single-cell genomics via Gromov–Wasserstein optimal transport.
importance: 1
category: single-cell
related_publications: chen2026transmap
---

## Gene expression has no natural layout

A single cell is measured as a long, sparse vector of gene-expression values.
The order of the genes in that vector means nothing, so a convolutional
network, which relies on neighboring pixels being related, has nothing to work
with.

Token-based foundation models can learn gene–gene structure, but at a large
parameter cost.

## Idea: give every gene a pixel

TransMap places the genes on a fixed 2D pixel grid so that nearby pixels carry
related genes. Each cell then becomes a *feature image*.

Gene–gene structure turns into spatial locality, which modern convolutional
architectures exploit directly.

## How the layout is computed

1. Build a gene–gene distance matrix, from STRING co-expression evidence or
   from pseudobulk Pearson correlation.
2. Solve a Gromov–Wasserstein coupling between this matrix and the metric of
   the grid, with entropic regularisation.
3. Round the soft transport plan to a hard assignment, one gene per pixel, by
   sparse bipartite matching.

## Several species on one grid

A fused Gromov–Wasserstein procedure aligns several species on a shared grid.
Ortholog pairs enter as feature costs instead of being collapsed into a single
feature axis.

A shared 5-species grid aligns human and mouse pancreas cells without ortholog
conversion: iLISI = 1.297 and 76.4% label-transfer accuracy.

## Results

- A CNN with about 15M parameters on TransMap images beats parameter-matched
  MLPs (scVI) on five multi-organ scRNA-seq benchmarks, up to 714k cells from
  167 donors, on scIB embedding and scGraph structural metrics.
- The gain comes from the geometry, not the architecture: random layouts
  plateau at a validation loss of about 655, against about 462 for
  Gromov–Wasserstein layouts.

Code release is planned alongside publication.
