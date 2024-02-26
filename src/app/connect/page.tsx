import Forbid from "@/components/test/Forbid";
import Comment from "@/components/test/Comment";
import Login from "@/components/test/Login";
import Recommend from "@/components/test/Recommend";

export default function Page() {
  return (
    <>
      <Forbid />
      <Comment />
      <Recommend />
      <Login />
    </>
  );
}
