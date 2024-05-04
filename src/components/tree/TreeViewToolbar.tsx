"use client";



export function TreeViewToolbar() {

  return (
      <div className="z-30 fixed top-20 left-5">

          <div className="mx-auto w-80">

              <label htmlFor="search" className="mb-2 text-sm font-medium sr-only text-white">Поиск</label>
              <input type="search"
                     id="search"
                     placeholder="Фамилия, имя, родословня..."
                     className="block w-full p-3 text-sm
                  rounded-lg
                  focus:none
                  dark:focus:none
                  text-white
                  bg-black
                  bg-opacity-40
                  backdrop-filter
                  backdrop-blur-md
                  border-neutral-800 border-2"/>

              <button type="submit"  className="flex text-white absolute end-1.5 bottom-2 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg className="w-4 h-4 text-white" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
              </button>
          </div>

      </div>
  );
}




