'use strict'

const videoTagKind = 1
const extraGroupName = '额外标签'
const nameOrder = new Intl.Collator('zh-CN', { numeric: true, sensitivity: 'base' })
const tagColors = { orange: '橙色', blue: '蓝色', green: '绿色', purple: '紫色', red: '红色' }
const storageKey = 'nox-monitor-tag-demo-v1'
const untagged = 'noTags'
const shortcutLimit = 3
const defaultRelations = { within: 'any', between: 'all' }
const seed = {
  groups: [
    ['g1', 1, '内容类型', 4], ['g2', 1, '合作阶段', 2], ['g3', 1, '表现跟进', 1],
    ['g4', 1, '内容来源', 3], ['g-extra', 1, extraGroupName, 5]
  ],
  tags: [
    ['t1', 1, 'g1', '开箱测评', 'orange'], ['t2', 1, 'g1', '产品实拍', 'blue'],
    ['t3', 1, 'g1', '教程指南', 'green'], ['t4', 1, 'g1', '日常 Vlog', 'purple'],
    ['t5', 1, 'g2', '已寄样', 'green'], ['t6', 1, 'g2', '待发布', 'blue'],
    ['t7', 1, 'g2', '已交付', 'green'], ['t8', 1, 'g2', '待确认', 'purple'],
    ['t9', 1, 'g3', '重点跟进', 'orange'], ['t10', 1, 'g3', '高互动', 'red'],
    ['t11', 1, 'g3', '追加投放', 'blue'], ['t12', 1, 'g4', '达人自发', 'green'],
    ['t13', 1, 'g4', '品牌合作', 'blue'], ['t14', 1, 'g4', '官方账号', 'purple'],
    ['t15', 1, '', '待复盘', 'purple'], ['t16', 1, '', '竞品提及', 'red'],
    ['t17', 1, 'g-extra', '北美组', 'blue', false, 1], ['t18', 1, 'g-extra', '欧洲组', 'purple', false, 2],
    ['t19', 1, 'g-extra', '跨区协作', 'green', false, 3], ['t20', 1, 'g-extra', '高意向', 'orange', false, 4],
    ['t21', 1, 'g-extra', '持续观察', 'blue', false, 5]
  ],
  videos: [
    ['v1', '我的轻量随身装备清单', 'Riley Studio', 'YouTube', '18.4 万', ['t1', 't9', 't17']],
    ['v2', '城市雨天徒步，三件东西就够', 'Trail Notes', 'TikTok', '12.6 万', ['t2', 't5', 't18']],
    ['v3', '一只背包的 48 小时旅行', 'Weekend Atlas', 'Instagram', '9.2 万', ['t4', 't10', 't17', 't20']],
    ['v4', '如何选择你的第一台运动相机', 'Frame by Alex', 'YouTube', '7.8 万', ['t3', 't13', 't20']],
    ['v5', '户外营地夜拍挑战', 'Northbound', 'TikTok', '6.3 万', ['t2', 't9', 't6', 't19']],
    ['v6', '上山前我会检查的五件事', 'Trail Notes', 'Instagram', '4.7 万', ['t3', 't12']],
    ['v7', '从通勤到徒步的一天', 'Riley Studio', 'YouTube', '3.1 万', []],
    ['v8', '周末试用新装备', 'Weekend Atlas', 'TikTok', '1.6 万', ['t1', 't5', 't21']]
  ],
  prefs: {
    admin: {
      pins: ['t9', 't1'], shortcuts: [],
      collapsed: { 'picker-1-g1': false, 'picker-1-g2': true, 'picker-1-g3': true, 'picker-1-g4': true }
    },
    member: { pins: [], shortcuts: [], collapsed: {} }
  }
}
function mergeLegacyTagGroups(data) {
  const legacyTags = [2, 3].flatMap(kind => sortTags(data.tags.filter(tag => tag[1] === kind)))
  const legacyGroups = data.groups.filter(group => group[1] !== videoTagKind)
  if (!legacyTags.length && !legacyGroups.length) return false

  data.groups = data.groups.filter(group => group[1] === videoTagKind)
  const existing = data.groups.find(group => normalize(group[2]) === normalize(extraGroupName))
  const target = existing || [data.groups.some(group => group[0] === 'g-extra') ? uid() : 'g-extra', videoTagKind, extraGroupName]
  if (!existing) {
    const ordered = [...sortGroups(data.groups), target]
    ordered.forEach((group, index) => { group[3] = index + 1 })
    data.groups.push(target)
  }
  const tagsAlreadyInTarget = sortTags(data.tags.filter(tag => tag[1] === videoTagKind && tag[2] === target[0]))
  for (const tag of data.tags) tag[7] ??= tag[1]
  for (const tag of legacyTags) {
    tag[1] = videoTagKind
    tag[2] = target[0]
  }
  saveTagOrder([...tagsAlreadyInTarget, ...legacyTags])
  return true
}
function load() {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const data = JSON.parse(saved)
      data.prefs = Object.fromEntries(Object.entries(data.prefs).map(
        ([actor, { pins, collapsed, shortcuts = [] }]) => [actor, { pins, collapsed, shortcuts }]
      ))
      if (mergeLegacyTagGroups(data)) {
        try { localStorage.setItem(storageKey, JSON.stringify(data)) } catch {}
      }
      return data
    }
  } catch {}
  return structuredClone(seed)
}
const db = load()
const workspace = document.querySelector('.workspace')
const sidebar = document.querySelector('.sidebar')
const page = document.querySelector('#page')
const pickerElement = document.querySelector('#picker')
const editor = document.querySelector('#editor')
const toast = document.querySelector('#toast')
const state = {
  view: 'content', actor: 'admin', contentSearch: '', selectedRows: new Set(), filter: emptyFilter(),
  openRow: '', manageSearch: '',
  taskDraft: { title: '', tags: [] }, picker: null, edit: null, inlineTag: null, suspendedPicker: null
}
let toastTimeout
let editorTrigger
let composing = false
let orderDrag
let suppressDragClickUntil = 0
const tagNameSuffixes = new Map()
const tagUsage = new Map()

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(db)) } catch {}
}
function announce(message) {
  clearTimeout(toastTimeout)
  toast.textContent = message
  toastTimeout = setTimeout(() => { toast.textContent = '' }, 3400)
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])
}
function normalize(value) {
  return value.normalize('NFKC').trim().replace(/\s+/gu, ' ').toLowerCase()
}
function icon(name) { return `<i class="i i-${name}" aria-hidden="true"></i>` }
function tagById(id) { return db.tags.find(t => t[0] === id && !t[5]) }
function groupById(id) { return db.groups.find(g => g[0] === id) }
function videoById(id) { return db.videos.find(v => v[0] === id) }
function refreshTagUsage() {
  tagUsage.clear()
  const visibleTagIds = new Set(db.tags.filter(tag => !tag[5]).map(tag => tag[0]))
  for (const [contentId, , , , , tagIds] of db.videos) {
    const activeIds = tagIds.filter(id => visibleTagIds.has(id))
    for (const tagId of activeIds.length ? activeIds : [untagged]) {
      if (!tagUsage.has(tagId)) tagUsage.set(tagId, new Set())
      tagUsage.get(tagId).add(contentId)
    }
  }
}
function countContentUsingTag(id) { return tagUsage.get(id)?.size ?? 0 }
function tagUsageText(id) { return `${countContentUsingTag(id).toLocaleString('zh-CN')} 条` }
function renderTagUsage(id) {
  const count = tagUsageText(id)
  const explanation = id === untagged ? '尚未打视频标签' : '使用此标签'
  return `<span class="tag-usage" title="有 ${count}监控内容${explanation}">${count}</span>`
}
function prefs() { return db.prefs[state.actor] }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8) }
function canManage() { return state.actor === 'admin' }
function liveTags(ids) { return ids.filter(id => tagById(id)) }
function sortGroups(groups) {
  return Array.from(groups).sort((a, b) =>
    (a[3] ?? Infinity) - (b[3] ?? Infinity) || nameOrder.compare(a[2], b[2]) || a[0].localeCompare(b[0]))
}
function groupsFor() { return [...sortGroups(db.groups), ['', videoTagKind, '未分组']] }
function placeGroup(group, anchorId = '', after = false) {
  const groups = groupsFor().filter(item => item[0] && item !== group)
  const anchor = anchorId ? groups.findIndex(item => item[0] === anchorId) : groups.length
  if (anchor < 0) return false
  groups.splice(anchor + Number(after), 0, group)
  groups.forEach((item, index) => { item[3] = index + 1 })
  return true
}
function sortTags(tags) {
  return tags.sort((a, b) =>
    (a[6] ?? Infinity) - (b[6] ?? Infinity) || nameOrder.compare(a[3], b[3]) || a[0].localeCompare(b[0]))
}
function orderedGroupTags(groupId) {
  return sortTags(db.tags.filter(tag => !tag[5] && tag[2] === groupId))
}
function saveTagOrder(tags) {
  tags.forEach((tag, index) => { tag[6] = index + 1 })
}
function placeTag(tag, groupId, anchorId = '', after = false) {
  if (groupId && !groupById(groupId)) return false
  const tags = orderedGroupTags(groupId).filter(item => item !== tag)
  const anchor = anchorId ? tags.findIndex(item => item[0] === anchorId) : tags.length
  if (anchor < 0) return false
  tags.splice(anchor + Number(after), 0, tag)
  tag[2] = groupId
  saveTagOrder(tags)
  return true
}
function emptyFilter() { return { ids: [], groups: [], relations: defaultRelations } }
function activeElementKey() {
  const el = document.activeElement
  return el?.dataset.k || (el?.id ? '#' + el.id : '')
}
function restoreFocus(root, key) {
  if (!key) return
  const el = key.startsWith('#')
    ? root.querySelector('#' + CSS.escape(key.slice(1)))
    : root.querySelector(`[data-k="${CSS.escape(key)}"]`)
  el?.focus({ preventScroll: true })
  return el
}
function refreshTagNameSuffixes() {
  tagNameSuffixes.clear()
  const names = new Map()
  for (const tag of db.tags) {
    if (tag[5]) continue
    const name = normalize(tag[3])
    if (!names.has(name)) names.set(name, [])
    names.get(name).push(tag)
  }
  for (const tags of names.values()) {
    if (tags.length < 2) continue
    for (const tag of tags) {
      const source = { 1: '原视频标签', 2: '原额外标签 1', 3: '原额外标签 2' }[tag[7]]
      const sameSource = source && tags.some(other => other !== tag && other[7] === tag[7])
      const detail = sameSource ? `${source} · ${tag[0]}` : source || `标签 ID ${tag[0]}`
      tagNameSuffixes.set(tag[0], `（${detail}）`)
    }
  }
}
function displayTagName(tag) {
  return tag[3] + (tagNameSuffixes.get(tag[0]) || '')
}
function labelTag(tag, { showUsage = true } = {}) {
  const name = escapeHtml(displayTagName(tag))
  const title = showUsage ? `${name} · ${tagUsageText(tag[0])}监控内容` : name
  return `<span class="tag t-${tag[4]}" title="${title}"><i class="dot" aria-hidden="true"></i><span>${name}</span>${showUsage ? renderTagUsage(tag[0]) : ''}</span>`
}
function pinButton(tag) {
  const isPinned = prefs().pins.includes(tag[0])
  const action = isPinned ? '取消置顶' : '置顶'
  return `<button type="button" class="icon-btn pin-btn" data-k="pick-pin-${tag[0]}" data-act="pin" data-id="${tag[0]}"
    aria-label="${action} ${escapeHtml(displayTagName(tag))}" title="${action}此标签（仅自己可见）" aria-pressed="${isPinned}"><span class="pin-shape" aria-hidden="true"></span></button>`
}
function shortcutButton(group, active = false) {
  const [id, , name] = group
  const action = active ? 'shortcut-remove' : 'shortcut-add'
  const key = active ? action : `${action}-${id}`
  const hint = active ? '取消快捷筛选，移回「视频标签」' : '设为快捷筛选（仅自己可见）'
  return `<button type="button" class="icon-btn pin-btn shortcut-action" data-act="${action}" data-k="${key}" data-id="${id}"
    aria-label="「${escapeHtml(name)}」的快捷筛选" title="${hint}" aria-pressed="${active}">
    <span class="shortcut-glyph" aria-hidden="true"><span class="pin-shape" aria-hidden="true"></span></span></button>`
}
function searchBox(id, cls, placeholder, query) {
  return `<div class="search ${cls}">${icon('search-normal')}
    <input id="${id}" type="search" aria-label="${placeholder}" placeholder="${placeholder}" autocomplete="off" value="${escapeHtml(query)}">
    ${query ? `<button type="button" class="icon-btn clear-input" data-act="clear-search" data-id="${id}" aria-label="清空搜索">${icon('close')}</button>` : ''}
  </div>`
}
function matchesTag(tag, query, groupName) {
  return !query || normalize(tag[3]).includes(query) || normalize(groupName).includes(query)
}
function matchRelation(relation, items, matches) {
  return relation === 'all' ? items.every(matches) : items.some(matches)
}
function visibleVideos() {
  const query = normalize(state.contentSearch)
  const { ids, groups, relations } = state.filter
  return db.videos.filter(video => {
    if (query && !normalize(video.slice(1, 4).join(' ')).includes(query)) return false
    if (!ids.length) return true
    const tags = liveTags(video[5])
    if (ids.includes(untagged)) return !tags.length
    return matchRelation(relations.between, groups, group =>
      matchRelation(relations.within, group.ids, id => tags.includes(id)))
  })
}
function pickerShowsGroup(picker, groupId) {
  if (picker.context !== 'filter') return true
  if (picker.groupId) return picker.groupId === groupId
  return !prefs().shortcuts.includes(groupId)
}
function visiblePickerIds(picker, ids) {
  return ids.filter(id => {
    if (id === untagged) return picker.context === 'filter' && !picker.groupId
    const tag = tagById(id)
    return tag && pickerShowsGroup(picker, tag[2])
  })
}
function filterButton(group) {
  const groupId = group?.[0]
  const name = group ? escapeHtml(group[2]) : '视频标签'
  const { ids } = state.filter
  const count = visiblePickerIds({ context: 'filter', groupId }, ids).length
  const summary = ids.includes(untagged) ? `无标签 ${tagUsageText(untagged)}` : count
  const buttonKey = group ? `filter-group-${groupId}` : 'filter-1'
  return `<button type="button" class="btn filter-btn ${group ? 'group-filter' : 'main-tag-filter'} ${count ? 'has-value' : ''}" data-k="${buttonKey}" data-act="picker" data-context="filter" ${group ? `data-id="${groupId}"` : ''} aria-haspopup="dialog" aria-expanded="false">
    ${icon('tag')}<span class="filter-label" title="${name}">${name}</span>${summary ? `<span class="count">· ${summary}</span>` : ''}${icon('angle-down')}</button>`
}
function renderVideoRow(video) {
  const [id, title, creator, platform, views, ids] = video
  const platformIcon = { YouTube: icon('play'), TikTok: '♪', Instagram: icon('instagram') }[platform]
  const tags = liveTags(ids)
  return `<tr>
    <td class="check-col"><label class="row-check"><input type="checkbox" data-k="video-${id}" data-check="video" data-id="${id}" aria-label="选择 ${escapeHtml(title)}" ${state.selectedRows.has(id) ? 'checked' : ''}></label></td>
    <td><div class="video-cell"><span class="video-icon ${platform.toLowerCase()}" aria-hidden="true">${platformIcon}</span><div><span class="video-title">${escapeHtml(title)}</span><span class="video-meta">${escapeHtml(creator)} · ${platform}</span></div></div></td>
    <td><div class="tags">${tags.length ? tags.map(key => labelTag(tagById(key), { showUsage: false })).join('') : '<span class="muted">—</span>'}</div></td>
    <td class="numeric">${views}</td>
    <td><button type="button" class="link-btn" data-act="detail" data-id="${id}" data-k="detail-${id}" aria-expanded="${state.openRow === id}">编辑标签</button></td>
  </tr>
  ${state.openRow === id ? `<tr><td colspan="5" style="padding:0;height:auto">
    <div class="row-tag-editor"><strong>${escapeHtml(title)}</strong>
    <button type="button" class="btn" data-k="detail-picker" data-act="picker" data-context="detail" aria-haspopup="dialog" aria-expanded="false">${icon('tag')} 选择标签</button>
    </div></td></tr>` : ''}`
}
function renderContent() {
  const visible = visibleVideos()
  const visibleIds = new Set(visible.map(video => video[0]))
  state.selectedRows = new Set([...state.selectedRows].filter(id => visibleIds.has(id)))
  if (!visibleIds.has(state.openRow)) state.openRow = ''
  const allChecked = visible.length > 0 && visible.every(v => state.selectedRows.has(v[0]))
  const { ids } = state.filter
  const summary = ids.includes(untagged) ? `无标签 ${tagUsageText(untagged)}` : `${ids.length} 项`
  const shortcuts = prefs().shortcuts.map(groupById).filter(Boolean)
  return `<header class="page-head"><div class="page-title"><span class="project-mark">${icon('monitor1')}</span><div><h1>北美新品上市监测</h1><p class="subtitle">监控项目 <span aria-hidden="true">·</span> <span class="status">监控中</span></p></div></div>
    <div class="actions"><button type="button" class="btn" data-act="manage" data-k="page-manage">${icon('tag')} 标签管理</button><button type="button" class="btn primary" data-act="new" data-k="new-task"><span class="plus" aria-hidden="true">+</span> 新增监控</button></div>
  </header>
  <section class="card content-card" aria-label="监控内容">
    <div class="card-top"><h2>监控内容 <span class="inline-count">${visible.length} 条</span></h2></div>
    <div class="filters">${searchBox('content-search', 'content-search', '搜索内容标题或创作者', state.contentSearch)}
      <div class="tag-filters">${filterButton()}
        ${shortcuts.map(filterButton).join('')}
      </div>
    </div>
    ${ids.length ? `<div class="filter-applied"><button type="button" class="btn subtle" data-k="applied-1" data-act="picker" data-context="filter" aria-haspopup="dialog" aria-expanded="false">视频标签 <span class="pill">${summary}</span> ${icon('angle-down')}</button><button type="button" class="link-btn" data-k="clear-filters" data-act="clear-filters">清除标签筛选</button></div>` : ''}
    ${state.selectedRows.size ? `<div class="batch-toolbar"><strong>已选 ${state.selectedRows.size} 条</strong>
      <button type="button" class="btn" data-k="batch-add" data-act="picker" data-context="batch-add" aria-haspopup="dialog" aria-expanded="false">添加标签</button>
      <button type="button" class="btn" data-k="batch-remove" data-act="picker" data-context="batch-remove" aria-haspopup="dialog" aria-expanded="false">移除标签</button>
      <button type="button" class="btn subtle" data-act="clear-rows">取消选择</button>
    </div>` : ''}
    <div class="table-wrap" tabindex="0" aria-label="内容列表，可横向滚动"><table>
      <thead><tr><th scope="col" class="check-col"><label class="row-check"><input type="checkbox" data-k="all-videos" data-check="all" aria-label="选择当前显示的内容" ${allChecked ? 'checked' : ''} ${visible.length ? '' : 'disabled'}></label></th>
      <th scope="col">内容</th><th scope="col">标签</th><th scope="col" class="w-views">播放量</th><th scope="col" class="w-action">操作</th></tr></thead>
      <tbody>${visible.length ? visible.map(renderVideoRow).join('') : '<tr><td colspan="5"><div class="empty"><b>暂无符合条件的内容</b>试试调整筛选条件或搜索词。</div></td></tr>'}</tbody>
    </table></div>
  </section>`
}
function isCollapsed(area, group) {
  const saved = prefs().collapsed[`${area}-${group[1]}-${group[0]}`]
  if (saved !== undefined) return saved
  return area === 'picker' && group[0] !== groupsFor().find(item => pickerShowsGroup(state.picker, item[0]))?.[0]
}
function toggleGroup(area, id) {
  const group = groupsFor().find(item => item[0] === id)
  prefs().collapsed[`${area}-${videoTagKind}-${id}`] = !isCollapsed(area, group)
  save()
}
function groupCount(count, selected, id = '') {
  return `<span ${id ? `id="${id}"` : ''} class="count"><span>${count} 个</span>${selected ? `<span class="group-selected">已选 ${selected}</span>` : ''}</span>`
}
function groupToggle(area, group, count, expanded, locked = false, selected = 0, countId = '') {
  const [id, dim, name] = group
  const lockedAttr = locked ? 'aria-disabled="true" tabindex="-1"' : ''
  return `<button type="button" class="group-toggle" aria-expanded="${expanded}" aria-controls="${area}-body-${dim}-${id}"
    data-k="${area}-group-${id}" data-act="fold" data-area="${area}" data-id="${id}" ${lockedAttr} ${countId ? `aria-describedby="${countId}"` : ''}>
    <span class="twisty">${icon(expanded ? 'angle-down' : 'angle-right')}</span>${icon('folder1')}
    <span class="group-text" ${area === 'manage' ? `title="${escapeHtml(name)}"` : ''}>${escapeHtml(name)}</span>${countId ? '' : groupCount(count, selected)}
  </button>`
}
function renderManageTag(tag) {
  const id = tag[0]
  const name = displayTagName(tag)
  return `<div class="manage-row" data-tag-row="${id}">
    ${canManage() ? `<div class="manage-leading">
      <button type="button" class="icon-btn drag-handle" data-act="move-tag" data-id="${id}" data-k="drag-tag-${id}" aria-label="移动或排序标签 ${escapeHtml(name)}" title="拖动排序或移动分组，点击可选择位置"><span class="grip" aria-hidden="true"></span></button>
    </div>` : ''}
    <div class="manage-row-name" title="${escapeHtml(name)}">${labelTag(tag)}</div>
    ${canManage() ? `<div class="manage-row-tools">
      <details class="tag-menu">
        <summary class="icon-btn" data-k="tag-more-${id}" aria-label="更多操作 ${escapeHtml(name)}" title="更多操作">•••</summary>
        <div class="tag-menu-popover">
          <button type="button" class="link-btn" data-act="edit-tag" data-id="${id}" data-k="edit-tag-${id}" aria-label="编辑标签 ${escapeHtml(name)}">编辑标签</button>
          <button type="button" class="link-btn" data-act="delete-tag" data-id="${id}">删除标签</button>
        </div>
      </details>
    </div>` : ''}
  </div>`
}
function managementGroups() {
  const query = normalize(state.manageSearch)
  let rendered = 0
  const markup = groupsFor().map(group => {
    const edit = state.inlineTag?.groupId === group[0] ? state.inlineTag : null
    const rows = orderedGroupTags(group[0]).filter(tag =>
      tag[0] === edit?.id || matchesTag(tag, query, group[2]))
    if (!edit && query && !rows.length && !normalize(group[2]).includes(query)) return ''
    rendered++
    const expanded = Boolean(edit || query || !isCollapsed('manage', group))
    return `<section class="manage-group" data-manage-group="${group[0]}"><div class="manage-group-head">
      ${canManage() && group[0] ? `<div class="manage-leading">
        <button type="button" class="icon-btn drag-handle" data-act="move-group-order" data-id="${group[0]}" data-k="drag-group-${group[0]}" aria-label="排序分组 ${escapeHtml(group[2])}" title="拖动排序分组，点击可选择位置"><span class="grip" aria-hidden="true"></span></button>
      </div>` : ''}
      ${groupToggle('manage', group, rows.length, expanded, Boolean(query))}
      ${canManage() ? `<div class="manage-group-tools">
        <button type="button" class="icon-btn group-add" data-act="new-tag-in-group" data-id="${group[0]}" data-k="new-tag-${group[0]}" aria-label="在${escapeHtml(group[2])}新建标签" title="在${escapeHtml(group[2])}新建标签"><span class="plus" aria-hidden="true">+</span></button>
        ${group[0] ? `<button type="button" class="icon-btn" data-act="edit-group" data-id="${group[0]}" data-k="edit-group-${group[0]}" aria-label="管理分组 ${escapeHtml(group[2])}" title="管理分组">•••</button>` : ''}
      </div>` : ''}
    </div><div class="manage-group-body" id="manage-body-${videoTagKind}-${group[0]}" ${expanded ? '' : 'hidden'}>
      ${rows.map(tag => tag[0] === edit?.id ? renderInlineTag(edit) : renderManageTag(tag)).join('')}
      ${edit && !edit.id ? renderInlineTag(edit) : !rows.length ? '<div class="empty">这个分组还没有标签</div>' : ''}
    </div></section>`
  }).join('')
  return rendered ? markup : '<div class="empty"><b>没有匹配的标签</b>试试其他标签或分组名称。</div>'
}
function renderManage() {
  return `<header class="page-head"><div class="page-title"><span class="project-mark">${icon('tag')}</span><div><h1>标签管理</h1><p class="subtitle">整理内容监控的标签与分组</p></div></div>
    <div class="actions">${state.suspendedPicker ? '<button type="button" class="btn" data-act="return-picker" data-k="return-picker">返回选择标签</button>' : ''}
    ${canManage() ? '<button type="button" class="btn primary" data-act="new-group" data-k="new-group"><span class="plus" aria-hidden="true">+</span> 新建分组</button>' : ''}</div>
  </header>
  ${canManage() ? '' : '<p class="read-only">你可以查看和搜索共享标签。标签定义由有权限的成员维护。</p>'}
  <section class="card manage-list"><div class="manage-top"><h2>视频标签</h2>${searchBox('manage-search', 'manage-search', '搜索标签或分组', state.manageSearch)}</div>
    <div id="manage-groups">${managementGroups()}</div>
  </section>`
}
function renderNew() {
  const { title, tags } = state.taskDraft
  return `<header class="page-head"><div class="page-title"><span class="project-mark">${icon('monitor1')}</span><div><h1>新增监控</h1><p class="subtitle">手动添加已发布内容</p></div></div><button type="button" class="btn" data-act="content">返回项目内容</button></header>
  <section class="card content-card"><div class="card-top"><h2>内容信息</h2></div><div class="new-edit">
    <label><span>内容标题</span><input id="task-title" class="edit-field" value="${escapeHtml(title)}" placeholder="输入演示内容标题"></label>
    <div class="actions"><button type="button" class="btn filter-btn" data-act="picker" data-context="new" data-k="new-picker" aria-haspopup="dialog" aria-expanded="false">${icon('tag')} 选择视频标签</button>
      <div class="tags">${liveTags(tags).map(id => labelTag(tagById(id))).join('')}</div></div>
  </div><div class="card-top"><div class="actions"><button class="btn primary" data-act="create-task" data-k="create-task">创建监控</button><button class="btn" data-act="content">取消</button></div></div>
  </section>`
}
function render() {
  refreshTagNameSuffixes()
  refreshTagUsage()
  const key = activeElementKey()
  const isManage = state.view === 'manage'
  document.querySelector('#breadcrumb').innerHTML = `<span>内容监控</span>${icon('angle-right')}<strong>${isManage ? '标签管理' : state.view === 'new' ? '新增监控' : '项目内容'}</strong>`
  for (const element of document.querySelectorAll('.sidebar .nav-item')) {
    const current = element.dataset.act === (isManage ? 'manage' : 'content')
    if (current) element.setAttribute('aria-current', 'page')
    else element.removeAttribute('aria-current')
  }
  page.innerHTML = isManage ? renderManage() : state.view === 'new' ? renderNew() : renderContent()
  const checkAll = page.querySelector('[data-check="all"]')
  if (checkAll && !checkAll.checked) checkAll.indeterminate = visibleVideos().some(v => state.selectedRows.has(v[0]))
  restoreFocus(page, key)
  positionInlinePalette()
}

