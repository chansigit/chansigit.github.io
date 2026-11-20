---
title: Tfh cells in colitis
description: Single-cell evidence that T follicular helper cells drive chronic colitis, and where those cells go next.
importance: 12
category: biomedicine
related_publications: bai2024tfh
image: /assets/img/tfh-colitis/thumb-velocity.webp
image_alt: RNA velocity streamlines over colonic T cells, flowing from Tfh-like clusters to effector clusters
---

<div class="paper">

<img class="cover" src="/assets/img/tfh-colitis/velocity-mouse.webp" alt="RNA velocity streamlines drawn over a single-cell map of colonic T cells, flowing from Tfh-like clusters at the bottom to effector T-cell clusters above." />

**[Reciprocal regulation of T follicular helper cells and dendritic cells drives colitis development](https://doi.org/10.1038/s41590-024-01882-1)**

<p class="authors">Xue Bai, <strong>Sijie Chen</strong>, Xinxin Chi, Bowen Xie, Xinyi Guo, Han Feng, Peng Wei, Di Zhang, Shan Xie, Tian Xie, Yongzhen Chen, Mengting Gou, Qin Qiao, Xinwei Liu, Wei Jin, Wei Xu, Zixuan Zhao, Qi Xing, Xiaohu Wang, Xuegong Zhang, Chen Dong</p>

<p><i>Nature Immunology</i> 25(8):1383–1394, August 2024.</p>

</div>

## An unexpected driver of chronic colitis

- **Chronic colitis** is a long-lasting inflammation of the gut whose immune mechanism is poorly understood.
- **Tfh cells** (T follicular helper cells) are known for helping **B cells** make antibodies.
- In a mouse model of colitis, Tfh cells gather with mature **dendritic cells** in the gut's lymphoid follicles, forming **DC–T clusters**.
- Single-cell data were used to **identify** these Tfh cells and to ask **what they become**.

## Immune cells of the colonic patches

<figure class="tall">
<img src="/assets/img/tfh-colitis/umap-immune.webp" alt="UMAP of immune cells from colonic patches in 13 clusters: T cells, cycling T cells, dendritic cells, pre-DCs, macrophages, neutrophils and other myeloid cells." />
<figcaption><strong>13 clusters</strong> of immune cells: T cells, <strong>dendritic cells</strong>, macrophages, neutrophils. <a href="https://doi.org/10.6084/m9.figshare.25690755">Source</a>.</figcaption>
</figure>

## Finding the Tfh cells

<figure class="tall">
<img src="/assets/img/tfh-colitis/tfh-markers.webp" alt="Feature plots of Bcl6, Tox, Tox2, Tcf7, Cxcr5 and Tbx21 over the T-cell UMAP. The Tfh genes concentrate in the lower clusters." />
<figcaption>The lower T-cell clusters carry the Tfh genes <strong>Bcl6, Tox, Tox2, Tcf7, Cxcr5</strong>. <a href="https://doi.org/10.6084/m9.figshare.25690755">Source</a>.</figcaption>
</figure>

## Where Tfh cells go next

<div class="cols">
<div>

- **RNA velocity** gives each cell a direction of change.
- Most tracks **start in the Tfh clusters** and flow into the **effector T-cell** clusters.
- Along the way, Tfh genes such as **Tcf7** and **Bcl6** switch off.
- Lineage tracing in mice confirmed it: Tfh cells become long-lived, disease-driving **Th1 cells**.

</div>
<img src="/assets/img/tfh-colitis/velocity-mouse.webp" alt="RNA velocity streamlines over the T-cell UMAP, running from Tfh-like clusters 0, 1 and 2 at the bottom up into the Teff clusters." />
</div>

## The same path in patients

<div class="cols">
<div>

- A public dataset of **ulcerative colitis** patients was re-analyzed the same way.
- A T-cell cluster found mainly in patients carries the Tfh genes **CXCR5, BCL6, PDCD1**.
- Velocity again runs **from Tfh cells to effector T cells**.
- [Code and data](https://doi.org/10.6084/m9.figshare.25802005) for this re-analysis are public.

</div>
<img src="/assets/img/tfh-colitis/velocity-human.webp" alt="RNA velocity streamlines over a UMAP of human CD4 T cells from ulcerative colitis patients and controls, in seven clusters." />
</div>

## What the study concludes

- **Tfh cells and dendritic cells need each other**: Tfh cells bring in mature dendritic cells, which in turn make more Tfh cells.
- With normal T cells, **90%** of the dendritic cells are mature; without Bcl6, only **34%**.
- Tfh cells then move into the gut wall and turn into the **Th1 cells** that drive colitis.
- Analysis notebooks and data: **[figshare](https://doi.org/10.6084/m9.figshare.25690755)** (CC BY 4.0). Raw data: GSA **CRA016814**.
