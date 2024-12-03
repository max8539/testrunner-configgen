import type { ConfigType } from "./types"

// Check that a given array of commands appears to be valid
const checkCmdArr = (arr: string[]) => {
  if (typeof (arr.length) !== "number" || arr.length < 0) {
    return false
  }
  for (const cmd of arr) {
    if (typeof (cmd) !== "string" || cmd === "") {
      return false
    }
  }
  return true
}

// Checks that a given filename is valid
const checkFileStr = (str: string | undefined) => {
  if (typeof (str) !== "string" || str === "") {
    return false
  }
}

// Checks that all settings in config.json appear to be valid
// Exit if any are invalid
export const checkConfig = (config: ConfigType) => {
  // General config checks
  if (config.verbose !== undefined && typeof (config.verbose) !== "boolean") {
    return false
  }
  if (config.build !== undefined && !checkCmdArr(config.build)) {
    return false
  }
  if (config.first_failure_exit !== undefined && typeof (config.first_failure_exit) !== "boolean") {
    return false
  }
  if (config.score_exit_code !== undefined && typeof (config.score_exit_code) !== "boolean") {
    return false
  }
  if (config.tests === undefined) {
    return false
  }
  if (!config.tests || typeof (config.tests.length) !== "number" || config.tests.length <= 0) {
    return false
  }

  // Checks for each test
  for (const test of config.tests) {
    if (test.name !== undefined && typeof (test.name) !== "string") {
      return false
    }
    if (test.expect_error !== undefined && typeof (test.expect_error) !== "boolean") {
      return false
    }
    if (test.before_cmds !== undefined && !checkCmdArr(test.before_cmds)) {
      return false
    }
    if (test.run_cmd === undefined || typeof (test.run_cmd) !== "string" || test.run_cmd === "") {
      return false
    }
    if (test.run_timeout !== undefined && (typeof (test.run_timeout) !== "number" || test.run_timeout <= 0)) {
      return false
    }
    if (test.stdin_file !== undefined && !checkFileStr(test.stdin_file)) {
      return false
    }
    if (test.stdout_file !== undefined && !checkFileStr(test.stdout_file)) {
      return false
    }
    if (test.stderr_file !== undefined && !checkFileStr(test.stderr_file)) {
      return false
    }
    if (test.files !== undefined) {
      if (typeof (test.files.length) !== "number" || test.files.length < 0) {
        return false
      }
      for (const files of test.files) {
        if (!(checkFileStr(files.program_file) && checkFileStr(files.check_file))) {
          return false
        }
      }
    }
    if (test.after_cmds !== undefined && !checkCmdArr(test.after_cmds)) {
      return false
    }
    if (test.skip != undefined && typeof (test.skip) !== "boolean") {
      return false
    }
  }

  return true
}
