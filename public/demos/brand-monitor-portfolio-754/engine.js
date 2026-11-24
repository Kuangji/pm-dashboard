(function (root, factory) {
  const engine = factory();
  if (typeof module === 'object' && module.exports) module.exports = engine;
  else root.Brand754 = engine;
})(globalThis, function () {
  'use strict';

  const platforms = ['youtube', 'instagram', 'tiktok'];
  const dateStart = '2026-10-24';
  const dateEnd = '2026-11-22';
  const initialCutoff = '2026-11-22 23:59';
  const refreshedCutoff = '2026-11-23 09:00';
  const millisecondsPerDay = 86400000;
  const platformNames = { youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok' };
  const fieldNames = { text: '内容文本', tag: '内容标签', account: '发布账号' };
  const rules = [
    { id: 'trail', name: '山野系列', labels: ['产品线', '山野'], platforms, include: [{ type: 'tag', value: 'trail' }], exclude: [], version: 1 },
    { id: 'home', name: '居家系列', labels: ['产品线', '居家'], platforms, include: [{ type: 'tag', value: 'home' }], exclude: [], version: 1 },
    { id: 'launch', name: '新品体验内容', labels: ['内容主题'], platforms: ['youtube'], include: [{ type: 'text', value: '新品体验' }], exclude: [], version: 1 }
  ];
  const copy = value => JSON.parse(JSON.stringify(value));
  const clean = value => String(value ?? '').normalize('NFKC').trim().toLowerCase();
  const cleanTag = value => clean(value).replace(/^#+/, '').trim();
  const fail = (error, reason) => ({ ok: false, error, reason });

  function dateAt(iso, offset) {
    return new Date(Date.parse(iso + 'T00:00:00Z') + offset * millisecondsPerDay).toISOString().slice(0, 10);
  }

  function createRecord(index, tags) {
    const platform = platforms[index % platforms.length];
    const channelNumber = index % 12 + 1;
    const channels = ['荒野装备间', '林间小记', '山岸观察', '理想居所', '轻装出游', '周末实验室'];
    const subject = tags.includes('trail') ? 'Trail 山野装备' : tags.includes('home') ? 'Home 居家装备' : 'TerraPeak 岩途';
    const stories = ['新品体验', '装备实测', '花时间看看', '使用记录', '选购笔记', '一周回顾'];
    return {
      id: String(1001 + index),
      title: subject + ' · ' + stories[index % stories.length] + ' ' + String(index + 1).padStart(2, '0'),
      description: subject + '。' + stories[index % stories.length] + '，分享产品细节和日常使用感受。',
      tags: ['terrapeak', ...tags],
      channel: channels[index % channels.length],
      channelId: 'tp-channel-' + channelNumber,
      platform,
      date: dateAt(dateStart, index % 30),
      views: 2200 + (index * 929) % 14900,
      likes: 80 + (index * 17) % 750,
      comments: 2 + index % 50,
      lang: index % 4 === 0 ? 'en' : 'zh'
    };
  }

  function initialRecords() {
    return Array.from({ length: 100 }, (_, index) => {
      const tags = [];
      if (index < 60) tags.push('trail');
      if (index >= 35 && index < 90) tags.push('home');
      return createRecord(index, tags);
    });
  }

  function contentKey(record) {
    return record.platform + ':' + record.id;
  }

  function uniqueRecords(records) {
    return Array.from(new Map(records.map(record => [contentKey(record), record])).values());
  }

  function isApplicable(condition, platform) {
    return !condition.platform || condition.platform === platform;
  }

  function matchCondition(record, condition) {
    if (!isApplicable(condition, record.platform)) return false;
    if (condition.type === 'account') return record.channelId === condition.value;
    if (condition.type === 'tag') return record.tags?.some(tag => cleanTag(tag) === cleanTag(condition.value)) ?? false;
    const text = record.platform === 'youtube' ? record.title : record.description;
    return clean(text).includes(clean(condition.value));
  }

  function matchRecords(records, rule, explain = false) {
    const matches = [];
    for (const record of records) {
      if (!rule.platforms.includes(record.platform)) continue;
      const matched = rule.include.filter(condition => matchCondition(record, condition));
      if (!matched.length || rule.exclude.some(condition => matchCondition(record, condition))) continue;
      matches.push(explain ? { ...record, matchedConditions: copy(matched) } : record);
    }
    return matches;
  }

  function checkRule(state, rule, requireName) {
    if (!rule || typeof rule !== 'object') return fail('请填写查询规则。', 'rule');
    const name = String(rule.name ?? '').trim();
    if (requireName && !name) return fail('请输入子视图名称。', 'rule');
    const selection = rule.platforms ?? platforms;
    const selectedPlatforms = Array.isArray(selection) && selection.includes('all') ? platforms : selection;
    if (!Array.isArray(selectedPlatforms) || !selectedPlatforms.length || selectedPlatforms.some(platform => !platforms.includes(platform))) {
      return fail('请选择有效的平台。', 'rule');
    }
    const include = rule.include ?? [];
    const exclude = rule.exclude ?? [];
    if (!Array.isArray(include) || !include.length || !Array.isArray(exclude)) {
      return fail('请至少添加一项纳入条件。', 'rule');
    }
    if (exclude.some(condition => condition?.type === 'account')) {
      return fail('账号条件仅支持纳入。', 'rule');
    }
    for (const condition of [...include, ...exclude]) {
      if (!condition || !['text', 'tag', 'account'].includes(condition.type)) return fail('条件类型无效。', 'rule');
      const value = condition.type === 'tag' ? cleanTag(condition.value) : clean(condition.value);
      if (!value) return fail('请填写条件内容。', 'rule');
      if (condition.type === 'account' && !platforms.includes(condition.platform)) {
        return fail('账号条件需要指定平台和频道 ID。', 'rule');
      }
      if (condition.platform && !selectedPlatforms.includes(condition.platform)) {
        return fail('条件所用的平台必须在已选平台范围内。', 'rule');
      }
    }
    if (selectedPlatforms.some(platform => !include.some(condition => isApplicable(condition, platform)))) {
      return fail('每个已选平台至少需要一项适用的纳入条件。', 'rule');
    }
    for (const platform of selectedPlatforms) {
      const missing = [...include, ...exclude].find(condition =>
        isApplicable(condition, platform) && state.missingFields[platform]?.includes(condition.type));
      if (missing) return fail(platformNames[platform] + ' 的' + fieldNames[missing.type] + '字段当前不可用，请调整条件。', 'field');
    }
    const labels = new Map();
    for (const value of Array.isArray(rule.labels) ? rule.labels : []) {
      const label = String(value).trim();
      if (label && !labels.has(clean(label))) labels.set(clean(label), label);
    }
    const normalized = copy({ id: rule.id, name, labels: [...labels.values()], platforms: [...new Set(selectedPlatforms)], include, exclude });
    for (const condition of [...normalized.include, ...normalized.exclude]) condition.value = String(condition.value).trim();
    return { ok: true, rule: normalized };
  }

  function makePublication(id, cutoff, records, approvedRules) {
    const frozenRecords = uniqueRecords(copy(records));
    const children = Object.fromEntries(approvedRules.map(rule => [
      rule.id,
      { id: rule.id, name: rule.name, version: rule.version, rule: copy(rule), records: matchRecords(frozenRecords, rule) }
    ]));
    return { id, cutoff, dateEnd, dateStart, records: frozenRecords, children };
  }

  function createState(scenario = 'normal') {
    const initial = initialRecords();
    if (scenario === 'missing') {
      initial[0].views = null;
      initial.filter(record => record.platform === 'tiktok').forEach(record => { record.description = ''; });
    }
    const liveRecords = initial.map(record => ({ ...record, tags: [...record.tags], views: record.views === null ? null : record.views + 150 }));
    const added = [['trail'], ['home'], ['trail', 'home'], [], ['home'], []];
    added.forEach((tags, index) => {
      const record = createRecord(100 + index, tags);
      if (scenario === 'missing' && record.platform === 'tiktok') record.description = '';
      liveRecords.push(record);
    });
    const approved = scenario === 'first' ? [] : copy(rules);
    return {
      brand: { name: '岩途 TerraPeak', category: '户外及生活装备' },
      role: scenario === 'viewer' || scenario === 'revoked' ? scenario : 'editor',
      views: approved.map(rule => ({
        id: rule.id, name: rule.name, active: true, rule, pendingRule: null, status: 'available',
        activationPending: false, versionCounter: rule.version
      })),
      comparisonViewIds: approved.length ? ['trail', 'home'] : [],
      liveRecords,
      liveComplete: true,
      missingFields: scenario === 'missing' ? { tiktok: ['text'] } : {},
      publication: makePublication('pub-1', initialCutoff, initial, approved),
      history: [],
      task: null,
      lastError: null,
      taskSequence: 0,
      publicationSequence: 1,
      viewSequence: 0
    };
  }

  function checkRole(state, write = false) {
    if (state.role === 'revoked') return fail('当前没有主品牌报告的访问权限。', 'denied');
    if (write && state.role !== 'editor') return fail('当前没有管理子视图的权限。', 'denied');
    return { ok: true };
  }

  function preview(state, rule) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const checked = checkRule(state, rule, false);
    if (!checked.ok) return checked;
    const batch = state.publication;
    const records = copy(matchRecords(batch.records, checked.rule, true));
    return {
      ok: true,
      records,
      batchId: batch.id,
      cutoff: batch.cutoff,
      dateStart: batch.dateStart,
      dateEnd: batch.dateEnd,
      platforms: [...checked.rule.platforms],
      total: summarize(records)
    };
  }

  function findView(state, id) {
    return state.views.find(view => view.id === id);
  }

  function begin(state, kind, view, records, cutoff, complete = true) {
    const oldTask = state.task;
    if (oldTask?.viewId && oldTask.viewId !== view?.id) {
      const superseded = findView(state, oldTask.viewId);
      if (superseded?.active && superseded.pendingRule) {
        superseded.status = 'failed';
      }
    }
    const preparedRules = state.views
      .filter(candidate => candidate.active)
      .map(candidate => candidate.id === view?.id ? candidate.pendingRule : candidate.activationPending ? null : candidate.rule)
      .filter(Boolean);
    const task = {
      id: 'task-' + ++state.taskSequence,
      kind,
      viewId: view?.id,
      records: copy(records),
      cutoff,
      complete,
      rules: copy(preparedRules)
    };
    state.task = task;
    state.lastError = null;
    return { ok: true, id: view?.id, taskId: task.id };
  }

  function save(state, rule) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const checked = checkRule(state, rule, true);
    if (!checked.ok) return checked;
    let view = checked.rule.id ? findView(state, checked.rule.id) : undefined;
    if (checked.rule.id && !view) return fail('找不到要编辑的子视图。', 'missing');
    if (view && !view.active) return fail('请先重新启用该子视图。', 'inactive');
    if (state.views.some(candidate => candidate.id !== view?.id &&
        [candidate.name, candidate.pendingRule?.name].some(name => clean(name) === clean(checked.rule.name)))) {
      return fail('该主品牌下已有同名子视图。', 'duplicate');
    }
    if (!view) {
      view = {
        id: 'view-' + ++state.viewSequence,
        name: checked.rule.name,
        active: true,
        rule: null,
        pendingRule: null,
        status: 'generating',
        activationPending: false,
        versionCounter: 0
      };
      state.views.push(view);
    }
    view.pendingRule = { ...checked.rule, id: view.id, version: ++view.versionCounter };
    view.status = view.rule && !view.activationPending ? 'updating' : 'generating';
    const current = state.publication;
    return begin(state, 'save', view, current.records, current.cutoff);
  }

  function retry(state, id) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const view = findView(state, id);
    if (!view?.active || !view.pendingRule || view.status !== 'failed') {
      return fail('此子视图没有可重试的规则。', 'missing');
    }
    view.status = view.rule && !view.activationPending ? 'updating' : 'generating';
    return begin(state, 'retry', view, state.publication.records, state.publication.cutoff);
  }

  function refresh(state) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    return begin(state, 'refresh', null, state.liveRecords, refreshedCutoff, state.liveComplete);
  }

  function settle(state, outcome, optionalTaskId) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const task = state.task;
    if (!task || (optionalTaskId && optionalTaskId !== task.id)) return fail('任务已失效。', 'stale');
    if (!['success', 'failure'].includes(outcome)) return fail('结果状态无效。', 'task');
    const view = task.viewId ? findView(state, task.viewId) : null;
    state.task = null;
    if (outcome === 'failure' || !task.complete) {
      if (view?.active) view.status = 'failed';
      state.lastError = task.complete ? '生成失败，已发布快照仍可查看。' : '本次取数不完整，继续使用已发布快照。';
      if (view && !view.rule) state.lastError = '生成失败，尚未发布此子视图的快照。';
      return fail(state.lastError, 'generation');
    }
    const previous = state.publication;
    const next = makePublication('pub-' + ++state.publicationSequence, task.cutoff, task.records, task.rules);
    if (view?.active) {
      view.rule = view.pendingRule;
      view.name = view.rule.name;
      view.pendingRule = null;
      view.activationPending = false;
      view.status = 'available';
    }
    state.publication = next;
    state.history = [previous];
    state.lastError = null;
    return { ok: true, batchId: next.id };
  }

  function setActive(state, id, active) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const view = findView(state, id);
    if (!view) return fail('找不到此子视图。', 'missing');
    if (view.active === active) return { ok: true };
    if (!active) {
      const task = state.task;
      if (task?.rules.some(rule => rule.id === id)) {
        const pending = findView(state, task.viewId);
        if (pending && pending.id !== id && pending.pendingRule) pending.status = 'failed';
        state.task = null;
      }
      view.active = false;
      view.activationPending = false;
      view.status = 'inactive';
      state.comparisonViewIds = state.comparisonViewIds.filter(viewId => viewId !== id);
      return { ok: true };
    }
    view.active = true;
    view.activationPending = true;
    view.pendingRule ||= copy(view.rule);
    view.status = 'generating';
    return begin(state, 'activate', view, state.publication.records, state.publication.cutoff);
  }

  function selectBatch(state, batchId) {
    const access = checkRole(state);
    if (!access.ok) return access;
    const batch = batchId && batchId !== state.publication.id
      ? state.history.find(candidate => candidate.id === batchId)
      : state.publication;
    return batch ? { ok: true, batch } : fail('该快照已过期，请查看当前结果。', 'expired');
  }

  function checkScope(batch, filters = {}) {
    const days = Number(filters.days ?? 30);
    const platform = filters.platform ?? 'all';
    if (!Number.isInteger(days) || days < 1 || days > 30) return fail('所选日期超出此快照的覆盖范围。', 'range');
    if (platform !== 'all' && !platforms.includes(platform)) return fail('所选平台无效。', 'range');
    return { ok: true, days, platform, dateStart: dateAt(batch.dateEnd, 1 - days), dateEnd: batch.dateEnd };
  }

  function filterRecords(records, filters = {}, end = dateEnd) {
    const platform = filters.platform ?? 'all';
    const start = dateAt(end, 1 - Number(filters.days ?? 30));
    return uniqueRecords(records).filter(record => (platform === 'all' || record.platform === platform) &&
      record.date >= start && record.date <= end);
  }

  function summarize(records) {
    const unique = uniqueRecords(records);
    const known = unique.every(record => Number.isFinite(record.views) && record.views >= 0);
    return {
      videos: unique.length,
      views: known ? unique.reduce((sum, record) => sum + record.views, 0) : null
    };
  }

  function ratio(value, total) {
    return value !== null && total !== null && total > 0 ? value / total : null;
  }

  function comparisonCandidates(state) {
    if (!checkRole(state).ok) return [];
    return state.views.flatMap(view => {
      const child = view.active && !view.activationPending && state.publication.children[view.id];
      return child ? [{ id: child.id, name: child.name, labels: [...(child.rule.labels ?? [])] }] : [];
    });
  }

  function setComparisonViews(state, ids) {
    const access = checkRole(state, true);
    if (!access.ok) return access;
    const eligible = new Set(comparisonCandidates(state).map(view => view.id));
    if (!Array.isArray(ids) || !ids.every(id => eligible.has(id))) return fail('请选择有可用快照的子视图。', 'comparison');
    state.comparisonViewIds = [...new Set(ids)];
    return { ok: true };
  }

  function compare(state, filters, optionalBatchId) {
    const selected = selectBatch(state, optionalBatchId);
    if (!selected.ok) return selected;
    const { batch } = selected;
    const scope = checkScope(batch, filters);
    if (!scope.ok) return scope;
    const records = filterRecords(batch.records, scope, batch.dateEnd);
    const total = summarize(records);
    const assigned = new Set();
    const rows = [];
    for (const id of state.comparisonViewIds) {
      const view = findView(state, id);
      const child = view?.active && !view.activationPending && batch.children[id];
      if (!child) continue;
      const subset = filterRecords(child.records, scope, batch.dateEnd);
      for (const record of subset) assigned.add(contentKey(record));
      const metrics = summarize(subset);
      rows.push({
        id, name: child.name, labels: [...(child.rule.labels ?? [])], version: child.version, ...metrics, videoShare: ratio(metrics.videos, total.videos),
        viewShare: ratio(metrics.views, total.views), platforms: [...child.rule.platforms]
      });
    }
    return {
      ok: true, batchId: batch.id, cutoff: batch.cutoff, dateStart: scope.dateStart, dateEnd: scope.dateEnd,
      total, rows, unassigned: rows.length && rows.length === state.comparisonViewIds.length ? total.videos - assigned.size : null
    };
  }

  function readChild(state, id, filters, optionalBatchId) {
    const selected = selectBatch(state, optionalBatchId);
    if (!selected.ok) return selected;
    const view = findView(state, id);
    if (!view) return fail('找不到此子视图。', 'missing');
    if (!view.active) return fail('该子视图已停用。', 'inactive');
    const { batch } = selected;
    const child = !view.activationPending && batch.children[id];
    if (!child) {
      if (view.status === 'failed') return fail('子视图生成失败，尚无可读快照。', 'failed');
      if (batch.id !== state.publication.id) return fail('该批次没有此子视图。', 'missing');
      return fail('子视图尚未发布快照。', 'pending');
    }
    const scope = checkScope(batch, filters);
    if (!scope.ok) return scope;
    const records = filterRecords(child.records, scope, batch.dateEnd);
    return {
      ok: true, id, name: child.name, version: child.version, rule: copy(child.rule), batchId: batch.id,
      cutoff: batch.cutoff, dateStart: scope.dateStart, dateEnd: scope.dateEnd, records: copy(records), total: summarize(records)
    };
  }

  return { createState, preview, save, retry, refresh, settle, setActive, setComparisonViews, comparisonCandidates, compare, readChild, summarize, filterRecords, platforms };
});
