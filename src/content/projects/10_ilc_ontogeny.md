---
title: ILC ontogeny
description: How innate lymphoid progenitors switch their output after birth, read from single-cell trajectories.
importance: 10
category: biomedicine
related_publications: wu2023ilc
image: /assets/img/ilc/thumb-velocity.webp
image_alt: RNA velocity streamlines over fetal and adult ILC progenitors
---

<div class="paper">

<img class="cover wide" src="/assets/img/ilc/thumb-velocity.webp" alt="RNA velocity streamlines drawn over the single-cell maps of fetal liver and adult bone marrow ILC progenitors." />

**[Dynamic regulation of innate lymphoid cell development during ontogeny](https://doi.org/10.1016/j.mucimm.2024.08.009)**

<p class="authors">Tao Wu<sup>&#42;</sup>, <strong>Sijie Chen</strong><sup>&#42;</sup>, Xinyi Zhu<sup>&#42;</sup>, Jie Ma<sup>&#42;</sup>, Maocai Luo, Yuanhao Wang, Yujie Tian, Qingqing Sun, Xiaohuan Guo, Jianhong Zhang, Xuegong Zhang, Yunping Zhu, Li Wu</p>

<p><i>Mucosal Immunology</i> 17(6):1285–1300, December 2024. <sup>&#42;</sup> equal contribution.</p>

</div>

## Immune cells whose mix changes with age

- **Innate lymphoid cells** (ILCs) act like helper T cells, but without antigen receptors.
- Before birth, **LTi cells** dominate: they build **lymph nodes** and gut lymphoid tissue.
- After birth, the other subsets, **ILC1, ILC2 and ILC3**, take over to fight pathogens.
- What drives this switch was **unknown**.

## The progenitors switch within a week

- In every organ, the ratio of LTi to other ILCs **falls after birth** and settles by **week two**.
- **Fetal** progenitors prefer to make **LTi cells**; **adult** progenitors prefer **ILC1 and ILC2**.
- Bone-marrow progenitors change their output in the **first week after birth**, before the tissues do.
- So the switch starts in the **progenitors**. Single-cell data were used to find out **why**.

## A single-cell map of rare progenitors

<figure class="wide">
<img src="/assets/img/ilc/fig4ab-clusters.webp" alt="Left: UMAP of fetal and adult ILC progenitors with ten labeled clusters. Right: dot plot of marker genes across the clusters." />
<figcaption><strong>4284 fetal</strong> and <strong>3442 adult</strong> progenitors, integrated into <strong>ten clusters</strong>, from early αLP1 states to EILP, ILCP, LTi and ILC2 precursors. From Wu, Chen et al., <i>Mucosal Immunology</i> 2024 (CC BY-NC-ND 4.0), Fig. 4A,B.</figcaption>
</figure>

## Same path, different ends

<figure class="wide">
<img src="/assets/img/ilc/fig4cde-velocity.webp" alt="RNA velocity streamlines over fetal liver and adult bone marrow progenitors, and a schematic of four differentiation paths." />
<figcaption>RNA velocity finds the <strong>same four paths</strong> at both stages. The ILC path (<strong>Path 3</strong>) ends in <strong>LTi precursors</strong> in the fetus but in <strong>ILC2 precursors</strong> in the adult. From Wu, Chen et al., <i>Mucosal Immunology</i> 2024 (CC BY-NC-ND 4.0), Fig. 4C–E.</figcaption>
</figure>

## From snapshots to a time course

1. **RNA velocity** from spliced and unspliced reads gives each cell a direction of change.
2. **Dynamo** turns the velocities into a continuous **vector field**.
3. A **least action path** through the field links the start and end states.
4. Averaging cells along the path gives a **gene × time** expression matrix.

## Gene modules that are also co-timed

<div class="algo">
<p class="algo-cap"><b>Algorithm 1</b> <span class="fn">TSC</span> (temporal spatial consensus)</p>
<p><b>Input:</b> SCENIC regulatory network <i>G<sub>S</sub></i> on genes <i>V</i>; expression series <i>X</i> (genes × time) along the path</p>
<p><b>Output:</b> gene regulatory modules</p>
<ol>
<li><span><b>for</b> each pair of genes <i>u</i>, <i>v</i> <b>do</b></span></li>
<li class="i1"><span><i>d</i>(<i>u</i>, <i>v</i>) ← <span class="fn">DTW</span>(<i>X<sub>u</sub></i>, <i>X<sub>v</sub></i>)</span><span class="cm">▷ dynamic time warping</span></li>
<li><span><b>end for</b></span></li>
<li><span><i>G<sub>T</sub></i> ← mutual <i>k</i>-NN graph of <i>d</i>, <i>k</i> = 20</span><span class="cm">▷ temporal layer</span></li>
<li><span><i>M</i> ← multiplex network of <i>G<sub>T</sub></i> and <i>G<sub>S</sub></i></span><span class="cm">▷ same genes, two layers</span></li>
<li><span><i>z</i> ← <span class="fn">Node2Vec</span>(<i>M</i>)</span><span class="cm">▷ one vector per gene</span></li>
<li><span><b>return</b> hierarchical clustering of <i>z</i></span></li>
</ol>
</div>

## Notch and GATA3 rise in adult progenitors

<figure class="wide">
<div class="twin">
<img src="/assets/img/ilc/fig6c-notch-genes.webp" alt="Heatmap of Notch1, Notch2, Rbpj, Tcf7, Gata3, Bcl11b, Rorc and Id2 along clusters C5, C6, C3, C7 in fetal liver and adult bone marrow." />
<img src="/assets/img/ilc/fig6d-ternary.webp" alt="Ternary plots of RORγt, Gata3 and Notch activity: fetal cells sit near RORγt, adult cells near Notch and Gata3." />
</div>
<figcaption>Left: adult progenitors express more <strong>Notch</strong> genes, <strong>Gata3</strong> and <strong>Bcl11b</strong>; fetal ones more <strong>Rorc</strong>. Right: cell states move from <strong>RORγt</strong>-dominant (fetal) to <strong>Notch / GATA3</strong>-dominant (adult). From Wu, Chen et al., <i>Mucosal Immunology</i> 2024 (CC BY-NC-ND 4.0), Fig. 6C,D.</figcaption>
</figure>

## A seesaw of Notch, GATA3 and RORγt

<div class="cols">
<div>

- Stronger **Notch** in adults raises **GATA3** and **BCL11B**, which repress **RORγt**.
- Less RORγt means fewer **LTi cells** and more of the other subsets.
- Experiments in mice confirmed it: adding **GATA3** or halving **RORγt** shifted the output, and adding RORγt back restored LTi cells.
- Data: GSA accession **CRA011319**.

</div>
<img src="/assets/img/ilc/fig6g-model.webp" alt="Schematic: the Notch receptor induces GATA3 and BCL11B, which repress RORγt." />
</div>
