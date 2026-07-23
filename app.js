// ============================================================
// Thread OS — Main Application Logic
// ============================================================

// ---- File System ----
const fileSystem = {
  '/': { type: 'folder', children: ['Applications', 'System', 'Users'] },
  '/Applications': {
    type: 'folder', children: [
      { name: 'Calculator.app', type: 'app', icon: 'calculator', size: '12.4 MB', kind: 'Application', date: 'Jan 15, 2026' },
      { name: 'TextEdit.app', type: 'app', icon: 'textedit', size: '8.2 MB', kind: 'Application', date: 'Feb 10, 2026' },
      { name: 'Terminal.app', type: 'app', icon: 'terminal', size: '6.1 MB', kind: 'Application', date: 'Mar 1, 2026' },
      { name: 'Activity Monitor.app', type: 'app', icon: 'activity', size: '15.3 MB', kind: 'Application', date: 'Jan 20, 2026' },
      { name: 'System Settings.app', type: 'app', icon: 'settings', size: '9.7 MB', kind: 'Application', date: 'Apr 5, 2026' },
      { name: 'Preview.app', type: 'app', icon: 'preview', size: '7.8 MB', kind: 'Application', date: 'Feb 28, 2026' },
      { name: 'Safari.app', type: 'app', icon: 'safari', size: '22.1 MB', kind: 'Application', date: 'May 1, 2026' }
    ]
  },
  '/System': { type: 'folder', children: ['Library'] },
  '/System/Library': { type: 'folder', children: ['Fonts', 'Extensions'] },
  '/System/Library/Fonts': { type: 'folder', children: [] },
  '/System/Library/Extensions': { type: 'folder', children: [] },
  '/Users': { type: 'folder', children: ['shyamraj', 'Shared'] },
  '/Users/Shared': { type: 'folder', children: [] },
  '/Users/shyamraj': { type: 'folder', children: ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Movies', 'Public'] },
  '/Users/shyamraj/Desktop': {
    type: 'folder', children: [
      { name: 'thread-os', type: 'folder', size: '--', kind: 'Folder', date: 'May 15, 2026' },
      { name: 'project-ideas.txt', type: 'file', icon: 'doc', size: '2.4 KB', kind: 'Plain Text', date: 'May 10, 2026' }
    ]
  },
  '/Users/shyamraj/Documents': {
    type: 'folder', children: [
      { name: 'resume.pdf', type: 'file', icon: 'pdf', size: '245 KB', kind: 'PDF Document', date: 'Apr 20, 2026' },
      { name: 'notes.txt', type: 'file', icon: 'doc', size: '1.1 KB', kind: 'Plain Text', date: 'May 12, 2026' }
    ]
  },
  '/Users/shyamraj/Downloads': {
    type: 'folder', children: [
      { name: 'archive.zip', type: 'file', icon: 'zip', size: '45.2 MB', kind: 'ZIP Archive', date: 'May 8, 2026' },
      { name: 'photo.jpg', type: 'file', icon: 'image', size: '3.7 MB', kind: 'JPEG Image', date: 'May 5, 2026' },
      { name: 'song.mp3', type: 'file', icon: 'music', size: '5.1 MB', kind: 'MP3 Audio', date: 'May 3, 2026' },
      { name: 'video.mp4', type: 'file', icon: 'video', size: '124 MB', kind: 'MP4 Video', date: 'May 1, 2026' }
    ]
  },
  '/Users/shyamraj/Music': { type: 'folder', children: [] },
  '/Users/shyamraj/Pictures': {
    type: 'folder', children: [
      { name: 'wallpaper.png', type: 'file', icon: 'image', size: '8.2 MB', kind: 'PNG Image', date: 'Apr 15, 2026' },
      { name: 'screenshot.png', type: 'file', icon: 'image', size: '1.2 MB', kind: 'PNG Image', date: 'May 14, 2026' }
    ]
  },
  '/Users/shyamraj/Movies': { type: 'folder', children: [] },
  '/Users/shyamraj/Public': { type: 'folder', children: [] }
};

function getNode(path) { return fileSystem[path] || null; }

function getChildren(path) {
  const node = getNode(path);
  if (!node) return [];
  return node.children.map(c => {
    if (typeof c === 'string') {
      const childPath = path === '/' ? '/' + c : path + '/' + c;
      const childNode = getNode(childPath);
      return { name: c, type: childNode && childNode.type === 'folder' ? 'folder' : 'file', icon: 'folder', size: '--', kind: 'Folder', date: 'May 15, 2026', path: childPath };
    }
    return { ...c, path: path + '/' + c.name };
  });
}

// ---- SVG Icons ----
const appIcons = {
  folder: `<svg viewBox="0 0 40 40"><path d="M4,12 L4,34 C4,35.1 4.9,36 6,36 L34,36 C35.1,36 36,35.1 36,34 L36,14 C36,12.9 35.1,12 34,12 L18,12 L14,8 L6,8 C4.9,8 4,8.9 4,10 Z" fill="#47A3FF"/></svg>`,
  file_app: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#007AFF"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="14" font-weight="bold">A</text></svg>`,
  file_doc: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#888"/><g stroke="#bbb" stroke-width="1"><line x1="14" y1="16" x2="26" y2="16"/><line x1="14" y1="20" x2="26" y2="20"/><line x1="14" y1="24" x2="26" y2="24"/><line x1="14" y1="28" x2="22" y2="28"/></g></svg>`,
  file_image: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#AF52DE"/><circle cx="22" cy="20" r="4" fill="white"/><polygon points="12,32 18,24 24,30 28,26 32,32" fill="rgba(255,255,255,0.5)"/></svg>`,
  file_music: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#FF5F57"/><circle cx="26" cy="28" r="4" fill="white"/><line x1="26" y1="28" x2="26" y2="14" stroke="white" stroke-width="2"/></svg>`,
  file_video: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#FF2D55"/><polygon points="18,18 18,30 28,24" fill="white"/></svg>`,
  file_zip: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#FEBC2E"/><rect x="18" y="10" width="4" height="3" fill="white"/><rect x="18" y="16" width="4" height="3" fill="white"/><rect x="18" y="22" width="6" height="6" rx="1" fill="white"/></svg>`,
  file_pdf: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#FF5F57"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="10" font-weight="bold">PDF</text></svg>`,
  file: `<svg viewBox="0 0 40 40"><path d="M10,4 L26,4 L32,10 L32,36 C32,37.1 31.1,38 30,38 L10,38 C8.9,38 8,37.1 8,36 L8,6 C8,4.9 8.9,4 10,4 Z" fill="#666"/><path d="M26,4 L26,10 L32,10 Z" fill="#888"/></svg>`
};

function getFileIcon(item) {
  if (item.type === 'folder') return appIcons.folder;
  if (item.type === 'app') return appIcons.file_app;
  const map = { doc: 'file_doc', image: 'file_image', music: 'file_music', video: 'file_video', zip: 'file_zip', pdf: 'file_pdf', code: 'file_doc' };
  return appIcons[map[item.icon] || 'file'];
}

// ---- State ----
let currentPath = '/Users/shyamraj/Desktop';
let viewMode = 'list';
let currentSort = 'name';
let sortAsc = true;
let selectedItem = null;
let navHistory = ['/Users/shyamraj/Desktop'];
let navIndex = 0;
let zCounter = 100;
let focusedApp = null;
let calcState = { current: '0', previous: null, operator: null, waitingForOperand: false, display: '0' };
let teCurrentFile = null;
let teFileContent = {};

// ---- Clock ----
function updateClock() {
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  document.getElementById('menuClock').textContent = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}  ${h12}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 10000);

// ---- Finder ----
function navigateTo(path, pushHistory = true) {
  const node = getNode(path);
  if (!node || node.type !== 'folder') return;
  currentPath = path;
  if (pushHistory) {
    navHistory = navHistory.slice(0, navIndex + 1);
    navHistory.push(path);
    navIndex = navHistory.length - 1;
  }
  selectedItem = null;
  updateFinder();
}

function goBack() { if (navIndex > 0) { navIndex--; navigateTo(navHistory[navIndex], false); } }
function goForward() { if (navIndex < navHistory.length - 1) { navIndex++; navigateTo(navHistory[navIndex], false); } }
function goToParent() { if (currentPath === '/') return; const parts = currentPath.split('/').filter(Boolean); parts.pop(); navigateTo('/' + parts.join('/')); }

function sortItems(items) {
  const sorted = [...items];
  sorted.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    let va, vb;
    switch (currentSort) {
      case 'name': va = a.name.toLowerCase(); vb = b.name.toLowerCase(); break;
      case 'size': va = a.size || ''; vb = b.size || ''; break;
      case 'kind': va = a.kind || ''; vb = b.kind || ''; break;
      case 'date': va = a.date || ''; vb = b.date || ''; break;
      default: va = a.name.toLowerCase(); vb = b.name.toLowerCase();
    }
    return sortAsc ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
  });
  return sorted;
}

