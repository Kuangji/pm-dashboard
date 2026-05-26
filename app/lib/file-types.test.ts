import test from 'node:test'
import assert from 'node:assert/strict'
import { detectFileType, isTextFile } from './file-types'

test('detects common spreadsheet and delimited table formats', () => {
  assert.equal(detectFileType('summary.csv').category, 'table')
  assert.equal(detectFileType('badcases.tsv').category, 'table')
  assert.equal(detectFileType('report.xlsx').category, 'table')
  assert.equal(detectFileType('legacy.xls').category, 'table')
  assert.equal(detectFileType('open-data.ods').category, 'table')
})

test('treats delimited table files as readable text but workbook files as binary-backed tables', () => {
  assert.equal(isTextFile('summary.csv'), true)
  assert.equal(isTextFile('badcases.tsv'), true)
  assert.equal(isTextFile('report.xlsx'), false)
  assert.equal(isTextFile('legacy.xls'), false)
  assert.equal(isTextFile('open-data.ods'), false)
})
