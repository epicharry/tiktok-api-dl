import chalk from 'chalk'

export class Logger {
  static success(message: string, ...args: any[]) {
    console.log(chalk.green('✓'), message, ...args)
  }
  static error(message: string, ...args: any[]) {
    console.log(chalk.red('✗'), message, ...args)
  }
  static info(message: string, ...args: any[]) {
    console.log(chalk.blue('ℹ'), message, ...args)
  }
  static warn(message: string, ...args: any[]) {
    console.log(chalk.yellow('⚠'), message, ...args)
  }
  static warning(message: string, ...args: any[]) {
    console.log(chalk.yellow('⚠'), message, ...args)
  }
  static result(message: string, ...args: any[]) {
    console.log(message, ...args)
  }
}

export const logger = Logger
