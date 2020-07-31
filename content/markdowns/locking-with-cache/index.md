---
title: Locking with Cache
date: "2020-06-25T22:12:03.284Z"
description: How to do mutual exclusive lock with cache
---


Last week I was trying to create some mutual exclusive lock using cache.

Maybe I will provide some background on why I was trying to do this. Consider this scenerio,  some non-time sensitive external data is being pulled from some apis into a humble website for display, which is not time sensitive,

