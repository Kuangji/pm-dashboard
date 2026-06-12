# youtube US Channel Search Provider Review

- providers: nox, xtb
- platform: youtube
- country: US
- page_size: 50
- max_recall_basis: 10000
- page partitions: common-depth comparison; first 10, middle 10, last 10 inside min(provider total pages); overlapping pages deduped

## Provider Overview By Keyword
| keyword | nox_total | nox_badcase率 | nox_failed | xtb_total | xtb_badcase率 | xtb_failed | badcase率差(nox-xtb) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| baby supplement | 499 | 68.3% | 0 | 499 | 68.7% | 0 | -0.4% |
| agricultural products | 499 | 77.6% | 0 | 499 | 76.2% | 0 | 1.4% |
| beauty | 499 | 66.5% | 0 | 499 | 74.9% | 0 | -8.4% |
| fashion | 499 | 62.3% | 0 | 499 | 61.1% | 0 | 1.2% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| baby supplement | 1 | 49 | 30 | 61.2% | 49 | 36 | 73.5% | -12.2% |
| baby supplement | 2 | 50 | 33 | 66.0% | 50 | 37 | 74.0% | -8.0% |
| baby supplement | 3 | 50 | 28 | 56.0% | 50 | 29 | 58.0% | -2.0% |
| baby supplement | 4 | 50 | 34 | 68.0% | 50 | 33 | 66.0% | 2.0% |
| baby supplement | 5 | 50 | 42 | 84.0% | 50 | 38 | 76.0% | 8.0% |
| baby supplement | 6 | 50 | 31 | 62.0% | 50 | 33 | 66.0% | -4.0% |
| baby supplement | 7 | 50 | 38 | 76.0% | 50 | 40 | 80.0% | -4.0% |
| baby supplement | 8 | 50 | 34 | 68.0% | 50 | 38 | 76.0% | -8.0% |
| baby supplement | 9 | 50 | 35 | 70.0% | 50 | 27 | 54.0% | 16.0% |
| baby supplement | 10 | 50 | 36 | 72.0% | 50 | 32 | 64.0% | 8.0% |
| agricultural products | 1 | 49 | 41 | 83.7% | 49 | 37 | 75.5% | 8.2% |
| agricultural products | 2 | 50 | 42 | 84.0% | 50 | 38 | 76.0% | 8.0% |
| agricultural products | 3 | 50 | 34 | 68.0% | 50 | 38 | 76.0% | -8.0% |
| agricultural products | 4 | 50 | 44 | 88.0% | 50 | 40 | 80.0% | 8.0% |
| agricultural products | 5 | 50 | 43 | 86.0% | 50 | 41 | 82.0% | 4.0% |
| agricultural products | 6 | 50 | 33 | 66.0% | 50 | 39 | 78.0% | -12.0% |
| agricultural products | 7 | 50 | 40 | 80.0% | 50 | 42 | 84.0% | -4.0% |
| agricultural products | 8 | 50 | 35 | 70.0% | 50 | 37 | 74.0% | -4.0% |
| agricultural products | 9 | 50 | 41 | 82.0% | 50 | 35 | 70.0% | 12.0% |
| agricultural products | 10 | 50 | 34 | 68.0% | 50 | 33 | 66.0% | 2.0% |
| beauty | 1 | 49 | 42 | 85.7% | 49 | 43 | 87.8% | -2.0% |
| beauty | 2 | 50 | 22 | 44.0% | 50 | 32 | 64.0% | -20.0% |
| beauty | 3 | 50 | 28 | 56.0% | 50 | 39 | 78.0% | -22.0% |
| beauty | 4 | 50 | 43 | 86.0% | 50 | 46 | 92.0% | -6.0% |
| beauty | 5 | 50 | 36 | 72.0% | 50 | 35 | 70.0% | 2.0% |
| beauty | 6 | 50 | 23 | 46.0% | 50 | 29 | 58.0% | -12.0% |
| beauty | 7 | 50 | 39 | 78.0% | 50 | 39 | 78.0% | 0.0% |
| beauty | 8 | 50 | 34 | 68.0% | 50 | 33 | 66.0% | 2.0% |
| beauty | 9 | 50 | 36 | 72.0% | 50 | 36 | 72.0% | 0.0% |
| beauty | 10 | 50 | 29 | 58.0% | 50 | 42 | 84.0% | -26.0% |
| fashion | 1 | 49 | 22 | 44.9% | 49 | 32 | 65.3% | -20.4% |
| fashion | 2 | 50 | 28 | 56.0% | 50 | 28 | 56.0% | 0.0% |
| fashion | 3 | 50 | 29 | 58.0% | 50 | 24 | 48.0% | 10.0% |
| fashion | 4 | 50 | 34 | 68.0% | 50 | 31 | 62.0% | 6.0% |
| fashion | 5 | 50 | 37 | 74.0% | 50 | 34 | 68.0% | 6.0% |
| fashion | 6 | 50 | 27 | 54.0% | 50 | 28 | 56.0% | -2.0% |
| fashion | 7 | 50 | 34 | 68.0% | 50 | 30 | 60.0% | 8.0% |
| fashion | 8 | 50 | 30 | 60.0% | 50 | 36 | 72.0% | -12.0% |
| fashion | 9 | 50 | 32 | 64.0% | 50 | 32 | 64.0% | 0.0% |
| fashion | 10 | 50 | 38 | 76.0% | 50 | 30 | 60.0% | 16.0% |

## Keyword Reports
- baby supplement: [provider-comparison.md](baby-supplement/provider-comparison.md)
- agricultural products: [provider-comparison.md](agricultural-products/provider-comparison.md)
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- fashion: [provider-comparison.md](fashion/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
