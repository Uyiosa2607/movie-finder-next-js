/* eslint-disable @next/next/no-img-element */
export default function Loading() {
  return (
    <main>
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-screen  bg-white flex items-center justify-center h-screen">
          <img
            className="w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
            src="/img/loading.svg"
            alt="loader"
          />
        </div>
      </div>
    </main>
  );
}
