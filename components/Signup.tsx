import PostageStamp from "./PostageStamp";
import Stampframe from "./Stampframe";
import AuthForm from "./AuthForm";
export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  px-4 py-6 sm:flex-row">
      
      {/* IMAGE STAMP */}
      <PostageStamp
        image="https://ik.imagekit.io/adochaure/signin.jpg"
        title="STAMPERS"
        value="COLLECT IT!"
        width="clamp(350px, 32vw, 550px)"
        height="auto"
        imageFit="cover"
        stroke1 = "rgba(255, 85, 85)"
        stroke2="rgba(255, 255, 255)"
      />

      {/* SIGNUP FORM INSIDE STAMP FRAME */}
      <Stampframe
        width="clamp(350px, 32vw, 550px)"
        height="clamp(350px, 32vw, 550px)"
      >
        <AuthForm />
      </Stampframe>

    </div>
  );
}