function updateFinder() {
  const children = getChildren(currentPath);
  const sorted = sortItems(children);

  // Breadcrumb
  const breadcrumb = document.getElementById('finderBreadcrumb');
  const parts = currentPath.split('/').filter(Boolean);
  let bcHtml = `<span class="pathbar-segment" onclick="navigateTo('/')">/</span>`;
  let acc = '';
  parts.forEach(p => { acc += '/' + p; const path = acc; bcHtml += `<span class="pathbar-separator">›</span><span class="pathbar-segment" onclick="navigateTo('${path}')">${p}</span>`; });
  breadcrumb.innerHTML = bcHtml;

  // Nav buttons
  document.getElementById('btnBack').disabled = navIndex <= 0;
  document.getElementById('btnForward').disabled = navIndex >= navHistory.length - 1;
  document.getElementById('btnUp').disabled = currentPath === '/';

  // Title
  const dirName = currentPath.split('/').filter(Boolean).pop() || '/';
  document.getElementById('finderTitle').textContent = dirName;

  // Sidebar active state
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.toggle('active', el.dataset.path === currentPath));

  // View toggle
  document.querySelectorAll('.view-btn').forEach(el => el.classList.toggle('active', el.dataset.view === viewMode));

  // Sort indicators
  document.querySelectorAll('.finder-list-header span[data-sort]').forEach(el => {
    const arrow = el.querySelector('i');
    if (!arrow) return;
    if (el.dataset.sort === currentSort) { arrow.className = sortAsc ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill'; arrow.style.opacity = '1'; }
    else { arrow.className = 'ri-arrow-up-s-fill'; arrow.style.opacity = '0.3'; }
  });

  const listContainer = document.getElementById('finderList');
  const gridContainer = document.getElementById('finderGrid');

  if (viewMode === 'list') {
    listContainer.style.display = '';
    gridContainer.style.display = 'none';
    let rows = '';
    sorted.forEach((item, i) => {
      const iconClass = item.type === 'folder' ? 'folder-icon' : item.type === 'app' ? 'app-icon' : 'doc-icon';
      rows += `<div class="finder-row" data-index="${i}" data-type="${item.type}" data-name="${item.name}" draggable="true" onclick="selectItem(${i})" ondblclick="openItem(${i})">
        <span class="col-name"><span class="file-icon ${iconClass}">${getFileIcon(item)}</span><span>${item.name}</span></span>
        <span class="col-size">${item.size || '--'}</span>
        <span class="col-kind">${item.kind || ''}</span>
        <span class="col-date">${item.date || ''}</span></div>`;
    });
    listContainer.innerHTML = rows;
  } else {
    listContainer.style.display = 'none';
    gridContainer.style.display = '';
    let grid = '';
    sorted.forEach((item, i) => {
      const iconClass = item.type === 'folder' ? 'folder' : item.type === 'app' ? 'app' : 'doc';
      grid += `<div class="finder-grid-item" data-index="${i}" onclick="selectItem(${i})" ondblclick="openItem(${i})">
        <div class="grid-icon-wrap ${iconClass}">${getFileIcon(item)}</div>
        <span class="grid-label">${item.name}</span></div>`;
    });
    gridContainer.innerHTML = grid;
  }

  // Status
  const folderCount = sorted.filter(i => i.type === 'folder').length;
  const fileCount = sorted.filter(i => i.type !== 'folder').length;
  let statusParts = [];
  if (folderCount) statusParts.push(`${folderCount} folder${folderCount > 1 ? 's' : ''}`);
  if (fileCount) statusParts.push(`${fileCount} item${fileCount > 1 ? 's' : ''}`);
  document.getElementById('finderStatus').textContent = statusParts.join(', ') || 'Empty';
  document.getElementById('finderSearchInput').value = '';
}

function selectItem(index) {
  selectedItem = index;
  document.querySelectorAll('.finder-row, .finder-grid-item').forEach(el => el.classList.remove('selected'));
  const el = document.querySelector(`[data-index="${index}"]`);
  if (el) el.classList.add('selected');
}

function openItem(index) {
  const children = getChildren(currentPath);
  const sorted = sortItems(children);
  const item = sorted[index];
  if (!item) return;
  if (item.type === 'folder') navigateTo(item.path);
  else if (item.type === 'app') openApp(item.name);
  else if (item.type === 'file') openFileInApp(item);
}

function openFileInApp(item) {
  const ext = item.name.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(ext)) {
    openPreview(item, 'image');
  } else if (['txt', 'md', 'json', 'js', 'css', 'html', 'xml', 'csv', 'log', 'py', 'java', 'c', 'cpp', 'h'].includes(ext)) {
    openTextFile(item);
  } else if (ext === 'pdf') {
    openPreview(item, 'pdf');
  } else if (['mp3', 'wav', 'ogg', 'flac', 'aac'].includes(ext)) {
    openPreview(item, 'audio');
  } else if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) {
    openPreview(item, 'video');
  } else {
    openPreview(item, 'generic');
  }
}

function openTextFile(item) {
  teCurrentFile = item.path;
  const content = teFileContent[item.path] || getFileContent(item.path);
  document.getElementById('texteditArea').value = content;
  document.querySelector('#textedit-window .window-title').textContent = item.name + ' — TextEdit';
  openApp('TextEdit.app');
}

