# Twitter/X 数据字段说明

> **数据来源**: `kol_twitter_v1` 索引
> **样例用户**: @nananat96 (Natalia) - 424K followers
> **生成时间**: 2026-03-16

---

## 字段分类总览

| 类别 | 字段数 | 主要用途 |
|------|--------|----------|
| 基础信息 | 5 | 身份标识、展示名称 |
| 粉丝数据 | 2 | 粉丝量、关注数 |
| 内容统计 | 2 | 帖子数、媒体数 |
| 个人资料 | 7 | Bio、位置、头像、横幅等 |
| 认证信息 | 4 | 认证状态、蓝V等 |
| 系统元数据 | 6 | 注册时间、数据生成时间等 |
| 扩展信息 | 5 | 分类、外链、生日等（大量为空）|

---

## 字段详细说明

### 1. 基础信息（身份标识）

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `_id` | string | "886530583" | Twitter 用户唯一ID（数字字符串） | 内部使用 |
| `alias` | string | "nananat96" | Twitter handle（@用户名） | ✅ 展示 |
| `username` | string | "Natalia" | 显示名称（可重复） | ✅ 展示 |
| `biography` | string | "MIDZY 👑 IG : nananat..." | 个人简介/Bio | ✅ 展示 |
| `avatar` | string (URL) | "https://res-kol..." | 头像图片URL | ✅ 展示 |

### 2. 粉丝数据（核心指标）

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `followers` | number | 424573 | **粉丝数量** | ✅ 展示+筛选 |
| `following` | number | 173 | 关注数 | ⬜ 可选展示 |

### 3. 内容统计

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `posts_number` | number | 17155 | 发帖总数 | ⬜ 可选展示 |
| `medias` | number | 1654 | 媒体文件数 | ⬜ 可选展示 |

### 4. 个人资料

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `location` | string | "Jakarta" | 地理位置 | ✅ 展示+筛选 |
| `banner_url` | string (URL) | "https://pbs.twimg.com..." | 横幅封面图URL | ❌ 暂不展示 |
| `profile_image_shape` | string | "Circle" | 头像形状（Circle/Square）| 内部使用 |
| `external_url` | string/null | null | 个人网站外链 | ⬜ 可选展示 |

### 5. 认证信息

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `is_verified` | boolean/null | null | 传统认证状态 | ✅ 展示 |
| `verified_type` | string/null | null | 认证类型 | ⬜ 可选展示 |
| `is_blue_verified` | boolean | false | **蓝V认证**（Twitter Blue）| ✅ 展示 |
| `parody_commentary_fan_label` | string | "None" | 模仿/评论/粉丝账号标签 | ❌ 暂不展示 |

### 6. 系统元数据

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `register_date` | string | "2012-10-17" | 注册日期 | ⬜ 可选展示 |
| `generated_at` | timestamp | 1773655902219 | 数据生成时间戳 | ✅ 展示更新时间 |
| `is_delete` | number | 1 | 是否删除（1=正常？需确认）| 内部使用 |
| `country` | string | "ID" | **国家代码**（ISO）| ✅ 筛选+展示 |

### 7. 扩展信息（当前数据多为空）

| 字段 | 类型 | 样例值 | 说明 | v7.4.1 |
|------|------|--------|------|--------|
| `category` | string/null | null | 账号分类 | ❌ 数据缺失 |
| `professional_type` | string/null | null | 专业类型 | ❌ 数据缺失 |
| `birthdate` | string/null | null | 生日 | ❌ 数据缺失 |
| `likes` | number | 789 | 总点赞数 | ❌ 暂不展示 |
| `listed_count` | number | 1346 | 被列表收录数 | ❌ 暂不展示 |

### 8. 特殊标记（暂不展示）

