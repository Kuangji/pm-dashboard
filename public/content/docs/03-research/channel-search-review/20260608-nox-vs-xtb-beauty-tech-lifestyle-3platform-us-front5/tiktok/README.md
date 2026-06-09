# tiktok US Channel Search Provider Review

- providers: nox, xtb
- platform: tiktok
- country: us
- page_size: 50
- max_recall_basis: 10000
- page partitions: common-depth comparison; first 10, middle 10, last 10 inside min(provider total pages); overlapping pages deduped

## Provider Overview By Keyword
| keyword | nox_total | nox_badcase率 | nox_failed | xtb_total | xtb_badcase率 | xtb_failed | badcase率差(nox-xtb) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| beauty | 250 | 3.2% | 0 | 250 | 10.4% | 0 | -7.2% |
| tech | 250 | 5.6% | 0 | 250 | 41.6% | 0 | -36.0% |
| lifestyle | 250 | 1.6% | 0 | 250 | 31.6% | 0 | -30.0% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| beauty | 1 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| beauty | 2 | 50 | 0 | 0.0% | 50 | 4 | 8.0% | -8.0% |
| beauty | 3 | 50 | 3 | 6.0% | 50 | 4 | 8.0% | -2.0% |
| beauty | 4 | 50 | 4 | 8.0% | 50 | 6 | 12.0% | -4.0% |
| beauty | 5 | 50 | 0 | 0.0% | 50 | 7 | 14.0% | -14.0% |
| tech | 1 | 50 | 0 | 0.0% | 50 | 5 | 10.0% | -10.0% |
| tech | 2 | 50 | 1 | 2.0% | 50 | 22 | 44.0% | -42.0% |
| tech | 3 | 50 | 5 | 10.0% | 50 | 28 | 56.0% | -46.0% |
| tech | 4 | 50 | 3 | 6.0% | 50 | 26 | 52.0% | -46.0% |
| tech | 5 | 50 | 5 | 10.0% | 50 | 23 | 46.0% | -36.0% |
| lifestyle | 1 | 50 | 2 | 4.0% | 50 | 8 | 16.0% | -12.0% |
| lifestyle | 2 | 50 | 1 | 2.0% | 50 | 17 | 34.0% | -32.0% |
| lifestyle | 3 | 50 | 0 | 0.0% | 50 | 19 | 38.0% | -38.0% |
| lifestyle | 4 | 50 | 0 | 0.0% | 50 | 20 | 40.0% | -40.0% |
| lifestyle | 5 | 50 | 1 | 2.0% | 50 | 15 | 30.0% | -28.0% |

## Keyword Reports
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- tech: [provider-comparison.md](tech/provider-comparison.md)
- lifestyle: [provider-comparison.md](lifestyle/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
