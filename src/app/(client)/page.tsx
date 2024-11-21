import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <main className="sm:container">
      {/* 검색바 */}
      <SearchBar></SearchBar>

      <h3 className="text-2xl sm:text-4xl font-bold text-slate-500 pt-16 pb-16 text-center uppercase tracking-wide">
        항상 주차 공간이 있습니다.
      </h3>

      <section className="hidden lg:block pt-16 pb-32">
        <div className="grid grid-cols-3 place-items-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-yellow-500 text-white relative justify-center items-center rounded-full w-12 h-12">
              <p className="text-2xl font-bold after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1] after:rounded-full after:bg-gray-100">
                1
              </p>
            </div>
            <p className="pt-2 text-slate-500 text-lg tracking-wide">
              목적지를 입력하시오.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-yellow-500 text-white relative justify-center items-center rounded-full w-12 h-12">
              <p className="text-2xl font-bold after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1] after:rounded-full after:bg-gray-100">
                2
              </p>
            </div>
            <p className="pt-2 text-slate-500 text-lg tracking-wide">
              날짜와 시간을 입력하시오.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-yellow-500 text-white relative justify-center items-center rounded-full w-12 h-12">
              <p className="text-2xl font-bold after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1] after:rounded-full after:bg-gray-100 before:content-[''] before:absolute before:w-[1000px] before:-z-10 before:top-1/2 before:h-[2px] before:-left-[920px] before:bg-yellow-500">
                3
              </p>
            </div>
            <p className="pt-2 text-slate-500 text-lg tracking-wide">
              장소를 정하시오.
            </p>
          </div>
        </div>
      </section>

      <h2 className="text-2xl sm:text-5xl text-center pb-32 text-slate-500">
        더 이상 주차공간을 찾을 수 없습니다.
      </h2>

      {/* <section>홈 화면 UI</section> */}
    </main>
  );
}
