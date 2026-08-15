import PostageStamp from "@/components/PostageStamp";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0a21f5] px-4 py-4 text-[#f6efe4] sm:px-6 sm:py-6">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-center text-[clamp(4rem,18vw,14rem)] leading-none tracking-[0.05em]">
          STAMPERS
        </h1>
<div className="flex flex-row items-center justify-center sm:flex-row ">
<div className="flex w-full justify-center ">
  <PostageStamp
    image="https://ik.imagekit.io/adochaure/GIFcollection3-soman-ezgif.com-crop%20(2).gif"
    title="See"
    value="25"
    width="clamp(120px, 32vw, 200px)"
    height="auto"
    imageFit="cover"
  />

  <PostageStamp
    image="https://ik.imagekit.io/adochaure/GIFcollection3-soman-ezgif.com-crop%20(1).gif"
    title="Collect"
    value="25"
    width="clamp(120px, 32vw, 200px)"
    height="auto"
    imageFit="cover"
  />

  <PostageStamp
    image="https://ik.imagekit.io/adochaure/GIFcollection3-soman-ezgif.com-crop%20(3).gif"
    title="Reserve"
    value="25"
    width="clamp(120px, 32vw, 200px)"
    height="auto"
    imageFit="cover"
  />
</div>
</div>

        <button
          type="button"
          className="group flex h-[clamp(2.75rem,6vw,3.75rem)] w-fit items-stretch overflow-hidden border border-[#f6efe4] text-[clamp(0.7rem,1.3vw,1rem)] text-[#f6efe4]"
        >
          <span className="flex items-center px-[clamp(1rem,2vw,1.4rem)] uppercase tracking-[0.18em]">
            Let&apos;s Collect!
          </span>
          <span className="group flex w-[clamp(2.75rem,5vw,3.25rem)] items-center justify-center overflow-hidden bg-[#f6efe4] text-[#0a21f5]">
            <i
              className="hn hn-arrow-right text-[1.8em] transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </section>
  );
}
