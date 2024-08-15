import Image from "next/image";

export default function MovieCard(props: any) {
  const { url } = props;

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  const POSTER_SIZE = "w500";

  return (
    <div>
      <Image
        width={500}
        height={500}
        className="object-cover w-[256px] h-[178px]"
        alt=""
        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${url}`}
      />
    </div>
  );
}
