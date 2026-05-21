# YouTube US Channel Search Provider Review - Agent Scored Summary

- Scope: YouTube / US / dual provider (`nox`, `debugger`).
- Page plan: first 10, middle 10, last 10 pages under page size 50 and max recall 10000; overlaps deduped by actual provider page count.
- Partition aggregation: if a run has 30 planned pages, aggregate by 前10页 / 中间10页 / 最后10页; if fewer than 30 pages, aggregate by 前50%页 / 后50%页.
- Scoring baseline: Agent scoring only. No rule/non-Agent judgments are included.
- Completed Agent-scored provider runs: 20/20.
- Completed full provider comparison pairs: 10/10.
- Missing-data audit after repair: 0 issue runs.

## Overall Status

| keyword | nox total | nox badcase rate | debugger total | debugger badcase rate | delta |
| --- | --- | --- | --- | --- | --- |
| coffee machine | 1485 | 64.1% | 1458 | 52.9% | 11.2% |
| lawn mower | 1488 | 58.8% | 1472 | 54.7% | 4.1% |
| tech | 1500 | 25.5% | 1500 | 18.7% | 6.8% |
| fashion | 1500 | 27.3% | 1500 | 4.6% | 22.7% |
| lifestyle | 1500 | 16.3% | 1500 | 9.0% | 7.3% |
| power bank | 1500 | 53.1% | 1486 | 41.9% | 11.1% |
| swim vest | 68 | 70.6% | 66 | 50.0% | 20.6% |
| vacuum cleaner | 1500 | 58.9% | 1460 | 44.9% | 14.0% |
| baby supplement | 134 | 69.4% | 133 | 57.1% | 12.3% |
| pet food | 1452 | 63.4% | 1452 | 58.9% | 4.5% |

## Page Partition Aggregation

| keyword | partition | nox pages | nox total | nox badcase rate | debugger pages | debugger total | debugger badcase rate | delta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| coffee machine | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 51.6% | 1,2,3,4,5,6,7,8,9,10 | 500 | 39.0% | 12.6% |
| coffee machine | 中间10页 | 46,47,48,49,50,51,52,53,54,55 | 500 | 68.6% | 40,41,42,43,44,45,46,47,48,49 | 500 | 54.2% | 14.4% |
| coffee machine | 最后10页 | 91,92,93,94,95,96,97,98,99,100 | 485 | 72.4% | 80,81,82,83,84,85,86,87,88,89 | 458 | 66.6% | 5.8% |
| lawn mower | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 31.4% | 1,2,3,4,5,6,7,8,9,10 | 500 | 21.2% | 10.2% |
| lawn mower | 中间10页 | 92,93,94,95,96,97,98,99,100,101 | 500 | 72.2% | 81,82,83,84,85,86,87,88,89,90 | 500 | 65.6% | 6.6% |
| lawn mower | 最后10页 | 183,184,185,186,187,188,189,190,191,192 | 488 | 73.2% | 161,162,163,164,165,166,167,168,169,170 | 472 | 78.6% | -5.4% |
| tech | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 9.4% | 1,2,3,4,5,6,7,8,9,10 | 500 | 3.2% | 6.2% |
| tech | 中间10页 | 96,97,98,99,100,101,102,103,104,105 | 500 | 27.0% | 96,97,98,99,100,101,102,103,104,105 | 500 | 19.8% | 7.2% |
| tech | 最后10页 | 191,192,193,194,195,196,197,198,199,200 | 500 | 40.0% | 191,192,193,194,195,196,197,198,199,200 | 500 | 33.0% | 7.0% |
| fashion | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 4.0% | 1,2,3,4,5,6,7,8,9,10 | 500 | 1.6% | 2.4% |
| fashion | 中间10页 | 96,97,98,99,100,101,102,103,104,105 | 500 | 30.2% | 96,97,98,99,100,101,102,103,104,105 | 500 | 6.2% | 24.0% |
| fashion | 最后10页 | 191,192,193,194,195,196,197,198,199,200 | 500 | 47.8% | 191,192,193,194,195,196,197,198,199,200 | 500 | 6.0% | 41.8% |
| lifestyle | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 4.6% | 1,2,3,4,5,6,7,8,9,10 | 500 | 3.0% | 1.6% |
| lifestyle | 中间10页 | 96,97,98,99,100,101,102,103,104,105 | 500 | 24.6% | 96,97,98,99,100,101,102,103,104,105 | 500 | 8.4% | 16.2% |
| lifestyle | 最后10页 | 191,192,193,194,195,196,197,198,199,200 | 500 | 19.6% | 191,192,193,194,195,196,197,198,199,200 | 500 | 15.6% | 4.0% |
| power bank | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 30.8% | 1,2,3,4,5,6,7,8,9,10 | 500 | 17.0% | 13.8% |
| power bank | 中间10页 | 96,97,98,99,100,101,102,103,104,105 | 500 | 61.0% | 95,96,97,98,99,100,101,102,103,104 | 500 | 50.6% | 10.4% |
| power bank | 最后10页 | 191,192,193,194,195,196,197,198,199,200 | 500 | 67.4% | 189,190,191,192,193,194,195,196,197,198 | 486 | 58.6% | 8.8% |
| swim vest | 前50%页 | 1 | 50 | 68.0% | 1 | 50 | 46.0% | 22.0% |
| swim vest | 后50%页 | 2 | 18 | 77.8% | 2 | 16 | 62.5% | 15.3% |
| vacuum cleaner | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 40.4% | 1,2,3,4,5,6,7,8,9,10 | 500 | 19.6% | 20.8% |
| vacuum cleaner | 中间10页 | 96,97,98,99,100,101,102,103,104,105 | 500 | 71.0% | 93,94,95,96,97,98,99,100,101,102 | 500 | 51.8% | 19.2% |
| vacuum cleaner | 最后10页 | 191,192,193,194,195,196,197,198,199,200 | 500 | 65.2% | 185,186,187,188,189,190,191,192,193,194 | 460 | 64.8% | 0.4% |
| baby supplement | 前50%页 | 1,2 | 100 | 67.0% | 1,2 | 100 | 52.0% | 15.0% |
| baby supplement | 后50%页 | 3 | 34 | 76.5% | 3 | 33 | 72.7% | 3.7% |
| pet food | 前10页 | 1,2,3,4,5,6,7,8,9,10 | 500 | 48.8% | 1,2,3,4,5,6,7,8,9,10 | 500 | 37.0% | 11.8% |
| pet food | 中间10页 | 46,47,48,49,50,51,52,53,54,55 | 500 | 70.2% | 43,44,45,46,47,48,49,50,51,52 | 500 | 70.6% | -0.4% |
| pet food | 最后10页 | 91,92,93,94,95,96,97,98,99,100 | 452 | 72.1% | 86,87,88,89,90,91,92,93,94,95 | 452 | 70.1% | 2.0% |

