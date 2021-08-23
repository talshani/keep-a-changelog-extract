import * as core from '@actions/core'
import {extractVersionLines} from './keepachangelog'
import {readFileSync} from 'fs'

async function run(): Promise<void> {
  try {
    const filename = core.getInput('filename') || 'CHANGELOG.md'
    const versionToExtract: string = core.getInput('version')
    core.debug(`Reading changelog from ${filename}`)
    const content = readFileSync(filename).toString()

    const body = extractVersionLines(content, versionToExtract)

    core.setOutput('body', body)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
