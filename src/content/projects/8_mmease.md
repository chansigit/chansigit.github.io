---
title: MMEASE
description: An online platform for meta-analysis of metabolomic data, with its companion benchmark of normalization methods.
importance: 8
category: infrastructure
related_publications: yang2021mmease, li2016metapre
---

**MMEASE** is an online platform for the meta-analysis of metabolomic data. It
integrates data from several analytical experiments, annotates more than 330
thousand metabolites, and offers several strategies for marker selection and
enrichment analysis.

I worked on it as an undergraduate in Prof. Feng Zhu's group at Chongqing
University, from the core peak alignment algorithms in C++ to the user-facing
web interface. The alignment step decides which signals measured in different
experiments are the same metabolite and merges them into one table. I am
co-first author of the MMEASE paper.

In the same group I contributed to a benchmark of 16 normalization methods for
LC/MS untargeted metabolomics and to its online tool. The benchmark showed that
the methods fall into three performance groups, with VSN, log transformation
and PQN performing best.

[MMEASE website](https://idrblab.org/mmease/)
