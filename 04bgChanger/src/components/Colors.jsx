
const Colors = ({changeBgColor}) => {
    const colors = ['red', 'green', 'blue', 'lavender', 'orange', 'purple',]

  return (
    <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2 bg-white-400 h-10'>
        <div className='flex flex-wrap justify-center bg-white px-2 py-2 rounded-md'>
            {colors.map((col) => {
                return (
              <div key={col}>
                  <button className='outline-none px-4 mx-2 rounded-full shadow-lg' style={{ backgroundColor: col }} onClick={() => changeBgColor(col)}>
                      {col.toUpperCase()}
                  </button>
              </div>
                    
                )
            })
        }
        </div>
    </div>
  )
}

export default Colors