import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:8080/api"

export const fetchAllStudent = createAsyncThunk(
    "fetchAllStudent",
    async () => {
        const response = await axios.get(`${URL}/student/fetch`);
        return {
            data : response.data,
            status : response.status
        };
    }
)

// export const fetchStudentById = createAsyncThunk(
//     "fetchStudentById",
//     async (studentId) => {
//         const response = await axios.get(`${URL}/student/${studentId}`);
//         return{
//             status : response.status,
//             data : response.data
//         }
//     }
// )

export const createStudent = createAsyncThunk(
    "createStudent",
    async (student) => {
        const response = await axios.post(`${URL}/student/create`,student);
        return {
            data : response.data,
            status : response.status
        }
    }
)

export const updateStudent = createAsyncThunk(
    "updateStudent",
    async (student) => {
        const response = await axios.put(`${URL}/student/update`,student);
        return {
            data : response.data,
            status : response.status
        }
    }
)

export const deleteStudent = createAsyncThunk(
    "deleteStudent",
    async (studentId) => {
        const response = await axios.delete(`${URL}/student/delete/${studentId}`);
        return {
            data : response.data,
            status : response.status
        }
    }
)

const initialState = {
    fetchStatus : 'idle',
    createStatus : 'idle',
    updateStatus : 'idle',
    deleteStatus : 'idle',
    students : [],
    student : {},
    error : null
}

const StudentSlice = createSlice({
    name:"StudentSlice",
    initialState,
    reducers : {
        setFerchStatusToIdle : (state) => {
            state.fetchStatus = "idle";
        },
        setCreateStatusToIdle : (state) => {
            state.createStatus = "idle";
        },
        setUpdateStatusToIdle : (state) => {
            state.updateStatus = "idle";
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchAllStudent.pending,(state)=>{
            state.fetchStatus = "loading";
        })
        .addCase(fetchAllStudent.fulfilled,(state,action)=>{
            if(action.payload?.status){
                const { status, data } = action.payload;
                if(status !== 400){
                    state.students = data;
                    state.fetchStatus = "success";
                }
            }
        })
        .addCase(fetchAllStudent.rejected,(state,action)=>{
            state.fetchStatus = "failed";
            state.error = action.error;
        })
        // .addCase(fetchStudentById.fulfilled,(state,action)=>{
        //     if(action.payload?.status){
        //         const { status, data } = action.payload;
        //         if(status <= 400){
        //             state.fetchByIdStatus = "success";
        //             state.student = data;
        //         }
        //     }
        // })
        // .addCase(fetchStudentById.rejected,(state,action)=>{
        //     state.fetchByIdStatus = "failed";
        //     state.error = action.error;
        // })
        .addCase(createStudent.pending,(state)=>{
            state.createStatus = "loading";
        })
        .addCase(createStudent.fulfilled,(state,action)=>{
            if(action.payload?.status){
                const { status, data } = action.payload;
                if(status !== 400){
                    state.students = [data,...state.students];
                    state.createStatus = "success";
                }
            }
        })
        .addCase(createStudent.rejected,(state,action)=>{
            state.createStatus = "failed";
            state.error = action.error;
        })
        .addCase(updateStudent.pending,(state)=>{
            state.updateStatus = "loading";
        })
        .addCase(updateStudent.fulfilled,(state,action)=>{
            if(action.payload?.status){
                const { status, data } = action.payload;
                if(status !== 400){
                    state.student = data;
                    state.updateStatus = "success"
                }
            }
        })
        .addCase(updateStudent.rejected,(state,action)=>{
            state.updateStatus = "failed";
            state.error = action.error;
        })
        .addCase(deleteStudent.fulfilled,(state,action)=>{
            if(action.payload?.status){
                const { status, data } = action.payload;
                if(status <= 400){
                    state.students = state.students.filter(student => student.id !== Number(data))
                    state.deleteStatus = "success";
                }
            }
        })
        .addCase(deleteStudent.rejected,(state,action)=>{
            state.deleteStatus = "failed";
            state.error = action.error;
        })
    }
})

export default StudentSlice.reducer;
export const getFetchStatus = state => state.student.fetchStatus;
export const getFetchByIdStatus = state => state.student.fetchByIdStatus;
export const getCreateStatus = state => state.student.createStatus;
export const getUpdateStatus = state => state.student.updateStatus;
export const getAllStudents = state => state.student.students;
export const { setFerchStatusToIdle,setCreateStatusToIdle,setUpdateStatusToIdle } = StudentSlice.actions;
export const getStudentById = (state,studentId) => 
    state.student.students.find( student => student.id === Number(studentId))

