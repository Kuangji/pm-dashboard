(function () {
  'use strict';
  const E = window.ReviewEngine, D = window.ReviewData;
  let s = E.createState();
  const ui = {page:'dashboard', actor:'u-owner', group:'g-growth', project:null, tab:'objects', dashboardGroup:'all', dashboardUser:'all', period:'2026-10', metric:'sent', reviewFilter:'all', reviews:{}, notes:{}, lastResult:null, showArchived:false};
  const moduleNames = {email:'邮件项目',resource:'收藏夹',monitor:'内容监控',crm:'CRM',payment:'跨境支付'};
  const orgNames = {owner:'组织 Owner',admin:'组织 Admin',member:'普通成员'};
  const statusNames = {ACTIVE:'正常',PENDING:'待接受',ACCEPTED:'已接受',CANCELLED:'已取消',REMOVING:'待移交',REMOVED:'已移除',COMPLETED:'已完成',ARCHIVED:'已归档',DRAFT:'草稿',FORMAL:'正式单',SCHEDULED:'预约中',WAITING_REVIEW:'待组长审核',PAID:'已支付',DELETED:'已删除'};
  const nav = [
    {label:'组织管理',items:[['dashboard','LayoutDashboard','使用情况'],['members','Users','成员与邀请'],['groups','Layers','业务分组'],['policies','Settings2','组织策略'],['quota','Gauge','配额与用量'],['funds','Wallet','支付资金'],['tasks','ArrowRightLeft','移交与迁移'],['history','History','通知与记录']]},
    {label:'业务模块',items:[['email','Mail','邮件项目'],['resource','Folder','收藏夹'],['monitor','Video','内容监控'],['crm','Contact','CRM'],['payment','CreditCard','跨境支付'],['message','MessagesSquare','消息中心'],['search','Search','创作者搜索']]},
    {label:'功能审阅',items:[['review','ClipboardCheck','覆盖与待确认']]}
  ];
  const $ = q => document.querySelector(q);
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
  const active = (id,gid) => user(id)?.status === 'ACTIVE' && member(id,gid)?.status === 'ACTIVE' && group(gid)?.status === 'ACTIVE';
  const lead = gid => active(ui.actor,gid || ui.group) && member(ui.actor,gid || ui.group)?.role === 'T2';
  const tag = (label,color) => '<span class="tag '+(color || '')+'">'+esc(label)+'</span>';
  const button = (text,action,id,kind,disabled,title) => '<button type="button" class="btn '+(kind || '')+'" data-action="'+action+'" '+(id?'data-id="'+esc(id)+'" ':'')+(disabled?'disabled ':'')+'title="'+esc(title || text)+'">'+text+'</button>';
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
  const toggle = (key,value,disabled,label) => '<label class="switch"><input type="checkbox" data-policy="'+key+'" '+(value?'checked ':'')+(disabled?'disabled ':'')+'aria-label="'+esc(label)+'"><span class="switch-track"></span><span>'+ (value?'已开启':'已关闭') +'</span></label>';
  let toastTimer;
  function toast(message,ok) { clearTimeout(toastTimer); const t=$('#toast');t.className='toast '+(ok===false?'error':'');t.textContent=message;toastTimer=setTimeout(()=>{t.className='';t.textContent='';},5000); }
  function perform(type,payload,close) {
    const r=E.act(s,ui.actor,type,payload);
    ui.lastResult={type,message:r.message,ok:r.ok};
    if(r.ok) { if(close) $('#dialog').close(); render(); toast(r.message); }
    else { const error=$('#form-error'); if(error && $('#dialog').open)error.textContent=r.message; else toast(r.message,false); }
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
    const scope=moduleNames[ui.page] || ['message','search'].includes(ui.page)?'业务模块':'组织管理';
    const a=actor(),m=member(ui.actor);
    $('#app').innerHTML=
      '<div class="review-strip"><div class="left">'+icon('ClipboardCheck')+'<strong>功能审阅 Demo</strong><span>独立模拟 · 所有数值为示例 · 修改仅在本次页面内生效</span></div><div class="inline">'+button('审阅清单','review',null,'')+button(icon('RotateCcw')+' 重置','reset',null,'')+'</div></div>'+
      '<header class="product-header"><div class="brand"><span class="brand-mark">N</span>聚星<small>星野品牌 · 示例组织</small></div><div class="identity-controls"><div class="identity-field"><label for="actor-select">体验账号</label><select id="actor-select" aria-label="体验账号">'+options(s.users,ui.actor,u=>u.name+' · '+orgNames[u.orgRole]+(u.status!=='ACTIVE'?' · '+statusNames[u.status]:''))+'</select></div><div class="identity-field"><label for="group-select">业务组</label><select id="group-select" aria-label="当前业务组">'+(ui.group?options(s.groups.filter(g=>active(ui.actor,g.id)),ui.group):'<option>暂无有效业务组</option>')+'</select></div><span class="avatar orange">'+esc(a.name.slice(-2))+'</span></div></header>'+
      '<div class="layout"><aside class="sidebar">'+nav.map(sec=>'<div class="nav-section"><div class="nav-title">'+sec.label+'</div>'+sec.items.map(item=>'<button class="nav-item '+(ui.page===item[0]?'active':'')+'" data-page="'+item[0]+'" '+(ui.page===item[0]?'aria-current="page"':'')+'>'+icon(item[1])+'<span>'+item[2]+'</span></button>').join('')+'</div>').join('')+'<div class="nav-note">一期后统一版本<br>Input 功能审阅 · 2026.10<br><span class="status-line">非线上 UI / 非定稿设计</span></div></aside>'+
      '<div class="workspace"><main class="main"><div class="breadcrumbs">'+icon(scope==='组织管理'?'Building2':'Layers')+scope+icon('ChevronRight')+title()+'</div><div class="page-header"><div><h1>'+title()+'</h1><p>'+pageSubtitle()+'</p></div><div class="page-actions">'+pageActions()+'</div></div>'+pageContent()+'</main>'+rulePanel(m)+'</div></div>';
    window.ReviewApp={getState:()=>s,getUI:()=>ui,navigate,render,act:(type,payload)=>perform(type,payload)};
  }
  function pageSubtitle() {
    const texts={dashboard:'按组织、业务组与成员，了解工作活动、业务结果及资源使用。',members:'组织身份决定管理能力，组内身份决定业务上下文。',groups:'一个账号可加入多个组，每组可有多名组长。',policies:'组织级策略统一生效；单个项目的协作在业务模块中设置。',quota:'按组织、组、组成员逐层校验，额度不授予对象访问权限。',funds:'组织钱包、部门分配与个人上限，共同约束每一笔支付。',tasks:'先失权，后移交；每一步保留状态和操作结果。',history:'模拟操作记录与完成通知，贯穿设置、协作和移交。',review:'逐项覆盖原 Input、补充遗留与本版待确认决策。',message:'创建来源筛选与会话协作边界。',search:'联系与合作范围的增量筛选。'};
    return texts[ui.page] || '当前业务组：'+gname(ui.group)+' · 对象归组稳定，组织管理身份不默认授予业务权限。';
  }
  function pageActions() {
    if(ui.page==='members')return button(icon('Plus')+' 邀请成员','invite',null,'primary',!admin(),'示意基线：Owner/Admin 邀请；T2 邀请待确认');
    if(ui.page==='groups')return button(icon('Plus')+' 创建业务组','addGroup',null,'primary',!admin());
    if(ui.page==='dashboard')return button(icon('Download')+' 导出当前视图','exportUsage',null,'',false,'仅导出模拟且有权查看的数据；导出范围待确认');
    if(ui.page==='review')return button(icon('Download')+' 导出审阅意见','exportReview',null,'primary');
    if(moduleNames[ui.page] && ui.page!=='crm')return button(icon('Plus')+' 新建'+(ui.page==='payment'?'草稿':'项目'),'createProject',ui.page,'primary',!ui.group);
    return '';
  }
  function pageContent() {
    if(actor().status!=='ACTIVE'&&!['tasks','history','review'].includes(ui.page))return notice('当前账号已失去有效组织身份','本选择器仅用于审阅失权状态；不能继续查看或操作组织业务。请切换其他有效账号。','warning');
    if(!ui.group&&(moduleNames[ui.page]||['message','search','quota'].includes(ui.page)))return notice('没有有效业务组身份','归档或退组后无法继续该组业务，可到移交与迁移查看处理状态。','warning');
    const pages={dashboard:dashboard,members:membersPage,groups:groupsPage,policies:policiesPage,quota:quotaPage,funds:fundsPage,tasks:tasksPage,history:historyPage,review:reviewPage,message:messagePage,search:searchPage};
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
      section('成员工作明细',table(['成员','业务组','邮件发送','邮件打开','回复','合作完成','寄样','新建监控'],rows.length?rows.map(r=>'<tr><td>'+person(user(r.uid))+'</td><td>'+gname(r.groupId)+'</td>'+['sent','opened','replied','cooperate','samples','monitor'].map(k=>'<td class="num">'+n(r[k])+'</td>').join('')+'</tr>'):['<tr><td colspan="8" style="text-align:center;padding:35px">'+(ui.period==='uncovered'?'历史未覆盖，不能解释为用量为零':'当前有效范围与窗口内暂无记录')+'</td></tr>']))+
      '<div class="table-footer"><span>每行 = 账号 × 事件所属组；组织汇总不按成员关系重复累计</span><span>'+rows.length+' 条模拟记录</span></div>'+goto('quota','查看配额与实际剩余');
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
    return (!admin()?notice('当前为组内查看视角','组长不维护成员关系；配额是否可配置由组织委派策略决定。'):'')+
      '<div class="filterbar"><input data-search="member-row" placeholder="搜索姓名或邮箱" aria-label="搜索成员"><select id="member-group" aria-label="成员组筛选"><option value="all">全部业务组</option>'+options(s.groups,'')+'</select><span class="push">'+tag(s.users.filter(u=>u.status==='ACTIVE').length+' / '+s.organization.seatLimit+' 有效席位','outline')+'</span></div>'+
      table(['账号','组织身份','组关系 / 状态','账号操作'],people.map(u=>'<tr class="member-row" data-query="'+esc(u.name+' '+u.email)+'" data-groups="'+u.memberships.map(m=>m.groupId).join(',')+'"><td>'+person(u)+'</td><td>'+tag(orgNames[u.orgRole],u.orgRole==='owner'?'orange':u.orgRole==='admin'?'blue':'')+'</td><td><div class="chip-list">'+u.memberships.filter(m=>m.status!=='REMOVED').map(m=>tag(group(m.groupId)?.name+' / '+m.role+(m.status!=='ACTIVE'?' · '+statusNames[m.status]:''),m.status==='ACTIVE'?'':'orange')).join('')+'</div></td><td><div class="actions">'+button('组关系','membership',u.id,'text',!admin())+button('配额','memberQuota',u.id,'text',!admin() && !(lead() && s.policies.t2Quota))+button('组织身份','orgRole',u.id,'text',actor().orgRole!=='owner'||u.orgRole==='owner')+button('移出组织','organizationExit',u.id,'text',!admin()||u.orgRole==='owner')+'</div></td></tr>'))+
      (actor().orgRole==='owner'?'<div class="bulk-actions">'+button('转让组织所有权','transferOrgOwner',null,'')+'<span class="form-hint">不会转交项目 Owner 或改变组身份</span></div>':'')+
      '<div class="table-footer"><span>组织身份不替代组内身份；移出组织后立即失去全部业务权限</span><span>'+people.length+' 人</span></div>'+
      section('邀请记录',s.invites.length?table(['邮箱','目标组','状态','操作'],s.invites.map(v=>'<tr><td>'+esc(v.email)+'</td><td>'+gname(v.groupId)+'</td><td>'+tag(statusNames[v.status],v.status==='PENDING'?'orange':'green')+'</td><td>'+button('模拟接受','acceptInvite',v.id,'text',v.status!=='PENDING'||!admin())+button('撤销','cancelInvite',v.id,'text',v.status!=='PENDING'||!admin())+'</td></tr>')):empty('暂无邀请；可以邀请一个虚构邮箱，体验接受和席位校验。'));
  }
  function groupsPage() {
    const visible=s.groups.filter(g=> (admin() || active(ui.actor,g.id)) && (ui.showArchived || g.status==='ACTIVE'));
    return '<div class="filterbar">'+notice('多人、多组关系','组长名额为 0..N；同一账号在不同组可分别为 T2 或 T3。')+'<label class="inline-check"><input type="checkbox" id="archived-toggle" '+(ui.showArchived?'checked':'')+'>显示已归档组</label></div>'+
      table(['业务组','有效成员 / 组长','项目对象','配额上限','状态','操作'],visible.map(g=>{const ms=s.users.flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status==='ACTIVE').map(m=>({u,m})));return '<tr><td><strong>'+esc(g.name)+'</strong> '+(g.isDefault?tag('默认组','outline'):'')+'</td><td>'+ms.length+' 人 / '+ms.filter(x=>x.m.role==='T2').length+' 名 T2<br><small>'+ms.filter(x=>x.m.role==='T2').map(x=>esc(x.u.name)).join('、')+'</small></td><td>'+s.projects.filter(p=>p.groupId===g.id&&p.status!=='DELETED').length+' 个</td><td>'+n(g.quotaLimit)+'</td><td>'+tag(statusNames[g.status],g.status==='ACTIVE'?'green':'')+'</td><td>'+button('成员','groupMembers',g.id,'text',!admin()||g.status!=='ACTIVE')+button('改名','renameGroup',g.id,'text',!admin()||g.status!=='ACTIVE')+button('冻结归档','archiveGroup',g.id,'text',!admin()||g.status!=='ACTIVE')+'</td></tr>';}))+
      section('归档与组合并',notice('组合并、归档恢复仍待确认','当前可以冻结归档保留历史；整体并入另一组的对象、配额、资金冲突需要单独确认。','warning')+button('审阅组合并方案','decision','D08',''));
  }
  function policiesPage() {
    const specs=[['t2Collaborator','组长默认成为组内所有项目协作者','动态赋予同组 ACTIVE T2 普通业务读写；不自动获得管理协作者或执行支付能力。'],['t2Quota','允许组长管理本组成员配额','T2 可调整自己与其他本组成员的个人上限，但不能修改组上限。'],['monitorLabelsT2','仅组长可增删改内容监控标签定义','关闭时 T3 可维护标签；开启后仍允许组织 Owner/Admin 与本组 T2。不限制已有标签的应用。'],['paymentSensitive','正式支付单同组只读可查看敏感信息','仅在正式单的同组固定只读范围内生效；草稿不因此向全组公开。'],['showTeamQuota','允许成员查看本组配额汇总','展示层级额度不等于开放其他账号的项目明细。此展示范围仍需评审。']];
    return notice('操作权限为评审假设','此 Demo 暂按 Owner/Admin 可修改组织策略体验；Admin 范围及完整动作矩阵尚待确认。','warning')+
      specs.map(x=>'<div class="setting-row"><div><h2>'+x[1]+'</h2><p>'+x[2]+'</p></div>'+toggle(x[0],s.policies[x[0]],!admin(),x[1])+'</div>').join('')+
      section('不可配置的硬边界','<div class="chip-list">'+['无跨组协作','组织管理不自动授予业务写入','附加能力不传授','已有资金责任快照不改写'].map(x=>tag(x,'outline')).join('')+'</div>')+
      section('候选裁剪项',notice('不把旧方案恢复成默认值','T2 邀请、通用显式只读、Admin 组范围等六项会议意见均待收口。','warning')+button('逐项讨论','review',null,''));
  }
  function quotaPage() {
    const g=group(ui.quotaGroup || ui.group) || s.groups.find(x=>x.status==='ACTIVE');
    if(!g)return empty('暂无可配置的业务组。');
    const can=admin() || lead(g.id)&&s.policies.t2Quota;
    const show=admin() || lead(g.id) || s.policies.showTeamQuota;
    const ms=s.users.flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status==='ACTIVE'&&(show||u.id===ui.actor)).map(m=>({u,m})));
    const rows=ms.map(({u,m})=>'<tr><td>'+person(u)+'</td><td>'+tag(m.role)+'</td><td>'+tag(m.quotaMode==='inherit'?'inherit · 不追加上限':'capped · 追加上限',m.quotaMode==='inherit'?'':'blue')+'</td><td class="num">'+(m.quotaMode==='inherit'?'—':n(m.quotaLimit))+'</td><td class="num">'+n(m.used)+'</td><td class="num">'+n(Math.max(0,Math.min(s.organization.quotaLimit-s.organization.used,g.quotaLimit-g.used,m.quotaMode==='capped'?m.quotaLimit-m.used:Infinity)))+'</td><td>'+button('设置','memberQuota',u.id+'|'+g.id,'text',!can)+'</td></tr>');
    return '<div class="filterbar"><select id="quota-group" aria-label="配额组范围">'+goptions(g.id,false)+'</select><select aria-label="Scope 类型" id="quota-scope"><option value="email">邮件发送 · 可分配 Scope</option><option value="window">搜索频率 · 不可分配 Scope</option><option value="entitlement">模块权益 · Entitlement</option></select><span class="push">'+tag('示例周期：2026-10-01 ~ 10-31','outline')+'</span></div>'+
      notice('配额不是模块开关','本例演示邮件发送配额；其他 Scope 的可分配性需逐项核验。统计月份不改变组织权益实际发放周期。')+
      '<div id="scope-detail"><div class="stats">'+stat('组织上限',n(s.organization.quotaLimit),'已使用 '+n(s.organization.used))+stat('组上限',show?n(g.quotaLimit):'未开放','已使用 '+(show?n(g.used):'—'))+stat('组实际可用',show?n(Math.max(0,Math.min(g.quotaLimit-g.used,s.organization.quotaLimit-s.organization.used))):'未开放','受组织余额与组余额共同限制')+stat('分配方式','不预占','同级上限合计可超配')+'</div>'+
      section('组成员邮件额度',table(['账号','组身份','限制方式','个人上限','已使用','实际可用','操作'],rows),'<div class="actions">'+button('设置组上限','groupQuota',g.id,'',!admin())+button('批量增加','batchQuota',g.id,'',!can)+'</div>')+
      section('当前账号业务消耗',notice('消耗主体为当前操作人','普通配额与支付不同：普通业务消费按操作账号核算；本控件仅验证三级额度，不代表授权其他项目。')+button('模拟发送并校验额度','consume',g.id,'primary',!active(ui.actor,g.id)))+'</div>'+
      section('月度下分规则',notice('保留在本版，尚待确认','组织年付月发与年度额度按月下分需区分父级发放周期、子级上限窗口、结转和期中调额。','warning')+button('审阅月度配置草案','decision','D07',''));
  }
  function fundsPage() {
    if(!admin())return notice('资金管理与业务执行分离','当前仅按组织管理身份展示部门资金配置。Admin 动作矩阵待确认；个人仍可在有权支付单上执行业务。','warning')+goto('payment','进入跨境支付');
    const b=E.balances(s,ui.group,ui.actor);
    return notice('所有金额均为模拟 CNY','不连接钱包、不发起真实转账。部门上限不是提前划拨锁定余额；未分配共享余额和明确部门上限共同防止超发。')+
      '<div class="stats">'+stat('组织账面余额',n(s.organization.walletBalance),'CNY')+stat('已占用',n(s.organization.walletPending),'正式单 / 预约占用')+stat('当前可用',n(b.orgAvailable),'组织硬约束')+stat('未分配共享余额',n(b.unallocated),'部门追加不得超过此值')+'</div>'+
      section('部门资金',table(['业务组','累计上限','已支付','已占用','剩余可用','操作'],s.groups.map(g=>'<tr><td>'+gname(g.id)+'</td><td class="num">'+(g.fundLimit===null?'共享未分配余额':n(g.fundLimit))+'</td><td class="num">'+n(g.fundUsed)+'</td><td class="num">'+n(g.fundPending)+'</td><td class="num">'+n(E.balances(s,g.id,ui.actor).groupRemaining)+'</td><td>'+button('追加分配','allocate',g.id,'text',g.status!=='ACTIVE')+button('账号上限','accountFunds',g.id,'text',g.status!=='ACTIVE')+'</td></tr>')))+
      section('分配与冲正流水',table(['记录','业务组','金额','原因','操作'],s.allocations.slice().reverse().map(a=>'<tr><td>'+tag(a.originalId?'冲正':'追加',a.originalId?'orange':'green')+'<small>'+esc(a.id)+'</small></td><td>'+gname(a.groupId)+'</td><td class="num">'+(a.amount>0?'+':'')+n(a.amount)+(a.reversed?' / 已冲正 '+n(a.reversed):'')+'</td><td>'+esc(a.reason)+'</td><td>'+(!a.originalId?button('受控冲正','reverse',a.id,'text',a.amount===a.reversed):'引用 '+esc(a.originalId))+'</td></tr>')))+
      notice('待核验的账务边界','手续费、币种、退款、失败重试、对账及冲正编辑主体尚未定稿；此页不能替代真实账本验收。','warning');
  }
  function tasksPage() {
    const rows=s.tasks.filter(t=>admin() || t.uid===ui.actor).map(t=>'<tr><td><strong>'+name(t.uid)+'</strong><small>'+gname(t.groupId)+' · '+(t.organizationExit?'移出组织':'仅退出当前组')+'</small></td><td>'+tag(statusNames[t.status],t.status==='REMOVING'?'orange':'green')+'</td><td>'+t.objectCount+' 个关联对象'+(t.targetId?'<small>接收人 '+name(t.targetId)+'</small>':'')+'</td><td><div class="actions">'+button('查看影响','taskDetail',t.id,'text')+button('整体移交并完成','completeRemoval',t.id,'text',!admin()||t.status!=='REMOVING')+button('撤销退组','cancelRemoval',t.id,'text',!admin()||t.organizationExit||t.status!=='REMOVING')+'</div></td></tr>');
    return notice('先失权，后移交','进入 REMOVING 就失去组内身份；期间项目仍留原 Owner，不做部分资产移交。最终完成时再处理责任和授权。')+
      '<div class="bulk-actions">'+button('发起退组','startRemoval',null,'primary',!admin())+button('项目整批迁组','moveProjects',null,'',!admin())+goto('members','添加接收人组关系')+'</div>'+
      section('退组与组织移出任务',rows.length?table(['账号 / 来源组','状态','影响','操作'],rows):empty('尚未发起任务；可先让许念退出增长团队，观察其立即失权和待移交状态。'))+
      section('项目迁组','<div class="step-list"><div>1. 先为账号建立目标组身份</div><div>2. 选择该 Owner 的来源组，预览其全部项目</div><div>3. 迁组但保留来源组身份；目标组外 ACL 仅禁用</div><div>4. 协作者日后加入目标组，恢复未删除的原授权</div></div>'+notice('不是组合并','不会移动其他 Owner 的项目、CRM Assignee 或成员历史消耗；已有支付资金责任不改写。'))+
      notice('实现覆盖还需接收研发证据','精选任务、TikTok Shop 私信等历史对象不能假定已全部接入。分页、重试和最终完成状态仍待 Spec 与研发核验。','warning')+button('审阅移交覆盖与边界','decision','D16','');
  }
  function historyPage() {
    const logs=s.audit.filter(a=>admin() || a.actorId===ui.actor);
    return section('系统通知',s.notifications.length?s.notifications.filter(v=>admin() || v.uid===ui.actor).map(v=>'<div class="setting-row"><div><h2>'+icon('Bell')+' '+esc(v.title)+'</h2><p>'+esc(v.message)+'</p></div>'+tag('已完成','green')+'</div>').join(''):empty('完成移交后，会在这里生成结果通知。'))+
      section('操作记录',logs.length?table(['操作者','动作','结果摘要','时间'],logs.map(a=>'<tr><td>'+esc(a.actorName)+'</td><td>'+esc(actionNames[a.action] || a.action)+'</td><td>'+esc(a.message)+'</td><td>'+new Date(a.at).toLocaleTimeString('zh-CN')+'</td></tr>')):empty('暂无操作。修改策略、配置、协作或额度后会留下模拟记录。'));
  }
  function reviewPage() {
    const done=Object.values(ui.reviews).filter(v=>v==='通过').length;
    const list=D.topics.filter(t=>ui.reviewFilter==='all'||ui.reviewFilter==='pending'&&t.status==='待确认'||ui.reviewFilter==='unread'&&!ui.reviews[t.id]);
    return notice('覆盖不等于定案','原 26 项议题与 10 项补充议题映射到具体页面。待确认部分提供问题和候选入口，不伪造已经闭环的实现。')+
      '<div class="stats">'+stat('审阅议题',D.topics.length,'原 26 项 + 补充 10 项')+stat('待确认决策',D.decisions.length,'跨域问题不重复计为新功能')+stat('已标记通过',done,'仅本次会话的审阅意见')+stat('页面入口',Object.keys(D.pages).length,'组织管理 / 模块 / 评审')+'</div>'+
      '<div class="filterbar"><select id="review-filter" aria-label="覆盖项筛选"><option value="all">全部覆盖项</option><option value="pending" '+(ui.reviewFilter==='pending'?'selected':'')+'>只看规则待确认</option><option value="unread" '+(ui.reviewFilter==='unread'?'selected':'')+'>只看未审阅</option></select><span class="push muted">审阅意见不会修改 Input</span></div>'+
      '<div class="review-list">'+list.map(t=>'<article class="review-item"><div><span class="caption">议题 '+esc(t.id)+'</span> '+tag(t.status,t.status==='待确认'?'orange':t.status==='回归'?'blue':'green')+'<h2>'+esc(t.title)+'</h2><p>'+esc(t.note)+'</p><small>操作检查：'+t.actions.map(esc).join(' → ')+'</small><div class="actions">'+goto(t.page,'到页面试操作')+'</div></div><div class="review-note"><select aria-label="议题 '+t.id+' 审阅状态" data-review="'+t.id+'">'+['未审阅','通过','有疑问','需要调整'].map(v=>'<option '+((ui.reviews[t.id] || '未审阅')===v?'selected':'')+'>'+v+'</option>').join('')+'</select><textarea data-note="'+t.id+'" aria-label="议题 '+t.id+' 审阅意见" placeholder="记录问题或修改意见">'+esc(ui.notes[t.id] || '')+'</textarea></div></article>').join('')+'</div>'+
      section('待确认决策',D.decisions.map(d=>'<div class="decision"><div>'+tag(d.id,'outline')+'<h3>'+esc(d.title)+'</h3><p>'+esc(d.proposal)+'</p></div>'+button('展开并记录','decision',d.id,'')+'</div>').join(''));
  }
  function modulePage() {
    const mod=ui.page;
    const available=s.projects.filter(p=>p.module===mod&&p.groupId===ui.group&&p.status!=='DELETED'&&(E.access(s,ui.actor,p.id).read || mod==='crm'&&lead()&&!p.assigneeId));
    let p=available.find(x=>x.id===ui.project) || available[0];ui.project=p?.id || null;
    return '<div class="tabbar"><button data-tab="objects" class="'+(ui.tab==='objects'?'active':'')+'">'+(mod==='crm'?'合作记录':'项目与协作')+'</button><button data-tab="settings" class="'+(ui.tab==='settings'?'active':'')+'">模块内设置</button>'+(mod==='payment'?'<button data-tab="waiting" class="'+(ui.tab==='waiting'?'active':'')+'">待组长审核 '+s.projects.filter(x=>x.module==='payment'&&x.groupId===ui.group&&x.status==='WAITING_REVIEW').length+'</button>':'')+'</div>'+
      (ui.tab==='settings'?moduleSettings(mod):ui.tab==='waiting'?paymentWaiting():
      '<div class="project-layout"><div class="project-selector">'+(available.length?available.map(x=>'<button data-project="'+x.id+'" class="'+(x.id===p?.id?'active':'')+'"><span>'+icon(mod==='payment'?'CreditCard':mod==='crm'?'Contact':'Folder')+esc(x.name)+'</span><small>'+tag(statusNames[x.status],x.status==='DRAFT'?'orange':'')+(x.ownerId?'负责人 '+name(x.ownerId):'对接人 '+name(x.assigneeId))+'</small></button>').join(''):'<div class="empty">'+icon('LockKeyhole')+'当前账号在该组没有可见对象</div>')+'</div><div class="project-detail">'+(p?objectDetail(p):empty('组织管理身份不自动开放业务对象。',button('切换为样例 Owner','asOwner',mod,'')+'<span class="form-hint">可使用右侧权限探针查看被拦截原因。</span>'))+'</div></div>');
  }
  function objectDetail(p) {
    const r=E.access(s,ui.actor,p.id);
    if(!r.read&&p.module==='crm')return notice('此记录尚无 Assignee','当前 T2 仅可执行同组指派，不因此获得记录全部业务读写。')+button('指派对接人','assignCRM',p.id,'primary',!lead(p.groupId));
    const crm=p.module==='crm',payment=p.module==='payment';
    return '<div class="detail-top"><div><div class="caption">'+moduleNames[p.module]+' · '+gname(p.groupId)+'</div><h2>'+esc(p.name)+'</h2></div>'+tag(r.role==='Viewer'?'同组固定只读':r.role,r.write?'blue':'')+'</div>'+
      '<div class="meta"><span>'+(crm?'Assignee：'+name(p.assigneeId):'Owner：'+name(p.ownerId))+'</span><span>原始创建人：'+name(p.creatorId)+'</span></div>'+
      '<div class="authorizations">'+r.source.map(x=>'<span class="pill">'+icon('ShieldCheck')+esc(x)+'</span>').join('')+'</div>'+
      '<div class="actions">'+button('协作者','collaborators',p.id,'',!r.manage)+(!crm&&!payment?button('转交负责人','transferOwner',p.id,'',!r.transfer):'')+(crm?button('指派对接人','assignCRM',p.id,'',!(lead(p.groupId)||p.assigneeId===ui.actor)):'')+(!payment?button('修改名称','renameProject',p.id,'',!r.write):'')+(!crm&&!payment?button('删除项目','deleteProject',p.id,'danger',!r.delete):'')+'</div>'+
      (crm?notice('CRM 兼容关系待评审','此处展示 Assignee 与协作的目标关系；线上四项写范围与新业务组的映射不能由此 Demo 自动裁决。','warning'):'')+
      (payment?paymentContent(p,r):'<div class="content-sheet"><div class="section-heading"><h3>'+(crm?'合作信息':p.module==='resource'?'收藏的创作者':p.module==='monitor'?'监控内容':'邮件与收件人')+'</h3>'+tag('业务样本','outline')+'</div>'+table(['创作者','渠道','进展'],[['Mia Chen','YouTube',crm?'洽谈中':p.module==='monitor'?'监控中':'已建立联系'],['Alex Rivers','TikTok',p.module==='resource'?'已收藏':'待跟进']].map(v=>'<tr>'+v.map(x=>'<td>'+x+'</td>').join('')+'</tr>'))+(p.module==='email'?'<div class="actions">'+button('发送邮件','sendEmail',p.id,'primary',!r.write)+goto('quota','查看发送额度')+'</div>':'')+'</div>')+
      section('协作关系概览',collaboratorSummary(p));
  }
  function collaboratorSummary(p) {
    const rows=p.collaborators.map(c=>'<tr><td>'+name(c.uid)+'</td><td>'+tag(c.disabled?'组外禁用，保留快照':'显式协作',c.disabled?'orange':'blue')+'</td><td>'+[c.canManage?'管理协作者':'',c.canExecute?'执行支付':''].filter(Boolean).join('、')+'</td></tr>');
    if(s.policies.t2Collaborator)s.users.filter(u=>E.isLead(s,u.id,p.groupId)&&u.id!==p.ownerId&&u.id!==p.assigneeId).forEach(u=>rows.push('<tr><td>'+name(u.id)+'</td><td>'+tag('系统 T2 来源','outline')+'</td><td>普通读写；不可单独删除此来源</td></tr>'));
    return rows.length?table(['成员','来源 / 状态','附加能力'],rows):'<p class="muted">没有显式协作者'+(!s.policies.t2Collaborator?'；组长默认协作策略已关闭。':'。')+'</p>';
  }
  function paymentContent(p,r) {
    const b=E.balances(s,p.groupId,p.ownerId), sensitive=r.write||s.policies.paymentSensitive;
    return '<div class="content-sheet"><div class="section-heading"><h3>付款信息</h3>'+tag(statusNames[p.status],p.status==='DRAFT'||p.status==='WAITING_REVIEW'?'orange':'blue')+'</div><dl class="definition"><dt>支付金额</dt><dd class="num">CNY '+n(p.paymentAmount)+'</dd><dt>收款人</dt><dd>Mia Chen · YouTube '+(sensitive?' / 示例账号 6222 **** 0321':' / 敏感信息已遮蔽')+'</dd><dt>资金承担人 / 组</dt><dd>'+name(p.fundingUid || p.ownerId)+' / '+gname(p.fundingGroupId || p.groupId)+(p.fundingCommitted?' · 已形成占用':'')+'</dd><dt>实际执行人</dt><dd>'+name(p.submitterId)+' · 不替代资金承担人</dd></dl>'+
      (p.status==='DRAFT'?'<div class="actions">'+button('填写草稿','savePayment',p.id,'',!r.write)+button('正式提交','submitPayment',p.id,'primary',!r.execute)+button('预约提交','schedulePayment',p.id,'',!r.execute)+button('删除草稿','deleteDraft',p.id,'danger',!r.delete)+'</div>':'')+
      (['FORMAL','SCHEDULED'].includes(p.status)?'<div class="actions">'+button(p.status==='SCHEDULED'?'模拟到期执行':'手动放行 / 执行','releasePayment',p.id,'primary',!r.execute)+button('取消并释放占用','cancelPayment',p.id,'danger',!r.execute)+'</div>':'')+
      (p.status==='WAITING_REVIEW'?notice('等待组长审核','组长独立审核动作不等于 can_execute_payment；任一有效同组 T2 可放行。','warning')+button('组长审核放行','reviewPayment',p.id,'primary',!lead(p.groupId)):'')+
      (!r.write?notice('正式单同组固定只读','可以查看已允许的字段；不可编辑、提交、执行或管理协作。'):'')+
      '<div class="metric-grid"><div class="metric-item"><small>组织可用</small><strong>'+n(b.orgAvailable)+'</strong></div><div class="metric-item"><small>所属组可用</small><strong>'+n(b.groupRemaining)+'</strong></div><div class="metric-item"><small>Owner 个人剩余</small><strong>'+n(b.memberRemaining)+'</strong></div></div></div>';
  }
  function moduleSettings(mod) {
    if(mod==='payment')return section('当前组支付审核',notice('组级规则，不设组织默认值','此开关在 '+gname(ui.group)+' 内生效。仅模拟立即与定时预审核的状态；系统审核、定时超时、策略变更和真实执行链路仍待收口。','warning')+'<div class="setting-row"><div><h2>支付前需要组长审核放行</h2><p>任一组长放行；到达闸门时实际提交人是同组 T2 则豁免。</p></div>'+toggle('groupPayment',group(ui.group)?.requireT2PaymentRelease,!admin(),'当前组支付审核')+'</div>')+section('频道历史收款人',notice('全组织复用不等于读取来源订单','新建草稿时可按频道检索全组织历史收款人；覆盖、停用与删除治理待确认。')+button('检索并复用收款人','recipient',null,'',!ui.group)+button('讨论收款人治理','decision','D12',''));
    if(mod==='monitor')return section('内容监控标签',notice('区分标签定义和打标签','策略只限制增删改标签定义；标签所属组固定，不随创建人退组漂移。')+labelsTable('monitor'))+goto('policies','设置组织级标签策略');
    if(mod==='crm')return section('CRM 记录权限映射',notice('不凭模块归类猜测旧权限','增量合入需要逐项验证现有读范围、四项写权限与新组关系；不以协作身份自动授予标签删除。','warning')+button('查看 CRM 待确认映射','decision','D09',''))+
      section('组织共享标签 · 独立删除动作',notice('不是项目协作权限','Owner 可删除。Admin 管理范围、T2 独立委派及创建者旧配置未收口；本示例只开放 Owner，其他身份不作默认裁决。','warning')+table(['标签','创建来源','影响范围','操作'],s.labels.filter(l=>l.module==='crm').map(l=>'<tr><td>'+esc(l.name)+'</td><td>'+name(l.creatorId)+' / '+gname(l.groupId)+'</td><td>'+l.affected+' 位创作者 · 模拟</td><td>'+button('删除共享定义','deleteCRMLabel',l.id,'danger',actor().orgRole!=='owner')+'</td></tr>')));
    if(mod==='resource')return notice('收藏夹原有可见性需单独映射','公开、部分可见与协作写权限不是同一概念；跨组公开是否保留须确认，不在本示例中自动放开。','warning')+button('记录收藏夹可见性意见','topic','16','');
    return section('项目级协作',notice('不在模块设置页批量授予所有项目写权限','协作者绑定具体项目；项目内附加能力另行授予。')+button('返回项目操作','objects',null,''));
  }
  function paymentWaiting() {
    const waiting=s.projects.filter(p=>p.module==='payment'&&p.groupId===ui.group&&p.status==='WAITING_REVIEW'&&(lead()||E.access(s,ui.actor,p.id).read));
    return notice('待审核筛选视图','同组组长可处理审核待办；这是独立授权动作，不能扩大成任意支付写权限。')+(waiting.length?table(['支付单','提交人','金额','方式','操作'],waiting.map(p=>'<tr><td>'+esc(p.name)+'</td><td>'+name(p.submitterId)+'</td><td>'+n(p.paymentAmount)+'</td><td>'+(p.scheduled?'预约前预审核':'立即执行')+'</td><td>'+button('审核放行','reviewPayment',p.id,'primary',!lead())+'</td></tr>')):empty('当前组没有待组长审核支付单。'));
  }
  function labelsTable(mod) {
    const labels=s.labels.filter(l=>l.groupId===ui.group&&(!l.module||l.module===mod));
    const can=active(ui.actor,ui.group)&&(mod!=='monitor'||!s.policies.monitorLabelsT2||admin()||lead());
    return button('新增标签','addLabel',mod,'',!can)+table(['标签','创建人','固定归属组','操作'],labels.map(l=>'<tr><td>'+esc(l.name)+'</td><td>'+name(l.creatorId)+'</td><td>'+gname(l.groupId)+'</td><td>'+button('改名','renameLabel',l.id,'text',!can)+button('删除','deleteLabel',l.id,'text',!can)+'</td></tr>'));
  }
  function messagePage() {
    const scope=ui.labelScopes?.[ui.actor] || 'all';
    let labels=s.labels.filter(l=>l.module==='message'||!l.module);
    if(scope==='mine')labels=labels.filter(l=>l.creatorId===ui.actor);
    else if(scope==='group')labels=labels.filter(l=>l.groupId===ui.group);
    return '<div class="tabbar"><button data-tab="labels" class="'+(ui.tab!=='conversation'?'active':'')+'">标签筛选</button><button data-tab="conversation" class="'+(ui.tab==='conversation'?'active':'')+'">会话协作 · 待确认</button></div>'+
      (ui.tab==='conversation'?notice('不是整段项目授权','单会话协作尚需确定根对象、发送身份和组边界；本例不自动开放收件箱。','warning')+button('讨论会话与旧任务协作','decision','D13',''):
      section('标签来源','<div class="filterbar"><select id="label-scope" aria-label="标签创建来源"><option value="mine" '+(scope==='mine'?'selected':'')+'>我创建的</option><option value="group" '+(scope==='group'?'selected':'')+'>当前组成员创建的</option><option value="all" '+(scope==='all'?'selected':'')+'>全部 · 组织共享</option></select>'+button('新增标签','addLabel','message','',!ui.group)+'</div>'+notice('来源筛选不改变标签权限','默认全部，按账号记忆本次会话选择；组来源用固定创建归组，不按创建人当前组反查。消息标签仍全组织可见，不因此获得任何会话权限。')+table(['标签','创建人','创建时组'],labels.map(l=>'<tr><td>'+esc(l.name)+'</td><td>'+name(l.creatorId)+'</td><td>'+gname(l.groupId)+'</td></tr>'))));
  }
  function searchPage() {
    const scope=ui.contactScope || 'team';
    return notice('团队与个人范围','本页仅展示“联系过 / 合作过”范围筛选；不把范围筛选当作联系人明细授权。')+
      '<div class="filterbar"><input id="creator-query" placeholder="搜索创作者" aria-label="搜索创作者"><select id="contact-scope" aria-label="联系合作范围"><option value="mine" '+(scope==='mine'?'selected':'')+'>仅我联系过</option><option value="team" '+(scope==='team'?'selected':'')+'>全团队联系过</option><option value="cooperate" '+(scope==='cooperate'?'selected':'')+'>全团队合作过</option></select>'+button(icon('LockKeyhole')+' 高级筛选','requestEntitlement',null,'')+'</div>'+
      table(['创作者','平台','联系 / 合作来源','操作'],[{name:'Mia Chen',platform:'YouTube',uid:'u-member',cooperated:true},{name:'Alex Rivers',platform:'TikTok',uid:'u-editor',cooperated:false},{name:'Leah Park',platform:'Instagram',uid:'u-member',cooperated:true}].filter(r=>scope==='mine'?r.uid===ui.actor:scope==='cooperate'?r.cooperated:true).map(r=>'<tr class="creator-row" data-query="'+r.name.toLowerCase()+'"><td>'+r.name+'</td><td>'+r.platform+'</td><td>'+name(r.uid)+' · 历史对接人</td><td>'+button('联系 / 获取邮箱','contactCreator',r.name,'text',!ui.group)+'</td></tr>'))+
      section('组织权益不足时',notice('确认开通，不静默扩权','缺少必要模块或套餐权益时，可显式询问有权账号并进入开通流程；不是用配额开关替代权益。')+button('查看开通请求示意','requestEntitlement',null,''));
  }
  const actionNames={invite:'邀请成员',acceptInvite:'接受邀请',cancelInvite:'撤销邀请',addGroup:'创建业务组',renameGroup:'业务组改名',setRole:'修改组身份',setOrgRole:'修改组织身份',transferOrgOwner:'转让组织所有权',setPolicy:'修改组织策略',setGroupPolicy:'修改组支付策略',setQuota:'设置配额',batchIncreaseQuota:'批量增加配额',consume:'业务消耗',addMembership:'加入业务组',removeMembership:'发起退出',cancelRemoval:'撤销退组',completeRemoval:'完成移交',archiveGroup:'冻结归档组',addCollaborator:'添加协作者',removeCollaborator:'移除协作者',setCapability:'调整附加能力',transferOwner:'项目负责人转交',assignCRM:'指派 CRM 对接人',moveProjects:'项目迁组',allocateFunds:'追加部门资金',reverseFunds:'受控资金冲正',setPaymentLimit:'设置个人支付上限',savePayment:'保存支付草稿',submitPayment:'正式提交支付',cancelPayment:'取消支付',deleteDraft:'删除草稿',releasePayment:'支付者放行',reviewPayment:'组长审核',createProject:'新建项目',addLabel:'创建标签',renameLabel:'标签改名',deleteLabel:'删除标签',renameProject:'修改项目名称',deleteProject:'删除项目'};
  let submitDialog=null;
  function dialog(title,body,onSubmit,label) {
    const d=$('#dialog');
    submitDialog=onSubmit || null;
    d.innerHTML='<form id="dialog-form"><div class="dialog-head"><h2 id="dialog-title">'+title+'</h2><button type="button" class="btn icon" data-action="close" aria-label="关闭弹窗" title="关闭">'+icon('X')+'</button></div><div class="dialog-body">'+body+'<p id="form-error" class="form-error" role="alert"></p></div><div class="dialog-foot"><button type="button" class="btn" data-action="close">'+(onSubmit?'取消':'关闭')+'</button>'+(onSubmit?'<button class="btn primary" type="submit">'+(label || '确认保存')+'</button>':'')+'</div></form>';
    d.querySelectorAll('.form-field').forEach((f,i)=>{const control=f.querySelector('input,select,textarea'),l=f.querySelector('label');if(control&&l){control.id='dialog-field-'+i;l.htmlFor=control.id;}});
    if(!d.open)d.showModal();
  }
  function confirmAction(title,body,type,payload,label) { dialog(title,body,()=>perform(type,payload,true),label || '确认执行'); }
  function quotaForm(uid,gid) {
    const g=group(gid),m=member(uid,gid);
    if(!g || !m)return toast('该账号没有当前组身份',false);
    dialog('设置 '+name(uid)+' 的组内配额',notice('只影响 '+gname(gid)+' 的这条成员关系','inherit 不追加个人上限，仍受组和组织约束；0 与不限制不是同一含义。')+'<div class="formgrid">'+field('限制方式',select('mode','<option value="inherit" '+(m.quotaMode==='inherit'?'selected':'')+'>不追加个人上限（inherit）</option><option value="capped" '+(m.quotaMode==='capped'?'selected':'')+'>设置个人上限（capped）</option>'))+field('个人上限 · 仅 capped 生效',inp('limit',m.quotaLimit,'number','min="0" max="'+g.quotaLimit+'" required'))+'</div><p class="form-hint">组上限 '+n(g.quotaLimit)+'；个人已用 '+n(m.used)+'。低于已用量时剩余为 0，不回滚历史。</p>',v=>perform('setQuota',{uid,groupId:gid,mode:v.mode,limit:Number(v.limit)},true));
  }
  function membershipsDialog(uid,gid) {
    const u=user(uid);if(!u)return;
    const rows=u.memberships.filter(m=>m.status!=='REMOVED').map(m=>'<tr><td>'+gname(m.groupId)+'</td><td>'+tag(m.role)+'</td><td>'+tag(statusNames[m.status],m.status==='ACTIVE'?'green':'orange')+'</td><td><div class="actions">'+button(m.role==='T2'?'设为 T3':'设为 T2','setRole',uid+'|'+m.groupId+'|'+(m.role==='T2'?'T3':'T2'),'text',!admin()||m.status!=='ACTIVE')+button('配额','memberQuota',uid+'|'+m.groupId,'text',!admin()&&!(lead(m.groupId)&&s.policies.t2Quota))+button('退组','removeMembership',uid+'|'+m.groupId,'text',!admin()||m.status!=='ACTIVE')+'</div></td></tr>');
    dialog(name(uid)+' · 组关系',notice('每条组关系独立','多组身份不会复制组织身份；改为 T2 可能因组织策略动态获得项目协作权限。')+table(['业务组','身份','状态','操作'],rows)+'<hr><div class="formgrid">'+field('加入目标组',select('groupId',options(s.groups.filter(g=>g.status==='ACTIVE'&&!member(uid,g.id)),gid)))+field('组内身份',select('role','<option value="T3">T3 · 组成员</option><option value="T2">T2 · 组长</option>'))+'</div><p class="form-hint">新增组关系默认不追加个人上限。加入目标组时，原被禁用且未删除的 ACL 将恢复。</p>',admin()?v=>perform('addMembership',{uid,groupId:v.groupId,role:v.role},true):null,'加入业务组');
  }
  function collaboratorsDialog(pid) {
    const p=E.project(s,pid),r=E.access(s,ui.actor,pid);
    if(!p || !r.manage)return toast('没有管理协作者权限',false);
    const choices=s.users.filter(u=>active(u.id,p.groupId)&&u.id!==p.ownerId&&u.id!==p.assigneeId&&!p.collaborators.some(c=>c.uid===u.id));
    const body=notice('授权绑定对象，不绑定 Owner','常规读写一体授予；附加能力独立，不允许被授权协作者继续转授。被禁用关系不生效，加入目标组后恢复。')+
      table(['成员','状态','管理协作者','执行支付','操作'],p.collaborators.map(c=>'<tr><td>'+name(c.uid)+'</td><td>'+tag(c.disabled?'组外禁用':'生效',c.disabled?'orange':'green')+'</td><td><label class="inline-check"><input type="checkbox" data-capability="canManage" data-project="'+pid+'" data-uid="'+c.uid+'" '+(c.canManage?'checked ':'')+(!r.grant||c.disabled?'disabled ':'')+'aria-label="'+name(c.uid)+' 管理协作者">授权</label></td><td>'+(p.module==='payment'?'<label class="inline-check"><input type="checkbox" data-capability="canExecute" data-project="'+pid+'" data-uid="'+c.uid+'" '+(c.canExecute?'checked ':'')+(!r.grant||c.disabled?'disabled ':'')+'aria-label="'+name(c.uid)+' 执行支付">授权</label>':'—')+'</td><td>'+button('移除','removeCollaborator',pid+'|'+c.uid,'text')+'</td></tr>'))+
      (s.policies.t2Collaborator?notice('系统 T2 来源','组长默认协作随组织策略动态生效，不作为可删除的普通显式 ACL。'):'')+
      '<div class="formgrid">'+field('搜索同组候选人',inp('collaboratorQuery','','search','data-collab-search placeholder="昵称或邮箱"'),true)+field('添加同组协作者',select('uid',options(choices,'',u=>u.name+' · '+u.email)),true)+'</div><p class="form-hint">只有对象所属组的 ACTIVE 账号可选。没有候选人时，可先让其加入该组。</p>';
    dialog('管理协作者 · '+esc(p.name),body,choices.length?v=>perform('addCollaborator',{projectId:pid,uid:v.uid},true):null,'添加协作者');
  }
  function decisionDialog(id) {
    const d=D.decisions.find(x=>x.id===id);if(!d)return;
    dialog(tag(id,'orange')+' '+esc(d.title),'<div class="audit-box"><h3>原规则 / 当前基线</h3><p>'+esc(d.baseline)+'</p><h3>本版待讨论</h3><p>'+esc(d.proposal)+'</p><h3>影响与保护边界</h3><p>'+esc(d.impact)+'</p></div><div class="formgrid">'+field('本次审阅意见','<textarea name="note" rows="4" placeholder="记录倾向、问题或约束">'+esc(ui.notes[id] || '')+'</textarea>',true)+'</div><p class="form-hint">只记录意见；不更改 Input 或将待定规则批准为产品方案。</p>',v=>{ui.notes[id]=v.note;$('#dialog').close();toast('已记录本次会话意见，可从审阅页导出');},'记录意见');
  }
  function actClick(action,id) {
    const [uid,gid,role]=(id || '').split('|');
    if(action==='close')return $('#dialog').close();
    if(action==='review')return navigate('review');
    if(action==='objects'){ui.tab='objects';return render();}
    if(action==='reset')return dialog('重置全部模拟数据',notice('本次操作和审阅意见将清空','可先从功能审阅页导出意见；重置不会影响任何真实系统。','warning'),()=>{s=E.createState();Object.assign(ui,{actor:'u-owner',group:'g-growth',project:null,tab:'objects',reviews:{},notes:{},lastResult:null,probe:null,quotaGroup:null,dashboardUser:'all',dashboardGroup:'all',period:'2026-10',metric:'sent',usageHealth:'normal',reviewFilter:'all',showArchived:false,labelScopes:{},contactScope:'team'});$('#dialog').close();render();toast('模拟数据已重置');},'重置');
    if(action==='decision')return decisionDialog(id);
    if(action==='topic'){const t=D.topics.find(x=>x.id===id);return dialog(esc(t?.title || '记录意见'),'<textarea name="note" rows="4" aria-label="审阅意见">'+esc(ui.notes[id] || '')+'</textarea>',v=>{ui.notes[id]=v.note;$('#dialog').close();toast('意见已记录');},'记录意见');}
    if(action==='exportReview')return download('账号权限-审阅意见.json',JSON.stringify({type:'standalone-input-review',source:'phase2_input_v0.md',createdAt:new Date().toISOString(),reviews:ui.reviews,notes:ui.notes,pendingDecisions:D.decisions,simulationAudit:s.audit},null,2));
    if(action==='exportUsage')return download('使用情况-模拟数据.csv','\ufeff账号,业务组,统计月,邮件发送,邮件打开,回复,合作完成,寄样,新建监控\n'+usageRows().map(r=>[user(r.uid)?.name,group(r.groupId)?.name,ui.period,r.sent,r.opened,r.replied,r.cooperate,r.samples,r.monitor].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv;charset=utf-8');
    if(action==='invite')return dialog('邀请组织成员',notice('邀请路径为评审假设','暂用 Owner/Admin 选择首组 + 显式配额表单，便于走通邀请闭环；首组是否取消仍待会议意见收口。','warning')+'<div class="formgrid">'+field('成员昵称',inp('name','','text','required placeholder="例如：陆遥"'))+field('邀请邮箱',inp('email','','email','required placeholder="lu@example.com"'))+field('目标业务组 · 候选流程',select('groupId',options(s.groups.filter(g=>g.status==='ACTIVE'),ui.group)))+field('初始组身份',inp('fixedRole','T3 · 组成员','text','disabled'))+field('配额方式',select('quotaMode','<option value="inherit">不追加个人上限</option><option value="capped">设置个人上限</option>'))+field('配额上限 · 仅 capped 生效',inp('quotaLimit',0,'number','required min="0"'))+'</div><p class="form-hint">待接受邀请计入席位；接受时再次检查目标组、席位与配额。不会发送真实邮件。</p>',v=>perform('invite',{...v,quotaLimit:Number(v.quotaLimit)},true),'发送模拟邀请');
    if(action==='acceptInvite'||action==='cancelInvite')return perform(action,{inviteId:id});
    if(action==='addGroup')return dialog('创建业务组',field('组名称',inp('name','','text','required maxlength="30"'),true)+notice('允许先建空组','无需提前指定组长；成员及 T2 可在建组后分配。'),v=>perform('addGroup',v,true),'创建空组');
    if(action==='renameGroup')return dialog('业务组改名',field('组名称',inp('name',group(id).name,'text','required maxlength="30"'),true),v=>perform('renameGroup',{groupId:id,name:v.name},true));
    if(action==='groupMembers')return dialog(gname(id)+' · 分配成员',table(['成员','身份','操作'],s.users.filter(u=>member(u.id,id)).map(u=>'<tr><td>'+name(u.id)+'</td><td>'+tag(member(u.id,id).role)+' '+tag(statusNames[member(u.id,id).status])+'</td><td>'+button('维护组关系','membership',u.id,'text')+'</td></tr>'))+'<div class="formgrid">'+field('新增组成员',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'&&!member(u.id,id)),'')))+field('组内身份',select('role','<option value="T3">T3 · 组成员</option><option value="T2">T2 · 组长</option>'))+'</div>',v=>perform('addMembership',{groupId:id,...v},true),'加入当前组');
    if(action==='membership')return membershipsDialog(uid);
    if(action==='setRole'){const r=perform('setRole',{uid,groupId:gid,role});if(r.ok)membershipsDialog(uid);return;}
    if(action==='memberQuota')return quotaForm(uid,gid || ui.quotaGroup || (member(uid,ui.group)?ui.group:user(uid)?.memberships.find(m=>m.status==='ACTIVE')?.groupId));
    if(action==='orgRole')return dialog('组织身份 · '+name(id),notice('管理身份不改变业务身份','任免 Admin 不会改变 T2/T3、项目 Owner 或显式 ACL；管理范围仍待确认。','warning')+field('组织身份',select('orgRole','<option value="member" '+(user(id).orgRole==='member'?'selected':'')+'>普通成员</option><option value="admin" '+(user(id).orgRole==='admin'?'selected':'')+'>组织 Admin</option>'),true),v=>perform('setOrgRole',{uid:id,...v},true));
    if(action==='transferOrgOwner')return dialog('转让组织所有权',notice('唯一组织 Owner 发生变更','当前 Owner 变为 Admin；双方组关系和业务对象身份不变。','warning')+field('新组织 Owner',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'&&u.id!==ui.actor),'')),true),v=>perform('transferOrgOwner',v,true),'确认转让');
    if(action==='archiveGroup')return confirmAction('冻结归档 '+gname(id),notice('不彻底删除','组内 '+s.projects.filter(p=>p.groupId===id).length+' 个对象与历史成员关系保留；新业务冻结，既有资金承诺不取消。解除归档仍待确认。','warning'),'archiveGroup',{groupId:id},'确认冻结归档');
    if(action==='groupQuota')return dialog('设置 '+gname(id)+' 上限',field('组限制方式',select('mode','<option value="capped" '+(group(id).quotaMode!=='inherit'?'selected':'')+'>设置组上限（capped）</option><option value="inherit" '+(group(id).quotaMode==='inherit'?'selected':'')+'>不追加组上限（inherit）</option>'),true)+field('组邮件配额上限 · 仅 capped 生效',inp('limit',group(id).quotaLimit,'number','min="0" max="'+s.organization.quotaLimit+'" required'),true)+notice('不按兄弟组预占','inherit 仍受组织限制；单组上限不超过组织，多组上限合计可以超配，实际消耗逐层拦截。'),v=>perform('setQuota',{groupId:id,mode:v.mode,limit:Number(v.limit)},true));
    if(action==='batchQuota')return dialog('批量增加 capped 成员上限',notice('整批校验后执行','只增加选中的 capped 成员，跳过 inherit。任何一项超过组上限则整批不执行。')+s.users.filter(u=>active(u.id,id)).map(u=>'<label class="inline-check"><input type="checkbox" name="uids" value="'+u.id+'" checked>'+name(u.id)+' · '+(member(u.id,id).quotaMode==='inherit'?'inherit 将跳过':'上限 '+n(member(u.id,id).quotaLimit))+'</label>').join('')+field('每人增加',inp('amount',100,'number','min="1" required'),true)+'<div id="batch-preview" class="audit-box">修改增量或成员，预览增加后的值；共享额度成员将跳过。</div>',v=>perform('batchIncreaseQuota',{groupId:id,amount:Number(v.amount),uids:new FormData($('#dialog-form')).getAll('uids')},true),'批量增加');
    if(action==='consume')return dialog('当前账号消耗邮件额度',notice(name(ui.actor)+' / '+gname(id),'仅验证额度链；实际项目发送还需对象写权限。')+field('模拟消耗量',inp('amount',50,'number','min="1" required'),true),v=>perform('consume',{groupId:id,amount:Number(v.amount)},true),'模拟消耗');
    if(action==='allocate')return dialog('追加 '+gname(id)+' 部门资金',notice('正常分配只增不减','当前组织未分配共享余额 '+n(E.balances(s,id,ui.actor).unallocated)+' CNY；每笔追加独立留痕。')+'<div class="formgrid">'+field('追加金额 CNY',inp('amount',1000,'number','min="0.01" step="0.01" required'))+field('分配原因',inp('reason','','text','required placeholder="例如：十月预算追加"'))+'</div>',v=>perform('allocateFunds',{groupId:id,amount:Number(v.amount),reason:v.reason},true),'追加并记录');
    if(action==='reverse'){const a=s.allocations.find(x=>x.id===id);return dialog('受控冲正 · '+esc(id),notice('原记录保留，新增负向记录','不能冲正已使用或已占用金额。此敏感动作的实际操作者范围待评审。','warning')+'<div class="formgrid">'+field('冲正金额 CNY',inp('amount',100,'number','min="0.01" step="0.01" required'))+field('冲正原因',inp('reason','','text','required'))+'</div><p class="form-hint">原金额 '+n(a.amount)+'；已冲正 '+n(a.reversed)+'。</p>',v=>perform('reverseFunds',{allocationId:id,amount:Number(v.amount),reason:v.reason},true),'确认冲正');}
    if(action==='accountFunds')return dialog(gname(id)+' · 账号支付上限',table(['账号','个人上限','已用 / 占用','操作'],s.users.filter(u=>active(u.id,id)).map(u=>{const m=member(u.id,id);return '<tr><td>'+name(u.id)+'</td><td>'+n(m.paymentLimit)+'</td><td>'+n(m.paymentUsed)+' / '+n(m.paymentPending)+'</td><td>'+button('设置','setPaymentLimit',u.id+'|'+id,'text')+'</td></tr>';})));
    if(action==='setPaymentLimit')return dialog('个人支付上限 · '+name(uid),notice('执行人额度不替代承担人额度','此处是 '+gname(gid)+' 的组成员个人上限；正式提交时使用支付 Owner 的额度。')+field('限制方式',select('mode','<option value="inherit">不追加个人上限</option><option value="capped">设置个人上限</option>'),true)+field('个人累计上限 CNY',inp('limit',member(uid,gid).paymentLimit || 0,'number','min="0" required'),true),v=>perform('setPaymentLimit',{uid,groupId:gid,limit:v.mode==='inherit'?null:Number(v.limit)},true));
    if(action==='startRemoval')return dialog('发起退出业务组',notice('立即失权，不立即移交','仅退出业务组可撤销；不能撤销组织移出。请在后续任务中选择接收人。','warning')+'<div class="formgrid">'+field('退出账号',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'),'')))+field('来源组',select('groupId',options(s.groups.filter(g=>g.status==='ACTIVE'),ui.group)))+'</div>',v=>perform('removeMembership',v,true),'进入 REMOVING');
    if(action==='removeMembership')return confirmAction('让 '+name(uid)+' 退出 '+gname(gid),notice('立即失权，资产暂不移动','此动作建立待移交任务，可暂不指定接收人；仅退组时可撤销。','warning'),'removeMembership',{uid,groupId:gid},'确认退组');
    if(action==='organizationExit'){const u=user(id);return confirmAction('将 '+name(id)+' 移出组织',notice('全组织立即失权且不可撤销','其全部有效组关系进入 REMOVING，按组处理移交；全部完成后组织成员状态转为 REMOVED。','warning'),'removeMembership',{uid:id,groupId:u.memberships.find(m=>m.status==='ACTIVE'||m.status==='REMOVING')?.groupId,organizationExit:true},'确认移出组织');}
    if(action==='cancelRemoval')return confirmAction('撤销退组',notice('尚未发生资产移交','恢复原组身份，不执行逆向项目迁移。'),'cancelRemoval',{taskId:id},'确认撤销');
    if(action==='taskDetail'||action==='completeRemoval'){
      const t=s.tasks.find(x=>x.id===id),objects=s.projects.filter(p=>p.groupId===t.groupId&&(p.ownerId===t.uid||p.assigneeId===t.uid||p.collaborators.some(c=>c.uid===t.uid)));
      return dialog(action==='completeRemoval'?'整体移交并完成退出':'移交影响摘要',notice(name(t.uid)+' · '+gname(t.groupId),t.organizationExit?'组织退出不可撤销。':'仅退组可在完成前撤销。')+table(['对象','当前责任','最终处理'],objects.map(p=>'<tr><td>'+esc(p.name)+'</td><td>'+(p.ownerId===t.uid?'Owner':p.assigneeId===t.uid?'Assignee':'Collaborator')+'</td><td>'+(p.ownerId===t.uid?'转给同组单一接收人':p.assigneeId===t.uid?'转给接收人或未分配':'移除其显式协作')+'</td></tr>'))+notice('保留历史责任','业务组、原创建者、用量与既有资金承担快照不改写。真实任务分页/失败重试不在本地模拟执行。')+(action==='completeRemoval'?field('同组单一接收人',select('targetId','<option value="">暂不指定 · 仅无 Owner 对象时可完成</option>'+uoptions(t.groupId,'',t.uid)),true):''),action==='completeRemoval'?v=>perform('completeRemoval',{taskId:id,targetId:v.targetId || null},true):null,'移交并完成');
    }
    if(action==='moveProjects')return dialog('指定 Owner 名下项目整批迁组',notice('先加入目标组，迁移不触碰其他 Owner','本次仅移动来源组里该 Owner 的所有项目；保留原组身份。CRM 不是项目 Owner 模型。','warning')+'<div class="formgrid">'+field('项目 Owner',select('uid',options(s.users.filter(u=>u.status==='ACTIVE'),'u-member')))+field('来源组',select('sourceGroupId',options(s.groups,ui.group)))+field('目标组',select('targetGroupId',options(s.groups.filter(g=>g.status==='ACTIVE'),'g-brand')))+'</div><div id="move-preview" class="audit-box">目标组外 ACL 禁用但不删除；保留附加能力快照。已有支付资金责任不随迁组改写。</div>',v=>perform('moveProjects',v,true),'确认整批迁组');
    if(action==='asOwner'){ui.actor=id==='resource'?'u-editor':'u-member';ui.group='g-growth';ui.project=null;return render();}
    if(action==='createProject')return dialog('新建'+(id==='payment'?'支付草稿':moduleNames[id]),notice('归属当前组 '+gname(ui.group),'当前账号成为 Owner，CRM 则使用 Assignee。创建后组归属不随日常切换改变。')+field('名称',inp('name','','text','required maxlength="60"'),true),v=>{const r=perform('createProject',{...v,module:id,groupId:ui.group},true);if(r.ok){ui.project=r.projectId;ui.tab='objects';render();}},'创建');
    if(action==='collaborators')return collaboratorsDialog(id);
    if(action==='removeCollaborator')return confirmAction('移除显式协作者',notice('删除后不自动恢复','如果该授权当前为组外禁用，永久删除后，成员再次入组也不会恢复此条 ACL。其他独立系统来源不受影响。','warning'),'removeCollaborator',{projectId:uid,uid:gid},'确认移除');
    if(action==='transferOwner'){
      const p=E.project(s,id);return dialog('同组转交项目负责人',notice('最小动作转交','新 Owner 的重复协作记录清理；原 Owner 不自动保留协作者。保留协作者快捷勾选仍为会议裁剪待定项。','warning')+field('新 Owner',select('targetId',uoptions(p.groupId,'',p.ownerId)),true),v=>perform('transferOwner',{projectId:id,...v},true),'确认转交');
    }
    if(action==='assignCRM'){const p=E.project(s,id);return dialog('指派 CRM 对接人',notice('不建立项目 Owner','当前 Assignee 或同组 T2 可指派给其他同组有效成员，普通协作者不能反向改派。')+field('新 Assignee',select('targetId',uoptions(p.groupId,'',p.assigneeId)),true),v=>perform('assignCRM',{projectId:id,...v},true),'确认指派');}
    if(action==='renameProject'){const p=E.project(s,id);return dialog('修改对象名称',field('名称',inp('name',p.name,'text','required'),true),v=>perform('renameProject',{projectId:id,...v},true));}
    if(action==='deleteProject')return confirmAction('删除项目',notice('仅本地模拟','仅 Owner 可删除此项目；隐式 T2 普通协作不包含删除能力。','warning'),'deleteProject',{projectId:id},'确认删除');
    if(action==='sendEmail'){const p=E.project(s,id);if(!E.access(s,ui.actor,id).write)return toast('没有项目写权限',false);return dialog('发送邮件 · '+esc(p.name),notice('使用执行账号额度','需同时拥有项目写权限及该组的实际可用额度；Owner 不是普通邮件消费的替代承担人。')+field('发送数量',inp('amount',10,'number','min="1" required'),true),v=>perform('consume',{groupId:p.groupId,amount:Number(v.amount)},true),'模拟发送');}
    if(action==='savePayment'){const p=E.project(s,id);return dialog('填写支付草稿',notice('协作者可填写，执行能力另算','没有 can_execute_payment 也可以保存草稿，不产生资金占用。')+field('金额 CNY',inp('amount',p.paymentAmount,'number','min="0.01" step="0.01" required'),true)+field('收款人','<select name="recipient"><option>Mia Chen · 已复用的组织历史记录</option></select>',true)+button('按频道检索历史收款人','recipient',null,''),v=>perform('savePayment',{projectId:id,amount:Number(v.amount)},true),'保存草稿');}
    if(action==='submitPayment'||action==='schedulePayment'){const p=E.project(s,id);return dialog(action==='schedulePayment'?'预约提交支付':'正式提交支付',notice('即刻占用 Owner 个人与组额度','本例省略真实系统审核过程。组审核策略会影响后续闸门；当前金额 '+n(p.paymentAmount)+' CNY。','warning')+(action==='schedulePayment'?field('预约时点 · 示意',inp('when','2026-10-30T10:00','datetime-local','required'),true):''),v=>perform('submitPayment',{projectId:id,scheduled:action==='schedulePayment',when:v.when},true),'确认并占用');}
    if(['deleteDraft','cancelPayment','releasePayment','reviewPayment'].includes(action))return confirmAction(actionNames[action],notice('虚构支付，非真实执行','组长审核不改变 fundingUid/fundingGroupId。定时样本审核通过仅回到预约中；“模拟到期执行”明确模拟时钟到达。','warning'),action,{projectId:id},'确认模拟');
    if(action==='recipient')return dialog('按频道复用组织历史收款人',notice('仅展示匹配频道的示例','复用不开放来源支付单明细；历史收款信息治理仍待确认。')+field('频道',select('channel','<option value="mia">Mia Chen · YouTube</option><option value="alex">Alex Rivers · TikTok</option>'),true)+'<div id="recipient-result" class="audit-box"><strong>Mia Chen</strong><p>示例账号 6222 **** 0321 · 来源：品牌团队历史记录</p></div>',()=>{$('#dialog').close();toast('已选用该频道的示例收款人；没有读取来源支付单');},'选用此记录');
    if(action==='addLabel')return dialog('新增标签定义',notice(gname(ui.group)+' · '+(id==='monitor'?'内容监控':'消息中心'),'标签归属记录创建时组，不随创建人转组变化。')+field('标签名称',inp('name','','text','required maxlength="24"'),true),v=>perform('addLabel',{...v,module:id,groupId:ui.group},true),'创建标签');
    if(action==='renameLabel'){const l=s.labels.find(x=>x.id===id);return dialog('标签改名',field('标签名称',inp('name',l.name,'text','required maxlength="24"'),true),v=>perform('renameLabel',{labelId:id,...v},true));}
    if(action==='deleteLabel')return confirmAction('删除标签定义',notice('影响当前组标签','本示例只删除虚构标签，不连接真实业务；标签应用的数据处理需模块矩阵明确。','warning'),'deleteLabel',{labelId:id},'确认删除');
    if(action==='deleteCRMLabel'){const l=s.labels.find(x=>x.id===id);return confirmAction('删除 CRM 组织共享标签',notice('影响 '+l.affected+' 位创作者（示例）','删除共享定义不是从当前记录移除标签。所有被应用处都会受影响；此操作不由普通记录写权限推导。','warning'),'deleteCRMLabel',{labelId:id},'确认删除共享定义');}
    if(action==='contactCreator')return dialog('联系 '+esc(id),notice('获取联系信息需组织权益与额度','这里只说明筛选后的动作边界；不获取真实邮箱、不发送真实消息。')+goto('quota','查看资源配额'));
    if(action==='requestEntitlement')return dialog('申请开通必要权益',notice('显式请求，非静默开通','本地示意向组织管理员发出请求，实际购买、升级和配额发放仍使用现有业务流程。')+field('开通原因','<textarea name="reason" rows="3" required></textarea>',true),v=>{s.notifications.push({title:'开通权益申请 · '+actor().name,message:v.reason,uid:s.users.find(u=>u.orgRole==='owner').id});$('#dialog').close();render();toast('已生成模拟申请通知，未开通任何真实权益');},'发送模拟请求');
    toast('此问题保留在审阅清单，尚未定义为可执行规则',false);
  }
  document.addEventListener('click',e=>{
    const el=e.target.closest('button');if(!el||el.disabled)return;
    if(el.dataset.page){if($('#dialog').open)$('#dialog').close();return navigate(el.dataset.page);}
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
    if(el.id==='actor-select'){ui.actor=el.value;ui.project=null;ui.probe=null;ui.dashboardGroup='all';ui.dashboardUser='all';ui.quotaGroup=null;return render();}
    if(el.id==='group-select'){ui.group=el.value;ui.project=null;ui.probe=null;ui.quotaGroup=null;return render();}
    if(el.id==='usage-group'){ui.dashboardGroup=el.value;ui.dashboardUser='all';return render();}
    if(el.id==='usage-user'){ui.dashboardUser=el.value;return render();}
    if(el.id==='usage-period'){ui.period=el.value;return render();}
    if(el.id==='usage-health'){ui.usageHealth=el.value;return render();}
    if(el.id==='quota-group'){ui.quotaGroup=el.value;return render();}
    if(el.id==='review-filter'){ui.reviewFilter=el.value;return render();}
    if(el.id==='archived-toggle'){ui.showArchived=el.checked;return render();}
    if(el.id==='probe-project'){ui.probe=el.value;$('#probe-result').innerHTML=el.value?probeResult(el.value):'请选择虚构样本';return;}
    if(el.id==='label-scope'){ui.labelScopes=ui.labelScopes||{};ui.labelScopes[ui.actor]=el.value;return render();}
    if(el.id==='contact-scope'){ui.contactScope=el.value;return render();}
    if(el.id==='quota-scope'){$('#scope-detail').hidden=el.value!=='email';if(el.value!=='email')toast(el.value==='window'?'搜索频率属于不可分配 Scope，按组织窗口限制，不展示虚构个人余额。':'功能权益来自组织套餐；不新增组模块禁用开关。');return;}
    if(el.id==='member-group'){filterMembers();return;}
    if(el.name==='channel'){$('#recipient-result').innerHTML=el.value==='mia'?'<strong>Mia Chen</strong><p>示例账号 6222 **** 0321 · 来源：品牌团队历史记录</p>':'<strong>Alex Rivers</strong><p>示例账号 6222 **** 0712 · 来源：增长团队历史记录</p>';return;}
    if(el.dataset.review){ui.reviews[el.dataset.review]=el.value;return render();}
    if(el.dataset.capability){const pid=el.dataset.project;perform('setCapability',{projectId:pid,uid:el.dataset.uid,capability:el.dataset.capability,value:el.checked});return collaboratorsDialog(pid);}
    if(el.dataset.policy){const key=el.dataset.policy,value=el.checked;render();return dialog('确认策略影响',notice('现有对象可能立即受影响',key==='t2Collaborator'?'开启将给同组有效 T2 增加普通读写来源；关闭只撤销此来源，不删除显式授权。':'配置主体和影响范围请结合右侧规则审阅。','warning')+'<p>本次：'+(value?'开启':'关闭')+'；操作人：'+name(ui.actor)+'</p>',()=>perform(key==='groupPayment'?'setGroupPolicy':'setPolicy',key==='groupPayment'?{groupId:ui.group,key:'requireT2PaymentRelease',value}:{key,value},true),'确认修改');}
  });
  document.addEventListener('input',e=>{
    const el=e.target;
    if(el.hasAttribute('data-collab-search')){const picker=$('#dialog select[name=uid]');const opts=[...picker.options];opts.forEach(o=>{o.hidden=!o.textContent.toLowerCase().includes(el.value.toLowerCase());o.disabled=o.hidden;});picker.value=opts.find(o=>!o.hidden)?.value || '';return;}
    if(el.dataset.note){ui.notes[el.dataset.note]=el.value;return;}
    if(el.dataset.search){filterMembers();}
    if(el.id==='creator-query')document.querySelectorAll('.creator-row').forEach(row=>row.hidden=!row.dataset.query.includes(el.value.toLowerCase()));
    const form=$('#dialog-form');
    if($('#batch-preview')&&form){const data=new FormData(form),g=group(ui.quotaGroup||ui.group),amount=Number(data.get('amount')),ids=data.getAll('uids');const items=s.users.filter(u=>ids.includes(u.id)).flatMap(u=>u.memberships.filter(m=>m.groupId===g.id&&m.status==='ACTIVE').map(m=>({u,m})));$('#batch-preview').innerHTML=items.map(({u,m})=>'<p>'+name(u.id)+'：'+(m.quotaMode==='inherit'?'跳过 inherit':n(m.quotaLimit)+' → '+n(m.quotaLimit+amount)+(m.quotaLimit+amount>g.quotaLimit?' · 超过组上限，整批将拦截':''))+'</p>').join('') || '未选择成员';}
  });
  function filterMembers(){const query=$('[data-search="member-row"]')?.value.toLowerCase() || '',gid=$('#member-group')?.value || 'all';document.querySelectorAll('.member-row').forEach(row=>row.hidden=!row.dataset.query.toLowerCase().includes(query)||(gid!=='all'&&!row.dataset.groups.split(',').includes(gid)));}
  render();
})();
