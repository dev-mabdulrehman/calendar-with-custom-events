import moment from 'moment'
import React from 'react'

const LectureDetailRow = ({ label, value }) => (
    <div className='flex gap-8 border-b py-2 w-full text-wrap justify-between'>
        <span className='font-bold'>{label}:</span>
        <span className='block text-right'>{value}</span>
    </div>
)

const LectureModal = ({ isOpen, toggle, event }) => {

    const getLectureDuration = () => {
        let duration = moment.duration(moment(event.end).diff(moment(event.start))).asHours()
        return duration === 1 ? `${duration} hour` : `${duration} hours`
    }

    return isOpen && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white border-b px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <h4 className='font-bold'>{event.extendedProps.subjectName} ({event.title})</h4>
                        </div>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <LectureDetailRow label={"Start"} value={moment(event.start).format("dddd, DD MMM YYYY HH:mm:ss")} />
                            <LectureDetailRow label={"End"} value={moment(event.end).format("dddd, DD MMM YYYY HH:mm:ss")} />
                            <LectureDetailRow label={"Duration"} value={getLectureDuration()} />
                            <LectureDetailRow label={"Location"} value={event.extendedProps.location} />
                            <LectureDetailRow label={"Description"} value={event.extendedProps.description} />
                            <LectureDetailRow label={"Professor"} value={event.extendedProps.professor} />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={toggle} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LectureModal