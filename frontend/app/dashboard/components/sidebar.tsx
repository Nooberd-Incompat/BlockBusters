import Link from 'next/link';


// import ArticleIcon from '@mui/icons-material/Article';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
// import GroupIcon from '@mui/icons-material/Group';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

export default function Sidebar({ open }: { open: boolean }) {
    const listItems = [
        { text: 'Add New Record', icon: <AddCircleTwoToneIcon className="w-6 h-6" />, link: "/dashboard/add-record" },
        { text: 'My Records', icon: <ArticleTwoToneIcon className="w-6 h-6" />, link: "/dashboard/records" },

    ];

    return (
        <>
            {/* <div className={`bg-black-950 text-white w-64 h-[calc(100vh-60px)] py-7 px-2 absolute left-0 transform  md:relative md:translate-x-0 transition duration-200 ease-in-out`}> */}
            <div className={`bg-black-800  w-64 h-[calc(100vh-48px)] top-[48px] md:h-full md:top-0 py-7 px-2 absolute left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'}  md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
                <nav className="space-y-2">

                    {listItems.map((item) => (
                        <Link
                            key={item.text}
                            href={item.link}
                            className="block  px-4 py-4 rounded-2xl transition duration-200 hover:bg-blue-600"
                        >
                            <div className="flex items-center space-x-2 text-white font-medium">
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}