function openPreview(item, type) {
  const win = document.getElementById('preview-window');
  const body = document.getElementById('previewBody');
  const title = document.getElementById('previewTitle');
  title.textContent = item.name + ' — Preview';

  let html = '';
  if (type === 'image') {
    const colors = ['#47A3FF', '#AF52DE', '#FF5F57', '#28C840', '#FEBC2E', '#FF2D55'];
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    const c2 = colors[Math.floor(Math.random() * colors.length)];
    html = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,${c1}30,${c2}30);border-radius:8px;">
      <div style="text-align:center;color:#888;">
        <i class="ri-image-line" style="font-size:64px;display:block;margin-bottom:8px;"></i>
        <div style="font-size:13px;">${item.name}</div>
        <div style="font-size:11px;color:#666;margin-top:4px;">${item.size || 'Unknown size'}</div>
      </div>
    </div>`;
  } else if (type === 'text') {
    const fileContent = getFileContent(item.path);
    html = `<div style="padding:16px;height:100%;overflow:auto;">
      <pre style="margin:0;font-family:'SF Mono',monospace;font-size:13px;color:#e0e0e0;white-space:pre-wrap;word-wrap:break-word;">${escapeHtml(fileContent)}</pre>
    </div>`;
  } else if (type === 'pdf') {
    html = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#1e1e1e;border-radius:8px;">
      <div style="text-align:center;color:#888;">
        <i class="ri-file-pdf-2-line" style="font-size:64px;display:block;margin-bottom:8px;color:#FF5F57;"></i>
        <div style="font-size:13px;">${item.name}</div>
        <div style="font-size:11px;color:#666;margin-top:4px;">${item.size || 'Unknown size'}</div>
        <div style="font-size:11px;color:#555;margin-top:8px;">PDF Preview</div>
      </div>
    </div>`;
  } else if (type === 'audio') {
    html = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#1e1e1e;border-radius:8px;">
      <div style="text-align:center;color:#888;">
        <i class="ri-music-2-line" style="font-size:64px;display:block;margin-bottom:8px;color:#FF5F57;"></i>
        <div style="font-size:13px;">${item.name}</div>
        <div style="font-size:11px;color:#666;margin-top:4px;">${item.size || 'Unknown size'}</div>
        <div style="margin-top:12px;width:200px;height:4px;background:#333;border-radius:2px;margin-left:auto;margin-right:auto;">
          <div style="width:0%;height:100%;background:#FF5F57;border-radius:2px;"></div>
        </div>
      </div>
    </div>`;
  } else if (type === 'video') {
    html = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#000;border-radius:8px;">
      <div style="text-align:center;color:#888;">
        <i class="ri-movie-2-line" style="font-size:64px;display:block;margin-bottom:8px;color:#FF2D55;"></i>
        <div style="font-size:13px;">${item.name}</div>
        <div style="font-size:11px;color:#666;margin-top:4px;">${item.size || 'Unknown size'}</div>
      </div>
    </div>`;
  } else {
    html = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#1e1e1e;border-radius:8px;">
      <div style="text-align:center;color:#888;">
        <i class="ri-file-line" style="font-size:64px;display:block;margin-bottom:8px;"></i>
        <div style="font-size:13px;">${item.name}</div>
        <div style="font-size:11px;color:#666;margin-top:4px;">${item.kind || 'File'} — ${item.size || 'Unknown size'}</div>
      </div>
    </div>`;
  }
  body.innerHTML = html;
  openApp('Preview.app');
}

function getFileContent(path) {
  const textFiles = {
    '/Users/shyamraj/Desktop/project-ideas.txt': 'Project Ideas:\n\n1. Thread OS - A macOS-style web desktop\n2. AI Chat Interface\n3. Markdown Editor\n4. Portfolio Website\n5. Task Management App',
    '/Users/shyamraj/Documents/notes.txt': 'Meeting Notes - May 12, 2026\n\n- Discussed Q3 roadmap\n- New feature requests from beta users\n- Performance improvements needed for large files\n- Release target: end of June',
    '/Users/shyamraj/Documents/resume.pdf': '[PDF Document]\n\nThis is a PDF file preview.\nOpen with Preview to view contents.'
  };
  return textFiles[path] || '[Contents of ' + path.split('/').pop() + ']';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---- File Drag & Drop in Finder ----
let dragItem = null;

function moveFile(sourcePath, destFolderPath) {
  const sourceParts = sourcePath.split('/').filter(Boolean);
  const fileName = sourceParts.pop();
  const sourceParentPath = '/' + sourceParts.join('/');
  const sourceParent = getNode(sourceParentPath);
  const destFolder = getNode(destFolderPath);
  if (!sourceParent || !destFolder || destFolderPath === sourceParentPath) return false;
  if (destFolder.type !== 'folder') return false;

  sourceParent.children = sourceParent.children.filter(c => {
    const name = typeof c === 'string' ? c : c.name;
    return name !== fileName;
  });

  const sourceItem = getNode(sourcePath);
  if (sourceItem) {
    delete fileSystem[sourcePath];
    const newPath = destFolderPath + '/' + fileName;
    fileSystem[newPath] = sourceItem;
    const children = destFolder.children;
    if (typeof children[0] === 'string') {
      destFolder.children = children.map(c => c === fileName ? { name: fileName, type: sourceItem.type, icon: 'folder', size: '--', kind: sourceItem.type === 'folder' ? 'Folder' : 'File', date: 'Just now', path: newPath } : c);
    } else {
      children.push({ name: fileName, type: sourceItem.type, icon: 'folder', size: '--', kind: sourceItem.type === 'folder' ? 'Folder' : 'File', date: 'Just now', path: newPath });
    }
  }
  return true;
}

function initFinderDragDrop() {
  const listEl = document.getElementById('finderList');
  const gridEl = document.getElementById('finderGrid');

  [listEl, gridEl].forEach(container => {
    container.addEventListener('dragstart', e => {
      const row = e.target.closest('.finder-row, .finder-grid-item');
      if (!row) return;
      dragItem = { index: parseInt(row.dataset.index), type: row.dataset.type, name: row.dataset.name };
      e.dataTransfer.effectAllowed = 'move';
      row.style.opacity = '0.5';
    });

    container.addEventListener('dragend', e => {
      const row = e.target.closest('.finder-row, .finder-grid-item');
      if (row) row.style.opacity = '';
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      dragItem = null;
    });

    container.addEventListener('dragover', e => {
      e.preventDefault();
      const row = e.target.closest('.finder-row, .finder-grid-item');
      if (row && row.dataset.type === 'folder') {
        row.classList.add('drag-over');
        e.dataTransfer.dropEffect = 'move';
      }
    });

    container.addEventListener('dragleave', e => {
      const row = e.target.closest('.finder-row, .finder-grid-item');
      if (row) row.classList.remove('drag-over');
    });

    container.addEventListener('drop', e => {
      e.preventDefault();
      const row = e.target.closest('.finder-row, .finder-grid-item');
      if (!row || !dragItem || row.dataset.type !== 'folder') return;
      row.classList.remove('drag-over');

      const children = getChildren(currentPath);
      const sorted = sortItems(children);
      const destItem = sorted[parseInt(row.dataset.index)];
      if (!destItem || !destItem.path) return;

      if (moveFile(dragItem.path, destItem.path)) {
        updateFinder();
      }
      dragItem = null;
    });
  });
}

// ---- App Windows ----
const appIdMap = {
  'Calculator.app': 'calculator-window',
  'TextEdit.app': 'textedit-window',
  'Terminal.app': 'terminal-window',
  'Activity Monitor.app': 'activity-window',
  'System Settings.app': 'settings-window',
  'Preview.app': 'preview-window',
  'Safari.app': 'safari-window'
};

function openApp(appName) {
  const winId = appIdMap[appName];
  if (!winId) return;
  const win = document.getElementById(winId);
  if (!win) return;

  const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
  if (dockItem) { dockItem.classList.add('bouncing'); setTimeout(() => dockItem.classList.remove('bouncing'), 700); }

  win.classList.remove('minimized');
  win.style.transition = '';
  win.style.transform = '';
  win.style.opacity = '';
  win.style.transformOrigin = '';
  focusWindow(winId);

  if (!win.style.left || win.offsetLeft === 0) {
    const idx = Object.keys(appIdMap).indexOf(appName);
    win.style.left = (120 + idx * 30) + 'px';
    win.style.top = (70 + idx * 30) + 'px';
  }

  if (dockItem) { const ind = dockItem.querySelector('.dock-indicator'); if (ind) ind.classList.add('active'); }

  if (winId === 'terminal-window') initTerminal();
  if (winId === 'activity-window') initActivityMonitor();
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  win.classList.add('minimized');
  win.classList.remove('focused');
  if (winId === 'activity-window') stopActivityMonitor();
  const entry = Object.entries(appIdMap).find(([, v]) => v === winId);
  if (entry) { const dockItem = document.querySelector(`.dock-item[data-app="${entry[0]}"]`); if (dockItem) { const ind = dockItem.querySelector('.dock-indicator'); if (ind) ind.classList.remove('active'); } }
}

function minimizeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  // Find the dock icon position for this app
  const entry = Object.entries(appIdMap).find(([, v]) => v === winId);
  let dockX = window.innerWidth / 2;
  let dockY = window.innerHeight - 30;
  if (entry) {
    const dockItem = document.querySelector(`.dock-item[data-app="${entry[0]}"]`);
    if (dockItem) {
      const rect = dockItem.getBoundingClientRect();
      dockX = rect.left + rect.width / 2;
      dockY = rect.top + rect.height / 2;
    }
  }
  const winRect = win.getBoundingClientRect();
  const origLeft = winRect.left;
  const origTop = winRect.top;
  const origW = winRect.width;
  const origH = winRect.height;
  const scaleX = 40 / origW;
  const scaleY = 30 / origH;
  const translateX = (dockX - origLeft - origW / 2);
  const translateY = (dockY - origTop - origH / 2);
  win.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
  win.style.transformOrigin = 'center center';
  win.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  win.style.opacity = '0';
  setTimeout(() => {
    win.classList.add('minimized');
    win.style.transition = '';
    win.style.transform = '';
    win.style.opacity = '';
    win.style.transformOrigin = '';
  }, 400);
}

function focusWindow(winId) {
  document.querySelectorAll('.mac-window').forEach(w => w.classList.remove('focused'));
  const win = document.getElementById(winId);
  if (win) { zCounter++; win.style.zIndex = zCounter; win.classList.add('focused'); focusedApp = winId; }
}

// ---- Window Dragging & Resizing & Snapping ----
let snapPreview = null;

function createSnapPreview() {
  if (snapPreview) return snapPreview;
  snapPreview = document.createElement('div');
  snapPreview.className = 'snap-preview';
  document.body.appendChild(snapPreview);
  return snapPreview;
}

function getSnapZone(x, y) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const threshold = 20;
  if (x <= threshold) return 'left';
  if (x >= vw - threshold) return 'right';
  if (y <= threshold) return 'top';
  return null;
}

function getSnapRect(zone, winW, winH) {
  const vw = window.innerWidth;
  const vh = window.innerHeight - 28;
  switch (zone) {
    case 'left': return { left: 0, top: 28, width: vw / 2, height: vh };
    case 'right': return { left: vw / 2, top: 28, width: vw / 2, height: vh };
    case 'top': return { left: 0, top: 28, width: vw, height: vh };
    default: return null;
  }
}

function initWindowDrag(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  const titlebar = win.querySelector('.window-titlebar');
  if (!titlebar) return;

  let isDragging = false, startX, startY, origX, origY;
  let origW, origH;

  titlebar.addEventListener('mousedown', e => {
    if (e.target.closest('.tl-btn') || e.target.closest('.tb-nav-btn') || e.target.closest('button')) return;
    isDragging = true; startX = e.clientX; startY = e.clientY;
    origX = win.offsetLeft; origY = win.offsetTop;
    origW = win.offsetWidth; origH = win.offsetHeight;
    win.style.transition = 'none';
    focusWindow(winId); e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const newX = origX + e.clientX - startX;
    const newY = origY + e.clientY - startY;
    win.style.left = newX + 'px';
    win.style.top = newY + 'px';

    const zone = getSnapZone(e.clientX, e.clientY);
    const preview = createSnapPreview();
    if (zone) {
      const rect = getSnapRect(zone, origW, origH);
      preview.style.left = rect.left + 'px';
      preview.style.top = rect.top + 'px';
      preview.style.width = rect.width + 'px';
      preview.style.height = rect.height + 'px';
      preview.classList.add('visible');
    } else {
      preview.classList.remove('visible');
    }
  });

  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    win.style.transition = '';

    const preview = createSnapPreview();
    const zone = getSnapZone(e.clientX, e.clientY);
    if (zone) {
      const rect = getSnapRect(zone, origW, origH);
      win.style.left = rect.left + 'px';
      win.style.top = rect.top + 'px';
      win.style.width = rect.width + 'px';
      win.style.height = rect.height + 'px';
    }
    preview.classList.remove('visible');
  });

  const handle = win.querySelector('.window-resize-handle');
  if (handle) {
    let isResizing = false, rStartX, rStartY, rOrigW, rOrigH;
    handle.addEventListener('mousedown', e => { isResizing = true; rStartX = e.clientX; rStartY = e.clientY; rOrigW = win.offsetWidth; rOrigH = win.offsetHeight; e.preventDefault(); e.stopPropagation(); });
    document.addEventListener('mousemove', e => { if (isResizing) { win.style.width = Math.max(300, rOrigW + e.clientX - rStartX) + 'px'; win.style.height = Math.max(200, rOrigH + e.clientY - rStartY) + 'px'; } });
    document.addEventListener('mouseup', () => { isResizing = false; });
  }

  win.addEventListener('mousedown', () => focusWindow(winId));
}

// ---- Calculator ----
function calcInput(val) {
  const s = calcState;
  if ((val >= '0' && val <= '9') || val === '.') {
    if (s.waitingForOperand) { s.current = val === '.' ? '0.' : val; s.waitingForOperand = false; }
    else { s.current = s.current === '0' && val !== '.' ? val : s.current + val; }
    s.display = s.current;
  } else if (['+', '-', '*', '/'].includes(val)) {
    if (s.operator && !s.waitingForOperand) calcEqual();
    s.previous = parseFloat(s.current); s.operator = val; s.waitingForOperand = true;
  } else if (val === '=') { calcEqual(); s.operator = null; }
  else if (val === 'C') { s.current = '0'; s.previous = null; s.operator = null; s.waitingForOperand = false; s.display = '0'; }
  else if (val === '±') { s.current = String(-parseFloat(s.current)); s.display = s.current; }
  else if (val === '%') { s.current = String(parseFloat(s.current) / 100); s.display = s.current; }
  document.getElementById('calcDisplay').textContent = s.display;
}

function calcEqual() {
  const s = calcState;
  if (s.operator === null || s.previous === null) return;
  const curr = parseFloat(s.current);
  let result;
  switch (s.operator) {
    case '+': result = s.previous + curr; break;
    case '-': result = s.previous - curr; break;
    case '*': result = s.previous * curr; break;
    case '/': result = curr !== 0 ? s.previous / curr : 'Error'; break;
  }
  s.current = String(result); s.display = s.current; s.previous = result; s.waitingForOperand = true;
}

// ---- Terminal ----
let termCwd = '/Users/shyamraj';

function initTerminal() {
  const output = document.getElementById('terminalOutput');
  if (output.children.length > 0) return;
  appendTermOutput('Thread OS Terminal', 'info');
  appendTermOutput('Type "help" for available commands.\n', 'info');
}

function appendTermOutput(text, className = '') {
  const output = document.getElementById('terminalOutput');
  const line = document.createElement('div');
  if (className) line.className = className;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function termPromptText() {
  const short = termCwd.replace('/Users/shyamraj', '~');
  return `shyamraj@thread-os ${short} $ `;
}

function updateTerminalPrompt() {
  document.getElementById('terminalPrompt').textContent = termPromptText();
}

function resolvePath(p) {
  if (p === '~') return '/Users/shyamraj';
  if (p.startsWith('~/')) return '/Users/shyamraj' + p.slice(1);
  if (p.startsWith('/')) return p;
  return termCwd === '/' ? '/' + p : termCwd + '/' + p;
}

function terminalExec(cmd) {
  const output = document.getElementById('terminalOutput');
  const cmdLine = document.createElement('div');
  cmdLine.innerHTML = `<span class="cmd">${termPromptText()}${cmd}</span>`;
  output.appendChild(cmdLine);

  const parts = cmd.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  switch (command) {
    case '': break;
    case 'help':
      appendTermOutput('Available commands:', 'success');
      ['ls          List directory contents', 'cd          Change directory', 'pwd         Print working directory', 'echo        Print text', 'clear       Clear terminal', 'cat         Display file contents', 'date        Show current date', 'whoami      Show current user', 'uname       Show system info', 'hostname    Show hostname', 'uptime      Show uptime', 'calc        Calculator (e.g. calc 2+2)', 'neofetch    System info'].forEach(l => appendTermOutput('  ' + l));
      break;
    case 'ls': {
      const target = args[0] ? resolvePath(args[0]) : termCwd;
      const node = getNode(target);
      if (!node || node.type !== 'folder') { appendTermOutput(`ls: ${args[0] || target}: No such file or directory`, 'err'); break; }
      const children = getChildren(target);
      if (children.length) appendTermOutput(children.map(c => c.name).join('  '));
      break;
    }
    case 'cd': {
      if (!args[0] || args[0] === '~') { termCwd = '/Users/shyamraj'; updateTerminalPrompt(); break; }
      const target = resolvePath(args[0]);
      const node = getNode(target);
      if (!node || node.type !== 'folder') { appendTermOutput(`cd: ${args[0]}: No such file or directory`, 'err'); break; }
      termCwd = target; updateTerminalPrompt();
      break;
    }
    case 'pwd': appendTermOutput(termCwd); break;
    case 'echo': appendTermOutput(args.join(' ')); break;
    case 'clear': output.innerHTML = ''; break;
    case 'cat': {
      if (!args[0]) { appendTermOutput('cat: missing operand', 'err'); break; }
      const target = resolvePath(args[0]); const node = getNode(target);
      if (!node) { appendTermOutput(`cat: ${args[0]}: No such file or directory`, 'err'); break; }
      if (node.type === 'folder') { appendTermOutput(`cat: ${args[0]}: Is a directory`, 'err'); break; }
      appendTermOutput(`[Contents of ${args[0]} — binary/placeholder]`, 'info'); break;
    }
    case 'date': appendTermOutput(new Date().toString()); break;
    case 'whoami': appendTermOutput('shyamraj'); break;
    case 'uname': appendTermOutput(args.includes('-a') ? 'Thread OS 1.0.0 thread-os x86_64 WebKit' : 'Thread OS'); break;
    case 'hostname': appendTermOutput('thread-os.local'); break;
    case 'uptime': appendTermOutput(' ' + new Date().toLocaleTimeString() + '  up 1 day, 3:42, 1 user'); break;
    case 'calc': {
      try { const expr = args.join(''); const result = Function('"use strict"; return (' + expr.replace(/[^0-9+\-*/().%\s]/g, '') + ')')(); appendTermOutput(String(result)); }
      catch { appendTermOutput('calc: invalid expression', 'err'); } break;
    }
    case 'neofetch':
      appendTermOutput('        _______          shyamraj@thread-os', 'success');
      appendTermOutput('       /       \\         ──────────────────');
      appendTermOutput('      / Thread  \\        OS: Thread OS 1.0');
      appendTermOutput('     /   OS      \\       Host: WebKit Browser');
      appendTermOutput('    /             \\      Kernel: HTML5/CSS3/JS');
      appendTermOutput('   /               \\     Shell: thread-term');
      appendTermOutput('  /    _______      \\    Resolution: ' + window.innerWidth + 'x' + window.innerHeight);
      appendTermOutput('  \\   /       \\    /    Theme: macOS Tahoe Dark');
      appendTermOutput('   \\ /         \\  /     Memory: ∞');
      appendTermOutput('    \\___________/');
      break;
    default: appendTermOutput(`thread-term: command not found: ${command}`, 'err');
  }
  output.scrollTop = output.scrollHeight;
}

// ---- Activity Monitor ----
let activityInterval = null;
let cpuHistory = [];
let memHistory = [];
let diskHistory = [];
let netHistory = [];
let activityTab = 'cpu';

const processList = [
  { name: 'WindowServer', pid: 142, baseCpu: 12.3, baseMem: 312 },
  { name: 'Safari', pid: 584, baseCpu: 8.7, baseMem: 1200 },
  { name: 'kernel_task', pid: 0, baseCpu: 5.1, baseMem: 256 },
  { name: 'Finder', pid: 312, baseCpu: 2.4, baseMem: 84 },
  { name: 'launchd', pid: 1, baseCpu: 0.8, baseMem: 12 },
  { name: 'Spotlight', pid: 401, baseCpu: 1.2, baseMem: 148 },
  { name: 'mds_stores', pid: 205, baseCpu: 3.5, baseMem: 220 },
  { name: 'SystemUIServer', pid: 278, baseCpu: 1.8, baseMem: 96 },
  { name: 'Dock', pid: 290, baseCpu: 0.9, baseMem: 64 },
  { name: 'WindowManager', pid: 305, baseCpu: 2.1, baseMem: 180 }
];

function initActivityMonitor() {
  if (activityInterval) return;
  cpuHistory = Array(60).fill(0).map(() => Math.random() * 30 + 5);
  memHistory = Array(60).fill(0).map(() => Math.random() * 20 + 40);
  diskHistory = Array(60).fill(0).map(() => Math.random() * 15 + 2);
  netHistory = Array(60).fill(0).map(() => Math.random() * 25 + 5);
  activityInterval = setInterval(updateActivityMonitor, 1000);
  drawActivityGraphs();
  updateProcessList();
}

function stopActivityMonitor() {
  if (activityInterval) { clearInterval(activityInterval); activityInterval = null; }
}

function updateActivityMonitor() {
  cpuHistory.push(Math.max(1, Math.min(100, cpuHistory[cpuHistory.length - 1] + (Math.random() - 0.5) * 20)));
  memHistory.push(Math.max(30, Math.min(85, memHistory[memHistory.length - 1] + (Math.random() - 0.5) * 5)));
  diskHistory.push(Math.max(1, Math.min(40, diskHistory[diskHistory.length - 1] + (Math.random() - 0.5) * 8)));
  netHistory.push(Math.max(0, Math.min(60, netHistory[netHistory.length - 1] + (Math.random() - 0.5) * 15)));
  if (cpuHistory.length > 60) cpuHistory.shift();
  if (memHistory.length > 60) memHistory.shift();
  if (diskHistory.length > 60) diskHistory.shift();
  if (netHistory.length > 60) netHistory.shift();
  document.getElementById('cpuValue').textContent = cpuHistory[cpuHistory.length - 1].toFixed(1) + '%';
  document.getElementById('memValue').textContent = memHistory[memHistory.length - 1].toFixed(1) + '%';
  document.getElementById('diskValue').textContent = diskHistory[diskHistory.length - 1].toFixed(1) + '%';
  document.getElementById('netValue').textContent = netHistory[netHistory.length - 1].toFixed(1) + ' MB/s';
  drawActivityGraphs();
  updateProcessList();
}

function drawActivityGraphs() {
  const map = { cpu: { data: cpuHistory, color: '#28C840' }, memory: { data: memHistory, color: '#5AC8FA' }, disk: { data: diskHistory, color: '#FEBC2E' }, network: { data: netHistory, color: '#FF2D55' } };
  const cfg = map[activityTab] || map.cpu;
  drawGraph('activityCanvas', cfg.data, cfg.color);
}

function drawGraph(canvasId, data, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth * 2;
  const h = canvas.height = canvas.offsetHeight * 2;
  ctx.clearRect(0, 0, w, h);
  if (data.length < 2) return;
  const step = w / (data.length - 1);

  ctx.beginPath();
  ctx.moveTo(0, h);
  data.forEach((v, i) => ctx.lineTo(i * step, h - (v / 100) * h));
  ctx.lineTo(w, h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '40'); grad.addColorStop(1, color + '05');
  ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath();
  data.forEach((v, i) => { const x = i * step, y = h - (v / 100) * h; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
}

function updateProcessList() {
  const list = document.getElementById('activityProcessList');
  if (!list) return;
  let html = '<div class="proc-header"><span class="proc-name">Process Name</span><span class="proc-pid">PID</span><span class="proc-cpu">CPU</span><span class="proc-mem">Memory</span></div>';
  processList.forEach(p => {
    const cpu = (p.baseCpu + (Math.random() - 0.5) * 2).toFixed(1);
    const mem = Math.round(p.baseMem + (Math.random() - 0.5) * 20);
    const memStr = mem > 1024 ? (mem / 1024).toFixed(1) + ' GB' : mem + ' MB';
    html += `<div class="proc-row"><span class="proc-name">${p.name}</span><span class="proc-pid">${p.pid}</span><span class="proc-cpu">${cpu}%</span><span class="proc-mem">${memStr}</span></div>`;
  });
  list.innerHTML = html;
  const countEl = document.querySelector('#activity-window .stat-value:nth-child(3)');
  if (countEl) countEl.textContent = processList.length;
}

// ---- System Settings ----
function toggleSetting(el) { el.classList.toggle('on'); }

function switchSettingsPanel(panel) {
  document.querySelectorAll('.settings-nav-item').forEach(el => el.classList.toggle('active', el.dataset.panel === panel));
  document.querySelectorAll('.settings-panel').forEach(el => el.style.display = 'none');
  const target = document.getElementById('settings-' + panel);
  if (target) target.style.display = '';
}

// ---- TextEdit ----
function teNewFile() {
  teCurrentFile = null;
  document.getElementById('texteditArea').value = '';
  document.querySelector('#textedit-window .window-title').textContent = 'Untitled — TextEdit';
}

function teOpenFile() {
  const files = [];
  Object.keys(fileSystem).forEach(path => {
    const node = fileSystem[path];
    if (node && node.type === 'folder' && node.children) {
      node.children.forEach(c => {
        if (typeof c === 'object' && c.type === 'file') {
          const ext = c.name.split('.').pop().toLowerCase();
          if (['txt', 'md', 'json', 'js', 'css', 'html', 'xml', 'csv', 'log', 'py', 'java', 'c', 'cpp', 'h'].includes(ext)) {
            files.push({ name: c.name, path: path + '/' + c.name });
          }
        }
      });
    }
  });
  if (files.length === 0) { teNewFile(); return; }
  const file = files[0];
  teCurrentFile = file.path;
  const content = teFileContent[file.path] || getFileContent(file.path);
  document.getElementById('texteditArea').value = content;
  document.querySelector('#textedit-window .window-title').textContent = file.name + ' — TextEdit';
}

function teSaveFile() {
  const content = document.getElementById('texteditArea').value;
  if (teCurrentFile) {
    teFileContent[teCurrentFile] = content;
    document.querySelector('#textedit-window .window-title').textContent = teCurrentFile.split('/').pop() + ' — TextEdit';
  } else {
    const name = 'Untitled.txt';
    const path = currentPath + '/' + name;
    teCurrentFile = path;
    teFileContent[path] = content;
    const parent = getNode(currentPath);
    if (parent && parent.type === 'folder') {
      parent.children.push({ name, type: 'file', icon: 'doc', size: (content.length / 1024).toFixed(1) + ' KB', kind: 'Plain Text', date: 'Just now' });
    }
    document.querySelector('#textedit-window .window-title').textContent = name + ' — TextEdit';
    updateFinder();
  }
}

// ---- Search ----
function finderSearch(query) {
  if (!query) { updateFinder(); return; }
  const q = query.toLowerCase();
  const allItems = [];
  (function searchNode(path) {
    getChildren(path).forEach(c => {
      if (c.name.toLowerCase().includes(q)) allItems.push(c);
      if (c.type === 'folder') searchNode(c.path);
    });
  })('/');
  const sorted = sortItems(allItems);
  let rows = '';
  sorted.forEach((item, i) => {
    const iconClass = item.type === 'folder' ? 'folder-icon' : item.type === 'app' ? 'app-icon' : 'doc-icon';
    rows += `<div class="finder-row" data-index="${i}" onclick="selectItem(${i})" ondblclick="openItem(${i})">
      <span class="col-name"><span class="file-icon ${iconClass}">${getFileIcon(item)}</span><span>${item.name}</span></span>
      <span class="col-size">${item.size || '--'}</span><span class="col-kind">${item.kind || ''}</span><span class="col-date">${item.date || ''}</span></div>`;
  });
  document.getElementById('finderList').innerHTML = rows;
  document.getElementById('finderStatus').textContent = `${sorted.length} result${sorted.length !== 1 ? 's' : ''}`;
}

// ---- Screenshot Tool ----
let ssMode = null; // 'full' or 'region'
let ssStartX, ssStartY;

function startScreenshot(mode) {
  ssMode = mode;
  const overlay = document.getElementById('screenshotOverlay');
  overlay.classList.add('active');

  if (mode === 'full') {
    setTimeout(() => captureScreenshot(), 150);
  } else {
    // Region mode — wait for drag
    document.getElementById('screenshotSelection').classList.remove('visible');
  }
}

function captureScreenshot(x, y, w, h) {
  const overlay = document.getElementById('screenshotOverlay');
  overlay.classList.remove('active');
  document.getElementById('screenshotSelection').classList.remove('visible');
  ssMode = null;

  // Flash effect
  const flash = document.createElement('div');
  flash.style.cssText = 'position:fixed;inset:0;background:white;z-index:100000;pointer-events:none;';
  document.body.appendChild(flash);
  setTimeout(() => { flash.style.transition = 'opacity 0.3s'; flash.style.opacity = '0'; setTimeout(() => flash.remove(), 300); }, 50);

  // Show thumbnail
  const thumb = document.getElementById('screenshotThumb');
  thumb.classList.add('visible');
  setTimeout(() => thumb.classList.remove('visible'), 2500);
}

function cancelScreenshot() {
  const overlay = document.getElementById('screenshotOverlay');
  overlay.classList.remove('active');
  document.getElementById('screenshotSelection').classList.remove('visible');
  ssMode = null;
}

// ---- Battery Popup ----
function toggleBatteryPopup() {
  const popup = document.getElementById('batteryPopup');
  popup.classList.toggle('open');
}

function closeBatteryPopup() {
  document.getElementById('batteryPopup').classList.remove('open');
}

// ---- Calendar Dropdown ----
let calYear, calMonth;

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  renderCalendar();
}

function renderCalendar() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calMonthYear').textContent = months[calMonth] + ' ' + calYear;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrev = new Date(calYear, calMonth, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === calYear && today.getMonth() === calMonth;

  let html = '';
  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === today.getDate();
    html += `<div class="cal-day${isToday ? ' today' : ''}">${d}</div>`;
  }
  // Next month leading days
  const totalCells = firstDay + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="cal-day other-month">${i}</div>`;
  }
  document.getElementById('calDays').innerHTML = html;
}

