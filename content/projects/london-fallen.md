---
group: apps
order: 3
short: "London Fallen"
sub: "Survival Game"
started: "May 2026"
blurb: "An open-world PvE and PvP survival game set in a fallen London."
badge: "Shelved"
title: "London Fallen"
date: 2026-09-15
draft: false
tags: ["game","lua","work-in-progress"]
description: "An open-world PvE and PvP survival game set in a fallen London."
---

> **Status: work in progress.**

## The Idea

London Fallen is an open-world survival game set in a collapsed London. Players scavenge, fight zombies and each other, and build up gear across a map that is recognisably the real city — including the Tube.

## Building a Real City

Rather than modelling London by hand, I wrote Lua scripts that generate it from **OpenStreetMap** data: buildings, parks and roads are placed from real map data, so streets and landmarks sit where they should.

## Game Design

The design document covers the full loop:

- **Loot** — medkits, bandages, stims, armour plates, spare magazines, riot shields and supply-drop flares, each with a rarity and a place it can be found (floor, crate, vault or supply drop)
- **Zones** — danger ratings across the map, with the best loot in the most dangerous areas
- **Movement** — crouch, prone, slide and lean
- **Progression** — ranks, kill systems, a personal base, day–night cycles and an enraged horde every tenth night

## Next

The map generation works; next are interiors, weapons and the zombie AI.
