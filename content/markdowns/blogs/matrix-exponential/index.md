---
title: Matrix Exponential
date: "2021-06-15T00:00:00.000Z"
description: Quick summary for Matrix Exponential
type: blog
---

What is <b>Matrix Exponential</b> $e^{\mathbf{M}t}$?

Wikipedia does have an entry on the [topic](https://en.wikipedia.org/wiki/Matrix_exponential), which I confess is a bit above my head.  Instead I would like to recommend [3Blue1Brown](https://www.3blue1brown.com/)'s excellent video [How (and why) to raise e to the power of a matrix](https://www.youtube.com/watch?v=O85OWBJ2ayo).


The rest of this article is simply my quick summary of what I think Matrix Exponential is.


Matrix Exponential $e^{\mathbf{M}t}$ is a notation, with a definition similar to MacLaurin series of Exponential function.

$$
e^{\mathbf{M}t} =  \sum_{n=0}^{\infty} \frac{1}{n!} \mathbf{M}^n t^n
       = 1 + \frac{1}{1!} \mathbf{M}^1 t^1 + \frac{1}{2!} \mathbf{M}^2 t^2 + \frac{1}{3!} \mathbf{M}^3 t^3 \dots

$$

This formulation is invented for solving diffential equation of the following form:

$$
 \frac{d}{dt}\vec{\mathbf{v}}(t) = \mathbf{M} \vec{\mathbf{v}}(t)
$$

A solution of the above differential equation is:

$$
\vec{\mathbf{v}}(t) =  e^{\mathbf{M}t} \vec{\mathbf{v}}_{0}
$$


