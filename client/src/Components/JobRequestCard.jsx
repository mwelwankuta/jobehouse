import React, { useState } from "react";
import TimeStampToDate from "timestamp-to-date";
import "../Styles/Components/JobRequestCard.css";
import moment from "moment";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  UsersIcon,
} from "@heroicons/react/outline";

function JobRequestCard(props) {
  const { title, date, requests } = props.data;

  const [showRequestsList, setShowRequetsList] = useState(false);

  const readableDate = TimeStampToDate(date, "yyyy-MM-dd HH:mm");
  const time = TimeStampToDate(date, "HH:mm");

  return (
    <div
      className="upcoming-card-holder"
      onClick={() => setShowRequetsList(!showRequestsList)}
    >
      <p className="upcoming-time">
        <span>added {moment(readableDate).fromNow()}</span> <span>{time}</span>
      </p>
      <p className="upcoming-title">{title}</p>

      {showRequestsList && (
        <ul className="requests-list">
          {requests.map((request) => (
            <li key={request.fbID}>
              <p>{request.name}</p>
              <button
                onClick={() =>
                  alert(`are you sure you want to admit ${request.name}`)
                }>
                Admit
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="arrow-down-icon-holder">
        <button onClick={() => setShowRequetsList(!showRequestsList)}>
          {showRequestsList && <ArrowUpIcon height="18px" />}
          {!showRequestsList && <ArrowDownIcon height="18px" />}
        </button>
        <div>
          <UsersIcon height="18px" style={{ color: "#5d7290" }} />
          <small>{requests.length}</small>
        </div>
      </div>
    </div>
  );
}

export default JobRequestCard;
