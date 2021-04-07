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