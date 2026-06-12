# instagram US Channel Search Provider Review

- providers: nox, xtb
- platform: instagram
- country: US
- page_size: 50
- max_recall_basis: 10000
- page partitions: common-depth comparison; first 10, middle 10, last 10 inside min(provider total pages); overlapping pages deduped

## Provider Overview By Keyword
| keyword | nox_total | nox_badcase率 | nox_failed | xtb_total | xtb_badcase率 | xtb_failed | badcase率差(nox-xtb) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| baby supplement | 500 | 68.6% | 0 | 500 | 64.4% | 0 | 4.2% |
| agricultural products | 500 | 80.4% | 0 | 500 | 75.6% | 0 | 4.8% |
| beauty | 500 | 39.8% | 0 | 500 | 38.2% | 0 | 1.6% |
| fashion | 500 | 28.4% | 0 | 500 | 29.8% | 0 | -1.4% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| baby supplement | 1 | 50 | 41 | 82.0% | 50 | 34 | 68.0% | 14.0% |
| baby supplement | 2 | 50 | 28 | 56.0% | 50 | 37 | 74.0% | -18.0% |
| baby supplement | 3 | 50 | 31 | 62.0% | 50 | 21 | 42.0% | 20.0% |
| baby supplement | 4 | 50 | 37 | 74.0% | 50 | 34 | 68.0% | 6.0% |
| baby supplement | 5 | 50 | 26 | 52.0% | 50 | 23 | 46.0% | 6.0% |
| baby supplement | 6 | 50 | 36 | 72.0% | 50 | 27 | 54.0% | 18.0% |
| baby supplement | 7 | 50 | 33 | 66.0% | 50 | 46 | 92.0% | -26.0% |
| baby supplement | 8 | 50 | 41 | 82.0% | 50 | 29 | 58.0% | 24.0% |
| baby supplement | 9 | 50 | 38 | 76.0% | 50 | 31 | 62.0% | 14.0% |
| baby supplement | 10 | 50 | 32 | 64.0% | 50 | 40 | 80.0% | -16.0% |
| agricultural products | 1 | 50 | 36 | 72.0% | 50 | 44 | 88.0% | -16.0% |
| agricultural products | 2 | 50 | 33 | 66.0% | 50 | 35 | 70.0% | -4.0% |
| agricultural products | 3 | 50 | 35 | 70.0% | 50 | 28 | 56.0% | 14.0% |
| agricultural products | 4 | 50 | 44 | 88.0% | 50 | 40 | 80.0% | 8.0% |
| agricultural products | 5 | 50 | 29 | 58.0% | 50 | 41 | 82.0% | -24.0% |
| agricultural products | 6 | 50 | 49 | 98.0% | 50 | 29 | 58.0% | 40.0% |
| agricultural products | 7 | 50 | 42 | 84.0% | 50 | 49 | 98.0% | -14.0% |
| agricultural products | 8 | 50 | 50 | 100.0% | 50 | 34 | 68.0% | 32.0% |
| agricultural products | 9 | 50 | 40 | 80.0% | 50 | 37 | 74.0% | 6.0% |
| agricultural products | 10 | 50 | 44 | 88.0% | 50 | 41 | 82.0% | 6.0% |
| beauty | 1 | 50 | 11 | 22.0% | 50 | 13 | 26.0% | -4.0% |
| beauty | 2 | 50 | 23 | 46.0% | 50 | 20 | 40.0% | 6.0% |
| beauty | 3 | 50 | 10 | 20.0% | 50 | 13 | 26.0% | -6.0% |
| beauty | 4 | 50 | 20 | 40.0% | 50 | 17 | 34.0% | 6.0% |
| beauty | 5 | 50 | 16 | 32.0% | 50 | 24 | 48.0% | -16.0% |
| beauty | 6 | 50 | 28 | 56.0% | 50 | 11 | 22.0% | 34.0% |
| beauty | 7 | 50 | 29 | 58.0% | 50 | 30 | 60.0% | -2.0% |
| beauty | 8 | 50 | 25 | 50.0% | 50 | 24 | 48.0% | 2.0% |
| beauty | 9 | 50 | 22 | 44.0% | 50 | 22 | 44.0% | 0.0% |
| beauty | 10 | 50 | 15 | 30.0% | 50 | 17 | 34.0% | -4.0% |
| fashion | 1 | 50 | 7 | 14.0% | 50 | 5 | 10.0% | 4.0% |
| fashion | 2 | 50 | 13 | 26.0% | 50 | 14 | 28.0% | -2.0% |
| fashion | 3 | 50 | 21 | 42.0% | 50 | 17 | 34.0% | 8.0% |
| fashion | 4 | 50 | 12 | 24.0% | 50 | 12 | 24.0% | 0.0% |
| fashion | 5 | 50 | 8 | 16.0% | 50 | 11 | 22.0% | -6.0% |
| fashion | 6 | 50 | 18 | 36.0% | 50 | 12 | 24.0% | 12.0% |
| fashion | 7 | 50 | 12 | 24.0% | 50 | 20 | 40.0% | -16.0% |
| fashion | 8 | 50 | 22 | 44.0% | 50 | 25 | 50.0% | -6.0% |
| fashion | 9 | 50 | 12 | 24.0% | 50 | 16 | 32.0% | -8.0% |
| fashion | 10 | 50 | 17 | 34.0% | 50 | 17 | 34.0% | 0.0% |

## Keyword Reports
- baby supplement: [provider-comparison.md](baby-supplement/provider-comparison.md)
- agricultural products: [provider-comparison.md](agricultural-products/provider-comparison.md)
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- fashion: [provider-comparison.md](fashion/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
