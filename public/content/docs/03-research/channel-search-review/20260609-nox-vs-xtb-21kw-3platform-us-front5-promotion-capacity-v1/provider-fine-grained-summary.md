# Provider 细粒度汇总

本文件承载根 README 中不展开的大表：provider × platform × keyword、page-level 对比、召回量和运行耗时。

## Provider × 关键词

| 平台 | 关键词 | nox样本 | nox badcase | xtb样本 | xtb badcase | 平均XTB-Nox | 第1页XTB-Nox | XTB低于nox页数 | nox单频道均耗时 | xtb单频道均耗时 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | coffee machine | 250 | 32.0% | 250 | 42.0% | +10.0pp | +8.0pp | 1/5 | 7.0s | 7.0s |
| youtube | lawn mower | 250 | 20.4% | 250 | 28.8% | +8.4pp | -6.0pp | 2/5 | 7.3s | 7.0s |
| youtube | tech | 250 | 4.4% | 250 | 16.0% | +11.6pp | +0.0pp | 0/5 | 6.1s | 6.5s |
| youtube | fashion | 250 | 3.6% | 250 | 12.4% | +8.8pp | +6.0pp | 0/5 | 4.9s | 5.3s |
| youtube | lifestyle | 250 | 3.6% | 250 | 10.8% | +7.2pp | +8.0pp | 0/5 | 4.5s | 5.2s |
| youtube | power bank | 250 | 19.6% | 250 | 32.0% | +12.4pp | +26.0pp | 1/5 | 6.7s | 6.9s |
| youtube | swim vest | 78 | 50.0% | 82 | 43.9% | -6.1pp | -6.0pp | 2/5 | 5.9s | 7.3s |
| youtube | vacuum cleaner | 250 | 29.6% | 250 | 33.6% | +4.0pp | +10.0pp | 2/5 | 7.2s | 7.0s |
| youtube | baby supplement | 148 | 56.1% | 187 | 49.7% | -9.3pp | -2.0pp | 3/5 | 7.5s | 6.6s |
| youtube | pet food | 250 | 40.4% | 250 | 40.0% | -0.4pp | -2.0pp | 3/5 | 7.1s | 8.6s |
| youtube | yoga mat | 250 | 38.4% | 250 | 39.2% | +0.8pp | +10.0pp | 2/5 | 6.2s | 6.8s |
| youtube | resistance bands | 250 | 12.8% | 250 | 17.6% | +4.8pp | -4.0pp | 1/5 | 6.4s | 7.0s |
| youtube | marathon | 250 | 42.4% | 250 | 31.6% | -10.8pp | +6.0pp | 3/5 | 6.6s | 7.8s |
| youtube | digital products | 250 | 25.6% | 250 | 36.0% | +10.4pp | +16.0pp | 2/5 | 7.8s | 6.9s |
| youtube | vape | 250 | 26.8% | 250 | 36.4% | +9.6pp | +14.0pp | 1/5 | 8.5s | 8.6s |
| youtube | treadmill | 250 | 21.6% | 250 | 38.4% | +16.8pp | +14.0pp | 0/5 | 9.5s | 6.3s |
| youtube | agricultural products | 250 | 46.4% | 250 | 34.8% | -11.6pp | -6.0pp | 5/5 | 7.8s | 6.6s |
| youtube | photography equipment | 250 | 46.4% | 250 | 42.8% | -3.6pp | +16.0pp | 4/5 | 7.8s | 7.5s |
| youtube | Dreame | 250 | 70.8% | 250 | 77.6% | +6.8pp | -14.0pp | 1/5 | 6.2s | 5.5s |
| youtube | kitchen | 250 | 28.4% | 250 | 34.0% | +5.6pp | +22.0pp | 2/5 | 7.6s | 9.3s |
| youtube | beauty | 250 | 3.2% | 250 | 16.0% | +12.8pp | +14.0pp | 1/5 | 5.1s | 6.3s |
| tiktok | coffee machine | 250 | 44.8% | 250 | 56.0% | +11.2pp | +26.0pp | 1/5 | 8.7s | 7.6s |
| tiktok | lawn mower | 250 | 30.8% | 250 | 56.8% | +26.0pp | +10.0pp | 0/5 | 6.8s | 7.1s |
| tiktok | tech | 250 | 5.2% | 250 | 42.0% | +36.8pp | +28.0pp | 0/5 | 6.2s | 6.1s |
| tiktok | fashion | 250 | 0.4% | 250 | 35.2% | +34.8pp | +20.0pp | 0/5 | 4.3s | 6.3s |
| tiktok | lifestyle | 250 | 3.2% | 250 | 51.2% | +48.0pp | +50.0pp | 0/5 | 4.8s | 5.7s |
| tiktok | power bank | 250 | 58.8% | 250 | 76.4% | +17.6pp | +16.0pp | 0/5 | 6.8s | 5.3s |
| tiktok | swim vest | 250 | 61.2% | 250 | 52.4% | -8.8pp | +6.0pp | 3/5 | 6.1s | 6.1s |
| tiktok | vacuum cleaner | 250 | 41.6% | 250 | 73.6% | +32.0pp | +6.0pp | 0/5 | 5.5s | 5.6s |
| tiktok | baby supplement | 250 | 46.0% | 250 | 70.4% | +24.4pp | +20.0pp | 0/5 | 7.6s | 6.9s |
| tiktok | pet food | 250 | 26.4% | 250 | 62.0% | +35.6pp | -2.0pp | 1/5 | 7.9s | 7.0s |
| tiktok | yoga mat | 250 | 41.6% | 250 | 48.8% | +7.2pp | +32.0pp | 1/5 | 6.4s | 5.2s |
| tiktok | resistance bands | 250 | 20.8% | 250 | 41.2% | +20.4pp | +24.0pp | 0/5 | 6.7s | 5.8s |
| tiktok | marathon | 250 | 26.8% | 250 | 53.2% | +26.4pp | +40.0pp | 0/5 | 4.8s | 5.7s |
| tiktok | digital products | 250 | 37.2% | 250 | 50.4% | +13.2pp | +24.0pp | 0/5 | 6.4s | 6.3s |
| tiktok | vape | 250 | 68.8% | 250 | 82.0% | +13.2pp | +22.0pp | 1/5 | 6.4s | 4.7s |
| tiktok | treadmill | 250 | 35.2% | 250 | 56.0% | +20.8pp | +40.0pp | 0/5 | 6.2s | 6.3s |
| tiktok | agricultural products | 250 | 51.2% | 250 | 52.0% | +0.8pp | +12.0pp | 3/5 | 6.8s | 6.9s |
| tiktok | photography equipment | 250 | 58.4% | 250 | 56.4% | -2.0pp | -2.0pp | 2/5 | 6.0s | 5.4s |
| tiktok | Dreame | 250 | 61.2% | 250 | 70.8% | +9.6pp | +6.0pp | 0/5 | 8.1s | 6.0s |
| tiktok | kitchen | 250 | 16.8% | 250 | 50.0% | +33.2pp | +26.0pp | 0/5 | 6.2s | 6.5s |
| tiktok | beauty | 250 | 2.4% | 250 | 40.0% | +37.6pp | +28.0pp | 0/5 | 5.8s | 7.0s |
| instagram | coffee machine | 250 | 34.4% | 250 | 40.0% | +5.6pp | -8.0pp | 2/5 | 6.7s | 8.4s |
| instagram | lawn mower | 250 | 23.2% | 250 | 18.4% | -4.8pp | +6.0pp | 3/5 | 6.3s | 7.0s |
| instagram | tech | 250 | 21.6% | 250 | 27.2% | +5.6pp | +26.0pp | 1/5 | 6.0s | 6.8s |
| instagram | fashion | 250 | 0.8% | 250 | 27.2% | +26.4pp | +24.0pp | 0/5 | 5.5s | 5.8s |
| instagram | lifestyle | 250 | 1.6% | 250 | 43.2% | +41.6pp | +44.0pp | 0/5 | 3.2s | 5.7s |
| instagram | power bank | 250 | 51.6% | 250 | 60.8% | +9.2pp | +38.0pp | 2/5 | 7.2s | 6.9s |
| instagram | swim vest | 250 | 60.0% | 250 | 54.0% | -6.0pp | -14.0pp | 4/5 | 7.4s | 6.8s |
| instagram | vacuum cleaner | 250 | 28.8% | 250 | 29.6% | +0.8pp | +16.0pp | 3/5 | 7.2s | 7.5s |
| instagram | baby supplement | 250 | 26.0% | 250 | 28.0% | +2.0pp | +20.0pp | 2/5 | 6.8s | 7.3s |
| instagram | pet food | 250 | 18.4% | 250 | 22.0% | +3.6pp | +8.0pp | 2/5 | 7.3s | 6.4s |
| instagram | yoga mat | 250 | 14.8% | 250 | 22.0% | +7.2pp | +28.0pp | 1/5 | 5.4s | 7.3s |
| instagram | resistance bands | 250 | 6.0% | 250 | 10.4% | +4.4pp | +2.0pp | 1/5 | 5.3s | 6.2s |
| instagram | marathon | 250 | 10.0% | 250 | 28.0% | +18.0pp | +28.0pp | 0/5 | 4.9s | 6.4s |
| instagram | digital products | 250 | 18.8% | 250 | 42.0% | +23.2pp | +10.0pp | 0/5 | 6.7s | 6.6s |
| instagram | vape | 250 | 22.8% | 250 | 24.4% | +1.6pp | +10.0pp | 2/5 | 6.2s | 6.0s |
| instagram | treadmill | 250 | 18.0% | 250 | 31.6% | +13.6pp | +26.0pp | 0/5 | 5.7s | 6.5s |
| instagram | agricultural products | 250 | 22.8% | 250 | 21.2% | -1.6pp | -12.0pp | 2/5 | 6.6s | 6.6s |
| instagram | photography equipment | 250 | 30.4% | 250 | 42.4% | +12.0pp | +8.0pp | 0/5 | 5.7s | 5.8s |
| instagram | Dreame | 250 | 64.0% | 250 | 67.6% | +3.6pp | +4.0pp | 1/5 | 7.2s | 6.9s |
| instagram | kitchen | 250 | 10.0% | 250 | 20.0% | +10.0pp | +18.0pp | 1/5 | 7.6s | 7.3s |
| instagram | beauty | 250 | 1.2% | 250 | 26.0% | +24.8pp | +16.0pp | 0/5 | 4.5s | 5.7s |

