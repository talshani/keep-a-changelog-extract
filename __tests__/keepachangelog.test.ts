import {extractVersionLines} from '../src/keepachangelog'

test('extracting the first and only version', () => {
  const expected = `
### Added

* Something added in 0.0.1`
  const extracted = extractVersionLines(
    `
# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1]
${expected}
    `,
    '0.0.1'
  )
  expect(extracted).toBe(expected)
})

test('extracting the last and only version', () => {
  const expected = `
### Added

* Something added in 0.0.2`
  const extracted = extractVersionLines(
    `
# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2]
${expected}

## [0.0.1]
### Added

* Something added in 0.0.1
    `,
    '0.0.2'
  )
  expect(extracted).toBe(expected)
})