function toggleCalendar() {
  const cal = document.getElementById('calendarDropdown');
  cal.classList.toggle('open');
}

function closeCalendar() {
  document.getElementById('calendarDropdown').classList.remove('open');
}

// ---- Control Center ----
function toggleControlCenter() {
  const cc = document.getElementById('controlCenter');
  const overlay = document.getElementById('ccOverlay');
  const isOpen = cc.classList.contains('open');
  if (isOpen) { cc.classList.remove('open'); overlay.classList.remove('visible'); }
  else { cc.classList.add('open'); overlay.classList.add('visible'); }
}

function closeControlCenter() {
  document.getElementById('controlCenter').classList.remove('open');
  document.getElementById('ccOverlay').classList.remove('visible');
}

// ---- Notification Center ----
function toggleNotifCenter() {
  const nc = document.getElementById('notifCenter');
  const overlay = document.getElementById('notifOverlay');
  const isOpen = nc.classList.contains('open');
  if (isOpen) { nc.classList.remove('open'); overlay.classList.remove('visible'); }
  else { nc.classList.add('open'); overlay.classList.add('visible'); }
}

function closeNotifCenter() {
  document.getElementById('notifCenter').classList.remove('open');
  const overlay = document.getElementById('notifOverlay');
  if (overlay) overlay.classList.remove('visible');
}