## Page-level 明细

| 平台 | 关键词 | 页码 | nox样本 | nox badcase | xtb样本 | xtb badcase | XTB-Nox |
| --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | coffee machine | 1 | 50 | 30.0% | 50 | 38.0% | +8.0pp |
| youtube | coffee machine | 2 | 50 | 34.0% | 50 | 42.0% | +8.0pp |
| youtube | coffee machine | 3 | 50 | 32.0% | 50 | 42.0% | +10.0pp |
| youtube | coffee machine | 4 | 50 | 30.0% | 50 | 62.0% | +32.0pp |
| youtube | coffee machine | 5 | 50 | 34.0% | 50 | 26.0% | -8.0pp |
| youtube | lawn mower | 1 | 50 | 28.0% | 50 | 22.0% | -6.0pp |
| youtube | lawn mower | 2 | 50 | 26.0% | 50 | 34.0% | +8.0pp |
| youtube | lawn mower | 3 | 50 | 10.0% | 50 | 28.0% | +18.0pp |
| youtube | lawn mower | 4 | 50 | 18.0% | 50 | 46.0% | +28.0pp |
| youtube | lawn mower | 5 | 50 | 20.0% | 50 | 14.0% | -6.0pp |
| youtube | tech | 1 | 50 | 6.0% | 50 | 6.0% | +0.0pp |
| youtube | tech | 2 | 50 | 6.0% | 50 | 18.0% | +12.0pp |
| youtube | tech | 3 | 50 | 0.0% | 50 | 18.0% | +18.0pp |
| youtube | tech | 4 | 50 | 4.0% | 50 | 22.0% | +18.0pp |
| youtube | tech | 5 | 50 | 6.0% | 50 | 16.0% | +10.0pp |
| youtube | fashion | 1 | 50 | 0.0% | 50 | 6.0% | +6.0pp |
| youtube | fashion | 2 | 50 | 6.0% | 50 | 14.0% | +8.0pp |
| youtube | fashion | 3 | 50 | 0.0% | 50 | 18.0% | +18.0pp |
| youtube | fashion | 4 | 50 | 10.0% | 50 | 12.0% | +2.0pp |
| youtube | fashion | 5 | 50 | 2.0% | 50 | 12.0% | +10.0pp |
| youtube | lifestyle | 1 | 50 | 0.0% | 50 | 8.0% | +8.0pp |
| youtube | lifestyle | 2 | 50 | 0.0% | 50 | 10.0% | +10.0pp |
| youtube | lifestyle | 3 | 50 | 8.0% | 50 | 10.0% | +2.0pp |
| youtube | lifestyle | 4 | 50 | 0.0% | 50 | 12.0% | +12.0pp |
| youtube | lifestyle | 5 | 50 | 10.0% | 50 | 14.0% | +4.0pp |
| youtube | power bank | 1 | 50 | 12.0% | 50 | 38.0% | +26.0pp |
| youtube | power bank | 2 | 50 | 28.0% | 50 | 24.0% | -4.0pp |
| youtube | power bank | 3 | 50 | 18.0% | 50 | 30.0% | +12.0pp |
| youtube | power bank | 4 | 50 | 12.0% | 50 | 38.0% | +26.0pp |
| youtube | power bank | 5 | 50 | 28.0% | 50 | 30.0% | +2.0pp |
| youtube | swim vest | 1 | 50 | 50.0% | 50 | 44.0% | -6.0pp |
| youtube | swim vest | 2 | 28 | 50.0% | 32 | 43.8% | -6.3pp |
| youtube | swim vest | 3 | 0 | 0.0% | 0 | 0.0% | +0.0pp |
| youtube | swim vest | 4 | 0 | 0.0% | 0 | 0.0% | +0.0pp |
| youtube | swim vest | 5 | 0 | 0.0% | 0 | 0.0% | +0.0pp |
| youtube | vacuum cleaner | 1 | 50 | 34.0% | 50 | 44.0% | +10.0pp |
| youtube | vacuum cleaner | 2 | 50 | 40.0% | 50 | 36.0% | -4.0pp |
| youtube | vacuum cleaner | 3 | 50 | 28.0% | 50 | 42.0% | +14.0pp |
| youtube | vacuum cleaner | 4 | 50 | 28.0% | 50 | 18.0% | -10.0pp |
| youtube | vacuum cleaner | 5 | 50 | 18.0% | 50 | 28.0% | +10.0pp |
| youtube | baby supplement | 1 | 50 | 54.0% | 50 | 52.0% | -2.0pp |
| youtube | baby supplement | 2 | 50 | 56.0% | 50 | 48.0% | -8.0pp |
| youtube | baby supplement | 3 | 48 | 58.3% | 50 | 40.0% | -18.3pp |
| youtube | baby supplement | 4 | 0 | 0.0% | 37 | 62.2% | +62.2pp |
| youtube | baby supplement | 5 | 0 | 0.0% | 0 | 0.0% | +0.0pp |
| youtube | pet food | 1 | 50 | 42.0% | 50 | 40.0% | -2.0pp |
| youtube | pet food | 2 | 50 | 28.0% | 50 | 48.0% | +20.0pp |
| youtube | pet food | 3 | 50 | 42.0% | 50 | 28.0% | -14.0pp |
| youtube | pet food | 4 | 50 | 40.0% | 50 | 44.0% | +4.0pp |
| youtube | pet food | 5 | 50 | 50.0% | 50 | 40.0% | -10.0pp |
| youtube | yoga mat | 1 | 50 | 26.0% | 50 | 36.0% | +10.0pp |
| youtube | yoga mat | 2 | 50 | 36.0% | 50 | 40.0% | +4.0pp |
| youtube | yoga mat | 3 | 50 | 46.0% | 50 | 36.0% | -10.0pp |
| youtube | yoga mat | 4 | 50 | 44.0% | 50 | 36.0% | -8.0pp |
| youtube | yoga mat | 5 | 50 | 40.0% | 50 | 48.0% | +8.0pp |
| youtube | resistance bands | 1 | 50 | 16.0% | 50 | 12.0% | -4.0pp |
| youtube | resistance bands | 2 | 50 | 6.0% | 50 | 10.0% | +4.0pp |
| youtube | resistance bands | 3 | 50 | 8.0% | 50 | 20.0% | +12.0pp |
| youtube | resistance bands | 4 | 50 | 14.0% | 50 | 26.0% | +12.0pp |
| youtube | resistance bands | 5 | 50 | 20.0% | 50 | 20.0% | +0.0pp |
| youtube | marathon | 1 | 50 | 12.0% | 50 | 18.0% | +6.0pp |
| youtube | marathon | 2 | 50 | 38.0% | 50 | 28.0% | -10.0pp |
| youtube | marathon | 3 | 50 | 46.0% | 50 | 46.0% | +0.0pp |
| youtube | marathon | 4 | 50 | 60.0% | 50 | 44.0% | -16.0pp |
| youtube | marathon | 5 | 50 | 56.0% | 50 | 22.0% | -34.0pp |
| youtube | digital products | 1 | 50 | 2.0% | 50 | 18.0% | +16.0pp |
| youtube | digital products | 2 | 50 | 34.0% | 50 | 32.0% | -2.0pp |
| youtube | digital products | 3 | 50 | 50.0% | 50 | 46.0% | -4.0pp |
| youtube | digital products | 4 | 50 | 28.0% | 50 | 42.0% | +14.0pp |
| youtube | digital products | 5 | 50 | 14.0% | 50 | 42.0% | +28.0pp |
| youtube | vape | 1 | 50 | 24.0% | 50 | 38.0% | +14.0pp |
| youtube | vape | 2 | 50 | 46.0% | 50 | 42.0% | -4.0pp |
| youtube | vape | 3 | 50 | 16.0% | 50 | 44.0% | +28.0pp |
| youtube | vape | 4 | 50 | 20.0% | 50 | 20.0% | +0.0pp |
| youtube | vape | 5 | 50 | 28.0% | 50 | 38.0% | +10.0pp |
| youtube | treadmill | 1 | 50 | 18.0% | 50 | 32.0% | +14.0pp |
| youtube | treadmill | 2 | 50 | 28.0% | 50 | 50.0% | +22.0pp |
| youtube | treadmill | 3 | 50 | 16.0% | 50 | 30.0% | +14.0pp |
| youtube | treadmill | 4 | 50 | 20.0% | 50 | 42.0% | +22.0pp |
| youtube | treadmill | 5 | 50 | 26.0% | 50 | 38.0% | +12.0pp |
| youtube | agricultural products | 1 | 50 | 34.0% | 50 | 28.0% | -6.0pp |
| youtube | agricultural products | 2 | 50 | 36.0% | 50 | 34.0% | -2.0pp |
| youtube | agricultural products | 3 | 50 | 56.0% | 50 | 34.0% | -22.0pp |
| youtube | agricultural products | 4 | 50 | 48.0% | 50 | 36.0% | -12.0pp |
| youtube | agricultural products | 5 | 50 | 58.0% | 50 | 42.0% | -16.0pp |
| youtube | photography equipment | 1 | 50 | 28.0% | 50 | 44.0% | +16.0pp |
| youtube | photography equipment | 2 | 50 | 48.0% | 50 | 40.0% | -8.0pp |
| youtube | photography equipment | 3 | 50 | 58.0% | 50 | 46.0% | -12.0pp |
| youtube | photography equipment | 4 | 50 | 40.0% | 50 | 36.0% | -4.0pp |
| youtube | photography equipment | 5 | 50 | 58.0% | 50 | 48.0% | -10.0pp |
| youtube | Dreame | 1 | 50 | 68.0% | 50 | 54.0% | -14.0pp |
| youtube | Dreame | 2 | 50 | 78.0% | 50 | 92.0% | +14.0pp |
| youtube | Dreame | 3 | 50 | 76.0% | 50 | 90.0% | +14.0pp |
| youtube | Dreame | 4 | 50 | 70.0% | 50 | 70.0% | +0.0pp |
| youtube | Dreame | 5 | 50 | 62.0% | 50 | 82.0% | +20.0pp |
| youtube | kitchen | 1 | 50 | 14.0% | 50 | 36.0% | +22.0pp |
| youtube | kitchen | 2 | 50 | 22.0% | 50 | 36.0% | +14.0pp |
| youtube | kitchen | 3 | 50 | 24.0% | 50 | 34.0% | +10.0pp |
| youtube | kitchen | 4 | 50 | 40.0% | 50 | 34.0% | -6.0pp |
| youtube | kitchen | 5 | 50 | 42.0% | 50 | 30.0% | -12.0pp |
| youtube | beauty | 1 | 50 | 2.0% | 50 | 16.0% | +14.0pp |
| youtube | beauty | 2 | 50 | 10.0% | 50 | 8.0% | -2.0pp |
| youtube | beauty | 3 | 50 | 0.0% | 50 | 20.0% | +20.0pp |
| youtube | beauty | 4 | 50 | 2.0% | 50 | 20.0% | +18.0pp |
| youtube | beauty | 5 | 50 | 2.0% | 50 | 16.0% | +14.0pp |
| tiktok | coffee machine | 1 | 50 | 34.0% | 50 | 60.0% | +26.0pp |
| tiktok | coffee machine | 2 | 50 | 36.0% | 50 | 58.0% | +22.0pp |
| tiktok | coffee machine | 3 | 50 | 44.0% | 50 | 50.0% | +6.0pp |
| tiktok | coffee machine | 4 | 50 | 58.0% | 50 | 48.0% | -10.0pp |
| tiktok | coffee machine | 5 | 50 | 52.0% | 50 | 64.0% | +12.0pp |
| tiktok | lawn mower | 1 | 50 | 32.0% | 50 | 42.0% | +10.0pp |
| tiktok | lawn mower | 2 | 50 | 16.0% | 50 | 60.0% | +44.0pp |
| tiktok | lawn mower | 3 | 50 | 22.0% | 50 | 46.0% | +24.0pp |
| tiktok | lawn mower | 4 | 50 | 28.0% | 50 | 72.0% | +44.0pp |
| tiktok | lawn mower | 5 | 50 | 56.0% | 50 | 64.0% | +8.0pp |
| tiktok | tech | 1 | 50 | 0.0% | 50 | 28.0% | +28.0pp |
| tiktok | tech | 2 | 50 | 6.0% | 50 | 48.0% | +42.0pp |
| tiktok | tech | 3 | 50 | 4.0% | 50 | 44.0% | +40.0pp |
| tiktok | tech | 4 | 50 | 6.0% | 50 | 40.0% | +34.0pp |
| tiktok | tech | 5 | 50 | 10.0% | 50 | 50.0% | +40.0pp |
| tiktok | fashion | 1 | 50 | 2.0% | 50 | 22.0% | +20.0pp |
| tiktok | fashion | 2 | 50 | 0.0% | 50 | 38.0% | +38.0pp |
| tiktok | fashion | 3 | 50 | 0.0% | 50 | 30.0% | +30.0pp |
| tiktok | fashion | 4 | 50 | 0.0% | 50 | 46.0% | +46.0pp |
| tiktok | fashion | 5 | 50 | 0.0% | 50 | 40.0% | +40.0pp |
| tiktok | lifestyle | 1 | 50 | 2.0% | 50 | 52.0% | +50.0pp |
| tiktok | lifestyle | 2 | 50 | 6.0% | 50 | 52.0% | +46.0pp |
| tiktok | lifestyle | 3 | 50 | 2.0% | 50 | 50.0% | +48.0pp |
| tiktok | lifestyle | 4 | 50 | 4.0% | 50 | 60.0% | +56.0pp |
| tiktok | lifestyle | 5 | 50 | 2.0% | 50 | 42.0% | +40.0pp |
| tiktok | power bank | 1 | 50 | 44.0% | 50 | 60.0% | +16.0pp |
| tiktok | power bank | 2 | 50 | 52.0% | 50 | 74.0% | +22.0pp |
| tiktok | power bank | 3 | 50 | 66.0% | 50 | 82.0% | +16.0pp |
| tiktok | power bank | 4 | 50 | 62.0% | 50 | 78.0% | +16.0pp |
| tiktok | power bank | 5 | 50 | 70.0% | 50 | 88.0% | +18.0pp |
| tiktok | swim vest | 1 | 50 | 42.0% | 50 | 48.0% | +6.0pp |
| tiktok | swim vest | 2 | 50 | 72.0% | 50 | 40.0% | -32.0pp |
| tiktok | swim vest | 3 | 50 | 64.0% | 50 | 56.0% | -8.0pp |
| tiktok | swim vest | 4 | 50 | 76.0% | 50 | 60.0% | -16.0pp |
| tiktok | swim vest | 5 | 50 | 52.0% | 50 | 58.0% | +6.0pp |
| tiktok | vacuum cleaner | 1 | 50 | 66.0% | 50 | 72.0% | +6.0pp |
| tiktok | vacuum cleaner | 2 | 50 | 62.0% | 50 | 72.0% | +10.0pp |
| tiktok | vacuum cleaner | 3 | 50 | 50.0% | 50 | 84.0% | +34.0pp |
| tiktok | vacuum cleaner | 4 | 50 | 10.0% | 50 | 76.0% | +66.0pp |
| tiktok | vacuum cleaner | 5 | 50 | 20.0% | 50 | 64.0% | +44.0pp |
| tiktok | baby supplement | 1 | 50 | 54.0% | 50 | 74.0% | +20.0pp |
| tiktok | baby supplement | 2 | 50 | 32.0% | 50 | 72.0% | +40.0pp |
| tiktok | baby supplement | 3 | 50 | 44.0% | 50 | 74.0% | +30.0pp |
| tiktok | baby supplement | 4 | 50 | 40.0% | 50 | 62.0% | +22.0pp |
| tiktok | baby supplement | 5 | 50 | 60.0% | 50 | 70.0% | +10.0pp |
| tiktok | pet food | 1 | 50 | 46.0% | 50 | 44.0% | -2.0pp |
| tiktok | pet food | 2 | 50 | 14.0% | 50 | 66.0% | +52.0pp |
| tiktok | pet food | 3 | 50 | 22.0% | 50 | 58.0% | +36.0pp |
| tiktok | pet food | 4 | 50 | 28.0% | 50 | 74.0% | +46.0pp |
| tiktok | pet food | 5 | 50 | 22.0% | 50 | 68.0% | +46.0pp |
| tiktok | yoga mat | 1 | 50 | 34.0% | 50 | 66.0% | +32.0pp |
| tiktok | yoga mat | 2 | 50 | 28.0% | 50 | 38.0% | +10.0pp |
| tiktok | yoga mat | 3 | 50 | 52.0% | 50 | 58.0% | +6.0pp |
| tiktok | yoga mat | 4 | 50 | 56.0% | 50 | 38.0% | -18.0pp |
| tiktok | yoga mat | 5 | 50 | 38.0% | 50 | 44.0% | +6.0pp |
| tiktok | resistance bands | 1 | 50 | 42.0% | 50 | 66.0% | +24.0pp |
| tiktok | resistance bands | 2 | 50 | 14.0% | 50 | 32.0% | +18.0pp |
| tiktok | resistance bands | 3 | 50 | 10.0% | 50 | 42.0% | +32.0pp |
| tiktok | resistance bands | 4 | 50 | 14.0% | 50 | 34.0% | +20.0pp |
| tiktok | resistance bands | 5 | 50 | 24.0% | 50 | 32.0% | +8.0pp |
| tiktok | marathon | 1 | 50 | 8.0% | 50 | 48.0% | +40.0pp |
| tiktok | marathon | 2 | 50 | 14.0% | 50 | 56.0% | +42.0pp |
| tiktok | marathon | 3 | 50 | 26.0% | 50 | 54.0% | +28.0pp |
| tiktok | marathon | 4 | 50 | 44.0% | 50 | 50.0% | +6.0pp |
| tiktok | marathon | 5 | 50 | 42.0% | 50 | 58.0% | +16.0pp |
| tiktok | digital products | 1 | 50 | 6.0% | 50 | 30.0% | +24.0pp |
| tiktok | digital products | 2 | 50 | 32.0% | 50 | 46.0% | +14.0pp |
| tiktok | digital products | 3 | 50 | 42.0% | 50 | 58.0% | +16.0pp |
| tiktok | digital products | 4 | 50 | 52.0% | 50 | 58.0% | +6.0pp |
| tiktok | digital products | 5 | 50 | 54.0% | 50 | 60.0% | +6.0pp |
| tiktok | vape | 1 | 50 | 56.0% | 50 | 78.0% | +22.0pp |
| tiktok | vape | 2 | 50 | 76.0% | 50 | 82.0% | +6.0pp |
| tiktok | vape | 3 | 50 | 86.0% | 50 | 74.0% | -12.0pp |
| tiktok | vape | 4 | 50 | 74.0% | 50 | 88.0% | +14.0pp |
| tiktok | vape | 5 | 50 | 52.0% | 50 | 88.0% | +36.0pp |
| tiktok | treadmill | 1 | 50 | 20.0% | 50 | 60.0% | +40.0pp |
| tiktok | treadmill | 2 | 50 | 30.0% | 50 | 52.0% | +22.0pp |
| tiktok | treadmill | 3 | 50 | 36.0% | 50 | 44.0% | +8.0pp |
| tiktok | treadmill | 4 | 50 | 44.0% | 50 | 56.0% | +12.0pp |
| tiktok | treadmill | 5 | 50 | 46.0% | 50 | 68.0% | +22.0pp |
| tiktok | agricultural products | 1 | 50 | 36.0% | 50 | 48.0% | +12.0pp |
| tiktok | agricultural products | 2 | 50 | 48.0% | 50 | 46.0% | -2.0pp |
| tiktok | agricultural products | 3 | 50 | 56.0% | 50 | 62.0% | +6.0pp |
| tiktok | agricultural products | 4 | 50 | 60.0% | 50 | 54.0% | -6.0pp |
| tiktok | agricultural products | 5 | 50 | 56.0% | 50 | 50.0% | -6.0pp |
| tiktok | photography equipment | 1 | 50 | 58.0% | 50 | 56.0% | -2.0pp |
| tiktok | photography equipment | 2 | 50 | 60.0% | 50 | 72.0% | +12.0pp |
| tiktok | photography equipment | 3 | 50 | 56.0% | 50 | 58.0% | +2.0pp |
| tiktok | photography equipment | 4 | 50 | 46.0% | 50 | 54.0% | +8.0pp |
| tiktok | photography equipment | 5 | 50 | 72.0% | 50 | 42.0% | -30.0pp |
| tiktok | Dreame | 1 | 50 | 58.0% | 50 | 64.0% | +6.0pp |
| tiktok | Dreame | 2 | 50 | 54.0% | 50 | 76.0% | +22.0pp |
| tiktok | Dreame | 3 | 50 | 58.0% | 50 | 68.0% | +10.0pp |
| tiktok | Dreame | 4 | 50 | 64.0% | 50 | 74.0% | +10.0pp |
| tiktok | Dreame | 5 | 50 | 72.0% | 50 | 72.0% | +0.0pp |
| tiktok | kitchen | 1 | 50 | 22.0% | 50 | 48.0% | +26.0pp |
| tiktok | kitchen | 2 | 50 | 16.0% | 50 | 44.0% | +28.0pp |
| tiktok | kitchen | 3 | 50 | 14.0% | 50 | 58.0% | +44.0pp |
| tiktok | kitchen | 4 | 50 | 22.0% | 50 | 50.0% | +28.0pp |
| tiktok | kitchen | 5 | 50 | 10.0% | 50 | 50.0% | +40.0pp |
| tiktok | beauty | 1 | 50 | 2.0% | 50 | 30.0% | +28.0pp |
| tiktok | beauty | 2 | 50 | 0.0% | 50 | 50.0% | +50.0pp |
| tiktok | beauty | 3 | 50 | 2.0% | 50 | 40.0% | +38.0pp |
| tiktok | beauty | 4 | 50 | 6.0% | 50 | 44.0% | +38.0pp |
| tiktok | beauty | 5 | 50 | 2.0% | 50 | 36.0% | +34.0pp |
| instagram | coffee machine | 1 | 50 | 42.0% | 50 | 34.0% | -8.0pp |
| instagram | coffee machine | 2 | 50 | 32.0% | 50 | 30.0% | -2.0pp |
| instagram | coffee machine | 3 | 50 | 36.0% | 50 | 52.0% | +16.0pp |
| instagram | coffee machine | 4 | 50 | 24.0% | 50 | 42.0% | +18.0pp |
| instagram | coffee machine | 5 | 50 | 38.0% | 50 | 42.0% | +4.0pp |
| instagram | lawn mower | 1 | 50 | 12.0% | 50 | 18.0% | +6.0pp |
| instagram | lawn mower | 2 | 50 | 24.0% | 50 | 30.0% | +6.0pp |
| instagram | lawn mower | 3 | 50 | 24.0% | 50 | 12.0% | -12.0pp |
| instagram | lawn mower | 4 | 50 | 30.0% | 50 | 20.0% | -10.0pp |
| instagram | lawn mower | 5 | 50 | 26.0% | 50 | 12.0% | -14.0pp |
| instagram | tech | 1 | 50 | 4.0% | 50 | 30.0% | +26.0pp |
| instagram | tech | 2 | 50 | 20.0% | 50 | 28.0% | +8.0pp |
| instagram | tech | 3 | 50 | 20.0% | 50 | 24.0% | +4.0pp |
| instagram | tech | 4 | 50 | 32.0% | 50 | 22.0% | -10.0pp |
| instagram | tech | 5 | 50 | 32.0% | 50 | 32.0% | +0.0pp |
| instagram | fashion | 1 | 50 | 2.0% | 50 | 26.0% | +24.0pp |
| instagram | fashion | 2 | 50 | 2.0% | 50 | 26.0% | +24.0pp |
| instagram | fashion | 3 | 50 | 0.0% | 50 | 22.0% | +22.0pp |
| instagram | fashion | 4 | 50 | 0.0% | 50 | 40.0% | +40.0pp |
| instagram | fashion | 5 | 50 | 0.0% | 50 | 22.0% | +22.0pp |
| instagram | lifestyle | 1 | 50 | 0.0% | 50 | 44.0% | +44.0pp |
| instagram | lifestyle | 2 | 50 | 0.0% | 50 | 36.0% | +36.0pp |
| instagram | lifestyle | 3 | 50 | 2.0% | 50 | 52.0% | +50.0pp |
| instagram | lifestyle | 4 | 50 | 2.0% | 50 | 46.0% | +44.0pp |
| instagram | lifestyle | 5 | 50 | 4.0% | 50 | 38.0% | +34.0pp |
| instagram | power bank | 1 | 50 | 22.0% | 50 | 60.0% | +38.0pp |
| instagram | power bank | 2 | 50 | 42.0% | 50 | 62.0% | +20.0pp |
| instagram | power bank | 3 | 50 | 56.0% | 50 | 66.0% | +10.0pp |
| instagram | power bank | 4 | 50 | 70.0% | 50 | 60.0% | -10.0pp |
| instagram | power bank | 5 | 50 | 68.0% | 50 | 56.0% | -12.0pp |
| instagram | swim vest | 1 | 50 | 56.0% | 50 | 42.0% | -14.0pp |
| instagram | swim vest | 2 | 50 | 60.0% | 50 | 54.0% | -6.0pp |
| instagram | swim vest | 3 | 50 | 54.0% | 50 | 46.0% | -8.0pp |
| instagram | swim vest | 4 | 50 | 66.0% | 50 | 60.0% | -6.0pp |
| instagram | swim vest | 5 | 50 | 64.0% | 50 | 68.0% | +4.0pp |
| instagram | vacuum cleaner | 1 | 50 | 26.0% | 50 | 42.0% | +16.0pp |
| instagram | vacuum cleaner | 2 | 50 | 34.0% | 50 | 16.0% | -18.0pp |
| instagram | vacuum cleaner | 3 | 50 | 34.0% | 50 | 24.0% | -10.0pp |
| instagram | vacuum cleaner | 4 | 50 | 36.0% | 50 | 28.0% | -8.0pp |
| instagram | vacuum cleaner | 5 | 50 | 14.0% | 50 | 38.0% | +24.0pp |
| instagram | baby supplement | 1 | 50 | 28.0% | 50 | 48.0% | +20.0pp |
| instagram | baby supplement | 2 | 50 | 20.0% | 50 | 22.0% | +2.0pp |
| instagram | baby supplement | 3 | 50 | 26.0% | 50 | 16.0% | -10.0pp |
| instagram | baby supplement | 4 | 50 | 22.0% | 50 | 26.0% | +4.0pp |
| instagram | baby supplement | 5 | 50 | 34.0% | 50 | 28.0% | -6.0pp |
| instagram | pet food | 1 | 50 | 10.0% | 50 | 18.0% | +8.0pp |
| instagram | pet food | 2 | 50 | 14.0% | 50 | 28.0% | +14.0pp |
| instagram | pet food | 3 | 50 | 12.0% | 50 | 22.0% | +10.0pp |
| instagram | pet food | 4 | 50 | 32.0% | 50 | 20.0% | -12.0pp |
| instagram | pet food | 5 | 50 | 24.0% | 50 | 22.0% | -2.0pp |
| instagram | yoga mat | 1 | 50 | 4.0% | 50 | 32.0% | +28.0pp |
| instagram | yoga mat | 2 | 50 | 8.0% | 50 | 16.0% | +8.0pp |
| instagram | yoga mat | 3 | 50 | 22.0% | 50 | 20.0% | -2.0pp |
| instagram | yoga mat | 4 | 50 | 22.0% | 50 | 22.0% | +0.0pp |
| instagram | yoga mat | 5 | 50 | 18.0% | 50 | 20.0% | +2.0pp |
| instagram | resistance bands | 1 | 50 | 10.0% | 50 | 12.0% | +2.0pp |
| instagram | resistance bands | 2 | 50 | 8.0% | 50 | 8.0% | +0.0pp |
| instagram | resistance bands | 3 | 50 | 0.0% | 50 | 14.0% | +14.0pp |
| instagram | resistance bands | 4 | 50 | 4.0% | 50 | 12.0% | +8.0pp |
| instagram | resistance bands | 5 | 50 | 8.0% | 50 | 6.0% | -2.0pp |
| instagram | marathon | 1 | 50 | 0.0% | 50 | 28.0% | +28.0pp |
| instagram | marathon | 2 | 50 | 12.0% | 50 | 28.0% | +16.0pp |
| instagram | marathon | 3 | 50 | 8.0% | 50 | 32.0% | +24.0pp |
| instagram | marathon | 4 | 50 | 14.0% | 50 | 26.0% | +12.0pp |
| instagram | marathon | 5 | 50 | 16.0% | 50 | 26.0% | +10.0pp |
| instagram | digital products | 1 | 50 | 22.0% | 50 | 32.0% | +10.0pp |
| instagram | digital products | 2 | 50 | 26.0% | 50 | 30.0% | +4.0pp |
| instagram | digital products | 3 | 50 | 30.0% | 50 | 48.0% | +18.0pp |
| instagram | digital products | 4 | 50 | 14.0% | 50 | 54.0% | +40.0pp |
| instagram | digital products | 5 | 50 | 2.0% | 50 | 46.0% | +44.0pp |
| instagram | vape | 1 | 50 | 22.0% | 50 | 32.0% | +10.0pp |
| instagram | vape | 2 | 50 | 44.0% | 50 | 48.0% | +4.0pp |
| instagram | vape | 3 | 50 | 26.0% | 50 | 30.0% | +4.0pp |
| instagram | vape | 4 | 50 | 12.0% | 50 | 10.0% | -2.0pp |
| instagram | vape | 5 | 50 | 10.0% | 50 | 2.0% | -8.0pp |
| instagram | treadmill | 1 | 50 | 10.0% | 50 | 36.0% | +26.0pp |
| instagram | treadmill | 2 | 50 | 14.0% | 50 | 22.0% | +8.0pp |
| instagram | treadmill | 3 | 50 | 22.0% | 50 | 32.0% | +10.0pp |
| instagram | treadmill | 4 | 50 | 26.0% | 50 | 36.0% | +10.0pp |
| instagram | treadmill | 5 | 50 | 18.0% | 50 | 32.0% | +14.0pp |
| instagram | agricultural products | 1 | 50 | 30.0% | 50 | 18.0% | -12.0pp |
| instagram | agricultural products | 2 | 50 | 24.0% | 50 | 22.0% | -2.0pp |
| instagram | agricultural products | 3 | 50 | 16.0% | 50 | 20.0% | +4.0pp |
| instagram | agricultural products | 4 | 50 | 24.0% | 50 | 24.0% | +0.0pp |
| instagram | agricultural products | 5 | 50 | 20.0% | 50 | 22.0% | +2.0pp |
| instagram | photography equipment | 1 | 50 | 24.0% | 50 | 32.0% | +8.0pp |
| instagram | photography equipment | 2 | 50 | 24.0% | 50 | 48.0% | +24.0pp |
| instagram | photography equipment | 3 | 50 | 28.0% | 50 | 40.0% | +12.0pp |
| instagram | photography equipment | 4 | 50 | 34.0% | 50 | 48.0% | +14.0pp |
| instagram | photography equipment | 5 | 50 | 42.0% | 50 | 44.0% | +2.0pp |
| instagram | Dreame | 1 | 50 | 74.0% | 50 | 78.0% | +4.0pp |
| instagram | Dreame | 2 | 50 | 60.0% | 50 | 58.0% | -2.0pp |
| instagram | Dreame | 3 | 50 | 54.0% | 50 | 68.0% | +14.0pp |
| instagram | Dreame | 4 | 50 | 64.0% | 50 | 66.0% | +2.0pp |
| instagram | Dreame | 5 | 50 | 68.0% | 50 | 68.0% | +0.0pp |
| instagram | kitchen | 1 | 50 | 6.0% | 50 | 24.0% | +18.0pp |
| instagram | kitchen | 2 | 50 | 8.0% | 50 | 18.0% | +10.0pp |
| instagram | kitchen | 3 | 50 | 10.0% | 50 | 22.0% | +12.0pp |
| instagram | kitchen | 4 | 50 | 12.0% | 50 | 10.0% | -2.0pp |
| instagram | kitchen | 5 | 50 | 14.0% | 50 | 26.0% | +12.0pp |
| instagram | beauty | 1 | 50 | 0.0% | 50 | 16.0% | +16.0pp |
| instagram | beauty | 2 | 50 | 6.0% | 50 | 30.0% | +24.0pp |
| instagram | beauty | 3 | 50 | 0.0% | 50 | 38.0% | +38.0pp |
| instagram | beauty | 4 | 50 | 0.0% | 50 | 24.0% | +24.0pp |
| instagram | beauty | 5 | 50 | 0.0% | 50 | 22.0% | +22.0pp |

