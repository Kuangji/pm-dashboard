(function () {
  'use strict';
  const E = window.ReviewEngine, D = window.ReviewData;
  let s = E.createState();
  const ui = {page:'dashboard', actor:'u-owner', group:'g-growth', project:null, tab:'objects', conversationFilter:'chat', conversationId:null, dashboardGroup:'all', dashboardUser:'all', period:'2026-10', metric:'sent', reviewFilter:'all', reviews:{}, notes:{}, lastResult:null, showArchived:false};
  const moduleNames = {email:'邮件项目',resource:'收藏夹',monitor:'内容监控',crm:'CRM',payment:'跨境支付'};
  const collectionModes = [{id:'private',name:'私有'},{id:'group',name:'本组公开'},{id:'selected',name:'指定成员'}];
  const crmWriteOptions = [{id:1,name:'对接人和管理员可编辑'},{id:2,name:'对接人和同组组长可编辑'},{id:3,name:'对接人和同组成员可编辑'},{id:4,name:'所有人可编辑'}];
  const orgNames = {owner:'组织 Owner',admin:'组织 Admin',member:'普通成员'};
  const statusNames = {ACTIVE:'正常',PENDING:'待接受',ACCEPTED:'已接受',CANCELLED:'已取消',REMOVING:'待移交',REMOVED:'已移除',COMPLETED:'已完成',PENDING_ASSIGNMENT:'待指定接收人',WAITING_FOR_TARGET:'等待接收人接受',READY:'接收人已就绪',PARTIAL:'部分组待处理',ARCHIVED:'已归档',DRAFT:'草稿',FORMAL:'正式单',SCHEDULED:'预约中',WAITING_REVIEW:'待组长审核',SCHEDULE_EXPIRED:'预约已逾期',PAID:'已支付',DELETED:'已删除'};
  const nav = [
    {label:'总览',items:[['dashboard','LayoutDashboard','使用情况']]},
    {label:'组织管理',adminOnly:true,items:[['members','Users','组织成员'],['groups','Layers','业务组管理'],['policies','Settings2','全局策略'],['funds','Wallet','组织资金'],['tasks','ArrowRightLeft','组织移交任务']]},
    {label:'当前组管理',items:[['team','Users','组成员管理'],['quota','Gauge','组员配额']]},
    {label:'业务模块',items:[['email','Mail','邮件项目'],['resource','Folder','收藏夹'],['monitor','Video','内容监控'],['crm','Contact','CRM'],['payment','CreditCard','跨境支付'],['message','MessagesSquare','消息中心'],['search','Search','创作者搜索']]},
    {label:'记录与审阅',items:[['history','History','通知与记录'],['stories','ClipboardCheck','业务故事'],['review','ClipboardCheck','覆盖与待确认']]}
  ];
  const $ = q => document.querySelector(q);
  const roleCopy = text => String(text).replace(/T2\s*[·（(]\s*组长[）)]?/g,'组长').replace(/T3\s*[·（(]\s*(?:组成员|组员)[）)]?/g,'组员').replace(/T2/g,'组长').replace(/T3/g,'组员');
  function localizeRoleCopy(container) {
    const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())) {
      if(node.parentElement?.matches('script,style'))continue;
      if(/T[23]/.test(node.nodeValue))node.nodeValue=roleCopy(node.nodeValue);
    }
    container.querySelectorAll('[title],[aria-label],[placeholder]').forEach(el=>{
      for(const attr of ['title','aria-label','placeholder'])if(el.hasAttribute(attr))el.setAttribute(attr,roleCopy(el.getAttribute(attr)));
    });
  }
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => window.ReviewIcons[name] || '';
  const n = v => v === Infinity || v === null ? '不追加上限' : Number(v || 0).toLocaleString('en-US');
  const user = id => E.user(s,id);
  const group = id => E.group(s,id);
  const member = (id,gid) => E.membership(s,id,gid || ui.group);
  const name = id => esc(user(id)?.name || '未分配');
  const gname = id => esc(group(id)?.name || '未知组');
  const actor = () => user(ui.actor);
  const admin = () => E.canManageOrganization(s,ui.actor);
  const canRemoveMembers = () => admin() && (actor().orgRole==='owner' || s.policies.adminRemoveMembers);
  const active = (id,gid) => user(id)?.status === 'ACTIVE' && member(id,gid)?.status === 'ACTIVE' && group(gid)?.status === 'ACTIVE';
  const lead = gid => active(ui.actor,gid || ui.group) && member(ui.actor,gid || ui.group)?.role === 'T2';
  const canSetMemberQuota = gid => lead(gid) && s.policies.t2Quota;
  const selectedQuotaScope = () => E.quotaScopes.find(x=>x.id===ui.quotaScope)||E.quotaScopes[0];
  const tag = (label,color) => '<span class="tag '+(color || '')+'">'+esc(label)+'</span>';
  const button = (text,action,id,kind,disabled,title) => (action==='memberQuota'&&ui.page==='members'||action==='accountFunds'&&!canSetMemberQuota(id))?'':'<button type="button" class="btn '+(kind || '')+'" data-action="'+action+'" '+(id?'data-id="'+esc(id)+'" ':'')+(disabled?'disabled ':'')+'title="'+esc(title || text)+'">'+text+'</button>';
  const goto = (page,text) => '<button type="button" class="btn text" data-page="'+page+'">'+esc(text)+icon('ArrowUpRight')+'</button>';
  const options = (arr,value,labelFn) => arr.map(x=>'<option value="'+esc(x.id)+'" '+(x.id===value?'selected':'')+'>'+esc(labelFn ? labelFn(x):x.name)+'</option>').join('');
  const goptions = (value,all) => (all?'<option value="all">全部可见组</option>':'') + options(s.groups.filter(g=>g.status==='ACTIVE' && (admin() || active(ui.actor,g.id))),value);
  const uoptions = (gid,value,exclude) => options(s.users.filter(u=>active(u.id,gid) && u.id!==exclude),value,u=>u.name+' · '+member(u.id,gid).role);
  const person = u => '<div class="person"><span class="avatar '+(u.orgRole==='owner'?'orange':u.orgRole==='admin'?'green':'')+'">'+esc(u.name.slice(-2))+'</span><div><strong>'+esc(u.name)+'</strong><small>'+esc(u.email)+'</small></div></div>';
  const notice = (title,body,kind) => '<div class="notice '+(kind || '')+'">'+icon(kind==='warning'?'CircleAlert':'Info')+'<div><strong>'+title+'</strong>'+(body?'<p>'+body+'</p>':'')+'</div></div>';
  const empty = (text,action) => '<div class="empty">'+icon('Folder')+text+(action || '')+'</div>';
  const section = (title,body,tools) => '<section class="section"><div class="section-heading"><h2>'+title+'</h2>'+(tools || '')+'</div>'+body+'</section>';
  const table = (heads,rows) => '<div class="table-wrap"><table><thead><tr>'+heads.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table></div>';
  const field = (label,content,full) => '<div class="form-field '+(full?'full':'')+'"><label>'+label+'</label>'+content+'</div>';
  const inp = (key,value,type,extra) => '<input name="'+key+'" value="'+esc(value)+'" type="'+(type || 'text')+'" '+(extra || '')+'>';
  const select = (key,content) => '<select name="'+key+'">'+content+'</select>';
  const recipientOptions = selected => options(s.recipients.filter(r=>r.status==='ACTIVE'),selected,r=>(r.channelName===r.name?r.name:r.channelName+' · '+r.name)+' · '+r.account);
  function recipientPreview(id) {
    const r=E.recipient(s,id);
    return r?'<strong>'+esc(r.name)+'</strong><p>'+esc(r.channelName)+' · 示例账号 '+esc(r.account)+' · 组织共享快捷模板</p>':'<p>不选择新模板时保留支付单当前收款信息。</p>';
  }
  function paymentRecipientPreview(p) {
    const r=p.recipientSnapshot;
    return r?'<strong>'+esc(r.name)+'</strong><p>当前支付单快照 · 示例账号 '+esc(r.account)+'；保存金额不会刷新模板信息。</p>':'<p>当前未填写收款信息，可选择频道下的共享模板。</p>';
  }
  const toggle = (key,value,disabled,label) => '<label class="switch"><input type="checkbox" data-policy="'+key+'" '+(value?'checked ':'')+(disabled?'disabled ':'')+'aria-label="'+esc(label)+'"><span class="switch-track"></span><span>'+ (value?'已开启':'已关闭') +'</span></label>';
  let toastTimer;
  function toast(message,ok) { clearTimeout(toastTimer); const t=$('#toast');t.className='toast '+(ok===false?'error':'');t.textContent=roleCopy(message);toastTimer=setTimeout(()=>{t.className='';t.textContent='';},5000); }
  function perform(type,payload,close) {
    const r=E.act(s,ui.actor,type,payload);
    ui.lastResult={type,message:r.message,ok:r.ok};
    if(r.ok) { if(close) $('#dialog').close(); render(); toast(r.message); }
    else { const error=$('#form-error'); if(error && $('#dialog').open)error.textContent=roleCopy(r.message); else toast(r.message,false); }
    return r;
  }
  function download(filename,content,mime) {
    const a=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type:mime || 'application/json;charset=utf-8'}));
    a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
  }
  function title() { return nav.flatMap(n=>n.items).find(x=>x[0]===ui.page)?.[2] || '功能审阅'; }
  function navigate(page) { ui.page=page;ui.project=null;ui.tab='objects';render();window.scrollTo(0,0); }
  function render() {
    if(!group(ui.group) || group(ui.group).status!=='ACTIVE' || !active(ui.actor,ui.group)) ui.group=actor().memberships.find(m=>m.status==='ACTIVE' && group(m.groupId)?.status==='ACTIVE')?.groupId || '';
    const scope=D.pages[ui.page]?.scope||'业务模块';
    const a=actor(),m=member(ui.actor);
    $('#app').innerHTML=
      '<div class="review-strip"><div class="left">'+icon('ClipboardCheck')+'<strong>功能审阅 Demo</strong><span>独立模拟 · 所有数值为示例 · 修改仅在本次页面内生效</span></div><div class="inline">'+button('审阅清单','review',null,'')+button(icon('RotateCcw')+' 重置','reset',null,'')+'</div></div>'+
      '<header class="product-header"><div class="brand"><span class="brand-mark">N</span>聚星<small>星野品牌 · 示例组织</small></div><div class="identity-controls"><div class="identity-field"><label for="actor-select">体验账号</label><select id="actor-select" aria-label="体验账号">'+options(s.users,ui.actor,u=>u.name+' · '+orgNames[u.orgRole]+(u.status!=='ACTIVE'?' · '+statusNames[u.status]:''))+'</select></div><div class="identity-field"><label for="group-select">业务组</label><select id="group-select" aria-label="当前业务组">'+(ui.group?options(s.groups.filter(g=>active(ui.actor,g.id)),ui.group):'<option>暂无有效业务组</option>')+'</select></div><span class="avatar orange">'+esc(a.name.slice(-2))+'</span></div></header>'+
      '<div class="layout"><aside class="sidebar">'+nav.filter(sec=>!sec.adminOnly||admin()).map(sec=>'<div class="nav-section"><div class="nav-title">'+sec.label+'</div>'+sec.items.map(item=>'<button class="nav-item '+(ui.page===item[0]?'active':'')+'" data-page="'+item[0]+'" '+(ui.page===item[0]?'aria-current="page"':'')+'>'+icon(item[1])+'<span>'+item[2]+'</span></button>').join('')+'</div>').join('')+'<div class="nav-note">一期后统一版本<br>Input 功能审阅 · 2026.11<br><span class="status-line">非线上 UI / 非定稿设计</span></div></aside>'+
      '<div class="workspace"><main class="main"><div class="breadcrumbs">'+icon(scope==='组织管理'?'Building2':'Layers')+scope+icon('ChevronRight')+title()+'</div><div class="page-header"><div><h1>'+title()+'</h1><p>'+pageSubtitle()+'</p></div><div class="page-actions">'+pageActions()+'</div></div>'+relatedStories()+pageContent()+'</main>'+rulePanel(m)+'</div></div>';
    localizeRoleCopy($('#app'));
    window.ReviewApp={getState:()=>s,getUI:()=>ui,navigate,render,act:(type,payload)=>perform(type,payload)};
  }
  function pageSubtitle() {
    const texts={dashboard:'按组织、业务组与成员，了解工作活动、业务结果及资源使用。',members:'维护组织成员与组织身份；移出组织影响该成员的所有组。',groups:'维护组织内各组、成员关系及组总额度；管理目标组不切换业务当前组。',team:'当前业务组：'+gname(ui.group)+' · 本组成员、组内移除任务与配额入口。',policies:'组织级策略统一生效；单个项目的协作在业务模块中设置。',quota:'当前业务组：'+gname(ui.group)+' · 组长按委派配置组内个人额度，不在此修改组上限。',funds:'组织钱包与部门资金分配；个人支付上限在当前组的组员配额中设置。',tasks:'承接成员与组管理产生的移交任务；在这里查看进度、安排接收人与处理结果。',history:'模拟操作记录与完成通知，贯穿设置、协作和移交。',review:'逐项覆盖原 Input、补充遗留与本版待确认决策。',message:'当前组邮件会话、转交跟进与发送身份；标签来源筛选单独保留。',search:'联系与合作范围的增量筛选。'};
    return ui.page==='stories'?'八段业务历程：从加入团队到协作、人员变化与组织生命周期。':texts[ui.page] || '当前业务组：'+gname(ui.group)+' · 对象归组稳定，组织管理身份不默认授予业务权限。';
  }
  function pageActions() {
    if(nav.find(sec=>sec.adminOnly&&sec.items.some(x=>x[0]===ui.page))&&!admin())return '';
    if(ui.page==='members')return button(icon('Plus')+' 邀请成员','invite',null,'primary',!admin(),'仅组织 Owner/Admin 可以邀请新成员');
    if(ui.page==='groups'&&!ui.managedGroup)return button(icon('Plus')+' 创建业务组','addGroup',null,'primary',!admin());
    if(ui.page==='dashboard')return button(icon('Download')+' 导出当前视图','exportUsage',null,'',false,'按当前授权与筛选导出样例；开发时按需补充字段');
    if(ui.page==='review')return button(icon('Download')+' 导出审阅意见','exportReview',null,'primary');
    if(moduleNames[ui.page])return button(icon('Plus')+' '+(ui.page==='crm'?'添加达人记录':'新建'+(ui.page==='payment'?'草稿':ui.page==='resource'?'收藏夹':'项目')),'createProject',ui.page,'primary',!ui.group||ui.page==='payment'&&!group(ui.group)?.paymentEnabled);
    return '';
  }
  function pageContent() {
    if(ui.page==='stories')return storiesPage();
    if(actor().status!=='ACTIVE'&&!['tasks','history','review'].includes(ui.page))return notice('当前账号已失去有效组织身份','本选择器仅用于审阅失权状态；不能继续查看或操作组织业务。请切换其他有效账号。','warning');
    if(nav.find(sec=>sec.adminOnly&&sec.items.some(x=>x[0]===ui.page))&&!admin())return notice('当前账号没有组织管理权限','本页属于组织管理；组长在当前组管理中处理本组成员与获委派配额。','warning')+goto('team','进入当前组管理');
    if(!ui.group&&(moduleNames[ui.page]||['message','search','quota','team'].includes(ui.page))){
      const archived=actor().memberships.some(m=>m.status==='ACTIVE'&&group(m.groupId)?.status==='ARCHIVED');
      return archived?notice('没有可开展业务的组','归档后，有原对象权限的成员仍可查看历史，不可继续普通业务。本 Demo 未提供历史对象查看入口。','warning'):notice('没有有效业务组身份','归档或退组后不能继续该组业务，请由组织管理者查看相关任务。','warning');
    }
    const pages={dashboard:dashboard,members:membersPage,groups:groupsPage,team:teamPage,policies:policiesPage,quota:quotaPage,funds:fundsPage,tasks:tasksPage,history:historyPage,review:reviewPage,message:messagePage,search:searchPage};
    return pages[ui.page]?pages[ui.page]():modulePage();
  }
  function rulePanel(m) {
    const p=D.pages[ui.page] || {}, rules=p.rules || [];
    return '<aside class="rules" aria-label="当前页面规则"><div class="rules-heading"><span>'+icon('CircleHelp')+' 操作规则</span>'+tag(p.scope || '业务模块','outline')+'</div>'+
      '<div class="rule-identity"><strong>'+esc(actor().name)+' · '+orgNames[actor().orgRole]+'</strong><p>'+gname(ui.group)+' / '+(m?.role || '无组身份')+'</p><p>管理身份与业务身份分别计算。</p></div>'+
      '<div class="rule-section"><h3>当前操作的约束</h3><ul>'+rules.map(r=>'<li>'+esc(r)+'</li>').join('')+'</ul></div>'+
      (p.pending?.length?'<div class="rule-section rule-pending"><h3>仍需确认</h3>'+p.pending.map(r=>'<p>'+esc(r)+'</p>').join('')+goto('review','讨论这些规则')+'</div>':'')+
      (moduleNames[ui.page]?'<div class="rule-section"><h3>权限探针 · 虚构样本</h3><select id="probe-project" aria-label="权限探针对象"><option value="">选择任意样本检查权限</option>'+options(s.projects.filter(p=>p.status!=='DELETED'),ui.probe)+'</select><div id="probe-result" class="access-result">'+(ui.probe?probeResult(ui.probe):'可以检查尚未出现在业务列表中的样本及拦截原因。')+'</div></div>':'')+
      '<div class="rule-section"><h3>场景跳转</h3>'+[['invite','members','邀请与配置'],['collaboration','email','Owner、协作者与组长'],['payment','payment','协作填写与执行分离'],['removal','tasks','退组、失权与移交']].map(x=>'<button class="scenario-link" data-scenario="'+x[0]+'">'+x[2]+icon('ArrowRight')+'</button>').join('')+'</div>'+
      (ui.lastResult?'<div class="rule-section"><h3>最近一次操作</h3><p class="'+(ui.lastResult.ok?'':'danger-text')+'">'+esc(ui.lastResult.message)+'</p></div>':'')+
      '<div class="rule-source">规则来源：统一版本 Input '+esc(p.inputSection || '')+'<br><a href="'+esc(window.ReviewPublication.inputUrl)+'" target="_blank" rel="noopener">查看 Input 原文 '+icon('ArrowUpRight')+'</a></div></aside>';
  }
  function storyButton(story) {
    return '<button class="btn text story-link" data-story="'+story.id+'">'+esc(story.id+' '+story.title)+icon('ArrowUpRight')+'</button>';
  }
  function relatedStories() {
    if(ui.page==='stories')return '';
    const related=(window.ReviewStories?.stories || []).filter(x=>x.pages.includes(ui.page));
    if(!related.length)return '';
    const hints=(window.ReviewStories.reviewHints || []).filter(x=>x.pages.includes(ui.page));
    return '<details class="related-stories" '+(ui.storyId?'open':'')+'><summary>相关业务故事 · '+related.length+'</summary><div class="actions">'+related.map(storyButton).join('')+'</div><p class="muted">流程按故事说明审阅；局部按钮不验证持久化、真实任务、时钟或账务。'+(ui.storyId?' 当前阅读：'+esc(ui.storyId):'')+'</p></details>'+hints.map(x=>notice(esc(x.title),esc(x.note))).join('');
  }
  function storyMarkup(body) {
    const lines=String(body || '').split('\n');let html='',rows=[];
    const flush=()=>{if(rows.length){html+=table(rows[0],rows.slice(1).filter(r=>!r.every(c=>/^[- :]+$/.test(c))).map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>'));rows=[];}};
    for(const line of lines){if(line.trim().startsWith('|')){rows.push(line.trim().slice(1,-1).split('|').map(x=>esc(x.trim())));continue;}flush();if(line.trim())html+='<p>'+esc(line.replace(/\*\*/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1'))+'</p>';}
    flush();return html;
  }
  function storiesPage() {
    const data=window.ReviewStories,all=data.stories;
    const selected=all.find(x=>x.id===ui.storyId);
    const filtered=all.filter(x=>(!ui.storyChapter||String(x.chapter)===ui.storyChapter)&&(!ui.storyQuery||(x.id+' '+x.title+' '+x.body).toLowerCase().includes(ui.storyQuery.toLowerCase())));
    const detail=selected?'<article class="story-detail" id="story-detail" tabindex="-1"><div class="section-heading"><h2>'+esc(selected.id+' '+selected.title)+'</h2>'+button(icon('X'),'closeStory',null,'icon',false,'收起故事')+'</div><div class="actions">'+selected.pages.map(p=>'<button class="btn" data-story-page="'+p+'">'+esc(nav.flatMap(n=>n.items).find(x=>x[0]===p)?.[2] || p)+icon('ArrowRight')+'</button>').join('')+'</div>'+notice('审阅示意边界',esc(selected.demoLimit || '按下列故事审阅流程、参与身份与规则；模块中的局部模拟不等于完整产品状态机。'))+'<div class="story-body">'+storyMarkup(selected.body || (selected.paragraphs || []).join('\n\n'))+'</div></article>':'';
    return notice('按业务历程审阅','先看人物、过程、结果与待定分支，再进入对应功能区域；无需依赖数据持久化才能理解流程。')+detail+'<div class="filterbar"><input id="story-query" type="search" aria-label="搜索业务故事" placeholder="搜索故事、身份或业务" value="'+esc(ui.storyQuery || '')+'"><select id="story-chapter" aria-label="故事章节"><option value="">全部章节</option>'+data.chapters.map(c=>'<option value="'+c.id+'" '+(String(c.id)===ui.storyChapter?'selected':'')+'>'+esc(c.title)+'</option>').join('')+'</select><span class="muted">'+filtered.length+' / '+all.length+' 个故事</span></div>'+data.chapters.map(c=>{const items=filtered.filter(x=>String(x.chapter)===String(c.id));return items.length?section(esc(c.title),'<div class="story-list">'+items.map(x=>'<div class="story-row">'+storyButton(x)+'<small>'+esc(x.status)+'</small><div class="actions">'+x.pages.map(p=>'<button class="btn text" data-story-target="'+x.id+'|'+p+'">'+esc(nav.flatMap(n=>n.items).find(n=>n[0]===p)?.[2] || p)+icon('ArrowRight')+'</button>').join('')+'</div></div>').join('')+'</div>'):'';}).join('')+(filtered.length?'':empty('没有匹配的故事。'));
  }
  function probeResult(id) {
    const a=E.access(s,ui.actor,id);
    return '<strong>'+esc(a.role==='Viewer'?'模块固定只读':a.role)+'</strong><br>查看 '+(a.read?'允许':'拒绝')+' · 写入 '+(a.write?'允许':'拒绝')+'<br>管理协作 '+(a.manage?'允许':'拒绝')+' · 资金执行 '+(a.execute?'允许':'拒绝')+'<br>'+esc(a.source.join(' + ') || a.reason);
  }
  function usageRows() {
    let rows=s.usage || [];
    if(['empty','error','forbidden'].includes(ui.usageHealth))return [];
    if(!admin())rows=rows.filter(r=>lead(r.groupId) || r.uid===ui.actor);
    if(ui.dashboardGroup!=='all')rows=rows.filter(r=>r.groupId===ui.dashboardGroup);
    if(ui.dashboardUser!=='all')rows=rows.filter(r=>r.uid===ui.dashboardUser);
    if(ui.period==='2026-09')rows=rows.map(r=>({...r,sent:Math.floor(r.sent*.78),opened:Math.floor(r.opened*.73),replied:Math.floor(r.replied*.7),cooperate:Math.floor(r.cooperate*.8),samples:Math.floor(r.samples*.8),monitor:Math.max(0,r.monitor-1),clicks:Math.floor(r.clicks*.8)}));
    return ui.period==='uncovered'?[]:rows;
  }
  function dashboard() {
    const rows=usageRows(), sum=key=>rows.reduce((v,r)=>v+(r[key] || 0),0),total=sum('sent');
    const count=new Set(rows.filter(r=>r.sent>0).map(r=>r.uid)).size;
    const accountCount=new Set(rows.map(r=>r.uid)).size;
    const noDetails=ui.period==='uncovered'?'历史未覆盖，不能解释为用量为零':ui.dashboardUser!=='all'?name(ui.dashboardUser)+'在当前范围与窗口内暂无记录；不表示该账号已离开组织':'当前有效范围与窗口内暂无记录；不表示成员被移除';
    const tabs=[['sent','邮件发送'],['replied','创作者回复'],['cooperate','合作完成'],['samples','寄样数量'],['monitor','新建监控']];
    const visibleUsers=s.users.filter(u=>admin() || u.id===ui.actor || u.memberships.some(m=>lead(m.groupId)));
    const health='<div class="review-state-control"><label for="usage-health">审阅数据状态</label><select id="usage-health">'+[['normal','正常'],['empty','有效范围内无记录'],['delayed','数据延迟'],['error','来源异常'],['forbidden','无统计权限']].map(x=>'<option value="'+x[0]+'" '+((ui.usageHealth||'normal')===x[0]?'selected':'')+'>'+x[1]+'</option>').join('')+'</select><span>仅切换模拟状态，不是业务设置</span></div>';
    if(['error','forbidden'].includes(ui.usageHealth))return health+notice(ui.usageHealth==='error'?'数据来源异常':'当前账号无统计权限',ui.usageHealth==='error'?'不能把读取失败展示成用量 0；保留可重试状态，不绘制趋势。':'不返回业务汇总或明细，不能用空数组替代无权限。','warning');
    return health+notice('模拟数据 · 指标口径待确认','本页用固定示例展示按组和账号查看的方式；业务统计月份与会员配额周期独立。','')+
      (ui.usageHealth==='delayed'?notice('数据延迟 · 当前为上次有效快照','示例延迟 2 日，当前数值不是实时用量；精确更新 SLA 仍待确定。','warning'):'')+
      '<div class="filterbar"><select id="usage-group" aria-label="看板组范围">'+goptions(ui.dashboardGroup,true)+'</select><select id="usage-user" aria-label="看板账号"><option value="all">全部可见账号</option>'+options(visibleUsers,ui.dashboardUser)+'</select><select id="usage-period" aria-label="统计月份"><option value="2026-10" '+(ui.period==='2026-10'?'selected':'')+'>2026年10月</option><option value="2026-09" '+(ui.period==='2026-09'?'selected':'')+'>2026年9月</option><option value="uncovered" '+(ui.period==='uncovered'?'selected':'')+'>历史未覆盖样例</option></select><span class="push muted" style="font-size:11px">示例截止 2026-10-26</span></div>'+
      (ui.period==='uncovered'?notice('该时段没有可靠的组归属快照','保留组织历史，不用成员当前所在组回填历史业绩。','warning'):'')+
      '<div class="stats">'+stat('邮件发送量',ui.period==='uncovered'?'—':n(total),'封',icon('Mail'))+stat('创作者回复',ui.period==='uncovered'?'—':n(sum('replied')),'示例回复率 '+(total?(sum('replied')/total*100).toFixed(1):'0.0')+'%',icon('MessagesSquare'))+stat('合作完成',ui.period==='uncovered'?'—':n(sum('cooperate')),'个 · 业务状态口径待确认',icon('CheckCheck'))+stat('有业务活动成员',ui.period==='uncovered'?'—':n(count),'人 · 示例事件定义',icon('Users'))+'</div>'+
      section('业务活动趋势','<div class="chart-surface"><div class="tabbar">'+tabs.map(t=>'<button data-metric="'+t[0]+'" class="'+(ui.metric===t[0]?'active':'')+'">'+t[1]+'</button>').join('')+'</div><div class="chart-layout"><div>'+(ui.period==='uncovered'?empty('历史未覆盖，暂不绘制趋势'):drawChart(sum(ui.metric)))+'<div class="legend"><span><i class="dot" style="background:#fa6300"></i>当前筛选 · 示例分布</span><span><i class="dot" style="background:#377dff"></i>上月对应窗口 · 示例</span></div></div><div class="mini-metrics"><div class="mini-metric"><small>打开邮件</small><strong>'+(ui.period==='uncovered'?'—':n(sum('opened')))+'</strong><small>打开归因仍待确认</small></div><div class="mini-metric"><small>寄样数量</small><strong>'+(ui.period==='uncovered'?'—':n(sum('samples')))+'</strong><small>包裹 / 样品口径待确认</small></div><div class="mini-metric"><small>新建监控</small><strong>'+(ui.period==='uncovered'?'—':n(sum('monitor')))+'</strong><small>个 · 不等于上线内容</small></div></div></div></div>')+
      '<div class="usage-details">'+section('成员工作明细 · 账号 × 业务组','<p class="form-hint">同一账号按事件所属组分行；只列当前筛选内有统计记录的账号，不是组织成员名单。</p>'+table(['成员','事件所属组','邮件发送','邮件打开','回复','合作完成','寄样','新建监控'],rows.length?rows.map(r=>'<tr class="usage-detail-row" data-uid="'+esc(r.uid)+'" data-group="'+esc(r.groupId)+'"><td>'+person(user(r.uid))+'</td><td>'+gname(r.groupId)+'</td>'+['sent','opened','replied','cooperate','samples','monitor'].map(k=>'<td class="num">'+n(r[k])+'</td>').join('')+'</tr>'):['<tr><td colspan="8" style="text-align:center;padding:35px">'+noDetails+'</td></tr>']))+
      '<div class="table-footer usage-detail-summary"><span>组织汇总不因多组关系重复累计</span><span>'+(ui.period==='uncovered'?'历史未覆盖 · 不计算记录数':accountCount+' 个账号 · '+rows.length+' 条组记录')+'</span></div>'+(admin()?goto('members','查看完整组织成员名单'):'')+'</div>'+goto('quota','查看配额与实际剩余');
  }
  function stat(label,value,sub,ic) { return '<div class="stat"><div class="label">'+label+(ic || '')+'</div><div class="value num">'+value+'</div><div class="sub">'+sub+'</div></div>'; }
  function drawChart(total) {
    const weights=[3,6,4,9,8,12,10,15,12,18,16,20],denominator=weights.reduce((a,b)=>a+b,0);
    const raw=weights.map(w=>total*w/denominator),max=Math.max(1,Math.ceil(Math.max(...raw)/3)*3),values=raw.map(v=>v/max*135);
    const coords=values.map((v,i)=>(42+i*42)+','+(175-v)).join(' '),previous=values.map((v,i)=>(42+i*42)+','+(175-v*.78)).join(' '),month=ui.period==='2026-09'?'09':'10';
    return '<svg class="chart" viewBox="0 0 545 222" role="img" aria-label="当前筛选模拟趋势，合计 '+total+'"><g stroke="#e9edf3" stroke-dasharray="3 4">'+[40,85,130,175].map(y=>'<line x1="35" y1="'+y+'" x2="530" y2="'+y+'"/>').join('')+'</g>'+[max,Math.round(max*2/3),Math.round(max/3),0].map((v,i)=>'<text x="4" y="'+(44+i*45)+'">'+v+'</text>').join('')+'<polyline fill="none" stroke="#377dff" stroke-width="2" points="'+previous+'"/><polyline fill="none" stroke="#fa6300" stroke-width="2.5" points="'+coords+'"/>'+values.map((v,i)=>'<circle r="3" fill="#fff" stroke="#fa6300" stroke-width="1.5" cx="'+(42+i*42)+'" cy="'+(175-v)+'"/>').join('')+[1,5,10,15,20,26].map((d,i)=>'<text x="'+(35+i*94)+'" y="207">'+month+'/'+d+'</text>').join('')+'</svg>';
  }
  function membersPage() {
    const people=s.users.filter(u=>admin() || u.id===ui.actor || u.memberships.some(m=>lead(m.groupId)));
    const activeCount=s.users.filter(u=>u.status==='ACTIVE').length;
    const pendingCount=s.invites.filter(i=>i.status==='PENDING').length;
    const remaining=Math.max(0,s.organization.seatLimit-activeCount-pendingCount);
    return (!admin()?notice('当前为组内查看视角','组长不维护成员关系；配额是否可配置由组织委派策略决定。'):'')+
      '<div class="stats" id="member-seat-summary" aria-label="组织席位统计">'+stat('总席位上限',n(s.organization.seatLimit),'示例组织总名额')+stat('有效成员数',n(activeCount),'包含组织 Owner')+stat('待接受邀请数',n(pendingCount),'已占用席位')+stat('剩余可邀请名额',n(remaining),'总名额减去成员与待接受邀请')+'</div>'+
      '<div class="filterbar"><input data-search="member-row" placeholder="搜索姓名或邮箱" aria-label="搜索成员"><select id="member-group" aria-label="成员组筛选"><option value="all">全部业务组</option>'+options(s.groups,'')+'</select></div>'+
      table(['账号','组织身份','组关系 / 状态','账号操作'],people.map(u=>'<tr class="member-row" data-query="'+esc(u.name+' '+u.email)+'" data-groups="'+u.memberships.map(m=>m.groupId).join(',')+'"><td>'+person(u)+'</td><td>'+tag(orgNames[u.orgRole],u.orgRole==='owner'?'orange':u.orgRole==='admin'?'blue':'')+'</td><td><div class="chip-list">'+u.memberships.filter(m=>m.status!=='REMOVED').map(m=>tag(group(m.groupId)?.name+' / '+m.role+(m.status!=='ACTIVE'?' · '+statusNames[m.status]:''),m.status==='ACTIVE'?'':'orange')).join('')+'</div></td><td><div class="actions">'+button('组关系','membership',u.id,'text',!admin())+button('配额','memberQuota',u.id,'text',!admin() && !(lead() && s.policies.t2Quota))+button('组织身份','orgRole',u.id,'text',actor().orgRole!=='owner'||u.orgRole==='owner')+button('移出组织','organizationExit',u.id,'text',!canRemoveMembers()||u.orgRole==='owner','Owner 可操作；Admin 需由 Owner 开启“Admin 可移除成员”')+'</div></td></tr>'))+
      (actor().orgRole==='owner'?'<div class="bulk-actions">'+button('转让组织所有权','transferOrgOwner',null,'')+'<span class="form-hint">不会转交项目 Owner 或改变组身份</span></div>':'')+
      '<div class="table-footer"><span>组织身份不替代组内身份；移出组织后立即失去全部业务权限</span><span>'+people.length+' 人</span></div>'+
      notice('到期冻结与激活 · 仅规则示意','到期后非组织 Owner 冻结，仍可登录、切组并按原权限查看历史，不能参与业务。Owner 按当前子账号名额选择激活，续费不自动解冻。本 Demo 不改变成员状态。')+
      notice('组织注销 · 仅规则示意','免费或已到期组织可自助；付费有效期内需转人工。资金未清理时阻塞，满足条件后由 Owner 三次确认，不可恢复。本 Demo 不提供注销操作。')+
      notice('加入组织须为无关联账号','不支持暂停组织或离职后自动恢复原企业。注销中间态不算已注销，Owner 不能加入他企；须先转让所有权并完成退出，或完成不可恢复注销。不同组织之间不转移业务数据。本 Demo 只说明资格，不模拟跨组织状态机。')+
      section('邀请记录',notice('待接受邀请不支持编辑','如需修改目标组或身份，请撤销后重新邀请。待接受邀请仍占用席位。')+(s.invites.length?table(['邮箱','目标组','状态','操作'],s.invites.map(v=>'<tr><td>'+esc(v.email)+(v.handoffId?'<small>离职接替邀请</small>':'')+'</td><td>'+(v.groupIds||[v.groupId]).map(gname).join('、')+'</td><td>'+tag(statusNames[v.status],v.status==='PENDING'?'orange':'green')+'</td><td>'+button('模拟接受','acceptInvite',v.id,'text',v.status!=='PENDING'||!admin())+button('撤销','cancelInvite',v.id,'text',v.status!=='PENDING'||!admin())+'</td></tr>')):empty('暂无邀请；可以邀请一个虚构邮箱，体验接受和席位校验。')));
  }
  function groupsPage() {
    if(ui.managedGroup&&group(ui.managedGroup))return organizationGroupPage(group(ui.managedGroup));
    const visible=s.groups.filter(g=> (admin() || active(ui.actor,g.id)) && (ui.showArchived || g.status==='ACTIVE'));
    return '<div class="filterbar">'+notice('多人、多组关系','组长名额为 0..N；同一账号在不同组可分别为 T2 或 T3。')+'<label class="inline-check"><input type="checkbox" id="archived-toggle" '+(ui.showArchived?'checked':'')+'>显示已归档组</label></div>'+
      table(['业务组','有效成员 / 组长','项目对象','邮件上限（示例）','状态','操作'],visible.map(g=>{const ms=s.users.flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status==='ACTIVE').map(m=>({u,m})));return '<tr><td><strong>'+esc(g.name)+'</strong> '+(g.isDefault?tag('默认组','outline'):'')+'</td><td>'+ms.length+' 人 / '+ms.filter(x=>x.m.role==='T2').length+' 名组长<br><small>'+ms.filter(x=>x.m.role==='T2').map(x=>esc(x.u.name)).join('、')+'</small></td><td>'+s.projects.filter(p=>p.groupId===g.id&&p.status!=='DELETED').length+' 个</td><td>'+n(g.quotaLimit)+'</td><td>'+tag(statusNames[g.status],g.status==='ACTIVE'?'green':'')+'</td><td>'+button('管理组','manageGroup',g.id,'text')+button('组配额','groupQuota',g.id,'text',g.status!=='ACTIVE')+'</td></tr>';}))+
      section('组归档',notice('归档后历史可读','有原对象权限的成员仍可查看历史，不可开展普通业务。本 Demo 只示意冻结归档，未提供历史对象查看入口。')+notice('归档不可自行撤销','业务组归档须二次确认；不提供解除归档入口。特殊恢复由线下人工处理，不保证自动恢复原状态。默认组始终保留，不能归档。','warning'));
  }
  function organizationGroupPage(g) {
    const ms=s.users.flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status!=='REMOVED').map(m=>({u,m})));
    const quotaRows=E.quotaScopes.map(scope=>{const q=E.quota(s,g.id,scope.id);return '<tr><td>'+scope.name+'</td><td>'+n(q.organization.quotaLimit)+'</td><td>'+n(q.group.quotaLimit)+'</td><td>'+n(q.group.used)+'</td><td>'+n(Math.max(0,Math.min(q.group.quotaLimit-q.group.used,q.organization.quotaLimit-q.organization.used)))+' '+scope.unit+'</td></tr>';});
    const rows=ms.map(({u,m})=>'<tr><td>'+person(u)+'</td><td>'+tag(m.role==='T2'?'组长':'组员')+'</td><td>'+tag(statusNames[m.status])+'</td><td><div class="actions">'+button(m.role==='T2'?'设为组员':'设为组长','setRole',u.id+'|'+g.id+'|'+(m.role==='T2'?'T3':'T2'),'text',m.status!=='ACTIVE'||g.status!=='ACTIVE')+button('移出本组','removeMembership',u.id+'|'+g.id,'text',m.status!=='ACTIVE'||g.status!=='ACTIVE'||!canRemoveMembers(),'Owner 可操作；Admin 需由 Owner 开启“Admin 可移除成员”')+'</div></td></tr>');
    return '<div class="scope-context"><strong>'+gname(g.id)+'</strong>'+tag('组织管理目标组','outline')+button('返回组列表','groupList',null,'text')+'</div><div class="tabbar">'+[['members','成员与身份'],['quota','组配额与用量']].map(x=>'<button data-org-group-tab="'+x[0]+'" class="'+((ui.orgGroupTab||'members')===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div>'+
      (g.status==='ARCHIVED'?notice('已归档 · 历史保留','成员仍可按原权限查看历史，不可继续普通业务写入。本 Demo 只展示归档状态和保留摘要，未提供历史对象查看入口。','warning'):'')+
      (ui.orgGroupTab==='quota'?section('组总额度',table(['配额项','组织上限','组上限','组已用','实际可用'],quotaRows),button('设置组配额','groupQuota',g.id,'primary',g.status!=='ACTIVE'))+notice('组织与组内分工','这里只设置组总上限；组内个人额度由获委派的组长在当前组管理中设置。'):section('组成员关系',table(['账号','组内身份','状态','操作'],rows),button('添加组织内成员','groupMembers',g.id,'primary',g.status!=='ACTIVE')))+
      section('组设置','<div class="actions">'+button('修改组名','renameGroup',g.id,'',g.status!=='ACTIVE')+button('冻结归档组','archiveGroup',g.id,'danger',!E.canArchiveGroup(s,ui.actor,g.id),g.isDefault?'默认组始终保留，不能归档':'Owner 可操作；Admin 需由 Owner 开启“Admin 可归档组”')+button('迁移负责人名下项目','moveProjects',g.id,'',g.status!=='ACTIVE')+'</div>')+goto('tasks','查看组织移交任务');
  }
  function teamPage() {
    const g=group(ui.group),ms=s.users.flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status!=='REMOVED').map(m=>({u,m})));
    const tasks=s.tasks.filter(t=>t.groupId===g.id&&(lead(g.id)||t.uid===ui.actor));
    const rows=ms.map(({u,m})=>'<tr><td>'+person(u)+'</td><td>'+tag(m.role==='T2'?'组长':'组员')+'</td><td>'+tag(statusNames[m.status])+'</td><td><div class="actions">'+button('组内个人配额','memberQuota',u.id+'|'+g.id,'text',!canSetMemberQuota(g.id)||m.status!=='ACTIVE')+(m.status==='REMOVING'?button('查看本组交接','teamTasks',null,'text'):'')+'</div></td></tr>');
    return '<div class="scope-context"><strong>'+gname(g.id)+'</strong>'+tag(lead(g.id)?'当前身份：组长':'当前身份：组员','outline')+goto('quota','查看 / 配置组员配额')+(admin()?button('组织侧管理此组','manageGroup',g.id,'text'):'')+'</div><div class="tabbar">'+[['members','组成员'],['tasks','本组业务交接 · '+tasks.length]].map(x=>'<button data-team-tab="'+x[0]+'" class="'+((ui.teamTab||'members')===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div>'+
      (ui.teamTab==='tasks'?notice('接续业务，不决定人员去留','单组移除或选择各组长分别处理的组织清退，由本组组长安排业务交接；整体接替由系统自动处理，不在这里再次选择或批准。交接完成后系统按原决定结束关系；组长不能发起移除或撤销决定。')+removalTasksTable(tasks,true):notice('当前组的业务管理','加入、移出、邀请、组长任免均由组织 Owner/Admin 操作。组长只管理本组业务交接与获委派的个人配额，不管理人员关系。')+table(['本组成员','组内身份','组关系状态','操作'],rows));
  }
  function removalTasksTable(tasks,business=false) {
    if(!tasks.length)return empty(business?'暂无本组交接任务。Owner/Admin 发起移除后，这里承接本组业务交接。':'暂无移除任务。请从组织成员或业务组的具体成员行发起。');
    return table(['成员 / 组','移除决定','交接状态','接收 / 影响','操作'],tasks.map(t=>{
      const h=s.handoffs.find(h=>h.id===t.handoffId),whole=h&&h.mode!=='later',pending=t.status==='REMOVING',objects=E.removalObjects(s,t),hasLead=s.users.some(u=>E.isLead(s,u.id,t.groupId));
      const status=!pending?statusNames[t.status]:whole?(h.targetId?'系统处理中':'等待接替邀请接受'):!objects.length?'无业务项 · 待确认结束':hasLead?'待本组组长交接':'待安排业务组长';
      let actions=button('查看影响','taskDetail',t.id,'text');
      if(business&&pending&&!whole&&lead(t.groupId))actions+=button('处理本组交接','completeGroupHandoff',t.id,'text');
      if(!business&&pending&&admin()){
        if(whole)actions+=button('接替摘要','handoffPreview',h.id,'text');
        else if(!objects.length)actions+=button('确认结束关系','completeRemoval',t.id,'text',!canRemoveMembers(),'Owner 可操作；Admin 需具备移除成员权限');
        else if(lead(t.groupId))actions+=button('以组长身份处理','handoffContext',t.id,'text');
        else if(!hasLead)actions+=button('安排组长','manageGroup',t.groupId,'text');
        if(!t.organizationExit)actions+=button('撤销本组移除','cancelRemoval',t.id,'text',!canRemoveMembers(),'Owner 可操作；Admin 需具备移除成员权限');
      }
      return '<tr><td>'+name(t.uid)+'<small>'+gname(t.groupId)+'</small></td><td>'+(t.organizationExit?'Owner/Admin · 移出组织':'Owner/Admin · 移出单组')+'</td><td>'+tag(status)+(whole?'<small>'+(pending?'接收就绪后自动处理':'系统整体接替已完成')+'</small>':'')+'</td><td>'+t.objectCount+' 个关联对象'+(t.targetId?'<small>项目负责人 '+name(t.targetId)+'</small>':'')+(t.hasCrmAssignment?'<small>CRM 对接人 '+name(t.crmTargetId)+'</small>':'')+'</td><td><div class="actions">'+actions+'</div></td></tr>';
    }));
  }
  function policiesPage() {
    const specs=[['adminRemoveMembers','Admin 可移除成员','仅组织 Owner 可配置，默认关闭。开启后 Admin 可移出组织或单组，并在组织清退中指定一个接收人整体接替；提交或接受邀请后系统自动移交。可撤销单组移除、结束无业务项关系，不授予日常业务明细、逐项目改派或个人调额权。',true],['adminArchiveGroups','Admin 可归档组','仅组织 Owner 可配置，默认关闭。开启后 Admin 可二次确认冻结归档非默认业务组；不提供彻底删除或自行解除归档。',true],['t2Collaborator','组长默认成为组内协作对象的协作者','组织级统一开关，默认关闭。开启后各组有效组长获得本组已接入对象的隐式读写；支付按单据和草稿生效。CRM 不设协作者，不受该开关影响。列表锁定展示，不生成显式协作记录，也不自动授予协作管理或支付执行能力。'],['t2Quota','允许组长管理本组成员配额','T2 可调整自己与其他本组成员的个人上限，但不能修改组上限。'],['monitorLabelsT2','仅组长可增删改内容监控标签定义','关闭时 T3 可维护标签；开启后仍允许组织 Owner/Admin 与任一有效组长。不限制已有标签的应用。'],['paymentSensitive','正式支付单同组只读可查看敏感信息','仅在正式单的同组固定只读范围内生效；草稿不因此向全组公开。'],['showTeamQuota','允许成员查看本组配额汇总','展示层级额度不等于开放其他账号的项目明细。此展示范围仍需评审。']];
    return notice('Admin 全组织管理，敏感动作单独授权','Admin 可邀请成员、创建和管理组，不配置按组管理范围。移除成员与归档组分别受 Owner 专属开关限制；组织管理不自动获得业务权限。')+
      specs.map(x=>'<div class="setting-row"><div><h2>'+x[1]+'</h2><p>'+x[2]+'</p></div>'+toggle(x[0],s.policies[x[0]],!admin()||x[3]&&actor().orgRole!=='owner',x[1])+'</div>').join('')+
      section('不可配置的硬边界','<div class="chip-list">'+['无跨组协作','组织管理不自动授予业务写入','附加能力不传授','已有资金责任快照不改写'].map(x=>tag(x,'outline')).join('')+'</div>')+
      section('协作与查看边界',notice('不提供只读协作者','显式协作和组长隐式协作均为常规读写。不新增逐对象指定可查看人员的授权；正式支付单等模块固定查看规则另行保留。'))+
      section('本次已确认的边界',notice('邀请与组织治理集中管理','组长不能邀请新成员；Owner/Admin 邀请可选首组，默认选择始终保留的默认组。待接受邀请只能撤销重邀，项目转交不提供原负责人转协作者快捷项。'));
  }
  function quotaPage() {
    const g=group(ui.group);
    if(!g)return empty('暂无可配置的业务组。');
    const can=canSetMemberQuota(g.id);
    const show=admin() || lead(g.id) || s.policies.showTeamQuota;
    const scope=E.quotaScopes.find(x=>x.id===(ui.quotaScope||'email'))||E.quotaScopes[0],q=E.quota(s,g.id,scope.id);
    const ms=s.users.flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status==='ACTIVE'&&(show||u.id===ui.actor)).map(m=>({u,m})));
    const rows=ms.map(({u,m})=>{const v=E.quota(s,g.id,scope.id,u.id).member;return '<tr><td>'+person(u)+'</td><td>'+tag(m.role)+'</td><td>'+tag(v.quotaMode==='inherit'?'inherit · 不追加上限':'capped · 追加上限',v.quotaMode==='inherit'?'':'blue')+'</td><td class="num">'+(v.quotaMode==='inherit'?'—':n(v.quotaLimit))+'</td><td class="num">'+n(v.used)+'</td><td class="num">'+n(Math.max(0,Math.min(q.organization.quotaLimit-q.organization.used,q.group.quotaLimit-q.group.used,v.quotaMode==='capped'?v.quotaLimit-v.used:Infinity)))+'</td><td>'+button('设置','memberQuota',u.id+'|'+g.id,'text',!can)+'</td></tr>';});
    return '<div class="scope-context"><strong>'+gname(g.id)+'</strong>'+tag('当前组 · 组内个人额度','outline')+goto('team','返回组成员管理')+'</div><div class="filterbar"><select aria-label="Scope 类型" id="quota-scope">'+E.quotaScopes.map(x=>'<option value="'+x.id+'" '+(x.id===(ui.quotaScope||'email')?'selected':'')+'>'+x.name+' · '+x.unit+'</option>').join('')+['window','entitlement'].map((id,i)=>'<option value="'+id+'" '+(ui.quotaScope===id?'selected':'')+'>'+['搜索频率 · 不可分配 Scope','模块权益 · Entitlement'][i]+'</option>').join('')+'</select><span class="push">'+tag('示例周期：2026-10-01 ~ 10-31','outline')+'</span></div>'+
      notice('逐项配置，分层管理','Owner/Admin 只设置组上限；获委派的组长设置本组成员上限。邮件发送、搜索次数、频道详情页解锁次数分别配置，不共用用量。样例数值和周期不代表真实发放规则；邮件核算沿用既有路径，不存在跨组个人总上限。')+
      '<div id="scope-detail" '+(['window','entitlement'].includes(ui.quotaScope)?'hidden':'')+'><div class="stats">'+stat('组织上限',n(q.organization.quotaLimit),'已使用 '+n(q.organization.used)+' '+scope.unit)+stat('组上限',show?n(q.group.quotaLimit):'未开放','已使用 '+(show?n(q.group.used):'—')+' '+scope.unit)+stat('组实际可用',show?n(Math.max(0,Math.min(q.group.quotaLimit-q.group.used,q.organization.quotaLimit-q.organization.used))):'未开放','受组织与组剩余共同限制')+stat('分配方式','不预占','同级上限合计可超配')+'</div>'+
      section('组成员 · '+scope.name,table(['账号','组身份','限制方式','个人上限','已使用','实际可用','操作'],rows),button('批量增加','batchQuota',g.id,'',!can))+
      (can?section('本组支付金额上限',notice('个人上限不是资金分配','组长设置本组成员支付上限；开通支付、分配和收回组余额由组织管理者操作。')+button('设置本组成员支付上限','accountFunds',g.id,'')):'')+
      (scope.id==='email'?section('邮件发送与解锁核算',notice('保留现有核算，不统一扣操作人','邮件发送和邮箱解锁按业务路径取各自核算账号；操作人、项目 Owner、发件身份不直接等同。此处不模拟邮件扣量。')+button('查看发送与解锁流程','mailQuotaRules',null,'')):section('当前账号业务消耗',notice('当前操作人的 '+scope.name+' 示例','仅模拟此项三级额度校验，不触发真实业务；这不是邮件发送或邮箱解锁的核算规则。')+button('模拟使用并校验额度','consume',g.id,'primary',!active(ui.actor,g.id))))+'</div>'+
      section('内容监控 · 独立计量口径',notice('不套通用操作人消耗','24保留时长周期用量，56按网红记录及状态计席位，65是套餐时长，25/33是资格；此页三个配额样例不模拟监控真实扣量或返还。')+button('查看监控流程与核算','monitorRules',null,''))+
      section('月度预算 · 后续版本 TODO',notice('本期不新增年度额度下的月度组/成员预算','企业年付月度发放继续沿用现有权益周期；用量看板的月度统计仍可保留，不代表本期新增月度预算或重置规则。')+button('查看后置结论','decision','D07',''));
  }
  function fundsPage() {
    if(!admin())return notice('资金管理与业务执行分离','当前仅按组织管理身份展示组资金配置。个人仍可在有权支付单上执行业务。','warning')+goto('payment','进入跨境支付');
    const b=E.balances(s,ui.group,ui.actor);
    const groupFree=s.groups.reduce((total,g)=>total+g.fundBalance,0);
    const rows=s.groups.map(g=>{
      const archived=g.status==='ARCHIVED';
      return '<tr><td>'+gname(g.id)+'</td><td>'+tag(archived?'已归档':g.paymentEnabled?'已开通':'未开通',g.paymentEnabled?'green':'')+'</td><td class="num">'+n(g.fundBalance)+'</td><td class="num">'+n(g.fundPending)+'</td><td class="num">'+n(g.fundUsed)+'</td><td><div class="actions">'+(archived?'':g.paymentEnabled?button('分配','allocate',g.id,'text',b.unallocated<=0)+button('收回','returnFunds',g.id,'text',g.fundBalance<=0)+button('关闭支付','disablePayment',g.id,'text'):button('开通支付','enablePayment',g.id,'text'))+button('看账目','groupLedger',g.id,'text')+'</div></td></tr>';
    });
    return rechargeNotice(b.unallocated)+notice('每个组只使用本组余额','新组默认未开通支付。开通后从组织待分配余额划入资金；组织待分配余额不能直接付款。以下为模拟 CNY。')+
      '<div class="stats">'+stat('组织账面余额',n(s.organization.walletBalance),'待分配 + 各组可用 + 已占用')+stat('组织待分配余额',n(b.unallocated),'可划入已开通的组')+stat('各组可用合计',n(groupFree),'各组独立使用')+stat('支付已占用',n(s.organization.walletPending),'仍按原资金承诺结算')+'</div>'+
      section('组支付余额',table(['业务组','支付状态','可用余额','已占用','累计已付','操作'],rows))+
      fundsLedger()+
      notice('注销资金阻塞 · 仅规则示意','钱包余额、冻结金额或未完成支付阻塞注销，须清理或转人工。本 Demo 不校验真实注销资格，不执行资金清理。')+
      notice('模拟边界','仅模拟资金归属和账目，不处理真实充值、退款发起、币种、费用、重试或对账。','warning');
  }
  function rechargeNotice(unallocated) {
    const dismissed=ui.dismissedTopups?.[ui.actor]||[];
    const handled=new Set(s.fundEvents.filter(e=>e.type==='allocate').map(e=>e.relatedEventId));
    const pending=s.fundEvents.filter(e=>e.type==='topup'&&!dismissed.includes(e.id)&&!handled.has(e.id));
    const latest=pending.at(-1);
    if(!latest)return '';
    const ready=s.groups.some(g=>g.status==='ACTIVE'&&g.paymentEnabled);
    return '<div class="notice" id="recharge-notice">'+icon('Info')+'<div><strong>有新充值到账</strong><p role="status">'+n(latest.amount)+' CNY 已进入组织待分配余额。'+(!ready?'暂无已开通支付的组。':unallocated<=0?'当前无待分配余额。':'')+(pending.length>1?' 另有 '+(pending.length-1)+' 笔到账提醒。':'')+'</p><div class="actions">'+button('分配到组','allocateFromRecharge',latest.id,'',!ready||unallocated<=0)+button('关闭提示','dismissRecharge',latest.id,'text')+'</div></div></div>';
  }
  function fundsLedger() {
    const scope=ui.fundLedgerScope||'all';
    const types={allocate:'划入组',return:'收回组余额',close_return:'关闭回收',archive_return:'归档回收',topup:'充值到账',hold:'占用',payment:'支付结算',release:'释放占用',refund:'退款到账'};
    const delta=v=>v?(v>0?'+':'')+n(v):'—';
    const rows=s.fundEvents.filter(e=>scope==='all'||(scope==='unallocated'?e.unallocatedDelta!==0:e.groupId===scope)).slice().reverse().map(e=>'<tr><td><strong>'+esc(types[e.type]||e.type)+'</strong><small>'+esc(e.id)+'</small>'+(e.relatedEventId?'<small>关联 '+esc(e.relatedEventId)+'</small>':'')+'</td><td>'+(e.groupId?gname(e.groupId):'—')+(e.projectId?'<small>'+esc(e.projectId)+'</small>':'')+'</td>'+[e.unallocatedDelta,e.groupDelta,e.pendingDelta,e.walletDelta].map(v=>'<td class="num">'+delta(v)+'</td>').join('')+'<td>'+esc(e.reason||'—')+'<small>'+name(e.actorId)+' · '+esc(e.at.slice(0,10))+'</small></td></tr>');
    const hasPaid=s.projects.some(p=>p.module==='payment'&&p.status==='PAID'&&p.paymentAmount>(p.refundedAmount||0));
    return '<div id="fund-ledger">'+section('资金账目','<div class="filterbar"><select id="fund-ledger-scope" aria-label="资金账目范围">'+options([{id:'all',name:'全组织账目'},{id:'unallocated',name:'组织待分配账目'},...s.groups.map(g=>({id:g.id,name:g.name+' · 组账目'}))],scope)+'</select></div>'+(rows.length?table(['记录','原资金组 / 支付单','组织待分配变动','组可用变动','占用变动','组织总额变动','摘要'],rows):empty('此范围暂无资金变动。')),'<div class="inline">'+button('模拟线下到账','rechargeFunds',null,'')+button('模拟退款到账','refundPayment',null,'',!hasPaid)+'</div>')+'</div>';
  }
  function tasksPage() {
    const handoffs=s.handoffs.filter(h=>admin()||h.uid===ui.actor);
    const plans=handoffs.map(h=>{const inv=s.invites.find(i=>i.id===h.inviteId),done=h.taskIds.filter(tid=>s.tasks.find(t=>t.id===tid)?.status==='COMPLETED').length;return '<tr><td>'+name(h.uid)+'</td><td>'+tag(statusNames[h.status],h.status==='COMPLETED'?'green':'orange')+(inv?'<small>接替邀请：'+esc(inv.email)+' · '+statusNames[inv.status]+'</small>':'')+'</td><td>'+(h.targetId?name(h.targetId):h.mode==='invite'?'接受后自动整体接替':'由各组长分别安排')+'</td><td>'+done+' / '+h.taskIds.length+' 组已完成</td><td><div class="actions">'+(inv?.status==='PENDING'?button('模拟新同事接受邀请','acceptInvite',inv.id,'text',!admin(),'仅模拟受邀人接受组织邀请；接受后自动移交，不是接替审批'):'')+(h.mode!=='later'?button('接替摘要','handoffPreview',h.id,'text'):'')+button('调整接手路径','organizationExit',h.uid,'text',!canRemoveMembers()||h.status==='COMPLETED')+'</div></td></tr>';});
    return notice('先失权，后移交','进入 REMOVING 就失去对应业务资格。整体接替由系统自动按组处理；分组处理路径由本组组长交接。全部必要任务办结后才完成组织清退。')+
      '<div class="actions">'+goto('members','管理组织成员')+goto('groups','管理业务组')+'</div>'+
      (plans.length?section('组织清退 · 接手安排','<div class="handoff-summary">'+table(['离职成员','接收状态','接手安排','按组进度','操作'],plans)+'</div>'+notice('整体接替不增加审批节点','有权 Owner/Admin 指定现有账号并提交后自动移交；邀请新账号则在其接受组织邀请后自动移交，不需要组长或接收人再确认。第三条路径仍由各组长处理。只补组员关系，不继承组长或组织身份；已有个人额度不变，新关系不追加个人上限。')):'')+
      section('按组移交任务',removalTasksTable(s.tasks))+
      notice('实现覆盖还需接收研发证据','精选任务、TikTok Shop 私信等历史对象不能假定已全部接入。分页、重试和最终完成状态仍待 Spec 与研发核验。','warning')+button('审阅移交覆盖与边界','decision','D16','');
  }
  function historyPage() {
    const logs=s.audit.filter(a=>admin() || a.actorId===ui.actor);
    const notifications=s.notifications.filter(v=>v.scope==='conversation'?v.uid===ui.actor&&v.groupId===ui.group&&E.conversationAccess(s,ui.actor,v.conversationId).read:admin()||v.uid===ui.actor);
    return section('系统通知',notifications.length?notifications.map(v=>'<div class="setting-row"><div><h2>'+icon('Bell')+' '+esc(v.title)+'</h2><p>'+esc(v.message)+'</p></div>'+tag(v.scope==='conversation'?'模拟来信':v.scope==='group'?'本组完成':v.scope==='organization'?'全组织完成':'已完成',v.scope==='conversation'?'blue':'green')+'</div>').join(''):empty('当前身份没有可见通知；会话通知只显示当前组内仍有权限的本人提醒。'))+
      section('操作记录',logs.length?table(['操作者','动作','结果摘要','时间'],logs.map(a=>'<tr><td>'+esc(a.actorName)+'</td><td>'+esc(actionNames[a.action] || a.action)+'</td><td>'+esc(a.message)+'</td><td>'+new Date(a.at).toLocaleTimeString('zh-CN')+'</td></tr>')):empty('暂无操作。修改策略、配置、协作或额度后会留下模拟记录。'));
  }
  function engineeringQuestionRows(items,withNotes=false) {
    return items.map(q=>'<div class="setting-row"><div>'+tag(q.id,'outline')+' '+tag(q.status,'orange')+'<h3>'+esc(q.title)+'</h3><p>观察与证据：'+esc(q.observed)+'</p><p>待核对：'+esc(q.question)+'</p>'+(withNotes?'<div class="review-note"><textarea data-note="'+q.id+'" aria-label="'+q.id+' 评审意见" placeholder="记录评审意见，不会自动改变待核对状态">'+esc(ui.notes[q.id]||'')+'</textarea></div>':'')+'</div></div>').join('');
  }
  function reviewPage() {
    const done=Object.values(ui.reviews).filter(v=>v==='通过').length;
    const pending=D.decisions.filter(d=>d.status!=='已确认');
    const productPending=pending.filter(d=>d.reviewStage!=='spec'),specReview=pending.filter(d=>d.reviewStage==='spec');
    const decisionRows=items=>items.map(d=>'<div class="decision"><div>'+tag(d.id,'outline')+' '+tag(d.reviewStage==='spec'?'留待 Spec/研发评审':'待产品确认','orange')+'<h3>'+esc(d.title)+'</h3><p>'+esc(d.proposal)+'</p></div>'+button('展开并记录','decision',d.id,'')+'</div>').join('');
    const list=D.topics.filter(t=>ui.reviewFilter==='all'||ui.reviewFilter==='pending'&&t.status==='待确认'||ui.reviewFilter==='unread'&&!ui.reviews[t.id]);
    return notice('覆盖不等于定案','原 26 项议题与 9 项补充议题映射到具体页面。待确认部分提供问题和候选入口，不伪造已经闭环的实现。')+
      '<div class="stats">'+stat('审阅议题',D.topics.length,'原 26 项 + 补充 9 项')+stat('产品待确认',productPending.length,(D.decisions.length-pending.length)+' 项已确认')+stat('留待 Spec/研发',specReview.length,'方向已定，不重复拉回需求确认')+stat('已标记通过',done,'仅本次会话的审阅意见')+'</div>'+
      '<div class="filterbar"><select id="review-filter" aria-label="覆盖项筛选"><option value="all">全部覆盖项</option><option value="pending" '+(ui.reviewFilter==='pending'?'selected':'')+'>只看规则待确认</option><option value="unread" '+(ui.reviewFilter==='unread'?'selected':'')+'>只看未审阅</option></select><span class="push muted">审阅意见不会修改 Input</span></div>'+
      '<div class="review-list">'+list.map(t=>'<article class="review-item"><div><span class="caption">议题 '+esc(t.id)+'</span> '+tag(t.status,['待确认','条件纳入'].includes(t.status)?'orange':t.status==='回归'?'blue':'green')+'<h2>'+esc(t.title)+'</h2><p>'+esc(t.note)+'</p><small>操作检查：'+t.actions.map(esc).join(' → ')+'</small><div class="actions">'+goto(t.page,'到页面试操作')+'</div></div><div class="review-note"><select aria-label="议题 '+t.id+' 审阅状态" data-review="'+t.id+'">'+['未审阅','通过','有疑问','需要调整'].map(v=>'<option '+((ui.reviews[t.id] || '未审阅')===v?'selected':'')+'>'+v+'</option>').join('')+'</select><textarea data-note="'+t.id+'" aria-label="议题 '+t.id+' 审阅意见" placeholder="记录问题或修改意见">'+esc(ui.notes[t.id] || '')+'</textarea></div></article>').join('')+'</div>'+
      section('产品待确认',decisionRows(productPending))+
      section('留待 Spec/研发评审',decisionRows(specReview))+
      '<div id="mail-engineering-questions">'+section('研发待确认 · 邮件核算',notice('沿用现有逻辑已经确认，以下不是产品待决策','本地代码存在预检与落账/计数主体差异，尚未核实线上部署。审阅标记不会自动解决这些问题，也不授权 Demo 选择新的扣量规则。','warning')+engineeringQuestionRows(D.engineeringQuestions)+'<div class="actions">'+button('查看核算路径','mailQuotaRules',null,'')+'<a href="'+esc(window.ReviewPublication.emailQuotaUrl)+'" target="_blank" rel="noopener">查看代码证据 '+icon('ArrowUpRight')+'</a></div>')+'</div>'+
      '<div id="collection-engineering-questions">'+section('研发待核对 · 收藏夹兼容',notice('产品规则已确认，三项实现疑点仍待核对','私有、本组公开、指定成员三种模式及 Owner 独占整夹治理已经确认；组长隐式协作沿用组织全局策略。以下记录前后端与新旧服务差异，意见仅保存在本次会话，不自动关闭研发待核事项。','warning')+engineeringQuestionRows(D.collectionEngineeringQuestions,true)+'<div class="actions">'+button('现网逻辑参考','collectionFacts',null,'')+goto('resource','返回收藏夹')+'<a href="'+esc(window.ReviewPublication.collectionEvidenceUrl)+'" target="_blank" rel="noopener">查看完整核对 '+icon('ArrowUpRight')+'</a></div>')+'</div>'+
      '<div id="monitor-engineering-questions">'+section('研发待核对 · 内容监控兼容',notice('保留现有规则已经确认，以下不是产品待决策','监控配额和各项设置权限保留，只增量组边界与全局组长隐式协作；不新增管理协作者委派。以下实现疑点不能因产品定案、议题通过或本地示例而自动关闭。','warning')+engineeringQuestionRows(D.monitorEngineeringQuestions,true)+'<div class="actions">'+button('查看监控流程与核算','monitorRules',null,'')+goto('monitor','返回内容监控')+'<a href="'+esc(window.ReviewPublication.monitorEvidenceUrl)+'" target="_blank" rel="noopener">查看完整核对 '+icon('ArrowUpRight')+'</a></div>')+'</div>'+
      section('已确认规则',['S11','S12','S17','S18','S26','S27','S40','S41'].map(id=>storyButton(window.ReviewStories.stories.find(x=>x.id===id))).join(''));
  }
  function modulePage() {
    const mod=ui.page;
    const available=s.projects.filter(p=>p.module===mod&&p.groupId===ui.group&&p.status!=='DELETED'&&E.access(s,ui.actor,p.id).read);
    let p=available.find(x=>x.id===ui.project) || available[0];ui.project=p?.id || null;
    return (mod==='payment'?notice('逐单协作，草稿不向全组公开','协作直接绑定单条支付单或草稿，不设支付项目。正式单对本组有效成员只读；草稿仅负责人及有效协作者可见，含组织策略开启后的组长隐式协作。普通读写不等于支付执行权。'):mod==='email'?notice('协作权限不决定扣量账号','发送与邮箱解锁沿用各路径现有规则，不统一扣操作人或项目 Owner；这里只示意流程，不执行邮件扣量。'):'')+
      (mod==='resource'?notice('内容协作与整夹治理分开','私有、本组公开、指定成员三种模式作用于当前收藏夹。协作者可维护夹内达人；名称、说明、共享范围、指定名单、转交和整夹删除仅负责人可操作。私有模式仍受组织组长默认协作策略影响。')+'<div class="actions">'+button('现网逻辑参考','collectionFacts',null,'')+button('评审问题 · 3 项','collectionQuestions',null,'')+'</div>':'')+
      (mod==='monitor'?notice('保留监控业务，项目治理与内容操作分开','负责人维护项目名称、说明、协作名单和日常治理；协作者可维护内容、内容负责人、时长与自动追踪，仍守原状态和配额。组长隐式来源不附带项目治理，不提供管理协作者委派。')+'<div class="actions">'+button('流程与配额说明','monitorRules',p?.id,'')+button('研发核对 · 5 项','monitorQuestions',null,'')+'</div>':'')+
      (mod==='crm'?notice('同一达人，各组独立对接','达人基础资料共享；本组合作状态、跟进备注和对接人独立。有效同组成员可读，写入与对接人改派沿用四项 CRM 配置；所有来源先受记录组隔离。记录不设置协作者，也不受组长默认协作开关影响。'):'')+
      (mod==='payment'&&ui.group&&!group(ui.group)?.paymentEnabled?notice('本组未开通支付','不能提交新付款，已有订单仍按原权限和资金承诺处理。Demo 暂不开放新建草稿。','warning'):'')+
      '<div class="tabbar"><button data-tab="objects" class="'+(ui.tab==='objects'?'active':'')+'">'+(mod==='crm'?'合作记录':mod==='payment'?'支付单与协作':mod==='resource'?'收藏夹与协作':'项目与协作')+'</button><button data-tab="settings" class="'+(ui.tab==='settings'?'active':'')+'">模块内设置</button>'+(mod==='payment'?'<button data-tab="waiting" class="'+(ui.tab==='waiting'?'active':'')+'">待组长审核 '+s.projects.filter(x=>x.module==='payment'&&x.groupId===ui.group&&x.status==='WAITING_REVIEW').length+'</button>':'')+'</div>'+
      (ui.tab==='settings'?moduleSettings(mod):ui.tab==='waiting'?paymentWaiting():
      '<div class="project-layout"><div class="project-selector">'+(available.length?available.map(x=>'<button data-project="'+x.id+'" class="'+(x.id===p?.id?'active':'')+'"><span>'+icon(mod==='payment'?'CreditCard':mod==='crm'?'Contact':'Folder')+esc(x.name)+'</span><small>'+tag(statusNames[x.status],x.status==='DRAFT'?'orange':'')+(x.ownerId?'负责人 '+name(x.ownerId):'对接人 '+name(x.assigneeId))+'</small></button>').join(''):'<div class="empty">'+icon('LockKeyhole')+'当前账号在该组没有可见对象</div>')+'</div><div class="project-detail">'+(p?objectDetail(p):empty('组织管理身份不自动开放业务对象。',button('切换为样例 Owner','asOwner',mod,'')+'<span class="form-hint">可使用右侧权限探针查看被拦截原因。</span>'))+'</div></div>');
  }
  function objectDetail(p) {
    const r=E.access(s,ui.actor,p.id);
    if(!r.read)return notice('没有当前记录的访问权限','需要该记录所属组的有效身份；组织管理身份不绕过业务组隔离。','warning');
    const crm=p.module==='crm',payment=p.module==='payment',collection=p.module==='resource',monitor=p.module==='monitor',collectionOwner=collection&&p.ownerId===ui.actor&&r.read;
    const objectActions=collection?button('协作范围','collaborators',p.id,'',!r.read)+button('共享范围与说明','collectionMode',p.id,'',!collectionOwner)+button('转交负责人','transferOwner',p.id,'',!r.transfer)+button('修改名称','renameProject',p.id,'',!collectionOwner)+button('删除收藏夹','deleteProject',p.id,'danger',!r.delete):
      monitor?button('协作范围','collaborators',p.id,'',!r.read)+button('项目说明','monitorSettings',p.id,'',!r.manage)+button('修改名称','renameProject',p.id,'',!r.manage)+button('转交项目负责人','transferOwner',p.id,'',!r.transfer)+button('删除项目','deleteProject',p.id,'danger',!r.delete):
      crm?button('编辑合作记录','saveCRMRecord',p.id,'primary',!r.write)+button(p.assigneeId?'改派对接人':'指派对接人','assignCRM',p.id,'',!r.write):
      button('协作者','collaborators',p.id,'',!r.manage)+(!payment?button('修改名称','renameProject',p.id,'',p.ownerId!==ui.actor||!r.read):'')+(!payment?button('删除项目','deleteProject',p.id,'danger',!r.delete):'');
    return '<div class="detail-top"><div><div class="caption">'+moduleNames[p.module]+' · '+gname(p.groupId)+'</div><h2>'+esc(p.name)+'</h2></div>'+tag(collection?(collectionModes.find(mode=>mode.id===p.sharingMode)?.name||'私有'):r.role==='Viewer'?'同组固定只读':r.role,r.write?'blue':'')+'</div>'+
      '<div class="meta"><span>'+(crm?'对接人（记录负责人）：'+name(p.assigneeId):'Owner：'+name(p.ownerId))+'</span><span>原始创建人：'+name(p.creatorId)+'</span></div>'+
      '<div class="authorizations">'+r.source.map(x=>'<span class="pill">'+icon('ShieldCheck')+esc(x)+'</span>').join('')+'</div>'+
      '<div class="actions">'+objectActions+'</div>'+
      (payment?paymentContent(p,r):collection?collectionContent(p,r):monitor?monitorContent(p,r):crm?crmContent(p,r):'<div class="content-sheet"><div class="section-heading"><h3>邮件与收件人</h3>'+tag('业务样本','outline')+'</div>'+table(['创作者','渠道','进展'],[['Mia Chen','YouTube','已建立联系'],['Alex Rivers','TikTok','待跟进']].map(v=>'<tr>'+v.map(x=>'<td>'+x+'</td>').join('')+'</tr>'))+(p.module==='email'?'<div class="actions">'+button('发送流程示意','sendEmail',p.id,'primary',!r.write)+button('扣量规则','mailQuotaRules',null,'')+goto('quota','查看发送额度')+'</div>':'')+'</div>')+
      (crm?'':section('协作关系概览',collaboratorSummary(p)));
  }
  function crmContent(p,r) {
    const profile=(s.creatorProfiles||[]).find(item=>item.id===p.creatorProfileId);
    return '<div class="content-sheet"><div class="section-heading"><h3>本组合作记录</h3>'+tag(r.write?'可编辑':'组内可读',r.write?'blue':'outline')+'</div><dl class="definition"><dt>共享达人资料</dt><dd>'+esc(profile?.name||'未知达人')+' · '+esc(profile?.platform||'—')+(profile?.channelId?'<br><small>'+esc(profile.channelId)+'</small>':'')+'</dd><dt>记录所属组</dt><dd>'+gname(p.groupId)+'</dd><dt>合作状态</dt><dd data-crm-status="'+esc(p.id)+'">'+esc(p.cooperationStatus||'待跟进')+'</dd><dt>跟进备注</dt><dd data-crm-note="'+esc(p.id)+'">'+esc(p.note||'暂无备注')+'</dd></dl>'+
      '<p class="form-hint">这里只修改当前组的业务记录，不修改共享达人基础资料或其他组的记录。对接人可以为空；普通编辑权同时用于指派/改派，不新增协作者或独立分工角色。</p>'+
      (!r.write?notice('本组读取不等于编辑授权','当前账号可读本组记录；编辑与改派仍按原四项写权限判断，可在模块内设置核对配置。'):'')+'</div>';
  }
  function collectionContent(p,r) {
    const items=p.items||[];
    return '<p class="form-hint">'+esc(p.description||'暂无说明')+'</p><div class="content-sheet"><div class="section-heading"><h3>收藏的创作者 · '+items.length+'</h3>'+button(icon('Plus')+' 添加样例达人','addCollectionItem',p.id,'',!r.write)+'</div>'+
      (items.length?table(['创作者','平台','收藏备注','操作'],items.map(item=>'<tr data-collection-item="'+esc(item.id)+'"><td>'+esc(item.name)+'</td><td>'+esc(item.platform)+'</td><td>'+esc(item.note||'—')+'</td><td><div class="actions">'+button('编辑备注','editCollectionItem',p.id+'|'+item.id,'text',!r.write)+button('移除达人','removeCollectionItem',p.id+'|'+item.id,'text',!r.write)+'</div></td></tr>')):empty('暂无收藏达人。'))+
      '<p class="form-hint">仅维护本夹的虚构内容和收藏备注，不修改平台真实档案，不触发解锁、发件或真实配额消耗。</p></div>';
  }
  function monitorContent(p,r) {
    return '<p class="form-hint">'+esc(p.description||'暂无项目说明')+'</p><div class="content-sheet"><div class="section-heading"><h3>监控内容 · 样例</h3>'+button('业务流程示意','monitorRules',p.id,'',!r.read)+'</div>'+
      (p.items?.length?table(['内容 / 平台','内容负责人','时长','备注','操作'],p.items.map(item=>'<tr data-monitor-item="'+esc(item.id)+'"><td>'+esc(item.name)+'<small>'+esc(item.platform)+'</small></td><td>'+name(item.responsibleUid)+'</td><td>'+item.monitorDays+' 天</td><td>'+esc(item.note||'—')+'</td><td>'+button('编辑内容设置','editMonitorItem',p.id+'|'+item.id,'text',!r.write)+'</td></tr>')):empty('暂无监控样例内容。'))+
      '<p class="form-hint">内容负责人不是项目 Owner，也不决定24额度归属。此处仅保存虚构备注和内容负责人；新增、时长调整、追踪及删除通过流程说明审阅，不执行真实业务或配额变动。</p></div>';
  }
  function collaboratorSummary(p) {
    const collection=p.module==='resource',monitor=p.module==='monitor',restricted=collection||monitor;
    const rows=collaboratorEntries(p).map(({uid,explicit,implicit,groupSource})=>'<tr data-collaborator-uid="'+esc(uid)+'"><td>'+name(uid)+'</td><td>'+collaboratorSources(uid,explicit,implicit,groupSource)+'</td><td>'+(restricted?(E.access(s,uid,p.id).write?'内容读写':'暂不生效'):([explicit&&!explicit.disabled&&explicit.canManage?'管理协作者':'',explicit&&!explicit.disabled&&explicit.canExecute?'执行支付':''].filter(Boolean).join('、')||'无附加能力'))+'</td></tr>');
    return '<div class="collaborator-summary">'+(rows.length?table(['成员','来源 / 状态',restricted?'内容权限':'附加能力'],rows):'<p class="muted">没有其他有效协作来源'+(!s.policies.t2Collaborator?'；组长默认协作策略已关闭。':'。')+'</p>')+(collection?'<p class="form-hint">负责人不列为协作者。公开、指定名单与组长来源仅提供内容读写，不能管理整个收藏夹或转授治理权限。</p>':monitor?'<p class="form-hint">项目负责人不重复列入。显式与组长来源仅提供监控内容的原有业务操作，不取得项目治理或名单管理委派。</p>':p.module==='email'?'<p class="form-hint">邮件沿用线上：Owner 与已获名单管理权的正式协作者可增减协作者，并授予或收回其他正式协作者的名单管理权；不因此获得改名、整项目删除或日常负责人转交。</p>':'')+'</div>';
  }
  function collaboratorEntries(p) {
    if(p.module==='crm')return [];
    const entries=new Map(p.collaborators.filter(c=>!['resource','monitor'].includes(p.module)||c.uid!==p.ownerId).map(c=>[c.uid,{uid:c.uid,explicit:c,implicit:false,groupSource:false}]));
    if(p.module==='resource'&&p.sharingMode==='group')s.users.filter(u=>active(u.id,p.groupId)&&u.id!==p.ownerId).forEach(u=>{
      if(entries.has(u.id))entries.get(u.id).groupSource=true;
      else entries.set(u.id,{uid:u.id,explicit:null,implicit:false,groupSource:true});
    });
    if(s.policies.t2Collaborator)s.users.filter(u=>E.isLead(s,u.id,p.groupId)&&u.id!==p.ownerId&&u.id!==p.assigneeId).forEach(u=>{
      if(entries.has(u.id))entries.get(u.id).implicit=true;
      else entries.set(u.id,{uid:u.id,explicit:null,implicit:true,groupSource:false});
    });
    return [...entries.values()];
  }
  function collaboratorSources(uid,explicit,implicit,groupSource) {
    return (explicit?tag(explicit.disabled?'显式协作已禁用，保留快照':'显式协作',explicit.disabled?'orange':'blue'):'')+
      (groupSource?'<label class="inline-check" title="本组公开动态生效，不能逐个取消成员；需由负责人改为指定成员模式"><input type="checkbox" checked disabled data-group-collaborator="'+esc(uid)+'" aria-label="'+name(uid)+' 本组公开协作">本组公开 · 普通读写</label>':'')+
      (implicit?'<label class="inline-check" title="由组织策略和本组组长身份生效，不能在单个对象内取消"><input type="checkbox" checked disabled data-implicit-collaborator="'+esc(uid)+'" aria-label="'+name(uid)+' 组长隐式协作">组长隐式授权 · 普通读写</label>':'');
  }
  function paymentContent(p,r) {
    const b=E.balances(s,p.groupId,p.ownerId), sensitive=r.write||s.policies.paymentSensitive;
    const recipient=p.recipientSnapshot||{name:'未填写',account:''};
    const waiting=p.status==='WAITING_REVIEW',expired=p.status==='SCHEDULE_EXPIRED',canSubmit=r.execute&&group(p.groupId)?.paymentEnabled;
    const canAdvance=['FORMAL','SCHEDULED'].includes(p.status)||(waiting&&p.scheduled);
    return '<div class="content-sheet"><div class="section-heading"><h3>付款信息</h3>'+tag(statusNames[p.status],p.status==='DRAFT'||waiting||expired?'orange':'blue')+'</div><dl class="definition"><dt>支付金额</dt><dd class="num">CNY '+n(p.paymentAmount)+'</dd><dt>收款人</dt><dd>'+esc(recipient.name)+(sensitive?' / 示例账号 '+esc(recipient.account):' / 敏感信息已遮蔽')+'</dd><dt>资金承担人 / 组</dt><dd>'+name(p.fundingUid || p.ownerId)+' / '+gname(p.fundingGroupId || p.groupId)+(p.fundingCommitted?' · 已形成占用':'')+'</dd><dt>实际执行人</dt><dd>'+name(p.submitterId)+' · 不替代资金承担人</dd>'+(p.scheduledAt?'<dt>预约时点</dt><dd>'+esc(p.scheduledAt.replace('T',' '))+' · 示例</dd>':'')+'</dl>'+
      (p.status==='DRAFT'?'<div class="actions">'+button('填写草稿','savePayment',p.id,'',!r.write)+button('正式提交','submitPayment',p.id,'primary',!canSubmit)+button('预约提交','schedulePayment',p.id,'',!canSubmit)+button('删除草稿','deleteDraft',p.id,'danger',!r.delete)+'</div>':'')+
      (waiting?notice(p.scheduled?'等待预约前审核':'等待组长审核','任一有效同组组长可审核；审核权限不等于支付执行权限。','warning'):'')+
      (expired?notice('预约已逾期，未执行','不能补审或再次模拟到期来执行。原资金占用保留，可作废并释放；重新预约、转立即等路径不在本次示意中。','warning'):'')+
      '<div class="actions">'+(waiting?button(p.scheduled?'通过预审核':'组长审核放行','reviewPayment',p.id,'primary',!lead(p.groupId)):'')+(canAdvance?button(p.scheduled?'模拟到达预约时点':'手动放行 / 执行','releasePayment',p.id,waiting?'':'primary',!r.execute):'')+(p.fundingCommitted&&(canAdvance||waiting||expired)?button('取消并释放占用','cancelPayment',p.id,'danger',!r.execute):'')+'</div>'+
      (!r.write?notice('正式单同组固定只读','可以查看已允许的字段；不可编辑、提交、执行或管理协作。'):'')+
      '<div class="metric-grid"><div class="metric-item"><small>所属组可用余额 · CNY</small><strong>'+n(b.groupRemaining)+'</strong></div><div class="metric-item"><small>负责人组内个人剩余</small><strong>'+n(b.memberRemaining)+'</strong></div></div></div>';
  }
  function recipientSettings() {
    const records=s.recipients.filter(r=>r.status==='ACTIVE');
    const channels=[...new Map(records.map(r=>[r.channelId,{id:r.channelId,name:r.channelName}])).values()];
    const selected=channels.some(c=>c.id===ui.recipientChannel)?ui.recipientChannel:'all';
    const visible=records.filter(r=>selected==='all'||r.channelId===selected);
    return section('频道收款信息快捷模板',notice('全组织共享，不是支付业务记录','本组织有效成员均可管理；同频道可保留不同收款信息，重复记录拦截。改删模板不回写已保存支付单，也不开放来源订单。')+
      '<div class="filterbar"><label>频道 <select id="recipient-channel" aria-label="筛选收款模板频道"><option value="all">全部频道</option>'+options(channels,selected)+'</select></label>'+button(icon('Plus')+' 新增收款记录','saveRecipient',null,'primary',!ui.group)+'</div>'+
      (visible.length?table(['频道','收款人','示例账号','操作'],visible.map(r=>'<tr data-recipient-row="'+esc(r.id)+'"><td>'+esc(r.channelName)+'<small>'+esc(r.channelId)+'</small></td><td>'+esc(r.name)+'</td><td>'+esc(r.account)+'</td><td><div class="actions">'+button(icon('Pencil'),'saveRecipient',r.id,'text',!ui.group,'编辑收款记录')+button(icon('Trash2'),'deleteRecipient',r.id,'text',!ui.group,'删除快捷模板，不删除支付记录')+'</div></td></tr>')):empty('没有符合条件的收款模板。'))+
      '<p class="form-hint">仅用虚构字段演示同频道去重；真实银行、币种等去重键留待 Spec，不建设版本审批或停用恢复系统。</p>'+button('预览共享模板','recipient',null,'',!ui.group));
  }
  function moduleSettings(mod) {
    if(mod==='payment')return section('当前组支付审核',notice('组级规则，不设组织默认值','此开关在 '+gname(ui.group)+' 内生效。已预约且需审核的订单进入待预审核；到期未通过则逾期。本 Demo 使用手动推进的模拟时点，不接真实调度与系统审核。','warning')+'<div class="setting-row"><div><h2>支付前需要组长审核放行</h2><p>任一组长放行；到达闸门时实际提交人是同组 T2 则豁免。</p></div>'+toggle('groupPayment',group(ui.group)?.requireT2PaymentRelease,!admin(),'当前组支付审核')+'</div>')+recipientSettings();
    if(mod==='monitor')return section('内容监控标签',notice('组织共享定义与项目应用分开','创建来源组不随创建人退组漂移，但不是定义权限隔离边界；标签groupId=1/2/3是分类，不是业务组。项目内应用仍需对象权限；置顶是否纳入新增定义限制开关仍待明确。')+labelsTable('monitor'))+goto('policies','设置组织级标签策略')+section('其他设置按原业务边界',notice('不统一收归负责人','内容负责人、时长和自动追踪由有效内容协作者按原规则维护；名称、说明和名单仅项目负责人。展示配置、人工指标与能力资格分别校验。')+button('查看业务流程与核算','monitorRules',null,'')+button('研发核对 · 5 项','monitorQuestions',null,''));
    if(mod==='crm')return section('CRM 记录读写权限',notice('沿用四项写权限，先检查记录组','四项是组织级 CRM 配置，选中来源叠加，不是新增组级角色。配置2/3仍按对接人的既有账号组关系取组长/成员，再与记录组边界求交，不直接授权新组全员。有对接人时本人可写，未分配沿原管理员兜底/所有人配置；普通编辑权限也用于指派和改派。')+
      '<div class="formgrid">'+crmWriteOptions.map(option=>'<label class="inline-check"><input type="checkbox" data-crm-permission="'+option.id+'" '+((s.crmWritePermissions||[]).includes(option.id)?'checked ':'')+(!admin()?'disabled ':'')+'>'+esc(option.name)+'</label>').join('')+'</div><div class="actions">'+button('保存 CRM 写权限','saveCRMWritePermissions',null,'primary',!admin())+button('查看已确认方案','decision','D09','')+'</div><p class="form-hint">虚构样例既有 CRM 管理员：'+name(s.crmLegacyAdminId)+'。配置1和未分配兜底不自动扩展为所有 Owner/Admin；原账号组关系只读保留作鉴权示意，不提供维护入口，真实身份/组关系映射仍须研发确认。旧 CRM 分组设置暂定弃用，不沿用为本期业务组；自定义视图及标签不能因此一并删除，历史归组和关联入口仍须验收。</p>')+
      section('组织共享标签 · 独立删除动作',notice('不是项目协作权限','Owner 可删除。Admin 的此项业务动作、T2 独立委派及创建者旧配置未收口；本示例只开放 Owner，其他身份不作默认裁决。','warning')+table(['标签','创建来源','影响范围','操作'],s.labels.filter(l=>l.module==='crm').map(l=>'<tr><td>'+esc(l.name)+'</td><td>'+name(l.creatorId)+' / '+gname(l.groupId)+'</td><td>'+l.affected+' 位创作者 · 模拟</td><td>'+button('删除共享定义','deleteCRMLabel',l.id,'danger',actor().orgRole!=='owner')+'</td></tr>')));
    if(mod==='resource')return notice('共享范围按收藏夹设置','负责人在具体收藏夹中选择私有、本组公开或指定成员；不提供跨组公开，不设置模块级共享开关。组织组长默认协作策略开启时，同组有效组长在三种模式下都取得内容读写，不取得整夹治理权限。')+
      button('返回收藏夹与协作','objects',null,'')+button('现网逻辑参考','collectionFacts',null,'')+button('评审问题 · 3 项','collectionQuestions',null,'');
    return section('项目级协作',notice('不在模块设置页批量授予所有项目写权限','协作者绑定具体项目；项目内附加能力另行授予。')+button('返回项目操作','objects',null,''));
  }
  function paymentWaiting() {
    const waiting=s.projects.filter(p=>p.module==='payment'&&p.groupId===ui.group&&p.status==='WAITING_REVIEW'&&(lead()||E.access(s,ui.actor,p.id).read));
    return notice('待审核筛选视图','同组组长可处理审核待办；这是独立授权动作，不能扩大成任意支付写权限。')+(waiting.length?table(['支付单','提交人','金额','方式','操作'],waiting.map(p=>'<tr><td>'+esc(p.name)+'</td><td>'+name(p.submitterId)+'</td><td>'+n(p.paymentAmount)+'</td><td>'+(p.scheduled?'预约前预审核':'立即执行')+'</td><td>'+button('审核放行','reviewPayment',p.id,'primary',!lead())+'</td></tr>')):empty('当前组没有待组长审核支付单。'));
  }
  function labelsTable(mod) {
    const labels=s.labels.filter(l=>(mod==='monitor'||l.groupId===ui.group)&&(!l.module||l.module===mod));
    const can=active(ui.actor,ui.group)&&(mod!=='monitor'||!s.policies.monitorLabelsT2||admin()||actor().memberships.some(m=>E.isLead(s,ui.actor,m.groupId)));
    return button('新增标签','addLabel',mod,'',!can)+table(['标签','创建人','创建来源组','操作'],labels.map(l=>'<tr><td>'+esc(l.name)+'</td><td>'+name(l.creatorId)+'</td><td>'+gname(l.groupId)+'</td><td>'+button('改名','renameLabel',l.id,'text',!can)+button('删除','deleteLabel',l.id,'text',!can)+'</td></tr>'));
  }
  function messagePage() {
    const scope=ui.labelScopes?.[ui.actor] || 'all';
    let labels=s.labels.filter(l=>l.module==='message'||!l.module);
    if(scope==='mine')labels=labels.filter(l=>l.creatorId===ui.actor);
    else if(scope==='group')labels=labels.filter(l=>l.groupId===ui.group);
    return '<div class="tabbar"><button data-tab="labels" class="'+(ui.tab!=='conversation'?'active':'')+'">标签筛选</button><button data-tab="conversation" class="'+(ui.tab==='conversation'?'active':'')+'">邮件会话</button></div>'+
      (ui.tab==='conversation'?conversationPage():
      section('标签来源','<div class="filterbar"><select id="label-scope" aria-label="标签创建来源"><option value="mine" '+(scope==='mine'?'selected':'')+'>我创建的</option><option value="group" '+(scope==='group'?'selected':'')+'>当前组成员创建的</option><option value="all" '+(scope==='all'?'selected':'')+'>全部 · 组织共享</option></select>'+button('新增标签','addLabel','message','',!ui.group)+'</div>'+notice('来源筛选不改变标签权限','默认全部，按账号记忆本次会话选择；组来源用固定创建归组，不按创建人当前组反查。消息标签仍全组织可见，不因此获得任何会话权限。')+table(['标签','创建人','创建时组'],labels.map(l=>'<tr><td>'+esc(l.name)+'</td><td>'+name(l.creatorId)+'</td><td>'+gname(l.groupId)+'</td></tr>'))));
  }
  function conversationPage() {
    const conversations=E.conversationsForGroup(s,ui.actor,ui.group,ui.conversationFilter),selected=conversations.find(c=>c.id===ui.conversationId)||conversations[0];
    ui.conversationId=selected?.id||null;
    const rows=conversations.map(c=>{
      const p=E.project(s,c.projectId),r=E.conversationAccess(s,ui.actor,c.id),assignees=c.assignedUids.filter(uid=>E.conversationAccess(s,uid,c.id).assigned);
      return '<tr data-conversation-row="'+esc(c.id)+'"><td><strong>'+esc(c.creatorName)+'</strong><small>'+esc(c.channelId)+'</small></td><td>'+esc(p.name)+'<small>Owner：'+name(r.ownerId)+'</small></td><td>'+tag(c.hasReply?'沟通中':'建联中',c.hasReply?'green':'outline')+(c.unreadBy[ui.actor]?tag('未读 '+c.unreadBy[ui.actor],'orange'):'')+'<small>'+esc(c.preview)+'</small></td><td>'+(assignees.length?assignees.map(name).join('、'):'未转交')+'</td><td>'+esc(r.role)+'<small>'+(r.write?'可回复':'只读')+'</small></td><td>'+button('查看会话','selectConversation',c.id,'text')+'</td></tr>';
    });
    return notice('继承项目协作，转交是独立的跟进关系','只列当前组中有权访问的精确“项目 × 达人”会话；同一达人在其他项目或组的预览、未读与转交关系不混用。转交不修改项目 Owner 或协作者名单。')+
      '<div class="filterbar"><label>会话状态 <select id="conversation-filter" aria-label="会话状态筛选"><option value="chat" '+(ui.conversationFilter==='chat'?'selected':'')+'>沟通中 · 已有回复</option><option value="send" '+(ui.conversationFilter==='send'?'selected':'')+'>建联中 · 尚无回复</option><option value="all" '+(ui.conversationFilter==='all'?'selected':'')+'>全部</option></select></label><span class="muted">默认沟通中；单方面多轮跟进不会自动成为沟通中。</span></div>'+
      (rows.length?table(['达人','所属邮件项目','状态 / 最近消息','转交跟进人','当前访问身份','操作'],rows):empty('当前组和筛选下没有可见会话。'))+
      (selected?conversationDetail(selected):'')+
      notice('审阅示意边界','转交、发送身份选择和来信提醒仅在虚构样本中演示；不发送邮件、不触发真实通知或增减配额。真实 Reply-To、组长隐式协作与转交重叠、历史与迁组投影仍需 Spec/研发验收。','warning')+
      notice('旧任务列表不在本期改造','默认全组织可用，保持现状；不等同智能营销计划或新 Campaign，不据此扩大其他项目权限。')+button('查看已确认范围','decision','D13','');
  }
  function conversationDetail(c) {
    const p=E.project(s,c.projectId),r=E.conversationAccess(s,ui.actor,c.id),recipients=E.conversationRecipients(s,c.id),assignees=c.assignedUids.filter(uid=>E.conversationAccess(s,uid,c.id).assigned);
    return section(esc(c.creatorName)+' · '+esc(p.name),
      '<dl class="definition"><dt>Owner / 组</dt><dd>'+name(r.ownerId)+' / '+gname(p.groupId)+'</dd><dt>有效转交跟进人</dt><dd>'+(assignees.length?assignees.map(name).join('、'):'无，由 Owner 跟进')+'</dd><dt>当前身份</dt><dd>'+esc(r.role)+' · '+(r.write?'可回复':'只读')+'</dd><dt>会话预览</dt><dd>'+esc(c.preview)+'</dd></dl>'+
      '<div class="actions">'+button('设置转交跟进人','conversationAssignments',c.id,'',!r.manageAssignments,'仅来源邮件项目 Owner 可设置或移除转交')+button('回复身份预览','conversationReply',c.id,'primary',!r.write)+button('模拟新来信','simulateConversationIncoming',c.id,'',!r.read)+'</div>'+
      '<div id="conversation-notification-summary" class="audit-box" aria-live="polite"><strong>后续来信的被动提醒接收人</strong><p>'+(recipients.length?recipients.map(name).join('、'):'无有效接收人')+'</p><p class="form-hint">有有效转交人时不提醒 Owner，其他正式项目协作者仍接收；清空转交后恢复未来 Owner 提醒，不回补历史未读。模拟来信仅更新本会话虚构未读与预览。</p></div>');
  }
  function conversationAssignmentsDialog(id) {
    const c=s.conversations.find(c=>c.id===id),r=E.conversationAccess(s,ui.actor,id);
    if(!c||!r.manageAssignments)return toast('仅来源邮件项目 Owner 可设置转交跟进人',false);
    const p=E.project(s,c.projectId),candidates=s.users.filter(u=>active(u.id,p.groupId)&&u.id!==p.ownerId&&!p.collaborators.some(item=>item.uid===u.id&&!item.disabled));
    dialog('转交跟进 · '+esc(c.creatorName),notice('仅变更本会话跟进关系','可选 0–50 位来源组有效成员；Owner 和正式项目协作者不重复加入转交名单。转交后 Owner 仍可回复，但不接收后续普通被动提醒；转交人使用自己的邮箱配置。')+
      (candidates.length?'<div class="formgrid">'+candidates.map(u=>'<label class="inline-check"><input type="checkbox" name="assigneeUid" value="'+esc(u.id)+'" '+(c.assignedUids.includes(u.id)?'checked ':'')+'>'+esc(u.name)+' · '+esc(u.email)+'</label>').join('')+'</div>':empty('没有可选的本组有效非项目成员。'))+
      '<p class="form-hint">不选任何人即移除全部转交，恢复由 Owner 接收后续提醒；不变更项目名单或原消息内容，不回补历史未读。</p>'+button('移除全部转交','clearConversationAssignments',id,'danger',!c.assignedUids.length),
      ()=>perform('setConversationAssignments',{conversationId:id,uids:[...$('#dialog').querySelectorAll('[name="assigneeUid"]:checked')].map(el=>el.value)},true),'保存转交关系');
  }
  function conversationSenderPreview(id,configId) {
    const result=E.conversationSender(s,ui.actor,id,configId||undefined);
    return result.ok?'<dl class="definition"><dt>实际操作人 / 站内头像姓名</dt><dd>'+name(result.operatorUid)+' / '+esc(result.avatarName)+'</dd><dt>发件配置归属</dt><dd>'+name(result.senderUid)+'</dd><dt>实际 From</dt><dd>'+esc(result.sendName)+' &lt;'+esc(result.address)+'&gt;</dd><dt>Reply-To</dt><dd>'+esc(result.replyToNote)+'</dd></dl>':notice('未形成可用发件身份',esc(result.message),'warning');
  }
  function conversationReplyDialog(id) {
    const c=s.conversations.find(c=>c.id===id),r=E.conversationAccess(s,ui.actor,id);
    if(!c||!r.write)return toast('没有该会话的有效回复权限',false);
    const p=E.project(s,c.projectId),ordinary=!(r.assigned&&!r.formal&&ui.actor!==r.ownerId),configs=s.senderConfigs.filter(config=>config.uid===ui.actor||ordinary&&config.uid===p.ownerId);
    dialog('回复身份预览 · '+esc(c.creatorName),notice('保留线上发件身份逻辑','Owner / 正式项目协作者默认使用 Owner 配置，也可选本人配置；真正转交跟进人须显式选本人配置，不借用 Owner 配置。站内头像姓名反映实际操作人，不能据此推导真实 From 或 Reply-To。')+
      field('发件配置','<select name="senderConfigId" data-conversation="'+esc(id)+'">'+(ordinary?'<option value="">默认 Owner 配置</option>':'<option value="">请选择本人发件配置</option>')+options(configs,'',config=>user(config.uid).name+' · '+config.sendName+' <'+config.address+'>')+'</select>',true)+
      '<div id="conversation-sender-preview" class="audit-box" aria-live="polite">'+conversationSenderPreview(id)+'</div>'+
      notice('仅预览，不发送','已有沟通回复通常不新增 Scope21；首次直联和新解锁仍有路径差异。此处不输入正文、不发送邮件，也不生成成功发送记录。')+button('查看扣量路径','mailQuotaRules',null,''));
  }
  function searchPage() {
    const scope=ui.contactScope || 'team';
    return notice('团队与个人范围','本页仅展示“联系过 / 合作过”范围筛选；不把范围筛选当作联系人明细授权。')+
      '<div class="filterbar"><input id="creator-query" placeholder="搜索创作者" aria-label="搜索创作者"><select id="contact-scope" aria-label="联系合作范围">'+[['mine','仅我联系过'],['team','全团队联系过'],['mineCooperate','仅我合作过'],['cooperate','全团队合作过']].map(([value,label])=>'<option value="'+value+'" '+(scope===value?'selected':'')+'>'+label+'</option>').join('')+'</select>'+button(icon('LockKeyhole')+' 高级筛选权益说明','entitlementInfo',null,'')+'</div>'+
      table(['创作者','平台','联系 / 合作来源','操作'],[{name:'Mia Chen',platform:'YouTube',uid:'u-member',cooperated:true},{name:'Alex Rivers',platform:'TikTok',uid:'u-editor',cooperated:false},{name:'Leah Park',platform:'Instagram',uid:'u-member',cooperated:true}].filter(r=>(!['mine','mineCooperate'].includes(scope)||r.uid===ui.actor)&&(!['cooperate','mineCooperate'].includes(scope)||r.cooperated)).map(r=>'<tr class="creator-row" data-query="'+r.name.toLowerCase()+'"><td>'+r.name+'</td><td>'+r.platform+'</td><td>'+name(r.uid)+' · 历史对接人</td><td>'+button('联系 / 获取邮箱','contactCreator',r.name,'text',!ui.group)+'</td></tr>'))+
      section('无权益高级筛选',notice('先提示，不让用户误选','合作倾向、可用联系方式等无权益选项在选择前锁定并说明所需套餐；升级或联系销售复用现有入口。不新增内部申请表单、通知或审批。')+'<div class="actions"><label><input type="checkbox" disabled> 合作倾向 · '+icon('LockKeyhole')+'</label><label><input type="checkbox" disabled> 可用联系方式 · '+icon('LockKeyhole')+'</label>'+button('查看权益与升级说明','entitlementInfo',null,'')+'</div>'+notice('本期纳入，成本评审保留裁剪条件','评审时核额外实现成本，成本高可决定本期不做；本地只示意锁定和说明，不进行购买、升级或开通。','warning'));
  }
  const actionNames={invite:'邀请成员',acceptInvite:'接受邀请',cancelInvite:'撤销邀请',addGroup:'创建业务组',renameGroup:'业务组改名',setRole:'修改组身份',setOrgRole:'修改组织身份',transferOrgOwner:'转让组织所有权',setPolicy:'修改组织策略',setGroupPolicy:'修改组支付策略',setQuota:'设置配额',batchIncreaseQuota:'批量增加配额',consume:'业务消耗',addMembership:'加入业务组',removeMembership:'发起退出',cancelRemoval:'撤销退组',completeRemoval:'完成移交',archiveGroup:'冻结归档组',addCollaborator:'添加协作者',removeCollaborator:'移除协作者',setCapability:'调整附加能力',transferOwner:'项目负责人转交',assignCRM:'指派 CRM 对接人',saveCRMRecord:'保存本组 CRM 记录',setCRMWritePermissions:'设置 CRM 四项写权限',moveProjects:'项目迁组',setGroupPaymentAccess:'变更组支付开通状态',allocateFunds:'分配组余额',returnFunds:'收回组余额',rechargeFunds:'模拟线下到账',refundPayment:'模拟退款到账',setPaymentLimit:'设置个人支付上限',savePayment:'保存支付草稿',submitPayment:'正式提交支付',cancelPayment:'取消支付',deleteDraft:'删除草稿',releasePayment:'支付者放行',reviewPayment:'组长审核',createProject:'新建项目',addLabel:'创建标签',renameLabel:'标签改名',deleteLabel:'删除标签',renameProject:'修改项目名称',deleteProject:'删除项目'};
  Object.assign(actionNames,{startOrganizationExit:'组织清退及接收安排',completeHandoff:'整体接替',completeGroupHandoff:'本组业务交接'});
  Object.assign(actionNames,{setCollectionMode:'收藏夹共享范围与说明',addCollectionItem:'添加收藏夹样例达人',editCollectionItem:'修改收藏备注',removeCollectionItem:'移除收藏夹样例达人'});
  Object.assign(actionNames,{saveRecipient:'保存频道收款模板',deleteRecipient:'删除收款快捷模板'});
  Object.assign(actionNames,{setMonitorProjectSettings:'修改监控项目说明',editMonitorItem:'修改监控内容备注及负责人'});
  Object.assign(actionNames,{setConversationAssignments:'设置会话转交跟进人',simulateConversationIncoming:'模拟会话新来信'});
  let submitDialog=null;
  function dialog(title,body,onSubmit,label) {
    const d=$('#dialog');
    d.classList.remove('quota-dialog');
    submitDialog=onSubmit || null;
    d.innerHTML='<form id="dialog-form"><div class="dialog-head"><h2 id="dialog-title">'+title+'</h2><button type="button" class="btn icon" data-action="close" aria-label="关闭弹窗" title="关闭">'+icon('X')+'</button></div><div class="dialog-body">'+body+'<p id="form-error" class="form-error" role="alert"></p></div><div class="dialog-foot"><button type="button" class="btn" data-action="close">'+(onSubmit?'取消':'关闭')+'</button>'+(onSubmit?'<button class="btn primary" type="submit">'+(label || '确认保存')+'</button>':'')+'</div></form>';
    d.querySelectorAll('.form-field').forEach((f,i)=>{const control=f.querySelector('input,select,textarea'),l=f.querySelector('label');if(control&&l){control.id='dialog-field-'+i;l.htmlFor=control.id;}});
    localizeRoleCopy(d);
    if(!d.open)d.showModal();
  }
  function mailQuotaPathDetail(pathId) {
    const path=D.mailQuotaPaths.find(item=>item.id===pathId)||D.mailQuotaPaths[0];
    return notice('邮件发送 · Scope21',esc(path.send))+notice('邮箱解锁 · Scope4',esc(path.unlock))+'<p class="form-hint">'+esc(path.note)+'</p>';
  }
  function mailQuotaDialog(p) {
    const context=p?notice('当前操作人：'+name(ui.actor),'对象：'+esc(p.name)+' / '+gname(p.groupId)+'。具备写权限不代表配额记在当前操作人；邮件没有日常 Owner 转交，账号级交接后的核算字段映射仍需核验。'):'';
    dialog(p?'发送流程与扣量说明':'邮件发送与邮箱解锁',context+
      field('业务路径','<select id="mail-quota-path" name="mailPath">'+options(D.mailQuotaPaths,'email-project')+'</select>',true)+
      '<div id="mail-quota-path-detail" aria-live="polite">'+mailQuotaPathDetail('email-project')+'</div>'+
      section('发送流程','<ol><li>校验操作人的对象写权限、组身份及原有发件资格。</li><li>沿用该路径的解锁复用、余额预检与预扣规则。</li><li>按原核算账号落账，保留成功补齐、失败返还及重试幂等。</li></ol>')+
      notice('仅示意，不执行邮件业务','本窗口不发送邮件、不解锁邮箱、不增减用量，也不模拟真实队列或每日上限。预检与实际落账差异保留为研发待确认，不在这里默认为已修复。','warning')+
      '<div class="actions">'+button('查看研发待确认','mailQuestions',null,'')+'<a href="'+esc(window.ReviewPublication.emailQuotaUrl)+'" target="_blank" rel="noopener">代码证据 '+icon('ArrowUpRight')+'</a></div>');
  }
  function monitorRulePathDetail(pathId) {
    const path=D.monitorQuotaPaths.find(item=>item.id===pathId)||D.monitorQuotaPaths[0];
    return notice('操作权限',esc(path.permission))+notice('配额与责任',esc(path.accounting))+
      '<ol>'+path.steps.map(step=>'<li>'+esc(step)+'</li>').join('')+'</ol><p class="form-hint">'+esc(path.note)+'</p>';
  }
  function monitorRulesDialog(p) {
    if(p&&(p.module!=='monitor'||!E.access(s,ui.actor,p.id).read))return toast('没有查看该监控项目的权限；可在组员配额查看公共流程说明',false);
    const context=p?notice('当前项目：'+esc(p.name),'项目负责人：'+name(p.ownerId)+' / 当前操作人：'+name(ui.actor)+' / '+gname(p.groupId)+'。普通内容读写不产生项目治理权；各项核算账号沿用原逻辑。'):'';
    dialog('内容监控 · 流程与配额说明',context+
      field('业务路径','<select name="monitorPath">'+options(D.monitorQuotaPaths,'add-content')+'</select>',true)+
      '<div id="monitor-rule-path-detail" aria-live="polite">'+monitorRulePathDetail('add-content')+'</div>'+
      notice('仅示意，不执行业务','本窗口不新增/删除视频，不调整时长，不暂停或恢复追踪，不扣量/返还或生成报表。真实接口、状态与核算差异仍待研发核对；不存在本次执行成功的结果。','warning')+
      '<div class="actions">'+button('查看研发待核对','monitorQuestions',null,'')+'<a href="'+esc(window.ReviewPublication.monitorEvidenceUrl)+'" target="_blank" rel="noopener">查看代码证据 '+icon('ArrowUpRight')+'</a></div>');
  }
  function collectionFactsDialog() {
    dialog('收藏夹 · 现网逻辑参考',notice('证据边界','以下供兼容评审参考，不是新增产品规则。线上仅只读查看列表、详情和设置表单，未执行收藏、移动、删除、解锁或保存；这些写入后果主要由服务端代码证明。')+
      D.collectionReferenceFacts.map(f=>'<div class="setting-row"><div><h3>'+esc(f.title)+'</h3><p>'+esc(f.detail)+'</p><small>'+esc(f.evidence)+'</small></div></div>').join('')+
      notice('已确认的配额口径','收藏夹数量按普通配额逻辑；容量是全局统一的单夹上限，不下分、不设置个人容量或次数消耗；邮箱/WhatsApp 新解锁按操作者，保留历史复用。')+
      notice('已确认的组内共享与治理','私有、本组公开、指定成员三种模式均已确认。组织全局组长默认协作策略默认关闭，开启后包含私有夹的同组有效组长获得内容读写；整夹名称、说明、范围、指定名单、转交及删除均由负责人独占，不提供治理委派。')+
      '<div class="actions">'+button('查看评审问题','collectionQuestions',null,'')+'<a href="'+esc(window.ReviewPublication.collectionEvidenceUrl)+'" target="_blank" rel="noopener">查看完整核对 '+icon('ArrowUpRight')+'</a></div>');
  }
  function confirmAction(title,body,type,payload,label) { dialog(title,body,()=>perform(type,payload,true),label || '确认执行'); }
  function fundAction(action,id) {
    const g=group(id),b=E.balances(s,id,ui.actor);
    const amount=(label,min,max,initial='')=>field(label,inp('amount',initial,'number','min="'+min+'" step="0.01" '+(max==null?'':'max="'+max+'" ')+'required'));
    const reason=()=>field('原因',inp('reason','','text','required maxlength="120"'));
    if(action==='groupLedger'){
      ui.fundLedgerScope=id;
      render();
      $('#fund-ledger-scope').focus();
      return;
    }
    if(action==='enablePayment')return dialog('开通支付 · '+gname(id),notice('可同时分配首笔余额','组织待分配余额 '+n(b.unallocated)+' CNY。填 0 仅开通；此组仍需有余额才能提交付款。')+amount('首次分配金额（CNY）',0,b.unallocated,0)+reason(),v=>perform('setGroupPaymentAccess',{groupId:id,enabled:true,amount:Number(v.amount),reason:v.reason},true),'确认开通');
    if(action==='disablePayment')return dialog('关闭支付 · '+gname(id),notice('不再接受新付款','本组可用余额 '+n(g.fundBalance)+' CNY 将全部收回组织；既有占用 '+n(g.fundPending)+' CNY 保留。旧单之后释放或退款到账，均回组织待分配余额。','warning')+reason(),v=>perform('setGroupPaymentAccess',{groupId:id,enabled:false,reason:v.reason},true),'关闭并收回');
    if(action==='dismissRecharge'){
      ui.dismissedTopups ||= {};
      (ui.dismissedTopups[ui.actor] ||= []).push(id);
      return render();
    }
    if(action==='allocate'||action==='allocateFromRecharge'){
      const receipt=action==='allocateFromRecharge'?s.fundEvents.find(e=>e.id===id&&e.type==='topup'):null;
      if(action==='allocateFromRecharge'&&!receipt)return;
      const activeGroups=s.groups.filter(g=>g.status==='ACTIVE');
      const suggested=activeGroups.length===1&&activeGroups[0].isDefault&&activeGroups[0].paymentEnabled?activeGroups[0].id:'';
      const target=receipt?field('目标组','<select name="groupId" required>'+options([{id:'',name:'请选择已开通支付的组'},...activeGroups.filter(g=>g.paymentEnabled)],suggested)+'</select>',true):'';
      const note=receipt?'到账 '+n(receipt.amount)+' CNY，仅用于预填参考。':'';
      return dialog(receipt?'分配到组':'分配组余额 · '+gname(id),notice('组织待分配余额 '+n(b.unallocated)+' CNY',note+'确认后仅新增一笔内部划拨，不改变组织总余额。')+'<div class="formgrid">'+target+amount('金额（CNY）',0.01,b.unallocated,receipt?Math.min(receipt.amount,b.unallocated):'')+reason()+'</div>',v=>perform('allocateFunds',{groupId:receipt?v.groupId:id,amount:Number(v.amount),reason:v.reason,relatedEventId:receipt?.id},true),'确认分配');
    }
    if(action==='returnFunds')return dialog('收回组余额 · '+gname(id),notice('本组可用 → 组织待分配','本次最多 '+n(g.fundBalance)+' CNY；逐笔记账，不改历史记录或已占用金额。')+'<div class="formgrid">'+amount('金额（CNY）',0.01,g.fundBalance)+reason()+'</div>',v=>perform('returnFunds',{groupId:id,amount:Number(v.amount),reason:v.reason},true),'确认收回');
    if(action==='rechargeFunds')return dialog('模拟线下到账',notice('仅演示财务已入账的结果','资金全部进入组织待分配余额，不发起真实充值，也不自动分配给组。')+amount('到账金额（CNY）',0.01),v=>{
      const result=perform('rechargeFunds',{amount:Number(v.amount)},true);
      if(result.ok)$('#recharge-notice')?.scrollIntoView({block:'nearest'});
    },'记录模拟到账');
    const paid=s.projects.filter(p=>p.module==='payment'&&p.status==='PAID'&&p.paymentAmount>(p.refundedAmount||0));
    const orderOptions=paid.map(p=>({id:p.id,name:p.id+' · '+(group(p.fundingGroupId)?.name||'原资金组')+' · 可退 '+n(p.paymentAmount-(p.refundedAmount||0))+' CNY'}));
    return dialog('模拟退款到账',notice('仅模拟已确认到账，不发起退款','原资金周期仍有效则回本组；已关闭、归档或重新开通则回组织待分配余额，仍保留原组记录。')+'<div class="formgrid">'+field('原支付单',select('projectId',options(orderOptions,paid[0]?.id)))+amount('到账金额（CNY）',0.01)+'</div>',v=>perform('refundPayment',{projectId:v.projectId,amount:Number(v.amount)},true),'记录模拟到账');
  }
  function quotaForm(uid,gid) {
    const g=group(gid),m=member(uid,gid);
    if(!g || !m)return toast('该账号没有当前组身份',false);
    if(!canSetMemberQuota(gid))return toast('仅获委派的本组组长可以设置个人额度；组织管理身份不能越级',false);
    quotaEditorForm(gid,uid);
  }
  function groupQuotaForm(gid) {
    const g=group(gid);
    if(!admin()||g?.status!=='ACTIVE')return toast('仅组织管理者可配置有效组上限',false);
    quotaEditorForm(gid);
  }
  const quotaFieldName=(scopeId,key)=>scopeId==='email'?key:scopeId+'_'+key;
  function quotaEditorForm(gid,uid) {
    const rows=E.quotaScopes.map(scope=>{
      const q=E.quota(s,gid,scope.id,uid),target=uid?q.member:q.group,parent=uid?q.group:q.organization;
      const parentRemaining=Math.max(0,Math.min(q.organization.quotaLimit-q.organization.used,uid?q.group.quotaLimit-q.group.used:Infinity));
      return '<section class="quota-row" aria-labelledby="quota-label-'+scope.id+'"><h3 id="quota-label-'+scope.id+'">'+scope.name+'<small>单位：'+scope.unit+'</small></h3><div class="quota-current"><span class="quota-cell-label">当前上限 / 已用</span><strong>'+ (target.quotaMode==='inherit'?'不追加上限':n(target.quotaLimit))+'</strong><small>已用 '+n(target.used)+' '+scope.unit+'</small></div><div class="quota-parent"><span class="quota-cell-label">'+(uid?'组':'组织')+'约束</span><strong>剩余 '+n(parentRemaining)+'</strong><small>上限 '+n(parent.quotaLimit)+' '+scope.unit+'</small></div><div class="quota-inputs"><label class="sr-only" for="quota-mode-'+scope.id+'">'+scope.name+'限制方式</label><select id="quota-mode-'+scope.id+'" name="'+quotaFieldName(scope.id,'mode')+'" data-quota-field><option value="capped" '+(target.quotaMode!=='inherit'?'selected':'')+'>设置'+(uid?'个人':'组')+'上限</option><option value="inherit" '+(target.quotaMode==='inherit'?'selected':'')+'>不追加'+(uid?'个人':'组')+'上限</option></select><label class="sr-only" for="quota-limit-'+scope.id+'">'+scope.name+'新上限（'+scope.unit+'）</label><input id="quota-limit-'+scope.id+'" name="'+quotaFieldName(scope.id,'limit')+'" value="'+target.quotaLimit+'" type="number" min="0" max="'+parent.quotaLimit+'" required data-quota-field></div><div class="quota-preview" '+(scope.id==='email'?'id="'+(uid?'member':'group')+'-quota-preview" ':'')+'data-quota-preview="'+scope.id+'" aria-live="polite"></div></section>';
    }).join('');
    dialog((uid?name(uid)+' · '+gname(gid)+' · 组内个人配额':gname(gid)+' · 组配额'),'<div class="quota-editor" data-quota-group="'+gid+'" '+(uid?'data-quota-uid="'+uid+'"':'')+'><p class="quota-context">各项独立设置，互不换算<span>示例周期：2026-10-01 ~ 10-31</span></p><div class="quota-matrix-head"><span>配额项</span><span>当前上限 / 已用</span><span>'+(uid?'组':'组织')+'约束</span><span>新上限</span><span>保存后可用</span></div>'+rows+'<p class="form-hint">三个配额为排列与流程示例；真实扣量、周期和 Scope 映射待核实。修改不返还已用、不重置周期。</p><div class="quota-secondary">'+(!uid?button('查看用量明细','groupQuotaPage',gid,'text'):'')+'<details class="quota-rules"><summary>规则与其他配额</summary><p>每项各自受组织 → 组 → 组内个人上限约束；不追加上限不是无限供应。同级普通额度可超配，实际使用逐层拦截。</p><p>组额度修改不自动代改个人配置。个人额度只影响当前组关系，须由获委派的本组组长设置；不存在跨组个人总上限。</p><p>搜索次数与搜索频率是不同示意类别；窗口、频率及套餐门禁不在这里分配。支付金额另走支付资金或本组成员支付上限，不与次数额度混用。</p></details></div></div>',v=>perform('setQuota',{groupId:gid,...(uid?{uid}:{}),items:E.quotaScopes.map(scope=>({scopeId:scope.id,mode:v[quotaFieldName(scope.id,'mode')],limit:Number(v[quotaFieldName(scope.id,'limit')]||0)}))},true),uid?'保存组内个人配额':'保存组上限');
    $('#dialog').classList.add('quota-dialog');
    updateGroupQuotaPreview();
  }
  function updateGroupQuotaPreview() {
    const editor=$('.quota-editor'),form=$('#dialog-form');if(!editor||!form)return;
    const gid=editor.dataset.quotaGroup,uid=editor.dataset.quotaUid;
    E.quotaScopes.forEach(scope=>{
      const box=editor.querySelector('[data-quota-preview="'+scope.id+'"]'),q=E.quota(s,gid,scope.id,uid),target=uid?q.member:q.group,parent=uid?q.group:q.organization;
      const mode=form.elements.namedItem(quotaFieldName(scope.id,'mode')).value,input=form.elements.namedItem(quotaFieldName(scope.id,'limit'));
      input.disabled=mode==='inherit';
      const limit=mode==='inherit'?Infinity:Number(input.value);
      const unchanged=target.quotaMode==='capped'&&limit===target.quotaLimit;
      input.max=Math.max(parent.quotaLimit,target.quotaMode==='capped'?target.quotaLimit:0);
      const invalid=mode!=='inherit'&&(!Number.isFinite(limit)||limit<0||!unchanged&&limit>parent.quotaLimit);
      input.setCustomValidity(invalid?'新上限不能超过父级上限':'');
      if(invalid){box.innerHTML='<p class="quota-warning">须在 0 ~ '+n(parent.quotaLimit)+' 之间</p>';return;}
      const remaining=Math.max(0,Math.min(q.organization.quotaLimit-q.organization.used,uid?q.group.quotaLimit-q.group.used:Infinity,limit-target.used));
      const confirmed=box.dataset.limit===String(limit)&&box.querySelector('input[type=checkbox]')?.checked;
      const above=uid?0:s.users.filter(u=>active(u.id,gid)).map(u=>E.quota(s,gid,scope.id,u.id).member).filter(m=>m.quotaMode==='capped'&&m.quotaLimit>limit).length;
      box.innerHTML='<span class="quota-cell-label">保存后实际可用</span><strong>'+n(remaining)+' '+scope.unit+'</strong>'+(limit<=target.used?'<p class="quota-warning">'+(limit<target.used?'低于':'等于')+'已用，禁止继续消耗</p>':'')+(above?'<p class="quota-impact">'+above+' 人上限保留，受新组上限约束</p>':'')+(limit<target.used?'<label class="inline-check"><input type="checkbox" name="'+quotaFieldName(scope.id,'confirmImpact')+'" required>确认可用量归零</label>':'');
      box.dataset.limit=String(limit);
      if(unchanged&&limit>parent.quotaLimit)box.insertAdjacentHTML('beforeend','<p class="quota-impact">原配置保留；实际使用仍受父级限制，修改须降至父级上限内。</p>');
      if(confirmed&&box.querySelector('input[type=checkbox]'))box.querySelector('input[type=checkbox]').checked=true;
    });
  }
  function membershipsDialog(uid,gid) {
    const u=user(uid);if(!u)return;
    const rows=u.memberships.filter(m=>m.status!=='REMOVED').map(m=>'<tr><td>'+gname(m.groupId)+'</td><td>'+tag(m.role)+'</td><td>'+tag(statusNames[m.status],m.status==='ACTIVE'?'green':'orange')+'</td><td><div class="actions">'+button(m.role==='T2'?'设为 T3':'设为 T2','setRole',uid+'|'+m.groupId+'|'+(m.role==='T2'?'T3':'T2'),'text',!admin()||m.status!=='ACTIVE')+button('移出该组','removeMembership',uid+'|'+m.groupId,'text',!canRemoveMembers()||m.status!=='ACTIVE','Owner 可操作；Admin 需由 Owner 开启“Admin 可移除成员”')+'</div></td></tr>');
    dialog(name(uid)+' · 组关系',notice('每条组关系独立','多组身份不会复制组织身份；改为 T2 可能因组织策略动态获得项目协作权限。')+table(['业务组','身份','状态','操作'],rows)+'<hr><div class="formgrid">'+field('加入目标组',select('groupId',options(s.groups.filter(g=>g.status==='ACTIVE'&&!member(uid,g.id)),gid)))+field('组内身份',select('role','<option value="T3">T3 · 组成员</option><option value="T2">T2 · 组长</option>'))+'</div><p class="form-hint">新增组关系默认不追加个人上限。加入目标组时，原被禁用且未删除的 ACL 将恢复。</p>',admin()?v=>perform('addMembership',{uid,groupId:v.groupId,role:v.role},true):null,'加入业务组');
  }
  function batchQuotaForm(gid) {
    const scope=selectedQuotaScope();
    dialog('批量增加 · '+scope.name,notice('整批校验后执行','仅增加本项选中的 capped 成员；跳过 inherit，其他配额不变。任一项超过组上限则整批不执行。')+s.users.filter(u=>active(u.id,gid)).map(u=>{const m=E.quota(s,gid,scope.id,u.id).member;return '<label class="inline-check"><input type="checkbox" name="uids" value="'+u.id+'" checked>'+name(u.id)+' · '+(m.quotaMode==='inherit'?'inherit 将跳过':'上限 '+n(m.quotaLimit))+'</label>';}).join('')+field('每人增加（'+scope.unit+'）',inp('amount',100,'number','min="1" required'),true)+'<div id="batch-preview" data-group="'+gid+'" data-scope="'+scope.id+'" class="audit-box">修改增量或成员，预览增加后的值；共享额度成员将跳过。</div>',v=>perform('batchIncreaseQuota',{groupId:gid,scopeId:scope.id,amount:Number(v.amount),uids:new FormData($('#dialog-form')).getAll('uids')},true),'批量增加');
  }
  function organizationExitForm(uid) {
    if(!canRemoveMembers())return toast('仅 Owner 或获 Owner 授权的 Admin 可移除成员',false);
    const u=user(uid);if(!u||!admin())return toast('需要组织管理权限',false);
    if(!['ACTIVE','REMOVING'].includes(u.status))return toast('该账号的组织关系已结束，不能重新安排接替',false);
    const h=s.handoffs.find(h=>h.uid===uid&&h.status!=='COMPLETED'),inv=s.invites.find(i=>i.id===h?.inviteId);
    dialog((u.status==='REMOVING'?'安排清退接收人 · ':'移出组织 · ')+name(uid),notice('清退立即失权且不可撤销','Owner 或获授权 Admin 的提交就是接替指令。现有账号提交后自动移交，新账号接受组织邀请后自动移交；不另设接替确认、组长审批或接收人审批。','warning')+field('移交安排',select('handoffMode',['later','existing','invite'].map((mode,i)=>'<option value="'+mode+'" '+((h?.mode||'later')===mode?'selected':'')+'>'+['清退后由各组长处理','指定现有账号增量接替','邀请新账号完整接替'][i]+'</option>').join('')),true)+'<div id="handoff-existing" class="formgrid">'+field('组织内现有接收人',select('targetId','<option value="">请选择接收人</option>'+options(s.users.filter(x=>x.status==='ACTIVE'&&x.id!==uid),h?.targetId||'')),true)+'</div><div id="handoff-invite" class="formgrid">'+field('新同事邮箱',inp('email',inv?.email||'','email','placeholder="new@example.com"'))+field('姓名',inp('name',inv?.name||'','text','placeholder="可选"'))+'</div><div id="handoff-memberships" data-uid="'+uid+'"></div><p class="form-hint">整体接替覆盖示例对象的 Owner、CRM Assignee 与有效显式协作，不给操作者日常业务明细或逐项改派权。不继承组长、组织身份或个人配额；历史创建者、用量和既有资金承担不变。真实模块覆盖、分页和重试另验。</p>',v=>{const r=perform('startOrganizationExit',{uid,mode:v.handoffMode,targetId:v.targetId,email:v.email,name:v.name},true);if(r.ok)navigate('tasks');},'提交清退安排');
    updateHandoffPreview();
  }
  function removeMemberForm(uid,gid) {
    if(!canRemoveMembers())return toast('仅 Owner 或获 Owner 授权的 Admin 可发起本组移除',false);
    const otherGroups=user(uid).memberships.filter(m=>m.groupId!==gid&&m.status==='ACTIVE');
    dialog('将 '+name(uid)+' 移出 '+gname(gid),notice('组织管理者移出单个组','仅影响 '+gname(gid)+' 的组关系，不是移出组织；组织成员身份和其他组关系不变。','warning')+'<dl class="definition"><dt>操作者身份</dt><dd>组织 Owner/Admin</dd><dt>目标成员</dt><dd>'+name(uid)+'</dd><dt>来源组</dt><dd>'+gname(gid)+'</dd><dt>后续处理</dt><dd>进入 REMOVING 立即失去本组业务资格；数据暂不移动。本组组长安排业务交接，系统随后结束关系。完成前仅组织管理者可撤销。</dd></dl>'+(!otherGroups.length?notice('这是该账号最后一个有效组','可以先进入待移交，但最终移出前须安排另一有效组，或改走组织清退。','warning'):'')+notice('这里不指定业务接收人','本组组长稍后处理业务；无组长且有业务交接项时等待任命业务负责人，无业务项时组织管理者可直接确认结束。'),()=>{const r=perform('removeMembership',{uid,groupId:gid},true);if(r.ok)navigate('tasks');},'确认移出本组');
  }
  function updateHandoffPreview() {
    const box=$('#handoff-memberships'),form=$('#dialog-form');if(!box||!form)return;
    const u=user(box.dataset.uid),mode=form.elements.namedItem('handoffMode').value,targetId=form.elements.namedItem('targetId').value;
    for(const [id,enabled] of [['handoff-existing',mode==='existing'],['handoff-invite',mode==='invite']]){const area=$('#'+id);area.hidden=!enabled;area.querySelectorAll('input,select').forEach(el=>{el.disabled=!enabled;el.required=enabled&&el.name!=='name';});}
    const ms=u.memberships.filter(m=>['ACTIVE','REMOVING'].includes(m.status));
    const missing=ms.filter(m=>mode==='invite'||mode==='existing'&&targetId&&!active(targetId,m.groupId));
    const rows=ms.map(m=>{const old=mode==='existing'&&targetId?member(targetId,m.groupId):null,needs=missing.includes(m);return '<tr><td>'+gname(m.groupId)+'</td><td>'+s.projects.filter(p=>p.groupId===m.groupId&&(p.ownerId===u.id||p.assigneeId===u.id||p.collaborators.some(c=>c.uid===u.id&&!c.disabled))).length+' 个关联对象</td><td>'+(mode==='later'?'由本组组长安排':old?tag(statusNames[old.status]+' · '+(old.role==='T2'?'组长':'组员'))+'<small>'+(old.status==='ACTIVE'?'已有逐项上限、用量及占用保留':'未完结组关系不能自动恢复')+'</small>':needs?tag('新增组员关系')+'<small>普通可分配项 inherit；个人支付不追加上限</small>':'请选择接收人')+'</td></tr>';});
    box.innerHTML=table(['受影响组','移交范围','接收身份 / 配额'],rows)+(mode!=='later'?notice('配额不继承、不相加','已有关系沿用接收人自己的逐项配置及用量占用；新增关系默认不追加个人上限，仍受组织和组约束，可能比离职者原 capped 更宽。需要个人限制时由获委派组长另行配置。离职者失去使用资格，不返还历史消费或释放支付占用。','warning'):'')+(mode==='invite'?notice('等待接受一次组织邀请','任务显示 WAITING_FOR_TARGET；组织清退释放的一个席位为接替邀请保留。接受邀请是组织准入，不是移交审批；接受后系统自动处理示例对象。'):'')+(ms.some(m=>m.role==='T2'&&!s.users.some(x=>x.id!==u.id&&active(x.id,m.groupId)&&member(x.id,m.groupId)?.role==='T2'))?notice('原成员是部分组最后一名组长',mode==='later'?'分组处理存在人工业务时，组织管理者须另行任命真实业务负责人；未任命前任务等待。':'整体接替不要求组长审批，也不自动任命新组长。后续需要组长管理业务或个人额度时再按既有流程任命。','warning'):'');
    const submit=form.querySelector('button[type=submit]');if(submit)submit.textContent=mode==='existing'?'提交清退并自动接替':mode==='invite'?'提交清退并发送邀请':'提交清退安排';
  }
  function handoffSummary(h) {
    const completed=h.status==='COMPLETED';
    const rows=h.groupIds.map(gid=>{
      const task=s.tasks.find(t=>h.taskIds.includes(t.id)&&t.groupId===gid),summary=task?.summary;
      const result=summary?'负责人 '+n(summary.owner)+' / CRM 对接 '+n(summary.assignee)+' / 协作 '+n(summary.collaborator)+'<small>合并 '+n(summary.merged)+'；跳过失效授权 '+n(summary.disabledSkipped)+'</small>':completed?'已完成示例交接':'等待接收后自动处理';
      return '<tr><td>'+gname(gid)+'</td><td>'+n(task?.objectCount)+'</td><td>'+result+'</td><td>'+(h.targetId?tag(member(h.targetId,gid)?.role==='T2'?'保留已有组长身份':'组员'):'接受后建立组员关系')+'</td></tr>';
    });
    return notice(completed?'示例整体接替已完成':'等待接收后自动整体接替',completed?'系统按有权操作者已提交的清退安排执行，无额外移交确认。此处只有数量与结果摘要，不开放原业务内容。':'受邀人仍需接受组织邀请，接受后自动移交；不需要组长或接收人另行审批。')+
      '<p>'+name(h.uid)+' → '+(h.targetId?name(h.targetId):'等待新同事接受邀请')+'</p>'+table(['业务组','原关联对象','处理摘要','接收人身份'],rows)+
      notice('配额与历史不转让','已有组关系保留接收人的逐项上限、用量和占用，新关系 inherit／支付个人不追加上限。离职者仅失去继续使用资格，不返还消耗、释放已有支付占用或改写历史承担。')+
      '<p class="form-hint">仅覆盖本地示例对象；真实全模块接入、分页重试和账务字段映射仍需 Spec/研发验收。</p>';
  }
  function collectionModeDialog(pid) {
    const p=E.project(s,pid),r=E.access(s,ui.actor,pid);
    if(!p||p.module!=='resource'||p.ownerId!==ui.actor||!r.read)return toast('仅收藏夹负责人可以修改共享范围与说明',false);
    dialog('共享范围与说明 · '+esc(p.name),
      notice('日常整夹治理仅限负责人','协作者和组长只能维护夹内内容，不能修改名称、说明、共享范围或指定名单，也不能主动转交或删除整个收藏夹。退组/清退任务中的交接另循既定流程。')+
      field('共享范围','<select name="mode" data-collection-mode>'+options(collectionModes,p.sharingMode||'private')+'</select>',true)+
      '<p class="form-hint">私有：不向普通组员共享；本组公开：本组所有有效成员动态取得内容读写；指定成员：仅向本组指定的有效成员共享。</p>'+
      notice('私有不屏蔽组织策略','组长默认协作是组织全局策略，默认关闭。开启后同组有效组长在三种模式下均有内容读写；不能在单夹取消，也不写入显式名单。','warning')+
      field('说明','<textarea name="description" rows="3" maxlength="500" placeholder="收藏夹说明（可选）">'+esc(p.description||'')+'</textarea>',true)+
      '<div id="collection-clear-warning" hidden data-project="'+esc(pid)+'">'+notice('本地示意：切换后清空指定名单','离开指定成员模式时，现有 '+p.collaborators.length+' 条显式协作记录（含已禁用条目）会被删除；以后改回指定成员也不会自动恢复名单。组长隐式来源不受影响；具体保存与名单清理交互留 Spec/研发核对。','warning')+
      '<label class="inline-check"><input type="checkbox" name="confirmClear" disabled>确认清空全部显式协作记录（含已禁用条目）</label></div>',
      v=>perform('setCollectionMode',{projectId:pid,mode:v.mode,description:v.description,confirmClear:v.confirmClear==='on'},true),'保存共享范围与说明');
    updateCollectionModeWarning();
  }
  function updateCollectionModeWarning() {
    const box=$('#collection-clear-warning'),mode=$('#dialog select[data-collection-mode]')?.value;
    if(!box)return;
    const p=E.project(s,box.dataset.project),clear=p?.sharingMode==='selected'&&mode!=='selected'&&p.collaborators.length>0;
    box.hidden=!clear;
    const checkbox=box.querySelector('input[name=confirmClear]');
    checkbox.disabled=!clear;checkbox.required=clear;
    if(!clear)checkbox.checked=false;
  }
  function collectionCollaboratorsDialog(p,r) {
    if(!r.read)return toast('没有查看收藏夹权限',false);
    const owner=p.ownerId===ui.actor,selected=p.sharingMode==='selected';
    const choices=selected?s.users.filter(u=>active(u.id,p.groupId)&&u.id!==p.ownerId&&!p.collaborators.some(c=>c.uid===u.id)):[];
    const rows=collaboratorEntries(p).map(({uid,explicit,implicit,groupSource})=>'<tr data-collaborator-uid="'+esc(uid)+'"><td>'+name(uid)+'</td><td>'+collaboratorSources(uid,explicit,implicit,groupSource)+'</td><td>'+(E.access(s,uid,p.id).write?'内容读写':'暂不生效')+'</td>'+(owner?'<td>'+(selected&&explicit?button('移除显式协作','removeCollaborator',p.id+'|'+uid,'text'):'来源不可逐项取消')+'</td>':'')+'</tr>');
    const body=notice('当前范围：'+esc(collectionModes.find(mode=>mode.id===p.sharingMode)?.name||'私有'),'负责人：'+name(p.ownerId)+'。负责人不列为协作者；其他来源只提供内容读写，不包含整夹治理或转授能力。')+
      (rows.length?table(owner?['成员','协作来源','内容权限','操作']:['成员','协作来源','内容权限'],rows):'<p class="form-hint">暂无其他协作者。</p>')+
      (p.sharingMode==='group'?notice('本组公开按身份动态生效','公开来源不为每人写入显式 ACL，离组即失效，不能逐个取消成员。需要缩小名单时，由负责人改成指定成员模式。'):'')+
      notice('组长策略独立生效','组织全局开关默认关闭；开启后同组有效组长即使在私有夹也有内容读写。锁定的组长来源不能在此取消；关闭组织策略只撤销该来源，不清除独立显式名单。')+
      (owner&&selected?(choices.length?'<div class="formgrid">'+field('搜索同组候选人',inp('collaboratorQuery','','search','data-collab-search placeholder="昵称或邮箱"'),true)+field('添加指定成员',select('uid',options(choices,'',u=>u.name+' · '+u.email)),true)+'</div>':'<p class="form-hint">暂无可添加的本组有效成员。</p>'):'')+
      (!owner?'<p class="form-hint">当前仅查看协作范围。共享范围、指定名单与整夹治理仅由负责人维护。</p>':'');
    dialog('协作范围 · '+esc(p.name),body,owner&&selected&&choices.length?v=>perform('addCollaborator',{projectId:p.id,uid:v.uid},true):null,'添加指定成员');
  }
  function monitorCollaboratorsDialog(p,r) {
    if(!r.read)return toast('没有查看监控项目的权限',false);
    const owner=p.ownerId===ui.actor,choices=s.users.filter(u=>active(u.id,p.groupId)&&u.id!==p.ownerId&&!p.collaborators.some(c=>c.uid===u.id));
    const rows=collaboratorEntries(p).map(({uid,explicit,implicit})=>'<tr data-collaborator-uid="'+esc(uid)+'"><td>'+name(uid)+'</td><td>'+collaboratorSources(uid,explicit,implicit,false)+'</td><td>'+(E.access(s,uid,p.id).write?'内容读写':'暂不生效')+'</td>'+(owner?'<td>'+(explicit?button('移除显式协作','removeCollaborator',p.id+'|'+uid,'text'):'来源由全局策略控制')+'</td>':'')+'</tr>');
    const body=notice('监控名单仅项目负责人维护','项目负责人：'+name(p.ownerId)+'。监控不提供管理协作者的委派能力；普通协作者和隐式组长可维护内容，但不能增减名单、修改项目设置或转授治理。')+
      (rows.length?table(owner?['成员','来源','内容权限','操作']:['成员','来源','内容权限'],rows):'<p class="form-hint">暂无其他协作者。</p>')+
      notice('组长来源独立','全局开关默认关闭；开启后同组有效组长得到普通内容读写，以锁定勾选显示，不写显式ACL。关闭只撤销该来源，独立显式名单保留。')+
      (owner&&choices.length?'<div class="formgrid">'+field('搜索同组候选人',inp('collaboratorQuery','','search','data-collab-search placeholder="昵称或邮箱"'),true)+field('添加同组协作者',select('uid',options(choices,'',u=>u.name+' · '+u.email)),true)+'</div>':!owner?'<p class="form-hint">当前仅查看协作范围，没有变更表单。</p>':'<p class="form-hint">暂无可添加的本组有效成员。</p>');
    dialog('协作范围 · '+esc(p.name),body,owner&&choices.length?v=>perform('addCollaborator',{projectId:p.id,uid:v.uid},true):null,'添加协作者');
  }
  function collaboratorsDialog(pid) {
    const p=E.project(s,pid),r=E.access(s,ui.actor,pid);
    if(p?.module==='crm')return toast('CRM 记录不设置协作者；写权限沿用四项配置并受记录组隔离',false);
    if(p?.module==='resource')return collectionCollaboratorsDialog(p,r);
    if(p?.module==='monitor')return monitorCollaboratorsDialog(p,r);
    if(!p || !r.manage)return toast('没有管理协作者权限',false);
    const choices=s.users.filter(u=>active(u.id,p.groupId)&&u.id!==p.ownerId&&u.id!==p.assigneeId&&!p.collaborators.some(c=>c.uid===u.id));
    const canGrantManage=p.module==='email'?r.manage:r.grant;
    const body=notice('授权绑定当前'+(p.module==='payment'?'支付单或草稿':'项目'),'常规读写一体授予，不提供只读协作者。附加能力按模块规则；组长隐式来源锁定展示，不能在此取消。关闭组织策略或组长身份失效只撤销隐式来源，显式协作仍保留。')+
      (p.module==='email'?notice('邮件名单管理沿用线上，可继续授予','Owner 与已获名单管理权的正式协作者均可增减名单，并授予 / 收回其他正式协作者的管理能力；这不是支付执行等附加能力的通用转授规则。改名和整项目删除仍仅 Owner，邮件无日常负责人转交。'):notice('支付附加能力不传递','普通名单管理权不包含授予 / 收回管理能力或支付执行能力；仍由支付单 Owner 授予。'))+
      table(['成员','协作来源','管理协作者','执行支付','操作'],collaboratorEntries(p).map(({uid,explicit:c,implicit})=>'<tr data-collaborator-uid="'+esc(uid)+'"><td>'+name(uid)+'</td><td>'+collaboratorSources(uid,c,implicit)+'</td><td>'+(c?'<label class="inline-check"><input type="checkbox" data-capability="canManage" data-project="'+pid+'" data-uid="'+uid+'" '+(c.canManage?'checked ':'')+(!canGrantManage||c.disabled?'disabled ':'')+'aria-label="'+name(uid)+' 管理协作者">授权</label>':'未单独授予')+'</td><td>'+(p.module==='payment'?(c?'<label class="inline-check"><input type="checkbox" data-capability="canExecute" data-project="'+pid+'" data-uid="'+uid+'" '+(c.canExecute?'checked ':'')+(!r.grant||c.disabled?'disabled ':'')+'aria-label="'+name(uid)+' 执行支付">授权</label>':'未单独授予'):'—')+'</td><td>'+(c?button('移除显式协作','removeCollaborator',pid+'|'+uid,'text'):'由组织策略控制')+'</td></tr>'))+
      (s.policies.t2Collaborator?notice('隐式与显式来源可同时存在','需要单独授予附加能力时，可把组长另加为显式协作者；移除显式协作不会取消仍有效的组长来源。'):'')+
      '<div class="formgrid">'+field('搜索同组候选人',inp('collaboratorQuery','','search','data-collab-search placeholder="昵称或邮箱"'),true)+field('添加同组协作者',select('uid',options(choices,'',u=>u.name+' · '+u.email)),true)+'</div><p class="form-hint">只有对象所属组的 ACTIVE 账号可选。没有候选人时，可先让其加入该组。</p>';
    dialog('管理协作者 · '+esc(p.name),body,choices.length?v=>perform('addCollaborator',{projectId:pid,uid:v.uid},true):null,'添加协作者');
  }
  function decisionDialog(id) {
    const d=D.decisions.find(x=>x.id===id);if(!d)return;
    const confirmed=d.status==='已确认';
    dialog(tag(id,confirmed?'green':'orange')+' '+esc(d.title),'<div class="audit-box"><h3>原规则 / 当前基线</h3><p>'+esc(d.baseline)+'</p><h3>'+(confirmed?'本版已确认':d.reviewStage==='spec'?'留待 Spec/研发评审':'待产品确认')+'</h3><p>'+esc(d.proposal)+'</p><h3>影响与保护边界</h3><p>'+esc(d.impact)+'</p></div><div class="formgrid">'+field('本次审阅意见','<textarea name="note" rows="4" placeholder="记录倾向、问题或约束">'+esc(ui.notes[id] || '')+'</textarea>',true)+'</div><p class="form-hint">只记录意见；不更改 Input 或将待定规则批准为产品方案。</p>',v=>{ui.notes[id]=v.note;$('#dialog').close();toast('已记录本次会话意见，可从审阅页导出');},'记录意见');
  }
  function actClick(action,id) {
    const [uid,gid,role]=(id || '').split('|');
    if(action==='close')return $('#dialog').close();
    if(action==='closeStory'){ui.storyId=null;return render();}
    if(action==='groupQuotaPage'){
      if(!admin()||group(id)?.status!=='ACTIVE')return toast('需要组织管理权限和有效业务组',false);
      ui.managedGroup=id;ui.orgGroupTab='quota';$('#dialog').close();return navigate('groups');
    }
    if(action==='manageGroup'){if(!admin())return toast('需要组织管理权限',false);ui.managedGroup=id;ui.orgGroupTab='members';return navigate('groups');}
    if(action==='groupList'){ui.managedGroup=null;ui.orgGroupTab='members';return render();}
    if(action==='teamTasks'){ui.teamTab='tasks';return navigate('team');}
    if(action==='review')return navigate('review');
    if(action==='objects'){ui.tab='objects';return render();}
    if(action==='reset')return dialog('重置全部模拟数据',notice('本次操作和审阅意见将清空','可先从功能审阅页导出意见；重置不会影响任何真实系统。','warning'),()=>{s=E.createState();Object.assign(ui,{actor:'u-owner',group:'g-growth',project:null,tab:'objects',conversationFilter:'chat',conversationId:null,reviews:{},notes:{},lastResult:null,probe:null,quotaGroup:null,dashboardUser:'all',dashboardGroup:'all',period:'2026-10',metric:'sent',usageHealth:'normal',reviewFilter:'all',showArchived:false,labelScopes:{},contactScope:'team',dismissedTopups:{},fundLedgerScope:'all'});$('#dialog').close();render();toast('模拟数据已重置');},'重置');
    if(action==='selectConversation'){ui.conversationId=id;return render();}
    if(action==='conversationAssignments')return conversationAssignmentsDialog(id);
    if(action==='clearConversationAssignments')return confirmAction('移除全部转交跟进人',notice('恢复未来 Owner 提醒','不改变邮件项目 Owner 或协作名单，不回补历史未读；原转交人若无其他有效来源，将失去本会话访问。'),'setConversationAssignments',{conversationId:id,uids:[]},'确认移除全部');
    if(action==='conversationReply')return conversationReplyDialog(id);
    if(action==='simulateConversationIncoming')return perform(action,{conversationId:id});
    if(action==='decision')return decisionDialog(id);
    if(action==='topic'){const t=D.topics.find(x=>x.id===id);return dialog(esc(t?.title || '记录意见'),'<textarea name="note" rows="4" aria-label="审阅意见">'+esc(ui.notes[id] || '')+'</textarea>',v=>{ui.notes[id]=v.note;$('#dialog').close();toast('意见已记录');},'记录意见');}
    if(action==='exportReview')return download('账号权限-审阅意见.json',JSON.stringify({type:'standalone-input-review',source:'phase2_input_v0.md',createdAt:new Date().toISOString(),reviews:ui.reviews,notes:ui.notes,pendingDecisions:D.decisions.filter(d=>d.status!=='已确认'),confirmedDecisions:D.decisions.filter(d=>d.status==='已确认'),engineeringQuestions:D.engineeringQuestions,collectionReferenceFacts:D.collectionReferenceFacts,collectionEngineeringQuestions:D.collectionEngineeringQuestions,monitorQuotaPaths:D.monitorQuotaPaths,monitorEngineeringQuestions:D.monitorEngineeringQuestions,simulationAudit:s.audit},null,2));
    if(action==='exportUsage')return download('使用情况-模拟数据.csv','\ufeff账号,业务组,统计月,邮件发送,邮件打开,回复,合作完成,寄样,新建监控\n'+usageRows().map(r=>[user(r.uid)?.name,group(r.groupId)?.name,ui.period,r.sent,r.opened,r.replied,r.cooperate,r.samples,r.monitor].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv;charset=utf-8');
    if(action==='invite')return dialog('邀请组织成员',notice('仅组织 Owner/Admin 邀请','可选择首个业务组，默认选择始终保留的默认组。新增关系默认 inherit、个人支付上限默认不追加；后续由获委派的组长在本组逐项配置。')+'<div class="formgrid">'+field('成员昵称',inp('name','','text','required placeholder="例如：陆遥"'))+field('邀请邮箱',inp('email','','email','required placeholder="lu@example.com"'))+field('目标业务组',select('groupId',options(s.groups.filter(g=>g.status==='ACTIVE'),s.groups.find(g=>g.isDefault&&g.status==='ACTIVE')?.id)))+field('初始组身份',inp('fixedRole','T3 · 组成员','text','disabled'))+'</div><p class="form-hint">待接受邀请计入席位；不能修改目标组或身份，如需调整请撤销重邀。接受时再次检查组和席位，不发送真实邮件。</p>',v=>perform('invite',v,true),'发送模拟邀请');
    if(action==='acceptInvite'||action==='cancelInvite')return perform(action,{inviteId:id});
    if(action==='addGroup')return dialog('创建业务组',field('组名称',inp('name','','text','required maxlength="30"'),true)+notice('允许先建空组','无需提前指定组长；成员及 T2 可在建组后分配。'),v=>perform('addGroup',v,true),'创建空组');
    if(action==='renameGroup')return dialog('业务组改名',field('组名称',inp('name',group(id).name,'text','required maxlength="30"'),true),v=>perform('renameGroup',{groupId:id,name:v.name},true));
    if(action==='groupMembers')return dialog('添加组织成员至 '+gname(id),'<div class="formgrid">'+field('组织内已有成员',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'&&!member(u.id,id)),'')))+field('组内身份',select('role','<option value="T3">组员</option><option value="T2">组长</option>'))+'</div>'+notice('仅建立此组关系','不改变组织身份或其他组关系；新关系个人额度默认不追加上限，由获委派的组长后续设置。'),v=>perform('addMembership',{groupId:id,...v},true),'加入该组');
    if(action==='membership')return membershipsDialog(uid);
    if(action==='setRole'){const r=perform('setRole',{uid,groupId:gid,role});if(r.ok)membershipsDialog(uid);return;}
    if(action==='memberQuota')return quotaForm(uid,gid || ui.quotaGroup || (member(uid,ui.group)?ui.group:user(uid)?.memberships.find(m=>m.status==='ACTIVE')?.groupId));
    if(action==='orgRole')return dialog('组织身份 · '+name(id),notice('管理身份不改变业务身份','Admin 全组织管理，不配置管理组范围。任免不会改变 T2/T3、项目 Owner 或显式 ACL；移除成员和归档组分别受 Owner 专属开关控制。')+field('组织身份',select('orgRole','<option value="member" '+(user(id).orgRole==='member'?'selected':'')+'>普通成员</option><option value="admin" '+(user(id).orgRole==='admin'?'selected':'')+'>组织 Admin</option>'),true),v=>perform('setOrgRole',{uid:id,...v},true));
    if(action==='transferOrgOwner')return dialog('转让组织所有权',notice('唯一组织 Owner 发生变更','当前 Owner 变为 Admin；双方组关系和业务对象身份不变。','warning')+field('新组织 Owner',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'&&u.id!==ui.actor),'')),true),v=>perform('transferOrgOwner',v,true),'确认转让');
    if(action==='archiveGroup'){
      if(!E.canArchiveGroup(s,ui.actor,id))return toast(group(id)?.isDefault?'默认组始终保留，不能归档':'仅 Owner 或获 Owner 授权的 Admin 可归档组',false);
      return dialog('冻结归档 '+gname(id),notice('第 1 步：核对影响','组内 '+s.projects.filter(p=>p.groupId===id).length+' 个对象与历史成员关系保留；成员仍可按原权限查看历史，不能继续普通业务。组可用资金 '+n(group(id)?.fundBalance)+' CNY 将收回，原占用不取消，原组账目继续保留。本 Demo 不提供归档业务对象查看入口。','warning'),()=>dialog('最终确认归档 '+gname(id),notice('第 2 步：此操作不可自行撤销','不提供解除归档入口。特殊数据恢复只能线下转人工处理，不保证恢复为原状态。','warning')+'<label class="inline-check"><input type="checkbox" name="confirmIrreversible" required>我已了解归档影响，确认不可自行撤销</label>',v=>perform('archiveGroup',{groupId:id,confirmIrreversible:v.confirmIrreversible==='on'},true),'不可撤销地归档'),'继续归档');
    }
    if(action==='groupQuota')return groupQuotaForm(id);
    if(action==='batchQuota')return batchQuotaForm(id);
    if(action==='mailQuotaRules')return mailQuotaDialog();
    if(action==='monitorRules')return monitorRulesDialog(id?E.project(s,id):null);
    if(action==='monitorQuestions'){if($('#dialog').open)$('#dialog').close();navigate('review');$('#monitor-engineering-questions').scrollIntoView({block:'start'});return;}
    if(action==='monitorSettings'){
      const p=E.project(s,id),r=E.access(s,ui.actor,id);
      if(!p||p.module!=='monitor'||!r.manage)return toast('只有项目负责人可修改监控项目说明',false);
      return dialog('监控项目说明',notice('日常项目治理仅负责人','名称、说明、协作名单和项目归档/恢复等治理不包含在普通内容写权限中；监控不提供管理协作者委派。')+
        field('说明','<textarea name="description" rows="4" maxlength="500">'+esc(p.description||'')+'</textarea>',true),
        v=>perform('setMonitorProjectSettings',{projectId:id,description:v.description},true),'保存项目说明');
    }
    if(action==='editMonitorItem'){
      const p=E.project(s,uid),item=p?.items?.find(x=>x.id===gid);
      if(!p||p.module!=='monitor'||!item||!E.access(s,ui.actor,p.id).write)return toast('需要当前监控内容的有效写权限',false);
      const choices=s.users.filter(u=>active(u.id,p.groupId));
      return dialog('编辑监控内容 · '+esc(item.name),notice('内容负责人不是项目负责人','这里只改虚构备注和内容负责人，不改变项目Owner、项目组或24核算主体；不修改系统指标、时长或配额。')+
        field('内容负责人',select('responsibleUid',options(choices,item.responsibleUid,u=>u.name+' · '+u.email)),true)+
        field('备注','<textarea name="note" rows="4" maxlength="500">'+esc(item.note||'')+'</textarea>',true)+
        '<div class="actions">'+button('时长、追踪与删除流程','monitorRules',p.id,'')+'</div>',
        v=>perform('editMonitorItem',{projectId:p.id,itemId:item.id,note:v.note,responsibleUid:v.responsibleUid},true),'保存内容设置');
    }
    if(action==='mailQuestions'){$('#dialog').close();navigate('review');$('#mail-engineering-questions').scrollIntoView({block:'start'});return;}
    if(action==='collectionFacts')return collectionFactsDialog();
    if(action==='collectionQuestions'){if($('#dialog').open)$('#dialog').close();navigate('review');$('#collection-engineering-questions').scrollIntoView({block:'start'});return;}
    if(action==='collectionMode')return collectionModeDialog(id);
    if(action==='addCollectionItem'){
      const p=E.project(s,id);
      if(!p||p.module!=='resource'||!E.access(s,ui.actor,id).write)return toast('没有收藏夹内容写权限',false);
      return dialog('添加样例达人',notice('仅加入当前收藏夹','本操作仅记录虚构的夹内条目，不访问真实创作者、不导入数据、不解锁联系方式或消耗真实配额。')+
        '<div class="formgrid">'+field('达人名称',inp('name','','text','required maxlength="100" placeholder="例如：Leah Park"'))+
        field('平台',select('platform',options(['YouTube','TikTok','Instagram','X'].map(value=>({id:value,name:value})),'YouTube')))+
        field('收藏备注','<textarea name="note" rows="3" maxlength="500" placeholder="此收藏夹中的备注（可选）"></textarea>',true)+'</div>',
        v=>perform('addCollectionItem',{projectId:id,...v},true),'加入收藏夹');
    }
    if(action==='editCollectionItem'||action==='removeCollectionItem'){
      const p=E.project(s,uid),item=p?.items?.find(x=>x.id===gid);
      if(!p||p.module!=='resource'||!item||!E.access(s,ui.actor,p.id).write)return toast('没有该收藏条目的有效写权限',false);
      if(action==='removeCollectionItem')return confirmAction('移除 '+esc(item.name),notice('仅移除当前夹内条目','不影响其他收藏夹，不删除平台真实档案，也不返还已经产生的邮箱或 WhatsApp 解锁次数。'),'removeCollectionItem',{projectId:p.id,itemId:item.id},'确认移除');
      return dialog('编辑收藏备注',notice(esc(item.name)+' · '+esc(item.platform),'只修改当前收藏夹中的备注，不修改平台真实档案、收藏夹名称或共享设置。')+
        field('收藏备注','<textarea name="note" rows="4" maxlength="500">'+esc(item.note||'')+'</textarea>',true),
        v=>perform('editCollectionItem',{projectId:p.id,itemId:item.id,note:v.note},true),'保存备注');
    }
    if(action==='consume'){const scope=selectedQuotaScope();if(scope.id==='email')return mailQuotaDialog();return dialog('模拟消耗 · '+scope.name,notice(name(ui.actor)+' / '+gname(id),'仅验证此项三级额度链，不执行业务；不用于邮件发送或邮箱解锁。')+field('模拟消耗量（'+scope.unit+'）',inp('amount',50,'number','min="1" required'),true),v=>perform('consume',{groupId:id,scopeId:scope.id,amount:Number(v.amount)},true),'模拟消耗');}
    if(['enablePayment','disablePayment','allocate','allocateFromRecharge','dismissRecharge','returnFunds','rechargeFunds','refundPayment','groupLedger'].includes(action))return fundAction(action,id);
    if(action==='accountFunds'){if(!canSetMemberQuota(id))return toast('仅获委派的本组组长可配置成员支付上限',false);return dialog(gname(id)+' · 账号支付上限',table(['账号','个人上限','已用 / 占用','操作'],s.users.filter(u=>active(u.id,id)).map(u=>{const m=member(u.id,id);return '<tr><td>'+name(u.id)+'</td><td>'+n(m.paymentLimit)+'</td><td>'+n(m.paymentUsed)+' / '+n(m.paymentPending)+'</td><td>'+button('设置','setPaymentLimit',u.id+'|'+id,'text')+'</td></tr>';})));}
    if(action==='setPaymentLimit'){if(!canSetMemberQuota(gid))return toast('组织管理身份不能越级配置个人支付上限',false);return dialog('个人支付上限 · '+name(uid),notice('组长配置 · '+gname(gid),'仅设置此成员在此组的支付金额上限；资金仍算支付 Owner，不算执行人。')+field('限制方式',select('mode','<option value="inherit">不追加个人上限</option><option value="capped">设置个人上限</option>'),true)+field('个人累计上限 CNY',inp('limit',member(uid,gid).paymentLimit || 0,'number','min="0" required'),true),v=>perform('setPaymentLimit',{uid,groupId:gid,limit:v.mode==='inherit'?null:Number(v.limit)},true));}
    if(action==='removeMembership')return removeMemberForm(uid,gid);
    if(action==='organizationExit')return organizationExitForm(id);
    if(action==='handoffPreview'){
      const h=s.handoffs.find(h=>h.id===id);if(!h)return;
      return dialog('整体接替摘要',handoffSummary(h));
    }
    if(action==='handoffContext'){
      const t=s.tasks.find(t=>t.id===id);if(!t||!lead(t.groupId))return toast('需要该组有效组长身份',false);
      ui.group=t.groupId;ui.teamTab='tasks';return navigate('team');
    }
    if(action==='cancelRemoval')return confirmAction('撤销退组',notice('尚未发生资产移交','恢复原组身份，不执行逆向项目迁移。'),'cancelRemoval',{taskId:id},'确认撤销');
    if(['taskDetail','completeRemoval','completeGroupHandoff'].includes(action)){
      const t=s.tasks.find(x=>x.id===id);if(!t)return;
      const business=ui.page==='team'&&lead(t.groupId),objects=E.removalObjects(s,t),editing=action==='completeGroupHandoff',h=s.handoffs.find(h=>h.id===t.handoffId),whole=h&&h.mode!=='later';
      if(editing&&(!business||!E.canHandleRemoval(s,ui.actor,t)))return toast('需要本组组长身份，且任务须为各组分别处理路径',false);
      if(whole)return dialog('整体接替摘要',handoffSummary(h));
      const detail=business?table(['对象','当前责任','最终处理'],objects.map(p=>'<tr><td>'+esc(p.name)+'</td><td>'+(p.ownerId===t.uid?'Owner':p.assigneeId===t.uid?'Assignee':'Collaborator')+'</td><td>'+(p.ownerId===t.uid?'转给同组接收人':p.assigneeId===t.uid?'转给接收人或未分配':'移除离职者显式协作')+'</td></tr>')):table(['模块','关联对象数'],Object.entries(objects.reduce((counts,p)=>{counts[p.module]=(counts[p.module]||0)+1;return counts;},{})).map(([mod,count])=>'<tr><td>'+esc(moduleNames[mod]||mod)+'</td><td>'+count+'</td></tr>'));
      const candidates=editing?uoptions(t.groupId,'',t.uid):'';
      const projectReceiver=editing&&objects.some(p=>p.ownerId===t.uid)?field('项目接收人',select('targetId','<option value="">请选择同组接收人</option>'+candidates),true):'';
      const crmReceiver=editing&&objects.some(p=>p.module==='crm'&&p.assigneeId===t.uid)?field('CRM 对接人',select('crmTargetId','<option value="">置为未分配</option>'+candidates),true):'';
      return dialog(editing?'本组业务交接':action==='completeRemoval'?'确认无业务项并结束关系':'移交影响摘要',notice(name(t.uid)+' · '+gname(t.groupId),(t.organizationExit?'组织退出不可撤销。':'单组移除完成前，仅 Owner/Admin 可撤销。')+' 本组组长只安排业务，系统按原决定结束成员关系。')+detail+notice('保留历史责任','业务组、原创建者、用量与既有资金承担快照不改写。真实任务快照、分页及异步重试不在本地模拟执行。')+projectReceiver+crmReceiver,editing?v=>perform('completeGroupHandoff',{taskId:id,targetId:v.targetId||null,crmTargetId:v.crmTargetId||null},true):action==='completeRemoval'?()=>perform('completeRemoval',{taskId:id},true):null,editing?'确认本组交接':'确认结束关系');
    }
    if(action==='moveProjects')return dialog('指定 Owner 名下项目整批迁组',notice('先加入目标组，迁移不触碰其他 Owner','本次仅移动来源组里该 Owner 的所有项目；保留原组身份。CRM 不是项目 Owner 模型。','warning')+'<div class="formgrid">'+field('项目 Owner',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'),'u-member')))+field('来源组',select('sourceGroupId',options(s.groups,id||ui.group)))+field('目标组',select('targetGroupId',options(s.groups.filter(g=>g.status==='ACTIVE'),'g-brand')))+'</div><div id="move-preview" class="audit-box">目标组外 ACL 禁用但不删除；保留附加能力快照。已有支付资金责任不随迁组改写。</div>',v=>perform('moveProjects',v,true),'确认整批迁组');
    if(action==='asOwner'){ui.actor=id==='resource'?'u-editor':'u-member';ui.group='g-growth';ui.project=null;return render();}
    if(action==='createProject'&&id==='crm'){
      const profiles=s.creatorProfiles||[],available=profiles.filter(profile=>!s.projects.some(p=>p.module==='crm'&&p.groupId===ui.group&&p.creatorProfileId===profile.id&&p.status!=='DELETED'));
      return dialog('添加本组达人记录',notice('共享基础资料，建立本组业务记录','同一达人在本组只维护一条记录，其他组可独立对接。创建后归属当前组，不随对接人切组或改派迁移。')+(available.length?field('选择共享达人资料',select('creatorProfileId',options(available,'',profile=>profile.name+' · '+profile.platform)),true):'<p class="form-hint">当前共享达人样例均已在本组建档，可切换到其他组体验独立记录。</p>'),available.length?v=>{const profile=profiles.find(item=>item.id===v.creatorProfileId),r=perform('createProject',{module:'crm',groupId:ui.group,creatorProfileId:v.creatorProfileId,name:profile?.name+' · 合作记录'},true);if(r.ok){ui.project=r.projectId;ui.tab='objects';render();}}:null,'添加记录');
    }
    if(action==='createProject')return dialog('新建'+(id==='payment'?'支付草稿':moduleNames[id]),notice('归属当前组 '+gname(ui.group),id==='resource'?'当前账号成为负责人，初始为私有空夹。私有仍受组织全局组长默认协作策略约束；本次只创建本地样例，不扣真实数量或容量。':'当前账号成为 Owner，CRM 则使用 Assignee。创建后组归属不随日常切换改变。')+field('名称',inp('name','','text','required maxlength="60"'),true),v=>{const r=perform('createProject',{...v,module:id,groupId:ui.group},true);if(r.ok){ui.project=r.projectId;ui.tab='objects';render();}},'创建');
    if(action==='collaborators')return collaboratorsDialog(id);
    if(action==='removeCollaborator')return confirmAction('移除显式协作者',notice('删除后不自动恢复','如果该授权当前为组外禁用，永久删除后，成员再次入组也不会恢复此条 ACL。其他独立系统来源不受影响。','warning'),'removeCollaborator',{projectId:uid,uid:gid},'确认移除');
    if(action==='transferOwner'){
      const p=E.project(s,id);if(p?.module==='email')return toast('邮件项目不提供日常负责人转交，仅账号级交接处理',false);return dialog('同组转交项目负责人',notice('最小动作转交','清理新 Owner 的重复显式协作记录；不为原 Owner 自动新增协作，也不提供转协作者快捷勾选。其他独立有效权限仍按自身来源计算。')+field('新 Owner',select('targetId',uoptions(p.groupId,'',p.ownerId)),true),v=>perform('transferOwner',{projectId:id,...v},true),'确认转交');
    }
    if(action==='saveCRMWritePermissions')return perform('setCRMWritePermissions',{permissions:[...document.querySelectorAll('[data-crm-permission]:checked')].map(el=>Number(el.dataset.crmPermission))});
    if(action==='saveCRMRecord'){
      const p=E.project(s,id);if(!p||p.module!=='crm'||!E.access(s,ui.actor,id).write)return toast('没有当前记录的编辑权限',false);
      const stages=['待跟进','洽谈中','合作中','已完成'];if(p.cooperationStatus&&!stages.includes(p.cooperationStatus))stages.unshift(p.cooperationStatus);
      return dialog('编辑本组合作记录',notice('仅修改 '+gname(p.groupId)+' 的记录','合作状态与跟进备注独立于其他组；不修改共享达人资料。状态值仅为虚构样例，不替代线上 CRM 状态设计。')+field('合作状态',select('cooperationStatus',stages.map(stage=>'<option value="'+esc(stage)+'" '+(stage===p.cooperationStatus?'selected':'')+'>'+esc(stage)+'</option>')),true)+field('跟进备注','<textarea name="note" rows="4" maxlength="500">'+esc(p.note||'')+'</textarea>',true),v=>perform('saveCRMRecord',{projectId:id,...v},true),'保存本组记录');
    }
    if(action==='assignCRM'){const p=E.project(s,id);return dialog(p.assigneeId?'改派 CRM 对接人':'指派 CRM 对接人',notice('沿用普通 CRM 写权限','具有当前记录编辑权限的账号可指派给其他同组有效成员，不要求接收确认；日常不清空。改派不改变记录组，也不创建协作者关系。')+field('新对接人',select('targetId',uoptions(p.groupId,'',p.assigneeId)),true),v=>perform('assignCRM',{projectId:id,...v},true),'确认指派');}
    if(action==='renameProject'){const p=E.project(s,id);if(p?.module==='email'&&(p.ownerId!==ui.actor||!E.access(s,ui.actor,id).read))return toast('仅邮件项目 Owner 可修改名称',false);return dialog('修改对象名称',field('名称',inp('name',p.name,'text','required'),true),v=>perform('renameProject',{projectId:id,...v},true));}
    if(action==='deleteProject')return confirmAction('删除项目',notice('仅本地模拟','仅 Owner 可删除此项目；隐式 T2 普通协作不包含删除能力。','warning'),'deleteProject',{projectId:id},'确认删除');
    if(action==='sendEmail'){const p=E.project(s,id);if(!E.access(s,ui.actor,id).write)return toast('没有项目写权限',false);return mailQuotaDialog(p);}
    if(action==='savePayment'){
      const p=E.project(s,id);
      return dialog('填写支付草稿',notice('协作者可填写，执行能力另算','保存草稿不产生资金占用。共享模板只快捷填充，保存后成为单据独立快照；后续模板改删不影响此单，也不开放来源订单。')+field('金额 CNY',inp('amount',p.paymentAmount,'number','min="0.01" step="0.01" required'),true)+field('按频道选用收款模板','<select name="recipientId" data-recipient-project="'+esc(id)+'"><option value="">保留当前支付单收款信息</option>'+recipientOptions('')+'</select>',true)+'<div id="recipient-result" class="audit-box" aria-live="polite">'+paymentRecipientPreview(p)+'</div>',v=>perform('savePayment',{projectId:id,amount:Number(v.amount),...(v.recipientId?{recipientId:v.recipientId}:{})},true),'保存草稿');
    }
    if(action==='submitPayment'||action==='schedulePayment'){const p=E.project(s,id);return dialog(action==='schedulePayment'?'预约提交支付':'正式提交支付',notice('即刻占用 Owner 个人与组额度','本例省略真实系统审核过程。组审核策略会影响后续闸门；当前金额 '+n(p.paymentAmount)+' CNY。','warning')+(action==='schedulePayment'?field('预约时点 · 示意',inp('when','2026-10-30T10:00','datetime-local','required'),true):''),v=>perform('submitPayment',{projectId:id,scheduled:action==='schedulePayment',when:v.when},true),'确认并占用');}
    if(['deleteDraft','cancelPayment','releasePayment','reviewPayment'].includes(action)){
      const p=E.project(s,id),atDeadline=action==='releasePayment'&&p.scheduled;
      const explanation=atDeadline?'模拟到达预约时点；审核未通过的单逾期不执行，保留占用。':action==='reviewPayment'&&p.scheduled?'预约前通过预审核，等到预约时点才执行。':action==='cancelPayment'?'作废后按原资金承担记录释放占用。':'仅更新本地样例，不发起真实转账。';
      return confirmAction(atDeadline?'模拟到达预约时点':actionNames[action],notice('虚构支付，非真实执行',explanation,'warning'),action,{projectId:id},'确认模拟');
    }
    if(action==='recipient'){
      const first=s.recipients.find(r=>r.status==='ACTIVE');
      return dialog('预览组织收款模板',notice('仅预览，不改写草稿','同频道允许多条不同收款信息；模板全组织共享，不授予来源支付单访问。')+(first?field('频道与收款记录',select('recipientId',recipientOptions(first.id)),true)+'<div id="recipient-result" class="audit-box" aria-live="polite">'+recipientPreview(first.id)+'</div>':empty('暂无可用收款模板，可在设置页新增。')));
    }
    if(action==='saveRecipient'){
      const r=id?E.recipient(s,id):null;
      if(id&&!r)return toast('收款模板已删除或不存在',false);
      const channel=s.recipients.find(r=>r.status==='ACTIVE'&&r.channelId===ui.recipientChannel);
      return dialog(r?'编辑频道收款记录':'新增频道收款记录',notice('组织共享快捷模板','所有有效业务成员可维护；仅示意虚构信息，不发起支付。保存时检查同频道重复，已存单据快照不随此处改动。')+'<div class="formgrid">'+field('频道 ID',inp('channelId',r?.channelId||channel?.channelId||'','text','required maxlength="80"'))+field('频道名称',inp('channelName',r?.channelName||channel?.channelName||'','text','required maxlength="80"'))+field('收款人名称',inp('name',r?.name||'','text','required maxlength="80"'))+field('示例账号',inp('account',r?.account||'','text','required maxlength="80"'))+'</div>',v=>perform('saveRecipient',{...v,...(id?{recipientId:id}:{})},true),'保存收款记录');
    }
    if(action==='deleteRecipient')return confirmAction('删除收款快捷模板',notice('不删除或改写支付记录','删除后该模板不再出现在可选列表；已保存支付单保留自己的收款信息快照。','warning'),'deleteRecipient',{recipientId:id},'确认删除模板');
    if(action==='addLabel')return dialog('新增标签定义',notice(gname(ui.group)+' · '+(id==='monitor'?'内容监控':'消息中心'),'标签归属记录创建时组，不随创建人转组变化。')+field('标签名称',inp('name','','text','required maxlength="24"'),true),v=>perform('addLabel',{...v,module:id,groupId:ui.group},true),'创建标签');
    if(action==='renameLabel'){const l=s.labels.find(x=>x.id===id);return dialog('标签改名',field('标签名称',inp('name',l.name,'text','required maxlength="24"'),true),v=>perform('renameLabel',{labelId:id,...v},true));}
    if(action==='deleteLabel')return confirmAction('删除标签定义',notice('影响标签定义','本示例只删除虚构标签，不连接真实业务；监控定义为组织共享，项目内应用另按对象权限。','warning'),'deleteLabel',{labelId:id},'确认删除');
    if(action==='deleteCRMLabel'){const l=s.labels.find(x=>x.id===id);return confirmAction('删除 CRM 组织共享标签',notice('影响 '+l.affected+' 位创作者（示例）','删除共享定义不是从当前记录移除标签。所有被应用处都会受影响；此操作不由普通记录写权限推导。','warning'),'deleteCRMLabel',{labelId:id},'确认删除共享定义');}
    if(action==='contactCreator')return dialog('联系 '+esc(id),notice('获取联系信息需组织权益与额度','这里只说明筛选后的动作边界；不获取真实邮箱、不发送真实消息。')+goto('quota','查看资源配额'));
    if(action==='entitlementInfo')return dialog('高级筛选权益说明',notice('无权益选项在选择前锁定','合作倾向、可用联系方式等高级条件先说明所需套餐，不能选完后才在搜索时提示升级。')+'<dl class="definition"><dt>升级或联系销售</dt><dd>正式页面复用既有升级或销售入口；此处不跳转真实购买，也不虚构新入口。</dd><dt>不新增</dt><dd>开通原因表单、向 Owner 发通知或内部审批。</dd><dt>本期范围条件</dt><dd>先按本期纳入，评审核额外成本；若成本高可裁剪本期不做。</dd></dl>');
    toast('此问题保留在审阅清单，尚未定义为可执行规则',false);
  }
  document.addEventListener('click',e=>{
    const el=e.target.closest('button');if(!el||el.disabled)return;
    if(el.dataset.story){ui.storyId=el.dataset.story;navigate('stories');$('#story-detail')?.focus();return;}
    if(el.dataset.storyTarget){const [storyId,page]=el.dataset.storyTarget.split('|');ui.storyId=storyId;return navigate(page);}
    if(el.dataset.storyPage)return navigate(el.dataset.storyPage);
    if(el.dataset.page){if($('#dialog').open)$('#dialog').close();if(el.dataset.page==='groups'){ui.managedGroup=null;ui.orgGroupTab='members';}return navigate(el.dataset.page);}
    if(el.dataset.teamTab){ui.teamTab=el.dataset.teamTab;return render();}
    if(el.dataset.orgGroupTab){ui.orgGroupTab=el.dataset.orgGroupTab;return render();}
    if(el.dataset.scenario){const key=el.dataset.scenario;ui.actor=key==='invite'||key==='removal'?'u-owner':'u-member';ui.group='g-growth';return navigate(key==='invite'?'members':key==='removal'?'tasks':key==='payment'?'payment':'email');}
    if(el.dataset.metric){ui.metric=el.dataset.metric;return render();}
    if(el.dataset.tab){ui.tab=el.dataset.tab;return render();}
    if(el.dataset.project){ui.project=el.dataset.project;return render();}
    if(el.dataset.action)actClick(el.dataset.action,el.dataset.id);
  });
  document.addEventListener('submit',e=>{
    if(e.target.id!=='dialog-form')return;
    e.preventDefault();if(submitDialog)submitDialog(Object.fromEntries(new FormData(e.target)));
  });
  document.addEventListener('change',e=>{
    const el=e.target;
    if(el.hasAttribute('data-collection-mode'))return updateCollectionModeWarning();
    if(el.name==='mailPath'){$('#mail-quota-path-detail').innerHTML=mailQuotaPathDetail(el.value);return;}
    if(el.name==='monitorPath'){$('#monitor-rule-path-detail').innerHTML=monitorRulePathDetail(el.value);return;}
    if(el.name==='senderConfigId'){$('#conversation-sender-preview').innerHTML=conversationSenderPreview(el.dataset.conversation,el.value);return;}
    if((el.name==='handoffMode'||el.name==='targetId')&&$('#handoff-memberships'))return updateHandoffPreview();
    if(el.hasAttribute('data-quota-field'))return updateGroupQuotaPreview();
    if(el.id==='story-chapter'){ui.storyChapter=el.value;return render();}
    if(el.id==='actor-select'){ui.actor=el.value;ui.project=null;ui.probe=null;ui.dashboardGroup='all';ui.dashboardUser='all';ui.quotaGroup=null;ui.managedGroup=null;ui.teamTab='members';return render();}
    if(el.id==='group-select'){ui.group=el.value;ui.project=null;ui.probe=null;ui.quotaGroup=null;ui.teamTab='members';return render();}
    if(el.id==='usage-group'){ui.dashboardGroup=el.value;ui.dashboardUser='all';return render();}
    if(el.id==='usage-user'){ui.dashboardUser=el.value;return render();}
    if(el.id==='usage-period'){ui.period=el.value;return render();}
    if(el.id==='usage-health'){ui.usageHealth=el.value;return render();}
    if(el.id==='quota-group'){ui.quotaGroup=el.value;return render();}
    if(el.id==='fund-ledger-scope'){ui.fundLedgerScope=el.value;render();$('#fund-ledger-scope').focus();return;}
    if(el.id==='review-filter'){ui.reviewFilter=el.value;return render();}
    if(el.id==='archived-toggle'){ui.showArchived=el.checked;return render();}
    if(el.id==='probe-project'){ui.probe=el.value;$('#probe-result').innerHTML=el.value?probeResult(el.value):'请选择虚构样本';return;}
    if(el.id==='label-scope'){ui.labelScopes=ui.labelScopes||{};ui.labelScopes[ui.actor]=el.value;return render();}
    if(el.id==='conversation-filter'){ui.conversationFilter=el.value;ui.conversationId=null;return render();}
    if(el.id==='contact-scope'){ui.contactScope=el.value;return render();}
    if(el.id==='quota-scope'){ui.quotaScope=el.value;render();if(['window','entitlement'].includes(el.value))toast(el.value==='window'?'搜索频率不同于搜索次数，按组织窗口限制，不展示虚构个人余额。':'功能权益来自组织套餐；不新增组模块禁用开关。');return;}
    if(el.id==='member-group'){filterMembers();return;}
    if(el.id==='recipient-channel'){ui.recipientChannel=el.value;return render();}
    if(el.name==='recipientId'&&$('#recipient-result')){$('#recipient-result').innerHTML=!el.value&&el.dataset.recipientProject?paymentRecipientPreview(E.project(s,el.dataset.recipientProject)):recipientPreview(el.value);return;}
    if(el.dataset.review){ui.reviews[el.dataset.review]=el.value;return render();}
    if(el.dataset.capability){const pid=el.dataset.project;perform('setCapability',{projectId:pid,uid:el.dataset.uid,capability:el.dataset.capability,value:el.checked});return collaboratorsDialog(pid);}
    if(el.dataset.policy){const key=el.dataset.policy,value=el.checked;render();const impacts={t2Collaborator:'开启将给同组有效 T2 增加普通读写来源；关闭只撤销此来源，不删除显式授权。',adminRemoveMembers:'仅 Owner 可修改。开启后所有 Admin 可移出组织或单组、撤销未完成单组移除及确认无业务项的关系结束；关闭后这些入口不再可用，已有组长业务交接不受影响。',adminArchiveGroups:'仅 Owner 可修改。开启后所有 Admin 可二次确认归档非默认业务组；关闭不自动恢复已归档组。默认组始终不可归档，也不提供自助解除归档。'};return dialog('确认策略影响',notice('配置立即生效',impacts[key]||'配置主体和影响范围请结合右侧规则审阅。','warning')+'<p>本次：'+(value?'开启':'关闭')+'；操作人：'+name(ui.actor)+'</p>',()=>perform(key==='groupPayment'?'setGroupPolicy':'setPolicy',key==='groupPayment'?{groupId:ui.group,key:'requireT2PaymentRelease',value}:{key,value},true),'确认修改');}
  });
  document.addEventListener('input',e=>{
    const el=e.target;
    if(el.hasAttribute('data-quota-field'))return updateGroupQuotaPreview();
    if(el.id==='story-query'){const pos=el.selectionStart;ui.storyQuery=el.value;render();$('#story-query').focus();$('#story-query').setSelectionRange(pos,pos);return;}
    if(el.hasAttribute('data-collab-search')){const picker=$('#dialog select[name=uid]');const opts=[...picker.options];opts.forEach(o=>{o.hidden=!o.textContent.toLowerCase().includes(el.value.toLowerCase());o.disabled=o.hidden;});picker.value=opts.find(o=>!o.hidden)?.value || '';return;}
    if(el.dataset.note){ui.notes[el.dataset.note]=el.value;return;}
    if(el.dataset.search){filterMembers();}
    if(el.id==='creator-query')document.querySelectorAll('.creator-row').forEach(row=>row.hidden=!row.dataset.query.includes(el.value.toLowerCase()));
    const form=$('#dialog-form');
    if($('#batch-preview')&&form){const box=$('#batch-preview'),data=new FormData(form),gid=box.dataset.group,scopeId=box.dataset.scope,q=E.quota(s,gid,scopeId),amount=Number(data.get('amount')),ids=data.getAll('uids');box.innerHTML=s.users.filter(u=>active(u.id,gid)&&ids.includes(u.id)).map(u=>{const m=E.quota(s,gid,scopeId,u.id).member;return '<p>'+name(u.id)+'：'+(m.quotaMode==='inherit'?'跳过 inherit':n(m.quotaLimit)+' → '+n(m.quotaLimit+amount)+(m.quotaLimit+amount>q.group.quotaLimit?' · 超过组上限，整批将拦截':''))+'</p>';}).join('') || '未选择成员';}
  });
  function filterMembers(){const query=$('[data-search="member-row"]')?.value.toLowerCase() || '',gid=$('#member-group')?.value || 'all';document.querySelectorAll('.member-row').forEach(row=>row.hidden=!row.dataset.query.toLowerCase().includes(query)||(gid!=='all'&&!row.dataset.groups.split(',').includes(gid)));}
  render();
})();