function clearAllNotifications() {
  const list = document.getElementById('notifList');
  list.innerHTML = '<div class="notif-empty">No new notifications</div>';
}

function dismissNotification(card) {
  card.style.transition = 'opacity 0.25s, transform 0.25s';
  card.style.opacity = '0';
  card.style.transform = 'translateX(40px)';
  setTimeout(() => {
    card.remove();
    const list = document.getElementById('notifList');
    if (!list.querySelector('.notif-card')) {
      list.innerHTML = '<div class="notif-empty">No new notifications</div>';
    }
  }, 250);
}

// ---- Shutdown / Logout Dialog ----
function toggleShutdownDialog() {
  const overlay = document.getElementById('shutdownOverlay');
  overlay.classList.toggle('visible');
}

function closeShutdownDialog() {
  document.getElementById('shutdownOverlay').classList.remove('visible');
}

function screenOff() {
  const screen = document.getElementById('screenOff');
  screen.classList.add('visible');
  screen.addEventListener('click', () => screen.classList.remove('visible'), { once: true });
}

// ---- Spotlight Search ----
let spotlightIndex = -1;

function toggleSpotlight() {
  const overlay = document.getElementById('spotlightOverlay');
  if (overlay.classList.contains('open')) {
    closeSpotlight();
  } else {
    overlay.classList.add('open');
    const input = document.getElementById('spotlightInput');
    input.value = '';
    document.getElementById('spotlightResults').innerHTML = '';
    spotlightIndex = -1;
    setTimeout(() => input.focus(), 50);
  }
}

