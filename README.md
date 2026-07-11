# SceneRok Showcase Examples

Cloneable sources for every video on [scenerok.com/showcase](https://scenerok.com/showcase).

## Quick start

```bash
npm i -g @scenerok/cli   # or: npx @scenerok/cli
scenerok auth login
cd examples/<id>
scenerok validate source.vid   # or source.ts
scenerok render source.vid --watch
```

Each folder contains:

- `source.vid` or `source.ts` — the exact authoring source
- `html/` — companion HyperFrames custom HTML (when used)
- `BRIEF.md` — creative brief
- `META.json` — category, techniques, duration

These examples are a corpus for humans and agents. Fork a folder, change a line, render a variant.
