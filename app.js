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
      { name: 'Safari.app', type: 'app', icon: 'safari', size: '22.1 MB', kind: 'Application', date: 'May 1, 2026' },
      { name: 'Console.app', type: 'app', icon: 'terminal', size: '4.2 MB', kind: 'Application', date: 'Mar 15, 2026' },
      { name: 'Screen Recording.app', type: 'app', icon: 'terminal', size: '6.8 MB', kind: 'Application', date: 'Jun 1, 2026' },
      { name: 'Weather.app', type: 'app', icon: 'terminal', size: '5.3 MB', kind: 'Application', date: 'Jun 2, 2026' },
      { name: 'App Store.app', type: 'app', icon: 'terminal', size: '14.2 MB', kind: 'Application', date: 'Jun 3, 2026' },
      { name: 'Dictionary.app', type: 'app', icon: 'terminal', size: '3.6 MB', kind: 'Application', date: 'Jun 4, 2026' },
      { name: 'Voice Memos.app', type: 'app', icon: 'terminal', size: '5.1 MB', kind: 'Application', date: 'Jun 5, 2026' },
      { name: 'Stickies.app', type: 'app', icon: 'terminal', size: '2.3 MB', kind: 'Application', date: 'Jun 6, 2026' },
      { name: 'System Report.app', type: 'app', icon: 'terminal', size: '4.7 MB', kind: 'Application', date: 'Jun 7, 2026' },
      { name: 'Network Utility.app', type: 'app', icon: 'terminal', size: '3.2 MB', kind: 'Application', date: 'Jun 8, 2026' },
      { name: 'Font Book.app', type: 'app', icon: 'terminal', size: '6.0 MB', kind: 'Application', date: 'Jun 9, 2026' }
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
let teModified = false;

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
  // Desktop clock widget
  const dcwTime = document.getElementById('dcwTime');
  const dcwDate = document.getElementById('dcwDate');
  if (dcwTime) dcwTime.textContent = `${h12}:${m}`;
  if (dcwDate) {
    const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dcwDate.textContent = `${fullDays[now.getDay()]}, ${fullMonths[now.getMonth()]} ${now.getDate()}`;
  }
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
    previewImgZoomLevel = 100;
    previewImgRotation = 0;
    const colors = ['#47A3FF', '#AF52DE', '#FF5F57', '#28C840', '#FEBC2E', '#FF2D55', '#5AC8FA', '#FF9500'];
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    const c2 = colors[Math.floor(Math.random() * colors.length)];
    const c3 = colors[Math.floor(Math.random() * colors.length)];
    html = `<div class="preview-img-toolbar">
      <button class="preview-img-btn" onclick="previewImgZoom(-1)" title="Zoom Out"><i class="ri-subtract-line"></i></button>
      <span class="preview-img-zoom" id="previewImgZoom">100%</span>
      <button class="preview-img-btn" onclick="previewImgZoom(1)" title="Zoom In"><i class="ri-add-line"></i></button>
      <div class="preview-img-sep"></div>
      <button class="preview-img-btn" onclick="previewImgFit()" title="Fit to Window"><i class="ri-fullscreen-line"></i></button>
      <button class="preview-img-btn" onclick="previewImgActual()" title="Actual Size"><i class="ri-crop-2-line"></i></button>
      <div class="preview-img-sep"></div>
      <button class="preview-img-btn" onclick="previewImgRotate(-90)" title="Rotate Left"><i class="ri-arrow-go-back-line"></i></button>
      <button class="preview-img-btn" onclick="previewImgRotate(90)" title="Rotate Right"><i class="ri-arrow-go-forward-line"></i></button>
    </div>
    <div class="preview-img-canvas" id="previewImgCanvas">
      <div class="preview-img-checker"></div>
      <div class="preview-img-wrapper" id="previewImgWrapper">
        <div class="preview-img-simulated" style="background:linear-gradient(145deg, ${c1}35, ${c2}25, ${c3}35);">
          <svg viewBox="0 0 480 320" width="480" height="320" class="preview-img-svg">
            <defs>
              <linearGradient id="imgSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${c1}" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="${c2}" stop-opacity="0.3"/>
              </linearGradient>
              <linearGradient id="imgMount" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${c2}" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="${c3}" stop-opacity="0.7"/>
              </linearGradient>
              <radialGradient id="imgSun" cx="75%" cy="25%" r="15%">
                <stop offset="0%" stop-color="#FEBC2E" stop-opacity="0.9"/>
                <stop offset="60%" stop-color="${c1}" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <rect width="480" height="320" rx="10" fill="url(#imgSky)"/>
            <circle cx="360" cy="80" r="50" fill="url(#imgSun)"/>
            <circle cx="360" cy="80" r="22" fill="#FEBC2E" opacity="0.8"/>
            <polygon points="0,220 120,120 200,170 280,100 400,160 480,130 480,320 0,320" fill="url(#imgMount)" opacity="0.6"/>
            <polygon points="0,260 80,180 160,210 260,150 350,200 480,170 480,320 0,320" fill="${c3}" opacity="0.25"/>
            <ellipse cx="240" cy="300" rx="280" ry="40" fill="rgba(255,255,255,0.05)"/>
          </svg>
          <div class="preview-img-label">${item.name}</div>
        </div>
      </div>
    </div>
    <div class="preview-img-statusbar">
      <span>${item.name}</span>
      <span>${item.size || 'Unknown size'}</span>
    </div>`;
  } else if (type === 'text') {
    const fileContent = getFileContent(item.path);
    html = `<div style="padding:16px;height:100%;overflow:auto;">
      <pre style="margin:0;font-family:'SF Mono',monospace;font-size:13px;color:#e0e0e0;white-space:pre-wrap;word-wrap:break-word;">${escapeHtml(fileContent)}</pre>
    </div>`;
  } else if (type === 'pdf') {
    const pdfPages = [
      { title: item.name, subtitle: item.size || 'Unknown size' },
      { title: 'Page 2', subtitle: 'Document content preview' }
    ];
    html = `<div class="preview-pdf-container">
      <div class="preview-pdf-toolbar">
        <button class="preview-pdf-btn" onclick="pdfNavPrev()" title="Previous Page"><i class="ri-arrow-left-s-line"></i></button>
        <span class="preview-pdf-page" id="previewPdfPage">1 / ${pdfPages.length}</span>
        <button class="preview-pdf-btn" onclick="pdfNavNext()" title="Next Page"><i class="ri-arrow-right-s-line"></i></button>
        <div class="preview-pdf-sep"></div>
        <button class="preview-pdf-btn" onclick="pdfZoom(-1)" title="Zoom Out"><i class="ri-subtract-line"></i></button>
        <span class="preview-pdf-zoom" id="previewPdfZoom">100%</span>
        <button class="preview-pdf-btn" onclick="pdfZoom(1)" title="Zoom In"><i class="ri-add-line"></i></button>
        <div class="preview-pdf-sep"></div>
        <button class="preview-pdf-btn" onclick="pdfFitWidth()" title="Fit Width"><i class="ri-drag-move-2-line"></i></button>
        <button class="preview-pdf-btn" onclick="pdfFitPage()" title="Fit Page"><i class="ri-fullscreen-exit-line"></i></button>
      </div>
      <div class="preview-pdf-canvas" id="previewPdfCanvas">
        <div class="preview-pdf-page-content" id="previewPdfPageContent">
          <div class="preview-pdf-sheet">
            <div class="preview-pdf-sheet-header">
              <div class="preview-pdf-logo"><i class="ri-file-pdf-2-line"></i></div>
              <div class="preview-pdf-sheet-title">${item.name}</div>
              <div class="preview-pdf-sheet-meta">${item.kind || 'PDF Document'} &middot; ${item.size || 'Unknown'}</div>
            </div>
            <div class="preview-pdf-sheet-body">
              <div class="preview-pdf-text-block">
                <div class="preview-pdf-text-line w100"></div>
                <div class="preview-pdf-text-line w90"></div>
                <div class="preview-pdf-text-line w95"></div>
                <div class="preview-pdf-text-line w80"></div>
              </div>
              <div class="preview-pdf-img-placeholder">
                <i class="ri-image-line"></i>
              </div>
              <div class="preview-pdf-text-block">
                <div class="preview-pdf-text-line w100"></div>
                <div class="preview-pdf-text-line w85"></div>
                <div class="preview-pdf-text-line w92"></div>
                <div class="preview-pdf-text-line w70"></div>
                <div class="preview-pdf-text-line w95"></div>
              </div>
            </div>
            <div class="preview-pdf-sheet-footer">
              <span>Page 1 of ${pdfPages.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="preview-pdf-statusbar">
        <span>${item.name}</span>
        <span>${item.size || 'Unknown size'}</span>
      </div>
    </div>`;
    setTimeout(() => initPdfPreview(pdfPages.length), 0);
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
    html = `<div class="preview-video-container">
      <div class="preview-video-stage" id="previewVideoStage">
        <div class="preview-video-poster">
          <div class="preview-video-play-big" onclick="previewVideoTogglePlay()">
            <i class="ri-play-fill"></i>
          </div>
          <div class="preview-video-title">${item.name}</div>
          <div class="preview-video-meta">${item.size || 'Unknown size'} &middot; ${item.kind || 'Video'}</div>
        </div>
      </div>
      <div class="preview-video-controls">
        <button class="preview-video-btn" id="previewVideoPlayBtn" onclick="previewVideoTogglePlay()"><i class="ri-play-fill"></i></button>
        <div class="preview-video-progress" id="previewVideoProgress" onclick="previewVideoSeek(event)">
          <div class="preview-video-progress-bg"></div>
          <div class="preview-video-progress-fill" id="previewVideoProgressFill"></div>
          <div class="preview-video-progress-thumb" id="previewVideoProgressThumb"></div>
        </div>
        <span class="preview-video-time" id="previewVideoTime">0:00 / 0:00</span>
        <div class="preview-video-sep"></div>
        <button class="preview-video-btn" onclick="previewVideoMute()" title="Mute"><i class="ri-volume-up-line" id="previewVideoVolIcon"></i></button>
        <div class="preview-video-volume" id="previewVideoVolumeWrap">
          <input type="range" class="preview-video-vol-slider" id="previewVideoVolSlider" min="0" max="100" value="80" oninput="previewVideoSetVolume(this.value)">
        </div>
        <button class="preview-video-btn preview-video-btn-fullscreen" onclick="previewVideoFullscreen()" title="Fullscreen"><i class="ri-fullscreen-line"></i></button>
      </div>
    </div>`;
    setTimeout(() => initVideoPreview(item), 0);
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

// ---- Image Preview Controls ----
let previewImgZoomLevel = 100;
let previewImgRotation = 0;

function previewImgZoom(dir) {
  previewImgZoomLevel = Math.max(25, Math.min(400, previewImgZoomLevel + dir * 25));
  applyPreviewImgTransform();
}

function previewImgFit() {
  previewImgZoomLevel = 100;
  previewImgRotation = 0;
  applyPreviewImgTransform();
}

function previewImgActual() {
  previewImgZoomLevel = 100;
  applyPreviewImgTransform();
}

function previewImgRotate(deg) {
  previewImgRotation = (previewImgRotation + deg) % 360;
  applyPreviewImgTransform();
}

function applyPreviewImgTransform() {
  const wrapper = document.getElementById('previewImgWrapper');
  const zoomLabel = document.getElementById('previewImgZoom');
  if (!wrapper || !zoomLabel) return;
  zoomLabel.textContent = previewImgZoomLevel + '%';
  wrapper.style.transform = `scale(${previewImgZoomLevel / 100}) rotate(${previewImgRotation}deg)`;
}

// ---- Video Preview Controls ----
let videoPlaying = false;
let videoProgress = 0;
let videoDuration = 180;
let videoInterval = null;

function initVideoPreview(item) {
  const nameLower = item.name.toLowerCase();
  if (nameLower.includes('short') || nameLower.includes('clip')) videoDuration = 45;
  else if (nameLower.includes('long')) videoDuration = 600;
  else videoDuration = 180;
  videoPlaying = false;
  videoProgress = 0;
  updateVideoUI();
}

function previewVideoTogglePlay() {
  videoPlaying = !videoPlaying;
  if (videoPlaying) {
    videoInterval = setInterval(() => {
      videoProgress += 1;
      if (videoProgress >= videoDuration) { videoProgress = 0; videoPlaying = false; clearInterval(videoInterval); }
      updateVideoUI();
    }, 1000);
  } else {
    clearInterval(videoInterval);
  }
  updateVideoUI();
}

function previewVideoSeek(e) {
  const bar = document.getElementById('previewVideoProgress');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  videoProgress = Math.round(((e.clientX - rect.left) / rect.width) * videoDuration);
  videoProgress = Math.max(0, Math.min(videoDuration, videoProgress));
  updateVideoUI();
}

function previewVideoMute() {
  const slider = document.getElementById('previewVideoVolSlider');
  const icon = document.getElementById('previewVideoVolIcon');
  if (!slider || !icon) return;
  if (parseInt(slider.value) > 0) { slider.dataset.prevVol = slider.value; slider.value = 0; icon.className = 'ri-volume-mute-line'; }
  else { slider.value = slider.dataset.prevVol || 80; icon.className = parseInt(slider.value) > 50 ? 'ri-volume-up-line' : 'ri-volume-down-line'; }
}

function previewVideoSetVolume(val) {
  const icon = document.getElementById('previewVideoVolIcon');
  if (icon) icon.className = parseInt(val) === 0 ? 'ri-volume-mute-line' : parseInt(val) > 50 ? 'ri-volume-up-line' : 'ri-volume-down-line';
}

function previewVideoFullscreen() {
  const stage = document.getElementById('previewVideoStage');
  if (stage) { if (stage.requestFullscreen) stage.requestFullscreen(); else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen(); }
}

function formatVideoTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m + ':' + sec.toString().padStart(2, '0');
}

function updateVideoUI() {
  const playBtn = document.getElementById('previewVideoPlayBtn');
  const fill = document.getElementById('previewVideoProgressFill');
  const thumb = document.getElementById('previewVideoProgressThumb');
  const time = document.getElementById('previewVideoTime');
  if (playBtn) playBtn.innerHTML = videoPlaying ? '<i class="ri-pause-fill"></i>' : '<i class="ri-play-fill"></i>';
  const pct = videoDuration > 0 ? (videoProgress / videoDuration) * 100 : 0;
  if (fill) fill.style.width = pct + '%';
  if (thumb) thumb.style.left = pct + '%';
  if (time) time.textContent = formatVideoTime(videoProgress) + ' / ' + formatVideoTime(videoDuration);
}

// ---- PDF Preview Controls ----
let pdfCurrentPage = 1;
let pdfTotalPages = 1;
let pdfZoomLevel = 100;

function initPdfPreview(totalPages) {
  pdfCurrentPage = 1;
  pdfTotalPages = totalPages;
  pdfZoomLevel = 100;
  updatePdfUI();
}

function pdfNavPrev() {
  if (pdfCurrentPage > 1) { pdfCurrentPage--; updatePdfUI(); }
}

function pdfNavNext() {
  if (pdfCurrentPage < pdfTotalPages) { pdfCurrentPage++; updatePdfUI(); }
}

function pdfZoom(dir) {
  pdfZoomLevel = Math.max(50, Math.min(300, pdfZoomLevel + dir * 25));
  applyPdfZoom();
}

function pdfFitWidth() { pdfZoomLevel = 100; applyPdfZoom(); }
function pdfFitPage() { pdfZoomLevel = 100; applyPdfZoom(); }

function applyPdfZoom() {
  const content = document.getElementById('previewPdfPageContent');
  const zoomLabel = document.getElementById('previewPdfZoom');
  if (content) content.style.transform = `scale(${pdfZoomLevel / 100})`;
  if (zoomLabel) zoomLabel.textContent = pdfZoomLevel + '%';
}

