"use client";

export function TreeViewToolbar() {

  return (
      <div className="z-30 fixed top-20 right-5 w-auto">
          <SearchField />
      </div>
  );
}




function SearchField() {
    return (
        <div className="mx-auto w-80 flex">

            <label htmlFor="search" className="mb-2 text-sm font-medium sr-only text-white">Поиск</label>

            <input type="search"
                   id="search"
                   placeholder="Фамилия, имя, родословня..."
                   className="block w-full p-3 text-sm
                  rounded-l-lg
                  outline-none
                  text-white
                  focus:border-blue-700
                  bg-black
                  bg-opacity-40
                  backdrop-filter
                  backdrop-blur-md
                  border-neutral-800 border"
            />

            <button type="submit"  className="flex justify-center items-center text-white end-1.5 bottom-2 bg-blue-800 hover:bg-blue-700 focus:bg-blue-800 outline-none font-medium rounded-r-lg text-sm px-4 py-2">
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>

        </div>
    )
}
