function Home({ onLogout }) {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <h1 className="text-3xl font-semibold text-white">Welcome to the Home Page!</h1>
            <button className=" bg-gray-300 text-xl font-semibold text-white py-1 px-3 rounded-sm hover:bg-gray-500" onClick={onLogout}>Logout</button>
        </div>
    );
}
export default Home