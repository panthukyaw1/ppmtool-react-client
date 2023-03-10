import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "./userSlice";
function RegisterForm(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const [AddRequestStatus,setAddRequestStatus] = useState('idle')

    const onNameInputChange = e => setName(e.target.value)
    const onEmailInputChange = e => setEmail(e.target.value)
    const onPasswordInputChange = e => setPassword(e.target.value)
    const onConfirmPasswordInputChange = e => setConfirmPassword(e.target.value)

    const canSave = [name,email,password,confirmPassword].every(Boolean) && AddRequestStatus ===  'idle'

    const dispatch = useDispatch();

    const onFormSubmit = (event) =>{
        event.preventDefault()

        if(canSave){

            setAddRequestStatus('pending')

            try{
            dispatch(createUser({
                username:email,
                fullname:name,
                password:password,
                confirmPassword:confirmPassword
            })).unwrap()

        }catch(error){
            console.error(error)
        }finally{
            setAddRequestStatus('idle')
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
    }
}

    return (
        <div className="register">
        <div className="container">
            <div classNameName="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Account</p>
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg"
                             placeholder="Name"
                             onChange={onNameInputChange}
                                required />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control form-control-lg"
                             placeholder="Email Address"
                             onChange={onEmailInputChange}
                               />

                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-lg"
                             placeholder="Password"
                             onChange={onPasswordInputChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-lg"
                             placeholder="Confirm Password"
                                onChange={onConfirmPasswordInputChange} />
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" 
                            disabled={!canSave}
                        />
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default RegisterForm;