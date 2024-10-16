const Column = ({ columns, columnColors }) => {
  console.log(columns)

  return (
    <div key={c._id} className='flex flex-col shrink-0 gap-5'>
      {/* Column Header */}
      <div className='flex gap-3 items-center text-secondary-200 '>
        <div
          className='w-[15px] h-[15px] rounded-full'
          style={{ backgroundColor: columnColors[index] }}
        ></div>
        <h2 className='text-secondary-200 font-bold text-xs tracking-[2.4px] uppercase'>
          {c.name} <span>({c.tasks.length})</span>
        </h2>
      </div>
      <div
        // key={c._id}
        className=' h-full w-[280px] flex flex-col gap-5 shrink-0'
      >
        {/* Column Tasks */}
        {columns?.tasks?.map((t) => (
          <Card task={t} />
        ))}
      </div>
    </div>
  )
}

export default Column