const contextTitle = {
  filter: '筛选视频标签',
  detail: '编辑视频标签',
  'batch-add': '批量添加标签',
  'batch-remove': '批量移除标签',
  new: '选择视频标签'
}
function allPickerGroups() {
  const picker = state.picker
  const { context, groupId, query } = picker
  const search = normalize(query)
  const mainFilter = context === 'filter' && !groupId
  return groupsFor().filter(group => pickerShowsGroup(picker, group[0])).map(group => ({
    group,
    rows: orderedGroupTags(group[0]).filter(tag => matchesTag(tag, search, groupId ? '' : group[2]))
  })).filter(({ group, rows }) => rows.length || (mainFilter && group[0] && normalize(group[2]).includes(search)))
}
function renderPinned() {
  const { draft } = state.picker
  const pins = visiblePickerIds(state.picker, prefs().pins)
  if (!pins.length) return ''
  return `<div class="quick"><span class="quick-label">我的置顶</span><div class="quick-chips">
    ${pins.map(id => {
      const tag = tagById(id)
      const name = escapeHtml(displayTagName(tag))
      const selected = draft.includes(id)
      return `<div class="quick-chip t-${tag[4]}">
        <button type="button" class="chip" data-act="toggle-tag" data-k="quick-${id}" data-id="${id}" aria-label="${name}" aria-description="${tagUsageText(id)}监控内容" aria-pressed="${selected}" title="${name} · ${tagUsageText(id)}监控内容"><i class="dot" aria-hidden="true"></i><span class="chip-text">${name}</span>${renderTagUsage(id)}<span class="quick-chip-check" aria-hidden="true">${icon('checkmark')}</span></button>
        <button type="button" class="quick-unpin" data-act="pin" data-k="quick-pin-${id}" data-id="${id}" aria-label="取消置顶 ${name}" title="取消置顶"></button>
      </div>`
    }).join('')}</div></div>`
}
function renderOption(tag) {
  const [id, , , , color] = tag
  const name = escapeHtml(displayTagName(tag))
  const checked = state.picker.draft.includes(id)
  return `<div class="option">
    <label class="t-${color}"><input type="checkbox" data-check="tag" data-k="pick-${id}" data-id="${id}" aria-label="${name}" aria-description="${tagUsageText(id)}监控内容" ${checked ? 'checked' : ''}>
    <span class="dot" aria-hidden="true"></span><span class="option-text">${name}</span>${renderTagUsage(id)}</label>
    ${pinButton(tag)}
  </div>`
}
function renderUntaggedOption() {
  return `<div class="untagged-section">
    <label class="untagged-option">
      <input type="checkbox" data-check="tag" data-k="pick-noTags" data-id="${untagged}"
        aria-labelledby="untagged-title" aria-describedby="untagged-count untagged-hint" ${state.picker.draft.includes(untagged) ? 'checked' : ''}>
      <span id="untagged-title">无标签</span>
      <span id="untagged-count">${renderTagUsage(untagged)}</span>
      <span class="untagged-hint" id="untagged-hint">尚未打视频标签</span>
    </label>
  </div>`
}
function renderMatchRules() {
  const { draft, rulesOpen, relations } = state.picker
  const disabled = draft.includes(untagged)
  const expanded = rulesOpen && !disabled
  const summary = disabled ? '无标签' :
    `组内${relations.within === 'any' ? '任一' : '全部'} · 组间${relations.between === 'all' ? '全部' : '任一'}`
  return `<div class="match-rules">
    <button type="button" class="btn subtle match-summary" data-act="match-rules" data-k="match-rules"
      aria-expanded="${expanded}" aria-controls="match-rule-fields" aria-label="匹配规则，${summary}" ${disabled ? 'disabled' : ''}>
      ${icon('filter')}${summary}${icon('angle-down')}
    </button>
    <div class="match-fields" id="match-rule-fields" ${expanded ? '' : 'hidden'}>
      <div class="match-field"><label for="match-within">组内关系</label><select id="match-within" data-relation="within">
        <option value="any" ${relations.within === 'any' ? 'selected' : ''}>匹配任一标签</option>
        <option value="all" ${relations.within === 'all' ? 'selected' : ''}>匹配全部标签</option>
      </select></div>
      <div class="match-field"><label for="match-between">组间关系</label><select id="match-between" data-relation="between">
        <option value="all" ${relations.between === 'all' ? 'selected' : ''}>满足所有组</option>
        <option value="any" ${relations.between === 'any' ? 'selected' : ''}>满足任一组</option>
      </select></div>
    </div>
  </div>`
}
function hasOtherFilterChanges(picker) {
  if (picker.context !== 'filter' || !prefs().shortcuts.length) return false
  const applied = state.filter
  const changed = [...new Set([...applied.ids, ...picker.draft])]
    .filter(id => id !== untagged && applied.ids.includes(id) !== picker.draft.includes(id))
  const changesInPicker = visiblePickerIds(picker, changed).length
  const hasTagDraft = picker.draft.length && !picker.draft.includes(untagged)
  const rulesChanged = picker.groupId && hasTagDraft &&
    (picker.relations.within !== applied.relations.within || picker.relations.between !== applied.relations.between)
  return changesInPicker !== changed.length || rulesChanged
}
function renderPicker() {
  const { groupId, context, query, draft } = state.picker
  const scope = groupId && groupById(groupId)
  const shownDraft = visiblePickerIds(state.picker, draft)
  const translatedQuery = normalize(query)
  const currentGroups = allPickerGroups()
  const key = activeElementKey()
  const focus = document.activeElement
  const cursor = focus?.id === 'picker-search' ? [focus.selectionStart, focus.selectionEnd] : null
  const scroll = pickerElement.querySelector('.picker-scroll')?.scrollTop || 0
  const isFilter = context === 'filter'
  const showRules = isFilter && !scope
  const hasShortcuts = showRules && prefs().shortcuts.length > 0
  const atShortcutLimit = showRules && prefs().shortcuts.length >= shortcutLimit
  const directoryTitle = hasShortcuts ? '其他标签' : '全部标签'
  const compactRules = showRules && (!state.picker.rulesOpen || draft.includes(untagged))
  const isBatch = context.startsWith('batch-')
  const title = scope ? `筛选${scope[2]}` : contextTitle[context]
  const search = searchBox('picker-search', 'picker-search', scope ? '搜索组内标签' : '搜索标签或分组', query)
  const manageButton = '<button type="button" class="link-btn picker-manage" data-act="picker-manage" data-k="picker-manage">管理标签</button>'
  const allExpanded = currentGroups.every(item => !isCollapsed('picker', item.group))
  const showUntagged = showRules && (!translatedQuery || normalize('无标签').includes(translatedQuery))
  const matchCount = currentGroups.reduce((count, item) => count + item.rows.length, 0)
  const directorySummary = translatedQuery ? `搜索结果 · ${matchCount + Number(showUntagged)} 项`
    : scope ? `${matchCount} 个` : `${directoryTitle} · ${matchCount} 个`
  const selectedText = shownDraft.map(id => {
    const tag = tagById(id)
    if (!tag && id !== untagged) return ''
    const name = tag ? escapeHtml(displayTagName(tag)) : '无标签'
    const usage = `${tagUsageText(id)}${tag ? '监控内容' : '未打标内容'}`
    return `<button type="button" class="chip selected-item t-${tag?.[4] || 'gray'}" data-act="toggle-tag" data-k="selected-${id}" data-id="${id}" aria-label="移除已选 ${name}" aria-description="${usage}" title="${name} · ${usage}"><span class="chip-text">${name}</span>${renderTagUsage(id)}${icon('close')}</button>`
  }).join('')
  const selectedSummary = scope && draft.includes(untagged)
    ? `<strong class="pill">全局无标签 ${tagUsageText(untagged)}</strong><span class="untagged-status-hint">选择组内标签会替换此条件</span>`
    : `<span>已选 <b>${shownDraft.length}</b> 项</span>${selectedText}`
  pickerElement.setAttribute('aria-label', title)
  pickerElement.innerHTML = `
    <header class="picker-head${isFilter ? ' picker-head-compact' : ''}">
      ${isFilter ? search + manageButton : `<div class="picker-heading"><h2>${title}</h2>
        ${isBatch ? `<span class="pill">${state.selectedRows.size} 条内容</span>` : ''}
        ${manageButton}
        <button type="button" class="icon-btn" data-act="picker-close" data-k="picker-close" aria-label="关闭标签选择器">${icon('close')}</button>
      </div>${search}`}
    </header>
    <div class="picker-scroll">
      ${translatedQuery ? '' : renderPinned()}
      <div class="picker-groups">
        <div class="section-line">
          ${scope ? `<span class="shortcut-scope-name" title="${escapeHtml(scope[2])}">${escapeHtml(scope[2])}</span>${shortcutButton(scope, true)}` : ''}
          <span class="section-title" role="status">${directorySummary}</span>
          ${atShortcutLimit ? `<span class="shortcut-limit" title="可在独立下拉中先取消一组">快捷已满 · ${shortcutLimit}/${shortcutLimit}</span>` : ''}
          ${!scope && !translatedQuery && currentGroups.length ? `<button type="button" class="btn subtle section-action" data-act="fold-all" data-k="fold-all" data-expanded="${allExpanded}">${allExpanded ? '全部折叠' : '全部展开'}</button>` : ''}
        </div>
        ${currentGroups.map(({ group, rows }) => {
          if (scope) return rows.map(renderOption).join('')
          const expanded = Boolean(translatedQuery || !isCollapsed('picker', group))
          const selected = rows.filter(tag => draft.includes(tag[0])).length
          const add = showRules && !atShortcutLimit && group[0] ? shortcutButton(group) : ''
          const countId = add ? `picker-count-${group[0]}` : ''
          const toggle = groupToggle('picker', group, rows.length, expanded, Boolean(translatedQuery), selected, countId)
          return `<section class="pick-group">${add ? `<div class="picker-group-head">${toggle}${add}${groupCount(rows.length, selected, countId)}</div>` : toggle}
            <div id="picker-body-${videoTagKind}-${group[0]}" ${expanded ? '' : 'hidden'}>${rows.length ? rows.map(renderOption).join('') : '<div class="empty">这个分组还没有标签</div>'}</div>
          </section>`
        }).join('')}
        ${!currentGroups.length && (!translatedQuery || !showUntagged) ? `<div class="empty"><b>${translatedQuery ? '没有匹配的标签' : '这里还没有标签'}</b>${translatedQuery ? (scope ? '试试其他标签名称。' : '试试其他标签或分组名称。') : hasShortcuts ? '可通过工具栏的快捷下拉筛选分组。' : '创建标签后就能在这里选用。'}</div>` : ''}
      </div>
      ${showUntagged ? renderUntaggedOption() : ''}
    </div>
    <footer class="picker-footer ${compactRules ? 'compact-rules' : ''}">
      <div class="selected-strip" aria-live="polite">${selectedSummary}${hasOtherFilterChanges(state.picker)
        ? '<span class="pending-filter-note" title="应用筛选会同时提交其他入口的变更">另有筛选变更待应用</span>' : ''}</div>
      ${showRules ? renderMatchRules() : ''}
      <div class="picker-bottom">
        <div class="picker-buttons"><button type="button" class="btn subtle" data-act="clear-draft" data-k="clear-draft" ${shownDraft.length ? '' : 'disabled'}>清空</button>
          <button type="button" class="btn" data-act="picker-close" data-k="picker-cancel">取消</button>
          <button type="button" class="btn primary" data-act="apply-picker" data-k="picker-apply" ${isBatch && !draft.length ? 'disabled' : ''}>${isFilter ? '应用筛选' : context === 'detail' ? '保存标签' : context === 'new' ? '确定' : context === 'batch-add' ? '添加标签' : '移除标签'}</button>
        </div>
      </div>
    </footer>`
  const scrolling = pickerElement.querySelector('.picker-scroll')
  scrolling.scrollTop = scroll
  if (restoreFocus(pickerElement, key) && cursor !== null) {
    pickerElement.querySelector('#picker-search').setSelectionRange(...cursor)
  }
  positionPicker()
}
function positionPicker() {
  if (!state.picker) return
  const element = pickerElement
  const anchor = state.picker.anchor.getBoundingClientRect()
  const narrow = innerWidth <= 620
  const edge = narrow ? 8 : 12
  const below = innerHeight - anchor.bottom - edge
  const above = anchor.top - edge
  const placeAbove = !narrow && below < 390 && above > below
  const available = narrow || Math.max(below, above) < 375 ? innerHeight - 2 * edge : (placeAbove ? above : below) - 7
  element.style.maxHeight = Math.min(680, available) + 'px'
  const width = element.offsetWidth
  const height = element.offsetHeight
  const left = narrow ? edge : Math.min(Math.max(edge, anchor.left), innerWidth - width - edge)
  const top = narrow ? Math.max(edge, (innerHeight - height) / 2)
    : placeAbove ? Math.max(edge, anchor.top - height - 7) : Math.min(anchor.bottom + 7, innerHeight - height - edge)
  element.style.left = left + 'px'
  element.style.top = Math.max(edge, top) + 'px'
}
function openPicker(anchor, context, groupId = '') {
  let draft = []
  if (context === 'filter') draft = state.filter.ids
  if (context === 'detail') draft = liveTags(videoById(state.openRow)[5])
  if (context === 'new') draft = liveTags(state.taskDraft.tags)
  state.picker = {
    anchor, anchorKey: anchor.dataset.k, context, groupId, query: '', draft: [...draft],
    relations: { ...state.filter.relations }, rulesOpen: false
  }
  anchor.setAttribute('aria-expanded', 'true')
  sidebar.inert = true
  workspace.inert = true
  pickerElement.hidden = false
  document.body.classList.add('picker-open')
  renderPicker()
  pickerElement.querySelector('#picker-search').focus({ preventScroll: true })
}
function closePicker(restore = true) {
  if (!state.picker) return
  const { anchorKey, anchor } = state.picker
  state.picker = null
  pickerElement.hidden = true
  sidebar.inert = false
  workspace.inert = false
  document.body.classList.remove('picker-open')
  anchor.setAttribute('aria-expanded', 'false')
  if (restore) restoreFocus(page, anchorKey) || restoreFocus(page, 'filter-1')
  return anchorKey
}
function changeGroupShortcut(id, enable) {
  const picker = state.picker
  const group = id && groupById(id)
  if (!group || picker?.context !== 'filter') return
  const shortcuts = prefs().shortcuts.filter(groupById)
  if (enable) {
    if (picker.groupId || shortcuts.includes(id) || shortcuts.length >= shortcutLimit) return
    prefs().shortcuts = [...shortcuts, id]
  } else {
    if (picker.groupId !== id) return
    prefs().shortcuts = shortcuts.filter(groupId => groupId !== id)
    prefs().collapsed[`picker-${videoTagKind}-${id}`] = false
  }
  save()
  render()
  const anchorKey = enable ? `filter-group-${id}` : 'filter-1'
  const anchor = page.querySelector(`[data-k="${anchorKey}"]`)
  Object.assign(picker, { anchor, anchorKey, groupId: enable ? id : '', query: '' })
  anchor.setAttribute('aria-expanded', 'true')
  pickerElement.querySelector('.picker-scroll').scrollTop = 0
  renderPicker()
  if (enable) restoreFocus(pickerElement, '#picker-search')
  else restoreFocus(pickerElement, `picker-group-${id}`)?.scrollIntoView({ block: 'nearest' })
  announce(enable ? `「${group[2]}」已设为快捷筛选` : `「${group[2]}」已移回视频标签`)
}
function toggleDraft(id) {
  const picker = state.picker
  if (!picker) return
  if (picker.draft.includes(id)) {
    picker.draft = picker.draft.filter(item => item !== id)
  } else {
    const draft = id === untagged ? [id] : [...picker.draft.filter(value => value !== untagged), id]
    if (picker.context === 'filter' && draft.length > 50) {
      announce('视频标签筛选最多选 50 项')
    } else {
      picker.draft = draft
    }
  }
  renderPicker()
  if (!pickerElement.contains(document.activeElement)) pickerElement.querySelector('#picker-search').focus()
}
function sameIds(a, b) {
  return a.length === b.length && a.every(id => b.includes(id))
}
function updateFilterGroups(previous, requested, picker) {
  const selected = new Set(requested)
  const regroup = new Set(picker.groupId
    ? requested.filter(id => !previous.ids.includes(id))
    : visiblePickerIds(picker, requested))
  const groups = new Map()
  for (const { id, ids } of previous.groups) {
    const retained = ids.filter(key => selected.has(key) && !regroup.has(key))
    if (retained.length) groups.set(id, retained)
  }
  for (const id of regroup) {
    const tag = tagById(id)
    if (!tag) continue
    const groupId = tag[2]
    if (!groups.has(groupId)) groups.set(groupId, [])
    groups.get(groupId).push(id)
  }
  return Array.from(groups, ([id, ids]) => ({ id, ids }))
}
function applyPicker() {
  const { context, draft, relations, groupId } = state.picker
  const requested = draft.filter(id => id === untagged || tagById(id))
  let feedback
  if (context === 'filter') {
    const old = state.filter
    const sameSelection = sameIds(old.ids, requested)
    const hasLabels = requested.length > 0 && !requested.includes(untagged)
    const sameRelations = old.relations.within === relations.within && old.relations.between === relations.between
    if (sameSelection && (!hasLabels || sameRelations)) {
      closePicker()
      return
    }
    let groups = old.groups
    if (!sameSelection) groups = updateFilterGroups(old, requested, state.picker)
    state.filter = {
      ids: requested,
      groups,
      relations: requested.length || groupId ? relations : defaultRelations
    }
    feedback = requested.length ? `已应用筛选，找到 ${visibleVideos().length} 条内容` : '已清除此标签筛选'
  } else if (context === 'detail') {
    const video = videoById(state.openRow)
    if (!video) return
    video[5] = [...video[5].filter(id => !tagById(id)), ...requested]
    feedback = '已保存内容标签'
  } else if (context === 'new') {
    state.taskDraft.tags = requested
  } else {
    if (!requested.length) return
    const adding = context === 'batch-add'
    const targets = visibleVideos().filter(video => state.selectedRows.has(video[0]))
    let changed = 0
    for (const video of targets) {
      const before = video[5]
      video[5] = adding ? [...new Set([...before, ...requested])] : before.filter(key => !requested.includes(key))
      if (!sameIds(before, video[5])) changed++
    }
    feedback = !targets.length ? '当前没有可操作的内容，请重新选择'
      : changed ? `已为 ${changed} 条内容${adding ? '添加' : '移除'}标签` : '所选内容的标签无需更新'
    state.selectedRows.clear()
  }
  save()
  const key = closePicker(false)
  render()
  restoreFocus(page, key) || restoreFocus(page, 'filter-1')
  if (feedback) announce(feedback)
}
function togglePin(id) {
  const tag = tagById(id)
  if (!state.picker || !tag) return
  const pinSet = prefs().pins
  const pinned = pinSet.includes(id)
  if (!pinned && liveTags(pinSet).length >= 12) return announce('最多置顶 12 个视频标签')
  prefs().pins = pinned ? pinSet.filter(value => value !== id) : [id, ...pinSet]
  save()
  renderPicker()
  if (!pickerElement.contains(document.activeElement)) {
    const next = pickerElement.querySelector('.quick-unpin') || pickerElement.querySelector('#picker-search')
    next?.focus({ preventScroll: true })
  }
  announce(pinned ? '已取消个人置顶' : '已添加到我的置顶')
}

