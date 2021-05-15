# github-action-custom-vars
This repo is to deal with special cases that you want to git information in [Github Actions](https://docs.github.com/en/actions) which is not provided by Github action workflow.
For instance:
- Get branch name which is just merged to main (or any target branch) when run action on main (or any target branch) - **Supported**
- Get commit ids in some cases etc. - **Please create [issues](https://github.com/tonynguyenit18/github-action-custom-vars/issues/new) if you find ourself need a special case, we can work together to figure it out.**

### 1. Most recent merged (source) branch name
**Required** 
- This action need to run on main or any (or any merging target branch)
- The source branch need to be merge from Github Merge button and the auto message must not be change [Look like this](https://raw.githubusercontent.com/tonynguyenit18/github-action-custom-vars/main/docs/images/merge-commit-message.png)
- If the branch is not merged by Github Merge button, you need to specify branch name e.g `xxx xxx/branch-name xxx` in commit message

### Usage

The branch name will be expose by `RECENT_MERGED_BRANCH_NAME` variable

**Example**

```yml
name: "Log RECENT_MERGED_BRANCH_NAME"
on:
    push:
      branches:
        - "main"
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: tonynguyenit18/github-action-custom-vars@v1
      - run: echo $RECENT_MERGED_BRANCH_NAME
```
**Result**
<img width="200" src="https://raw.githubusercontent.com/tonynguyenit18/github-action-custom-vars/main/docs/images/most-recent-merged-branch-name-result.png">

