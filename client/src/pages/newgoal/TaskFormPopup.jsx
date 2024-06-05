// TaskFormPopup.js
import React from 'react';

const TaskFormPopup = ({ onClose }) => {
  // Xử lý logic khi người dùng gửi biểu mẫu

  return (
    <div className="popup">
      <div className="popup-inner">
        {/* Biểu mẫu Task */}
        {/* Gồm các trường name, description, type, from, to */}
        {/* Bổ sung các trường và logic xử lý dữ liệu */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskFormPopup;
