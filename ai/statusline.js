#!/usr/bin/env node
const fs = require('fs')

const input = fs.readFileSync(0, 'utf8')
const data = JSON.parse(input)

const ANSI = {
  reset: '\u001b[0m',
  magenta: '\u001b[35m',
  cyan: '\u001b[36m',
  yellow: '\u001b[33m',
  green: '\u001b[32m',
  dim: '\u001b[90m',
}

function color(text, code) {
  return `${code}${text}${ANSI.reset}`
}

function toRoundedPercentOrUnknown(value) {
  const n = Number(value)
  return Number.isFinite(n) ? `${Math.round(n)}%` : 'unknown'
}

function toResetSuffix(resetsAt, code, cycleSeconds = 0, format = 'hm') {
  const ts = Number(resetsAt)
  if (!Number.isFinite(ts)) {
    return ''
  }

  const now = Math.floor(Date.now() / 1000)
  let nextTs = ts
  if (nextTs <= now && cycleSeconds > 0) {
    const periods = Math.floor((now - nextTs) / cycleSeconds) + 1
    nextTs += periods * cycleSeconds
  }

  const diff = Math.floor(nextTs - now)
  if (diff <= 0) {
    return ''
  }

  if (format === 'dh') {
    const diffD = Math.floor(diff / 86400)
    const diffH = Math.floor((diff % 86400) / 3600)
    return color(`→ ${diffD}d${diffH}h`, code)
  }

  const diffH = Math.floor(diff / 3600)
  const diffM = Math.floor((diff % 3600) / 60)
  return color(`→ ${diffH}h${diffM}m`, code)
}

/** Pro (Max) : quotas 5h / 7j dans rate_limits */
function hasProRateLimits(rateLimits) {
  if (!rateLimits || typeof rateLimits !== 'object') return false
  return ['five_hour', 'seven_day'].some(k => {
    const b = rateLimits[k]
    return b && (b.used_percentage != null || b.resets_at != null || b.remaining != null)
  })
}

function formatUsd(usd) {
  const n = Number(usd)
  if (!Number.isFinite(n)) return color('?', ANSI.dim)
  if (n === 0) return color('$0.00', ANSI.yellow)
  if (n < 0.01) return color(`$${n.toFixed(4)}`, ANSI.yellow)
  return color(`$${n.toFixed(2)}`, ANSI.yellow)
}

function formatShortMs(ms) {
  const n = Number(ms)
  if (!Number.isFinite(n) || n < 0) return ''
  if (n < 1000) return `${Math.round(n)}ms`
  const s = Math.floor(n / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rs = s % 60
  return rs ? `${m}m${rs}s` : `${m}m`
}

function buildCostLine(cost) {
  if (!cost || typeof cost !== 'object') return ''
  const parts = []
  parts.push(`💰 ${formatUsd(cost.total_cost_usd)}`)

  const wallMs = cost.total_duration_ms
  const wallN = Number(wallMs)
  const wallShort = Number.isFinite(wallN) && wallN > 0 ? formatShortMs(wallMs) : ''
  const timePart = wallShort ? `⏱ ${wallShort}` : ''
  if (timePart) parts.push(color(timePart, ANSI.green))

  return parts.join(' ')
}

const contextWindow = data.context_window ?? {}
const rateLimits = data.rate_limits ?? {}
const fiveHour = rateLimits.five_hour ?? {}
const sevenDay = rateLimits.seven_day ?? {}
const cost = data.cost

// Model information
const modelName = String(data.model?.display_name ?? 'Unknown model')
const modelInfo = color(modelName, ANSI.magenta)
const rawUsedPct = contextWindow.used_percentage
const usedContextPct = Number.isFinite(rawUsedPct) ? rawUsedPct : NaN

// Token usage
let tokenInfo = ''
const totalIn = Number(contextWindow.total_input_tokens)
const totalOut = Number(contextWindow.total_output_tokens)
if (Number.isFinite(totalIn) && Number.isFinite(totalOut)) {
  const inK = Math.round(totalIn / 1000)
  const outK = Math.round(totalOut / 1000)
  const totalPctInfo = Number.isFinite(usedContextPct)
    ? ` ${color(`(${Math.round(usedContextPct)}%)`, ANSI.cyan)}`
    : ''
  tokenInfo = ` ${color(`↑${inK}k ↓${outK}k`, ANSI.cyan)}${totalPctInfo}`
}

let quotaLine = ''
if (hasProRateLimits(rateLimits)) {
  const fivePct = fiveHour.used_percentage
  const fiveResetSuffix = toResetSuffix(fiveHour.resets_at, ANSI.yellow, 5 * 3600)
  const hourlyBase = color(`⚡ ${toRoundedPercentOrUnknown(fivePct)}`, ANSI.yellow)
  const hourlyInfo = fiveResetSuffix ? `${hourlyBase} ${fiveResetSuffix}` : hourlyBase

  const weekPct = sevenDay.used_percentage
  const weekResetSuffix = toResetSuffix(sevenDay.resets_at, ANSI.green, 0, 'dh')
  const weeklyBase = color(`🕒 ${toRoundedPercentOrUnknown(weekPct)}`, ANSI.green)
  const weeklyInfo = weekResetSuffix ? `${weeklyBase} ${weekResetSuffix}` : weeklyBase

  quotaLine = `${hourlyInfo} ${weeklyInfo}`
} else {
  const costLine = buildCostLine(cost)
  quotaLine = costLine || color('—', ANSI.dim)
}

process.stdout.write(`🦀 ${modelInfo}${tokenInfo}\n      ${quotaLine}\n`)
