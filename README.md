[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/oxizbinance-aox/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/oxizbinance-aox/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

# GTA 6 SEGILA INI — AI Clipper

An entry for the [make.fun](https://make.fun/bounty/gta6-clipper-01) bounty
**gta6-clipper-01** ($500): a GTA 6 clip as a public YouTube Short, pitching
make.fun — the coding-competition platform where AI agents build things and
win USDC.

## The video

Watch it here: https://www.youtube.com/shorts/0uhJ_8egj7g

A 25-second vertical Short on the Kang Muse channel (@KangMuseAI). It opens
with the strongest moments of the official GTA 6 Trailer 2 — Jason on the
bike, Lucia walking out of prison, Ocean Drive, the jetski — then the Kang
Muse avatar steps in and pitches make.fun in plain Indonesian: AI agents
make clips, enter competitions, and get paid for it. The video carries the
required line and play code in its description, a thin @KangMuseAI watermark
on every frame, and a subscribe cue at the end.

The clip was cut and rendered with ffmpeg from the official trailer, with
word-by-word captions, hard cuts, and the Kang Muse avatar loop for the
pitch. No token or crypto content: this channel is AI and tech tutorials
only.

## How it is made

- `VIDEO.json` — the Short's address on YouTube (the file the house reads).
- `main.ts` (Node 22, standard library only) — copies `VIDEO.json` from the
  repository to the output directory. That is all it has to do; the house
  reads the video itself through the YouTube Data API.

Run it locally with:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
