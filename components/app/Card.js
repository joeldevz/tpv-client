import Link from "next/link"
export const CardCategory = ({ name, img }) => {
  return (
    <div class="bg-white rounded-lg shadow-lg overflow-hidden  transform hover:scale-105">
      <a href="#">
        <img src={img} alt="Contact with Customer support" title={name} />
        <span class="text-center p-2 text-gray-700 text-sm inline-block w-full font-bold" >{name}</span>
      </a>
    </div>


  )
}
export const CardIconLabel = (props) => {
  return (
    <div className="m-2 col-span-12 sm:col-span-6 md:col-span-3  transition    duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
      <Link href={props.uri || '#'}>
        <a
          className="flex flex-row p-4 bg-white rounded shadow-lg dark:bg-primary-black"
        >
          <div className={`flex items-center justify-center flex-shrink-0 w-12 h-12 text-${props.color}-500 bg-${props.color}-100 rounded-xl`}>
            {props.icon}
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="font-semibold text-gray-600 my-auto dark:text-gray-100 text-md">
              {props.label}
            </div>
          </div>
        </a>
      </Link>
    </div >

  )
}