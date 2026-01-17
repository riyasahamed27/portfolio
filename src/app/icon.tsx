import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#2563eb', 
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '6px', 
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-1.5px',
          // THIS IS THE HACK: Adds a white stroke around the letters to make them thicker
          textShadow: '0.5px 0 0 white, -0.5px 0 0 white, 0 0.5px 0 white, 0 -0.5px 0 white',
        }}
      >
        RA
      </div>
    ),
    { ...size }
  )
}