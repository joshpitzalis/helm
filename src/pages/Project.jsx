/* eslint-disable */
import produce from "immer"
import { format } from 'date-fns'
import React, { useState, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from '../utils/firebase'
import { toast$ } from '../features/toast/toast.jsx';
import { Input, Timeline, Icon, Popover, DatePicker, Radio, Checkbox, Modal, Avatar } from 'antd';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import ObjectiveModal from '../features/objectives/ObjectiveModal';


const Project = ({ user, projects, match }) => {

	const { params: { projectId } } = match
	const [project, setProject] = useState({})
	const [visible, setVisibility] = useState(false)

	useEffect(() => setProject(projects.find(item => item.id === projectId)), [projects])

	// if (!user) {
	//   return <Redirect to="/" />;
	// }

	const content = (
		<div>
			<p>Content</p>
			<p>Content</p>
		</div>
	);


	const [primaryObjectives, setPrimaryObjectives] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection('projects')
			.doc(projectId)
			.collection('objectives')
			.onSnapshot(
				collection => {
					const _projects = collection.docs.map(doc => doc.data());
					setPrimaryObjectives(_projects);
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


	console.log({ primaryObjectives });


	return (

		<div className='flex flex-column items-center' data-testid='projectPage'>
			<ObjectiveModal projectId={projectId}
				user={user} projects={projects}
				visible={visible}
				setVisibility={setVisibility} />
			<TopTimeline />
			<div className='flex-grow-1'>
				<section className="pricing_table_5 bg-light pt-105 pb-100 text-center ma3">
					<div className="container px-xl-0">
						<div className="row justify-content-center  ">
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
						</div>
						<div className="flex wrap justify-around items-start">
							{primaryObjectives && primaryObjectives.map(obj =>
								<PrimaryObjective user={user} {...obj}
									key={obj && obj.id} />)}


							{primaryObjectives && primaryObjectives.length < 3 &&
								<button className="link mb-40 col-md-6 col-lg-4 d-flex align-items-baseline mt6 pt4  pointer" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
									<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
										<i className="fas fa-plus color-heading f-18"></i>
									</div>
									<div className="inner">
										<button className="link mb-20 f-14 semibold text-uppercase sp-20 title" type='button' onClick={() => setVisibility(true)}>Add a primary Objective</button>

									</div>
								</button>}

						</div>


					</div>
				</section>



				<section className="feature_8 bg-light pt-105 pb-30">
					<div className="container px-xl-0">
						<h2 className="mb-50 small text-lg-center" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">Product Objectives</h2>
						<div className="row">
							<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
								<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
									<Avatar src={user.photoURL} size="large" />			</div>
								<div className="inner">
									<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Some objective</div>
									<div className="color-heading op-7 text-adaptive">
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500
						</div>
									<ul className="px-0 color-heading mt4">
										<li className="mb4">
											<div>
												<p className="dib strike mb0"> mini achivement </p>
												<div className='mt0 pt0'>
													<Avatar src={user.photoURL} size="small" className=' dib mb0' /> <time className="f7 fw4 mb4 ml2 o-30">2 days ago</time>
												</div>

											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
								<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
									<Avatar src={user.photoURL} size="large" />				</div>
								<div className="inner">
									<div className="mb-20 f-14 semibold text-uppercase sp-20 title">some objective</div>


									<div className="  op-7 text-adaptive flex mt4 pt3 ">


										<p className="f2 f-subheadline-l fw6">56</p>
										<div className='ml3'><Sparklines data={[1, 2, 3]}>
											<SparklinesLine style={{
												fill: 'none'
											}} />
										</Sparklines>
											<p>things</p>
										</div>
									</div>



								</div>
							</div>
							<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="900">
								<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
									<Avatar src={user.photoURL} size="large" />					</div>
								<div className="inner">
									<div className="mb-20 f-14 semibold text-uppercase sp-20 title">some objective</div>
									<div className="color-heading op-7 text-adaptive">
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.					</div>
								</div>
							</div>
							<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
								<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
									<Avatar src={user.photoURL} size="large" />				</div>
								<div className="inner">
									<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Some objective</div>
									<div className="color-heading op-7 text-adaptive">
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.					</div>
								</div>
							</div>
							<div className="mb-40 col-md-6 col-lg-4 d-flex align-items-baseline" data-aos-duration="600" data-aos="fade-down" data-aos-delay="600">
								<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
									<Avatar src={user.photoURL} size="large" />					</div>
								<div className="inner">
									<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Some Objective</div>
									<div className="color-heading op-7 text-adaptive">
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.					</div>
								</div>
							</div>
							<button className="link mb-40 col-md-6 col-lg-4 d-flex align-items-start   pointer" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
								<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
									<i className="fas fa-plus color-heading f-18"></i>
								</div>
								<div className="inner">
									<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Add an Objective</div>

								</div>
							</button>
						</div>
					</div>
				</section>

				<button className="link mb-40 col-md-6 col-lg-4 d-flex align-items-start  mt5  pointer" data-aos-duration="600" data-aos="fade-down" data-aos-delay="300">
					<div className="ml-15 w-30 mr-15 flex-shrink-0 text-lg-center icon">
						<i className="fas fa-plus color-heading f-18"></i>
					</div>
					<div className="inner">
						<div className="mb-20 f-14 semibold text-uppercase sp-20 title">Create a new group</div>

					</div>
				</button>

			</div>

		</div>

	)
}


const TopTimeline = ({ }) => {
	return (
		<div className='h5 '>
			<div className=' pa3 rotate90 relative overflow-scroll' style={{
				bottom: '22rem',
				right: '30rem',
				height: '150vh'
			}}>
				<Timeline mode="alternate" style={{
					fontSize: '16px'
				}}>
					<Timeline.Item className='w5 ' color='gray' position='right'>
						<Popover content={'content'} title="lll">
							<span>thingy</span>
						</Popover>
					</Timeline.Item>

					<Timeline.Item color="gray" className=''>Solve  </Timeline.Item>

					<Timeline.Item className='w5 ' color='green' position='left' dot={<Icon type="check-circle" />}>
						Solve
    </Timeline.Item>

					<Timeline.Item className='w5 ' color='gray' position='right'>
						<Popover content={'content'} title="lll">
							<span>thingy</span>
						</Popover>
					</Timeline.Item>

					<Timeline.Item color="gray" className=''>Solve  </Timeline.Item>

					<Timeline.Item className='w5 ' color='green' position='left' dot={<Icon type="check-circle" />}>
						Solve
    </Timeline.Item>


					<Timeline.Item className='w5 ' color='gray' position='right'>
						<Popover content={'content'} title="lll">
							<span>thingy</span>
						</Popover>
					</Timeline.Item>

					<Timeline.Item color="gray" className=''>Solve  </Timeline.Item>

					<Timeline.Item className='w5 ' color='green' position='left' dot={<Icon type="check-circle" />}>
						Solve
    </Timeline.Item>


				</Timeline>
			</div>
		</div>);
}
export default Project;



function PrimaryObjective({ lead, title, count, updates }) {



	return (
		<div className='flex flex-column col-lg-4 '

		>
			<div className=" d-flex align-items-between order-0 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="mw-370 w-full mx-auto radius10 pt-35 pb-40 block">
					<div className=" f-14 semibold text-uppercase sp-20 title">
						<Avatar src={lead.photo} size="large" />
					</div>

					<div className="d-flex justify-content-center align-items-center">


						<div className="f-58 relative flex-shrink-0 price">

							<section className="w-100 tc center" data-name="slab-stat-small">
								<div className="db dib-l w-auto-l  mt3">
									<Sparklines data={[1, 2, 3]}>
										<SparklinesLine style={{
											fill: 'none'
										}} />
									</Sparklines>
									<p className="f2 f-subheadline-l fw6 ml0">{count}</p>

								</div>
							</section>
						</div>

						<div className="ml-15 text-left w4">{title}</div>
					</div>

					<div className=" f-14 semibold text-uppercase sp-20 title"> 6 days left </div>
					<time className="f7 fw4 mb4 o-30">deadline</time>

				</div>
			</div>

			<div className="mt-35 mb-70 mb-lg-0  order-1 order-lg-0" data-aos-duration="600" data-aos="fade-down" data-aos-delay="0">
				<div className="row justify-content-center">
					<div className="col-auto text-left color-heading">
						<ul className="px-0">
							<li className="mb4">
								<div>
									<p className="dib strike mb0">{ updates && updates[0] && updates[0].update} </p>
									<div className='mt0 pt0'>
										<Avatar src={ updates && updates[0] && updates[0].photo} size="small" className='mr3 dib mb0' /> <time className="f7 fw4 mb4 o-30">2 days ago</time>
									</div>

								</div>
							</li>

						</ul>
					</div>
					{/* <div className="col-12">
						<a href="#" className="mt-15 btn border-gray color-main">Add an update</a>
					</div> */}
				</div>
			</div>
		</div>);
}