function closeSpotlight() {
  document.getElementById('spotlightOverlay').classList.remove('open');
}

function spotlightSearch(query) {
  const results = document.getElementById('spotlightResults');
  if (!query) { results.innerHTML = ''; return; }
  const q = query.toLowerCase();

  const matches = [];

  // Search apps
  const apps = [
    { name: 'Finder', app: 'Finder', icon: 'ri-folder-line', kind: 'Application' },
    { name: 'Safari', app: 'Safari.app', icon: 'ri-safari-line', kind: 'Application' },
    { name: 'Calculator', app: 'Calculator.app', icon: 'ri-calculator-line', kind: 'Application' },
    { name: 'Terminal', app: 'Terminal.app', icon: 'ri-terminal-box-line', kind: 'Application' },
    { name: 'TextEdit', app: 'TextEdit.app', icon: 'ri-file-text-line', kind: 'Application' },
    { name: 'Activity Monitor', app: 'Activity Monitor.app', icon: 'ri-pulse-line', kind: 'Application' },
    { name: 'System Settings', app: 'System Settings.app', icon: 'ri-settings-3-line', kind: 'Application' },
    { name: 'Preview', app: 'Preview.app', icon: 'ri-image-line', kind: 'Application' }
  ];
  apps.forEach(a => { if (a.name.toLowerCase().includes(q)) matches.push({ ...a, action: () => openApp(a.app) }); });

  // Search files
  (function searchAll(path) {
    getChildren(path).forEach(c => {
      if (c.name.toLowerCase().includes(q)) {
        matches.push({
          name: c.name,
          icon: c.type === 'folder' ? 'ri-folder-3-fill' : 'ri-file-line',
          kind: c.kind || (c.type === 'folder' ? 'Folder' : 'File'),
          action: () => {
            if (c.type === 'folder') { navigateTo(c.path); }
            else { const parts = c.path.split('/').filter(Boolean); parts.pop(); navigateTo('/' + parts.join('/')); }
          }
        });
      }
      if (c.type === 'folder') searchAll(c.path);
    });
  })('/');

  // Search settings
  const settings = [
    { name: 'General', panel: 'general', icon: 'ri-settings-3-line', kind: 'Settings' },
    { name: 'Appearance', panel: 'appearance', icon: 'ri-palette-line', kind: 'Settings' },
    { name: 'Displays', panel: 'display', icon: 'ri-computer-line', kind: 'Settings' },
    { name: 'Sound', panel: 'sound', icon: 'ri-volume-up-line', kind: 'Settings' },
    { name: 'Network', panel: 'network', icon: 'ri-wifi-line', kind: 'Settings' },
    { name: 'Battery', panel: 'battery', icon: 'ri-battery-2-charge-line', kind: 'Settings' },
    { name: 'Privacy & Security', panel: 'privacy', icon: 'ri-shield-check-line', kind: 'Settings' }
  ];
  settings.forEach(s => { if (s.name.toLowerCase().includes(q)) matches.push({ ...s, action: () => { openApp('System Settings.app'); switchSettingsPanel(s.panel); } }); });

  // Render
  if (!matches.length) {
    results.innerHTML = '<div style="padding:20px;text-align:center;color:var(--mac-text-muted);font-size:13px;">No results found</div>';
    return;
  }

  let html = '';
  let lastKind = '';
  matches.slice(0, 10).forEach((m, i) => {
    if (m.kind !== lastKind) {
      html += `<div class="spotlight-section-label">${m.kind}</div>`;
      lastKind = m.kind;
    }
    html += `<div class="spotlight-item" data-index="${i}"><div class="spotlight-item-icon"><i class="${m.icon}"></i></div><span class="spotlight-item-text">${m.name}</span></div>`;
  });
  results.innerHTML = html;

  // Store actions
  results._actions = matches.slice(0, 10);
  spotlightIndex = -1;
}

function spotlightNavigate(dir) {
  const items = document.querySelectorAll('.spotlight-item');
  if (!items.length) return;
  items.forEach(i => i.classList.remove('active'));
  spotlightIndex = Math.max(0, Math.min(items.length - 1, spotlightIndex + dir));
  items[spotlightIndex].classList.add('active');
  items[spotlightIndex].scrollIntoView({ block: 'nearest' });
}

function spotlightSelect() {
  const results = document.getElementById('spotlightResults');
  const items = document.querySelectorAll('.spotlight-item');
  if (spotlightIndex >= 0 && spotlightIndex < items.length && results._actions) {
    closeSpotlight();
    results._actions[spotlightIndex].action();
  }
}

// ---- Context Menu ----
let contextTarget = null; // the right-clicked file/folder item
let clipboardItem = null;

function showContextMenu(e, target) {
  e.preventDefault();
  contextTarget = target || null;
  const menu = document.getElementById('contextMenu');
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';

  // Desktop right-click: show desktop-specific menu
  if (!target) {
    menu.innerHTML = `
      <div class="context-menu-item" data-action="changeWallpaper"><i class="ri-image-line"></i>Change Wallpaper...</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="newFolder"><i class="ri-folder-add-line"></i>New Folder</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="getInfo"><i class="ri-information-line"></i>Get Info</div>
    `;
    menu.querySelectorAll('.context-menu-item[data-action]').forEach(el => {
      el.addEventListener('click', () => handleContextAction(el.dataset.action));
    });
  } else {
    menu.innerHTML = `
      <div class="context-menu-item" data-action="open"><i class="ri-folder-open-line"></i>Open</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="getInfo"><i class="ri-information-line"></i>Get Info</div>
      <div class="context-menu-item" data-action="rename"><i class="ri-edit-line"></i>Rename</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="copy"><i class="ri-file-copy-line"></i>Copy</div>
      <div class="context-menu-item" data-action="paste"><i class="ri-clipboard-line"></i>Paste</div>
      <div class="context-menu-item" data-action="duplicate"><i class="ri-file-copy-2-line"></i>Duplicate</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item" data-action="newFolder"><i class="ri-folder-add-line"></i>New Folder</div>
      <div class="context-menu-separator"></div>
      <div class="context-menu-item context-menu-danger" data-action="trash"><i class="ri-delete-bin-line"></i>Move to Trash</div>
    `;
    menu.querySelectorAll('.context-menu-item[data-action]').forEach(el => {
      el.addEventListener('click', () => handleContextAction(el.dataset.action));
    });
  }
  menu.classList.add('visible');
}
function hideContextMenu() { document.getElementById('contextMenu').classList.remove('visible'); }

function showInfoDialog(name, kind, size, date, path) {
  document.getElementById('infoDialogTitle').textContent = name;
  document.getElementById('infoKind').textContent = kind || 'Document';
  document.getElementById('infoSize').textContent = size || '--';
  document.getElementById('infoDate').textContent = date || 'May 15, 2026';
  document.getElementById('infoPath').textContent = path || '';
  document.getElementById('infoDialogOverlay').classList.add('visible');
}

function hideInfoDialog() {
  document.getElementById('infoDialogOverlay').classList.remove('visible');
}

function handleContextAction(action) {
  if (!contextTarget && action !== 'paste' && action !== 'newFolder') return;
  const children = getChildren(currentPath);
  const sorted = sortItems(children);

  switch (action) {
    case 'open':
      if (contextTarget) {
        if (contextTarget.type === 'folder') navigateTo(contextTarget.path);
        else if (contextTarget.type === 'app') openApp(contextTarget.name);
      }
      break;
    case 'getInfo':
      if (contextTarget) showInfoDialog(contextTarget.name, contextTarget.kind, contextTarget.size, contextTarget.date, contextTarget.path);
      break;
    case 'rename': {
      if (!contextTarget) return;
      const newName = prompt('Rename "' + contextTarget.name + '" to:', contextTarget.name);
      if (newName && newName !== contextTarget.name && contextTarget.path) {
        const parts = contextTarget.path.split('/').filter(Boolean);
        const oldName = parts.pop();
        const parentPath = '/' + parts.join('/');
        const parentNode = getNode(parentPath);
        if (parentNode) {
          parentNode.children = parentNode.children.map(c => {
            const cName = typeof c === 'string' ? c : c.name;
            return cName === oldName ? (typeof c === 'string' ? newName : { ...c, name: newName }) : c;
          });
          updateFinder();
        }
      }
      break;
    }
    case 'copy':
      if (contextTarget) clipboardItem = { ...contextTarget };
      break;
    case 'paste':
      if (clipboardItem) {
        const newFile = { ...clipboardItem, name: clipboardItem.name + ' copy', date: 'Just now' };
        const node = getNode(currentPath);
        if (node && node.type === 'folder') {
          node.children.push(newFile);
          updateFinder();
        }
      }
      break;
    case 'duplicate':
      if (contextTarget) {
        const dupe = { ...contextTarget, name: contextTarget.name + ' copy', date: 'Just now' };
        const node = getNode(currentPath);
        if (node && node.type === 'folder') {
          node.children.push(dupe);
          updateFinder();
        }
      }
      break;
    case 'newFolder': {
      const folderName = prompt('New folder name:', 'Untitled Folder');
      if (folderName) {
        const node = getNode(currentPath);
        if (node && node.type === 'folder') {
          const newPath = currentPath + '/' + folderName;
          fileSystem[newPath] = { type: 'folder', children: [] };
          node.children.push(folderName);
          updateFinder();
        }
      }
      break;
    }
    case 'trash':
      if (contextTarget && contextTarget.path) {
        const parts = contextTarget.path.split('/').filter(Boolean);
        const itemName = parts.pop();
        const parentPath = '/' + parts.join('/');
        const parentNode = getNode(parentPath);
        if (parentNode) {
          parentNode.children = parentNode.children.filter(c => (typeof c === 'string' ? c : c.name) !== itemName);
          updateFinder();
        }
      }
      break;
    case 'changeWallpaper':
      openWallpaperPicker();
      break;
  }
  hideContextMenu();
}

