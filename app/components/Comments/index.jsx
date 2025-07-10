"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/comments/commentSlice";

const Comments = ({ comments, leadId, authorId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      await dispatch(
        addComment({ id: leadId, commentText, author: authorId })
      ).unwrap();
      setCommentText("");
      setFormError(null);
    } catch (err) {
      console.error("Submit Error:", err);
      setFormError(err?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white shadow-md dark:bg-boxdark py-8 rounded-lg">
      <div className="max-w-2xl mx-auto px-4">
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment, index) => {
              if (!comment || comment?.error) {
                return (
                  <li key={index} className="text-red-500">
                    Invalid comment
                  </li>
                );
              }

              return (
                <li key={index}>
                  <article className="p-4 bg-gray-50 rounded dark:bg-gray-900">
                    <div className="flex items-center">
                      <p className="text-sm font-semibold text-black dark:text-white mr-3">
                        {comment.author || "Anonymous"}
                      </p>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.commentText}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          {formError && <p className="text-red-500 mb-2">{formError}</p>}
          <div className="mb-4">
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900  dark:focus:border-brand-800"
              placeholder="Write a comment..."
              required
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-[142px] inline-block text-center"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Comments;
