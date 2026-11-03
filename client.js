/**
 * dsh-inline-view-tabs — Browser half.
 *
 * The Conversation header renders its View tabs ("对话" / "轨迹", plus any View
 * another plugin registers) on a second grid row inside `<header>`. This module
 * appends one stylesheet that gives that row a third, content-sized grid column
 * on the header's own row, so the tabs sit at the header's right edge and the
 * extra row of height goes away.
 *
 * The selectors stay on shipped DOM anchors instead of the shell's hashed CSS
 * module classes: `header[data-window-drag]` (the header itself),
 * `[data-conversation-tabs]` (the tab list) and `[role="tab"]` (one tab).
 *
 * @module dsh-inline-view-tabs/client
 */

window.__ModuleLoader__.load({
  id: 'dsh-inline-view-tabs',
  factory() {
    /**
     * Header override. Every rule is scoped to a header that still renders the
     * View tab row, so a session with fewer than two Views is never touched and
     * the blank-session header keeps its own sizing.
     */
    const STYLES = `
/* One header row: title, View tabs, right-side utilities, right-side corner. */
header[data-window-drag]:has([data-conversation-tabs]) {
  display: flex;
  align-items: center;
  min-height: 0;
  padding-bottom: 8px;
}

/* The title row stops being a box, so its three children join the header's
   own flex line and can be ordered around the View tab row. */
header[data-window-drag]:has([data-conversation-tabs]) div:has(> [data-conversation-header-corner]) {
  display: contents;
}

/* The title cluster keeps the shipped leading clearance and takes the slack. */
header[data-window-drag]:has([data-conversation-tabs]) div:has(> [data-conversation-header-corner]) > :nth-child(1) {
  order: 0;
  flex: 1 1 auto;
  min-width: 0;
  padding-inline-start: max(0px, calc(var(--dsh-frame-leading-clearance, 0px) - 20px));
}

/* The View tabs sit between the title and the right-side utilities. The
   reserved width feeds the shell's fold budget — floor((width - 48) / 120) —
   so two tabs stay outside the More menu; the content stays end-aligned, so
   the reserved width reads as ordinary space after the title. */
header[data-window-drag]:has([data-conversation-tabs]) div:has(> [data-conversation-tabs]) {
  order: 1;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  min-width: 288px;
  margin: 0 0 0 16px;
  padding: 0;
  gap: 12px;
  -webkit-app-region: no-drag;
}

/* Utilities follow the tabs; the corner keeps the header's right padding. */
header[data-window-drag]:has([data-conversation-tabs]) div:has(> [data-conversation-header-corner]) > :nth-child(2) {
  order: 2;
  margin-left: 12px;
}

header[data-window-drag]:has([data-conversation-tabs]) [data-conversation-header-corner] {
  order: 3;
}

/* A tab keeps its underline but stops reserving the old row's bottom space. */
header[data-window-drag]:has([data-conversation-tabs]) [role="tab"] {
  min-height: 0;
  padding: 0 0 3px;
}

/* Tabs read as one compact group next to the title. */
header[data-window-drag]:has([data-conversation-tabs]) div[data-conversation-tabs] {
  align-items: center;
  gap: 20px;
}
`;

    return {
      /** Append the stylesheet once and remove it with the plugin. */
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-dsh-inline-view-tabs', '');
          style.textContent = STYLES;
          document.head.append(style);
          return () => {
            style.remove();
          };
        }, 'dsh-inline-view-tabs: header styles');
      },
    };
  },
});
