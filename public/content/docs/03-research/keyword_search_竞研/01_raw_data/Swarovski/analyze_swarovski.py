#!/usr/bin/env python3
"""
Swarovski 内容有效性对比分析脚本
对比 Nox vs Tarsight 在 Swarovski 品牌关键词下的内容质量

运行: cd 到脚本所在目录后 python3 analyze_swarovski.py
"""

import pandas as pd
import os
import sys
import json
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
KEYWORD = "swarovski"

# ── 文件路径 ──────────────────────────────────────────────────────────────────
NOX_YT   = os.path.join(SCRIPT_DIR, "noxinfluencer_brand_monitor_content_20260368_youtube.xlsx")
NOX_TT   = os.path.join(SCRIPT_DIR, "noxinfluencer_brand_monitor_content_20260368 _tiktok.xlsx")
NOX_IG   = os.path.join(SCRIPT_DIR, "noxinfluencer_brand_monitor_content_20260368 instagram.xlsx")
TAR_ALL  = os.path.join(SCRIPT_DIR, "tarsight_swarovski_2mon_posts_top10k.xlsx")

def load(path, label):
    """读取 Excel，打印列名与行数"""
    print(f"\n[读取] {label} → {os.path.basename(path)}")
    df = pd.read_excel(path, engine="openpyxl")
    print(f"  行数: {len(df)}  列数: {len(df.columns)}")
    print(f"  列名: {list(df.columns)}")
    return df

def str_col_contains(series, keyword):
    """大小写不敏感的关键词命中，忽略 NaN"""
    return series.astype(str).str.lower().str.contains(keyword, na=False)

def detect_url_col(df, preferred=None):
    """自动找 URL 列"""
    if preferred and preferred in df.columns:
        return preferred
    for col in df.columns:
        if "url" in col.lower() or "link" in col.lower():
            return col
    return None

def sample_rows(df, n=20):
    """返回前 n 条（若不足则全部）的关键列内容"""
    cols = [c for c in df.columns if any(k in c.lower() for k in ["title","content","caption","hashtag","brand","url","link","platform"])]
    cols = cols[:6] if len(cols) > 6 else cols
    return df[cols].head(n).to_string(index=False)

def analyze_nox_platform(df, platform, text_cols_priority):
    """分析 Nox 单平台"""
    print(f"\n{'─'*60}")
    print(f"[Nox · {platform}]  总行数: {len(df)}")

    # 找有效内容字段
    hit_col = None
    for col in text_cols_priority:
        if col in df.columns:
            hit_col = col
            break

    if hit_col is None:
        # fallback：找包含 content/text/title 的列
        for col in df.columns:
            if any(k in col.lower() for k in ["content","text","title","caption","description"]):
                hit_col = col
                break

    if hit_col is None:
        print(f"  ⚠ 未找到文本列，跳过")
        return None, None, None

    print(f"  命中检测列: {hit_col}")
    mask = str_col_contains(df[hit_col], KEYWORD)
    hit = mask.sum()
    miss = (~mask).sum()
    rate = hit / len(df) * 100 if len(df) else 0
    print(f"  命中: {hit}  未命中: {miss}  命中率: {rate:.1f}%")

    if miss > 0:
        print(f"\n  [Nox·{platform} 噪声样例（前 20 条未命中）]")
        print(sample_rows(df[~mask], 20))

    url_col = detect_url_col(df)
    urls = set(df[url_col].dropna().astype(str)) if url_col else set()
    return hit, mask, urls

def analyze_tarsight(df):
    """分析 Tarsight 合并数据"""
    print(f"\n{'─'*60}")
    print(f"[Tarsight · ALL]  总行数: {len(df)}")
    print(f"  列名: {list(df.columns)}")

    # 找 platform 列
    plat_col = None
    for col in df.columns:
        if "platform" in col.lower() or "渠道" in col.lower() or "source" in col.lower():
            plat_col = col
            break

    if plat_col:
        print(f"\n  平台分布:")
        print(df[plat_col].value_counts().to_string())

    # 关键词命中：检测多个文本字段
    text_fields = [c for c in df.columns if any(k in c.lower() for k in ["title","content","caption","hashtag","tag","description","text","body"])]
    print(f"\n  文本字段: {text_fields}")

    if text_fields:
        any_hit = df[text_fields[0]].astype(str).str.lower().str.contains(KEYWORD, na=False)
        for col in text_fields[1:]:
            any_hit = any_hit | str_col_contains(df[col], KEYWORD)
    else:
        any_hit = pd.Series([False]*len(df))

    # 逐平台分析
    results = {}
    plat_map = {}
    if plat_col:
        for plat, grp in df.groupby(plat_col):
            plat_key = str(plat).lower()
            if text_fields:
                g_hit = grp[text_fields[0]].astype(str).str.lower().str.contains(KEYWORD, na=False)
                for col in text_fields[1:]:
                    g_hit = g_hit | str_col_contains(grp[col], KEYWORD)
            else:
                g_hit = pd.Series([False]*len(grp))
            hit_n = g_hit.sum()
            rate = hit_n / len(grp) * 100 if len(grp) else 0
            print(f"\n  [{plat}]  总: {len(grp)}  命中: {hit_n}  命中率: {rate:.1f}%")

            if (~g_hit).sum() > 0:
                print(f"  噪声样例（前 20 条）:")
                print(sample_rows(grp[~g_hit], 20))

            url_col = detect_url_col(grp)
            urls = set(grp[url_col].dropna().astype(str)) if url_col else set()
            results[plat_key] = {"total": len(grp), "hit": int(hit_n), "rate": rate, "urls": urls}
            plat_map[plat_key] = plat
    else:
        # 无平台列
        hit_n = any_hit.sum()
        rate = hit_n / len(df) * 100 if len(df) else 0
        print(f"  全部命中: {hit_n}  命中率: {rate:.1f}%")
        results["all"] = {"total": len(df), "hit": int(hit_n), "rate": rate, "urls": set()}

    return results, text_fields, plat_col

