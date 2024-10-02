import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './App.css';

import React, { useState } from 'react';
import Lecture from './components/Lecture';
import LectureModal from './components/LectureModal';
import { events } from './data';
import moment from 'moment';

const App = () => {
	const getRecurringEvents = events => {
		let tempEvents = [];

		for (let event of events) {
			let start = event.start;
			let end = event.end;
			let numberOfClasses = 12;
			tempEvents.push({ ...event });

			while (numberOfClasses > 0) {
				start = moment(start).add(7, 'days');
				end = moment(end).add(7, 'days');
				tempEvents.push({
					...event,
					start: start.format('YYYY-MM-DDTHH:mm:ss'),
					end: end.format('YYYY-MM-DDTHH:mm:ss'),
				});
				numberOfClasses--;
			}
		}
		return tempEvents;
	};
	const [activeView, setActiveView] = useState('dayGridView');

	let [isModalOpen, setModalOpen] = useState(false);
	let [arg, setArg] = useState(null);

	const toggleModal = () => {
		setModalOpen(prevState => !prevState);
	};

	const handleLectureClick = arg => {
		toggleModal();
		setArg(arg);
	};

	const views = {
		dayGridView: {
			plugins: [dayGridPlugin],
			initialView: 'dayGridMonth',
		},
		timeGridView: {
			plugins: [timeGridPlugin],
			initialView: 'timeGridWeek',
		},
		listView: {
			plugins: [listPlugin],
			initialView: 'listWeek',
		},
	};

	return (
		<div className='p-4'>
			<div className='flex items-center mb-4'>
				<label className='mr-2 font-semibold'>View</label>
				<select
					value={activeView}
					onChange={e => setActiveView(e.target.value)}
					className='border p-2 rounded-md w-64'
				>
					{Object.keys(views).map((view, viewIdx) => (
						<option value={view} key={viewIdx}>
							{view}
						</option>
					))}
				</select>
			</div>

			<LectureModal
				isOpen={isModalOpen}
				toggle={toggleModal}
				event={arg?.event}
			/>
			<div className='w-1/2 p-8 bg-white rounded-lg text-black'>
				<FullCalendar
					key={activeView}
					plugins={views[activeView].plugins}
					initialView={views[activeView].initialView}
					eventClassNames='my-calendar-event'
					eventContent={function (arg) {
						return (
							<Lecture
								arg={arg}
								handleLectureClick={handleLectureClick}
							/>
						);
					}}
					expandRows={true}
					events={getRecurringEvents(events)}
				/>
			</div>
		</div>
	);
};

export default App;
