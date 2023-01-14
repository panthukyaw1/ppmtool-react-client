import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_PROJECTS = 'http://localhost:8383/api/project/all';
const POST_NEW_PROJECTS = 'http://localhost:8383/api/project/create';
const DELETE_PROJECT = 'http://localhost:8383/api/project/identifier/';
export const fetchProjects = createAsyncThunk('projects/fetchProjects',async (token)=> {
    const response = await axios.get(GET_ALL_PROJECTS,{
        headers:{
            'Authorization':token,
        }
    });
    return response.data;
});

export const addNewProject = createAsyncThunk(
    'projects/addNewProject',async (data)=>{
        console.log(data.token)
        const response = await axios.post(POST_NEW_PROJECTS,data.project,{
            
            headers:{
                'Content-Type':'Application/json',
                'Authorization':data.token,
            },
            
        })
        return response.data;
    })
    export const updateProject = createAsyncThunk(
        'projects/updateProject',async (data)=>{
            const response = await axios.post(POST_NEW_PROJECTS,data.project,{
                headers:{
                    'Content-Type':'Application/json',
                    'Authorization':data.token,
                },
            })
            return response.data;
        })
        export const deleteProject = createAsyncThunk(
            'projects/deleteProject',async (data)=>{
                const response = await axios.delete(`${DELETE_PROJECT}${data.projectId}`,{
                    headers:{
                        'Authorization':data.token,
                    },
                })
                return response.data;
            })

const initialState = {
    projects:[],
    status:'idle',
    error:null
}

export const projectSlice = createSlice({
    name:'projects',
    initialState,
    reducers:{
        addProject:{
            reducer(state,actions){
            state.push(actions.payload);
        },
       prepare(projectName,projectIdentifier,description,startDate,endDate){
        return{ payload:{
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate
       }};
       },
       
    }
    },
    extraReducers(builder){
        builder
        .addCase(fetchProjects.pending,(state,actions) => {
            state.status = 'loading';
        })
        .addCase(fetchProjects.fulfilled,(state,actions)=>{
            state.status = 'succeeded';

            //state.projects = state.projects.concat(actions.payload);
            state.projects = actions.payload;
        })
        .addCase(fetchProjects.rejected,(state,actions)=>{
            state.status = 'failed';

            state.error = actions.error.message;
        })
        .addCase(addNewProject.fulfilled,(state,actions)=>{
            state.status = 'succeeded';

            state.projects.push(actions.payload)
        })
        .addCase(addNewProject.rejected,(state,actions)=>{
            state.status = 'failed';
            state.error = actions.error.message;
        })
        .addCase(updateProject.fulfilled,(state,actions)=> {
            const project = actions.payload

            const projects = state.projects.filter(p => p.projectIdentifier !== project.projectIdentifier)
            state.projects = [project,...projects]
        })
        .addCase(deleteProject.fulfilled,(state,actions)=> {
            console.log(actions.payload)
            const projects = state.projects.filter(p => p.projectIdentifier !== String(actions.payload))

            state.projects = projects
        })
    }
});
export const selectAllProjects = (state)=> state.projects.projects;
export const getProjectStatus = (state)=> state.projects.status;
export const getProjectError = (state)=> state.projects.error;
export const selectProjectByIdentifier = 
    (state,projectId)=> state.projects.projects.find(project => project.projectIdentifier === projectId)

export const {addProject} = projectSlice.actions;
export default projectSlice.reducer;