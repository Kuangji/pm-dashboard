# Tarsight数据量对比

## Tarsight侧

### 0-10000：

```json
{
  "requestId": "fb5cbcbe-1ff9-44ce-9703-2485383a410f",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 5714095805,
    "platform_stats": {
      "instagram": 3069954404,
      "tiktok": 1708349752,
      "facebook": 377791931,
      "youtube": 327996968,
      "twitter": 205400498,
      "reddit": 22878307,
      "snapchat": 1723945
    }
  }
}
```

#### 0-1000：

```json
{
  "requestId": "7150abd2-0e9e-436a-88be-c83bc01a7802",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 5220019615,
    "platform_stats": {
      "instagram": 2930611958,
      "tiktok": 1410676687,
      "facebook": 347027494,
      "youtube": 313066862,
      "twitter": 195151382,
      "reddit": 21858377,
      "snapchat": 1626855
    }
  }
}
```

#### 1001-5000：

```json
{
  "requestId": "92ccdbee-9998-4836-82df-a017ef94824f",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 445676188,
    "platform_stats": {
      "tiktok": 275114411,
      "instagram": 127747952,
      "facebook": 20534285,
      "youtube": 12525560,
      "twitter": 8878150,
      "reddit": 745385,
      "twitch": 130445
    }
  }
}
```

#### 5000-10000：

```json
{
  "requestId": "44204d2b-68bc-45af-a7c3-ca075c1706dd",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 48579870,
    "platform_stats": {
      "tiktok": 22561689,
      "instagram": 11636069,
      "facebook": 10230176,
      "youtube": 2408570,
      "twitter": 1373416,
      "reddit": 274545,
      "snapchat": 95405
    }
  }
}
```

---
### 10001+：

#### 10001-50000：

```json
{
  "requestId": "19068405-6262-431e-83b2-3c65e1bc35c8",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 37110474,
    "platform_stats": {
      "tiktok": 17762241,
      "instagram": 10829377,
      "facebook": 3809315,
      "youtube": 2717265,
      "twitter": 1281696,
      "reddit": 419494,
      "snapchat": 291086
    }
  }
}
```

#### 50000-100000:

```json
{
  "requestId": "2053df1e-bb9b-40ae-bced-0f8a9870a82f",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 5084024,
    "platform_stats": {
      "tiktok": 2092474,
      "instagram": 1409597,
      "facebook": 756526,
      "youtube": 536791,
      "twitter": 176320,
      "reddit": 80471,
      "snapchat": 31845
    }
  }
}
```

#### 100001-500000:

```json
{
  "requestId": "95852f7c-4c9d-42d0-84f4-afbe28455e0d",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 4059536,
    "platform_stats": {
      "tiktok": 1583557,
      "instagram": 1052004,
      "facebook": 648331,
      "youtube": 560179,
      "twitter": 139878,
      "reddit": 54594,
      "snapchat": 20993
    }
  }
}
```

#### 500001-1000000:

```json
{
  "requestId": "48668f03-cff3-4972-953d-8fa8c067e0cc",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 450394,
    "platform_stats": {
      "tiktok": 155826,
      "instagram": 103007,
      "facebook": 89610,
      "youtube": 83147,
      "twitter": 14529,
      "reddit": 2277,
      "snapchat": 1998
    }
  }
}
```

#### 1000001+:

```json
{
  "requestId": "868e1aad-23bf-4439-b1ad-1ec8085854c1",
  "success": true,
  "message": "request success",
  "code": 200,
  "data": {
    "total_creators": 323546,
    "platform_stats": {
      "tiktok": 87904,
      "facebook": 79694,
      "youtube": 74994,
      "instagram": 67980,
      "twitter": 10782,
      "snapchat": 1544,
      "kwai": 648
    }
  }
}
```

---

## Nox侧

### 0-10000


#### 0-1000
- [x]DONE
```json
{
    "youtube": 15090019,
    "tiktok": 30270522,
    "instagram": 5939506
}
```
#### 1001-5000
- [x]DONE
```json
{
    "youtube": 4262415,
    "tiktok": 19283399,
    "instagram": 16542319
}
```
#### 5001-10000
- [x]DONE
```json
{
    "youtube": 1435755,
    "tiktok": 7334995,
    "instagram": 5832847
}
```

---

### 10001+：
- [x]DONE
```json
{
    "youtube": 3183960,
    "tiktok": 12686071,
    "instagram": 9485161
}
```

#### 10001-50000
- [x]DONE
```json
{
    "youtube": 2051523,
    "tiktok": 9599114,
    "instagram": 7273513
}
```

#### 50001-100000
- [x]DONE
```json
{
    "youtube": 463740,
    "tiktok": 1563983,
    "instagram": 1111353
}
```
#### 100001-500000
- [x]DONE
```json
{
    "youtube": 514770,
    "tiktok": 1312805,
    "instagram": 948488
}
```
#### 500001-1000000
- [x]DONE
```json
{
    "youtube": 79979,
    "tiktok": 131069,
    "instagram": 91416
}
```
#### 1000001+
- [x]DONE
```json
{
    "youtube": 73948,
    "tiktok": 79100,
    "instagram": 60391
}
```