| 字段 | 类型 | 样例值 | 说明 |
|------|------|--------|------|
| `is_translator` | boolean | false | 是否是翻译者 |
| `translator_type` | string | "none" | 翻译类型 |
| `possibly_sensitive` | boolean | false | 是否可能敏感 |
| `withheld_in_countries` | array | [] | 在哪些国家被限制 |
| `pinned_tweet_ids_str` | array | [] | 置顶推文ID列表 |

---

## v7.4.1 可用字段总结

### P0 - 必须支持（已确认有数据）

| 字段 | 用途 | 说明 |
|------|------|------|
| `avatar` | 展示 | Twitter 头像 |
| `followers` | 展示+筛选 | **粉丝数量** |
| `alias` | 展示 | @用户名 |
| `username` | 展示 | 显示名称 |
| `biography` | 展示 | 个人简介 |

### P1 - 建议支持（有数据，待确认筛选需求）

| 字段 | 用途 | 说明 |
|------|------|------|
| `location` | 展示+筛选 | 地理位置（如"Jakarta"）|
| `country` | 筛选 | 国家代码（如"ID"）|
| `is_blue_verified` | 展示 | 蓝V认证标识 |
| `is_verified` | 展示 | 传统认证标识 |
| `register_date` | 展示 | 注册时间 |

### P2 - 可选（v7.4.2+）

| 字段 | 用途 | 说明 |
|------|------|------|
| `posts_number` | 展示 | 发帖数 |
| `medias` | 展示 | 媒体文件数 |
| `following` | 展示 | 关注数 |
| `external_url` | 展示 | 外链 |

### ❌ 暂不支持的字段

- `banner_url` - 横幅图（非核心需求）
- `likes` - 总点赞数（含义不明确）
- `listed_count` - 列表收录数（非核心指标）
- `category` / `professional_type` / `birthdate` - 当前数据缺失
- 各类系统标记字段

---

## 关键发现与待确认问题

### 发现 1：互动率数据缺失
- **现状**：当前数据中无 `engagement_rate` 字段
- **影响**：v7.4.1 暂无法支持按互动率筛选/排序
- **建议**：P0 功能中移除互动率相关需求

### 发现 2：受众画像数据缺失
- **现状**：无年龄、性别、受众地理位置等字段
- **影响**：v7.4.1 暂无法展示受众画像
- **建议**：受众相关功能移至 v7.4.2+

### 发现 3：地理位置数据格式
- **现状**：`location` 是自由文本（如"Jakarta"）
- **`country` 是 ISO 代码**（如"ID"）
- **建议**：筛选使用 `country`，展示使用 `location`

### 发现 4：认证状态字段较多
- `is_verified` - 传统认证（当前样例为 null）
- `is_blue_verified` - 蓝V认证（当前样例为 false）
- **建议**：v7.4.1 同时展示两个认证状态

### 发现 5：数据更新字段
- `generated_at` - 时间戳格式（1773655902219）
- **建议**：转换为可读格式展示，如 "3小时前更新"

---

## 9. 推文数据字段（已补充）

> **数据来源**: `kol_twitter_tweets_2026` 索引
> **样例文件**: [@twitter_tweet_sample_raw.json](./twitter_tweet_sample_raw.json)

### 9.1 推文基础信息

| 字段 | 类型 | 样例值 | 说明 |
|------|------|--------|------|
| `_id` | string | "2033486101076119617" | 推文唯一ID |
| `channel_id` | string | "1632174744203309056" | 发布者Twitter用户ID |
| `description` | string | "RT @HappyMotorhead: Asking..." | 推文内容/文本 |
| `language` | string | "en" | 语言代码 |

### 9.2 发布时间

| 字段 | 类型 | 样例值 | 说明 |
|------|------|--------|------|
| `pub_date` | string | "2026-03-16" | 发布日期 |
| `pub_time` | timestamp | 1773655841 | 发布时间戳（秒级Unix）|
| `generated_at` | timestamp | 1773655921864 | 数据采集时间（毫秒级）|

### 9.3 互动数据（核心）

