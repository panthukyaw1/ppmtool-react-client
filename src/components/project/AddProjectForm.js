import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { addNewProject,selectProjectByIdentifier, updateProject } from "./projectSlice";
import { useParams,useNavigate } from "react-router-dom";
import { getToken } from "../auth/authSlice";
function AddProjectForm(props){

    const {projectId} = useParams();
    const token = useSelector(getToken);
    const project = useSelector((state)=>selectProjectByIdentifier(state,String(projectId)));
    const navigate = useNavigate();
    const [projectName,setProjectName] = useState(project?.projectName);
    const [projectIdentifier,setProjectIdentifier] = useState(project?.projectIdentifier);
    const [description,setDescription] = useState(project?.description);
    const [startDate,setStartDate] = useState(project?.startDate);
    const [endDate,setEndDate] = useState(project?.endDate);
    const [addRequestStatus,SetAddRequestStatus] = useState('idle');
    
    const onProjectNameChange = e => setProjectName(e.target.value);
    const onProjectIdentifierChange = e => setProjectIdentifier(e.target.value);
    const onDescriptionChange = e => setDescription(e.target.value);
    const onStartDateChange = e => setStartDate(e.target.value);
    const onEndDateChange = e => setEndDate(e.target.value);


    const canSave = [projectName,projectIdentifier,description,startDate,endDate].every(Boolean) && addRequestStatus === 'idle'

    const isEdit = props.mode === 'edit'
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        if(canSave){
        try {
            SetAddRequestStatus('pending');

            dispatch(
                    isEdit?updateProject({
                        project:{
                            projectName,
                            projectIdentifier,
                            description,
                            startDate,
                            endDate
                        },
                        token
                    }):
                    addNewProject({
                        project:{
                            projectName,
                            projectIdentifier,
                            description,
                            startDate,
                            endDate
                        },token
                    }),
                ).unwrap();
                navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }finally{
            SetAddRequestStatus('idle')
        }

        setProjectName('')
        setProjectIdentifier('')
        setDescription('')
        setStartDate('')
        setEndDate('')
        }
    }

    return (
        <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create / Edit Project form</h5>
                    <hr />
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text"
                             className="form-control form-control-lg "
                              placeholder="Project Name" 
                                onChange={onProjectNameChange} 
                                value={projectName} />
                        </div>
                        <div className="form-group">
                            <input type="text"
                             className="form-control form-control-lg"
                              placeholder="Unique Project ID" 
                              onChange={onProjectIdentifierChange} 
                                value={projectIdentifier} 
                                disabled={isEdit}
                                />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control form-control-lg"
                             placeholder="Project Description" 
                             onChange={onDescriptionChange} 
                                value={description}
                             />
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input type="date"
                             className="form-control form-control-lg"  
                              onChange={onStartDateChange} 
                                value={startDate}
                              />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input type="date"
                             className="form-control form-control-lg"
                             onChange={onEndDateChange} 
                                value={endDate} />
                        </div>

                        <input type="submit"
                         className="btn btn-primary btn-block mt-4" 
                         disabled={!canSave} 
                        value={isEdit?'Update':'Save'}
                         />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
export default AddProjectForm;