function updatePdfUI() {
  const pageLabel = document.getElementById('previewPdfPage');
  if (pageLabel) pageLabel.textContent = pdfCurrentPage + ' / ' + pdfTotalPages;
  const content = document.getElementById('previewPdfPageContent');
  if (content) {
    const sheets = content.querySelectorAll('.preview-pdf-sheet');
    sheets.forEach((s, i) => s.style.display = i === pdfCurrentPage - 1 ? 'flex' : 'none');
  }
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
function chromeGreeting() {
  const h = new Date().getHours();
  const el = document.getElementById('chromeGreeting');
  if (!el) return;
  if (h < 12) el.textContent = 'Good morning';
  else if (h < 17) el.textContent = 'Good afternoon';
  else el.textContent = 'Good evening';
}

const appIdMap = {
  'Calculator.app': 'calculator-window',
  'TextEdit.app': 'textedit-window',
  'Terminal.app': 'terminal-window',
  'Activity Monitor.app': 'activity-window',
  'System Settings.app': 'settings-window',
  'Preview.app': 'preview-window',
  'Safari.app': 'safari-window',
  'Google Chrome.app': 'chrome-window',
  'YouTube.app': 'youtube-window',
  'Notes.app': 'notes-window',
  'Music.app': 'music-window',
  'Disk Utility.app': 'diskutil-window',
  'Clock.app': 'clock-window',
  'Reminders.app': 'reminders-window',
  'Console.app': 'logs-window',
  'Downloads.app': 'downloads-window',
  'Time Machine.app': 'backup-window',
  'Screen Recording.app': 'screenrecording-window',
  'Weather.app': 'weather-window',
  'App Store.app': 'appstore-window',
  'Dictionary.app': 'dictionary-window',
  'Voice Memos.app': 'voicememos-window',
  'Stickies.app': 'stickies-window',
  'System Report.app': 'sysreport-window',
  'Network Utility.app': 'netutil-window',
  'Font Book.app': 'fontbook-window'
};

function openApp(appName) {
  const winId = appIdMap[appName];
  if (!winId) return;
  const win = document.getElementById(winId);
  if (!win) return;

  const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
  if (dockItem) { dockItem.classList.add('bouncing'); setTimeout(() => dockItem.classList.remove('bouncing'), 700); }

  win.classList.remove('minimized');
  win.style.display = '';
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
  if (winId === 'logs-window') { initLogsViewer(); setupLogsEvents(); }
  if (winId === 'downloads-window') initDownloadManager();
  if (winId === 'chrome-window') chromeGreeting();
  if (winId === 'backup-window') initBackupApp();
  if (winId === 'weather-window') initWeatherApp();
  if (winId === 'appstore-window') initAppStore();
  if (winId === 'dictionary-window') initDictionary();
  if (winId === 'voicememos-window') initVoiceMemos();
  if (winId === 'stickies-window') initStickies();
  if (winId === 'sysreport-window') initSysReport();
  if (winId === 'netutil-window') initNetUtil();
  if (winId === 'fontbook-window') initFontBook();
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  // Check for unsaved TextEdit changes
  if (winId === 'textedit-window' && teModified) {
    showUnsavedDialog(() => {
      teModified = false;
      doCloseWindow(winId);
    });
    return;
  }
  doCloseWindow(winId);
}

function doCloseWindow(winId) {
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
  // Update menu bar app name
  const appNameMap = {
    'finder-window': 'Finder', 'calculator-window': 'Calculator', 'textedit-window': 'TextEdit',
    'terminal-window': 'Terminal', 'activity-window': 'Activity Monitor', 'settings-window': 'System Settings',
    'preview-window': 'Preview', 'safari-window': 'Safari'
  };
  const menuName = document.getElementById('menuAppName');
  if (menuName && appNameMap[winId]) {
    menuName.innerHTML = `<strong>${appNameMap[winId]}</strong>`;
  }
}

function getOpenWindows() {
  return Array.from(document.querySelectorAll('.mac-window')).filter(w => !w.classList.contains('minimized'));
}
function cascadeWindows() {
  const wins = getOpenWindows();
  wins.forEach((w, i) => {
    w.style.width = '640px';
    w.style.height = '420px';
    w.style.top = (80 + i * 30) + 'px';
    w.style.left = (100 + i * 30) + 'px';
    zCounter++; w.style.zIndex = zCounter;
  });
}
function tileWindow(side) {
  const focused = document.querySelector('.mac-window.focused');
  if (!focused) return;
  const wins = getOpenWindows();
  const otherWins = wins.filter(w => w !== focused);
  focused.style.width = '50vw';
  focused.style.height = 'calc(100vh - 80px)';
  focused.style.top = '52px';
  focused.style.left = side === 'left' ? '0' : '50vw';
  zCounter++; focused.style.zIndex = zCounter;
  if (otherWins.length > 0) {
    const other = otherWins[0];
    other.style.width = '50vw';
    other.style.height = 'calc(100vh - 80px)';
    other.style.top = '52px';
    other.style.left = side === 'left' ? '50vw' : '0';
    zCounter++; other.style.zIndex = zCounter;
  }
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
let calcSciMode = false;

function toggleCalcMode() {
  calcSciMode = !calcSciMode;
  const win = document.getElementById('calculator-window');
  const panel = document.getElementById('calcSciPanel');
  const toggle = document.getElementById('calcModeToggle');
  if (calcSciMode) {
    win.style.width = '340px';
    panel.style.display = '';
    toggle.style.color = '#007AFF';
  } else {
    win.style.width = '250px';
    panel.style.display = 'none';
    toggle.style.color = '';
  }
}

function calcInput(val) {
  const s = calcState;
  const sciFns = { 'sin': Math.sin, 'cos': Math.cos, 'tan': Math.tan, 'log': Math.log10, 'ln': Math.log, 'sqrt': Math.sqrt };
  if (sciFns[val]) {
    const n = parseFloat(s.current);
    s.current = String(sciFns[val](n));
    s.display = s.current;
    document.getElementById('calcDisplay').textContent = s.display;
    return;
  }
  if (val === 'x²') { s.current = String(Math.pow(parseFloat(s.current), 2)); s.display = s.current; document.getElementById('calcDisplay').textContent = s.display; return; }
  if (val === 'x³') { s.current = String(Math.pow(parseFloat(s.current), 3)); s.display = s.current; document.getElementById('calcDisplay').textContent = s.display; return; }
  if (val === 'xⁿ') { s.operator = 'pow'; s.previous = parseFloat(s.current); s.waitingForOperand = true; return; }
  if (val === 'π') { s.current = String(Math.PI); s.display = s.current; document.getElementById('calcDisplay').textContent = s.display; return; }
  if (val === 'e') { s.current = String(Math.E); s.display = s.current; document.getElementById('calcDisplay').textContent = s.display; return; }
  if (val === '!') {
    let n = parseInt(s.current), r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    s.current = String(r); s.display = s.current; document.getElementById('calcDisplay').textContent = s.display; return;
  }
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
    case 'pow': result = Math.pow(s.previous, curr); break;
  }
  s.current = String(result); s.display = s.current; s.previous = result; s.waitingForOperand = true;
}

// ---- Terminal ----
let termCwd = '/Users/shyamraj';
let termHistory = [];
let termHistoryIndex = -1;

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

  if (cmd.trim()) {
    termHistory.push(cmd.trim());
    termHistoryIndex = termHistory.length;
  }

  const parts = cmd.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  switch (command) {
    case '': break;
    case 'help':
      appendTermOutput('Available commands:', 'success');
      ['ls          List directory contents', 'cd          Change directory', 'pwd         Print working directory', 'echo        Print text', 'clear       Clear terminal', 'cat         Display file contents', 'date        Show current date', 'whoami      Show current user', 'uname       Show system info', 'hostname    Show hostname', 'uptime      Show uptime', 'calc        Calculator (e.g. calc 2+2)', 'neofetch    System info', 'mkdir       Create a directory', 'touch       Create an empty file', 'rm          Remove files/directories', 'cp          Copy files', 'mv          Move/rename files', 'head        Show first lines of a file', 'tail        Show last lines of a file', 'wc          Word, line, char count', 'grep        Search file contents', 'find        Find files by name', 'sort        Sort lines of text', 'history     Show command history', 'man         Show command manual', 'curl        Simulate HTTP request',        'ping        Ping a host',
       'fortune     Random quote',
       'cal         Calendar',
       'cowsay      Cow says',
       'figlet      ASCII art',
       'shuf        Shuffle',
       'rev         Reverse lines',
       'yes         Repeat string',
       'seq         Number sequence',
       'df          Disk free',
       'ps          Processes',
       'who         Logged in',
       'banner      Big text',
       'base64      Encode/decode',
       'factor      Prime factors',
       'env         Environment'].forEach(l => appendTermOutput('  ' + l));
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
    case 'mkdir': {
      if (!args[0]) { appendTermOutput('mkdir: missing operand', 'err'); break; }
      const target = resolvePath(args[0]);
      if (getNode(target)) { appendTermOutput(`mkdir: ${args[0]}: File exists`, 'err'); break; }
      const parentPath = target.split('/').filter(Boolean).slice(0, -1).join('/');
      const parent = getNode('/' + parentPath);
      if (!parent || parent.type !== 'folder') { appendTermOutput(`mkdir: ${args[0]}: No such file or directory`, 'err'); break; }
      const name = target.split('/').filter(Boolean).pop();
      parent.children.push(name);
      fileSystem[target] = { type: 'folder', children: [] };
      appendTermOutput('', 'success');
      break;
    }
    case 'touch': {
      if (!args[0]) { appendTermOutput('touch: missing operand', 'err'); break; }
      const target = resolvePath(args[0]);
      const parentPath = target.split('/').filter(Boolean).slice(0, -1).join('/');
      const parent = getNode('/' + parentPath);
      if (!parent || parent.type !== 'folder') { appendTermOutput(`touch: ${args[0]}: No such file or directory`, 'err'); break; }
      const name = target.split('/').filter(Boolean).pop();
      parent.children.push({ name, type: 'file', icon: 'doc', size: '0 KB', kind: 'Plain Text', date: 'Just now' });
      fileSystem[target] = { type: 'file' };
      appendTermOutput('', 'success');
      break;
    }
    case 'rm': {
      if (!args[0]) { appendTermOutput('rm: missing operand', 'err'); break; }
      const target = resolvePath(args[0]);
      const parts = target.split('/').filter(Boolean);
      const name = parts.pop();
      const parentPath = '/' + parts.join('/');
      const parent = getNode(parentPath);
      if (!parent) { appendTermOutput(`rm: ${args[0]}: No such file or directory`, 'err'); break; }
      const before = parent.children.length;
      parent.children = parent.children.filter(c => (typeof c === 'string' ? c : c.name) !== name);
      if (parent.children.length === before) { appendTermOutput(`rm: ${args[0]}: No such file or directory`, 'err'); break; }
      delete fileSystem[target];
      appendTermOutput('', 'success');
      break;
    }
    case 'cp': {
      if (args.length < 2) { appendTermOutput('cp: missing file operand', 'err'); break; }
      const src = resolvePath(args[0]);
      const srcNode = getNode(src);
      if (!srcNode) { appendTermOutput(`cp: ${args[0]}: No such file or directory`, 'err'); break; }
      const dstBase = args[1].replace(/\/$/, '');
      const dst = resolvePath(dstBase);
      const dstParts = dst.split('/').filter(Boolean);
      const dstName = dstParts.pop();
      const dstParentPath = '/' + dstParts.join('/');
      const dstParent = getNode(dstParentPath);
      if (!dstParent) { appendTermOutput(`cp: ${args[1]}: No such file or directory`, 'err'); break; }
      dstParent.children.push({ name: dstName, type: srcNode.type, icon: 'doc', size: '--', kind: srcNode.type === 'folder' ? 'Folder' : 'File', date: 'Just now' });
      fileSystem[dst] = { ...srcNode };
      appendTermOutput('', 'success');
      break;
    }
    case 'mv': {
      if (args.length < 2) { appendTermOutput('mv: missing file operand', 'err'); break; }
      const src = resolvePath(args[0]);
      const srcNode = getNode(src);
      if (!srcNode) { appendTermOutput(`mv: ${args[0]}: No such file or directory`, 'err'); break; }
      const dstBase = args[1].replace(/\/$/, '');
      const dst = resolvePath(dstBase);
      const srcParts = src.split('/').filter(Boolean);
      const srcName = srcParts.pop();
      const srcParentPath = '/' + srcParts.join('/');
      const srcParent = getNode(srcParentPath);
      if (srcParent) srcParent.children = srcParent.children.filter(c => (typeof c === 'string' ? c : c.name) !== srcName);
      const dstParts = dst.split('/').filter(Boolean);
      const dstName = dstParts.pop();
      const dstParentPath = '/' + dstParts.join('/');
      const dstParent = getNode(dstParentPath);
      if (dstParent) dstParent.children.push({ name: dstName, type: srcNode.type, icon: 'doc', size: '--', kind: srcNode.type === 'folder' ? 'Folder' : 'File', date: 'Just now' });
      delete fileSystem[src];
      fileSystem[dst] = srcNode;
      appendTermOutput('', 'success');
      break;
    }
    case 'head': {
      if (!args[0]) { appendTermOutput('head: missing operand', 'err'); break; }
      const target = resolvePath(args[0]); const hNode = getNode(target);
      if (!hNode || hNode.type !== 'file') { appendTermOutput(`head: ${args[0]}: No such file or directory`, 'err'); break; }
      const hContent = getFileContent(target); const hLines = hContent.split('\n'); const hN = args[1] ? parseInt(args[1]) : 10;
      appendTermOutput(hLines.slice(0, hN).join('\n')); break;
    }
    case 'tail': {
      if (!args[0]) { appendTermOutput('tail: missing operand', 'err'); break; }
      const target = resolvePath(args[0]); const tNode = getNode(target);
      if (!tNode || tNode.type !== 'file') { appendTermOutput(`tail: ${args[0]}: No such file or directory`, 'err'); break; }
      const tContent = getFileContent(target); const tLines = tContent.split('\n'); const tN = args[1] ? parseInt(args[1]) : 10;
      appendTermOutput(tLines.slice(-tN).join('\n')); break;
    }
    case 'wc': {
      if (!args[0]) { appendTermOutput('wc: missing operand', 'err'); break; }
      const target = resolvePath(args[0]); const wNode = getNode(target);
      if (!wNode || wNode.type !== 'file') { appendTermOutput(`wc: ${args[0]}: No such file or directory`, 'err'); break; }
      const wContent = getFileContent(target); const wLC = wContent.split('\n').length; const wWC = wContent.split(/\s+/).filter(Boolean).length; const wCC = wContent.length;
      appendTermOutput(`  ${wLC}  ${wWC}  ${wCC}  ${args[0]}`); break;
    }
    case 'grep': {
      if (args.length < 2) { appendTermOutput('grep: missing pattern or file', 'err'); break; }
      const pattern = args[0]; const target = resolvePath(args[1]); const gNode = getNode(target);
      if (!gNode || gNode.type !== 'file') { appendTermOutput(`grep: ${args[1]}: No such file or directory`, 'err'); break; }
      const gContent = getFileContent(target); const gLines = gContent.split('\n'); const matches = gLines.filter(l => l.toLowerCase().includes(pattern.toLowerCase()));
      if (matches.length) { matches.forEach(l => appendTermOutput(l, 'success')); } else { appendTermOutput('No matches found', 'info'); }
      break;
    }
    case 'find': {
      if (!args[0]) { appendTermOutput('find: missing pattern', 'err'); break; }
      const q = args[0].toLowerCase(); const results = [];
      (function searchAll(path) {
        const n = getNode(path);
        if (n && n.type === 'folder' && n.children) n.children.forEach(c => {
          const name = typeof c === 'string' ? c : c.name;
          const full = (path === '/' ? '/' : path + '/') + name;
          if (name.toLowerCase().includes(q)) results.push(full);
          if ((typeof c === 'string' && getNode(full) && getNode(full).type === 'folder') || (typeof c !== 'string' && c.type === 'folder')) searchAll(full);
        });
      })(termCwd);
      if (results.length) { results.forEach(r => appendTermOutput(r)); } else { appendTermOutput('No matches found', 'info'); }
      break;
    }
    case 'sort': {
      if (!args[0]) { appendTermOutput('sort: missing operand', 'err'); break; }
      const target = resolvePath(args[0]); const sNode = getNode(target);
      if (!sNode || sNode.type !== 'file') { appendTermOutput(`sort: ${args[0]}: No such file or directory`, 'err'); break; }
      const sContent = getFileContent(target); sContent.split('\n').sort().forEach(l => appendTermOutput(l)); break;
    }
    case 'history': {
      if (termHistory.length) { termHistory.forEach((c, i) => appendTermOutput(`  ${i + 1}  ${c}`)); } else { appendTermOutput('  No commands in history', 'info'); }
      break;
    }
    case 'man': {
      if (!args[0]) { appendTermOutput('What manual page do you want?', 'err'); break; }
      const manPages = {
        ls: 'ls -- list directory contents\n\nls [path]\n    Lists the contents of a directory.',
        cd: 'cd -- change directory\n\ncd [path]\n    Changes the current working directory.',
        mkdir: 'mkdir -- make directory\n\nmkdir <name>\n    Creates a new directory.',
        touch: 'touch -- create file\n\ntouch <name>\n    Creates an empty file.',
        rm: 'rm -- remove files\n\nrm <path>\n    Removes a file or empty directory.',
        cp: 'cp -- copy files\n\ncp <src> <dst>\n    Copies a file.',
        mv: 'mv -- move/rename\n\nmv <src> <dst>\n    Moves or renames a file.',
        head: 'head -- first lines\n\nhead <file> [n]\n    Shows first n lines (default 10).',
        tail: 'tail -- last lines\n\ntail <file> [n]\n    Shows last n lines (default 10).',
        wc: 'wc -- word count\n\nwc <file>\n    Counts lines, words, characters.',
        grep: 'grep -- search\n\ngrep <pattern> <file>\n    Searches file for pattern.',
        find: 'find -- find files\n\nfind <name>\n    Finds files by name recursively.',
        sort: 'sort -- sort lines\n\nsort <file>\n    Sorts lines alphabetically.',
        ping: 'ping -- ping host\n\nping <host>\n    Pings a host 4 times.',
        curl: 'curl -- fetch URL\n\ncurl <url>\n    Simulates fetching a URL.',
        history: 'history -- show history\n\nhistory\n    Shows command history.'
      };
      const page = manPages[args[0].toLowerCase()];
      if (page) appendTermOutput(page); else appendTermOutput(`No manual entry for ${args[0]}`, 'err');
      break;
    }
    case 'curl': {
      if (!args[0]) { appendTermOutput('curl: try \'curl --help\' or \'curl --manual\' for more information', 'err'); break; }
      const curlUrl = args[0];
      appendTermOutput('  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current', 'info');
      appendTermOutput('                                 Dload  Upload   Total   Spent    Left  Speed', 'info');
      let curlP = 0;
      const curlInt = setInterval(() => {
        curlP += Math.random() * 25 + 5;
        if (curlP >= 100) {
          clearInterval(curlInt);
          appendTermOutput(`100  ${(Math.random() * 50 + 5).toFixed(1)}k    0     0  ${(Math.random() * 2 + 1).toFixed(1)}M      0 --:--:-- --:--:-- --:--:--  ${(Math.random() * 5 + 2).toFixed(1)}M`, 'info');
          appendTermOutput(`[200 OK] Fetched ${curlUrl} (${(Math.random() * 100 + 10).toFixed(1)} KB body)`, 'success');
        } else {
          appendTermOutput(` ${Math.round(curlP)}  ${(curlP * (Math.random() * 0.5 + 0.5)).toFixed(1)}k    0     0  ${(Math.random() * 2 + 1).toFixed(1)}M      0 --:--:-- --:--:-- --:--:--  ${(Math.random() * 5 + 2).toFixed(1)}M`, 'info');
        }
      }, 200);
      break;
    }
    case 'ping': {
      if (!args[0]) { appendTermOutput('ping: missing host operand', 'err'); break; }
      const pingHost = args[0];
      appendTermOutput(`PING ${pingHost} (${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}): 56 data bytes`, 'info');
      let pingSeq = 1;
      const pingInt = setInterval(() => {
        if (pingSeq > 4) {
          clearInterval(pingInt);
          appendTermOutput('', 'info');
          appendTermOutput(`--- ${pingHost} ping statistics ---`, 'info');
          appendTermOutput('4 packets transmitted, 4 packets received, 0% packet loss', 'success');
          appendTermOutput(`round-trip min/avg/max/stddev = ${(Math.random() * 5 + 10).toFixed(2)}/${(Math.random() * 10 + 15).toFixed(2)}/${(Math.random() * 20 + 30).toFixed(2)}/${(Math.random() * 3 + 1).toFixed(2)} ms`, 'info');
          return;
        }
        appendTermOutput(`64 bytes from ${pingHost}: icmp_seq=${pingSeq} ttl=${Math.floor(Math.random() * 30 + 50)} time=${(Math.random() * 40 + 10).toFixed(3)} ms`, 'success');
        pingSeq++;
      }, 800);
      break;
    }
    case 'fortune': {
      const quotes = [
        'The best way to predict the future is to invent it.',
        'Talk is cheap. Show me the code.',
        'Simplicity is prerequisite for reliability.',
        'Any fool can write code that a computer can understand.',
        'First, solve the problem. Then, write the code.',
        'Make it work, make it right, make it fast.',
        'Debugging is twice as hard as writing the code.',
        'Computers are good at following instructions, not at reading your mind.'
      ];
      appendTermOutput(quotes[Math.floor(Math.random() * quotes.length)], 'success'); break;
    }
    case 'cal': {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      let cal = `     ${months[month]} ${year}\n  Su Mo Tu We Th Fr Sa\n`;
      for (let i = 0; i < firstDay; i++) cal += '   ';
      for (let d = 1; d <= daysInMonth; d++) {
        cal += (d < 10 ? '  ' : ' ') + d;
        if ((firstDay + d) % 7 === 0) cal += '\n';
      }
      appendTermOutput(cal); break;
    }
    case 'cowsay': {
      const msg = args.length ? args.join(' ') : 'Moo!';
      const border = '-'.repeat(msg.length + 2);
      const cow = ` ${border}\n< ${msg} >\n ${border}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
      appendTermOutput(cow); break;
    }
    case 'figlet': {
      const text = args.join(' ').toUpperCase() || 'FIGLET';
      const lines = ['','','','',''];
      for (const ch of text) {
        const font = {
          'A': ['  AAA  ',' AAAAA ','AA   AA','AAAAAAA','AA   AA'],
          'B': ['BBBBBB ','BB   BB','BBBBBBB','BB   BB','BBBBBB '],
          'C': [' CCCCC ','CC   CC','CC     ','CC   CC',' CCCCC '],
          'D': ['DDDDDD ','DD   DD','DD   DD','DD   DD','DDDDDD '],
          'E': ['EEEEEEE','EE     ','EEEEE  ','EE     ','EEEEEEE'],
          'F': ['FFFFFFF','FF     ','FFFFF  ','FF     ','FF     '],
          'G': [' GGGGG ','GG   GG','GG     ','GG  GGG',' GGGGG '],
          'H': ['HH   HH','HH   HH','HHHHHHH','HH   HH','HH   HH'],
          'I': ['IIIIIII','  III  ','  III  ','  III  ','IIIIIII'],
          'J': ['JJJJJJJ','   JJ  ','   JJ  ','JJ JJ  ',' JJJJ  '],
          'K': ['KK   KK','KK  KK ','KKKK   ','KK  KK ','KK   KK'],
          'L': ['LL     ','LL     ','LL     ','LL     ','LLLLLLL'],
          'M': ['MM   MM','MMM MMM','MM M MM','MM   MM','MM   MM'],
          'N': ['NN   NN','NNN  NN','NN N NN','NN  NNN','NN   NN'],
          'O': [' OOOOO ','OO   OO','OO   OO','OO   OO',' OOOOO '],
          'P': ['PPPPPP ','PP   PP','PPPPPP ','PP     ','PP     '],
          'Q': [' QQQQQ ','QQ   QQ','QQ   QQ','QQ  QQQ',' QQQQQ '],
          'R': ['RRRRRR ','RR   RR','RRRRRR ','RR  RR ','RR   RR'],
          'S': [' SSSSS ','SS     ',' SSSSS ','     SS',' SSSSS '],
          'T': ['TTTTTTT','  TTT  ','  TTT  ','  TTT  ','  TTT  '],
          'U': ['UU   UU','UU   UU','UU   UU','UU   UU',' UUUUU '],
          'V': ['VV   VV','VV   VV','VV   VV',' VV VV ','  VVV  '],
          'W': ['WW   WW','WW   WW','WW W WW','WWWWWWW','WW   WW'],
          'X': ['XX   XX',' XX XX ','  XXX  ',' XX XX ','XX   XX'],
          'Y': ['YY   YY',' YY YY ','  YYY  ','  YYY  ','  YYY  '],
          'Z': ['ZZZZZZZ','   ZZZ ','  ZZZ  ',' ZZZ   ','ZZZZZZZ'],
          ' ': ['      ','      ','      ','      ','      ']
        };
        const f = font[ch] || font[' '];
        for (let i = 0; i < 5; i++) lines[i] += f[i] + '  ';
      }
      appendTermOutput('\n' + lines.join('\n')); break;
    }
    case 'shuf': {
      if (!args[0]) { appendTermOutput('shuf: missing operand', 'err'); break; }
      const sTarget = resolvePath(args[0]); const sNode = getNode(sTarget);
      if (!sNode || sNode.type !== 'file') { appendTermOutput(`shuf: ${args[0]}: No such file or directory`, 'err'); break; }
      const sLines = getFileContent(sTarget).split('\n');
      for (let i = sLines.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [sLines[i], sLines[j]] = [sLines[j], sLines[i]]; }
      sLines.forEach(l => appendTermOutput(l)); break;
    }
    case 'rev': {
      if (!args[0]) { appendTermOutput('rev: missing operand', 'err'); break; }
      const rTarget = resolvePath(args[0]); const rNode = getNode(rTarget);
      if (!rNode || rNode.type !== 'file') { appendTermOutput(`rev: ${args[0]}: No such file or directory`, 'err'); break; }
      getFileContent(rTarget).split('\n').forEach(l => appendTermOutput(l.split('').reverse().join(''))); break;
    }
    case 'yes': {
      const msg = args.join(' ') || 'y';
      appendTermOutput(Array(5).fill(msg).join('\n')); break;
    }
    case 'seq': {
      const last = parseInt(args[args.length - 1]);
      const first = args.length > 1 ? parseInt(args[0]) : 1;
      if (isNaN(last)) { appendTermOutput('seq: invalid number', 'err'); break; }
      const result = [];
      for (let i = first; i <= last; i++) result.push(i);
      appendTermOutput(result.join('\n')); break;
    }
    case 'df': {
      appendTermOutput('Filesystem      Size   Used  Avail Capacity  Mounted on', 'info');
      appendTermOutput('/dev/disk1s1    233G   120G   113G    51%    /', 'success');
      appendTermOutput('devtmpfs        8.0G   4.0K   8.0G     1%    /dev', 'success');
      break;
    }
    case 'ps': {
      appendTermOutput('  PID TTY           TIME CMD', 'info');
      appendTermOutput('    1 ??         1:23.00 launchd', 'success');
      appendTermOutput('  123 ??         0:05.42 WindowServer', 'success');
      appendTermOutput('  456 ??         0:12.78 Finder', 'success');
      appendTermOutput('  789 ??         0:03.91 Terminal', 'success');
      break;
    }
    case 'who': {
      appendTermOutput('shyamraj    console      Jul 30 10:42', 'success');
      appendTermOutput('shyamraj    ttys000     Jul 30 11:05', 'success');
      break;
    }
    case 'banner': {
      const txt = args.join(' ').toUpperCase() || 'HELLO';
      const bannerChars = {
        'A': [' AA ','A  A','AAAA','A  A','A  A'],
        'B': ['BBB ','B  B','BBB ','B  B','BBB '],
        'C': [' CC ','C  C','C   ','C  C',' CC '],
        'D': ['DDD ','D  D','D  D','D  D','DDD '],
        'E': ['EEEE','E   ','EEE ','E   ','EEEE'],
        'F': ['FFFF','F   ','FFF ','F   ','F   '],
        'G': [' GG ','G   ','G GG','G  G',' GG '],
        'H': ['H  H','H  H','HHHH','H  H','H  H'],
        'I': ['III',' I ',' I ',' I ','III'],
        'J': ['  JJ','  J','  J','J J',' JJ '],
        'K': ['K  K','K K ','KK  ','K K ','K  K'],
        'L': ['L   ','L   ','L   ','L   ','LLLL'],
        'M': ['M   M','MM MM','M M M','M   M','M   M'],
        'N': ['N   N','NN  N','N N N','N  NN','N   N'],
        'O': [' OO ','O  O','O  O','O  O',' OO '],
        'P': ['PPP ','P  P','PPP ','P   ','P   '],
        'Q': [' QQQ ','Q  Q','Q  Q','Q QQ',' QQQ'],
        'R': ['RRR ','R  R','RRR ','R R ','R  R'],
        'S': [' SSS','S   ',' SS ','   S','SSS '],
        'T': ['TTTT',' T  ',' T  ',' T  ',' T  '],
        'U': ['U  U','U  U','U  U','U  U',' UU '],
        'V': ['V  V','V  V','V  V',' VV ',' V  '],
        'W': ['W  W','W  W','W WW','WWWW','W  W'],
        'X': ['X  X',' X X','  X ',' X X','X  X'],
        'Y': ['Y  Y',' Y Y','  Y ','  Y ','  Y '],
        'Z': ['ZZZZ','   Z','  Z ',' Z  ','ZZZZ'],
        ' ': ['    ','    ','    ','    ','    ']
      };
      const bannerOut = ['','','','',''];
      for (const ch of txt) {
        const b = bannerChars[ch] || bannerChars[' '];
        for (let i = 0; i < 5; i++) bannerOut[i] += b[i] + ' ';
      }
      appendTermOutput('\n' + bannerOut.join('\n')); break;
    }
    case 'base64': {
      if (args.length < 2) { appendTermOutput('Usage: base64 <encode|decode> <text>', 'err'); break; }
      const mode = args[0].toLowerCase();
      const input = args.slice(1).join(' ');
      if (mode === 'encode') appendTermOutput(btoa(input));
      else if (mode === 'decode') { try { appendTermOutput(atob(input)); } catch (e) { appendTermOutput('base64: invalid input', 'err'); } }
      else appendTermOutput('Usage: base64 <encode|decode> <text>', 'err');
      break;
    }
    case 'factor': {
      const num = parseInt(args[0]);
      if (isNaN(num) || num < 1) { appendTermOutput('factor: invalid number', 'err'); break; }
      let n = num; const factors = [];
      for (let i = 2; i * i <= n; i++) { while (n % i === 0) { factors.push(i); n /= i; } }
      if (n > 1) factors.push(n);
      if (factors.length === 1 && factors[0] === num) appendTermOutput(`${num}: ${num}`, 'info');
      else appendTermOutput(`${num}: ${factors.join(' ')}`); break;
    }
    case 'env': {
      appendTermOutput('TERM_PROGRAM=thread-term', 'success');
      appendTermOutput('SHELL=/bin/zsh', 'success');
      appendTermOutput('USER=shyamraj', 'success');
      appendTermOutput('HOME=/Users/shyamraj', 'success');
      appendTermOutput('PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin', 'success');
      appendTermOutput('PWD=' + termCwd, 'success');
      break;
    }
    default: appendTermOutput(`thread-term: command not found: ${command}`, 'err');
  }
  output.scrollTop = output.scrollHeight;
}

// ---- Accessibility Panel ----
let a11yMagnifierActive = false;
let a11yMagLevel = 1.5;
let a11yMagInterval = null;

function toggleA11yMagnifier(el) {
  el.classList.toggle('on');
  a11yMagnifierActive = el.classList.contains('on');
  const lens = document.getElementById('a11yMagnifierLens');
  if (a11yMagnifierActive) {
    lens.style.display = '';
    // Follow mouse
    document.addEventListener('mousemove', a11yMagnifierMove);
  } else {
    lens.style.display = 'none';
    document.removeEventListener('mousemove', a11yMagnifierMove);
  }
}

function a11yMagnifierMove(e) {
  if (!a11yMagnifierActive) return;
  const lens = document.getElementById('a11yMagnifierLens');
  const content = document.getElementById('a11yMagnifierContent');
  const size = 180;
  lens.style.left = (e.clientX - size / 2) + 'px';
  lens.style.top = (e.clientY - size / 2) + 'px';
  // Simple magnification effect using CSS transform
  content.style.transform = `scale(${a11yMagLevel})`;
  content.style.transformOrigin = `${(e.clientX / window.innerWidth) * 100}% ${(e.clientY / window.innerHeight) * 100}%`;
}

function updateA11yMagLevel(val) {
  a11yMagLevel = parseFloat(val);
  document.getElementById('a11yMagVal').textContent = val + 'x';
}

function applyA11yColorFilter(filter) {
  document.body.classList.remove('a11y-grayscale', 'a11y-inverted', 'a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia', 'a11y-sepia');
  if (filter !== 'none') document.body.classList.add('a11y-' + filter);
}

function updateA11yTextSize(val) {
  const pct = parseInt(val);
  document.documentElement.style.fontSize = pct + '%';
  document.getElementById('a11yTextVal').textContent = pct === 100 ? 'Default' : pct + '%';
}

function updateA11yCursorSize(val) {
  const scale = parseFloat(val);
  document.body.style.cursor = scale > 1 ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${24*scale}" height="${24*scale}" viewBox="0 0 24 24"><path d="M4 4l16 8-8 2-2 8z" fill="white" stroke="black" stroke-width="1.5"/></svg>') 0 0, auto` : '';
  document.getElementById('a11yCursorVal').textContent = scale === 1 ? 'Default' : scale + 'x';
}

function toggleA11yReduceMotion(el) {
  el.classList.toggle('on');
  document.body.classList.toggle('a11y-reduce-motion', el.classList.contains('on'));
}

function toggleA11yReduceTransparency(el) {
  el.classList.toggle('on');
  document.body.classList.toggle('a11y-reduce-transparency', el.classList.contains('on'));
}

function toggleA11yIncreaseContrast(el) {
  el.classList.toggle('on');
  document.body.classList.toggle('a11y-increase-contrast', el.classList.contains('on'));
}

function toggleA11yDiffWithoutColor(el) {
  el.classList.toggle('on');
  // Add visual indicators for differentiating elements without color
  if (el.classList.contains('on')) {
    document.querySelectorAll('.toggle-switch').forEach(t => {
      if (!t.querySelector('.a11y-indicator')) {
        const ind = document.createElement('span');
        ind.className = 'a11y-indicator';
        ind.style.cssText = 'font-size:10px;margin-left:4px;';
        ind.textContent = t.classList.contains('on') ? '✓' : '—';
        t.appendChild(ind);
      }
    });
  } else {
    document.querySelectorAll('.a11y-indicator').forEach(el => el.remove());
  }
}

// ---- Backup & Restore (Time Machine) ----
const backupState = {
  backups: [],
  backingUp: false,
  selectedBackup: null
};

function initBackupApp() {
  document.getElementById('backupStartBtn').addEventListener('click', startBackup);
  document.getElementById('backupRestoreBtn').addEventListener('click', restoreBackup);
  renderBackupApp();
}

function startBackup() {
  if (backupState.backingUp) return;
  backupState.backingUp = true;
  const btn = document.getElementById('backupStartBtn');
  const container = document.getElementById('backupProgressContainer');
  const fill = document.getElementById('backupProgressFill');
  const text = document.getElementById('backupProgressText');
  const status = document.getElementById('backupStatus');
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line"></i> Backing Up...';
  container.style.display = '';
  status.classList.add('backing-up');
  document.getElementById('backupStatusDesc').textContent = 'Backup in progress...';

  let progress = 0;
  const stages = ['Preparing...', 'Scanning files...', 'Copying data...', 'Verifying...', 'Finalizing...'];
  const interval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      text.textContent = 'Backup complete!';
      // Add backup entry
      const now = new Date();
      const size = (Math.random() * 20 + 5).toFixed(1);
      backupState.backups.unshift({
        date: now.toLocaleString(),
        dateShort: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        size: parseFloat(size),
        files: Math.floor(Math.random() * 50000 + 10000),
        status: 'complete'
      });
      setTimeout(() => {
        backupState.backingUp = false;
        btn.disabled = false;
        btn.innerHTML = '<i class="ri-play-line"></i> Back Up Now';
        container.style.display = 'none';
        fill.style.width = '0%';
        status.classList.remove('backing-up');
        document.getElementById('backupStatusDesc').textContent = 'Last backup: ' + backupState.backups[0].date;
        document.getElementById('backupRestoreBtn').disabled = false;
        renderBackupApp();
      }, 800);
      return;
    }
    fill.style.width = progress + '%';
    const stage = stages[Math.min(Math.floor(progress / 25), stages.length - 1)];
    text.textContent = `${stage} ${Math.round(progress)}%`;
  }, 200);
}

