---
title: Meniscus atlas
description: A single-cell atlas of the human knee meniscus, a fibrocartilage, and what changes when it degenerates.
importance: 9
category: biomedicine
related_publications: fu2022meniscus
image: /assets/img/meniscus/thumb-model.webp
image_alt: Schematic of a normal and a degenerated meniscus
---

<div class="paper">

<img class="cover wide" src="/assets/img/meniscus/fig6-model.webp" alt="Schematic of a normal and a degenerated meniscus: in degeneration, matrix disassembly, new blood vessels and inflammation reinforce each other." />

**[Cellular features of localized microenvironments in human meniscal degeneration: a single-cell transcriptomic study](https://doi.org/10.7554/eLife.79585)**

<p class="authors">Weili Fu<sup>&#42;</sup>, <strong>Sijie Chen</strong><sup>&#42;</sup>, Runze Yang, Chen Li, Haoxiang Gao, Jian Li, Xuegong Zhang</p>

<p><i>eLife</i> 11:e79585, December 2022. <sup>&#42;</sup> equal contribution.</p>

</div>

## Knee degeneration starts in the meniscus

- The **meniscus** is a **fibrocartilage** pad that cushions and lubricates the knee.
- Its degeneration is a main route to **knee osteoarthritis**, but the **cells** behind it were poorly known.
- Earlier work gave only a **rough** picture of the cell types.
- This study maps the cells **precisely**, and shows what **changes** in degeneration.

## Study design

<figure class="wide">
<img src="/assets/img/meniscus/fig1b-design.webp" alt="Study design: tissue from donors is split into inner and outer parts, sequenced, and analyzed." />
<figcaption>Inner (white) and outer (red) zones were collected <strong>separately</strong>, from <strong>12 samples</strong> of <strong>8 patients</strong>, degenerated and normal. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 1B.</figcaption>
</figure>

## Four cell classes in both zones

<figure class="tall">
<img src="/assets/img/meniscus/fig1-cell-classes.webp" alt="UMAP maps of the cells from the inner and outer meniscus, colored by donor and by cell class, and the proportion of each class per sample." />
<figcaption><strong>Chondrocytes</strong>, <strong>ACTA2<sup>+</sup> cells</strong>, <strong>endothelial</strong> and <strong>immune</strong> cells. The inner zone, thought to have no vessels, contains endothelial cells. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 1C–H.</figcaption>
</figure>

## Seven chondral populations, in a hierarchy

<figure class="wide">
<img src="/assets/img/meniscus/fig2ad-types.webp" alt="Left: UMAP of chondrocytes and pericyte-like cells colored by population, Ch.1 to Ch.5, PCL.1 and PCL.2. Right: tree of the populations with their marker genes." />
<figcaption>Left: the <strong>five chondrocyte</strong> populations Ch.1–Ch.5 and <strong>two pericyte-like</strong> populations PCL.1–2. Right: they are defined <strong>top-down</strong> on a hierarchy of meta-cells, with marker genes at each split. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 2A,D.</figcaption>
</figure>

## What changes in degeneration

<figure class="tall">
<img src="/assets/img/meniscus/fig3ab-degeneration.webp" alt="Volcano plot of genes higher or lower in degeneration, and the proportion of each cell population in normal and degenerated menisci." />
<figcaption><strong>Collagen and matrix genes</strong> rise. The <strong>Ch.2</strong> and <strong>Ch.3</strong> populations grow, while <strong>Ch.1</strong> and the pericyte-like cells shrink. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 3A,B.</figcaption>
</figure>

## Confirmed by imaging

<figure class="wide">
<img src="/assets/img/meniscus/fig4ab-imaging.webp" alt="Multiplex immunofluorescence of a normal and a degenerated meniscus, with markers of the chondrocyte and pericyte-like populations." />
<figcaption>Markers of the new subtypes were stained in <strong>normal</strong> and <strong>degenerated</strong> tissue, showing where each population sits. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 4A,B.</figcaption>
</figure>

## Measuring cell-cell crosstalk

With mean expression $E_{L,i}$ of a ligand $L$ in sender cluster $i$, and $E_{R,j}$ of a receptor $R$ in receiver cluster $j$,

$$
\mathrm{crosstalk}(i,j) \;=\; \sum_{(L,R)} E_{L,i}\,E_{R,j} \quad \text{over pairs with } E_{L,i}E_{R,j} > \theta
$$

- Pairs from **CellTalkDB**, $\theta = 1.5$, tested against **shuffled cluster labels**.
- Groups are compared by **subtracting**.

## Crosstalk rises in degeneration

<figure class="tall">
<img src="/assets/img/meniscus/fig5i-crosstalk.webp" alt="Heatmaps of crosstalk between cell populations, normal on the left and degenerated on the right, with much stronger signals in the degenerated group." />
<figcaption>Signals from <strong>chondrocytes</strong> to the other populations are much <strong>stronger</strong> in degenerated menisci. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 5I.</figcaption>
</figure>

## A loop that drives degeneration

<figure class="big">
<img src="/assets/img/meniscus/fig6-model.webp" alt="Schematic of a normal and a degenerated meniscus: in degeneration, matrix disassembly, new blood vessels and inflammation reinforce each other." />
<figcaption><strong>Matrix breakdown</strong>, <strong>new blood vessels</strong> and <strong>inflammation</strong> feed each other. From Fu, Chen et al., <i>eLife</i> 2022 (CC BY 4.0), Fig. 6.</figcaption>
</figure>

## An open resource

- The data are public in the **Genome Sequence Archive** for human, accession **PRJCA008120**.
- The atlas was also released as an **online cell browser**.
- The authors suggest the mechanism may hold for **other joint degenerations**, and propose the new subtypes as possible **therapeutic targets**.
