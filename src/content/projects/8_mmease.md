---
title: MMEASE
description: An online platform for meta-analysis of metabolomic data, with its companion benchmark of normalization methods.
importance: 8
category: infrastructure
related_publications: yang2021mmease, li2016metapre
---

## Meta-analysis of metabolomic data, online

MMEASE is an online platform that

- integrates data from several analytical experiments;
- annotates more than 330 thousand metabolites;
- offers several strategies for marker selection and enrichment analysis.

[MMEASE website](https://idrblab.org/mmease/)

## Peak alignment across experiments

At the core of the platform is peak alignment, implemented in C++.

The alignment step decides which signals measured in different experiments are
the same metabolite and merges them into one table, which the rest of the
analysis works on.

## A benchmark of normalization methods

A companion study benchmarked 16 normalization methods for LC/MS untargeted
metabolomics and comes with its own online tool.

The methods fall into three performance groups, with VSN, log transformation
and PQN performing best.
