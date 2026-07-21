/* THREAD OS - Working Finder Engine */

document.addEventListener('DOMContentLoaded', function() {
  if (window.lucide) window.lucide.createIcons();

  /* ========== VIRTUAL FILE SYSTEM ========== */
  var fileSystem = {
    '/': {
      type: 'folder', name: 'Macintosh HD', items: {
        'Applications': { type: 'folder', items: {
          'Finder.app': { type: 'app', size: '42.3 MB', modified: 'Mar 15 2026' },
          'Threads.app': { type: 'app', size: '18.7 MB', modified: 'Jul 20 2026' },
          'Terminal.app': { type: 'app', size: '8.1 MB', modified: 'Feb 3 2026' },
          'Activity Monitor.app': { type: 'app', size: '12.4 MB', modified: 'Jan 18 2026' },
          'Safari.app': { type: 'app', size: '28.9 MB', modified: 'Apr 22 2026' },
          'System Settings.app': { type: 'app', size: '6.2 MB', modified: 'Mar 1 2026' },
          'Calculator.app': { type: 'app', size: '3.1 MB', modified: 'Dec 10 2025' },
          'TextEdit.app': { type: 'app', size: '5.8 MB', modified: 'Feb 14 2026' },
          'Preview.app': { type: 'app', size: '15.6 MB', modified: 'Jan 5 2026' },
          'Xcode.app': { type: 'app', size: '14.2 GB', modified: 'Jul 10 2026' }
        }},
        'Library': { type: 'folder', items: {
          'System': { type: 'folder', items: {} },
          'Caches': { type: 'folder', items: {} },
          'Application Support': { type: 'folder', items: {} }
        }},
        'System': { type: 'folder', items: {
          'Library': { type: 'folder', items: {} }
        }},
        'Users': { type: 'folder', items: {
          'shyamraj': { type: 'folder', items: {} },
          'Shared': { type: 'folder', items: {} }
        }}
      }
    }
  };

  // Build user home
  fileSystem['/Users/shyamraj'] = {
    type: 'folder', name: 'shyamraj', items: {
      'Desktop': { type: 'folder', items: {
        'Finder.app': { type: 'app', size: '42.3 MB', modified: 'Mar 15 2026' },
        'Threads': { type: 'folder', items: {
          'index.html': { type: 'code', size: '4.8 KB', modified: 'Jul 20 2026' },
          'styles.css': { type: 'code', size: '8.2 KB', modified: 'Jul 20 2026' },
          'app.js': { type: 'code', size: '12.1 KB', modified: 'Jul 20 2026' }
        }},
        'project-notes.txt': { type: 'doc', size: '2.4 KB', modified: 'Jul 18 2026' },
        'screenshot-2026-07-20.png': { type: 'image', size: '1.8 MB', modified: 'Jul 20 2026' }
      }},
      'Documents': { type: 'folder', items: {
        'Projects': { type: 'folder', items: {
          'thread-os': { type: 'folder', items: {
            'index.html': { type: 'code', size: '4.8 KB', modified: 'Jul 20 2026' },
            'styles.css': { type: 'code', size: '8.2 KB', modified: 'Jul 20 2026' },
            'app.js': { type: 'code', size: '12.1 KB', modified: 'Jul 20 2026' },
            'README.md': { type: 'doc', size: '1.2 KB', modified: 'Jul 19 2026' }
          }},
          'webapp': { type: 'folder', items: {
            'index.html': { type: 'code', size: '3.1 KB', modified: 'Jun 5 2026' },
            'main.py': { type: 'code', size: '2.8 KB', modified: 'Jun 5 2026' }
          }},
          'campusease': { type: 'folder', items: {} },
          'ecommerce': { type: 'folder', items: {} }
        }},
        'Resume.pdf': { type: 'pdf', size: '245 KB', modified: 'May 10 2026' },
        'Notes.txt': { type: 'doc', size: '4.1 KB', modified: 'Jul 15 2026' },
        'budget-2026.xlsx': { type: 'doc', size: '18.3 KB', modified: 'Jan 20 2026' },
        'presentation.key': { type: 'doc', size: '8.7 MB', modified: 'Jun 22 2026' }
      }},
      'Downloads': { type: 'folder', items: {
        'thread-export.zip': { type: 'zip', size: '2.4 MB', modified: 'Jul 19 2026' },
        'update-pkg.dmg': { type: 'dmg', size: '156 MB', modified: 'Jul 18 2026' },
        'photo-001.jpg': { type: 'image', size: '3.2 MB', modified: 'Jul 17 2026' },
        'invoice-july.pdf': { type: 'pdf', size: '124 KB', modified: 'Jul 15 2026' },
        'song-mix.mp3': { type: 'music', size: '8.4 MB', modified: 'Jul 12 2026' },
        'video-tutorial.mp4': { type: 'video', size: '245 MB', modified: 'Jul 10 2026' },
        'font-pack.zip': { type: 'zip', size: '4.8 MB', modified: 'Jul 8 2026' },
        'dataset.csv': { type: 'doc', size: '52.1 KB', modified: 'Jul 5 2026' }
      }},
      'Music': { type: 'folder', items: {
        'Playlist1': { type: 'folder', items: {
          'track-01.mp3': { type: 'music', size: '7.2 MB', modified: 'Jun 1 2026' },
          'track-02.mp3': { type: 'music', size: '8.1 MB', modified: 'Jun 1 2026' },
          'track-03.mp3': { type: 'music', size: '6.9 MB', modified: 'Jun 1 2026' }
        }},
        'Synth': { type: 'folder', items: {
          'phosphor-wave.wav': { type: 'music', size: '42 MB', modified: 'May 15 2026' },
          'ambient-pad.wav': { type: 'music', size: '38 MB', modified: 'May 15 2026' }
        }},
        'iTunes': { type: 'folder', items: {} }
      }},
      'Pictures': { type: 'folder', items: {
        'wallpaper.jpg': { type: 'image', size: '8.4 MB', modified: 'Jul 1 2026' },
        'Screenshots': { type: 'folder', items: {
          'screen-shot-1.png': { type: 'image', size: '1.2 MB', modified: 'Jul 20 2026' },
          'screen-shot-2.png': { type: 'image', size: '980 KB', modified: 'Jul 19 2026' }
        }},
        'Photos Library': { type: 'folder', items: {} }
      }},
      'Movies': { type: 'folder', items: {} },
      'Library': { type: 'folder', items: {} },
      '.zshrc': { type: 'code', size: '2.1 KB', modified: 'Jul 10 2026' },
      '.gitconfig': { type: 'doc', size: '0.4 KB', modified: 'Jun 15 2026' }
    }
  };

  /* ========== STATE ========== */
  var state = {
    currentPath: '/Users/shyamraj',
    history: ['/Users/shyamraj'],
    historyIndex: 0,
    viewMode: 'list',
    selectedItem: null,
    focusedWindow: 'finder-window',
    sortBy: 'name',
    sortAsc: true
  };

  /* ========== DOM ========== */
  var finderList = document.getElementById('finder-list');
  var finderWindow = document.getElementById('finder-window');
  var menuClock = document.getElementById('menu-clock');
  var dock = document.getElementById('dock');
  var pathbar = document.getElementById('finder-pathbar');
  var statusbar = document.getElementById('finder-statusbar');
  var searchInput = document.getElementById('finder-search-input');
  var btnBack = document.getElementById('btn-back');
  var btnForward = document.getElementById('btn-forward');
  var listHeader = document.getElementById('finder-list-header');

  /* ========== CLOCK ========== */
  function updateClock() {
    var now = new Date();
    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var h = now.getHours();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    menuClock.textContent = days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + now.getDate() + '  ' + h + ':' + now.getMinutes().toString().padStart(2,'0') + ' ' + ap;
  }
  updateClock();
  setInterval(updateClock, 10000);

  /* ========== FILE SYSTEM HELPERS ========== */
  function getNode(path) {
    if (path === '/') return fileSystem['/'];
    var parts = path.split('/').filter(Boolean);
    var node = fileSystem['/'];
    for (var i = 0; i < parts.length; i++) {
      if (node && node.items && node.items[parts[i]]) {
        node = node.items[parts[i]];
      } else {
        return null;
      }
    }
    return node;
  }

  function getItems(path) {
    var node = getNode(path);
    if (!node || node.type !== 'folder') return [];
    var items = [];
    var keys = Object.keys(node.items);
    keys.forEach(function(name) {
      var item = node.items[name];
      items.push({
        name: name,
        type: item.type,
        size: item.size || '--',
        modified: item.modified || '--',
        kind: getKindLabel(item.type),
        isFolder: item.type === 'folder'
      });
    });
    return items;
  }

  function getKindLabel(type) {
    var map = { folder: 'Folder', app: 'Application', doc: 'Document', image: 'Image', music: 'Music', video: 'Video', code: 'Source Code', zip: 'Archive', dmg: 'Disk Image', pdf: 'PDF' };
    return map[type] || 'File';
  }

  function getIconForType(type) {
    var map = {
      folder: 'folder',
      app: 'grid-3x3',
      doc: 'file-text',
      image: 'image',
      music: 'music',
      video: 'film',
      code: 'file-code',
      zip: 'archive',
      dmg: 'hard-drive',
      pdf: 'file-text'
    };
    return map[type] || 'file';
  }

  function getIconClass(type) {
    var map = {
      folder: 'folder-icon',
      app: 'app-icon',
      doc: 'doc-icon',
      image: 'image-icon',
      music: 'music-icon',
      video: 'video-icon',
      code: 'code-icon',
      zip: 'zip-icon',
      dmg: 'dmg-icon',
      pdf: 'pdf-icon'
    };
    return map[type] || 'doc-icon';
  }

  function getGridIconClass(type) {
    var map = {
      folder: 'folder',
      app: 'app',
      doc: 'doc',
      image: 'image',
      music: 'music',
      video: 'music',
      code: 'code',
      zip: 'zip',
      dmg: 'doc',
      pdf: 'pdf'
    };
    return map[type] || 'doc';
  }

  function joinPath(base, name) {
    if (base === '/') return '/' + name;
    return base + '/' + name;
  }

  /* ========== SORTING ========== */
  function sortItems(items) {
    var sorted = items.slice();
    sorted.sort(function(a, b) {
      // folders always first
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;

      var valA, valB;
      if (state.sortBy === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (state.sortBy === 'size') {
        valA = parseSize(a.size);
        valB = parseSize(b.size);
      } else if (state.sortBy === 'kind') {
        valA = a.kind.toLowerCase();
        valB = b.kind.toLowerCase();
      } else if (state.sortBy === 'date') {
        valA = a.modified;
        valB = b.modified;
      }
      if (valA < valB) return state.sortAsc ? -1 : 1;
      if (valA > valB) return state.sortAsc ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  function parseSize(s) {
    if (!s || s === '--') return 0;
    var match = s.match(/([\d.]+)\s*(KB|MB|GB|TB)/i);
    if (!match) return 0;
    var num = parseFloat(match[1]);
    var unit = match[2].toUpperCase();
    if (unit === 'KB') return num * 1024;
    if (unit === 'MB') return num * 1024 * 1024;
    if (unit === 'GB') return num * 1024 * 1024 * 1024;
    if (unit === 'TB') return num * 1024 * 1024 * 1024 * 1024;
    return num;
  }

  /* ========== NAVIGATION ========== */
  function navigate(path, addToHistory) {
    var node = getNode(path);
    if (!node || node.type !== 'folder') return;

    state.currentPath = path;
    state.selectedItem = null;

    if (addToHistory !== false) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(path);
      state.historyIndex = state.history.length - 1;
    }

    updateNavButtons();
    renderBreadcrumb();
    renderList();
    highlightSidebar();
  }

  function goBack() {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      navigate(state.history[state.historyIndex], false);
    }
  }

  function goForward() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      navigate(state.history[state.historyIndex], false);
    }
  }

  function updateNavButtons() {
    btnBack.disabled = state.historyIndex <= 0;
    btnForward.disabled = state.historyIndex >= state.history.length - 1;
  }

  function highlightSidebar() {
    document.querySelectorAll('.sidebar-item[data-path]').forEach(function(item) {
      item.classList.toggle('active', item.dataset.path === state.currentPath);
    });
  }

  /* ========== BREADCRUMB ========== */
  function renderBreadcrumb() {
    pathbar.innerHTML = '';
    var parts = state.currentPath.split('/').filter(Boolean);
    var builtPath = '';

    // Root
    var rootSeg = document.createElement('span');
    rootSeg.className = 'pathbar-segment';
    rootSeg.textContent = '/';
    rootSeg.addEventListener('click', function() { navigate('/'); });
    pathbar.appendChild(rootSeg);

    parts.forEach(function(part, i) {
      var sep = document.createElement('span');
      sep.className = 'pathbar-separator';
      sep.textContent = '\u25B8';
      pathbar.appendChild(sep);

      builtPath += '/' + part;
      var seg = document.createElement('span');
      seg.className = 'pathbar-segment';
      seg.textContent = part;
      var p = builtPath;
      seg.addEventListener('click', function() { navigate(p); });
      pathbar.appendChild(seg);
    });
  }

  /* ========== RENDER LIST ========== */
  function renderList() {
    if (!finderList) return;

    var query = searchInput ? searchInput.value.toLowerCase() : '';
    var items = getItems(state.currentPath);

    if (query) {
      items = items.filter(function(item) {
        return item.name.toLowerCase().indexOf(query) !== -1;
      });
    }

    items = sortItems(items);

    // Update titlebar
    var titleEl = document.getElementById('finder-titlebar-name');
    var pathParts = state.currentPath.split('/').filter(Boolean);
    titleEl.textContent = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'Macintosh HD';

    // Update statusbar
    statusbar.textContent = items.length + ' item' + (items.length !== 1 ? 's' : '');

    if (state.viewMode === 'grid') {
      renderGrid(items);
    } else {
      renderListRows(items);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function renderListRows(items) {
    finderList.className = 'finder-list';
    finderList.innerHTML = '';
    document.getElementById('finder-list-header').style.display = 'flex';

    items.forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'finder-row' + (state.selectedItem === item.name ? ' selected' : '');
      row.dataset.name = item.name;

      var iconHtml = '<span class="file-icon ' + getIconClass(item.type) + '"><i data-lucide="' + getIconForType(item.type) + '"></i></span>';
      row.innerHTML = '<span class="col-name">' + iconHtml + '<span>' + escapeHtml(item.name) + '</span></span><span class="col-size">' + item.size + '</span><span class="col-kind">' + item.kind + '</span><span class="col-date">' + item.modified + '</span>';

      // Selection
      row.addEventListener('click', function(e) {
        e.stopPropagation();
        selectItem(item.name);
      });

      // Double click to open
      row.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        openItem(item);
      });

      finderList.appendChild(row);
    });
  }

  function renderGrid(items) {
    finderList.className = 'finder-grid';
    finderList.innerHTML = '';
    document.getElementById('finder-list-header').style.display = 'none';

    items.forEach(function(item) {
      var gridItem = document.createElement('div');
      gridItem.className = 'finder-grid-item' + (state.selectedItem === item.name ? ' selected' : '');
      gridItem.dataset.name = item.name;

      gridItem.innerHTML = '<div class="grid-icon-wrap ' + getGridIconClass(item.type) + '"><i data-lucide="' + getIconForType(item.type) + '"></i></div><span class="grid-label">' + escapeHtml(item.name) + '</span>';

      gridItem.addEventListener('click', function(e) {
        e.stopPropagation();
        selectItem(item.name);
      });

      gridItem.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        openItem(item);
      });

      finderList.appendChild(gridItem);
    });
  }

  function selectItem(name) {
    state.selectedItem = name;
    renderList();
  }

  function openItem(item) {
    if (item.isFolder) {
      navigate(joinPath(state.currentPath, item.name));
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ========== EVENT LISTENERS ========== */

  // Back/Forward
  btnBack.addEventListener('click', goBack);
  btnForward.addEventListener('click', goForward);

  // Sidebar
  document.querySelectorAll('.sidebar-item[data-path]').forEach(function(item) {
    item.addEventListener('click', function() {
      navigate(item.dataset.path);
    });
  });

  // View Toggle
  document.querySelectorAll('.view-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.viewMode = btn.dataset.view;
      renderList();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', function() { renderList(); });
  }

  // Sort columns
  listHeader.querySelectorAll('span[data-sort]').forEach(function(col) {
    col.addEventListener('click', function() {
      var sortBy = col.dataset.sort;
      if (state.sortBy === sortBy) {
        state.sortAsc = !state.sortAsc;
      } else {
        state.sortBy = sortBy;
        state.sortAsc = true;
      }
      renderList();
    });
  });

  // Click on empty area deselects
  finderList.addEventListener('click', function(e) {
    if (e.target === finderList) {
      state.selectedItem = null;
      renderList();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.metaKey && e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
    if (e.metaKey && e.key === 'ArrowRight') { e.preventDefault(); goForward(); }
    if (e.key === 'Backspace' && !e.target.matches('input')) { e.preventDefault(); goBack(); }
    if (e.key === 'Enter' && state.selectedItem) {
      var items = getItems(state.currentPath);
      var found = items.find(function(i) { return i.name === state.selectedItem; });
      if (found) openItem(found);
    }
  });

  /* ========== WINDOW MANAGEMENT ========== */
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
    }
  }

  document.addEventListener('mousedown', function(e) {
    var titlebar = e.target.closest('.window-titlebar');
    if (!titlebar) return;
    if (e.target.closest('.tl-btn') || e.target.closest('.tb-nav-btn')) return;
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
      resizeState.win.style.width = Math.max(400, resizeState.origW + e.clientX - resizeState.startX) + 'px';
      resizeState.win.style.height = Math.max(300, resizeState.origH + e.clientY - resizeState.startY) + 'px';
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

  // Traffic lights
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
        bounceDockItem('finder');
      } else if (action === 'maximize') {
        if (win.style.width === '100vw') {
          win.style.width = win.dataset.prevWidth || '860px';
          win.style.height = win.dataset.prevHeight || '540px';
          win.style.top = win.dataset.prevTop || '50px';
          win.style.left = win.dataset.prevLeft || '100px';
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

  /* ========== DOCK ========== */
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
      } else {
        bounceDockItem(appName);
      }
    });
  });

  /* ========== DESKTOP ICONS ========== */
  document.querySelectorAll('.desktop-icon').forEach(function(icon) {
    icon.addEventListener('dblclick', function() {
      var appName = icon.dataset.app;
      if (appName === 'finder') {
        var win = finderWindow;
        if (win.classList.contains('minimized')) { win.classList.remove('minimized'); }
        else if (win.style.display === 'none') { win.style.display = 'flex'; }
        bringToFront(win);
      }
    });
  });

  /* ========== CONTEXT MENU ========== */
  var contextMenu = document.createElement('div');
  contextMenu.className = 'context-menu';
  document.body.appendChild(contextMenu);

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    var items = [];
    var row = e.target.closest('.finder-row, .finder-grid-item');
    if (row) {
      var name = row.dataset.name;
      items = [
        { label: 'Open', icon: 'external-link', action: function() {
          var allItems = getItems(state.currentPath);
          var found = allItems.find(function(i) { return i.name === name; });
          if (found) openItem(found);
        }},
        { label: 'Get Info', icon: 'info', action: function() {} },
        { type: 'separator' },
        { label: 'Rename', icon: 'pencil', action: function() {} },
        { label: 'Duplicate', icon: 'copy', action: function() {} },
        { type: 'separator' },
        { label: 'Move to Trash', icon: 'trash-2', action: function() {} }
      ];
    } else {
      items = [
        { label: 'New Folder', icon: 'folder-plus', action: function() {} },
        { type: 'separator' },
        { label: 'Get Info', icon: 'info', action: function() {} },
        { label: 'Change Desktop Background...', icon: 'image', action: function() {} },
        { type: 'separator' },
        { label: 'Use Stacks', icon: 'layers', action: function() {} },
        { label: 'Sort By', icon: 'arrow-up-down', action: function() {} },
        { label: 'Clean Up', icon: 'align-horizontal-distribute-center', action: function() {} }
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

  /* ========== INITIAL RENDER ========== */
  navigate(state.currentPath, false);
});
