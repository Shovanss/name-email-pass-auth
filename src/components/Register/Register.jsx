import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";


const Register = () => {
  const [regError,setRegError] = useState('')
  const [success,setSuccess] = useState('')
  const [showPass,setShowPass] = useState(false)
    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const accept = e.target.terms.checked;
        console.log(email,pass,accept)
        if(pass.length < 6){
          setRegError('pass must be 6')
          return
        }
        else if(!/[A-Z]/.test(pass)){
          setRegError('give uppercase')
          return
        }
        else if(!accept){
          setRegError('accept terms')
          return
        }
        setRegError('')
        setSuccess('')

        createUserWithEmailAndPassword(auth,email,pass)
        .then(result=>{
          console.log(result.user)
          setSuccess('login sucessfully')
        })
        .catch(error=>{
          console.error(error)
          setRegError(error.message)
        })
          
          
          sendEmailVerification(result.user)
          .then(()=>{
            alert('chck ur email')
          })
        }
       
        .catch(error=>{
          console.error(error)
          setRegError(error.message)
        })
    }
    return (
        <div>
          <div className="mx-auto w-1/2">
            <h3>Please Register</h3>
            <form onSubmit={handleSubmit}>
            <input type="email" name="email" id="" placeholder="Enter ur email" className="py-4 mb-4" required/>
            <br />
          <div className="relative border">
          <input type={showPass ? 'text' : "password"} name="password" id="" 
            placeholder="enter pass" className="py-4 mb-4 border" required/>
            <span className="absolute top-3" onClick={()=>{
              setShowPass(!showPass)
            }}>
             SHow
            </span>
          </div>
            <br />
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">Aceept us</label>
            <br />
            <input type="submit" value="Register" className="py-4 btn btn-secondary"/>
            </form>
            {
              regError && <p className="bg-red-600">{regError}</p>
            }
            {
              success && <p className="bg-red-600">{success}</p>
            }
          </div>
        </div>
    );
};

export default Register;