import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../App";

const LoginRegister = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerCharacterName, setRegisterCharacterName] = useState("");
  const [alertSuccessDisplay, setAlertSuccessDisplay] = useState("none");
  const [alertFailDisplay, setAlertFailDisplay] = useState("none");
  const [alertLoginFailDisplay, setAlertLoginFailDisplay] = useState("none");

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  const handleLogin = () => {
    axios.post(`/user/login`, { username: username, password: password })
      .then((response) => {
        localStorage.setItem("Authorization", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        navigate("/main");
      }).catch((error) => {
        setAlertLoginFailDisplay("block")
        console.log(error);
      });
  }

  const handleRegister = (event) => {
    event.preventDefault();
    axios.post(`/user/register`, 
      { 
        username: registerUsername, 
        password: registerPassword, 
        characterName: registerCharacterName 
      }
    )
      .then((response) => {
        setAlertSuccessDisplay("block");
        setAlertFailDisplay("none");
      }).catch((error) => {
        setAlertFailDisplay("block");
        setAlertSuccessDisplay("none");
        console.log(error);
      });
  }
  
  return (
    <>
      <section className="d-flex vh-100 align-items-center bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-6 px-5">
              <div className="row">
                <h1 className="display-5 fw-bold" style={{ "fontFamily": "'Brush Script MT', cursive" }}>MyRPG</h1>
              </div>
              <div className="row justify-content-center">
                <img className="img-fluid home-img fade-in" src="/images/village2.svg" alt="village" />
              </div>
              <div className="row pt-4">
                <p className="lead text-center"><em>開始你的冒險。</em></p>
              </div>
            </div>
            <div className="col-6 px-5">
              <div className="card text-dark">
                <div className="card-body p-5 text-center">
                  <div className="pb-2 mb-4 border-bottom ">
                    <h2 className="fw-bold mb-3">登入</h2>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="username">帳號</label>
                      <input type="text" id="username" className="form-control form-control-lg"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">密碼</label>
                      <input type="password" id="password" className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-grid gap-2 mb-2">
                      <button className="btn btn-dark btn-lg px-5" type="submit" onClick={handleLogin}>登入</button>
                    </div>
                    <div className="alert alert-danger alert-dismissible fade show" style={{ "display": alertLoginFailDisplay }}>
                      <button type="button" className="btn-close" onClick={() => setAlertLoginFailDisplay("none")}></button>
                      <strong>帳號或密碼不正確</strong>
                    </div>
                  </div>
                  <button className="btn btn-outline-dark btn-lg px-5" data-bs-toggle="modal" data-bs-target="#registerModal">
                    按此註冊
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="registerModalLabel">註冊帳號</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="registerUsername" placeholder="帳號" required 
                    onChange={(e) => setRegisterUsername(e.target.value)}
                  />
                  <label htmlFor="registerUsername">帳號</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="registerPassword" placeholder="密碼" required 
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <label htmlFor="registerPassword">密碼</label>
                </div>
                <div className="form-floating mb-3 pb-3 border-bottom">
                  <input type="text" className="form-control" id="registerCharacterName" placeholder="角色名字" required
                    onChange={(e) => setRegisterCharacterName(e.target.value)}
                  />
                  <label htmlFor="registerCharacterName">角色名字</label>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-dark btn-lg mb-3" onClick={handleRegister}>註冊</button>
                </div>
                <div className="alert alert-success alert-dismissible fade show" style={{ "display": alertSuccessDisplay }}>
                  <button type="button" className="btn-close" onClick={() => setAlertSuccessDisplay("none")}></button>
                  <strong>註冊成功！</strong>
                </div>
                <div className="alert alert-danger alert-dismissible fade show" style={{ "display": alertFailDisplay }}>
                  <button type="button" className="btn-close" onClick={() => setAlertFailDisplay("none")}></button>
                  <strong>註冊失敗，請重試。</strong>
                </div>
         
              </form>
            </div>
            <div className="modal-footer">
              
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;