// ---- Force Quit Dialog ----
let forcequitSelected = null;

function openForceQuit() {
  const overlay = document.getElementById('forcequitOverlay');
  const list = document.getElementById('forcequitList');
  forcequitSelected = null;
  document.getElementById('forcequitBtn').disabled = true;

  const runningApps = [
    { name: 'Finder', app: 'Finder', icon: 'ri-folder-line', status: 'Running' },
    { name: 'Safari', app: 'Safari.app', icon: 'ri-safari-line', status: 'Running' },
    { name: 'Calculator', app: 'Calculator.app', icon: 'ri-calculator-line', status: 'Running' },
    { name: 'Terminal', app: 'Terminal.app', icon: 'ri-terminal-box-line', status: 'Running' },
    { name: 'TextEdit', app: 'TextEdit.app', icon: 'ri-file-text-line', status: 'Running' },
    { name: 'Activity Monitor', app: 'Activity Monitor.app', icon: 'ri-pulse-line', status: 'Running' },
    { name: 'System Settings', app: 'System Settings.app', icon: 'ri-settings-3-line', status: 'Running' }
  ];

  let html = '';
  runningApps.forEach((a, i) => {
    const isRunning = a.app === 'Finder' || !document.getElementById(appIdMap[a.app])?.classList.contains('minimized');
    html += `<div class="forcequit-item" data-index="${i}" data-app="${a.app}">
      <div class="forcequit-app-icon"><i class="${a.icon}"></i></div>
      <span class="forcequit-app-name">${a.name}</span>
      <span class="forcequit-app-status">${isRunning ? a.status : 'Stopped'}</span>
    </div>`;
  });
  list.innerHTML = html;

  list.querySelectorAll('.forcequit-item').forEach(el => {
    el.addEventListener('click', () => {
      list.querySelectorAll('.forcequit-item').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      forcequitSelected = el.dataset.app;
      document.getElementById('forcequitBtn').disabled = false;
    });
  });

  overlay.classList.add('visible');
}

function closeForceQuit() {
  document.getElementById('forcequitOverlay').classList.remove('visible');
}

function forceQuitApp() {
  if (!forcequitSelected) return;
  if (forcequitSelected === 'Finder') return;
  const winId = appIdMap[forcequitSelected];
  if (winId) closeWindow(winId);
  closeForceQuit();
}

// ---- Wallpaper Picker ----
function openWallpaperPicker() {
  document.getElementById('wallpaperPickerOverlay').classList.add('visible');
}
function closeWallpaperPicker() {
  document.getElementById('wallpaperPickerOverlay').classList.remove('visible');
}
function changeWallpaper(gradient) {
  document.getElementById('desktop').style.background = gradient;
  document.querySelectorAll('.wallpaper-option').forEach(el => el.classList.remove('active'));
  event.currentTarget.classList.add('active');
  closeWallpaperPicker();
}

// ---- Launchpad (Apps) ----
function toggleLaunchpad() {
  const overlay = document.getElementById('launchpadOverlay');
  overlay.classList.toggle('visible');
}

function closeLaunchpad() {
  const overlay = document.getElementById('launchpadOverlay');
  overlay.classList.remove('visible');
}

