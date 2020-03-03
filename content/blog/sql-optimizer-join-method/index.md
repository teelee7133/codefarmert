---
title: Simple analysis on Nested-loop, Merge Sort and Hash Join
date: "2020-02-01T22:12:03.284Z"
description: "A quick analysis of the most common sql database join methods."
---

There are 3 common database join methods:

*   Nested-loop
*   Merge Sort
*   Hash Join

Here I am trying to do a simple comparison analysis on these various methods.

Let us suppose we have 2 tables `A` & `B`, with primary keys `A.id` and `B.id` respectively.  Tables `A` and `B` has a one-to-many relationship, where table `A` has `A.b_id` as a Foreign Key to `B`.  Also let table `A` has **m** rows, and `B` has **n** rows.  We shall also assume we have some sort of B-tree index on `A.id`  and `B.id`.

*   Case 1:

    `SELECT * FROM A JOIN B on A.b_id = B.id`

    *   **Nested-loop Join**

        Plan: It first scan through A, and on each row, search the index on B.

        Cost: O(m x log(n))

    *   **Merge Sort** (A is presorted by A.b_id)

        E.g. A has clustered index on A.b_id (likely if A has one-to-one relationship with B).

        Plan: A simply Merge with B.

        Cost: O(m + n)

    *   **Merge Sort** (A is NOT presorted by A.b_id)

        Plan:  It first sort A by A.b_id, then Merge with B.

        Cost: O(m x log(m) + m + n) = O(m x log(m))

    *   **Hash Join**

        Plan:  It first scan through A to create a Hash, then it loop through B and probe the created Hash.  The cost of accessing the Hash should be of O(1) in most cases, unless there is heavy collisions.

        Cost: O(m + n  + m) = O(2m + n)

*   Case 2:

    `SELECT * FROM A JOIN B on A.b_id = B.id WHERE A.id =? `

    *   **Nested-loop Join**

        Plan:  It first does index seek through A, and on each row, search the index on B.

        Cost: O(log(m) + log(n))

    *   **Merge Sort**

        Plan:  It first does index seek through A, sort resulting set by A.b_id (this case, nothing, as we have only 1 row), then Merge with B.

        Cost: O(log(m) + n)

    *   **Hash Join**

        Plan:  It first does index seek through A, scan through the resulting set to create a Hash on A.b_id (again cost minimal in this case as we have only 1 row), then it loop through B and probe the created Hash.

        Cost: O(log(m) + n)

For one row result, Nested-loop rocks.  For large pre-sorted dataset on the join keys, Merge Sort rocks.  For any other large dataset, Hash Join rocks.

Hope this helps!!

