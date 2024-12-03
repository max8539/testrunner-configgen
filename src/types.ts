export type FilesType = {
  program_file?: string,
  check_file?: string
}

export type TestType = {
  name?: string,
  expect_error?: boolean,
  before_cmds?: string[],
  run_cmd: string,
  run_timeout?: number,
  stdin_file?: string,
  stdout_file?: string,
  stderr_file?: string,
  files?: FilesType[],
  after_cmds?: string[],
  skip?: boolean
}

export type ConfigType = {
  verbose?: number,
  build?: string[],
  first_failure_exit?: boolean,
  score_exit_code?: boolean,
  tests: TestType[]
}

export type ProjectType = {
  name: string,
  lastModified: number,
  exported: boolean,
  showErrors: boolean,
  config: ConfigType
}

export type StorageType = {
  projects: ProjectType[]
}
