import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [regError,setRegError] = useState('')
    const [success,setSuccess] = useState('')
    const [showPass,setShowPass] = useState(false)
    const emailRef = useRef(null)
      const handleLogin = e => {
          e.preventDefault();
          const email = e.target.email.value;
          const pass = e.target.password.value;
          
          console.log(email,pass)
          if(pass.length < 6){
            setRegError('pass must be 6')
            return
          }
          else if(!/[A-Z]/.test(pass)){
            setRegError('give uppercase')
            return
          }
          
          setRegError('')
          setSuccess('')

          signInWithEmailAndPassword(auth,email,pass)
          .then(result=>{
            console.log(result.user);
            if(result.user.emailVerified){
              setSuccess('create sucessfully')
            }
            else{
              alert('verify please')
            }
            



        )
      }

      const handleForgetPass = ()=>{
        const email = emailRef.current.value;
        if(!email){
            console.log('email sent',emailRef.current.value)
            return
        }
        else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
         console.log('please give valid email')
         return
        }
        sendPasswordResetEmail(auth,email)
        .then(()=>{
         alert('check ur email')
        })
        .catch(error=>{
            console.log(error)
        })
      }
    return (
        <div>
         <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPass ? 'text' : "password"} name="password" placeholder="password" className="input input-bordered" required />
          <span className="absolute top-3" onClick={()=>{
              setShowPass(!showPass)
            }}>
             SHow
            </span>
          <label className="label">
            <a onClick={handleForgetPass} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
              regError && <p className="bg-red-600">{regError}</p>
            }
            {
              success && <p className="bg-red-600">{success}</p>
            }
            <p>no account? please <Link to={'/register'}>Register</Link></p>
    </div>
  </div>
</div> 
        </div>
    );
};

export default Login;