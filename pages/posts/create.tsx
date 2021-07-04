import { PostDetailForm } from "../PostDetailForm";
import { PostDetailSidebar } from "../PostDetailSidebar";

export default function PostCreate() {
  return (
    <div className="container">
      <div className="col-lg-8">
        <PostDetailForm />
      </div>
      <div className="col-lg-8">
        <PostDetailSidebar />
      </div>
    </div>
  )
};

