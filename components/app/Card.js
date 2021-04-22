import Link from "next/link"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { useState } from "react"
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
export const CardShopIconLabel = (props) => {
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
            <div className="font-semibold text-gray-900 my-auto dark:text-gray-100 text-md">
              {props.label}
              <div className="text-sm text-gray-600">{props.small}</div>
            </div>
          </div>
        </a>
      </Link>
    </div >

  )
}
export const CardAdd = (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <>
      <div aria-describedby={id} type="button" onClick={handleClick} className="m-2 col-span-12 sm:col-span-6 md:col-span-3   transition  cursor-pointer  duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
        <div
          className="flex flex-row p-4 bg-gray-200 border-2 border-dashed	border-gray-400 rounded shadow-inner  dark:bg-primary-black"
        >

          <div className="flex flex-col flex-grow ml-4">
            <div className="font-semibold text-gray-900 m-auto dark:text-gray-100 text-md">
              <AddCircleIcon style={{ fontSize: 40 }} color="action" />
            </div>
          </div>
        </div>

      </div >
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={`${classes.paper} rounded-md shadow-md border border-gray-400`}>Añadir Widget.</div>
          </Fade>
        )}
      </Popper>
    </>

  )
}