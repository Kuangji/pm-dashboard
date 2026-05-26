# 共同深度采样修正版汇总

本文件修正了 provider 页数不一致时的采样口径：先按关键词取两个 provider 的 `min(total_pages)` 作为共同深度，再让两个 provider 使用相同绝对页码进入主对比。长 provider 多出来的页只标记为 `extended_tail_not_compared`，保留诊断价值但不进入横向比较。

原始 `FINAL_SUMMARY.md` 仍是旧的各 provider 相对页尾口径；本轮结论请以本文件和 `common-depth-*.csv` 为准。

## Provider 总览
| keyword | provider | common_pages | sample_pages | common_depth_records | fit | adjacent | badcase | failed | badcase_rate | gpt5.5_reviewed | supplement_sources |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | nox | 101 | 1-10,46-55,92-101 | 1460 | 334 | 267 | 859 | 0 | 58.8% | 224 | 0 |
| coffee machine | xtb | 101 | 1-10,46-55,92-101 | 1500 | 171 | 165 | 1164 | 0 | 77.6% | 268 | 1 |
| lawn mower | nox | 193 | 1-10,92-101,184-193 | 1487 | 263 | 227 | 997 | 0 | 67.0% | 329 | 0 |
| lawn mower | xtb | 193 | 1-10,92-101,184-193 | 1500 | 332 | 208 | 960 | 0 | 64.0% | 237 | 1 |
| tech | nox | 200 | 1-10,96-105,191-200 | 1500 | 857 | 281 | 362 | 0 | 24.1% | 161 | 0 |
| tech | xtb | 200 | 1-10,96-105,191-200 | 1500 | 861 | 272 | 367 | 0 | 24.5% | 149 | 0 |
| fashion | nox | 200 | 1-10,96-105,191-200 | 1500 | 983 | 132 | 385 | 0 | 25.7% | 135 | 0 |
| fashion | xtb | 200 | 1-10,96-105,191-200 | 1500 | 1079 | 258 | 163 | 0 | 10.9% | 101 | 0 |
| lifestyle | nox | 200 | 1-10,96-105,191-200 | 1500 | 1114 | 248 | 138 | 0 | 9.2% | 190 | 0 |
| lifestyle | xtb | 200 | 1-10,96-105,191-200 | 1500 | 1185 | 192 | 123 | 0 | 8.2% | 107 | 0 |
| power bank | nox | 200 | 1-10,96-105,191-200 | 1500 | 168 | 439 | 893 | 0 | 59.5% | 466 | 0 |
| power bank | xtb | 200 | 1-10,96-105,191-200 | 1500 | 319 | 310 | 871 | 0 | 58.1% | 317 | 0 |
| swim vest | nox | 2 | 1-2 | 70 | 1 | 10 | 59 | 0 | 84.3% | 27 | 0 |
| swim vest | xtb | 2 | 1-2 | 100 | 17 | 27 | 56 | 0 | 56.0% | 218 | 0 |
| vacuum cleaner | nox | 200 | 1-10,96-105,191-200 | 1500 | 177 | 230 | 1093 | 0 | 72.9% | 422 | 0 |
| vacuum cleaner | xtb | 200 | 1-10,96-105,191-200 | 1500 | 262 | 221 | 1017 | 0 | 67.8% | 199 | 0 |
| baby supplement | nox | 3 | 1-3 | 136 | 3 | 29 | 104 | 0 | 76.5% | 30 | 0 |
| baby supplement | xtb | 3 | 1-3 | 150 | 35 | 46 | 69 | 0 | 46.0% | 190 | 0 |
| pet food | nox | 100 | 1-10,46-55,91-100 | 1465 | 136 | 359 | 970 | 0 | 66.2% | 307 | 0 |
| pet food | xtb | 100 | 1-10,46-55,91-100 | 1500 | 174 | 292 | 1034 | 0 | 68.9% | 272 | 1 |

