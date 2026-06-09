# instagram US Channel Search Provider Review

- providers: nox, xtb
- platform: instagram
- country: us
- page_size: 50
- max_recall_basis: 10000
- page partitions: common-depth comparison; first 10, middle 10, last 10 inside min(provider total pages); overlapping pages deduped

## Provider Overview By Keyword
| keyword | nox_total | nox_badcase率 | nox_failed | xtb_total | xtb_badcase率 | xtb_failed | badcase率差(nox-xtb) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| beauty | 250 | 2.0% | 0 | 250 | 3.2% | 0 | -1.2% |
| tech | 250 | 22.0% | 0 | 250 | 28.0% | 0 | -6.0% |
| lifestyle | 250 | 2.0% | 0 | 250 | 21.6% | 0 | -19.6% |

## Page-Level Badcase Rate
| keyword | page | nox_total | nox_badcase | nox_badcase率 | xtb_total | xtb_badcase | xtb_badcase率 | badcase率差 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| beauty | 1 | 50 | 0 | 0.0% | 50 | 1 | 2.0% | -2.0% |
| beauty | 2 | 50 | 4 | 8.0% | 50 | 2 | 4.0% | 4.0% |
| beauty | 3 | 50 | 0 | 0.0% | 50 | 3 | 6.0% | -6.0% |
| beauty | 4 | 50 | 1 | 2.0% | 50 | 0 | 0.0% | 2.0% |
| beauty | 5 | 50 | 0 | 0.0% | 50 | 2 | 4.0% | -4.0% |
| tech | 1 | 50 | 2 | 4.0% | 50 | 6 | 12.0% | -8.0% |
| tech | 2 | 50 | 8 | 16.0% | 50 | 15 | 30.0% | -14.0% |
| tech | 3 | 50 | 11 | 22.0% | 50 | 13 | 26.0% | -4.0% |
| tech | 4 | 50 | 16 | 32.0% | 50 | 20 | 40.0% | -8.0% |
| tech | 5 | 50 | 18 | 36.0% | 50 | 16 | 32.0% | 4.0% |
| lifestyle | 1 | 50 | 0 | 0.0% | 50 | 7 | 14.0% | -14.0% |
| lifestyle | 2 | 50 | 0 | 0.0% | 50 | 12 | 24.0% | -24.0% |
| lifestyle | 3 | 50 | 2 | 4.0% | 50 | 14 | 28.0% | -24.0% |
| lifestyle | 4 | 50 | 0 | 0.0% | 50 | 11 | 22.0% | -22.0% |
| lifestyle | 5 | 50 | 3 | 6.0% | 50 | 10 | 20.0% | -14.0% |

## Keyword Reports
- beauty: [provider-comparison.md](beauty/provider-comparison.md)
- tech: [provider-comparison.md](tech/provider-comparison.md)
- lifestyle: [provider-comparison.md](lifestyle/provider-comparison.md)

## Notes
- Badcase labels come from the shared scoring prompt in this skill.
- Page counts are derived from each provider probe response and capped by the 10000 max recall basis.
- Review per-keyword CSV/JSON artifacts before making final product decisions.
