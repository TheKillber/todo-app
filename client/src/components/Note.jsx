import React from "react";
import { api } from "../utils/api";
const Note = ({ data, refresh }) => {
   const handleDelete = async () => {
      const res = await api.delete(`/api/${data._id}`);
      refresh(res);
   };
   return (
      <div className="note">
         {data.content}
         <div className="x" onClick={handleDelete}>
            <span></span>
            <span></span>
         </div>
      </div>
   );
};

export default Note;