## Provider Badcase 率差异
| keyword | nox_badcase_rate | xtb_badcase_rate | xtb_minus_nox |
| --- | --- | --- | --- |
| coffee machine | 58.8% | 77.6% | 18.8% |
| lawn mower | 67.0% | 64.0% | -3.0% |
| tech | 24.1% | 24.5% | 0.3% |
| fashion | 25.7% | 10.9% | -14.8% |
| lifestyle | 9.2% | 8.2% | -1.0% |
| power bank | 59.5% | 58.1% | -1.5% |
| swim vest | 84.3% | 56.0% | -28.3% |
| vacuum cleaner | 72.9% | 67.8% | -5.1% |
| baby supplement | 76.5% | 46.0% | -30.5% |
| pet food | 66.2% | 68.9% | 2.7% |

## 页码分区聚合
| keyword | provider | page_group | page_range | total | fit | adjacent | badcase | failed | badcase_rate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | nox | 前10页 | 1-10 | 500 | 179 | 127 | 194 | 0 | 38.8% |
| coffee machine | nox | 中间10页 | 46-55 | 500 | 76 | 82 | 342 | 0 | 68.4% |
| coffee machine | nox | 最后10页 | 92-101 | 460 | 79 | 58 | 323 | 0 | 70.2% |
| coffee machine | xtb | 前10页 | 1-10 | 500 | 113 | 83 | 304 | 0 | 60.8% |
| coffee machine | xtb | 中间10页 | 46-55 | 500 | 42 | 53 | 405 | 0 | 81.0% |
| coffee machine | xtb | 最后10页 | 92-101 | 500 | 16 | 29 | 455 | 0 | 91.0% |
| lawn mower | nox | 前10页 | 1-10 | 500 | 242 | 102 | 156 | 0 | 31.2% |
| lawn mower | nox | 中间10页 | 92-101 | 500 | 11 | 67 | 422 | 0 | 84.4% |
| lawn mower | nox | 最后10页 | 184-193 | 487 | 10 | 58 | 419 | 0 | 86.0% |
| lawn mower | xtb | 前10页 | 1-10 | 500 | 296 | 97 | 107 | 0 | 21.4% |
| lawn mower | xtb | 中间10页 | 92-101 | 500 | 23 | 77 | 400 | 0 | 80.0% |
| lawn mower | xtb | 最后10页 | 184-193 | 500 | 13 | 34 | 453 | 0 | 90.6% |
| tech | nox | 前10页 | 1-10 | 500 | 413 | 54 | 33 | 0 | 6.6% |
| tech | nox | 中间10页 | 96-105 | 500 | 266 | 117 | 117 | 0 | 23.4% |
| tech | nox | 最后10页 | 191-200 | 500 | 178 | 110 | 212 | 0 | 42.4% |
| tech | xtb | 前10页 | 1-10 | 500 | 393 | 72 | 35 | 0 | 7.0% |
| tech | xtb | 中间10页 | 96-105 | 500 | 183 | 118 | 199 | 0 | 39.8% |
| tech | xtb | 最后10页 | 191-200 | 500 | 285 | 82 | 133 | 0 | 26.6% |
| fashion | nox | 前10页 | 1-10 | 500 | 476 | 20 | 4 | 0 | 0.8% |
| fashion | nox | 中间10页 | 96-105 | 500 | 296 | 56 | 148 | 0 | 29.6% |
| fashion | nox | 最后10页 | 191-200 | 500 | 211 | 56 | 233 | 0 | 46.6% |
| fashion | xtb | 前10页 | 1-10 | 500 | 435 | 44 | 21 | 0 | 4.2% |
| fashion | xtb | 中间10页 | 96-105 | 500 | 345 | 118 | 37 | 0 | 7.4% |
| fashion | xtb | 最后10页 | 191-200 | 500 | 299 | 96 | 105 | 0 | 21.0% |
| lifestyle | nox | 前10页 | 1-10 | 500 | 463 | 36 | 1 | 0 | 0.2% |
| lifestyle | nox | 中间10页 | 96-105 | 500 | 335 | 98 | 67 | 0 | 13.4% |
| lifestyle | nox | 最后10页 | 191-200 | 500 | 316 | 114 | 70 | 0 | 14.0% |
| lifestyle | xtb | 前10页 | 1-10 | 500 | 471 | 24 | 5 | 0 | 1.0% |
| lifestyle | xtb | 中间10页 | 96-105 | 500 | 381 | 70 | 49 | 0 | 9.8% |
| lifestyle | xtb | 最后10页 | 191-200 | 500 | 333 | 98 | 69 | 0 | 13.8% |
| power bank | nox | 前10页 | 1-10 | 500 | 135 | 205 | 160 | 0 | 32.0% |
| power bank | nox | 中间10页 | 96-105 | 500 | 19 | 113 | 368 | 0 | 73.6% |
| power bank | nox | 最后10页 | 191-200 | 500 | 14 | 121 | 365 | 0 | 73.0% |
| power bank | xtb | 前10页 | 1-10 | 500 | 227 | 158 | 115 | 0 | 23.0% |
| power bank | xtb | 中间10页 | 96-105 | 500 | 75 | 99 | 326 | 0 | 65.2% |
| power bank | xtb | 最后10页 | 191-200 | 500 | 17 | 53 | 430 | 0 | 86.0% |
| swim vest | nox | 前50%页 | 1-1 | 50 | 1 | 7 | 42 | 0 | 84.0% |
| swim vest | nox | 后50%页 | 2-2 | 20 | 0 | 3 | 17 | 0 | 85.0% |
| swim vest | xtb | 前50%页 | 1-1 | 50 | 13 | 8 | 29 | 0 | 58.0% |
| swim vest | xtb | 后50%页 | 2-2 | 50 | 4 | 19 | 27 | 0 | 54.0% |
| vacuum cleaner | nox | 前10页 | 1-10 | 500 | 168 | 114 | 218 | 0 | 43.6% |
| vacuum cleaner | nox | 中间10页 | 96-105 | 500 | 6 | 52 | 442 | 0 | 88.4% |
| vacuum cleaner | nox | 最后10页 | 191-200 | 500 | 3 | 64 | 433 | 0 | 86.6% |
| vacuum cleaner | xtb | 前10页 | 1-10 | 500 | 202 | 116 | 182 | 0 | 36.4% |
| vacuum cleaner | xtb | 中间10页 | 96-105 | 500 | 30 | 59 | 411 | 0 | 82.2% |
| vacuum cleaner | xtb | 最后10页 | 191-200 | 500 | 30 | 46 | 424 | 0 | 84.8% |
| baby supplement | nox | 前50%页 | 1-2 | 100 | 3 | 19 | 78 | 0 | 78.0% |
| baby supplement | nox | 后50%页 | 3-3 | 36 | 0 | 10 | 26 | 0 | 72.2% |
| baby supplement | xtb | 前50%页 | 1-2 | 100 | 26 | 35 | 39 | 0 | 39.0% |
| baby supplement | xtb | 后50%页 | 3-3 | 50 | 9 | 11 | 30 | 0 | 60.0% |
| pet food | nox | 前10页 | 1-10 | 500 | 103 | 144 | 253 | 0 | 50.6% |
| pet food | nox | 中间10页 | 46-55 | 500 | 19 | 106 | 375 | 0 | 75.0% |
| pet food | nox | 最后10页 | 91-100 | 465 | 14 | 109 | 342 | 0 | 73.5% |
| pet food | xtb | 前10页 | 1-10 | 500 | 115 | 115 | 270 | 0 | 54.0% |
| pet food | xtb | 中间10页 | 46-55 | 500 | 31 | 90 | 379 | 0 | 75.8% |
| pet food | xtb | 最后10页 | 91-100 | 500 | 28 | 87 | 385 | 0 | 77.0% |

