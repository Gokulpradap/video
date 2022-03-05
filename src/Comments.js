import React, { useCallback, useEffect, useRef, useState } from "react";
import { CommentArr } from "./Static";

function Comments() {
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  const updated = CommentArr.slice(0, limit);

  const observer = useRef();

  useEffect(() => {
    setLoading(false);
  }, [limit]);

  const lastCommnentObserver = useCallback(
    (node) => {
      console.log(node);
      if (limit > CommentArr.length) return;
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
            setTimeout(() => {
              setLimit((prev) => prev + 10);
            }, 1500);
          }
        },
        { threshold: 1 }
      );

      if (node) observer.current.observe(node);
     
    },
    [loading]
  );

  return (
    <div className="commentLine">
      {updated.map((comment, idx) => (
        <div key={idx} className="comment" ref={lastCommnentObserver}>
          <h5>{comment.name}</h5>
          <p>{comment.comment}</p>
          <hr />
        </div>
      ))}

      {loading && (
        <div className="loading-cont">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default Comments;

