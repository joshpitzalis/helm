/* eslint-disable */
import { format } from 'date-fns'
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PieChart from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Icon } from 'antd';
import firebase from '../utils/firebase'
import { toast$ } from '../features/toast/toast.jsx';

const Dashboard = ({ user, projects }) => {

  const [projectId, setProjectId] = useState('')

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <section className="ecommerce_16 bg-light mt5 pb-70"
      data-testid='dashboardPage'>
      <Edit projectId={projectId} setProjectId={setProjectId}
      user={user} projects={projects} />
      <div className="container px-xl-0">
        <div className="flex justify-center">
          <div className="mt-20 col-xl-8 col-lg-9 products">
            <div className="row">
              {projects.map(project => (
                <Project 
                {...project} 
                key={project.id}
                setProjectId={setProjectId} />
              ))}
              {/* <p className="color-heading f-14 semibold text-uppercase sp-20 total center w-100 tc measure">
                See Archived Projects 
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mv6">
        <a className="self-center mt-15 btn action-1 lg border-transparent-white " style={{ color: 'white' }}
          onClick={() => setProjectId('temp')}>
          <span className='o-90'> + Create A New Project </span>
        </a>
      </div>
    </section>

  )
}

export default Dashboard;


const Project = ({ id, name, objectives, createdOn, avatars, setProjectId, }) => {
  return (
    <div className='flex items-start'>
    <Link to={`/project/${id}`} className="dark-blue pb3 mb-30 mx-auto col-md-12 d-flex flex-wrap align-items-stretch justify-content-between product pointer ">

      <PieChart
        // data={[
        //   { title: 'One', value: 10, color: '#E38627' },
        //   { title: 'Two', value: 15, color: '#C13C37' },
        //   { title: 'Three', value: 20, color: '#6A2135' },
        // ]}
        data={objectives}
        className="dib w4 center" />
      <div className="ml-30 w-470 pt-10 pb-10 d-flex flex-column justify-content-start inner">
        <div className="top">
          <div className="d-flex flex-column-reverse flex-md-row align-items-baseline justify-content-between">
            <h4 className="f-32 bold ml-15">{name}</h4>
          </div>
         
          <div className="col-lg-7">
            {avatars && avatars.map(({photo, email}) => 
           
            <img key={email} src={photo} className="br-100 h3 w3 dib ba bw2 b--white" alt={email} />
          )}
            </div>
        </div>
        <div className="d-flex flex-wrap align-items-center bottom ">

          <div className="ml-15 flex-shrink-0 f-14 sp-20 semibold action-2 price color-heading o-50">
            Created on {format(createdOn.seconds * 1000, 'do MMM yyyy')}
                      </div>
                      

        </div>
      </div>
    </Link>
    <button 
          type='button' 
          onClick={() => setProjectId(id)}
          className="flex-shrink-0 f-14 sp-20 semibold action-2 price link mt4">
           <Icon type="setting" data-testid={`${name}-edit`} />
                      </button>
    </div>);
}




const propTypes = {};

const defaultProps = {};

const Edit = ({ projectId, setProjectId, user, projects }) => {


  const project = projects && projects.find( item => item.id === projectId)

  const [name, setName] = useState('')

    
  const [people, setPeople] = useState([user.email])
  useEffect(() => project && project.team && setPeople(Array.from(new Set( [user.email,  ...project.team]))), [project && project.team]);

  const [confirm, setConfirm] = useState(false )

  
  const onSubmit = e => {
    e.preventDefault()

    const newProject =  firebase.firestore().collection('projects').doc()

    const docId = project ? project.id : newProject.id
console.log({ people , project: project && project.team, docId });


  firebase.firestore().collection('projects').doc(docId).set({ 
    name: name || project.name  ,
    id: docId, 
    createdOn: project && project.createdOn || new Date(),
    team: people || project.team ,
    objectives: [{
      value: 100,
      color: '#E38627'
    }],
    avatars:[{
      email: user.email,  photo: user.photoURL
    }]
})
.then(() => setProjectId(''))
.catch(error => {
  setProjectId('')
  const message = error.message || error;
  toast$.next({
    type: 'ERROR',
    message,
  });
});

  }

  const onDelete = (_docId) => firebase.firestore()
  .collection('projects')
  .doc(_docId)
  .delete()
.then(() => setProjectId(''))
.catch(error => {
  setProjectId('')
  const message = error.message || error;
  toast$.next({
    type: 'ERROR',
    message,
  });
});

 
  return (
    <Modal
      title={name || "Edit Project"}
      visible={!!projectId}
      onCancel={() => {
        setProjectId('')
        setConfirm(false)}}

      footer={[
        <span className={`flex items-center  h-100 ${project ? 'justify-between' : 'justify-around' }`} >
          {confirm ? <div className='flex items-center justify-around' >
          
          <button
            type="submit"
            className=" btn action-3 "
            onClick={() => onDelete(project.id)}>
            Confirm Delete
          </button>
          <button
            type="submit"
            className="link action-2 mr3"
            onClick={() => setConfirm(false)}>
            Cancel
          </button>
          </div> : <>
          { project && <Icon type="delete" data-testid='deleteProject' style={{color: 'red'}}
          onClick={() => setConfirm(true)}/>}
          <div className='flex items-center'>
          <button
            type="submit"
            className="link  action-3 mr3"
            onClick={() => {
              setProjectId('')
              setConfirm(false)}}>
            Cancel
          </button>
          <button
            type="submit"
            className=" btn action-1 "
            onClick={e => onSubmit(e)}>
            Save
          </button>
          </div>
          </>}
        </span>
      ]}
    >

      <form
      data-testid='addProjectModal'
        onSubmit={e => onSubmit(e)}
        className="bg-light mx-auto mw-430 radius10 pt-40 px-50 pb-30 flex flex-column items-center"
      >

        <div
          className="mb-20 input_holder"

        >
          <input
            type="name"
            name="name"
            data-testid='projectNameInput'
            placeholder="project name"
            value={name || project && project.name}
            onChange={(e) => setName(e.target.value)}
            className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
          />
        </div>
<AddPeople   
userEmail={user.email}
people={people} 
setPeople={setPeople}   />
      </form>
    </Modal>
  );
}

Edit.propTypes = propTypes;

export const  AddPeople = ({ userEmail,  people, setPeople}) => {

      const [email, setEmail] = useState('')

      const addEmail = _email => {
        setPeople([_email, ...people])
        setEmail('')
      }
      const removeEmail = (_email) => {
        const fileteredTeam = people.filter(email => email !== _email)
        setPeople(fileteredTeam)
      }
    
      return (
      <>
        <h2 className="mt-40 mb-20 small text-center">
          Add People
            </h2>
        <div className="mb-20 input_holder">
          <input type="email" name="email" placeholder="add email address" value={email} onChange={e => setEmail(e.target.value)} className="input border-gray focus-action-1 color-heading placeholder-heading w-full" />
        </div>
        <button type="button" className="link action-1 " onClick={() => addEmail(email)}>
          Add Person
        </button>
        {people.map(person => <div className="mt-25 f-18 medium color-heading text-center" key={person}>
            {person}
            {person !== userEmail &&
              <button type='button' className="link action-3" onClick={() => removeEmail(person)}>
                Remove
              </button>}
          </div>)}</>);
    }
  Edit.defaultProps = defaultProps;