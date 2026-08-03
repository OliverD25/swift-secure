#!/usr/bin/env bash
# Sequential on purpose: each audit launches a browser and spawns a second node
# process for the throttled mobile measurement. Running these concurrently
# would contend for CPU and distort the very timings being measured.
for d in zlot.com bet10bet.com pk8.com yasalbahis.com narniumcasino.com fatbets.com raize.poker matadorbet.com spinman.com partybet.ai bizbet.mobi evetabi.com; do
  echo "########## $d"
  node audit.mjs "$d" 2>&1
done