| 字段 | 类型 | 样例值 | 说明 | 计算公式 |
|------|------|--------|------|----------|
| `likes` | number | 0 | **点赞数** | - |
| `retweets` | number | 2 | **转发数** | - |
| `comments` | number | 0 | **评论数/回复数** | - |
| `quotes` | number | 0 | **引用推文数** | - |
| `bookmarks` | number | 0 | **收藏数** | - |
| `views` | number | 0 | **浏览量/展示量** | - |

### 9.4 推文类型标记

| 字段 | 类型 | 样例值 | 说明 |
|------|------|--------|------|
| `is_quote_status` | boolean | false | 是否为引用推文 |
| `parent_id` | string/null | "2033392850944..." | 原推文ID（转发时）|
| `parent_channel_id` | string/null | "1829170310316..." | 原推文作者ID |

### 9.5 媒体内容

| 字段 | 类型 | 样例值 | 说明 |
|------|------|--------|------|
| `thumbnails` | array | ["https://...png"] | 缩略图URL列表 |
| `video_url` | string/null | null | 视频URL |
| `tags` | array | [] | 标签/话题 |
| `place` | string/null | null | 地理位置 |

---

## 关键发现更新（基于推文数据）

### ✅ 发现 4：互动数据已采集

**现状**：推文数据中存在完整的互动数据字段：
- `likes` - 点赞数
- `retweets` - 转发数
- `comments` - 评论数
- `quotes` - 引用推文数
- `bookmarks` - 收藏数
- `views` - 浏览量

**重要结论**：
> **可以通过聚合推文数据计算账号级的互动率！**

### 💡 互动率计算方案（供数据组/开发参考）

#### 方案 A：基于最新 N 条推文
```
互动率 = (Σ likes + Σ retweets + Σ comments) / (N条推文的平均views) × 100%
```

#### 方案 B：基于时间窗口（推荐）
```
近30天互动率 = (近30天总互动数) / (近30天总浏览量) × 100%
```

#### 方案 C：简化版（无views时）
```
互动率 = (Σ likes + Σ retweets + Σ comments) / followers_count × 100%
```

### 更新后的 v7.4.1 功能建议

| 功能 | 原结论 | 更新后结论 | 说明 |
|------|--------|------------|------|
| 互动率展示 | ❌ 数据缺失 | ⬜ **待计算** | 需数据组预计算账号级互动率 |
| 互动率筛选 | ❌ 暂不支持 | ⬜ **待确认** | 如有计算好的字段，可支持筛选 |
| 最近推文互动数 | — | ✅ **可展示** | 直接展示 likes/retweets/comments |

---

## 最终字段可用性总结

### P0 - 必须支持（已确认）

| 类别 | 字段 |
|------|------|
| 账号信息 | `avatar`, `followers`, `alias`, `username`, `biography` |

### P1 - 建议支持（有数据）

| 类别 | 字段 |
|------|------|
| 地理位置 | `location`, `country` |
| 认证标识 | `is_blue_verified`, `is_verified` |
| 时间信息 | `register_date`, `generated_at` |
| 推文互动 | `likes`, `retweets`, `comments`, `views`（需聚合计算）|

### P2 - 可选

| 类别 | 字段 |
|------|------|
| 内容统计 | `posts_number`, `medias`, `following` |
| 扩展互动 | `quotes`, `bookmarks` |
| 最近推文 | 单条推文的 `description`, `thumbnails` |

### 🔶 待数据组确认

| 问题 | 说明 |
|------|------|
| 账号级互动率 | 是否已预计算？字段名是什么？ |
| 推文聚合数据 | 是否已聚合近30天/近7天数据？ |
| 数据更新频率 | Twitter数据多久更新一次？ |

---

*文档生成时间: 2026-03-16*
*基于数据组提供的账号+推文真实样例*
*最后更新: 2026-03-16（补充推文数据）*