// ---- Boot Screen ----
function startBootScreen() {
  const bootScreen = document.getElementById('bootScreen');
  const progressBar = document.getElementById('bootProgressBar');
  if (!bootScreen || !progressBar) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      progressBar.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        setTimeout(() => bootScreen.remove(), 600);
      }, 300);
    } else {
      progressBar.style.width = progress + '%';
    }
  }, 120);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  // Boot screen
  startBootScreen();
  // Init all app windows as minimized
  Object.values(appIdMap).forEach(id => {
    const win = document.getElementById(id);
    if (win) { win.classList.add('minimized'); initWindowDrag(id); }
  });

  // Init Finder
  initWindowDrag('finder-window');
  updateFinder();
  initFinderDragDrop();

  // Traffic light buttons (event delegation)
  document.addEventListener('click', e => {
    const tlBtn = e.target.closest('.tl-btn');
    if (tlBtn) {
      const win = tlBtn.closest('.mac-window');
      if (!win) return;
      const action = tlBtn.dataset.action;
      if (action === 'close') closeWindow(win.id);
      else if (action === 'minimize') minimizeWindow(win.id);
      else if (action === 'maximize') {
        if (win.style.width === '100vw') { win.style.width = win.dataset.origW || '640px'; win.style.height = win.dataset.origH || '420px'; win.style.top = win.dataset.origT || '50px'; win.style.left = win.dataset.origL || '100px'; }
        else { win.dataset.origW = win.style.width; win.dataset.origH = win.style.height; win.dataset.origT = win.style.top; win.dataset.origL = win.style.left; win.style.width = '100vw'; win.style.height = 'calc(100vh - 28px)'; win.style.top = '28px'; win.style.left = '0'; }
      }
    }
  });

  // Sidebar navigation
  document.querySelectorAll('.sidebar-item').forEach(el => {
    el.addEventListener('click', () => { if (el.dataset.path) navigateTo(el.dataset.path); });
  });

  // Nav buttons
  document.getElementById('btnBack').addEventListener('click', goBack);
  document.getElementById('btnForward').addEventListener('click', goForward);
  document.getElementById('btnUp').addEventListener('click', goToParent);

  // View toggle
  document.querySelectorAll('.view-btn').forEach(el => {
    el.addEventListener('click', () => { viewMode = el.dataset.view; updateFinder(); });
  });

  // Sort headers
  document.querySelectorAll('.finder-list-header span[data-sort]').forEach(el => {
    el.addEventListener('click', () => {
      const sort = el.dataset.sort;
      if (currentSort === sort) sortAsc = !sortAsc;
      else { currentSort = sort; sortAsc = true; }
      updateFinder();
    });
  });

  // Search
  document.getElementById('finderSearchInput').addEventListener('input', e => finderSearch(e.target.value));

  // Terminal input
  document.getElementById('terminalInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { const val = e.target.value.trim(); e.target.value = ''; terminalExec(val); }
  });

  // Terminal window focus -> focus input
  document.getElementById('terminal-window').addEventListener('click', () => {
    setTimeout(() => document.getElementById('terminalInput').focus(), 50);
  });

  // TextEdit bold/italic/underline toggles
  ['teBold', 'teItalic', 'teUnderline'].forEach(id => {
    document.getElementById(id).addEventListener('click', function () {
      this.classList.toggle('active');
      const area = document.getElementById('texteditArea');
      if (id === 'teBold') area.style.fontWeight = this.classList.contains('active') ? 'bold' : '';
      if (id === 'teItalic') area.style.fontStyle = this.classList.contains('active') ? 'italic' : '';
      if (id === 'teUnderline') area.style.textDecoration = this.classList.contains('active') ? 'underline' : '';
    });
  });

  // TextEdit font size
  document.getElementById('teFontSize').addEventListener('change', function () {
    document.getElementById('texteditArea').style.fontSize = this.value + 'px';
  });

  // TextEdit new/open/save
  document.getElementById('teNew').addEventListener('click', teNewFile);
  document.getElementById('teOpen').addEventListener('click', teOpenFile);
  document.getElementById('teSave').addEventListener('click', teSaveFile);

  // Settings sidebar
  document.querySelectorAll('.settings-nav-item').forEach(el => {
    el.addEventListener('click', () => switchSettingsPanel(el.dataset.panel));
  });

  // Safari navigation
  let safariHistory = ['https://www.apple.com'];
  let safariIndex = 0;

  function safariNavigate(url) {
    const fullUrl = url.startsWith('http') ? url : 'https://' + url;
    document.getElementById('safariUrl').value = fullUrl;
    document.getElementById('safariFrame').src = fullUrl;
    if (safariHistory[safariIndex] !== fullUrl) {
      safariHistory = safariHistory.slice(0, safariIndex + 1);
      safariHistory.push(fullUrl);
      safariIndex = safariHistory.length - 1;
    }
    document.getElementById('safariBack').disabled = safariIndex <= 0;
    document.getElementById('safariForward').disabled = safariIndex >= safariHistory.length - 1;
  }

  document.getElementById('safariGo').addEventListener('click', () => {
    safariNavigate(document.getElementById('safariUrl').value);
  });
  document.getElementById('safariUrl').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('safariGo').click();
  });
  document.getElementById('safariBack').addEventListener('click', () => {
    if (safariIndex > 0) { safariIndex--; document.getElementById('safariUrl').value = safariHistory[safariIndex]; document.getElementById('safariFrame').src = safariHistory[safariIndex]; }
  });
  document.getElementById('safariForward').addEventListener('click', () => {
    if (safariIndex < safariHistory.length - 1) { safariIndex++; document.getElementById('safariUrl').value = safariHistory[safariIndex]; document.getElementById('safariFrame').src = safariHistory[safariIndex]; }
  });

  // Dock clicks
  document.querySelectorAll('.dock-item').forEach(el => {
    el.addEventListener('click', () => {
      const appName = el.dataset.app;
      if (appName === 'launchpad') { toggleLaunchpad(); return; }
      if (appName === 'trash' || appName === 'finder') {
        // Finder: toggle visibility
        const finderWin = document.getElementById('finder-window');
        if (finderWin.classList.contains('minimized')) { finderWin.classList.remove('minimized'); focusWindow('finder-window'); }
        else if (finderWin.classList.contains('focused')) { finderWin.classList.add('minimized'); }
        else focusWindow('finder-window');
        return;
      }
      // Check if the app window is already open
      const winId = appIdMap[appName];
      if (winId) {
        const win = document.getElementById(winId);
        if (win && !win.classList.contains('minimized') && win.classList.contains('focused')) { minimizeWindow(winId); return; }
        openApp(appName);
      }
    });
  });

  // Desktop right-click context menu
  document.getElementById('desktop').addEventListener('contextmenu', e => showContextMenu(e, null));
  document.addEventListener('click', e => { if (!e.target.closest('.context-menu')) hideContextMenu(); });

  // Wallpaper picker
  document.getElementById('wallpaperPickerClose').addEventListener('click', closeWallpaperPicker);
  document.getElementById('wallpaperPickerOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeWallpaperPicker(); });
  document.querySelectorAll('.wallpaper-option').forEach(el => {
    el.addEventListener('click', function() {
      changeWallpaper(this.dataset.gradient);
    });
  });

  // Force Quit dialog
  document.getElementById('forcequitCancel').addEventListener('click', closeForceQuit);
  document.getElementById('forcequitBtn').addEventListener('click', forceQuitApp);
  document.getElementById('forcequitOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeForceQuit(); });

  // Spotlight search input
  document.getElementById('spotlightInput').addEventListener('input', e => spotlightSearch(e.target.value));
  document.getElementById('spotlightInput').addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); spotlightNavigate(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); spotlightNavigate(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); spotlightSelect(); }
  });
  document.getElementById('spotlightOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSpotlight();
  });

  // Spotlight search icon in tray
  document.querySelector('.ri-search-line').addEventListener('click', toggleSpotlight);

  // Context menu item clicks
  document.querySelectorAll('.context-menu-item[data-action]').forEach(el => {
    el.addEventListener('click', () => handleContextAction(el.dataset.action));
  });

  // Info dialog close
  document.getElementById('infoDialogClose').addEventListener('click', hideInfoDialog);
  document.getElementById('infoDialogOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) hideInfoDialog(); });

  // Finder row right-click
  document.getElementById('finderList').addEventListener('contextmenu', e => {
    const row = e.target.closest('.finder-row');
    if (row) {
      const idx = parseInt(row.dataset.index);
      const children = getChildren(currentPath);
      const sorted = sortItems(children);
      e.stopPropagation();
      showContextMenu(e, sorted[idx] || null);
    }
  });

  // Finder grid item right-click
  document.getElementById('finderGrid').addEventListener('contextmenu', e => {
    const item = e.target.closest('.finder-grid-item');
    if (item) {
      const idx = parseInt(item.dataset.index);
      const children = getChildren(currentPath);
      const sorted = sortItems(children);
      e.stopPropagation();
      showContextMenu(e, sorted[idx] || null);
    }
  });

  // Desktop icon double-click
  document.querySelectorAll('.desktop-icon').forEach(el => {
    el.addEventListener('dblclick', () => {
      const finderWin = document.getElementById('finder-window');
      finderWin.classList.remove('minimized');
      focusWindow('finder-window');
    });
  });

  // Shutdown dialog - brand logo click
  document.getElementById('brandLogo').addEventListener('click', toggleShutdownDialog);

  // Shutdown dialog - buttons
  document.getElementById('btnSleep').addEventListener('click', () => { closeShutdownDialog(); screenOff(); });
  document.getElementById('btnRestart').addEventListener('click', () => { closeShutdownDialog(); screenOff(); setTimeout(() => location.reload(), 2000); });
  document.getElementById('btnShutdown').addEventListener('click', () => { closeShutdownDialog(); screenOff(); });
  document.getElementById('btnLogout').addEventListener('click', () => { closeShutdownDialog(); screenOff(); });
  document.getElementById('btnShutdownCancel').addEventListener('click', closeShutdownDialog);
  document.getElementById('shutdownOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeShutdownDialog(); });

  // Activity monitor tabs
  document.querySelectorAll('.activity-tab').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.activity-tab').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      activityTab = el.dataset.tab;
      drawActivityGraphs();
    });
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hideContextMenu(); closeLaunchpad(); closeNotifCenter(); closeControlCenter(); closeCalendar(); closeBatteryPopup(); cancelScreenshot(); closeSpotlight(); closeWallpaperPicker(); closeForceQuit(); }
    // Cmd+F or Ctrl+F -> focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'f') { e.preventDefault(); document.getElementById('finderSearchInput').focus(); }
    // Cmd+Shift+3 -> full screenshot
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '3') { e.preventDefault(); startScreenshot('full'); }
    // Cmd+Shift+4 -> region screenshot
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '4') { e.preventDefault(); startScreenshot('region'); }
    // Cmd+Space -> Spotlight
    if ((e.metaKey || e.ctrlKey) && e.key === ' ') { e.preventDefault(); toggleSpotlight(); }
    // Cmd+Option+Esc -> Force Quit
    if ((e.metaKey || e.ctrlKey) && e.altKey && e.key === 'Escape') { e.preventDefault(); openForceQuit(); }
  });

  // Launchpad - click overlay background to close
  document.getElementById('launchpadOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget || e.target.classList.contains('launchpad-grid')) {
      closeLaunchpad();
    }
  });

  // Launchpad - click app item to launch and close
  document.querySelectorAll('.launchpad-item').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const appName = el.dataset.app;
      if (appName === 'Finder') {
        const finderWin = document.getElementById('finder-window');
        finderWin.classList.remove('minimized');
        focusWindow('finder-window');
      } else {
        openApp(appName);
      }
      closeLaunchpad();
    });
  });

  // Calendar - clock click toggles calendar
  document.getElementById('menuClock').addEventListener('click', toggleCalendar);
  document.getElementById('calPrev').addEventListener('click', e => { e.stopPropagation(); calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
  document.getElementById('calNext').addEventListener('click', e => { e.stopPropagation(); calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });
  initCalendar();

  // Battery popup
  document.getElementById('batteryTrayBtn').addEventListener('click', toggleBatteryPopup);
  document.getElementById('batteryLpm').addEventListener('click', function() { this.classList.toggle('active'); });

  // Screenshot overlay - mouse events for region selection
  const ssOverlay = document.getElementById('screenshotOverlay');
  const ssSelection = document.getElementById('screenshotSelection');

  ssOverlay.addEventListener('mousedown', e => {
    if (ssMode !== 'region') return;
    ssStartX = e.clientX; ssStartY = e.clientY;
    ssSelection.style.left = ssStartX + 'px';
    ssSelection.style.top = ssStartY + 'px';
    ssSelection.style.width = '0';
    ssSelection.style.height = '0';
    ssSelection.classList.add('visible');
  });

  document.addEventListener('mousemove', e => {
    if (ssMode !== 'region' || !ssStartX) return;
    const x = Math.min(e.clientX, ssStartX);
    const y = Math.min(e.clientY, ssStartY);
    const w = Math.abs(e.clientX - ssStartX);
    const h = Math.abs(e.clientY - ssStartY);
    ssSelection.style.left = x + 'px';
    ssSelection.style.top = y + 'px';
    ssSelection.style.width = w + 'px';
    ssSelection.style.height = h + 'px';
  });

  document.addEventListener('mouseup', e => {
    if (ssMode !== 'region' || !ssStartX) return;
    const w = Math.abs(e.clientX - ssStartX);
    const h = Math.abs(e.clientY - ssStartY);
    if (w > 10 && h > 10) {
      captureScreenshot();
    } else {
      ssSelection.classList.remove('visible');
    }
    ssStartX = null;
  });

  // Notification Center - overlay click closes
  document.getElementById('notifOverlay').addEventListener('click', closeNotifCenter);

  // Notification Center - clear all button
  document.getElementById('notifClearAll').addEventListener('click', clearAllNotifications);

  // Notification Center - click card to dismiss
  document.getElementById('notifList').addEventListener('click', e => {
    const card = e.target.closest('.notif-card');
    if (card) dismissNotification(card);
  });

  // Notification bell icon
  document.getElementById('notifTrayBtn').addEventListener('click', toggleNotifCenter);

  // Control Center - tray icon click
  document.querySelector('.ri-equalizer-line').addEventListener('click', toggleControlCenter);

  // Control Center - overlay click closes
  document.getElementById('ccOverlay').addEventListener('click', closeControlCenter);

  // Control Center - tile toggles
  document.querySelectorAll('.cc-tile').forEach(el => {
    el.addEventListener('click', () => {
      const isActive = el.dataset.active === 'true';
      el.dataset.active = isActive ? 'false' : 'true';
      const desc = el.querySelector('.cc-tile-desc');
      if (desc) {
        if (el.id === 'ccWifi') desc.textContent = isActive ? 'Off' : 'ThreadOS-5G';
        else if (el.id === 'ccBluetooth') desc.textContent = isActive ? 'Off' : 'On';
        else if (el.id === 'ccAirdrop') desc.textContent = isActive ? 'Off' : 'Everyone';
        else if (el.id === 'ccFocus') desc.textContent = isActive ? 'Off' : 'On';
      }
    });
  });

  // Control Center - dark mode toggle
  document.getElementById('ccDarkMode').addEventListener('click', function() {
    this.classList.toggle('active');
  });

  // Control Center - bottom button toggles
  ['ccDoNotDisturb', 'ccScreenMirror', 'ccStageManager'].forEach(id => {
    document.getElementById(id).addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
});
