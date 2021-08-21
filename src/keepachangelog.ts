/**
 * Extract just the body of the version in the given changelog
 * @param changelog
 * @param version
 */
export function extractVersionLines(
  changelog: string,
  version: string
): string {
  const lines = changelog.replace(/\r\n/g, '\n').split('\n')
  const ourVersionLine = lines.findIndex(it => isReleaseVersion(it, version))
  const nextVersionLine = lines.findIndex(
    (line, index) => index > ourVersionLine && isReleaseVersion(line)
  )
  const lastLineOfOurVersion =
    nextVersionLine === -1 ? lines.length - 1 : nextVersionLine - 1
  const firstLineOfOurVersion = ourVersionLine + 1

  const versionLines = lines.splice(
    firstLineOfOurVersion,
    lastLineOfOurVersion - firstLineOfOurVersion
  )
  return versionLines.join('\n')
}

const VERSION_RELEASE_REGEX = /^## \[([^\]]+)\].*/

function isReleaseVersion(line: string, version?: string): boolean {
  const match = VERSION_RELEASE_REGEX.exec(line)
  if (!match) return false
  if (!version || (!!version && match[1] === version)) return true
  return false
}
