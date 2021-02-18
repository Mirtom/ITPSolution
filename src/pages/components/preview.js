import React from 'react'

function preview({ meta }) {
    const { name, percent, status, previewUrl } = meta;
  return (
    <div className="preview-box">
      <img src={previewUrl} /> <span className="name">{name}</span> - <span className="status">{status}</span>{status !== "done" && <span className="percent"> ({Math.round(percent)}%)</span>}
    </div>
  )
}

export default preview