function commitTagMove(id, groupId, anchorId, after) {
  if (!canManage()) return ''
  const tag = tagById(id)
  if (!tag) return ''
  const movedGroup = tag[2] !== groupId
  if (!placeTag(tag, groupId, anchorId, after)) return ''
  const groupName = groupById(groupId)?.[2] || '未分组'
  if (!matchesTag(tag, normalize(state.manageSearch), groupName)) state.manageSearch = ''
  prefs().collapsed[`manage-${tag[1]}-${groupId}`] = false
  save()
  return movedGroup ? `已移到「${groupName}」` : '标签顺序已更新'
}
function confirmTagMove(id, groupId, apply, triggerKey) {
  const tag = tagById(id)
  if (!tag) return
  if (tag[2] === groupId) {
    apply()
    return
  }
  const source = groupById(tag[2])?.[2] || '未分组'
  const target = groupById(groupId)?.[2] || '未分组'
  const affectedCount = countContentUsingTag(id)
  const previous = editor.open
    ? { edit: state.edit, nodes: [...editor.childNodes], focus: document.activeElement }
    : null
  if (triggerKey) editorTrigger = triggerKey
  state.edit = { kind: 'confirm-tag-move', id, previous, apply }
  editor.innerHTML = `<form class="dialog-form">
    <div class="dialog-title"><h2 id="editor-title">确认移动标签</h2><button type="button" class="icon-btn" data-act="cancel-tag-move" aria-label="关闭窗口">${icon('close')}</button></div>
    <p class="dialog-copy">将「${escapeHtml(displayTagName(tag))}」从「${escapeHtml(source)}」移到「${escapeHtml(target)}」。</p>
    <p class="dialog-copy">当前可见项目中有 <strong class="numeric">${affectedCount} 条监控内容</strong>使用此标签。换组后，所有使用此标签的项目都会显示新的标签分组。</p>
    <p class="dialog-error" role="alert" hidden></p>
    <div class="dialog-actions"><button type="button" class="btn" data-act="cancel-tag-move" data-k="cancel-tag-move">取消</button><button type="submit" class="btn primary">确认移动</button></div>
  </form>`
  if (!editor.open) editor.showModal()
  editor.querySelector('[data-k="cancel-tag-move"]').focus()
}
function cancelTagMove() {
  const previous = state.edit.previous
  if (!previous) {
    editor.close()
    return
  }
  state.edit = previous.edit
  editor.replaceChildren(...previous.nodes)
  previous.focus?.focus()
}
function finishOrderUpdate(focusKey, feedback) {
  const fromEditor = editor.open
  if (fromEditor) editor.close()
  render()
  if (!fromEditor) restoreFocus(page, focusKey)?.scrollIntoView({ block: 'nearest' })
  announce(feedback)
}
function showEditorError(message) {
  const error = editor.querySelector('.dialog-error')
  if (editor.open && error) {
    error.textContent = message
    error.hidden = false
  } else announce(message)
}
function applyTagMove(id, groupId, anchorId, after) {
  const feedback = commitTagMove(id, groupId, anchorId, after)
  if (feedback) finishOrderUpdate(`drag-tag-${id}`, feedback)
  else showEditorError('目标位置不可用，请重新选择')
}
function positionOptions(tag, groupId, existingPosition = false) {
  const tags = orderedGroupTags(groupId)
  const next = existingPosition ? tags[tags.indexOf(tag) + 1]?.[0] : ''
  return tags.filter(item => item !== tag).map(item =>
    `<option value="${item[0]}" ${next === item[0] ? 'selected' : ''}>放在「${escapeHtml(displayTagName(item))}」前（${tagUsageText(item[0])}）</option>`).join('') +
    `<option value="" ${next ? '' : 'selected'}>组末尾</option>`
}
function openMoveEditor(id, trigger) {
  const tag = tagById(id)
  if (!canManage() || !tag) return
  state.edit = { kind: 'move-tag', id }
  editorTrigger = trigger.dataset.k
  editor.innerHTML = `<form class="dialog-form">
    <div class="dialog-title"><h2 id="editor-title">移动标签</h2><button type="button" class="icon-btn" data-act="editor-close" aria-label="关闭窗口">${icon('close')}</button></div>
    <p class="dialog-copy">${escapeHtml(displayTagName(tag))} ${renderTagUsage(id)}</p>
    <div class="field"><label for="move-group">目标分组</label><select id="move-group" name="group">
      ${groupsFor().map(([id, , name]) => `<option value="${id}" ${tag[2] === id ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}
    </select></div>
    <div class="field"><label for="move-position">放置位置</label><select id="move-position" name="before">${positionOptions(tag, tag[2], true)}</select></div>
    <p class="dialog-error" role="alert" hidden></p>
    <div class="dialog-actions"><button type="button" class="btn" data-act="editor-close">取消</button><button type="submit" class="btn primary">保存</button></div>
  </form>`
  editor.showModal()
  editor.querySelector('#move-group').focus()
}
function openGroupOrderEditor(id, trigger) {
  const group = groupById(id)
  if (!canManage() || !group) return
  const groups = groupsFor().filter(item => item[0])
  const next = groups[groups.indexOf(group) + 1]?.[0]
  state.edit = { kind: 'move-group-order', id }
  editorTrigger = trigger.dataset.k
  editor.innerHTML = `<form class="dialog-form">
    <div class="dialog-title"><h2 id="editor-title">排序分组</h2><button type="button" class="icon-btn" data-act="editor-close" aria-label="关闭窗口">${icon('close')}</button></div>
    <p class="dialog-copy">${escapeHtml(group[2])}</p>
    <div class="field"><label for="group-position">放置位置</label><select id="group-position" name="before">
      ${groups.filter(item => item !== group).map(([id, , name]) => `<option value="${id}" ${next === id ? 'selected' : ''}>放在「${escapeHtml(name)}」前</option>`).join('')}
      <option value="" ${next ? '' : 'selected'}>分组列表末尾</option>
    </select></div>
    <p class="dialog-error" role="alert" hidden></p>
    <div class="dialog-actions"><button type="button" class="btn" data-act="editor-close">取消</button><button type="submit" class="btn primary">保存</button></div>
  </form>`
  editor.showModal()
  editor.querySelector('#group-position').focus()
}
function applyGroupOrder(id, anchorId, after = false) {
  const group = groupById(id)
  if (!group || !canManage() || !placeGroup(group, anchorId, after)) {
    showEditorError('目标位置不可用，请重新选择')
    return
  }
  save()
  finishOrderUpdate(`drag-group-${id}`, '分组顺序已更新')
}
function updateOrderDrop(drag) {
  const element = document.elementFromPoint(drag.x, drag.y)
  const group = element?.closest('[data-manage-group]')
  drag.drop?.marker.removeAttribute('data-drop')
  drag.drop = null
  if (!group) return
  const groupId = group.dataset.manageGroup
  const row = element.closest('[data-tag-row]')
  const marker = row || group.querySelector('.manage-group-head')
  if (drag.isGroup ? groupId === drag.id : row?.dataset.tagRow === drag.id) return
  const bounds = marker.getBoundingClientRect()
  if (drag.isGroup) {
    const after = Boolean(groupId && drag.y > bounds.top + bounds.height / 2)
    marker.dataset.drop = after ? 'after-group' : 'before-group'
    drag.drop = { marker, anchorId: groupId, after }
    return
  }
  const after = Boolean(row && drag.y > bounds.top + bounds.height / 2)
  marker.dataset.drop = row ? (after ? 'after' : 'before') : 'group'
  drag.drop = { marker, groupId, anchorId: row?.dataset.tagRow || '', after }
}
function scrollDuringDrag(drag) {
  const top = drag.y < 64
  const bottom = drag.y > innerHeight - 64
  if (!top && !bottom) return
  const before = window.scrollY
  window.scrollBy(0, top ? -14 : 14)
  if (window.scrollY !== before) updateOrderDrop(drag)
  drag.frame = requestAnimationFrame(() => scrollDuringDrag(drag))
}
function startOrderDrag(event) {
  const handle = event.target.closest('.drag-handle')
  if (!handle || !canManage() || orderDrag || !event.isPrimary || event.button !== 0) return
  orderDrag = {
    handle, id: handle.dataset.id, isGroup: handle.dataset.act === 'move-group-order',
    pointer: event.pointerId, startX: event.clientX, startY: event.clientY
  }
  handle.setPointerCapture(event.pointerId)
}
function updateOrderDrag(event) {
  const drag = orderDrag
  if (!drag || drag.pointer !== event.pointerId) return
  drag.x = event.clientX
  drag.y = event.clientY
  if (!drag.ghost) {
    if (Math.hypot(drag.x - drag.startX, drag.y - drag.startY) < 6) return
    const entry = drag.isGroup ? groupById(drag.id) : tagById(drag.id)
    if (!entry) return
    if (drag.isGroup) {
      drag.expanded = [...page.querySelectorAll('.manage-group-head .group-toggle[aria-expanded="true"]')]
      for (const button of drag.expanded) button.setAttribute('aria-expanded', 'false')
      document.body.classList.add('group-order-dragging')
    }
    drag.source = drag.handle.closest(drag.isGroup ? '.manage-group-head' : '[data-tag-row]')
    drag.source.classList.add('drag-source')
    drag.ghost = document.createElement('div')
    drag.ghost.className = 'drag-ghost'
    drag.ghost.textContent = drag.isGroup ? entry[2] : `${displayTagName(entry)} · ${tagUsageText(drag.id)}`
    drag.ghost.setAttribute('aria-hidden', 'true')
    document.body.append(drag.ghost)
    document.body.classList.add('tag-dragging')
  }
  drag.ghost.style.left = Math.max(8, Math.min(drag.x + 12, innerWidth - drag.ghost.offsetWidth - 8)) + 'px'
  drag.ghost.style.top = Math.min(drag.y + 12, innerHeight - drag.ghost.offsetHeight - 8) + 'px'
  updateOrderDrop(drag)
  cancelAnimationFrame(drag.frame)
  scrollDuringDrag(drag)
}
function finishOrderDrag(commit) {
  const drag = orderDrag
  if (!drag) return
  orderDrag = null
  if (drag.handle.hasPointerCapture(drag.pointer)) drag.handle.releasePointerCapture(drag.pointer)
  if (!drag.ghost) return
  suppressDragClickUntil = Date.now() + 250
  cancelAnimationFrame(drag.frame)
  drag.ghost.remove()
  drag.drop?.marker.removeAttribute('data-drop')
  drag.source.classList.remove('drag-source')
  document.body.classList.remove('tag-dragging', 'group-order-dragging')
  for (const button of drag.expanded || []) button.setAttribute('aria-expanded', 'true')
  if (!commit || !drag.drop) return
  const { groupId, anchorId, after } = drag.drop
  if (drag.isGroup) applyGroupOrder(drag.id, anchorId, after)
  else confirmTagMove(drag.id, groupId, () => applyTagMove(drag.id, groupId, anchorId, after), `drag-tag-${drag.id}`)
}

function colorChoices(selected, expanded) {
  return `<div class="tag-colors" id="inline-tag-colors" role="group" aria-label="标签颜色" ${expanded ? '' : 'hidden'}>
    <span class="palette-label" aria-hidden="true">标签颜色</span>
    <div class="color-choices">
      ${Object.entries(tagColors).map(([color, name]) => `<button type="button" class="color-choice t-${color}"
        data-act="inline-color" data-id="${color}" data-k="inline-color-${color}" aria-pressed="${selected === color}">
        <span class="color-swatch" aria-hidden="true">${selected === color ? icon('checkmark') : ''}</span><span>${name}</span>
      </button>`).join('')}
    </div>
  </div>`
}
function renderInlineTag(edit) {
  const colorName = tagColors[edit.color]
  return `<form class="manage-row inline-tag-form" ${edit.id ? `data-tag-row="${edit.id}"` : ''} aria-label="${edit.id ? '编辑标签' : '新建标签'}">
    <div class="inline-tag-field">
      <input class="inline-tag-name" name="name" data-k="inline-name" maxlength="32" autocomplete="off"
        aria-label="标签名称" placeholder="输入标签名称" value="${escapeHtml(edit.name)}"
        ${edit.error ? 'aria-invalid="true" aria-describedby="inline-tag-error"' : ''}
        ${edit.id ? `aria-description="${tagUsageText(edit.id)}监控内容"` : ''}>
      ${edit.id ? renderTagUsage(edit.id) : ''}
      <div class="inline-color-control">
        <button type="button" class="icon-btn inline-palette t-${edit.color}" data-act="inline-palette" data-k="inline-palette"
          aria-expanded="${edit.paletteOpen}" aria-controls="inline-tag-colors" aria-label="标签颜色，当前${colorName}" title="标签颜色，当前${colorName}">
          <span class="dot" aria-hidden="true"></span>${icon('angle-down')}
        </button>
        ${colorChoices(edit.color, edit.paletteOpen)}
      </div>
    </div>
    <div class="inline-tag-actions">
      <button type="button" class="btn subtle" data-act="inline-cancel">取消</button>
      <button type="submit" class="btn primary">${edit.id ? '保存' : '创建'}</button>
    </div>
    ${edit.error ? `<p class="dialog-error" id="inline-tag-error" role="alert">${edit.error}</p>` : ''}
  </form>`
}
function positionFloatingPanel(popup, bounds, alignEnd) {
  const margin = 8
  const gap = 6
  const edge = alignEnd ? bounds.right - popup.offsetWidth : bounds.left
  const left = Math.min(Math.max(margin, edge), innerWidth - popup.offsetWidth - margin)
  const below = bounds.bottom + gap
  const top = below + popup.offsetHeight <= innerHeight - margin
    ? below
    : Math.max(margin, bounds.top - gap - popup.offsetHeight)
  popup.style.left = left + 'px'
  popup.style.top = top + 'px'
}
function positionTagMenu() {
  const menu = page.querySelector('.tag-menu[open]')
  if (!menu) return
  const bounds = menu.querySelector('summary').getBoundingClientRect()
  if (bounds.bottom <= 0 || bounds.top >= innerHeight) menu.open = false
  else positionFloatingPanel(menu.querySelector('.tag-menu-popover'), bounds, false)
}
function positionInlinePalette() {
  if (!state.inlineTag?.paletteOpen) return
  const popup = page.querySelector('#inline-tag-colors')
  const anchor = page.querySelector('[data-k="inline-palette"]')
  if (!popup || !anchor) return
  const bounds = anchor.getBoundingClientRect()
  if (bounds.bottom <= 0 || bounds.top >= innerHeight) toggleInlinePalette(false)
  else positionFloatingPanel(popup, bounds, true)
}
function toggleInlinePalette(open, moveFocus = false) {
  state.inlineTag.paletteOpen = open
  const trigger = page.querySelector('[data-k="inline-palette"]')
  const popup = page.querySelector('#inline-tag-colors')
  trigger.setAttribute('aria-expanded', String(open))
  popup.hidden = !open
  positionInlinePalette()
  if (moveFocus) restoreFocus(page, open ? `inline-color-${state.inlineTag.color}` : 'inline-palette')
}
function focusInlineTag() {
  const field = restoreFocus(page, 'inline-name')
  field?.form.scrollIntoView({ block: 'nearest' })
  return field
}
function inlineTagChanged() {
  const { id, name, color } = state.inlineTag
  const saved = tagById(id)
  return name.trim() !== (saved?.[3] || '') || color !== (saved?.[4] || 'orange')
}
function keepUnsavedTagEdit() {
  if (!state.inlineTag || !inlineTagChanged()) return false
  announce('请先保存或取消当前编辑')
  focusInlineTag()
  return true
}
function startInlineTag(tag, groupId) {
  if (!canManage()) return
  const pending = state.inlineTag
  if (pending) {
    const sameRow = pending.id === tag?.[0] && pending.groupId === groupId
    if (sameRow || inlineTagChanged()) {
      if (!sameRow) announce('请先保存或取消当前编辑')
      focusInlineTag()
      return
    }
  }
  if (groupId && !groupById(groupId)) return
  if (!tag) {
    state.manageSearch = ''
    prefs().collapsed[`manage-${videoTagKind}-${groupId}`] = false
    save()
  }
  state.inlineTag = {
    id: tag?.[0], groupId, name: tag?.[3] || '', color: tagColors[tag?.[4]] ? tag[4] : 'orange',
    paletteOpen: false, error: ''
  }
  render()
  const field = focusInlineTag()
  if (field) field.setSelectionRange(field.value.length, field.value.length)
}
function finishInlineTag(focusKey) {
  state.inlineTag = null
  render()
  const focus = restoreFocus(page, focusKey) || restoreFocus(page, '#manage-search')
  focus?.scrollIntoView({ block: 'nearest' })
}
function cancelInlineTag() {
  const { id, groupId } = state.inlineTag
  finishInlineTag(id ? `tag-more-${id}` : `new-tag-${groupId}`)
}
function saveInlineTag() {
  const edit = state.inlineTag
  if (!edit || !canManage()) return
  const { id, groupId, color } = edit
  const name = edit.name.trim()
  const nameKey = normalize(name)
  const saved = tagById(id)
  const duplicate = (!saved || normalize(saved[3]) !== nameKey) &&
    db.tags.some(tag => !tag[5] && tag[0] !== id && normalize(tag[3]) === nameKey)
  if (!nameKey || duplicate) {
    edit.error = !nameKey ? '请输入标签名称' : '已有同名标签，请使用其他名称'
    render()
    focusInlineTag()
    return
  }
  const tag = id ? saved : [uid(), videoTagKind, groupId, name, color]
  if (!tag || (groupId && !groupById(groupId))) {
    edit.error = '标签或分组不可用，请取消后重试'
    render()
    return
  }
  tag[3] = name
  tag[4] = color
  if (!id) {
    placeTag(tag, groupId)
    db.tags.push(tag)
  }
  if (!matchesTag(tag, normalize(state.manageSearch), groupById(groupId)?.[2] || '未分组')) {
    state.manageSearch = ''
  }
  save()
  finishInlineTag(`tag-more-${tag[0]}`)
  announce(id ? '标签已保存' : '标签已创建')
}

function openEditor(kind, id, trigger) {
  if (!canManage()) return
  const isGroup = kind.includes('group')
  const isDelete = kind.startsWith('delete')
  const source = id ? (isGroup ? groupById(id) : tagById(id)) : null
  if (id && !source) return
  state.edit = { kind, id }
  if (trigger) editorTrigger = trigger.dataset.k
  const noun = isGroup ? '分组' : '标签'
  const verb = isDelete ? '删除' : source ? '编辑' : '新建'
  const name = isGroup ? source?.[2] : displayTagName(source)
  const groupImpact = isGroup && id ? db.tags.filter(tag => tag[2] === id && !tag[5]).length : 0
  const labelImpact = !isGroup && id ? countContentUsingTag(id) : 0
  let filterImpact = ''
  if (isDelete && !isGroup && state.filter.ids.includes(id)) {
    filterImpact = state.filter.ids.length === 1
      ? '此标签是当前唯一的标签筛选条件。确认删除后，将清除当前视频标签筛选。'
      : '确认删除后，当前筛选会移除此条件，结果可能变化。'
  }
  const fields = isDelete
    ? `<p class="dialog-copy">将删除「${escapeHtml(name)}」。${isGroup ? `组内 ${groupImpact} 个标签会移到「未分组」，并保留内容关联。${groupImpact ? '所有使用这些标签的项目都会显示新的标签分组。' : ''}` :
      `当前样例中有 ${labelImpact} 条内容用到此标签。删除后，标签会从内容展示、筛选和个人置顶中移除。`}</p>`
    : `<label class="field"><span>分组名称</span><input name="name" autocomplete="off" maxlength="24" value="${escapeHtml(name ?? '')}" placeholder="输入分组名称" required></label>`
  editor.innerHTML = `<form class="dialog-form">
    <div class="dialog-title"><h2 id="editor-title">${verb}${noun}</h2><button type="button" class="icon-btn" data-act="editor-close" aria-label="关闭窗口">${icon('close')}</button></div>
    ${fields}${filterImpact ? `<p class="dialog-copy">${filterImpact}</p>` : ''}<p class="dialog-error" role="alert" hidden></p>
    <div class="dialog-actions">
      ${id && !isDelete ? `<button type="button" class="btn subtle" data-act="delete-confirm" data-id="${id}">删除${noun}</button>` : ''}
      <button type="button" class="btn" data-act="editor-close" data-k="editor-cancel">取消</button>
      <button type="submit" class="btn ${isDelete ? 'danger' : 'primary'}">${isDelete ? '确认删除' : source ? '保存' : '创建'}</button>
    </div>
  </form>`
  if (!editor.open) editor.showModal()
  editor.querySelector(isDelete ? '[data-k="editor-cancel"]' : 'input')?.focus()
}
function performEdit(form) {
  if (!state.edit || !canManage()) return
  const { kind, id } = state.edit
  const isGroup = kind.includes('group')
  const isDelete = kind.startsWith('delete')
  const values = new FormData(form)
  if (kind === 'confirm-tag-move') {
    state.edit.apply()
    return
  }
  if (kind === 'move-tag') {
    const groupId = String(values.get('group'))
    const before = String(values.get('before'))
    confirmTagMove(id, groupId, () => applyTagMove(id, groupId, before))
    return
  }
  if (kind === 'move-group-order') {
    applyGroupOrder(id, String(values.get('before')))
    return
  }
  const name = String(values.get('name') || '').trim()
  const key = normalize(name)
  if (!isDelete) {
    const duplicate = db.groups.some(group => group[0] !== id && normalize(group[2]) === key)
    if (!key || duplicate || key === normalize('未分组')) {
      showEditorError(key ? '已有同名分组或使用了保留名称，请使用其他名称' : '请输入名称')
      return
    }
  }
  let feedback
  if (isDelete && isGroup) {
    const destination = orderedGroupTags('')
    const moved = orderedGroupTags(id)
    for (const tag of moved) tag[2] = ''
    saveTagOrder([...destination, ...moved])
    db.groups = db.groups.filter(group => group[0] !== id)
    for (const pref of Object.values(db.prefs)) {
      pref.shortcuts = pref.shortcuts.filter(groupId => groupId !== id)
    }
    if (state.inlineTag?.groupId === id) {
      if (state.inlineTag.id) state.inlineTag.groupId = ''
      else state.inlineTag = null
    }
    feedback = '分组已删除，标签已移到未分组'
  } else if (isDelete) {
    tagById(id)[5] = true
    const removedCondition = state.filter.ids.includes(id)
    state.filter.ids = state.filter.ids.filter(key => key !== id)
    state.filter.groups = state.filter.groups
      .map(group => ({ ...group, ids: group.ids.filter(key => key !== id) }))
      .filter(group => group.ids.length)
    if (!state.filter.ids.length) state.filter = emptyFilter()
    feedback = '标签已删除'
    if (removedCondition) feedback += state.filter.ids.length ? '，已更新当前筛选' : '，已清除当前标签筛选'
  } else {
    if (id) groupById(id)[2] = name
    else {
      const group = [uid(), videoTagKind, name]
      db.groups.push(group)
      placeGroup(group)
    }
    feedback = id ? '分组已保存' : '分组已创建'
  }
  save()
  editor.close()
  render()
  announce(feedback)
}
function switchView(view, trigger, preserveDraft = false) {
  if (state.view === 'manage' && view !== 'manage' && keepUnsavedTagEdit()) return false
  closePicker(false)
  const prior = state.view
  state.view = view
  if (view === 'new' && !preserveDraft) state.taskDraft = { title: '', tags: [] }
  if (view === 'manage' && prior !== 'manage') {
    state.manageSearch = ''
  }
  if (view !== 'manage') {
    state.suspendedPicker = null
    state.inlineTag = null
  }
  render()
  window.scrollTo(0, 0)
  if (trigger) {
    const heading = page.querySelector('h1')
    heading.tabIndex = -1
    heading.focus({ preventScroll: true })
  }
  return true
}
function manageFromPicker() {
  const { anchorKey, context, groupId, draft, query, relations, rulesOpen } = state.picker
  const previous = state.view
  const targetCount = state.selectedRows.size
  switchView('manage', true)
  state.suspendedPicker = { previous, anchorKey, context, groupId, draft, query, relations, rulesOpen, targetCount }
  render()
  restoreFocus(page, 'return-picker')
}
function returnToPicker() {
  const prior = state.suspendedPicker
  if (!prior) return
  if (!switchView(prior.previous, false, true)) return
  const originalAnchor = page.querySelector(`[data-k="${prior.anchorKey}"]`)
  const anchor = originalAnchor || (prior.groupId && page.querySelector('[data-k="filter-1"]'))
  const batchTargetsChanged = prior.context.startsWith('batch-') && state.selectedRows.size < prior.targetCount
  if (!anchor) {
    restoreFocus(page, 'filter-1')
    if (batchTargetsChanged) announce('原选内容已不在当前结果中，请重新选择')
    return
  }
  openPicker(anchor, prior.context, originalAnchor ? prior.groupId : '')
  Object.assign(state.picker, {
    draft: prior.draft.filter(id => id === untagged || tagById(id)),
    query: originalAnchor ? prior.query : '',
    relations: prior.relations,
    rulesOpen: prior.rulesOpen
  })
  renderPicker()
  if (batchTargetsChanged) announce(`操作范围已更新为 ${state.selectedRows.size} 条可见内容`)
  else if (state.picker.draft.length < prior.draft.length) announce('已移除不可用的标签')
}
function filterInput(target, reset = false) {
  const key = target.id
  const value = reset ? '' : target.value
  const selection = [target.selectionStart, target.selectionEnd]
  if (key === 'picker-search' && state.picker) {
    const scrolling = pickerElement.querySelector('.picker-scroll')
    if (scrolling) scrolling.scrollTop = 0
    state.picker.query = value
    renderPicker()
  } else if (key === 'manage-search') {
    state.manageSearch = value
    render()
  } else if (key === 'content-search') {
    state.contentSearch = value
    render()
  }
  const fresh = document.getElementById(key)
  if (fresh && ['search', 'text'].includes(fresh.type) && selection[0] !== null) {
    fresh.focus({ preventScroll: true })
    fresh.setSelectionRange(...(reset ? [0, 0] : selection))
  }
}
function createTask() {
  const title = state.taskDraft.title.trim()
  if (!title) {
    announce('请输入内容标题')
    document.querySelector('#task-title').focus()
    return
  }
  const tags = liveTags(state.taskDraft.tags)
  db.videos.unshift([uid(), title, '手动添加', 'YouTube', '—', tags])
  save()
  state.filter = emptyFilter()
  state.contentSearch = ''
  switchView('content', true)
  announce('监控已创建')
}
function onClick(event) {
  const summary = event.target.closest('.tag-menu summary')
  if (summary) {
    event.preventDefault()
    const menu = summary.closest('.tag-menu')
    for (const other of page.querySelectorAll('.tag-menu[open]')) {
      if (other !== menu) other.open = false
    }
    menu.open = !menu.open
    if (menu.open) positionTagMenu()
    return
  }
  const button = event.target.closest('button[data-act]')
  if (!button || button.disabled || button.getAttribute('aria-disabled') === 'true') return
  const { act, id, area, context, expanded } = button.dataset
  switch (act) {
    case 'content':
    case 'manage':
    case 'new':
      switchView(act, button)
      break
    case 'picker':
      openPicker(button, context, id)
      break
    case 'shortcut-add':
      changeGroupShortcut(id, true)
      break
    case 'shortcut-remove':
      changeGroupShortcut(id, false)
      break
    case 'picker-close':
      closePicker()
      break
    case 'picker-manage':
      manageFromPicker()
      break
    case 'return-picker':
      returnToPicker()
      break
    case 'clear-search':
      filterInput(document.getElementById(id), true)
      break
    case 'fold':
      if (area === 'manage' && state.inlineTag?.groupId === id) {
        if (inlineTagChanged()) {
          focusInlineTag()
          break
        }
        state.inlineTag = null
      }
      toggleGroup(area, id)
      if (area === 'manage') render()
      else renderPicker()
      break
    case 'fold-all':
      for (const { group } of allPickerGroups()) {
        prefs().collapsed[`picker-${group[1]}-${group[0]}`] = expanded === 'true'
      }
      save()
      renderPicker()
      break
    case 'toggle-tag':
      toggleDraft(id)
      break
    case 'clear-draft': {
      const { draft } = state.picker
      const shown = new Set(visiblePickerIds(state.picker, draft))
      state.picker.draft = draft.filter(key => !shown.has(key))
      renderPicker()
      restoreFocus(pickerElement, 'picker-apply') || restoreFocus(pickerElement, '#picker-search')
      break
    }
    case 'match-rules':
      state.picker.rulesOpen = !state.picker.rulesOpen
      renderPicker()
      break
    case 'apply-picker':
      applyPicker()
      break
    case 'pin':
      togglePin(id)
      break
    case 'detail':
      state.openRow = state.openRow === id ? '' : id
      render()
      break
    case 'clear-filters':
      state.filter = emptyFilter()
      render()
      restoreFocus(page, 'filter-1')
      break
    case 'clear-rows':
      state.selectedRows.clear()
      render()
      restoreFocus(page, 'all-videos')
      break
    case 'create-task':
      createTask()
      break
    case 'move-tag':
      if (!event.detail || Date.now() >= suppressDragClickUntil) openMoveEditor(id, button)
      break
    case 'move-group-order':
      if (!event.detail || Date.now() >= suppressDragClickUntil) openGroupOrderEditor(id, button)
      break
    case 'cancel-tag-move':
      cancelTagMove()
      break
    case 'new-tag-in-group':
      startInlineTag(null, id)
      break
    case 'edit-tag': {
      const tag = tagById(id)
      button.closest('.tag-menu').open = false
      if (tag) startInlineTag(tag, tag[2])
      break
    }
    case 'inline-palette':
      toggleInlinePalette(!state.inlineTag.paletteOpen, event.detail === 0)
      break
    case 'inline-color':
      state.inlineTag.color = id
      state.inlineTag.paletteOpen = false
      render()
      restoreFocus(page, 'inline-palette')
      break
    case 'inline-cancel':
      cancelInlineTag()
      break
    case 'delete-tag': {
      const menu = button.closest('.tag-menu')
      openEditor('delete-tag', id, menu.querySelector('summary'))
      menu.open = false
      break
    }
    case 'new-group':
    case 'edit-group':
      if (keepUnsavedTagEdit()) break
      openEditor(act, id, button)
      break
    case 'delete-confirm':
      openEditor('delete-group', id)
      break
    case 'editor-close':
      editor.close()
      break
  }
}
document.addEventListener('click', onClick)
document.addEventListener('input', event => {
  const target = event.target
  if (target.dataset.k === 'inline-name' && state.inlineTag) {
    state.inlineTag.name = target.value
    if (state.inlineTag.error) {
      state.inlineTag.error = ''
      target.removeAttribute('aria-invalid')
      target.removeAttribute('aria-describedby')
      target.form.querySelector('#inline-tag-error')?.remove()
    }
  }
  if (target.id === 'task-title') state.taskDraft.title = target.value
  if (target.type === 'search' && !event.isComposing && !composing) filterInput(target)
})
document.addEventListener('compositionstart', () => { composing = true })
document.addEventListener('compositionend', event => {
  composing = false
  if (event.target.type === 'search') filterInput(event.target)
})
document.addEventListener('change', event => {
  const target = event.target
  if (state.edit?.kind === 'move-tag' && target.id === 'move-group') {
    editor.querySelector('#move-position').innerHTML = positionOptions(tagById(state.edit.id), target.value)
  }
  if (state.picker && target.dataset.relation) {
    state.picker.relations[target.dataset.relation] = target.value
    renderPicker()
  }
  if (target.dataset.check === 'tag') toggleDraft(target.dataset.id)
  if (target.dataset.check === 'all') {
    for (const video of visibleVideos()) {
      if (target.checked) state.selectedRows.add(video[0])
      else state.selectedRows.delete(video[0])
    }
    render()
  }
  if (target.dataset.check === 'video') {
    if (target.checked) state.selectedRows.add(target.dataset.id)
    else state.selectedRows.delete(target.dataset.id)
    render()
  }
  if (target.id === 'actor') {
    if (keepUnsavedTagEdit()) {
      target.value = state.actor
      return
    }
    state.actor = target.value
    state.suspendedPicker = null
    state.inlineTag = null
    state.filter = emptyFilter()
    state.selectedRows.clear()
    state.openRow = ''
    render()
    announce(state.actor === 'admin' ? '已切换为管理员' : '已切换为项目成员')
  }
})
document.addEventListener('pointerdown', event => {
  if (state.inlineTag?.paletteOpen && !event.target.closest('.inline-color-control')) toggleInlinePalette(false)
  for (const menu of page.querySelectorAll('.tag-menu[open]')) {
    if (!menu.contains(event.target)) menu.open = false
  }
  startOrderDrag(event)
  if (state.picker && !pickerElement.contains(event.target)) {
    event.preventDefault()
    closePicker()
  }
})
document.addEventListener('pointermove', updateOrderDrag)
document.addEventListener('pointerup', event => {
  if (orderDrag?.pointer === event.pointerId) finishOrderDrag(true)
})
document.addEventListener('pointercancel', event => {
  if (orderDrag?.pointer === event.pointerId) finishOrderDrag(false)
})
document.addEventListener('keydown', event => {
  if (orderDrag && event.key === 'Escape') {
    event.preventDefault()
    finishOrderDrag(false)
    return
  }
  if (event.isComposing || composing) return
  const color = event.target.closest('button[data-act="inline-color"]')
  if (color && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
    event.preventDefault()
    const colors = Object.keys(tagColors)
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const next = colors[(colors.indexOf(color.dataset.id) + direction + colors.length) % colors.length]
    restoreFocus(page, `inline-color-${next}`)
    return
  }
  const menu = event.target.closest('.tag-menu[open]')
  if (menu && event.key === 'Escape') {
    event.preventDefault()
    menu.open = false
    menu.querySelector('summary').focus()
    return
  }
  if (state.inlineTag && event.target.closest('.inline-tag-form') && event.key === 'Escape') {
    event.preventDefault()
    if (state.inlineTag.paletteOpen) {
      toggleInlinePalette(false, true)
    } else cancelInlineTag()
    return
  }
  if (!state.picker) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closePicker()
  }
  if (event.key === 'Tab') {
    const focusable = [...pickerElement.querySelectorAll('button, input, select')].filter(
      el => !el.disabled && el.getAttribute('aria-disabled') !== 'true' && el.getClientRects().length
    )
    const atFirst = document.activeElement === focusable[0]
    const atLast = document.activeElement === focusable.at(-1)
    if ((atFirst && event.shiftKey) || (atLast && !event.shiftKey)) {
      event.preventDefault()
      focusable[event.shiftKey ? focusable.length - 1 : 0].focus()
    }
  }
})
page.addEventListener('submit', event => {
  if (!event.target.matches('.inline-tag-form')) return
  event.preventDefault()
  if (!composing) saveInlineTag()
})
page.addEventListener('focusin', event => {
  if (state.inlineTag?.paletteOpen && !event.target.closest('.inline-color-control')) toggleInlinePalette(false)
})
editor.addEventListener('submit', event => {
  event.preventDefault()
  performEdit(event.target)
})
editor.addEventListener('cancel', event => {
  if (state.edit?.kind === 'confirm-tag-move') {
    event.preventDefault()
    cancelTagMove()
  }
})
editor.addEventListener('close', () => {
  state.edit = null
  const focus = restoreFocus(page, editorTrigger) || restoreFocus(page, '#manage-search')
  focus?.scrollIntoView({ block: 'nearest' })
  editorTrigger = null
})
window.addEventListener('resize', positionPicker)
window.addEventListener('scroll', positionPicker, { passive: true })
window.addEventListener('resize', positionInlinePalette)
window.addEventListener('scroll', positionInlinePalette, { passive: true })
window.addEventListener('resize', positionTagMenu)
window.addEventListener('scroll', positionTagMenu, { passive: true })
render()
const launch = new URLSearchParams(location.search).get('view')
if (launch === 'manage') switchView('manage')
else if (launch !== 'content') openPicker(page.querySelector('[data-k="filter-1"]'), 'filter')
