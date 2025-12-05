import React from 'react'

export default function Loader() {
  return (
      <div className={`text-primary`} aria-busy="true">
      <svg width={26} height={26} viewBox="0 0 44 44" stroke="white" aria-label="Loading" role="img">
        <g fill="none" strokeWidth="4">
          <circle cx="22" cy="22" r="18" strokeOpacity=".2"/>
          <path d="M40 22c0-9.94-8.06-18-18-18">
            <animateTransform attributeName="transform" type="rotate" from="0 22 22" to="360 22 22" dur="1s" repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    </div>
  )
}
