import React, { useState, ReactNode, useRef, useEffect } from 'react'

interface PopupProps {
  content: ReactNode;
  children: ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  function togglePopup () {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])

  return (
    <div>
      <div onClick={ togglePopup } style={ { cursor: 'pointer' } }>
        { children }
      </div>
      { isVisible && (
        <div
          ref={ popupRef }
          style={ {
            position: 'absolute',
            zIndex: 1000,
          } }
        >
          { content }
        </div>
      ) }
    </div>
  )
}
