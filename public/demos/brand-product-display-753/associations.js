/* P03 review-only: one relation fixture, two presentation strengths; no production API. */
(() => {
  'use strict';
  const D=window.ChannelReviewData;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon=name=>window.ChannelReviewIcons[name]||'';
  const videos=new Map();
  let activeTab='brand',unavailable=false;
  const fixtures=window.ProductReviewData.associationVideos;
  const productBrand=Object.fromEntries(D.products.map(p=>[p.id,p.brandId]));
  const findBrand=id=>D.brands.find(b=>b.id===id);
  const href=(type,id)=>type==='product'?window.ProductReviewData.detailHref(id):'./destination.html?type='+type+'&id='+encodeURIComponent(id);
  function brandsMarkup(v,context='') {
    return '<div class="assoc-brand-list">'+v.brands.map(id=>{const b=findBrand(id);return '<a class="assoc-brand-chip" href="'+href('brand',id)+'" target="_blank" rel="noopener"><img src="./assets/brand-placeholder.png" alt=""><span>'+esc(b.name)+'</span>'+(context===id?'<small>当前品牌</small>':'')+'</a>';}).join('')+'</div>';
  }
  function productRow(id) {
    const p=D.products.find(p=>p.id===id),b=findBrand(productBrand[id]);
    return '<div class="assoc-product-row channel-product-row" data-product-card data-action="productVideos" data-id="'+p.id+'" tabindex="0" aria-haspopup="dialog" aria-label="查看'+esc(p.name)+'的本频道关联视频"><span class="assoc-product-image"><img src="'+p.image+'" alt=""></span><div class="assoc-product-copy"><a class="assoc-product-title" href="'+href('product',p.id)+'" target="_blank" rel="noopener" title="'+esc(p.name)+'">'+esc(p.name)+'</a><small class="assoc-product-brand">品牌：'+esc(b.name)+'</small><span class="online-product-category" title="'+esc(p.category)+'">'+esc(p.category)+'</span><p class="online-product-price">'+esc(p.price)+'</p></div></div>';
  }
  function carousel(v,index=0,key='') {
    return '<div class="assoc-carousel" data-carousel="'+esc(key)+'" data-video="'+v.id+'" data-index="'+index+'">'+productRow(v.products[index])+'<div class="assoc-carousel-controls"><button data-assoc="prev" aria-label="上一件商品" '+(v.products.length<2?'disabled':'')+'>‹</button><span aria-live="polite"><strong>'+(index+1)+'</strong> / '+v.products.length+' 件商品</span><button data-assoc="next" aria-label="下一件商品" '+(v.products.length<2?'disabled':'')+'>›</button></div></div>';
  }
  function footer(v,key,context='') {
    if(v.unknown)return '<div class="assoc-strong assoc-unavailable">关联数据未提供<p>当前无法展示品牌和商品关联。</p></div>';
    return '<div class="assoc-strong"><h4>关联品牌 <span>'+v.brands.length+'</span></h4>'+brandsMarkup(v,context)+'<h4>关联商品 <span>'+v.products.length+'</span></h4>'+(v.products.length?carousel(v,0,key):'<p class="assoc-empty">暂无已收录商品关联</p>')+'</div>';
  }
  function card(v,mode='content',key=v.id,context='') {
    videos.set(v.id,v);
    return '<article class="assoc-video-card '+(mode==='brand'?'assoc-brand-card':'assoc-content-card')+'" data-association-video="'+v.id+'"><div class="assoc-video-image"><img src="'+v.image+'" alt="示例视频缩略图">'+(v.ad?'<span class="video-ad">AD</span>':'')+'<div class="assoc-video-meta"><span>'+v.date+'</span><span>'+v.duration+'</span></div></div>'+
      (mode==='content'?'<button class="assoc-marker '+(v.unknown?'unknown':'')+'" data-assoc="details" data-video="'+v.id+'" aria-label="'+esc(v.title)+'：'+(v.unknown?'关联数据未提供':'查看'+v.brands.length+'个品牌、'+v.products.length+'件商品')+'" aria-haspopup="dialog">'+icon('Layers')+(v.unknown?'关联待提供':'品牌 '+v.brands.length+' · 商品 '+v.products.length)+'</button>':'')+
      '<a class="assoc-video-title" href="'+href('video',v.id)+'" target="_blank" rel="noopener">'+esc(v.title)+'</a><div class="assoc-video-numbers"><span>▷ '+v.views+'</span><span>♡ '+v.likes+'</span><span>评论 '+v.comments+'</span></div>'+(mode==='brand'?footer(v,key,context):'')+'</article>';
  }
  function brandVideos(brand) {
    const all=window.BrandPeriodReview.videos().filter(v=>(v.brands||[]).includes(brand.id));
    const first=all.find(v=>v.id==='assoc-multi')||all[0];
    const second=all.find(v=>v.id==='assoc-brand-only')||all.find(v=>v.id==='assoc-single'&&v!==first)||all.find(v=>v!==first);
    const types=findBrand(brand.id).promotionTypes;
    return [first,second].filter(Boolean).map(v=>{const index=Number(/-video-(\d+)$/.exec(v.id)?.[1]||1)-1;return {...v,promotion:types[index%types.length],type:v.id==='assoc-single'?'shorts':'video'};});
  }
  function page() {
    const items=fixtures.filter(v=>activeTab==='content'||window.BrandPeriodReview.includesDate(v.date)).map(v=>({...v,unknown:unavailable}));
    return '<div class="review-baseline-tools assoc-review-tools"><label for="assoc-state">关联样例 <select id="assoc-state"><option value="available" '+(!unavailable?'selected':'')+'>多关联 / 单关联 / 仅品牌</option><option value="unknown" '+(unavailable?'selected':'')+'>关联数据未提供</option></select></label><span class="muted">虚构样例 · 两个TAB使用同一组视频关系</span></div>'+
      '<section class="assoc-demo" data-association-tab="'+activeTab+'"><div class="assoc-channel-tabs" role="tablist" aria-label="频道详情方案TAB"><button id="assoc-tab-content" role="tab" aria-selected="'+(activeTab==='content')+'" aria-controls="assoc-panel" data-assoc="tab" data-tab="content" tabindex="'+(activeTab==='content'?0:-1)+'">内容数据</button><button id="assoc-tab-brand" role="tab" aria-selected="'+(activeTab==='brand')+'" aria-controls="assoc-panel" data-assoc="tab" data-tab="brand" tabindex="'+(activeTab==='brand'?0:-1)+'">品牌数据</button></div>'+
      '<div id="assoc-panel" role="tabpanel" aria-labelledby="assoc-tab-'+activeTab+'">'+(activeTab==='brand'?window.BrandPeriodUI.control():'')+(activeTab==='content'?'<div class="assoc-module-heading"><h2>内容数据</h2><span>长视频</span></div><div class="assoc-content-grid">'+items.map(v=>card(v,'content','content-'+v.id)).join('')+'</div>':'<div class="assoc-cooperation-context"><div><small>品牌提及 → 合作详情</small><h2>合作详情 · 视频卡关联展示</h2></div><span class="tag reference">视频关联示意</span></div><p class="assoc-context-note">下方分别对应三个品牌的合作详情样例；卡内展示该视频全部已收录关联，可能包含其他品牌。</p><div class="assoc-brand-grid">'+(items.length?items.map(v=>'<div class="assoc-brand-example"><div class="assoc-example-context">'+esc(findBrand(v.brands[0]).name)+' × 星野数码评测</div>'+card(v,'brand','brand-'+v.id,v.brands[0])+'</div>').join(''):'<div class="online-no-data">当前时间范围暂无已收录样例视频</div>')+'</div>')+'</div></section>'+
      '<p class="caption">评审说明：品牌数据直接展示；内容数据仅加标记，点击查看关联抽屉。当前以YouTube长视频卡为参照，品牌/商品链接为本地占位，未接真实关系接口。</p>';
  }
  function drawPage(focusTab=false) {
    const host=document.querySelector('#association-demo');
    if(host){host.innerHTML=page();if(focusTab)host.querySelector('[role="tab"][aria-selected="true"]').focus();}
  }
  function openDetails(id,trigger) {
    const v=videos.get(id);if(!v)return;
    let dialog=document.querySelector('#association-dialog');
    if(!dialog){dialog=document.createElement('dialog');dialog.id='association-dialog';dialog.className='online-drawer assoc-detail-drawer';dialog.setAttribute('aria-labelledby','association-dialog-title');document.body.append(dialog);}
    dialog.innerHTML='<div class="online-drawer-header"><h2 id="association-dialog-title">关联品牌与商品</h2><button class="btn icon" data-assoc="close" aria-label="关闭关联详情" autofocus>×</button></div><div class="online-drawer-body"><div class="assoc-detail-video"><img src="'+v.image+'" alt=""><div><strong>'+esc(v.title)+'</strong><small>'+v.date+' · '+v.duration+'</small></div></div>'+(v.unknown?'<div class="assoc-unavailable">关联数据未提供<p>当前无法展示品牌和商品关联。</p></div>':'<section class="assoc-detail-section"><h3>关联品牌 <span>'+v.brands.length+'</span></h3>'+brandsMarkup(v)+'</section><section class="assoc-detail-section"><h3>关联商品 <span>'+v.products.length+'</span></h3>'+(v.products.length?'<div class="assoc-detail-products">'+v.products.map(productRow).join('')+'</div>':'<p class="assoc-empty">暂无已收录商品关联</p>')+'</section>')+'<p class="caption">仅展示此视频已收录的关联；提及、疑似推广不等于实际付费合作。数值及关联均为虚构样例。</p></div>';
    dialog.onclose=()=>{dialog.innerHTML='';if(trigger?.isConnected)trigger.focus();};
    dialog.onclick=e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}};
    dialog.showModal();
  }
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-assoc]');if(!el)return;
    const action=el.dataset.assoc;
    if(action==='tab'){activeTab=el.dataset.tab;drawPage(true);}
    if(action==='details')openDetails(el.dataset.video,el);
    if(action==='close')document.querySelector('#association-dialog').close();
    if(action==='next'||action==='prev'){
      const box=el.closest('[data-carousel]'),v=videos.get(box.dataset.video),key=box.dataset.carousel;
      const index=(Number(box.dataset.index)+(action==='next'?1:-1)+v.products.length)%v.products.length;
      box.outerHTML=carousel(v,index,key);
      document.querySelector('[data-carousel="'+CSS.escape(key)+'"] [data-assoc="'+action+'"]').focus({preventScroll:true});
    }
  });
  document.addEventListener('change',e=>{if(e.target.id==='assoc-state'){unavailable=e.target.value==='unknown';drawPage();document.querySelector('#assoc-state').focus();}});
  document.addEventListener('keydown',e=>{if(e.target.matches('[role="tab"][data-assoc="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();activeTab=e.key==='Home'?'content':e.key==='End'?'brand':activeTab==='content'?'brand':'content';drawPage(true);}});
  window.ChannelAssociations={page,card,brandVideos,getActiveTab:()=>activeTab,reset:()=>{activeTab='brand';unavailable=false;}};
})();
