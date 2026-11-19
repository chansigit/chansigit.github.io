---
title: scMulan
description: A 368M-parameter multitask generative pre-trained model for single-cell analysis.
importance: 3
category: single-cell
related_publications: bian2024scmulan
---

## One generative model for many single-cell tasks

scMulan is a multitask generative pre-trained foundation model for single-cell
RNA-seq analysis.

- 368M parameters
- pre-trained on about 10M cells

## What it does

- Zero-shot cell-type annotation
- Batch correction
- Conditional generation of cells

## My part

- Latent-variable model design: joint-VAE universal coordinate systems that
  support alignment across platforms and across modalities.
- Dataset curation and evaluation.

Presented at RECOMB 2024.

[Project repository on GitHub](https://github.com/Zhang-lab-AI/scMulan)