## Completed Fine-Grained Provider Pairs

| keyword | nox badcase rate | debugger badcase rate | nox-debugger delta | comparison |
| --- | --- | --- | --- | --- |
| coffee machine | 64.1% | 52.9% | 11.2% | coffee-machine/provider-comparison.md |
| lawn mower | 58.8% | 54.7% | 4.1% | lawn-mower/provider-comparison.md |
| tech | 25.5% | 18.7% | 6.8% | tech/provider-comparison.md |
| fashion | 27.3% | 4.6% | 22.7% | fashion/provider-comparison.md |
| lifestyle | 16.3% | 9.0% | 7.3% | lifestyle/provider-comparison.md |
| power bank | 53.1% | 41.9% | 11.1% | power-bank/provider-comparison.md |
| swim vest | 70.6% | 50.0% | 20.6% | swim-vest/provider-comparison.md |
| vacuum cleaner | 58.9% | 44.9% | 14.0% | vacuum-cleaner/provider-comparison.md |
| baby supplement | 69.4% | 57.1% | 12.3% | baby-supplement/provider-comparison.md |
| pet food | 63.4% | 58.9% | 4.5% | pet-food/provider-comparison.md |

## Data Quality Audit

- [missing-data-audit.md](missing-data-audit.md) checks every planned page against normalized records and Agent score results.
- Repaired issue: score merging now treats the same channel appearing at different ranks/pages as distinct recall positions, so page-level counts are no longer swallowed by channel_id de-duplication.

## Artifact Index

- coffee machine: `coffee-machine/nox-youtube/summary.md`, `coffee-machine/debugger-youtube/summary.md`, `coffee-machine/provider-comparison.md`
- lawn mower: `lawn-mower/nox-youtube/summary.md`, `lawn-mower/debugger-youtube/summary.md`, `lawn-mower/provider-comparison.md`
- tech: `tech/nox-youtube/summary.md`, `tech/debugger-youtube/summary.md`, `tech/provider-comparison.md`
- fashion: `fashion/nox-youtube/summary.md`, `fashion/debugger-youtube/summary.md`, `fashion/provider-comparison.md`
- lifestyle: `lifestyle/nox-youtube/summary.md`, `lifestyle/debugger-youtube/summary.md`, `lifestyle/provider-comparison.md`
- power bank: `power-bank/nox-youtube/summary.md`, `power-bank/debugger-youtube/summary.md`, `power-bank/provider-comparison.md`
- swim vest: `swim-vest/nox-youtube/summary.md`, `swim-vest/debugger-youtube/summary.md`, `swim-vest/provider-comparison.md`
- vacuum cleaner: `vacuum-cleaner/nox-youtube/summary.md`, `vacuum-cleaner/debugger-youtube/summary.md`, `vacuum-cleaner/provider-comparison.md`
- baby supplement: `baby-supplement/nox-youtube/summary.md`, `baby-supplement/debugger-youtube/summary.md`, `baby-supplement/provider-comparison.md`
- pet food: `pet-food/nox-youtube/summary.md`, `pet-food/debugger-youtube/summary.md`, `pet-food/provider-comparison.md`
