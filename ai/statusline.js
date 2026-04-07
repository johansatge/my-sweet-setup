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

const contextWindow = data.context_window ?? {}
const rateLimits = data.rate_limits ?? {}
const fiveHour = rateLimits.five_hour ?? {}
const sevenDay = rateLimits.seven_day ?? {}

// Model information
const modelName = String(data.model?.display_name ?? 'Unknown model')
const modelInfo = color(modelName, ANSI.magenta)
const usedContextPct = Number(contextWindow.used_percentage)

// Token usage
let tokenInfo = ''
const totalIn = Number(contextWindow.total_input_tokens)
const totalOut = Number(contextWindow.total_output_tokens)
if (Number.isFinite(totalIn) && Number.isFinite(totalOut) && totalIn >= 0 && totalOut >= 0) {
  const inK = Math.round(totalIn / 1000)
  const outK = Math.round(totalOut / 1000)
  const totalPctInfo = Number.isFinite(usedContextPct)
    ? ` ${color(`(${Math.round(usedContextPct)}%)`, ANSI.cyan)}`
    : ''
  tokenInfo = ` ${color(`↑${inK}k ↓${outK}k`, ANSI.cyan)}${totalPctInfo}`
}

// Rate limits (5h)
const fivePct = fiveHour.used_percentage
const fiveResetSuffix = toResetSuffix(fiveHour.resets_at, ANSI.yellow, 5 * 3600)
const hourlyBase = color(`⚡ ${toRoundedPercentOrUnknown(fivePct)}`, ANSI.yellow)
const hourlyInfo = fiveResetSuffix ? `${hourlyBase} ${fiveResetSuffix}` : hourlyBase

// Rate limits (7d)
const weekPct = sevenDay.used_percentage
const weekResetSuffix = toResetSuffix(sevenDay.resets_at, ANSI.green, 0, 'dh')
const weeklyBase = color(`🕒 ${toRoundedPercentOrUnknown(weekPct)}`, ANSI.green)
const weeklyInfo = weekResetSuffix ? `${weeklyBase} ${weekResetSuffix}` : weeklyBase

process.stdout.write(
  `🦀 ${modelInfo}${tokenInfo}\n      ${hourlyInfo} ${weeklyInfo}\n`
)
