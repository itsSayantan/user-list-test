import React from "react";

const UserContent = React.memo(({ pageContentData, onUserClick }) => {
  let userContent = (
    <tr>
      <td colSpan="4" style={{ padding: "20px 0" }}>
        No results found
      </td>
    </tr>
  );

  if (pageContentData instanceof Array && pageContentData.length > 0) {
    userContent = pageContentData.map(p => {
      return (
        <tr key={p.id} onClick={() => onUserClick(p.id)}>
          <td>
            <img
              src={p.avatar}
              alt={"Image of " + p.first_name + " " + p.last_name}
              width="20"
              height="20"
            />
          </td>
          <td style={{ textDecoration: "underline", color: "blue" }}>
            {p.email}
          </td>
          <td>{p.first_name}</td>
          <td>{p.last_name}</td>
        </tr>
      );
    });
  }

  return userContent;
});

export default UserContent;
