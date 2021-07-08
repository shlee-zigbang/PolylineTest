import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useScript } from '../hook/useScript'
import { NaverMapUrl } from '../constant'
import { busLines } from '../dummy'

declare var naver: any

export const NaverMap: FunctionComponent<{}> = props => {
  const ref = useRef(null)
  const { loaded } = useScript(NaverMapUrl)
  const [map, setMap] = useState(null)

  // 폴리라인을 최대 몇개까지 그릴 것인가
  const MAX = 80
  const handleClick = () => {
    if (map) {
      const lines = busLines.splice(0, MAX).map(b => {
        return new naver.maps.Polyline({
          map,
          path: b.path.flat(),
        })
      })
      console.log('lines.length', lines.length)
    }
  }

  useEffect(() => {
    if (ref.current && loaded) {
      const options = {
        center: new naver.maps.LatLng(37.497175, 127.027926),
      }

      const map = new naver.maps.Map(ref.current, options)
      setMap(map)
    }
  }, [ref, loaded, setMap])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="map" ref={ref} style={{ width: '100%', height: '100%' }}></div>
      <div style={{ position: 'absolute', top: 0 }}>
        <button onClick={handleClick}>모든노선보기</button>
      </div>
    </div>
  )
}