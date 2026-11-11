#!/usr/bin/env node
// Read-only macOS application residue inventory. No external npm packages.
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const warnings = []
const apps = new Map()

function recordError(operation, location, error) {
  warnings.push(`${operation}: ${location}: ${error.code || error.message}`)
}
async function entries(location) {
  try { return await fs.readdir(location, { withFileTypes: true }) }
  catch (error) {
    if (error.code !== 'ENOENT') recordError('Cannot read directory', location, error)
    return []
  }
}
async function bundleId(bundle) {
  try {
    const { stdout } = await execFileAsync('/usr/bin/plutil', ['-extract', 'CFBundleIdentifier', 'raw', '-o', '-', path.join(bundle, 'Contents/Info.plist')], { encoding: 'utf8' })
    const id = stdout.trim().toLowerCase()
    return /^[a-z0-9-]+(?:\.[a-z0-9_-]+)+$/.test(id) ? id : null
  } catch {
    return null
  }
}
async function findApps(location, depth = 0) {
  if (depth > 8) return
  for (const entry of await entries(location)) {
    if (!entry.isDirectory()) continue // Never follow symbolic links.
    const item = path.join(location, entry.name)
    if (entry.name.toLowerCase().endsWith('.app')) {
      const id = await bundleId(item)
      if (id) {
        if (!apps.has(id)) apps.set(id, [])
        apps.get(id).push(item)
      } else warnings.push(`Application without readable bundle ID: ${item}`)
      // Nested apps and helpers may have their own bundle identifiers.
      await findApps(path.join(item, 'Contents/Applications'), depth + 1)
      await findApps(path.join(item, 'Contents/Library/LoginItems'), depth + 1)
      await findApps(path.join(item, 'Contents/Helpers'), depth + 1)
    } else if (depth < 8) await findApps(item, depth + 1)
  }
}
async function sizeOf(location) {
  let bytes = 0, complete = true
  const stack = [location]
  while (stack.length) {
    const item = stack.pop()
    let stat
    try { stat = await fs.lstat(item) }
    catch (error) {
      recordError('Cannot inspect', item, error)
      complete = false
      continue
    }
    if (stat.isSymbolicLink()) continue
    if (stat.isFile()) {
      bytes += stat.size
      continue
    }
    if (!stat.isDirectory()) continue
    let children
    try { children = await fs.readdir(item) }
    catch (error) {
      recordError('Cannot read directory', item, error)
      complete = false
      continue
    }
    for (const child of children) stack.push(path.join(item, child))
  }
  return { bytes, complete }
}
function renderReport(rows) {
  const lines = [
    `AppCleaner report: ${rows.length} potential leftovers found.`,
    'Classifications are estimates; verify each item before deleting anything.'
  ]
  if (!rows.length) lines.push('No potential leftovers found.')
  const groups = new Map()
  for (const row of rows) {
    const classification = row[0]
    if (!groups.has(classification)) groups.set(classification, [])
    groups.get(classification).push(row)
  }
  for (const [classification, group] of groups) {
    lines.push('', `${classification} (${group.length})`)
    for (const [, scope, item, id, bytes, complete, explanation] of group) {
      lines.push(
        '',
        `Path: ${JSON.stringify(item)}`,
        `Scope: ${scope}`,
        `Inferred identifier: ${id}`,
        `Size: ${bytes} bytes (complete: ${complete})`,
        `Explanation: ${explanation}`
      )
    }
  }
  return lines.join('\n')
}
function candidateId(name) {
  const id = name.toLowerCase().replace(/\.plist$/, '')
  // Preserve the group prefix in the report, but ignore it when matching.
  const appId = id.replace(/^group\./, '')
  if (!/^[a-z0-9-]+(?:\.[a-z0-9_-]+){2,}$/.test(appId)) return null
  if (!/^(com|org|net|io|app|dev|edu|gov|de|fr|uk|co)\./.test(appId)) return null
  return id
}
function relationship(id, installedIds, namespaces) {
  id = id.replace(/^group\./, '')
  if (id.startsWith('com.apple.')) return 'excluded_apple'
  for (const installed of installedIds) {
    if (id === installed || id.startsWith(`${installed}.`) || installed.startsWith(`${id}.`)) return 'associated_with_installed_app'
  }
  // A shared vendor namespace may contain helpers and shared data.
  const namespace = id.split('.').slice(0, 2).join('.')
  if (namespaces.has(namespace)) return 'shared_vendor_uncertain'
  return 'potential_orphan_unverified'
}

async function main() {
  const home = os.homedir()
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node appcleaner.mjs\n\nRead-only scan of selected macOS application data locations. Prints the report to the terminal.')
    process.exit(0)
  }
  if (args.length) {
    console.error(`Unknown argument: ${args[0]}`)
    process.exit(1)
  }
  if (process.platform !== 'darwin') {
    console.error('This script requires macOS.')
    process.exit(1)
  }

  const appRoots = [path.join(home, 'Applications'), '/Applications', '/System/Applications', '/System/Library/CoreServices']
  const scanRoots = [
    [path.join(home, 'Library/Application Support'), 'user'],
    [path.join(home, 'Library/Caches'), 'user'],
    [path.join(home, 'Library/Preferences'), 'user'],
    [path.join(home, 'Library/Containers'), 'user'],
    [path.join(home, 'Library/Group Containers'), 'user'],
    [path.join(home, 'Library/LaunchAgents'), 'user'],
    ['/Library/Application Support', 'system'],
    ['/Library/Caches', 'system'],
    ['/Library/Preferences', 'system'],
    ['/Library/LaunchAgents', 'system'],
    ['/Library/LaunchDaemons', 'system']
  ]

  console.error('Inventorying applications...')
  for (const root of appRoots) await findApps(root)
  const installedIds = [...apps.keys()]
  if (installedIds.length === 0) {
    console.error('No application bundle IDs were found; refusing to classify items.')
    process.exit(1)
  }
  const namespaces = new Set(installedIds.map(id => id.split('.').slice(0, 2).join('.')))
  const rows = []
  console.error(`Found ${installedIds.length} unique bundle IDs. Scanning selected locations...`)
  for (const [root, scope] of scanRoots) {
    for (const entry of await entries(root)) {
      if (entry.isSymbolicLink()) continue
      const id = candidateId(entry.name)
      if (!id) continue
      const classification = relationship(id, installedIds, namespaces)
      if (classification === 'excluded_apple' || classification === 'associated_with_installed_app') continue
      const item = path.join(root, entry.name)
      const size = await sizeOf(item)
      const explanation = classification === 'shared_vendor_uncertain'
        ? 'Same vendor namespace as an installed app; may be shared or a helper.'
        : 'No matching installed app or vendor namespace found; ownership and orphan status are unverified.'
      rows.push([classification, scope, item, id, size.bytes, size.complete ? 'yes' : 'no', explanation])
    }
  }
  console.log(renderReport(rows))
  if (warnings.length) {
    console.error(`Warnings (${warnings.length}); results may be incomplete:`)
    for (const warning of warnings) console.error(`  ${JSON.stringify(warning)}`)
  }
}

await main()