def url_overlap(nox_urls, tar_urls, platform):
    """计算 URL 重叠情况"""
    if not nox_urls and not tar_urls:
        print(f"  [{platform}] 无 URL 数据可供比对")
        return 0, 0, 0
    both = nox_urls & tar_urls
    nox_only = nox_urls - tar_urls
    tar_only = tar_urls - nox_urls
    print(f"\n  [{platform} URL 重叠]  共有: {len(both)}  Nox独有: {len(nox_only)}  Tarsight独有: {len(tar_only)}")
    return len(both), len(nox_only), len(tar_only)

# ── 主流程 ─────────────────────────────────────────────────────────────────────
def main():
    print("=" * 60)
    print("Swarovski 内容有效性对比分析")
    print("=" * 60)

    # 1. 读取数据
    nox_yt = load(NOX_YT, "Nox YouTube")
    nox_tt = load(NOX_TT, "Nox TikTok")
    nox_ig = load(NOX_IG, "Nox Instagram")
    tar_df = load(TAR_ALL, "Tarsight ALL")

    # 2. Nox 各平台分析
    yt_hit, yt_mask, yt_urls = analyze_nox_platform(nox_yt, "YouTube",
        ["Content", "content", "Title", "title", "Description", "description"])
    tt_hit, tt_mask, tt_urls = analyze_nox_platform(nox_tt, "TikTok",
        ["Content", "content", "Title", "title", "Hashtags", "hashtags", "Caption", "caption"])
    ig_hit, ig_mask, ig_urls = analyze_nox_platform(nox_ig, "Instagram",
        ["Content", "content", "Caption", "caption", "Hashtags", "hashtags", "Title", "title"])

    # 3. Tarsight 分析
    tar_results, tar_text_fields, tar_plat_col = analyze_tarsight(tar_df)

    # 4. URL 重叠（TikTok 优先，因数量最大）
    print(f"\n{'─'*60}")
    print("[URL 重叠分析]")

    # 找 Tarsight URL 列
    tar_url_col = detect_url_col(tar_df)
    tar_urls_all = set(tar_df[tar_url_col].dropna().astype(str)) if tar_url_col else set()

    # 按平台过滤 Tarsight URLs
    tar_tt_urls = set()
    tar_yt_urls = set()
    tar_ig_urls = set()
    if tar_plat_col and tar_url_col:
        for plat, grp in tar_df.groupby(tar_plat_col):
            plat_l = str(plat).lower()
            urls = set(grp[tar_url_col].dropna().astype(str))
            if "tiktok" in plat_l or "tt" in plat_l:
                tar_tt_urls = urls
            elif "youtube" in plat_l or "yt" in plat_l:
                tar_yt_urls = urls
            elif "instagram" in plat_l or "ig" in plat_l:
                tar_ig_urls = urls

    yt_both, yt_nox_only, yt_tar_only   = url_overlap(yt_urls, tar_yt_urls, "YouTube")
    tt_both, tt_nox_only, tt_tar_only   = url_overlap(tt_urls, tar_tt_urls, "TikTok")
    ig_both, ig_nox_only, ig_tar_only   = url_overlap(ig_urls, tar_ig_urls, "Instagram")

    # 5. 汇总指标
    print(f"\n{'='*60}")
    print("[汇总指标]")

    nox_total = {"YouTube": len(nox_yt), "TikTok": len(nox_tt), "Instagram": len(nox_ig)}
    nox_effective = {
        "YouTube": int(yt_hit) if yt_hit is not None else 0,
        "TikTok":  int(tt_hit) if tt_hit is not None else 0,
        "Instagram": int(ig_hit) if ig_hit is not None else 0,
    }

    print(f"\nNox 总量:      YT={nox_total['YouTube']}  TT={nox_total['TikTok']}  IG={nox_total['Instagram']}")
    print(f"Nox 有效量:    YT={nox_effective['YouTube']}  TT={nox_effective['TikTok']}  IG={nox_effective['Instagram']}")

    for plat_key, info in tar_results.items():
        print(f"Tarsight [{plat_key}] 总={info['total']}  有效={info['hit']}  命中率={info['rate']:.1f}%")

    # 6. 生成报告 JSON（供 Markdown 写入用）
    report_data = {
        "nox": {
            "YouTube": {"total": nox_total["YouTube"], "effective": nox_effective["YouTube"]},
            "TikTok":  {"total": nox_total["TikTok"],  "effective": nox_effective["TikTok"]},
            "Instagram": {"total": nox_total["Instagram"], "effective": nox_effective["Instagram"]},
        },
        "tarsight": {k: {"total": v["total"], "hit": v["hit"], "rate": round(v["rate"], 1)}
                     for k, v in tar_results.items()},
        "url_overlap": {
            "YouTube":   {"both": yt_both, "nox_only": yt_nox_only, "tar_only": yt_tar_only},
            "TikTok":    {"both": tt_both, "nox_only": tt_nox_only, "tar_only": tt_tar_only},
            "Instagram": {"both": ig_both, "nox_only": ig_nox_only, "tar_only": ig_tar_only},
        }
    }

    # 序列化（set 不能 JSON，已提前转 int）
    json_path = os.path.join(SCRIPT_DIR, "analysis_results.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, ensure_ascii=False, indent=2)
    print(f"\n[✓] 结果已写入 {json_path}")

    return report_data

if __name__ == "__main__":
    main()
