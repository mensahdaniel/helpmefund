"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  addComment,
  Comment,
  getProjectComments,
} from "@/lib/firebase/comments";
import { formatRelativeDate } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { toast } from "sonner";

interface CommentsProps {
  projectId: string;
}

export function Comments({ projectId }: CommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadComments() {
      const projectComments = await getProjectComments(projectId);
      setComments(projectComments);
    }

    loadComments();
  }, [projectId]);

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      await addComment({
        projectId,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userAvatar: user.photoURL || undefined,
        content: newComment,
      });
      setNewComment("");
      await loadComments();
      toast.success("Comment added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments</h3>

      {/* Comment Form */}
      {user && (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[100px]"
          />
          <Button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <UserAvatar
              name={comment.userName}
              image={comment.userAvatar}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {formatRelativeDate(comment.createdAt)}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
