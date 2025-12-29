'use client'

import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export function Comments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 避免 SSR 问题
  if (!mounted) {
    return (
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>💬 评论区</h2>
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
          加载评论中...
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>💬 评论区</h2>
      <Giscus
        host="https://giscus-proxy.buhzzi.com:3080"
        repo="victkk/FDU-Sharing"
        repoId="R_kgDOQfXLpA"
        category="General"
        categoryId="DIC_kwDOQfXLpM4CzMxq"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  )
}

export default Comments
