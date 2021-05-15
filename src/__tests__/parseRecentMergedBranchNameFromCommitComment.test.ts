import { parseRecentMergedBranchNameFromCommitComment } from '../index'
import childProcess from 'child_process'

describe('parseRecentMergedBranchNameFromCommitComment', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('When a branch is most recently merge into master (or any target branch) from github merge button', () => {
    it('should return a branch name from master (or any target branch) in case original comment of the source branch is normal string', () => {
      const mockCommitComment =
        'Merge pull request #96 from tonynguyenit18/feat/add-user implement add user functionality'
      const mockTrim = jest.fn().mockReturnValue(mockCommitComment)
      const mockToString = jest.fn().mockReturnValue({ trim: mockTrim })
      jest.spyOn(childProcess, 'execSync').mockReturnValue({ toString: mockToString } as any)
      const branchName = parseRecentMergedBranchNameFromCommitComment()

      expect(childProcess.execSync).toBeCalledTimes(1)
      expect(childProcess.execSync).toBeCalledWith('git log -1 --pretty=%B')

      expect(mockToString).toBeCalledTimes(1)
      expect(mockTrim).toBeCalledTimes(1)

      expect(branchName).toEqual('feat/add-user')
    })

    it('should return a branch name from master (or any target branch) in case original comment of the source branch is similar pattern with comment auto created by Github when merge by merge button', () => {
      const mockCommitComment =
        'Merge pull request #96 from tonynguyenit18/feat/add-user /create/implement-add-user'
      const mockTrim = jest.fn().mockReturnValue(mockCommitComment)
      const mockToString = jest.fn().mockReturnValue({ trim: mockTrim })
      jest.spyOn(childProcess, 'execSync').mockReturnValue({ toString: mockToString } as any)
      const branchName = parseRecentMergedBranchNameFromCommitComment()

      expect(childProcess.execSync).toBeCalledTimes(1)
      expect(childProcess.execSync).toBeCalledWith('git log -1 --pretty=%B')

      expect(mockToString).toBeCalledTimes(1)
      expect(mockTrim).toBeCalledTimes(1)

      expect(branchName).toEqual('feat/add-user')
    })
  })

  describe('When branch is not merge from github merge button', () => {
    it("should return branch name if the commit of merged branch have pattern 'xxx xxx/branch-name xxx'", () => {
      const mockCommitComment = 'implement add user in branch /feat/add-user'
      const mockTrim = jest.fn().mockReturnValue(mockCommitComment)
      const mockToString = jest.fn().mockReturnValue({ trim: mockTrim })
      jest.spyOn(childProcess, 'execSync').mockReturnValue({ toString: mockToString } as any)
      const branchName = parseRecentMergedBranchNameFromCommitComment()

      expect(childProcess.execSync).toBeCalledTimes(1)
      expect(childProcess.execSync).toBeCalledWith('git log -1 --pretty=%B')

      expect(mockToString).toBeCalledTimes(1)
      expect(mockTrim).toBeCalledTimes(1)

      expect(branchName).toEqual('feat/add-user')
    })

    it("should return INCORRECT branch name if the commit of merged branch have pattern 'xxx xxx/radom-name xxx'", () => {
      const mockCommitComment = 'implement add user in branch /feat/radom-name'
      const mockTrim = jest.fn().mockReturnValue(mockCommitComment)
      const mockToString = jest.fn().mockReturnValue({ trim: mockTrim })
      jest.spyOn(childProcess, 'execSync').mockReturnValue({ toString: mockToString } as any)
      const branchName = parseRecentMergedBranchNameFromCommitComment()

      expect(childProcess.execSync).toBeCalledTimes(1)
      expect(childProcess.execSync).toBeCalledWith('git log -1 --pretty=%B')

      expect(mockToString).toBeCalledTimes(1)
      expect(mockTrim).toBeCalledTimes(1)

      expect(branchName).toEqual('feat/radom-name')
    })

    it('should return undefined if comment does not contains pattern xxx xxx/branch-nam xxx ', () => {
      const mockCommitComment = 'this is a comment'
      const mockTrim = jest.fn().mockReturnValue(mockCommitComment)
      const mockToString = jest.fn().mockReturnValue({ trim: mockTrim })
      jest.spyOn(childProcess, 'execSync').mockReturnValue({ toString: mockToString } as any)
      const branchName = parseRecentMergedBranchNameFromCommitComment()

      expect(childProcess.execSync).toBeCalledTimes(1)
      expect(childProcess.execSync).toBeCalledWith('git log -1 --pretty=%B')

      expect(mockToString).toBeCalledTimes(1)
      expect(mockTrim).toBeCalledTimes(1)

      expect(branchName).toBeUndefined()
    })
  })
})
