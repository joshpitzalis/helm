/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../utils/firebase'
import { toast$ } from '../features/toast/toast.jsx';
import ObjectiveModal from '../features/objectives/ObjectiveModal';
import Timeline from "../features/objectives/Timeline";
import Groups from '../features/objectives/Groups';
import { Tooltip, Icon, Input } from 'antd';
import PrimaryObjective from '../features/objectives/Objective'

const Project = ({ user, projects, match }) => {

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
			{objectives && objectives.length > 2 &&
				<section className='call_to_action_13 pt-100 pb-100 color-white flex justify-center text-center text-lg-left bg-dark'>
					<Timeline objectives={objectives} />
				</section>
			}

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
						<div className="flex wrap justify-around items-start" data-testid='primaryObjectives'>
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

							{objectives && objectives.filter(item => item.group === 'primary' && item.complete === false ).length < 3 &&
								<div className="link mb-40 col-md-6 col-lg-4 d-flex align-items-baseline mt6 pt4  pointer" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
									<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon ">
										<i className="fas fa-plus color-heading f-18 dn"></i>
									</div>
									<div className="inner flex items-start">
										<button className="link mb-20 f-14 semibold text-uppercase sp-20 title underline" type='button' onClick={() => setVisibility(true)}>+ Add a primary Objective</button>
										{objectives && objectives.length === 0 &&


											<Tooltip className='o-50 mt1 ml3'
												title={() => <p>It's time to go have that conversation. We've drafted an email that you can send to everyone that needs to make this decision, you can use it as a starting point and tweak it as necessary.
														  <a href='#'> {' '}Check it out here.</a>
												</p>}>
												<Icon type="info-circle" />
											</Tooltip>

										}
									</div>
								</div>}


						</div>
					</div>
				</section>

				{objectives && objectives.filter(item => item.group === 'primary').length &&
					<>
					{project && project.groups && project.groups.map(group => <Groups user={user} {...group} projectId={project && project.id}
					objectives={objectives && objectives
						.filter(item => item.group === group.id && item.complete === false )}/>)
					}

						<CreateGroup 
						projectId={project && project.id}   />
					</>}
			</div>

		</div>

	)
}



export default Project;

// firestore.FieldValue.arrayRemove('east_coast')

    function CreateGroup({projectId}) {
		const [groupName, setGroupName] = useState('')
		const [group, setGroup] = useState(false)

		const onSubmit = groupName =>
			firebase
      .firestore()
      .collection(`projects`)
      .doc(projectId)
      .set({
        groups: firebase.firestore.FieldValue.arrayUnion({
			id: +new Date(),
			name: groupName,
		})

      },{merge: true})
      .then(() =>

	  setGroup(false)
      )
      .catch(error => {

        const message = error.message || error;
        toast$.next({
          type: 'ERROR',
          message,
        });
		setGroup(false)
      });
		
      return (<>
	  {group ? 
	  <div className='flex flex-column items-center justify-center ma4'>
		  			
		  <Input.Search
			  className='center'
			  enterButton="Create New Group"
      size="large"
			placeholder="Name your group"
			onSearch={value => onSubmit(value)}
			style={{ width: 500 }}/>
			<button className='link action-3 ma3' onClick={() => setGroup(false)}>Nevermind</button>

	  </div>	
	   : 
	  <button className="link mb-40 col-md-6 col-lg-4 d-flex align-items-start justify-center  mt5  pointer center " onClick={() => setGroup(true)}>
							<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
								<i className="fas fa-plus color-heading f-18"></i>
							</div>
							<div className="inner">
								<div className="link mb-20 f-14 semibold text-uppercase sp-20 title">Create a new group of Objectives</div>

							</div>
						</button>}
						</>);
    }
  