function restoreBackup() {
  if (!backupState.selectedBackup && backupState.backups.length > 0) {
    backupState.selectedBackup = 0;
  }
  if (backupState.selectedBackup === null) return;
  const backup = backupState.backups[backupState.selectedBackup];
  if (!backup) return;
  if (!confirm(`Restore from backup dated ${backup.date}?\nThis will simulate restoring ${backup.files.toLocaleString()} files.`)) return;

  const btn = document.getElementById('backupRestoreBtn');
  const container = document.getElementById('backupProgressContainer');
  const fill = document.getElementById('backupProgressFill');
  const text = document.getElementById('backupProgressText');
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line"></i> Restoring...';
  container.style.display = '';
  backup.status = 'restoring';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 5 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      text.textContent = 'Restore complete!';
      backup.status = 'complete';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="ri-history-line"></i> Restore';
        container.style.display = 'none';
        fill.style.width = '0%';
        renderBackupApp();
        alert('Restore completed successfully! System has been restored to the backup state.');
      }, 800);
      return;
    }
    fill.style.width = progress + '%';
    text.textContent = `Restoring... ${Math.round(progress)}%`;
  }, 150);
}

function renderBackupApp() {
  // Info grid
  if (backupState.backups.length > 0) {
    document.getElementById('backupLatest').textContent = backupState.backups[0].date;
    document.getElementById('backupOldest').textContent = backupState.backups[backupState.backups.length - 1].date;
  }
  document.getElementById('backupCount').textContent = backupState.backups.length;
  const totalSize = backupState.backups.reduce((a, b) => a + b.size, 0);
  document.getElementById('backupSize').textContent = totalSize.toFixed(1) + ' GB';

  // Timeline
  const track = document.getElementById('backupTimelineTrack');
  if (backupState.backups.length === 0) {
    track.innerHTML = '<div class="backup-timeline-empty">No backups yet. Click "Back Up Now" to start.</div>';
  } else {
    track.innerHTML = backupState.backups.slice(0, 10).map((b, i) => `
      <div class="backup-timeline-item${backupState.selectedBackup === i ? ' selected' : ''}" data-index="${i}">
        <div class="backup-timeline-dot"></div>
        <div class="backup-timeline-date">${b.dateShort}</div>
      </div>
    `).join('');
    track.querySelectorAll('.backup-timeline-item').forEach(el => {
      el.addEventListener('click', () => {
        backupState.selectedBackup = parseInt(el.dataset.index);
        renderBackupApp();
      });
    });
  }

  // History
  const historyList = document.getElementById('backupHistoryList');
  if (backupState.backups.length === 0) {
    historyList.innerHTML = '<div style="padding:10px;font-size:12px;color:var(--mac-text-muted);text-align:center;">No backup history</div>';
  } else {
    historyList.innerHTML = backupState.backups.map((b, i) => `
      <div class="backup-history-item">
        <div class="backup-history-item-info">
          <div class="backup-history-item-date">${b.date}</div>
          <div class="backup-history-item-size">${b.size.toFixed(1)} GB • ${b.files.toLocaleString()} files</div>
        </div>
        <span class="backup-history-item-status ${b.status === 'restoring' ? 'restoring' : ''}">${b.status === 'restoring' ? 'Restoring' : 'Complete'}</span>
      </div>
    `).join('');
  }
}

// ---- Download Manager ----
const dlState = {
  downloads: [],
  nextId: 1
};

const dlSamples = [
  { name: 'thread-os-update.dmg', size: 245000000, icon: 'ri-install-line' },
  { name: 'design-mockup.sketch', size: 18500000, icon: 'ri-pen-nib-line' },
  { name: 'presentation.key', size: 52000000, icon: 'ri-presentation-line' },
  { name: 'database-backup.sql', size: 89000000, icon: 'ri-database-2-line' },
  { name: 'video-tutorial.mp4', size: 420000000, icon: 'ri-video-line' },
  { name: 'wallpaper-4k.png', size: 8200000, icon: 'ri-image-line' },
  { name: 'font-pack.zip', size: 15000000, icon: 'ri-file-zip-line' },
  { name: 'app-source.zip', size: 34000000, icon: 'ri-code-s-slash-line' },
  { name: 'podcast-episode.mp3', size: 67000000, icon: 'ri-music-2-line' },
  { name: 'ebook-collection.pdf', size: 24000000, icon: 'ri-book-open-line' }
];

function initDownloadManager() {
  document.getElementById('dlAddBtn').addEventListener('click', addDownload);
  document.getElementById('dlClearBtn').addEventListener('click', clearCompleted);
}

function addDownload() {
  const sample = dlSamples[Math.floor(Math.random() * dlSamples.length)];
  const dl = {
    id: dlState.nextId++,
    name: sample.name,
    size: sample.size,
    icon: sample.icon,
    progress: 0,
    speed: 0,
    status: 'downloading', // downloading, paused, complete, error
    startTime: Date.now()
  };
  dlState.downloads.push(dl);
  renderDownloads();
  simulateDownload(dl);
}

function simulateDownload(dl) {
  const baseSpeed = (Math.random() * 5 + 2) * 1000000; // 2-7 MB/s in bytes
  const interval = setInterval(() => {
    if (dl.status === 'paused') return;
    if (dl.status === 'error') { clearInterval(interval); return; }
    dl.speed = baseSpeed * (0.7 + Math.random() * 0.6);
    dl.progress = Math.min(100, dl.progress + (dl.speed / dl.size) * 100 * 0.5);
    if (dl.progress >= 100) {
      dl.progress = 100;
      dl.status = 'complete';
      dl.speed = 0;
      clearInterval(interval);
      // Add to file system
      const node = getNode('/Users/shyamraj/Downloads');
      if (node && node.type === 'folder') {
        const ext = dl.name.split('.').pop();
        const kindMap = { dmg: 'Disk Image', sketch: 'Sketch File', key: 'Keynote', sql: 'SQL Database', mp4: 'MP4 Video', png: 'PNG Image', zip: 'ZIP Archive', mp3: 'MP3 Audio', pdf: 'PDF Document' };
        node.children.push({ name: dl.name, type: 'file', icon: ext, size: formatBytes(dl.size), kind: kindMap[ext] || 'File', date: 'Just now' });
      }
    }
    renderDownloads();
  }, 500);
  dl._interval = interval;
}

function formatBytes(bytes) {
  if (bytes >= 1000000000) return (bytes / 1000000000).toFixed(1) + ' GB';
  if (bytes >= 1000000) return (bytes / 1000000).toFixed(1) + ' MB';
  if (bytes >= 1000) return (bytes / 1000).toFixed(1) + ' KB';
  return bytes + ' B';
}

function formatSpeed(bytesPerSec) {
  if (bytesPerSec >= 1000000) return (bytesPerSec / 1000000).toFixed(1) + ' MB/s';
  if (bytesPerSec >= 1000) return (bytesPerSec / 1000).toFixed(1) + ' KB/s';
  return '0 B/s';
}

function togglePauseDownload(id) {
  const dl = dlState.downloads.find(d => d.id === id);
  if (!dl || dl.status === 'complete') return;
  dl.status = dl.status === 'paused' ? 'downloading' : 'paused';
  renderDownloads();
}

function cancelDownload(id) {
  const idx = dlState.downloads.findIndex(d => d.id === id);
  if (idx === -1) return;
  const dl = dlState.downloads[idx];
  if (dl._interval) clearInterval(dl._interval);
  dlState.downloads.splice(idx, 1);
  renderDownloads();
}

function openDownload(dl) {
  // Navigate Finder to Downloads
  openApp('Finder.app');
  navigateTo('/Users/shyamraj/Downloads');
}

function clearCompleted() {
  dlState.downloads = dlState.downloads.filter(d => d.status !== 'complete');
  renderDownloads();
}

function renderDownloads() {
  const list = document.getElementById('dlList');
  if (!list) return;
  const empty = document.getElementById('dlEmpty');
  if (dlState.downloads.length === 0) {
    list.innerHTML = '';
    list.appendChild(empty || createEmptyState());
    return;
  }
  list.innerHTML = dlState.downloads.map(dl => {
    const downloaded = Math.round(dl.size * dl.progress / 100);
    const remaining = dl.size - downloaded;
    const elapsed = (Date.now() - dl.startTime) / 1000;
    const eta = dl.speed > 0 ? Math.ceil(remaining / dl.speed) : 0;
    const etaStr = eta > 3600 ? Math.floor(eta/3600) + 'h ' + Math.floor((eta%3600)/60) + 'm' : eta > 60 ? Math.floor(eta/60) + 'm ' + (eta%60) + 's' : eta + 's';
    const progressClass = dl.status === 'complete' ? 'complete' : dl.status === 'error' ? 'error' : '';
    const statusText = dl.status === 'complete' ? 'Complete' : dl.status === 'paused' ? 'Paused' : dl.status === 'error' ? 'Error' : `${formatSpeed(dl.speed)} • ${etaStr} remaining`;
    return `<div class="dl-item" data-id="${dl.id}">
      <div class="dl-item-icon"><i class="${dl.icon}"></i></div>
      <div class="dl-item-info">
        <div class="dl-item-name">${dl.name}</div>
        <div class="dl-item-meta">${formatBytes(downloaded)} of ${formatBytes(dl.size)} • ${statusText}</div>
        <div class="dl-item-progress"><div class="dl-item-progress-fill ${progressClass}" style="width:${dl.progress}%"></div></div>
      </div>
      <div class="dl-item-actions">
        ${dl.status === 'complete' ? `<button class="dl-item-btn dl-open-btn" title="Open" data-action="open"><i class="ri-folder-open-line"></i></button>` :
          `<button class="dl-item-btn" title="${dl.status === 'paused' ? 'Resume' : 'Pause'}" data-action="pause"><i class="ri-${dl.status === 'paused' ? 'play' : 'pause'}-line"></i></button>`}
        <button class="dl-item-btn" title="Cancel" data-action="cancel"><i class="ri-close-line"></i></button>
      </div>
    </div>`;
  }).join('');

  // Bind action buttons
  list.querySelectorAll('.dl-item-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.closest('.dl-item').dataset.id);
      const action = btn.dataset.action;
      if (action === 'pause') togglePauseDownload(id);
      else if (action === 'cancel') cancelDownload(id);
      else if (action === 'open') {
        const dl = dlState.downloads.find(d => d.id === id);
        if (dl) openDownload(dl);
      }
    });
  });
}

function createEmptyState() {
  const div = document.createElement('div');
  div.className = 'dl-empty';
  div.id = 'dlEmpty';
  div.innerHTML = '<i class="ri-download-line" style="font-size:36px;color:var(--mac-text-muted);margin-bottom:8px;"></i><div style="font-size:13px;color:var(--mac-text-muted);">No downloads</div><div style="font-size:11px;color:var(--mac-text-muted);margin-top:4px;">Click "New Download" to start</div>';
  return div;
}

// ---- System Logs Viewer ----
const logState = {
  entries: [],
  paused: false,
  filter: 'all',
  search: '',
  interval: null,
  maxEntries: 500
};

const logSources = ['kernel', 'WindowServer', 'launchd', 'Safari', 'Finder', 'mds_stores', 'Spotlight', 'Dock', 'coreaudiod', 'securityd', 'Wi-Fi', 'bluetoothd', 'AirPlay', 'PhotoAnalysis', ' Suggestions'];
const logMessages = {
  error: [
    'Failed to allocate memory at 0x7fff5fbff000',
    'Connection refused: network unreachable',
    'Disk I/O error on /dev/disk1s2',
    'Authentication failed for user session',
    'Crash detected in process WindowServer',
    'Unable to mount volume: Resource busy',
    'Timeout waiting for response from daemon',
    'Permission denied: /System/Library/Extensions'
  ],
  warning: [
    'High memory usage detected: 87%',
    'Battery level critical: 5%',
    'Wi-Fi signal strength low',
    'Disk space running low: 12 GB remaining',
    'Process using excessive CPU: 98%',
    'Certificate expiring in 7 days',
    'Rate limit exceeded for API calls',
    'Cache corrupted, rebuilding索引'
  ],
  info: [
    'System boot completed successfully',
    'Wi-Fi connected to ThreadOS-5G',
    'Display brightness adjusted to 80%',
    'User login: shyamraj',
    'Time Machine backup started',
    'Software update check completed',
    'Indexing completed for /Users/shyamraj',
    'AirPlay connected to Living Room'
  ],
  debug: [
    'GC pause: 12ms',
    'Render frame time: 16.2ms',
    'Network request completed in 234ms',
    'Cache hit ratio: 94.2%',
    'Buffer pool: 256MB allocated',
    'DNS resolution: 3ms',
    'TLS handshake completed',
    'Memory pressure: normal'
  ]
};

function generateLogEntry() {
  const levels = ['error', 'warning', 'info', 'info', 'info', 'info', 'debug', 'debug'];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const messages = logMessages[level];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const source = logSources[Math.floor(Math.random() * logSources.length)];
  const now = new Date();
  const time = now.toTimeString().slice(0, 8) + '.' + String(now.getMilliseconds()).padStart(3, '0');
  return { time, level, source, message: msg };
}

function initLogsViewer() {
  if (logState.interval) return;
  // Generate initial log entries
  for (let i = 0; i < 30; i++) {
    const entry = generateLogEntry();
    entry.time = new Date(Date.now() - (30 - i) * 2000).toTimeString().slice(0, 8) + '.000';
    logState.entries.push(entry);
  }
  renderLogs();
  logState.interval = setInterval(() => {
    if (logState.paused) return;
    logState.entries.push(generateLogEntry());
    if (logState.entries.length > logState.maxEntries) logState.entries.shift();
    renderLogs();
  }, 1500);
}

function stopLogsViewer() {
  if (logState.interval) { clearInterval(logState.interval); logState.interval = null; }
}

function renderLogs() {
  const list = document.getElementById('logsList');
  if (!list) return;
  let filtered = logState.entries;
  if (logState.filter !== 'all') {
    filtered = filtered.filter(e => e.level === logState.filter.slice(0, -1)); // 'errors' -> 'error'
  }
  if (logState.search) {
    const q = logState.search.toLowerCase();
    filtered = filtered.filter(e => e.message.toLowerCase().includes(q) || e.source.toLowerCase().includes(q));
  }
  list.innerHTML = filtered.map(e =>
    `<div class="log-entry log-${e.level}">
      <span class="log-time">${e.time}</span>
      <span class="log-level ${e.level}">${e.level}</span>
      <span class="log-source">${e.source}</span>
      <span class="log-message">${e.message}</span>
    </div>`
  ).join('');
  document.getElementById('logsCount').textContent = logState.entries.length + ' entries';
  document.getElementById('logsFilterInfo').textContent = `Showing ${filtered.length} of ${logState.entries.length}`;
  if (document.getElementById('logsAutoScroll').checked) {
    list.scrollTop = list.scrollHeight;
  }
}

function setupLogsEvents() {
  // Filter buttons
  document.querySelectorAll('.logs-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.logs-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      logState.filter = btn.dataset.filter;
      renderLogs();
    });
  });
  // Search
  const search = document.getElementById('logsSearch');
  if (search) search.addEventListener('input', () => { logState.search = search.value; renderLogs(); });
  // Clear
  document.getElementById('logsClearBtn').addEventListener('click', () => { logState.entries = []; renderLogs(); });
  // Pause
  document.getElementById('logsPauseBtn').addEventListener('click', () => {
    logState.paused = !logState.paused;
    document.getElementById('logsPauseBtn').innerHTML = logState.paused ? '<i class="ri-play-line"></i>' : '<i class="ri-pause-line"></i>';
  });
}

// ---- Activity Monitor (Enhanced) ----
let activityInterval = null;
let cpuHistory = [];
let memHistory = [];
let diskHistory = [];
let netHistory = [];
let activityTab = 'cpu';
let activitySort = { col: 'cpu', dir: 'desc' };
let activitySelectedPid = null;
let activityFilter = '';

const processList = [
  { name: 'WindowServer', pid: 142, baseCpu: 12.3, baseMem: 312, priority: 'high', user: 'root' },
  { name: 'Safari', pid: 584, baseCpu: 8.7, baseMem: 1200, priority: 'normal', user: 'shyamraj' },
  { name: 'kernel_task', pid: 0, baseCpu: 5.1, baseMem: 256, priority: 'high', user: 'root' },
  { name: 'Finder', pid: 312, baseCpu: 2.4, baseMem: 84, priority: 'normal', user: 'shyamraj' },
  { name: 'launchd', pid: 1, baseCpu: 0.8, baseMem: 12, priority: 'high', user: 'root' },
  { name: 'Spotlight', pid: 401, baseCpu: 1.2, baseMem: 148, priority: 'normal', user: 'shyamraj' },
  { name: 'mds_stores', pid: 205, baseCpu: 3.5, baseMem: 220, priority: 'normal', user: 'root' },
  { name: 'SystemUIServer', pid: 278, baseCpu: 1.8, baseMem: 96, priority: 'normal', user: 'shyamraj' },
  { name: 'Dock', pid: 290, baseCpu: 0.9, baseMem: 64, priority: 'normal', user: 'shyamraj' },
  { name: 'WindowManager', pid: 305, baseCpu: 2.1, baseMem: 180, priority: 'normal', user: 'shyamraj' },
  { name: 'AirPlayUIAgent', pid: 415, baseCpu: 0.4, baseMem: 32, priority: 'low', user: 'shyamraj' },
  { name: 'ControlCenter', pid: 295, baseCpu: 1.1, baseMem: 78, priority: 'normal', user: 'shyamraj' },
  { name: 'coreaudiod', pid: 180, baseCpu: 0.6, baseMem: 24, priority: 'normal', user: 'root' },
  { name: 'dasd', pid: 195, baseCpu: 0.3, baseMem: 16, priority: 'low', user: 'root' },
  { name: 'discoveryd', pid: 210, baseCpu: 0.5, baseMem: 40, priority: 'normal', user: 'root' },
  { name: 'hidd', pid: 130, baseCpu: 0.2, baseMem: 8, priority: 'high', user: 'root' },
  { name: 'logd', pid: 220, baseCpu: 0.7, baseMem: 48, priority: 'low', user: 'root' },
  { name: 'nsurlsessiond', pid: 350, baseCpu: 0.4, baseMem: 20, priority: 'low', user: 'shyamraj' },
  { name: 'PhotoAnalysis', pid: 510, baseCpu: 4.2, baseMem: 340, priority: 'low', user: 'shyamraj' },
  { name: 'Suggestions', pid: 420, baseCpu: 1.5, baseMem: 92, priority: 'low', user: 'shyamraj' }
];

