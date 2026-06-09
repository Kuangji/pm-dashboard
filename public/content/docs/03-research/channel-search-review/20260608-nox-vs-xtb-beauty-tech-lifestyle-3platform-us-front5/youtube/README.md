# youtube US Channel Search Provider Review

- providers: nox, xtb
- platform: youtube
- country: us
- page_size: 50
- max_recall_basis: 10000
- page partitions: common-depth comparison; first 10, middle 10, last 10 inside min(provider total pages); overlapping pages deduped

## Provider Overview By Keyword
| keyword | nox_total | nox_badcase率 | nox_failed | xtb_total | xtb_badcase率 | xtb_failed | badcase率差(nox-xtb) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| beauty | 250 | 2.8% | 0 | 250 | 9.2% | 0 | -6.4% |
| tech | 250 | 4.8% | 0 | 250 | 7.6% | 0 | -2.8% |
| lifestyle | 250 | 2.4% | 0 | 250 | 2.0% | 0 | 0.4% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| beauty | 1 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| beauty | 2 | 50 | 4 | 8.0% | 50 | 3 | 6.0% | 2.0% |
| beauty | 3 | 50 | 0 | 0.0% | 50 | 6 | 12.0% | -12.0% |
| beauty | 4 | 50 | 1 | 2.0% | 50 | 5 | 10.0% | -8.0% |
| beauty | 5 | 50 | 1 | 2.0% | 50 | 4 | 8.0% | -6.0% |
| tech | 1 | 50 | 3 | 6.0% | 50 | 2 | 4.0% | 2.0% |
| tech | 2 | 50 | 2 | 4.0% | 50 | 5 | 10.0% | -6.0% |
| tech | 3 | 50 | 3 | 6.0% | 50 | 3 | 6.0% | 0.0% |
| tech | 4 | 50 | 2 | 4.0% | 50 | 3 | 6.0% | -2.0% |
| tech | 5 | 50 | 2 | 4.0% | 50 | 6 | 12.0% | -8.0% |
| lifestyle | 1 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| lifestyle | 2 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| lifestyle | 3 | 50 | 1 | 2.0% | 50 | 1 | 2.0% | 0.0% |
| lifestyle | 4 | 50 | 0 | 0.0% | 50 | 0 | 0.0% | 0.0% |
| lifestyle | 5 | 50 | 5 | 10.0% | 50 | 2 | 4.0% | 6.0% |

## Keyword Reports
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- tech: [provider-comparison.md](tech/provider-comparison.md)
- lifestyle: [provider-comparison.md](lifestyle/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
