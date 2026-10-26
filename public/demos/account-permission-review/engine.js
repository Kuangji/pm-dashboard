(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ReviewEngine = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const clone = value => JSON.parse(JSON.stringify(value));
  const member = (groupId, role = 'T3', used = 0) => ({ groupId, role, status: 'ACTIVE', quotaMode: 'inherit', quotaLimit: 2500, used, paymentLimit: null, paymentUsed: 0, paymentPending: 0 });
  function createState() {
    return {
      organization: { name: '星野品牌 · 示例组织', quotaLimit: 10000, used: 1680, walletBalance: 50000, walletPending: 1200, seatLimit: 12 },
      users: [
        { id: 'u-owner', name: '林知夏', email: 'lin@xingye.example', orgRole: 'owner', status: 'ACTIVE', memberships: [member('g-growth'), member('g-default', 'T2')] },
        { id: 'u-admin', name: '陈予安', email: 'chen@xingye.example', orgRole: 'admin', status: 'ACTIVE', memberships: [member('g-growth', 'T2', 110), member('g-brand', 'T2', 80)] },
        { id: 'u-lead', name: '周明', email: 'zhou@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [member('g-growth', 'T2', 310)] },
        { id: 'u-member', name: '许念', email: 'xu@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [Object.assign(member('g-growth', 'T3', 720), { paymentUsed: 2200, paymentPending: 1200 })] },
        { id: 'u-editor', name: '孙可', email: 'sun@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [member('g-growth', 'T3', 260)] },
        { id: 'u-brand', name: '乔南', email: 'qiao@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [Object.assign(member('g-brand', 'T2', 200), { paymentUsed: 800 })] },
        { id: 'u-view', name: '方禾', email: 'fang@xingye.example', orgRole: 'member', status: 'ACTIVE', memberships: [member('g-growth', 'T3', 0)] }
      ],
      groups: [
        { id: 'g-default', name: '默认组', status: 'ACTIVE', isDefault: true, quotaLimit: 10000, used: 0, fundLimit: null, fundUsed: 0, fundPending: 0, requireT2PaymentRelease: false },
        { id: 'g-growth', name: '增长团队', status: 'ACTIVE', isDefault: false, quotaLimit: 6000, used: 1400, fundLimit: 12000, fundUsed: 2200, fundPending: 1200, requireT2PaymentRelease: false },
        { id: 'g-brand', name: '品牌团队', status: 'ACTIVE', isDefault: false, quotaLimit: 4000, used: 280, fundLimit: 8000, fundUsed: 800, fundPending: 0, requireT2PaymentRelease: false },
        { id: 'g-empty', name: '新市场团队', status: 'ACTIVE', isDefault: false, quotaLimit: 3000, used: 0, fundLimit: null, fundUsed: 0, fundPending: 0, requireT2PaymentRelease: false }
      ],
      projects: [
        { id: 'email1', module: 'email', name: '秋季新品达人邀约', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'ACTIVE', collaborators: [{ uid: 'u-editor', disabled: false, canManage: true, canExecute: false }] },
        { id: 'monitor1', module: 'monitor', name: '秋季新品内容监控', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'ACTIVE', collaborators: [{ uid: 'u-editor', disabled: false, canManage: false, canExecute: false }] },
        { id: 'resource1', module: 'resource', name: '北美生活方式创作者', groupId: 'g-growth', ownerId: 'u-editor', creatorId: 'u-editor', assigneeId: null, status: 'ACTIVE', collaborators: [{ uid: 'u-member', disabled: false, canManage: false, canExecute: false }] },
        { id: 'crm1', module: 'crm', name: 'Mia · 护肤合作洽谈', groupId: 'g-growth', ownerId: null, creatorId: 'u-member', assigneeId: 'u-member', status: 'ACTIVE', collaborators: [{ uid: 'u-editor', disabled: false, canManage: false, canExecute: false }] },
        { id: 'crm2', module: 'crm', name: 'Alex · 新增合作线索', groupId: 'g-growth', ownerId: null, creatorId: 'u-member', assigneeId: null, status: 'ACTIVE', collaborators: [] },
        { id: 'pay1', module: 'payment', name: 'Mia · 首批合作款', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'DRAFT', paymentAmount: 800, collaborators: [{ uid: 'u-editor', disabled: false, canManage: false, canExecute: false }] },
        { id: 'pay2', module: 'payment', name: 'Alex · 十月合作尾款', groupId: 'g-growth', ownerId: 'u-member', creatorId: 'u-member', assigneeId: null, status: 'FORMAL', paymentAmount: 1200, fundingUid: 'u-member', fundingGroupId: 'g-growth', fundingCommitted: true, collaborators: [] },
        { id: 'brand-email', module: 'email', name: '品牌联名邀请', groupId: 'g-brand', ownerId: 'u-brand', creatorId: 'u-brand', assigneeId: null, status: 'ACTIVE', collaborators: [] }
      ],
      policies: { t2Collaborator: false, t2Quota: false, paymentSensitive: false, monitorLabelsT2: false, showTeamQuota: false },
      invites: [], tasks: [], audit: [], notifications: [],
      allocations: [
        { id: 'alloc-growth', groupId: 'g-growth', amount: 12000, reversed: 0, reason: '十月增长预算', operatorId: 'u-owner', at: '2026-10-01 09:00' },
        { id: 'alloc-brand', groupId: 'g-brand', amount: 8000, reversed: 0, reason: '十月品牌预算', operatorId: 'u-owner', at: '2026-10-01 09:05' }
      ],
      labels: [
        { id: 'tag1', name: '新品合作', creatorId: 'u-member', groupId: 'g-growth', module: 'monitor' },
        { id: 'tag2', name: '内容待确认', creatorId: 'u-editor', groupId: 'g-growth', module: 'monitor' },
        { id: 'tag3', name: '品牌联名', creatorId: 'u-brand', groupId: 'g-brand', module: 'monitor' },
        { id: 'tag-message1', name: '等待回复', creatorId: 'u-member', groupId: 'g-growth', module: 'message' },
        { id: 'tag-message2', name: '合同确认', creatorId: 'u-editor', groupId: 'g-growth', module: 'message' },
        { id: 'tag-message3', name: '品牌洽谈', creatorId: 'u-brand', groupId: 'g-brand', module: 'message' },
        { id: 'tag-crm1', name: '重点合作', creatorId: 'u-member', groupId: 'g-growth', module: 'crm', affected: 18 },
        { id: 'tag-crm2', name: '品牌签约', creatorId: 'u-brand', groupId: 'g-brand', module: 'crm', affected: 7 }
      ],
      usage: [
        { uid: 'u-member', groupId: 'g-growth', sent: 720, opened: 318, replied: 42, cooperate: 11, monitor: 7, clicks: 1320, samples: 9, month: '2026-10' },
        { uid: 'u-editor', groupId: 'g-growth', sent: 260, opened: 112, replied: 15, cooperate: 4, monitor: 3, clicks: 540, samples: 4, month: '2026-10' },
        { uid: 'u-lead', groupId: 'g-growth', sent: 310, opened: 144, replied: 23, cooperate: 5, monitor: 4, clicks: 810, samples: 5, month: '2026-10' },
        { uid: 'u-admin', groupId: 'g-growth', sent: 110, opened: 48, replied: 8, cooperate: 2, monitor: 2, clicks: 240, samples: 1, month: '2026-10' },
        { uid: 'u-admin', groupId: 'g-brand', sent: 80, opened: 41, replied: 5, cooperate: 1, monitor: 1, clicks: 180, samples: 0, month: '2026-10' },
        { uid: 'u-brand', groupId: 'g-brand', sent: 200, opened: 88, replied: 13, cooperate: 3, monitor: 2, clicks: 430, samples: 2, month: '2026-10' }
      ]
    };
  }
  const user = (s, id) => s.users.find(x => x.id === id);
  const group = (s, id) => s.groups.find(x => x.id === id);
  const project = (s, id) => s.projects.find(x => x.id === id);
  const membership = (s, uid, gid) => user(s, uid)?.memberships.find(x => x.groupId === gid && x.status !== 'REMOVED');
  const active = (s, uid, gid) => user(s, uid)?.status === 'ACTIVE' && membership(s, uid, gid)?.status === 'ACTIVE' && group(s, gid)?.status === 'ACTIVE';
  const canManageOrganization = (s, uid) => user(s, uid)?.status === 'ACTIVE' && ['owner', 'admin'].includes(user(s, uid)?.orgRole);
  const isLead = (s, uid, gid) => active(s, uid, gid) && membership(s, uid, gid).role === 'T2';
  const leadQuota = (s, uid, gid) => canManageOrganization(s, uid) || (s.policies.t2Quota && isLead(s, uid, gid));
  const number = value => Number.isFinite(Number(value)) && Number(value) >= 0;
  const id = prefix => prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  function access(s, uid, pid) {
    const p = project(s, pid);
    const r = { read: false, write: false, manage: false, grant: false, transfer: false, execute: false, delete: false, source: [], reason: '', role: 'None' };
    if (!p) return Object.assign(r, { reason: '对象不存在' });
    if (!active(s, uid, p.groupId)) return Object.assign(r, { reason: '需要对象所属组的 ACTIVE 成员身份；组织管理身份不授予业务权限' });
    if (p.status === 'DELETED') return Object.assign(r, { reason: '对象已删除' });
    const own = p.ownerId === uid;
    const assignee = p.module === 'crm' && p.assigneeId === uid;
    const c = p.collaborators.find(x => x.uid === uid && !x.disabled);
    const implicit = s.policies.t2Collaborator && isLead(s, uid, p.groupId);
    if (own) r.source.push('项目 Owner');
    if (assignee) r.source.push('CRM Assignee');
    if (c) r.source.push('显式 Collaborator');
    if (implicit && !own && !assignee) r.source.push('组长默认协作策略');
    r.write = !!(own || assignee || c || implicit);
    r.read = r.write;
    if (p.module === 'payment' && p.status !== 'DRAFT') {
      r.read = true;
      if (!r.write) r.source.push('正式支付单同组只读');
    }
    r.role = own ? 'Owner' : assignee ? 'Assignee' : r.write ? 'Collaborator' : r.read ? 'Viewer' : 'None';
    r.manage = !!(own || assignee || c?.canManage);
    r.grant = !!(own || assignee);
    if (p.module === 'crm' && !p.assigneeId) r.manage = r.grant = false;
    r.transfer = own && p.module !== 'payment';
    r.execute = p.module === 'payment' && !!(own || c?.canExecute);
    r.delete = p.module === 'payment' ? p.status === 'DRAFT' && r.write : own;
    r.reason = r.read ? '已合并当前有效授权来源；附加能力独立判断' : '未获得此对象授权；同组成员不自动获得项目权限';
    return r;
  }
  function balances(s, gid, uid) {
    const orgAvailable = s.organization.walletBalance - s.organization.walletPending;
    const reserved = s.groups.filter(g => g.fundLimit !== null).reduce((v, g) => v + Math.max(0, g.fundLimit - g.fundUsed - g.fundPending), 0);
    const unallocated = Math.max(0, orgAvailable - reserved);
    const g = group(s, gid), m = membership(s, uid, gid);
    const groupRemaining = g ? g.fundLimit === null ? unallocated : Math.max(0, g.fundLimit - g.fundUsed - g.fundPending) : 0;
    const memberRemaining = m ? m.paymentLimit === null ? Infinity : Math.max(0, m.paymentLimit - (m.paymentUsed || 0) - (m.paymentPending || 0)) : 0;
    return { orgAvailable, unallocated, groupRemaining, memberRemaining, available: Math.min(orgAvailable, groupRemaining, memberRemaining) };
  }
  function act(s, actorId, type, payload = {}) {
    const a = user(s, actorId);
    const fail = message => ({ ok: false, message });
    if (!a || a.status !== 'ACTIVE') return fail('账号不处于 ACTIVE 状态，不能继续操作');
    const p = payload.projectId ? project(s, payload.projectId) : null;
    const g = payload.groupId ? group(s, payload.groupId) : null;
    const u = payload.uid ? user(s, payload.uid) : null;
    const m = payload.uid && payload.groupId ? membership(s, payload.uid, payload.groupId) : null;
    const rights = p ? access(s, actorId, p.id) : null;
    const adminActions = ['invite', 'acceptInvite', 'addGroup', 'renameGroup', 'setRole', 'setOrgRole', 'transferOrgOwner', 'addMembership', 'removeMembership', 'cancelRemoval', 'completeRemoval', 'archiveGroup', 'moveProjects', 'allocateFunds', 'reverseFunds', 'setPaymentLimit'];
    if (adminActions.includes(type) && !canManageOrganization(s, actorId)) return fail('只有组织 Owner/Admin 可以执行此组织管理动作；T2 身份不授予该动作');
    let message = '操作已完成', extra = {};
    switch (type) {
      case 'invite': {
        if (!g || g.status !== 'ACTIVE') return fail('请选择有效业务组');
        const email = String(payload.email || '').trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('请输入有效邮箱');
        if (s.users.some(x => x.email.toLowerCase() === email && x.status !== 'REMOVED') || s.invites.some(x => x.email === email && x.status === 'PENDING')) return fail('该邮箱已经在组织或待接受邀请中');
        if (s.users.filter(x => x.status === 'ACTIVE').length + s.invites.filter(x => x.status === 'PENDING').length >= s.organization.seatLimit) return fail('组织席位已满；有效成员和待接受邀请共同占用席位');
        if (payload.quotaMode === 'capped' && (!number(payload.quotaLimit) || Number(payload.quotaLimit) > g.quotaLimit)) return fail('个人上限不能超过组上限');
        const inv = { id: id('invite'), name: String(payload.name || email.split('@')[0]), email, groupId: g.id, role: 'T3', quotaMode: payload.quotaMode || 'inherit', quotaLimit: Number(payload.quotaLimit || 0), status: 'PENDING' };
        s.invites.push(inv); extra.inviteId = inv.id; message = '邀请已发送（模拟）；接受前不创建有效组身份'; break;
      }
      case 'cancelInvite': {
        if (!canManageOrganization(s, actorId)) return fail('需要组织管理权限');
        const inv = s.invites.find(x => x.id === payload.inviteId);
        if (!inv || inv.status !== 'PENDING') return fail('邀请已处理');
        inv.status = 'CANCELLED'; message = '邀请已撤销，释放占用席位'; break;
      }
      case 'acceptInvite': {
        const inv = s.invites.find(x => x.id === payload.inviteId);
        if (!inv || inv.status !== 'PENDING') return fail('邀请已处理或不存在');
        const targetGroup = group(s, inv.groupId);
        if (!targetGroup || targetGroup.status !== 'ACTIVE') return fail('目标组已归档，邀请配置失效');
        if (s.users.filter(x => x.status === 'ACTIVE').length >= s.organization.seatLimit) return fail('接受时组织席位已满，请先释放席位');
        if (inv.quotaMode === 'capped' && inv.quotaLimit > targetGroup.quotaLimit) return fail('组上限变化，需重新配置邀请');
        const uid = id('u'); s.users.push({ id: uid, name: inv.name, email: inv.email, orgRole: 'member', status: 'ACTIVE', memberships: [Object.assign(member(inv.groupId), { quotaMode: inv.quotaMode, quotaLimit: inv.quotaLimit })] });
        inv.status = 'ACCEPTED'; extra.uid = uid; message = '已模拟受邀人接受；组织、组身份和配额配置一起生效'; break;
      }
      case 'addGroup': {
        const name = String(payload.name || '').trim();
        if (!name) return fail('请填写组名');
        if (s.groups.some(x => x.name === name && x.status === 'ACTIVE')) return fail('该组名已存在');
        const gid = id('g'); s.groups.push({ id: gid, name, status: 'ACTIVE', isDefault: false, quotaLimit: s.organization.quotaLimit, used: 0, fundLimit: null, fundUsed: 0, fundPending: 0, requireT2PaymentRelease: false }); extra.groupId = gid; message = '空组已创建，允许 0 名成员和 0 名 T2'; break;
      }
      case 'renameGroup': {
        if (!g || !String(payload.name || '').trim()) return fail('组和名称不能为空');
        g.name = String(payload.name).trim(); break;
      }
      case 'setRole': {
        if (!m || m.status !== 'ACTIVE' || !['T2', 'T3'].includes(payload.role)) return fail('请选择有效组成员和 T2/T3 身份');
        m.role = payload.role; message = '组内身份已修改；同组允许多名 T2，其他组身份不变'; break;
      }
      case 'setOrgRole': {
        if (a.orgRole !== 'owner') return fail('任免组织 Admin 仅允许组织 Owner 操作');
        if (!u || u.orgRole === 'owner' || !['admin', 'member'].includes(payload.orgRole)) return fail('不能通过该动作修改组织 Owner');
        u.orgRole = payload.orgRole; message = '组织身份已修改；业务组身份和项目 ACL 均保持'; break;
      }
      case 'transferOrgOwner': {
        if (a.orgRole !== 'owner' || !u || u.status !== 'ACTIVE' || u.id === a.id) return fail('仅当前组织 Owner 可将所有权转给其他有效组织成员');
        a.orgRole = 'admin'; u.orgRole = 'owner'; message = '组织所有权已移交；项目和组内身份未改变'; break;
      }
      case 'setPolicy': {
        if (!canManageOrganization(s, actorId)) return fail('需要组织管理身份；T2 不能修改组织全局策略');
        if (!(payload.key in s.policies)) return fail('未知组织策略');
        s.policies[payload.key] = !!payload.value; message = '组织策略已更新，现有对象的系统授权来源实时重新计算'; break;
      }
      case 'setGroupPolicy': {
        if (!canManageOrganization(s, actorId) || !g || g.status !== 'ACTIVE') return fail('需要有效组和组织管理权限；组策略编辑主体仍需评审');
        if (payload.key !== 'requireT2PaymentRelease') return fail('未知组级策略');
        g.requireT2PaymentRelease = !!payload.value;
        if (!g.requireT2PaymentRelease) s.projects.filter(x => x.groupId === g.id && x.status === 'WAITING_REVIEW').forEach(x => x.status = x.scheduled ? 'SCHEDULED' : 'FORMAL');
        message = '组级支付审核策略已更新；关闭后未执行订单解除组长审核闸门（评审示意）'; break;
      }
      case 'setQuota': {
        if (!g || g.status !== 'ACTIVE' || !leadQuota(s, actorId, g.id)) return fail('需要组织管理权限，或已获委派的本组 T2');
        if (payload.uid) {
          if (!m || m.status !== 'ACTIVE') return fail('目标账号不是有效组成员');
          if (!['inherit', 'capped'].includes(payload.mode)) return fail('请选择共享或个人上限');
          if (payload.mode === 'capped' && (!number(payload.limit) || Number(payload.limit) > g.quotaLimit)) return fail('个人上限不能超过组上限；同组个人上限之和可以超配');
          m.quotaMode = payload.mode; m.quotaLimit = Number(payload.limit || 0);
        } else {
          if (!canManageOrganization(s, actorId)) return fail('T2 不能修改组本身的上限');
          if (payload.mode !== 'inherit' && (!number(payload.limit) || Number(payload.limit) > s.organization.quotaLimit)) return fail('组上限不能超过组织上限');
          g.quotaMode = payload.mode === 'inherit' ? 'inherit' : 'capped';
          g.quotaLimit = payload.mode === 'inherit' ? s.organization.quotaLimit : Number(payload.limit);
        }
        message = '配额已保存；低于已用量时可用量为 0，历史消耗不回滚'; break;
      }
      case 'batchIncreaseQuota': {
        if (!g || !leadQuota(s, actorId, g.id) || !number(payload.amount)) return fail('需要有效组、增量和配额管理权限');
        if (Array.isArray(payload.uids) && !payload.uids.length) return fail('请至少选择一个成员');
        const targets = s.users.filter(x => !payload.uids || payload.uids.includes(x.id)).flatMap(x => x.memberships.filter(mm => mm.groupId === g.id && mm.status === 'ACTIVE' && mm.quotaMode === 'capped').map(mm => ({ uid: x.id, m: mm })));
        if (targets.some(x => x.m.quotaLimit + Number(payload.amount) > g.quotaLimit)) return fail('至少一个账号增加后将超过组上限，整批未执行');
        targets.forEach(x => x.m.quotaLimit += Number(payload.amount)); message = '已增加 ' + targets.length + ' 个 capped 成员；共享模式已跳过'; break;
      }
      case 'consume': {
        const mm = membership(s, actorId, payload.groupId), amount = Number(payload.amount);
        if (!active(s, actorId, payload.groupId) || !g) return fail('当前组身份无效');
        if (!Number.isFinite(amount) || amount <= 0) return fail('消耗量必须大于 0');
        if (s.organization.used + amount > s.organization.quotaLimit) return fail('组织额度不足，未扣减');
        if (g.used + amount > g.quotaLimit) return fail('组额度不足，未扣减');
        if (mm.quotaMode === 'capped' && mm.used + amount > mm.quotaLimit) return fail('个人额度不足，未扣减');
        mm.used += amount; g.used += amount; s.organization.used += amount; message = '消费已通过组织 → 组 → 当前操作账号三级校验'; break;
      }
      case 'addMembership': {
        if (!u || u.status !== 'ACTIVE' || !g || g.status !== 'ACTIVE') return fail('账号或目标组无效');
        if (m) return fail('该成员已经在组内或仍有待完成的退组任务');
        u.memberships.push(member(g.id, payload.role === 'T2' ? 'T2' : 'T3'));
        s.projects.filter(x => x.groupId === g.id).forEach(x => x.collaborators.filter(c => c.uid === u.id).forEach(c => c.disabled = false));
        message = '组成员关系已新增；目标组内被禁用且未删除的原授权恢复'; break;
      }
      case 'removeMembership': {
        if (!u || !m || m.status !== 'ACTIVE') return fail('目标成员没有可移除的 ACTIVE 组关系');
        if (u.orgRole === 'owner' && (payload.organizationExit || u.memberships.filter(x => x.status === 'ACTIVE').length <= 1)) return fail('组织 Owner 必须先转让组织所有权，且至少保留一个 ACTIVE 业务组');
        const memberships = payload.organizationExit ? u.memberships.filter(x => x.status === 'ACTIVE' || x.status === 'REMOVING') : [m];
        if (payload.organizationExit) u.status = 'REMOVING';
        const ids = [];
        memberships.forEach(mm => {
          mm.status = 'REMOVING';
          const oldTask = s.tasks.find(t => t.uid === u.id && t.groupId === mm.groupId && t.status === 'REMOVING');
          if (oldTask) { if (payload.organizationExit) oldTask.organizationExit = true; ids.push(oldTask.id); return; }
          const task = { id: id('task'), type: 'REMOVAL', uid: u.id, groupId: mm.groupId, status: 'REMOVING', organizationExit: !!payload.organizationExit, targetId: null, objectCount: s.projects.filter(x => x.groupId === mm.groupId && (x.ownerId === u.id || x.assigneeId === u.id || x.collaborators.some(c => c.uid === u.id))).length };
          s.tasks.push(task); ids.push(task.id);
        }); extra.taskId = ids[0]; extra.taskIds = ids; message = '成员已进入 REMOVING 并立即失权；资产暂未移交，可稍后处理'; break;
      }
      case 'cancelRemoval': {
        const task = s.tasks.find(t => t.id === payload.taskId);
        if (!task || task.status !== 'REMOVING') return fail('任务已结束');
        if (task.organizationExit) return fail('组织移出不可撤销');
        if (group(s, task.groupId)?.status !== 'ACTIVE') return fail('组已归档，不能撤销为有效业务身份');
        membership(s, task.uid, task.groupId).status = 'ACTIVE'; task.status = 'CANCELLED'; message = '退组已撤销；尚无资产移交，无需逆向恢复'; break;
      }
      case 'completeRemoval': {
        const task = s.tasks.find(t => t.id === payload.taskId);
        if (!task || task.status !== 'REMOVING') return fail('任务已结束或不存在');
        const departing = user(s, task.uid), target = payload.targetId ? user(s, payload.targetId) : null;
        const owned = s.projects.filter(x => x.groupId === task.groupId && x.ownerId === departing.id);
        if (owned.length && (!target || target.id === departing.id || !active(s, target.id, task.groupId))) return fail('项目型对象必须选择一个同组 ACTIVE 接收人；未指定可继续保留 REMOVING');
        if (target && (!active(s, target.id, task.groupId) || target.id === departing.id)) return fail('接收人须为同组其他 ACTIVE 成员');
        if (!task.organizationExit && !departing.memberships.some(x => x.groupId !== task.groupId && x.status === 'ACTIVE')) return fail('最后一个业务组：请先加入另一真实组或改为组织移出');
        s.projects.filter(x => x.groupId === task.groupId).forEach(x => {
          if (x.ownerId === departing.id) x.ownerId = target.id;
          if (x.assigneeId === departing.id) x.assigneeId = target?.id || null;
          x.collaborators = x.collaborators.filter(c => c.uid !== departing.id && c.uid !== x.ownerId && c.uid !== x.assigneeId);
        });
        membership(s, departing.id, task.groupId).status = 'REMOVED'; task.status = 'COMPLETED'; task.targetId = target?.id || null;
        if (task.organizationExit && !s.tasks.some(t => t.uid === departing.id && t.status === 'REMOVING')) departing.status = 'REMOVED';
        s.notifications.push({ id: id('notice'), title: departing.name + ' 的移交已完成', message: '原组、历史创建人、用量与资金承担快照保持不变', uid: actorId, at: new Date().toISOString() });
        message = '已完成同组责任和授权清理，状态进入 REMOVED'; break;
      }
      case 'archiveGroup': {
        if (!g || g.status !== 'ACTIVE') return fail('该组不存在或已归档');
        if (g.isDefault) return fail('示意限制：默认组承担组织安全归属，归档规则待确认');
        const owner = s.users.find(x => x.orgRole === 'owner');
        if (active(s, owner.id, g.id) && !owner.memberships.some(x => x.groupId !== g.id && x.status === 'ACTIVE' && group(s, x.groupId)?.status === 'ACTIVE')) return fail('组织 Owner 需要保留另一个有效业务组');
        g.status = 'ARCHIVED'; message = '组已冻结归档；对象、REMOVING 关系、历史和既有资金承诺保留'; break;
      }
      case 'addCollaborator': {
        if (!p || !rights.manage) return fail('仅对象 Owner/Assignee 或被授予管理协作者能力的人可操作');
        if (!u || !active(s, u.id, p.groupId)) return fail('候选协作者必须为对象所属组 ACTIVE 成员');
        if ([p.ownerId, p.assigneeId].includes(u.id)) return fail('该账号已是 Owner/Assignee，不新建重复协作身份');
        if (p.collaborators.some(c => c.uid === u.id)) return fail('该账号已有显式协作关系');
        p.collaborators.push({ uid: u.id, disabled: false, canManage: false, canExecute: false }); message = '协作者已加入，获得当前对象常规业务读写；附加能力默认关闭'; break;
      }
      case 'removeCollaborator': {
        if (!p || !rights.manage) return fail('没有管理协作者权限');
        const before = p.collaborators.length; p.collaborators = p.collaborators.filter(c => c.uid !== payload.uid);
        if (before === p.collaborators.length) return fail('只有系统来源时不可手动删除；请检查组织策略');
        message = '显式协作关系已删除；系统 T2 等其他独立来源仍可能生效'; break;
      }
      case 'setCapability': {
        if (!p || !rights.grant) return fail('仅对象 Owner/Assignee 可授予附加能力；协作者不能继续转授');
        if (!['canManage', 'canExecute'].includes(payload.capability) || (payload.capability === 'canExecute' && p.module !== 'payment')) return fail('该对象不支持此附加能力');
        const c = p.collaborators.find(x => x.uid === payload.uid && !x.disabled);
        if (!c || !active(s, c.uid, p.groupId)) return fail('只有有效显式 Collaborator 可获附加能力');
        c[payload.capability] = !!payload.value; message = '附加能力已更新，不产生可继续转授的资格'; break;
      }
      case 'transferOwner': {
        if (!p || !rights.transfer) return fail('仅当前 Owner 可主动转交；支付对象不可主动转交');
        if (!active(s, payload.targetId, p.groupId) || payload.targetId === p.ownerId) return fail('新 Owner 必须为同组其他 ACTIVE 成员');
        p.ownerId = payload.targetId; p.collaborators = p.collaborators.filter(c => c.uid !== payload.targetId);
        message = 'Owner 已转交；新 Owner 的重复 ACL 已清理，原 Owner 不自动成为协作者'; break;
      }
      case 'assignCRM': {
        if (!p || p.module !== 'crm' || !active(s, actorId, p.groupId)) return fail('必须拥有记录所属组有效身份');
        if (!(isLead(s, actorId, p.groupId) || p.assigneeId === actorId)) return fail('仅当前 Assignee 或同组 T2 可指派；组织 Admin 不自动获得业务改派权');
        if (!payload.targetId || !active(s, payload.targetId, p.groupId)) return fail('请选择同组 ACTIVE 对接人；日常不主动清空');
        p.assigneeId = payload.targetId; p.collaborators = p.collaborators.filter(c => c.uid !== payload.targetId); message = 'CRM 对接人已改派；记录组不变，不建立项目 Owner'; break;
      }
      case 'moveProjects': {
        const targetGroup = group(s, payload.targetGroupId), sourceGroup = group(s, payload.sourceGroupId);
        if (!u || !targetGroup || !sourceGroup || payload.targetGroupId === payload.sourceGroupId || !active(s, u.id, targetGroup.id)) return fail('Owner 必须先加入有效目标组，且来源和目标不同');
        const moved = s.projects.filter(x => x.ownerId === u.id && x.groupId === sourceGroup.id && x.module !== 'crm' && x.status !== 'DELETED');
        moved.forEach(x => { x.groupId = targetGroup.id; x.collaborators.forEach(c => c.disabled = !active(s, c.uid, targetGroup.id)); });
        message = '已迁移该 Owner 在来源组的 ' + moved.length + ' 个项目；目标组外 ACL 禁用保留，资金历史不变'; break;
      }
      case 'allocateFunds': {
        const amount = Number(payload.amount);
        if (!g || g.status !== 'ACTIVE' || !Number.isFinite(amount) || amount <= 0) return fail('请选择有效组，追加金额须大于 0');
        if (!String(payload.reason || '').trim()) return fail('资金分配必须填写原因');
        if (amount > balances(s, g.id, actorId).unallocated) return fail('组织未分配余额不足，部门资金不能超发');
        if (g.fundLimit === null && amount < g.fundUsed + g.fundPending) return fail('首次明确部门上限不能低于已支付和已占用金额');
        g.fundLimit = (g.fundLimit || 0) + amount;
        const allocation = { id: id('alloc'), groupId: g.id, amount, reversed: 0, reason: String(payload.reason), operatorId: actorId, at: new Date().toISOString() };
        s.allocations.push(allocation); extra.allocationId = allocation.id; message = '部门金额上限已追加，每笔分配独立留痕'; break;
      }
      case 'reverseFunds': {
        const alloc = s.allocations.find(x => x.id === payload.allocationId), amount = Number(payload.amount);
        if (!alloc || !Number.isFinite(amount) || amount <= 0 || !String(payload.reason || '').trim()) return fail('需选择分配记录、填写正数金额和冲正原因');
        const gg = group(s, alloc.groupId);
        if (amount > alloc.amount - alloc.reversed || amount > gg.fundLimit - gg.fundUsed - gg.fundPending) return fail('只能冲正该记录尚未冲正部分及组未使用、未占用余额');
        alloc.reversed += amount; gg.fundLimit -= amount;
        s.allocations.push({ id: id('reversal'), groupId: gg.id, amount: -amount, originalId: alloc.id, reversed: 0, reason: String(payload.reason), operatorId: actorId, at: new Date().toISOString() });
        message = '已新增受控冲正记录，原分配记录保留；历史原值不覆盖'; break;
      }
      case 'setPaymentLimit': {
        if (!m || m.status !== 'ACTIVE' || !(payload.limit === null || number(payload.limit))) return fail('请选择有效组成员和合法金额，null 表示不设额外个人上限');
        m.paymentLimit = payload.limit === null ? null : Number(payload.limit); message = '账号支付上限已保存；仍受组资金和组织钱包约束'; break;
      }
      case 'savePayment': {
        const amount = Number(payload.amount);
        if (!p || p.module !== 'payment' || !rights.write || p.status !== 'DRAFT') return fail('只有有效 Owner/Collaborator 可修改草稿');
        if (!Number.isFinite(amount) || amount <= 0) return fail('金额必须大于 0');
        p.paymentAmount = amount; message = '草稿已保存；未创建正式支付单，暂不形成资金占用'; break;
      }
      case 'submitPayment': {
        if (!p || p.module !== 'payment' || !rights.execute || p.status !== 'DRAFT') return fail('正式提交需要 Owner 或显式 can_execute_payment，且对象必须是草稿');
        if (!active(s, p.ownerId, p.groupId)) return fail('Owner 不是同组有效成员，需先完成移交');
        const money = balances(s, p.groupId, p.ownerId), amount = p.paymentAmount;
        if (money.orgAvailable < amount) return fail('组织钱包可用余额不足');
        if (money.groupRemaining < amount) return fail('所属组支付余额不足');
        if (money.memberRemaining < amount) return fail('Owner 个人支付上限不足；不使用提交人的个人额度');
        const gg = group(s, p.groupId), mm = membership(s, p.ownerId, p.groupId);
        p.scheduled = !!payload.scheduled; p.scheduledAt = payload.when || null;
        p.status = gg.requireT2PaymentRelease && !isLead(s, actorId, p.groupId) ? 'WAITING_REVIEW' : payload.scheduled ? 'SCHEDULED' : 'FORMAL';
        p.fundingUid = p.ownerId; p.fundingGroupId = p.groupId; p.fundingCommitted = true; p.submitterId = actorId;
        s.organization.walletPending += amount; gg.fundPending += amount; mm.paymentPending = (mm.paymentPending || 0) + amount;
        message = '正式提交已占用 Owner 与所属组金额；实际提交人仅记录执行身份' + (p.status === 'WAITING_REVIEW' ? '，已进入待组长审核' : ''); break;
      }
      case 'cancelPayment': {
        if (!p || !rights.execute || !p.fundingCommitted || !['FORMAL', 'SCHEDULED', 'WAITING_REVIEW'].includes(p.status)) return fail('需要资金执行权和可取消的正式支付单');
        const gg = group(s, p.fundingGroupId), mm = membership(s, p.fundingUid, p.fundingGroupId), amount = p.paymentAmount;
        s.organization.walletPending -= amount; gg.fundPending -= amount; if (mm) mm.paymentPending = Math.max(0, (mm.paymentPending || 0) - amount);
        p.status = 'CANCELLED'; p.fundingCommitted = false; message = '支付单已作废，占用回到原 fundingUid/fundingGroupId；不改写历史'; break;
      }
      case 'deleteDraft': {
        if (!p || p.module !== 'payment' || !rights.delete) return fail('只有 Owner/有效 Collaborator 可删除草稿；正式支付单不能删除');
        p.status = 'DELETED'; message = '草稿已删除；正式支付和资金历史未受影响'; break;
      }
      case 'releasePayment': {
        if (!p || !rights.execute || !['FORMAL', 'SCHEDULED'].includes(p.status)) return fail('需要执行权和可放行订单');
        if ((group(s, p.groupId).requireT2PaymentRelease || payload.requireApproval) && !isLead(s, p.submitterId || p.ownerId, p.groupId) && !p.reviewedBy) { p.status = 'WAITING_REVIEW'; message = '已进入待组长放行；定时单须在预约前审核（评审示意）'; break; }
        p.status = 'PAID'; const amount = p.paymentAmount, gg = group(s, p.fundingGroupId), mm = membership(s, p.fundingUid, p.fundingGroupId);
        s.organization.walletPending -= amount; s.organization.walletBalance -= amount; gg.fundPending -= amount; gg.fundUsed += amount;
        if (mm) { mm.paymentPending = Math.max(0, (mm.paymentPending || 0) - amount); mm.paymentUsed = (mm.paymentUsed || 0) + amount; }
        p.fundingCommitted = false; message = '已模拟支付执行，原承担人的占用转已支付'; break;
      }
      case 'reviewPayment': {
        if (!p || p.status !== 'WAITING_REVIEW' || !isLead(s, actorId, p.groupId)) return fail('只有同组 ACTIVE T2 可以审核待放行单');
        p.reviewedBy = actorId;
        if (p.scheduled) { p.status = 'SCHEDULED'; message = '定时单预审核已通过，等待预约时点；资金快照保持不变'; }
        else {
          p.status = 'PAID'; const amount = p.paymentAmount, gg = group(s, p.fundingGroupId), mm = membership(s, p.fundingUid, p.fundingGroupId);
          s.organization.walletPending -= amount; s.organization.walletBalance -= amount; gg.fundPending -= amount; gg.fundUsed += amount;
          if (mm) { mm.paymentPending = Math.max(0, (mm.paymentPending || 0) - amount); mm.paymentUsed = (mm.paymentUsed || 0) + amount; }
          p.fundingCommitted = false; message = '任一同组 T2 已通过最终闸门并模拟执行；资金承担快照保持不变';
        }
        break;
      }
      case 'createProject': {
        if (!g || !active(s, actorId, g.id) || !String(payload.name || '').trim()) return fail('需要有效业务组身份和对象名称');
        if (!['email', 'monitor', 'resource', 'crm', 'payment'].includes(payload.module)) return fail('未知业务模块');
        const item = { id: id('project'), name: String(payload.name).trim(), module: payload.module, groupId: g.id, ownerId: payload.module === 'crm' ? null : actorId, assigneeId: payload.module === 'crm' ? actorId : null, creatorId: actorId, collaborators: [], status: payload.module === 'payment' ? 'DRAFT' : 'ACTIVE', paymentAmount: 500 };
        s.projects.push(item); extra.projectId = item.id; message = '对象已创建，固定归属于当前业务组'; break;
      }
      case 'renameProject': {
        const name = String(payload.name || '').trim();
        if (!p || !rights.write) return fail('需要当前对象的有效普通写权限');
        if (['PAID', 'CANCELLED', 'DELETED'].includes(p.status)) return fail('终态对象不能继续修改');
        if (!name) return fail('请填写对象名称');
        p.name = name; message = '对象名称已更新；企业、组、责任人与历史归属不变'; break;
      }
      case 'deleteProject': {
        if (!p || p.module === 'payment') return fail('支付对象使用专门的草稿删除或正式单作废流程');
        if (p.module === 'crm') return fail('CRM 记录硬删除权限待确认，本示意不提供硬删除');
        if (!rights.delete || p.ownerId !== actorId) return fail('仅当前项目 Owner 可以删除；普通协作写权限不包含删除');
        p.status = 'DELETED'; message = '项目已模拟删除；历史审计继续保留'; break;
      }
      case 'addLabel': {
        if (!g || !active(s, actorId, g.id) || !String(payload.name || '').trim()) return fail('需要有效组身份和标签名称');
        const module = payload.module || 'monitor';
        if (module === 'monitor' && s.policies.monitorLabelsT2 && !canManageOrganization(s, actorId) && !isLead(s, actorId, g.id)) return fail('当前策略限制本组 T3 创建、改名或删除监控标签定义；其他组 T2 不产生豁免');
        s.labels.push({ id: id('tag'), name: String(payload.name).trim(), groupId: g.id, creatorId: actorId, module }); message = '标签定义已创建；createdGroupId 不随创建人转组漂移'; break;
      }
      case 'renameLabel':
      case 'deleteLabel': {
        const label = s.labels.find(x => x.id === payload.labelId);
        if (!label || !active(s, actorId, label.groupId) || (payload.groupId && payload.groupId !== label.groupId)) return fail('需要标签所在组的当前有效身份');
        if (label.module === 'crm') return fail('CRM 标签使用独立高风险动作，不能走普通标签管理绕过');
        if (label.module === 'monitor' && s.policies.monitorLabelsT2 && !canManageOrganization(s, actorId) && !isLead(s, actorId, label.groupId)) return fail('当前策略仅允许组织管理身份或本组 T2 管理监控标签定义');
        if (type === 'renameLabel') {
          const name = String(payload.name || '').trim();
          if (!name) return fail('请填写标签名称');
          label.name = name; message = '标签已改名；创建来源组保持不变';
        } else { s.labels = s.labels.filter(x => x.id !== label.id); message = '标签定义已删除（模拟）；不授予任何项目操作权限'; }
        break;
      }
      case 'deleteCRMLabel': {
        const label = s.labels.find(x => x.id === payload.labelId && x.module === 'crm');
        if (!label) return fail('CRM 标签不存在');
        if (a.orgRole !== 'owner') return fail('CRM 标签删除是独立高风险权限；Admin 范围与 T2 委派尚待确认，本示例仅开放组织 Owner');
        s.labels = s.labels.filter(x => x.id !== label.id);
        message = '已删除组织共享 CRM 标签定义（模拟），不以记录写权限替代删除资格'; break;
      }
      default: return fail('该操作尚未纳入示意引擎：' + type);
    }
    s.audit.unshift({ id: id('audit'), actorId, actorName: a.name, action: type, groupId: payload.groupId || p?.groupId || null, objectId: payload.projectId || payload.taskId || payload.uid || null, message, at: new Date().toISOString() });
    return Object.assign({ ok: true, message }, extra);
  }
  return { createState, user, group, project, membership, active, canManageOrganization, isLead, access, balances, act, clone };
});
