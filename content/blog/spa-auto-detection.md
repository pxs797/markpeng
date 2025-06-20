---
title: 前端单页应用（SPA）自动检测版本
date: 2025-06-20
---

现代前端应用大多采用单页应用（SPA）架构，首次加载后会将资源缓存至浏览器，除非用户手动刷新，否则不会重新加载最新版本。这可能导致用户停留在旧版本页面。

为了解决这个问题，我们可以在前端实现一个“版本检测机制”，定期检查是否有新版本发布，并在发现更新时提示用户刷新页面。

---

## 方案一：构建时生成版本号文件

通过构建时自动生成 `version.json` 文件，并在运行时定期拉取检测变化。

### 1. 创建构建脚本 `gen-version.js`

```js
// gen-version.js
const fs = require('fs');
const path = require('path');

const now = new Date();
const version =
  now.getFullYear().toString() +
  String(now.getMonth() + 1).padStart(2, '0') +
  String(now.getDate()).padStart(2, '0') +
  String(now.getHours()).padStart(2, '0') +
  String(now.getMinutes()).padStart(2, '0');

const versionData = { version };

fs.writeFileSync(
  path.resolve(__dirname, '../public/version.json'),
  JSON.stringify(versionData, null, 2),
  'utf-8'
);

console.log(`✅ Generated version.json: ${version}`);
```

构建时运行该脚本，例如在 `package.json` 中配置：

```json
{
  "scripts": {
    "build": "node scripts/gen-version.js && vite build"
  }
}
```

这样每次打包都会生成一个当前时间戳作为版本号的 `version.json` 文件。

---

### 2. 前端版本检测脚本 `version-check.js`

```js
let currentVersion = null;

async function fetchVersion() {
  try {
    if (
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    ) return null;

    const res = await fetch(`/version.json?_=${Date.now()}`, { cache: 'no-store' });
    const data = await res.json();
    return data.version;
  } catch (err) {
    console.error('[Version Check] 获取版本失败:', err);
    return null;
  }
}

async function checkVersion() {
  const version = await fetchVersion();
  if (!version) return;

  if (!currentVersion) {
    console.log('[Version Check] 当前版本:', version);
    currentVersion = version;
    return;
  }

  if (version !== currentVersion) {
    console.warn('[Version Check] 检测到新版本:', version);
    if (confirm('检测到新版本，是否立即刷新页面？')) {
      location.reload(true);
    }
  }
}

export function startVersionCheck(interval = 60000) {
  checkVersion();
  setInterval(checkVersion, interval);
}
```

### ✅ 优点：

* 可自定义版本格式

---

## 方案二：通过 HTML 响应头中的 ETag 或 Last-Modified

无需额外生成文件，直接利用服务器响应头来判断是否有新版本。

### 示例实现：

```js
let currentSignature = null;

async function fetchSignature() {
  try {
    if (
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    ) return null;

    const res = await fetch(location.origin, {
      method: 'HEAD',
      cache: 'no-cache',
    });

    return res.headers.get('etag') || res.headers.get('last-modified');
  } catch (err) {
    console.error('[Version Check] 获取响应头失败:', err);
    return null;
  }
}

async function checkVersion() {
  const signature = await fetchSignature();
  if (!signature) return;

  if (!currentSignature) {
    console.log('[Version Check] 当前版本签名:', signature);
    currentSignature = signature;
    return;
  }

  if (signature !== currentSignature) {
    console.warn('[Version Check] 检测到新版本:', signature);
    if (confirm('页面已更新，是否刷新以获取最新内容？')) {
      location.reload(true);
    }
  }
}

export function startVersionCheck(interval = 60000) {
  checkVersion();
  setInterval(checkVersion, interval);
}
```

### ✅ 优点：

* 无需额外配置

---
