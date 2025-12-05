# Application Color Palette

This document outlines the color palette used throughout the trvalr web application. The theme is defined in `src/app/globals.css` using HSL CSS variables for easy customization. Below are the variables, their corresponding HEX codes, and their intended usage for both light and dark themes.

---

## Light Theme

This is the default color scheme for the application.

| Name | Swatch | HEX Code | CSS Variable | Description |
|---|---|---|---|---|
| **Background** | <div style="background-color:#f0f4f3;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#f0f4f3` | `--background` | The main background color for pages. A very light, slightly teal-tinted gray. |
| **Foreground** | <div style="background-color:#3a4542;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#3a4542` | `--foreground` | The primary text color used on top of the background. A dark, desaturated teal. |
| **Card** | <div style="background-color:#ffffff;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#ffffff` | `--card` | The background color for card-like components, such as `Card`, `Popover`, etc. |
| **Primary** | <div style="background-color:#2eafb0;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#2eafb0` | `--primary` | The main accent color for interactive elements like buttons, links, and focus rings. |
| **Primary Fg** | <div style="background-color:#ffffff;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#ffffff` | `--primary-foreground` | Text color used on top of `--primary` elements to ensure contrast. |
| **Secondary** | <div style="background-color:#d9e2e1;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#d9e2e1` | `--secondary` | A secondary accent color for less prominent interactive elements. |
| **Accent** | <div style="background-color:#e5b84b;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#e5b84b` | `--accent` | A warm, gold accent color used for highlights and special callouts. |
| **Muted** | <div style="background-color:#e8eeed;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#e8eeed` | `--muted` | A subtle color for muted backgrounds or text, like in inactive tabs. |
| **Destructive** | <div style="background-color:#f54141;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#f54141` | `--destructive` | Used for actions that indicate a destructive operation, like deleting an item. |
| **Border** | <div style="background-color:#c4d1cf;width:100%;height:1.5rem;border:1px solid #ddd;"></div> | `#c4d1cf` | `--border` | The color for borders on components like `Card`, `Input`, and `Separator`. |

---

## Dark Theme

This color scheme is applied when the `.dark` class is present on the `html` element.

| Name | Swatch | HEX Code | CSS Variable | Description |
|---|---|---|---|---|
| **Background** | <div style="background-color:#161c1b;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#161c1b` | `--background` | The main background color for pages in dark mode. A very dark, desaturated teal. |
| **Foreground** | <div style="background-color:#d3d9d8;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#d3d9d8` | `--foreground` | The primary text color for dark mode. A light, slightly teal-tinted gray. |
| **Card** | <div style="background-color:#202827;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#202827` | `--card` | The background for card-like components in dark mode. |
| **Primary** | <div style="background-color:#47c1c2;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#47c1c2` | `--primary` | The main interactive element color, brightened for contrast in dark mode. |
| **Primary Fg** | <div style="background-color:#ffffff;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#ffffff` | `--primary-foreground` | Text color used on top of `--primary` elements. |
| **Secondary** | <div style="background-color:#33423f;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#33423f` | `--secondary` | A secondary accent color for less prominent elements in dark mode. |
| **Accent** | <div style="background-color:#ebc15f;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#ebc15f` | `--accent` | The warm gold accent color, brightened for better visibility in dark mode. |
| **Muted** | <div style="background-color:#293532;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#293532` | `--muted` | A subtle color for muted backgrounds or text in dark mode. |
| **Destructive** | <div style="background-color:#8c2020;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#8c2020` | `--destructive` | Used for destructive actions in dark mode. |
| **Border** | <div style="background-color:#3d4f4b;width:100%;height:1.5rem;border:1px solid #444;"></div> | `#3d4f4b` | `--border` | The color for borders on components in dark mode. |
