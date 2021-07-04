import React from 'react'
import { connect } from 'react-redux'
// import { setNotification, removeNotification } from "../reducers/notificationReducer"

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification && (
        <div>
          {props.notification}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message
  }
}

export default connect(mapStateToProps)(Notification);
