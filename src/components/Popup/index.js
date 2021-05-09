import React from "react";
import Modal from '@material-ui/core/Modal'
import "./styles.css"

export const initialModalState = {title: "", description: "", button: undefined}

export const Popup = (props) => {
  const {title, description, button, onClose} = props

  return (
    <Modal
      open={Boolean(title)}
      onClose={onClose}>
        <div className="modalPopup">  
          <h3>{title}</h3>
          <div>{description}</div>
          {button}
        </div>
    </Modal>
  )
}