## API 召回量

| 平台 | 关键词 | provider | 实际样本 | API召回量 | API总页数 | .result-count文本(仅保留) | DOM解析值(仅保留) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | coffee machine | nox | 250 | 5213 | 105 | 2813.15万 条结果 | 281315 |
| youtube | coffee machine | xtb | 250 | 5210 | 105 | 2812.6万 条结果 | 28126 |
| youtube | lawn mower | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | lawn mower | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | tech | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | tech | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | fashion | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | fashion | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | lifestyle | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | lifestyle | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | power bank | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | power bank | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | swim vest | nox | 78 | 78 | 2 | 2813.15万 条结果 | 281315 |
| youtube | swim vest | xtb | 82 | 82 | 2 | 2812.6万 条结果 | 28126 |
| youtube | vacuum cleaner | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | vacuum cleaner | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | baby supplement | nox | 148 | 148 | 3 | 2813.15万 条结果 | 281315 |
| youtube | baby supplement | xtb | 187 | 187 | 4 | 2812.6万 条结果 | 28126 |
| youtube | pet food | nox | 250 | 5248 | 105 | 2813.15万 条结果 | 281315 |
| youtube | pet food | xtb | 250 | 5293 | 106 | 2812.6万 条结果 | 28126 |
| youtube | yoga mat | nox | 250 | 1822 | 37 | 2813.15万 条结果 | 281315 |
| youtube | yoga mat | xtb | 250 | 1822 | 37 | 2812.6万 条结果 | 28126 |
| youtube | resistance bands | nox | 250 | 4556 | 92 | 2813.15万 条结果 | 281315 |
| youtube | resistance bands | xtb | 250 | 4555 | 92 | 2812.6万 条结果 | 28126 |
| youtube | marathon | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | marathon | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | digital products | nox | 250 | 7732 | 155 | 2813.15万 条结果 | 281315 |
| youtube | digital products | xtb | 250 | 7898 | 158 | 2812.6万 条结果 | 28126 |
| youtube | vape | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | vape | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | treadmill | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | treadmill | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | agricultural products | nox | 250 | 870 | 18 | 2813.15万 条结果 | 281315 |
| youtube | agricultural products | xtb | 250 | 893 | 18 | 2812.6万 条结果 | 28126 |
| youtube | photography equipment | nox | 250 | 803 | 17 | 2813.15万 条结果 | 281315 |
| youtube | photography equipment | xtb | 250 | 1061 | 22 | 2812.6万 条结果 | 28126 |
| youtube | Dreame | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | Dreame | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | kitchen | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | kitchen | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| youtube | beauty | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| youtube | beauty | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | coffee machine | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | coffee machine | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | lawn mower | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | lawn mower | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | tech | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | tech | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | fashion | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | fashion | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | lifestyle | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | lifestyle | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | power bank | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | power bank | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | swim vest | nox | 250 | 1106 | 23 | 2813.15万 条结果 | 281315 |
| tiktok | swim vest | xtb | 250 | 1112 | 23 | 2812.6万 条结果 | 28126 |
| tiktok | vacuum cleaner | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | vacuum cleaner | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | baby supplement | nox | 250 | 7864 | 158 | 2813.15万 条结果 | 281315 |
| tiktok | baby supplement | xtb | 250 | 8108 | 163 | 2812.6万 条结果 | 28126 |
| tiktok | pet food | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | pet food | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | yoga mat | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | yoga mat | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | resistance bands | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | resistance bands | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | marathon | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | marathon | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | digital products | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | digital products | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | vape | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | vape | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | treadmill | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | treadmill | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | agricultural products | nox | 250 | 4167 | 84 | 2813.15万 条结果 | 281315 |
| tiktok | agricultural products | xtb | 250 | 4160 | 84 | 2812.6万 条结果 | 28126 |
| tiktok | photography equipment | nox | 250 | 3736 | 75 | 2813.15万 条结果 | 281315 |
| tiktok | photography equipment | xtb | 250 | 4186 | 84 | 2812.6万 条结果 | 28126 |
| tiktok | Dreame | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | Dreame | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | kitchen | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | kitchen | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| tiktok | beauty | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| tiktok | beauty | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | coffee machine | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | coffee machine | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | lawn mower | nox | 250 | 7444 | 149 | 2813.15万 条结果 | 281315 |
| instagram | lawn mower | xtb | 250 | 7454 | 150 | 2812.6万 条结果 | 28126 |
| instagram | tech | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | tech | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | fashion | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | fashion | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | lifestyle | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | lifestyle | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | power bank | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | power bank | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | swim vest | nox | 250 | 1356 | 28 | 2813.15万 条结果 | 281315 |
| instagram | swim vest | xtb | 250 | 1362 | 28 | 2812.6万 条结果 | 28126 |
| instagram | vacuum cleaner | nox | 250 | 8315 | 167 | 2813.15万 条结果 | 281315 |
| instagram | vacuum cleaner | xtb | 250 | 8316 | 167 | 2812.6万 条结果 | 28126 |
| instagram | baby supplement | nox | 250 | 9403 | 189 | 2813.15万 条结果 | 281315 |
| instagram | baby supplement | xtb | 250 | 9444 | 189 | 2812.6万 条结果 | 28126 |
| instagram | pet food | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | pet food | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | yoga mat | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | yoga mat | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | resistance bands | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | resistance bands | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | marathon | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | marathon | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | digital products | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | digital products | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | vape | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | vape | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | treadmill | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | treadmill | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | agricultural products | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | agricultural products | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | photography equipment | nox | 250 | 8815 | 177 | 2813.15万 条结果 | 281315 |
| instagram | photography equipment | xtb | 250 | 9122 | 183 | 2812.6万 条结果 | 28126 |
| instagram | Dreame | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | Dreame | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | kitchen | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | kitchen | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |
| instagram | beauty | nox | 250 | 10000 | 200 | 2813.15万 条结果 | 281315 |
| instagram | beauty | xtb | 250 | 10000 | 200 | 2812.6万 条结果 | 28126 |

