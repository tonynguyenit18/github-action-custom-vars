import * as core from '@actions/core'
import childProcess from 'child_process'

enum envVariables {
  'RECENT_MERGED_BRANCH_NAME' = 'RECENT_MERGED_BRANCH_NAME'
}

/**
 * Parse latest commit comment in master which is merged by Merge button in github PR
 *
 * // Example ==> branch name feat/add-user
 * ```
 * Merge pull request #96 from tonynguyenit18/feat/add-user
 * ```
 */
export const parseRecentMergedBranchNameFromCommitComment = () => {
  const getFirstCommitComment = 'git log -1 --pretty=%B'
  const gitBranch = childProcess.execSync(getFirstCommitComment).toString().trim()
  const pattern = /\/(\S+)/g
  if (pattern.test(gitBranch)) {
    return RegExp.$1
  }
}

async function run() {
  try {
    const recentMergedBranchName = parseRecentMergedBranchNameFromCommitComment()
    recentMergedBranchName &&
      core.exportVariable(envVariables.RECENT_MERGED_BRANCH_NAME, recentMergedBranchName)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
