import React, { useState } from "react";
import { useEffect } from "react";
import Note from "../components/Note";
import { api } from "../utils/api";

const Notes = () => {
   const [content, setContent] = useState("");
   const [data, setData] = useState([]);
   const [newPost, setNewPost] = useState();
   useEffect(() => {
      const getPosts = async () => {
         return await api.get("/api");
      };
      getPosts().then((res) => setData(res.data?.posts));
   }, [newPost]);
   const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await api.post("/api", { content: content });
      setNewPost(res);
      setContent("");
   };

   const deleteAll = async () => {
      const ids = [];
      data.forEach((element) => {
         ids.push(element._id);
      });
      const res = await api.post("/api/deleteAll", { ids });
      setNewPost(res);
   };

   return (
      <div className="notes-container">
         <div className="new-post">
            <form onSubmit={(e) => handleSubmit(e)}>
               <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
               />
               <input type="submit" value="Add" className="button" />
            </form>
         </div>
         {data && data.length > 1 && (
            <div className="delete-all" onClick={deleteAll}>
               Delete all
            </div>
         )}
         <section id="notes">
            {data?.map((x) => (
               <Note key={x._id} data={x} refresh={setNewPost} />
            ))}
         </section>
      </div>
   );
};

export default Notes;