let processCpu = {};
let processMem = {};

function initActivityMonitor() {
  if (activityInterval) return;
  cpuHistory = Array(60).fill(0).map(() => Math.random() * 30 + 5);
  memHistory = Array(60).fill(0).map(() => Math.random() * 20 + 40);
  diskHistory = Array(60).fill(0).map(() => Math.random() * 15 + 2);
  netHistory = Array(60).fill(0).map(() => Math.random() * 25 + 5);
  // Init per-process values
  processList.forEach(p => {
    processCpu[p.pid] = p.baseCpu;
    processMem[p.pid] = p.baseMem;
  });
  activityInterval = setInterval(updateActivityMonitor, 1000);
  drawActivityGraphs();
  updateProcessList();
  setupActivityEvents();
}

function stopActivityMonitor() {
  if (activityInterval) { clearInterval(activityInterval); activityInterval = null; }
}

function setupActivityEvents() {
  // Search filter
  const search = document.getElementById('activitySearch');
  if (search && !search._bound) {
    search._bound = true;
    search.addEventListener('input', () => {
      activityFilter = search.value.toLowerCase();
      updateProcessList();
    });
  }
  // Kill button
  const killBtn = document.getElementById('activityKillBtn');
  if (killBtn && !killBtn._bound) {
    killBtn._bound = true;
    killBtn.addEventListener('click', () => {
      if (activitySelectedPid !== null) killProcess(activitySelectedPid);
    });
  }
}

function killProcess(pid) {
  const idx = processList.findIndex(p => p.pid === pid);
  if (idx === -1) return;
  // Animate removal
  const row = document.querySelector(`.proc-row[data-pid="${pid}"]`);
  if (row) row.classList.add('killed');
  setTimeout(() => {
    processList.splice(idx, 1);
    delete processCpu[pid];
    delete processMem[pid];
    activitySelectedPid = null;
    document.getElementById('activityKillBtn').disabled = true;
    updateProcessList();
  }, 300);
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
  // Update per-process values
  processList.forEach(p => {
    processCpu[p.pid] = Math.max(0.1, Math.min(99, processCpu[p.pid] + (Math.random() - 0.5) * 3));
    processMem[p.pid] = Math.max(4, processMem[p.pid] + (Math.random() - 0.5) * 10);
  });
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

  // Filter
  let filtered = processList.filter(p => !activityFilter || p.name.toLowerCase().includes(activityFilter));

  // Sort
  filtered.sort((a, b) => {
    let va, vb;
    if (activitySort.col === 'name') { va = a.name; vb = b.name; return activitySort.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va); }
    if (activitySort.col === 'pid') { va = a.pid; vb = b.pid; }
    else if (activitySort.col === 'cpu') { va = processCpu[a.pid] || 0; vb = processCpu[b.pid] || 0; }
    else if (activitySort.col === 'mem') { va = processMem[a.pid] || 0; vb = processMem[b.pid] || 0; }
    else if (activitySort.col === 'priority') {
      const order = { high: 0, normal: 1, low: 2 };
      va = order[a.priority] || 1; vb = order[b.priority] || 1;
    }
    return activitySort.dir === 'asc' ? va - vb : vb - va;
  });

  // Header
  const sortCol = activitySort.col;
  const sortDir = activitySort.dir;
  let html = `<div class="proc-header">
    <span data-sort="name" class="${sortCol==='name'?'sorted-'+sortDir:''}">Process Name</span>
    <span data-sort="pid" class="${sortCol==='pid'?'sorted-'+sortDir:''}">PID</span>
    <span data-sort="cpu" class="${sortCol==='cpu'?'sorted-'+sortDir:''}">CPU</span>
    <span data-sort="mem" class="${sortCol==='mem'?'sorted-'+sortDir:''}">Memory</span>
    <span data-sort="priority" class="${sortCol==='priority'?'sorted-'+sortDir:''}">Pri</span>
    <span></span>
  </div>`;

  filtered.forEach(p => {
    const cpu = (processCpu[p.pid] || 0).toFixed(1);
    const mem = Math.round(processMem[p.pid] || 0);
    const memStr = mem > 1024 ? (mem / 1024).toFixed(1) + ' G' : mem + ' M';
    const selected = activitySelectedPid === p.pid ? ' selected' : '';
    html += `<div class="proc-row${selected}" data-pid="${p.pid}">
      <span class="proc-name">${p.name}</span>
      <span class="proc-pid">${p.pid}</span>
      <span class="proc-cpu">${cpu}%</span>
      <span class="proc-mem">${memStr}</span>
      <span class="proc-priority ${p.priority}">${p.priority}</span>
      <span><button class="proc-kill-btn" title="Quit"><i class="ri-close-line"></i></button></span>
    </div>`;
  });

  list.innerHTML = html;
  document.getElementById('procCount').textContent = filtered.length;

  // Bind header sort clicks
  list.querySelectorAll('.proc-header span[data-sort]').forEach(span => {
    span.addEventListener('click', () => {
      const col = span.dataset.sort;
      if (activitySort.col === col) {
        activitySort.dir = activitySort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        activitySort.col = col;
        activitySort.dir = col === 'name' ? 'asc' : 'desc';
      }
      updateProcessList();
    });
  });

  // Bind row clicks
  list.querySelectorAll('.proc-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.proc-kill-btn')) {
        killProcess(parseInt(row.dataset.pid));
        return;
      }
      activitySelectedPid = parseInt(row.dataset.pid);
      document.getElementById('activityKillBtn').disabled = false;
      list.querySelectorAll('.proc-row').forEach(r => r.classList.remove('selected'));
      row.classList.add('selected');
    });
  });
}

// ---- System Settings ----
function toggleSetting(el) { el.classList.toggle('on'); }

function switchSettingsPanel(panel) {
  document.querySelectorAll('.settings-nav-item').forEach(el => el.classList.toggle('active', el.dataset.panel === panel));
  document.querySelectorAll('.settings-panel').forEach(el => el.style.display = 'none');
  const target = document.getElementById('settings-' + panel);
  if (target) target.style.display = '';
}

// ---- Software Update ----
const suState = {
  currentVersion: '1.0.0',
  build: '24A123',
  lastChecked: null,
  hasUpdate: false,
  installing: false,
  history: [
    { version: '1.0.0', date: 'May 15, 2026', note: 'Initial release' },
    { version: '0.9.0-beta', date: 'Apr 20, 2026', note: 'Public beta' }
  ],
  availableUpdate: {
    version: '1.0.1',
    build: '24B456',
    desc: 'Performance improvements, security patches, and bug fixes.',
    size: '2.4 GB'
  }
};

function checkForUpdates() {
  const btn = document.getElementById('suCheckBtn');
  const spinner = document.getElementById('suSpinner');
  btn.disabled = true;
  btn.textContent = 'Checking...';
  spinner.style.display = 'block';

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Check for Updates';
    spinner.style.display = 'none';
    suState.lastChecked = new Date().toLocaleString();
    document.getElementById('suLastChecked').textContent = suState.lastChecked;

    // Simulate finding an update
    if (!suState.hasUpdate) {
      suState.hasUpdate = true;
      document.getElementById('suStatus').classList.add('has-update');
      document.querySelector('.su-status-icon').innerHTML = '<i class="ri-information-line"></i>';
      document.querySelector('.su-status-title').textContent = 'An update is available';
      document.querySelector('.su-status-version').textContent = suState.availableUpdate.version + ' (Build ' + suState.availableUpdate.build + ')';
      document.getElementById('suUpdateAvail').textContent = suState.availableUpdate.version;
      document.getElementById('suUpdateAvailable').style.display = '';
      document.getElementById('suUpdateName').textContent = 'Thread OS ' + suState.availableUpdate.version;
      document.getElementById('suUpdateDesc').textContent = suState.availableUpdate.desc;
      document.getElementById('suUpdateSize').textContent = 'Size: ' + suState.availableUpdate.size;
      document.getElementById('generalUpdateStatus').textContent = 'Update available';
    } else {
      document.querySelector('.su-status-title').textContent = 'Thread OS is up to date';
    }

    // Show history
    renderUpdateHistory();
  }, 1800 + Math.random() * 1200);
}

function renderUpdateHistory() {
  const section = document.getElementById('suHistorySection');
  const list = document.getElementById('suHistoryList');
  if (suState.history.length === 0) { section.style.display = 'none'; return; }
  section.style.display = '';
  list.innerHTML = suState.history.map(h =>
    `<div class="su-history-item"><span>${h.version} — ${h.note}</span><span>${h.date}</span></div>`
  ).join('');
}

function installUpdate() {
  if (suState.installing) return;
  suState.installing = true;
  const btn = document.getElementById('suInstallBtn');
  const container = document.getElementById('suProgressContainer');
  const fill = document.getElementById('suProgressFill');
  const text = document.getElementById('suProgressText');
  btn.disabled = true;
  btn.textContent = 'Installing...';
  container.style.display = '';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 6 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      text.textContent = 'Installation complete!';
      btn.textContent = 'Restart Now';
      btn.disabled = false;
      btn.onclick = () => {
        suState.installing = false;
        suState.hasUpdate = false;
        suState.currentVersion = suState.availableUpdate.version;
        suState.build = suState.availableUpdate.build;
        suState.history.unshift({ version: suState.availableUpdate.version, date: new Date().toLocaleDateString(), note: 'Latest release' });

        // Reset UI
        document.getElementById('suStatus').classList.remove('has-update');
        document.querySelector('.su-status-icon').innerHTML = '<i class="ri-check-double-line"></i>';
        document.querySelector('.su-status-title').textContent = 'Thread OS is up to date';
        document.querySelector('.su-status-version').textContent = 'Version ' + suState.currentVersion + ' (Build ' + suState.build + ')';
        document.getElementById('suUpdateAvail').textContent = 'None';
        document.getElementById('suUpdateAvailable').style.display = 'none';
        container.style.display = 'none';
        document.getElementById('generalUpdateStatus').textContent = 'Up to date';
        btn.textContent = 'Install Now';
        btn.onclick = installUpdate;
        renderUpdateHistory();
      };
      return;
    }
    fill.style.width = progress + '%';
    text.textContent = `Downloading... ${Math.round(progress)}%`;
  }, 300);
}

// ---- TextEdit ----
function teNewFile() {
  teCurrentFile = null;
  teModified = false;
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
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
    { name: 'Console', app: 'Console.app', icon: 'ri-terminal-box-line', kind: 'Application' },
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

// ---- Compress / Extract ----
function showCompressOverlay(title, filename) {
  const overlay = document.getElementById('compressOverlay');
  document.getElementById('compressTitle').textContent = title;
  document.getElementById('compressFilename').textContent = filename;
  document.getElementById('compressProgressFill').style.width = '0%';
  document.getElementById('compressStatus').textContent = 'Preparing...';
  overlay.classList.add('visible');
}

function hideCompressOverlay() {
  document.getElementById('compressOverlay').classList.remove('visible');
}

function simulateCompress(target) {
  const isZip = target.name && target.name.endsWith('.zip');
  const baseName = isZip ? target.name.replace('.zip', '') : target.name;

  if (isZip) {
    // Extract
    showCompressOverlay('Extracting...', target.name);
    document.getElementById('compressIcon').innerHTML = '<i class="ri-file-zip-2-line"></i>';
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        document.getElementById('compressProgressFill').style.width = '100%';
        document.getElementById('compressStatus').textContent = 'Extract complete';
        setTimeout(() => {
          hideCompressOverlay();
          // Create extracted folder
          const node = getNode(currentPath);
          if (node && node.type === 'folder') {
            const newPath = currentPath + '/' + baseName;
            if (!fileSystem[newPath]) {
              fileSystem[newPath] = { type: 'folder', children: [] };
              // Add some sample files inside
              const innerFiles = [
                { name: 'README.txt', type: 'file', icon: 'doc', size: '1.2 KB', kind: 'Plain Text', date: 'Just now' },
                { name: 'config.json', type: 'file', icon: 'doc', size: '0.8 KB', kind: 'JSON', date: 'Just now' }
              ];
              fileSystem[newPath].children = innerFiles;
            }
            // Remove the zip file
            node.children = node.children.filter(c => (typeof c === 'string' ? c : c.name) !== target.name);
            // Add the folder
            node.children.push({ name: baseName, type: 'folder', size: '--', kind: 'Folder', date: 'Just now' });
            updateFinder();
          }
        }, 600);
        return;
      }
      document.getElementById('compressProgressFill').style.width = progress + '%';
      document.getElementById('compressStatus').textContent = `Extracting... ${Math.round(progress)}%`;
    }, 200);
  } else {
    // Compress
    showCompressOverlay('Compressing...', target.name);
    document.getElementById('compressIcon').innerHTML = '<i class="ri-file-zip-line"></i>';
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        document.getElementById('compressProgressFill').style.width = '100%';
        document.getElementById('compressStatus').textContent = 'Compression complete';
        setTimeout(() => {
          hideCompressOverlay();
          const node = getNode(currentPath);
          if (node && node.type === 'folder') {
            // Calculate fake compressed size
            const origSize = target.size || '1 MB';
            let compSize = origSize;
            if (origSize.includes('MB')) {
              compSize = (parseFloat(origSize) * 0.3).toFixed(1) + ' MB';
            } else if (origSize.includes('KB')) {
              compSize = (parseFloat(origSize) * 0.4).toFixed(1) + ' KB';
            }
            node.children.push({
              name: baseName + '.zip', type: 'file', icon: 'zip',
              size: compSize, kind: 'ZIP Archive', date: 'Just now'
            });
            updateFinder();
          }
        }, 500);
        return;
      }
      document.getElementById('compressProgressFill').style.width = progress + '%';
      document.getElementById('compressStatus').textContent = `Compressing... ${Math.round(progress)}%`;
    }, 250);
  }
}

function showContextMenu(e, target) {
  e.preventDefault();
  contextTarget = target || null;
  const menu = document.getElementById('contextMenu');
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';

  // Desktop right-click: show desktop-specific menu
  if (!target) {
    menu.innerHTML = `
      <div class="context-menu-item" data-action="useStacks"><i class="ri-stack-line"></i>${stacksEnabled ? 'Disable' : 'Use'} Stacks</div>
      <div class="context-menu-separator"></div>
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
      <div class="context-menu-item" data-action="compress"><i class="ri-file-zip-line"></i>${contextTarget && contextTarget.name && contextTarget.name.endsWith('.zip') ? 'Extract Here' : 'Compress'}</div>
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
    case 'useStacks':
      toggleDesktopStacks();
      break;
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
    case 'compress':
      if (contextTarget) simulateCompress(contextTarget);
      break;
  }
  hideContextMenu();
}

// ---- Empty Trash Dialog ----
function showEmptyTrashDialog() {
  document.getElementById('emptyTrashOverlay').classList.add('visible');
}
function hideEmptyTrashDialog() {
  document.getElementById('emptyTrashOverlay').classList.remove('visible');
}

// ---- Unsaved Changes Dialog ----
let unsavedCallback = null;

function showUnsavedDialog(callback) {
  unsavedCallback = callback;
  document.getElementById('unsavedOverlay').classList.add('visible');
}
function hideUnsavedDialog() {
  document.getElementById('unsavedOverlay').classList.remove('visible');
  unsavedCallback = null;
}

// ---- WiFi Dropdown ----
function toggleWifiDropdown() {
  document.getElementById('wifiDropdown').classList.toggle('open');
}
function closeWifiDropdown() {
  document.getElementById('wifiDropdown').classList.remove('open');
}
function toggleWifiSwitch(el) {
  el.classList.toggle('on');
}

// ---- Screensaver ----
let screensaverActive = false;
let screensaverInterval = null;
let screensaverTimeout = null;
const SCREENSAVER_DELAY = 30000; // 30 seconds

function startScreensaver() {
  if (screensaverActive) return;
  screensaverActive = true;
  const ss = document.getElementById('screensaver');
  ss.classList.add('visible');
  const canvas = document.getElementById('screensaverCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`
    });
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }
  screensaverInterval = setInterval(draw, 50);
}

function stopScreensaver() {
  if (!screensaverActive) return;
  screensaverActive = false;
  const ss = document.getElementById('screensaver');
  ss.classList.remove('visible');
  clearInterval(screensaverInterval);
  resetScreensaverTimer();
}

function resetScreensaverTimer() {
  clearTimeout(screensaverTimeout);
  screensaverTimeout = setTimeout(startScreensaver, SCREENSAVER_DELAY);
}

// ---- App Switcher (Cmd+Tab) ----
let appSwitcherVisible = false;
let appSwitcherIndex = 0;
let appSwitcherApps = [];

function showAppSwitcher() {
  const list = document.getElementById('appSwitcherList');
  const switcher = document.getElementById('appSwitcher');
  appSwitcherApps = [
    { name: 'Finder', winId: 'finder-window', icon: 'ri-folder-line', color: '#47A3FF' },
    { name: 'Safari', winId: 'safari-window', icon: 'ri-safari-line', color: '#006CFF' },
    { name: 'Calculator', winId: 'calculator-window', icon: 'ri-calculator-line', color: '#1C1C1E' },
    { name: 'Terminal', winId: 'terminal-window', icon: 'ri-terminal-box-line', color: '#0D1117' },
    { name: 'TextEdit', winId: 'textedit-window', icon: 'ri-file-text-line', color: '#4A90D9' },
    { name: 'Activity Monitor', winId: 'activity-window', icon: 'ri-pulse-line', color: '#1A1A2E' },
    { name: 'Settings', winId: 'settings-window', icon: 'ri-settings-3-line', color: '#6B6B7B' },
    { name: 'Preview', winId: 'preview-window', icon: 'ri-image-line', color: '#FF9500' }
  ];
  appSwitcherIndex = 0;
  renderAppSwitcher();
  switcher.classList.add('visible');
  appSwitcherVisible = true;
}

function hideAppSwitcher() {
  document.getElementById('appSwitcher').classList.remove('visible');
  appSwitcherVisible = false;
}

function renderAppSwitcher() {
  const list = document.getElementById('appSwitcherList');
  list.innerHTML = appSwitcherApps.map((a, i) => {
    const win = document.getElementById(a.winId);
    const isOpen = win && !win.classList.contains('minimized');
    return `<div class="app-switcher-item${i === appSwitcherIndex ? ' selected' : ''}${isOpen ? ' active' : ''}">
      <div class="app-switcher-icon" style="background:${a.color};"><i class="${a.icon}" style="color:white;"></i></div>
      <span class="app-switcher-name">${a.name}</span>
    </div>`;
  }).join('');
}

function cycleAppSwitcher(dir) {
  appSwitcherIndex = (appSwitcherIndex + dir + appSwitcherApps.length) % appSwitcherApps.length;
  renderAppSwitcher();
}

function selectAppSwitcher() {
  if (appSwitcherIndex >= 0 && appSwitcherIndex < appSwitcherApps.length) {
    const app = appSwitcherApps[appSwitcherIndex];
    const win = document.getElementById(app.winId);
    if (win && !win.classList.contains('minimized')) {
      focusWindow(app.winId);
    } else {
      openApp(app.name + (app.name === 'Finder' ? '' : '.app'));
    }
  }
  hideAppSwitcher();
}

// ---- About This Mac ----
function openAboutMac() {
  document.getElementById('aboutmacOverlay').classList.add('visible');
}
function closeAboutMac() {
  document.getElementById('aboutmacOverlay').classList.remove('visible');
}

// ---- OSD Popup ----
let osdTimeout = null;

function showOSD(type, value) {
  const popup = document.getElementById('osdPopup');
  const icon = document.getElementById('osdIcon');
  const bar = document.getElementById('osdBar');
  const val = document.getElementById('osdValue');
  if (type === 'volume') {
    icon.innerHTML = value === 0 ? '<i class="ri-volume-mute-line"></i>' : value < 50 ? '<i class="ri-volume-down-line"></i>' : '<i class="ri-volume-up-line"></i>';
  } else {
    icon.innerHTML = value === 0 ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
  }
  bar.style.width = value + '%';
  val.textContent = value + '%';
  popup.classList.add('visible');
  clearTimeout(osdTimeout);
  osdTimeout = setTimeout(() => popup.classList.remove('visible'), 1500);
}

// ---- Do Not Disturb ----
let dndEnabled = false;

function toggleDND() {
  dndEnabled = !dndEnabled;
  const icon = document.getElementById('dndTrayBtn');
  const ccBtn = document.getElementById('ccDoNotDisturb');
  if (dndEnabled) {
    icon.style.display = '';
    icon.classList.add('active');
    if (ccBtn) ccBtn.classList.add('active');
  } else {
    icon.style.display = 'none';
    icon.classList.remove('active');
    if (ccBtn) ccBtn.classList.remove('active');
  }
}

// ---- Dock Badge Manager ----
function setDockBadge(appName, count) {
  const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
  if (!dockItem) return;
  let badge = dockItem.querySelector('.dock-badge');
  if (count <= 0) {
    if (badge) badge.remove();
    return;
  }
  if (!badge) {
    badge = document.createElement('div');
    badge.className = 'dock-badge';
    dockItem.appendChild(badge);
  }
  badge.textContent = count;
}

// ---- Keyboard Shortcuts Overlay ----
function toggleShortcuts() {
  document.getElementById('shortcutsOverlay').classList.toggle('visible');
}
function closeShortcuts() {
  document.getElementById('shortcutsOverlay').classList.remove('visible');
}

// ---- Lock Screen ----
let isLocked = false;

function updateLockClock() {
  if (!isLocked) return;
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const h12 = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';
  document.getElementById('lockTime').textContent = `${h12}:${m}`;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  document.getElementById('lockDate').textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
}

// ---- Multi-User Login ----
const users = {
  shyamraj: { name: 'shyamraj', password: '', avatar: 'ri-user-line', color: '#007AFF' },
  guest: { name: 'Guest', password: 'guest', avatar: 'ri-user-smile-line', color: '#28C840' },
  admin: { name: 'Admin', password: 'admin', avatar: 'ri-admin-line', color: '#FF9500' }
};
let currentUser = 'shyamraj';

function selectLockUser(username) {
  currentUser = username;
  document.querySelectorAll('.lock-user-item').forEach(el => {
    el.classList.toggle('active', el.dataset.user === username);
  });
  const hint = document.getElementById('lockHint');
  const pw = users[username].password;
  hint.textContent = pw ? `Hint: password is "${pw}"` : 'Hint: press Enter to unlock (no password)';
  document.getElementById('lockPassword').value = '';
  document.getElementById('lockPassword').focus();
}

function updateLockUsers() {
  // Set up click handlers for user items
  document.querySelectorAll('.lock-user-item').forEach(el => {
    el.addEventListener('click', () => selectLockUser(el.dataset.user));
  });
}

function lockScreen() {
  isLocked = true;
  const ls = document.getElementById('lockScreen');
  ls.classList.add('visible');
  updateLockClock();
  document.getElementById('lockPassword').value = '';
  selectLockUser(currentUser);
  setTimeout(() => document.getElementById('lockPassword').focus(), 100);
}

function unlockScreen() {
  isLocked = false;
  document.getElementById('lockScreen').classList.remove('visible');
  // Update UI for current user
  updateUserUI();
}

function attemptUnlock() {
  const pw = document.getElementById('lockPassword').value;
  const expectedPw = users[currentUser].password;
  if (!expectedPw || pw === expectedPw) {
    unlockScreen();
  } else {
    // Shake animation
    const input = document.getElementById('lockPassword');
    input.style.animation = 'none';
    void input.offsetWidth;
    input.style.animation = 'shake 0.4s ease';
    input.value = '';
    input.focus();
  }
}

