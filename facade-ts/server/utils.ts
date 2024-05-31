import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export function readFile(path: string): string {
  return readFileSync(resolve(__dirname, path), 'utf-8')
}
export function writeFile<T>(path: string, data: T): void {
  return writeFileSync(resolve(__dirname, path), JSON.stringify(data), 'utf-8')
}

export function fileOperator<T>(path: string, callback?: any): string | void {
  let jsonData: T[] = JSON.parse(readFile(path) || '[]')

  if (!callback) {
    return JSON.stringify(jsonData)
  }
  jsonData = callback(jsonData)
  writeFile<T[]>(path, jsonData)
}
