---
title: Sql Vs Command Line Data Manipulation
date: "2020-02-01T22:12:03.284Z"
description:
---

I have learned a couple of data manipulation commands, and here I have put it next to the closest SQL commands for a self quick reminder.


### UNION

*   `cat`

    e.g.

    ```
    cat file1 file2 file2
    ```


### LIMIT n

*   `head` -- show the top x lines
    ```
    head -5 somefile.txt
    ```
*   `tail` -- show the top 5 lines
    ```
    tail -5 somefile.txt
    ```


### ORDER BY

* `sort`

### DISTINCT/GROUP BY

* `uniq`
    *   group by count:

        `uniq -c`


### SIMPLE COUNT(*)

*   `wc`




## References


https://medium.com/@kadek/command-line-tricks-for-data-scientists-c98e0abe5da