function updateUserUI() {
  // Update username in shutdown dialog
  const shutdownName = document.querySelector('.shutdown-username');
  if (shutdownName) shutdownName.textContent = users[currentUser].name;
  // Update lock screen username
  const lockUsername = document.querySelector('.lock-screen .lock-username.active + .lock-username') ||
                      document.querySelector('.lock-user-item.active .lock-username');
  // Update menu bar or any user references
  document.querySelectorAll('.lock-user-item').forEach(el => {
    el.classList.toggle('active', el.dataset.user === currentUser);
  });
}

function switchUser() {
  lockScreen();
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
    { name: 'Console', app: 'Console.app', icon: 'ri-terminal-box-line', status: 'Running' },
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
  const search = document.getElementById('launchpadSearch');
  if (search) { search.value = ''; search.dispatchEvent(new Event('input')); }
}

// ---- Boot Screen ----
function startBootScreen() {
  const bootScreen = document.getElementById('bootScreen');
  const progressBar = document.getElementById('bootProgressBar');
  if (!bootScreen || !progressBar) return;
  let progress = 0;
  function playLoginChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.8);
      });
    } catch (e) { }
  }
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      progressBar.style.width = '100%';
      clearInterval(interval);
      playLoginChime();
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
  // Init multi-user login
  updateLockUsers();
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

  // Sidebar eject buttons
  document.querySelectorAll('.sidebar-eject-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const volume = btn.dataset.volume;
      const item = btn.closest('.sidebar-item');
      if (item) {
        item.style.transition = 'opacity 0.3s';
        item.style.opacity = '0.3';
        item.style.pointerEvents = 'none';
        setTimeout(() => { item.style.opacity = ''; item.style.pointerEvents = ''; }, 2000);
      }
    });
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
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (termHistory.length > 0 && termHistoryIndex > 0) {
        termHistoryIndex--;
        e.target.value = termHistory[termHistoryIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (termHistoryIndex < termHistory.length - 1) {
        termHistoryIndex++;
        e.target.value = termHistory[termHistoryIndex];
      } else {
        termHistoryIndex = termHistory.length;
        e.target.value = '';
      }
    }
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

  // TextEdit change tracking
  document.getElementById('texteditArea').addEventListener('input', () => { teModified = true; });

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

  // ---- Google Chrome ----
  let chromeHistory = [];
  let chromeHistoryIndex = -1;

  chromeGreeting();

  function chromeNavigateTo(url) {
    const fullUrl = url.startsWith('http') ? url : 'https://' + url;
    document.getElementById('chromeUrl').value = fullUrl;
    document.getElementById('chromeHomepage').style.display = 'none';
    document.getElementById('chromeFallback').style.display = 'none';
    const frame = document.getElementById('chromeFrame');
    frame.style.display = 'block';

    document.getElementById('chromeFallbackUrl').textContent = 'Trying to load: ' + fullUrl;

    let loadTimer = setTimeout(() => {
      frame.style.display = 'none';
      document.getElementById('chromeFallback').style.display = 'flex';
    }, 5000);

    frame.onload = () => {
      clearTimeout(loadTimer);
    };
    frame.onerror = () => {
      clearTimeout(loadTimer);
      frame.style.display = 'none';
      document.getElementById('chromeFallback').style.display = 'flex';
    };
    frame.src = fullUrl;

    chromeHistory = chromeHistory.slice(0, chromeHistoryIndex + 1);
    chromeHistory.push(fullUrl);
    chromeHistoryIndex = chromeHistory.length - 1;
    const domain = fullUrl.replace('https://', '').replace('http://', '').split('/')[0];
    document.getElementById('chromeTab1').querySelector('.chrome-tab-title').textContent = domain;
    document.getElementById('chromeBack').disabled = chromeHistoryIndex <= 0;
    document.getElementById('chromeForward').disabled = chromeHistoryIndex >= chromeHistory.length - 1;
  }

  function chromeGoHome() {
    document.getElementById('chromeHomepage').style.display = 'flex';
    document.getElementById('chromeFrame').style.display = 'none';
    document.getElementById('chromeFrame').src = 'about:blank';
    document.getElementById('chromeFallback').style.display = 'none';
    document.getElementById('chromeUrl').value = '';
    document.getElementById('chromeSearchInput').value = '';
    document.getElementById('chromeTab1').querySelector('.chrome-tab-title').textContent = 'New Tab';
    chromeGreeting();
  }

  function chromeOpenExternal() {
    const url = document.getElementById('chromeUrl').value;
    if (url) window.open(url.startsWith('http') ? url : 'https://' + url, '_blank');
  }

  function chromeHandleInput(val) {
    if (!val) return;
    if (val.includes('.') && !val.includes(' ')) chromeNavigateTo(val);
    else chromeNavigateTo('https://www.google.com/search?q=' + encodeURIComponent(val));
  }

  document.getElementById('chromeSearchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') chromeHandleInput(e.target.value.trim());
  });

  document.getElementById('chromeUrl').addEventListener('keydown', e => {
    if (e.key === 'Enter') chromeHandleInput(e.target.value.trim());
  });

  document.getElementById('chromeBack').addEventListener('click', () => {
    if (chromeHistoryIndex > 0) {
      chromeHistoryIndex--;
      const url = chromeHistory[chromeHistoryIndex];
      document.getElementById('chromeUrl').value = url;
      document.getElementById('chromeFrame').src = url;
      document.getElementById('chromeHomepage').style.display = 'none';
      document.getElementById('chromeFrame').style.display = 'block';
      document.getElementById('chromeFallback').style.display = 'none';
    }
  });

  document.getElementById('chromeForward').addEventListener('click', () => {
    if (chromeHistoryIndex < chromeHistory.length - 1) {
      chromeHistoryIndex++;
      const url = chromeHistory[chromeHistoryIndex];
      document.getElementById('chromeUrl').value = url;
      document.getElementById('chromeFrame').src = url;
      document.getElementById('chromeHomepage').style.display = 'none';
      document.getElementById('chromeFrame').style.display = 'block';
      document.getElementById('chromeFallback').style.display = 'none';
    }
  });

  document.getElementById('chromeReload').addEventListener('click', () => {
    const frame = document.getElementById('chromeFrame');
    if (frame.style.display !== 'none' && frame.src && frame.src !== 'about:blank') {
      frame.src = frame.src;
    }
  });
});

// ---- YouTube ----
const youtubeVideos = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', channel: 'Rick Astley', views: '1.5B views', time: '3:33', cat: 'music', color: '#FF0000', letter: 'R' },
  { id: 'jNQXAC9IVRw', title: 'Me at the zoo', channel: 'Jawed Karim', views: '320M views', time: '0:19', cat: 'all', color: '#4285F4', letter: 'J' },
  { id: 'kJQP7kiw5Fk', title: 'Luis Fonsi - Despacito ft. Daddy Yankee', channel: 'Luis Fonsi', views: '8.1B views', time: '4:42', cat: 'music', color: '#E91E63', letter: 'L' },
  { id: 'W6NZfCO5SIk', title: 'Top 10 JavaScript Tips & Tricks', channel: 'Traversy Media', views: '2.4M views', time: '15:20', cat: 'tech', color: '#FF6D00', letter: 'T' },
  { id: '9bZkp7q19f0', title: 'PSY - GANGNAM STYLE(강남스타일) MV', channel: 'officialpsy', views: '4.6B views', time: '4:13', cat: 'music', color: '#9C27B0', letter: 'P' },
  { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', channel: 'Queen', views: '1.8B views', time: '5:55', cat: 'music', color: '#673AB7', letter: 'Q' },
  { id: '8uM2y3mWw3k', title: 'Build a macOS Clone in 1 Hour', channel: 'Fireship', views: '890K views', time: '12:08', cat: 'tech', color: '#FF5722', letter: 'F' },
  { id: 'kXYiU_JCYtU', title: 'NCS: Infinity', channel: 'NoCopyrightSounds', views: '420M views', time: '5:08', cat: 'music', color: '#00BCD4', letter: 'N' },
  { id: 'LXb3EKWsInQ', title: 'NASA Live - Earth From Space', channel: 'NASA', views: '24M views', time: 'LIVE', cat: 'live', color: '#1565C0', letter: 'N' },
  { id: 'sXQk7LN5MVk', title: 'Minecraft but AI Controls My Mouse', channel: 'Mistah MegaManFan', views: '5.2M views', time: '18:42', cat: 'gaming', color: '#4CAF50', letter: 'M' },
  { id: '60ItHLz5WEA', title: 'Alan Walker - Faded', channel: 'Alan Walker', views: '3.4B views', time: '3:33', cat: 'music', color: '#2196F3', letter: 'A' },
  { id: 'OPf0YbXqDm0', title: 'Mark Ronson - Uptown Funk ft. Bruno Mars', channel: 'MarkRonson', views: '4.5B views', time: '4:30', cat: 'music', color: '#FF9800', letter: 'M' },
  { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You', channel: 'Ed Sheeran', views: '5.9B views', time: '3:53', cat: 'music', color: '#E91E63', letter: 'E' },
  { id: 'RgKAFK5djSk', title: 'Wiz Khalira - See You Again ft. Charlie Puth', channel: 'Wiz Khalifa', views: '3.8B views', time: '3:57', cat: 'music', color: '#795548', letter: 'W' },
  { id: 'mTOYf9X9N4Y', title: 'iPhone 16 Pro Review - The Best iPhone Yet?', channel: 'MKBHD', views: '12M views', time: '18:42', cat: 'tech', color: '#F44336', letter: 'M' },
  { id: '5qap5aO4i9A', title: 'Taylor Swift - Anti-Hero', channel: 'Taylor Swift', views: '1.2B views', time: '3:20', cat: 'music', color: '#9C27B0', letter: 'T' },
];

function renderYoutubeGrid(filter = 'all', search = '') {
  const grid = document.getElementById('youtubeGrid');
  let vids = youtubeVideos;
  if (filter !== 'all') vids = vids.filter(v => v.cat === filter);
  if (search) { const s = search.toLowerCase(); vids = youtubeVideos.filter(v => v.title.toLowerCase().includes(s) || v.channel.toLowerCase().includes(s)); }
  grid.innerHTML = vids.map((v, i) => `
      <div class="youtube-card" onclick="playYoutubeVideo('${v.id}', '${v.title.replace(/'/g, "\\'")}', '${v.channel.replace(/'/g, "\\'")}')">
        <div class="youtube-card-thumb">
          <div class="youtube-card-thumb-placeholder" style="background:linear-gradient(135deg, ${v.color}40, ${v.color}20);">
            <i class="ri-play-fill" style="font-size:42px;color:${v.color};opacity:0.8;"></i>
          </div>
          <div class="youtube-card-duration">${v.time}</div>
        </div>
        <div class="youtube-card-info">
          <div class="youtube-card-avatar" style="background:${v.color};">${v.letter}</div>
          <div class="youtube-card-text">
            <div class="youtube-card-title">${v.title}</div>
            <div class="youtube-card-channel">${v.channel}</div>
            <div class="youtube-card-meta">${v.views}</div>
          </div>
        </div>
      </div>`).join('');
}

function playYoutubeVideo(id, title, channel) {
  document.getElementById('youtubeHomepage').style.display = 'none';
  document.getElementById('youtubePlayer').style.display = 'flex';
  const embed = document.getElementById('youtubeEmbed');
  embed.style.display = '';
  embed.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
  document.getElementById('youtubePlayerInfo').innerHTML = `
      <div class="youtube-player-back" onclick="youtubeGoHome()"><i class="ri-arrow-left-s-line"></i> Back to Home</div>
      <div class="youtube-player-title">${title}</div>
      <div class="youtube-player-channel">${channel}</div>
      <button class="youtube-open-btn" onclick="window.open('https://www.youtube.com/watch?v=${id}', '_blank')">Open in YouTube</button>`;

  let fallbackEl = document.getElementById('youtubeFallback');
  if (!fallbackEl) {
    fallbackEl = document.createElement('div');
    fallbackEl.id = 'youtubeFallback';
    fallbackEl.className = 'youtube-embed-wrapper';
    fallbackEl.style.cssText = 'display:none;align-items:center;justify-content:center;flex-direction:column;gap:12px;';
    embed.parentNode.appendChild(fallbackEl);
  }
  let loadTimer = setTimeout(() => {
    embed.style.display = 'none';
    fallbackEl.innerHTML = `
      <i class="ri-youtube-fill" style="font-size:48px;color:#FF0000;opacity:0.5;"></i>
      <div style="color:#aaa;font-size:14px;">Video player could not load</div>
      <button class="youtube-open-btn" onclick="window.open('https://www.youtube.com/watch?v=${id}', '_blank')">Open in YouTube</button>
      <button class="youtube-open-btn" onclick="youtubeGoHome()" style="background:#333;">Back to Home</button>`;
    fallbackEl.style.display = 'flex';
  }, 5000);

  embed.onload = () => { clearTimeout(loadTimer); };
  embed.onerror = () => {
    clearTimeout(loadTimer);
    embed.style.display = 'none';
  };
}

function youtubeGoHome() {
  document.getElementById('youtubeHomepage').style.display = 'block';
  document.getElementById('youtubePlayer').style.display = 'none';
  const embed = document.getElementById('youtubeEmbed');
  embed.src = '';
  embed.style.display = '';
  const fallback = document.getElementById('youtubeFallback');
  if (fallback) fallback.style.display = 'none';
}

renderYoutubeGrid();

document.querySelectorAll('.youtube-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.youtube-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderYoutubeGrid(chip.dataset.cat);
  });
});

document.getElementById('youtubeSearchBtn').addEventListener('click', () => {
  const val = document.getElementById('youtubeSearchInput').value.trim();
  document.querySelectorAll('.youtube-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.youtube-chip[data-cat="all"]').classList.add('active');
  renderYoutubeGrid('all', val);
});

document.getElementById('youtubeSearchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('youtubeSearchBtn').click();
});

// ---- Notes App ----
const notesState = { notes: [], activeId: null };

function loadNotes() {
  const saved = localStorage.getItem('threados_notes');
  if (saved) { notesState.notes = JSON.parse(saved); }
  if (!notesState.notes.length) {
    notesState.notes = [
      { id: Date.now(), title: 'Welcome to Notes', body: 'This is your first note.\n\nYou can create, edit, and delete notes here. Everything is saved automatically.', created: new Date().toISOString() },
      { id: Date.now() + 1, title: 'Quick Tips', body: '- Click "New Note" to create a note\n- Use the search bar to find notes\n- Word count shown at bottom\n- Notes auto-save as you type', created: new Date().toISOString() }
    ];
    saveNotes();
  }
}

function saveNotes() { localStorage.setItem('threados_notes', JSON.stringify(notesState.notes)); }

function renderNotesList(filter = '') {
  const list = document.getElementById('notesList');
  let notes = notesState.notes;
  if (filter) { const f = filter.toLowerCase(); notes = notes.filter(n => n.title.toLowerCase().includes(f) || n.body.toLowerCase().includes(f)); }
  notes.sort((a, b) => new Date(b.created) - new Date(a.created));
  list.innerHTML = notes.map(n => `
    <div class="notes-list-item ${n.id === notesState.activeId ? 'active' : ''}" data-id="${n.id}">
      <div class="notes-list-item-title">${n.title || 'Untitled'}</div>
      <div class="notes-list-item-preview">${n.body.substring(0, 60) || 'No content'}</div>
      <div class="notes-list-item-date">${new Date(n.created).toLocaleDateString()}</div>
    </div>`).join('');
  list.querySelectorAll('.notes-list-item').forEach(el => {
    el.addEventListener('click', () => openNote(parseInt(el.dataset.id)));
  });
}

function openNote(id) {
  const note = notesState.notes.find(n => n.id === id);
  if (!note) return;
  notesState.activeId = id;
  document.getElementById('notesTitleInput').value = note.title;
  document.getElementById('notesTextarea').value = note.body;
  document.getElementById('notesDate').textContent = new Date(note.created).toLocaleString();
  updateNotesWordCount();
  renderNotesList(document.getElementById('notesSearch').value);
}

function updateNotesWordCount() {
  const text = document.getElementById('notesTextarea').value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById('notesWordCount').textContent = words + ' word' + (words !== 1 ? 's' : '');
}

document.getElementById('notesNewBtn').addEventListener('click', () => {
  const note = { id: Date.now(), title: 'New Note', body: '', created: new Date().toISOString() };
  notesState.notes.push(note);
  saveNotes();
  openNote(note.id);
  document.getElementById('notesTitleInput').select();
});

document.getElementById('notesDeleteBtn').addEventListener('click', () => {
  if (!notesState.activeId) return;
  notesState.notes = notesState.notes.filter(n => n.id !== notesState.activeId);
  notesState.activeId = null;
  saveNotes();
  document.getElementById('notesTitleInput').value = '';
  document.getElementById('notesTextarea').value = '';
  document.getElementById('notesDate').textContent = '';
  updateNotesWordCount();
  renderNotesList(document.getElementById('notesSearch').value);
});

document.getElementById('notesTitleInput').addEventListener('input', () => {
  if (!notesState.activeId) return;
  const note = notesState.notes.find(n => n.id === notesState.activeId);
  if (note) { note.title = document.getElementById('notesTitleInput').value; saveNotes(); renderNotesList(document.getElementById('notesSearch').value); }
});

document.getElementById('notesTextarea').addEventListener('input', () => {
  if (!notesState.activeId) return;
  const note = notesState.notes.find(n => n.id === notesState.activeId);
  if (note) { note.body = document.getElementById('notesTextarea').value; saveNotes(); renderNotesList(document.getElementById('notesSearch').value); }
  updateNotesWordCount();
});

document.getElementById('notesSearch').addEventListener('input', () => {
  renderNotesList(document.getElementById('notesSearch').value);
});

loadNotes();
renderNotesList();

// ---- Music App ----
const musicLibrary = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: 355, color: '#673AB7' },
  { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', duration: 234, color: '#E91E63' },
  { id: 3, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, color: '#F44336' },
  { id: 4, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: 391, color: '#FF9800' },
  { id: 5, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: 294, color: '#9C27B0' },
  { id: 6, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', duration: 482, color: '#795548' },
  { id: 7, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: 301, color: '#00BCD4' },
  { id: 8, title: 'Yesterday', artist: 'The Beatles', album: 'Help!', duration: 125, color: '#4CAF50' },
  { id: 9, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: 187, color: '#2196F3' },
  { id: 10, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: 356, color: '#FF5722' },
  { id: 11, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', duration: 270, color: '#FFC107' },
  { id: 12, title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile Soundtrack', duration: 326, color: '#607D8B' },
  { id: 13, title: 'Dream On', artist: 'Aerosmith', album: 'Aerosmith', duration: 268, color: '#3F51B5' },
  { id: 14, title: 'Comfortably Numb', artist: 'Pink Floyd', album: 'The Wall', duration: 382, color: '#1565C0' },
  { id: 15, title: 'Don\'t Stop Believin\'', artist: 'Journey', album: 'Escape', duration: 251, color: '#009688' },
];

const musicState = { queue: [...musicLibrary], currentIdx: -1, playing: false, elapsed: 0, timer: null, volume: 75, view: 'songs' };

function formatMusicTime(s) { const m = Math.floor(s / 60); return m + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }

function renderMusicList(filter = '') {
  const list = document.getElementById('musicList');
  let songs = musicLibrary;
  if (filter) { const f = filter.toLowerCase(); songs = songs.filter(s => s.title.toLowerCase().includes(f) || s.artist.toLowerCase().includes(f)); }
  list.innerHTML = `<div class="music-list-header"><span>#</span><span>Title</span><span>Artist</span><span>Time</span></div>` +
    songs.map((s, i) => {
      const isPlaying = musicState.playing && musicState.queue[musicState.currentIdx]?.id === s.id;
      return `<div class="music-list-item ${isPlaying ? 'playing' : ''}" data-id="${s.id}">
        <span class="music-list-item-num">${isPlaying ? '<i class="ri-volume-up-fill" style="color:var(--mac-accent)"></i>' : i + 1}</span>
        <span style="display:flex;align-items:center;gap:8px;"><span class="music-list-item-art" style="background:${s.color};">${s.title[0]}</span>${s.title}</span>
        <span>${s.artist}</span>
        <span class="music-list-item-duration">${formatMusicTime(s.duration)}</span>
      </div>`;
    }).join('');
  list.querySelectorAll('.music-list-item').forEach(el => {
    el.addEventListener('dblclick', () => {
      const id = parseInt(el.dataset.id);
      const idx = musicState.queue.findIndex(s => s.id === id);
      if (idx >= 0) playMusicTrack(idx);
    });
  });
}

function playMusicTrack(idx) {
  musicState.currentIdx = idx;
  musicState.playing = true;
  musicState.elapsed = 0;
  const track = musicState.queue[idx];
  document.getElementById('musicNpTitle').textContent = track.title;
  document.getElementById('musicNpArtist').textContent = track.artist;
  document.getElementById('musicNpArt').style.background = `linear-gradient(135deg, ${track.color}, ${track.color}88)`;
  document.getElementById('musicNpArt').textContent = track.title[0];
  document.getElementById('musicSeek').max = track.duration;
  document.getElementById('musicTotalTime').textContent = formatMusicTime(track.duration);
  document.getElementById('musicPlayPause').innerHTML = '<i class="ri-pause-fill"></i>';
  clearInterval(musicState.timer);
  musicState.timer = setInterval(() => {
    if (!musicState.playing) return;
    musicState.elapsed++;
    if (musicState.elapsed >= track.duration) { playMusicNext(); return; }
    document.getElementById('musicSeek').value = musicState.elapsed;
    document.getElementById('musicCurrentTime').textContent = formatMusicTime(musicState.elapsed);
  }, 1000);
  renderMusicList(document.getElementById('musicSearch').value);
}

function playMusicNext() {
  if (musicState.queue.length === 0) return;
  const next = (musicState.currentIdx + 1) % musicState.queue.length;
  playMusicTrack(next);
}

function playMusicPrev() {
  if (musicState.elapsed > 3) { musicState.elapsed = 0; document.getElementById('musicSeek').value = 0; return; }
  const prev = (musicState.currentIdx - 1 + musicState.queue.length) % musicState.queue.length;
  playMusicTrack(prev);
}

function toggleMusicPlay() {
  if (musicState.currentIdx < 0) { if (musicState.queue.length) playMusicTrack(0); return; }
  musicState.playing = !musicState.playing;
  document.getElementById('musicPlayPause').innerHTML = musicState.playing ? '<i class="ri-pause-fill"></i>' : '<i class="ri-play-fill"></i>';
  if (!musicState.playing) clearInterval(musicState.timer);
  else {
    const track = musicState.queue[musicState.currentIdx];
    musicState.timer = setInterval(() => {
      if (!musicState.playing) return;
      musicState.elapsed++;
      if (musicState.elapsed >= track.duration) { playMusicNext(); return; }
      document.getElementById('musicSeek').value = musicState.elapsed;
      document.getElementById('musicCurrentTime').textContent = formatMusicTime(musicState.elapsed);
    }, 1000);
  }
}

document.getElementById('musicPlayPause').addEventListener('click', toggleMusicPlay);
document.getElementById('musicNext').addEventListener('click', playMusicNext);
document.getElementById('musicPrev').addEventListener('click', playMusicPrev);

document.getElementById('musicSeek').addEventListener('input', () => {
  musicState.elapsed = parseInt(document.getElementById('musicSeek').value);
  document.getElementById('musicCurrentTime').textContent = formatMusicTime(musicState.elapsed);
});

document.getElementById('musicVolume').addEventListener('input', () => {
  musicState.volume = parseInt(document.getElementById('musicVolume').value);
  const icon = document.getElementById('musicVolIcon');
  icon.className = musicState.volume === 0 ? 'ri-volume-mute-line' : musicState.volume < 50 ? 'ri-volume-down-line' : 'ri-volume-up-line';
});

document.getElementById('musicSearch').addEventListener('input', () => {
  renderMusicList(document.getElementById('musicSearch').value);
});

document.querySelectorAll('.music-sidebar-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.music-sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    musicState.view = item.dataset.view;
    renderMusicList(document.getElementById('musicSearch').value);
  });
});

