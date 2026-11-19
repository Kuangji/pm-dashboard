(() => {
  const video=new URLSearchParams(location.search).get('type')==='video';
  const brand=new URLSearchParams(location.search).get('type')==='brand';
  document.querySelector('#destination-title').textContent=video?'视频详情入口':brand?'品牌分析报告入口':'商品详情入口';
  document.querySelector('#destination-description').textContent=video?'线上视频标题会在新窗口打开视频详情。本页仅为入口占位，未实现播放器或真实视频报告。':brand?'线上点击品牌 Logo 或品牌名，会在新窗口打开该品牌分析报告。此处只保留相同的入口语义。':'线上点击商品图或商品名，会在新窗口打开商品详情。此处只保留相同的入口语义，不将其改成商品关联视频抽屉。';
  document.querySelector('#back-link').href='./index.html#'+(video?'point=P03':brand?'brands':'products');
})();
