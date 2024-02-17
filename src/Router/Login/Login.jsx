import { useState } from 'react';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye and eye-off icons
import logo from '../../assets/login.png';

function Login({ onLogin }) {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false); // State to toggle password visibility

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;

        try {
            setLoading(true);
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                setLoading(false);
                toast.success("Successful Login ")
                onLogin(data.token);
            } else {
                setLoading(false);
                toast.error("Wrong email & password")
                console.error("Invalid response from server");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Wrong email & password")
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="w-96 shadow-xl bg-base-300 rounded-xl py-16 px-8">
                <img src={logo} alt="login" className="w-24 h-20 object-cover mx-auto mb-5" />
                <form onSubmit={handleLogin} className="space-y-3">
                    <div className="relative">
                        <RiUserLine className="absolute top-2 left-3 text-gray-400" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full py-1 px-2 rounded bg-gray-300 border-none focus:bg-gray-600 text-black pl-10"
                        />
                    </div>
                    <div className="relative">
                        <RiLockPasswordLine className="absolute top-2 left-3 text-gray-400" />
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password"
                            name="password"
                            className="w-full py-1 px-2 rounded bg-gray-300 border-none focus:bg-gray-600 text-black pl-10"
                        />
                        <div className="absolute -mt-[35px] cursor-pointer right-0 flex items-center pr-3">
                            <p
                                onClick={() => setShowPass(!showPass)}
                                className="p-2 focus:outline-none"
                            >
                                {showPass ? (
                                    <HiEye className="h-5 w-5 text-black dark:text-white" />
                                ) : (
                                    <HiEyeOff className="h-5 w-5 text-black dark:text-white" />
                                )}
                            </p>
                        </div>
                    </div>
                    <button disabled={loading} className="mx-auto bg-gray-300 text-xl font-semibold text-black py-1 px-3 rounded-sm hover:bg-gray-500">{loading ? <p className='flex gap-1 justify-start items-center'>Login <span className="loading loading-dots loading-sm"></span> </p> : "Login"}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
