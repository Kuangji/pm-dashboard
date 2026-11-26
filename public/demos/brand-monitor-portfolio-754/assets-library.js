(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.BrandAssetLibrary = api;
})(globalThis, function () {
  'use strict';

  const labels = { all: '全部平台', youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok' };
  const pageSize = 20;
  const keyOf = item => item.platform + ':' + item.id;
  const number = value => Number.isFinite(value) ? value.toLocaleString('zh-CN') : '—';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const hasId = value => value != null && String(value).length > 0;
  const validKey = item => item && hasId(item.id) && Object.hasOwn(labels, item.platform) && item.platform !== 'all';

  function configLabel(item) {
    const label = item.label || item.value;
    if (item.type !== 'account') return label;
    const handle = label.match(/^https?:\/\/[^/]+\/@?([^/?#]+)\/?(?:[?#].*)?$/);
    return handle ? '@' + handle[1] : label;
  }

  function formatMatchReasons(evidence) {
    let legacyGroup = 1;
    return evidence.map(reason => {
      if (typeof reason === 'string') return reason;
      const group = reason.groupNumber ?? (reason.groupRole === 'require' ? ++legacyGroup : 1);
      const prefix = '条件组 ' + group + ' · 满足任一项' + (reason.source === 'parent' ? ' · ' + reason.group : '');
      if (reason.type === 'account' && reason.source === 'parent') {
        return prefix + ' · ' + labels[reason.platform] + ' 发布账号是 ' + configLabel(reason);
      }
      const term = reason.label || reason.value;
      return prefix + ' · ' + reason.field + '命中「' + term + '」'
        + (reason.actual && reason.actual !== term ? ' · ' + reason.actual : '');
    });
  }

  function prepareScope(payload) {
    if (!payload || payload.version !== 1 || !['content', 'influencer'].includes(payload.kind)
      || !['views', 'ids'].includes(payload.mode) || !Object.hasOwn(labels, payload.platform)
      || !payload.batchId || !payload.dateStart || !payload.dateEnd || payload.dateStart > payload.dateEnd
      || !Array.isArray(payload.records) || !Array.isArray(payload.views) || !Array.isArray(payload.selectedViews)
      || payload.views.some(view => !view || !hasId(view.id) || !Array.isArray(view.keys))) {
      throw new Error('下钻范围不完整，请从来源报告重新打开。');
    }
    const views = new Map(payload.views.map(view => [view.id, view]));
    if (payload.selectedViews.some(id => !views.has(id))) throw new Error('来源子视图不可用，请重新打开报告。');
    const carried = payload.initialFilters;
    if (carried && (!Array.isArray(carried.views) || carried.views.some(id => !views.has(id))
      || !Object.hasOwn(labels, carried.platform) || payload.platform !== 'all' && carried.platform !== payload.platform
      || typeof carried.query !== 'string')) throw new Error('传入的资产筛选与来源范围不一致，请重新打开报告。');
    const records = new Map();
    for (const item of payload.records) {
      if (!validKey(item)) throw new Error('快照作品缺少平台或 ID。');
      if (payload.platform !== 'all' && item.platform !== payload.platform) continue;
      if (item.date >= payload.dateStart && item.date <= payload.dateEnd) records.set(keyOf(item), item);
    }
    const membership = new Map();
    for (const view of views.values()) {
      for (const key of new Set(view.keys)) {
        if (!records.has(key)) continue;
        if (!membership.has(key)) membership.set(key, []);
        membership.get(key).push(view.id);
      }
    }
    const accounts = new Map();
    for (const [key, record] of records) {
      if (!hasId(record.channelId)) continue;
      const accountKey = record.platform + ':' + record.channelId;
      if (!accounts.has(accountKey)) accounts.set(accountKey, {
        id: record.channelId, platform: record.platform, name: record.channel || record.channelId,
        profileMatched: false, records: [], viewIds: new Set()
      });
      const account = accounts.get(accountKey);
      account.records.push(record);
      if (record.profileMatched === true) account.profileMatched = true;
      for (const id of membership.get(key) || []) account.viewIds.add(id);
    }
    const ids = [];
    if (payload.mode === 'ids') {
      if (!Array.isArray(payload.ids) || payload.ids.some(item => !validKey(item))) throw new Error('来源名单缺少平台或 ID。');
      const provided = new Map((payload.accounts || []).map(item => [keyOf(item), item]));
      for (const key of new Set(payload.ids.map(keyOf))) {
        if (payload.kind === 'content' ? !records.has(key) : !accounts.has(key) && !provided.has(key)) {
          throw new Error('来源名单与快照不一致，请回到报告重新打开。');
        }
        if (payload.kind === 'influencer' && provided.has(key)) {
          const existing = accounts.get(key);
          const exact = provided.get(key);
          if (payload.platform !== 'all' && exact.platform !== payload.platform) throw new Error('名单中包含其他平台的账号。');
          const works = existing?.records || [];
          const inView = (record, id) => id === 'pool' || membership.get(keyOf(record))?.includes(id);
          let evidence;
          let bySide;
          if (Array.isArray(exact.records)) {
            evidence = [...new Set(exact.records.map(keyOf))].map(id => records.get(id)).filter(record => record && record.platform + ':' + record.channelId === key);
          } else if (payload.sourceViewId) {
            evidence = works.filter(record => inView(record, payload.sourceViewId));
          }
          let videoCount = exact.videoCount;
          if (payload.sideNames?.length === 2) {
            if (payload.sideIds?.length === 2) bySide = payload.sideIds.map(id => works.filter(record => inView(record, id)));
            const complete = bySide && bySide[0].length === exact.firstVideos && bySide[1].length === exact.secondVideos;
            videoCount = complete ? new Set(bySide.flat().map(keyOf)).size : null;
          }
          accounts.set(key, { ...existing, ...exact, records: works, videoCount, evidence, bySide, viewIds: existing?.viewIds || new Set() });
        }
        ids.push(key);
      }
    }
    return { payload, views, records, membership, accounts, ids };
  }

  function includesView(viewIds, selected) {
    return selected.size === 0 || Array.from(viewIds).some(id => selected.has(id));
  }

  function listRows(scope, filters = {}) {
    const { payload, records, membership, accounts, ids } = scope;
    const selected = new Set(filters.views ?? payload.selectedViews);
    const platform = filters.platform ?? payload.platform;
    const term = String(filters.query ?? '').trim().toLocaleLowerCase();
    const exact = payload.mode === 'ids';
    const content = payload.kind === 'content';
    const candidates = content ? records : accounts;
    const rows = [];
    for (const key of exact ? ids : candidates.keys()) {
      const item = candidates.get(key);
      if (platform !== 'all' && item.platform !== platform) continue;
      const viewIds = content ? membership.get(key) || [] : [...item.viewIds];
      if (!includesView(viewIds, selected)) continue;
      const words = content ? [item.title, item.id, item.channel, item.channelId] : [item.name, item.id];
      if (term && !words.some(word => String(word ?? '').toLocaleLowerCase().includes(term))) continue;
      if (content) {
        rows.push({ ...item, viewIds });
        continue;
      }
      const counted = exact ? item.evidence : item.records.filter(record => includesView(membership.get(keyOf(record)) || [], selected));
      if (!exact && !counted.some(record => record.profileMatched === true)) continue;
      const videoCount = exact && item.videoCount !== undefined ? item.videoCount : counted?.length;
      rows.push({ ...item, viewIds, evidence: counted, videoCount });
    }
    const sort = filters.sort || 'source';
    if (sort === 'source' && exact) return rows;
    if (sort === 'views') rows.sort((a, b) => (b.views ?? -1) - (a.views ?? -1) || keyOf(a).localeCompare(keyOf(b)));
    else if (sort === 'first' || sort === 'second') {
      const field = sort === 'first' ? 'firstVideos' : 'secondVideos';
      rows.sort((a, b) => b[field] - a[field] || keyOf(a).localeCompare(keyOf(b)));
    } else if (content) rows.sort((a, b) => b.date.localeCompare(a.date) || keyOf(a).localeCompare(keyOf(b)));
    else rows.sort((a, b) => (b.videoCount ?? 0) - (a.videoCount ?? 0) || keyOf(a).localeCompare(keyOf(b)));
    return rows;
  }

  function membershipNames(scope, row) {
    const names = row.viewIds.map(id => scope.views.get(id).name);
    return names.length ? names.map(name => '<span class="al-chip">' + escape(name) + '</span>').join('') : '<span class="small muted">无归属</span>';
  }

  function renderTable(scope, rows, page) {
    const { payload } = scope;
    const content = payload.kind === 'content';
    const pair = !content && payload.sideNames?.length === 2;
    let fields = payload.extraColumns || [];
    if (payload.evidenceType === 'engagement') {
      fields = [['likes', '点赞'], ['comments', '评论']];
      if (payload.platform === 'tiktok') fields.push(['shares', '分享'], ['collects', '收藏']);
    }
    const columns = content ? ['作品', '平台', '发布日期', '观看量', '子视图归属'] : ['网红', '平台', '范围内发文数', '子视图归属'];
    const body = rows.slice((page - 1) * pageSize, page * pageSize).map(row => {
      const secondary = content ? [row.channel, row.id] : [row.id, row.profileMatched === false ? '未匹配频道资料' : ''];
      const cells = content
        ? '<td>' + escape(row.date) + '</td><td class="number">' + number(row.views) + '</td>'
        : '<td class="number">' + number(row.videoCount) + '</td>';
      let evidence = '';
      if (content && fields.length) {
        evidence = '<details class="al-match" data-test="asset-interaction-evidence"><summary>查看互动明细</summary><dl>'
          + fields.map(([field, label]) => '<div><dt>' + escape(label) + '</dt><dd data-metric="' + escape(field) + '">'
            + number(row[field]) + '</dd></div>').join('') + '</dl></details>';
      }
      if (content && row.matchedConditions?.length) {
        evidence += '<details class="al-match" data-test="asset-match-evidence"><summary>查看命中原因</summary><ul>'
          + formatMatchReasons(row.matchedConditions).map(line => '<li>' + escape(line) + '</li>').join('') + '</ul></details>';
      } else if (pair) {
        evidence = payload.sideNames.map((name, side) => {
          const count = side ? row.secondVideos : row.firstVideos;
          const countLabel = escape(name) + '发文 <span data-side="' + (side ? 'second' : 'first') + '">' + number(count) + '</span> 条';
          if (!row.bySide?.[side]?.length) return '<small>' + countLabel + '</small>';
          return '<details class="al-evidence" data-which-side="' + side + '"><summary>' + countLabel + '</summary><ul></ul></details>';
        }).join('');
      } else if (!content && row.evidence?.length) {
        evidence = '<details class="al-evidence"><summary>查看 ' + number(row.evidence.length) + ' 条发文</summary><ul></ul></details>';
      }
      return '<tr data-key="' + escape(keyOf(row)) + '"><th scope="row"><strong>' + escape(content ? row.title : row.name)
        + '</strong><small>' + escape(secondary.filter(Boolean).join(' · ')) + '</small>' + evidence + '</th><td>' + labels[row.platform] + '</td>'
        + cells + '<td class="al-tags">' + membershipNames(scope, row) + '</td></tr>';
    }).join('');
    const empty = '<tr><td colspan="' + columns.length + '" class="empty" role="status">当前范围没有符合条件的'
      + (content ? '作品' : '网红') + '。</td></tr>';
    return '<div class="table-wrap" role="region" tabindex="0" aria-label="资产列表，可横向滚动"><table class="al-table"><thead><tr>'
      + columns.map(col => '<th scope="col">' + escape(col) + '</th>').join('') + '</tr></thead><tbody>' + (body || empty) + '</tbody></table></div>';
  }

  function showError(app, message) {
    app.innerHTML = '<section class="card pad" data-test="asset-error" role="alert">'
      + '<h2>无法打开资产名单</h2><p class="note">' + escape(message) + '</p></section>';
  }

  function mountInline(container, payload) {
    const component = document.createElement('div');
    container.replaceChildren(component);
    try {
      return renderLibrary(component, prepareScope(payload), true);
    } catch (error) {
      showError(component, error.message);
      return null;
    }
  }

  function openPage() {
    const app = document.getElementById('app');
    const key = new URLSearchParams(location.search).get('assetScope');
    if (!key) {
      showError(app, '链接缺少来源范围，请从品牌报告重新打开。');
      return;
    }
    const storageKey = 'brand754:assets:' + key;
    let scope;
    try {
      const data = window.BrandAssetStore.read(key);
      if (!data) throw new Error('该名单在当前浏览器中已不可用，请从报告重新打开。');
      scope = prepareScope(data);
    } catch (error) {
      showError(app, error instanceof SyntaxError || error.name === 'SecurityError' ? '无法读取本地快照，请从报告重新打开。' : error.message);
      return;
    }

    renderLibrary(app, scope, false);
    function checkAvailability() {
      try {
        if (window.BrandAssetStore.read(key)) return;
      } catch (_) {
        // A cleared or inaccessible local snapshot no longer authorizes this example.
      }
      showError(app, '来源快照已失效，请从报告重新打开。');
    }
    window.addEventListener('storage', event => {
      if (event.key === null || event.key === storageKey || event.key?.startsWith('brand754:assets:')) checkAvailability();
    });
    window.addEventListener('focus', checkAvailability);
  }

  function renderOrigin(payload) {
    let context = payload.drillContext;
    if (!Object.hasOwn(payload, 'drillContext') && !payload.entry
      && (payload.mode === 'ids' || payload.note || payload.selectedViews.length)) {
      context = { title: payload.title, definition: payload.note };
    }
    if (!context || payload.entry === 'browse') return '';
    const period = [payload.dateStart + ' 至 ' + payload.dateEnd, labels[payload.platform], '数据截至 ' + payload.cutoff, payload.batchId];
    return '<section class="al-origin" aria-label="下钻来源"><div><strong>' + escape(context.title) + '</strong></div>'
      + (context.definition ? '<p class="al-note">' + escape(context.definition) + '</p>' : '')
      + '<p>' + escape(period.join(' · ')) + '</p></section>';
  }

  function renderLibrary(app, scope, inline) {
    const { payload, views } = scope;
    const content = payload.kind === 'content';
    const exact = payload.mode === 'ids';
    const type = content ? '内容库' : '网红库';
    const unit = content ? '条作品' : '个网红';
    const initial = () => ({ views: [...payload.selectedViews], platform: payload.platform, query: '', sort: 'source' });
    const carried = payload.initialFilters;
    let filters = carried ? { views: [...new Set(carried.views)], platform: carried.platform, query: carried.query, sort: carried.sort }
      : initial();
    let page = 1;
    if (!inline) document.title = type + ' · ' + payload.brandName + ' · 聚星评审 Demo';
    const platformOptions = payload.platform === 'all' ? Object.keys(labels) : [payload.platform];
    const checkboxes = [...views].map(([id, view]) => '<label><input data-view-id="' + escape(id) + '" type="checkbox" value="' + escape(id)
      + '"><span>' + escape(view.name) + '</span></label>').join('');
    let sortOptions = exact ? '<option value="source">来源顺序</option>' : '<option value="source">' + (content ? '最新发布' : '发文数从高到低') + '</option>';
    if (content) sortOptions += '<option value="views">观看量从高到低</option>';
    else if (exact && payload.sideNames?.length === 2) {
      sortOptions += '<option value="first">' + escape(payload.sideNames[0]) + '发文数从高到低</option>'
        + '<option value="second">' + escape(payload.sideNames[1]) + '发文数从高到低</option>';
    } else if (exact) sortOptions += '<option value="videos">发文数从高到低</option>';
    const header = '<header class="topbar al-header"><span class="wordmark"><span class="logo-mark">N</span>NoxInfluencer</span>'
      + '<span class="crumbs">' + escape(payload.brandName) + ' / 营销资产库</span></header>'
      + '<main class="al-main" id="main-content" data-test="asset-library"><h1>' + type + '</h1>'
      + renderOrigin(payload);
    app.innerHTML = (inline ? '<section class="al-inline" data-test="asset-library" aria-label="' + type + '">' : header)
      + '<section class="card al-panel"><div class="al-tools"><details class="al-picker"><summary data-test="asset-view-toggle"><span>子视图归属</span>'
      + '<b data-test="asset-view-label"></b></summary><div class="al-options"><small>命中任一所选视图</small>'
      + (checkboxes || '<small>当前快照没有可选子视图</small>') + '</div></details>'
      + '<label class="al-field">平台<select data-test="asset-platform" aria-label="平台">'
      + platformOptions.map(id => '<option value="' + id + '">' + labels[id] + '</option>').join('') + '</select></label>'
      + '<label class="al-field al-search">搜索<input type="search" data-test="asset-search" placeholder="' + (content ? '作品名称、作者或 ID' : '网红名称或账号 ID')
      + '" autocomplete="off"></label><button type="button" class="btn link" data-test="asset-reset">清除附加筛选</button></div>'
      + '<div class="al-heading"><h2>共 <span data-test="asset-count" aria-live="polite"></span> ' + unit + '</h2>'
      + '<label>排序<select data-test="asset-sort" aria-label="排序">' + sortOptions
      + '</select></label></div><div data-test="asset-results"></div><footer class="al-pagination">'
      + '<button type="button" class="btn compact" data-test="asset-prev">上一页</button><span data-test="asset-page" aria-live="polite"></span>'
      + '<button type="button" class="btn compact" data-test="asset-next">下一页</button></footer></section>' + (inline ? '</section>' : '</main>');
    const locate = name => app.querySelector('[data-test="asset-' + name + '"]');
    if (![...locate('sort').options].some(option => option.value === filters.sort)) filters.sort = 'source';
    locate('search').value = filters.query;
    function update() {
      const rows = listRows(scope, filters);
      const pages = Math.max(1, Math.ceil(rows.length / pageSize));
      page = Math.min(page, pages);
      const count = locate('count');
      count.dataset.count = rows.length;
      count.textContent = number(rows.length);
      app.querySelectorAll('[data-view-id]').forEach(box => { box.checked = filters.views.includes(box.value); });
      locate('view-label').textContent = filters.views.length > 1 ? '已选 ' + filters.views.length + ' 个'
        : filters.views.length ? views.get(filters.views[0]).name : '不限';
      locate('platform').value = filters.platform;
      locate('sort').value = filters.sort;
      const results = locate('results');
      results.innerHTML = renderTable(scope, rows, page);
      const pageRows = new Map(rows.slice((page - 1) * pageSize, page * pageSize).map(row => [keyOf(row), row]));
      for (const details of results.querySelectorAll('.al-evidence')) {
        details.addEventListener('toggle', () => {
          const list = details.querySelector('ul');
          if (!details.open || list.childElementCount) return;
          const row = pageRows.get(details.closest('tr').dataset.key);
          const evidence = details.hasAttribute('data-which-side') ? row.bySide[Number(details.dataset.whichSide)] : row.evidence;
          list.innerHTML = evidence.map(item => '<li>' + escape(item.title) + '<small>' + escape(item.date + ' · ' + item.id) + '</small></li>').join('');
        });
      }
      locate('prev').disabled = page <= 1;
      locate('next').disabled = page >= pages;
      locate('page').textContent = page + ' / ' + pages;
    }
    app.addEventListener('change', event => {
      const { target } = event;
      if (target.matches('[data-view-id]')) filters.views = [...app.querySelectorAll('[data-view-id]:checked')].map(box => box.value);
      else if (target === locate('platform')) filters.platform = target.value;
      else if (target === locate('sort')) filters.sort = target.value;
      else return;
      page = 1;
      update();
    });
    locate('search').addEventListener('input', event => { filters.query = event.target.value; page = 1; update(); });
    locate('reset').addEventListener('click', () => {
      filters = initial();
      locate('search').value = '';
      page = 1;
      update();
    });
    locate('prev').addEventListener('click', () => { page--; update(); });
    locate('next').addEventListener('click', () => { page++; update(); });
    const picker = app.querySelector('.al-picker');
    app.addEventListener('click', event => { if (!picker.contains(event.target)) picker.open = false; });
    picker.addEventListener('focusout', event => {
      if (event.relatedTarget && !picker.contains(event.relatedTarget)) picker.open = false;
    });
    picker.addEventListener('keydown', event => {
      if (event.key === 'Escape') { picker.open = false; locate('view-toggle').focus(); }
    });
    update();
    return () => ({ ...filters, views: [...filters.views] });
  }

  return { openPage, mountInline, prepareScope, listRows, configLabel, formatMatchReasons };
});
