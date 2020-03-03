---
title: Informal Normalization/Normal Forms
date: "2018-05-28T22:40:32.169Z"
description: Very succint/informal summary of various database normal forms.
---


One way of defining Database Normal Forms are using Tuples, Super Keys, Functional Dependency etc.
However sometimes those definitions are very abstract and formal and I need some informal definitaion to intuitive give me a summary of what these normals are about.
Therefore I have some informal summary as below.


*   **1st Normal Form**

    atomic attributes, e.g, no comma delimited list within an attribute/a column

*   **2nd Normal Form**

    no compound primary key, e.g. if Entity A & B has a many-to-many relationship, joining them via this relationship will result in the normal form being violated

*   **3rd Normal Form**

    e.g if Entity A & B has a one-to-many relationship, then joining them will result in violation of 3rd normal form.

*   **BCNF**

    e.g. if Entity A & B has a one-to-many relationship and Entity A has a compound key where one key attribute has a one-to-one relationship with B, joining them will result in violation of BCNF.

*   **4th Normal Form**

    e.g. if many-to-many relationship exists between Entity A & B, and between B & C , the result of joining those relationship will result in violation of 4th Normal Form

*   **5th Normal Form**

    e.g. if many-to-many relationship exists between Entity A & B, between B & C , and between A & C, the result of joining those relationship will result in violation of 5th Normal Form
