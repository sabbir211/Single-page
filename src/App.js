import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faStar ,faShare} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch("./data.json")
      .then(res => res.json())
      .then(result => {
        setData(result)
        setLoading(false)
      })
  }, [])
  if (loading) {
    return <p>Loading</p>
  }
  return (
    <div className=' my-10'>
      {
        data.map(c => {

          return (<>
            <div className='container mx-auto shadow-lg p-8'>
              <h1 className="font-bold text-2xl md:text-5xl">{c.heading} </h1>
              <p className='text-slate-400'>{c.courseType} <FontAwesomeIcon icon={faQuestionCircle} /></p>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
                <div>
                  <p className='text-xl'>{c.description}</p>
                  <div className='flex items-start font-bold my-4'>
                    <img src={c.personImage} alt="" />
                    <h4 className='text-violet-600 text-2xl ml-3'>{c.personName}</h4>
                  </div>
                  <div className="flex">
                    <p className='text-yellow-400'>
                      {
                        [...Array(c.teacherRatting).keys()].map(r => <FontAwesomeIcon key={r} icon={faStar}></FontAwesomeIcon>)
                      }
                    </p>
                    <p className="ml-3 text-slate-600">{c.totalTeacherReview} <span> total reviews for this teacher</span></p>
                  </div>
                  <div className="flex">
                    <p className='text-yellow-400'>
                      {
                        [...Array(c.classRatting).keys()].map(r => <FontAwesomeIcon key={r} icon={faStar}></FontAwesomeIcon>)
                      }
                    </p>
                    <p className='ml-3 text-slate-600'>{c.totalClassReview} <span >reviews for class</span></p>
                  </div>
                  <h3 className="font-semibold text-xl">Completed by {c.completed} learners</h3>
                  <div className='mt-4 flex  items-center pr-5'>
                    <button className='bg-violet-600 rounded-full py-2 px-3 text-white box-border hover:bg-violet-700 transition-all duration-150 font-semibold text-xl'><span>See Class Schedule</span> <FontAwesomeIcon icon={faAngleRight} /></button>
                      <p className='text-2xl text-violet-600 font-semibold mx-6 hover:text-violet-900 hover:cursor-pointer'><FontAwesomeIcon icon={faHeart}/> <span>Save </span></p>
                      <p className='text-2xl text-violet-600 font-semibold mx-6 hover:text-violet-900 hover:cursor-pointer'><FontAwesomeIcon icon={faShare}/> <span>Share </span></p>
                  </div>
                </div>
                <div className='grid grid-rows-2 grid-flow-col gap-2 md:px-8'>
                  {
                    c.img.map((img, index) => <img src={img} className={`${index === 0 ? "row-span-2" : ""} img-fluid`} alt="" />)
                  }

                </div>

              </div>

            </div>
          </>)

        })
      }

    </div>
  );
}

export default App;
