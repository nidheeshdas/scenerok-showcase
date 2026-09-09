# Why Your Coding Agent Should Write the Launch Video Too

Your agent just shipped a feature, opened the PR, and drafted the changelog.

Then you opened CapCut.

That gap — software that moves at agent speed, marketing video that still moves at timeline speed — is the wedge SceneRok is built around. We treat video the way modern teams already treat apps: as **source code**. Agents author it. Generative models run as **functions**. A **deterministic compiler** produces something you can diff, fork, and reproduce.

This post is for builders who live in Claude, Cursor, Aider, OpenCode, or Codex — and for creators and agencies tired of one-shot prompt boxes that can't enforce brand timing.

---

### The problem isn't "AI video." It's structure.

The last two years of generative video models are impressive. Grok Imagine, Veo, PixVerse, Runway, FLUX stills, ElevenLabs voice and music — you can get beautiful clips from a sentence.

What you still can't get reliably from a single prompt is **shipping video**:

- Exact beat timing for a 15-second reel  
- Brand lockups that never drift  
- A founder VO that lands on the product shot, not three frames early  
- A template you can reuse next week when the offer changes  
- A file history that isn't `final_v7_reallyfinal.mp4`

Prompt-first tools optimize for surprise. Product launches optimize for **control**. Those are different jobs.

If your coding agent can refactor a codebase from a brief, it should be able to author a launch reel from a brief too — without you scrubbing a timeline at midnight.

---

### Video should be programmable

"Programmable video" means the **source of truth is code**, not a proprietary project file and not a chat transcript.

In SceneRok that language is **VidScript**. Intent becomes a readable script. At compile time, imported packages call frontier models as functions — assets resolve *before* the timeline is rendered. The compiler then enforces timing, shaders, overlays, and audio mix. Same source, same inputs → reproducible output.

The loop looks like software, because it is:

1. **Intent** — describe the video or hand your agent a brief. No blank timeline.  
2. **Agent authors VidScript** — templates, brand rules, parameterized slots.  
3. **Generative plugins at compile** — `xai.imagine()`, `cf.imagine()`, `cf.image()`, `xai.tts()`, `eleven.music()`, and any Cloudflare AI Gateway model via `model:`.  
4. **Deterministic composition** — the compiler owns structure. You own taste and constraints.

You can work three ways: web editor (creators and motion designers), CLI + MCP + skills (agent-first builders), or templates + version control (teams). Hybrid execution means local preview and GPU render from the same source. One token wallet covers traditional render and generative calls, with an audit trail.

The slogan we keep coming back to: **Agents don't prompt. They program.**

---

### VidScript mental model

Think of VidScript as a **declarative timeline with real function calls**.

- **Imports** pull in generative providers (`@scenerok/xai`, `@scenerok/cloudflare`, ElevenLabs music, motion helpers).  
- **Inputs** declare assets you already have (brand hero clip, logo, screen recording).  
- **Time ranges** like `[0s .. 6.5s]` place video, text, and audio on a clock.  
- **`[-]`** means "generate / resolve this asset at compile time" — duration comes from the model call or context.  
- **Output** sets container, resolution, destination.

Generative calls are not a side chat. They are first-class expressions inside the script. That matters: the agent can change a prompt string, a `model:` id, or a voice name the same way it changes a constant in TypeScript — and you still get a reviewable diff.

For longer, data-driven, or heavily branched scenes, the TypeScript authoring SDK (`@scenerok/sdk`) builds the same intermediate timeline IR. Short promos and human edits stay in `.vid`. Agents that need loops and computed timing lean on the SDK. Both paths compile to the same place.