## Extended Tail 诊断
| keyword | provider | extra_pages | extended_tail_records | fit | adjacent | badcase | failed | badcase_rate | note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | xtb | 102-105,191-200 | 700 | 17 | 35 | 648 | 0 | 92.6% | extended_tail_not_compared |
| lawn mower | xtb | 102-105,194-200 | 550 | 17 | 52 | 481 | 0 | 87.5% | extended_tail_not_compared |
| swim vest | xtb | 3-10,96-105,191-200 | 1400 | 45 | 127 | 1228 | 0 | 87.7% | extended_tail_not_compared |
| baby supplement | xtb | 4-10,96-105,191-200 | 1350 | 59 | 167 | 1124 | 0 | 83.3% | extended_tail_not_compared |
| pet food | xtb | 101-105,191-200 | 750 | 36 | 91 | 623 | 0 | 83.1% | extended_tail_not_compared |

## 补跑后缺失检查
共同深度样本无空页缺失。

## coffee machine
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 101 | 1-10,46-55,92-101 | 1460 | 334 | 267 | 859 | 0 | 58.8% | - |
| xtb | 101 | 1-10,46-55,92-101 | 1500 | 171 | 165 | 1164 | 0 | 77.6% | 102-105,191-200 |

## lawn mower
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 193 | 1-10,92-101,184-193 | 1487 | 263 | 227 | 997 | 0 | 67.0% | - |
| xtb | 193 | 1-10,92-101,184-193 | 1500 | 332 | 208 | 960 | 0 | 64.0% | 102-105,194-200 |