renderMusicList();

// ---- Weather Widget ----
const weatherDays = [
  { name: 'Today', icon: 'ri-sun-line', hi: 78, lo: 61 },
  { name: 'Mon', icon: 'ri-sun-cloudy-line', hi: 75, lo: 60 },
  { name: 'Tue', icon: 'ri-cloudy-line', hi: 70, lo: 58 },
  { name: 'Wed', icon: 'ri-drizzle-line', hi: 65, lo: 55 },
  { name: 'Thu', icon: 'ri-sun-cloudy-line', hi: 72, lo: 59 },
  { name: 'Fri', icon: 'ri-sun-line', hi: 76, lo: 62 },
  { name: 'Sat', icon: 'ri-sun-line', hi: 79, lo: 63 }
];

function renderWeatherForecast() {
  document.getElementById('weatherForecast').innerHTML = weatherDays.map(d =>
    `<div class="weather-forecast-day">
      <div class="weather-forecast-day-name">${d.name}</div>
      <div class="weather-forecast-day-icon"><i class="${d.icon}"></i></div>
      <div class="weather-forecast-day-temp">${d.hi}°</div>
      <div class="weather-forecast-day-lo">${d.lo}°</div>
    </div>`).join('');
}

document.getElementById('weatherTrayBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  const dd = document.getElementById('weatherDropdown');
  dd.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const dd = document.getElementById('weatherDropdown');
  if (dd.classList.contains('open') && !dd.contains(e.target) && !document.getElementById('weatherTrayBtn').contains(e.target)) {
    dd.classList.remove('open');
  }
});

renderWeatherForecast();

// ---- Disk Utility (Enhanced) ----
const diskTotal = 512;
let partitions = [
  { id: 1, name: 'Macintosh HD', size: 320, format: 'APFS', color: '#007AFF', mountable: true },
  { id: 2, name: 'Data', size: 120, format: 'APFS', color: '#28C840', mountable: true },
  { id: 3, name: 'Recovery', size: 8, format: 'HFS+', color: '#FF9500', mountable: false }
];
let nextPartId = 4;
const partColors = ['#007AFF', '#28C840', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA', '#FF2D55', '#FFCC00'];

function renderDiskUtil() {
  const bar = document.getElementById('diskutilPartitionBar');
  const list = document.getElementById('diskutilPartitionList');
  const legend = document.getElementById('diskutilLegend');
  if (!bar || !list) return;
  const used = partitions.reduce((a, p) => a + p.size, 0);
  const free = diskTotal - used;

  // Partition bar
  bar.innerHTML = partitions.map(p =>
    `<div class="diskutil-partition-seg" style="flex:${p.size};background:${p.color};" title="${p.name}: ${p.size} GB">${p.size >= 30 ? p.name : ''}</div>`
  ).join('') + (free > 0 ? `<div class="diskutil-partition-seg" style="flex:${free};background:rgba(255,255,255,0.08);" title="Available: ${free} GB"></div>` : '');

  // Partition list
  list.innerHTML = partitions.map(p => `
    <div class="diskutil-partition-item" data-id="${p.id}">
      <div class="diskutil-partition-dot" style="background:${p.color};"></div>
      <div class="diskutil-partition-name">${p.name}</div>
      <div class="diskutil-partition-size">${p.size} GB</div>
      <div class="diskutil-partition-format">${p.format}</div>
      <div class="diskutil-partition-actions">
        <button class="diskutil-part-btn" data-action="rename" title="Rename"><i class="ri-edit-line"></i></button>
        <button class="diskutil-part-btn" data-action="resize" title="Resize"><i class="ri-drag-move-line"></i></button>
        ${p.mountable ? `<button class="diskutil-part-btn" data-action="mount" title="${p.mounted !== false ? 'Unmount' : 'Mount'}"><i class="ri-${p.mounted !== false ? 'eject' : 'hard-drive'}-2-line"></i></button>` : ''}
        <button class="diskutil-part-btn danger" data-action="delete" title="Delete"><i class="ri-delete-bin-line"></i></button>
      </div>
    </div>
  `).join('');

  // Legend
  legend.innerHTML = partitions.map(p =>
    `<div class="diskutil-legend-item"><span class="diskutil-legend-dot" style="background:${p.color};"></span><span class="diskutil-legend-label">${p.name}</span><span class="diskutil-legend-value">${p.size} GB</span></div>`
  ).join('') + `<div class="diskutil-legend-item"><span class="diskutil-legend-dot" style="background:rgba(255,255,255,0.1);"></span><span class="diskutil-legend-label">Available</span><span class="diskutil-legend-value">${free} GB</span></div>`;

  // Bind events
  list.querySelectorAll('.diskutil-part-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.closest('.diskutil-partition-item').dataset.id);
      const action = btn.dataset.action;
      handlePartitionAction(id, action);
    });
  });
}

function handlePartitionAction(id, action) {
  const part = partitions.find(p => p.id === id);
  if (!part) return;
  switch (action) {
    case 'rename': {
      const newName = prompt('Rename partition:', part.name);
      if (newName && newName !== part.name) { part.name = newName; renderDiskUtil(); }
      break;
    }
    case 'resize': {
      const maxSize = diskTotal - partitions.filter(p => p.id !== id).reduce((a, p) => a + p.size, 0);
      const newSize = parseInt(prompt(`Resize "${part.name}" (1-${maxSize} GB):`, part.size));
      if (newSize && newSize >= 1 && newSize <= maxSize) { part.size = newSize; renderDiskUtil(); }
      break;
    }
    case 'mount':
      part.mounted = part.mounted === false ? true : false;
      renderDiskUtil();
      break;
    case 'delete':
      if (partitions.length <= 1) { alert('Cannot delete the last partition.'); return; }
      if (confirm(`Delete partition "${part.name}"? This cannot be undone.`)) {
        partitions = partitions.filter(p => p.id !== id);
        renderDiskUtil();
      }
      break;
  }
}

function addPartition() {
  const used = partitions.reduce((a, p) => a + p.size, 0);
  const free = diskTotal - used;
  if (free < 10) { alert('Not enough space to create a new partition. Minimum 10 GB required.'); return; }
  const name = prompt('New partition name:', 'Untitled');
  if (!name) return;
  const sizeStr = prompt(`Size in GB (1-${free}):`, Math.min(50, free));
  const size = parseInt(sizeStr);
  if (!size || size < 1 || size > free) return;
  const format = confirm('Use APFS format? (Cancel for HFS+)') ? 'APFS' : 'HFS+';
  partitions.push({
    id: nextPartId++,
    name,
    size,
    format,
    color: partColors[(partitions.length) % partColors.length],
    mountable: true
  });
  renderDiskUtil();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  renderDiskUtil();
  const addBtn = document.getElementById('diskutilAddPart');
  if (addBtn) addBtn.addEventListener('click', addPartition);
});

// ---- Clipboard Manager ----
const clipboardHistory = [];

function addClipboardItem(text) {
  if (!text || !text.trim()) return;
  if (clipboardHistory.length > 0 && clipboardHistory[0].text === text) return;
  clipboardHistory.unshift({ text: text.trim(), time: new Date() });
  if (clipboardHistory.length > 20) clipboardHistory.pop();
  renderClipboardList();
}

function renderClipboardList() {
  const list = document.getElementById('clipboardList');
  if (!clipboardHistory.length) {
    list.innerHTML = '<div class="clipboard-empty">No items copied yet</div>';
    return;
  }
  list.innerHTML = clipboardHistory.map((item, i) =>
    `<div class="clipboard-item" data-idx="${i}">
      <div class="clipboard-item-text">${item.text.replace(/</g, '&lt;')}</div>
      <div class="clipboard-item-time">${item.time.toLocaleTimeString()}</div>
    </div>`
  ).join('');
  list.querySelectorAll('.clipboard-item').forEach(el => {
    el.addEventListener('click', () => {
      const text = clipboardHistory[parseInt(el.dataset.idx)].text;
      navigator.clipboard.writeText(text).catch(() => {});
      document.getElementById('clipboardDropdown').classList.remove('open');
    });
  });
}

document.addEventListener('copy', (e) => {
  const sel = window.getSelection()?.toString();
  if (sel) addClipboardItem(sel);
});

document.addEventListener('cut', (e) => {
  const sel = window.getSelection()?.toString();
  if (sel) addClipboardItem(sel);
});

document.getElementById('clipboardTrayBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  document.getElementById('clipboardDropdown').classList.toggle('open');
});

document.getElementById('clipboardClearBtn').addEventListener('click', () => {
  clipboardHistory.length = 0;
  renderClipboardList();
});

document.addEventListener('click', (e) => {
  const dd = document.getElementById('clipboardDropdown');
  if (dd.classList.contains('open') && !dd.contains(e.target) && !document.getElementById('clipboardTrayBtn').contains(e.target)) {
    dd.classList.remove('open');
  }
});

renderClipboardList();

// ---- Launchpad Search ----
document.getElementById('launchpadSearch').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.launchpad-item').forEach(item => {
    const label = (item.querySelector('.launchpad-label')?.textContent || '').toLowerCase();
    item.style.display = (!query || label.includes(query)) ? '' : 'none';
  });
});

document.getElementById('launchpadSearch').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.target.value = ''; e.target.dispatchEvent(new Event('input')); }
});

// ---- Clock App ----
const worldCities = [
  { name: 'San Francisco', tz: 'America/Los_Angeles' },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' },
  { name: 'Sydney', tz: 'Australia/Sydney' },
  { name: 'Dubai', tz: 'Asia/Dubai' },
];

function renderWorldClock() {
  document.getElementById('clockWorldGrid').innerHTML = worldCities.map(c => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { timeZone: c.tz, hour: '2-digit', minute: '2-digit', hour12: true });
    const date = now.toLocaleDateString('en-US', { timeZone: c.tz, weekday: 'short', month: 'short', day: 'numeric' });
    return `<div class="clock-world-city"><div class="clock-world-city-name">${c.name}</div><div class="clock-world-city-time">${time}</div><div class="clock-world-city-date">${date}</div></div>`;
  }).join('');
}

setInterval(renderWorldClock, 1000);
renderWorldClock();

// Tab switching
document.querySelectorAll('.clock-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.clock-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('clockWorldClock').style.display = tab.dataset.tab === 'worldclock' ? 'flex' : 'none';
    document.getElementById('clockStopwatch').style.display = tab.dataset.tab === 'stopwatch' ? 'flex' : 'none';
    document.getElementById('clockTimer').style.display = tab.dataset.tab === 'timer' ? 'flex' : 'none';
  });
});

// Stopwatch
let swRunning = false, swElapsed = 0, swTimer = null, swLaps = [];
function updateSWDisplay() {
  const min = Math.floor(swElapsed / 6000);
  const sec = Math.floor((swElapsed % 6000) / 100);
  const cs = Math.floor((swElapsed % 100));
  document.getElementById('swDisplay').textContent = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + '.' + String(cs).padStart(2, '0');
}
document.getElementById('swStart').addEventListener('click', () => {
  swRunning = !swRunning;
  const btn = document.getElementById('swStart');
  btn.textContent = swRunning ? 'Stop' : 'Start';
  btn.classList.toggle('running', swRunning);
  document.getElementById('swLap').disabled = !swRunning;
  if (swRunning) { swTimer = setInterval(() => { swElapsed++; updateSWDisplay(); }, 10); }
  else clearInterval(swTimer);
});
document.getElementById('swReset').addEventListener('click', () => {
  swRunning = false; swElapsed = 0; swLaps = [];
  clearInterval(swTimer);
  document.getElementById('swStart').textContent = 'Start';
  document.getElementById('swStart').classList.remove('running');
  document.getElementById('swLap').disabled = true;
  updateSWDisplay();
  document.getElementById('clockLaps').innerHTML = '';
});
document.getElementById('swLap').addEventListener('click', () => {
  swLaps.push(swElapsed);
  const lap = document.createElement('div');
  lap.className = 'clock-lap-item';
  lap.innerHTML = `<span>Lap ${swLaps.length}</span><span>${document.getElementById('swDisplay').textContent}</span>`;
  document.getElementById('clockLaps').prepend(lap);
});

// Timer
let timerRunning = false, timerRemaining = 300, timerInterval = null;
function updateTimerDisplay() {
  const m = Math.floor(timerRemaining / 60);
  const s = timerRemaining % 60;
  document.getElementById('timerDisplay').textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
document.getElementById('timerStart').addEventListener('click', () => {
  if (timerRunning) { clearInterval(timerInterval); timerRunning = false; document.getElementById('timerStart').textContent = 'Start'; document.getElementById('timerStart').classList.remove('running'); return; }
  timerRemaining = parseInt(document.getElementById('timerMin').value) * 60 + parseInt(document.getElementById('timerSec').value);
  if (timerRemaining <= 0) return;
  timerRunning = true;
  document.getElementById('timerStart').textContent = 'Pause';
  document.getElementById('timerStart').classList.add('running');
  timerInterval = setInterval(() => {
    timerRemaining--;
    updateTimerDisplay();
    if (timerRemaining <= 0) { clearInterval(timerInterval); timerRunning = false; document.getElementById('timerStart').textContent = 'Start'; document.getElementById('timerStart').classList.remove('running'); }
  }, 1000);
});
document.getElementById('timerReset').addEventListener('click', () => {
  clearInterval(timerInterval); timerRunning = false;
  timerRemaining = parseInt(document.getElementById('timerMin').value) * 60 + parseInt(document.getElementById('timerSec').value);
  updateTimerDisplay();
  document.getElementById('timerStart').textContent = 'Start';
  document.getElementById('timerStart').classList.remove('running');
});

updateTimerDisplay();

// ---- Reminders App ----
const remindersState = { items: [], cat: 'today' };

function loadReminders() {
  const saved = localStorage.getItem('threados_reminders');
  if (saved) remindersState.items = JSON.parse(saved);
  if (!remindersState.items.length) {
    remindersState.items = [
      { id: 1, text: 'Buy groceries', done: false, created: new Date().toISOString() },
      { id: 2, text: 'Call dentist', done: false, created: new Date().toISOString() },
      { id: 3, text: 'Read for 30 minutes', done: true, created: new Date().toISOString() },
    ];
    saveReminders();
  }
}
function saveReminders() { localStorage.setItem('threados_reminders', JSON.stringify(remindersState.items)); }

function renderReminders() {
  let items = remindersState.items;
  if (remindersState.cat === 'today') items = items.filter(i => !i.done);
  else if (remindersState.cat === 'completed') items = items.filter(i => i.done);
  document.getElementById('remCountToday').textContent = remindersState.items.filter(i => !i.done).length;
  document.getElementById('remCountAll').textContent = remindersState.items.length;
  document.getElementById('remCountDone').textContent = remindersState.items.filter(i => i.done).length;
  const list = document.getElementById('remindersList');
  if (!items.length) { list.innerHTML = '<div style="padding:40px;text-align:center;color:var(--mac-text-muted);font-size:13px;">No reminders</div>'; return; }
  list.innerHTML = items.map(item =>
    `<div class="reminders-item ${item.done ? 'done' : ''}" data-id="${item.id}">
      <div class="reminders-check"></div>
      <span class="reminders-item-text">${item.text.replace(/</g, '&lt;')}</span>
      <button class="reminders-item-delete" data-id="${item.id}"><i class="ri-close-line"></i></button>
    </div>`
  ).join('');
  list.querySelectorAll('.reminders-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.reminders-item-delete')) return;
      const id = parseInt(el.dataset.id);
      const item = remindersState.items.find(i => i.id === id);
      if (item) { item.done = !item.done; saveReminders(); renderReminders(); }
    });
  });
  list.querySelectorAll('.reminders-item-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      remindersState.items = remindersState.items.filter(i => i.id !== parseInt(btn.dataset.id));
      saveReminders(); renderReminders();
    });
  });
}

document.getElementById('remindersAddBtn').addEventListener('click', () => {
  const input = document.getElementById('remindersInput');
  const text = input.value.trim();
  if (!text) return;
  remindersState.items.push({ id: Date.now(), text, done: false, created: new Date().toISOString() });
  saveReminders(); renderReminders(); input.value = '';
});

document.getElementById('remindersInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('remindersAddBtn').click();
});

document.querySelectorAll('.reminders-cat').forEach(cat => {
  cat.addEventListener('click', () => {
    document.querySelectorAll('.reminders-cat').forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
    remindersState.cat = cat.dataset.cat;
    renderReminders();
  });
});

loadReminders();
renderReminders();

// ---- Notification Badges System ----
const notifState = { badges: {}, history: [] };

function setDockBadge(appName, count) {
  const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
  if (!dockItem) return;
  let badge = dockItem.querySelector('.dock-badge');
  if (count <= 0) { if (badge) badge.remove(); return; }
  if (!badge) { badge = document.createElement('div'); badge.className = 'dock-badge'; dockItem.appendChild(badge); }
  badge.textContent = count;
}

