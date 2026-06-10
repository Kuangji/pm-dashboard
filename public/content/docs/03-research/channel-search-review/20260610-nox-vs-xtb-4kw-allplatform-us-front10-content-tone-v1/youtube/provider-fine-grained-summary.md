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
| baby supplement | 148 | 34.5% | 0 | 165 | 33.9% | 0 | 0.5% |
| agricultural products | 500 | 26.8% | 0 | 500 | 25.2% | 0 | 1.6% |
| beauty | 500 | 4.8% | 0 | 500 | 6.6% | 0 | -1.8% |
| fashion | 500 | 4.6% | 0 | 500 | 4.8% | 0 | -0.2% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| baby supplement | 1 | 50 | 17 | 34.0% | 50 | 15 | 30.0% | 4.0% |
| baby supplement | 2 | 50 | 11 | 22.0% | 50 | 14 | 28.0% | -6.0% |
| baby supplement | 3 | 48 | 23 | 47.9% | 50 | 21 | 42.0% | 5.9% |
| baby supplement | 4 | 0 | 0 | 0.0% | 15 | 6 | 40.0% | -40.0% |
| agricultural products | 1 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| agricultural products | 2 | 50 | 5 | 10.0% | 50 | 10 | 20.0% | -10.0% |
| agricultural products | 3 | 50 | 14 | 28.0% | 50 | 9 | 18.0% | 10.0% |
| agricultural products | 4 | 50 | 14 | 28.0% | 50 | 9 | 18.0% | 10.0% |
| agricultural products | 5 | 50 | 17 | 34.0% | 50 | 11 | 22.0% | 12.0% |
| agricultural products | 6 | 50 | 9 | 18.0% | 50 | 16 | 32.0% | -14.0% |
| agricultural products | 7 | 50 | 14 | 28.0% | 50 | 16 | 32.0% | -4.0% |
| agricultural products | 8 | 50 | 16 | 32.0% | 50 | 14 | 28.0% | 4.0% |
| agricultural products | 9 | 50 | 16 | 32.0% | 50 | 18 | 36.0% | -4.0% |
| agricultural products | 10 | 50 | 19 | 38.0% | 50 | 16 | 32.0% | 6.0% |
| beauty | 1 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| beauty | 2 | 50 | 5 | 10.0% | 50 | 3 | 6.0% | 4.0% |
| beauty | 3 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| beauty | 4 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| beauty | 5 | 50 | 4 | 8.0% | 50 | 8 | 16.0% | -8.0% |
| beauty | 6 | 50 | 3 | 6.0% | 50 | 4 | 8.0% | -2.0% |
| beauty | 7 | 50 | 1 | 2.0% | 50 | 4 | 8.0% | -6.0% |
| beauty | 8 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| beauty | 9 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| beauty | 10 | 50 | 3 | 6.0% | 50 | 4 | 8.0% | -2.0% |
| fashion | 1 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| fashion | 2 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| fashion | 3 | 50 | 2 | 4.0% | 50 | 2 | 4.0% | 0.0% |
| fashion | 4 | 50 | 3 | 6.0% | 50 | 5 | 10.0% | -4.0% |
| fashion | 5 | 50 | 2 | 4.0% | 50 | 2 | 4.0% | 0.0% |
| fashion | 6 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 7 | 50 | 2 | 4.0% | 50 | 3 | 6.0% | -2.0% |
| fashion | 8 | 50 | 3 | 6.0% | 50 | 1 | 2.0% | 4.0% |
| fashion | 9 | 50 | 3 | 6.0% | 50 | 3 | 6.0% | 0.0% |
| fashion | 10 | 50 | 4 | 8.0% | 50 | 5 | 10.0% | -2.0% |

## Keyword Reports
- baby supplement: [provider-comparison.md](baby-supplement/provider-comparison.md)
- agricultural products: [provider-comparison.md](agricultural-products/provider-comparison.md)
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- fashion: [provider-comparison.md](fashion/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
