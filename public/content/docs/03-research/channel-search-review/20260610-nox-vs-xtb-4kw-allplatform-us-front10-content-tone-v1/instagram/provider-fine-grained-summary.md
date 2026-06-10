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
| baby supplement | 500 | 28.8% | 0 | 500 | 22.4% | 0 | 6.4% |
| agricultural products | 500 | 18.0% | 0 | 500 | 14.2% | 0 | 3.8% |
| beauty | 500 | 0.8% | 0 | 500 | 1.4% | 0 | -0.6% |
| fashion | 500 | 0.4% | 0 | 500 | 0.8% | 0 | -0.4% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| baby supplement | 1 | 50 | 18 | 36.0% | 50 | 12 | 24.0% | 12.0% |
| baby supplement | 2 | 50 | 17 | 34.0% | 50 | 11 | 22.0% | 12.0% |
| baby supplement | 3 | 50 | 11 | 22.0% | 50 | 11 | 22.0% | 0.0% |
| baby supplement | 4 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| baby supplement | 5 | 50 | 18 | 36.0% | 50 | 9 | 18.0% | 18.0% |
| baby supplement | 6 | 50 | 7 | 14.0% | 50 | 12 | 24.0% | -10.0% |
| baby supplement | 7 | 50 | 14 | 28.0% | 50 | 13 | 26.0% | 2.0% |
| baby supplement | 8 | 50 | 12 | 24.0% | 50 | 11 | 22.0% | 2.0% |
| baby supplement | 9 | 50 | 15 | 30.0% | 50 | 10 | 20.0% | 10.0% |
| baby supplement | 10 | 50 | 18 | 36.0% | 50 | 10 | 20.0% | 16.0% |
| agricultural products | 1 | 50 | 14 | 28.0% | 50 | 6 | 12.0% | 16.0% |
| agricultural products | 2 | 50 | 11 | 22.0% | 50 | 6 | 12.0% | 10.0% |
| agricultural products | 3 | 50 | 6 | 12.0% | 50 | 6 | 12.0% | 0.0% |
| agricultural products | 4 | 50 | 10 | 20.0% | 50 | 7 | 14.0% | 6.0% |
| agricultural products | 5 | 50 | 3 | 6.0% | 50 | 8 | 16.0% | -10.0% |
| agricultural products | 6 | 50 | 5 | 10.0% | 50 | 5 | 10.0% | 0.0% |
| agricultural products | 7 | 50 | 7 | 14.0% | 50 | 7 | 14.0% | 0.0% |
| agricultural products | 8 | 50 | 9 | 18.0% | 50 | 7 | 14.0% | 4.0% |
| agricultural products | 9 | 50 | 13 | 26.0% | 50 | 6 | 12.0% | 14.0% |
| agricultural products | 10 | 50 | 12 | 24.0% | 50 | 13 | 26.0% | -2.0% |
| beauty | 1 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| beauty | 2 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| beauty | 3 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| beauty | 4 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| beauty | 5 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| beauty | 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| beauty | 7 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| beauty | 8 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| beauty | 9 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| beauty | 10 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 1 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 2 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 3 | 50 | 2 | 4.0% | 50 | 1 | 2.0% | 2.0% |
| fashion | 4 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 5 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 6 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| fashion | 7 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 8 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 9 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| fashion | 10 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |

## Keyword Reports
- baby supplement: [provider-comparison.md](baby-supplement/provider-comparison.md)
- agricultural products: [provider-comparison.md](agricultural-products/provider-comparison.md)
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- fashion: [provider-comparison.md](fashion/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
