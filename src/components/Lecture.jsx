import React from 'react'
import moment from 'moment';

const Lecture = ({ arg, handleLectureClick }) => {
    return (
        <>
            <div
                className='flex cursor-pointer w-full bg-blue-200 text-black  overflow-hidden rounded-lg'
                onClick={() => handleLectureClick(arg)}
            >
                <div className='w-2 bg-blue-800 flex-shrink-0'></div>
                <div className='flex flex-col p-2'>
                    <span className='text-xs'>
                        {moment(arg.event.start).format('HH:mm')} -{' '}
                        {moment(arg.event.end).format('HH:mm')}
                    </span>
                    <span className='font-medium'>{arg.event.extendedProps.location}</span>
                    <h3 className='text-xl font-bold'>{arg.event.title}</h3>
                </div>
            </div>
        </>
    )
}

export default Lecture