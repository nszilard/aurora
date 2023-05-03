---
date: {{ .Date }}
author: {{ $.Site.Params.author.firstname }} {{ $.Site.Params.author.lastname }}
title: {{ replace .Name "-" " " | title }}
description: # SEO friendly description
---
