
export default function Example() {
  return (
    <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <span className="text-sm leading-6 text-white">
        <a href="#">
          <strong className="font-semibold">o1Node 2023</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
					To fully use the missions DApp please connect your wallet.        
				</a>
      </span>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <div className="h-5 w-5 text-white" aria-hidden="true"> x </div>
        </button>
      </div>
    </div>
  )
}