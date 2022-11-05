export default function Carousel({ winners }) {
  return (
    <div id='default-carousel' className='relative' data-carousel='slide'>
      {/* <!-- Carousel wrapper --> */}
      <div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
        {/* <!-- Winner 1 --> */}
        <div
          className='duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20'
          data-carousel-item='0'
          data='active'
        >
          <span className='absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800'>
            {winners[0].slice(0, 4)}...{winners[0].slice(38, 42)}
          </span>
        </div>
        {winners &&
          winners.map((winner, index) => {
            return (
              <div
                className='duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-full z-10'
                data-carousel-item={index}
              >
                <h1
                  className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                  alt='...'
                >
                  {winner.slice(0, 4)}...{winner.slice(38, 42)}
                </h1>
              </div>
            )
          })}
      </div>
    </div>
  )
}
