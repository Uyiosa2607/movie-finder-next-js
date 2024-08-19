/* eslint-disable @next/next/no-img-element */
export default function Loading() {
  return (
    <main>
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-screen  bg-white flex items-center justify-center h-screen">
          <img
            className="w-[100px] h-[100px]"
            src="/img/loading.svg"
            alt="loader"
          />
        </div>
      </div>
    </main>
  );
}
