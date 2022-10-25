import React from 'react';
import propTypes from 'prop-types';
import '../styles/Notification.css';

export default function Notification(props) {
  const { notificationList } = props;
  const [list, setList] = React.useState(notificationList);

  React.useEffect(() => {
    setList(notificationList);
  }, [notificationList, list]);

  return (
    <div id="notification-container" className="notification-container">
      {list.map((notification, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="notification">
          <button type="button">X</button>
          <div>
            <p>{notification.title}</p>
            <p>{notification.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

Notification.propTypes = {
  notificationList: propTypes.arrayOf(propTypes.shape).isRequired,
};