Cloneable sources for videos on the public showcase live in [nidheeshdas/scenerok-showcase](https://github.com/nidheeshdas/scenerok-showcase) — each folder is a brief, metadata, and `source.vid` or `source.ts` you can fork and re-render with the CLI.

---

### Example: a tiny launch reel (from product docs)

The following is adapted from the VidScript examples published on [scenerok.com](https://scenerok.com) — not a one-off invention. It shows the shape: brand footage + compile-time generative video + TTS, composed deterministically.

```vid
import cf from "@scenerok/cloudflare"
import xai from "@scenerok/xai"

input brand = "https://cdn.scenerok.com/samples/brand-hero.mp4"

# Generative assets created at compile time — pick any Cloudflare Gateway model
[-] = video cf.imagine(
  "minimal product shot, floating in void, soft rim light",
  model: "pixverse/v6",
  aspect_ratio: "9:16",
  duration: 6
)

[0s .. 6.5s]  = video brand
[0.8s .. 5.8s] = audio xai.tts(
  "This is not generated. This is compiled.",
  voice: "jessica"
)

output to "launch-reel.mp4", resolution: "1080x1920"
```

A second pattern — text-to-video plus timed type — looks like this (also from the site's mental model):

```vid
import xai from "@scenerok/xai"
import motion from "@scenerok/basic-animations"

[-] = video xai.imagine(
  "cyberpunk city at dusk, cinematic",
  aspect_ratio: "9:16",
  duration: 4.2
)

[2.8s .. 7s] = text "The future is compiled",
  style: title,
  animate: motion.fadeIn(0.6s)
```

Notice what is *not* happening: you are not pasting a mega-prompt and hoping the model invents your brand system. The model fills **slots**. The script owns **structure**.

Cloudflare's plugin is the "one plugin, many providers" path — PixVerse, Veo, Seedance, Runway, FLUX, Grok Imagine via gateway billing, and more — selectable with `model:` or inspectable at compile time with `cf.listModels()`.

---

### Templates with teeth

One-shot generators fade when you need campaign volume. SceneRok leans on **parameterized templates**: Product Launch, Founder Testimonial, UGC Remix, Motion Campaign. Slots like `{{hero}}`, `{{offer}}`, `{{cta_voice}}` can be filled by humans, data, or generative calls — while brand rules, timing, and type systems stay enforced.

That is the agency and growth-team unlock. Fork last week's reel, swap the offer string and hero asset, recompile. Version control becomes the edit history. Review happens on a PR, not a Loom of someone scrubbing a timeline.

---

### Who this is for

**Indie founders and coding-agent users**  
You already ship with agents. You still under-ship video because CapCut doesn't live in your IDE. Install the SceneRok CLI and skills once; stay in Claude, Cursor, Aider, or Codex. Tell the agent what to build; it writes and renders.

**Novice creators**  
You want production-grade starting points without learning After Effects. Web editor first, system templates, real-time preview — drop into VidScript only when you need precision.

**Agencies and small motion teams**  
You need reuse, brand guardrails, and client variants without rebuilding from zero. Templates + unified billing + audit trail beat a folder of untitled projects.

**Not the first wedge**  
If you only need a single surreal clip for fun, a consumer prompt app is fine. SceneRok is for people who need the **fifteenth** variant to still match the brand.

---

### Why "deterministic" matters when models are stochastic

Generative calls are stochastic by nature. Composition should not be.

SceneRok's bet is hybrid: resolve generative assets at compile time (logged against your wallet), then compose with a compiler that respects explicit timing and effects. You can change a model prompt without rewriting your entire edit. You can re-render with the same script after swapping one input. You can preview locally and push final frames to GPU targets without forking the creative.

That is closer to how CI treats builds than how chat treats images. Builders already trust that mental model.

---

### Getting started (soft CTA)

If the asymmetry bothers you — agents shipping code while humans hand-cut launch videos — try SceneRok:

- Site and web editor: [https://scenerok.com](https://scenerok.com)  
- Agent path: CLI + MCP + skills (Claude, Cursor, Aider, OpenCode, Codex)  
- Public examples: [github.com/nidheeshdas/scenerok-showcase](https://github.com/nidheeshdas/scenerok-showcase)  
- Showcase templates: [scenerok.com/showcase](https://scenerok.com/showcase)

Fork a showcase folder, change a line, render a variant. Or open the editor and start from a Product Launch template.

I'm building this in the open for the people who already treat software as code and are ready to treat **video** the same way.

— Nidheeshdas Thavorath (@nidheeshdas_)  
SceneRok · [scenerok.com](https://scenerok.com)

---
