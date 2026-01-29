// import React, { useState } from "react";
// import "./CSS/LoginSignup.css";

// const LoginSignup = () => {

//   const [state,setState] = useState("Login");
//   const [formData,setFormData] = useState({username:"",email:"",password:""});

//   const changeHandler = (e) => {
//     setFormData({...formData,[e.target.name]:e.target.value});
//     }

//   const login = async () => {
//     let dataObj;
//     await fetch('https://shopper-backend-q43b.onrender.com/login', {
//       method: 'POST',
//       headers: {
//         Accept:'application/form-data',
//         'Content-Type':'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {dataObj=data});
//       console.log(dataObj);
//       if (dataObj.success) {
//         localStorage.setItem('auth-token',dataObj.token);
//         window.location.replace("/");
//       }
//       else
//       {
//         alert(dataObj.errors)
//       }
//   }

//   const signup = async () => {
//     let dataObj;
//     await fetch('https://shopper-backend-q43b.onrender.com/signup', {
//       method: 'POST',
//       headers: {
//         Accept:'application/form-data',
//         'Content-Type':'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {dataObj=data});

//       if (dataObj.success) {
//         localStorage.setItem('auth-token',dataObj.token);
//         window.location.replace("/");
//       }
//       else
//       {
//         alert(dataObj.errors)
//       }
//   }

//   return (
//     <div className="loginsignup">
//       <div className="loginsignup-container">
//         <h1>{state}</h1>
//         <div className="loginsignup-fields">
//           {state==="Sign Up"?<input type="text" placeholder="Your name" name="username" value={formData.username} onChange={changeHandler}/>:<></>}
//           <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler}/>
//           <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler}/>
//         </div>

//         <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

//         {state==="Login"?
//         <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
//         :<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>}

//         <div className="loginsignup-agree">
//           <input type="checkbox" name="" id="" />
//           <p>By continuing, i agree to the terms of use & privacy policy.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;


import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate()
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN
  const login = async () => {
    try {
      const resp = await fetch(
        "https://shopper-backend-q43b.onrender.com/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const dataObj = await resp.json();
      console.log("Login response:", dataObj);

      if (dataObj.success) {
        localStorage.setItem("auth-token", dataObj.token);
        navigate("/")
      } else {
        alert(dataObj.errors || "Invalid login details");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  // ✅ SIGNUP
  const signup = async () => {
    try {
      const resp = await fetch(
        "https://shopper-backend-q43b.onrender.com/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const dataObj = await resp.json();
      console.log("Signup response:", dataObj);

      if (dataObj.success) {
        localStorage.setItem("auth-token", dataObj.token);
        navigate("/")
      } else {
        alert(dataObj.errors || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
