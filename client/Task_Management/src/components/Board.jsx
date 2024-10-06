const Board = ({ board }) => {
  // console.log(board)
  return (
    <div className='p-8 dark:bg-primary-500 h-full'>
      <h1>{board.name}</h1>

      {board.columns.map((column) => (
        <div key={column.name}>
          <h2>{column.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default Board
