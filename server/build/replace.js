import mv from 'mv'
import { join } from 'path'
import getConfig from '../config'

// 一時ディレクトリ(buildDir)にあるビルドされたファイルをdir(デフォルトでは .next)に移動する
// 古いものは消す

export default async function replaceCurrentBuild (dir, buildDir) {
  const dist = getConfig(dir).distDir
  const _dir = join(dir, dist)
  const _buildDir = join(buildDir, '.next')
  const oldDir = join(buildDir, '.next.old')

  try {
    await move(_dir, oldDir)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }
  await move(_buildDir, _dir)
  return oldDir
}

function move (from, to) {
  return new Promise((resolve, reject) =>
    mv(from, to, err => err ? reject(err) : resolve()))
}
