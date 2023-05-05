---
draft: false
date: {{ .Date }}
image:
author: {{ $.Site.Params.author.firstname }} {{ $.Site.Params.author.lastname }}
title: {{ replace .Name "-" " " | title }}
description: <an SEO friendly description>
summary: |
categories:
#  - Professional
#  - Personal
topics:
#  - Go
---
