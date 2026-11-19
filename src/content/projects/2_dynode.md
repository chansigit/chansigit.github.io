---
title: Dynode
description: SE(3)-equivariant transformer-based neural ODEs for 3D organogenesis.
importance: 2
category: single-cell
---

## An organ forming in 3D, as a dynamical system

Dynode models 3D organogenesis from spatiotemporally resolved single-cell data.

It describes how both the shape of the tissue and the gene expression of its
cells change over time, and connects the measured time points through optimal
transport.

## Key ingredients

- An SE(3)-equivariant transformer backbone: feature updates respect rotations
  and translations of the tissue.
- A continuous-time neural ODE for trajectory inference.
- Optimal-transport regularisation that ties the snapshots together through
  Wasserstein consistency.

## Experiments in the computer

The trained model supports *in silico* knockouts: remove a gene and let the
dynamics run forward.

This is used to generate hypotheses about regulators of cardiac development
and about congenital heart disease.

The preprint is in preparation and will be linked here once posted.
