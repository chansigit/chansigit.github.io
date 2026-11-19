---
title: Asthmatic Lung Atlas
description: A single-cell look at the lung in a mouse model of allergic asthma, matched to patient data.
importance: 11
category: biomedicine
related_publications: liu2024housedustmite
image: /assets/img/hdm-asthma/project-figure.webp
image_alt: Single-cell map of lung immune cells, with Mgl2+ dendritic cells, Gpnmb+ macrophages and Th2 cells labeled
---

<div class="paper">

<img class="cover wide" src="/assets/img/hdm-asthma/project-figure.webp" alt="Single-cell map of lung immune cells, colored by cell type, with Mgl2+ dendritic cells, Gpnmb+ macrophages, Th2 cells, B cells, NK cells and neutrophils labeled." />

**[Single-cell profiling highlight pathogenic myeloid features in house dust mite-induced murine model of airway inflammation](https://doi.org/10.1111/all.16156)**

<p class="authors">Jiachen Liu<sup>&#42;</sup>, Jiaoyan Lv<sup>&#42;</sup>, <strong>Sijie Chen</strong><sup>&#42;</sup>, Jie Ma<sup>&#42;</sup>, Jiaying Yao<sup>&#42;</sup>, Zan Yuan, Chunyuan Yang, Xiao Li, Xuegong Zhang, Yunping Zhu, Jianhong Zhang, Li Wu</p>

<p><i>Allergy</i> 80(5):1478–1481, May 2025 (online May 2024). <sup>&#42;</sup> equal contribution.</p>

</div>

## Which cells drive allergic asthma?

- In **allergic asthma**, the airways overreact to harmless particles such as **house dust mite**.
- **Dendritic cells** and **macrophages** shape this reaction, but their **subtypes** were poorly mapped.
- Mice were exposed to house dust mite, and their lung cells were read one by one with **single-cell RNA-seq**.
- The asthmatic lung was compared with the **healthy** lung, cell type by cell type.

## 26 immune cell types, annotated

<figure class="wide">
<img src="/assets/img/hdm-asthma/umap-immune.webp" alt="UMAP of 9684 lung immune cells, labeled with 26 cell types including T-cell subsets, B cells, NK cells, monocytes, macrophages, dendritic cells and neutrophils." />
<figcaption><strong>9,684 immune cells</strong> in <strong>26 annotated types</strong>. From <a href="https://doi.org/10.6084/m9.figshare.27852174.v1">our public dataset</a>.</figcaption>
</figure>

## 18 structural cell types, annotated

<figure class="wide">
<img src="/assets/img/hdm-asthma/umap-nonimmune.webp" alt="UMAP of 28039 non-immune lung cells, labeled with 18 cell types: six endothelial, seven epithelial and five stromal types." />
<figcaption><strong>28,039 structural cells</strong> in <strong>18 annotated types</strong>. From <a href="https://doi.org/10.6084/m9.figshare.27852174.v1">our public dataset</a>.</figcaption>
</figure>

## What changes in the asthmatic lung

<figure class="wide">
<img src="/assets/img/hdm-asthma/umap-immune-split.webp" alt="The immune-cell UMAP split into control and asthmatic lung. Mgl2+ dendritic cells grow from 57 to 183 cells, and 110 Gpnmb+ macrophages appear only in the asthmatic lung." />
<figcaption><strong>Mgl2⁺ dendritic cells</strong> expand, and <strong>Gpnmb⁺ macrophages</strong> appear only in asthma. Numbers are cell counts. Drawn from <a href="https://doi.org/10.6084/m9.figshare.27852174.v1">our public dataset</a>.</figcaption>
</figure>

## Two myeloid states change in asthma

- **Mgl2⁺ dendritic cells** expand in the asthmatic lung. They carry the most **Ccl17**, the signal that calls in **Th2 cells**.
- **Gpnmb⁺ macrophages** appear only in asthma. They arise from **monocytes** and look like **repair** cells.
- Blocking **Gpnmb** lowered repair genes such as **Il10**, so the molecule itself shapes these cells.
- Both findings were confirmed by **flow cytometry** or cell culture.

## The signals between cells

<figure class="wide">
<img src="/assets/img/hdm-asthma/circuit.svg" alt="Three rows: Mgl2+ dendritic cell to Th2 cell through Ccl17; CD300e+ monocyte becomes Gpnmb+ macrophage; structural cells to macrophages through Cxcl12, Igf1 and Tgfb." />
<figcaption><strong>Th2 cells</strong> also make <strong>Tgfb1</strong> besides Il5 and Il13, and <strong>structural cells</strong> signal more to macrophages after the challenge. Diagram drawn for this page.</figcaption>
</figure>

## The same cells in patients

- Two published **human asthma** datasets were re-analyzed and matched to the mouse cells.
- Mouse **Mgl2⁺ dendritic cells** match human **DC2**, which also expand after an allergen challenge.
- Mouse **Gpnmb⁺ macrophages** match human **SPP1⁺ macrophages**.
- In patients, **CCL17** rises in dendritic cells and **TGFB1** is over **2-fold** higher in Th2 cells.

## An annotated dataset, free to reuse

- All **37,723 cells** are public, each with its **cell-type label**: 26 immune and 18 structural types.
- Download the annotated data from **[figshare](https://doi.org/10.6084/m9.figshare.27852174.v1)** (Seurat objects, CC BY 4.0).
- The labels are in the `ann210320` column of the metadata.
- Raw sequencing data: GSA accession **CRA013812**.
