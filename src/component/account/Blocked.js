import React, { useState } from 'react';
import NextIcon from './assets/Next.png';
import BackIcon from './assets/Back.png';
import UnblockIcon from './assets/Unblock.png';

const Blocked = ({ userData }) => {
  const [blockedUsers, setBlockedUsers] = useState(userData.blocked);
  const [blockedUsersPage, setBlockedUsersPage] = useState(1);
  const blockedUsersItems = blockedUsers.slice((blockedUsersPage - 1) * 10, blockedUsersPage * 10);

  function prevBlockedUsersPage() {
    if (blockedUsersPage > 1) {
      setBlockedUsersPage(blockedUsersPage - 1);
    }
  }

  function nextBlockedUsersPage() {
    if (blockedUsersPage * 10 < blockedUsers.length) {
      setBlockedUsersPage(blockedUsersPage + 1);
    }
  }

  function handleUnblock(e) {
    // Insert API call here
    let indexToDelete;
    if (e.target.tagName === 'IMG') {
      indexToDelete = e.target.parentNode.value;
    } else {
      indexToDelete = e.target.value;
    }
    const newBlockedUsers = [...blockedUsers];
    newBlockedUsers.splice(indexToDelete, 1);
    setBlockedUsers(newBlockedUsers);
    if (newBlockedUsers.length < blockedUsersPage * 10 - 9 && blockedUsersPage > 1) {
      setBlockedUsersPage(blockedUsersPage - 1);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <div>
        <div className="flex">
          <h1>Blocked</h1>
          <div className="flex pagination-bar">
            <button type="button" onClick={prevBlockedUsersPage}>
              <img src={BackIcon} alt="Back Arrow Icon" />
            </button>
            &nbsp;{(blockedUsersPage - 1) * 10 + 1} -&nbsp;
            {blockedUsersPage * 10 > blockedUsers.length
              ? blockedUsers.length : blockedUsersPage * 10}&nbsp;
            of {blockedUsers.length}&nbsp;
            <button type="button" onClick={nextBlockedUsersPage}>
              <img src={NextIcon} alt="Next Arrow Icon" />
            </button>
          </div>
        </div>
        <div className="box">
          <div style={{ padding: '1% 2%' }}>
            <div className="table-row">
              <br />
              <div>
                <br />
              </div>
              <div className="table-item">
                Unblock
              </div>
            </div>
            {blockedUsersItems.map((blockedUser, index) => (
              <div key={blockedUser.pennID} className="table-row">
                <p>
                  {blockedUser.name}
                </p>
                <div>
                  <br />
                </div>
                <div className="table-item">
                  <button type="button" onClick={handleUnblock} value={index}>
                    <img src={UnblockIcon} alt="Unblock Icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocked;
