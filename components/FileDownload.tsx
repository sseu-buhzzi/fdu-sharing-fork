import React from 'react'

interface FileDownloadProps {
  name: string
  path: string
  size?: string
  date?: string
  type?: 'pdf' | 'doc' | 'zip' | 'other'
  numberSplitted?: number
}

const typeIcons: Record<string, string> = {
  pdf: '📕',
  doc: '📘',
  zip: '📦',
  other: '📄',
}

const typeColors: Record<string, string> = {
  pdf: '#e74c3c',
  doc: '#3498db',
  zip: '#f39c12',
  other: '#95a5a6',
}

function singleFileDownload(
  name: string,
  path: string,
  icon: string,
  color: string,
  size?: string | undefined,
  date?: string,
) {

  return (
    <a
      href={path}
      download
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        marginBottom: '8px',
        borderRadius: '8px',
        border: '1px solid #e1e5e9',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',
        backgroundColor: 'var(--nextra-bg)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.transform = 'translateX(4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e1e5e9'
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{name}</div>
        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '2px' }}>
          {size && <span style={{ marginRight: '12px' }}>📦 {size}</span>}
          {date && <span>📅 {date}</span>}
        </div>
      </div>
      <span style={{ 
        fontSize: '1.2rem',
        color: color,
      }}>
        ⬇️
      </span>
    </a>
  )
}

export function FileDownload({ 
  name, 
  path, 
  size, 
  date,
  type = 'pdf',
  numberSplitted = null,
}: FileDownloadProps) {
  const icon = typeIcons[type] || typeIcons.other
  const color = typeColors[type] || typeColors.other
  if (numberSplitted === null) {
    return singleFileDownload(name, path, icon, color, size, date)
  }
  return (
    <div
      style={{
        marginBottom: '8px',
        padding: '8px 8px 0 8px',
        borderRadius: '8px',
        border: '1px solid #e1e5e9',
      }}
    >
      {Array.from({ length: numberSplitted }, (_, i) => {
        const partName = `${name} (Part ${i + 1})`
        const partPath = `${path}.${i.toString().padStart(4, '0')}`
        return singleFileDownload(partName, partPath, icon, color, size, date)
      })}
    </div>
  )
}

export default FileDownload


