# SABER AO — Design System

## Product
A mobile-first Angola knowledge quiz. The interface should feel like a premium game show rooted in Angola, not a generic trivia template.

## Visual direction
- Obsidian black surfaces, metallic gold hierarchy, restrained Angola red accents.
- Keep existing mascot artwork and its state animations.
- Keep the existing splash identity: gold orbit particles, subtle meteor streaks, red/black fabric waves, simple logo reveal.
- Use gold for primary actions, progress, active states and high-value information; reserve red for Angola identity and danger/wrong-answer feedback.
- Correct and incorrect answer states remain semantically distinct (green success, red error).

## Tokens
Runtime source: `src/theme.js`.
- Background: `#080706`
- Surface: `#17130D`
- Raised surface: `#211A0E`
- Muted surface: `#302515`
- Metallic gold: `#FFD36A`
- Deep gold: `#A66B16`
- Gold metal: `#D9A441`
- Angola red: `#E10B00`
- Primary text: `#FFF9E8`
- Muted text: `#B9AA87`

## Typography
Use the platform sans-serif system font already available in Expo. Use heavy weights and restrained letter spacing for titles; prioritize readable body text and answer options. Do not add a font dependency solely for decoration.

## Layout and motion
- Preserve the existing navigation and quiz flow.
- Keep mascot placement and existing animation states.
- Use compact top-level status information, clear question hierarchy, generous answer touch targets and a stable joker row.
- Motion should clarify transitions and feedback; avoid stacking decorative loops on gameplay screens.

## Non-negotiable preservation
Do not remove or rewrite question-bank content, joker logic, AMIGO characters, sound behavior, language behavior, or result calculations as part of visual work.
