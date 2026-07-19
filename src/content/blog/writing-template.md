---
title: "Post title"
description: "A one-sentence description for the Blog index and RSS feed."
publishedAt: 2026-07-18
tags:
  - research
draft: true
featured: false
---

This file is excluded from production routes and feeds while `draft` is `true`. It remains visible in the public repository and must not contain sensitive material.

## Section heading

Write in standard Markdown. Inline mathematics such as $a_t \sim \pi(\cdot \mid s_t)$ and display equations are supported:

$$
\mathcal{L}(\theta) = \mathbb{E}_{(x,y) \sim \mathcal{D}}[-\log p_\theta(y \mid x)].
$$

```python
def evaluate(policy, environment):
    return environment.rollout(policy)
```
