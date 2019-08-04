# hmv-client

[![Netlify Status](https://api.netlify.com/api/v1/badges/dec6ab5a-7932-45c5-8e14-324c8d377bb0/deploy-status)](https://app.netlify.com/sites/damonzucconi-her-masters-voice/deploys)

## Meta

- **State**: production
- **Production**:
  - **URL**: https://her-masters-voice.work.damonzucconi.com/
  - **URL**: https://damonzucconi-her-masters-voice.netlify.com/
- **Host**: https://app.netlify.com/sites/damonzucconi-her-masters-voice/overview
- **Deploys**: Merged PRs to `dzucconi/example#master` are automatically deployed to production. [Manually trigger a deploy](https://app.netlify.com/sites/damonzucconi-her-masters-voice/deploys)

## Parameters

| Param    | Description                 | Type      | Default                            |
| -------- | --------------------------- | --------- | ---------------------------------- |
| `id`     | ID of persisted render      | `string`  | optional (overrides `text`)        |
| `text`   | Text to speak               | `string`  | ""                                 |
| `shape`  | Waveform                    | `enum`    | `"sine"|"square"|"triangle"|"saw"` |
| `scalar` | Speed                       | `string`  | `1.0`                              |
| `octave` | Octave                      | `number`  | `3`                                |
| `fit`    | Fits text to browser window | `boolean` | `false`                            |
