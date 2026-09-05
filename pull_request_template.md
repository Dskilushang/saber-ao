---
name: Add app icon
about: This PR adds a placeholder app icon required by Expo prebuild and updates app.json to reference it.

---

fix: add app icon required by Expo

Added a 1x1 transparent PNG placeholder at assets/icon.png and updated app.json to include:

- "icon": "./assets/icon.png"
- "android.adaptiveIcon.foregroundImage": "./assets/icon.png"

This resolves prebuild errors where Expo cannot find the app icon (ENOENT: no such file or directory, open './assets/icon.png').

After merging, replace the placeholder with your real app icon (1024x1024 PNG recommended).
