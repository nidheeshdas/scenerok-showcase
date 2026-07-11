// #meta category: developer
// #meta title: Variant Loop (SDK)
// #meta description: A 18-second developer demo authored in @scenerok/sdk — a loop stamps five hook variants with transitions, proving procedural timelines agents can write in TypeScript.
// #meta useCase: Agent-authored video, developer demos, programmable variant factories
// #meta tags: developer, sdk, procedural, loops, 18s
// #meta techniques: sdk-procedural, transitions-montage
// #meta aspect: 16:9
// #meta duration: 18
// #meta sourceUrl: https://github.com/nidheeshdas/scenerok-showcase/tree/main/examples/developer-variant-loop

import { timeline, text, s, fadeIn, fadeOut } from '@scenerok/sdk'
import tr from '@scenerok/transitions'

const HOOKS = [
  'Write the video.',
  'Validate the timeline.',
  'Render the MP4.',
  'Diff the next hook.',
  'Ship ten variants.',
]

export default function main() {
  const t = timeline({ width: 1920, height: 1080, fps: 30 })
  const beat = 3
  let cursor = 0

  for (let i = 0; i < HOOKS.length; i++) {
    const end = cursor + beat
    t[cursor][end] = text(HOOKS[i], {
      size: 72,
      color: '#F8FAFC',
      fontFamily: 'Inter',
      fontWeight: 700,
      align: 'center',
      x: '50%',
      y: '48%',
    }).animate(fadeIn(s(0.25)), fadeOut(s(0.3)))

    if (i < HOOKS.length - 1) {
      const edge = end
      t[edge][edge + 0.55] = i % 2 === 0 ? tr.dissolve() : tr.push({ direction: 'left' })
      cursor = edge + 0.55
    } else {
      cursor = end
    }
  }

  t[cursor][cursor + 2.2] = text('scenerok.com — video as source code', {
    size: 40,
    color: '#00FF88',
    fontFamily: 'JetBrains Mono',
    align: 'center',
    x: '50%',
    y: '52%',
  }).animate(fadeIn(s(0.35)))

  return t.toIR()
}
