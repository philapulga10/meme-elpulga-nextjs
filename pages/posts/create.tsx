import { PostDetailForm } from "../PostDetailForm";
import { PostDetailSidebar } from "../PostDetailSidebar";
import { useAuthen } from '../../helpers/useAuthen';

export default function PostCreate() {
  useAuthen();

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar />
        </div>
      </div>
    </div>
  )
};

