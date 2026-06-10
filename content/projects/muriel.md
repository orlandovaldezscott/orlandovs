---
title: "Muriel — Building a Passport System for AI Agents"
date: 2026-05-01
draft: false
tags: ["ai","security","cryptography","python"]
---

## The Problem

AI agents are everywhere now. They book flights, make purchases, send emails — all without a human touching a keyboard. But there's a problem nobody has solved yet: how does Skyscanner know the agent booking a flight is legitimate? How does any API know who the agent is, who owns it, and what it's actually allowed to do?

Right now it doesn't. There's no standard. No identity layer. No audit trail. If an agent spends £50,000 on plane tickets instead of £5,000, nobody knows who's responsible and nobody can prove what happened.

That's what Muriel is for.

## What It Is

Muriel is a passport system for AI agents. Just like a real passport proves who you are at a border, a Muriel passport proves an agent's identity, who owns it, what it's allowed to do, and logs everything it does.

Every API call passes through a passport gate before anything happens. The gate is border control. The passport is the credential. We are the issuing authority.

The system has three parts:

**Agent Passport** — a cryptographically signed JWT credential containing the agent's identity, owner, permitted scope, and expiry. Signed with ES256 (elliptic curve). Tamper-proof.

**Passport Gate** — middleware that sits in front of any API. Every request presents a passport. The gate verifies the signature, checks the scope, checks revocation status, logs the action, then allows or denies.

**Audit Log** — a tamper-proof receipt of everything the agent has done. Every API call, every payment, every site accessed. This is the commercial asset.

## Why It Matters

The individual developer doesn't pay for this. They use it free, and their agents generate volume. The real customers are the people who get sued when something goes wrong.

When an agent makes a fraudulent purchase, the question becomes: who authorised it, what was it supposed to do, and what did it actually do? Right now there's no answer. Muriel makes that answerable — and that's worth paying for.

Real customers are compliance officers at enterprises, insurers underwriting AI risk, and legal teams needing tamper-proof evidence after disputes. The EU AI Act is already pushing platforms toward agent accountability. The infrastructure doesn't exist yet.

## The Technical Stack

Built as lean as possible — the entire MVP costs about £10 to run.

- **Flask + PyJWT** — passport issuer with ES256 signing
- **Cryptography library** — key pair generation per owner
- **Cloudflare Workers** — global gate middleware (runs at the edge, ~2ms verification)
- **Cloudflare KV** — real-time revocation store
- **Supabase** — passport and log database
- **GitHub OAuth** — owner identity verification

The verification itself is pure cryptographic math — checking a JWT signature takes 1–5ms. No meaningful latency impact on API calls.

## Where It Is Now

The core passport system is built and working. An owner registers, gets a key pair, issues a signed passport to their agent, and every API call the agent makes is verified and logged by the gate. Revocation works in real time — pull a passport and the agent is blocked on the next call.

The demo runs a fake agent booking a flight: valid passport goes through and is logged, wrong scope gets denied and logged, expired or revoked passport gets denied and logged. The audit trail is the proof.

Next step is integrating the gate into real agent frameworks — CrewAI, LangGraph, OpenAI Agents SDK — so developers can passport-enable any agent they build without writing the infrastructure themselves.

The long-term vision is to be what Let's Encrypt is to SSL certificates, or what OAuth is to login — invisible infrastructure that the whole ecosystem depends on.
