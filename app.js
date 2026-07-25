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
  'Music.app': 'music-window'
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

function lockScreen() {
  isLocked = true;
  const ls = document.getElementById('lockScreen');
  ls.classList.add('visible');
  updateLockClock();
  document.getElementById('lockPassword').value = '';
  setTimeout(() => document.getElementById('lockPassword').focus(), 100);
}

function unlockScreen() {
  isLocked = false;
  document.getElementById('lockScreen').classList.remove('visible');
}

function attemptUnlock() {
  const pw = document.getElementById('lockPassword').value;
  // Accept any password or empty for demo
  unlockScreen();
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

  function chromeGreeting() {
    const h = new Date().getHours();
    const el = document.getElementById('chromeGreeting');
    if (!el) return;
    if (h < 12) el.textContent = 'Good morning';
    else if (h < 17) el.textContent = 'Good afternoon';
    else el.textContent = 'Good evening';
  }
  chromeGreeting();

  function chromeNavigateTo(url) {
    const fullUrl = url.startsWith('http') ? url : 'https://' + url;
    document.getElementById('chromeUrl').value = fullUrl;
    document.getElementById('chromeHomepage').style.display = 'none';
    document.getElementById('chromeFallback').style.display = 'none';
    const frame = document.getElementById('chromeFrame');
    frame.style.display = 'block';
    frame.src = fullUrl;
    frame.onerror = () => { frame.style.display = 'none'; document.getElementById('chromeFallback').style.display = 'flex'; };
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
    if (url) window.open(url, '_blank');
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
    if (frame.style.display !== 'none' && frame.src && frame.src !== 'about:blank') frame.src = frame.src;
  });
});

document.getElementById('chromeReload').addEventListener('click', () => {
  const frame = document.getElementById('chromeFrame');
  if (frame.style.display !== 'none') frame.src = frame.src;
});

// ---- YouTube ----
const youtubeVideos = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', channel: 'Rick Astley', views: '1.5B views', time: '3:33', cat: 'music', color: '#FF0000', letter: 'R' },
  { id: 'jNQXAC9IVRw', title: 'Me at the zoo', channel: 'Jawed Karim', views: '320M views', time: '0:19', cat: 'all', color: '#4285F4', letter: 'J' },
  { id: 'kJQP7kiw5Fk', title: 'Luis Fonsi - Despacito ft. Daddy Yankee', channel: 'Luis Fonsi', views: '8.1B views', time: '4:42', cat: 'music', color: '#E91E63', letter: 'L' },
  { id: 'kJQP7kiw5Fk', title: 'Top 10 JavaScript Tips & Tricks', channel: 'Traversy Media', views: '2.4M views', time: '15:20', cat: 'tech', color: '#FF6D00', letter: 'T' },
  { id: '9bZkp7q19f0', title: 'PSY - GANGNAM STYLE(강남스타일) MV', channel: 'officialpsy', views: '4.6B views', time: '4:13', cat: 'music', color: '#9C27B0', letter: 'P' },
  { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', channel: 'Queen', views: '1.8B views', time: '5:55', cat: 'music', color: '#673AB7', letter: 'Q' },
  { id: '9bZkp7q19f0', title: 'Build a macOS Clone in 1 Hour', channel: 'Fireship', views: '890K views', time: '12:08', cat: 'tech', color: '#FF5722', letter: 'F' },
  { id: 'kXYiU_JCYtU', title: 'NCS: Infinity', channel: 'NoCopyrightSounds', views: '420M views', time: '5:08', cat: 'music', color: '#00BCD4', letter: 'N' },
  { id: 'LXb3EKWsInQ', title: 'NASA Live - Earth From Space', channel: 'NASA', views: '24M views', time: 'LIVE', cat: 'live', color: '#1565C0', letter: 'N' },
  { id: 'sXQk7LN5MVk', title: 'Minecraft but AI Controls My Mouse', channel: 'Mistah MegaManFan', views: '5.2M views', time: '18:42', cat: 'gaming', color: '#4CAF50', letter: 'M' },
  { id: '60ItHLz5WEA', title: 'Alan Walker - Faded', channel: 'Alan Walker', views: '3.4B views', time: '3:33', cat: 'music', color: '#2196F3', letter: 'A' },
  { id: 'OPf0YbXqDm0', title: 'Mark Ronson - Uptown Funk ft. Bruno Mars', channel: 'MarkRonson', views: '4.5B views', time: '4:30', cat: 'music', color: '#FF9800', letter: 'M' },
  { id: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You', channel: 'Ed Sheeran', views: '5.9B views', time: '3:53', cat: 'music', color: '#E91E63', letter: 'E' },
  { id: 'RgKAFK5djSk', title: 'Wiz Khalira - See You Again ft. Charlie Puth', channel: 'Wiz Khalifa', views: '3.8B views', time: '3:57', cat: 'music', color: '#795548', letter: 'W' },
  { id: 'fJ9rUzIMcZQ', title: 'iPhone 16 Pro Review - The Best iPhone Yet?', channel: 'MKBHD', views: '12M views', time: '18:42', cat: 'tech', color: '#F44336', letter: 'M' },
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
  document.getElementById('youtubeEmbed').src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
  document.getElementById('youtubePlayerInfo').innerHTML = `
      <div class="youtube-player-back" onclick="youtubeGoHome()"><i class="ri-arrow-left-s-line"></i> Back to Home</div>
      <div class="youtube-player-title">${title}</div>
      <div class="youtube-player-channel">${channel}</div>`;
}

function youtubeGoHome() {
  document.getElementById('youtubeHomepage').style.display = 'block';
  document.getElementById('youtubePlayer').style.display = 'none';
  document.getElementById('youtubeEmbed').src = '';
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

