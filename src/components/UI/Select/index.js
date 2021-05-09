import React from "react";
import "./styles.css"

export const Select = (props) => {
  const {title, selected, list, onSelect, placeholder} = props
  const selecterRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const outsideClick = (event) => {
      const selecter = selecterRef.current

      if (selecter && !selecter.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', outsideClick)

    return () => {
      document.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div className="select-container">
      {title && <div className="select-container__title">{title}</div>}
      <div ref={selecterRef} className="select-container__select">
        <div 
          className={"select__selected" + (open ? " select__selected_open" : '')}
          onClick={() => setOpen(!open)}
          >
          {selected || placeholder || "Selected Item"}
        </div>
        {open && (
          <ul className="select__list">
            {list.map((item, index) => (
              item !== selected ? <li 
                key={index} 
                className="select__list-item" 
                onClick={() => onSelect(item)}>
                  {item}
              </li> : null
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