## tech
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 200 | 1-10,96-105,191-200 | 1500 | 857 | 281 | 362 | 0 | 24.1% | - |
| xtb | 200 | 1-10,96-105,191-200 | 1500 | 861 | 272 | 367 | 0 | 24.5% | - |

## fashion
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 200 | 1-10,96-105,191-200 | 1500 | 983 | 132 | 385 | 0 | 25.7% | - |
| xtb | 200 | 1-10,96-105,191-200 | 1500 | 1079 | 258 | 163 | 0 | 10.9% | - |

## lifestyle
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 200 | 1-10,96-105,191-200 | 1500 | 1114 | 248 | 138 | 0 | 9.2% | - |
| xtb | 200 | 1-10,96-105,191-200 | 1500 | 1185 | 192 | 123 | 0 | 8.2% | - |

## power bank
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 200 | 1-10,96-105,191-200 | 1500 | 168 | 439 | 893 | 0 | 59.5% | - |
| xtb | 200 | 1-10,96-105,191-200 | 1500 | 319 | 310 | 871 | 0 | 58.1% | - |

## swim vest
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 2 | 1-2 | 70 | 1 | 10 | 59 | 0 | 84.3% | - |
| xtb | 2 | 1-2 | 100 | 17 | 27 | 56 | 0 | 56.0% | 3-10,96-105,191-200 |

## vacuum cleaner
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 200 | 1-10,96-105,191-200 | 1500 | 177 | 230 | 1093 | 0 | 72.9% | - |
| xtb | 200 | 1-10,96-105,191-200 | 1500 | 262 | 221 | 1017 | 0 | 67.8% | - |

## baby supplement
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 3 | 1-3 | 136 | 3 | 29 | 104 | 0 | 76.5% | - |
| xtb | 3 | 1-3 | 150 | 35 | 46 | 69 | 0 | 46.0% | 4-10,96-105,191-200 |

## pet food
| provider | common_pages | sample_pages | records | fit | adjacent | badcase | failed | badcase_rate | extended_tail_pages |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nox | 100 | 1-10,46-55,91-100 | 1465 | 136 | 359 | 970 | 0 | 66.2% | - |
| xtb | 100 | 1-10,46-55,91-100 | 1500 | 174 | 292 | 1034 | 0 | 68.9% | 101-105,191-200 |

