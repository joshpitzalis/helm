/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import firebase from '../utils/firebase'
import { toast$ } from '../features/toast/toast.jsx';
import ObjectiveModal from '../features/objectives/ObjectiveModal';
import Groups from '../features/objectives/Groups';
import { Input } from 'antd';
import PrimaryObjective from '../features/objectives/Objective'
import { AddNewMetric } from './AddNewMetric';
// import SvelteModal from 'svelteModal'


const Project = ({ user, projects, match }) => {

	// const svelteModalRef = useRef()

	// useEffect(() => {
	// 	const svelteModal = new SvelteModal({
	// 		target: svelteModalRef.current
	// 	})

	// 	return () => {
	// 		svelteModal.$destroy()
	// 	}
	// }, [])

	const { params: { projectId } } = match

	const [project, setProject] = useState({})
	const [visible, setVisibility] = useState(false)
	const [objectives, setObjectives] = useState([]);
	useEffect(() => setProject(projects.find(item => item.id === projectId)), [projects])

	// if (!user) {
	//   return <Redirect to="/" />;
	// }

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('projects')
			.doc(projectId)
			.collection('objectives')
			.onSnapshot(
				collection => {
					const _projects = collection.docs.map(doc => doc.data());
					setObjectives(_projects);
				},
				error => {
					const message = error.message || error;
					toast$.next({
						type: 'ERROR',
						message,
					});
				}
			);

		return () => unsubscribe();
	}, []);

	const [objective, setObjective] = useState({});

	return (

		<div className='flex flex-column items-stretch' data-testid='projectPage'>
			
{/* <div ref={svelteModalRef}></div> */}
			<ObjectiveModal
				projectId={projectId}
				user={user}
				projects={projects}
				visible={visible}
				setVisibility={setVisibility}
				setObjective={setObjective}
				objective={objective} />



			<div className='flex-grow-1'>
				<section className="pricing_table_5 bg-light pt-105 pb-100 text-center ma3">
					<div className="container px-xl-0">
						<header className="row justify-content-center  ">
							<div className="col-xl-6 col-lg-8 col-md-10">
								<h2 className="small" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">{project && project.name}</h2>
								<div className="mt-20 mb-65 color-heading text-adaptive" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
									{project && project.avatars && project.avatars.map(({ photo, email }) =>
										<img key={email} src={photo} className="br-100 h3 w3 dib ba bw2 b--white" alt={email} />
									)}
								</div>
								<div className="col-lg-7">

								</div>
							</div>
						</header>
				
						<div className="flex flex-wrap justify-around items-start" data-testid='primaryObjectives'>

							{objectives && objectives
								.filter(item => item.group === 'primary' && item.complete === false )
								.sort((a, b) => {

									const last = b.createdOn.seconds
									const first = a.createdOn.seconds

									return last - first

								})
								.map(objective =>
									<PrimaryObjective
										user={user}
										setVisibility={setVisibility}
										setObjective={setObjective}
										objective={objective}
									/>
								)}

			
								<AddNewMetric   setVisibility={setVisibility} objectives={objectives}  />

								</div>


						</div>
		
				</section>
			</div>

		</div>

	)
}



export default Project;

// firestore.FieldValue.arrayRemove('east_coast')

