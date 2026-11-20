---
title: Checkpoint colitis
description: Single-cell evidence that myeloid cells and IL‑6 drive the intestinal toxicity of CTLA-4 blockade.
importance: 13
category: biomedicine
related_publications: zhou2022ctla4
image: /assets/img/ctla4/thumb-umap.webp
image_alt: UMAP of colonic immune cells from mice treated with anti-CTLA-4
---

<div class="paper">

<img class="cover wide" src="/assets/img/ctla4/fig2ab-landscape.webp" alt="UMAP of 14,039 colonic immune cells in 19 clusters, and the share of each cluster in the four experimental groups." />

**[Intestinal toxicity to CTLA-4 blockade driven by IL-6 and myeloid infiltration](https://doi.org/10.1084/jem.20221333)**

<p class="authors">Yifan Zhou, Yusra B. Medik, Bhakti Patel, Daniel B. Zamler, <strong>Sijie Chen</strong>, Thomas Chapman, et al., James P. Allison, Patrick Hwu, Nadim J. Ajami, Adi Diab, Jennifer A. Wargo, Stephanie S. Watowich</p>

<p><i>Journal of Experimental Medicine</i> 220(2):e20221333, 2023.</p>

</div>

## The cost of checkpoint blockade

- **Immune checkpoint blockade**, such as anti-CTLA-4, releases the brakes on the immune system to fight cancer.
- It often causes **immune-related adverse events**, above all **colitis**, which can force therapy to stop.
- How these side effects arise was poorly understood, so they were hard to prevent.

## A mouse model of the toxicity

<figure class="tall">
<img src="/assets/img/ctla4/fig1abc-model.webp" alt="Treatment timeline, body weight over time in the four groups, and colon histology: inflammation-prone mice on anti-CTLA-4 lose weight and show colonic damage." />
<figcaption>Mice prone to gut inflammation (<i>Stat3</i><sup>Δ/Δ</sup>) develop <strong>colitis</strong> under anti-CTLA-4. Zhou et al., <i>J. Exp. Med.</i> 2023 (CC BY-NC-SA 4.0), Fig. 1A–C.</figcaption>
</figure>

## Single-cell profiling of the colon

- Colonic immune cells (live CD45<sup>+</sup>) from **four groups**: normal or inflammation-prone mice, each on anti-CTLA-4 or control antibody.
- **14,039 cells**, 7–8 mice per group, 10x Genomics.
- Quality control and **integration** of the four groups, **two-step doublet removal**, and cluster naming against the **ImmGen** reference.

## The immune landscape of the colon

<figure class="tall">
<img src="/assets/img/ctla4/fig2ab-landscape.webp" alt="UMAP of 19 clusters of colonic cells, and stacked bars of cluster proportions in each group." />
<figcaption><strong>19 clusters</strong>. Under anti-CTLA-4, inflammation-prone mice gain <strong>neutrophils</strong> and <strong>myeloid/monocytic cells</strong>. Zhou et al., <i>J. Exp. Med.</i> 2023 (CC BY-NC-SA 4.0), Fig. 2A,B.</figcaption>
</figure>

## Inflammatory programs switch on

<figure class="wide">
<img src="/assets/img/ctla4/fig2f-genesets.webp" alt="Violin plots of gene set scores for inflammation, chemotaxis, innate immune response and Th1 function in the four groups." />
<figcaption>Gene set scores for <strong>inflammation</strong>, <strong>chemotaxis</strong>, innate immunity and Th1 function are highest in inflammation-prone mice on anti-CTLA-4 (purple). Zhou et al., <i>J. Exp. Med.</i> 2023 (CC BY-NC-SA 4.0), Fig. 2F.</figcaption>
</figure>

## Measuring cell-cell crosstalk

For a ligand $L$ in cluster $i$ and a receptor $R$ in cluster $j$, with mean expressions $E_{L,i}$ and $E_{R,j}$,

$$
S_{L,R} \;=\; E_{L,i}\,E_{R,j}
$$

- Kept when $E_{L,i} > 1$ and $E_{R,j} > 1$.
- Tested by shuffling cell identities **10,000 times**; pairs with $p < 0.001$ are shown.

## Cytokine crosstalk intensifies

<figure class="wide">
<img src="/assets/img/ctla4/fig2g-crosstalk.webp" alt="Circular plots of significant cytokine and chemokine ligand-receptor links between clusters in the four groups; the inflammation-prone anti-CTLA-4 group has by far the most." />
<figcaption><strong>IL-1</strong>, <strong>TNF</strong> and <strong>CXCL9/10</strong> signaling between clusters is strongest in inflammation-prone mice on anti-CTLA-4. Zhou et al., <i>J. Exp. Med.</i> 2023 (CC BY-NC-SA 4.0), Fig. 2G.</figcaption>
</figure>

## Blocking IL-6 helps twice

<figure class="wide">
<img src="/assets/img/ctla4/fig5-therapy.webp" alt="Treatment timeline, tumor growth, tumor immune cells, colon histology and colitis scores: adding IL-6 blockade and antibiotics shrinks tumors and nearly removes colitis." />
<figcaption>Adding <strong>IL-6 blockade</strong> and antibiotics <strong>reduced colitis</strong> and <strong>improved tumor control</strong>. Zhou et al., <i>J. Exp. Med.</i> 2023 (CC BY-NC-SA 4.0), Fig. 5A–E.</figcaption>
</figure>

## The signature holds in patients

<figure class="wide">
<img src="/assets/img/ctla4/fig8ab-human.webp" alt="Immune cell abundances in colon biopsies from patients with checkpoint-blockade colitis compared with normal tissue." />
<figcaption>In biopsies from patients with checkpoint-blockade colitis, <strong>neutrophils</strong> and cytotoxic cells rise most. Zhou et al., <i>J. Exp. Med.</i> 2023 (CC BY-NC-SA 4.0), Fig. 8A,B.</figcaption>
</figure>

## Code and data

- The full single-cell analysis is public as notebooks: [github.com/chansigit/irae_reproduction](https://github.com/chansigit/irae_reproduction).
- Single-cell data: Gene Expression Omnibus **GSE159892**.
