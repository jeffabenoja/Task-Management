import React from "react"

const Test = () => {
  return (
    <div className='flex gap-2.5 w-[800px] h-[300px] items-center border'>
      <div className='bg-slate-600 h-full w-[300px]'></div>
      {/* <div className='bg-cyan-600 h-full w-[calc(100%-300px)] px-6 overflow-hidden overflow-x-auto flex items-center gap-2.5'>
        <div className='bg-pink-900 w-[200px] h-full shrink-0 p-4 overflow-hidden flex flex-col gap-2 overflow-y-auto'>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
          <div className='bg-black h-[100px] w-full shrink-0'></div>
        </div>
      </div> */}
      <div className='w-[calc(100%-300px)] h-full overflow-hidden'>
        <div className='w-full h-full overflow-x-auto px-4 flex items-center gap-2.5 bg-pink-900'>
          <div className='bg-cyan-900 h-full w-[250px] items-center flex flex-col gap-4 shrink-0 overflow-hidden overflow-y-auto'>
            <div className='w-[80px] h-[100px] bg-black shrink-0 '></div>
            <div className='w-[80px] h-[100px] bg-black shrink-0 '></div>
            <div className='w-[80px] h-[100px] bg-black shrink-0 '></div>
            <div className='w-[80px] h-[100px] bg-black shrink-0 '></div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Test