## 运行耗时

| 平台 | 关键词 | provider | 样本 | 平均单频道耗时 | 平均shard耗时 | shard数 | 规则版本 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| youtube | coffee machine | nox | 250 | 7.0s | 147.7s | 12 | prompt:b87da85cf79a |
| youtube | coffee machine | xtb | 250 | 7.0s | 174.4s | 10 | prompt:b87da85cf79a |
| youtube | lawn mower | nox | 250 | 7.3s | 183.7s | 10 | prompt:b87da85cf79a |
| youtube | lawn mower | xtb | 250 | 7.0s | 174.2s | 10 | prompt:b87da85cf79a |
| youtube | tech | nox | 250 | 6.1s | 140.1s | 11 | prompt:b87da85cf79a |
| youtube | tech | xtb | 250 | 6.5s | 149.0s | 11 | prompt:b87da85cf79a |
| youtube | fashion | nox | 250 | 4.9s | 112.5s | 11 | prompt:b87da85cf79a |
| youtube | fashion | xtb | 250 | 5.3s | 132.0s | 10 | prompt:b87da85cf79a |
| youtube | lifestyle | nox | 250 | 4.5s | 102.5s | 11 | prompt:b87da85cf79a |
| youtube | lifestyle | xtb | 250 | 5.2s | 130.8s | 10 | prompt:b87da85cf79a |
| youtube | power bank | nox | 250 | 6.7s | 167.0s | 10 | prompt:b87da85cf79a |
| youtube | power bank | xtb | 250 | 6.9s | 171.7s | 10 | prompt:b87da85cf79a |
| youtube | swim vest | nox | 78 | 5.9s | 115.1s | 4 | prompt:b87da85cf79a |
| youtube | swim vest | xtb | 82 | 7.3s | 120.5s | 5 | prompt:b87da85cf79a |
| youtube | vacuum cleaner | nox | 250 | 7.2s | 180.5s | 10 | prompt:b87da85cf79a |
| youtube | vacuum cleaner | xtb | 250 | 7.0s | 146.9s | 12 | prompt:b87da85cf79a |
| youtube | baby supplement | nox | 148 | 7.5s | 185.6s | 6 | prompt:b87da85cf79a |
| youtube | baby supplement | xtb | 187 | 6.6s | 155.2s | 8 | prompt:b87da85cf79a |
| youtube | pet food | nox | 250 | 7.1s | 160.9s | 11 | prompt:b87da85cf79a |
| youtube | pet food | xtb | 250 | 8.6s | 64.6s | 37 | prompt:b87da85cf79a |
| youtube | yoga mat | nox | 250 | 6.2s | 154.8s | 10 | prompt:b87da85cf79a |
| youtube | yoga mat | xtb | 250 | 6.8s | 154.7s | 11 | prompt:b87da85cf79a |
| youtube | resistance bands | nox | 250 | 6.4s | 159.3s | 10 | prompt:b87da85cf79a |
| youtube | resistance bands | xtb | 250 | 7.0s | 146.0s | 12 | prompt:b87da85cf79a |
| youtube | marathon | nox | 250 | 6.6s | 166.2s | 10 | prompt:b87da85cf79a |
| youtube | marathon | xtb | 250 | 7.8s | 194.6s | 10 | prompt:b87da85cf79a |
| youtube | digital products | nox | 250 | 7.8s | 194.2s | 10 | prompt:b87da85cf79a |
| youtube | digital products | xtb | 250 | 6.9s | 171.5s | 10 | prompt:b87da85cf79a |
| youtube | vape | nox | 250 | 8.5s | 178.8s | 12 | prompt:b87da85cf79a |
| youtube | vape | xtb | 250 | 8.6s | 146.1s | 15 | prompt:b87da85cf79a |
| youtube | treadmill | nox | 250 | 9.5s | 236.3s | 10 | prompt:b87da85cf79a |
| youtube | treadmill | xtb | 250 | 6.3s | 158.0s | 10 | prompt:b87da85cf79a |
| youtube | agricultural products | nox | 250 | 7.8s | 194.3s | 10 | prompt:b87da85cf79a |
| youtube | agricultural products | xtb | 250 | 6.6s | 150.9s | 11 | prompt:b87da85cf79a |
| youtube | photography equipment | nox | 250 | 7.8s | 194.3s | 10 | prompt:b87da85cf79a |
| youtube | photography equipment | xtb | 250 | 7.5s | 187.9s | 10 | prompt:b87da85cf79a |
| youtube | Dreame | nox | 250 | 6.2s | 153.9s | 10 | prompt:b87da85cf79a |
| youtube | Dreame | xtb | 250 | 5.5s | 126.4s | 11 | prompt:b87da85cf79a |
| youtube | kitchen | nox | 250 | 7.6s | 59.8s | 35 | prompt:b87da85cf79a |
| youtube | kitchen | xtb | 250 | 9.3s | 211.3s | 11 | prompt:b87da85cf79a |
| youtube | beauty | nox | 250 | 5.1s | 128.6s | 10 | prompt:b87da85cf79a |
| youtube | beauty | xtb | 250 | 6.3s | 156.6s | 10 | prompt:b87da85cf79a |
| tiktok | coffee machine | nox | 250 | 8.7s | 218.6s | 10 | prompt:b87da85cf79a |
| tiktok | coffee machine | xtb | 250 | 7.6s | 57.1s | 37 | prompt:b87da85cf79a |
| tiktok | lawn mower | nox | 250 | 6.8s | 169.7s | 10 | prompt:b87da85cf79a |
| tiktok | lawn mower | xtb | 250 | 7.1s | 176.4s | 10 | prompt:b87da85cf79a |
| tiktok | tech | nox | 250 | 6.2s | 153.8s | 10 | prompt:b87da85cf79a |
| tiktok | tech | xtb | 250 | 6.1s | 139.9s | 11 | prompt:b87da85cf79a |
| tiktok | fashion | nox | 250 | 4.3s | 106.9s | 10 | prompt:b87da85cf79a |
| tiktok | fashion | xtb | 250 | 6.3s | 157.8s | 10 | prompt:b87da85cf79a |
| tiktok | lifestyle | nox | 250 | 4.8s | 101.8s | 12 | prompt:b87da85cf79a |
| tiktok | lifestyle | xtb | 250 | 5.7s | 120.9s | 12 | prompt:b87da85cf79a |
| tiktok | power bank | nox | 250 | 6.8s | 170.3s | 10 | prompt:b87da85cf79a |
| tiktok | power bank | xtb | 250 | 5.3s | 131.7s | 10 | prompt:b87da85cf79a |
| tiktok | swim vest | nox | 250 | 6.1s | 152.5s | 10 | prompt:b87da85cf79a |
| tiktok | swim vest | xtb | 250 | 6.1s | 138.3s | 11 | prompt:b87da85cf79a |
| tiktok | vacuum cleaner | nox | 250 | 5.5s | 124.8s | 11 | prompt:b87da85cf79a |
| tiktok | vacuum cleaner | xtb | 250 | 5.6s | 140.7s | 10 | prompt:b87da85cf79a |
| tiktok | baby supplement | nox | 250 | 7.6s | 159.5s | 12 | prompt:b87da85cf79a |
| tiktok | baby supplement | xtb | 250 | 6.9s | 172.5s | 10 | prompt:b87da85cf79a |
| tiktok | pet food | nox | 250 | 7.9s | 166.8s | 12 | prompt:b87da85cf79a |
| tiktok | pet food | xtb | 250 | 7.0s | 174.9s | 10 | prompt:b87da85cf79a |
| tiktok | yoga mat | nox | 250 | 6.4s | 160.4s | 10 | prompt:b87da85cf79a |
| tiktok | yoga mat | xtb | 250 | 5.2s | 119.0s | 11 | prompt:b87da85cf79a |
| tiktok | resistance bands | nox | 250 | 6.7s | 168.4s | 10 | prompt:b87da85cf79a |
| tiktok | resistance bands | xtb | 250 | 5.8s | 143.9s | 10 | prompt:b87da85cf79a |
| tiktok | marathon | nox | 250 | 4.8s | 119.8s | 10 | prompt:b87da85cf79a |
| tiktok | marathon | xtb | 250 | 5.7s | 142.7s | 10 | prompt:b87da85cf79a |
| tiktok | digital products | nox | 250 | 6.4s | 134.9s | 12 | prompt:b87da85cf79a |
| tiktok | digital products | xtb | 250 | 6.3s | 156.3s | 10 | prompt:b87da85cf79a |
| tiktok | vape | nox | 250 | 6.4s | 160.8s | 10 | prompt:b87da85cf79a |
| tiktok | vape | xtb | 250 | 4.7s | 118.4s | 10 | prompt:b87da85cf79a |
| tiktok | treadmill | nox | 250 | 6.2s | 155.4s | 10 | prompt:b87da85cf79a |
| tiktok | treadmill | xtb | 250 | 6.3s | 144.7s | 11 | prompt:b87da85cf79a |
| tiktok | agricultural products | nox | 250 | 6.8s | 169.9s | 10 | prompt:b87da85cf79a |
| tiktok | agricultural products | xtb | 250 | 6.9s | 133.9s | 13 | prompt:b87da85cf79a |
| tiktok | photography equipment | nox | 250 | 6.0s | 149.3s | 10 | prompt:b87da85cf79a |
| tiktok | photography equipment | xtb | 250 | 5.4s | 135.6s | 10 | prompt:b87da85cf79a |
| tiktok | Dreame | nox | 250 | 8.1s | 201.3s | 10 | prompt:b87da85cf79a |
| tiktok | Dreame | xtb | 250 | 6.0s | 149.4s | 10 | prompt:b87da85cf79a |
| tiktok | kitchen | nox | 250 | 6.2s | 155.3s | 10 | prompt:b87da85cf79a |
| tiktok | kitchen | xtb | 250 | 6.5s | 148.3s | 11 | prompt:b87da85cf79a |
| tiktok | beauty | nox | 250 | 5.8s | 144.7s | 10 | prompt:b87da85cf79a |
| tiktok | beauty | xtb | 250 | 7.0s | 174.4s | 10 | prompt:b87da85cf79a |
| instagram | coffee machine | nox | 250 | 6.7s | 166.8s | 10 | prompt:b87da85cf79a |
| instagram | coffee machine | xtb | 250 | 8.4s | 209.1s | 10 | prompt:b87da85cf79a |
| instagram | lawn mower | nox | 250 | 6.3s | 156.6s | 10 | prompt:b87da85cf79a |
| instagram | lawn mower | xtb | 250 | 7.0s | 176.2s | 10 | prompt:b87da85cf79a |
| instagram | tech | nox | 250 | 6.0s | 148.9s | 10 | prompt:b87da85cf79a |
| instagram | tech | xtb | 250 | 6.8s | 170.5s | 10 | prompt:b87da85cf79a |
| instagram | fashion | nox | 250 | 5.5s | 43.5s | 35 | prompt:b87da85cf79a |
| instagram | fashion | xtb | 250 | 5.8s | 145.7s | 10 | prompt:b87da85cf79a |
| instagram | lifestyle | nox | 250 | 3.2s | 79.8s | 10 | prompt:b87da85cf79a |
| instagram | lifestyle | xtb | 250 | 5.7s | 129.9s | 11 | prompt:b87da85cf79a |
| instagram | power bank | nox | 250 | 7.2s | 179.5s | 10 | prompt:b87da85cf79a |
| instagram | power bank | xtb | 250 | 6.9s | 172.3s | 10 | prompt:b87da85cf79a |
| instagram | swim vest | nox | 250 | 7.4s | 185.6s | 10 | prompt:b87da85cf79a |
| instagram | swim vest | xtb | 250 | 6.8s | 169.9s | 10 | prompt:b87da85cf79a |
| instagram | vacuum cleaner | nox | 250 | 7.2s | 179.9s | 10 | prompt:b87da85cf79a |
| instagram | vacuum cleaner | xtb | 250 | 7.5s | 170.5s | 11 | prompt:b87da85cf79a |
| instagram | baby supplement | nox | 250 | 6.8s | 154.5s | 11 | prompt:b87da85cf79a |
| instagram | baby supplement | xtb | 250 | 7.3s | 165.8s | 11 | prompt:b87da85cf79a |
| instagram | pet food | nox | 250 | 7.3s | 181.3s | 10 | prompt:b87da85cf79a |
| instagram | pet food | xtb | 250 | 6.4s | 159.5s | 10 | prompt:b87da85cf79a |
| instagram | yoga mat | nox | 250 | 5.4s | 135.0s | 10 | prompt:b87da85cf79a |
| instagram | yoga mat | xtb | 250 | 7.3s | 165.6s | 11 | prompt:b87da85cf79a |
| instagram | resistance bands | nox | 250 | 5.3s | 131.4s | 10 | prompt:b87da85cf79a |
| instagram | resistance bands | xtb | 250 | 6.2s | 154.4s | 10 | prompt:b87da85cf79a |
| instagram | marathon | nox | 250 | 4.9s | 122.3s | 10 | prompt:b87da85cf79a |
| instagram | marathon | xtb | 250 | 6.4s | 160.5s | 10 | prompt:b87da85cf79a |
| instagram | digital products | nox | 250 | 6.7s | 167.9s | 10 | prompt:b87da85cf79a |
| instagram | digital products | xtb | 250 | 6.6s | 164.3s | 10 | prompt:b87da85cf79a |
| instagram | vape | nox | 250 | 6.2s | 140.3s | 11 | prompt:b87da85cf79a |
| instagram | vape | xtb | 250 | 6.0s | 149.8s | 10 | prompt:b87da85cf79a |
| instagram | treadmill | nox | 250 | 5.7s | 141.8s | 10 | prompt:b87da85cf79a |
| instagram | treadmill | xtb | 250 | 6.5s | 162.8s | 10 | prompt:b87da85cf79a |
| instagram | agricultural products | nox | 250 | 6.6s | 165.3s | 10 | prompt:b87da85cf79a |
| instagram | agricultural products | xtb | 250 | 6.6s | 149.5s | 11 | prompt:b87da85cf79a |
| instagram | photography equipment | nox | 250 | 5.7s | 142.1s | 10 | prompt:b87da85cf79a |
| instagram | photography equipment | xtb | 250 | 5.8s | 144.1s | 10 | prompt:b87da85cf79a |
| instagram | Dreame | nox | 250 | 7.2s | 180.3s | 10 | prompt:b87da85cf79a |
| instagram | Dreame | xtb | 250 | 6.9s | 173.7s | 10 | prompt:b87da85cf79a |
| instagram | kitchen | nox | 250 | 7.6s | 58.5s | 36 | prompt:b87da85cf79a |
| instagram | kitchen | xtb | 250 | 7.3s | 182.1s | 10 | prompt:b87da85cf79a |
| instagram | beauty | nox | 250 | 4.5s | 112.6s | 10 | prompt:b87da85cf79a |
| instagram | beauty | xtb | 250 | 5.7s | 141.5s | 10 | prompt:b87da85cf79a |