function showNotifToast(title, body, app) {
  const toast = document.createElement('div');
  toast.className = 'notif-toast';
  toast.innerHTML = `<div class="notif-toast-title">${title}</div><div class="notif-toast-body">${body}</div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 400); }, 4000);
  notifState.history.unshift({ title, body, app, time: new Date() });
  if (notifState.history.length > 50) notifState.history.pop();
  if (app) { notifState.badges[app] = (notifState.badges[app] || 0) + 1; setDockBadge(app, notifState.badges[app]); }
}

function clearNotifBadge(app) {
  notifState.badges[app] = 0;
  setDockBadge(app, 0);
}

function renderNotifCenter() {
  const center = document.getElementById('notifList');
  if (!center) return;
  if (!notifState.history.length) return;
  notifState.history.forEach(n => {
    const card = document.createElement('div');
    card.className = 'notif-card';
    card.innerHTML = `<div class="notif-card-header"><i class="ri-notification-3-fill notif-app-icon" style="color:var(--mac-accent);"></i><span class="notif-app-name">${n.title}</span><span class="notif-time">just now</span></div><div class="notif-card-body">${n.body}</div>`;
    center.prepend(card);
  });
}

// Clear badge when dock item clicked
document.querySelectorAll('.dock-item').forEach(el => {
  el.addEventListener('click', () => {
    const appName = el.dataset.app;
    clearNotifBadge(appName);
  });
});

// Simulate periodic notifications
const notifMessages = [
  { title: 'Mail', body: 'New message from Team Lead', app: 'Finder' },
  { title: 'Messages', body: 'John: Are you free for lunch?', app: 'Finder' },
  { title: 'Calendar', body: 'Team standup in 5 minutes', app: 'Clock.app' },
  { title: 'Reminders', body: 'Buy groceries - due today', app: 'Reminders.app' },
  { title: 'Notes', body: 'Synced with iCloud', app: 'Notes.app' },
  { title: 'Music', body: 'New release from your favorite artist', app: 'Music.app' },
];

let notifTimer = null;
function startNotifSimulation() {
  notifTimer = setInterval(() => {
    if (document.getElementById('dndToggle')?.classList.contains('on')) return;
    const msg = notifMessages[Math.floor(Math.random() * notifMessages.length)];
    showNotifToast(msg.title, msg.body, msg.app);
  }, 25000);
}

setTimeout(startNotifSimulation, 10000);

// Render notif center on open
if (document.getElementById('notifTrayBtn')) {
  document.getElementById('notifTrayBtn').addEventListener('click', () => {
    setTimeout(renderNotifCenter, 50);
  });
}

// ---- Desktop Stacks ----
let stacksEnabled = false;

function toggleDesktopStacks() {
  stacksEnabled = !stacksEnabled;
  const container = document.getElementById('desktopIcons');
  if (stacksEnabled) {
    container.classList.add('stacks');
    renderStacks();
  } else {
    container.classList.remove('stacks');
    container.innerHTML = '';
    const icons = [
      { type: 'app', name: 'Finder', html: '<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="34" rx="4" fill="#47A3FF"/><rect x="4" y="8" width="40" height="10" rx="4" fill="#1E6FD9"/><circle cx="14" cy="13" r="2" fill="#FF5F57"/><circle cx="20" cy="13" r="2" fill="#FEBC2E"/><circle cx="26" cy="13" r="2" fill="#28C840"/></svg>', app: 'Finder' },
      { type: 'image', name: 'vacation-photo.jpg', html: '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#34C759"/><rect x="6" y="6" width="36" height="36" rx="4" fill="#248A3D"/><circle cx="16" cy="18" r="4" fill="#FFD60A"/><path d="M6,34 L16,24 L24,30 L34,18 L42,28 L42,40 C42,42.2 40.2,44 38,44 L10,44 C7.8,44 6,42.2 6,40Z" fill="#30D158" opacity="0.6"/></svg>' },
      { type: 'document', name: 'report.docx', html: '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#007AFF"/><rect x="10" y="6" width="28" height="36" rx="3" fill="white"/><g stroke="#ccc" stroke-width="1.5"><line x1="14" y1="14" x2="34" y2="14"/><line x1="14" y1="20" x2="34" y2="20"/><line x1="14" y1="26" x2="34" y2="26"/><line x1="14" y1="32" x2="26" y2="32"/></g></svg>' },
      { type: 'image', name: 'screenshot.png', html: '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#5856D6"/><rect x="6" y="6" width="36" height="36" rx="4" fill="#4240A0"/><circle cx="16" cy="18" r="4" fill="#FFD60A"/><path d="M6,34 L16,24 L24,30 L34,18 L42,28 L42,40 C42,42.2 40.2,44 38,44 L10,44 C7.8,44 6,42.2 6,40Z" fill="#5E5CE6" opacity="0.6"/></svg>' },
      { type: 'folder', name: 'Projects', html: '<svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="30" rx="4" fill="#47A3FF"/><rect x="4" y="6" width="20" height="8" rx="3" fill="#1E6FD9"/><rect x="8" y="16" width="32" height="20" rx="2" fill="#5AC8FA" opacity="0.4"/></svg>' },
      { type: 'document', name: 'notes.txt', html: '<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#FF9500"/><rect x="10" y="6" width="28" height="36" rx="3" fill="white"/><g stroke="#ccc" stroke-width="1.5"><line x1="14" y1="14" x2="34" y2="14"/><line x1="14" y1="20" x2="34" y2="20"/><line x1="14" y1="26" x2="30" y2="26"/></g></svg>' },
    ];
    icons.forEach(icon => {
      const el = document.createElement('div');
      el.className = 'desktop-icon';
      if (icon.app) el.dataset.app = icon.app;
      el.innerHTML = `<div class="desktop-icon-img">${icon.html}</div><span>${icon.name}</span>`;
      el.addEventListener('dblclick', () => { if (icon.app) openApp(icon.app); });
      container.appendChild(el);
    });
  }
}

function renderStacks() {
  const container = document.getElementById('desktopIcons');
  const fileIcons = document.querySelectorAll('.desktop-file-icon');
  const groups = {};
  fileIcons.forEach(icon => {
    const type = icon.dataset.type || 'other';
    if (!groups[type]) groups[type] = [];
    groups[type].push(icon);
  });
  container.innerHTML = '';
  // Finder stays outside stacks
  const finderIcon = document.createElement('div');
  finderIcon.className = 'desktop-icon';
  finderIcon.dataset.app = 'Finder';
  finderIcon.innerHTML = '<div class="desktop-icon-img"><svg width="48" height="48" viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="34" rx="4" fill="#47A3FF"/><rect x="4" y="8" width="40" height="10" rx="4" fill="#1E6FD9"/><circle cx="14" cy="13" r="2" fill="#FF5F57"/><circle cx="20" cy="13" r="2" fill="#FEBC2E"/><circle cx="26" cy="13" r="2" fill="#28C840"/></svg></div><span>Finder</span>';
  finderIcon.addEventListener('dblclick', () => openApp('Finder'));
  container.appendChild(finderIcon);
  const typeIcons = { image: '🖼', document: '📄', folder: '📁', other: '📎' };
  const typeLabels = { image: 'Images', document: 'Documents', folder: 'Folders', other: 'Other' };
  Object.keys(groups).sort().forEach(type => {
    const stack = document.createElement('div');
    stack.className = 'desktop-stack';
    stack.innerHTML = `<div class="desktop-stack-header"><div class="desktop-stack-count">${groups[type].length}</div>${groups[type][0].outerHTML}</div><div class="desktop-stack-label">${typeLabels[type] || type}</div><div class="desktop-stack-items" style="display:none;"></div>`;
    const items = stack.querySelector('.desktop-stack-items');
    groups[type].forEach(icon => { items.appendChild(icon.cloneNode(true)); });
    stack.addEventListener('click', () => {
      const itemsDiv = stack.querySelector('.desktop-stack-items');
      const expanded = itemsDiv.style.display !== 'none';
      itemsDiv.style.display = expanded ? 'none' : 'flex';
      stack.classList.toggle('expanded', !expanded);
    });
    container.appendChild(stack);
  });
}

// Dock clicks
document.querySelectorAll('.dock-item').forEach(el => {
  el.addEventListener('click', () => {
    const appName = el.dataset.app;
    // Clear badge on click
    const badge = el.querySelector('.dock-badge');
    if (badge) badge.remove();
    if (appName === 'trash') { showEmptyTrashDialog(); return; }
    if (appName === 'launchpad') { toggleLaunchpad(); return; }
    if (appName === 'Finder' || appName === 'finder') {
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
  el.addEventListener('click', function () {
    changeWallpaper(this.dataset.gradient);
  });
});

// CC sliders -> OSD
document.getElementById('ccBrightness').addEventListener('input', function () { showOSD('brightness', this.value); });
document.getElementById('ccVolume').addEventListener('input', function () { showOSD('volume', this.value); });

// Force Quit dialog
document.getElementById('forcequitCancel').addEventListener('click', closeForceQuit);
document.getElementById('forcequitBtn').addEventListener('click', forceQuitApp);
document.getElementById('forcequitOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeForceQuit(); });

// Lock screen
document.getElementById('lockSubmit').addEventListener('click', attemptUnlock);
document.getElementById('lockPassword').addEventListener('keydown', e => { if (e.key === 'Enter') attemptUnlock(); });

// Screensaver - wake on mouse/key
document.getElementById('screensaver').addEventListener('mousemove', stopScreensaver);
document.getElementById('screensaver').addEventListener('click', stopScreensaver);
document.addEventListener('keydown', e => { if (screensaverActive) stopScreensaver(); });
resetScreensaverTimer();

// Keyboard shortcuts overlay
document.getElementById('shortcutsClose').addEventListener('click', closeShortcuts);
document.getElementById('shortcutsOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeShortcuts(); });

// About This Mac
document.getElementById('aboutmacClose').addEventListener('click', closeAboutMac);
document.getElementById('aboutmacOk').addEventListener('click', closeAboutMac);
document.getElementById('aboutmacOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeAboutMac(); });

// Unsaved changes dialog
document.getElementById('unsavedDontSave').addEventListener('click', () => { if (unsavedCallback) unsavedCallback(); hideUnsavedDialog(); });
document.getElementById('unsavedCancel').addEventListener('click', hideUnsavedDialog);
document.getElementById('unsavedSave').addEventListener('click', () => { teSaveFile(); teModified = false; hideUnsavedDialog(); });

// Empty trash dialog
document.getElementById('emptyTrashCancel').addEventListener('click', hideEmptyTrashDialog);
document.getElementById('emptyTrashConfirm').addEventListener('click', () => { hideEmptyTrashDialog(); });
document.getElementById('emptyTrashOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) hideEmptyTrashDialog(); });

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
document.getElementById('brandLogo').addEventListener('click', e => {
  if (e.altKey || e.optionKey) { openAboutMac(); }
  else { toggleShutdownDialog(); }
});

// Shutdown dialog - buttons
document.getElementById('btnSleep').addEventListener('click', () => { closeShutdownDialog(); screenOff(); });
document.getElementById('btnRestart').addEventListener('click', () => { closeShutdownDialog(); screenOff(); setTimeout(() => location.reload(), 2000); });
document.getElementById('btnShutdown').addEventListener('click', () => { closeShutdownDialog(); screenOff(); });
document.getElementById('btnLogout').addEventListener('click', () => { closeShutdownDialog(); screenOff(); });
document.getElementById('btnSwitchUser').addEventListener('click', () => { closeShutdownDialog(); lockScreen(); });
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
  if (e.key === 'Escape') { hideContextMenu(); closeLaunchpad(); closeNotifCenter(); closeControlCenter(); closeCalendar(); closeBatteryPopup(); cancelScreenshot(); closeSpotlight(); closeWallpaperPicker(); closeForceQuit(); closeShortcuts(); closeAboutMac(); closeWifiDropdown(); }
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
  // Cmd+L -> Lock Screen
  if ((e.metaKey || e.ctrlKey) && e.key === 'l') { e.preventDefault(); lockScreen(); }
  // Cmd+/ -> Keyboard Shortcuts
  if ((e.metaKey || e.ctrlKey) && e.key === '/') { e.preventDefault(); toggleShortcuts(); }
  // Cmd+Tab -> App Switcher
  if ((e.metaKey || e.ctrlKey) && e.key === 'Tab') {
    e.preventDefault();
    if (!appSwitcherVisible) { showAppSwitcher(); }
    else { cycleAppSwitcher(e.shiftKey ? -1 : 1); }
  }
});

document.addEventListener('keyup', e => {
  if ((e.metaKey || e.ctrlKey) === false && appSwitcherVisible) {
    selectAppSwitcher();
  }
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

// Window menu dropdown
document.getElementById('menuWindow').addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('windowDropdown').classList.toggle('visible');
});
document.querySelectorAll('#windowDropdown .menu-dropdown-item').forEach(el => {
  el.addEventListener('click', () => {
    const action = el.dataset.action;
    if (action === 'cascade') cascadeWindows();
    else if (action === 'tileLeft') tileWindow('left');
    else if (action === 'tileRight') tileWindow('right');
    else if (action === 'minimizeAll') getOpenWindows().forEach(w => minimizeWindow(w.id));
    document.getElementById('windowDropdown').classList.remove('visible');
  });
});
document.addEventListener('click', () => {
  const dd = document.getElementById('windowDropdown');
  if (dd) dd.classList.remove('visible');
});
document.getElementById('calPrev').addEventListener('click', e => { e.stopPropagation(); calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
document.getElementById('calNext').addEventListener('click', e => { e.stopPropagation(); calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });
initCalendar();

// Battery popup
document.getElementById('batteryTrayBtn').addEventListener('click', toggleBatteryPopup);
document.getElementById('batteryLpm').addEventListener('click', function () { this.classList.toggle('active'); });

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

// DND tray icon
document.getElementById('dndTrayBtn').addEventListener('click', toggleDND);

// WiFi tray icon
document.getElementById('wifiTrayBtn').addEventListener('click', toggleWifiDropdown);

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
document.getElementById('ccDarkMode').addEventListener('click', function () {
  this.classList.toggle('active');
});

// Control Center - bottom button toggles
['ccDoNotDisturb', 'ccScreenMirror', 'ccStageManager'].forEach(id => {
  document.getElementById(id).addEventListener('click', function () {
    if (id === 'ccDoNotDisturb') { toggleDND(); return; }
    this.classList.toggle('active');
  });
});

// ============================================================
// VIRTUAL DESKTOPS (SPACES)
// ============================================================
const spaces = {
  current: 0,
  maxSpaces: 4,
  windows: {},  // windowId -> spaceIndex
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.bindEvents();
    this.showIndicatorBriefly();
  },

  bindEvents() {
    const indicator = document.getElementById('spacesIndicator');
    const overview = document.getElementById('spacesOverview');
    const overviewGrid = document.getElementById('spacesOverviewGrid');
    const overviewClose = document.getElementById('spacesOverviewClose');
    const addBtn = document.getElementById('spacesAddBtn');

    // Show indicator on mouse near bottom
    let indicatorTimeout;
    document.addEventListener('mousemove', e => {
      if (overview.classList.contains('visible')) return;
      if (window.innerHeight - e.clientY < 120) {
        indicator.classList.add('visible');
        clearTimeout(indicatorTimeout);
      } else if (!indicator.matches(':hover')) {
        indicatorTimeout = setTimeout(() => indicator.classList.remove('visible'), 600);
      }
    });
    indicator.addEventListener('mouseenter', () => {
      clearTimeout(indicatorTimeout);
      indicator.classList.add('visible');
    });
    indicator.addEventListener('mouseleave', () => {
      indicatorTimeout = setTimeout(() => indicator.classList.remove('visible'), 600);
    });

    // Dot clicks
    indicator.querySelectorAll('.spaces-dot').forEach(dot => {
      dot.addEventListener('click', () => this.switchTo(parseInt(dot.dataset.space)));
    });

    // Add desktop button
    addBtn.addEventListener('click', () => this.addSpace());

    // Overview close
    overviewClose.addEventListener('click', () => this.closeOverview());
    overview.addEventListener('click', e => {
      if (e.target === overview) this.closeOverview();
    });

    // Overview grid clicks
    overviewGrid.addEventListener('click', e => {
      const card = e.target.closest('.spaces-overview-card');
      if (!card) return;
      if (e.target.closest('.spaces-overview-card-close')) {
        this.removeSpace(parseInt(card.dataset.space));
        return;
      }
      this.switchTo(parseInt(card.dataset.space));
      this.closeOverview();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (this.isInputFocused()) return;
      // Ctrl + 1-4: switch to space
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        this.switchTo(parseInt(e.key) - 1);
      }
      // Ctrl + Left/Right arrows: switch space
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        this.switchTo(Math.max(0, this.current - 1));
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        this.switchTo(Math.min(this.maxSpaces - 1, this.current + 1));
      }
      // F3 or Ctrl+Up: show overview
      if (e.key === 'F3' || ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp')) {
        e.preventDefault();
        this.toggleOverview();
      }
      // Escape closes overview
      if (e.key === 'Escape' && overview.classList.contains('visible')) {
        this.closeOverview();
      }
    });

    // Initialize all windows to space 0
    document.querySelectorAll('.mac-window').forEach(win => {
      this.windows[win.id] = 0;
    });

    // Watch for new windows being opened
    const origOpen = window.openApp;
    if (typeof origOpen === 'function') {
      window.openApp = function(appName) {
        origOpen(appName);
        setTimeout(() => {
          const win = document.querySelector('.mac-window[style*="display: block"], .mac-window:not([style*="display: none"])');
          if (win && spaces.windows[win.id] === undefined) {
            spaces.windows[win.id] = spaces.current;
          }
        }, 50);
      };
    }
  },

  isInputFocused() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.contentEditable === 'true');
  },

  switchTo(index) {
    if (index < 0 || index >= this.maxSpaces || index === this.current) return;
    const direction = index > this.current ? 'left' : 'right';
    const prev = this.current;
    this.current = index;

    // Update dots
    document.querySelectorAll('.spaces-dot').forEach(d => d.classList.remove('active'));
    const activeDot = document.querySelector(`.spaces-dot[data-space="${index}"]`);
    if (activeDot) activeDot.classList.add('active');

    // Animate and show/hide windows
    const container = document.getElementById('windowsContainer');
    container.classList.remove('space-transition-left', 'space-transition-right');
    void container.offsetWidth; // reflow
    container.classList.add(direction === 'left' ? 'space-transition-left' : 'space-transition-right');

    document.querySelectorAll('.mac-window').forEach(win => {
      const winSpace = this.windows[win.id] !== undefined ? this.windows[win.id] : 0;
      if (winSpace === index) {
        win.style.display = '';
        win.style.visibility = '';
      } else {
        win.style.visibility = 'hidden';
        // keep display so layout isn't broken
      }
    });

    // Update desktop icons visibility (all spaces share desktop icons)
    setTimeout(() => container.classList.remove('space-transition-left', 'space-transition-right'), 400);
  },

  assignCurrentSpace(windowId) {
    this.windows[windowId] = this.current;
  },

  addSpace() {
    if (this.maxSpaces >= 8) return;
    this.maxSpaces++;
    const indicator = document.getElementById('spacesIndicator');
    const addBtn = document.getElementById('spacesAddBtn');
    const dot = document.createElement('div');
    dot.className = 'spaces-dot';
    dot.dataset.space = this.maxSpaces - 1;
    dot.title = `Desktop ${this.maxSpaces}`;
    dot.addEventListener('click', () => this.switchTo(parseInt(dot.dataset.space)));
    indicator.insertBefore(dot, addBtn);
  },

  removeSpace(index) {
    if (this.maxSpaces <= 1 || index === 0) return;
    // Move windows from removed space to space 0
    Object.keys(this.windows).forEach(wid => {
      if (this.windows[wid] === index) this.windows[wid] = 0;
    });
    // Re-index spaces > index
    Object.keys(this.windows).forEach(wid => {
      if (this.windows[wid] > index) this.windows[wid]--;
    });
    this.maxSpaces--;
    if (this.current >= this.maxSpaces) this.current = this.maxSpaces - 1;
    this.rebuildIndicator();
    this.switchTo(this.current);
    this.renderOverview();
  },

  rebuildIndicator() {
    const indicator = document.getElementById('spacesIndicator');
    const addBtn = document.getElementById('spacesAddBtn');
    indicator.querySelectorAll('.spaces-dot').forEach(d => d.remove());
    for (let i = 0; i < this.maxSpaces; i++) {
      const dot = document.createElement('div');
      dot.className = 'spaces-dot' + (i === this.current ? ' active' : '');
      dot.dataset.space = i;
      dot.title = `Desktop ${i + 1}`;
      dot.addEventListener('click', () => this.switchTo(parseInt(dot.dataset.space)));
      indicator.insertBefore(dot, addBtn);
    }
  },

  toggleOverview() {
    const overview = document.getElementById('spacesOverview');
    if (overview.classList.contains('visible')) {
      this.closeOverview();
    } else {
      this.openOverview();
    }
  },

  openOverview() {
    this.renderOverview();
    document.getElementById('spacesOverview').classList.add('visible');
  },

  closeOverview() {
    document.getElementById('spacesOverview').classList.remove('visible');
  },

  renderOverview() {
    const grid = document.getElementById('spacesOverviewGrid');
    grid.innerHTML = '';
    for (let i = 0; i < this.maxSpaces; i++) {
      const card = document.createElement('div');
      card.className = 'spaces-overview-card' + (i === this.current ? ' active-space' : '');
      card.dataset.space = i;

      // Count windows in this space
      const winCount = Object.values(this.windows).filter(s => s === i).length;

      card.innerHTML = `
        <div class="spaces-overview-card-icon"><i class="ri-computer-line"></i></div>
        <div class="spaces-overview-card-windows">
          ${Array(Math.min(winCount, 12)).fill(0).map(() => '<div class="spaces-overview-win"></div>').join('')}
        </div>
        <div class="spaces-overview-card-label">Desktop ${i + 1}${winCount ? ' • ' + winCount + ' window' + (winCount > 1 ? 's' : '') : ''}</div>
        ${i > 0 ? '<button class="spaces-overview-card-close" title="Remove"><i class="ri-close-line"></i></button>' : ''}
      `;
      grid.appendChild(card);
    }
  },

  showIndicatorBriefly() {
    const indicator = document.getElementById('spacesIndicator');
    indicator.classList.add('visible');
    setTimeout(() => indicator.classList.remove('visible'), 2500);
  }
};

// ---- Weather App ----
const hourlyData = ['Now', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];
const hourlyTemps = [72, 74, 76, 77, 78, 77, 75, 72, 69, 66];
const hourlyIcons = ['ri-sun-line', 'ri-sun-line', 'ri-sun-line', 'ri-sun-line', 'ri-sun-cloudy-line', 'ri-sun-cloudy-line', 'ri-cloudy-line', 'ri-cloudy-line', 'ri-moon-line', 'ri-moon-line'];

function initWeatherApp() {
  if (document.getElementById('weatherHourly').children.length > 0) return;
  renderWeatherHourly();
  renderWeather10Day();
}

function renderWeatherHourly() {
  const el = document.getElementById('weatherHourly');
  el.innerHTML = '<div class="weather-hourly-label">Hourly Forecast</div><div class="weather-hourly-scroll">' +
    hourlyData.map((h, i) =>
      '<div class="weather-hourly-item' + (i === 0 ? ' current' : '') + '">' +
        '<div class="weather-hourly-time">' + h + '</div>' +
        '<i class="' + hourlyIcons[i] + '"></i>' +
        '<div class="weather-hourly-temp">' + hourlyTemps[i] + '°</div>' +
      '</div>'
    ).join('') + '</div>';
}

function renderWeather10Day() {
  const el = document.getElementById('weather10day');
  el.innerHTML = '<div class="weather-10day-label">10-Day Forecast</div><div class="weather-10day-list">' +
    weatherDays.map(d =>
      '<div class="weather-10day-row">' +
        '<div class="weather-10day-name">' + d.name + '</div>' +
        '<i class="' + d.icon + '"></i>' +
        '<div class="weather-10day-bars">' +
          '<div class="weather-10day-bar">' +
            '<div class="weather-10day-fill" style="left:' + ((d.lo - 50) / 30 * 100) + '%;width:' + ((d.hi - d.lo) / 30 * 100) + '%"></div>' +
          '</div>' +
        '</div>' +
        '<div class="weather-10day-temps"><span class="weather-10day-hi">' + d.hi + '°</span><span class="weather-10day-lo">' + d.lo + '°</span></div>' +
      '</div>'
    ).join('') + '</div>';
}

// ---- App Store ----
const storeApps = [
  { name: 'Final Cut Pro', desc: 'Professional video editing', icon: 'ri-film-line', color: '#FF2D55', price: '$299.99', rating: 4.7, category: 'Video' },
  { name: 'Logic Pro', desc: 'Music production studio', icon: 'ri-music-2-line', color: '#FF9500', price: '$199.99', rating: 4.8, category: 'Music' },
  { name: 'Pixelmator Pro', desc: 'Image editing tool', icon: 'ri-brush-line', color: '#AF52DE', price: '$49.99', rating: 4.6, category: 'Graphics' },
  { name: 'Things 3', desc: 'Personal task manager', icon: 'ri-checkbox-line', color: '#007AFF', price: '$9.99', rating: 4.9, category: 'Productivity' },
  { name: 'Bear', desc: 'Markdown note taking', icon: 'ri-file-text-line', color: '#34C759', price: '$14.99', rating: 4.5, category: 'Productivity' },
  { name: 'Pocket', desc: 'Save articles for later', icon: 'ri-bookmark-line', color: '#FF3B30', price: 'Free', rating: 4.3, category: 'Reading' },
  { name: 'Darkroom', desc: 'Photo editor & filter', icon: 'ri-camera-line', color: '#5856D6', price: '$19.99', rating: 4.4, category: 'Photography' },
  { name: 'Spark Mail', desc: 'Smart email client', icon: 'ri-mail-line', color: '#007AFF', price: 'Free', rating: 4.2, category: 'Business' },
  { name: 'Tweetbot', desc: 'Twitter client', icon: 'ri-twitter-line', color: '#1DA1F2', price: '$5.99', rating: 4.1, category: 'Social' },
  { name: '1Password', desc: 'Password manager', icon: 'ri-lock-line', color: '#FF9500', price: '$35.99/yr', rating: 4.8, category: 'Utilities' }
];

const storeCategories = ['Video', 'Music', 'Graphics', 'Productivity', 'Reading', 'Photography', 'Business', 'Social', 'Utilities'];
let appStoreInstalled = ['Calculator.app', 'TextEdit.app', 'Terminal.app', 'Activity Monitor.app', 'System Settings.app', 'Preview.app', 'Safari.app', 'Google Chrome.app', 'YouTube.app', 'Notes.app', 'Music.app', 'Disk Utility.app', 'Clock.app', 'Reminders.app', 'Console.app', 'Downloads.app', 'Time Machine.app', 'Screen Recording.app', 'Weather.app'];

function initAppStore() {
  const main = document.getElementById('appstoreMain');
  if (!main) return;
  showStoreTab('featured');
  document.querySelectorAll('.appstore-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.appstore-sidebar-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      showStoreTab(item.dataset.tab);
    });
  });
}

function showStoreTab(tab) {
  const main = document.getElementById('appstoreMain');
  if (tab === 'featured') {
    main.innerHTML =
      '<div class="appstore-banner"><i class="ri-apps-line"></i><div><div class="appstore-banner-title">Discover New Apps</div><div class="appstore-banner-desc">Explore top apps for Thread OS</div></div></div>' +
      '<div class="appstore-section"><div class="appstore-section-title">Featured</div><div class="appstore-grid">' +
      storeApps.slice(0, 6).map(a => renderStoreAppCard(a)).join('') +
      '</div></div>' +
      '<div class="appstore-section"><div class="appstore-section-title">Top Free</div><div class="appstore-grid">' +
      storeApps.filter(a => a.price === 'Free').map(a => renderStoreAppCard(a)).join('') +
      '</div></div>';
  } else if (tab === 'categories') {
    main.innerHTML =
      '<div class="appstore-section"><div class="appstore-section-title">Categories</div><div class="appstore-categories">' +
      storeCategories.map(c => {
        const icons = { 'Video': 'ri-film-line', 'Music': 'ri-music-2-line', 'Graphics': 'ri-brush-line', 'Productivity': 'ri-checkbox-line', 'Reading': 'ri-bookmark-line', 'Photography': 'ri-camera-line', 'Business': 'ri-mail-line', 'Social': 'ri-twitter-line', 'Utilities': 'ri-lock-line' };
        const colors = { 'Video': '#FF2D55', 'Music': '#FF9500', 'Graphics': '#AF52DE', 'Productivity': '#007AFF', 'Reading': '#FF3B30', 'Photography': '#5856D6', 'Business': '#007AFF', 'Social': '#1DA1F2', 'Utilities': '#FF9500' };
        return '<div class="appstore-category-card"><div class="appstore-category-icon" style="background:' + colors[c] + '20;color:' + colors[c] + '"><i class="' + icons[c] + '"></i></div><div class="appstore-category-name">' + c + '</div></div>';
      }).join('') +
      '</div></div>';
  } else if (tab === 'top') {
    const sorted = [...storeApps].sort((a, b) => b.rating - a.rating);
    main.innerHTML =
      '<div class="appstore-section"><div class="appstore-section-title">Top Charts</div><div class="appstore-top-list">' +
      sorted.map((a, i) => '<div class="appstore-top-item"><div class="appstore-top-rank">' + (i + 1) + '</div>' + renderStoreAppCard(a) + '</div>').join('') +
      '</div></div>';
  } else if (tab === 'arcade') {
    main.innerHTML =
      '<div class="appstore-banner" style="background:linear-gradient(135deg,#662D91,#007AFF)"><i class="ri-gamepad-line"></i><div><div class="appstore-banner-title">Arcade</div><div class="appstore-banner-desc">Play unlimited games. No ads.</div></div></div>' +
      '<div class="appstore-section"><div class="appstore-section-title">Arcade Games</div><div class="appstore-grid">' +
      storeApps.slice(0, 4).map(a => renderStoreAppCard({ ...a, name: a.name + ' Arcade', desc: 'Arcade edition', price: 'Arcade' })).join('') +
      '</div></div>';
  } else {
    main.innerHTML = '<div style="padding:40px;text-align:center;color:var(--mac-text-muted);font-size:15px">' + tab.charAt(0).toUpperCase() + tab.slice(1) + '</div>';
  }
}

function renderStoreAppCard(a) {
  const isInstalled = appStoreInstalled.some(i => i.toLowerCase().includes(a.name.toLowerCase().split(' ')[0]));
  return '<div class="appstore-app-card">' +
    '<div class="appstore-app-icon" style="background:' + a.color + '20;color:' + a.color + '"><i class="' + a.icon + '"></i></div>' +
    '<div class="appstore-app-info"><div class="appstore-app-name">' + a.name + '</div><div class="appstore-app-desc">' + a.desc + '</div></div>' +
    '<div class="appstore-app-footer"><span class="appstore-app-price">' + a.price + '</span>' +
    '<button class="appstore-get-btn' + (isInstalled ? ' installed' : '') + '" onclick="' + (isInstalled ? '' : 'storeInstall(this,\'' + a.name + '\')') + '"' + (isInstalled ? ' disabled' : '') + '>' + (isInstalled ? 'Installed' : 'Get') + '</button></div>' +
    '<div class="appstore-rating"><i class="ri-star-fill"></i> ' + a.rating + '</div></div>';
}

function storeInstall(btn, name) {
  btn.textContent = 'Installing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Installed';
    btn.classList.add('installed');
    showNotification('App Store', name + ' installed successfully');
  }, 1500);
}

// ---- Dictionary ----
const dictionary = {
  'abandon': { pos: 'verb', def: 'To leave behind or give up completely', example: 'They had to abandon the project due to lack of funds.' },
  'benevolent': { pos: 'adjective', def: 'Well-meaning and kindly', example: 'The benevolent donor contributed to many charities.' },
  'cascade': { pos: 'noun', def: 'A small waterfall or series of waterfalls', example: 'The water flowed down the cascade into the pool.' },
  'diligent': { pos: 'adjective', def: 'Having or showing care in one\'s work or duties', example: 'She was a diligent student who always completed her homework.' },
  'eloquent': { pos: 'adjective', def: 'Fluent or persuasive in speaking or writing', example: 'He delivered an eloquent speech at the ceremony.' },
  'frugal': { pos: 'adjective', def: 'Sparing or economical with regard to money or food', example: 'They lived a frugal life, saving every penny.' },
  'gregarious': { pos: 'adjective', def: 'Fond of company; sociable', example: 'He was a gregarious person who loved parties.' },
  'harbinger': { pos: 'noun', def: 'A person or thing that announces or signals the approach of another', example: 'The robin is a harbinger of spring.' },
  'idyllic': { pos: 'adjective', def: 'Extremely happy, peaceful, or picturesque', example: 'They lived in an idyllic cottage in the countryside.' },
  'jubilant': { pos: 'adjective', def: 'Feeling or expressing great happiness and triumph', example: 'The fans were jubilant after the victory.' },
  'kinetic': { pos: 'adjective', def: 'Relating to or resulting from motion', example: 'The kinetic energy of the moving car was immense.' },
  'luminous': { pos: 'adjective', def: 'Full of or shedding light; bright or shining', example: 'The luminous stars lit up the night sky.' },
  'meticulous': { pos: 'adjective', def: 'Showing great attention to detail; very careful and precise', example: 'The meticulous craftsman checked every stitch.' },
  'nostalgia': { pos: 'noun', def: 'A sentimental longing for the past', example: 'The old photographs filled her with nostalgia.' },
  'opulent': { pos: 'adjective', def: 'Ostentatiously rich and luxurious or lavish', example: 'The opulent palace was decorated with gold.' },
  'pragmatic': { pos: 'adjective', def: 'Dealing with things sensibly and realistically', example: 'We need a pragmatic approach to solve this problem.' },
  'quiescent': { pos: 'adjective', def: 'In a state or period of inactivity or dormancy', example: 'The volcano remained quiescent for centuries.' },
  'resilient': { pos: 'adjective', def: 'Able to recover quickly from difficult conditions', example: 'The resilient community rebuilt after the storm.' },
  'serendipity': { pos: 'noun', def: 'The occurrence of events by chance in a happy way', example: 'Finding that book was pure serendipity.' },
  'tenacious': { pos: 'adjective', def: 'Tending to keep a firm hold of something; persistent', example: 'The tenacious reporter would not give up on the story.' },
  'ubiquitous': { pos: 'adjective', def: 'Present, appearing, or found everywhere', example: 'Smartphones have become ubiquitous in modern society.' },
  'verbose': { pos: 'adjective', def: 'Using or expressed in more words than are needed', example: 'His verbose explanation confused everyone.' },
  'whimsical': { pos: 'adjective', def: 'Playfully quaint or fanciful, especially in an appealing way', example: 'The garden had a whimsical fairy-tale quality.' },
  'xenial': { pos: 'adjective', def: 'Relating to hospitality towards guests', example: 'Their xenial welcome made us feel at home.' },
  'yearning': { pos: 'noun', def: 'A feeling of intense longing for something', example: 'She felt a yearning to travel the world.' },
  'zealous': { pos: 'adjective', def: 'Having or showing great energy or enthusiasm for a cause', example: 'The zealous volunteer worked tirelessly.' }
};

const wordOfTheDay = ['serendipity', 'eloquent', 'meticulous', 'resilient', 'ubiquitous', 'whimsical', 'pragmatic'];

function initDictionary() {
  const today = new Date().getDay();
  const wotd = wordOfTheDay[today % wordOfTheDay.length];
  const entry = dictionary[wotd];
  if (entry) {
    document.getElementById('dictWotd').innerHTML =
      '<div class="dict-wotd-label">Word of the Day</div>' +
      '<div class="dict-wotd-word">' + wotd + '</div>' +
      '<div class="dict-wotd-pos">' + entry.pos + '</div>' +
      '<div class="dict-wotd-def">' + entry.def + '</div>';
  }
}

function dictLookup(query) {
  const q = query.trim().toLowerCase();
  const content = document.getElementById('dictContent');
  if (!q) {
    content.innerHTML =
      '<div class="dict-welcome"><i class="ri-book-open-line"></i><div class="dict-welcome-title">Dictionary</div><div class="dict-welcome-desc">Search for a word to see its definition</div></div>';
    return;
  }
  const entry = dictionary[q];
  if (entry) {
    content.innerHTML =
      '<div class="dict-result">' +
        '<div class="dict-result-word">' + q + '</div>' +
        '<div class="dict-result-pos">' + entry.pos + '</div>' +
        '<div class="dict-result-def">' + entry.def + '</div>' +
        '<div class="dict-result-example"><em>"' + entry.example + '"</em></div>' +
      '</div>';
  } else {
    const similar = Object.keys(dictionary).filter(w => w.includes(q) || q.includes(w)).slice(0, 5);
    content.innerHTML =
      '<div class="dict-notfound"><i class="ri-question-line"></i><div class="dict-notfound-title">Word not found</div><div class="dict-notfound-desc">No definition found for "' + q + '"</div>' +
      (similar.length ? '<div class="dict-similar">Did you mean: ' + similar.map(w => '<span class="dict-similar-word" onclick="dictLookup(\'' + w + '\')">' + w + '</span>').join(', ') + '</div>' : '') +
      '</div>';
  }
}

// ---- Voice Memos ----
let vmState = { recording: false, timer: null, seconds: 0, recordings: [], animFrame: null };

function initVoiceMemos() {
  if (vmState.recordings.length === 0) renderVmRecordings();
}

function vmStartRecording() {
  if (vmState.recording) return;
  vmState.recording = true;
  vmState.seconds = 0;
  document.getElementById('vmRecordBtn').disabled = true;
  document.getElementById('vmStopBtn').disabled = false;
  updateVmTimer();
  vmState.timer = setInterval(() => { vmState.seconds++; updateVmTimer(); }, 1000);
  const canvas = document.getElementById('vmWaveform');
  const ctx = canvas.getContext('2d');
  let offset = 0;
  function draw() {
    if (!vmState.recording) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#FF9500';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + Math.sin((x + offset) * 0.05) * (Math.random() * 20 + 10);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    offset += 2;
    vmState.animFrame = requestAnimationFrame(draw);
  }
  draw();
}

function vmStopRecording() {
  if (!vmState.recording) return;
  vmState.recording = false;
  clearInterval(vmState.timer);
  if (vmState.animFrame) cancelAnimationFrame(vmState.animFrame);
  document.getElementById('vmRecordBtn').disabled = false;
  document.getElementById('vmStopBtn').disabled = true;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const m = Math.floor(vmState.seconds / 60);
  const s = vmState.seconds % 60;
  vmState.recordings.unshift({ date: dateStr, duration: m + ':' + String(s).padStart(2, '0') });
  renderVmRecordings();
}

function updateVmTimer() {
  const m = Math.floor(vmState.seconds / 60);
  const s = vmState.seconds % 60;
  document.getElementById('vmTimer').textContent = m + ':' + String(s).padStart(2, '0');
}

function renderVmRecordings() {
  const list = document.getElementById('vmRecordingsList');
  if (!list) return;
  if (vmState.recordings.length === 0) { list.innerHTML = '<div class="vm-empty">No recordings</div>'; return; }
  list.innerHTML = vmState.recordings.map((r, i) =>
    '<div class="vm-recording-item"><div class="vm-recording-info"><div class="vm-recording-name">Recording ' + (i + 1) + '</div><div class="vm-recording-meta">' + r.date + ' • ' + r.duration + '</div></div><button class="vm-recording-delete" onclick="vmDeleteRecording(' + i + ')"><i class="ri-delete-bin-line"></i></button></div>'
  ).join('');
}

function vmDeleteRecording(i) { vmState.recordings.splice(i, 1); renderVmRecordings(); }
function vmClearAll() { vmState.recordings = []; renderVmRecordings(); }

// ---- Stickies ----
let stickiesData = [
  { id: 1, text: 'Welcome to Stickies!\n\nDouble-click to edit.\nPress Cmd+Enter to save.', color: '#FFF9C4', x: 20, y: 20 },
  { id: 2, text: 'Ideas for Thread OS:\n- More apps\n- Widget support\n- Dark mode', color: '#C8E6C9', x: 220, y: 20 }
];
let stickiesIdCounter = 3;
let stickiesEditing = null;

function initStickies() { renderStickies(); }

function renderStickies() {
  const grid = document.getElementById('stickiesGrid');
  if (!grid) return;
  grid.innerHTML = stickiesData.map(s =>
    '<div class="stickie-note" style="background:' + s.color + ';left:' + s.x + 'px;top:' + s.y + 'px" data-id="' + s.id + '">' +
      '<div class="stickie-header"><span class="stickie-date">' + new Date().toLocaleDateString() + '</span><button class="stickie-delete" onclick="stickiesDelete(' + s.id + ')"><i class="ri-close-line"></i></button></div>' +
      '<div class="stickie-text" id="stickieText' + s.id + '" ondblclick="stickiesEdit(' + s.id + ')">' + s.text.replace(/\n/g, '<br>') + '</div>' +
      '<textarea class="stickie-editor" id="stickieEditor' + s.id + '" style="display:none" onkeydown="if(event.metaKey&&event.key===\'Enter\')stickiesSave(' + s.id + ')">' + s.text + '</textarea>' +
    '</div>'
  ).join('');
}

function stickiesAdd() {
  const colors = ['#FFF9C4', '#C8E6C9', '#BBDEFB', '#F8BBD0', '#E1BEE7', '#FFE0B2'];
  const color = colors[stickiesData.length % colors.length];
  stickiesData.push({ id: stickiesIdCounter++, text: 'New note\n\nType your text here...', color: color, x: 40 + stickiesData.length * 20 % 200, y: 40 + stickiesData.length * 20 % 200 });
  renderStickies();
}

function stickiesDelete(id) { stickiesData = stickiesData.filter(s => s.id !== id); renderStickies(); }

function stickiesEdit(id) {
  if (stickiesEditing) document.getElementById('stickieEditor' + stickiesEditing).style.display = 'none';
  stickiesEditing = id;
  document.getElementById('stickieText' + id).style.display = 'none';
  document.getElementById('stickieEditor' + id).style.display = '';
  document.getElementById('stickieEditor' + id).focus();
}

function stickiesSave(id) {
  const s = stickiesData.find(s => s.id === id);
  if (!s) return;
  s.text = document.getElementById('stickieEditor' + id).value;
  stickiesEditing = null;
  renderStickies();
}

// ---- System Report ----
const sysInfo = {
  hardware: [
    ['Model Name', 'Thread OS Machine'],
    ['Chip', 'Apple M2 Pro'],
    ['Total Cores', '12 (8 performance, 4 efficiency)'],
    ['GPU', 'Apple 19-core GPU'],
    ['Neural Engine', '16-core'],
    ['Serial Number', 'FVFZ2XKMD6']
  ],
  memory: [
    ['Total Memory', '16 GB'],
    ['Type', 'LPDDR5'],
    ['Speed', '6400 MHz'],
    ['Used', '7.2 GB'],
    ['Free', '8.8 GB']
  ],
  storage: [
    ['Device', 'Macintosh HD'],
    ['Capacity', '512 GB'],
    ['Available', '347.2 GB'],
    ['Used', '164.8 GB'],
    ['Format', 'APFS']
  ],
  network: [
    ['Wi-Fi', 'Connected'],
    ['IP Address', '192.168.1.42'],
    ['Router', '192.168.1.1'],
    ['DNS', '8.8.8.8'],
    ['MAC Address', 'A4:5E:60:12:34:56'],
    ['Interface', 'en0']
  ],
  software: [
    ['Operating System', 'Thread OS 1.0.0'],
    ['Build', '24A123'],
    ['Kernel', 'HTML5/CSS3/JS'],
    ['Browser', 'WebKit 620.x'],
    ['Shell', 'thread-term 1.0'],
    ['Time Since Boot', '1 day, 3:42']
  ]
};

function initSysReport() {
  showSysReportCat('hardware');
  document.querySelectorAll('.sysreport-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sysreport-sidebar-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      showSysReportCat(item.dataset.cat);
    });
  });
}

function showSysReportCat(cat) {
  const data = sysInfo[cat] || sysInfo.hardware;
  const icons = { hardware: 'ri-cpu-line', storage: 'ri-hard-drive-line', memory: 'ri-database-line', network: 'ri-wifi-line', software: 'ri-code-line' };
  document.getElementById('sysreportContent').innerHTML =
    '<div class="sysreport-cat-header"><i class="' + (icons[cat] || 'ri-information-line') + '"></i> ' + cat.charAt(0).toUpperCase() + cat.slice(1) + '</div>' +
    '<div class="sysreport-table">' +
    data.map(r => '<div class="sysreport-row"><span class="sysreport-label">' + r[0] + '</span><span class="sysreport-value">' + r[1] + '</span></div>').join('') +
    '</div>';
}

// ---- Network Utility ----
let netutilCurrentTool = 'ping';

function initNetUtil() {
  document.querySelectorAll('.netutil-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.netutil-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      netutilCurrentTool = tab.dataset.tool;
      document.getElementById('netutilOutput').innerHTML = '<div class="netutil-placeholder">Enter a hostname or IP address and click Run</div>';
    });
  });
}

function netutilRun() {
  const input = document.getElementById('netutilInput').value.trim();
  if (!input) return;
  const output = document.getElementById('netutilOutput');
  const tool = netutilCurrentTool;
  let lines = [];
  const now = new Date().toLocaleTimeString();

  if (tool === 'ping') {
    lines = [
      'PING ' + input + ' (192.168.1.1): 56 data bytes',
      '64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=2.34 ms',
      '64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=2.12 ms',
      '64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=1.98 ms',
      '64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=2.45 ms',
      '64 bytes from 192.168.1.1: icmp_seq=4 ttl=64 time=2.01 ms',
      '',
      '--- ' + input + ' ping statistics ---',
      '5 packets transmitted, 5 packets received, 0% packet loss',
      'round-trip min/avg/max = 1.98/2.18/2.45 ms'
    ];
  } else if (tool === 'lookup') {
    lines = [
      'Trying: ' + input,
      'Server: 8.8.8.8',
      'Address: 8.8.8.8#53',
      '',
      'Non-authoritative answer:',
      'Name: ' + input,
      'Address: 142.250.80.46',
      'Aliases: www.google.com'
    ];
  } else if (tool === 'traceroute') {
    lines = [
      'traceroute to ' + input + ' (142.250.80.46), 64 hops max',
      ' 1  192.168.1.1   2.34 ms   2.12 ms   1.98 ms',
      ' 2  10.0.0.1     5.67 ms   5.45 ms   5.22 ms',
      ' 3  72.14.234.1   12.3 ms   11.8 ms   12.1 ms',
      ' 4  108.170.252.1  14.2 ms   13.9 ms   14.5 ms',
      ' 5  142.250.80.46   16.8 ms   16.2 ms   16.5 ms'
    ];
  } else if (tool === 'whois') {
    lines = [
      'Whois lookup for: ' + input,
      '',
      'Domain Name: ' + input,
      'Registry Domain ID: 123456789',
      'Creation Date: 1997-09-15',
      'Expiration Date: 2028-09-14',
      'Name Server: NS1.GOOGLE.COM',
      'Name Server: NS2.GOOGLE.COM',
      'Registrar: Registrar Corp',
      'DNSSEC: unsigned'
    ];
  }

  output.innerHTML = '<div class="netutil-tool-label">' + tool.charAt(0).toUpperCase() + tool.slice(1) + ' ' + input + ' (' + now + ')</div>' +
    lines.map(l => '<div class="netutil-line' + (l.includes('packet loss') && l.includes('0%') ? ' success' : l.includes('packet loss') ? ' error' : '') + '">' + l + '</div>').join('');
}

// ---- Font Book ----
const fonts = [
  { name: 'San Francisco', family: '-apple-system, BlinkMacSystemFont', category: 'sans' },
  { name: 'Inter', family: 'Inter', category: 'sans' },
  { name: 'Helvetica Neue', family: 'Helvetica Neue', category: 'sans' },
  { name: 'Arial', family: 'Arial', category: 'sans' },
  { name: 'Times New Roman', family: 'Times New Roman', category: 'serif' },
  { name: 'Georgia', family: 'Georgia', category: 'serif' },
  { name: 'Palatino', family: 'Palatino', category: 'serif' },
  { name: 'Baskerville', family: 'Baskerville', category: 'serif' },
  { name: 'Courier New', family: 'Courier New', category: 'mono' },
  { name: 'Menlo', family: 'Menlo', category: 'mono' },
  { name: 'Monaco', family: 'Monaco', category: 'mono' },
  { name: 'SF Mono', family: 'SF Mono', category: 'mono' },
  { name: 'Brush Script MT', family: 'Brush Script MT', category: 'script' },
  { name: 'Apple Chancery', family: 'Apple Chancery', category: 'script' },
  { name: 'Snell Roundhand', family: 'Snell Roundhand', category: 'script' }
];
let fontbookCurrentCategory = 'all';

function initFontBook() {
  fontbookRenderList();
  document.querySelectorAll('.fontbook-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.fontbook-sidebar-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      fontbookCurrentCategory = item.dataset.collection;
      fontbookRenderList();
    });
  });
}

function fontbookRenderList() {
  const list = document.getElementById('fontbookList');
  if (!list) return;
  const filtered = fontbookCurrentCategory === 'all' ? fonts : fonts.filter(f => f.category === fontbookCurrentCategory);
  list.innerHTML = filtered.map(f =>
    '<div class="fontbook-list-item" onclick="fontbookSelect(\'' + f.family.replace(/'/g, '\\\'') + '\',\'' + f.name.replace(/'/g, '\\\'') + '\')">' +
      '<span style="font-family:' + f.family + '">' + f.name + '</span>' +
    '</div>'
  ).join('');
  if (filtered.length > 0) fontbookSelect(filtered[0].family.replace(/'/g, '\\\''), filtered[0].name.replace(/'/g, '\\\''));
}

function fontbookSelect(family, name) {
  document.querySelectorAll('.fontbook-list-item').forEach(i => i.classList.remove('active'));
  const items = document.querySelectorAll('.fontbook-list-item');
  for (const item of items) {
    if (item.textContent.trim() === name) item.classList.add('active');
  }
  document.getElementById('fontbookPreviewName').textContent = name;
  document.getElementById('fontbookPreviewText').style.fontFamily = family;
  document.getElementById('fontbookSample').style.fontFamily = family;
  fontbookUpdatePreview();
}

function fontbookUpdatePreview() {
  const size = parseInt(document.getElementById('fontbookSizeSlider').value);
  document.getElementById('fontbookSizeLabel').textContent = size + 'px';
  document.getElementById('fontbookPreviewText').style.fontSize = size + 'px';
  document.getElementById('fontbookSample').style.fontSize = Math.min(size, 36) + 'px';
}

// ---- Screen Recording ----
let srState = { recording: false, timer: null, seconds: 0, recordings: [] };

function srStartRecording() {
  if (srState.recording) return;
  srState.recording = true;
  srState.seconds = 0;
  document.getElementById('srStartBtn').disabled = true;
  document.getElementById('srStopBtn').disabled = false;
  document.getElementById('srStatus').textContent = 'Recording...';
  document.getElementById('srStatus').style.color = '#FF3B30';
  updateSrTimer();
  srState.timer = setInterval(() => {
    srState.seconds++;
    updateSrTimer();
  }, 1000);
  showNotification('Screen Recording', 'Recording started');
}

function srStopRecording() {
  if (!srState.recording) return;
  srState.recording = false;
  clearInterval(srState.timer);
  document.getElementById('srStartBtn').disabled = false;
  document.getElementById('srStopBtn').disabled = true;
  document.getElementById('srStatus').textContent = 'Ready to record';
  document.getElementById('srStatus').style.color = '';
  const dur = formatSrTime(srState.seconds);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  srState.recordings.unshift({ duration: dur, date: dateStr + ' at ' + timeStr, size: (Math.random() * 50 + 5).toFixed(1) + ' MB' });
  renderSrRecordings();
  showNotification('Screen Recording', 'Recording saved (' + dur + ')');
}

function updateSrTimer() {
  document.getElementById('srTimer').textContent = formatSrTime(srState.seconds);
}

function formatSrTime(s) {
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return h + ':' + m + ':' + sec;
}

function renderSrRecordings() {
  const list = document.getElementById('srRecordingsList');
  if (!list) return;
  if (srState.recordings.length === 0) {
    list.innerHTML = '<div class="sr-empty">No recordings yet</div>';
    return;
  }
  list.innerHTML = srState.recordings.map((r, i) =>
    '<div class="sr-recording-item">' +
      '<div class="sr-recording-info">' +
        '<div class="sr-recording-name">Recording ' + (i + 1) + '</div>' +
        '<div class="sr-recording-meta">' + r.date + ' • ' + r.duration + ' • ' + r.size + '</div>' +
      '</div>' +
      '<button class="sr-recording-delete" onclick="srDeleteRecording(' + i + ')"><i class="ri-delete-bin-line"></i></button>' +
    '</div>'
  ).join('');
}

function srDeleteRecording(i) {
  srState.recordings.splice(i, 1);
  renderSrRecordings();
}

function srClearAll() {
  if (srState.recordings.length === 0) return;
  srState.recordings = [];
  renderSrRecordings();
}

// Initialize spaces on load
document.addEventListener('DOMContentLoaded', () => spaces.init());
// Fallback if DOMContentLoaded already fired
if (document.readyState !== 'loading') spaces.init();

