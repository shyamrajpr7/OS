/* THREAD OS - macOS Interactive Shell */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const state = {
    threads: [
      {
        id: 'TH-8901', title: 'Rust Compositor IDE', icon: 'code',
        boundTo: 'DESK-01', pid: 4092,
        content: '// Slint Render Loop for Thread Matrix\nfn render_thread_layer(ctx: &mut GraphicsContext) {\n  let frame = ctx.acquire_p2p_buffer();\n  frame.bind_texture_tether(NODE_MOBILE_01);\n  println!("P2P Memory Shared: Live State Streaming...");\n}',
        stateSummary: { file: 'slint_compositor.rs', line: 142, memory: '340 MB', fps: 120 }
      },
      {
        id: 'TH-8902', title: 'Kernel Mesh Chat', icon: 'message-square',
        boundTo: 'SHARED', pid: 2180,
        content: '[17:42:01] kernel_node: P2P UWB Session verified.\n[17:43:10] shyamraj: Initializing Loom Shell interface.\n[17:44:05] dev_team: Thread fusion active across DESK-01 & MOBILE-01!',
        stateSummary: { channel: '#os-core-dev', unread: 3, memory: '110 MB' }
      },
      {
        id: 'TH-8903', title: 'Audio Synth DAW', icon: 'sliders',
        boundTo: 'MOBILE-01', pid: 7712,
        content: 'PLAYHEAD: 01:24.08\nSYNTH 1: Phosphor Wave\nMODULATION: Lowpass 14kHz (Controlled via Mobile Deck Touch)',
        stateSummary: { bpm: 128, sampleRate: '96kHz', memory: '450 MB' }
      },
      {
        id: 'TH-8904', title: 'P2P Telemetry Dashboard', icon: 'activity',
        boundTo: 'DESK-01', pid: 9012,
        content: 'PROXIMITY LINK: UWB 0.4m (High Precision)\nPEER STATE: Active Sync (Zero Packet Drop)\nCOMPOSITOR SHADER: Slint WGPU Pipe Active',
        stateSummary: { latency: '1.2ms', bandwidth: '2.4 Gbps', memory: '85 MB' }
      }
    ],
    selectedThread: null,
    focusedWindow: 'finder-window',
    viewMode: 'list'
  };

  const finderList = document.getElementById('finder-list');
  const finderWindow = document.getElementById('finder-window');
  const detailWindow = document.getElementById('thread-detail-window');
  const menuClock = document.getElementById('menu-clock');
  const dock = document.getElementById('dock');
  const finderSearchInput = document.getElementById('finder-search-input');

  /* CLOCK */
  function updateClock() {
    const now = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const d = days[now.getDay()];
    const m = months[now.getMonth()];
    const dt = now.getDate();
    let h = now.getHours();
    const min = now.getMinutes().toString().padStart(2,'0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    menuClock.textContent = d + ' ' + m + ' ' + dt + '  ' + h + ':' + min + ' ' + ap;
  }
  updateClock();
  setInterval(updateClock, 10000);

  /* HELPER */
  function getNodeColor(n) { return n === 'DESK-01' ? '#007AFF' : n === 'MOBILE-01' ? '#FF5F57' : '#AF52DE'; }
  function getNodeColorDark(n) { return n === 'DESK-01' ? '#0055CC' : n === 'MOBILE-01' ? '#CC3333' : '#7B3DA0'; }

  function getFilteredThreads() {
    const q = finderSearchInput ? finderSearchInput.value.toLowerCase() : '';
    const sec = document.querySelector('.sidebar-item.active');
    const section = sec ? sec.dataset.section : 'all-threads';
    return state.threads.filter(t => {
      const ms = !q || t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
      let mf = true;
      if (section === 'desktop-node') mf = t.boundTo === 'DESK-01';
      else if (section === 'mobile-node') mf = t.boundTo === 'MOBILE-01';
      else if (section === 'fused') mf = t.boundTo === 'SHARED';
      return ms && mf;
    });
  }

  /* FINDER LIST */
  function renderFinderList() {
    if (!finderList) return;
    const threads = getFilteredThreads();

    if (state.viewMode === 'grid') {
      finderList.className = 'finder-grid';
      finderList.innerHTML = '';
      threads.forEach(t => {
        const item = document.createElement('div');
        item.className = 'finder-grid-item' + (state.selectedThread === t.id ? ' active' : '');
        item.dataset.id = t.id;
        const ic = getNodeColor(t.boundTo);
        const icd = getNodeColorDark(t.boundTo);
        item.innerHTML = '<div class="grid-icon" style="background:linear-gradient(135deg,' + ic + ',' + icd + ')"><i data-lucide="' + t.icon + '"></i></div><span class="grid-label">' + t.title + '</span>';
        item.addEventListener('click', () => openThreadDetail(t.id));
        finderList.appendChild(item);
      });
    } else {
      finderList.className = 'finder-list';
      finderList.innerHTML = '';
      threads.forEach(t => {
        const row = document.createElement('div');
        row.className = 'finder-row' + (state.selectedThread === t.id ? ' active' : '');
        row.dataset.id = t.id;
        const sc = t.boundTo === 'DESK-01' ? 'desk' : t.boundTo === 'MOBILE-01' ? 'mobile' : 'shared';
        row.innerHTML = '<span class="col-name"><span class="status-dot ' + sc + '"></span><i data-lucide="' + t.icon + '"></i><span class="thread-name-text">' + t.title + '</span></span><span class="col-status">' + (t.boundTo === 'SHARED' ? 'Fused' : 'Active') + '</span><span class="col-node">' + t.boundTo + '</span><span class="col-pid">' + t.pid + '</span>';
        row.addEventListener('click', () => openThreadDetail(t.id));
        finderList.appendChild(row);
      });
    }
    if (window.lucide) window.lucide.createIcons();
  }

  /* THREAD DETAIL */
  function openThreadDetail(id) {
    const t = state.threads.find(x => x.id === id);
    if (!t) return;
    state.selectedThread = id;
    document.getElementById('detail-window-title').textContent = t.title;
    document.getElementById('detail-thread-name').textContent = t.title;
    const badge = document.getElementById('detail-badge');
    badge.textContent = t.boundTo;
    badge.className = 'detail-badge ' + (t.boundTo === 'DESK-01' ? 'desk' : t.boundTo === 'MOBILE-01' ? 'mobile' : 'shared');
    document.getElementById('detail-pid').textContent = 'PID ' + t.pid;
    const iconEl = document.getElementById('detail-icon');
    iconEl.innerHTML = '<i data-lucide="' + t.icon + '" style="width:24px;height:24px;color:white;"></i>';
    iconEl.style.background = 'linear-gradient(135deg,' + getNodeColor(t.boundTo) + ',' + getNodeColorDark(t.boundTo) + ')';
    document.getElementById('detail-code-pre').textContent = t.content;
    const toggleBtn = document.getElementById('detail-toggle-btn');
    toggleBtn.innerHTML = '<i data-lucide="arrow-right-left"></i> Move to ' + (t.boundTo === 'MOBILE-01' ? 'DESK-01' : 'MOBILE-01');
    toggleBtn.onclick = function() {
      t.boundTo = t.boundTo === 'MOBILE-01' ? 'DESK-01' : 'MOBILE-01';
      openThreadDetail(id);
      renderFinderList();
    };
    detailWindow.style.display = 'flex';
    bringToFront(detailWindow);
    renderFinderList();
    if (window.lucide) window.lucide.createIcons();
  }

  /* WINDOW MANAGEMENT */
  var dragState = null;
  var resizeState = null;
  var highestZ = 200;

  function bringToFront(win) {
    highestZ++;
    win.style.zIndex = highestZ;
    document.querySelectorAll('.mac-window').forEach(function(w) { w.classList.remove('focused'); });
    win.classList.add('focused');
    state.focusedWindow = win.id;
    updateMenuBarTitle(win);
  }

  function updateMenuBarTitle(win) {
    var appName = document.getElementById('menu-app-name');
    if (win.id === 'finder-window') {
      appName.innerHTML = '<strong>Finder</strong>';
    } else if (win.id === 'thread-detail-window') {
      var t = state.threads.find(function(x) { return x.id === state.selectedThread; });
      appName.innerHTML = '<strong>' + (t ? t.title : 'Thread Details') + '</strong>';
    }
  }

  document.addEventListener('mousedown', function(e) {
    var titlebar = e.target.closest('.window-titlebar');
    if (!titlebar) return;
    if (e.target.closest('.tl-btn') || e.target.closest('.tb-action-btn')) return;
    var win = titlebar.closest('.mac-window');
    if (!win) return;
    bringToFront(win);
    dragState = { win: win, startX: e.clientX, startY: e.clientY, origLeft: win.offsetLeft, origTop: win.offsetTop };
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (dragState) {
      dragState.win.style.left = (dragState.origLeft + e.clientX - dragState.startX) + 'px';
      dragState.win.style.top = (dragState.origTop + e.clientY - dragState.startY) + 'px';
    }
    if (resizeState) {
      resizeState.win.style.width = Math.max(300, resizeState.origW + e.clientX - resizeState.startX) + 'px';
      resizeState.win.style.height = Math.max(200, resizeState.origH + e.clientY - resizeState.startY) + 'px';
    }
  });

  document.addEventListener('mouseup', function() { dragState = null; resizeState = null; });

  document.querySelectorAll('.window-resize-handle').forEach(function(handle) {
    handle.addEventListener('mousedown', function(e) {
      var win = handle.closest('.mac-window');
      if (!win) return;
      bringToFront(win);
      resizeState = { win: win, startX: e.clientX, startY: e.clientY, origW: win.offsetWidth, origH: win.offsetHeight };
      e.preventDefault();
    });
  });

  /* TRAFFIC LIGHTS */
  document.querySelectorAll('.tl-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var action = btn.dataset.action;
      var win = btn.closest('.mac-window');
      if (!win) return;
      if (action === 'close') {
        win.style.transition = 'opacity 0.15s, transform 0.15s';
        win.style.opacity = '0';
        win.style.transform = 'scale(0.95)';
        setTimeout(function() { win.style.display = 'none'; win.style.opacity = ''; win.style.transform = ''; win.style.transition = ''; }, 150);
      } else if (action === 'minimize') {
        win.classList.add('minimized');
        bounceDockItem(win.id === 'finder-window' ? 'finder' : 'threads');
      } else if (action === 'maximize') {
        if (win.style.width === '100vw') {
          win.style.width = win.dataset.prevWidth || '820px';
          win.style.height = win.dataset.prevHeight || '520px';
          win.style.top = win.dataset.prevTop || '60px';
          win.style.left = win.dataset.prevLeft || '120px';
          win.style.borderRadius = '';
        } else {
          win.dataset.prevWidth = win.style.width;
          win.dataset.prevHeight = win.style.height;
          win.dataset.prevTop = win.style.top;
          win.dataset.prevLeft = win.style.left;
          win.style.width = '100vw';
          win.style.height = 'calc(100vh - 28px)';
          win.style.top = '0';
          win.style.left = '0';
          win.style.borderRadius = '0';
        }
      }
      e.stopPropagation();
    });
  });

  document.addEventListener('mousedown', function(e) {
    var win = e.target.closest('.mac-window');
    if (win && win.style.display !== 'none') bringToFront(win);
  });

  /* DOCK */
  function bounceDockItem(name) {
    var item = dock.querySelector('.dock-item[data-app="' + name + '"]');
    if (item) { item.classList.add('bouncing'); setTimeout(function() { item.classList.remove('bouncing'); }, 600); }
  }

  dock.querySelectorAll('.dock-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var appName = item.dataset.app;
      if (appName === 'finder') {
        var win = finderWindow;
        if (win.classList.contains('minimized')) { win.classList.remove('minimized'); bringToFront(win); }
        else if (win.style.display === 'none') { win.style.display = 'flex'; bringToFront(win); }
        else if (state.focusedWindow === 'finder-window') { win.classList.add('minimized'); bounceDockItem('finder'); }
        else { bringToFront(win); }
      } else if (appName === 'threads') {
        if (state.threads.length > 0) openThreadDetail(state.threads[0].id);
        bounceDockItem('threads');
      } else {
        bounceDockItem(appName);
      }
    });
  });

  /* SIDEBAR */
  document.querySelectorAll('.sidebar-item[data-section]').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.sidebar-item').forEach(function(i) { i.classList.remove('active'); });
      item.classList.add('active');
      renderFinderList();
    });
  });

  /* VIEW TOGGLE */
  document.querySelectorAll('.view-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.viewMode = btn.dataset.view;
      renderFinderList();
    });
  });

  /* SEARCH */
  if (finderSearchInput) finderSearchInput.addEventListener('input', function() { renderFinderList(); });

  /* DETAIL TABS */
  document.querySelectorAll('.detail-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.detail-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var t = state.threads.find(function(x) { return x.id === state.selectedThread; });
      if (!t) return;
      var pre = document.getElementById('detail-code-pre');
      if (tab.dataset.tab === 'code') {
        pre.textContent = t.content;
      } else if (tab.dataset.tab === 'state') {
        pre.textContent = JSON.stringify({ thread_id: t.id, bound_node: t.boundTo, pid: t.pid, summary: t.stateSummary }, null, 2);
      } else if (tab.dataset.tab === 'memory') {
        pre.textContent = 'Thread: ' + t.id + '\nProcess: ' + t.title + '\nPID: ' + t.pid + '\nNode: ' + t.boundTo + '\nMemory: ' + (t.stateSummary.memory || 'N/A') + '\nShared Memory Segment: 0x7FFF8A91B000\nUWB Tether Latency: 0.60ms';
      }
    });
  });

  /* CLOSE DETAIL */
  document.getElementById('detail-close-btn').addEventListener('click', function() {
    detailWindow.style.display = 'none';
    state.selectedThread = null;
    renderFinderList();
  });

  /* DESKTOP ICONS */
  document.querySelectorAll('.desktop-icon').forEach(function(icon) {
    icon.addEventListener('dblclick', function() {
      var appName = icon.dataset.app;
      if (appName === 'finder') {
        var win = finderWindow;
        if (win.classList.contains('minimized')) { win.classList.remove('minimized'); }
        else if (win.style.display === 'none') { win.style.display = 'flex'; }
        bringToFront(win);
      } else if (appName === 'threads') {
        if (state.threads.length > 0) openThreadDetail(state.threads[0].id);
      }
    });
  });

  /* CONTEXT MENU */
  var contextMenu = document.createElement('div');
  contextMenu.className = 'context-menu';
  document.body.appendChild(contextMenu);

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var items = [];
    var row = e.target.closest('.finder-row');
    if (row) {
      var tid = row.dataset.id;
      items = [
        { label: 'Open Thread', icon: 'external-link', action: function() { openThreadDetail(tid); } },
        { label: 'Switch Node', icon: 'arrow-right-left', action: function() {
          var t = state.threads.find(function(x) { return x.id === tid; });
          if (t) { t.boundTo = t.boundTo === 'MOBILE-01' ? 'DESK-01' : 'MOBILE-01'; renderFinderList(); }
        }},
        { type: 'separator' },
        { label: 'Close', icon: 'x', action: function() {} }
      ];
    } else {
      items = [
        { label: 'New Thread', icon: 'plus', action: function() {
          var newId = 'TH-' + Math.floor(1000 + Math.random() * 9000);
          state.threads.push({
            id: newId, title: 'Kernel Process #' + newId, icon: 'terminal',
            boundTo: 'DESK-01', pid: Math.floor(2000 + Math.random() * 6000),
            content: '// New process initialized\nfn main() {\n  println!("Thread ' + newId + ' running...");\n}',
            stateSummary: { memory: '64 MB' }
          });
          renderFinderList();
        }},
        { type: 'separator' },
        { label: 'Paste', icon: 'clipboard', action: function() {} }
      ];
    }

    contextMenu.innerHTML = '';
    items.forEach(function(item) {
      if (item.type === 'separator') {
        var sep = document.createElement('div');
        sep.className = 'context-menu-separator';
        contextMenu.appendChild(sep);
      } else {
        var el = document.createElement('div');
        el.className = 'context-menu-item';
        el.innerHTML = '<i data-lucide="' + item.icon + '"></i><span>' + item.label + '</span>';
        el.addEventListener('click', function() { item.action(); hideContextMenu(); });
        contextMenu.appendChild(el);
      }
    });

    contextMenu.style.left = e.clientX + 'px';
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.classList.add('visible');
    if (window.lucide) window.lucide.createIcons();
  });

  function hideContextMenu() { contextMenu.classList.remove('visible'); }
  document.addEventListener('click', hideContextMenu);

  /* INITIAL RENDER */
  renderFinderList();
});
